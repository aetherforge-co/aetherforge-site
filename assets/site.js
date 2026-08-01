// === PRODUCT CATALOG ===
// === PRINT LAB CATALOG ===
const printProducts = [
  {
    id:"PF-01", photo:"https://picsum.photos/seed/af-pf01-enclosure/500/500", status:"OPEN", type:"quote", name:"CUSTOM ENCLOSURES", desc:"Printed housings and protective cases, designed to your dimensions.",
    specs:[["MATERIAL","PETG / ASA"],["LEAD TIME","2-4 DAYS"],["FINISH","SANDED OR RAW"]],
    price:"FROM $45",
    icon:`<svg viewBox="0 0 100 100" stroke="#141414" stroke-width="1.4" fill="none"><rect x="22" y="30" width="56" height="40" rx="4"/><line x1="22" y1="42" x2="78" y2="42" stroke="#d8d6ce" stroke-dasharray="2 3"/><circle cx="68" cy="60" r="3"/></svg>`
  },
  {
    id:"PF-02", photo:"https://picsum.photos/seed/af-pf02-proto/500/500", status:"OPEN", type:"quote", name:"RAPID PROTOTYPING", desc:"Upload a model, we print and ship. FDM or resin, same-week turnaround.",
    specs:[["MATERIAL","PLA / RESIN / NYLON-CF"],["LEAD TIME","24-48H"],["FILE TYPES","STL / STEP"]],
    price:"FROM $12",
    icon:`<svg viewBox="0 0 100 100" stroke="#141414" stroke-width="1.4" fill="none"><path d="M50 20 L78 35 L78 65 L50 80 L22 65 L22 35 Z"/><path d="M50 20 L50 80 M22 35 L78 65 M78 35 L22 65" stroke="#d8d6ce" stroke-width="0.8"/></svg>`
  },
  {
    id:"PF-03", photo:"https://picsum.photos/seed/af-pf03-accessory/500/500", status:"IN STOCK", type:"cart", name:"PRINTED ACCESSORIES", desc:"Mounts, cable organizers, and desk hardware — our growing printed line.",
    specs:[["MATERIAL","PETG"],["WEIGHT","VARIES"],["FINISH","MATTE"]],
    price:"$18",
    icon:`<svg viewBox="0 0 100 100" stroke="#141414" stroke-width="1.4" fill="none"><rect x="30" y="45" width="40" height="12" rx="2"/><line x1="50" y1="45" x2="50" y2="20"/><circle cx="50" cy="16" r="4"/></svg>`
  },
  {
    id:"PF-04", photo:"https://picsum.photos/seed/af-pf04-material/500/500", status:"IN STOCK", type:"cart", name:"MATERIAL LIBRARY", desc:"Spooled and bottled stock for in-house and outside print jobs.",
    specs:[["OPTIONS","PLA·PETG·ASA·NYLON-CF·RESIN"],["COLORS","12"],["UNIT","1KG / 1L"]],
    price:"$22",
    icon:`<svg viewBox="0 0 100 100" stroke="#141414" stroke-width="1.4" fill="none"><circle cx="50" cy="50" r="26"/><circle cx="50" cy="50" r="8"/><line x1="50" y1="24" x2="50" y2="18" stroke="#d81324"/></svg>`
  },
  {
    id:"PF-05", photo:"https://picsum.photos/seed/af-pf05-batch/500/500", status:"OPEN", type:"quote", name:"SMALL-BATCH PRODUCTION", desc:"Need 25, 100, or more of the same part? We queue it across the farm and hold tolerance across the whole run.",
    specs:[["MATERIAL","PLA / PETG / ASA / NYLON-CF"],["MIN QTY","25 UNITS"],["LEAD TIME","5-7 DAYS"]],
    price:"FROM $180",
    icon:`<svg viewBox="0 0 100 100" stroke="#141414" stroke-width="1.4" fill="none"><rect x="18" y="52" width="28" height="28" rx="3"/><rect x="36" y="34" width="28" height="28" rx="3" stroke="#d8d6ce"/><rect x="54" y="16" width="28" height="28" rx="3"/></svg>`
  },
  {
    id:"PF-06", photo:"https://picsum.photos/seed/af-pf06-finishing/500/500", status:"IN STOCK", type:"cart", name:"FINISHING & COLOR", desc:"Send us a raw print — we'll sand, prime, and color-match it to spec before it ships.",
    specs:[["OPTIONS","SAND · PRIME · DYE · PAINT"],["TURNAROUND","+1-2 DAYS"],["COLOR MATCH","PANTONE OR SAMPLE"]],
    price:"FROM $15",
    icon:`<svg viewBox="0 0 100 100" stroke="#141414" stroke-width="1.4" fill="none"><rect x="32" y="35" width="36" height="40" rx="3"/><ellipse cx="50" cy="35" rx="18" ry="6"/><line x1="50" y1="20" x2="50" y2="29" stroke="#d81324"/></svg>`
  }
];
const printGrid = document.getElementById('printGrid');
if (printGrid) printGrid.innerHTML = printProducts.map(p => `
  <div class="card">
    <span class="card__corner tl"></span><span class="card__corner tr"></span>
    <span class="card__corner bl"></span><span class="card__corner br"></span>
    <div class="card__id"><span>${p.id}</span><span class="status">● ${p.status}</span></div>
    <div class="card__photo-wrap">
      <img src="${p.photo}" alt="${p.name}" loading="lazy">
      <div class="card__icon-badge">${p.icon}</div>
    </div>
    <h3>${p.name}</h3>
    <p class="desc">${p.desc}</p>
    <div class="card__specs">${p.specs.map(s => `<div class="spec-row"><span class="spec-row__label">${s[0]}</span><span class="spec-row__value">${s[1]}</span></div>`).join('')}</div>
    <div class="card__footer">
      <div class="card__price">${p.price}</div>
      <button class="card__add ${p.type === 'cart' ? 'card__add--buy' : ''}">${p.type === 'cart' ? 'ADD TO CART' : 'REQUEST'}</button>
    </div>
  </div>
`).join('');

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const products = [
  {
    id:"AF-01", photo:"https://picsum.photos/seed/af-af01-sentinel/500/500", status:"CONCEPT", name:"SENTINEL", desc:"Titanium-frame EDC folding knife, S35VN blade.",
    specs:[["MATERIAL","TI-6AL-4V / S35VN"],["WEIGHT","82G"],["BLADE","3.4IN DROP PT"]],
    price:"EST. $268",
    icon:`<svg viewBox="0 0 100 100" stroke="#141414" stroke-width="1.4" fill="none"><path d="M20 65 L55 20 L68 25 L38 70 Z"/><path d="M20 65 L10 82 L28 90 L38 70 Z"/><circle cx="24" cy="76" r="4"/></svg>`
  },
  {
    id:"AF-02", photo:"https://picsum.photos/seed/af-af02-relay/500/500", status:"CONCEPT", name:"RELAY", desc:"12-function modular multi-tool, pocket-clip carry.",
    specs:[["MATERIAL","6061-T6 AL / S35VN"],["WEIGHT","96G"],["TOOLS","12"]],
    price:"EST. $142",
    icon:`<svg viewBox="0 0 100 100" stroke="#141414" stroke-width="1.4" fill="none"><rect x="30" y="15" width="14" height="70" rx="2"/><line x1="37" y1="22" x2="37" y2="78" stroke-dasharray="3 3" stroke="#6b6b6b"/><rect x="24" y="20" width="4" height="30"/><rect x="46" y="35" width="4" height="30"/></svg>`
  },
  {
    id:"AF-03", photo:"https://picsum.photos/seed/af-af03-anchor/500/500", status:"CONCEPT", name:"ANCHOR", desc:"Machined bolt-action pen, hex-drive cap doubles as a bit driver.",
    specs:[["MATERIAL","GRADE 5 TITANIUM"],["WEIGHT","34G"],["REFILL","STD D1"]],
    price:"EST. $96",
    icon:`<svg viewBox="0 0 100 100" stroke="#141414" stroke-width="1.4" fill="none"><line x1="20" y1="80" x2="75" y2="25"/><line x1="20" y1="80" x2="30" y2="90"/><circle cx="75" cy="25" r="5"/></svg>`
  },
  {
    id:"AF-04", photo:"https://picsum.photos/seed/af-af04-node/500/500", status:"CONCEPT", name:"NODE", desc:"Magnetic multi-surface mount, quarter-turn locking base.",
    specs:[["MATERIAL","6061-T6 AL"],["PULL FORCE","18KG"],["MOUNT","1/4-20"]],
    price:"EST. $54",
    icon:`<svg viewBox="0 0 100 100" stroke="#141414" stroke-width="1.4" fill="none"><circle cx="50" cy="55" r="26"/><rect x="38" y="18" width="24" height="14" rx="2"/><line x1="50" y1="32" x2="50" y2="42"/></svg>`
  },
  {
    id:"AF-05", photo:"https://picsum.photos/seed/af-af05-vector/500/500", status:"CONCEPT", name:"VECTOR", desc:"Pocket bit driver with magnetic quick-swap chuck, 6 bits included.",
    specs:[["MATERIAL","TITANIUM / S2 STEEL"],["WEIGHT","41G"],["BITS INCL.","6"]],
    price:"EST. $88",
    icon:`<svg viewBox="0 0 100 100" stroke="#141414" stroke-width="1.4" fill="none"><rect x="42" y="18" width="16" height="50" rx="3"/><path d="M42 68 L36 84 L64 84 L58 68 Z"/><line x1="50" y1="30" x2="50" y2="50" stroke="#6b6b6b" stroke-dasharray="3 3"/></svg>`
  },
  {
    id:"AF-06", photo:"https://picsum.photos/seed/af-af06-cipher/500/500", status:"CONCEPT", name:"CIPHER", desc:"Keychain multi-tool: bottle opener, pry bar, hex set, lanyard hole.",
    specs:[["MATERIAL","S35VN STEEL"],["WEIGHT","22G"],["HEX SIZES","5"]],
    price:"EST. $38",
    icon:`<svg viewBox="0 0 100 100" stroke="#141414" stroke-width="1.4" fill="none"><rect x="20" y="40" width="60" height="16" rx="4"/><circle cx="30" cy="48" r="5"/><rect x="46" y="44" width="10" height="8"/><rect x="60" y="44" width="10" height="8"/></svg>`
  }
];

