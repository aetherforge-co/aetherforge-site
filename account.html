// Dashboard logic for account.html. Kept in its own file (rather than inline)
// so the site's CSP can forbid inline scripts entirely — with 'unsafe-inline'
// removed, an injected <script> or attribute handler simply won't execute.
const gateView = document.getElementById('gateView');
const dashView = document.getElementById('dashView');
const gateForm = document.getElementById('gateForm');
const logoutBtn = document.getElementById('logoutBtn');
const profileAvatar = document.getElementById('profileAvatar');
const profileAvatarInitial = document.getElementById('profileAvatarInitial');
const avatarOverlay = document.getElementById('avatarOverlay');
const avatarInput = document.getElementById('avatarInput');
const avatarRemoveBtn = document.getElementById('avatarRemoveBtn');
const profileEmail = document.getElementById('profileEmail');
const profileSince = document.getElementById('profileSince');
const designList = document.getElementById('designList');
const orderList = document.getElementById('orderList');
const designForm = document.getElementById('designForm');
const designFormNote = document.getElementById('designFormNote');
const designSubmitBtn = document.getElementById('designSubmitBtn');
const dropzone = document.getElementById('dropzone');
const dropzoneFile = document.getElementById('dropzoneFile');
const fileInput = document.getElementById('fileInput');
const descField = designForm.description;
const charCount = document.getElementById('charCount');

const STAGES = [
  { key:'submitted', label:'Submitted' },
  { key:'reviewing', label:'Reviewing' },
  { key:'quoted', label:'Quoted' },
  { key:'in_production', label:'In Production' },
  { key:'completed', label:'Completed' },
];
const ORDER_STAGES = [
  { key:'paid', label:'Paid' },
  { key:'processing', label:'Processing' },
  { key:'shipped', label:'Shipped' },
  { key:'delivered', label:'Delivered' },
];
const MAX_FILE_BYTES = 50 * 1024 * 1024;
const MAX_AVATAR_BYTES = 5 * 1024 * 1024;

function loginFormHTML(errorMsg){
  return `
    <label>Email</label>
    <input type="email" id="gEmail" required>
    <label>Password</label>
    <input type="password" id="gPassword" required>
    ${errorMsg ? `<div class="note note--error">${errorMsg}</div>` : ''}
    <button class="btn btn--full" id="gSubmit">LOG IN</button>
    <p style="font-size:0.8rem; color:var(--af-grey); margin-top:16px;">No account? <a href="#" id="gSwitch" style="color:var(--af-red);">Sign up</a></p>
  `;
}
function signupFormHTML(errorMsg){
  return `
    <label>Email</label>
    <input type="email" id="gEmail" required>
    <label>Password</label>
    <input type="password" id="gPassword" required minlength="6">
    ${errorMsg ? `<div class="note note--error">${errorMsg}</div>` : ''}
    <button class="btn btn--full" id="gSubmit">SIGN UP</button>
    <p style="font-size:0.8rem; color:var(--af-grey); margin-top:16px;">Already have an account? <a href="#" id="gSwitch" style="color:var(--af-red);">Log in</a></p>
  `;
}

function wireGateForm(mode){
  document.getElementById('gSubmit').addEventListener('click', async (e) => {
    e.preventDefault();
    const email = document.getElementById('gEmail').value.trim();
    const password = document.getElementById('gPassword').value;
    const btn = document.getElementById('gSubmit');
    btn.disabled = true;
    btn.textContent = mode === 'login' ? 'LOGGING IN...' : 'SIGNING UP...';
    try {
      if (mode === 'login') {
        const { error } = await afSignIn(email, password);
        if (error) { gateForm.innerHTML = loginFormHTML(error.message); wireGateForm('login'); return; }
        init();
      } else {
        const { data, error } = await afSignUp(email, password);
        if (error) { gateForm.innerHTML = signupFormHTML(error.message); wireGateForm('signup'); return; }
        if (data.session) {
          init();
        } else {
          gateForm.innerHTML = `<div class="note note--ok">Check ${escapeHtml(email)} for a confirmation link, then log in below.</div>` + loginFormHTML();
          wireGateForm('login');
        }
      }
    } catch (err) {
      btn.disabled = false;
      btn.textContent = mode === 'login' ? 'LOG IN' : 'SIGN UP';
      alert('Could not reach the server — check your connection and try again.');
    }
  });
  const switchLink = document.getElementById('gSwitch');
  if (switchLink) {
    switchLink.addEventListener('click', (e) => {
      e.preventDefault();
      gateForm.innerHTML = mode === 'login' ? signupFormHTML() : loginFormHTML();
      wireGateForm(mode === 'login' ? 'signup' : 'login');
    });
  }
}

