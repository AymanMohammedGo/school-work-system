/* ═══════════════════════════════════════════════════════════════════════════
   منظومة العمل المدرسي — وزارة التعليم
   Interactive institutional display
   ═══════════════════════════════════════════════════════════════════════════ */

'use strict';

/* ───────────────────────────────────────────────────────────────────────────
   01 · CONTENT  —  الجهة الوحيدة التي تُعدَّل لإضافة الروابط
   أضف رابط Google Drive في حقل url. لا حاجة لتعديل أي كود آخر.
   slot: توزيع العناصر على التركيب البصري
         top   = القوس العلوي (٥)
         start = العمود الأيمن (٢)
         end   = العمود الأيسر (٢)
         bottom= القوس السفلي (٤)
   ─────────────────────────────────────────────────────────────────────────── */
const SECTIONS = [
  { id:  1, title: 'التقويم المدرسي الخارجي',                   icon: 'calendar',   slot: 'top',    url: '' },
  { id:  2, title: 'الخطة التشغيلية',                            icon: 'plan',       slot: 'top',    url: '' },
  { id:  3, title: 'الخطة التحسينية لمجالات النموذج الإشرافي',   icon: 'improve',    slot: 'top',    url: '' },
  { id:  4, title: 'معايير الالتزام والامتثال',                  icon: 'compliance', slot: 'top',    url: '' },
  { id:  5, title: 'منصة مدرستي',                                icon: 'platform',   slot: 'top',    url: '' },

  { id:  6, title: 'الإدارة المدرسية',                           icon: 'school',     slot: 'start',  url: '' },
  { id:  7, title: 'النشاط الطلابي',                             icon: 'activity',   slot: 'start',  url: '' },

  { id:  8, title: 'التوجيه الطلابي',                            icon: 'guidance',   slot: 'end',    url: '' },
  { id:  9, title: 'المعلمون',                                   icon: 'teacher',    slot: 'end',    url: '' },

  { id: 10, title: 'خطط واختبارات نافس',                        icon: 'assessment', slot: 'bottom', url: '' },
  { id: 11, title: 'خطط واختبارات القدرات والتحصيلي',           icon: 'aptitude',   slot: 'bottom', url: '' },
  { id: 12, title: 'التطوير المهني',                             icon: 'growth',     slot: 'bottom', url: '' },
  { id: 13, title: 'الطلاب',                                     icon: 'students',   slot: 'bottom', url: '' }
];

/* Official Ministry of Education asset. Drop the real file here — nothing
   else needs to change. See README for the official identity source. */
const LOGO_SRC = 'assets/logo/ministry-of-education-logo.svg';

/* ───────────────────────────────────────────────────────────────────────────
   02 · ICON SYSTEM
   One visual language: 24 grid, stroke only, uniform weight and density.
   No fills, no emoji, no mixed sources.
   ─────────────────────────────────────────────────────────────────────────── */
