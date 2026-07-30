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
//
// SECURITY: prices are looked up here from CATALOG by id, never trusted
// from the request body. Anyone can POST arbitrary JSON to this endpoint
// directly (not just from the browser), so the server must be the only
// source of truth for what something costs. Keep this catalog in sync
// with the "cart" items in index.html's printProducts array — currently
// PF-03 and PF-04 are the only purchasable items.

const STRIPE_API_URL = 'https://api.stripe.com/v1/checkout/sessions';
const SITE_URL = 'https://www.aetherforgeco.com';

// Server-side source of truth for price — the ONLY place price is decided.
// id -> { name, unitAmount (in cents) }
const CATALOG = {
  'PF-03': { name: 'PRINTED ACCESSORIES', unitAmount: 1800 },
  'PF-04': { name: 'MATERIAL LIBRARY', unitAmount: 2200 },
};

// Fallback in-memory limiter — used only if Upstash isn't configured yet.
// Resets on cold start and doesn't share state across instances, so it's
// best-effort only, same limitation as before.
const memoryRequestLog = new Map();
function isRateLimitedMemory(key, max, windowMs) {
  const now = Date.now();
  const timestamps = (memoryRequestLog.get(key) || []).filter((t) => now - t < windowMs);
  timestamps.push(now);
  memoryRequestLog.set(key, timestamps);
  return timestamps.length > max;
}

// Real distributed rate limit via Upstash Redis's REST API (no redis client
// needed, just fetch — same dependency-free pattern as the rest of this
// file). Requires UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN env
// vars (free tier at upstash.com). Falls back to the in-memory limiter
// above if those aren't set, so this endpoint keeps working either way.
async function isRateLimited(key, max, windowSeconds) {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) {
    return isRateLimitedMemory(key, max, windowSeconds * 1000);
  }
  try {
    const redisKey = `ratelimit:checkout:${key}`;
    const res = await fetch(`${url}/pipeline`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify([
        ['INCR', redisKey],
        ['EXPIRE', redisKey, windowSeconds, 'NX'],
      ]),
    });
    const data = await res.json();
    const count = data?.[0]?.result;
    if (typeof count !== 'number') return isRateLimitedMemory(key, max, windowSeconds * 1000);
    return count > max;
  } catch (err) {
    console.error('Upstash rate limit error, falling back to in-memory:', err);
    return isRateLimitedMemory(key, max, windowSeconds * 1000);
  }
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
  if (await isRateLimited(ip, 10, 60)) {
    res.status(429).json({ error: 'Too many requests — slow down.' });
    return;
  }

  const { items } = req.body || {};
  if (!Array.isArray(items) || items.length === 0) {
    res.status(400).json({ error: '"items" array is required.' });
    return;
  }
  if (items.length > 20) {
    res.status(400).json({ error: 'Too many line items.' });
    return;
  }

  // Look up every item in CATALOG by id — client-submitted name/price are
  // ignored entirely. If an id isn't in the catalog (typo, tampering, or a
  // stale cart referencing something no longer sold), reject the whole
  // request rather than guessing.
  const lineItems = [];
  for (const item of items) {
    const entry = CATALOG[item?.id];
    if (!entry) {
      res.status(400).json({ error: `Unknown item: ${String(item?.id).slice(0, 40)}` });
      return;
    }
    const qty = Math.max(1, Math.min(99, Math.round(Number(item.qty) || 1)));
    lineItems.push({
      price_data: {
        currency: 'usd',
        product_data: { name: entry.name },
        unit_amount: entry.unitAmount,
      },
      quantity: qty,
    });
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