// --- description char counter ---
descField.addEventListener('input', () => {
  const len = descField.value.length;
  charCount.textContent = `${len} / 1000`;
  charCount.classList.toggle('is-near', len > 900);
});

// --- drag-and-drop upload zone ---
dropzone.addEventListener('click', () => fileInput.click());
fileInput.addEventListener('change', () => updateDropzoneLabel());
['dragenter','dragover'].forEach(evt => {
  dropzone.addEventListener(evt, (e) => { e.preventDefault(); dropzone.classList.add('is-drag'); });
});
['dragleave','drop'].forEach(evt => {
  dropzone.addEventListener(evt, (e) => { e.preventDefault(); dropzone.classList.remove('is-drag'); });
});
dropzone.addEventListener('drop', (e) => {
  if (e.dataTransfer.files.length) {
    fileInput.files = e.dataTransfer.files;
    updateDropzoneLabel();
  }
});
function updateDropzoneLabel(){
  const f = fileInput.files[0];
  dropzoneFile.textContent = f ? `${f.name} (${(f.size/1024/1024).toFixed(1)}MB)` : '';
}

// --- profile avatar ---
profileAvatar.addEventListener('click', () => avatarInput.click());

async function loadAvatar(avatarPath){
  if (!avatarPath) {
    profileAvatar.style.backgroundImage = 'none';
    profileAvatarInitial.style.display = 'block';
    avatarRemoveBtn.style.display = 'none';
    return;
  }
  const { data: signed, error } = await afSb.storage.from('avatars').createSignedUrl(avatarPath, 3600);
  if (error || !signed) {
    profileAvatar.style.backgroundImage = 'none';
    profileAvatarInitial.style.display = 'block';
    avatarRemoveBtn.style.display = 'none';
    return;
  }
  profileAvatar.style.backgroundImage = `url(${signed.signedUrl})`;
  profileAvatarInitial.style.display = 'none';
  avatarRemoveBtn.style.display = 'block';
}

avatarInput.addEventListener('change', async () => {
  const user = await afGetUser();
  const file = avatarInput.files[0];
  if (!user || !file) return;
  if (!file.type.startsWith('image/')) {
    alert('Please choose an image file.');
    avatarInput.value = '';
    return;
  }
  if (file.size > MAX_AVATAR_BYTES) {
    alert('That image is too large (max 5MB).');
    avatarInput.value = '';
    return;
  }
  avatarOverlay.textContent = 'UPLOADING...';
  const path = `${user.id}/avatar`;
  const { error: upErr } = await afSb.storage.from('avatars').upload(path, file, { upsert: true, contentType: file.type });
  avatarOverlay.innerHTML = 'CHANGE<br>PHOTO';
  avatarInput.value = '';
  if (upErr) {
    alert('Could not upload that photo — try again.');
    return;
  }
  const { error: metaErr } = await afSb.auth.updateUser({ data: { avatar_path: path } });
  if (metaErr) {
    alert('Photo uploaded, but could not save it to your profile — try again.');
    return;
  }
  loadAvatar(path);
});

avatarRemoveBtn.addEventListener('click', async (e) => {
  e.stopPropagation();
  const user = await afGetUser();
  if (!user) return;
  if (!confirm('Remove your profile photo?')) return;
  const path = `${user.id}/avatar`;
  await afSb.storage.from('avatars').remove([path]);
  await afSb.auth.updateUser({ data: { avatar_path: null } });
  loadAvatar(null);
});

