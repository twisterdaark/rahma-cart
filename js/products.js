// ---------- products: food & drinks that look like the characters ----------
const PROD = {
  hafoWrap: { n: 'شاورما الحافوزليق', price: 8, ch: 'hafo' },
  aaoJuice: { n: 'عصير العاعاعوط', price: 5, ch: 'aao' },
  halaq: { n: 'مشروب حلاق الرحمة', price: 5, ch: 'barber' },
  zarbSmoothie: { n: 'سموذي الزربوطان', price: 7, ch: 'zarb' },
  jabFries: { n: 'بطاطس الجعبوق', price: 8, ch: 'jab' },
  zoolTea: { n: 'شاي أبو الزول', price: 6, ch: 'zool' },
  shawqyIce: { n: 'آيس كريم أبو شوقي', price: 7, ch: 'shawqy' },
  hankSand: { n: 'ساندوتش الحنكليس', price: 11, ch: 'hank' },
  aaotaMilk: { n: 'دموع العاعاعوطة', price: 8, ch: 'aaota' },
  sakrFal: { n: 'فلافل السكرتح', price: 10, ch: 'sakr' },
  kun: { n: 'كنافة الهصلاص', price: 9, ch: 'has', sea: 1 },
  qat: { n: 'قطايف الأبخنوس', price: 7, ch: 'abkh', sea: 1 },
  kahk: { n: 'كحك البرنس', price: 8, ch: 'prince', sea: 1 },
  mixWrap: { n: 'ميكس عباس البروتين', price: 13, ch: 'abbas', rec: ['hankSand'] },
  friesWrap: { n: 'شاورما فلوبا الفرنساوي', price: 12, ch: 'floba', rec: ['jabFries'] },
  iceSand: { n: 'ساندوتش شمقمق الساقع', price: 10, ch: 'shamq', rec: ['shawqyIce'] },
  falSand: { n: 'عيش الدولازليق بالفلافل', price: 12, ch: 'dola', rec: ['sakrFal'] },
  cig: { n: 'سجاير', price: 6, rare: 1 },
  nut: { n: 'نوتيلا', price: 9, rare: 1 },
  wbr: { n: 'عيش حبة كاملة', price: 5, rare: 1 },
  ngl: { n: 'النجلاوي', price: 6, fr: 1 },
  koala: { n: 'كوالا لامبور', price: 7, fr: 1 },
};
const BASE = ['hafoWrap', 'aaoJuice', 'halaq'];
const OWN = {}; for (const k in PROD) if (PROD[k].ch && !PROD[k].sea) OWN[PROD[k].ch] = k;
function cupShape(w1, w2, h) { const p = new Path2D(); p.moveTo(-w1, -h); p.lineTo(w1, -h); p.lineTo(w2, 0); p.quadraticCurveTo(0, 5, -w2, 0); p.closePath(); return p; }
// translucent container with a shaded liquid at lvl (0..1); top is the container's (negative) top y
function liquid(p, c, lvl, top, w) {
  ctx.save(); ctx.clip(p);
  ctx.fillStyle = 'rgba(232,244,252,.5)'; ctx.fillRect(-w - 6, top - 6, 2 * w + 12, -top + 12);
  if (lvl > 0) {
    const ly = top * lvl, g = ctx.createLinearGradient(-w, 0, w, 0); g.addColorStop(0, shade(c, 0.3)); g.addColorStop(0.45, c); g.addColorStop(1, shade(c, -0.38));
    ctx.fillStyle = g; ctx.fillRect(-w - 6, ly, 2 * w + 12, -ly + 8);
    ctx.fillStyle = shade(c, 0.35); ctx.beginPath(); ctx.ellipse(0, ly, w, 2.5, 0, 0, Math.PI * 2); ctx.fill();
  }
  ctx.fillStyle = 'rgba(255,255,255,.6)'; ctx.fillRect(-w * 0.62, top + 5, 3.5, -top - 12); ctx.fillStyle = 'rgba(255,255,255,.28)'; ctx.fillRect(-w * 0.38, top + 6, 2, -top - 16);
  ctx.restore(); ctx.lineWidth = 3; ctx.strokeStyle = OLC; ctx.lineJoin = 'round'; ctx.stroke(p);
}
let DECO = 1, decoOpen = false;   // 0..1 while a finished drink's lid/face pops in
function decoIn(lvl, y) {
  if (lvl < 1) return false;
  if (DECO < 1) { const k = Math.max(0.001, easeBack(DECO)); ctx.save(); ctx.translate(0, y); ctx.scale(k, k); ctx.translate(0, -y); decoOpen = true; }
  return true;
}
function wrapBody(sk, pc, sc) {   // a tortilla cone in a striped paper sleeve, shared by the wrap recipes
  const wr = new Path2D(); wr.moveTo(-21, -60); wr.quadraticCurveTo(0, -52, 21, -60); wr.lineTo(17, -4); wr.quadraticCurveTo(0, 4, -17, -4); wr.closePath(); ink(wr, sk, { b: [0, -34, 32], lw: 2.8 });
  const pp = new Path2D(); pp.moveTo(-19.2, -30); pp.quadraticCurveTo(0, -24, 19.2, -30); pp.lineTo(17, -4); pp.quadraticCurveTo(0, 4, -17, -4); pp.closePath(); ink(pp, pc, { b: [0, -16, 22], lw: 2.4 });
  ctx.save(); ctx.clip(pp); ctx.fillStyle = sc; ctx.fillRect(-22, -15, 44, 3); ctx.fillRect(-22, -9, 44, 2); ctx.restore();
}
const PDRAW = {
  hafoWrap(t) {   // wrap with the goblin's face and lettuce ears
    ctx.save(); ctx.rotate(-0.12);
    const w = Math.sin(t * 5) * 3;
    for (const s of [-1, 1]) { B([[s * 10, -58], [s * 40, -76 + w * s], [s * 58, -84 + w * s], [s * 44, -62], [s * 16, -46]], '#8cc63f', { lw: 2.4 }); L([[s * 14, -54], [s * 50, -78 + w * s]], 1.4, '#4f7f1a', 0.8); }
    E(0, -60, 19, 8, '#b8642a', { lw: 2.2 });
    for (let i = 0; i < 4; i++) R(-13 + i * 7, -70 + (i % 2) * 3, 6, 11, 2, i % 2 ? '#d08a44' : '#9a4e1e', { lw: 1.2 });
    E(9, -63, 4, 2.4, '#7ab03a', { lw: 1 }); E(-8, -64, 3.5, 2.2, '#e85a3a', { lw: 1 });
    const wr = new Path2D(); wr.moveTo(-21, -60); wr.quadraticCurveTo(0, -52, 21, -60); wr.lineTo(17, -4); wr.quadraticCurveTo(0, 4, -17, -4); wr.closePath();
    ink(wr, '#eac27e', { b: [0, -34, 32], lw: 2.8 });
    const pp = new Path2D(); pp.moveTo(-19.2, -30); pp.quadraticCurveTo(0, -24, 19.2, -30); pp.lineTo(17, -4); pp.quadraticCurveTo(0, 4, -17, -4); pp.closePath();
    ink(pp, '#fbf8f0', { b: [0, -16, 22], lw: 2.4 });
    ctx.save(); ctx.clip(pp); ctx.fillStyle = '#d32f2f'; ctx.fillRect(-22, -15, 44, 3); ctx.fillRect(-22, -9, 44, 2); ctx.restore();
    peye(-7, -47, 4.6, { iris: '#d8b62a', lid: 0.42, skin: '#eac27e' }); peye(7, -47, 4.6, { iris: '#d8b62a', lid: 0.42, skin: '#eac27e' });
    pgrin(0, -39, 10, 3.4, 1);
    ctx.restore();
  },
  aaoJuice(t, lvl = 1) {   // red slush under a dome shaped like العاعاعوط
    const p = cupShape(19, 14, 48); liquid(p, '#e8261c', lvl * 0.86, -48, 19);
    if (!decoIn(lvl, -48)) return;
    ctx.save(); ctx.clip(p); for (let i = 0; i < 3; i++) R(-12 + i * 9, -34 + (i % 2) * 7, 8, 8, 2, 'rgba(255,255,255,.45)', { ol: false, shade: false }); ctx.restore();
    const d = new Path2D(); d.moveTo(-22, -47); d.bezierCurveTo(-25, -80, 25, -80, 22, -47); d.closePath(); ink(d, '#f02417', { b: [0, -62, 24], lw: 2.6 });
    for (let i = 0; i < 7; i++) dot(-14 + hash(i) * 28, -70 + hash(i + 9) * 18, 1.4, 'rgba(255,200,190,.8)');
    peye(-7, -62, 3.2, { skin: '#f02417', lid: 0.35 }); peye(7, -62, 3.2, { skin: '#f02417', lid: 0.35 });
    E(0, -53, 4.5, 2.4, '#a8140c', { lw: 1.4 });
    L([[9, -70], [17, -92]], 5.5, OLC); L([[9, -70], [17, -92]], 3, '#ff8ab0');
    R(-22, -50, 44, 5, 2, '#c41a10', { lw: 2 });
  },
  halaq(t, lvl = 1) {   // cola mug with shaving foam, moustache, razor and a barber-pole straw
    ctx.beginPath(); ctx.arc(19, -26, 11, -1.3, 1.3); ctx.lineWidth = 7; ctx.strokeStyle = OLC; ctx.stroke(); ctx.lineWidth = 3.5; ctx.strokeStyle = '#d8eef8'; ctx.stroke();
    const p = cupShape(18, 16, 50); liquid(p, '#4a1f08', lvl * 0.9, -50, 18);
    ctx.save(); ctx.clip(p); for (let i = 0; i < 6; i++) { const q = (t * 0.7 + i * 0.17) % 1; dot(-10 + hash(i) * 20, -4 - q * 40 * lvl, 1.4, 'rgba(255,220,180,.7)'); } ctx.restore();
    if (!decoIn(lvl, -50)) return;
    ctx.save(); ctx.translate(10, -60); ctx.rotate(0.35); const sp = RRp(-3, -34, 6, 34, 3); ctx.fillStyle = '#fff'; ctx.fill(sp);
    ctx.save(); ctx.clip(sp); for (let k = -6; k < 6; k++) { ctx.fillStyle = k % 2 ? '#d32f2f' : '#2b55a8'; ctx.beginPath(); ctx.moveTo(-4, -34 + k * 7); ctx.lineTo(4, -38 + k * 7); ctx.lineTo(4, -35 + k * 7); ctx.lineTo(-4, -31 + k * 7); ctx.fill(); } ctx.restore();
    ctx.lineWidth = 1.8; ctx.strokeStyle = OLC; ctx.stroke(sp); ctx.restore();
    for (let k = -1; k <= 1; k++) E(k * 10, -52 - (k ? 0 : 6), 11, 9, '#ffffff', { lw: 2.2, hl: 0.5 });
    E(-15, -44, 4, 7, '#ffffff', { lw: 1.8, hl: 0 }); E(13, -42, 3.5, 6, '#ffffff', { lw: 1.8, hl: 0 });
    ctx.save(); ctx.translate(-12, -70); ctx.rotate(-0.5); R(-3, -16, 6, 18, 2, '#d0d6dc', { lw: 1.8 }); R(-9, -21, 18, 6, 1, '#9aa4ac', { lw: 1.8 }); ctx.restore();
    for (const s of [-1, 1]) L([[0, -24], [s * 7, -26], [s * 13, -23], [s * 16, -27], [s * 14, -31]], 3.6, '#1a1210');
  },
  zarbSmoothie(t, lvl = 1) {   // fat-bellied cup in a tank top with a lazy smirk
    const p = new Path2D(); p.moveTo(-16, -50); p.lineTo(16, -50); p.bezierCurveTo(34, -40, 34, -2, 16, 0); p.lineTo(-16, 0); p.bezierCurveTo(-34, -2, -34, -40, -16, -50); p.closePath();
    liquid(p, '#7fb240', lvl * 0.92, -50, 28);
    if (!decoIn(lvl, -50)) return;
    ctx.save(); ctx.clip(p); ctx.fillStyle = '#f6f4ee'; ctx.fillRect(-30, -22, 60, 24); ctx.fillRect(-13, -36, 5, 16); ctx.fillRect(8, -36, 5, 16); dot(-6, -12, 3, 'rgba(210,160,40,.4)'); ctx.restore();
    ctx.lineWidth = 3; ctx.strokeStyle = OLC; ctx.stroke(p);
    peye(-8, -38, 4.2, { iris: '#5a3a1a', lid: 0.5, skin: '#8cbf4a' }); peye(8, -38, 4.2, { iris: '#5a3a1a', lid: 0.5, skin: '#8cbf4a' });
    Q(-6, -29, 2, -26, 10, -31, 2.2);
    E(0, -51, 18, 5, '#7fb240', { lw: 2.2 });
    for (const s of [-1, 1]) PL([[s * 13, -54], [s * 26, -62], [s * 18, -48]], '#7fb240', { lw: 2 });
    L([[5, -54], [11, -78]], 5, OLC); L([[5, -54], [11, -78]], 3, '#ffd23f');
  },
  jabFries(t) {   // black box with a long beak and a glowing red eye
    for (let i = 0; i < 7; i++) { const x = -15 + i * 5; R(x - 2.5, -62 + (i % 3) * 4, 6, 36, 2, '#f6c84a', { lw: 1.6 }); }
    const c = new Path2D(); c.moveTo(-21, -32); c.lineTo(21, -32); c.lineTo(13, 3); c.lineTo(-13, 3); c.closePath(); ink(c, '#2a2a2e', { b: [0, -14, 22], lw: 2.8, hl: 0.25 });
    PL([[14, -32], [28, -48], [22, -28]], '#2a2a2e', { lw: 2.2 });
    PL([[-19, -24], [-52, -17], [-18, -12]], '#3c3c42', { lw: 2.4 });
    glow(-6, -18, 10, '#ff2020', 0.75); ctx.save(); ctx.translate(-6, -18); ctx.rotate(-0.25); E(0, 0, 5.5, 2.2, '#ff3a2a', { lw: 1, hl: 0, v: false }); ctx.restore();
  },
  hankSand(t) {   // green Shrek bun with trumpet ears and a toothy grin
    E(0, -6, 27, 8, '#d9a15a', { lw: 2.4 });
    B([[-30, -14], [-20, -19], [-10, -13], [0, -19], [10, -13], [20, -19], [30, -14], [26, -9], [-26, -9]], '#8cc63f', { lw: 2 });
    for (let i = 0; i < 4; i++) E(-18 + i * 12, -17, 7, 6, '#5f8f2a', { lw: 1.8, seed: i });
    const m = new Path2D(); m.moveTo(-22, -22); m.quadraticCurveTo(0, -12, 22, -22); m.quadraticCurveTo(0, -26, -22, -22); m.closePath(); ctx.fillStyle = '#3a0d0a'; ctx.fill(m);
    ctx.save(); ctx.clip(m); ctx.fillStyle = '#f4ead0'; ctx.fillRect(-22, -25, 44, 4); ctx.restore();
    for (const s of [-1, 1]) { PL([[s * 20, -30], [s * 34, -34], [s * 35, -24], [s * 21, -24]], '#9cc24a', { lw: 2 }); E(s * 37, -29, 3.5, 7, '#7aa236', { lw: 1.6 }); E(s * 37.5, -29, 1.6, 4, '#3f5a1a', { ol: false, shade: false }); }
    const top = new Path2D(); top.moveTo(-27, -22); top.bezierCurveTo(-28, -54, 28, -54, 27, -22); top.quadraticCurveTo(0, -26, -27, -22); top.closePath(); ink(top, '#a9c75a', { b: [0, -34, 26], lw: 2.6 });
    for (let i = 0; i < 6; i++) E(-14 + i * 6, -42 + (i % 2) * 4, 1.6, 1, '#fff6d8', { ol: false, shade: false });
    peye(-8, -32, 3.8, { iris: '#6b4423', lid: 0.25, skin: '#a9c75a' }); peye(8, -32, 3.8, { iris: '#6b4423', lid: 0.25, skin: '#a9c75a' });
  },
  zoolTea(t, lvl = 1) {   // tea glass in a sphinx headdress and white shades
    E(0, 2, 25, 5.5, '#e8e2d4', { lw: 2.2 });
    const p = new Path2D(); p.moveTo(-14, -48); p.quadraticCurveTo(-7, -24, -12, 0); p.lineTo(12, 0); p.quadraticCurveTo(7, -24, 14, -48); p.closePath();
    liquid(p, '#a8501a', lvl * 0.86, -48, 15);
    if (!decoIn(lvl, -48)) return;
    for (const s of [-1, 1]) { const np = new Path2D(); np.moveTo(s * 13, -50); np.lineTo(s * 26, -44); np.lineTo(s * 22, -12); np.lineTo(s * 13, -18); np.closePath(); ctx.save(); ctx.fillStyle = '#e8bd58'; ctx.fill(np); ctx.clip(np); for (let y = -52; y < -10; y += 8) { ctx.fillStyle = '#2b55a8'; ctx.fillRect(-30, y, 60, 4); } ctx.restore(); ctx.lineWidth = 2.2; ctx.strokeStyle = OLC; ctx.stroke(np); }
    R(-15, -42, 13, 8, 4, '#ffffff', { lw: 1.8, hl: 0 }); R(2, -42, 13, 8, 4, '#ffffff', { lw: 1.8, hl: 0 }); ctx.fillStyle = '#141420'; ctx.fill(RRp(-13, -40, 9, 4, 2)); ctx.fill(RRp(4, -40, 9, 4, 2)); L([[-2, -38], [2, -38]], 2);
    E(9, -50, 6, 2.6, '#4caf50', { lw: 1.4, rot: -0.5 });
    for (let k = -1; k <= 1; k += 2) Q(k * 5, -54, k * 9, -62, k * 4, -70, 2, '#ffffff', 0.5 + 0.3 * Math.sin(t * 3 + k));
  },
  shawqyIce(t) {   // polar-bear scoop on a cone with little eagle wafer wings
    const c = new Path2D(); c.moveTo(-17, -34); c.lineTo(17, -34); c.lineTo(0, 6); c.closePath(); ink(c, '#d9a35a', { b: [0, -18, 20], lw: 2.6 });
    ctx.save(); ctx.clip(c); for (let i = -4; i <= 4; i++) { L([[i * 8 - 20, -40], [i * 8 + 20, 10]], 1.2, '#a8742e', 0.8); L([[i * 8 + 20, -40], [i * 8 - 20, 10]], 1.2, '#a8742e', 0.8); } ctx.restore();
    for (const s of [-1, 1]) { const fl = Math.sin(t * 6) * 0.15; ctx.save(); ctx.translate(s * 12, -26); ctx.rotate(s * (0.3 + fl)); B([[0, 0], [s * 16, -10], [s * 28, -8], [s * 22, 2], [s * 8, 6]], '#8a5a2c', { lw: 1.8 }); L([[s * 8, -2], [s * 22, -6]], 1, '#5a3a1a'); ctx.restore(); }
    E(0, -48, 20, 17, '#fbfaf6', { lw: 2.4, sd: 0.14 });
    for (let i = 0; i < 5; i++) E(-16 + i * 8, -34 + (i % 2) * 2, 4.5, 4, '#fbfaf6', { lw: 1.6, hl: 0, seed: i });
    for (const s of [-1, 1]) { E(s * 14, -62, 6, 6, '#fbfaf6', { lw: 1.8 }); E(s * 14, -62, 2.8, 2.8, '#e6c8c0', { ol: false, shade: false }); }
    E(0, -42, 8, 6, '#efe7d6', { lw: 1.4, hl: 0 }); E(0, -45, 3.6, 2.6, '#1a1a1a', { lw: 1, hl: 0.5 });
    dot(-7, -52, 2.2, OLC); dot(7, -52, 2.2, OLC);
  },
  aaotaMilk(t, lvl = 1) {   // white milk under a bald egg dome crying strawberry tears
    const p = cupShape(18, 14, 46); liquid(p, '#f6f4f0', lvl * 0.88, -46, 18);
    if (!decoIn(lvl, -46)) return;
    const d = new Path2D(); d.moveTo(-20, -45); d.bezierCurveTo(-22, -92, 22, -92, 20, -45); d.closePath(); ink(d, '#f4f2ee', { b: [0, -64, 24], lw: 2.6, sd: 0.12 });
    for (const s of [-1, 1]) { glow(s * 7, -62, 7, '#ff2a3a', 0.35); peye(s * 7, -62, 3.4, { scl: '#fbe3e3', iris: '#8e0f1e', sy: 0.65 }); }
    const tr = (t * 0.6) % 1;
    L([[7, -58], [8, -40], [8, -26 + tr * 6]], 2.6, '#c4161c'); E(8, -24 + tr * 6, 2.4, 3.2, '#c4161c', { lw: 1 });
    L([[-7, -58], [-8, -46]], 2.2, '#c4161c');
    for (let i = 0; i < 4; i++) L([[-14 + i * 9, -47], [-14 + i * 9, -41 + (i % 2) * 6]], 3, '#c4161c');
    L([[-8, -84], [-14, -102]], 5, OLC); L([[-8, -84], [-14, -102]], 3, '#e53935');
  },
  sakrFal(t) {   // grey boat with jaws full of teeth
    for (let i = 0; i < 5; i++) E(-16 + i * 8, -22 - (i % 2) * 8, 8, 7, '#8f7b58', { lw: 1.8, seed: i });
    for (let i = 0; i < 8; i++) dot(-18 + hash(i) * 36, -30 + hash(i + 3) * 12, 1, '#f6e8c0');
    const b = new Path2D(); b.moveTo(-29, -18); b.lineTo(29, -18); b.lineTo(19, 4); b.lineTo(-19, 4); b.closePath(); ink(b, '#b8b0a0', { b: [0, -6, 26], lw: 2.6 });
    for (let i = 0; i < 8; i++) { const x = -26 + i * 7; ctx.beginPath(); ctx.moveTo(x, -18); ctx.lineTo(x + 3.5, -26); ctx.lineTo(x + 7, -18); ctx.fillStyle = '#fffbe8'; ctx.fill(); ctx.lineWidth = 1; ctx.strokeStyle = OLC; ctx.stroke(); }
    peye(-8, -6, 3.4, { iris: '#c9a227', lid: 0.3, skin: '#b8b0a0' }); peye(8, -6, 3.4, { iris: '#c9a227', lid: 0.3, skin: '#b8b0a0' });
    for (const s of [-1, 1]) for (let k = 0; k < 3; k++) L([[s * (15 + k * 3), 4], [s * (17 + k * 3), 9]], 1.8, OLC);
  },
  kun(t) {   // a copper tray of kunafa topped with the Hasalas's white head and yellow beak
    E(0, -4, 30, 9, '#c8862a', { lw: 2.4, hl: 0.3 });
    E(0, -11, 27, 12, '#e8a640', { lw: 2.4, sd: 0.15 });
    for (let i = 0; i < 16; i++) { const a = hash(i) * 6.28, r = 5 + hash(i + 9) * 19; L([[Math.cos(a) * r, -11 + Math.sin(a) * r * 0.42], [Math.cos(a + 0.5) * r, -11 + Math.sin(a + 0.5) * r * 0.42]], 1.1, '#b8741a', 0.8); }
    for (let i = 0; i < 9; i++) dot(-18 + hash(i + 20) * 36, -15 + hash(i + 30) * 8, 1.7, '#6fae3a');
    E(0, -30, 14, 13, '#ffffff', { lw: 2.2, sd: 0.12 });
    B([[6, -33], [26, -32], [21, -22], [6, -25]], '#f4b400', { lw: 1.8, hl: 0.3 });
    peye(-3, -34, 3.4, { iris: '#c58a12', lid: 0.25, skin: '#ffffff' });
    L([[-11, -42], [-3, -40]], 2, '#8a8478');
  },
  qat(t) {   // a folded qatayef with the red teletubby's face, his ring antenna and cream peeking out
    const p = new Path2D(); p.moveTo(-27, -2); p.bezierCurveTo(-27, -44, 27, -44, 27, -2); p.quadraticCurveTo(0, 4, -27, -2); p.closePath(); ink(p, '#dca668', { b: [0, -18, 28], lw: 2.6 });
    for (let i = 0; i < 4; i++) E(-15 + i * 10, -1, 6, 3.6, '#fff8e8', { lw: 1.4, hl: 0 });
    for (let i = 0; i < 3; i++) dot(-10 + i * 10, -3, 1.6, '#6fae3a');
    for (let i = 0; i < 10; i++) dot(-18 + hash(i + 4) * 36, -26 + hash(i + 8) * 16, 1.2, '#b07a3a');
    L([[0, -32], [0, -42]], 4, OLC); L([[0, -32], [0, -42]], 2, '#d6302c');
    ctx.beginPath(); ctx.arc(0, -48, 5.5, 0, Math.PI * 2); ctx.lineWidth = 4.5; ctx.strokeStyle = OLC; ctx.stroke(); ctx.lineWidth = 2.4; ctx.strokeStyle = '#d6302c'; ctx.stroke();
    peye(-8, -18, 3.2, { iris: '#3a2416', lid: 0.2, skin: '#dca668' }); peye(8, -18, 3.2, { iris: '#3a2416', lid: 0.2, skin: '#dca668' });
    blush(-15, -11, 4, 0.5); blush(15, -11, 4, 0.5); Q(-4, -10, 0, -7, 4, -10, 1.6, OLC);
  },
  kahk(t) {   // a sugar-dusted Eid kahk wearing the prince's little crown
    const p = new Path2D(); p.moveTo(-25, -3); p.bezierCurveTo(-27, -36, 27, -36, 25, -3); p.quadraticCurveTo(0, 4, -25, -3); p.closePath(); ink(p, '#f0dcb0', { b: [0, -14, 26], lw: 2.6 });
    for (let i = 0; i < 7; i++) { const a = Math.PI * (0.15 + i * 0.117); L([[Math.cos(a) * 6, -12 - Math.sin(a) * 6], [Math.cos(a) * 20, -6 - Math.sin(a) * 20]], 1.2, '#c8a070', 0.8); }
    for (let i = 0; i < 18; i++) dot(-20 + hash(i + 2) * 40, -26 + hash(i + 7) * 22, 1.3, '#ffffff');
    PL([[-12, -30], [-12, -42], [-6, -36], [0, -44], [6, -36], [12, -42], [12, -30]], '#ffc928', { lw: 2, hl: 0.4 });
    dot(0, -36, 1.8, '#d32f2f');
    peye(-8, -16, 3, { iris: '#3a2416', lid: 0.3, skin: '#f0dcb0' }); peye(8, -16, 3, { iris: '#3a2416', lid: 0.3, skin: '#f0dcb0' });
    Q(-4, -8, 0, -5, 4, -8, 1.6, OLC);
  },
  mixWrap(t) {   // Abbas's double-protein wrap: chicken and green falafel, flexing two little arms
    for (let i = 0; i < 3; i++) R(-14 + i * 9, -71 + (i % 2) * 3, 7, 11, 2, i % 2 ? '#d08a44' : '#9a4e1e', { lw: 1.2 });
    for (let i = 0; i < 3; i++) E(-10 + i * 10, -63 - (i % 2) * 5, 5.5, 5, '#5f8f2a', { lw: 1.4, seed: i });
    for (const s of [-1, 1]) { const f = Math.sin(t * 4) * 0.12; ctx.save(); ctx.translate(s * 18, -26); ctx.rotate(s * (0.2 + f)); B([[0, 4], [s * 12, 2], [s * 18, -10], [s * 14, -20], [s * 8, -16], [s * 9, -6], [0, -4]], '#e9b07a', { lw: 2 }); ctx.restore(); }
    wrapBody('#eac27e', '#fbf8f0', '#2e9d4a');
    peye(-7, -46, 4.4, { iris: '#3a2416', lid: 0.5, skin: '#eac27e' }); peye(7, -46, 4.4, { iris: '#3a2416', lid: 0.5, skin: '#eac27e' });
    L([[-12, -53], [-3, -51]], 2.4); L([[12, -53], [3, -51]], 2.4); pgrin(0, -38, 9, 3, 0);
  },
  friesWrap(t) {   // Floba's French wrap: fries sticking out of the top, a beret and a curly moustache
    for (let i = 0; i < 6; i++) { ctx.save(); ctx.translate(-14 + i * 5.6, -58); ctx.rotate(-0.25 + i * 0.1); R(-2.5, -22 + (i % 2) * 5, 5.5, 26, 2, '#f6c84a', { lw: 1.5 }); ctx.restore(); }
    wrapBody('#eac27e', '#fbf8f0', '#2e6ab8');
    ctx.save(); ctx.translate(5, -80); ctx.rotate(0.25); E(0, 0, 15, 6, '#26262e', { lw: 2 }); dot(0, -6, 2.6, '#26262e'); ctx.restore();
    peye(-7, -47, 4.2, { iris: '#2e6ab8', lid: 0.3, skin: '#eac27e' }); peye(7, -47, 4.2, { iris: '#2e6ab8', lid: 0.3, skin: '#eac27e' });
    Q(0, -38, -7, -42, -13, -37, 2.4); Q(0, -38, 7, -42, 13, -37, 2.4); Q(-4, -33, 0, -30, 4, -33, 1.6);
  },
  iceSand(t) {   // Shamq's cold sandwich: ice cream scoops squeezed in a bun, dripping a little
    E(0, -6, 27, 8, '#d9a15a', { lw: 2.4 });
    for (let i = 0; i < 3; i++) E(-17 + i * 17, -16, 11, 8, i === 1 ? '#ffb3c8' : '#fbfaf6', { lw: 2, seed: i });
    for (let i = 0; i < 2; i++) R(-12 + i * 22, -12, 4.5, 10 + i * 3, 2, i ? '#ffb3c8' : '#fbfaf6', { lw: 1.4, hl: 0 });
    const top = new Path2D(); top.moveTo(-27, -22); top.bezierCurveTo(-28, -54, 28, -54, 27, -22); top.quadraticCurveTo(0, -26, -27, -22); top.closePath(); ink(top, '#e0a85a', { b: [0, -34, 26], lw: 2.6 });
    for (let i = 0; i < 6; i++) E(-14 + i * 6, -44 + (i % 2) * 4, 1.6, 1, '#fff6d8', { ol: false, shade: false });
    peye(-8, -35, 3.8, { iris: '#3a2416', lid: 0.15, skin: '#e0a85a' }); peye(8, -35, 3.8, { iris: '#3a2416', lid: 0.15, skin: '#e0a85a' });
    pgrin(0, -29, 7, 2.4, 1);
  },
  falSand(t) {   // the Dolazleeq's pita: a pocket of Sakrtah falafel with two flapping wings
    for (const s of [-1, 1]) { const fl = Math.sin(t * 9) * 0.25; ctx.save(); ctx.translate(s * 22, -24); ctx.rotate(s * (-0.4 + fl)); B([[0, 0], [s * 14, -14], [s * 26, -16], [s * 22, -6], [s * 12, 2]], '#f4f2ec', { lw: 1.8 }); L([[s * 6, -3], [s * 20, -11]], 1, '#9aa4ac'); ctx.restore(); }
    for (let i = 0; i < 4; i++) E(-15 + i * 10, -38 - (i % 2) * 4, 7, 6.5, '#8f7b58', { lw: 1.8, seed: i });
    E(-6, -35, 4, 2.5, '#8cc63f', { lw: 1 }); E(8, -36, 4, 2.4, '#e85a3a', { lw: 1 });
    const p = new Path2D(); p.moveTo(-24, -34); p.quadraticCurveTo(0, -28, 24, -34); p.bezierCurveTo(28, 2, -28, 2, -24, -34); p.closePath(); ink(p, '#e9c58a', { b: [0, -16, 26], lw: 2.6 });
    for (let i = 0; i < 8; i++) dot(-16 + hash(i + 3) * 32, -24 + hash(i + 6) * 18, 1.1, '#b8844a');
    peye(-8, -20, 3.6, { iris: '#3a2416', lid: 0.2, skin: '#e9c58a' }); peye(8, -20, 3.6, { iris: '#3a2416', lid: 0.2, skin: '#e9c58a' });
    Q(-5, -11, 0, -7, 5, -11, 1.8);
  },
  cig(t) {
    for (let i = 0; i < 3; i++) { R(-9 + i * 6.5, -62 + (i % 2) * 3, 5, 16, 1.5, '#f8f6f0', { lw: 1.4, hl: 0 }); R(-9 + i * 6.5, -62 + (i % 2) * 3, 5, 5, 1.5, '#e8a050', { lw: 1.4, hl: 0 }); }
    R(-16, -50, 32, 50, 4, '#f4f2ec', { lw: 2.4 }); R(-16, -50, 32, 20, 4, '#c62828', { lw: 2.4 });
    L([[-16, -30], [16, -30]], 2.4, '#d4a017'); T('سجاير', 0, -15, 8.5, '#3a1d0e', FD);
  },
  nut(t) {
    R(-15, -56, 30, 11, 3, '#f4f2ec', { lw: 2.2 }); R(-17, -46, 34, 46, 9, '#5a2e12', { lw: 2.6 });
    E(0, -24, 13, 10, '#ffffff', { lw: 1.6, hl: 0 }); T('نوتيلا', 0, -23, 7.5, '#c62828', FD);
  },
  wbr(t) {
    E(0, -8, 26, 9, '#a8743e', { lw: 2.2 }); E(0, -18, 24, 11, '#b8844a', { lw: 2.2 });
    for (let i = 0; i < 12; i++) dot(-18 + hash(i) * 36, -24 + hash(i + 5) * 10, 1.3, i % 3 ? '#6a4a22' : '#ead2a0');
  },
  ngl(t) {   // النجلاوي: two bananas in a strawberry's skin
    ctx.save(); ctx.rotate(Math.sin(t * 3) * 0.03);
    [['#c81e30', -7, -9, 0.18], ['#ec2c40', 0, 0, 0]].forEach(([c, dx, dy, a]) => {
      ctx.save(); ctx.translate(dx, dy); ctx.rotate(a);
      const p = new Path2D(); p.moveTo(30, -46); p.quadraticCurveTo(0, 16, -32, -40); p.quadraticCurveTo(-34, -46, -29, -45); p.quadraticCurveTo(0, -16, 30, -46); p.closePath();
      ink(p, c, { b: [0, -26, 32], lw: 2.8 });
      ctx.save(); ctx.clip(p); for (let i = 0; i < 11; i++) { const u = (i + 0.5) / 11, x = -26 + u * 52; dot(x, -24 + Math.pow(x / 30, 2) * -16 + (i % 2 ? 4 : -3), 1.6, '#ffe066'); } ctx.restore();
      Q(-20, -30, 0, -10, 20, -32, 1.4, '#ffffff', 0.35);
      dot(-31, -42, 2.6, '#5a1a10');
      ctx.restore();
    });
    ctx.save(); ctx.translate(30, -47); for (let k = 0; k < 5; k++) { ctx.save(); ctx.rotate(0.4 + k * 0.62); PL([[0, -2], [5, 1], [0, 14], [-5, 1]], '#4fa83a', { lw: 1.5 }); ctx.restore(); } L([[0, 0], [4, -13]], 3.4, '#3d6a1e'); ctx.restore();   // strawberry leaves at the stalk
    ctx.restore();
  },
  koala(t) {   // كوالا لامبور: a round fuzzy fruit with a koala's ears and nose
    const b = Math.sin(t * 4) * 1.2;
    for (const s of [-1, 1]) { E(s * 24, -50 + b, 13, 12, '#9aa0a8', { lw: 2.4 }); E(s * 24, -49 + b, 7, 6.5, '#e8d6d0', { ol: false, shade: false }); }
    E(0, -27, 28, 26, '#9aa0a8', { lw: 2.8 });
    for (let i = 0; i < 10; i++) { const a = hash(i + 2) * 6.28, r = 12 + hash(i + 7) * 12, x = Math.cos(a) * r, y = -27 + Math.sin(a) * r; Q(x, y, x + 2, y - 2, x + 3, y + 1, 1.2, '#6e747c', 0.7); }
    E(0, -24, 7, 9, '#2a2a30', { lw: 2, hl: 0.4 });
    dot(-11, -33, 2.6, '#111'); dot(11, -33, 2.6, '#111'); dot(-11.8, -34, 0.9, '#fff'); dot(10.2, -34, 0.9, '#fff');
    B([[-2, -52], [5, -62], [13, -60], [6, -52]], '#4fa83a', { lw: 1.6 }); L([[0, -52], [-1, -60]], 2.6, '#5a3a1a');
  },
};
const PIC = {};
function prodIcon(id, x, y, s) { const Lr = PIC[id + s] || (PIC[id + s] = makeLayer()); ctx.save(); ctx.translate(x, y); sprite(Lr, 'p', -72 * s, -120 * s, 144 * s, 136 * s, () => prod(id, 0, 0, s, 0)); ctx.restore(); }
function prod(id, x, y, s = 1, t = 0, lvl = 1) { const v = VOL, [b, xt] = id.split('|'); VOL = true; ctx.save(); ctx.translate(x, y); ctx.scale(s, s); PDRAW[b](t, lvl); if (decoOpen) { ctx.restore(); decoOpen = false; } if (xt) drawExtra(b, xt); ctx.restore(); VOL = v; }
// add-on marks: a tahini drizzle on sandwiches, and a little badge so orders read at a glance
function drawExtra(b, xt) {
  if (xt === 's') { const [ey, w] = b === 'hankSand' ? [-12, 24] : [-66, 15], pts = []; for (let i = 0; i <= 8; i++) pts.push([-w + i * w / 4, ey + (i % 2 ? 3 : -3)]); L(pts, 5, OLC); L(pts, 3, '#f4ead0'); }
  E(23, -22, 11, 11, xt === 's' ? '#fff3d6' : '#e6f6ff', { lw: 2.2, hl: 0.3, v: false });
  if (xt === 's') { B([[23, -33], [28, -23], [26.5, -17], [19.5, -17], [18, -23]], '#f4ead0', { lw: 1.8, hl: 0.4, v: false }); dot(21.5, -21, 1.4, '#ffffff'); }
  else { R(17, -28, 12, 12, 3, '#bfe6ff', { lw: 1.6, hl: 0.5, v: false }); L([[19, -25], [22, -25]], 1.6, '#ffffff'); }
}

