/* ═══════════════════════════════════════════════════════════════════════════
   منظومة العمل المدرسي — وزارة التعليم
   Interactive school information system · Home view + Sections view
   ═══════════════════════════════════════════════════════════════════════════ */

'use strict';

/* ───────────────────────────────────────────────────────────────────────────
   01 · CONTENT  —  المكان الوحيد الذي يُعدَّل لإضافة الروابط
   ضع رابط Google Drive في حقل url. القيمة null تعني أن الرابط لم يُضف بعد.
   الترتيب هنا هو ترتيب العرض: الأقسام 1–10 في الجناح الأول، و11–20 في الثاني.
   ─────────────────────────────────────────────────────────────────────────── */
const SECTIONS = [
  { id: 'external-evaluation', title: 'التقويم المدرسي الخارجي',                   icon: 'calendar',    url: null },
  { id: 'operational-plan',    title: 'الخطة التشغيلية',                            icon: 'plan',        url: null },
  { id: 'improvement-plan',    title: 'الخطة التحسينية لمجالات النموذج الإشرافي',   icon: 'improve',     url: null },
  { id: 'compliance',          title: 'معايير الالتزام والامتثال',                  icon: 'compliance',  url: null },
  { id: 'madrasati',           title: 'منصة مدرستي',                                icon: 'platform',    url: null },
  { id: 'school-admin',        title: 'الإدارة المدرسية',                           icon: 'school',      url: null },
  { id: 'student-activity',    title: 'النشاط الطلابي',                             icon: 'activity',    url: null },
  { id: 'student-guidance',    title: 'التوجيه الطلابي',                            icon: 'guidance',    url: null },
  { id: 'teachers',            title: 'المعلمون',                                   icon: 'teacher',     url: null },
  { id: 'nafes',               title: 'خطط واختبارات نافس',                        icon: 'assessment',  url: null },
  { id: 'qudurat-tahsili',     title: 'خطط واختبارات القدرات والتحصيلي',           icon: 'aptitude',    url: null },
  { id: 'professional-dev',    title: 'التطوير المهني',                             icon: 'growth',      url: null },
  { id: 'students',            title: 'الطلاب',                                     icon: 'students',    url: null },
  { id: 'unified-support',     title: 'الدعم الموحد',                               icon: 'support',     url: null },
  { id: 'performance-tasks',   title: 'المهام الأدائية المتنوعة',                   icon: 'tasks',       url: null },
  { id: 'gifted',              title: 'الموهوبين',                                  icon: 'gifted',      url: null },
  { id: 'job-performance',     title: 'الأداء الوظيفي',                             icon: 'performance', url: null },
  { id: 'learning-loss',       title: 'الفاقد التعليمي',                            icon: 'recovery',    url: null },
  { id: 'publications',        title: 'منشورات',                                    icon: 'publication', url: null },
  { id: 'health-guide',        title: 'الموجه الصحي',                               icon: 'health',      url: null }
];

