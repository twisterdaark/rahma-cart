// ---------- customers (origin bottom-centre, ~240 tall) ----------
const CH = {
  hafo: { n: 'الحافوزليق', vp: 0.55, f: 170, joy: ['حافوزلقتني!', 'ده الطعم الأصلي!'], d(m, t) {
    const sk = '#a2a256';
    B([[-74, 14], [-66, -42], [-20, -64], [20, -64], [66, -42], [74, 14]], '#6d5536');
    for (let i = -2; i <= 2; i++) L([[i * 22, -40], [i * 24 + 4, 10]], 1.6, OLC, 0.4);
    E(0, -58, 26, 22, sk);
    const w = Math.sin(t * 4) * 5;
    for (const s of [-1, 1]) {
      B([[s * 28, -168], [s * 112, -196 + w * s], [s * 158, -204 + w * s], [s * 128, -172], [s * 52, -122]], sk);
      B([[s * 48, -158], [s * 120, -188 + w * s], [s * 136, -190 + w * s], [s * 60, -138]], '#c08f7c', { ol: false, shade: false });
    }
    E(0, -142, 60, 66, sk);
    WR(0, -190, 30, 3, 6, 0.55);
    EYE(-22, -152, 12, { iris: '#d8b62a', lid: m === 1 ? 0.25 : 0.42, skin: sk, bag: 1, lx: 0.1 }); EYE(22, -152, 12, { iris: '#d8b62a', lid: m === 1 ? 0.25 : 0.42, skin: sk, bag: 1, lx: -0.1 });
    brows(m, 0, -170, 24, 26, 5, '#4f5420');
    NOSE(0, -126, 17, 18, shade(sk, -0.06));
    GRIN(0, -98, 36, 10, m, { lip: '#6e6a32' });
    Q(-44, -112, -48, -92, -40, -80, 1.8, OLC, 0.5); Q(44, -112, 48, -92, 40, -80, 1.8, OLC, 0.5);
  } },
  aao: { n: 'العاعاعوط', vp: 1.6, f: 300, joy: ['عاعاعاعاعا!', 'عاعا تحفة!'], d(m, t) {
    const sq = 1 + Math.sin(t * 4) * 0.02;
    ctx.save(); ctx.scale(1 / sq, sq);
    const p = new Path2D(); p.moveTo(-66, 24); p.lineTo(-64, -110); p.bezierCurveTo(-62, -246, 62, -246, 64, -110); p.lineTo(66, 24); p.closePath();
    ink(p, '#f02417', { b: [-10, -130, 110], sd: 0.2, hl: 0.3 });
    ctx.restore();
    const sk = '#f02417';
    EYE(-13, -146, 5.5, { lid: m === 2 ? 0.55 : 0.35, skin: sk, ir: 0.7 }); EYE(13, -146, 5.5, { lid: m === 2 ? 0.55 : 0.35, skin: sk, ir: 0.7 });
    Q(-4, -136, 0, -124, 4, -136, 2, OLC, 0.6);
    if (m === 0) { E(0, -112, 9, 5, '#b8160e', { lw: 2.2, hl: 0.3 }); } else LIPS(0, -112, 11, m, '#b8160e');
  } },
  aaota: { n: 'العاعاعوطة', vp: 1.9, f: 360, joy: ['دموع الفرح يا أسطى', 'عاعاعوطتني!'], d(m, t) {
    const sk = '#f3f1ec';
    torso(74, -76, '#55505e'); neck(40, -112, -64, sk);
    E(0, -156, 52, 66, sk, { sd: 0.12, hl: 0.4 });                       // smooth bald egg head
    for (const s of [-1, 1]) { glow(s * 20, -150, 18, '#ff2a3a', 0.32); EYE(s * 20, -150, 10, { sy: 0.62, scl: '#fbe3e3', iris: '#8e0f1e', ir: 0.62, lid: m === 2 ? 0.3 : 0.12, skin: sk }); }
    const tr = (t * 0.6) % 1;
    L([[20, -144], [21, -124], [22, -110 + tr * 8]], 4.5, '#a8101a'); E(22, -107 + tr * 8, 4, 5.5, '#c4161c', { lw: 1.4 });
    L([[-20, -144], [-21, -132]], 3.5, '#a8101a', 0.9); dot(-21, -130, 3, '#c4161c');
    dot(-4, -128, 2, '#b8a8a0'); dot(4, -128, 2, '#b8a8a0');
    if (m === 1) Q(-11, -112, 0, -106, 11, -112, 2.2, '#9a6a6a'); else if (m === 2) Q(-10, -108, 0, -114, 10, -108, 2.2, '#9a6a6a'); else L([[-9, -110], [9, -110]], 2, '#a07a7a');
    if (m === 1) blush(0, -126, 36, 0.25);
  } },
  hank: { n: 'الحنكليس', vp: 0.8, f: 200, joy: ['حنكلستها صح!', 'الحنكليس مبسوط!'], d(m, t) {
    const sk = '#9cc24a';
    torso(84, -74, '#efe6cc');
    for (const s of [-1, 1]) B([[s * 86, 40], [s * 86, -34], [s * 66, -66], [s * 30, -74], [s * 40, 40]], '#6b4a2a');   // Shrek's vest
    neck(54, -104, -60, sk);
    for (const s of [-1, 1]) { PL([[s * 58, -160], [s * 84, -168], [s * 86, -150], [s * 58, -146]], sk); E(s * 90, -159, 8, 15, shade(sk, -0.12)); E(s * 91, -159, 4, 9, '#3f5a1a', { ol: false, shade: false }); }
    B([[-60, -112], [-66, -160], [-46, -198], [0, -208], [46, -198], [66, -160], [60, -112], [36, -84], [0, -78], [-36, -84]], sk);
    B([[-44, -168], [-20, -178], [0, -172], [20, -178], [44, -168], [20, -162], [-20, -162]], shade(sk, -0.08), { hl: 0.05 });   // heavy brow ridge
    EYE(-21, -152, 9.5, { iris: '#6b4423', lid: 0.3, skin: sk, lx: 0.1 }); EYE(21, -152, 9.5, { iris: '#6b4423', lid: 0.3, skin: sk, lx: -0.1 });
    brows(m, 0, -170, 22, 26, 7, '#4a6a1a');
    NOSE(0, -132, 16, 13, shade(sk, -0.06));
    GRIN(0, -110, 42, 10, m === 2 ? 2 : 1, { lip: '#6e8a2a' });   // the meme's huge grin
    blush(-44, -122, 14, 0.22); blush(44, -122, 14, 0.22);
    Q(-50, -128, -46, -112, -38, -104, 1.6, OLC, 0.45); Q(50, -128, 46, -112, 38, -104, 1.6, OLC, 0.45);
  } },
  zarb: { n: 'الزربوطان', vp: 0.45, f: 140, joy: ['زربطتها يا كبير', 'كمان واحد!'], d(m, t) {
    const sk = '#7fb240';
    E(0, -26, 94, 76, sk);
    const tp = new Path2D(); tp.moveTo(-52, 42); tp.lineTo(-46, -62); tp.quadraticCurveTo(0, -30, 46, -62); tp.lineTo(52, 42); tp.closePath(); ink(tp, '#f2f0ea', { b: [0, -10, 60] });
    dot(-12, -8, 7, 'rgba(210,160,40,.3)'); dot(16, 12, 5, 'rgba(210,160,40,.3)');
    for (const s of [-1, 1]) PL([[s * 40, -142], [s * 66, -150], [s * 46, -126]], sk);
    E(0, -124, 54, 48, sk); E(0, -88, 30, 10, sk, { hl: 0 });
    EYE(-18, -136, 9, { iris: '#5a3a1a', lid: m === 2 ? 0.35 : 0.5, skin: sk }); EYE(18, -136, 9, { iris: '#5a3a1a', lid: m === 2 ? 0.35 : 0.5, skin: sk });
    if (m === 2) brows(2, 0, -152, 18, 18, 6, '#3d5a1c');
    if (m === 0) Q(-18, -104, 6, -96, 26, -112, 4); else GRIN(0, -108, 22, 7, m);
    const a = Math.sin(t * 2) * 0.12;
    ctx.save(); ctx.translate(70, -40); ctx.rotate(a);
    const g = RRp(-15, -74, 30, 50, 6); ctx.fillStyle = 'rgba(215,238,255,.6)'; ctx.fill(g); ctx.fillStyle = '#e8a52e'; ctx.fillRect(-12, -54, 24, 27); ctx.lineWidth = 2.5; ctx.strokeStyle = OLC; ctx.stroke(g);
    E(0, -16, 22, 28, sk);
    ctx.restore();
  } },
  jab: { n: 'الجعبوق', vp: 0.3, f: 110, joy: ['جعبقني الطعم!', 'جعبوقي!'], d(m, t) {
    const sk = '#262629', sk2 = '#3a3a3f';
    for (const s of [-1, 1]) {   // long spindly arms resting on the counter
      L([[s * 30, -70], [s * 76, -40], [s * 62, -4]], 10, OLC); L([[s * 30, -70], [s * 76, -40], [s * 62, -4]], 6, sk2);
      for (let k = -1; k <= 1; k++) L([[s * 62, -4], [s * 62 + k * 10, 12]], 3.5, OLC);
    }
    B([[-36, 40], [-40, -30], [-30, -74], [0, -92], [30, -74], [40, -30], [36, 40]], sk, { hl: 0.1 });   // hunched narrow torso
    for (let i = 0; i < 4; i++) Q(-20, -50 + i * 11, 0, -44 + i * 11, 20, -50 + i * 11, 1.4, '#55555c', 0.8);
    const nk = new Path2D(); nk.moveTo(-8, -84); nk.quadraticCurveTo(-6, -130, 6, -164); nk.lineTo(18, -160); nk.quadraticCurveTo(8, -126, 10, -84); nk.closePath(); ink(nk, sk, { b: [4, -120, 50], hl: 0.08 });
    const sw = Math.sin(t * 1.5) * 0.08;
    ctx.save(); ctx.translate(10, -170); ctx.rotate(sw - 0.1);
    B([[6, -10], [34, -46], [58, -62], [40, -32], [18, 8]], sk, { hl: 0.1 });
    B([[-6, -10], [-60, -4], [-134, 4], [-60, 8], [-6, 12]], sk2, { hl: 0.18 });
    if (m === 1) B([[-8, 8], [-50, 18], [-98, 26], [-50, 22], [-8, 16]], sk2);
    E(0, 0, 22, 18, sk, { hl: 0.14 });
    glow(-6, -3, 16, '#ff2020', 0.65);
    ctx.save(); ctx.translate(-6, -3); ctx.rotate(-0.25); E(0, 0, m === 2 ? 8 : 7, m === 2 ? 3.5 : 2.6, '#ff3a2a', { lw: 1.2, hl: 0 }); ctx.restore();
    ctx.restore();
  } },
  sakr: { n: 'السكرتح', vp: 0.4, f: 130, joy: ['سكرتحتني من الحلاوة', 'سكرتح سعيد!'], d(m, t) {
    const sk = '#a29a8b';
    for (const s of [-1, 1]) { B([[s * 40, -30], [s * 74, -8], [s * 82, 14], [s * 58, 14], [s * 44, -6]], shade(sk, -0.08)); for (let k = 0; k < 3; k++) L([[s * (60 + k * 8), 14], [s * (58 + k * 8), 24]], 3, '#e8e0c8'); }
    for (let i = 0; i < 6; i++) { const x = -50 + i * 20, y = -40 - Math.abs(x) * -0.12; PL([[x - 7, y + 6], [x + 3, y - 20], [x + 7, y + 6]], '#6e675b', { lw: 2 }); }   // spine spikes
    E(0, -4, 64, 44, '#8d8476');
    for (let i = 0; i < 4; i++) Q(-36 + i * 3, -16 + i * 9, 0, -26 + i * 9, 36 - i * 3, -16 + i * 9, 2, '#5e574d', 0.8);
    E(0, -66, 24, 42, '#8d8476');
    ctx.save(); ctx.translate(-6, -128); ctx.rotate(-0.15 + Math.sin(t * 2) * 0.05);
    B([[-88, 6], [-60, -20], [0, -34], [60, -26], [80, 0], [50, 26], [-40, 24]], sk);
    for (let i = 0; i < 3; i++) Q(10 + i * 14, -30, 16 + i * 14, -20, 10 + i * 14, -8, 1.5, OLC, 0.4);
    EYE(28, -10, 7.5, { iris: '#c9a227', ir: 0.7, lid: m === 2 ? 0.45 : 0.25, skin: sk }); EYE(48, -6, 6.5, { iris: '#c9a227', ir: 0.7, lid: m === 2 ? 0.45 : 0.25, skin: sk });
    const jaw = m === 0 ? 4 : m === 1 ? 16 : 10;
    const mp = new Path2D(); mp.moveTo(-84, 4); mp.quadraticCurveTo(-40, 6, -6, 10); mp.lineTo(-8, 10 + jaw); mp.quadraticCurveTo(-40, 8 + jaw, -80, 8 + jaw * 0.5); mp.closePath();
    ctx.fillStyle = '#3a0d0a'; ctx.fill(mp);
    for (let i = 0; i < 8; i++) { const x = -78 + i * 9; ctx.beginPath(); ctx.moveTo(x, 4 + i * 0.6); ctx.lineTo(x + 4, 13 + i * 0.6); ctx.lineTo(x + 8, 4 + i * 0.6); ctx.fillStyle = '#f6efd0'; ctx.fill(); ctx.lineWidth = 1; ctx.strokeStyle = OLC; ctx.stroke(); }
    ctx.lineWidth = 3; ctx.strokeStyle = OLC; ctx.stroke(mp);
    ctx.restore();
  } },
  has: { n: 'الهصلاص', vp: 1.3, f: 260, joy: ['هصلص هصلص!', 'الهصلاص راضي'], d(m, t) {
    E(0, 2, 62, 46, '#f2f0ea');   // white feathered body like the meme
    for (let r = 0; r < 2; r++) for (let i = -2; i <= 2; i++) Q(i * 22 - 14, 12 - r * 16, i * 22, -4 - r * 16, i * 22 + 14, 12 - r * 16, 2, '#b8b2a6', 0.8);
    const nk = new Path2D(); nk.moveTo(-26, -30); nk.quadraticCurveTo(-34, -90, -20, -120); nk.lineTo(20, -120); nk.quadraticCurveTo(34, -90, 26, -30); nk.closePath(); ink(nk, '#f6f5ef', { b: [0, -80, 50] });
    for (let i = 0; i < 5; i++) Q(-18, -48 - i * 14, -8, -54 - i * 14, 0, -48 - i * 14, 1.4, '#9a958a', 0.6);
    E(0, -140, 42, 40, '#ffffff', { sd: 0.12 });
    const bk = new Path2D(); bk.moveTo(16, -148); bk.quadraticCurveTo(84, -152, 68, -104); bk.quadraticCurveTo(60, -118, 46, -120); bk.lineTo(16, -126); bk.closePath(); ink(bk, '#f4b400', { b: [40, -130, 30] });
    if (m === 1) PL([[18, -124], [52, -112], [20, -108]], '#d89a00');
    EYE(-6, -148, 9, { iris: '#c58a12', ir: 0.7, pr: 0.9, lid: 0.25, skin: '#ffffff' });
    BROW(-6, -162, 32, m === 2 ? 0.45 : 0.18, 6, '#8a8478');
  } },
  zool: { n: 'أبو الزول', vp: 0.7, f: 180, joy: ['الأهرامات مبسوطة منك', 'زولي يا زولي!'], d(m, t) {
    E(0, 0, 76, 40, '#d4a345');
    const p = new Path2D(); p.moveTo(-84, -14); p.lineTo(-62, -150); p.quadraticCurveTo(0, -220, 62, -150); p.lineTo(84, -14); p.closePath();
    ctx.fillStyle = '#e8bd58'; ctx.fill(p); ctx.save(); ctx.clip(p); for (let y = -215; y < 0; y += 20) { ctx.fillStyle = '#2b55a8'; ctx.fillRect(-90, y, 180, 8); } ctx.fillStyle = 'rgba(0,0,0,.18)'; ctx.fillRect(20, -220, 80, 220); ctx.restore();
    ctx.lineWidth = 3.6; ctx.strokeStyle = OLC; ctx.stroke(p);
    E(0, -122, 42, 50, '#4e3526');
    R(-6, -84, 12, 30, 4, '#2b55a8');
    R(-42, -152, 38, 22, 9, '#ffffff', { hl: 0.5 }); R(4, -152, 38, 22, 9, '#ffffff', { hl: 0.5 });
    ctx.fillStyle = '#141420'; ctx.fill(RRp(-37, -148, 28, 14, 6)); ctx.fill(RRp(9, -148, 28, 14, 6));
    dot(-28, -145, 2.5, 'rgba(255,255,255,.8)'); dot(18, -145, 2.5, 'rgba(255,255,255,.8)');
    NOSE(0, -116, 11, 12, '#46301f');
    LIPS(0, -98, 15, m, '#3a2418');
  } },
  floba: { n: 'فلوبا', vp: 0.9, f: 210, joy: ['Magnifique يا باشا', 'فلوبا يحييك'], d(m, t) {
    const sk = '#c8955c';
    torso(80, -80, '#22222a', { hl: 0.12 });
    PL([[-24, -78], [24, -78], [0, -10]], '#ffffff', { lw: 2.5 }); PL([[-7, -74], [7, -74], [4, -24], [0, -16], [-4, -24]], '#c62828', { lw: 2 });
    for (const s of [-1, 1]) PL([[s * 24, -78], [s * 44, -70], [s * 10, -16]], '#18181e', { lw: 2.2 });   // lapels
    for (const s of [-1, 1]) { PL([[s * 22, -150], [s * 56, -218], [s * 44, -118]], sk); L([[s * 56, -218], [s * 60, -244]], 5, '#1a1410'); }
    for (const s of [-1, 1]) E(s * 32, -104, 24, 18, sk);    // fat Floppa cheeks
    E(0, -122, 52, 46, sk); E(0, -102, 26, 17, '#f2e2c8', { hl: 0.3 });
    L([[-16, -124], [-20, -108]], 3, '#3a2416'); L([[16, -124], [20, -108]], 3, '#3a2416');
    L([[-40, -134], [-26, -126]], 3, '#3a2416'); L([[40, -134], [26, -126]], 3, '#3a2416');
    EYE(-18, -128, 9, { iris: '#e8b52c', lid: 0.3, skin: sk }); EYE(18, -128, 9, { iris: '#e8b52c', lid: 0.3, skin: sk });
    brows(m, 0, -144, 18, 14, 4, '#3a2416');
    PL([[-6, -114], [6, -114], [0, -107]], '#3a2416', { lw: 2 });
    LIPS(0, -97, 10, m, '#7a4e36');
    ctx.save(); ctx.translate(0, -160); ctx.rotate(Math.sin(t * 2) * 0.06);
    E(0, 0, 64, 11, '#181818', { hl: 0.1 }); R(-36, -44, 72, 44, 12, '#1d1d1d', { hl: 0.12 }); ctx.fillStyle = '#7a1f1f'; ctx.fillRect(-34, -13, 68, 9);
    ctx.restore();
  } },
  abkh: { n: 'الأبخنوس', vp: 1.7, f: 320, joy: ['تاني تاني تاني!', 'أبخنوس يحبك'], d(m, t) {
    const sk = '#d6302c';
    const p = new Path2D();   // one continuous Teletubby suit: hood + body
    p.moveTo(-74, 40); p.lineTo(-72, -40); p.quadraticCurveTo(-70, -84, -40, -98);
    p.bezierCurveTo(-62, -130, -56, -198, 0, -200); p.bezierCurveTo(56, -198, 62, -130, 40, -98);
    p.quadraticCurveTo(70, -84, 72, -40); p.lineTo(74, 40); p.closePath();
    ink(p, sk, { b: [-10, -110, 110], hl: 0.25 });
    for (const s of [-1, 1]) B([[s * 64, -70], [s * 92, -44], [s * 96, -8], [s * 78, -4], [s * 68, -40]], sk);
    R(-28, -66, 56, 40, 8, '#c4c8ce', { hl: 0.45 });
    L([[0, -198], [0, -226]], 8, OLC); L([[0, -198], [0, -226]], 4, sk);
    ctx.beginPath(); ctx.arc(0, -240, 13, 0, Math.PI * 2); ctx.lineWidth = 9; ctx.strokeStyle = OLC; ctx.stroke(); ctx.lineWidth = 5; ctx.strokeStyle = sk; ctx.stroke();   // Po's ring antenna
    E(0, -144, 33, 31, '#eebf9b', { hl: 0.3 });
    EYE(-12, -152, 7, { iris: '#3a2416', ir: 0.7, lid: 0.25, skin: '#eebf9b' }); EYE(12, -152, 7, { iris: '#3a2416', ir: 0.7, lid: 0.25, skin: '#eebf9b' });
    NOSE(0, -142, 6, 6, '#e0ae8a');
    blush(-20, -136, 9, 0.4); blush(20, -136, 9, 0.4);
    LIPS(0, -130, 10, m, '#b86a5a');
  } },
  prince: { n: 'البرنس', vp: 0.9, f: 190, joy: ['البرنس راضي عنك', 'عاش يا برنس'], d(m, t) {
    torso(78, -76, '#2a2a32'); neck(44, -104, -62, '#7a4a2c');
    // squarish head: dark mask over the eyes, orange-brown lower face with a big droopy nose
    const hp = new Path2D(); hp.moveTo(-50, -100); hp.quadraticCurveTo(-58, -160, -46, -192); hp.quadraticCurveTo(0, -214, 46, -192); hp.quadraticCurveTo(58, -160, 50, -100); hp.quadraticCurveTo(0, -78, -50, -100); hp.closePath();
    ink(hp, '#b4703c', { b: [0, -150, 60] });
    ctx.save(); ctx.clip(hp); const up = new Path2D(); up.moveTo(-70, -220); up.lineTo(70, -220); up.lineTo(70, -132); up.quadraticCurveTo(0, -118, -70, -132); up.closePath(); ink(up, '#3e2418', { b: [0, -170, 60], ol: false }); ctx.restore();
    ctx.lineWidth = 3.6; ctx.strokeStyle = OLC; ctx.stroke(hp);
    for (const s of [-1, 1]) { E(s * 20, -154, 13, 13, '#f6f2e8', { sd: 0.08, hl: 0, lw: 2.8 }); dot(s * 19, -153, m === 2 ? 3 : 4.2, '#0d0806'); dot(s * 19 - 1.5, -156, 1.4, '#fff'); }
    BROW(-20, -172, 22, m === 2 ? 0.45 : 0.1, 5, '#120806'); BROW(20, -172, 22, m === 2 ? -0.45 : -0.1, 5, '#120806');
    B([[-12, -138], [12, -138], [22, -114], [10, -104], [-10, -104], [-22, -114]], '#c27d48', { sd: 0.2 });
    dot(-7, -109, 3, '#3a1a10'); dot(7, -109, 3, '#3a1a10');
    LIPS(0, -96, 13, m, '#6e3a24');
  } },
  abbas: { n: 'عباس دي واترسون', vp: 0.4, f: 120, joy: ['عضلاتي بتشكرك', 'بروتين يا وحش!'], d(m, t) {
    const sk = '#e88a82', f = Math.sin(t * 4) * 3;
    E(-94, -44 - f, 34, 42, sk); E(94, -44 - f, 34, 42, sk);
    E(0, -10, 96, 56, sk);
    B([[-62, -56], [-24, -98], [24, -98], [62, -56], [0, -46]], sk);   // traps up to the neck
    Q(-48, -26, -26, -2, -4, -26, 2.5, '#a0504a'); Q(4, -26, 26, -2, 48, -26, 2.5, '#a0504a');
    for (let i = 0; i < 9; i++) E(-48 + i * 12, -40 + Math.abs(i - 4) * 5, 6, 4, '#c9c9c9', { lw: 1.5, hl: 0.5 });
    E(0, -128, 36, 40, sk);
    B([[-34, -126], [-28, -94], [0, -84], [28, -94], [34, -126], [18, -104], [-18, -104]], '#1a1210', { hl: 0.1 });
    EYE(-13, -140, 7, { iris: '#3a2416', lid: 0.45, skin: sk }); EYE(13, -140, 7, { iris: '#3a2416', lid: 0.45, skin: sk });
    BROW(-13, -152, 18, 0.15, 7, '#1a0d08'); BROW(13, -156, 18, -0.35, 7, '#1a0d08');   // smug raised brow
    for (const s of [-1, 1]) L([[0, -114], [s * 12, -117], [s * 24, -114], [s * 31, -119], [s * 30, -127], [s * 24, -126]], 6.5, '#1a1210');   // curly handlebar moustache
    if (m === 1) GRIN(0, -106, 13, 5, 1); else if (m === 2) GRIN(0, -102, 12, 5, 2); else Q(-6, -105, 6, -102, 14, -108, 3);
  } },
  shawqy: { n: 'أبو شوقي', vp: 0.5, f: 150, joy: ['أبو شوقي بيشكرك', 'برد وحلاوة!'], d(m, t) {
    for (const s of [-1, 1]) { ctx.save(); ctx.translate(s * 60, -40); ctx.rotate(s * (0.25 + Math.sin(t * 3) * 0.08)); B([[0, -30], [s * 44, -20], [s * 62, 20], [s * 40, 50], [0, 40]], '#5a3c22'); for (let k = 0; k < 3; k++) Q(s * (10 + k * 14), -14 + k * 6, s * (22 + k * 14), 10 + k * 6, s * (14 + k * 14), 36, 1.5, OLC, 0.5); ctx.restore(); }   // folded eagle wings
    E(0, 4, 74, 50, '#6e4a2c');
    for (let r = 0; r < 3; r++) for (let i = -2; i <= 2; i++) Q(i * 20 - 10, -30 + r * 16, i * 20, -40 + r * 16, i * 20 + 10, -30 + r * 16, 1.6, '#3e2410', 0.7);   // chest feathers
    B([[-58, -58], [-42, -98], [0, -106], [42, -98], [58, -58], [30, -44], [0, -38], [-30, -44]], '#f2efe6', { sd: 0.15 });   // white fur ruff joins head to body
    for (let i = 0; i < 9; i++) L([[-44 + i * 11, -50 + Math.abs(i - 4) * 2], [-46 + i * 11, -40 + Math.abs(i - 4) * 2]], 1.4, '#a8a29a', 0.8);
    for (const s of [-1, 1]) { E(s * 42, -180, 15, 15, '#f2efe6'); E(s * 42, -180, 7, 7, '#d4c2ba', { ol: false, shade: false }); }
    E(0, -140, 60, 54, '#f2efe6', { sd: 0.14 });
    E(0, -120, 30, 21, '#e6e0d2');
    E(0, -130, 12, 8, '#1a1a1a', { hl: 0.4 });
    EYE(-21, -152, 6.5, { pr: 1.2, ir: 0.7 }); EYE(21, -152, 6.5, { pr: 1.2, ir: 0.7 });
    brows(m, 0, -164, 21, 13, 4, '#a8a29a');
    LIPS(0, -112, 10, m, '#4a3a3a');
  } },
  shamq: { n: 'شمقمق', vp: 1.1, f: 240, joy: ['شمقمقتني يا جدع', 'إيييي إيييي!'], d(m, t) {
    const sk = '#a3abb8';
    torso(74, -74, '#5a6a8a'); neck(42, -110, -62, sk);
    E(-50, -146, 9, 13, shade(sk, -0.08));
    E(-6, -150, 48, 50, sk, { hl: 0.35 });   // bald grey cranium
    const sn = new Path2D(); sn.moveTo(16, -160); sn.quadraticCurveTo(72, -152, 114, -128); sn.quadraticCurveTo(120, -119, 108, -115); sn.quadraticCurveTo(64, -106, 14, -112); sn.closePath();
    ink(sn, sk, { b: [60, -132, 50] });   // dolphin snout
    Q(18, -122, 62, -117, 107, -121, 2.6);
    if (m === 1) Q(30, -118, 62, -108, 96, -119, 2, OLC, 0.6);
    EYE(-8, -158, 9, { iris: '#5a4030', lx: 0.45, lid: m === 2 ? 0.45 : 0.3, skin: sk, bag: 1 }); EYE(18, -160, 8, { iris: '#5a4030', lx: 0.45, lid: m === 2 ? 0.45 : 0.3, skin: sk });
    brows(m, 5, -174, 13, 14, 4, '#6a7280');
    dot(-14, -196, 3, '#6a7280');
  } },
  dola: { n: 'الدولازليق', vp: 0.35, f: 100, joy: ['دولازلقتني!', 'طاير من الفرحة'], d(m, t) {
    const sk = '#8e8a86', fl = Math.sin(t * 5) * 0.12;
    for (const s of [-1, 1]) {   // seagull wings
      ctx.save(); ctx.translate(s * 40, -110); ctx.rotate(s * (-0.35 + fl));
      B([[0, 10], [s * 60, -40], [s * 140, -70], [s * 168, -60], [s * 120, -20], [s * 60, 14]], '#f2f2ee', { sd: 0.12 });
      B([[s * 118, -62], [s * 168, -60], [s * 138, -40]], '#6a6e74', { shade: false });
      for (let k = 0; k < 3; k++) Q(s * (50 + k * 30), -14 - k * 14, s * (66 + k * 30), -30 - k * 14, s * (70 + k * 30), -6 - k * 16, 1.4, '#b8b8b0', 0.8);
      ctx.restore();
    }
    E(0, -6, 88, 64, sk);
    for (let i = 0; i < 3; i++) Q(-60 + i * 8, -40 + i * 14, 0, -50 + i * 14, 60 - i * 8, -40 + i * 14, 1.8, '#6a6662', 0.7);
    B([[-50, -150], [-10, -176], [50, -168], [96, -140], [104, -112], [80, -96], [20, -92], [-44, -104]], sk);   // rhino head
    PL([[64, -142], [78, -198], [90, -138]], '#d8cfc0'); PL([[38, -160], [46, -182], [54, -162]], '#d8cfc0');
    PL([[-30, -166], [-42, -200], [-14, -172]], sk);
    EYE(14, -146, 6, { iris: '#3a2416', lid: m === 2 ? 0.5 : 0.35, skin: sk });
    dot(96, -118, 3, OLC);
    if (m === 1) GRIN(76, -102, 16, 4, 1); else Q(58, -101, 80, -97, 98, -105, 2.4);
    Q(-20, -130, -10, -116, -24, -104, 1.6, OLC, 0.5); Q(30, -108, 44, -100, 56, -106, 1.6, OLC, 0.5);
  } },
  barber: { n: 'حلاق الرحمة', vp: 0.8, f: 175, nf: 1, joy: ['نعيمًا يا معلم! ✂️', 'قصّة ولا أروع'], d(m, t) {
    const sk = '#d9a27a';
    torso(80, -76, '#f6f4ee'); L([[0, -76], [0, 40]], 2, '#c8c2b4');   // white barber's coat
    for (let i = 0; i < 3; i++) dot(-10, -50 + i * 22, 3, '#9aa4ac');
    R(30, -52, 26, 30, 4, '#e6e2d8', { lw: 2 }); R(36, -66, 5, 22, 2, '#2a2a30', { lw: 1.4, hl: 0 }); for (let k = 0; k < 4; k++) L([[41, -62 + k * 5], [46, -62 + k * 5]], 1.4, '#2a2a30');   // comb in the pocket
    neck(40, -104, -64, sk);
    for (const s of [-1, 1]) E(s * 47, -146, 8, 12, shade(sk, -0.08));
    E(0, -150, 46, 54, sk, { sd: 0.12 });
    const hp = new Path2D(); hp.moveTo(-48, -146); hp.quadraticCurveTo(-56, -214, -2, -214); hp.quadraticCurveTo(52, -214, 50, -148); hp.lineTo(44, -160); hp.quadraticCurveTo(34, -180, 12, -180);
    hp.lineTo(-12, -190); hp.quadraticCurveTo(-34, -176, -42, -160); hp.closePath();
    ink(hp, '#15100c', { b: [0, -196, 50], hl: 0.5 }); L([[-12, -190], [-4, -212]], 2.2, '#4a4a56', 0.9); Q(8, -206, 26, -204, 38, -190, 3, '#6a6a7a', 0.6);   // slick pompadour, side part and a shine
    EYE(-17, -156, 8, { iris: '#3a2416', lid: m === 2 ? 0.45 : 0.25, skin: sk }); EYE(17, -156, 8, { iris: '#3a2416', lid: m === 2 ? 0.45 : 0.25, skin: sk });
    brows(m, 0, -170, 17, 18, 5, '#15100c');
    NOSE(0, -136, 11, 11, shade(sk, -0.06));
    for (const s of [-1, 1]) L([[0, -121], [s * 14, -124], [s * 28, -118], [s * 36, -126], [s * 34, -134]], 6, '#15100c');   // big curled moustache
    if (m === 1) GRIN(0, -110, 12, 5, 1); else if (m === 2) GRIN(0, -106, 11, 5, 2); else Q(-8, -110, 0, -106, 8, -110, 2.6);
    const sn = Math.abs(Math.sin(t * 8)) * 0.3;   // scissors snipping in his raised hand
    ctx.save(); ctx.translate(-76, -100); ctx.rotate(-0.25);
    for (const s of [-1, 1]) { ctx.save(); ctx.rotate(s * (0.06 + sn)); PL([[-3, 0], [0, -44], [4, -4]], '#dfe4ea', { lw: 2.2 }); B([[0, 2], [s * 4, 12], [s * 12, 24], [s * 4, 30], [s * -2, 18]], 'rgba(0,0,0,0)', { lw: 3.2 }); ctx.restore(); }
    dot(0, 0, 3, '#5a5a66'); E(0, 30, 13, 11, sk);
    ctx.restore();
  } },
  hankL: { n: 'حنكليس لايت', vp: 1, f: 230, nf: 1, joy: ['حنكلستها لايت!', 'خفيف ونضيف'], d(m, t) {
    const sk = '#c8e39a';
    torso(70, -70, '#7fc8e8');
    neck(46, -100, -60, sk);
    for (const s of [-1, 1]) { PL([[s * 50, -150], [s * 72, -156], [s * 74, -142], [s * 50, -138]], sk); E(s * 77, -149, 7, 12, shade(sk, -0.1)); }
    B([[-52, -108], [-58, -150], [-40, -184], [0, -192], [40, -184], [58, -150], [52, -108], [30, -84], [0, -78], [-30, -84]], sk);
    R(-46, -188, 92, 17, 7, '#ffffff', { lw: 2.2 }); T('لايت', 0, -179, 12, '#2e7fb8', FD);   // a sweatband that says "light"
    EYE(-19, -146, 9, { iris: '#6b4423', lid: 0.15, skin: sk, lx: 0.1 }); EYE(19, -146, 9, { iris: '#6b4423', lid: 0.15, skin: sk, lx: -0.1 });
    brows(m, 0, -160, 20, 20, 4, '#7a9a4a');
    NOSE(0, -128, 13, 10, shade(sk, -0.05));
    GRIN(0, -106, 34, 8, m === 2 ? 2 : 1, { lip: '#8aaa4a' });
    blush(-38, -118, 12, 0.25); blush(38, -118, 12, 0.25);
  } },
  richard: { n: 'ريتشارد باكلي واترسون', vp: 0.6, f: 150, nf: 1, joy: ['أكل ببلاش؟ لأ؟ ماشي برضه', 'ريتشارد شبع أخيرًا'], d(m, t) {
    const sk = '#f2a6c4', w = Math.sin(t * 2.5) * 0.06;
    E(0, -10, 100, 60, sk);   // big round belly
    B([[-40, -58], [-20, -70], [20, -70], [40, -58], [26, -40], [-26, -40]], '#ffffff', { lw: 2.6 });
    PL([[-6, -64], [6, -64], [10, -20], [0, -10], [-10, -20]], '#c62828', { lw: 2.2 });   // a loose tie
    for (const s of [-1, 1]) { ctx.save(); ctx.translate(s * 24, -168); ctx.rotate(s * (0.18 + w)); B([[-12, 0], [-14, -60], [0, -84], [14, -60], [12, 0]], sk); B([[-6, -6], [-7, -54], [0, -72], [7, -54], [6, -6]], '#f8d2e0', { ol: false, shade: false }); ctx.restore(); }
    E(0, -126, 56, 50, sk, { sd: 0.12 });
    EYE(-20, -138, 10, { iris: '#2a2a30', lid: m === 2 ? 0.55 : 0.42, skin: sk }); EYE(20, -138, 10, { iris: '#2a2a30', lid: m === 2 ? 0.55 : 0.42, skin: sk });   // sleepy eyes
    for (const s of [-1, 1]) for (let k = 0; k < 3; k++) L([[s * 14, -114 + k * 4], [s * 42, -118 + k * 6]], 1.2, '#8a5a6a', 0.7);
    E(0, -118, 9, 6, '#d6688e', { hl: 0.4 });
    if (m === 2) Q(-14, -98, 0, -104, 14, -98, 2.4); else { Q(-14, -106, -6, -102, 0, -110, 2.4); Q(14, -106, 6, -102, 0, -110, 2.4); }
    R(-7, -108, 14, 12, 2, '#ffffff', { lw: 2 }); L([[0, -108], [0, -96]], 1.6);   // buck teeth
    if (m === 1) blush(0, -116, 40, 0.3);
  } },
  rasoda: { n: 'الرؤوس السودا', vp: 0.7, f: 95, nf: 1, joy: ['كاااو! 🖤', 'الرؤوس السودا راضية'], d(m, t) {
    // cursed black crows: a tall ragged coat of feathers, a long thin neck and a small narrow head with glowing white eyes
    const bk = '#221d2a', gl = Math.sin(t * 7.3) > 0.985 ? 4 : 0, tl = Math.sin(t * 1.1) * 0.25 + Math.sin(t * 3.7) * 0.06 + (m === 2 ? -0.2 : 0);
    glow(0, -110, 130, '#7a3dff', 0.22);   // a faint cursed glow, so they read on dark nights too
    ctx.save(); ctx.translate(gl, -Math.abs(Math.sin(t * 2)) * 3);   // floats a little, and now and then jumps a few pixels like a bad signal
    for (const s of [-1, 1]) for (let k = 0; k < 4; k++) { const y = -18 - k * 26, x = s * (50 - k * 6); PL([[x - s * 10, y + 8], [x + s * 12, y - 4], [x - s * 6, y - 14]], bk, { lw: 2 }); }   // ragged feather tips at the sides
    B([[-50, 0], [-46, -56], [-32, -104], [-12, -126], [12, -126], [32, -104], [46, -56], [50, 0]], bk, { sd: 0.1 });
    for (let i = 0; i < 4; i++) Q(-30 + i * 18, -96 + (i % 2) * 10, -24 + i * 18, -60, -32 + i * 18, -24, 1.6, '#4e4760', 0.9);
    ctx.save(); ctx.globalAlpha = m === 1 ? 0.95 : 0.55 + 0.35 * Math.sin(t * 3); L([[-20, -98], [-12, -82], [-18, -68], [-8, -52]], 2.4, '#b45cff'); L([[24, -78], [16, -62], [22, -46]], 2, '#b45cff'); ctx.restore();   // purple cracks of light
    L([[0, -122], [3, -166]], 12, OLC); L([[0, -122], [3, -166]], 8, bk);   // long thin neck
    ctx.save(); ctx.translate(3, -184); ctx.rotate(tl);
    for (let k = 0; k < 3; k++) PL([[-7 + k * 6, -18], [-12 + k * 6, -32 - (k % 2) * 5], [-1 + k * 6, -19]], bk, { lw: 1.8 });   // scruffy crest
    E(0, 0, 14, 22, bk, { lw: 2.6 });
    const bp = new Path2D(); bp.moveTo(10, -7); bp.quadraticCurveTo(36, -8, 58, 6); bp.quadraticCurveTo(36, 5, 10, 8); bp.closePath(); ink(bp, '#3a3446', { b: [30, 0, 24], lw: 2.4 });   // a long beak, a little hooked
    glow(-2, -6, 14, '#efe8ff', 0.7); dot(-2, -6, m === 2 ? 3 : 4.6, '#ffffff'); dot(7, -3, 2.4, '#ffffff');   // two glowing eyes, one bigger
    ctx.restore();
    ctx.restore();
  } },
  diaa: { n: 'د. ضياء العوضي', vp: 0.85, f: 160, rare: true, joy: ['اللي بيحبني يبعت ٣٠٠ جنيه', 'ده كله صحي على فكرة', 'النوتيلا دي طبيعية ١٠٠٪'], d(m, t) {
    const fl = Math.sin(t * 7) * 0.16, wh = '#fbfaf5', sk = '#d9a27a', gal = '#f2f5f8';
    for (const s of [-1, 1]) {   // the hen's big flapping wings
      ctx.save(); ctx.translate(s * 44, -64); ctx.rotate(s * (-0.5 + fl));
      B([[0, 16], [s * 46, -26], [s * 104, -78], [s * 150, -98], [s * 146, -60], [s * 120, -26], [s * 70, 8], [s * 30, 24]], wh, { sd: 0.14 });
      for (let k = 0; k < 4; k++) Q(s * (34 + k * 28), -2 - k * 20, s * (50 + k * 28), -24 - k * 20, s * (58 + k * 28), 4 - k * 22, 1.6, '#b8b2a6', 0.8);
      ctx.restore();
    }
    B([[62, -36], [96, -70], [120, -108], [134, -84], [126, -52], [92, -26]], wh, { sd: 0.12 });   // tail feathers on the right
    for (let k = 0; k < 3; k++) Q(80 + k * 12, -38 - k * 4, 100 + k * 10, -62 - k * 10, 116 + k * 6, -86 - k * 8, 1.4, '#c8c2b6', 0.8);
    E(0, -24, 92, 60, wh, { sd: 0.14 });
    for (let r = 0; r < 2; r++) for (let i = -2; i <= 2; i++) Q(i * 26 - 12, -44 + r * 18, i * 26, -54 + r * 18, i * 26 + 12, -44 + r * 18, 1.5, '#c8c2b6', 0.7);
    // the hen's neck and head on the left, looking where they're flying
    B([[-48, -48], [-70, -94], [-84, -126], [-110, -124], [-106, -88], [-86, -44]], wh, { sd: 0.12 });
    E(-98, -138, 23, 21, wh, { sd: 0.12 });
    B([[-80, -152], [-84, -174], [-93, -162], [-98, -180], [-106, -164], [-115, -176], [-120, -152]], '#e8262a');
    PL([[-116, -144], [-142, -136], [-116, -128]], '#f4b400', { lw: 2.4 }); L([[-118, -136], [-136, -136]], 1.4, '#a87400');
    E(-112, -116, 6, 11, '#e8262a', { lw: 2 });
    E(-100, -142, 6.5, 6.5, '#ffffff', { lw: 2, hl: 0 }); dot(-103, -142, 3.4, OLC); dot(-104, -143.5, 1.2, '#fff');
    for (const s of [-1, 1]) { ctx.save(); ctx.translate(14 + s * 16, -126); ctx.rotate(s * (0.5 + fl * 0.6)); B([[0, 0], [s * 30, -26], [s * 52, -34], [s * 44, -12], [s * 20, 8]], '#ffffff', { sd: 0.1, lw: 2.6 }); ctx.restore(); }   // the doctor's own little wings
    E(34, -58, 16, 11, gal, { lw: 3 });   // knee over the hen's back
    B([[-18, -58], [-20, -114], [-4, -142], [30, -142], [46, -114], [44, -58]], gal, { sd: 0.16 });
    L([[13, -140], [13, -72]], 1.6, '#b8c2cc', 0.8);
    Q(2, -140, 0, -112, 12, -104, 2.4, '#3a4a5a'); Q(24, -140, 26, -114, 14, -104, 2.4, '#3a4a5a'); E(13, -100, 5, 5, '#9aa4ac', { lw: 1.8, hl: 0.5 });   // stethoscope
    L([[2, -124], [-26, -100], [-48, -108]], 11, OLC); L([[2, -124], [-26, -100], [-48, -108]], 7, gal);
    E(-50, -108, 7, 7, sk, { lw: 2 });
    L([[-50, -108], [-80, -122], [-116, -132]], 2.2, '#6b3a1a'); L([[-50, -108], [-76, -110], [-96, -120]], 1.6, '#6b3a1a', 0.7);   // reins
    ctx.save(); ctx.translate(13, 0);
    neck(20, -158, -136, sk);
    for (const s of [-1, 1]) E(s * 28, -182, 5, 8, shade(sk, -0.06));
    E(0, -182, 28, 32, sk);
    B([[-29, -184], [-30, -204], [-18, -217], [2, -220], [20, -215], [30, -201], [29, -184], [22, -198], [2, -205], [-18, -200]], '#2a1a12', { hl: 0.12 });
    for (const s of [-1, 1]) { EYE(s * 11, -184, 5, { iris: '#3a2416', ir: 0.7, lid: 0.2, skin: sk }); ctx.beginPath(); ctx.arc(s * 11, -184, 8.5, 0, Math.PI * 2); ctx.lineWidth = 2.4; ctx.strokeStyle = OLC; ctx.stroke(); }
    L([[-3, -185], [3, -185]], 2.2);
    brows(m, 0, -197, 11, 10, 3.5, '#2a1a12');
    NOSE(0, -172, 7, 7, shade(sk, -0.06));
    B([[-11, -163], [0, -167], [11, -163], [9, -159], [0, -162], [-9, -159]], '#2a1a12', { hl: 0, lw: 1.6 });
    if (m === 2) LIPS(0, -153, 9, 2, '#8a4a3a'); else GRIN(0, -154, 11, 4, 1);
    for (let i = 0; i < 7; i++) dot(-10 + i * 3.4, -146 + (i % 2) * 2, 0.9, 'rgba(42,26,18,.5)');
    ctx.restore();
  } },
  dlv: { n: 'طيار الدليفري', vp: 1, f: 200, dlv: true, joy: ['تسلم إيدك! 🛵', 'الطلب وصل سخن!'], d(m, t) {   // a delivery rider on his scooter
    ctx.translate(0, -44);   // lifted so the scooter shows above the counter
    for (const x of [-74, 84]) { E(x, -24, 26, 26, '#2a2a2e'); E(x, -24, 10, 10, '#9aa4ac', { lw: 2 }); }
    B([[-100, -42], [-40, -48], [10, -42], [60, -64], [108, -58], [100, -30], [40, -22], [-94, -22]], '#e53935', { b: [0, -40, 100], hl: 0.3 });
    R(-124, -156, 84, 78, 8, '#ffd23f', { hl: 0.3 }); T('دليفري', -82, -126, 16, '#c62828', FD); T('الرحمة', -82, -102, 13, '#c62828', FD);
    L([[66, -62], [92, -132]], 7, OLC); L([[80, -134], [108, -138]], 7, OLC);
    L([[-6, -84], [38, -48]], 18, '#2a3a5a'); L([[38, -48], [42, -24]], 14, '#2a3a5a');
    R(-36, -176, 72, 100, 24, '#c62828', { hl: 0.2 }); L([[22, -154], [90, -132]], 14, '#c62828'); E(92, -132, 8, 8, '#e0b48a', { lw: 2 });
    E(0, -186, 18, 12, '#e0b48a', { lw: 2.4 });
    E(0, -216, 44, 42, '#e53935', { hl: 0.4, b: [0, -216, 44] }); R(-34, -232, 68, 26, 12, m === 2 ? '#5a1a2a' : '#2a3a5a', { lw: 2.6, hl: 0.6 });
    if (m === 1) Q(-8, -182, 0, -176, 8, -182, 2.4, OLC); else L([[-7, -180], [7, -180]], 2.4, OLC);
    if (m === 2) for (let i = 0; i < 3; i++) L([[52 + i * 10, -250 + i * 4], [60 + i * 12, -262 + i * 2]], 3, '#e53935');
  } },
  cosmic: { n: 'الرحمة الكونية', vp: 0.1, f: 90, vip: true, joy: ['الكون كله شكرك', 'رحمة كونية!'], d(m, t) {
    const p = new Path2D(); p.moveTo(-66, 24); p.lineTo(-66, -110); p.bezierCurveTo(-66, -250, 66, -250, 66, -110); p.lineTo(66, 24); p.closePath();
    ctx.save(); ctx.shadowColor = '#b79bff'; ctx.shadowBlur = 28; const g = ctx.createLinearGradient(0, -240, 0, 24); g.addColorStop(0, '#2b1a6e'); g.addColorStop(0.5, '#5b3cc4'); g.addColorStop(1, '#1a0f45'); ctx.fillStyle = g; ctx.fill(p); ctx.restore();
    ctx.save(); ctx.clip(p); for (let i = 0; i < 26; i++) { const x = ((i * 53) % 120) - 60, y = -230 + ((i * 97) % 250), tw = 0.5 + 0.5 * Math.sin(t * 3 + i); dot(x, y, 1 + tw * 1.8, `rgba(255,255,255,${0.4 + tw * 0.6})`); } ctx.restore();
    ctx.lineWidth = 3.6; ctx.strokeStyle = '#ffd86b'; ctx.stroke(p);
    ctx.save(); ctx.translate(0, -238); ctx.rotate(t * 0.8); ctx.beginPath(); ctx.ellipse(0, 0, 46, 12, 0, 0, Math.PI * 2); ctx.lineWidth = 5; ctx.strokeStyle = '#ffd86b'; ctx.shadowColor = '#ffd86b'; ctx.shadowBlur = 14; ctx.stroke(); ctx.restore();
    EYE(-18, -150, 11, { iris: '#ffd86b', scl: '#e6dcff' }); EYE(18, -150, 11, { iris: '#ffd86b', scl: '#e6dcff' });
    GRIN(0, -118, 18, 6, m);
  } },
};
const POOL = Object.keys(CH).filter(k => !CH[k].vip && !CH[k].rare && !CH[k].dlv);
const FIG = POOL.filter(k => !CH[k].nf);   // the ones that come as figures