const ICONS = {
  calendar:
    '<path d="M5 5.4h14a2 2 0 0 1 2 2v11.6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7.4a2 2 0 0 1 2-2Z"/>' +
    '<path d="M3 10.2h18"/><path d="M8 2.6v4M16 2.6v4"/>' +
    '<path d="M7.4 14h.01M12 14h.01M16.6 14h.01M7.4 17.6h.01M12 17.6h.01"/>',

  plan:
    '<path d="M9 3.9H7A2.4 2.4 0 0 0 4.6 6.3v12.9A2.4 2.4 0 0 0 7 21.6h10a2.4 2.4 0 0 0 2.4-2.4V6.3A2.4 2.4 0 0 0 17 3.9h-2"/>' +
    '<rect x="8.6" y="2.3" width="6.8" height="3.4" rx="1.3"/>' +
    '<path d="M8.2 10.6h7.6M8.2 14h5.6M8.2 17.4h3.6"/>',

  improve:
    '<path d="M3.2 20.4h17.6"/>' +
    '<path d="M4.4 16.2 9.6 10.6l3.4 3.2 6.6-7.2"/>' +
    '<path d="M14.9 6.6h4.7v4.7"/>',

  compliance:
    '<path d="M12 2.6 4.6 5.7v5.9c0 4.8 3.1 8.3 7.4 9.8 4.3-1.5 7.4-5 7.4-9.8V5.7L12 2.6Z"/>' +
    '<path d="m8.9 11.9 2.3 2.3 4.1-4.5"/>',

  platform:
    '<rect x="2.6" y="4" width="18.8" height="12.8" rx="2.2"/>' +
    '<path d="M2.6 8.2h18.8"/>' +
    '<path d="M6.2 11.8h5M6.2 14.2h3"/>' +
    '<path d="M12 16.8v3.6M8.4 20.6h7.2"/>',

  school:
    '<path d="M3.6 20.8V9.6L12 3.8l8.4 5.8v11.2"/>' +
    '<path d="M2 20.8h20"/>' +
    '<rect x="9.6" y="14.4" width="4.8" height="6.4"/>' +
    '<path d="M6.9 11.4h.01M12 11.4h.01M17.1 11.4h.01"/>',

  activity:
    '<circle cx="9.2" cy="7.8" r="3.1"/>' +
    '<path d="M3.4 20.4c0-3.2 2.6-5.8 5.8-5.8s5.8 2.6 5.8 5.8"/>' +
    '<circle cx="17.4" cy="9.4" r="2.3"/>' +
    '<path d="M16.3 14.1c2.6.3 4.4 2.6 4.4 5.4"/>',

  guidance:
    '<circle cx="12" cy="12" r="8.8"/>' +
    '<path d="m15.7 8.3-2.2 5.2-5.2 2.2 2.2-5.2 5.2-2.2Z"/>',

  teacher:
    '<rect x="2.6" y="3.2" width="12.4" height="8.8" rx="1.6"/>' +
    '<path d="M5.8 6.4h6M5.8 8.9h4"/>' +
    '<circle cx="18.4" cy="6.4" r="2.3"/>' +
    '<path d="M14.6 20.8v-4.4a3.8 3.8 0 0 1 3.8-3.8 3.8 3.8 0 0 1 3.8 3.8v4.4"/>' +
    '<path d="M8.8 15.4v5.4"/>',

  assessment:
    '<path d="M3.4 20.6h17.2"/>' +
    '<rect x="5.2" y="12.4" width="3.6" height="5.8" rx=".8"/>' +
    '<rect x="10.2" y="7.6" width="3.6" height="10.6" rx=".8"/>' +
    '<rect x="15.2" y="10.2" width="3.6" height="8" rx=".8"/>' +
    '<path d="M6.2 5.4 12 3.4l6 2.6"/>',

  aptitude:
    '<circle cx="12" cy="8.6" r="5.6"/>' +
    '<circle cx="12" cy="8.6" r="2"/>' +
    '<path d="M8.6 13.4 7.1 21.4 12 18.6l4.9 2.8-1.5-8"/>',

  growth:
    '<rect x="2.6" y="7.2" width="18.8" height="13.2" rx="2.2"/>' +
    '<path d="M8.6 7.2V5.4a2.2 2.2 0 0 1 2.2-2.2h2.4a2.2 2.2 0 0 1 2.2 2.2v1.8"/>' +
    '<path d="M2.6 12.2h18.8"/>' +
    '<path d="M12 17.8v-4M10.2 15l1.8-1.8L13.8 15"/>',

  students:
    '<path d="M12 3.4 1.9 8.5 12 13.6l10.1-5.1L12 3.4Z"/>' +
    '<path d="M5.9 10.6v5.1c0 2.2 2.7 3.9 6.1 3.9s6.1-1.7 6.1-3.9v-5.1"/>' +
    '<path d="M21.5 8.9v5.6"/>'
};

const svgIcon = (name) =>
  '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">' + (ICONS[name] || '') + '</svg>';

/* ───────────────────────────────────────────────────────────────────────────
   03 · BOOT
   ─────────────────────────────────────────────────────────────────────────── */
const stage   = document.getElementById('stage');
const core    = document.getElementById('core');
const tethers = document.getElementById('tethers');
const SLOTS   = {
  top:    document.getElementById('arcTop'),
  start:  document.getElementById('flankS'),
  end:    document.getElementById('flankE'),
  bottom: document.getElementById('arcBottom')
};

let nodes = [];
let firstPaint = true;

resolveLogo();
buildNodes();
requestAnimationFrame(() => {
  layoutTethers();
  revealNodes();
});

/* Re-measure once webfonts land — Arabic metrics shift line counts. */
if (document.fonts && document.fonts.ready) {
  document.fonts.ready.then(() => layoutTethers());
}

window.addEventListener('resize', debounce(layoutTethers, 120));

/* ───────────────────────────────────────────────────────────────────────────
   04 · OFFICIAL LOGO RESOLUTION
   The official Ministry mark is never redrawn or faked. If the asset is not
   present we fall back to a plain typographic lockup and say so loudly.
   ─────────────────────────────────────────────────────────────────────────── */