/* ───────────────────────────────────────────────────────────────────────────
   02 · ICON SYSTEM
   One visual language: 24 grid, stroke only, uniform weight and density.
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
    '<path d="M21.5 8.9v5.6"/>',

  /* ── additions (14–20) — same grid, weight and density ── */
  support:
    '<path d="M4.4 13.2v-1.4a7.6 7.6 0 0 1 15.2 0v1.4"/>' +
    '<rect x="2.8" y="12.4" width="4.2" height="6.2" rx="1.7"/>' +
    '<rect x="17" y="12.4" width="4.2" height="6.2" rx="1.7"/>' +
    '<path d="M19.1 18.6v.3a2.7 2.7 0 0 1-2.7 2.7h-2.6"/>' +
    '<path d="M11.2 21.6h2.6"/>',

  tasks:
    '<rect x="3.8" y="2.8" width="16.4" height="18.6" rx="2.2"/>' +
    '<path d="m7.2 8 1.4 1.4 2.4-2.6"/><path d="M13.6 8.2h3.4"/>' +
    '<path d="m7.2 13.2 1.4 1.4 2.4-2.6"/><path d="M13.6 13.4h3.4"/>' +
    '<path d="M7.4 18h9.6"/>',

  gifted:
    '<path d="m11 5.2 2.2 4.5 4.9.7-3.6 3.5.9 4.9-4.4-2.3-4.4 2.3.9-4.9-3.6-3.5 4.9-.7L11 5.2Z"/>' +
    '<path d="M19.2 2.8v3.4M17.5 4.5h3.4"/>' +
    '<path d="M19.4 16.4v2.4M18.2 17.6h2.4"/>',

  performance:
    '<path d="M3.8 17a8.2 8.2 0 1 1 16.4 0"/>' +
    '<path d="m12 17 4-4.8"/>' +
    '<circle cx="12" cy="17" r="1.5"/>' +
    '<path d="M3.2 20.8h17.6"/>' +
    '<path d="M6.3 11.2l1 .9M12 8.8v1.4M17.7 11.2l-1 .9"/>',

  recovery:
    '<path d="M12 21c-2-1.3-4.6-1.8-8.4-1.6v-8.8c3.8-.2 6.4.3 8.4 1.6 2-1.3 4.6-1.8 8.4-1.6v8.8c-3.8-.2-6.4.3-8.4 1.6Z"/>' +
    '<path d="M12 12.2V21"/>' +
    '<path d="M8.4 6.6a4.4 4.4 0 0 1 7.4-1.2"/>' +
    '<path d="M16.2 2.6v3h-3"/>',

  publication:
    '<path d="M4 4.4h12.2v14.4a2.2 2.2 0 0 0 2.2 2.2H6.2A2.2 2.2 0 0 1 4 18.8V4.4Z"/>' +
    '<path d="M16.2 8.6h3.8v10.2a2.2 2.2 0 0 1-2.2 2.2"/>' +
    '<rect x="7" y="7.6" width="6.2" height="4.4" rx=".7"/>' +
    '<path d="M7 15.1h6.2M7 17.9h4"/>',

  health:
    '<path d="M12 20.4s-8.6-5-8.6-11.2A4.7 4.7 0 0 1 12 6.6a4.7 4.7 0 0 1 8.6 2.6c0 6.2-8.6 11.2-8.6 11.2Z"/>' +
    '<path d="M6.8 12.4h2.6l1.4-2.4 2.2 4.6 1.4-2.2h2.9"/>'
};

const svgIcon = (name) =>
  '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">' + (ICONS[name] || '') + '</svg>';

const SVG_NS = 'http://www.w3.org/2000/svg';
const pad2   = (n) => String(n).padStart(2, '0');
const WING_SIZE = 10;

/* ───────────────────────────────────────────────────────────────────────────
   03 · BOOT
   ─────────────────────────────────────────────────────────────────────────── */
const $ = (id) => document.getElementById(id);

const views   = { home: $('viewHome'), sections: $('viewSections') };
const stage   = $('stage');
const core    = $('core');
const tethers = $('tethers');
const toast   = $('toast');
const wings   = [$('wingA'), $('wingB')];

let nodes = [];
let current = null;
let toastTimer;
let keyboardIntent = false;

checkLogo();
buildOrbit();
buildNodes();
bindRouting();

window.addEventListener('keydown', () => { keyboardIntent = true; }, true);
window.addEventListener('pointerdown', () => { keyboardIntent = false; }, true);

/* Re-measure once webfonts land — Arabic metrics shift line counts. */
if (document.fonts && document.fonts.ready) document.fonts.ready.then(layoutTethers);
if ('ResizeObserver' in window) new ResizeObserver(debounce(layoutTethers, 80)).observe(stage);
else window.addEventListener('resize', debounce(layoutTethers, 120));

/* ───────────────────────────────────────────────────────────────────────────
   04 · OFFICIAL LOGO
   The supplied Ministry artwork is used as-is (never redrawn, never recoloured).
   It sits on a pure white plate, which is the background it was issued on.
   ─────────────────────────────────────────────────────────────────────────── */