// أبو حسيبة: the big-eared cat who sits by the kiosk and restocks whatever runs out
function drawAH(t, pose, m = 0) {
  const sk = '#4a2f22', gal = '#e9e2cc';
  if (pose === 'sit') {
    R(-46, -150, 92, 84, 18, '#d8342c', { lw: 3 }); for (let i = 0; i < 3; i++) R(-30 + i * 22, -134, 14, 44, 6, '#b8241e', { lw: 1.6, hl: 0 });
    for (const s of [-1, 1]) { L([[s * 44, -30], [s * 50, 30]], 7, OLC); L([[s * 44, -30], [s * 50, 30]], 4, '#d8342c'); }
    R(-56, -44, 112, 16, 6, '#d8342c', { lw: 3 });
  } else {
    const ph = t * 12;
    for (const s of [-1, 1]) { const a = pose === 'work' ? 0 : Math.sin(ph + (s > 0 ? 0 : Math.PI)) * 0.5; ctx.save(); ctx.translate(s * 14, 10); ctx.rotate(a); L([[0, 0], [0, 40]], 12, OLC); L([[0, 0], [0, 40]], 7, sk); E(4, 42, 11, 6, gal, { lw: 2 }); ctx.restore(); }
  }
  const gp = new Path2D(); gp.moveTo(-40, 24); gp.lineTo(-44, -40); gp.quadraticCurveTo(-40, -84, 0, -92); gp.quadraticCurveTo(40, -84, 44, -40); gp.lineTo(40, 24); gp.closePath();
  ink(gp, gal, { b: [0, -40, 60] });
  ctx.save(); ctx.clip(gp); for (let i = -4; i <= 4; i++) L([[i * 10, -96], [i * 10, 30]], 1.4, '#b8a888', 0.5); ctx.restore();
  L([[0, -88], [0, -60]], 2, '#8a7a5a');
  neck(24, -104, -82, sk);
  const w = Math.sin(t * 6) * 4 * (Math.sin(t * 0.7) > 0.6 ? 1 : 0.2);
  for (const s of [-1, 1]) { const e = s > 0 ? -w : w; PL([[s * 20, -160], [s * 88, -244 + e], [s * 50, -116]], sk); PL([[s * 30, -152], [s * 77, -224 + e], [s * 46, -128]], '#9c6858', { ol: false, shade: false }); }
  E(0, -132, 50, 44, sk);
  WR(0, -168, 18, 2, 6, 0.5);
  const blink = (t % 3.7) < 0.12;
  for (const s of [-1, 1]) { E(s * 18, -140, 15, blink ? 2 : 15, '#d9d64a', { hl: 0.3 }); if (!blink) { ctx.fillStyle = '#0d0806'; ctx.beginPath(); ctx.ellipse(s * 18, -140, m === 1 ? 6 : 3.2, 11, 0, 0, Math.PI * 2); ctx.fill(); dot(s * 18 - 5, -146, 3, '#fff'); } }
  PL([[-6, -122], [6, -122], [0, -115]], '#d08a8a', { lw: 2 });
  Q(-10, -112, -5, -106, 0, -112, 2.5); Q(0, -112, 5, -106, 10, -112, 2.5);
  for (const s of [-1, 1]) { L([[s * 18, -118], [s * 62, -124]], 1.6, '#d8c8b8'); L([[s * 18, -114], [s * 62, -108]], 1.6, '#d8c8b8'); }
  if (pose === 'sit') {   // tea glass in hand, sipped now and then
    const sip = Math.max(0, Math.sin(t * 0.9) - 0.85) * 6;
    L([[30, -70], [44, -50 - sip * 6], [24, -40 - sip * 10]], 10, OLC); L([[30, -70], [44, -50 - sip * 6], [24, -40 - sip * 10]], 6, gal);
    ctx.save(); ctx.translate(20, -36 - sip * 10); R(-7, -20, 14, 22, 3, '#c8641a', { lw: 2, hl: 0.4, v: true }); ctx.restore();
  } else {
    const bob = pose === 'work' ? Math.sin(t * 16) * 2 : 0;
    R(-36, -70 + bob, 72, 48, 4, '#c8945a', { lw: 3, v: true }); R(-8, -70 + bob, 16, 48, 0, '#e8d8a8', { ol: false, shade: false });
    L([[-36, -58 + bob], [36, -58 + bob]], 2, '#a8743a', 0.7);
    for (const s of [-1, 1]) E(s * 36, -44 + bob, 8, 8, sk, { lw: 2 });
  }
}
// passers-by in the street behind the counter
const WALKERS = ['hafo', 'aao', 'jab', 'sakr', 'has', 'abkh', 'zarb', 'shamq', 'prince', 'abbas', 'hank', 'floba', 'aaota', 'zool', 'shawqy', 'barber', 'hankL', 'richard', 'rasoda'];
function walkerBody(w, t) {
  const ph = (w.ph ?? t * 8) + w.seed, mv = w.v === 0 ? 0 : 1;   // the legs stop when they stop
  if (w.ch === 'rasoda') { ctx.translate(0, -30 - Math.sin(t * 2 + w.seed) * 6); CH.rasoda.d(0, t); return; }   // the crows float
  if (w.act === 'astro') {   // in space everyone floats in a helmet with a little jetpack
    ctx.translate(0, -110 - Math.sin(t * 1.6 + w.seed) * 10); for (const s of [-1, 1]) { ctx.save(); ctx.globalAlpha = 0.7 + 0.3 * Math.sin(t * 20 + s); PL([[s * 22 - 8, 0], [s * 22 + 8, 0], [s * 22, 26 + Math.sin(t * 25) * 6]], '#ffb030', { lw: 1.6 }); ctx.restore(); }
    CH[w.ch].d(0, t); const [hx, hy, hw] = HEAD[w.ch] || [0, -200, 80], r = hw * 0.9;
    ctx.beginPath(); ctx.arc(hx, hy + hw * 0.5, r, 0, Math.PI * 2); ctx.fillStyle = 'rgba(200,232,255,.2)'; ctx.fill(); ctx.lineWidth = 6; ctx.strokeStyle = '#e4ecf2'; ctx.stroke(); ctx.lineWidth = 2.4; ctx.strokeStyle = OLC; ctx.stroke();
    Q(hx - r * 0.6, hy + hw * 0.5 - r * 0.45, hx - r * 0.3, hy + hw * 0.5 - r * 0.8, hx + r * 0.1, hy + hw * 0.5 - r * 0.85, 4, '#ffffff', 0.6); return;
  }
  if (w.ch === 'sakr') { ctx.translate(0, -8 - Math.abs(Math.sin(ph)) * 4); CH.sakr.d(0, t); return; }
  if (w.ch === 'aao') { ctx.translate(0, -Math.abs(Math.sin(ph * 0.8)) * 30 - 24); CH.aao.d(1, t); return; }
  for (const s of [-1, 1]) { const a = Math.sin(ph + (s > 0 ? 0 : Math.PI)) * 0.45 * mv; ctx.save(); ctx.translate(s * 18, -80); ctx.rotate(a); L([[0, 0], [0, 74]], 16, OLC); L([[0, 0], [0, 74]], 10, '#3a3040'); E(8, 76, 16, 8, '#2a1a12', { lw: 2.4 }); ctx.restore(); }
  ctx.translate(0, -100 - Math.abs(Math.sin(ph)) * 6 * mv);
  CH[w.ch].d(0, t);
  if (w.act) walkerProp(w, t);
}
// what a passer-by carries, drawn in their own space after the body (the head top comes from HEAD)
function walkerProp(w, t) {
  const [hx, hy, hw] = HEAD[w.ch] || [0, -200, 80], a = w.act, sw = Math.sin(t * 6 + w.seed), cl = ['#e53935', '#2e7fb8', '#ffd23f', '#e0388a', '#2e9d4a'][Math.floor(w.seed) % 5];
  if (a === 'bread') { R(hx - 50, hy - 8, 100, 12, 5, '#c8945a', { lw: 2.4 }); for (let i = 0; i < 5; i++) E(hx - 36 + i * 18, hy - 16, 10, 7, '#e0a860', { lw: 1.8, seed: i }); }   // a tray of bread on the head
  else if (a === 'bag') { Q(56, -44, 68, -68, 80, -44, 3, OLC); R(50, -46, 36, 42, 5, '#f4f0e6', { lw: 2.4 }); E(68, -26, 7, 7, cl, { lw: 1.4 }); }
  else if (a === 'phone') { R(hx + hw * 0.42, hy + hw * 0.3, 14, 26, 4, '#26262c', { lw: 2 }); R(hx + hw * 0.42 + 3, hy + hw * 0.3 + 4, 8, 16, 2, '#8fd0ff', { ol: false, shade: false }); }
  else if (a === 'balloon') { const bx = 84 + sw * 3, by = hy - 30 + sw * 4; Q(60, -40, 90, (by - 40) / 2, bx, by + 32, 1.6, OLC); E(bx, by, 26, 32, cl, { lw: 2.4 }); Q(bx - 12, by - 14, bx - 10, by - 22, bx - 2, by - 25, 3, '#ffffff', 0.5); }
  else if (a === 'corn') { ctx.save(); ctx.translate(58, -50); ctx.rotate(-0.4); E(0, -16, 9, 22, '#f4c430', { lw: 2 }); for (let i = 0; i < 6; i++) L([[-6, -30 + i * 6], [6, -30 + i * 6]], 1, '#c89a10', 0.7); B([[-8, 0], [-14, -18], [0, -8], [14, -18], [8, 0]], '#7ab648', { lw: 1.6 }); ctx.restore(); }   // grilled corn on the Corniche
  else if (a === 'flag') { const fy = hy - 70; L([[60, -30], [60, fy]], 4, '#8a5a2a'); for (let k = 0; k < 3; k++) PL([[60, fy + k * 14], [110, fy + k * 14 + sw * 5], [110, fy + (k + 1) * 14 + sw * 5], [60, fy + (k + 1) * 14]], ['#c62828', '#ffffff', '#1a1a1a'][k], { lw: 1.6 }); }
  else if (a === 'drum') { R(-34, -56, 68, 40, 8, '#c62828', { lw: 2.6 }); E(0, -56, 34, 9, '#f4ead0', { lw: 2.2 }); for (const s of [-1, 1]) { const u = Math.max(0, sw * s) * 14; L([[s * 20, -64 - u], [s * 40, -90 - u]], 3.4, '#8a5a2a'); } }
  else if (a === 'umbrella') { L([[44, -40], [44, hy - 30]], 3, OLC); const p = new Path2D(); p.moveTo(-46, hy - 30); p.quadraticCurveTo(44, hy - 110, 134, hy - 30); p.closePath(); ink(p, cl, { b: [44, hy - 60, 80], lw: 2.6 }); }
  else if (a === 'lantern') { L([[60, -40], [60, -24]], 2, OLC); glow(60, -4, 26, '#ffd86b', 0.6); PL([[50, -24], [70, -24], [76, -4], [64, 14], [56, 14], [44, -4]], '#d4a020', { lw: 2.2 }); }   // a Ramadan fanous
}
const WACT = [[['', 3], ['bread', 2], ['bag', 2], ['phone', 1.5]], [['', 2], ['balloon', 2], ['corn', 2], ['phone', 1.5]], [['flag', 3], ['drum', 1.5], ['', 1]], [['astro', 1]]];   // per place
function walkerPlan(w) {   // what this passer-by carries and does: it depends on the place, the weather and the season
  const ai = areaI(), op = WACT[ai].slice();
  if (G.sea === 'ram' && ai < 3) op.push(['lantern', 3]);
  if (G.wx === 'rain' && ai < 3) op.push(['umbrella', 6]);
  let r = Math.random() * op.reduce((a, o) => a + o[1], 0); w.act = (op.find(o => (r -= o[1]) < 0) || op[0])[0];
  if (w.act === 'astro' || w.ch === 'rasoda') return;
  const d = Math.random();
  if (d < (G.wx === 'rain' ? 0.4 : 0.14)) w.v = rnd(110, 140);   // in a hurry
  else if (d < 0.36) { w.stopX = rnd(CLIPX[0] + 120, CLIPX[1] - 120); w.emo = pick(['😋', '👀', '🤤', '🤔', '😮']); }   // stops to look at the cart
}
function drawUfo(t) {   // a little flying saucer over the space station
  E(0, -74, 40, 32, '#c8f0ff', { lw: 2.6, hl: 0.5 }); E(0, -80, 15, 13, '#8fd14f', { lw: 2 }); dot(-5, -82, 3, '#111'); dot(5, -82, 3, '#111'); L([[0, -93], [4, -104]], 2); dot(4, -105, 3, '#ff5a5a');
  E(0, -50, 110, 24, '#9aa4b0', { lw: 3 }); for (let i = 0; i < 6; i++) dot(-80 + i * 32, -47, 5, Math.sin(t * 8 + i) > 0 ? '#ffd23f' : '#ff5a5a');
  if (Math.sin(t * 1.3) > 0.5) { ctx.save(); ctx.globalAlpha = 0.22; PL([[-30, -28], [30, -28], [70, 40], [-70, 40]], '#c8ffb0', { ol: false, shade: false }); ctx.restore(); }
}
function drawTuk(t) {
  for (const x of [-58, 70]) { E(x, -26, 24, 24, '#2a2a2a', { lw: 3 }); E(x, -26, 10, 10, '#c0c6cc', { lw: 2 }); }
  ctx.save(); ctx.translate(0, Math.sin(t * 22) * 1.5);
  const bp = new Path2D(); bp.moveTo(-96, -40); bp.lineTo(-98, -132); bp.quadraticCurveTo(-94, -168, -48, -170); bp.lineTo(44, -170); bp.quadraticCurveTo(92, -166, 102, -110); bp.lineTo(108, -40); bp.closePath();
  ink(bp, '#2e7fb8', { b: [0, -110, 100] });
  R(-104, -178, 214, 16, 6, '#1f5a88', { lw: 3 });
  for (let k = 0; k < 12; k++) L([[-100 + k * 18, -162], [-96 + k * 18, -150]], 3, ['#e53935', '#ffd23f'][k % 2]);
  const wp = RRp(14, -150, 80, 64, 10); ctx.fillStyle = '#bfe6ff'; ctx.fill(wp);
  ctx.save(); ctx.clip(wp); ctx.translate(54, -60); ctx.scale(0.42, 0.42); CH.aao.d(1, t); ctx.restore();
  ctx.lineWidth = 3; ctx.strokeStyle = OLC; ctx.stroke(wp);
  R(-80, -150, 80, 60, 10, '#bfe6ff', { lw: 3, hl: 0.4 });
  R(-98, -82, 206, 12, 0, '#ffd23f', { lw: 2.4, hl: 0 });
  E(104, -70, 7, 10, '#fff6b0', { lw: 2 }); glow(116, -70, 24, '#fff6b0', 0.6);
  ctx.restore();
}
function drawBike(t) {
  const ph = t * 9;
  for (const x of [-56, 56]) { ctx.beginPath(); ctx.arc(x, -30, 30, 0, Math.PI * 2); ctx.lineWidth = 6; ctx.strokeStyle = OLC; ctx.stroke(); for (let k = 0; k < 4; k++) { const a = ph + k * Math.PI / 4; L([[x + Math.cos(a) * 27, -30 + Math.sin(a) * 27], [x - Math.cos(a) * 27, -30 - Math.sin(a) * 27]], 2, '#666'); } }
  L([[-56, -30], [-14, -80], [36, -80], [56, -30]], 7, '#c62828'); L([[-14, -80], [0, -30], [36, -80]], 7, '#c62828');
  L([[36, -80], [44, -108], [30, -112]], 5, OLC); R(-28, -90, 30, 8, 3, '#2a2a2a', { lw: 2 });
  for (const s of [-1, 1]) { const a = ph + (s > 0 ? 0 : Math.PI); L([[-10, -100], [Math.cos(a) * 14, -30 + Math.sin(a) * 14]], 12, '#3a3040'); }
  ctx.save(); ctx.translate(-8, -96); ctx.scale(0.9, 0.9); CH.hafo.d(1, t);
  ctx.translate(0, -214); R(-110, -10, 220, 12, 4, '#8a5a2c', { lw: 2.6 }); for (let k = 0; k < 7; k++) E(-90 + k * 30, -14, 15, 7, '#e8b46a', { lw: 2, seed: k });   // bread tray on his head
  ctx.restore();
}
function drawGas(t, w) {
  walkerBody({ ch: 'zarb', seed: w.seed }, t);
  ctx.save(); ctx.translate(-60, -150); ctx.rotate(-0.9); R(-22, -60, 44, 120, 16, '#e86a1a', { lw: 3.5 }); R(-10, -76, 20, 18, 4, '#9aa4ac', { lw: 2.4 }); ctx.restore();
}

function drawBird(x, y, t) {
  ctx.save(); ctx.translate(x, y);
  const fl = Math.sin(t * 22) * 22;
  PL([[-4, -6], [22, -26 - fl], [28, -2]], '#b71c1c');
  E(0, 0, 32, 19, '#e53935');
  PL([[18, 2], [54, -10 + fl * 0.4], [46, 12]], '#c62828');
  E(-28, -11, 16, 15, '#e53935');
  PL([[-40, -16], [-64, -7], [-40, -4]], '#f4b400');
  EYE(-30, -14, 5.5, { iris: '#111', ir: 0.6 }); BROW(-30, -22, 12, -0.5, 3);
  E(-66, -2, 10, 10, '#ffcc33'); T('ج', -66, -1, 11, '#8a5a00');
  ctx.restore();
}