function fileTag(filename){
  const ext = (filename.split('.').pop() || '').toLowerCase();
  if (['jpg','jpeg','png','gif','webp','heic'].includes(ext)) return 'IMG';
  if (['stl','step','stp','obj','3mf'].includes(ext)) return '3D';
  if (ext === 'pdf') return 'PDF';
  return 'FILE';
}
function filenameFromPath(path){
  const base = path.split('/').pop() || path;
  return base.replace(/^\d+_/, '');
}

function pipelineHTML(status, stages, terminalKeys, terminalNote){
  if (terminalKeys && terminalKeys.includes(status)) {
    return `<div class="pipeline pipeline--declined"><span class="declined-note">${terminalNote}</span></div>`;
  }
  const idx = stages.findIndex(s => s.key === status);
  const activeIdx = idx === -1 ? 0 : idx;
  return `
    <div class="pipeline">
      ${stages.map((s,i) => `
        <div class="pipeline__stage ${i <= activeIdx ? 'is-done' : ''} ${i === activeIdx ? 'is-current' : ''}">
          <span class="pipeline__dot"></span>
          <span class="pipeline__label">${s.label}</span>
        </div>
      `).join('')}
    </div>
  `;
}

function statusBadge(status){
  if (status === 'declined') return `<span class="status status--declined">DECLINED</span>`;
  if (status === 'completed') return `<span class="status">COMPLETED</span>`;
  return `<span class="status status--active">${(status || 'submitted').replace(/_/g,' ').toUpperCase()}</span>`;
}

function relativeDate(iso){
  const d = new Date(iso);
  const days = Math.floor((Date.now() - d.getTime()) / 86400000);
  if (days <= 0) return 'today';
  if (days === 1) return 'yesterday';
  if (days < 30) return `${days}d ago`;
  return d.toLocaleDateString(undefined, { year:'numeric', month:'short', day:'numeric' });
}

function updateStats(data){
  const total = data.length;
  const done = data.filter(d => d.status === 'completed').length;
  const declined = data.filter(d => d.status === 'declined').length;
  const inProgress = total - done - declined;
  document.getElementById('statTotal').textContent = total;
  document.getElementById('statProgress').textContent = inProgress;
  document.getElementById('statDone').textContent = done;
}

async function loadDesigns(user){
  const { data, error } = await afSb
    .from('designs')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  if (error) {
    designList.innerHTML = `<p class="empty">Couldn't load your designs — try refreshing.</p>`;
    return;
  }
  updateStats(data || []);
  if (!data || data.length === 0) {
    designList.innerHTML = `<p class="empty">Nothing submitted yet — use the form above to send us your first design.</p>`;
    return;
  }

  designList.innerHTML = '';
  for (const d of data) {
    const card = document.createElement('div');
    card.className = 'design-card';
    const submittedDate = new Date(d.created_at).toLocaleDateString(undefined, { year:'numeric', month:'short', day:'numeric' });
    const showUpdated = d.updated_at && (new Date(d.updated_at).getTime() - new Date(d.created_at).getTime() > 60000);
    card.innerHTML = `
      <span class="design-card__corner tl"></span><span class="design-card__corner br"></span>
      <div class="design-card__top">
        <h3>${escapeHtml(d.title)}</h3>
        ${statusBadge(d.status)}
      </div>
      ${pipelineHTML(d.status, STAGES, ['declined'], "This one didn't move forward — see notes below or reach out and we'll explain why.")}
      <div class="design-card__body">${d.description ? `<p>${escapeHtml(d.description)}</p>` : ''}</div>
      <div class="design-card__meta">
        <span>SUBMITTED ${submittedDate}${showUpdated ? ` · UPDATED ${relativeDate(d.updated_at)}` : ''}</span>
        <span class="design-card__actions">
          ${d.file_path ? `<a href="#" class="file-link" data-path="${escapeHtml(d.file_path)}"><span class="file-tag">${fileTag(d.file_path)}</span>${escapeHtml(filenameFromPath(d.file_path))}</a>` : ''}
          ${d.status === 'submitted' ? `<button class="edit-btn" data-id="${d.id}">EDIT</button>` : ''}
          <button class="delete-btn" data-id="${d.id}">DELETE</button>
        </span>
      </div>
    `;
    designList.appendChild(card);
  }

  designList.querySelectorAll('.file-link').forEach(link => {
    link.addEventListener('click', async (e) => {
      e.preventDefault();
      const path = link.dataset.path;
      const { data: signed, error: sErr } = await afSb.storage.from('designs').createSignedUrl(path, 3600);
      if (sErr || !signed) { alert('Could not open that file right now.'); return; }
      window.open(signed.signedUrl, '_blank');
    });
  });
  designList.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      if (!confirm('Delete this design permanently?')) return;
      const { error } = await afSb.from('designs').delete().eq('id', btn.dataset.id);
      if (error) { alert('Could not delete — try again.'); return; }
      const user = await afGetUser();
      loadDesigns(user);
    });
  });
  designList.querySelectorAll('.edit-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const record = data.find(d => d.id === btn.dataset.id);
      startEdit(btn.closest('.design-card'), record);
    });
  });
}

