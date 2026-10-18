// ---------- background (cached) ----------
const bg = document.createElement('canvas'), bgx = bg.getContext('2d');
function withCtx(c, fn) { const o = ctx; ctx = c; try { fn(); } finally { ctx = o; } }
let bgK = '';
function road(c = '#3a3440') { ctx.fillStyle = c; ctx.fillRect(132, 274, 734, CT - 274); for (let x = 150; x < 866; x += 60) { ctx.fillStyle = '#d8d0b8'; ctx.fillRect(x, 288, 28, 3); } }
function sky(stops, n, y0, y1) { const g = ctx.createLinearGradient(0, 0, 0, 250); stops.forEach((c, i) => g.addColorStop(i / (stops.length - 1), c)); ctx.fillStyle = g; ctx.fillRect(0, 0, W, CT + 10); for (let i = 0; i < n; i++) dot(140 + hash(i + 7) * 720, y0 + hash(i + 60) * (y1 - y0), hash(i + 2) * 1.4 + 0.4, `rgba(255,250,225,${0.35 + hash(i + 5) * 0.6})`); return g; }
// the other places the cart moves to (the hara is drawn inline in renderBG)
const STREETS = {
  corn() {   // the Nile corniche at night: far bank, the Rahma tower, feluccas, railing and lamps
    const g = sky(['#14204e', '#4a3a8a', '#ff8a6a'], 40, 32, 120);
    glow(250, 70, 46, '#fff6c8', 0.3); dot(250, 70, 15, '#fff6c8'); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(257, 65, 13, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#2a2050';
    [[140, 150], [196, 138], [252, 160], [330, 132], [410, 150], [470, 144], [700, 140], [760, 156], [820, 136]].forEach(([x, y], i) => { const w = 44 + hash(i + 3) * 40; ctx.fillStyle = '#2a2050'; ctx.fillRect(x, y, w, 200 - y); for (let k = 0; k < 6; k++) if (hash(i * 9 + k) > 0.4) dot(x + 6 + hash(k + i) * (w - 12), y + 8 + hash(k * 3 + i) * (186 - y), 1.6, '#ffd36a'); });
    ctx.fillStyle = '#3a2a6a'; ctx.beginPath(); ctx.moveTo(612, 200); ctx.lineTo(622, 72); ctx.lineTo(630, 72); ctx.lineTo(640, 200); ctx.fill();
    for (let k = 0; k < 8; k++) L([[616 + k * 0.8, 196 - k * 16], [636 - k * 0.8, 182 - k * 16]], 1, '#6a5a9a');
    R(608, 56, 36, 18, 6, '#5a3a8a', { lw: 2, hl: 0.2 }); glow(626, 64, 30, '#ff8ae8', 0.4); L([[626, 56], [626, 36]], 2, '#3a2a6a'); dot(626, 35, 2.4, '#ff3b5a');
    const ng = ctx.createLinearGradient(0, 198, 0, 250); ng.addColorStop(0, '#1a3a5a'); ng.addColorStop(1, '#0a1a2a'); ctx.fillStyle = ng; ctx.fillRect(132, 198, 734, 52);
    for (let i = 0; i < 60; i++) { const x = 140 + hash(i + 31) * 700, y = 202 + hash(i + 77) * 40; L([[x, y], [x + 8 + hash(i) * 14, y]], 1.6, hash(i + 4) > 0.5 ? '#ffd36a' : '#ff8ae8', 0.3 + hash(i + 9) * 0.4); }
    const boat = (x, y, s, c) => { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); B([[-30, 0], [30, 0], [22, 10], [-22, 10]], '#6a3a1a', { lw: 2.2 }); L([[0, 0], [0, -56]], 2.4, OLC); PL([[2, -54], [26, -6], [2, -6]], c, { lw: 2, hl: 0.2 }); PL([[-2, -40], [-20, -6], [-2, -6]], '#fff6e6', { lw: 2, hl: 0.2 }); ctx.restore(); };
    boat(560, 236, 0.9, '#fff6e6'); boat(780, 228, 0.6, '#ffd23f');
    R(128, 244, 742, 16, 2, '#c8b090', { lw: 2.4, hl: 0.1 }); for (let x = 140; x < 866; x += 40) L([[x, 246], [x, 258]], 1.2, '#9a8060');
    L([[132, 226], [866, 226]], 2.6, '#2a2a2a'); for (let x = 136; x < 866; x += 12) L([[x, 226], [x, 244]], 1.6, '#2a2a2a');
    for (const x of [230, 480, 730]) { L([[x, 258], [x, 140]], 4, '#2a2a2a'); Q(x, 140, x + 4, 128, x + 18, 132, 3, '#2a2a2a'); E(x + 20, 138, 9, 6, '#ffe8a8', { lw: 2 }); glow(x + 20, 142, 46, '#ffd36a', 0.45); }
    L([[300, 174], [300, 226]], 2.4, '#2a2a2a'); L([[396, 174], [396, 226]], 2.4, '#2a2a2a');
    R(288, 150, 120, 24, 5, '#2e6ab8', { lw: 2.4 }); T('كورنيش الرحمة', 348, 163, fit('كورنيش الرحمة', 110, 15, FD), '#fff', FD);
    ctx.fillStyle = '#d8c8a8'; ctx.fillRect(132, 258, 734, 15); for (let x = 132; x < 866; x += 22) L([[x, 258], [x, 273]], 1, '#b0a080');
    L([[132, 273], [866, 273]], 2, '#5a4e3e'); road('#34303c');
  },
  stad() {   // outside the stadium on match night: packed stands, floodlights, scoreboard, ad boards
    sky(['#0e1430', '#1e2a54', '#2a3a6a'], 24, 30, 70);
    ctx.save(); ctx.globalAlpha = 0.1; ctx.fillStyle = '#fffbe0'; for (const [x, d] of [[180, 1], [816, -1]]) { ctx.beginPath(); ctx.moveTo(x, 52); ctx.lineTo(x + d * 430, 250); ctx.lineTo(x + d * 210, 250); ctx.fill(); } ctx.restore();
    ctx.fillStyle = '#5a2030'; ctx.beginPath(); ctx.moveTo(132, 112); ctx.quadraticCurveTo(500, 70, 866, 112); ctx.lineTo(866, 236); ctx.lineTo(132, 236); ctx.fill();
    [106, 136, 166, 196].forEach((y, j) => { ctx.fillStyle = j % 2 ? '#8a3a4a' : '#7a2a3a'; ctx.fillRect(132, y, 734, 28); L([[132, y], [866, y]], 1.4, '#3a1020'); for (let x = 136; x < 866; x += 9) { const h = hash(x * 0.37 + j * 13); if (h > 0.12) { dot(x + (j % 2) * 4, y + 12, 4, ['#e53935', '#ffffff', '#ffd23f', '#2e9d4a', '#1a1a1a', '#c98b5a'][Math.floor(h * 6) % 6]); dot(x + (j % 2) * 4, y + 21, 3, '#3a1020'); } } });
    for (const [x, c] of [[420, '#e53935'], [560, '#ffd23f'], [700, '#2e9d4a'], [300, '#ffffff']]) { L([[x, 132], [x, 100]], 2, '#2a2a2a'); PL([[x, 100], [x + 22, 106], [x, 114]], c, { lw: 1.6, hl: 0 }); }
    R(400, 60, 160, 40, 6, '#1a1a1e', { lw: 2.6 }); T('الرحمة ٣ - ٠ الكون', 480, 81, fit('الرحمة ٣ - ٠ الكون', 148, 16, FD), '#ffd23f', FD);
    for (const x of [180, 816]) { L([[x, 236], [x, 58]], 5, '#2a2a3a'); R(x - 24, 38, 48, 22, 3, '#3a3a4a', { lw: 2 }); for (let k = 0; k < 6; k++) dot(x - 16 + (k % 3) * 16, 44 + Math.floor(k / 3) * 10, 4, '#fffbe0'); glow(x, 50, 60, '#fffbe0', 0.5); }
    R(214, 200, 150, 24, 4, '#2e9d4a', { lw: 2.4 }); T('استاد الرحمة', 289, 213, fit('استاد الرحمة', 140, 15, FD), '#fff', FD);
    [['عصير العاعاعوط', '#e53935'], ['شاي أبو الزول', '#c98a1a'], ['بطاطس الجعبوق', '#2e7fb8'], ['سموذي الزربوطان', '#5f8f2a']].forEach(([n, c], i) => { const x = 132 + i * 183.5; R(x, 236, 183.5, 22, 0, c, { lw: 2, hl: 0.1 }); T(n, x + 92, 248, fit(n, 170, 13, FD), '#fff', FD); });
    ctx.fillStyle = '#b8ac98'; ctx.fillRect(132, 258, 734, 15); L([[132, 273], [866, 273]], 2, '#5a4e3e'); road();
  },
  space() {   // the Rahma space station: ringed planet, earth, a moon surface with domes and a rocket
    sky(['#05030f', '#1a0a3a', '#3a1a5a'], 0, 0, 0);
    glow(300, 120, 160, '#8a4ad8', 0.35); glow(720, 170, 140, '#2ab0e0', 0.22);
    for (let i = 0; i < 90; i++) dot(132 + hash(i + 11) * 734, 30 + hash(i + 90) * 190, hash(i + 3) * 1.6 + 0.4, ['#ffffff', '#fff6c8', '#bfe6ff', '#ffc8f0'][i % 4]);
    const ring = (a, b) => { ctx.save(); ctx.translate(330, 104); ctx.rotate(-0.3); ctx.lineWidth = 6; ctx.strokeStyle = '#ffd8a8'; ctx.beginPath(); ctx.ellipse(0, 0, 76, 16, 0, a, b); ctx.stroke(); ctx.restore(); };
    ring(Math.PI, Math.PI * 2); E(330, 104, 40, 40, '#e86ab0', { lw: 3, hl: 0.4, v: true }); ring(0, Math.PI);
    E(720, 74, 22, 22, '#2e7fb8', { lw: 2.4, hl: 0.4, v: true }); B([[708, 64], [718, 60], [724, 70], [714, 78]], '#2e9d4a', { lw: 1.4, hl: 0 }); B([[726, 82], [734, 78], [736, 88], [728, 90]], '#2e9d4a', { lw: 1.4, hl: 0 });
    ctx.fillStyle = '#8a8aa0'; ctx.beginPath(); ctx.moveTo(132, 258); for (let x = 132; x <= 866; x += 40) ctx.lineTo(x, 212 + hash(x) * 14); ctx.lineTo(866, 258); ctx.fill();
    for (let i = 0; i < 12; i++) E(150 + hash(i + 5) * 700, 236 + hash(i + 8) * 14, 8 + hash(i) * 10, 3 + hash(i) * 3, '#6a6a80', { lw: 1.4, hl: 0 });
    for (const [x, r] of [[210, 34], [282, 22], [600, 30]]) { ctx.save(); ctx.beginPath(); ctx.arc(x, 230, r, Math.PI, 0); ctx.closePath(); ctx.fillStyle = 'rgba(191,230,255,.45)'; ctx.fill(); ctx.lineWidth = 2.4; ctx.strokeStyle = OLC; ctx.stroke(); ctx.restore(); glow(x, 222, r, '#ffd36a', 0.5); for (let k = 0; k < 3; k++) dot(x - r * 0.5 + k * r * 0.5, 222, 2.4, '#ffd36a'); }
    ctx.save(); ctx.translate(790, 232); PL([[-12, 0], [-12, -70], [0, -96], [12, -70], [12, 0]], '#f4f2ec', { lw: 2.6, hl: 0.3 }); E(0, -56, 6, 6, '#2ab0e0', { lw: 2 }); PL([[-12, -20], [-24, 2], [-12, 0]], '#d32f2f', { lw: 2 }); PL([[12, -20], [24, 2], [12, 0]], '#d32f2f', { lw: 2 }); T('رحمة', 0, -34, 9, '#d32f2f', FD); ctx.restore();
    L([[430, 178], [430, 226]], 2.4, '#4a4a5a'); L([[540, 178], [540, 226]], 2.4, '#4a4a5a');
    R(398, 152, 174, 26, 6, '#1a0a3a', { lw: 2.4 }); ctx.save(); ctx.shadowColor = '#4ae0ff'; ctx.shadowBlur = 10; T('محطة الرحمة الفضائية', 485, 166, fit('محطة الرحمة الفضائية', 162, 14, FD), '#d8f8ff', FD); ctx.restore();
    ctx.fillStyle = '#4a5060'; ctx.fillRect(132, 258, 734, 16); for (let x = 132; x < 866; x += 24) { ctx.fillStyle = ((x - 132) / 24) % 2 ? '#ffd23f' : '#1a1a1a'; ctx.fillRect(x, 267, 12, 5); } L([[132, 273], [866, 273]], 2, '#1a1a24');
    ctx.fillStyle = '#2a2e3a'; ctx.fillRect(132, 274, 734, CT - 274); for (let x = 140; x < 866; x += 30) L([[x, 276], [x, CT]], 1, '#3a4050');
  },
};
function kioskPosts() {   // wooden posts and a beam: the cart has become a kiosk
  for (const x of [124, 858]) { R(x, 20, 16, CT - 30, 3, '#8a5228', { lw: 2.6, sd: 0.2 }); for (let k = 0; k < 5; k++) L([[x + 4, 70 + k * 44], [x + 12, 74 + k * 44]], 1.2, '#5a3418', 0.6); }
  R(124, 38, 750, 14, 3, '#9a6232', { lw: 2.4 });
}
function shopFront(a1, a2) {   // a proper shop: a solid sign band with bulbs, and stone pillars at the sides
  for (const x of [118, 856]) { R(x, 30, 24, CT - 40, 2, '#e8dcc8', { lw: 2.6, sd: 0.15 }); for (let k = 0; k < 6; k++) L([[x + 3, 60 + k * 38], [x + 21, 60 + k * 38]], 1.2, '#b8a888', 0.7); }
  ctx.fillStyle = a1; ctx.fillRect(0, 0, W, 34); for (let x = 30; x < W; x += 120) { ctx.fillStyle = a2; ctx.fillRect(x, 10, 60, 14); }
  ctx.save(); ctx.globalAlpha = 0.25; ctx.fillStyle = '#000'; ctx.fillRect(0, 0, W, 6); ctx.restore();
  ctx.fillStyle = '#d4a017'; ctx.fillRect(0, 34, W, 6); L([[0, 34], [W, 34]], 2, OLC); L([[0, 40], [W, 40]], 2.4, OLC);
  for (let x = 20; x < W; x += 40) { glow(x, 46, 12, '#ffe38a', 0.5); E(x, 46, 4.5, 5, '#fff6c8', { lw: 1.6, hl: 0.5, v: false }); }
}
function renderBG() {
  bg.width = cv.width; bg.height = cv.height;
  bgx.setTransform(SC * DPR, 0, 0, SC * DPR, 0, 0);
  withCtx(bgx, () => {
    const AK = area().k;
    if (AK !== 'hara') STREETS[AK](); else {
    // dusk sky over a hara in the Rahma universe
    const g = ctx.createLinearGradient(0, 0, 0, 250); g.addColorStop(0, '#2a1b5e'); g.addColorStop(0.55, '#8a3a8a'); g.addColorStop(1, '#ff9a4a'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, CT + 10);
    for (let i = 0; i < 46; i++) dot(140 + hash(i) * 720, 36 + hash(i + 50) * 100, hash(i + 9) * 1.4 + 0.5, `rgba(255,250,220,${0.4 + hash(i + 3) * 0.6})`);
    ctx.save(); ctx.translate(318, 78); ctx.rotate(-0.35); ctx.lineWidth = 4; ctx.strokeStyle = '#ffd8a8';
    ctx.beginPath(); ctx.ellipse(0, 0, 40, 9, 0, Math.PI, Math.PI * 2); ctx.stroke(); ctx.restore();
    glow(318, 78, 56, '#ffb8e0', 0.35); E(318, 78, 21, 21, '#e86ab0', { lw: 2.4, hl: 0.4, v: true });
    ctx.save(); ctx.translate(318, 78); ctx.rotate(-0.35); ctx.lineWidth = 4; ctx.strokeStyle = '#ffd8a8'; ctx.beginPath(); ctx.ellipse(0, 0, 40, 9, 0, 0, Math.PI); ctx.stroke(); ctx.restore();
    glow(660, 70, 50, '#fff6c8', 0.3); dot(660, 70, 17, '#fff6c8'); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(668, 64, 15, 0, Math.PI * 2); ctx.fill();
    // far skyline: domes, a minaret and roof clutter in silhouette
    ctx.fillStyle = '#4a2a6a';
    [[140, 170], [200, 150], [250, 176], [330, 160], [470, 168], [560, 156], [640, 172], [720, 150], [800, 166]].forEach(([x, y], i) => ctx.fillRect(x, y, 70 + hash(i) * 40, 100));
    ctx.beginPath(); ctx.arc(430, 170, 34, Math.PI, 0); ctx.fill(); ctx.fillRect(426, 124, 8, 16);
    ctx.fillRect(592, 92, 16, 90); ctx.fillRect(586, 120, 28, 6); ctx.beginPath(); ctx.moveTo(588, 92); ctx.lineTo(600, 70); ctx.lineTo(612, 92); ctx.fill();
    // the street's buildings
    const bld = (x, w, top, col, shut, rebar) => {
      R(x, top, w, 260 - top, 4, col, { lw: 3, sd: 0.1, hl: 0.05 });
      if (rebar) for (let i = 0; i < 6; i++) L([[x + 10 + i * (w - 20) / 5, top], [x + 12 + i * (w - 20) / 5, top - 16 - hash(i + x) * 10]], 2, '#5a3a2a');
      for (let ry = top + 16; ry < 176; ry += 50) for (let cx = x + 18; cx < x + w - 30; cx += 46) {
        const lit = hash(cx * 0.3 + ry) > 0.45;
        R(cx, ry, 30, 34, 3, lit ? '#ffd36a' : '#3a2a3a', { lw: 2.4, hl: 0 }); if (lit) glow(cx + 15, ry + 17, 26, '#ffd36a', 0.25);
        if (hash(cx + ry * 0.7) > 0.5) { R(cx - 9, ry, 9, 34, 2, shut, { lw: 1.8, hl: 0 }); R(cx + 30, ry, 9, 34, 2, shut, { lw: 1.8, hl: 0 }); }
        if (hash(cx * 1.3 + ry) > 0.65) { R(cx - 4, ry + 34, 38, 4, 1, '#3a3a3a', { lw: 1.6, hl: 0 }); for (let k = 0; k < 6; k++) L([[cx - 2 + k * 7, ry + 34], [cx - 2 + k * 7, ry + 48]], 1.6, '#3a3a3a'); L([[cx - 4, ry + 48], [cx + 34, ry + 48]], 2, '#3a3a3a'); }
        else if (hash(cx + ry) > 0.8) { R(cx + 34, ry + 6, 18, 14, 2, '#e8e8e0', { lw: 1.8 }); E(cx + 43, ry + 13, 4, 4, '#9aa4ac', { lw: 1.2 }); }
      }
      if (top > 50) { E(x + w - 26, top - 4, 12, 7, '#e8e8e0', { lw: 2, rot: -0.5 }); L([[x + w - 26, top + 2], [x + w - 22, top - 2]], 2); }
      // ground-floor shop with a half-rolled shutter
      R(x + 10, 220, w - 20, 40, 2, '#2a1810', { lw: 2.4, hl: 0 }); glow(x + w / 2, 250, w * 0.4, '#ffb347', 0.45);
      for (let k = 0; k < 4; k++) L([[x + 10, 222 + k * 4], [x + w - 10, 222 + k * 4]], 1.4, '#8a8a8a');
    };
    bld(140, 160, 66, '#d9a441', '#2e7d5a', 0); bld(300, 176, 46, '#e08a78', '#3a6a9a', 0); bld(520, 170, 84, '#3fa89a', '#8a4a2a', 0); bld(700, 166, 56, '#a8503a', '#2e5a7a', 1);
    // laundry between windows
    Q(320, 112, 390, 132, 460, 110, 1.4, '#2a2a2a'); ['#e53935', '#ffd23f', '#4a8bff', '#fff', '#2e9d4a'].forEach((c, i) => R(330 + i * 24, 116 + Math.sin(i) * 3 + (i === 2 ? 6 : 0), 16, 20, 2, c, { lw: 1.6, hl: 0 }));
    Q(714, 162, 780, 178, 850, 160, 1.4, '#2a2a2a'); ['#ff8ae8', '#fff', '#6be3ff', '#ffb347'].forEach((c, i) => R(726 + i * 30, 166 + (i % 2) * 3, 18, 16, 2, c, { lw: 1.6, hl: 0 }));
    // shop signs
    [[220, 'حلاق الرحمة', '#c62828'], [388, 'كشري العاعاعوط', '#ffd23f'], [605, 'عصير قصب الكون', '#2e9d4a'], [783, 'مكوجي الهصلاص', '#2e7fb8']].forEach(([x, s, c]) => {
      R(x - 68, 196, 136, 24, 4, c, { lw: 2.6 }); T(s, x, 209, fit(s, 124, 14, FD), c === '#ffd23f' ? '#5a1010' : '#fff', FD);
    });
    ctx.save(); ctx.translate(330, 182); ctx.rotate(-0.08); ctx.globalAlpha = 0.7; T('الرحمة', 0, 0, 26, '#ff3b8a', FD, 'center', 3, '#2a1206'); ctx.restore();
    ctx.save(); ctx.translate(560, 186); ctx.rotate(0.06); ctx.globalAlpha = 0.6; T('عاعاعا', 0, 0, 20, '#fff', FD, 'center', 3, '#1a3a6a'); ctx.restore();
    // wires and zeena flags across the street
    Q(140, 92, 500, 140, 866, 96, 1.4, '#1a1010'); Q(140, 150, 420, 186, 700, 150, 1.2, '#1a1010');
    for (let i = 0; i < 26; i++) { const k = i / 25, x = lerp(140, 866, k), y = (1 - k) * (1 - k) * 60 + 2 * k * (1 - k) * 100 + k * k * 62; PL([[x - 9, y], [x + 9, y + 1], [x, y + 16]], ['#e53935', '#ffd23f', '#2e9d4a', '#4a8bff', '#ff8ae8'][i % 5], { lw: 1.4, hl: 0 }); }
    // sidewalk + road
    ctx.fillStyle = '#b8ac98'; ctx.fillRect(132, 258, 734, 10); for (let x = 132; x < 866; x += 30) L([[x, 258], [x - 4, 268]], 1.2, '#8a7e6a');
    ctx.fillStyle = '#d4c8b0'; ctx.fillRect(132, 268, 734, 5); L([[132, 273], [866, 273]], 2, '#5a4e3e');
    road();
    }
    // blue-and-white tile wall behind the spit, with a neon sign
    ctx.fillStyle = '#eef3f6'; ctx.fillRect(0, 0, 132, CT + 10);
    for (let r = 0; r < 14; r++) for (let q = 0; q < 6; q++) { const x = q * 22, y = r * 22; ctx.strokeStyle = '#9fb4c4'; ctx.lineWidth = 1; ctx.strokeRect(x, y, 22, 22); if ((r + q) % 2) { ctx.fillStyle = '#2e6ab8'; ctx.beginPath(); ctx.moveTo(x + 11, y + 4); ctx.lineTo(x + 18, y + 11); ctx.lineTo(x + 11, y + 18); ctx.lineTo(x + 4, y + 11); ctx.fill(); } }
    ctx.save(); ctx.globalAlpha = 0.35; ctx.fillStyle = '#000'; ctx.fillRect(128, 0, 8, CT); ctx.restore();
    const ta = S.title && ACH.find(a => a.k === S.title), ny = ta ? -6 : 0;   // the sign moves up a little to fit the title line
    ctx.save(); ctx.shadowColor = '#ff3b8a'; ctx.shadowBlur = 16; T('شاورما', 66, 64 + ny, 30, '#ffd0ea', FD, 'center', 2, '#ff3b8a'); ctx.shadowColor = '#4ae0ff'; const nm = S.cos.neon && S.name ? S.name : 'الرحمة'; T(nm, 66, ta ? 84 : 96, fit(nm, 118, ta ? 18 : 20, FD), '#d8f8ff', FD, 'center', 2, '#2ab0e0');
    if (ta) { ctx.shadowColor = '#ffd23f'; ctx.shadowBlur = 8; T(ta.t, 66, 104, fit(ta.t, 116, 12), '#fff6c8', FB, 'center', 2, '#a86a00'); } ctx.restore();
    // shelf for the boombox
    const gfs = S.gifts.slice(-4), fgs = FIG.filter(k => S.fig[k]).slice(-5), fx0 = 256 + gfs.length * 26 + (gfs.length && fgs.length ? 4 : 0), shw = 110 + gfs.length * 26 + fgs.length * 25;   // the shelf grows to hold the last 4 gifts and 5 figures
    R(132, 116, shw, 10, 3, '#8a5228', { lw: 2.4 }); L([[150, 126], [140, 140]], 3, '#5a3418'); L([[224, 126], [234, 140]], 3, '#5a3418'); if (gfs.length) L([[132 + shw - 14, 126], [132 + shw - 4, 140]], 3, '#5a3418');
    gfs.forEach((k, i) => T(GIFT[k][0], 256 + i * 26, 103, 22, '#000'));
    fgs.forEach((k, i) => { ctx.save(); ctx.translate(fx0 + i * 25, 112); ctx.scale(0.075, 0.075); CH[k].d(1, 0); ctx.restore(); });
    // Abu Hasiba's kiosk
    ctx.fillStyle = '#2f4a3a'; ctx.fillRect(862, 34, W - 862, CT - 34); ctx.save(); ctx.globalAlpha = 0.35; ctx.fillStyle = '#000'; ctx.fillRect(858, 34, 6, CT - 34); ctx.restore();
    R(866, 50, 92, 32, 4, '#ffd23f', { lw: 2.6 }); T('كشك أبو حسيبة', 912, 67, fit('كشك أبو حسيبة', 84, 15, FD), '#c62828', FD);
    for (let i = 0; i < 7; i++) { const x = 872 + i * 12.5, c = ['#e53935', '#ffb347', '#4a8bff', '#2e9d4a', '#ff8ae8', '#ffd23f', '#8a4ad8'][i]; L([[x, 82], [x, 86]], 1.2, '#2a2a2a'); R(x - 5, 86, 10, 10 + (i % 2) * 4, 2, c, { lw: 1.4, hl: 0.2 }); }
    R(864, 134, 96, 8, 2, '#8a5228', { lw: 2.2 }); R(864, 200, 96, 6, 2, '#6a3a18', { lw: 1.8 });
    for (let i = 0; i < 6; i++) R(870 + i * 15, 182 - (i % 3) * 4, 12, 18 + (i % 3) * 4, 2, ['#c62828', '#f4f2ec', '#2e7fb8', '#ffd23f', '#2e9d4a', '#ff8a3d'][i], { lw: 1.4, hl: 0.15 });
    // striped awning across the top (a kiosk adds posts and a beam; a shop swaps it for a sign band)
    const [aw1, aw2] = awCols();
    if (S.grow >= 2) shopFront(aw1, aw2); else {
    if (S.grow) kioskPosts();
    for (let x = 0; x < W; x += 40) { ctx.fillStyle = (x / 40) % 2 ? aw2 : aw1; ctx.fillRect(x, 0, 40, 26); }
    for (let x = 0; x < W; x += 40) { ctx.beginPath(); ctx.arc(x + 20, 26, 20, 0, Math.PI); ctx.fillStyle = (x / 40) % 2 ? aw2 : aw1; ctx.fill(); ctx.lineWidth = 2.4; ctx.strokeStyle = OLC; ctx.stroke(); }
    L([[0, 26], [W, 26]], 2.4, OLC); ctx.save(); ctx.globalAlpha = 0.2; ctx.fillStyle = '#000'; ctx.fillRect(0, 0, W, 8); ctx.restore();
    }
    // counter back ledge + steel counter
    R(-6, CT - 14, W + 12, 22, 4, '#c27a3a', { lw: 3, sd: 0.15 });
    const sg = ctx.createLinearGradient(0, CT, 0, H), gc = S.cos.gold ? ['#c9961a', '#ffe08a', '#9a6a10'] : S.grow >= 2 ? ['#d6d2ca', '#f6f4f0', '#b4aea4'] : ['#b7c1c7', '#dfe5e8', '#8f9aa1']; sg.addColorStop(0, gc[0]); sg.addColorStop(0.15, gc[1]); sg.addColorStop(1, gc[2]); ctx.fillStyle = sg; ctx.fillRect(0, CT + 6, W, H - CT);
    ctx.save(); ctx.globalAlpha = 0.25; for (let i = 0; i < 24; i++) L([[i * 44, CT + 10], [i * 44 + 30, H]], 1, '#ffffff'); ctx.restore();
    if (S.grow >= 2 && !S.cos.gold) for (let i = 0; i < 9; i++) { const x = hash(i + 40) * W, y = CT + 20 + hash(i + 50) * 200; Q(x, y, x + 40, y + 20 - hash(i) * 40, x + 90, y + 10, 1.2, '#9a948a', 0.5); }
    L([[0, CT + 7], [W, CT + 7]], 3, OLC);
    ctx.fillStyle = 'rgba(0,0,0,.12)'; ctx.fillRect(0, H - 14, W, 14);
  });
  bgDirty = false; bgK = bgKey();
}