const grid = document.getElementById('productGrid');
if (grid) grid.innerHTML = products.map(p => `
  <div class="card">
    <span class="card__corner tl"></span><span class="card__corner tr"></span>
    <span class="card__corner bl"></span><span class="card__corner br"></span>
    <div class="card__id"><span>${p.id}</span><span class="status">● ${p.status}</span></div>
    <div class="card__photo-wrap">
      <img src="${p.photo}" alt="${p.name}" loading="lazy">
      <div class="card__icon-badge">${p.icon}</div>
    </div>
    <h3>${p.name}</h3>
    <p class="desc">${p.desc}</p>
    <div class="card__specs">${p.specs.map(s => `<div class="spec-row"><span class="spec-row__label">${s[0]}</span><span class="spec-row__value">${s[1]}</span></div>`).join('')}</div>
    <div class="concept-ribbon">// CONCEPT — NOT FOR SALE YET</div>
    <div class="card__footer">
      <div class="card__price">${p.price}</div>
      <button class="card__add">NOTIFY ME</button>
    </div>
  </div>
`).join('');

// === CART + CHECKOUT SYSTEM ===
// id -> {id,name,price,photo,qty}
// Persisted in the browser: now that each section is a real page, moving
// between them is a full page load, which would otherwise empty the cart
// mid-shop. Wrapped in try/catch so a browser with storage disabled or
// blocked still works — it just won't remember the cart between pages.
const CART_STORAGE_KEY = 'af_cart_v1';
function loadCart(){
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch { return {}; }
}
function saveCart(){
  try { localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart)); } catch {}
}
const cart = loadCart();

