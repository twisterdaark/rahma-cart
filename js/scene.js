// ---------- scene drawing ----------
// seasonal clothes: where each regular's head starts (x, top y, width), and what doesn't suit him
const HEAD = { hafo: [0, -206, 90], aao: [0, -210, 78], aaota: [-2, -219, 84], hank: [0, -203, 92], zarb: [0, -170, 92], jab: [6, -186, 46], sakr: [10, -160, 72], has: [-4, -177, 64],
  zool: [0, -183, 84], floba: [0, -212, 84], abkh: [0, -197, 84], prince: [0, -201, 90], abbas: [0, -166, 62], shawqy: [0, -190, 86], shamq: [-8, -198, 74], dola: [12, -176, 62], barber: [0, -206, 92], hankL: [0, -190, 84], richard: [0, -172, 70], rasoda: [3, -206, 40] };
const ACCNO = { prince: 'cap cone', zool: 'cap cone straw', floba: 'cap cone straw flag' };
function accPick(ch) {   // cosmetic only, so it uses Math.random and leaves the day's seed alone
  if (!HEAD[ch]) return '';
  const ai = areaI(), r = Math.random(), k = ai === 3 ? (r < 0.85 ? 'helmet' : '') : G.sea === 'ram' ? (r < 0.6 ? 'cap' : '') : G.sea === 'eid' ? (r < 0.7 ? 'cone' : '') : G.wx === 'hot' ? (r < 0.55 ? 'straw' : '') : ai === 2 ? (r < 0.6 ? 'flag' : '') : '';
  return k && !(ACCNO[ch] || '').includes(k) ? k : '';
}
function wearAcc(ch, k) {
  const [x, y, w] = HEAD[ch], h = w / 2, ln = (lw = 3) => { ctx.lineWidth = lw; ctx.strokeStyle = OLC; ctx.stroke(); };
  ctx.save(); ctx.lineJoin = 'round';
  const dome = (rx, ry, by) => { ctx.beginPath(); ctx.ellipse(x, by, rx, ry, 0, Math.PI, 0); ctx.closePath(); };
  if (k === 'cap') {   // white Ramadan taqiya with a knit pattern
    const by = y + h * 0.34; dome(h * 0.95, h * 0.62, by); ctx.fillStyle = '#ffffff'; ctx.fill(); ln();
    L([[x - h * 0.9, by - h * 0.14], [x + h * 0.9, by - h * 0.14]], 2, '#c9bfa8'); for (let i = 0; i < 6; i++) { const a = Math.PI * (1.12 + i * 0.152); dot(x + Math.cos(a) * h * 0.6, by - h * 0.1 + Math.sin(a) * h * 0.36, 2.6, '#d8cdb4'); }
  } else if (k === 'cone') {   // Eid party hat
    const bx = h * 0.55, top = y - w * 0.7, base = y + h * 0.2, ax = x + w * 0.04;
    ctx.beginPath(); ctx.moveTo(x - bx, base); ctx.lineTo(ax, top); ctx.lineTo(x + bx, base); ctx.quadraticCurveTo(x, base + h * 0.18, x - bx, base); ctx.closePath();
    ctx.save(); ctx.clip(); ctx.fillStyle = '#ff5a8a'; ctx.fillRect(x - w, top - 5, w * 2, base - top + 20); ctx.fillStyle = '#ffd23f'; for (let i = 0; i < 4; i++) ctx.fillRect(x - w, top + (base - top) * (0.22 + i * 0.24), w * 2, (base - top) * 0.1); ctx.restore(); ln();
    E(ax, top, 6, 6, '#7ad3ff', { lw: 2.4 });
  } else if (k === 'straw') {   // summer straw hat
    ctx.beginPath(); ctx.ellipse(x, y + h * 0.28, w * 0.66, h * 0.24, 0, 0, Math.PI * 2); ctx.fillStyle = '#e9c66a'; ctx.fill(); ln();
    dome(h * 0.68, h * 0.62, y + h * 0.22); ctx.fillStyle = '#f2d27e'; ctx.fill(); ln();
    ctx.beginPath(); ctx.rect(x - h * 0.66, y + h * 0.04, h * 1.32, h * 0.18); ctx.fillStyle = '#d7263d'; ctx.fill(); ln(2);
  } else if (k === 'flag') {   // stadium fan: a hat in the flag's colours and a little flag
    const fx = x + h * 0.9, fy = y - h * 1.1;
    L([[x + h * 0.5, y + h * 0.1], [fx, fy]], 2.6, '#6a4a2a');
    ['#d7263d', '#ffffff', '#1a1a1a'].forEach((c, i) => { ctx.fillStyle = c; ctx.fillRect(fx, fy + i * 7, 30, 7); }); ctx.beginPath(); ctx.rect(fx, fy, 30, 21); ln(2); dot(fx + 15, fy + 10.5, 2.2, '#d4a017');
    const by = y + h * 0.3, tp = by - h * 0.52; dome(h * 0.8, h * 0.52, by); ctx.save(); ctx.clip(); ['#d7263d', '#ffffff', '#1a1a1a'].forEach((c, i) => { ctx.fillStyle = c; ctx.fillRect(x - w, tp + (by - tp) * i / 3, w * 2, (by - tp) / 3 + 1); }); ctx.restore(); ln();
  } else if (k === 'helmet') {   // space station: a glass bubble
    const r = w * 0.78, cy = y + r * 0.82;
    L([[x, cy - r], [x, cy - r - 16]], 2.4, '#9aa4ac'); E(x, cy - r - 18, 5, 5, '#ff4a4a', { lw: 2 });
    ctx.beginPath(); ctx.arc(x, cy, r, 0, Math.PI * 2); ctx.fillStyle = 'rgba(190,235,255,.22)'; ctx.fill(); ctx.lineWidth = 3.5; ctx.strokeStyle = 'rgba(40,60,80,.85)'; ctx.stroke();
    ctx.beginPath(); ctx.arc(x, cy, r - 7, Math.PI * 1.15, Math.PI * 1.45); ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.strokeStyle = 'rgba(255,255,255,.7)'; ctx.stroke();
  }
  ctx.restore();
}
function drawCustomers(t) {
  ctx.save(); ctx.beginPath(); ctx.rect(CLIPX[0], 0, CLIPX[1] - CLIPX[0], CT - 6); ctx.clip();
  for (const c of G.slots) {
    if (!c) continue;
    const sx = SLOTX[c.slot];
    let off = 0; if (c.st === 'in') off = (1 - easeBack(Math.min(1, c.t / 0.45))) * 260; if (c.st === 'out') off = easeOut(Math.min(1, c.t / 0.4)) * 280;
    let dx = c.rx || 0, dy = Math.sin(t * 3 + c.slot * 2) * 2.5, sq = 1 + Math.sin(t * 3 + c.slot * 2) * 0.012;
    if (c.st === 'run') dy -= Math.abs(Math.sin(c.t * 18)) * 12;
    if (c.st === 'happy') { const j = Math.abs(Math.sin(c.t * 9)) * Math.max(0, 1 - c.t / 1.25); dy -= j * 20; sq = 1 + j * 0.06; }
    const f = isFinite(c.max) ? c.pat / c.max : 1;
    const mood = c.st === 'happy' || c.st === 'run' ? 1 : (c.st === 'angry' || c.shake > 0 || (c.st === 'wait' && f < 0.3)) ? 2 : 0;
    if (mood === 2) dx += Math.sin(t * 50) * 2.5;
    const imp = c.st === 'wait' && isFinite(c.max) && f < 0.6 && f >= 0.3 && !c.hag;   // getting impatient: tapping a foot and checking the clock
    if (imp) dy -= Math.max(0, Math.sin(t * 11 + c.slot)) * 3;
    const want = (G.drag || G.sel) && wants(c, prodOf((G.drag && G.drag.key) || G.sel));
    if (want) glow(sx, CT - 110, 130, '#9bff7a', 0.45 + 0.2 * Math.sin(t * 8));
    if (c.vip) glow(sx, CT - 100, 150, '#ffd86b', 0.5);
    if (c.ghost) { glow(sx, CT - 110 + off, 160, '#b07aff', 0.5 + 0.2 * Math.sin(t * 3)); dy -= 10 + Math.sin(t * 2 + c.slot) * 6; }
    if (c.st === 'run') glow(sx + dx, CT - 110, 120, '#ff5a3a', 0.35 + 0.25 * Math.sin(t * 14));
    if (G.wx === 'rain' || G.sea === 'eid') { ctx.save(); ctx.translate(0, off + dy); if (G.wx === 'rain') umbrella(sx + dx, c.slot); else balloon(sx + dx - 62, c.slot, t); ctx.restore(); }
    ctx.save(); if (c.ghost) ctx.globalAlpha = 0.68 + 0.12 * Math.sin(t * 2.5 + c.slot); ctx.translate(sx + dx, CT + 8 + off + dy); if (imp) ctx.rotate(Math.sin(t * 1.3 + c.slot) * 0.025); const s = 0.84; ctx.scale(s / sq, s * sq); const acc = c.ghost || c.vip || c.dlv ? '' : c.acc || ''; sprite(sl('c' + c.slot), c.ch + mood + acc + tb(15, c.slot * 0.25), -200, -310, 400, 380, () => { CH[c.ch].d(mood, t); if (acc) wearAcc(c.ch, acc); }, SC * DPR * s);
    if (mood === 2 && c.st !== 'out') { ctx.save(); ctx.globalAlpha = 0.25; ctx.globalCompositeOperation = 'source-atop'; ctx.restore(); }
    ctx.restore();
    if (imp) { const g = (t * 0.3 + c.slot * 0.37) % 1, [hx, hy, hw] = HEAD[c.ch] || [0, -200, 80]; if (g < 0.32) { const x = sx + dx + (hx - hw * 0.6) * 0.84 - 8, y = CT + 18 + off + dy + hy * 0.84, k = Math.min(1, g * 12) * (1 + Math.sin(t * 16) * 0.06);
      ctx.save(); ctx.translate(x, y); ctx.scale(k, k); E(0, 0, 15, 15, '#ffffff', { lw: 2.2, hl: 0, v: false }); T('⏰', 0, 1, 17, '#000'); ctx.restore(); } }
    if (mood === 2 && c.st !== 'out') for (let k = 0; k < 3; k++) { const p = (t * 1.5 + k / 3) % 1; ctx.save(); ctx.globalAlpha = (1 - p) * 0.85; E(sx + (c.rx || 0) - 34 + k * 34, CT - 200 - p * 40 + off, 7 + p * 9, 7 + p * 9, '#ffffff', { ol: false, shade: false }); ctx.restore(); }
  }
  ctx.restore();
}
function drawOrders(t) {
  if (G.raid && G.raid.shut > 0.3) return;
  for (const c of G.slots) {
    if (!c || c.st === 'out' || c.st === 'in') continue;
    const sx = SLOTX[c.slot] + (c.rx || 0), cx = sx + 66, n = c.order.length, h = 22 + n * 56, y0 = 64, k = pop(c.st === 'wait' ? c.t : 1);
    ctx.save(); ctx.translate(cx, y0 + h / 2); ctx.scale(k, k); ctx.translate(-cx, -(y0 + h / 2));
    if (c.hag === 1 && c.st === 'wait') for (const [dx, yes] of HAGB) { const r = 19 * (1 + Math.sin(t * 6) * 0.05); E(sx + dx, 110, r, r, yes ? '#2e9d4a' : '#c62828', { lw: 2.6, hl: 0.4, v: false }); T(yes ? '✓' : '✗', sx + dx, 111, 22, '#fff', FD); }
    if (c.st === 'wait') {
      const p = RRp(cx - 30, y0, 60, h, 30);
      ctx.fillStyle = c.vip ? 'rgba(255,240,190,.88)' : c.wed ? 'rgba(255,214,236,.94)' : c.ghost ? 'rgba(226,212,255,.9)' : c.meal ? 'rgba(240,214,160,.94)' : 'rgba(255,255,255,.82)'; ctx.fill(p); ctx.lineWidth = 2.5; ctx.strokeStyle = 'rgba(28,18,12,.6)'; ctx.stroke(p);
      c.order.forEach((o, j) => {
        const yy = y0 + 62 + j * 56;
        ctx.save(); if (o.done) ctx.globalAlpha = 0.35; prodIcon(oKey(o), cx, yy, 0.72); ctx.restore();
        if (o.done) { dot(cx + 16, yy - 14, 10, '#2e9d4a'); T('✓', cx + 16, yy - 13, 13, '#fff'); }
        else if (o.t > 1) { dot(cx - 17, yy - 15, 12, '#c2185b'); T('×' + ar(o.n), cx - 17, yy - 14, 12, '#fff', FD); }
      });
      if (c.vip) T('×٣', cx, y0 - 10, 18, '#b8860b', FD, 'center', 4, '#fff6d8');
      const hy = y0 + h + 20;
      const hp = heartP(cx, hy, 13);
      if (isFinite(c.max)) {
        const f = clamp(c.pat / c.max, 0, 1);
        ctx.fillStyle = '#5a1a1a'; ctx.fill(hp);
        ctx.save(); ctx.clip(hp); ctx.fillStyle = f > 0.3 ? '#e8303a' : (Math.sin(t * 14) > 0 ? '#ff6b6b' : '#e8303a'); ctx.fillRect(cx - 20, hy + 14 - 30 * f, 40, 30 * f + 2); ctx.restore();
      } else { ctx.fillStyle = '#e8303a'; ctx.fill(hp); }
      ctx.lineWidth = 2.6; ctx.strokeStyle = OLC; ctx.stroke(hp);
      if (!isFinite(c.max)) T('∞', cx, hy - 1, 13, '#fff');
      if (c.meal) { const bx = cx + 28; PL([[bx - 9, hy - 8], [bx + 9, hy - 8], [bx + 8, hy + 11], [bx - 8, hy + 11]], '#d9a866', { lw: 2, hl: 0.2, v: false }); Q(bx - 4, hy - 8, bx, hy - 16, bx + 4, hy - 8, 1.8, OLC); }
    }
    ctx.restore();
  }
  for (const c of G.slots) if (c && c.say && c.st !== 'out' && c.st !== 'in') sayBubble(c);
}
function sayBubble(c) {   // a customer's line: up to two lines, dark text on white, on the customer's chest so it hides neither the orders nor the top bar
  const sx = SLOTX[c.slot] + (c.rx || 0), col = c.st === 'happy' ? '#2e9d4a' : c.st === 'angry' || c.st === 'run' ? '#c62828' : OLC;
  let fs = 17, ln = [];
  for (; fs >= 13; fs -= 2) { ctx.font = '800 ' + fs + 'px ' + FB; ln = []; let cur = ''; for (const w of tr(c.say).split(' ')) { const tt = cur ? cur + ' ' + w : w; if (cur && ctx.measureText(tt).width > 146) { ln.push(cur); cur = w; } else cur = tt; } if (cur) ln.push(cur); if (ln.length <= 2) break; }
  const lw = Math.max(...ln.map(l => ctx.measureText(l).width)), w = Math.min(168, lw + 24), h = ln.length * (fs + 6) + 14, x = clamp(sx - w / 2, 6, W - 6 - w), y = CT - 8 - h, k = pop(c.st === 'wait' ? c.t : c.t + 0.05, 0.25);
  ctx.save(); ctx.translate(sx, y); ctx.scale(k, k); ctx.translate(-sx, -y);
  const p = RRp(x, y, w, h, 14), tp = new Path2D(); tp.moveTo(sx - 12, y + 2); tp.lineTo(sx - 2, y - 15); tp.lineTo(sx + 10, y + 2); tp.closePath();
  ctx.lineWidth = 6; ctx.strokeStyle = col; ctx.lineJoin = 'round'; ctx.stroke(p); ctx.stroke(tp); ctx.fillStyle = '#ffffff'; ctx.fill(p); ctx.fill(tp);
  ln.forEach((l, i) => T(l, x + w / 2, y + 7 + (fs + 6) * (i + 0.5) + 1, fs, '#2a1a10'));
  ctx.restore();
}
function nameTags() {
  if (G.raid && G.raid.shut > 0.3) return;
  for (const c of G.slots) {
    if (!c || c.st === 'out') continue; const sx = SLOTX[c.slot] + (c.rx || 0), nm = c.legend && c.st === 'wait' ? '🌟 موجة ' + ar(3 - c.waves) + ' من ٣' : (c.wed ? '💍 فرح ' : c.quest ? '📜 ' : c.upset ? '😤 ' : c.ghost ? '👻 ' : '') + CH[c.ch].n;
    const p = RRp(sx - 66, CT - 4, 132, 22, 11); ctx.fillStyle = CH[c.ch].rare ? '#b8860b' : c.vip ? '#5b3cc4' : c.dlv ? '#c62828' : c.wed ? '#c2185b' : c.quest ? '#8a5a1a' : c.upset ? '#a83a2a' : c.ghost ? '#4a2a8a' : 'rgba(28,18,12,.85)'; ctx.fill(p);
    T(nm, sx, CT + 7, fit(nm, 122, 13), '#ffe9b8');
    const fl = frLv(c.ch); if (fl) { const hp = heartP(sx + 74, CT + 8, 11); ctx.fillStyle = '#ff4f7a'; ctx.fill(hp); ctx.lineWidth = 2; ctx.strokeStyle = OLC; ctx.stroke(hp); T(ar(fl), sx + 74, CT + 6, 12, '#fff', FD); }
    if (c.tr) { E(sx - 70, CT + 7, 13, 13, c.tr === 'thief' ? '#ffd0c8' : '#fff3d6', { lw: 2, hl: 0, v: false }); T(TRAITS[c.tr].i, sx - 70, CT + 8, 15, '#000'); }
  }
}
function ring(x, y, r, f, c = '#5cd65c') { dot(x, y, r + 3, 'rgba(28,18,12,.8)'); ctx.beginPath(); ctx.arc(x, y, r, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * f); ctx.lineWidth = 5; ctx.strokeStyle = c; ctx.lineCap = 'round'; ctx.stroke(); }
function pressK(k) { return G.press && (G.press[k] || 0) > 0 ? 3 : 0; }
function drawSpit(t) {
  const r = ST.spit, cx = r.x + r.w / 2, pk = pressK('spit');
  ctx.save(); ctx.globalAlpha = 0.9; R(r.x + 4, r.y + 10, r.w - 8, r.h - 20, 10, '#5a5f64', { lw: 3 }); ctx.restore();
  for (let i = 0; i < 5; i++) glow(cx + 30, r.y + 30 + i * 28, 26, '#ff7a1a', 0.55 + 0.15 * Math.sin(t * 6 + i));
  L([[cx, r.y], [cx, r.y + r.h]], 5, '#c0c6cc'); L([[cx, r.y], [cx, r.y + r.h]], 5, OLC, 0.3);
  const p = new Path2D(); p.moveTo(cx - 40 + pk, r.y + 26); p.quadraticCurveTo(cx, r.y + 10, cx + 40, r.y + 26); p.lineTo(cx + 22, r.y + r.h - 22); p.quadraticCurveTo(cx, r.y + r.h - 14, cx - 22, r.y + r.h - 22); p.closePath();
  const sf = 0.3 + 0.7 * stockN('spit') / capOf('spit'); ctx.save(); ctx.translate(cx, 0); ctx.scale(sf, 1); ctx.translate(-cx, 0);
  if (stockN('spit') > 0) ink(p, '#b46a2a', { b: [cx, r.y + 70, 50], sd: 0.25 });
  ctx.save(); ctx.clip(p); const sp = (t * 30) % 16; for (let i = 0; i < 12; i++) Q(cx - 50, r.y + 20 + i * 16 + sp * 0.2, cx, r.y + 30 + i * 16, cx + 50, r.y + 20 + i * 16 - sp * 0.2, 2, '#7a3e12', 0.5); for (let i = 0; i < 10; i++) dot(cx - 30 + hash(i) * 60, r.y + 30 + hash(i + 4) * 120, 3, '#d8964a'); ctx.restore(); ctx.restore();
  R(cx - 30, r.y - 4, 60, 12, 4, '#9aa4ac', { lw: 2.4 }); badge('spit', cx, r.y + r.h - 18);
}
function drawBread() {
  const r = ST.bread, cx = r.x + r.w / 2, cy = r.y + 60, pk = pressK('bread');
  E(cx, cy + 16, 46, 12, '#9aa4ac', { lw: 2.6 });
  const nb = Math.ceil(5 * stockN('bread') / capOf('bread'));
  for (let i = 0; i < nb; i++) E(cx, cy + 8 - i * 6 + pk, 42, 11, i % 2 ? '#e5b46a' : '#efc480', { lw: 2.4, seed: i });
  if (nb) for (let i = 0; i < 6; i++) dot(cx - 26 + i * 10, cy + 14 - nb * 6 + pk + (i % 2) * 3, 2, '#b07c3a');
  T('عيش', cx, r.y + 6, 15, '#3a2416'); badge('bread', cx, r.y + r.h - 4);
}
function drawBoard(t) {
  const r = ST.board, cx = 235, cy = 478, b = G.board;
  R(r.x + 4, cy - 30, r.w - 8, 56, 14, '#c98d52', { lw: 3, sd: 0.15 }); dot(r.x + r.w - 18, cy - 2, 5, '#7a4a20');
  for (let i = 0; i < 4; i++) L([[r.x + 14, cy - 18 + i * 12], [r.x + r.w - 40, cy - 20 + i * 12]], 1.2, '#8a5a2a', 0.4);
  if (b.st === 'bread' || b.st === 'filled' || b.st === 'wrap') {
    const k = b.st === 'wrap' ? clamp(b.wrapT / 0.42, 0, 1) : 0, rp = k * k * (3 - 2 * k), xe = 58 - 50 * rp, rr = 7 + 10 * rp;
    ctx.save(); ctx.translate(cx, cy - 6);
    if (k > 0) { ctx.save(); ctx.beginPath(); ctx.rect(-xe, -40, xe * 2, 80); ctx.clip(); }
    E(0, 0, 58, 20, '#efc480', { lw: 2.8 });
    if (b.fill === 'chicken' || b.mix === 'mix') for (let i = 0; i < 6; i++) { ctx.save(); ctx.translate(-34 + i * 13, -2 + (i % 2) * 5); ctx.rotate(0.5 - i * 0.2); R(-9, -4, 18, 8, 3, '#b46a2a', { lw: 1.8 }); ctx.restore(); }
    if (b.fill === 'gfal' || b.mix === 'mix') for (let i = 0; i < 4; i++) E(-24 + i * 16, -2 + (i % 2) * 5, 8, 7, '#5f8f2a', { lw: 2, seed: i });
    if (b.fill === 'fal') for (let i = 0; i < 4; i++) E(-24 + i * 16, -2 + (i % 2) * 5, 8, 7, '#8f7b58', { lw: 2, seed: i });
    if (b.fill === 'ice') for (let i = 0; i < 3; i++) E(-20 + i * 20, -4, 11, 9, i === 1 ? '#ffb3c8' : '#fbfaf6', { lw: 2, seed: i });
    if (b.mix === 'fries') for (let i = 0; i < 6; i++) { ctx.save(); ctx.translate(-30 + i * 12, -6); ctx.rotate(-0.6 + i * 0.25); R(-3, -14, 6, 22, 2, '#f6c84a', { lw: 1.6 }); ctx.restore(); }
    if (b.sauce) { const pts = []; for (let i = 0; i <= 10; i++) pts.push([-40 + i * 8, -4 + (i % 2 ? 4 : -4)]); L(pts, 5, OLC); L(pts, 3, '#f4ead0'); }
    if (k > 0) {
      ctx.restore();
      for (const sd of [-1, 1]) { const x = sd * xe; E(x, -rr * 0.35, rr * 0.75 + 4, rr, '#e9bc74', { lw: 2.6, seed: 3 + sd }); Q(x - sd * rr * 0.4, -rr * 0.7, x + sd * rr * 0.3, -rr * 0.3, x - sd * rr * 0.1, rr * 0.1, 1.8, '#b07c3a'); dot(x + sd * 2, -rr * 0.2, 2.4, b.fill === 'chicken' ? '#b46a2a' : '#5f8f2a'); }
    }
    ctx.restore();
  }
  if (b.st === 'filled' && !G.tut) T('دوس للف ✓', cx, cy - 46, 13, '#2e7d32');
}
function drawTray(key, col, ball, label) {
  const r = ST[key], pk = pressK(key);
  R(r.x, r.y + pk, r.w, r.h, 10, '#c9d1d6', { lw: 3, sd: 0.15 });
  R(r.x + 8, r.y + 8 + pk, r.w - 16, r.h - 16, 7, '#8f9aa1', { lw: 2, hl: 0 });
  const nt = Math.ceil(9 * stockN(key) / capOf(key));
  for (let i = 0; i < nt; i++) { const x = r.x + 22 + (i % 3) * 32, y = r.y + 22 + Math.floor(i / 3) * 14 + pk; E(x, y, 11, 8, col, { lw: 2, seed: i + r.x }); if (ball) ball(x, y); }
  T(label, r.x + r.w / 2, r.y + r.h + 12, 13, '#3a2416'); badge(key, r.x + r.w - 16, r.y + 4);
}
function drawFryer(t) {
  const r = ST.fryer, pk = pressK('fryer');
  R(r.x, r.y + 18 + pk, r.w, r.h - 18, 12, '#3f7a7e', { lw: 3 });
  R(r.x + 12, r.y + pk, r.w - 24, 44, 8, '#c0c6cc', { lw: 3 });
  const oil = RRp(r.x + 20, r.y + 8 + pk, r.w - 40, 30, 6); ctx.fillStyle = G.fry >= 0 ? '#e0a02a' : '#c48a22'; ctx.fill(oil);
  if (G.fry >= 0) { ctx.save(); ctx.clip(oil); for (let i = 0; i < 10; i++) { const p = (t * 2 + i * 0.13) % 1; dot(r.x + 26 + hash(i) * (r.w - 52), r.y + 34 - p * 24 + pk, 2.5, 'rgba(255,255,220,.8)'); } for (let i = 0; i < 7; i++) R(r.x + 34 + i * 10, r.y + 12 + pk, 5, 22, 2, '#f4c430', { lw: 1.2 }); ctx.restore(); ring(r.x + r.w - 18, r.y + 72, 12, G.fry / dur(2.6), '#ffb347'); }
  L([[r.x + 30, r.y + 4], [r.x + 18, r.y - 22]], 4, OLC);
  R(r.x + 24, r.y + 58, 60, 22, 6, '#1d2a2c', { lw: 2, hl: 0 }); T(G.fry >= 0 ? ar(Math.ceil(dur(2.6) - G.fry)) : 'قلّي', r.x + 54, r.y + 69, 14, '#7affb0');
  T('بطاطس', r.x + r.w / 2, r.y - 4, 13, '#3a2416'); badge('fryer', r.x + r.w - 20, r.y + 40);
}
function drawDisp(t) {
  const r = ST.disp;
  R(r.x, r.y, r.w, 74, 14, '#d9dfe3', { lw: 3, sd: 0.12 });
  for (let i = 0; i < 4; i++) {
    const vis = has(TAPS[i].p), x = tapX(i);
    ctx.save(); if (!vis) ctx.globalAlpha = 0.25;
    const lv = vis ? stockN('tap' + i) / capOf('tap' + i) : 1;
    R(x - 20, r.y + 10, 40, 34, 8, '#eef3f6', { lw: 2.4, hl: 0.5 }); if (lv > 0) R(x - 18, r.y + 12 + 30 * (1 - lv), 36, 30 * lv, 6, TAPS[i].c === '#f4f2ec' ? '#e8e4da' : TAPS[i].c, { ol: false, hl: 0.3 });
    if (vis) { ctx.save(); ctx.translate(x, r.y + 40); prod(TAPS[i].p, 0, 0, 0.42, t); ctx.restore(); }
    R(x - 6, r.y + 70 + pressK('tap' + i), 12, 18, 3, '#9aa4ac', { lw: 2.2 });
    ctx.restore();
    if (!vis) continue;
    badge('tap' + i, x, r.y + 57);
    if (G.taps[i] >= 0) { const f = G.taps[i] / dur(1.3); L([[x, r.y + 88], [x, 494 - 40 * f]], 4, TAPS[i].c); prod(TAPS[i].p, x, 500, 0.95, t, f); }
  }
  R(r.x + 4, 500, r.w - 8, 10, 4, '#7d878e', { lw: 2, hl: 0 });
}
function drawKettle(t) {
  const r = ST.kettle, cx = r.x + r.w / 2, pk = pressK('kettle');
  R(cx - 34, r.y + 74, 68, 16, 6, '#3a3a3e', { lw: 2.4 }); glow(cx, r.y + 78, 30, '#4a8bff', 0.5);
  ctx.save(); ctx.translate(cx, r.y + 44 + pk); if (G.kettle >= 0) ctx.rotate(-0.35);
  E(0, 6, 34, 28, '#e8b62a', { sd: 0.25, hl: 0.4 }); PL([[30, -2], [56, -16], [58, -10], [32, 10]], '#e8b62a', { lw: 2.6 }); R(-12, -28, 24, 8, 3, '#c9961a', { lw: 2.2 }); E(0, -30, 6, 5, '#c9961a', { lw: 2 });
  ctx.restore();
  if (G.kettle >= 0) { const f = G.kettle / dur(1.6); L([[cx + 46, r.y + 30], [cx + 2, 494 - 30 * f]], 3, '#b8611a', 0.9); prod('zoolTea', SLOT.kout[0], 500, 0.95, t, f); }
  T('شاي', cx, r.y - 8, 13, '#3a2416'); badge('kettle', cx + 36, r.y + 10);
}
function drawTrash() {
  const r = ST.trash, pk = pressK('trash'), cx = r.x + r.w / 2;
  R(r.x + 6, r.y + 22 + pk, r.w - 12, r.h - 26, 8, '#9aa4ac', { lw: 3 });
  for (let i = 0; i < 3; i++) L([[r.x + 18 + i * 14, r.y + 34 + pk], [r.x + 18 + i * 14, r.y + r.h - 14 + pk]], 2, '#6a747a');
  R(r.x, r.y + 8 + pk, r.w, 14, 5, '#b8c1c7', { lw: 3 }); R(cx - 10, r.y + pk, 20, 10, 3, '#8a949a', { lw: 2.4 });
}
function badge(k, x, y) {
  const n = stockN(k), cap = capOf(k), a = G.ah, com = a && (a.q.includes(k) || a.tgt === k);
  if (n <= 0 || com) {
    const s = com ? 'جاي...' : 'فاضي!', c = com ? '#2e7fb8' : '#d32f2f', z = com ? 1 : 1 + Math.abs(Math.sin(G.t * 6)) * 0.12;
    ctx.save(); ctx.translate(x, y); ctx.scale(z, z); R(-30, -11, 60, 22, 11, c, { lw: 2.2, hl: 0.2, v: false }); T(s, 0, 1, 13, '#fff'); ctx.restore(); return;
  }
  const lo = n <= cap * 0.3; R(x - 15, y - 9, 30, 18, 9, lo ? '#ff8a3d' : '#2a1d14', { lw: 1.6, hl: 0, v: false }); T('×' + ar(n), x, y + 1, 12, '#fff');
}
function drawFreezer(t) {
  if (!has('shawqyIce')) return;
  const f = ST.freezer, cx = f.x + f.w / 2, n = stockN('freezer');
  R(f.x, f.y + 14, f.w, f.h - 14, 10, '#f4f6f8', { lw: 3, sd: 0.18 });
  R(f.x + 6, f.y + 4, f.w - 12, 24, 8, '#bfe6ff', { lw: 2.6, hl: 0.5 });
  for (let i = 0; i < Math.min(n, 6); i++) E(f.x + 20 + i * 17, f.y + 18, 7, 5, ['#ffffff', '#ffd0e0', '#c8f0d8'][i % 3], { lw: 1.6, hl: 0.3 });
  R(f.x + 12, f.y + 40, f.w - 24, 24, 6, '#2e7fb8', { lw: 2.2 }); T('آيس كريم', cx, f.y + 52, 14, '#fff', FD);
  if (n > 0 && !(G.drag && G.drag.key === 'src:freezer')) prod('shawqyIce', f.x + f.w - 24, f.y + 10, 0.55, t);
  badge('freezer', f.x + 26, f.y + f.h - 10);
}
const srcPos = k => k === 'freezer' ? [ST.freezer.x + ST.freezer.w - 24, ST.freezer.y + 10] : [SRC[k].x, SRC[k].y];
function diaaNeeds() { const c = G.state === 'play' && G.slots && G.slots.find(c => c && (c.ch === 'diaa' || c.ghost) && c.st === 'wait'); return c ? { c, need: c.order.filter(o => !o.done && SRC[o.p]).map(o => o.p) } : null; }
function drawKiosk(t) {
  const dn = diaaNeeds(), need = dn ? dn.need : [];
  if (need.length) glow(914, 112, 50, '#ffe066', 0.5 + 0.3 * Math.sin(t * 6));
  if (G.sea) { glow(914, 110, 46, G.sea === 'ram' ? '#ffd86b' : '#ff8ae8', 0.35); }
  for (const k of kioskKeys()) { const s = SRC[k]; if (!(G.drag && G.drag.key === 'src:' + k)) { const nd = need.includes(k), b = nd ? Math.abs(Math.sin(t * 6 + s.x)) * 4 : 0; prod(k, s.x, s.y - b, (k === 'wbr' ? 0.5 : G.sea ? 0.56 : 0.62) * (nd ? 1.12 : 1), t); } T(s.lb, s.x, 149, fit(s.lb, 27, 10), '#ffe9b8'); }
  if (need.length) { ctx.save(); ctx.globalAlpha = 0.6 + 0.4 * Math.sin(t * 8); const hp = RRp(866, 84, 92, 58, 10); ctx.lineWidth = 3.5; ctx.strokeStyle = '#ffe066'; ctx.setLineDash([7, 5]); ctx.stroke(hp); ctx.restore(); }
}
function diaaHintHand() {   // a hand that drags from the kiosk shelf to the doctor, for his first seconds
  if (!(G.diaaHint > 0) || G.drag) return; const dn = diaaNeeds(); if (!dn || !dn.need.length) return;
  const s = SRC[dn.need[0]], tx = SLOTX[dn.c.slot], k = (G.t % 1.6) / 1.2; if (k > 1) return;
  const e = easeOut(k); ctx.save(); ctx.globalAlpha = 0.95; T('👆', lerp(s.x, tx, e) + 10, lerp(s.y - 16, 200, e) + 12, 36, '#fff'); ctx.restore();
}
function drawFruit(t) {
  R(870, 262, 84, 14, 3, '#4a2a12', { lw: 2, hl: 0 });
  for (const k of FRUITK) { const s = SRC[k]; if (!(G.drag && G.drag.key === 'src:' + k)) prod(k, s.x, s.y, 0.54, t); }
  R(866, 278, 92, 26, 4, '#c8945a', { lw: 2.6 }); L([[869, 283], [955, 283]], 1.4, '#8a5228', 0.7); L([[869, 299], [955, 299]], 1.4, '#8a5228', 0.7);
  for (const k of FRUITK) { const ls = tr(SRC[k].lb).split('\n'); ls.forEach((l, i) => T(l, SRC[k].x, 292 + (i - (ls.length - 1) / 2) * 10, fit(l, 27, ls.length > 1 ? 10 : 11, FD), '#4a2410', FD)); }   // a long name goes on two lines
}
function drawAHSeat(t) {
  const a = G.ah;
  ctx.save(); ctx.beginPath(); ctx.rect(CLIPX[1], 140, W - CLIPX[1], CT - 146); ctx.clip();
  ctx.translate(AHX, AHY); ctx.scale(0.6, 0.6);
  if (!a || a.st === 'sit') { const md = a && a.say ? 1 : 0; sprite(sl('ahs'), md + ',' + tb(12, 0.5), -100, -260, 200, 330, () => drawAH(t, 'sit', md), SC * DPR * 0.6); }
  else { R(-46, -150, 92, 84, 18, '#d8342c', { lw: 3 }); for (let i = 0; i < 3; i++) R(-30 + i * 22, -134, 14, 44, 6, '#b8241e', { lw: 1.6, hl: 0 }); R(-56, -44, 112, 16, 6, '#d8342c', { lw: 3 }); }
  ctx.restore();
  if (a && a.say) {
    const w = Math.min(200, 34 + a.say.length * 10), x = a.st === 'sit' ? 790 : a.x, y = a.st === 'sit' ? 196 : a.y - 130;
    const p = RRp(x - w / 2, y - 18, w, 36, 16); ctx.fillStyle = '#fff6e6'; ctx.fill(p); ctx.lineWidth = 2.6; ctx.strokeStyle = OLC; ctx.stroke(p);
    if (a.st === 'sit') PL([[x + w / 2 - 4, y - 6], [x + w / 2 + 16, y + 2], [x + w / 2 - 4, y + 8]], '#fff6e6', { lw: 2.6, hl: 0, v: false });
    T(a.say, x, y + 1, fit(a.say, w - 14, 17), '#3a1d0e');
  }
}
function drawAHMove(t) {
  const a = G.ah; if (!a || a.st === 'sit') return;
  ctx.save(); ctx.translate(a.x, a.y); E(0, 26, 26, 6, 'rgba(0,0,0,.25)', { ol: false }); ctx.scale(a.from && a.to && a.to[0] < a.from[0] ? -0.46 : 0.46, 0.46); drawAH(t, a.st === 'work' ? 'work' : 'walk', 0); ctx.restore();
  if (a.st === 'work') { ring(a.x + 36, a.y - 110, 11, clamp(a.t / a.wd, 0, 1), '#ffd23f'); T(STOCKN[a.tgt], a.x, a.y + 44, 12, '#fff', FB, 'center', 3); }
}
function drawWalkers(t) {
  const ws = G.walkers; if (!ws || !ws.length) return;
  ctx.save(); ctx.beginPath(); ctx.rect(CLIPX[0], 26, CLIPX[1] - CLIPX[0], CT - 32); ctx.clip();
  for (const w of ws) {
    if (w.kind !== 'fly' && w.kind !== 'ufo' && w.kind !== 'cats' && w.act !== 'astro' && w.ch !== 'rasoda') { ctx.save(); ctx.globalAlpha = 0.25; ctx.fillStyle = '#000'; ctx.beginPath(); ctx.ellipse(w.x, w.y, 70 * w.s * (w.kind === 'tuk' ? 1.8 : 1), 12 * w.s, 0, 0, Math.PI * 2); ctx.fill(); ctx.restore(); }
    ctx.save(); ctx.translate(w.x, w.y + (w.kind === 'fly' || w.kind === 'ufo' ? Math.sin(t * 3 + w.seed) * 10 : 0)); ctx.scale(w.dir * w.s, w.s);
    if (!w.L) w.L = makeLayer();
    sprite(w.L, tb(10, w.seed), -170, -390, 340, 430, () => { if (w.kind === 'walk') walkerBody(w, t); else if (w.kind === 'tuk') drawTuk(t); else if (w.kind === 'bike') drawBike(t); else if (w.kind === 'gas') drawGas(t, w); else if (w.kind === 'ufo') drawUfo(t); else if (w.kind === 'cats') drawCats(w); else CH[w.ch].d(1, t); }, SC * DPR * w.s);
    ctx.restore();
    if (w.kind === 'tuk') for (let i = 0; i < 2; i++) { const p = (t * 0.9 + i * 0.5) % 1; ctx.save(); ctx.globalAlpha = 1 - p; T('♫', w.x - w.dir * 30 + p * 10, w.y - 100 - p * 26, 18, '#ffd23f', FB, 'center', 3); ctx.restore(); }
    if (w.kind === 'gas' && Math.sin(t * 2 + w.seed) > 0.4) T('أنابيب!', w.x, w.y - 162, 14, '#fff', FD, 'center', 3);
    if (w.kind === 'walk' && HEAD[w.ch]) { const hy = w.y + w.s * (HEAD[w.ch][1] - 100);
      if (w.stopT > 0 && w.emo) T(w.emo, w.x, hy - 16 + Math.sin(t * 5) * 2, 22, '#fff', FB, 'center');
      else if (w.act === 'phone' && Math.sin(t * 1.5 + w.seed) > 0.5) T('ألو؟', w.x + w.dir * 34, hy - 4, 14, '#fff', FD, 'center', 3); }
  }
  ctx.restore();
}
function drawPigeons(t) {
  const P = G.pig; if (!P || !P.b.length) return;
  ctx.save(); ctx.beginPath(); ctx.rect(CLIPX[0], 26, CLIPX[1] - CLIPX[0], CT - 32); ctx.clip();
  for (const b of P.b) {
    const d = b.dir, x = b.x, y = b.y, air = b.st !== 'peck', down = !air && (t * 1.3 + b.k) % 2 < 0.35;
    if (!air) { ctx.save(); ctx.globalAlpha = 0.22; ctx.fillStyle = '#000'; ctx.beginPath(); ctx.ellipse(x, y, 9, 2.5, 0, 0, Math.PI * 2); ctx.fill(); ctx.restore(); L([[x - 2, y - 4], [x - 2, y]], 1.6, '#e07a7a'); L([[x + 2, y - 4], [x + 2, y]], 1.6, '#e07a7a'); }
    PL([[x - d * 8, y - 9], [x - d * 17, y - 11], [x - d * 15, y - 5]], '#5f646e', { lw: 1.4, hl: 0, v: false });
    E(x, y - 8, 9, 6, '#8a8f9a', { lw: 1.6, hl: 0.3, v: false });
    if (air) { const f = Math.sin(t * 26 + b.k) * 9; PL([[x - 4, y - 10], [x + 4, y - 10], [x - d * 6, y - 18 - f]], '#9aa0aa', { lw: 1.4, hl: 0, v: false }); }
    else E(x - d * 2, y - 9, 6, 3.5, '#6f747e', { lw: 1.2, hl: 0, v: false });
    const hx = x + d * 8, hy = down ? y - 3 : y - 13;
    E(hx, hy, 4.5, 4.5, '#7a7f8a', { lw: 1.4, hl: 0.2, v: false }); dot(hx - d * 1.5, hy + 3, 2, '#5fae8a'); dot(hx + d * 1.5, hy - 1, 1.1, '#111');
    PL([[hx + d * 4, hy - 1], [hx + d * 8, hy + 1], [hx + d * 4, hy + 2]], '#e8a040', { lw: 0.8, hl: 0, v: false });
  }
  ctx.restore();
}
function drawDog(t) {   // a baladi dog asleep by the cart, breathing slowly, with Zzz floating up
  if (areaI() === 3) return;
  sprite(sl('dog'), tb(6), 780, 236, 86, 52, () => {
    const br = 1 + Math.sin(G.t * 1.8) * 0.07, c = '#c8955a';
    Q(852, 280, 866, 272, 858, 262, 7, OLC); Q(852, 280, 866, 272, 858, 262, 3.5, c);
    E(834, 276, 24, 10 * br, c, { lw: 2.4, hl: 0.3 });
    E(842, 270, 9, 5, shade(c, -0.2), { lw: 0, hl: 0, v: false, ol: false });
    E(803, 284, 8, 3.2, c, { lw: 1.8, hl: 0 }); E(815, 285, 7, 3, c, { lw: 1.8, hl: 0 });
    E(810, 277, 11, 9, c, { lw: 2.2, hl: 0.3 }); E(800, 280, 7, 5, '#e8c08a', { lw: 1.8, hl: 0.2 }); dot(794, 279, 2.2, '#222');
    Q(803, 274, 807, 277, 811, 274, 1.6, OLC);
    E(817, 275, 5, 8.5, '#8a5a2a', { lw: 1.8, hl: 0, rot: 0.6 });
  });
  for (let i = 0; i < 3; i++) { const p = (t * 0.35 + i / 3) % 1; ctx.save(); ctx.globalAlpha = Math.min(1, p * 4) * (1 - p); T('z', 800 - p * 14 + Math.sin(p * 6) * 3, 266 - p * 38, 9 + p * 8, '#ffffff', FD, 'center', 2.5); ctx.restore(); }
}
function drawRadio(t) {   // boombox: tap to switch tape
  const r = ST.radio, x = r.x + 4, y = r.y, tp = TAPES[S.tape] || TAPES.rahma, on = musicLive && musV > 0, bt = on ? Math.abs(Math.sin(t * 7)) * 2 : 0;
  L([[x + 18, y + 10 - bt], [x + 24, y - 4 - bt], [x + 58, y - 4 - bt], [x + 64, y + 10 - bt]], 5, OLC);
  R(x, y + 8 - bt, 82, 46, 8, '#3a3a44', { lw: 3, v: true });
  for (const sx of [x + 16, x + 66]) { E(sx, y + 34 - bt, 12 + bt * 0.6, 12 + bt * 0.6, '#1a1a1e', { lw: 2.2 }); E(sx, y + 34 - bt, 5, 5, '#777', { lw: 1.4 }); }
  R(x + 30, y + 22 - bt, 22, 18, 3, tp.c, { lw: 2 }); E(x + 36, y + 31 - bt, 3, 3, '#fff', { lw: 1 }); E(x + 46, y + 31 - bt, 3, 3, '#fff', { lw: 1 });
  R(x + 30, y + 12 - bt, 22, 6, 2, '#9aa4ac', { lw: 1.4, hl: 0 });
  if (on) for (let i = 0; i < 2; i++) { const p = (t * 0.8 + i * 0.5) % 1; ctx.save(); ctx.globalAlpha = 1 - p; T('♪', x + 90 + p * 16, y + 10 - p * 30, 18, '#fff', FB, 'center', 3); ctx.restore(); }
}
function drawSauce() {   // tahini squeeze bottle
  const r = ST.sauce, cx = r.x + r.w / 2, pk = pressK('sauce'), sq = pk ? 4 : 0;
  E(cx, r.y + r.h - 4, 22, 5, 'rgba(0,0,0,.2)', { ol: false });
  R(cx - 15 - sq / 2, r.y + 28 + pk, 30 + sq, r.h - 34 - pk, 10, '#f4ead0', { lw: 2.6, sd: 0.2 });
  R(cx - 11, r.y + 14 + pk, 22, 16, 4, '#c62828', { lw: 2.2 }); PL([[cx - 4, r.y + 15 + pk], [cx, r.y - 2 + pk], [cx + 4, r.y + 15 + pk]], '#c62828', { lw: 2 });
  T('طحينة', cx, r.y + 58, 11, '#8a5a2a', FD);
}
function drawIce() {   // ice bucket
  const r = ST.ice, cx = r.x + r.w / 2, pk = pressK('ice');
  for (let i = 0; i < 5; i++) R(cx - 20 + (i % 3) * 13 + (i > 2 ? 6 : 0), r.y + 12 - (i > 2 ? 9 : 0) + pk, 12, 12, 3, '#d8f2ff', { lw: 1.6, hl: 0.6, v: false });
  PL([[cx - 25, r.y + 20], [cx + 25, r.y + 20], [cx + 19, r.y + r.h - 6], [cx - 19, r.y + r.h - 6]], '#9aa4ac', { lw: 2.6, hl: 0.4 });
  L([[cx - 23, r.y + 30], [cx + 23, r.y + 30]], 1.6, '#6a747a'); T('تلج', cx, r.y + 50, 15, '#fff', FD, 'center', 3, '#2e5a7a');
}
function drawVit() {
  const r = ST.vit;
  R(r.x, r.y, r.w, r.h, 8, '#b8c1c7', { lw: 3 });
  const ip = RRp(r.x + 5, r.y + 5, r.w - 10, r.h - 12, 5); const g = ctx.createLinearGradient(0, r.y, 0, r.y + r.h); g.addColorStop(0, '#fff3cf'); g.addColorStop(1, '#f2c27a'); ctx.fillStyle = g; ctx.fill(ip);
  R(r.x + 4, r.y + r.h - 12, r.w - 8, 6, 2, '#8a5228', { lw: 1.8 });
  T('فاترينة', r.x + r.w / 2, r.y - 8, 12, '#3a2416');
}
function drawVitGlass() {
  const r = ST.vit; ctx.save(); ctx.globalAlpha = 0.35; ctx.fillStyle = '#e8f6ff'; ctx.fill(RRp(r.x + 5, r.y + 5, r.w - 10, r.h - 12, 5)); ctx.restore();
  L([[r.x + 14, r.y + 12], [r.x + 26, r.y + 12]], 3, '#ffffff', 0.8); L([[r.x + 12, r.y + 20], [r.x + 18, r.y + 20]], 2, '#ffffff', 0.6);
  ctx.lineWidth = 2.2; ctx.strokeStyle = OLC; ctx.stroke(RRp(r.x + 5, r.y + 5, r.w - 10, r.h - 12, 5));
}
function drawItems(t) {
  for (const k in SLOT) {
    const p = G.items[k]; if (!p) continue; if (G.drag && G.drag.key === k) continue;
    const [x, y] = SLOT[k], sel = G.sel === k, bob = sel ? Math.sin(t * 8) * 3 - 6 : 0, s0 = SLOTS_S[k] || 0.95;
    if (sel) glow(x, y - 30 * s0, 50 * s0, '#ffe066', 0.8);
    const age = G.t - (G.born[k] ?? -9), e = clamp(age / 0.4, 0, 1);
    if (e < 1) { const sq = 1 + Math.sin(e * Math.PI * 3) * 0.13 * (1 - e), gs = k === 'board' ? 0.55 + 0.45 * easeBack(e) : 1; DECO = clamp(age / 0.3, 0, 1); ctx.save(); ctx.translate(x, y + bob); ctx.scale(sq * gs, gs / sq); prod(p, 0, 0, s0, t); ctx.restore(); DECO = 1; }
    else prod(p, x, y + bob, sel ? s0 * 1.1 : s0, t);
  }
  for (const f of G.fly || []) { const k = easeOut(f.t / 0.35); prod(f.p, lerp(f.x0, f.x1, k), lerp(f.y0, f.y1, k) - Math.sin(k * Math.PI) * 60, 0.7, t); }
  drawVitGlass(); diaaHintHand();
  if (G.sel && G.sel.startsWith('src:')) { const [x, y] = srcPos(G.sel.slice(4)); ctx.save(); ctx.globalAlpha = 0.6 + 0.4 * Math.sin(t * 8); ctx.beginPath(); ctx.arc(x, y - 18, 26, 0, Math.PI * 2); ctx.lineWidth = 3; ctx.strokeStyle = '#ffe066'; ctx.setLineDash([6, 5]); ctx.stroke(); ctx.restore(); }
  const xs = G.xsel || (G.drag && G.drag.key.startsWith('x:') && G.drag.moved ? G.drag.key[2] : '');
  if (xs) for (const k in SLOT) { const p = G.items[k]; if (p && EXTRAS[xs].on.includes(pid(p)) && !pex(p)) { const [x, y] = SLOT[k]; ctx.save(); ctx.globalAlpha = 0.6 + 0.4 * Math.sin(t * 8); ctx.beginPath(); ctx.arc(x, y - 30, 34, 0, Math.PI * 2); ctx.lineWidth = 3; ctx.strokeStyle = xs === 's' ? '#fff3d6' : '#bfe6ff'; ctx.setLineDash([6, 5]); ctx.stroke(); ctx.restore(); } }
  if (G.drag && G.drag.key.startsWith('x:')) { if (G.drag.moved) { ctx.save(); ctx.translate(G.drag.x - 23 * 1.8, G.drag.y + 22 * 1.8 - 26); ctx.scale(1.8, 1.8); xBadge(G.drag.key[2]); ctx.restore(); } }
  else if (G.drag) { const p = prodOf(G.drag.key); if (p) { ctx.save(); ctx.globalAlpha = 0.28; ctx.fillStyle = '#000'; ctx.beginPath(); ctx.ellipse(G.drag.x + 6, G.drag.y + 42, 30, 8, 0, 0, Math.PI * 2); ctx.fill(); ctx.globalAlpha = 1; prod(p, G.drag.x, G.drag.y + 30, 1.15, t); ctx.restore(); } }
}
// steam and smoke: the spit smokes, the fryer and the kettle steam, and fresh hot food steams for a few seconds
const HOTP = { hafoWrap: 1, jabFries: 1, zoolTea: 1, sakrFal: 1, hankSand: 1, mixWrap: 1, friesWrap: 1, falSand: 1 };
function puffs(x, y, n, h, a, t, sp = 0.55, w = 9) {   // curly wisps, white with a soft grey edge so they show on the light counter and the dark street
  ctx.save(); ctx.lineCap = 'round'; const o = ctx.globalAlpha;
  for (let i = 0; i < n; i++) {
    const p = (t * sp + i / n) % 1, yy = y - p * h, xx = x + Math.sin(p * 5 + i * 2.1 + t * 0.8) * w * (0.4 + p), ww = 2.5 + 3.5 * (1 - p), c = Math.sin(t * 2 + i) * 6;
    ctx.globalAlpha = o * a * Math.sin(p * Math.PI); ctx.beginPath(); ctx.moveTo(xx, yy); ctx.bezierCurveTo(xx + 7 + c, yy - 6, xx - 7 - c, yy - 12, xx, yy - 19);
    ctx.lineWidth = ww + 3; ctx.strokeStyle = 'rgba(100,110,120,.5)'; ctx.stroke(); ctx.lineWidth = ww; ctx.strokeStyle = '#ffffff'; ctx.stroke();
  }
  ctx.restore();
}
function drawSteam(t) {
  const lo = QL >= 2 ? 0.5 : 1;
  if (stockN('spit') > 0) puffs(70, 112, Math.ceil(3 * lo), 40, 0.5, t, 0.4, 12);
  if (stationVisible('fryer') && G.fry >= 0) puffs(ST.fryer.x + 70, ST.fryer.y + 4, Math.ceil(5 * lo), 60, 0.85, t, 0.8, 24);
  if (stationVisible('kettle')) { const k = G.kettle >= 0; puffs(ST.kettle.x + 104, ST.kettle.y + 30, Math.ceil((k ? 4 : 2) * lo), k ? 50 : 34, k ? 0.8 : 0.5, t, 0.6, 8); }
  for (const k in SLOT) {
    const p = G.items[k]; if (!p || !HOTP[pid(p)] || pex(p) === 'i' || (G.drag && G.drag.key === k)) continue;
    const age = G.t - (G.born[k] ?? -99); if (age > 14) continue;
    const [x, y] = SLOT[k], s0 = SLOTS_S[k] || 0.95; puffs(x, y - 62 * s0, Math.ceil(3 * lo), 40 * s0, 0.8 * (1 - age / 14), t + x * 0.01, 0.5, 6);
  }
}
function drawDirt(t) {
  const n = dirtN();
  for (let i = 0; i < n; i++) {
    const x = DIRTX[i] + (hash(i + S.day) - 0.5) * 14, y = CT - 4;
    ctx.save(); ctx.translate(x, y); ctx.scale(1.6, 1.6); ctx.translate(-x, -y);   // drawn bigger so it shows
    if (i === 0) { B([[x - 9, y - 2], [x - 2, y - 9], [x + 8, y - 6], [x + 9, y + 3], [x, y + 6], [x - 8, y + 4]], '#f4f2ec', { lw: 1.8, hl: 0.2 }); L([[x - 4, y - 3], [x + 3, y + 1]], 1, '#9a9488'); }
    else if (i === 1) { ctx.save(); ctx.translate(x, y); ctx.rotate(1.3); R(-6, -11, 12, 22, 3, '#d32f2f', { lw: 1.8, hl: 0.4 }); R(-6, -11, 12, 4, 2, '#c9d1d6', { lw: 1.2 }); ctx.restore(); }
    else if (i === 2) E(x, y + 3, 14, 5, '#8a4a1a', { lw: 1.4, hl: 0.3, v: false });
    else if (i === 3) { for (const s of [-1, 1]) B([[x, y - 4], [x + s * 6, y - 2], [x + s * 12, y + 4], [x + s * 4, y + 2]], '#f4c430', { lw: 1.6 }); E(x, y - 4, 3, 3, '#6a4a1a', { lw: 1 }); }
    else { L([[x - 12, y], [x + 10, y]], 2.2, '#e8e0cc'); for (let k = 0; k < 4; k++) L([[x - 8 + k * 5, y - 5], [x - 6 + k * 5, y + 5]], 1.6, '#e8e0cc'); E(x + 12, y, 4, 3.5, '#e8e0cc', { lw: 1.2 }); }
    ctx.restore();
    const fx = x + Math.cos(t * 5 + i * 2) * 16, fy = y - 22 + Math.sin(t * 8 + i) * 7;   // a fly
    ctx.save(); ctx.globalAlpha = 0.6; E(fx - 3, fy - 3, 3.5, 2, '#e8f4ff', { ol: false, shade: false }); E(fx + 3, fy - 3, 3.5, 2, '#e8f4ff', { ol: false, shade: false }); ctx.restore(); dot(fx, fy, 2.4, '#1a1a1a');
  }
  if (G.wipe) { const { x, y } = G.wipe; R(x - 18, y - 12, 36, 24, 7, '#ffd23f', { lw: 2.4, hl: 0.3 }); R(x - 18, y + 4, 36, 8, 3, '#2e9d4a', { lw: 2 }); for (let k = 0; k < 3; k++) E(x - 10 + k * 10, y - 16 - (k % 2) * 4, 3, 3, '#ffffff', { lw: 1, hl: 0.5, v: false }); }
}
// reviews arrive one by one: each post slides in, its stars fill with a ding, then the day's rating counts up
const revAt = i => 0.45 + i * 1.0, revEnd = () => revAt(G.posts.length) + 0.2;
function revTick(dt) {
  const t1 = G.revT, t0 = t1 - dt;
  G.posts.forEach((q, i) => {
    const a = revAt(i); if (t0 < a && t1 >= a) { sfx.notif(); if (q.st <= 2) { G.revShake = 0.5; sfx.wrong(); } }
    for (let k = 0; k < q.st; k++) { const s = a + 0.35 + k * 0.11; if (t0 < s && t1 >= s) tone(900 + k * 150, 0.08, 'triangle', 0.07); }
    const e = a + 0.4 + q.st * 0.11; if (q.st === 5 && t0 < e && t1 >= e) { sfx.combo(4); burst(560, 150 + i * 124, 14, ['#ff4f7a', '#ffffff', '#ffd23f'], 'heart', 0.7); }
  });
  const e = revEnd(); if (t0 < e && t1 >= e) { if (G.rate >= 4) { sfx.fanfare(); burst(480, 90, 30, ['#ffd23f', '#ffffff', '#ff8ae8'], 'star', 1); } else if (G.rate <= 2) sfx.wrong(); else sfx.vip(); }
  if (G.revShake > 0) G.revShake -= dt;
}
function startSummary() { G.endPh = 'sum'; G.endT = 0; G.revOpen = 0; sfx.whoosh(); if (G.stars) sfx.fanfare(); else sfx.wrong(); }
function sumTick(dt) {   // the summary drops in: coins count up, the tiles pop, and a good day rains confetti
  if (CHAL) return; const t = G.endT;
  if (t > 0.6 && t < 2 && G.earned - G.spent > 0 && (G.cTick = (G.cTick || 0) - dt) <= 0) { G.cTick = 0.075; G.cK = (G.cK || 0) + 1; sfx.coin(G.cK % 12); }
  if (t - dt < 2 && t >= 2 && G.stars) burst(480, 160, 26, ['#ffd23f', '#ffffff', '#9be37a'], 'star', 1);
  for (let i = 0; i < 4; i++) { const a = 2.1 + i * 0.12; if (t - dt < a && t >= a) sfx.pop(i); }
  if (G.stars && t > 1 && t < 4 && Math.random() < dt * 22) burst(rnd(170, 790), -10, 1, ['#ffd23f', '#ff5e7a', '#6be3ff', '#9be37a', '#ffffff'], 'conf', 0.3);
}
function drawReviews() {
  BT = BT.filter(b => b.id === 'hud'); dim(0.6);
  const live = G.endPh === 'rev', rt = live ? G.revT : 99, ph = live ? pop(rt, 0.4) : 1, sh = G.revShake > 0 ? Math.sin(G.t * 60) * 7 * G.revShake : 0;
  ctx.save(); ctx.translate(480 + sh, 272); ctx.scale(ph, ph); ctx.translate(-480, -272);
  const x = 270, w = 420;
  R(x, 30, w, 484, 30, '#1c1c24', { lw: 3.5, shade: false }); R(x + 12, 56, w - 24, 440, 16, '#eef1f6', { lw: 2, shade: false }); R(x + 12, 56, w - 24, 46, 16, '#3b5998', { lw: 2, shade: false });
  T('الرحمة بوك 📱', x + w - 90, 79, 20, '#fff', FD); const rk = live ? clamp((rt - revEnd()) / 0.6, 0, 1) : 1; T('تقييمك ⭐ ' + ar(Math.round(G.rate * easeOut(rk) * 2) / 2) + ' من ٥', x + 92, 80, rk > 0 && rk < 1 ? 16 : 13, rk >= 1 ? '#ffe38a' : '#dfe6ff');
  G.posts.forEach((q, i) => {
    const t0 = revAt(i), a = clamp((rt - t0) / 0.35, 0, 1); if (a <= 0) return; ctx.save(); ctx.globalAlpha = a; ctx.translate((1 - easeBack(a)) * 260, 0);
    const y = 114 + i * 124, p = RRp(x + 22, y, w - 44, 114, 12); ctx.fillStyle = '#fff'; ctx.fill(p); ctx.lineWidth = 1.6; ctx.strokeStyle = '#d0d6e0'; ctx.stroke(p);
    const ax = x + w - 58, ay = y + 32;
    ctx.save(); ctx.beginPath(); ctx.arc(ax, ay, 22, 0, Math.PI * 2); ctx.fillStyle = '#dfe6f2'; ctx.fill(); ctx.clip(); albPortrait(q.ch, ax, ay + 24, 0.17, true); ctx.restore();
    ctx.beginPath(); ctx.arc(ax, ay, 22, 0, Math.PI * 2); ctx.lineWidth = 2; ctx.strokeStyle = OLC; ctx.stroke();
    T(CH[q.ch].n, ax - 32, ay - 9, 15, '#1c1c24', FD, 'right');
    for (let k = 0; k < 5; k++) { const ts = t0 + 0.35 + k * 0.11, on = k < q.st && rt >= ts, sc = on ? 1 + 0.6 * clamp(1 - (rt - ts) / 0.25, 0, 1) : 1; ctx.save(); ctx.translate(ax - 40 - k * 15, ay + 13); ctx.scale(sc, sc); star(0, 0, 6, on ? '#ffc928' : '#d8dce4', on ? '#a86a00' : '#b8bcc8'); ctx.restore(); }
    wrapT(q.s, x + w / 2 - 6, y + 78, w - 84, 14, '#2a2a34', 20);
    const lk = Math.round((q.lk || 0) * clamp((rt - t0 - 0.5) / 0.6, 0, 1)); if (lk) T('👍 ' + ar(lk), x + 62, y + 20, 12, '#3b5998', FD);
    ctx.restore();
  });
  if (rk > 0) { const v = G.rate >= 4.5 ? ['📈 ريفيوهات نار! زباين أكتر بكره', '#2e7d32'] : G.rate <= 2 ? ['📉 خلي بالك، الزباين هتقل بكره', '#c62828'] : ['⭐ تقييمك ' + ar(G.rate) + ' من ٥', '#3b5998'], vs = live ? pop(rt - revEnd(), 0.4) : 1; ctx.save(); ctx.translate(480, 487); ctx.scale(vs, vs); T(v[0], 0, 0, 16, v[1], FD); ctx.restore(); }
  ctx.restore();
  if (live) { const done = rt >= revEnd() + 0.5; if (!done) T('دوس عشان تسرّع', 480, 528, 12, '#cfc4b8'); btn(0, 0, W, H, () => { if (G.revT < revEnd() + 0.5) G.revT = revEnd() + 0.5; else startSummary(); }); if (done) bigBtn(716, 446, 190, 56, 'كمّل', startSummary, '#e8304a', 24); }
  else { T('دوس في أي حتة عشان تقفل', 480, 504, 12, '#9aa0b0'); btn(0, 0, W, H, () => { G.revOpen = 0; sfx.tap(); }); }
}
// the day's best moment as a comic panel: shown from the end screen and shared as an image
function drawComic(x, y, w, h, m, d) {
  const ox = x + w * 0.3, oy = y + h * 0.62, fr = RRp(x, y, w, h, 8);
  ctx.save(); ctx.clip(fr);
  const g = ctx.createRadialGradient(ox, oy, 20, ox, oy, w * 0.8); g.addColorStop(0, '#fff6b0'); g.addColorStop(0.55, '#ffc24a'); g.addColorStop(1, '#ff7a2a'); ctx.fillStyle = g; ctx.fillRect(x, y, w, h);
  ctx.beginPath(); for (let i = 0; i < 20; i++) { const a = i / 20 * Math.PI * 2; ctx.moveTo(ox, oy); ctx.arc(ox, oy, w * 1.2, a, a + Math.PI / 20); ctx.closePath(); } ctx.fillStyle = 'rgba(255,255,255,.28)'; ctx.fill();
  ctx.beginPath(); for (let yy = y + 6, r = 0; yy < y + h; yy += 13, r++) for (let xx = x + 6 + (r % 2) * 6.5; xx < x + w; xx += 13) { ctx.moveTo(xx + 2.4, yy); ctx.arc(xx, yy, 2.4, 0, Math.PI * 2); } ctx.fillStyle = 'rgba(190,50,10,.15)'; ctx.fill();
  ctx.save(); ctx.translate(ox, y + h + 28); ctx.scale(0.92, 0.92); CH[m.ch].d(1, 0); ctx.restore();
  R(ox - 74, y + h - 36, 148, 26, 8, '#1c120c', { lw: 2, hl: 0, v: false, shade: false }); T(CH[m.ch].n, ox, y + h - 22, fit(CH[m.ch].n, 136, 14), '#ffe9b8', FD);
  const bx = x + w * 0.73, by = y + h * 0.27, sp = [];
  for (let i = 0; i < 28; i++) { const a = i / 28 * Math.PI * 2, r = i % 2 ? 68 : 96; sp.push([bx + Math.cos(a) * r * 1.22, by + Math.sin(a) * r * 0.82]); }
  PL(sp, '#ffe03a', { lw: 4, hl: 0.2, v: false, shade: false });
  ctx.save(); ctx.translate(bx, by); ctx.rotate(-0.1); T(m.big, 0, 4, fit(m.big, 180, 40, FD), '#e8203a', FD, 'center', 7, '#ffffff'); ctx.restore();
  const qx = x + w * 0.71, qy = y + h * 0.7, qw = 262, qh = 100, bp = RRp(qx - qw / 2, qy - qh / 2, qw, qh, 44), tp = new Path2D();
  tp.moveTo(qx - qw / 2 + 30, qy - 16); tp.lineTo(ox + 62, y + h * 0.64); tp.lineTo(qx - qw / 2 + 34, qy + 14); tp.closePath();
  ctx.lineWidth = 7; ctx.strokeStyle = OLC; ctx.lineJoin = 'round'; ctx.stroke(bp); ctx.stroke(tp); ctx.fillStyle = '#ffffff'; ctx.fill(bp); ctx.fill(tp);
  ctx.font = '800 16px ' + FB; const nl = Math.min(3, Math.ceil(ctx.measureText(tr(m.cap)).width / (qw - 40))); wrapT(m.cap, qx, qy - (nl - 1) * 11 + 1, qw - 40, 16, '#1c120c', 22);
  const nt = 'اليوم ' + ar(d) + ' • ' + AREAS[AREAS.reduce((a, r, i) => d >= r.from ? i : a, 0)].n; R(x + 12, y + 12, 210, 30, 4, '#fff7c8', { lw: 2.6, hl: 0, v: false, shade: false }); T(nt, x + 117, y + 28, fit(nt, 196, 14), '#3a1d0e', FD);
  const br = 'عربية الرحمة 🛒' + (S.name ? ' • ' + S.name : ''); T(br, x + w - 110, y + h - 20, fit(br, 200, 15, FD), '#7a1010', FD, 'center', 5, '#ffffff');
  ctx.restore(); ctx.lineWidth = 6; ctx.strokeStyle = OLC; ctx.stroke(fr);
}
function openSnap(m, d) {
  if (!m || typeof m !== 'object') { m = G.moment; d = G.dayDone || S.day; } G.snapM = m; G.snapD = d;
  G.snapOpen = 1; G.snapFile = null; sfx.tap();
  try {
    const c = document.createElement('canvas'); c.width = 1176; c.height = 736; const x2 = c.getContext('2d'); x2.scale(2, 2);
    withCtx(x2, () => drawComic(4, 4, 580, 360, m, d)); G.snapC = c;
    c.toBlob(b => { try { if (b) G.snapFile = new File([b], 'rahma-cart.png', { type: 'image/png' }); } catch (e) { } }, 'image/png');
  } catch (e) { G.snapC = null; }
}
function drawSnap() {
  BT = BT.filter(b => b.id === 'hud'); dim(0.75);
  if (G.snapC) { ctx.save(); ctx.translate(480, 238); ctx.rotate(-0.015); ctx.drawImage(G.snapC, -294, -184, 588, 368); ctx.restore(); }
  else drawComic(190, 58, 580, 360, G.snapM || G.moment, G.snapD || G.dayDone || S.day);
  btn(0, 0, W, H, () => { G.snapOpen = 0; sfx.tap(); });
  bigBtn(500, 440, 240, 56, '📤 شارك اللقطة', () => { UPFN = shareSnap; }, '#2e9d4a', 22);
  bigBtn(220, 444, 200, 50, 'رجوع', () => { G.snapOpen = 0; }, '#8a5a3c', 20);
}
function shareSnap() {   // runs on pointerup, so phones count it as a tap and allow sharing
  const f = G.snapFile, txt = '📸 لقطة من عربية الرحمة\n' + GAME_URL + (ENG ? '?lang=en' : '');
  try { if (f && navigator.canShare && navigator.canShare({ files: [f] })) { navigator.share({ files: [f], text: tr(txt) }).catch(() => { }); return; } } catch (e) { }
  if (APP) { try { if (G.snapC && RahmaApp.shareImage) RahmaApp.shareImage(G.snapC.toDataURL('image/png'), tr(txt)); else RahmaApp.share(tr(txt)); } catch (e) { toast('صوّر الشاشة وابعتها لصحابك 📸'); } return; }
  if (window.claude) { toast('صوّر الشاشة وابعتها لصحابك 📸'); return; }   // inside the Claude viewer pages can't save files
  try { const a = document.createElement('a'); a.href = G.snapC.toDataURL('image/png'); a.download = 'rahma-cart.png'; document.body.appendChild(a); a.click(); a.remove(); toast('اتحفظت الصورة في الجهاز 📸', '#9be37a'); } catch (e) { toast('صوّر الشاشة وابعتها لصحابك 📸'); }
}
function drawWheel(t) {
  const w = G.whl, cx = 480, cy = 266, r = 158, sg = Math.PI / 4;
  dim(0.72); T('🎡 عجلة الحظ', 480, 46, 34, '#ffd23f', FD, 'center', 6, OLC); const sk = S.strk.n >= 2 ? '🔥 بقالك ' + cnt(S.strk.n, 'يوم ورا بعض • فلوس العجلة ×', 'أيام ورا بعض • فلوس العجلة ×', 'يومين ورا بعض • فلوس العجلة ×') + ar(+strMul().toFixed(1)) : 'لفّة ببلاش كل يوم • تعالى بكره كمان والفلوس تزيد 🔥'; T(sk, 480, 80, fit(sk, 600, 15), '#ffe9b8');
  glow(cx, cy, r + 40, '#ffd86b', 0.35);
  ctx.save(); ctx.translate(cx, cy);
  WHEEL.forEach((p, i) => {
    const a = -Math.PI / 2 + w.a + i * sg; ctx.beginPath(); ctx.moveTo(0, 0); ctx.arc(0, 0, r, a - sg / 2, a + sg / 2); ctx.closePath(); ctx.fillStyle = p.c; ctx.fill(); ctx.lineWidth = 3; ctx.strokeStyle = OLC; ctx.stroke();
    ctx.save(); ctx.rotate(a); ctx.translate(r * 0.64, 0); ctx.rotate(Math.PI / 2); T(p.s, 0, 0, 18, '#fff', FD, 'center', 4, OLC); ctx.restore();
  });
  ctx.beginPath(); ctx.arc(0, 0, r, 0, Math.PI * 2); ctx.lineWidth = 6; ctx.strokeStyle = OLC; ctx.stroke();
  for (let i = 0; i < 16; i++) { const a = i * Math.PI / 8; dot(Math.cos(a) * (r + 1), Math.sin(a) * (r + 1), 4.5, (i + Math.floor(t * 4)) % 2 ? '#fff6c8' : '#ffd23f'); }
  E(0, 0, 26, 26, '#d7263d', { lw: 3, hl: 0.4 }); ctx.restore();
  PL([[cx - 16, cy - r - 22], [cx + 16, cy - r - 22], [cx, cy - r + 8]], '#ffd23f', { lw: 3 });
  if (w.st === 'done') {
    const k = pop(w.t, 0.35); ctx.save(); ctx.translate(480, 270); ctx.scale(k, k); panel(-220, -76, 440, 152); T(w.prize, 0, -26, fit(w.prize, 400, 24, FD), '#3a1d0e', FD); ctx.restore();
    bigBtn(400, 286, 160, 48, 'تمام', () => { G.state = 'title'; }, '#2e9d4a', 20);
  } else bigBtn(390, 458, 180, 54, w.st === 'spin' ? '...' : 'لف العجلة!', spinWheel, '#e8304a', 22);
}
function drawHelper(t) {
  const h = G.hlp; if (!h) return;
  const zz = h.st === 'sleep', md = zz ? 0 : h.happy > 0 ? 1 : 0;
  ctx.save(); ctx.translate(HLPX, CT + 4); ctx.scale(0.3, 0.3); if (zz) ctx.rotate(-0.12);
  sprite(sl('hlp'), (zz ? 's' : md) + tb(8), -120, -200, 240, 250, () => CH.zarb.d(md, t), SC * DPR * 0.3); ctx.restore();
  if (zz) for (let k = 0; k < 3; k++) { const p = (t * 0.7 + k / 3) % 1; ctx.save(); ctx.globalAlpha = 1 - p; T('z', HLPX + 22 + p * 22, CT - 58 - p * 40, 12 + p * 10, '#fff', FD, 'center', 3); ctx.restore(); }
  if (h.say && h.sayT > 0) { const w = Math.min(160, 30 + h.say.length * 8), p = RRp(HLPX - w / 2 + 34, CT - 112, w, 30, 14); ctx.fillStyle = '#fff6e6'; ctx.fill(p); ctx.lineWidth = 2.4; ctx.strokeStyle = OLC; ctx.stroke(p); T(h.say, HLPX + 34, CT - 96, fit(h.say, w - 12, 13), '#2e5a12'); }
}
// the municipal inspector, the shutter, the power cut and the fairy lights
function drawInspector(x, y, t, st) {
  const w = st === 'fine' ? 0 : Math.sin(t * 9);
  ctx.save(); ctx.translate(x, y); ctx.scale(0.62, 0.62);
  ctx.save(); ctx.globalAlpha = 0.25; ctx.fillStyle = '#000'; ctx.beginPath(); ctx.ellipse(0, 0, 40, 8, 0, 0, Math.PI * 2); ctx.fill(); ctx.restore();
  for (const sd of [-1, 1]) { const fx = sd * (12 + w * 10); L([[sd * 10, -70], [fx, 0]], 13, OLC); L([[sd * 10, -70], [fx, 0]], 8, '#4a4a32'); E(fx + sd * 2, 0, 11, 6, '#1a1a1a', { lw: 2 }); }
  R(-30, -150, 60, 86, 16, '#c8b070', { lw: 3, sd: 0.2 }); R(-31, -84, 62, 10, 3, '#5a3a1a', { lw: 2 }); dot(0, -79, 4, '#d8b62a');
  for (let i = 0; i < 3; i++) dot(0, -136 + i * 16, 2.6, '#8a6a2a'); R(-24, -142, 12, 9, 2, '#d32f2f', { lw: 1.4 });
  L([[-24, -140], [-36, -100 - w * 4]], 12, OLC); L([[-24, -140], [-36, -100 - w * 4]], 7, '#c8b070');
  L([[24, -140], [40, -106 + w * 4]], 12, OLC); L([[24, -140], [40, -106 + w * 4]], 7, '#c8b070');
  R(30, -130 + w * 4, 28, 36, 3, '#c89a5a', { lw: 2.2 }); R(34, -124 + w * 4, 20, 26, 1, '#ffffff', { lw: 1, hl: 0 }); for (let i = 0; i < 3; i++) L([[37, -117 + i * 7 + w * 4], [51, -117 + i * 7 + w * 4]], 1.2, '#888');
  E(0, -178, 24, 27, '#c98b5a', { lw: 3 });
  R(-26, -214, 52, 20, 6, '#2a3a5a', { lw: 2.6 }); R(-5, -209, 10, 9, 2, '#d8b62a', { lw: 1.2 }); PL([[-28, -196], [28, -196], [38, -189], [-18, -189]], '#1a2a3a', { lw: 2.2 });
  dot(-9, -180, 3.2, OLC); dot(9, -180, 3.2, OLC); BROW(-9, -188, 12, 0.35, 4); BROW(9, -188, 12, -0.35, 4);
  B([[-17, -165], [-7, -170], [0, -166], [7, -170], [17, -165], [8, -161], [-8, -161]], '#2a1a10', { lw: 1.4 });
  ctx.restore();
}
function drawRaid(t) {
  const r = G.raid;
  ctx.save(); ctx.beginPath(); ctx.rect(CLIPX[0], 26, CLIPX[1] - CLIPX[0], CT - 32); ctx.clip();
  drawInspector(r.x, 262, t, r.st);
  if (r.shut > 0) {
    const h = (CT - 32) * easeOut(r.shut), x0 = CLIPX[0], w = CLIPX[1] - CLIPX[0];
    const g = ctx.createLinearGradient(0, 26, 0, 26 + h); g.addColorStop(0, '#9aa4ac'); g.addColorStop(1, '#7d878e'); ctx.fillStyle = g; ctx.fillRect(x0, 26, w, h);
    for (let y = 34; y < 26 + h; y += 12) { L([[x0, y], [x0 + w, y]], 2, '#5a6268'); L([[x0, y + 2], [x0 + w, y + 2]], 1, '#c0c8cc', 0.6); }
    ctx.fillStyle = '#4a5258'; ctx.fillRect(x0, 18 + h, w, 8);
    if (r.shut > 0.9) T('🤫 مقفولين... المفتش برا', 497, 160, 26, '#fff', FD, 'center', 5);
  }
  ctx.restore();
}
function drawRaidUI(t) {
  const r = G.raid, bub = r.st === 'come' ? 'فين الرخصة؟ 📋' : r.st === 'fine' ? 'مخالفة! 🧾' : r.st === 'closed' ? 'مفيش حد هنا؟ 🤨' : null;
  if (bub && r.x > CLIPX[0] + 40 && r.x < CLIPX[1] - 40) { const bw = 40 + bub.length * 9, bx = clamp(r.x, CLIPX[0] + bw / 2, CLIPX[1] - bw / 2), p = RRp(bx - bw / 2, 76, bw, 34, 16); ctx.fillStyle = '#fff6e6'; ctx.fill(p); ctx.lineWidth = 2.6; ctx.strokeStyle = OLC; ctx.stroke(p); T(bub, bx, 94, fit(bub, bw - 14, 15), '#5a2e12'); }
  if (r.st !== 'come') return;
  const s = 1 + Math.abs(Math.sin(t * 6)) * 0.06; ctx.save(); ctx.translate(480, 150); ctx.scale(s, s);
  ctx.fillStyle = '#7a1010'; ctx.fill(RRp(-110, -24, 220, 60, 18)); R(-110, -30, 220, 60, 18, '#d32f2f', { lw: 4, hl: 0.3, v: false }); T('🚨 اقفل العربية!', 0, 2, 24, '#fff', FD, 'center', 4, '#5a1010'); ctx.restore();
  btn(366, 116, 228, 72, () => { r.st = 'closed'; sfx.box(); sfx.whoosh(); G.sel = null; G.drag = null; }, 'raid');
}
function drawBlackout(t) {
  const fl = Math.sin(t * 23) > 0.85 ? 0.12 : 0; ctx.fillStyle = 'rgba(6,8,24,' + (0.42 - fl) + ')'; ctx.fillRect(0, 0, W, H);
  glow(AHX, CT - 70, 80, '#ffe066', 0.45 + 0.25 * Math.sin(t * 6));
  const ms = [[ST.disp.x + 105, ST.disp.y + 40]]; if (stationVisible('fryer')) ms.push([ST.fryer.x + 70, ST.fryer.y + 30]); if (stationVisible('kettle')) ms.push([ST.kettle.x + 48, ST.kettle.y + 30]);
  for (const [x, y] of ms) T('⚡', x, y + Math.sin(t * 8 + x) * 3, 26, '#ffe066', FB, 'center', 4);
  if (G.ah && G.ah.st === 'sit' && !G.ah.q.includes('gen')) T('👉', AHX - 64 + Math.sin(t * 8) * 6, CT - 120, 34, '#fff');
}
// Sakartaout's rival cart across the street, on rival days
const RIVX = 212;
function drawRival(t) {
  if (!G.rival) return;
  sprite(sl('rival'), tb(6), RIVX - 80, 112, 170, 166, () => {
    const x = RIVX, y = 266;
    E(x, y + 4, 66, 6, 'rgba(0,0,0,.3)', { ol: false });
    L([[x - 52, y - 56], [x - 52, y - 98]], 3, '#2a2a2a'); L([[x + 52, y - 56], [x + 52, y - 98]], 3, '#2a2a2a');
    R(x - 58, y - 58, 116, 50, 6, '#3a2a4a', { lw: 2.4, hl: 0.15 }); R(x - 50, y - 50, 100, 14, 3, '#5a4a6a', { lw: 1.6, hl: 0 });
    T('سكرتاعوط', x, y - 25, fit('سكرتاعوط', 96, 15, FD), '#ffd23f', FD);
    for (const s of [-1, 1]) { E(x + s * 38, y - 4, 10, 10, '#1a1a1e', { lw: 2 }); E(x + s * 38, y - 4, 4, 4, '#888', { lw: 1 }); }
    for (let i = 0; i < 5; i++) { ctx.fillStyle = i % 2 ? '#1a1a1e' : '#7a3ab8'; ctx.fillRect(x - 62 + i * 24.8, y - 114, 24.8, 16); ctx.beginPath(); ctx.arc(x - 49.6 + i * 24.8, y - 98, 12.4, 0, Math.PI); ctx.fill(); ctx.lineWidth = 2; ctx.strokeStyle = OLC; ctx.stroke(); }
    L([[x - 62, y - 114], [x + 62, y - 114]], 2.4);
    ctx.save(); ctx.translate(x + 26, y - 128 + Math.sin(t * 3) * 2); ctx.scale(0.55, 0.55); drawBird(0, 0, t); ctx.restore();
  });
}
// the day's weather: a hot sun behind the street, or rain in front of it
function drawNight(t) {   // midnight: a dark street with a moon and stars; the cart's own lights stay warm
  ctx.save(); ctx.beginPath(); ctx.rect(CLIPX[0], 0, CLIPX[1] - CLIPX[0], CT - 6); ctx.clip();
  const g = ctx.createLinearGradient(0, 0, 0, CT); g.addColorStop(0, 'rgba(6,8,36,.74)'); g.addColorStop(1, 'rgba(24,14,52,.5)'); ctx.fillStyle = g; ctx.fillRect(CLIPX[0], 0, CLIPX[1] - CLIPX[0], CT);
  for (let i = 0; i < 16; i++) { ctx.globalAlpha = 0.5 + 0.4 * Math.sin(t * 2 + i * 1.7); dot(CLIPX[0] + 20 + hash(i * 7.3) * (CLIPX[1] - CLIPX[0] - 40), 64 + hash(i * 3.1 + 1) * 120, 1.4 + (i % 3) * 0.5, '#fff8d0'); }
  ctx.globalAlpha = 1; glow(372, 92, 64, '#fff3b0', 0.4);
  ctx.save(); ctx.beginPath(); ctx.arc(372, 92, 19, 0, Math.PI * 2); ctx.clip(); ctx.beginPath(); ctx.rect(350, 70, 44, 44); ctx.arc(381, 86, 16, 0, Math.PI * 2); ctx.fillStyle = '#fff3c4'; ctx.fill('evenodd'); ctx.restore();
  ctx.restore();
}
// the sky through the day: a bright morning, a golden afternoon, the usual sunset, then night with the windows and shops lit
function dayPh() {   // 0 morning .. 0.55 sunset .. 1 night (in Ramadan the sun sets at the iftar cannon)
  if (!isFinite(G.time)) return G.tut ? 0.1 : (G.dayT % 150) / 150;
  if (G.iftar) return G.dayT < G.iftar.at ? 0.55 * G.dayT / G.iftar.at : Math.min(1, 0.55 + 0.45 * (G.dayT - G.iftar.at) / (DAYLEN - G.iftar.at));
  return clamp(G.dayT / DAYLEN, 0, 1);
}
const HWIN = [];   // the hara's windows (same layout as renderBG); fill = safe to paint lit without covering laundry, signs or graffiti
for (const [x, w, top] of [[140, 160, 66], [300, 176, 46], [520, 170, 84], [700, 166, 56]]) for (let ry = top + 16; ry < 176; ry += 50) for (let cx = x + 18; cx < x + w - 30; cx += 46)
  HWIN.push([cx, ry, hash(cx * 0.3 + ry), !(ry + 34 > 194 || (cx + 30 > 320 && cx < 460 && ry < 140 && ry + 34 > 100) || (cx + 30 > 280 && cx < 380 && ry + 34 > 165) || (cx + 30 > 520 && cx < 600 && ry + 34 > 172))]);