function checkLogo() {
  document.querySelectorAll('img.logo').forEach(img => {
    const fail = () => {
      img.closest('.ident-plate, .core-plate')?.classList.add('is-missing');
      console.error('[الهوية البصرية] تعذّر تحميل شعار وزارة التعليم: ' + img.getAttribute('src'));
    };
    if (img.complete && img.naturalWidth === 0) fail();
    else img.addEventListener('error', fail, { once: true });
  });
}

/* ───────────────────────────────────────────────────────────────────────────
   05 · ROUTING — lightweight hash views: #/ (home) · #/sections
   ─────────────────────────────────────────────────────────────────────────── */
function bindRouting() {
  $('enter').addEventListener('click', () => navigate('sections'));
  $('visual').addEventListener('click', () => navigate('sections'));
  $('goHome').addEventListener('click', () => navigate('home'));

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && current === 'sections') navigate('home');
  });

  window.addEventListener('hashchange', () => show(routeFromHash()));
  show(routeFromHash(), true);
}

function routeFromHash() {
  return location.hash.replace(/^#\/?/, '') === 'sections' ? 'sections' : 'home';
}

function navigate(name) {
  const hash = name === 'sections' ? '#/sections' : '#/';
  if (location.hash === hash) show(name);
  else location.hash = hash;
}

function show(name, initial) {
  if (name === current) return;
  const prev = current;
  current = name;

  Object.entries(views).forEach(([key, el]) => {
    const on = key === name;
    el.classList.toggle('is-active', on);
    el.inert = !on;
    el.setAttribute('aria-hidden', String(!on));
  });

  document.documentElement.dataset.view = name;

  // Restart the staged entrance every time a view is entered.
  const view = views[name];
  view.classList.remove('is-entering');
  void view.offsetWidth;
  view.classList.add('is-entering');
  clearTimeout(view._settle);
  view._settle = setTimeout(() => view.classList.remove('is-entering'), 2800);

  if (name === 'sections') {
    layoutTethers();
    revealNodes();
  } else {
    hideToast();
  }
  syncGlow();

  if (!initial && prev) {
    const target = name === 'sections'
      ? (keyboardIntent ? nodes[0] : $('goHome'))
      : $('enter');
    target.focus({ preventScroll: true });
  }
}

/* ───────────────────────────────────────────────────────────────────────────
   06 · HOME ORBIT — 20 medallions on one ring, drawn from SECTIONS
   Positions are percentages of the orbit box, so the visual scales without JS.
   ─────────────────────────────────────────────────────────────────────────── */
function buildOrbit() {
  const orbit = $('orbit');
  const lines = $('orbitLines');
  const count = SECTIONS.length;
  const R = 0.405;          // medallion ring radius (fraction of orbit size)

  $('orbitCount').textContent = String(count);

  let svg =
    '<circle class="ol-ring ol-ring--outer" cx="500" cy="500" r="492"/>' +
    '<circle class="ol-ring ol-ring--track" cx="500" cy="500" r="' + R * 1000 + '"/>' +
    '<circle class="ol-ring ol-ring--inner" cx="500" cy="500" r="262"/>';

  for (let t = 0; t < 80; t++) {
    const a = (t / 80) * Math.PI * 2;
    const long = t % 4 === 0;
    const r0 = long ? 470 : 478;
    svg += '<line class="ol-tick' + (long ? ' ol-tick--long' : '') + '"' +
      ' x1="' + fmt(500 + Math.cos(a) * r0) + '" y1="' + fmt(500 + Math.sin(a) * r0) + '"' +
      ' x2="' + fmt(500 + Math.cos(a) * 486) + '" y2="' + fmt(500 + Math.sin(a) * 486) + '"/>';
  }

  SECTIONS.forEach((s, i) => {
    // Start at 12 o'clock and run counter-clockwise — the reading direction of RTL.
    const a = -Math.PI / 2 - (i / count) * Math.PI * 2;
    const x = 0.5 + Math.cos(a) * R;
    const y = 0.5 + Math.sin(a) * R;

    svg += '<line class="ol-spoke" style="--seq:' + i + '"' +
      ' x1="' + fmt(500 + Math.cos(a) * 270) + '" y1="' + fmt(500 + Math.sin(a) * 270) + '"' +
      ' x2="' + fmt(500 + Math.cos(a) * (R * 1000 - 50)) + '" y2="' + fmt(500 + Math.sin(a) * (R * 1000 - 50)) + '"/>';

    const m = document.createElement('span');
    m.className = 'orbit-node';
    m.style.left = fmt(x * 100) + '%';
    m.style.top  = fmt(y * 100) + '%';
    m.style.setProperty('--seq', i);
    m.innerHTML = svgIcon(s.icon);
    orbit.appendChild(m);
  });

  lines.innerHTML = svg;
}

/* ───────────────────────────────────────────────────────────────────────────
   07 · NODE CONSTRUCTION
   ─────────────────────────────────────────────────────────────────────────── */
function buildNodes() {
  const ids = new Set();

  SECTIONS.forEach((section, i) => {
    if (ids.has(section.id)) console.error('[المحتوى] معرّف قسم مكرر: ' + section.id);
    ids.add(section.id);

    const url     = typeof section.url === 'string' ? section.url.trim() : '';
    const hasLink = /^https?:\/\//i.test(url);
    const el      = document.createElement(hasLink ? 'a' : 'button');
    const no      = pad2(i + 1);

    el.className = 'node';
    el.id = 'node-' + section.id;
    el.dataset.id = section.id;
    el.dataset.no = no;

    if (hasLink) {
      el.href = url;
      el.target = '_blank';
      el.rel = 'noopener noreferrer';
    } else {
      el.type = 'button';
      el.dataset.pending = 'true';
      el.addEventListener('click', () => showToast(section.title));
    }

    el.setAttribute('aria-label', section.title + ' — القسم ' + (i + 1));

    el.innerHTML =
      '<span class="node-mark">' + svgIcon(section.icon) + '</span>' +
      '<span class="node-no" aria-hidden="true">' + no + '</span>' +
      '<span class="node-title">' + section.title + '</span>';

    bindInteraction(el);
    wings[i < WING_SIZE ? 0 : 1].appendChild(el);
    nodes.push(el);
  });
}

/* ───────────────────────────────────────────────────────────────────────────
   08 · INTERACTION — touch first, mouse second, keyboard always
   ─────────────────────────────────────────────────────────────────────────── */
function bindInteraction(el) {
  const heat = (on) => {
    el.classList.toggle('is-hot', on);
    (el._paths || []).forEach(p => p.classList.toggle('is-lit', on));
  };

  el.addEventListener('pointerenter', (e) => { if (e.pointerType === 'mouse') heat(true); });
  el.addEventListener('pointerleave', () => { if (document.activeElement !== el) heat(false); el.classList.remove('is-press'); });
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
    if (along <= 4) return;

    const cost = along + off * 1.8;
    if (cost < bestCost) { bestCost = cost; best = other; }
  });

  if (best) best.focus();
}