function parsePrice(str){
  const m = str.match(/[\d.]+/);
  return m ? parseFloat(m[0]) : 0;
}

// print catalog: type "cart" items add to the real cart, "quote" items open a real request form
document.querySelectorAll('#printGrid .card__add').forEach((btn, i) => {
  const p = printProducts[i];
  if (p.type === 'cart') {
    btn.addEventListener('click', () => {
      addToCart(p);
      btn.textContent = 'ADDED ✓';
      setTimeout(() => btn.textContent = 'ADD TO CART', 1200);
    });
  } else {
    btn.addEventListener('click', () => openCapture('quote', p.name));
  }
});

// hardware line isn't sellable yet — buttons open a real notify-me signup
document.querySelectorAll('#productGrid .card__add').forEach((btn, i) => {
  const p = products[i];
  btn.addEventListener('click', () => openCapture('notify', p.name));
});

function addToCart(p, opts){
  // opts.openDrawer defaults to true so the existing catalog pages behave as
  // before. The shop page passes false: it's a browse-and-filter context where
  // popping the drawer after every add means closing it again to keep looking,
  // and the button's own "ADDED" state already confirms the action.
  const openDrawer = !opts || opts.openDrawer !== false;
  const price = parsePrice(p.price);
  if (cart[p.id]) {
    cart[p.id].qty++;
  } else {
    cart[p.id] = { id:p.id, name:p.name, price, photo:p.photo, qty:1 };
  }
  renderCart();
  if (openDrawer) openCart();
}

function changeQty(id, delta){
  if (!cart[id]) return;
  cart[id].qty += delta;
  if (cart[id].qty <= 0) delete cart[id];
  renderCart();
}

function removeFromCart(id){
  delete cart[id];
  renderCart();
}

function cartTotals(){
  const items = Object.values(cart);
  const count = items.reduce((sum, i) => sum + i.qty, 0);
  const subtotal = items.reduce((sum, i) => sum + i.qty * i.price, 0);
  return { items, count, subtotal };
}

function renderCart(){
  saveCart();
  const { items, count, subtotal } = cartTotals();
  document.getElementById('cartCount').textContent = `[${String(count).padStart(2,'0')}]`;
  document.getElementById('cartSubtotal').textContent = `$${subtotal.toFixed(2)}`;

  const cartItemsEl = document.getElementById('cartItems');
  if (items.length === 0) {
    cartItemsEl.innerHTML = `<div class="cart-empty">// CART EMPTY<br>Add hardware from the catalog to get started.</div>`;
    return;
  }
  cartItemsEl.innerHTML = items.map(i => `
    <div class="cart-line">
      <img src="${i.photo}" alt="${i.name}">
      <div class="cart-line__info">
        <div class="cid">${i.id}</div>
        <h4>${i.name}</h4>
        <div class="cart-line__qty">
          <button data-action="dec" data-id="${i.id}">−</button>
          <span>${i.qty}</span>
          <button data-action="inc" data-id="${i.id}">+</button>
        </div>
      </div>
      <div class="cart-line__right">
        <div class="cart-line__price">$${(i.qty * i.price).toFixed(2)}</div>
        <button class="cart-line__remove" data-action="remove" data-id="${i.id}">REMOVE</button>
      </div>
    </div>
  `).join('');
}

document.getElementById('cartItems').addEventListener('click', (e) => {
  const btn = e.target.closest('button[data-action]');
  if (!btn) return;
  const id = btn.dataset.id;
  if (btn.dataset.action === 'inc') changeQty(id, 1);
  if (btn.dataset.action === 'dec') changeQty(id, -1);
  if (btn.dataset.action === 'remove') removeFromCart(id);
});

const cartDrawer = document.getElementById('cartDrawer');
const cartOverlayBg = document.getElementById('cartOverlayBg');
function openCart(){ cartDrawer.classList.add('open'); cartOverlayBg.classList.add('open'); }
function closeCart(){ cartDrawer.classList.remove('open'); cartOverlayBg.classList.remove('open'); }
document.getElementById('cartBtn').addEventListener('click', openCart);
document.getElementById('cartClose').addEventListener('click', closeCart);
document.getElementById('continueShoppingBtn').addEventListener('click', closeCart);
cartOverlayBg.addEventListener('click', closeCart);

// checkout modal
const checkoutModal = document.getElementById('checkoutModal');
const checkoutContent = document.getElementById('checkoutContent');

function checkoutSummaryHTML(){
  const { items, subtotal } = cartTotals();
  return `
    <div class="checkout-eyebrow">// ORDER REVIEW</div>
    <h2>Checkout</h2>
    <div class="checkout-summary">
      ${items.map(i => `<div class="checkout-summary__line"><span>${i.qty} × ${i.name}</span><span>$${(i.qty*i.price).toFixed(2)}</span></div>`).join('')}
      <div class="checkout-summary__total"><span>SUBTOTAL</span><span>$${subtotal.toFixed(2)}</span></div>
    </div>
    <p style="color:var(--af-grey); font-size:0.85rem; margin-bottom:12px; line-height:1.6;">Shipping and payment are collected on Stripe's secure checkout page — you'll be redirected there next.</p>
    <p style="color:var(--af-grey); font-size:0.72rem; margin-bottom:20px; line-height:1.5;">By continuing, you agree to our <a href="/terms.html" target="_blank" style="color:var(--af-grey); text-decoration:underline;">Terms of Service</a> and <a href="/privacy.html" target="_blank" style="color:var(--af-grey); text-decoration:underline;">Privacy Policy</a>.</p>
    <div class="checkout-note" id="checkoutStatus">// Preparing secure checkout...</div>
  `;
}

