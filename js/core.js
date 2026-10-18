let TRX = null; const TRC = new Map(), ARL = /[؀-ۿ]/, TRB = { 'ج': 1, ' ج': 1, ' ث': 1 };
function tr(s) {   // English: every Arabic piece of a text is a string from this file, so each piece is swapped for its translation
  if (!ENG || typeof s !== 'string' || !ARL.test(s)) return s;
  let r = TRC.get(s); if (r !== undefined) return r;
  if (!TRX) TRX = Object.keys(EN_DICT).sort((a, b) => b.length - a.length).map(k => [k, TRB[k] ? new RegExp(k + '(?![\\u0621-\\u064A])', 'g') : null]);
  r = s; for (const [k, rx] of TRX) if (r.includes(k)) r = rx ? r.replace(rx, () => EN_DICT[k]) : r.split(k).join(EN_DICT[k]);   // longest pieces first, anywhere in the text
  r = r.replace(/[٠-٩]/g, d => '٠١٢٣٤٥٦٧٨٩'.indexOf(d)).replace(/٪/g, '%').replace(/direction:rtl/g, 'direction:ltr');
  if (TRC.size > 3000) TRC.clear(); TRC.set(s, r); return r;
}
const rnd = (a, b) => a + Math.random() * (b - a);
const pick = a => a[Math.floor(Math.random() * a.length)];
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const lerp = (a, b, k) => a + (b - a) * k;
const easeBack = x => 1 + 2.70158 * Math.pow(x - 1, 3) + 1.70158 * Math.pow(x - 1, 2);
const easeOut = x => 1 - Math.pow(1 - x, 3);
const pop = (t, d = 0.35) => t < d ? easeBack(t / d) : 1;
const hash = a => { const x = Math.sin(a * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };
const buzz = ms => { try { navigator.vibrate && navigator.vibrate(ms); } catch (e) { } };

// ---------- layout (landscape; rotated on portrait screens) ----------
let bgDirty = true, QL = 0;
const QS = [1, 0.85, 0.7];   // render-resolution steps for slower devices
function resize() {
  const wrap = document.getElementById('wrap'), cs = getComputedStyle(wrap), r = wrap.getBoundingClientRect();
  const iw = r.width - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight), ih = r.height - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom);
  ROT = ih > iw * 1.05;
  SC = ROT ? Math.min(ih / W, iw / H) : Math.min(iw / W, ih / H);
  DPR = Math.max(0.75, Math.min(2, window.devicePixelRatio || 1) * QS[QL]);
  cv.style.width = W * SC + 'px'; cv.style.height = H * SC + 'px';
  cv.style.transform = 'translate(-50%,-50%)' + (ROT ? ' rotate(90deg)' : '');
  cv.width = Math.round(W * SC * DPR); cv.height = Math.round(H * SC * DPR);
  bgDirty = true; pfHold = performance.now() + 3000;   // redrawing the caches is slow for a moment, so don't judge the frame rate then
}
let pfHold = 0;
addEventListener('resize', resize); resize();
if (document.fonts) document.fonts.ready.then(() => bgDirty = true);
const CT = 300;                                   // counter top line
const SLOTX = [760, 590, 420, 250];               // customers, right to left
const CLIPX = [132, 862];                         // street area between tile wall and kiosk
const AHX = 912, AHY = CT + 4;                    // Abu Hasiba's chair by the kiosk