function drawDayLight(t) {
  const AK = area().k; if (AK === 'space') return;
  const ph = dayPh(), sm = (a, b, x) => { const k = clamp((x - a) / (b - a), 0, 1); return k * k * (3 - 2 * k); };
  const day = 1 - sm(0.28, 0.5, ph), gold = clamp(1 - Math.abs(ph - 0.42) / 0.13, 0, 1), nt = sm(0.64, 0.84, ph), wet = G.wx === 'rain' ? 0.5 : 1, X0 = CLIPX[0], XW = CLIPX[1] - CLIPX[0];
  ctx.save(); ctx.beginPath(); ctx.rect(X0, 0, XW, CT - 6); ctx.clip();
  if (day > 0.01 || gold > 0.01) {
    ctx.globalCompositeOperation = 'screen';
    if (day > 0.01) { const g = ctx.createLinearGradient(0, 0, 0, CT); g.addColorStop(0, `rgba(150,215,255,${0.7 * day * wet})`); g.addColorStop(0.7, `rgba(255,240,200,${0.36 * day * wet})`); g.addColorStop(1, `rgba(255,240,200,${0.12 * day * wet})`); ctx.fillStyle = g; ctx.fillRect(X0, 0, XW, CT); }
    if (gold > 0.01) { ctx.fillStyle = `rgba(255,200,110,${0.28 * gold * wet})`; ctx.fillRect(X0, 0, XW, CT); }
    ctx.globalCompositeOperation = 'source-over';
    const q = ph / 0.55;   // sunlight moving across the sky (hot days draw their own sun; none in the rain)
    if (q < 1 && G.wx !== 'hot' && G.wx !== 'rain') { ctx.globalAlpha = 1 - sm(0.8, 1, q); glow(190 + 600 * q, 70 - 30 * Math.sin(Math.PI * q), 150, q > 0.7 ? '#ffb850' : '#fff6d0', 0.4); ctx.globalAlpha = 1; }
  }
  if (nt > 0.01) {
    ctx.globalAlpha = nt;
    const g = ctx.createLinearGradient(0, 0, 0, CT); g.addColorStop(0, 'rgba(6,8,36,.7)'); g.addColorStop(1, 'rgba(20,12,44,.5)'); ctx.fillStyle = g; ctx.fillRect(X0, 0, XW, CT);
    if (AK === 'hara') {   // the windows and the shops light up
      ctx.fillStyle = '#ffd36a'; for (const [x, y, h, ok] of HWIN) if (h > 0.25) { if (h <= 0.45 && ok) ctx.fillRect(x + 2, y + 2, 26, 30); glow(x + 15, y + 17, 30, '#ffd36a', 0.4); }
      for (const [x, c] of [[220, '#ff6a5a'], [388, '#ffd23f'], [605, '#6bff9a'], [783, '#6bb8ff']]) { glow(x, 208, 74, c, 0.4); glow(x, 246, 70, '#ffb347', 0.6); }
      glow(660, 70, 60, '#fff6c8', 0.45);
    } else if (AK === 'corn') { for (const x of [230, 480, 730]) glow(x + 20, 146, 64, '#ffd36a', 0.7); glow(626, 64, 40, '#ff8ae8', 0.6); glow(250, 70, 56, '#fff6c8', 0.45); }
    else if (AK === 'stad') { for (const x of [180, 816]) glow(x, 50, 90, '#fffbe0', 0.7); glow(480, 80, 90, '#ffd23f', 0.3); }
    ctx.globalAlpha = 1;
  }
  ctx.restore();
}
function drawHeat(t) {
  if (G.wx !== 'hot') return;
  ctx.save(); ctx.beginPath(); ctx.rect(CLIPX[0], 26, CLIPX[1] - CLIPX[0], CT - 32); ctx.clip();
  const g = ctx.createLinearGradient(0, 26, 0, CT); g.addColorStop(0, 'rgba(255,170,60,.3)'); g.addColorStop(1, 'rgba(255,120,40,.06)'); ctx.fillStyle = g; ctx.fillRect(CLIPX[0], 26, CLIPX[1] - CLIPX[0], CT);
  glow(700, 80, 110, '#fff3a0', 0.55); E(700, 80, 24, 24, '#ffe066', { lw: 2.4, hl: 0.5, v: false });
  for (let i = 0; i < 10; i++) { const a = i * 0.628 + t * 0.4; L([[700 + Math.cos(a) * 32, 80 + Math.sin(a) * 32], [700 + Math.cos(a) * 44, 80 + Math.sin(a) * 44]], 3, '#ffd23f'); }
  ctx.globalAlpha = 0.3; for (let i = 0; i < 6; i++) { const x = 180 + i * 120, y = 290 - ((t * 30 + i * 37) % 60); Q(x, y, x + 8, y - 10, x, y - 20, 2, '#fff6d0'); }
  ctx.restore();
}
function drawRain(t) {
  if (G.wx !== 'rain') return;
  ctx.save(); ctx.beginPath(); ctx.rect(CLIPX[0], 26, CLIPX[1] - CLIPX[0], CT - 32); ctx.clip();
  ctx.fillStyle = 'rgba(30,40,80,.16)'; ctx.fillRect(CLIPX[0], 26, CLIPX[1] - CLIPX[0], CT);
  ctx.strokeStyle = 'rgba(205,228,255,.55)'; ctx.lineWidth = 1.6; ctx.beginPath();
  for (let i = 0; i < 70; i++) { const x = CLIPX[0] + (hash(i) * 734 + t * 40) % 734, y = 26 + (hash(i + 70) * 280 + t * (420 + hash(i + 9) * 160)) % 280; ctx.moveTo(x, y); ctx.lineTo(x - 5, y + 16); }
  ctx.stroke();
  ctx.strokeStyle = '#cfe4ff'; for (let i = 0; i < 5; i++) { const p = (t * 0.8 + i * 0.2) % 1, x = 180 + hash(i + 40) * 640; ctx.globalAlpha = (1 - p) * 0.6; ctx.beginPath(); ctx.ellipse(x, 290, 4 + p * 16, 1.5 + p * 3, 0, 0, Math.PI * 2); ctx.stroke(); }
  ctx.restore();
}
// an umbrella over a customer on a rainy day, a balloon on Eid (drawn behind them)
function umbrella(x, k) {
  const c = ['#e53935', '#2e7fb8', '#ffd23f', '#2e9d4a'][k], top = 30, rim = 64;
  L([[x, rim - 10], [x, rim + 140]], 3, '#3a2a1a');
  const p = new Path2D(); p.moveTo(x - 56, rim); p.quadraticCurveTo(x, top - 34, x + 56, rim); for (let i = 0; i < 4; i++) p.quadraticCurveTo(x + 42 - i * 28, rim - 9, x + 28 - i * 28, rim); p.closePath();
  ink(p, c, { lw: 2.4, hl: 0.3 }); for (const d of [-28, 0, 28]) L([[x + d * 0.4, top + 2], [x + d, rim]], 1.2, shade(c, -0.35)); L([[x, top + 2], [x, top - 8]], 2.4);
}
function balloon(x, k, t) {
  const c = ['#ff5e7a', '#ffd23f', '#6be3ff', '#9be37a'][k], bx = x + Math.sin(t * 1.6 + k) * 4, y = 64;
  Q(x + 10, y + 140, bx - 6, y + 60, bx, y + 18, 1.4, '#5a4a3a');
  E(bx, y, 15, 18, c, { lw: 2.2, hl: 0.45, v: false }); PL([[bx - 3, y + 18], [bx + 3, y + 18], [bx, y + 22]], c, { lw: 1.4, hl: 0, v: false });
}
// Ramadan lanterns or Eid bunting under the awning
function drawSeason(t) {
  if (!G.sea) return;
  sprite(sl('sea' + G.sea), tb(4), CLIPX[0], 30, CLIPX[1] - CLIPX[0], 74, () => {
    const cols = ['#ff5a5a', '#ffd23f', '#6be3ff', '#9be37a', '#ff8ae8'];
    for (let j = 0; j < 2; j++) {
      const x0 = CLIPX[0] + j * 367; Q(x0, 38, x0 + 183, 58, x0 + 367, 38, 1.6, '#2a1a10');
      for (let i = 1; i < (G.sea === 'ram' ? 4 : 12); i++) {
        const k = i / (G.sea === 'ram' ? 4 : 12), x = x0 + 367 * k, y = 38 + 40 * k * (1 - k), c = cols[(i + j * 2) % 5];
        if (G.sea === 'ram') {
          const on = (i + j + tb(4)) % 3 !== 0; L([[x, y], [x, y + 6]], 1.4, '#2a1a10'); glow(x, y + 24, 20, c, on ? 0.75 : 0.35);
          PL([[x - 7, y + 12], [x + 7, y + 12], [x, y + 4]], '#d4a017', { lw: 1.6, hl: 0.3 });
          PL([[x - 9, y + 12], [x + 9, y + 12], [x + 11, y + 24], [x + 9, y + 36], [x - 9, y + 36], [x - 11, y + 24]], on ? c : shade(c, -0.35), { lw: 1.8, hl: 0.4, v: false });
          L([[x, y + 12], [x, y + 36]], 1.2, '#7a5a10'); PL([[x - 7, y + 36], [x + 7, y + 36], [x, y + 44]], '#d4a017', { lw: 1.6, hl: 0.3 });
        } else PL([[x - 8, y], [x + 8, y + 1], [x, y + 15]], c, { lw: 1.4, hl: 0 });
      }
    }
    if (G.sea === 'eid') for (const bx of [CLIPX[0] + 26, CLIPX[1] - 26]) for (let i = 0; i < 3; i++) { const x = bx + (i - 1) * 14, y = 62 - (i % 2) * 12; L([[x, y + 16], [bx, 100]], 1.2, '#5a4a3a'); E(x, y, 10, 12, cols[i * 2 % 5], { lw: 1.8, hl: 0.45, v: false }); }
  });
}
function drawLights(t) {
  if (!S.cos.lights || (G.sea && G.state !== 'title')) return;
  sprite(sl('lights'), tb(3), CLIPX[0], 36, CLIPX[1] - CLIPX[0], 34, () => {
    for (let j = 0; j < 5; j++) { const x0 = CLIPX[0] + j * 146; Q(x0, 46, x0 + 73, 62, x0 + 146, 46, 1.6, '#2a1a10'); for (let i = 1; i < 7; i++) { const k = i / 7, x = x0 + 146 * k, y = 46 + 32 * k * (1 - k), c = ['#ff5a5a', '#ffd23f', '#6be3ff', '#9be37a', '#ff8ae8'][(i + j) % 5], on = (i + j + tb(3)) % 3 !== 0; if (on) glow(x, y + 6, 12, c, 0.7); E(x, y + 6, 3.6, 4.6, on ? c : shade(c, -0.5), { lw: 1.4, hl: 0.4, v: false }); } }
  });
}
function coinIcon(x, y, r) { E(x, y, r, r, '#ffc928', { lw: 2.4, hl: 0.5 }); ctx.beginPath(); ctx.arc(x, y, r * 0.66, 0, Math.PI * 2); ctx.lineWidth = 1.6; ctx.strokeStyle = '#b07a10'; ctx.stroke(); T('ج', x, y + 1, r * 1.05, '#8a5a00'); }
function drawHUD(t) {
  // money (top-right)
  const mb = 1 + moneyBounce * 0.12;
  ctx.save(); ctx.translate(W - 170, 30); ctx.scale(mb, mb);
  const p = RRp(-64, -18, 128, 36, 18); ctx.fillStyle = 'rgba(28,18,12,.82)'; ctx.fill(p); ctx.lineWidth = 2.5; ctx.strokeStyle = '#ffd23f'; ctx.stroke(p);
  coinIcon(44, 0, 14); T(ar(Math.round(dispMoney)), -10, 2, 22, '#fff3d6', FD); ctx.restore();
  if (G.state === 'play' || G.state === 'end') {
    // day + clock (top-left, past the pillar)
    R(146, 12, 58, 40, 8, '#fff6e6', { lw: 2.6, sd: 0.08, hl: 0 }); ctx.fillStyle = '#d32f2f'; ctx.fillRect(147, 13, 56, 12); const EN = CHAL && CHAL.endless; T(EN ? 'مستوى' : CHAL ? 'تحدي' : 'اليوم', 175, 19, 10, '#fff'); T(EN ? ar(CHAL.lvl) : CHAL ? '🏆' : ar(G.dayDone || S.day), 175, 39, 18, '#2a1206', FD);
    const tl = Math.ceil(G.time || 0), mm = Math.floor(tl / 60), ss = tl % 60, warn = G.time < 10 && G.time > 0;
    R(212, 12, 84, 40, 8, '#6b4422', { lw: 2.6, hl: 0.1 }); R(220, 18, 68, 28, 4, '#1a2420', { lw: 1.6, hl: 0 });
    if (EN) for (let i = 0; i < 3; i++) T(i < CHAL.strikes ? '❌' : '⚪', 234 + i * 20, 33, 14, '#fff');
    else { ctx.save(); const ws = warn ? 1 + Math.abs(Math.sin(t * 6)) * 0.15 : 1; ctx.translate(254, 33); ctx.scale(ws, ws); ctx.font = '800 18px ' + FB; ctx.direction = 'ltr'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = warn ? '#ff6b5b' : '#7affb0'; ctx.fillText(ar(mm) + ':' + ar(String(ss).padStart(2, '0')), 0, 1); ctx.restore(); }
    // goal bar
    const tg = target(G.dayDone || S.day), bx = 330, bw = 300, gf = EN ? clamp((G.earned - G.spent - CHAL.prev) / (CHAL.goal - CHAL.prev), 0, 1) : clamp(G.earned / (tg * 2), 0, 1);
    const gp = RRp(bx, 22, bw, 18, 9); ctx.fillStyle = 'rgba(28,18,12,.8)'; ctx.fill(gp);
    if (gf > 0) { const fp = RRp(bx + 3, 25, (bw - 6) * gf, 12, 6); const gg = ctx.createLinearGradient(bx, 0, bx + bw, 0); gg.addColorStop(0, '#ffb347'); gg.addColorStop(1, '#ffd23f'); ctx.fillStyle = gg; ctx.fill(fp); }
    if (!EN) [0.5, 0.75, 1].forEach(q => { const x = bx + 3 + (bw - 6) * q, got = gf >= q; star(x - (q === 1 ? 6 : 0), 31, 11, got ? '#ffd23f' : '#6b5a48', got ? '#a86a00' : OLC); });
    T(EN ? 'المستوى الجاي عند ' + ar(CHAL.goal) + ' ج' : 'الهدف ' + ar(tg) + ' ج', bx + bw / 2 - 30, 52, 12, '#fff3d6', FB, 'center', 3);
    if (G.rival) T('🛒 سكرتاعوط ' + ar(Math.round(G.rival.e)) + ' ج', bx + bw - 50, 52, 12, G.rival.e > G.earned - G.spent ? '#ff8a8a' : '#9be37a', FB, 'center', 3);
    if (CHAL && CHAL.vs) T('🥊 ' + (CHAL.vs.n || 'صاحبك') + ' ' + ar(CHAL.vs.s) + ' ج', bx + bw - 50, 52, 12, CHAL.vs.s > G.earned - G.spent ? '#ff8a8a' : '#9be37a', FB, 'center', 3);
  }
  if (G.state === 'play' && G.ms && G.ms.length) {
    const dn = G.ms.filter(m => m.done).length, mp = RRp(642, 14, 74, 36, 12); ctx.fillStyle = 'rgba(28,18,12,.82)'; ctx.fill(mp);
    T('🎯 ' + ar(dn) + '/' + ar(G.ms.length), 679, 33, 16, dn === G.ms.length ? '#9be37a' : '#ffe9b8'); btn(642, 10, 74, 44, () => { G.paused = true; sfx.tap(); }, 'hud');
  }
  if (G.state === 'play' && G.iftarT > 0) T('🌙 زحمة الفطار • الأسعار +٢٥٪ • ' + ar(Math.ceil(G.iftarT)), 480, 70, 14, '#ffe38a', FB, 'center', 4);
  else if (G.state === 'play' && G.iftar && !G.iftar.on) T('🌙 المغرب بعد ' + ar(Math.max(0, Math.ceil(G.iftar.at - G.dayT))) + ' ث', 480, 70, 13, '#ffe9b8', FB, 'center', 4);
  if (G.state === 'play' && G.matchT > 0) T('⚽ ماتش • الأسعار +٣٠٪ • ' + ar(Math.ceil(G.matchT)), 480, 70, 14, '#9be37a', FB, 'center', 4);
  const pb = RRp(W - 58, 10, 46, 42, 12); ctx.fillStyle = 'rgba(28,18,12,.82)'; ctx.fill(pb);
  if (G.state === 'play') { ctx.fillStyle = '#ffe9b8'; ctx.fillRect(W - 43, 21, 6, 20); ctx.fillRect(W - 32, 21, 6, 20); btn(W - 60, 6, 52, 50, () => { G.paused = !G.paused; sfx.tap(); }, 'hud'); }
  else { T('⚙', W - 35, 32, 26, '#ffe9b8'); btn(W - 60, 6, 52, 50, () => { OVL = 'set'; sfx.tap(); }, 'hud'); }
  if (G.state === 'intro' || G.state === 'end' || G.state === 'shop') { const hb = RRp(12, 10, 46, 42, 12); ctx.fillStyle = 'rgba(28,18,12,.82)'; ctx.fill(hb); T('🏠', 35, 32, 22, '#fff'); btn(8, 6, 54, 50, goHome, 'hud'); }
  if (G.state === 'play' && G.combo >= 2) {
    const k = 1 + Math.max(0, G.comboT - 0.9) * 2.5;
    ctx.save(); ctx.translate(186, 196); ctx.scale(k, k); ctx.rotate(-0.08);
    R(-50, -22, 100, 44, 14, '#ff6a2a', { lw: 3 }); T('كومبو ×' + ar(G.combo), 0, 2, 20, '#fff', FD, 'center', 4, '#7a2a00'); ctx.restore();
  }
}
function heartFX(x, y, s, c) { ctx.fillStyle = c; ctx.fill(heartP(x, y, s)); }
function drawFX(t) {
  if (G.bird) { drawBird(G.bird.x, G.bird.y, G.t); T('سكرتاعوط', G.bird.x, G.bird.y - 46, 14, '#fff', FB, 'center', 4); ctx.save(); ctx.globalAlpha = 0.5 + 0.5 * Math.sin(t * 10); ctx.beginPath(); ctx.arc(G.bird.x, G.bird.y, 52, 0, Math.PI * 2); ctx.lineWidth = 3; ctx.strokeStyle = '#ffd23f'; ctx.setLineDash([8, 8]); ctx.stroke(); ctx.restore(); }
  for (const p of G.parts) { const a = 1 - p.t / p.life; ctx.save(); ctx.globalAlpha = Math.min(1, a * 1.5); ctx.translate(p.x, p.y); ctx.rotate(p.r); if (p.kind === 'star') star(0, 0, p.s, p.c, 'rgba(0,0,0,.25)'); else if (p.kind === 'heart') heartFX(0, 0, p.s, p.c); else { ctx.fillStyle = p.c; ctx.fillRect(-p.s / 2, -p.s / 4, p.s, p.s / 2); } ctx.restore(); }
  for (const c of G.coins || []) { if (c.t < 0) continue; const k = easeOut(clamp(c.t / c.d, 0, 1)); const x = lerp(c.x0, W - 126, k) + Math.sin(k * Math.PI) * 50, y = lerp(c.y0, 30, k) - Math.sin(k * Math.PI) * 80; coinIcon(x, y, 11 - k * 2); }
  for (const p of G.pops) { const k = pop(p.t, 0.3), a = p.t > p.life - 0.3 ? (p.life - p.t) / 0.3 : 1; ctx.save(); ctx.globalAlpha = a; ctx.translate(p.x, p.y - p.t * 40); ctx.scale(k, k); T(p.s, 0, 0, p.size, p.c, FD, 'center', p.size * 0.22); ctx.restore(); }
  if (G.toast) drawToast();
  if (G.flash > 0) { ctx.save(); ctx.globalAlpha = G.flash * 0.9; ctx.fillStyle = G.flashC; ctx.globalCompositeOperation = 'lighter'; ctx.fillRect(0, 0, W, H); ctx.restore(); }
}
function drawToast() {
  const a = Math.min(1, G.toast.t * 3), ts = G.toast.s, sp = ts.length > 50 ? ts.indexOf(' ', Math.floor(ts.length / 2) - 3) : -1, ls = sp > 0 ? [ts.slice(0, sp), ts.slice(sp + 1)] : [ts], th = 14 + ls.length * 26; ctx.save(); ctx.globalAlpha = a; const w = Math.min(540, 60 + Math.max(...ls.map(l => l.length)) * 11); const p = RRp(480 - w / 2, 272 - th / 2, w, th, 20); ctx.fillStyle = 'rgba(28,18,12,.9)'; ctx.fill(p); ls.forEach((l, i) => T(l, 480, 273 + (i - (ls.length - 1) / 2) * 26, fit(l, w - 20, 17), G.toast.c)); ctx.restore();
}
function drawTut(t) {
  const st = TUT[G.tut.step], r = tutRect();
  ctx.save(); ctx.beginPath(); ctx.rect(0, 0, W, H);
  if (r) { const p = 6, x = r.x - p, y = r.y - p, w = r.w + p * 2, h = r.h + p * 2, q = 16; ctx.moveTo(x + q, y); ctx.arcTo(x + w, y, x + w, y + h, q); ctx.arcTo(x + w, y + h, x, y + h, q); ctx.arcTo(x, y + h, x, y, q); ctx.arcTo(x, y, x + w, y, q); ctx.closePath(); }
  ctx.fillStyle = 'rgba(15,6,2,.66)'; ctx.fill('evenodd');
  if (r) { const p = 6 + Math.sin(t * 6) * 3; const hp = RRp(r.x - p, r.y - p, r.w + p * 2, r.h + p * 2, 16); ctx.lineWidth = 12; ctx.strokeStyle = 'rgba(255,210,63,.3)'; ctx.stroke(hp); ctx.lineWidth = 4; ctx.strokeStyle = '#ffd23f'; ctx.stroke(hp); }
  ctx.restore();
  // drag hint: animated hand from item to customer
  if (st.hl && st.hl.startsWith('drag:')) {
    const key = st.hl.slice(5); if (G.items[key]) { const [sx, sy] = SLOT[key], tx = SLOTX[0], ty = 200, k = (t % 1.6) / 1.2; if (k <= 1) { const e = easeOut(k); ctx.save(); ctx.globalAlpha = 0.9; T('👆', lerp(sx, tx, e) + 10, lerp(sy, ty, e) + 10, 40, '#fff'); ctx.restore(); } }
  }
  const lines = st.txt, ch = 34 + lines.length * 28 + (st.tap ? 26 : 0);
  const cx = r && r.x + r.w / 2 > W / 2 ? 270 : 690, cw = 400;
  let cy = r ? (r.y > 250 ? 70 : 330) : H / 2 - ch / 2; if (r && r.y <= 250 && r.y + r.h > 300) cy = 70;
  const k = pop(G.tut.t, 0.35);
  ctx.save(); ctx.translate(cx, cy + ch / 2); ctx.scale(k, k); ctx.translate(-cx, -(cy + ch / 2));
  const cp = RRp(cx - cw / 2, cy, cw, ch, 20); ctx.fillStyle = 'rgba(0,0,0,.3)'; ctx.fill(RRp(cx - cw / 2 + 3, cy + 8, cw, ch, 20)); ctx.fillStyle = '#fff3d6'; ctx.fill(cp); ctx.lineWidth = 4; ctx.strokeStyle = '#d7263d'; ctx.stroke(cp);
  ctx.save(); ctx.translate(cx + cw / 2 - 26, cy + 18); ctx.scale(0.3, 0.3); CH.hafo.d(1, t); ctx.restore();
  lines.forEach((l, i) => T(l, cx - 10, cy + 30 + i * 28, fit(l, cw - 80, i === 0 ? 21 : 16), i === 0 ? '#d7263d' : '#3a1d0e', i === 0 ? FD : FB));
  if (st.tap) T('دوس في أي حتة عشان تكمّل', cx, cy + ch - 18, 12, '#9a6a4a');
  ctx.restore();
  if (r && !st.tap && !st.hl.startsWith('drag:') && st.hl !== 'order') { const bob = Math.sin(t * 8) * 7; T('👇', r.x + r.w / 2, r.y - 22 + bob, 40, '#fff'); }
}
function panel(x, y, w, h) {
  const p = RRp(x, y, w, h, 24);
  ctx.fillStyle = 'rgba(0,0,0,.3)'; ctx.fill(RRp(x + 3, y + 10, w, h, 24)); ctx.fillStyle = '#fff3d6'; ctx.fill(p);
  ctx.lineWidth = 5; ctx.strokeStyle = OLC; ctx.stroke(p);
  const q = RRp(x + 10, y + 10, w - 20, h - 20, 18); ctx.lineWidth = 2; ctx.strokeStyle = 'rgba(215,38,61,.35)'; ctx.setLineDash([6, 6]); ctx.stroke(q); ctx.setLineDash([]);
}
function bigBtn(x, y, w, h, label, fn, col = '#e8304a', fs = 26, id = '') {
  const pulse = 1 + Math.sin(G.t * 4) * 0.02;
  ctx.save(); ctx.translate(x + w / 2, y + h / 2); ctx.scale(pulse, pulse); ctx.translate(-(x + w / 2), -(y + h / 2));
  ctx.fillStyle = shade(col, -0.5); ctx.fill(RRp(x, y + 6, w, h, 18));
  const p = RRp(x, y, w, h, 18); const g = ctx.createLinearGradient(0, y, 0, y + h); g.addColorStop(0, shade(col, 0.25)); g.addColorStop(1, shade(col, -0.1)); ctx.fillStyle = g; ctx.fill(p); ctx.lineWidth = 4; ctx.strokeStyle = OLC; ctx.stroke(p);
  ctx.save(); ctx.globalAlpha = 0.3; ctx.fillStyle = '#fff'; ctx.fill(RRp(x + 10, y + 5, w - 20, h * 0.3, 10)); ctx.restore();
  T(label, x + w / 2, y + h / 2 + 3, fit(label, w - 20, fs, FD), '#fff', FD, 'center', 5, shade(col, -0.6));
  ctx.restore();
  btn(x, y, w, h + 6, () => { sfx.tap(); buzz(10); fn(); }, id);
}
function pill(x, y, w, h, label, fn, col = '#f0e2c4', tc = '#5a3a20', id = '') {   // calm secondary button: no pulse, small shadow
  ctx.fillStyle = 'rgba(60,30,10,.28)'; ctx.fill(RRp(x, y + 3, w, h, 12));
  const p = RRp(x, y, w, h, 12); ctx.fillStyle = col; ctx.fill(p); ctx.lineWidth = 2.6; ctx.strokeStyle = OLC; ctx.stroke(p);
  T(label, x + w / 2, y + h / 2 + 1, fit(label, w - 14, 15, FD), tc, FD);
  btn(x, y, w, h + 3, () => { sfx.tap(); buzz(8); fn(); }, id);
}
function dim(a = 0.7) { ctx.fillStyle = `rgba(20,8,2,${a})`; ctx.fillRect(0, 0, W, H); }
function drawTitle(t) {
  const order = ['hafo', 'aao', 'hank', 'jab', 'sakr', 'zool', 'floba', 'shamq', 'has', 'aaota', 'abkh', 'zarb', 'prince', 'dola', 'abbas', 'shawqy', 'barber', 'hankL', 'richard', 'rasoda'];
  drawWalkers(t);
  ctx.save(); ctx.beginPath(); ctx.rect(CLIPX[0], 0, CLIPX[1] - CLIPX[0], CT - 6); ctx.clip();
  for (let k = 0; k < 4; k++) {
    const cyc = Math.floor((t + k * 0.7) / 2.8), ph = ((t + k * 0.7) % 2.8) / 2.8, id = order[(cyc * 4 + k) % order.length];
    let off = 0; if (ph < 0.14) off = (1 - easeBack(ph / 0.14)) * 260; else if (ph > 0.88) off = easeOut((ph - 0.88) / 0.12) * 280;
    const md = ph > 0.3 && ph < 0.7 ? 1 : 0; ctx.save(); ctx.translate(SLOTX[k], CT + 8 + off + Math.sin(t * 3 + k * 2) * 3); ctx.scale(0.84, 0.84); sprite(sl('tp' + k), id + md + tb(15, k * 0.25), -200, -310, 400, 380, () => CH[id].d(md, t), SC * DPR * 0.84); ctx.restore();
  }
  ctx.restore();
  drawAHSeat(t); drawSpit(t); drawRadio(t); drawKiosk(t); if (fruitOn()) drawFruit(t); drawVitrine(t);
  panel(170, 306, 620, 216);
  ctx.save(); ctx.translate(480, 348); ctx.rotate(Math.sin(t * 2) * 0.02);
  T('عربية الرحمة', 0, 5, 52, '#7a1010', FD); T('عربية الرحمة', 0, 0, 52, '#ffd23f', FD, 'center', 9, OLC); ctx.restore();
  T('أكل ومشاريب على شكل مخلوقات عالم الرحمة', 480, 384, 14, '#3a1d0e');
  const cont = saved && S.day > 1;
  bigBtn(355, 398, 250, 54, cont ? 'كمّل اليوم ' + ar(S.day) : 'العب', () => { saved = null; if (!S.diff) G.state = 'diff'; else newDay(); });
  pill(188, 322, 124, 30, '🎚 ' + (S.diff ? DIFFS[S.diff].n : 'المستوى'), () => { G.state = 'diff'; });
  const deals = shopDeals(); pill(622, 405, 146, 40, '🛒 السوق', () => openShop(), deals ? '#2e7fb8' : '#6a8aa8', '#ffffff');
  if (deals) { E(760, 405, 12, 12, '#e8303a', { lw: 2 }); T(ar(Math.min(deals, 9)), 760, 406, 13, '#fff', FD); }
  if (cont) pill(648, 322, 124, 30, '↺ ابدأ من الأول', () => {
    if ((G.rstArm || 0) > G.t) { const t0 = S.tut, d = S.diff; S = fresh(); S.tut = t0; S.diff = d; saved = null; save(); dispMoney = 0; G.rstArm = 0; toast('بدأت من الأول 🆕'); }
    else { G.rstArm = G.t + 3; toast('⚠️ دوس تاني لو عايز تمسح كل حاجة وتبدأ من الأول', '#ffe38a', 3); }
  }, '#f6ece0', '#9a5a3a');
  [['📖 الألبوم', () => { G.state = 'album'; G.albSel = null; }], ['🏅 الألقاب', () => { G.state = 'titles'; }], ['🏆 تحدي اليوم', () => startChallenge()],
    [(S.fin ? '' : '🔒 ') + '♾ لا نهائي', () => { if (S.fin) startEndless(); else toast('بيفتح لما تسدد دين أبو حسيبة 😼'); }],
    ['💡 طريقة اللعب', () => { S.tut = 0; tutGo = 1; saved = null; if (!S.diff) G.state = 'diff'; else newDay(); }]].forEach(([l, f], i) => pill(662 - i * 118, 466, 108, 38, l, f));
  if (VS && !CHAL) { const vt = '🥊 ' + (VS.n || 'صاحبك') + ' عمل ' + ar(VS.s) + ' ج في التحدي! تقدر تغلبه؟', p = RRp(290, 254, 380, 42, 14); ctx.fillStyle = '#c62828'; ctx.fill(p); ctx.lineWidth = 3; ctx.strokeStyle = OLC; ctx.stroke(p); T(vt, 480, 276, fit(vt, 360, 16, FD), '#fff', FD, 'center', 4, '#5a1010'); btn(290, 254, 380, 42, () => { sfx.tap(); startChallenge(VS.key); }); }
}
// two glass cases on the home screen, one each side of the title card, for the figures you own; tap a figure and it hops
function openShop(tab) { sfx.tap(); G.state = 'shop'; G.shopFrom = 'title'; G.shopTab = tab || G.shopTab || 'menu'; }
function drawVitrine(t) {
  const own = FIG.filter(k => S.fig[k]), n = own.length, hp = G.figHop, hs = hp && G.t - hp.t < 1.6 ? (own.indexOf(hp.ch) >= 10 ? 1 : 0) : -1;   // the tapped figure's case shows its name for a moment
  [0, 1].forEach(side => {
    const x0 = side ? 12 : 800, y0 = 316, w = 148, h = 212, gx = x0 + 9, gy = y0 + 30, gw = w - 18, gh = h - 39;
    R(x0, y0, w, h, 12, '#8a5228', { lw: 3 });
    const hd = hs === side ? CH[hp.ch].n : side ? ar(n) + ' / ' + ar(FIG.length) : '🧸 الفاترينة'; T(hd, x0 + w / 2, y0 + 16, fit(hd, w - 16, 15, FD), '#ffe38a', FD, 'center', 3, '#3a1a08');
    const gp = RRp(gx, gy, gw, gh, 6); ctx.fillStyle = 'rgba(214,238,246,.9)'; ctx.fill(gp); ctx.lineWidth = 2; ctx.strokeStyle = '#5a3418'; ctx.stroke(gp);
    for (let r = 0; r < 3; r++) {
      const sy = gy + 55 + r * 57, cols = r ? 3 : 4, sp = cols === 4 ? 31 : 40; R(gx, sy, gw, 6, 2, '#c8945a', { lw: 1.6, hl: 0 });
      for (let c = 0; c < cols; c++) {
        const ch = own[side * 10 + (r ? 1 + r * 3 : 0) + c], cx = gx + gw / 2 + ((cols - 1) / 2 - c) * sp;
        E(cx, sy, 13, 4, ch ? '#e8c46a' : 'rgba(90,52,24,.15)', { lw: ch ? 1.6 : 0, ol: !!ch, hl: 0 });
        if (!ch) { T('؟', cx, sy - 18, 18, 'rgba(90,52,24,.3)', FD); if (G.state === 'title') btn(cx - sp / 2, sy - 50, sp, 54, () => openShop('fig')); continue; }
        const k = hp && hp.ch === ch ? (G.t - hp.t) / 0.45 : 1, up = k < 1 ? Math.sin(k * Math.PI) * 14 : 0;
        albPortrait(ch, cx, sy - 5 - up, 0.125, true);
        if (G.state === 'title') btn(cx - sp / 2, sy - 50, sp, 54, () => { G.figHop = { ch, t: G.t }; voice(ch, 1); burst(cx, sy - 30, 6, ['#ffd23f', '#ffffff'], 'star', 0.4); });
      }
    }
    ctx.save(); ctx.globalAlpha = 0.45; L([[gx + 30, gy + 4], [gx + 6, gy + 44]], 4, '#fff'); L([[gx + 44, gy + 4], [gx + 10, gy + 62]], 2, '#fff'); ctx.restore();
  });
  if (!n) { const p = RRp(816, 400, 116, 50, 10); ctx.fillStyle = 'rgba(255,251,232,.92)'; ctx.fill(p); T('اشتري الفيجرز', 874, 416, 14, '#5a3a20', FD); T('من السوق 🛒', 874, 436, 13, '#7a4a2a'); }
}
function drawDiff(t) {
  dim(0.75); panel(120, 60, 720, 420);
  T('اختار المستوى', 480, 108, 40, '#d7263d', FD);
  const keys = ['easy', 'med', 'hard'], chars = ['zarb', 'hafo', 'jab'];
  keys.forEach((k, i) => {
    const d = DIFFS[k], x = 700 - i * 220, y = 150, w = 200, h = 300, sel = S.diff === k;
    const p = RRp(x - w / 2, y, w, h, 18); ctx.fillStyle = sel ? '#fffbe8' : '#ffffff'; ctx.fill(p); ctx.lineWidth = sel ? 5 : 3; ctx.strokeStyle = sel ? d.c : '#e0cfae'; ctx.stroke(p);
    ctx.save(); ctx.beginPath(); ctx.rect(x - w / 2 + 6, y + 6, w - 12, 150); ctx.clip(); ctx.translate(x, y + 196); ctx.scale(0.6, 0.6); CH[chars[i]].d(i === 2 ? 2 : 1, t); ctx.restore();
    R(x - 70, y + 160, 140, 44, 14, d.c, { lw: 3 }); T(d.n, x, y + 183, 26, '#fff', FD, 'center', 4, shade(d.c, -0.6));
    T(d.d, x, y + 232, fit(d.d, w - 24, 15), '#3a1d0e');
    const hp = heartP(x, y + 270, 12); ctx.fillStyle = '#e8303a'; ctx.fill(hp); ctx.lineWidth = 2; ctx.strokeStyle = OLC; ctx.stroke(hp);
    T(k === 'easy' ? '∞' : k === 'med' ? 'صبر طويل' : 'صبر قصير', x + (k === 'easy' ? 0 : 0), y + 268 + (k === 'easy' ? 0 : 26), k === 'easy' ? 13 : 12, k === 'easy' ? '#fff' : '#7a4a2a');
    btn(x - w / 2, y, w, h, () => { S.diff = k; save(); sfx.tap(); burst(x, y + 100, 18, ['#ffd23f', '#ffffff', d.c], 'star', 0.6); setTimeout(() => newDay(), 250); });
  });
}
function drawIntro() {
  const own = owned(), k = pop(G.introT, 0.4), A = area();
  dim(0.7);
  ctx.save(); ctx.translate(480, 270); ctx.scale(k, k); ctx.translate(-480, -270);
  panel(160, 50, 640, 440);
  const EN = CHAL && CHAL.endless;
  R(350, 28, 260, 54, 16, EN ? '#5b3cc4' : CHAL ? '#e08a1e' : '#d7263d', { lw: 3.5 }); T(EN ? '♾ لا نهائي' : CHAL ? '🏆 تحدي اليوم' : 'اليوم ' + ar(S.day), 480, 56, 34, '#fff', FD, 'center', 5, EN ? '#2a1a5a' : CHAL ? '#5a2a00' : '#5a1010');
  const sub = '📍 ' + A.n + (A.pay > 1 ? ' (الأسعار +' + ar(Math.round((A.pay - 1) * 100)) + '٪)' : '') + (EN ? '' : '   •   الهدف: ' + ar(target(S.day)) + ' ج') + '   •   ' + DIFFS[S.diff].n;
  T(sub, 480, 100, fit(sub, 600, 16), '#3a1d0e');
  if (!EN) [1, 1.5, 2].forEach((m, i) => { star(390 + i * 90, 126, 12, '#ffd23f', '#a86a00'); T(ar(Math.round(target(S.day) * m)), 416 + i * 90, 127, 13, '#7a4a2a'); });
  const notes = [];
  if (G.legend) notes.push('🌟 يوم أسطوري! الرحمة الكونية جاية بطلبات كتير ورا بعض');
  if (G.sea === 'ram') notes.push('🌙 رمضان: هادي لحد المغرب وبعدين زحمة الفطار، والحلويات عند أبو حسيبة');
  if (G.sea === 'eid') notes.push('🎉 العيد: الكحك والكنافة عند أبو حسيبة، والبقشيش الضعف');
  if (G.rival) notes.push('🛒 سكرتاعوط فاتح عربية قصادك! اللي يستنى كتير هيروحله');
  if (G.wx) notes.push(G.wx === 'hot' ? '☀️ يوم حر: الناس عايزة ساقع وتلج' : '🌧 يوم مطر: الشاي بيكسّر');
  if (G.night) notes.push('🌙 سهرة لنص الليل: زباين غريبة بتدفع كتير، وطلباتها عند أبو حسيبة');
  if (G.qst) notes.push('📜 فيه حكاية مستنياك النهارده');
  if (G.noteR) notes.push('📒 النوتة: ' + [G.noteR.n ? ar(G.noteR.n) + ' دفعوا الضعف +' + ar(G.noteR.paid) + ' ج' : '', G.noteR.gone ? ar(G.noteR.gone) + ' هربوا 😒' : ''].filter(Boolean).join(' و'));
  if (!CHAL && S.day > 2 && S.rate >= 4.5 && notes.length < 2) notes.push('⭐ ريفيوهاتك حلوة: زباين أكتر النهارده');
  if (notes.length) { const nt = notes.join('   •   '); T(nt, 480, 150, fit(nt, 610, 15, FD), G.legend ? '#5b3cc4' : '#8a3a1a', FD); }
  const cw = Math.min(58, 610 / own.length), cs = cw / 58;
  own.forEach((p, i) => {
    const a = clamp((G.introT - 0.2 - i * 0.05) / 0.3, 0, 1), x = 480 + (own.length - 1) * cw / 2 - i * cw, y = 164;
    ctx.save(); ctx.globalAlpha = a; ctx.translate(x, y + (1 - easeOut(a)) * 16); ctx.scale(cs, cs);
    const cp = RRp(-26, 0, 52, 66, 10); ctx.fillStyle = '#ffffff'; ctx.fill(cp); ctx.lineWidth = 2; ctx.strokeStyle = PROD[p].rec ? '#2e9d4a' : '#e0cfae'; ctx.stroke(cp);
    prodIcon(p, 0, 46, 0.4); T(ar(PROD[p].price) + ' ج', 0, 57, 11, '#2e9d4a', FD);
    ctx.restore();
  });
  if (EN) {
    T('يوم مفتوح من غير وقت', 480, 268, 18, '#5b3cc4', FD);
    T('كل ما تعدّي الهدف الدنيا تسرع، ولو ٣ زباين مشيوا زعلانين اللعبة تخلص', 480, 298, fit('كل ما تعدّي الهدف الدنيا تسرع، ولو ٣ زباين مشيوا زعلانين اللعبة تخلص', 560, 15), '#3a1d0e');
    if (REAL.endBest) T('أحسن سكور ليك: ' + ar(REAL.endBest) + ' ج', 480, 334, 16, '#5b3cc4', FD);
  } else if (CHAL) {
    T('نفس الزباين لكل اللاعيبة النهارده', 480, 268, 18, '#2e7d32', FD);
    T('اعمل أعلى صافي في يوم واحد، وابعت السكور لصحابك يحاولوا يغلبوك', 480, 298, fit('اعمل أعلى صافي في يوم واحد، وابعت السكور لصحابك يحاولوا يغلبوك', 560, 15), '#3a1d0e');
    const b = REAL.chBest && REAL.chBest.d === CHAL.key ? REAL.chBest.s : 0; if (b) T('أحسن سكور ليك النهارده: ' + ar(b) + ' ج', 480, 334, 16, '#e08a1e', FD);
    if (CHAL.vs) T('🥊 هدفك تغلب ' + (CHAL.vs.n || 'صاحبك') + ': ' + ar(CHAL.vs.s) + ' ج', 480, 362, 17, '#c62828', FD);
  } else {
    T('🎯 مهمات النهارده', 480, 252, 17, '#2e7d32', FD);
    G.ms.forEach((m, i) => { const y = 278 + i * 27; ctx.fillStyle = '#ffffff'; ctx.fill(RRp(250, y - 11, 460, 23, 10)); T(mText(m), 540, y + 1, fit(mText(m), 330, 14), '#3a1d0e'); R(262, y - 9, 78, 19, 9, '#2e9d4a', { lw: 1.6, hl: 0, v: false }); T('+' + ar(m.r) + ' ج', 301, y + 1, 12, '#fff'); });
    const paid = Math.min(S.life, DEBT), f = paid / DEBT;
    T('دين أبو حسيبة لسكرتاعوط', 612, 371, 13, '#7a4a2a'); ctx.fillStyle = 'rgba(28,18,12,.75)'; ctx.fill(RRp(250, 364, 270, 14, 7));
    if (f > 0) { ctx.fillStyle = f >= 1 ? '#2e9d4a' : '#ff8a3d'; ctx.fill(RRp(252, 366, 266 * f, 10, 5)); }
    T(f >= 1 ? 'اتسدد! 🎉' : ar(paid) + ' / ' + ar(DEBT), 385, 371, 11, '#fff');
    const mk = Object.keys(G.mk || {}).filter(grpOn);
    if (mk.length) { const s = '🧺 سوق الجملة: ' + mk.map(g => grpName(g) + (G.mk[g] > RESTOCK ? ' غليت (' + ar(G.mk[g]) + ' ج للتعبئة)' : ' رخصت (' + ar(G.mk[g]) + ' ج)')).join(' • ') + ' • خزّن من السوق'; T(s, 480, 394, fit(s, 600, 13), '#8a3a1a'); }
  }
  ctx.restore();
  bigBtn(490, 410, 260, 60, EN ? 'يلا بينا!' : CHAL ? 'ابدأ التحدي!' : 'افتح العربية!', startPlay);
  if (CHAL) bigBtn(220, 416, 230, 50, 'رجوع', exitChallenge, '#8a5a3c', 22);
  else bigBtn(220, 416, 230, 50, '🛒 السوق', () => { G.state = 'shop'; G.shopFrom = 'intro'; }, '#2e7fb8', 22);
  if (G.tutQ) {   // played before: ask instead of forcing the tutorial again
    BT = BT.filter(b => b.id === 'hud'); dim(0.6); panel(250, 170, 460, 200);
    T('💡 تحب تتعلم طريقة اللعب تاني؟', 480, 220, 24, '#3a1d0e', FD); T('هنقدّم أول كام طلب سوا خطوة بخطوة', 480, 256, 15, '#7a4a2a');
    bigBtn(490, 290, 200, 54, 'أيوه، علّمني', () => { G.tutQ = false; }, '#2e7fb8', 22);
    bigBtn(270, 290, 200, 54, 'لأ، يلا نلعب', () => { G.tutQ = false; G.tut = null; S.tut = 1; save(); }, '#2e9d4a', 22);
  }
}
function upIcon(kind, x, y) {
  ctx.save(); ctx.translate(x, y);
  if (kind === 'price') { ctx.shadowColor = '#ff4fd8'; ctx.shadowBlur = 12; R(-26, -16, 52, 32, 6, '#2a1206'); T('رحمة', 0, 1, 15, '#ff8ae8', FD); }
  else if (kind === 'pat') { R(-14, -18, 28, 18, 4, '#2e9de0'); R(-16, -2, 32, 7, 3, '#2e9de0'); L([[-12, 5], [-14, 20]], 4, '#1f6a9a'); L([[12, 5], [14, 20]], 4, '#1f6a9a'); }
  else if (kind === 'store') { R(-24, -14, 48, 32, 3, '#c8945a', { lw: 2.6 }); L([[-24, 2], [24, 2]], 2, '#8a5a2a'); R(-6, -14, 12, 32, 0, '#e8d8a8', { ol: false }); T('+', 16, -18, 18, '#2e9d4a', FD, 'center', 3); }
  else if (kind === 'ah') { R(-14, -12, 28, 30, 4, '#f4f2ec', { lw: 2.4 }); R(-12, -6, 24, 8, 2, '#6a3a18', { ol: false }); ctx.beginPath(); ctx.arc(16, 4, 7, -1.2, 1.2); ctx.lineWidth = 3; ctx.strokeStyle = OLC; ctx.stroke(); for (let i = 0; i < 2; i++) Q(-5 + i * 9, -16, -9 + i * 9, -24, -4 + i * 9, -30, 2, '#9aa4ac'); }
  else { R(-20, -18, 40, 36, 8, '#3f7a7e'); E(0, -4, 10, 10, '#f4c430', { lw: 2 }); T('⚡', 0, -4, 14, '#fff'); }
  ctx.restore();
}
function helpIcon(k, x, y, t) {
  ctx.save(); ctx.translate(x, y);
  if (k === 'autoAH') { ctx.scale(0.24, 0.24); ctx.translate(0, 120); drawAH(t, 'walk', 1); }
  else if (k === 'zarb') { ctx.scale(0.24, 0.24); ctx.translate(0, 20); CH.zarb.d(1, t); T('💤', 80, -150, 40, '#fff'); }
  else if (k === 'tips') { R(-18, -22, 36, 42, 10, '#cfeaf2', { lw: 2.4, hl: 0.5 }); R(-14, -28, 28, 8, 3, '#c62828', { lw: 2 }); for (let i = 0; i < 4; i++) coinIcon(-8 + (i % 2) * 14, 10 - Math.floor(i / 2) * 12, 6); }
  else { const p = { autoTap: 'aaoJuice', autoTea: 'zoolTea', autoFry: 'jabFries' }[k]; prod(p, -6, 26, 0.6, t); ctx.save(); ctx.translate(20, -12); ctx.rotate(t * 2); for (let i = 0; i < 6; i++) { ctx.rotate(Math.PI / 3); R(-3, -13, 6, 7, 1, '#9aa4ac', { lw: 1.4, hl: 0 }); } E(0, 0, 9, 9, '#9aa4ac', { lw: 2 }); E(0, 0, 3, 3, '#3a3a3a', { ol: false }); ctx.restore(); }
  ctx.restore();
}
function cassette(x, y, c, s = 1, spin = false) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  R(-40, -26, 80, 52, 6, c, { lw: 2.6, v: true }); R(-32, -20, 64, 14, 3, '#fff6e6', { lw: 1.6, hl: 0 }); for (let i = 0; i < 3; i++) L([[-26, -16 + i * 4], [26, -16 + i * 4]], 0.8, '#c8b898');
  R(-22, -2, 44, 16, 7, '#2a2a2a', { lw: 1.6, hl: 0 });
  for (const sx of [-12, 12]) { E(sx, 6, 6, 6, '#f4f2ec', { lw: 1.4, hl: 0 }); for (let k = 0; k < 3; k++) { const a = (spin ? G.t * 5 : 0) + k * 2.1; L([[sx, 6], [sx + Math.cos(a) * 5, 6 + Math.sin(a) * 5]], 1.4, '#3a3a3a'); } }
  PL([[-26, 26], [-20, 16], [20, 16], [26, 26]], shade(c, -0.25), { lw: 1.8, hl: 0, v: false });
  ctx.restore();
}
function shopDeals() {
  let n = 0;
  for (const [p, c] of MENU_SHOP) if (!S.menu[p] && S.money >= c) n++;
  for (const u of UPS) if (S.up[u.k] < 5 && S.money >= u.c[S.up[u.k]]) n++;
  for (const h of HELP) if (!S.help[h.k] && (!h.req || has(h.req)) && S.money >= h.c) n++;
  for (const k in TAPES) if (!S.tapes[k] && !TAPES[k].lock && S.money >= TAPES[k].cost) n++;
  for (const [x, c] of EXTRA_SHOP) if (!S.extras[x] && S.money >= c) n++;
  if (!S.meal && S.money >= MEAL_COST) n++;
  GROW.forEach((g, i) => { if (S.grow === i && S.money >= g.c) n++; });
  return n;
}
// character figures: each one stands on the cart's shelf, and its keychains are either sold to that character or given away free
const figCost = ch => 120 + 15 * FIG.indexOf(ch), keyPrice = () => 10 + Math.floor(S.day / 3);
function drawFigs(t) {
  FIG.forEach((ch, i) => {
    const col = i % 8, row = Math.floor(i / 8), x = 806 - col * 106, y = 122 + row * 104, w = 100, h = 100, cx = x + w / 2, met = !!S.album[ch], m = S.fig[ch];
    const p = RRp(x, y, w, h, 12); ctx.fillStyle = m ? '#fffbe8' : met ? '#ffffff' : '#ece0c8'; ctx.fill(p); ctx.lineWidth = m ? 3.5 : 2.5; ctx.strokeStyle = m ? '#d4a017' : '#e0cfae'; ctx.stroke(p);
    if (m) glow(cx, y + 38, 40, '#fff1a0', 0.7);
    E(cx, y + 61, 32, 6, m ? '#e8c46a' : '#d8ccb4', { lw: 2.2 }); L([[cx, y + 6], [cx, y + 11]], 2, '#9aa4ac'); E(cx, y + 6, 4, 4, 'rgba(0,0,0,0)', { lw: 1.8 });
    ctx.save(); if (met && !m) ctx.globalAlpha = 0.55; ctx.beginPath(); ctx.rect(x + 3, y + 3, w - 6, 61); ctx.clip(); albPortrait(ch, cx, y + 59, 0.21, met); ctx.restore();
    T(met ? CH[ch].n : '؟؟؟', cx, y + 75, fit(met ? CH[ch].n : '؟؟؟', w - 10, 12, FD), '#3a1d0e', FD);
    const by = y + 81;
    if (!met) T('🔒 قابله الأول', cx, by + 9, 11, '#9a6a4a');
    else if (!m) { const c = figCost(ch), can = S.money >= c; ctx.save(); ctx.globalAlpha = can ? 1 : 0.45; const bp = RRp(cx - 42, by, 84, 18, 9); ctx.fillStyle = can ? '#2e9d4a' : '#888'; ctx.fill(bp); ctx.lineWidth = 2.2; ctx.strokeStyle = OLC; ctx.stroke(bp); coinIcon(cx + 26, by + 9, 6); T(ar(c), cx - 6, by + 10, 13, '#fff', FD); ctx.restore();
      if (can) btn(x, y, w, h, () => buy(c, () => { S.fig[ch] = 1; bgDirty = true; toast('🧸 فيجر ' + CH[ch].n + ' اتحط على رف العربية!', '#ffe38a', 2.6); }, cx, by)); }
    else { const bp = RRp(x + 6, by, w - 12, 18, 9); ctx.fillStyle = m === 1 ? '#ffe9b8' : '#ffd0ea'; ctx.fill(bp); ctx.lineWidth = 2.2; ctx.strokeStyle = OLC; ctx.stroke(bp); const lb = m === 1 ? '💰 بيبيع ميداليات' : '🎁 بيوزّع ببلاش'; T(lb, cx, by + 10, fit(lb, w - 20, 11), '#5a3a20');
      btn(x, y, w, h, () => { S.fig[ch] = m === 1 ? 2 : 1; save(); sfx.tap(); toast(m === 1 ? '🎁 هتوزّع ميداليات ' + CH[ch].n + ' ببلاش، فهيجي أكتر ويحبك أسرع' : '💰 هتبيع ميداليات ' + CH[ch].n + ' بـ' + ar(keyPrice()) + ' ج للزباين', m === 1 ? '#ffd0ea' : '#ffe9b8', 2.8); }); }
  });
  const n = FIG.filter(k => S.fig[k]).length, hs = 'عندك ' + ar(n) + ' من ' + ar(FIG.length) + ' فيجر • بيتحطوا على رف العربية، ودوس على الفيجر تختار تبيع ميدالياته أو توزعها ببلاش';
  T(hs, 480, 440, fit(hs, 840, 13), '#7a4a2a');
}
function buy(cost, fn, x, y) { S.money -= cost; fn(); save(); sfx.cash(); sfx.combo(4); burst(x, y, 22, ['#ffd23f', '#9be37a', '#fff'], 'star', 0.7); }
// one shop card; o = { art(x,y), n, d, st: buy|own|max|lock|sel|use, cost, lv, fn, note }
function shopCard(i, o, cols = 4) {
  const c5 = cols === 5, col = i % cols, row = Math.floor(i / cols), w = c5 ? 164 : 200, x = (c5 ? 742 : 698) - col * (c5 ? 172 : 212), y = 128 + row * 160, h = 150, cx = x + w / 2;
  const p = RRp(x, y, w, h, 14); ctx.fillStyle = o.st === 'own' || o.st === 'sel' || o.st === 'max' ? '#f2fbe8' : '#ffffff'; ctx.fill(p); ctx.lineWidth = 3; ctx.strokeStyle = o.st === 'sel' ? '#2e9d4a' : '#e0cfae'; ctx.stroke(p);
  ctx.save(); if (o.st === 'lock') ctx.globalAlpha = 0.4; o.art(cx, y + 50); ctx.restore();
  if (o.lv != null) for (let q = 0; q < 5; q++) star(x + w - 16 - q * 15, y + 16, 6, q < o.lv ? '#ffb347' : '#e8dcc4', q < o.lv ? '#a86a00' : '#c8b898');
  T(o.n, cx, y + 94, fit(o.n, w - 16, 16, FD), '#3a1d0e', FD);
  T(o.d, cx, y + 113, fit(o.d, w - 16, 12), '#7a4a2a');
  const by = y + 122;
  if (o.st === 'buy') {
    const can = S.money >= o.cost;
    ctx.save(); ctx.globalAlpha = can ? 1 : 0.45; const bp = RRp(cx - 56, by, 112, 24, 12); ctx.fillStyle = can ? '#2e9d4a' : '#888'; ctx.fill(bp); ctx.lineWidth = 2.4; ctx.strokeStyle = OLC; ctx.stroke(bp); coinIcon(cx + 34, by + 12, 8); T(ar(o.cost), cx - 6, by + 13, 16, '#fff', FD); ctx.restore();
    if (can) btn(x, y, w, h, () => buy(o.cost, o.fn, cx, by));
  } else if (o.st === 'use') { const bp = RRp(cx - 48, by, 96, 24, 12); ctx.fillStyle = '#2e7fb8'; ctx.fill(bp); ctx.lineWidth = 2.4; ctx.strokeStyle = OLC; ctx.stroke(bp); T(o.btn || 'شغّل', cx, by + 13, 15, '#fff', FD); btn(x, y, w, h, () => { sfx.tap(); o.fn(); }); }
  else T({ own: 'عندك ✓', max: 'أقصى مستوى ✓', full: 'المخزن مليان ✓', sel: o.selTxt || 'شغال دلوقتي ♪', lock: '🔒 ' + (o.note || '') }[o.st], cx, by + 12, fit(o.note || 'xxxxxxxx', w - 20, 14), o.st === 'lock' ? '#9a6a4a' : '#2e7d32');
  if (o.st === 'sel' && o.off) btn(x, y, w, h, () => { sfx.tap(); o.off(); save(); });
}
const MEAL_COST = 280;
function mkIcon(g, x, y) {   // a wooden crate with what it holds on top
  prodIcon({ bread: 'wbr', spit: 'hafoWrap', gfal: 'hankSand', gtray: 'sakrFal', fryer: 'jabFries', kettle: 'zoolTea', tap: 'aaoJuice', freezer: 'shawqyIce' }[g], x, y + 8, 0.6);
  R(x - 34, y + 4, 68, 30, 4, '#c8945a', { lw: 2.6 }); L([[x - 34, y + 19], [x + 34, y + 19]], 2, '#8a5a2a'); for (const s of [-1, 1]) L([[x + s * 22, y + 4], [x + s * 22, y + 34]], 2, '#8a5a2a');
}
const BRC = [2500, 2000, 2800, 3800, 5200], BRI = [0, 80, 130, 190, 260, 350];   // branch level costs, and what it earns a day
function branchIcon(x, y, t) {   // a second little cart with a "٢" sign
  const [a1, a2] = awCols();
  R(x - 34, y - 8, 68, 30, 6, '#e8dcc8', { lw: 2.6 }); for (let i = 0; i < 4; i++) { ctx.fillStyle = i % 2 ? a2 : a1; ctx.fillRect(x - 38 + i * 19, y - 24, 19, 14); } L([[x - 38, y - 24], [x + 38, y - 24]], 2.4); L([[x - 38, y - 10], [x + 38, y - 10]], 2.4);
  R(x - 12, y - 5, 24, 20, 4, '#ffd36a', { lw: 2 }); T('٢', x, y + 6, 17, '#c62828', FD);
  E(x - 21, y + 25, 7, 7, '#3a3a44', { lw: 2.2 }); E(x + 21, y + 25, 7, 7, '#3a3a44', { lw: 2.2 });
}
function growIcon(lv, x, y, t) {   // a little kiosk, or a shop front with a sign and bulbs
  const [a1, a2] = awCols();
  if (lv === 1) { R(x - 30, y - 18, 60, 48, 4, '#8a5228', { lw: 2.6 }); R(x - 22, y - 8, 44, 22, 3, '#ffd36a', { lw: 2 }); for (let i = 0; i < 4; i++) { ctx.fillStyle = i % 2 ? a2 : a1; ctx.fillRect(x - 36 + i * 18, y - 32, 18, 14); } L([[x - 36, y - 32], [x + 36, y - 32]], 2.4); L([[x - 36, y - 18], [x + 36, y - 18]], 2.4); R(x - 30, y + 16, 60, 8, 2, '#c9d1d6', { lw: 2 }); }
  else { R(x - 50, y - 26, 100, 58, 4, '#e8dcc8', { lw: 2.6 }); R(x - 46, y - 36, 92, 18, 3, a1, { lw: 2.4 }); T('مطعم', x, y - 27, 12, '#fff', FD, 'center', 2); R(x - 40, y - 8, 38, 32, 2, '#9fd8ff', { lw: 2 }); R(x + 8, y - 8, 30, 40, 2, '#8a5228', { lw: 2 }); for (let i = 0; i < 5; i++) dot(x - 40 + i * 20, y - 14, 2.6, (i + Math.floor(t * 3)) % 2 ? '#ffd23f' : '#fff6c8'); }
}
function mealIcon(x, y, t) {
  prod('jabFries', x - 20, y + 4, 0.55, t); prod('aaoJuice', x + 22, y + 6, 0.55, t);
  PL([[x - 30, y - 8], [x + 30, y - 8], [x + 26, y + 32], [x - 26, y + 32]], '#d9a866', { lw: 2.6, hl: 0.2 });
  L([[x - 30, y - 8], [x - 26, y - 2], [x + 26, y - 2], [x + 30, y - 8]], 1.6, '#a87a3a'); T('وجبة', x, y + 16, 14, '#7a4a1a', FD);
}
// little pictures for the cart-cosmetics cards
function awIcon(c, x, y) { for (let i = 0; i < 4; i++) { ctx.fillStyle = i % 2 ? c[1] : c[0]; ctx.fillRect(x - 48 + i * 24, y - 30, 24, 22); ctx.beginPath(); ctx.arc(x - 36 + i * 24, y - 8, 12, 0, Math.PI); ctx.fill(); ctx.lineWidth = 2; ctx.strokeStyle = OLC; ctx.stroke(); } L([[x - 48, y - 30], [x + 48, y - 30]], 2.4); L([[x - 48, y - 8], [x + 48, y - 8]], 2); R(x - 44, y + 4, 88, 26, 6, '#c9d1d6', { lw: 2.4, hl: 0.3 }); }
function lightsIcon(x, y, t) { Q(x - 56, y - 14, x, y + 14, x + 56, y - 14, 1.6, '#2a1a10'); for (let i = 0; i < 7; i++) { const k = (i + 0.5) / 7, bx = x - 56 + 112 * k, by = y - 14 + 28 * k * (1 - k) * 2, c = ['#ff5a5a', '#ffd23f', '#6be3ff', '#9be37a', '#ff8ae8'][i % 5], on = (i + Math.floor(t * 3)) % 3 !== 0; if (on) glow(bx, by + 8, 14, c, 0.7); E(bx, by + 8, 5, 6.5, on ? c : shade(c, -0.5), { lw: 1.6, hl: 0.4, v: false }); } }
function neonIcon(x, y) { R(x - 58, y - 30, 116, 58, 8, '#1a1424', { lw: 2.6, hl: 0 }); ctx.save(); ctx.shadowColor = '#ff3b8a'; ctx.shadowBlur = 10; T('شاورما', x, y - 12, 18, '#ffd0ea', FD, 'center', 2, '#ff3b8a'); ctx.shadowColor = '#4ae0ff'; const n = S.name || 'اسمك'; T(n, x, y + 12, fit(n, 100, 16, FD), '#d8f8ff', FD, 'center', 2, '#2ab0e0'); ctx.restore(); }
function goldIcon(x, y, t) { awIcon(['#c9961a', '#2a1a0a'], x, y); ctx.save(); ctx.globalAlpha = 0.8; R(x - 44, y + 4, 88, 26, 6, '#ffd86b', { lw: 2.4, hl: 0.5 }); ctx.restore(); for (let i = 0; i < 3; i++) star(x - 30 + i * 30, y - 34 + Math.sin(t * 4 + i) * 3, 6, '#fff6c8', '#b8860b'); }
function drawShop(t) {
  dim(0.72); panel(40, 60, 880, 470);
  R(370, 34, 220, 50, 16, '#2e7fb8', { lw: 3.5 }); T('🛒 السوق', 480, 60, 30, '#fff', FD, 'center', 5, '#123a5a');
  const tabs = [['menu', 'المنيو'], ['up', 'الترقيات'], ['help', 'المساعدين'], ['mk', 'الجملة'], ['tapes', 'الشرايط'], ['cos', 'زينة العربية'], ['fig', '🧸 الفيجرز']];
  tabs.forEach(([k, n], i) => {
    const x = 784 - i * 120, sel = G.shopTab === k, p = RRp(x, 90, 114, 32, 12);
    ctx.fillStyle = sel ? '#d7263d' : '#f0e2c4'; ctx.fill(p); ctx.lineWidth = 2.6; ctx.strokeStyle = OLC; ctx.stroke(p); T(n, x + 57, 107, fit(n, 104, 16, FD), sel ? '#fff' : '#5a3a20', FD);
    btn(x, 88, 114, 36, () => { G.shopTab = k; sfx.tap(); });
  });
  const tab = G.shopTab || 'menu';
  if (tab === 'fig') drawFigs(t);
  if (tab === 'menu') MENU_SHOP.forEach(([p, c], i) => { const ask = !S.menu[p] && G.missed && G.missed[p]; shopCard(i, { art: (x, y) => { glow(x, y, 44, '#fff1a0', 0.6); prodIcon(p, x, y + 28, 0.95); if (ask) { R(x - 96, y - 44, 64, 20, 10, '#c62828', { lw: 1.8, v: false }); T('اتطلب ' + ar(ask) + '×', x - 64, y - 33, 11, '#fff'); } }, n: PROD[p].n, d: ar(PROD[p].price) + ' ج • ' + CH[PROD[p].ch].n + ' بيدفع الضعف', st: S.menu[p] ? 'own' : 'buy', cost: c, fn: () => { S.menu[p] = 1; } }, 5); });
  if (tab === 'menu') EXTRA_SHOP.forEach(([x, c], j) => { const E = EXTRAS[x]; shopCard(MENU_SHOP.length + j, { art: (ax, ay) => { glow(ax, ay, 44, '#e0f4ff', 0.6); prodIcon(E.on[0] + '|' + x, ax, ay + 28, 0.95); }, n: 'إضافة ' + E.n, d: '+' + ar(E.price) + ' ج على ' + E.d, st: S.extras[x] ? 'own' : 'buy', cost: c, fn: () => { S.extras[x] = 1; } }, 5); });
  if (tab === 'menu') shopCard(MENU_SHOP.length + EXTRA_SHOP.length, { art: (x, y) => mealIcon(x, y, t), n: 'وجبات كومبو', d: 'ساندوتش وجنب ومشروب • +٢٥٪', st: S.meal ? 'own' : 'buy', cost: MEAL_COST, fn: () => { S.meal = 1; } }, 5);
  if (tab === 'up') UPS.forEach((u, i) => { const lv = S.up[u.k]; shopCard(i, { art: (x, y) => upIcon(u.k, x, y), n: u.n, d: u.d, lv, st: lv >= 5 ? 'max' : 'buy', cost: u.c[lv], fn: () => { S.up[u.k]++; } }); });
  if (tab === 'up') shopCard(UPS.length + GROW.length, { art: (x, y) => branchIcon(x, y, t), n: 'الفرع التاني', d: S.br >= 5 ? 'بيكسب حوالي ' + ar(BRI[5]) + ' ج كل يوم' : S.br ? 'بيكسب ' + ar(BRI[S.br]) + ' ← ' + ar(BRI[S.br + 1]) + ' ج في اليوم' : 'بيكسبلك ' + ar(BRI[1]) + ' ج كل يوم لوحده', lv: S.fin ? S.br : null, st: !S.fin ? 'lock' : S.br >= 5 ? 'max' : 'buy', note: 'سدّد دين أبو حسيبة', cost: BRC[S.br],
    fn: () => { S.br++; toast(S.br === 1 ? '🏪 الفرع التاني اتفتح! الجعبوق ماسكه' : '🏪 الفرع كبر! بقى بيكسب ' + ar(BRI[S.br]) + ' ج في اليوم', '#9be37a', 2.6); } });
  if (tab === 'up') GROW.forEach((g, i) => shopCard(UPS.length + i, { art: (x, y) => growIcon(i + 1, x, y, t), n: g.n, d: g.d, st: S.grow > i ? 'own' : S.grow < i ? 'lock' : 'buy', note: 'محتاج الكشك الأول', cost: g.c, fn: () => { S.grow = i + 1; setHolds(); toast(i ? '🏪 مبروك المحل الجديد!' : '🏠 العربية بقت كشك!', '#9be37a'); } }));
  if (tab === 'mk') { const mk = mkFor(S.day); MKG.filter(grpOn).forEach((g, i) => { const pr = mk[g] ?? RESTOCK, n = S.wh[g] || 0, q = Math.min(CRATE, WH_MAX - n);
    shopCard(i, { art: (x, y) => mkIcon(g, x, y), n: grpName(g) + (pr > RESTOCK ? ' 🔺 غالي' : pr < RESTOCK ? ' 🔻 رخيص' : ''), d: 'التعبئة ' + ar(pr) + ' ج • في المخزن ' + ar(n) + ' من ' + ar(WH_MAX), st: q <= 0 ? 'full' : 'buy', cost: pr * q, fn: () => { S.wh[g] = n + q; toast('📦 خزّنت ' + (q === 1 ? 'تعبئة واحدة' : cnt(q, 'تعبئة', 'تعبئات', 'تعبئتين')) + ' ' + grpName(g) + '، أبو حسيبة هياخد منهم ببلاش', '#9be3ff'); } }); }); }
  if (tab === 'help') HELP.forEach((h, i) => shopCard(i, { art: (x, y) => helpIcon(h.k, x, y, t), n: h.n, d: h.d, st: S.help[h.k] ? 'own' : h.req && !has(h.req) ? 'lock' : 'buy', note: h.req ? 'محتاج ' + PROD[h.req].n : '', cost: h.c, fn: () => { S.help[h.k] = 1; } }));
  if (tab === 'tapes') Object.keys(TAPES).forEach((k, i) => { const tp = TAPES[k]; shopCard(i, { art: (x, y) => cassette(x, y, tp.c, 0.9, S.tape === k), n: tp.n, d: tp.d, st: S.tape === k ? 'sel' : S.tapes[k] ? 'use' : tp.lock ? 'lock' : 'buy', note: 'كمّل الألبوم', cost: tp.cost, fn: () => { S.tapes[k] = 1; S.tape = k; save(); } }); });
  if (tab === 'cos') {
    const cards = Object.keys(AWN).map(k => ({ art: (x, y) => awIcon(AWN[k].c, x, y), n: AWN[k].n, d: 'لون التندة اللي فوق العربية', st: S.cos.aw === k && !S.cos.gold ? 'sel' : S.cosOwn[k] ? 'use' : 'buy', selTxt: 'متركبة ✓', btn: 'ركّب', cost: AWN[k].cost, fn: () => { S.cosOwn[k] = 1; S.cos.aw = k; S.cos.gold = 0; save(); } }));
    cards.push({ art: (x, y) => lightsIcon(x, y, t), n: 'لمبات زينة', d: 'بتنوّر تحت التندة', st: S.cosOwn.lights ? (S.cos.lights ? 'sel' : 'use') : 'buy', selTxt: 'منوّرة ✓ (دوس تطفيها)', btn: 'نوّر', cost: 100, fn: () => { S.cosOwn.lights = 1; S.cos.lights = 1; save(); }, off: () => { S.cos.lights = 0; } });
    cards.push({ art: neonIcon, n: 'يافطة نيون باسمك', d: S.name ? 'شاورما ' + S.name : 'اسمك على حيطة العربية', st: S.cosOwn.neon ? 'use' : 'buy', btn: 'غيّر الاسم', cost: 120, fn: () => { S.cosOwn.neon = 1; S.cos.neon = 1; save(); askName(); } });
    cards.push({ art: (x, y) => goldIcon(x, y, t), n: 'العربية الدهب', d: 'جايزة الألبوم الكامل', st: !S.cosOwn.gold ? 'lock' : S.cos.gold ? 'sel' : 'use', note: 'كمّل الألبوم', selTxt: 'متركبة ✓ (دوس تشيلها)', btn: 'ركّب', fn: () => { S.cos.gold = 1; save(); }, off: () => { S.cos.gold = 0; } });
    cards.forEach((o, i) => shopCard(i, o));
  }
  bigBtn(240, 452, 200, 48, 'رجوع', () => { G.state = G.shopFrom || 'intro'; }, '#8a5a3c', 22);
  bigBtn(500, 449, 260, 52, 'ابدأ اليوم ' + ar(S.day), () => { if (G.shopFrom !== 'intro') { saved = null; if (!S.diff) { G.state = 'diff'; return; } newDay(); if (G.state !== 'intro' || G.tutQ) return; } startPlay(); }, '#e8304a', 24);
}
function drawEnd() {
  if (CHAL) return drawChalEnd();
  if (G.endPh === 'rev') return drawReviews();
  const y = 30, h = 492; G.endY = y; const d = G.dayDone || S.day;
  dim(0.72);
  ctx.save(); ctx.translate(0, (1 - easeBack(clamp(G.endT / 0.55, 0, 1))) * -560);
  panel(150, y, 660, h);
  const tg = target(d), ok = G.stars > 0, net = G.earned - G.spent;
  { const hs = pop(Math.max(0, G.endT - 0.35), 0.3); ctx.save(); ctx.translate(480, y + 8); ctx.scale(hs, hs); ctx.translate(-480, -(y + 8));
    R(350, y - 18, 260, 52, 16, ok ? '#2e9d4a' : '#c62828', { lw: 3.5 }); T(ok ? 'يوم ' + ar(d) + ' عدّى!' : 'يوم صعب!', 480, y + 8, 30, '#fff', FD, 'center', 5, ok ? '#0f4a20' : '#5a1010'); ctx.restore(); }
  for (let i = 0; i < 3; i++) { const at = 0.9 + i * 0.5, got = i < G.stars && G.endT >= at, s = got ? pop(G.endT - at, 0.35) : 1; ctx.save(); ctx.translate(380 + i * 100, y + 76 - (i === 1 ? 10 : 0)); ctx.scale(s, s); star(0, 0, i === 1 ? 34 : 28, got ? '#ffd23f' : '#e0d2b8', got ? '#a86a00' : '#c8b898'); ctx.restore(); }
  const cf = clamp((G.endT - 0.6) / 1.4, 0, 1), netN = Math.round(Math.max(0, net) * easeOut(cf)), cz = cf >= 1 ? 1 + 0.25 * clamp(1 - (G.endT - 2) / 0.3, 0, 1) : 1;
  ctx.save(); ctx.translate(480, y + 130); ctx.scale(cz, cz); T('الصافي ' + ar(netN) + ' ج', 0, 0, 28, cf >= 1 && ok ? '#2e7d32' : '#3a1d0e', FD); ctx.restore();
  ctx.globalAlpha = clamp((G.endT - 2) / 0.3, 0, 1); T(ok ? 'الرحمة راضية عنك 🎉' : 'الهدف كان ' + ar(tg) + ' ج، جرب تسرّع شوية', 480, y + 158, 15, ok ? '#2e7d32' : '#c62828'); ctx.globalAlpha = 1;
  [['مبسوطين', G.happy, '#2e9d4a'], ['تحفة', G.perfect, '#d4a017'], ['أعلى كومبو', G.bestCombo, '#ff6a2a'], ['زعلانين', G.angry, '#c62828']].forEach(([n, v, c], i) => { const x = 660 - i * 120; const ts = pop(Math.max(0, G.endT - 2.1 - i * 0.12), 0.3); if (ts <= 0) return; ctx.save(); ctx.translate(x, y + 201); ctx.scale(ts, ts); ctx.translate(-x, -(y + 201)); const p = RRp(x - 52, y + 176, 104, 50, 12); ctx.fillStyle = '#fff'; ctx.fill(p); T(ar(v), x, y + 194, 20, c, FD); T(n, x, y + 214, 12, '#7a4a2a'); ctx.restore(); });
  ctx.globalAlpha = clamp((G.endT - 2.6) / 0.35, 0, 1);
  const lp = RRp(230, y + 240, 500, 40, 12); ctx.fillStyle = '#fff'; ctx.fill(lp);
  T('المبيعات ' + (G.earned < 0 ? '' : '+') + ar(G.earned) + ' ج', 630, y + 261, 15, '#2e7d32'); T('أبو حسيبة -' + ar(G.spent) + ' ج', 330, y + 261, 15, '#c62828');
  if (G.bonus) T('🎯 مهمات +' + ar(G.bonus) + ' ج', 480, y + 261, 15, '#8a4ad8');
  if (G.brI) T('🏪 الفرع +' + ar(G.brI) + ' ج', 705, y + 313, 17, '#2e7d32', FD); const mt = 'معاك ' + ar(S.money) + ' ج'; ctx.font = '22px ' + FD; coinIcon(ENG ? 488 + ctx.measureText(tr(mt)).width / 2 : 560, y + 312, 14); T(mt, 470, y + 313, 22, '#3a1d0e', FD);
  const deals = shopDeals(), ms = Object.keys(G.missed || {}).sort((a, b) => G.missed[b] - G.missed[a]);
  let ly = y + 346;
  if (G.rival) { T(G.rivalWin ? '🛒 غلبت سكرتاعوط! +' + ar(G.rivalB) + ' ج' : '🛒 سكرتاعوط باع ' + ar(Math.round(G.rival.e)) + ' ج وغلبك المرة دي', 480, ly, 17, G.rivalWin ? '#2e7d32' : '#c62828', FD); ly += 24; }
  if (ms.length) { const top = ms[0], lost = ms.reduce((s, p) => s + G.missed[p] * PROD[p].price * 2, 0); T((G.missed[top] === 1 ? 'زبون سأل على' : cnt(G.missed[top], 'زبون سألوا على', 'زباين سألوا على', 'زبونين سألوا على')) + ' ' + PROD[top].n + (ms.length > 1 ? ' وحاجات تانية' : ''), 480, ly, fit('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', 560, 15), '#c62828'); T('كان ممكن تكسب ' + ar(lost) + ' ج زيادة لو في المنيو 🛒', 480, ly + 22, 14, '#2e7fb8'); }
  else T(deals ? 'تقدر تشتري ' + (deals === 1 ? 'حاجة واحدة من السوق 🛒' : cnt(deals, 'حاجة من السوق 🛒', 'حاجات من السوق 🛒', 'حاجتين من السوق 🛒')) : 'اجمع فلوس أكتر عشان تفتح حاجات جديدة', 480, ly, 15, deals ? '#2e7fb8' : '#9a6a4a');
  ctx.restore();
  const bk = clamp((G.endT - 2.9) / 0.3, 0, 1);
  if (bk <= 0) btn(0, 0, W, H, () => { G.endT = 2.9; });   // a tap skips the entrance
  else { ctx.save(); ctx.globalAlpha = bk; ctx.translate(0, (1 - easeOut(bk)) * 40);
  bigBtn(514, y + h - 78, 270, 54, ok ? 'اليوم ' + ar(S.day) : 'جرّب تاني', () => newDay(), '#e8304a', 24);
  bigBtn(176, y + h - 76, 140, 50, '🏠 الرئيسية', goHome, '#8a5a3c', 20);
  bigBtn(330, y + h - 76, 170, 50, '🛒 السوق', () => { G.state = 'shop'; G.shopFrom = 'end'; G.shopTab = 'menu'; }, deals ? '#2e7fb8' : '#6a8aa8', 22);
  if (G.posts && G.posts.length) { const p = RRp(172, 44, 150, 52, 12); ctx.fillStyle = '#3b5998'; ctx.fill(p); ctx.lineWidth = 2.6; ctx.strokeStyle = OLC; ctx.stroke(p); T('📱 الريفيوهات', 247, 61, 15, '#fff', FD); T('⭐ ' + ar(G.rate) + ' من ٥', 247, 83, 13, '#ffe38a'); btn(172, 44, 150, 52, () => { G.revOpen = 1; sfx.tap(); }); }
  if (G.moment) { const p = RRp(638, 44, 150, 52, 12); ctx.fillStyle = '#ff8a2a'; ctx.fill(p); ctx.lineWidth = 2.6; ctx.strokeStyle = OLC; ctx.stroke(p); T('📸 لقطة اليوم', 713, 61, 15, '#fff', FD, 'center', 4, '#7a2a00'); T(G.moment.big, 713, 83, fit(G.moment.big, 136, 13), '#fff3d6'); btn(638, 44, 150, 52, () => openSnap()); }
  ctx.restore(); }
  if (G.revOpen) drawReviews();
  if (G.snapOpen) drawSnap();
}
function drawPause() {
  dim(0.75); panel(CHAL ? 300 : 210, 80, 360, 380);
  if (!CHAL) { ctx.save(); ctx.translate(-90, 0); }
  T('استراحة', 480, 132, 42, '#d7263d', FD);
  bigBtn(340, 170, 280, 60, 'كمّل', () => { G.paused = false; }, '#2e9d4a', 26, 'pause');
  bigBtn(340, 252, 280, 52, 'الإعدادات', () => { OVL = 'set'; }, '#2e7fb8', 22, 'pause');
  if (!CHAL) ctx.restore();
  const ox = CHAL ? 0 : -90;
  BT.filter(b => b.id === 'pause').forEach(b => b.x += ox);
  if (!CHAL && G.ms.length) missionsPanel(590, 80, 330, 380);
  bigBtn(340 + ox, 326, 280, 52, 'الشاشة الرئيسية', () => { if (CHAL) { exitChallenge(); return; } S.money = Math.max(0, S.money - G.earned - G.bonus + G.spent); S.life = Math.max(0, S.life - G.earned - G.bonus); save(); saved = S; G = { state: 'title', t: G.t, parts: [], pops: [], coins: [], walkers: G.walkers, walkT: 1 }; dispMoney = S.money; }, '#8a5a3c', 20, 'pause');
}
function missionsPanel(x, y, w, h) {
  panel(x, y, w, h); T('🎯 مهمات النهارده', x + w / 2, y + 44, 24, '#2e7d32', FD);
  G.ms.forEach((m, i) => {
    const yy = y + 96 + i * 74, pr = Math.min(mProg(m), m.n), p = RRp(x + 22, yy - 26, w - 44, 60, 12); ctx.fillStyle = m.done ? '#e6f6dc' : '#ffffff'; ctx.fill(p);
    T(mText(m), x + w / 2, yy - 6, fit(mText(m), w - 70, 15), '#3a1d0e');
    T(m.done ? '✓ خلصت  +' + ar(m.r) + ' ج' : (m.k === 'noAngry' ? 'آخر اليوم' : ar(pr) + ' / ' + ar(m.n)) + '   •   +' + ar(m.r) + ' ج', x + w / 2, yy + 18, 13, m.done ? '#2e7d32' : '#7a4a2a');
  });
}
function slider(label, y, v, set) {
  const x0 = 300, x1 = 600, w = (x1 - x0) * v;
  T(label, 690, y, 20, '#3a1d0e', FD);
  R(x0, y - 7, x1 - x0, 14, 7, '#e0cfae', { lw: 2, hl: 0 }); if (w > 2) R(x1 - w, y - 7, w, 14, 7, '#2e9d4a', { lw: 2, hl: 0.3 });
  E(x1 - w, y, 14, 14, '#fff6e6', { lw: 2.6, hl: 0.4 });
  T(ar(Math.round(v * 100)) + '٪', 255, y + 1, 16, '#7a4a2a');
  btn(x0 - 24, y - 22, x1 - x0 + 48, 44, px => set(clamp((x1 - px) / (x1 - x0), 0, 1)), 'ovl', true);
}
function drawSettings(t) {
  dim(0.75); panel(150, 30, 660, 486);
  R(370, 20, 220, 50, 16, '#8a5a3c', { lw: 3.5 }); T('الإعدادات', 480, 46, 30, '#fff', FD, 'center', 5, '#3a1d0e');
  pill(172, 40, 132, 34, ENG ? '🌐 عربي' : '🌐 English', () => setLang(ENG ? 'ar' : 'en'), '#ffffff', '#2a1a10', 'ovl');
  slider('المؤثرات', 112, sfxV, v => { sfxV = v; applyVol(); saveOpt(); });
  slider('المزيكا', 166, musV, v => { musV = v; applyVol(); saveOpt(); });
  T('الشرايط', 480, 214, 20, '#3a1d0e', FD);
  const tk = Object.keys(TAPES), tsp = Math.min(94, 640 / tk.length);   // centred so every tape stays inside the panel
  tk.forEach((k, i) => {
    const tp = TAPES[k], x = 480 + (tk.length - 1) * tsp / 2 - i * tsp, y = 270, own = S.tapes[k], sel = S.tape === k;
    if (sel) { const p = RRp(x - 44, y - 38, 88, 112, 12); ctx.fillStyle = '#e6f6dc'; ctx.fill(p); ctx.lineWidth = 3; ctx.strokeStyle = '#2e9d4a'; ctx.stroke(p); }
    ctx.save(); if (!own) ctx.globalAlpha = 0.35; cassette(x, y, tp.c, 0.95, sel && musicLive); ctx.restore();
    T(tp.n, x, y + 44, fit(tp.n, 80, 12), '#3a1d0e'); T(own ? (sel ? '♪ شغال' : 'دوس تشغّل') : '🔒 السوق', x, y + 62, 11, own ? '#2e7d32' : '#9a6a4a');
    if (own) btn(x - 47, y - 38, 94, 112, () => { S.tape = k; save(); sfx.tap(); if (musV <= 0) { musV = 0.6; applyVol(); saveOpt(); } }, 'ovl');
  });
  const inst = PWA && !standalone();
  pill(inst ? 500 : 345, 404, 270, 38, (voiceOn ? '🔊' : '🔇') + ' صوت الزباين: ' + (voiceOn ? 'شغال' : 'مقفول'), () => { voiceOn = !voiceOn; saveOpt(); }, voiceOn ? '#dcecf8' : '#ece4dc', '#1e4a7a', 'ovl');
  if (inst) pill(190, 404, 290, 38, '📲 نزّلها على الموبايل كأبلكيشن', () => { UPFN = installApp; }, '#efe6ff', '#3a2a6a', 'ovl');
  bigBtn(365, 456, 230, 46, 'رجوع', () => { OVL = null; }, '#8a5a3c', 22, 'ovl');
  if (CLOUD.on) {
    cloudInit(); const u = CLOUD.user;
    if (u) { pill(200, 352, 330, 38, '☁️ محفوظ على جوجل • ' + (u.displayName || u.email || '').slice(0, 18), () => { toast('تقدّمك بيتحفظ على حسابك لوحده ☁️', '#9be37a'); }, '#e6f6dc', '#1e5a2a', 'ovl'); pill(540, 352, 100, 38, 'خروج', cloudSignOut, '#f6ece0', '#9a5a3a', 'ovl');
      pill(650, 352, 110, 38, '🗑 حذف', () => { if ((G.delArm || 0) > G.t) { G.delArm = 0; UPFN = cloudDelete; } else { G.delArm = G.t + 3; toast('⚠️ دوس تاني عشان تمسح حسابك وتقدّمك من على جوجل، واللي على الجهاز هيفضل', '#ffe38a', 3); } }, '#fbe4e0', '#a83a2a', 'ovl'); }
    else pill(280, 352, 400, 38, CLOUD.st === 'busy' ? '⏳ استنى...' : '🔐 احفظ تقدّمك بحساب جوجل', () => { UPFN = cloudSignIn; }, '#ffffff', '#2a1a10', 'ovl');
  }
}
function wrapT(s, x, y, maxW, size, c, lh, font = FB) {
  s = tr(s);
  ctx.font = (font === FB ? '800 ' : '') + size + 'px ' + font; const lines = []; let cur = '';
  for (const w of s.split(' ')) { const tt = cur ? cur + ' ' + w : w; if (cur && ctx.measureText(tt).width > maxW) { lines.push(cur); cur = w; } else cur = tt; }
  if (cur) lines.push(cur); lines.forEach((l, i) => T(l, x, y + i * lh, size, c, font)); return lines.length;
}