function checkoutErrorHTML(message){
  return `
    <div class="order-confirm">
      <div class="stamp" style="border-color:var(--af-grey-dim); color:var(--af-grey);">CHECKOUT ERROR</div>
      <h2>Couldn't start checkout</h2>
      <p>${escapeHtml(message)}</p>
      <button class="btn btn--ghost" id="checkoutDoneBtn">CLOSE</button>
    </div>
  `;
}

async function openCheckout(){
  if (cartTotals().count === 0) return;
  const { items } = cartTotals();
  checkoutContent.innerHTML = checkoutSummaryHTML();
  checkoutModal.classList.add('show');
  closeCart();

  try {
    // If logged in, include the current session token so the server can
    // verify it and tie this order to the account — omitted entirely for
    // guest checkouts, which still work exactly as before.
    let accessToken = null;
    try {
      const { data: { session } } = await afSb.auth.getSession();
      accessToken = session?.access_token || null;
    } catch { /* not logged in / auth not loaded — proceed as guest */ }

    const res = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        items: items.map(i => ({ id: i.id, qty: i.qty })),
        access_token: accessToken
      }),
    });
    const data = await res.json();
    if (!res.ok || !data.url) {
      checkoutContent.innerHTML = checkoutErrorHTML(data.error || 'Something went wrong — try again in a moment.');
      document.getElementById('checkoutDoneBtn').addEventListener('click', closeCheckout);
      return;
    }
    window.location.href = data.url; // hand off to Stripe's hosted checkout page
  } catch (err) {
    checkoutContent.innerHTML = checkoutErrorHTML('Could not reach the server — check your connection and try again.');
    document.getElementById('checkoutDoneBtn').addEventListener('click', closeCheckout);
  }
}
function closeCheckout(){ checkoutModal.classList.remove('show'); }

document.getElementById('checkoutBtn').addEventListener('click', openCheckout);
document.getElementById('checkoutClose').addEventListener('click', closeCheckout);
checkoutModal.addEventListener('click', (e) => { if (e.target === checkoutModal) closeCheckout(); });

// handle the return trip from Stripe (success or cancel)
(function handleCheckoutReturn(){
  const params = new URLSearchParams(window.location.search);
  const status = params.get('checkout');
  if (status === 'success') {
    Object.keys(cart).forEach(k => delete cart[k]);
    renderCart();
    checkoutContent.innerHTML = `
      <div class="order-confirm">
        <div class="stamp">PAYMENT CONFIRMED</div>
        <h2>Order Received</h2>
        <p>Thanks for your order — a confirmation is on its way from Stripe. We'll follow up with shipping details shortly.</p>
        <button class="btn btn--ghost" id="checkoutDoneBtn">CLOSE</button>
      </div>`;
    checkoutModal.classList.add('show');
    document.getElementById('checkoutDoneBtn').addEventListener('click', closeCheckout);
    window.history.replaceState({}, '', window.location.pathname);
  } else if (status === 'canceled') {
    window.history.replaceState({}, '', window.location.pathname);
  }
})();

renderCart();

// === CAPTURE MODAL: quote requests + notify-me signups, sent via Formspree ===
// Sign up free at formspree.io, create a form, and replace this with your real
// endpoint (formspree.io/f/xxxxxxxx). Submissions land straight in your inbox —
// no backend code needed beyond this fetch call.
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xdaqyyyd';

const captureModal = document.getElementById('captureModal');
const captureContent = document.getElementById('captureContent');

function quoteFormHTML(productName){
  return `
    <div class="checkout-eyebrow">// REQUEST A QUOTE</div>
    <h2>${productName}</h2>
    <form class="checkout-form" id="captureForm">
      <input type="hidden" name="_subject" value="Quote request: ${productName}">
      <input type="hidden" name="product" value="${productName}">
      <label>Name</label>
      <input type="text" name="name" required>
      <label>Email</label>
      <input type="email" name="email" required>
      <label>Project details</label>
      <textarea name="details" rows="4" required placeholder="Material, dimensions, quantity, deadline..." style="width:100%; background:transparent; border:1px solid var(--af-grey-dim); color:var(--af-white); font-family:var(--body); font-size:0.9rem; padding:10px 12px; margin-bottom:16px; resize:vertical;"></textarea>
      <div class="checkout-note">// Real quotes get a real reply — typically within 1 business day. Your info goes straight to us, nowhere else.</div>
      <button type="submit" class="btn" style="width:100%;">SEND REQUEST</button>
    </form>
  `;
}

function notifyFormHTML(productName){
  return `
    <div class="checkout-eyebrow">// GET NOTIFIED</div>
    <h2>${productName}</h2>
    <p style="color:var(--af-grey); font-size:0.9rem; margin-bottom:20px; line-height:1.6;">Leave your email and we'll let you know the moment this is ready to order.</p>
    <form class="checkout-form" id="captureForm">
      <input type="hidden" name="_subject" value="Notify me: ${productName}">
      <input type="hidden" name="product" value="${productName}">
      <label>Email</label>
      <input type="email" name="email" required>
      <div class="checkout-note">// One email when it launches — nothing else, no spam.</div>
      <button type="submit" class="btn" style="width:100%;">NOTIFY ME</button>
    </form>
  `;
}

function captureConfirmHTML(){
  return `
    <div class="order-confirm">
      <div class="stamp">RECEIVED</div>
      <h2>Got it</h2>
      <p>Thanks — we'll be in touch soon.</p>
      <button class="btn btn--ghost" id="captureDoneBtn">CLOSE</button>
    </div>
  `;
}