/* A section without a link yet: acknowledge the touch, never navigate. */
function showToast(title) {
  toast.innerHTML = '<b>' + title + '</b><span>لم يُضف رابط هذا القسم بعد</span>';
  toast.classList.add('is-on');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(hideToast, 2800);
}
function hideToast() {
  clearTimeout(toastTimer);
  toast.classList.remove('is-on');
}

/* ───────────────────────────────────────────────────────────────────────────
   09 · STAGED ENTRANCE — core first, then outward
   ─────────────────────────────────────────────────────────────────────────── */
function revealNodes() {
  const c = centreOf(core);
  nodes
    .map(el => {
      const r = el.getBoundingClientRect();
      return { el, d: Math.hypot(r.left + r.width / 2 - c.x, r.top + r.height / 2 - c.y) };
    })
    .sort((a, b) => a.d - b.d)
    .forEach((item, i) => item.el.style.setProperty('--seq', i));
}

/* ───────────────────────────────────────────────────────────────────────────
   10 · TETHERS
   Geometry comes from the live DOM, and every line runs through open space:
     wings layout  — core → inner panel, then a short bridge inner → outer
     stack layout  — a spine through the central channel, with a stub per panel
   Lines render beneath the panels and never cross a title.
   ─────────────────────────────────────────────────────────────────────────── */
