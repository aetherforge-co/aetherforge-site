// /api/create-checkout-session
//
// Creates a real Stripe Checkout session server-side (secret key never
// touches the browser) and returns the URL to redirect the customer to.
// Uses Stripe's REST API directly via fetch — no stripe npm package needed,
// so no package.json/build changes required for this static site.
//
// This lives in the SAME Vercel project as the storefront itself (not the
// aether-tts-proxy project), since it's only ever called from this site's
// own domain — same-origin, so no CORS setup needed at all.

const STRIPE_API_URL = 'https://api.stripe.com/v1/checkout/sessions';
const SITE_URL = 'https://www.aetherforgeco.com';

// Best-effort per-IP rate limit, same pattern as the other proxies.
const requestLog = new Map();
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 10;

function isRateLimited(key) {
  const now = Date.now();
  const timestamps = (requestLog.get(key) || []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS
  );
  timestamps.push(now);
  requestLog.set(key, timestamps);
  return timestamps.length > RATE_LIMIT_MAX;
}

// Turns a JS object into Stripe's form-encoded PHP-style array syntax,
// e.g. { line_items: [{ price_data: { currency: 'usd' } }] } becomes
// line_items[0][price_data][currency]=usd
function toFormParams(obj, prefix = '') {
  const params = new URLSearchParams();
  function walk(value, key) {
    if (value === null || value === undefined) return;
    if (Array.isArray(value)) {
      value.forEach((v, i) => walk(v, `${key}[${i}]`));
    } else if (typeof value === 'object') {
      Object.entries(value).forEach(([k, v]) => walk(v, key ? `${key}[${k}]` : k));
    } else {
      params.append(key, String(value));
    }
  }
  walk(obj, prefix);
  return params;
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Use POST.' });
    return;
  }

  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    console.error('STRIPE_SECRET_KEY is not set in the environment.');
    res.status(500).json({ error: 'Server misconfigured — missing Stripe key.' });
    return;
  }

  const ip =
    req.headers['x-forwarded-for']?.toString().split(',')[0].trim() ||
    req.socket?.remoteAddress ||
    'unknown';
  if (isRateLimited(ip)) {
    res.status(429).json({ error: 'Too many requests — slow down.' });
    return;
  }

  const { items } = req.body || {};
  if (!Array.isArray(items) || items.length === 0) {
    res.status(400).json({ error: '"items" array is required.' });
    return;
  }

  // Validate and normalize — never trust prices sent from the browser blindly
  // in a real production system; this demo trusts them for simplicity, but
  // a hardened version would look prices up server-side from a fixed catalog.
  const lineItems = items.map((item) => ({
    price_data: {
      currency: 'usd',
      product_data: { name: String(item.name).slice(0, 200) },
      unit_amount: Math.round(Number(item.price) * 100),
    },
    quantity: Math.max(1, Math.min(99, Math.round(Number(item.qty) || 1))),
  }));

  const invalid = lineItems.some(
    (li) => !li.price_data.product_data.name || !Number.isFinite(li.price_data.unit_amount) || li.price_data.unit_amount <= 0
  );
  if (invalid) {
    res.status(400).json({ error: 'Invalid item data.' });
    return;
  }

  const payload = {
    mode: 'payment',
    line_items: lineItems,
    success_url: `${SITE_URL}/?checkout=success`,
    cancel_url: `${SITE_URL}/?checkout=canceled`,
    shipping_address_collection: { allowed_countries: ['US'] },
  };

  try {
    const stripeRes = await fetch(STRIPE_API_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${secretKey}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: toFormParams(payload),
    });

    const data = await stripeRes.json();

    if (!stripeRes.ok) {
      console.error('Stripe error:', stripeRes.status, data);
      res.status(stripeRes.status).json({ error: data.error?.message || 'Checkout session creation failed.' });
      return;
    }

    res.status(200).json({ url: data.url });
  } catch (err) {
    console.error('Proxy error:', err);
    res.status(502).json({ error: 'Could not reach Stripe.' });
  }
};