// ---------- colour + hand-drawn ink helpers ----------
const _sc = {};
function shade(h, a) {
  const k = h + a; if (_sc[k]) return _sc[k];
  let s = h.replace('#', ''); if (s.length === 3) s = s.split('').map(c => c + c).join('');
  const n = parseInt(s, 16), r = n >> 16 & 255, g = n >> 8 & 255, b = n & 255, f = a < 0 ? 0 : 255, p = Math.abs(a);
  return _sc[k] = '#' + [r, g, b].map(v => Math.round(v + (f - v) * p).toString(16).padStart(2, '0')).join('');
}
function ellP(x, y, rx, ry, rot = 0, seed = 0, j = 0.03) {
  const p = new Path2D(), n = 30;
  for (let i = 0; i <= n; i++) {
    const a = i / n * Math.PI * 2, k = 1 + (hash(seed * 13.7 + (i % n)) - 0.5) * 2 * j;
    const px = Math.cos(a) * rx * k, py = Math.sin(a) * ry * k;
    const X = x + px * Math.cos(rot) - py * Math.sin(rot), Y = y + px * Math.sin(rot) + py * Math.cos(rot);
    i ? p.lineTo(X, Y) : p.moveTo(X, Y);
  }
  p.closePath(); return p;
}
function blobP(pts) {
  const p = new Path2D(), n = pts.length, mid = (a, b) => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
  const m = mid(pts[n - 1], pts[0]); p.moveTo(m[0], m[1]);
  for (let i = 0; i < n; i++) { const a = pts[i], mm = mid(a, pts[(i + 1) % n]); p.quadraticCurveTo(a[0], a[1], mm[0], mm[1]); }
  p.closePath(); return p;
}
function polyP(pts) { const p = new Path2D(); pts.forEach((q, i) => i ? p.lineTo(q[0], q[1]) : p.moveTo(q[0], q[1])); p.closePath(); return p; }
let VOL = false;   // volumetric (3D) shading, used for food, machines and props
function ink(p, c, o = {}) {
  const hex = typeof c === 'string' && c[0] === '#', [bx, by, br] = o.b || [0, 0, 60];
  const vol = hex && o.shade !== false && (o.v ?? VOL);
  if (vol) { const g = ctx.createRadialGradient(bx - br * 0.45, by - br * 0.55, br * 0.04, bx - br * 0.15, by - br * 0.15, br * 1.5); g.addColorStop(0, shade(c, 0.42)); g.addColorStop(0.42, c); g.addColorStop(1, shade(c, -0.34)); ctx.fillStyle = g; }
  else ctx.fillStyle = c;
  ctx.fill(p);
  if (o.shade !== false && hex) {
    ctx.save(); ctx.clip(p);
    ctx.fillStyle = shade(c, -(o.sd ?? 0.22) * (vol ? 0.55 : 1)); ctx.beginPath(); ctx.ellipse(bx + br * 0.62, by + br * 0.58, br * 1.05, br * 0.95, 0, 0, Math.PI * 2); ctx.fill();
    const hl = Math.min(0.75, (o.hl ?? 0.22) * (vol ? 1.6 : 1));
    if (hl) { ctx.fillStyle = `rgba(255,255,255,${hl})`; ctx.beginPath(); ctx.ellipse(bx - br * 0.38, by - br * 0.44, br * 0.34, br * 0.2, -0.5, 0, Math.PI * 2); ctx.fill(); if (vol) dot(bx - br * 0.52, by - br * 0.5, Math.max(1, br * 0.07), 'rgba(255,255,255,.85)'); }
    ctx.restore();
  }
  if (o.ol !== false) {
    ctx.lineJoin = 'round'; ctx.lineCap = 'round'; ctx.lineWidth = o.lw || 3.6; ctx.strokeStyle = OLC; ctx.stroke(p);
    ctx.save(); ctx.translate(1.3, -0.9); ctx.globalAlpha *= 0.35; ctx.lineWidth = 1.1; ctx.stroke(p); ctx.restore();
  }
}
function E(x, y, rx, ry, c, o = {}) { ink(ellP(x, y, rx, ry, o.rot || 0, o.seed ?? (x * 0.7 + y * 0.37 + rx * 0.11), o.j ?? 0.03), c, Object.assign({ b: [x, y, Math.max(rx, ry)] }, o)); }
function bbox(pts) { let cx = 0, cy = 0, r = 0; pts.forEach(q => { cx += q[0]; cy += q[1]; }); cx /= pts.length; cy /= pts.length; pts.forEach(q => r = Math.max(r, Math.hypot(q[0] - cx, q[1] - cy))); return [cx, cy, r * 0.8]; }
function B(pts, c, o = {}) { ink(blobP(pts), c, Object.assign({ b: bbox(pts) }, o)); }
function PL(pts, c, o = {}) { ink(polyP(pts), c, Object.assign({ b: bbox(pts) }, o)); }
function RRp(x, y, w, h, r) { const p = new Path2D(); r = Math.min(r, w / 2, h / 2); p.moveTo(x + r, y); p.arcTo(x + w, y, x + w, y + h, r); p.arcTo(x + w, y + h, x, y + h, r); p.arcTo(x, y + h, x, y, r); p.arcTo(x, y, x + w, y, r); p.closePath(); return p; }
function R(x, y, w, h, r, c, o = {}) { ink(RRp(x, y, w, h, r), c, Object.assign({ b: [x + w / 2, y + h / 2, Math.max(w, h) / 2] }, o)); }
function L(pts, w = 3, c = OLC, a = 1) { ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); pts.forEach((q, i) => i ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1])); ctx.lineWidth = w; ctx.strokeStyle = c; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.stroke(); ctx.restore(); }
function Q(x1, y1, cx, cy, x2, y2, w = 3, c = OLC, a = 1) { ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.moveTo(x1, y1); ctx.quadraticCurveTo(cx, cy, x2, y2); ctx.lineWidth = w; ctx.strokeStyle = c; ctx.lineCap = 'round'; ctx.stroke(); ctx.restore(); }
function dot(x, y, r, c) { ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fillStyle = c; ctx.fill(); }
const GLW = {};
function glow(x, y, r, c, a = 0.5) {
  let g = GLW[c]; if (!g) { g = GLW[c] = document.createElement('canvas'); g.width = g.height = 64; const gx = g.getContext('2d'), gr = gx.createRadialGradient(32, 32, 0.5, 32, 32, 32); gr.addColorStop(0, c); gr.addColorStop(1, 'rgba(0,0,0,0)'); gx.fillStyle = gr; gx.fillRect(0, 0, 64, 64); }
  const o = ctx.globalAlpha; ctx.globalAlpha = o * a; ctx.drawImage(g, x - r, y - r, r * 2, r * 2); ctx.globalAlpha = o;
}
// ---------- render caches: draw a thing once into its own canvas, then just blit it ----------
function makeLayer() { const c = document.createElement('canvas'); return { cv: c, cx: c.getContext('2d'), sig: null, px: 0 }; }
function sprite(Lr, sig, bx, by, bw, bh, draw, px = SC * DPR) {
  if (Lr.sig !== sig || Lr.px !== px) {
    const cw = Math.max(1, Math.ceil(bw * px)), chh = Math.max(1, Math.ceil(bh * px));
    if (Lr.cv.width !== cw || Lr.cv.height !== chh) { Lr.cv.width = cw; Lr.cv.height = chh; } else { Lr.cx.setTransform(1, 0, 0, 1, 0, 0); Lr.cx.clearRect(0, 0, cw, chh); }
    Lr.cx.setTransform(px, 0, 0, px, -bx * px, -by * px); withCtx(Lr.cx, draw); Lr.sig = sig; Lr.px = px;
  }
  ctx.drawImage(Lr.cv, bx, by, bw, bh);
}
const SL = {}, sl = k => SL[k] || (SL[k] = makeLayer());
let ANI = 1;   // redraw-rate multiplier for cached animations, lowered on slow devices
const tb = (f, ph = 0) => Math.floor(G.t * f * ANI + ph);
function T(s, x, y, size, color, font = FB, align = 'center', stroke = 0, sc = OLC) {
  s = tr(s); ctx.font = (font === FB ? '800 ' : '') + size + 'px ' + font; ctx.textAlign = align; ctx.textBaseline = 'middle'; ctx.direction = ENG ? 'ltr' : 'rtl';
  if (stroke) { ctx.lineWidth = stroke; ctx.strokeStyle = sc; ctx.lineJoin = 'round'; ctx.strokeText(s, x, y); }
  ctx.fillStyle = color; ctx.fillText(s, x, y);
}
function fit(s, maxW, size, font = FB) { ctx.font = (font === FB ? '800 ' : '') + size + 'px ' + font; const w = ctx.measureText(tr(s)).width; return w > maxW ? Math.floor(size * maxW / w) : size; }
function star(x, y, r, c, ol = OLC) { ctx.beginPath(); for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5, rr = i % 2 ? r * 0.45 : r; ctx.lineTo(x + Math.cos(a) * rr, y + Math.sin(a) * rr); } ctx.closePath(); ctx.fillStyle = c; ctx.fill(); ctx.lineWidth = Math.max(1.5, r * 0.16); ctx.strokeStyle = ol; ctx.lineJoin = 'round'; ctx.stroke(); }
function heartP(x, y, s) { const p = new Path2D(); p.moveTo(x, y + s * 0.9); p.bezierCurveTo(x - s * 1.4, y - s * 0.1, x - s * 0.7, y - s * 1.1, x, y - s * 0.35); p.bezierCurveTo(x + s * 0.7, y - s * 1.1, x + s * 1.4, y - s * 0.1, x, y + s * 0.9); return p; }