function resolveLogo() {
  const probe = new Image();

  probe.onload = () => {
    document.documentElement.dataset.logo = 'ok';
    document.querySelectorAll('.lockup-img, .core-img').forEach(img => { img.src = LOGO_SRC; });
  };

  probe.onerror = () => {
    document.documentElement.dataset.logo = 'missing';
    console.warn(
      '%c[الهوية البصرية] شعار وزارة التعليم الرسمي غير موجود.',
      'color:#D6BC87;font-weight:700',
      '\nالمطلوب: ضع الملف الرسمي في  ' + LOGO_SRC +
      '\nالمصدر الرسمي: https://www.moe.gov.sa/ar/mediacenter/PhotoLibrary/Pages/moe_identity.aspx' +
      '\nحتى ذلك الحين تُعرض كتابة نصية مؤقتة — لم يُرسم أي شعار بديل.'
    );
  };

  probe.src = LOGO_SRC;
}

/* ───────────────────────────────────────────────────────────────────────────
   05 · NODE CONSTRUCTION
   ─────────────────────────────────────────────────────────────────────────── */
function buildNodes() {
  SECTIONS.forEach(section => {
    const host = SLOTS[section.slot];
    if (!host) return;

    const index    = String(section.id).padStart(2, '0');
    const hasLink  = Boolean(section.url && section.url.trim() && section.url.trim() !== '#');
    const el       = document.createElement(hasLink ? 'a' : 'button');

    el.className = 'node';
    el.dataset.id = section.id;

    if (hasLink) {
      el.href = section.url.trim();
      el.target = '_blank';
      el.rel = 'noopener noreferrer';
    } else {
      el.type = 'button';
      el.setAttribute('aria-disabled', 'true');
    }

    el.setAttribute('aria-label', section.title + ' — القسم رقم ' + section.id);

    el.innerHTML =
      '<span class="node-mark">' + svgIcon(section.icon) + '</span>' +
      '<span class="node-title">' + section.title + '</span>' +
      '<span class="node-foot"><i></i><b>' + index + '</b></span>';

    bindInteraction(el);
    host.appendChild(el);
    nodes.push(el);
  });
}

/* ───────────────────────────────────────────────────────────────────────────
   06 · INTERACTION — touch first, mouse second, keyboard always
   ─────────────────────────────────────────────────────────────────────────── */
function bindInteraction(el) {
  const id   = el.dataset.id;
  const heat = (on) => {
    el.classList.toggle('is-hot', on);
    const line = tethers.querySelector('[data-for="' + id + '"]');
    if (line) line.classList.toggle('is-lit', on);
  };

  // Pointer covers mouse, pen and touch in one path.
  el.addEventListener('pointerenter', () => heat(true));
  el.addEventListener('pointerleave', () => { heat(false); el.classList.remove('is-press'); });
  el.addEventListener('pointerdown',  () => { heat(true); el.classList.add('is-press'); });
  el.addEventListener('pointerup',    () => el.classList.remove('is-press'));
  el.addEventListener('pointercancel',() => { heat(false); el.classList.remove('is-press'); });

  el.addEventListener('focus', () => heat(true));
  el.addEventListener('blur',  () => heat(false));

  el.addEventListener('keydown', onArrowKeys);
}

/* Spatial arrow-key navigation — a wall screen may be driven by a remote. */
function onArrowKeys(event) {
  const KEYS = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];
  if (!KEYS.includes(event.key)) return;
  event.preventDefault();

  const from = event.currentTarget.getBoundingClientRect();
  const fx = from.left + from.width / 2;
  const fy = from.top + from.height / 2;

  let best = null;
  let bestCost = Infinity;

  nodes.forEach(other => {
    if (other === event.currentTarget) return;
    const r = other.getBoundingClientRect();
    const dx = (r.left + r.width / 2) - fx;
    const dy = (r.top + r.height / 2) - fy;

    const along = { ArrowUp: -dy, ArrowDown: dy, ArrowLeft: -dx, ArrowRight: dx }[event.key];
    const off   = (event.key === 'ArrowUp' || event.key === 'ArrowDown') ? Math.abs(dx) : Math.abs(dy);
    if (along <= 4) return;                       // wrong direction

    const cost = along + off * 1.8;               // prefer straight ahead
    if (cost < bestCost) { bestCost = cost; best = other; }
  });

  if (best) best.focus();
}

/* ───────────────────────────────────────────────────────────────────────────
   07 · STAGED ENTRANCE — centre first, then a sweep outward from the core
   ─────────────────────────────────────────────────────────────────────────── */