function layoutTethers() {
  if (current !== 'sections') return;

  const W = stage.clientWidth, H = stage.clientHeight;
  if (!W || !H) return;

  tethers.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
  const mode = getComputedStyle(stage).getPropertyValue('--mode').trim() || 'wings';
  const frag = document.createDocumentFragment();

  // Resting rects relative to the stage. Built from layout offsets, so view
  // transitions, entrance motion and hover lift never distort the geometry;
  // only the static arc offset (CSS translate on X) is added back.
  const rel = (el) => {
    let l = 0, t = 0;
    for (let n = el; n && n !== stage; n = n.offsetParent) { l += n.offsetLeft; t += n.offsetTop; }
    l += parseFloat(getComputedStyle(el).translate) || 0;
    const w = el.offsetWidth, h = el.offsetHeight;
    return { l, t, w, h, cx: l + w / 2, cy: t + h / 2 };
  };

  const coreEl = core.querySelector('.core-body');
  const C = rel(coreEl);
  nodes.forEach(el => { el._paths = []; });

  const add = (d, cls, owners, seq) => {
    const p = document.createElementNS(SVG_NS, 'path');
    p.setAttribute('d', d);
    p.setAttribute('class', cls);
    p.style.setProperty('--seq', seq);
    owners.forEach(o => o._paths.push(p));
    frag.appendChild(p);
    return p;
  };
  const dot = (x, y, owners, seq) => {
    const c = document.createElementNS(SVG_NS, 'circle');
    c.setAttribute('cx', fmt(x)); c.setAttribute('cy', fmt(y)); c.setAttribute('r', 3);
    c.setAttribute('class', 'port');
    c.style.setProperty('--seq', seq);
    owners.forEach(o => o._paths.push(c));
    frag.appendChild(c);
  };

  if (mode === 'stack') {
    const spineX = C.cx;
    wings.forEach((wing, w) => {
      const members = Array.from(wing.children);
      const rows = [];
      for (let i = 0; i < members.length; i += 2) rows.push(members.slice(i, i + 2));
      // Order rows from the core outward.
      const ordered = w === 0 ? rows.slice().reverse() : rows;
      let fromY = w === 0 ? C.t : C.t + C.h;
      ordered.forEach((pair, k) => {
        const rects = pair.map(rel);
        const y = rects[0].cy;
        // A spine segment leads to this row and every row beyond it.
        const beyond = ordered.slice(k).flat();
        add('M' + fmt(spineX) + ' ' + fmt(fromY) + ' L' + fmt(spineX) + ' ' + fmt(y),
            'tether', beyond, k);
        pair.forEach((el, j) => {
          const r = rects[j];
          const edge = r.cx < spineX ? r.l + r.w : r.l;
          const x = edge + (r.cx < spineX ? 4 : -4);
          add('M' + fmt(spineX) + ' ' + fmt(y) + ' L' + fmt(x) + ' ' + fmt(y), 'tether tether--stub', [el], k);
        });
        dot(spineX, y, pair, k);
        fromY = y;
      });
    });
  } else {
    wings.forEach((wing) => {
      const members = Array.from(wing.children);
      for (let i = 0; i < members.length; i += 2) {
        const pair = members.slice(i, i + 2);
        const rects = pair.map(rel);
        // Inner = the panel closer to the core horizontally.
        const innerIdx = Math.abs(rects[0].cx - C.cx) < Math.abs(rects[1].cx - C.cx) ? 0 : 1;
        const inner = pair[innerIdx], outer = pair[1 - innerIdx];
        const I = rects[innerIdx], O = rects[1 - innerIdx];
        const row = i / 2;

        const sgn = I.cx > C.cx ? 1 : -1;                    // physical side of the wing
        const xe  = sgn > 0 ? C.l + C.w : C.l;                // core edge facing the wing
        const xt  = sgn > 0 ? I.l - 5 : I.l + I.w + 5;        // panel edge facing the core
        const y   = I.cy;
        let d;

        if (y > C.t + 6 && y < C.t + C.h - 6) {
          // Level with the core: a straight run across the gap, starting on
          // the true edge even where the core's corner is rounded.
          const rc = parseFloat(getComputedStyle(coreEl).borderBottomLeftRadius) || 0;
          const dyEdge = Math.min(y - C.t, C.t + C.h - y);
          const inset = dyEdge < rc ? rc - Math.sqrt(rc * rc - (rc - dyEdge) * (rc - dyEdge)) : 0;
          d = 'M' + fmt(xe - sgn * inset) + ' ' + fmt(y) + ' L' + fmt(xt) + ' ' + fmt(y);
        } else {
          // Above or below the core: leave through its top/bottom face and
          // turn into the row along a soft elbow, entirely in open space.
          const above = y < C.cy;
          const ys = above ? C.t : C.t + C.h;
          const inset = Math.min(C.w * 0.2, Math.max(28, C.w * 0.12));
          const xv = sgn > 0 ? Math.min(xe - inset, xt - 36) : Math.max(xe + inset, xt + 36);
          const rad = Math.max(8, Math.min(Math.abs(xt - xv) - 6, Math.abs(y - ys) * 0.7, 90));
          const yc = y + (above ? rad : -rad);
          d = 'M' + fmt(xv) + ' ' + fmt(ys) + ' L' + fmt(xv) + ' ' + fmt(yc) +
              ' Q' + fmt(xv) + ' ' + fmt(y) + ' ' + fmt(xv + sgn * rad) + ' ' + fmt(y) +
              ' L' + fmt(xt) + ' ' + fmt(y);
          dot(xv, ys, [inner, outer], row);
        }

        add(d, 'tether', [inner, outer], row);
        dot(xt, y, [inner, outer], row);

        // Bridge through the column gap to the outer panel.
        const x1 = O.cx < I.cx ? I.l - 5 : I.l + I.w + 5;
        const x2 = O.cx < I.cx ? O.l + O.w + 5 : O.l - 5;
        add('M' + fmt(x1) + ' ' + fmt(y) + ' L' + fmt(x2) + ' ' + fmt(y), 'tether tether--bridge', [outer], row + 0.5);
        dot(x2, y, [outer], row + 0.5);
      }
    });
  }

  tethers.replaceChildren(frag);
  tethers.querySelectorAll('path').forEach(p => p.style.setProperty('--len', Math.ceil(p.getTotalLength()) + 2));
  nodes.forEach(el => { if (el.classList.contains('is-hot')) el._paths.forEach(p => p.classList.add('is-lit')); });
}

/* ───────────────────────────────────────────────────────────────────────────
   11 · AMBIENT FIELD — glow follows the focal point of the active view
   ─────────────────────────────────────────────────────────────────────────── */
function syncGlow() {
  const focal = current === 'sections' ? core.querySelector('.core-body') : $('orbit');
  const c = centreOf(focal);
  if (!c.x && !c.y) return;
  const root = document.documentElement.style;
  root.setProperty('--gx', fmt(c.x / window.innerWidth * 100) + '%');
  root.setProperty('--gy', fmt(c.y / window.innerHeight * 100) + '%');
}
window.addEventListener('resize', debounce(syncGlow, 120));

/* ───────────────────────────────────────────────────────────────────────────
   12 · UTILITIES
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