function openCapture(type, productName){
  captureContent.innerHTML = type === 'quote' ? quoteFormHTML(productName) : notifyFormHTML(productName);
  document.getElementById('captureForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const form = e.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.textContent = 'SENDING...';
    submitBtn.disabled = true;
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: new FormData(form)
      });
      if (res.ok) {
        captureContent.innerHTML = captureConfirmHTML();
        document.getElementById('captureDoneBtn').addEventListener('click', closeCapture);
      } else {
        submitBtn.textContent = type === 'quote' ? 'SEND REQUEST' : 'NOTIFY ME';
        submitBtn.disabled = false;
        alert('Something went wrong sending that — try again in a moment.');
      }
    } catch (err) {
      submitBtn.textContent = type === 'quote' ? 'SEND REQUEST' : 'NOTIFY ME';
      submitBtn.disabled = false;
      alert('Could not reach the server — check your connection and try again.');
    }
  });
  captureModal.classList.add('show');
}
function closeCapture(){ captureModal.classList.remove('show'); }

document.getElementById('captureClose').addEventListener('click', closeCapture);
captureModal.addEventListener('click', (e) => { if (e.target === captureModal) closeCapture(); });

// === ACCOUNT / AUTH ===
const authModal = document.getElementById('authModal');
const authContent = document.getElementById('authContent');
const accountBtn = document.getElementById('accountBtn');