function orderStatusBadge(status){
  if (status === 'refunded' || status === 'cancelled') return `<span class="status status--declined">${status.toUpperCase()}</span>`;
  if (status === 'delivered') return `<span class="status">DELIVERED</span>`;
  return `<span class="status status--active">${(status || 'paid').toUpperCase()}</span>`;
}

async function loadOrders(user){
  const { data, error } = await afSb
    .from('orders')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  if (error) {
    orderList.innerHTML = `<p class="empty">Couldn't load your orders — try refreshing.</p>`;
    return;
  }
  if (!data || data.length === 0) {
    orderList.innerHTML = `<p class="empty">No orders yet — parts you buy from the <a href="/#printCatalog">shop</a> will show up here.</p>`;
    return;
  }

  orderList.innerHTML = '';
  for (const o of data) {
    const card = document.createElement('div');
    card.className = 'design-card';
    const orderDate = new Date(o.created_at).toLocaleDateString(undefined, { year:'numeric', month:'short', day:'numeric' });
    const items = Array.isArray(o.items) ? o.items : [];
    const itemsHTML = items.map(i => `<div>${i.qty}× ${escapeHtml(i.name)}</div>`).join('') || '<div>Order details unavailable</div>';
    const total = typeof o.amount_total === 'number' ? `$${o.amount_total.toFixed(2)}` : '';
    card.innerHTML = `
      <span class="design-card__corner tl"></span><span class="design-card__corner br"></span>
      <div class="design-card__top">
        <h3>ORDER — ${orderDate}</h3>
        ${orderStatusBadge(o.status)}
      </div>
      ${pipelineHTML(o.status, ORDER_STAGES, ['refunded','cancelled'], `This order was ${o.status === 'refunded' ? 'refunded' : 'cancelled'}. Reach out if that doesn't look right.`)}
      <div class="order-items">${itemsHTML}</div>
      <div class="design-card__meta">
        <span class="order-total">${total}</span>
        <span class="design-card__actions">
          ${o.tracking_number ? `<span class="tracking-number">${escapeHtml(o.tracking_number)}</span>` : ''}
          ${o.tracking_url ? `<a class="tracking-link" href="${escapeHtml(safeUrl(o.tracking_url))}" target="_blank" rel="noopener">TRACK PACKAGE</a>` : ''}
        </span>
      </div>
    `;
    orderList.appendChild(card);
  }
}

function startEdit(cardEl, record){
  const body = cardEl.querySelector('.design-card__body');
  body.innerHTML = `
    <div class="af-form" style="margin-top:8px;">
      <label>Title</label>
      <input type="text" class="edit-title" value="${escapeHtml(record.title)}" maxlength="120">
      <label>Description</label>
      <textarea class="edit-desc" rows="4" maxlength="1000">${escapeHtml(record.description || '')}</textarea>
      <div style="display:flex; gap:10px; margin-top:6px;">
        <button class="btn btn--small save-edit">SAVE</button>
        <button class="btn btn--ghost btn--small cancel-edit">CANCEL</button>
      </div>
      <div class="edit-note"></div>
    </div>
  `;
  body.querySelector('.cancel-edit').addEventListener('click', async () => {
    const user = await afGetUser();
    loadDesigns(user);
  });
  body.querySelector('.save-edit').addEventListener('click', async () => {
    const title = body.querySelector('.edit-title').value.trim();
    const description = body.querySelector('.edit-desc').value.trim();
    const noteEl = body.querySelector('.edit-note');
    if (!title) { noteEl.innerHTML = `<div class="note note--error">Title can't be empty.</div>`; return; }
    const { error } = await afSb.from('designs').update({ title, description }).eq('id', record.id);
    if (error) { noteEl.innerHTML = `<div class="note note--error">${escapeHtml(error.message)}</div>`; return; }
    const user = await afGetUser();
    loadDesigns(user);
  });
}