function revealNodes() {
  const c = centreOf(core);

  const ordered = nodes
    .map(el => {
      const r = el.getBoundingClientRect();
      const angle = Math.atan2((r.top + r.height / 2) - c.y, (r.left + r.width / 2) - c.x);
      // Sweep clockwise beginning at the top of the composition.
      return { el, key: (angle + Math.PI * 2.5) % (Math.PI * 2) };
    })
    .sort((a, b) => a.key - b.key);

  ordered.forEach((item, i) => {
    item.el.style.setProperty('--seq', i);
    item.el.classList.add('is-in');
  });
}

/* ───────────────────────────────────────────────────────────────────────────
   08 · TETHERS
   Geometry is derived from the live DOM, so a connector always leaves the
   core and lands on the true edge of its node. They render beneath the
   nodes and fade with distance, so they never compete with a title.
   ─────────────────────────────────────────────────────────────────────────── */
function layoutTethers() {
  if (!stage || !tethers) return;

  const box = stage.getBoundingClientRect();
  if (!box.width || !box.height) return;

  tethers.setAttribute('viewBox', '0 0 ' + box.width + ' ' + box.height);

  const coreBox = core.getBoundingClientRect();
  const cx = coreBox.left + coreBox.width / 2 - box.left;
  const cy = coreBox.top + coreBox.height / 2 - box.top;

  // Feed the real core centre back to the ambient field and the tether mask.
  const root = document.documentElement.style;
  root.setProperty('--cx', fmt((coreBox.left + coreBox.width / 2) / window.innerWidth * 100) + '%');
  root.setProperty('--cy', fmt((coreBox.top + coreBox.height / 2) / window.innerHeight * 100) + '%');
  tethers.style.setProperty('--cx', cx + 'px');
  tethers.style.setProperty('--cy', cy + 'px');

  const frag = document.createDocumentFragment();
  const coreR = { w: coreBox.width / 2 * 0.86, h: coreBox.height / 2 * 0.86 };

  nodes.forEach((el, i) => {
    const r = el.getBoundingClientRect();
    const nx = r.left + r.width / 2 - box.left;
    const ny = r.top + r.height / 2 - box.top;

    const start = edgePoint(cx, cy, coreR.w, coreR.h, nx - cx, ny - cy);
    const land  = edgePoint(nx, ny, r.width / 2, r.height / 2, cx - nx, cy - ny);

    // Stop a little short of the panel so the line reads as a tether, not a leash.
    const end = {
      x: start.x + (land.x - start.x) * 0.9,
      y: start.y + (land.y - start.y) * 0.9
    };

    // Gentle perpendicular bow — keeps the field organic rather than mechanical.
    const mx = (start.x + end.x) / 2;
    const my = (start.y + end.y) / 2;
    const dx = end.x - start.x;
    const dy = end.y - start.y;
    const len = Math.hypot(dx, dy) || 1;
    const bow = len * 0.035 * (i % 2 ? 1 : -1);
    const qx = mx + (-dy / len) * bow;
    const qy = my + ( dx / len) * bow;

    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', 'M' + fmt(start.x) + ' ' + fmt(start.y) +
                           ' Q' + fmt(qx) + ' ' + fmt(qy) +
                           ' ' + fmt(end.x) + ' ' + fmt(end.y));
    path.setAttribute('class', 'tether' + (firstPaint ? ' tether--anim' : ''));
    path.setAttribute('data-for', el.dataset.id);
    path.style.setProperty('--len', Math.round(len * 1.1));
    path.style.setProperty('--seq', i);

    frag.appendChild(path);
  });

  tethers.replaceChildren(frag);
  firstPaint = false;
}

/* Intersection of a ray from a box centre with that box edge. */
function edgePoint(cx, cy, halfW, halfH, dirX, dirY) {
  const ax = Math.abs(dirX) || 1e-6;
  const ay = Math.abs(dirY) || 1e-6;
  const scale = Math.min(halfW / ax, halfH / ay);
  return { x: cx + dirX * scale, y: cy + dirY * scale };
}

/* ───────────────────────────────────────────────────────────────────────────
   09 · UTILITIES
   ─────────────────────────────────────────────────────────────────────────── */
function centreOf(el) {
  const r = el.getBoundingClientRect();
  return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
}

function fmt(n) { return Math.round(n * 10) / 10; }

function debounce(fn, wait) {
  let t;
  return function () {
    clearTimeout(t);
    t = setTimeout(fn, wait);
  };
}