function signInFormHTML(errorMsg){
  return `
    <div class="checkout-eyebrow">// LOG IN</div>
    <h2>Welcome back</h2>
    <form class="checkout-form" id="authForm">
      <label>Email</label>
      <input type="email" name="email" required>
      <label>Password</label>
      <input type="password" name="password" required>
      ${errorMsg ? `<div class="checkout-note" style="color:var(--af-red); margin-bottom:14px;">// ${errorMsg}</div>` : ''}
      <button type="submit" class="btn" style="width:100%;">LOG IN</button>
    </form>
    <p style="font-size:0.8rem; color:var(--af-grey); margin-top:16px;">No account yet? <a href="#" id="switchToSignUp" style="color:var(--af-red);">Sign up</a></p>
  `;
}

function signUpFormHTML(errorMsg){
  return `
    <div class="checkout-eyebrow">// CREATE ACCOUNT</div>
    <h2>Save designs to your account</h2>
    <form class="checkout-form" id="authForm">
      <label>Email</label>
      <input type="email" name="email" required>
      <label>Password</label>
      <input type="password" name="password" required minlength="6">
      ${errorMsg ? `<div class="checkout-note" style="color:var(--af-red); margin-bottom:14px;">// ${errorMsg}</div>` : ''}
      <button type="submit" class="btn" style="width:100%;">SIGN UP</button>
    </form>
    <p style="font-size:0.8rem; color:var(--af-grey); margin-top:16px;">Already have an account? <a href="#" id="switchToSignIn" style="color:var(--af-red);">Log in</a></p>
  `;
}

function authConfirmHTML(message){
  return `
    <div class="order-confirm">
      <div class="stamp">CHECK YOUR EMAIL</div>
      <h2>Almost there</h2>
      <p>${message}</p>
      <button class="btn btn--ghost" id="authDoneBtn">CLOSE</button>
    </div>
  `;
}

function wireAuthForm(mode){
  document.getElementById('authForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const form = e.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const email = form.email.value.trim();
    const password = form.password.value;
    submitBtn.textContent = mode === 'signin' ? 'LOGGING IN...' : 'SIGNING UP...';
    submitBtn.disabled = true;
    try {
      if (mode === 'signin') {
        const { error } = await afSignIn(email, password);
        if (error) {
          authContent.innerHTML = signInFormHTML(error.message);
          wireAuthForm('signin');
          return;
        }
        closeAuth();
        await refreshAccountUI();
        window.location.href = 'account.html';
      } else {
        const { data, error } = await afSignUp(email, password);
        if (error) {
          authContent.innerHTML = signUpFormHTML(error.message);
          wireAuthForm('signup');
          return;
        }
        if (data.session) {
          closeAuth();
          await refreshAccountUI();
          window.location.href = 'account.html';
        } else {
          authContent.innerHTML = authConfirmHTML('We sent a confirmation link to ' + email + ' — click it, then come back and log in.');
          document.getElementById('authDoneBtn').addEventListener('click', closeAuth);
        }
      }
    } catch (err) {
      submitBtn.textContent = mode === 'signin' ? 'LOG IN' : 'SIGN UP';
      submitBtn.disabled = false;
      alert('Could not reach the server — check your connection and try again.');
    }
  });
  const switchLink = document.getElementById(mode === 'signin' ? 'switchToSignUp' : 'switchToSignIn');
  if (switchLink) {
    switchLink.addEventListener('click', (e) => {
      e.preventDefault();
      openAuth(mode === 'signin' ? 'signup' : 'signin');
    });
  }
}

function openAuth(mode){
  authContent.innerHTML = mode === 'signin' ? signInFormHTML() : signUpFormHTML();
  wireAuthForm(mode);
  authModal.classList.add('show');
}
function closeAuth(){ authModal.classList.remove('show'); }

document.getElementById('authClose').addEventListener('click', closeAuth);
authModal.addEventListener('click', (e) => { if (e.target === authModal) closeAuth(); });

async function refreshAccountUI(){
  // If the Supabase SDK failed to load (CDN blocked or down), fall back to
  // showing a plain LOGIN link rather than throwing and leaving the button
  // hidden forever — the cart and checkout must keep working regardless.
  let user = null;
  try {
    user = await afGetUser();
  } catch {
    accountBtn.style.display = 'inline-block';
    accountBtn.textContent = 'LOGIN';
    accountBtn.onclick = () => { window.location.href = 'account.html'; };
    return;
  }
  accountBtn.style.display = 'inline-block';
  if (user) {
    accountBtn.textContent = 'MY DESIGNS';
    accountBtn.onclick = () => { window.location.href = 'account.html'; };
  } else {
    accountBtn.textContent = 'LOGIN';
    accountBtn.onclick = () => openAuth('signin');
  }
}
refreshAccountUI();

// print catalog "quote" buttons and hardware "notify" buttons are already
// wired above via openCapture() — this just handles the standalone
// "Get notified at launch" button in the Metal Fab section
const metalworkNotifyBtn = document.querySelector('#metalwork .hero__cta .btn--ghost');
if (metalworkNotifyBtn) {
  metalworkNotifyBtn.addEventListener('click', (e) => {
    e.preventDefault();
    openCapture('notify', 'Metal Fab Line');
  });
}

// === AETHER CHAT PLACEHOLDER ===
const aetherLauncher = document.getElementById('aetherLauncher');
const aetherPanel = document.getElementById('aetherPanel');
const aetherBody = document.getElementById('aetherBody');
const aetherInput = document.getElementById('aetherInput');

function openAether(){
  aetherPanel.classList.add('open');
  document.querySelector('.aether-launcher__badge')?.remove();
}
function closeAether(){ aetherPanel.classList.remove('open'); }
aetherLauncher.addEventListener('click', () => {
  aetherPanel.classList.contains('open') ? closeAether() : openAether();
});
document.getElementById('aetherClose').addEventListener('click', closeAether);

// Escapes HTML-significant characters so chat content is always rendered as
// text, never parsed as markup — protects against both a user typing HTML
// into the input and, less likely but still worth closing off, the AI reply
// itself containing HTML-like text.
function escapeHtml(str){
  const div = document.createElement('div');
  div.textContent = String(str);
  return div.innerHTML;
}

function addAetherMsg(text, from){
  const div = document.createElement('div');
  div.className = `aether-msg ${from}`;
  div.innerHTML = `<span class="tag-mini">${from === 'bot' ? 'AETHER' : 'YOU'}</span>${escapeHtml(text)}`;
  aetherBody.appendChild(div);
  aetherBody.scrollTop = aetherBody.scrollHeight;
}

// Reuses the same Vercel project/Gemini key as the AETHER dashboard, but
// through a separate public-safe endpoint (see storefront-chat.js) since
// this widget's code is visible to anyone who views this page's source.
const AETHER_STOREFRONT_CHAT_ENDPOINT = 'https://aether-tts-proxy.vercel.app/api/storefront-chat';
let aetherConversation = [];

async function aetherReply(q){
  aetherConversation.push({ role: 'user', content: q });
  try {
    const res = await fetch(AETHER_STOREFRONT_CHAT_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: aetherConversation }),
    });
    if (!res.ok) {
      const { error } = await res.json().catch(() => ({}));
      console.error('aetherReply failed:', error || res.status);
      if (res.status === 429) {
        return "That's a lot of questions at once — give it a minute and try again.";
      }
      return "Couldn't reach AETHER's core just now — try again in a moment, or use the contact form below.";
    }
    const data = await res.json();
    const reply = data.text || 'No response came back — try again.';
    aetherConversation.push({ role: 'assistant', content: reply });
    aetherConversation = aetherConversation.slice(-8);
    return reply;
  } catch (err) {
    console.error('aetherReply network error:', err);
    return "Couldn't reach AETHER's core just now — check your connection and try again.";
  }
}

async function handleAetherQuery(text){
  if (!text.trim()) return;
  addAetherMsg(text, 'user');
  const thinkingMsg = document.createElement('div');
  thinkingMsg.className = 'aether-msg bot';
  thinkingMsg.innerHTML = `<span class="tag-mini">AETHER</span>…thinking`;
  aetherBody.appendChild(thinkingMsg);
  aetherBody.scrollTop = aetherBody.scrollHeight;
  const reply = await aetherReply(text);
  thinkingMsg.innerHTML = `<span class="tag-mini">AETHER</span>${escapeHtml(reply)}`;
  aetherBody.scrollTop = aetherBody.scrollHeight;
}

document.querySelectorAll('.aether-chip').forEach(chip => {
  chip.addEventListener('click', () => handleAetherQuery(chip.dataset.q));
});
document.getElementById('aetherSend').addEventListener('click', () => {
  handleAetherQuery(aetherInput.value);
  aetherInput.value = '';
});
aetherInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    handleAetherQuery(aetherInput.value);
    aetherInput.value = '';
  }
});

// crosshair follows cursor in blueprint hero, prints coordinates
const bp = document.getElementById('blueprint');
const crosshair = document.getElementById('crosshair');
const coordReadout = document.getElementById('coordReadout');
if (bp) bp.addEventListener('mousemove', (e) => {
  const r = bp.getBoundingClientRect();
  const x = e.clientX - r.left;
  const y = e.clientY - r.top;
  crosshair.style.left = x + 'px';
  crosshair.style.top = y + 'px';
  const mmX = (x / r.width * 100).toFixed(1);
  const mmY = (y / r.height * 100).toFixed(1);
  coordReadout.textContent = `X ${mmX.padStart(5,'0')} · Y ${mmY.padStart(5,'0')}`;
});

// subtle "live" feel for the print-farm diagnostic readout — ticks the
// layer count up like an active print in progress, then rolls over into
// a fresh "job" once it hits the top instead of freezing on one number
const layerReadout = document.getElementById('layerReadout');
const tempReadout = document.getElementById('tempReadout');
let currentLayer = 184;
let totalLayers = 240;
setInterval(() => {
  currentLayer++;
  if (currentLayer > totalLayers) {
    totalLayers = 180 + Math.floor(Math.random() * 140); // next job: 180–320 layers
    currentLayer = 1 + Math.floor(Math.random() * 4);
  }
  if (layerReadout) layerReadout.textContent = `LAYER ${currentLayer} / ${totalLayers}`;
  if (tempReadout && Math.random() < 0.3) {
    tempReadout.textContent = (209 + Math.floor(Math.random() * 3)) + '°C';
  }
}, 2000);

// === EASTER EGG 1: type "aether" anywhere ===
let buffer = '';
const eggOverlay = document.getElementById('eggOverlay');
const eggArt = document.getElementById('eggArt');
const asciiForge = `
      /\\
     /  \\      A E T H E R F O R G E
    / /\\ \\        rev.C — hidden panel
   /_/  \\_\\
    |    |
    |____|
`;
window.addEventListener('keydown', (e) => {
  if (eggOverlay.classList.contains('show')) return;
  buffer = (buffer + e.key).slice(-6).toLowerCase();
  if (buffer === 'aether') {
    eggArt.textContent = asciiForge;
    eggOverlay.classList.add('show');
  }
  if (e.key === 'Escape') {
    eggOverlay.classList.remove('show');
    closeCart();
    closeCheckout();
    closeCapture();
    closeAether();
    closeMobileNav();
  }
});
document.getElementById('eggClose').addEventListener('click', () => eggOverlay.classList.remove('show'));

// === EASTER EGG 2: konami code ===
const konami = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
let kIndex = 0;
window.addEventListener('keydown', (e) => {
  if (e.key === konami[kIndex]) {
    kIndex++;
    if (kIndex === konami.length) {
      kIndex = 0;
      eggArt.textContent = `> ADMIN_MODE\n> ACCESS LEVEL: MACHINIST\n> ...\n> just kidding, there's no backend.\n> but we see you. good taste.`;
      eggOverlay.querySelector('#eggMsg').innerHTML = `You just ran the Konami code on an e-commerce site. We respect that more than we should.`;
      eggOverlay.classList.add('show');
    }
  } else {
    kIndex = (e.key === konami[0]) ? 1 : 0;
  }
});