function escapeHtml(str){
  const div = document.createElement('div');
  div.textContent = String(str ?? '');
  return div.innerHTML;
}

// Only allow http/https in hrefs we render. Blocks javascript:, data: and
// other script-bearing schemes from ever reaching an anchor.
function safeUrl(u){
  try {
    const parsed = new URL(String(u), window.location.origin);
    return (parsed.protocol === 'http:' || parsed.protocol === 'https:') ? parsed.href : '#';
  } catch { return '#'; }
}

// Storage keys are user-supplied filenames; keep them to a predictable
// character set so they can't carry quotes, angle brackets or path segments.
function safeFileName(name){
  return String(name).replace(/[^A-Za-z0-9._-]/g, '_').slice(-80) || 'upload';
}

designForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const user = await afGetUser();
  if (!user) return;
  const title = designForm.title.value.trim();
  const description = designForm.description.value.trim();
  const file = fileInput.files[0];

  if (file && file.size > MAX_FILE_BYTES) {
    designFormNote.innerHTML = `<div class="note note--error">That file is too large (max ~50MB).</div>`;
    return;
  }

  designSubmitBtn.disabled = true;
  designSubmitBtn.textContent = 'SUBMITTING...';
  designFormNote.innerHTML = '';

  try {
    let file_path = null;
    if (file) {
      const path = `${user.id}/${Date.now()}_${safeFileName(file.name)}`;
      const { error: upErr } = await afSb.storage.from('designs').upload(path, file);
      if (upErr) {
        designFormNote.innerHTML = `<div class="note note--error">Upload failed: ${escapeHtml(upErr.message)}</div>`;
        designSubmitBtn.disabled = false;
        designSubmitBtn.textContent = 'SUBMIT DESIGN';
        return;
      }
      file_path = path;
    }
    const { error: insErr } = await afSb.from('designs').insert({
      user_id: user.id, title, description, file_path
    });
    if (insErr) {
      designFormNote.innerHTML = `<div class="note note--error">${escapeHtml(insErr.message)}</div>`;
      designSubmitBtn.disabled = false;
      designSubmitBtn.textContent = 'SUBMIT DESIGN';
      return;
    }
    designForm.reset();
    dropzoneFile.textContent = '';
    charCount.textContent = '0 / 1000';
    designFormNote.innerHTML = `<div class="note note--ok">Submitted — we'll take a look.</div>`;
    loadDesigns(user);
  } catch (err) {
    designFormNote.innerHTML = `<div class="note note--error">Could not reach the server — try again.</div>`;
  } finally {
    designSubmitBtn.disabled = false;
    designSubmitBtn.textContent = 'SUBMIT DESIGN';
  }
});

logoutBtn.addEventListener('click', async () => {
  await afSignOut();
  window.location.href = '/';
});

async function init(){
  const user = await afGetUser();
  if (user) {
    gateView.style.display = 'none';
    dashView.style.display = 'block';
    profileAvatarInitial.textContent = (user.email || '?').charAt(0).toUpperCase();
    loadAvatar(user.user_metadata && user.user_metadata.avatar_path);
    profileEmail.textContent = user.email;
    if (user.created_at) {
      const since = new Date(user.created_at).toLocaleDateString(undefined, { year:'numeric', month:'short' });
      profileSince.textContent = `MEMBER SINCE ${since.toUpperCase()}`;
    }
    loadDesigns(user);
    loadOrders(user);
  } else {
    dashView.style.display = 'none';
    gateView.style.display = 'block';
    gateForm.innerHTML = loginFormHTML();
    wireGateForm('login');
  }
}
init();
