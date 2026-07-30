// /api/stripe-webhook
//
// Receives real, cryptographically-verified events from Stripe about what
// actually happened to a payment. This is the AUTHORITATIVE record of an
// order — unlike the "?checkout=success" redirect the browser lands on
// after checkout, which is just a URL parameter and proves nothing (anyone
// could type that URL in by hand without paying). Stripe signs every
// webhook payload with a secret only Stripe and this server know, so a
// request that verifies here is genuinely confirmed by Stripe.
//
// SETUP REQUIRED (this endpoint does nothing useful until you do this):
//   1. Deploy this file.
//   2. In the Stripe Dashboard: Developers > Webhooks > Add endpoint.
//      URL: https://www.aetherforgeco.com/api/stripe-webhook
//      Event to send: checkout.session.completed
//   3. Stripe will show you a signing secret (starts with "whsec_") —
//      copy it into this project's Vercel env vars as STRIPE_WEBHOOK_SECRET.
//   4. Test it: Stripe's webhook page has a "Send test event" button.
//      Check this function's logs in the Vercel dashboard to confirm it
//      logged "Verified order:" — that's proof the signature check works.
//
// Right now this just verifies the event and logs the confirmed order to
// Vercel's function logs, plus (optionally) emails you via the same
// Formspree endpoint the capture forms use. There's no order database yet
// (per the earlier scoping decision), so this is the lightest version that
// gives you a real, tamper-proof confirmation trail — wiring it into an
// actual fulfillment system is a bigger project for later.

const crypto = require('crypto');

// Reuse the same Formspree inbox the quote/notify forms already use, so a
// confirmed order shows up as an email without standing up anything new.
// Set to null to disable this and rely on logs only.
const NOTIFY_FORMSPREE_ENDPOINT = 'https://formspree.io/f/xdaqyyyd';

// Vercel needs this to hand us the raw, unparsed request body — signature
// verification only works against the exact bytes Stripe sent, not a
// re-serialized JSON.parse/stringify round trip.
module.exports.config = { api: { bodyParser: false } };

function readRawBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', (chunk) => chunks.push(chunk));
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });
}

// Implements Stripe's documented webhook signature scheme by hand (no
// stripe npm package needed, consistent with the rest of this project):
// https://docs.stripe.com/webhooks#verify-manually
function verifyStripeSignature(rawBody, sigHeader, secret, toleranceSeconds = 300) {
  if (!sigHeader) return false;
  const parts = {};
  for (const piece of sigHeader.split(',')) {
    const [k, v] = piece.split('=');
    if (k === 't') parts.timestamp = v;
    if (k === 'v1') (parts.signatures ||= []).push(v);
  }
  if (!parts.timestamp || !parts.signatures) return false;

  const signedPayload = `${parts.timestamp}.${rawBody}`;
  const expected = crypto.createHmac('sha256', secret).update(signedPayload, 'utf8').digest('hex');

  const matches = parts.signatures.some((sig) => {
    try {
      return crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected));
    } catch {
      return false; // length mismatch etc. — not a match, not a crash
    }
  });
  if (!matches) return false;

  const ageSeconds = Math.abs(Date.now() / 1000 - Number(parts.timestamp));
  return ageSeconds <= toleranceSeconds; // reject old/replayed payloads
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Use POST.' });
    return;
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.error('STRIPE_WEBHOOK_SECRET is not set — refusing all requests.');
    res.status(500).json({ error: 'Server misconfigured — missing webhook secret.' });
    return;
  }

  let rawBody;
  try {
    rawBody = await readRawBody(req);
  } catch (err) {
    console.error('Failed to read webhook body:', err);
    res.status(400).json({ error: 'Could not read request body.' });
    return;
  }

  const sigHeader = req.headers['stripe-signature'];
  if (!verifyStripeSignature(rawBody.toString('utf8'), sigHeader, webhookSecret)) {
    console.error('Stripe webhook signature verification failed.');
    res.status(400).json({ error: 'Invalid signature.' });
    return;
  }

  let event;
  try {
    event = JSON.parse(rawBody.toString('utf8'));
  } catch (err) {
    res.status(400).json({ error: 'Invalid JSON payload.' });
    return;
  }

  // Signature is verified at this point — everything below is genuinely
  // confirmed by Stripe, not just a client-controlled redirect.
  if (event.type === 'checkout.session.completed') {
    const session = event.data?.object || {};
    const amount = typeof session.amount_total === 'number' ? (session.amount_total / 100).toFixed(2) : 'unknown';
    const currency = (session.currency || 'usd').toUpperCase();
    const email = session.customer_details?.email || 'unknown';

    console.log('Verified order:', {
      sessionId: session.id,
      amount,
      currency,
      email,
      paymentStatus: session.payment_status,
    });

    if (NOTIFY_FORMSPREE_ENDPOINT) {
      try {
        await fetch(NOTIFY_FORMSPREE_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            _subject: `Verified order — $${amount} ${currency}`,
            message: `Stripe confirmed a completed checkout.\n\nSession: ${session.id}\nAmount: $${amount} ${currency}\nCustomer email: ${email}\nPayment status: ${session.payment_status}`,
          }),
        });
      } catch (err) {
        // Don't fail the webhook over a notification email — Stripe will
        // retry this endpoint on non-2xx responses, and the order is
        // already logged above regardless of whether the email goes out.
        console.error('Order-confirmation notification email failed:', err);
      }
    }
  }

  // Always 200 once verified, even for event types we don't act on yet —
  // Stripe retries (with backoff, then gives up) on non-2xx, so returning
  // an error here for an event we simply don't handle would just cause
  // pointless retries.
  res.status(200).json({ received: true });
};