// === EASTER EGG 3: click logo 5x ===
let logoClicks = 0;
document.querySelector('header .logo').addEventListener('click', () => {
  logoClicks++;
  if (logoClicks === 5) {
    logoClicks = 0;
    eggArt.textContent = '';
    eggOverlay.querySelector('#eggMsg').innerHTML = `Five clicks. That's dedication.<br>The garage this all started in still has the original mill. It's got a name. We're not telling you what it is.`;
    eggOverlay.classList.add('show');
  }
});

// === console message ===
console.log('%c// AETHERFORGE', 'color:#d81324; font-family:monospace; font-size:14px; font-weight:bold;');
console.log('%cREV.C — if you can read this, you already know how to find the other three easter eggs.', 'color:#6b6b6b; font-family:monospace; font-size:11px;');
console.log('%chiring machinists who read source code: hiring@aetherforge.example', 'color:#141414; font-family:monospace; font-size:11px;');

// === scroll-reveal: orchestrated entrance for sections as they enter view ===
if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal, .reveal-stagger').forEach(el => revealObserver.observe(el));
} else {
  document.querySelectorAll('.reveal, .reveal-stagger').forEach(el => el.classList.add('in-view'));
}

// === FAQ sidebar tabs: click a category to filter which group shows ===
const faqTabs = document.querySelectorAll('.faq-tab');
const faqGroups = document.querySelectorAll('.faq-group');
if (faqTabs.length && faqGroups.length) {
  const activateFaqTab = (targetId) => {
    faqTabs.forEach(tab => tab.classList.toggle('is-active', tab.dataset.target === targetId));
    faqGroups.forEach(group => {
      const isTarget = group.id === targetId;
      group.classList.toggle('is-active', isTarget);
      if (isTarget) {
        // Show the first question open by default so switching
        // categories doesn't just dump a flat list of closed questions.
        group.querySelectorAll('.faq-item').forEach((item, i) => { item.open = i === 0; });
      }
    });
  };
  faqTabs.forEach(tab => {
    tab.addEventListener('click', () => activateFaqTab(tab.dataset.target));
  });
  activateFaqTab(faqTabs[0].dataset.target);
}

// === sticky header gains a shadow once the page scrolls ===
const siteHeader = document.querySelector('header');
if (siteHeader) {
  const onScroll = () => siteHeader.classList.toggle('scrolled', window.scrollY > 8);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// === mobile nav drawer ===
const hamburgerBtn = document.getElementById('hamburgerBtn');
const mobileNavDrawer = document.getElementById('mobileNavDrawer');
const mobileNavOverlay = document.getElementById('mobileNavOverlay');

function openMobileNav(){
  mobileNavDrawer.classList.add('open');
  mobileNavOverlay.classList.add('open');
  hamburgerBtn.setAttribute('aria-expanded', 'true');
}
function closeMobileNav(){
  mobileNavDrawer.classList.remove('open');
  mobileNavOverlay.classList.remove('open');
  hamburgerBtn.setAttribute('aria-expanded', 'false');
}
hamburgerBtn.addEventListener('click', () => {
  mobileNavDrawer.classList.contains('open') ? closeMobileNav() : openMobileNav();
});
document.getElementById('mobileNavClose').addEventListener('click', closeMobileNav);
mobileNavOverlay.addEventListener('click', closeMobileNav);
document.querySelectorAll('.mobile-nav-drawer__links a').forEach(a => {
  a.addEventListener('click', closeMobileNav);
});

// === MULTI-PAGE NAV: mark the link matching the current page ===
(function markCurrentNav(){
  const path = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();
  const current = path === '' ? 'index.html' : path;
  document.querySelectorAll('.navlinks a, .mobile-nav-drawer__links a').forEach(a => {
    const href = (a.getAttribute('href') || '').toLowerCase();
    if (href === current) a.classList.add('is-current');
  });
})();


// === SHOP PAGE: unified, filterable catalog across both product lines ===
// Only runs on shop.html. Pulls from the same two catalogs the 3D Printing
// and Metal Fab pages use, so those pages stay the curated "highlight" view
// and this is the full browse-everything view.
const shopGrid = document.getElementById('shopGrid');
if (shopGrid) {
  const AVAIL = { 'IN STOCK':'stock', 'OPEN':'order', 'CONCEPT':'concept' };
  const catalog = [
    ...printProducts.map(p => ({ ...p, line:'print' })),
    ...products.map(p => ({ ...p, line:'metal' })),
  ].map(p => ({ ...p, avail: AVAIL[p.status] || 'order' }));

  const shopCount   = document.getElementById('shopCount');
  const shopEmpty   = document.getElementById('shopEmpty');
  const shopSearch  = document.getElementById('shopSearch');
  const lineBtns    = document.querySelectorAll('[data-line]');
  const availBtns   = document.querySelectorAll('[data-avail]');
  const sortSelect  = document.getElementById('shopSort');

  let state = { line:'all', avail:'all', q:'', sort:'default' };

  // "FROM $45" / "EST. $268" / "$18" -> 45 / 268 / 18, for sorting only
  const priceOf = p => {
    const m = String(p.price).match(/([\d,]+(?:\.\d+)?)/);
    return m ? parseFloat(m[1].replace(/,/g,'')) : Infinity;
  };

  function cardHTML(p){
    const isConcept = p.avail === 'concept';
    const label = p.type === 'cart' ? 'ADD TO CART' : (isConcept ? 'NOTIFY ME' : 'REQUEST');
    return `
      <div class="card" data-id="${p.id}" data-line="${p.line}">
        <span class="card__corner tl"></span><span class="card__corner tr"></span>
        <span class="card__corner bl"></span><span class="card__corner br"></span>
        <div class="card__id">
          <span>${p.id}</span>
          <span class="status">● ${p.status}</span>
        </div>
        <div class="card__photo-wrap">
          <img src="${p.photo}" alt="${p.name}" loading="lazy">
          <div class="card__icon-badge">${p.icon}</div>
        </div>
        <div class="shop-line-tag">${p.line === 'print' ? '3D PRINTING' : 'METAL FAB'}</div>
        <h3>${p.name}</h3>
        <p class="desc">${p.desc}</p>
        <div class="card__specs">${p.specs.map(s => `<div class="spec-row"><span class="spec-row__label">${s[0]}</span><span class="spec-row__value">${s[1]}</span></div>`).join('')}</div>
        ${isConcept ? '<div class="concept-ribbon">// CONCEPT — NOT FOR SALE YET</div>' : ''}
        <div class="card__footer">
          <div class="card__price">${p.price}</div>
          <button class="card__add ${p.type === 'cart' ? 'card__add--buy' : ''}" data-id="${p.id}">${label}</button>
        </div>
      </div>`;
  }

  function applyFilters(){
    let list = catalog.filter(p => {
      if (state.line !== 'all' && p.line !== state.line) return false;
      if (state.avail !== 'all' && p.avail !== state.avail) return false;
      if (state.q) {
        const hay = (p.name + ' ' + p.desc + ' ' + p.specs.map(s => s.join(' ')).join(' ')).toLowerCase();
        if (!hay.includes(state.q)) return false;
      }
      return true;
    });
    if (state.sort === 'price-asc')  list = [...list].sort((a,b) => priceOf(a) - priceOf(b));
    if (state.sort === 'price-desc') list = [...list].sort((a,b) => priceOf(b) - priceOf(a));

    shopGrid.innerHTML = list.map(cardHTML).join('');
    shopCount.textContent = `${list.length} ITEM${list.length === 1 ? '' : 'S'}`;
    shopEmpty.style.display = list.length ? 'none' : 'block';
    wireCards(list);
  }

  function wireCards(list){
    shopGrid.querySelectorAll('.card__add').forEach(btn => {
      const p = list.find(x => x.id === btn.dataset.id);
      if (!p) return;
      btn.addEventListener('click', () => {
        if (p.type === 'cart') {
          addToCart(p, { openDrawer:false });
          btn.textContent = 'ADDED ✓';
          btn.disabled = true;
          setTimeout(() => { btn.textContent = 'ADD TO CART'; btn.disabled = false; }, 1400);
        } else {
          openCapture(p.avail === 'concept' ? 'notify' : 'quote', p.name);
        }
      });
    });
  }

  lineBtns.forEach(b => b.addEventListener('click', () => {
    state.line = b.dataset.line;
    lineBtns.forEach(x => x.classList.toggle('is-active', x === b));
    applyFilters();
  }));
  availBtns.forEach(b => b.addEventListener('click', () => {
    state.avail = b.dataset.avail;
    availBtns.forEach(x => x.classList.toggle('is-active', x === b));
    applyFilters();
  }));
  if (shopSearch) shopSearch.addEventListener('input', () => {
    state.q = shopSearch.value.trim().toLowerCase();
    applyFilters();
  });
  if (sortSelect) sortSelect.addEventListener('change', () => {
    state.sort = sortSelect.value;
    applyFilters();
  });

  // Deep links from elsewhere on the site: shop.html?line=metal
  const params = new URLSearchParams(window.location.search);
  const wanted = params.get('line');
  if (wanted === 'metal' || wanted === 'print') {
    state.line = wanted;
    lineBtns.forEach(x => x.classList.toggle('is-active', x.dataset.line === wanted));
  }
  applyFilters();
}
