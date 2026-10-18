// ---------- caricature face parts ----------
function EYE(x, y, r, o = {}) {
  const sy = o.sy || 1;
  E(x, y, r, r * sy, o.scl || '#f4eedd', { sd: 0.1, hl: 0, lw: 2.8, seed: x + 3 });
  ctx.save(); ctx.clip(ellP(x, y, r * 0.98, r * sy * 0.98, 0, 1, 0));
  if (o.vein) for (let i = 0; i < 4; i++) { const a = hash(x * 3 + i) * 6.28; L([[x + Math.cos(a) * r, y + Math.sin(a) * r * sy], [x + Math.cos(a) * r * 0.45, y + Math.sin(a) * r * 0.45 * sy]], 1, '#c43a3a', 0.6); }
  const lx = (o.lx || 0) * r, ly = (o.ly ?? 0.15) * r, ir = r * (o.ir || 0.5);
  if (o.iris) { ctx.beginPath(); ctx.arc(x + lx, y + ly, ir, 0, Math.PI * 2); ctx.fillStyle = o.iris; ctx.fill(); ctx.lineWidth = 1; ctx.strokeStyle = shade(o.iris, -0.5); ctx.stroke(); }
  dot(x + lx, y + ly, ir * (o.iris ? 0.52 : 0.8) * (o.pr || 1), '#0d0806');
  dot(x + lx - ir * 0.35, y + ly - ir * 0.4, Math.max(1.3, ir * 0.3), '#fff');
  if (o.lid) { ctx.fillStyle = o.skin; ctx.fillRect(x - r - 3, y - r * sy - 3, 2 * r + 6, 2 * r * sy * o.lid + 3); }
  ctx.restore();
  if (o.lid) { const ly2 = y - r * sy + 2 * r * sy * o.lid; Q(x - r * 1.08, ly2 + r * 0.12, x, ly2 - r * 0.2, x + r * 1.08, ly2 + r * 0.12, 3.2); }
  if (o.bag) Q(x - r * 0.8, y + r * sy * 1.08, x, y + r * sy * 1.5, x + r * 0.8, y + r * sy * 1.08, 1.8, OLC, 0.55);
}
function teethRow(x, y, w, h, tc = '#efe3b4') {
  const n = Math.max(4, Math.round(w / 6));
  for (let i = 0; i < n; i++) { const tw = 2 * w / n, tx = x - w + i * tw, th = h * (0.7 + hash(i + x) * 0.6); ctx.fillStyle = hash(i * 3 + x) > 0.82 ? '#c9b25e' : tc; ctx.fillRect(tx + 0.5, y, tw - 1, th); ctx.strokeStyle = 'rgba(70,45,10,.55)'; ctx.lineWidth = 1; ctx.strokeRect(tx + 0.5, y, tw - 1, th); }
}
function GRIN(x, y, w, h, m, o = {}) {
  const p = new Path2D();
  if (m === 2) { p.moveTo(x - w, y + h * 0.5); p.quadraticCurveTo(x, y - h * 0.6, x + w, y + h * 0.5); p.quadraticCurveTo(x, y + h * 0.4, x - w, y + h * 0.5); }
  else { const open = m === 1 ? h * 1.6 : h * 0.75; p.moveTo(x - w, y); p.quadraticCurveTo(x, y + h * 0.3, x + w, y); p.quadraticCurveTo(x, y + open * 1.5, x - w, y); }
  p.closePath(); ctx.fillStyle = '#3a0d0a'; ctx.fill(p);
  ctx.save(); ctx.clip(p); teethRow(x, m === 2 ? y - h * 0.3 : y - 2, w, h * 0.6, o.tc);
  if (m === 1) { ctx.fillStyle = '#d9535f'; ctx.beginPath(); ctx.ellipse(x, y + h * 2.1, w * 0.5, h * 0.7, 0, 0, Math.PI * 2); ctx.fill(); }
  ctx.restore(); ctx.lineWidth = 3.2; ctx.strokeStyle = OLC; ctx.lineJoin = 'round'; ctx.stroke(p);
  if (o.lip) { Q(x - w * 0.9, y - 2, x, y - h * 0.5, x + w * 0.9, y - 2, 4, o.lip, 0.9); }
}
function LIPS(x, y, w, m, c = '#8a4a3a') {
  if (m === 1) { GRIN(x, y, w, w * 0.35, 1); return; }
  if (m === 2) { const p = new Path2D(); p.moveTo(x - w, y + 4); p.quadraticCurveTo(x, y - w * 0.4, x + w, y + 4); p.quadraticCurveTo(x, y + w * 0.1, x - w, y + 4); ink(p, c, { b: [x, y, w], hl: 0.1 }); return; }
  E(x, y - 3, w, w * 0.22, c, { hl: 0.25, lw: 2.6 }); E(x, y + 4, w * 0.85, w * 0.26, shade(c, 0.05), { hl: 0.3, lw: 2.6 }); L([[x - w * 0.9, y + 1], [x + w * 0.9, y + 1]], 2);
}
function BROW(x, y, len, ang, th = 6, c = OLC) { ctx.save(); ctx.translate(x, y); ctx.rotate(ang); L([[-len / 2, 0], [len / 2, -2]], th, c); ctx.restore(); }
function brows(m, x, y, d, len, th, c) { const a = m === 2 ? 0.5 : m === 1 ? -0.28 : 0.08; BROW(x - d, y - (m === 1 ? 5 : 0), len, a, th, c); BROW(x + d, y - (m === 1 ? 5 : 0), len, -a, th, c); }
function WR(x, y, w, n, gap = 7, a = 0.5) { for (let i = 0; i < n; i++) Q(x - w + i * 3, y + i * gap, x, y + i * gap - 6, x + w - i * 3, y + i * gap, 1.8, OLC, a); }
function NOSE(x, y, w, h, c) { B([[x - w * 0.35, y - h], [x + w * 0.35, y - h], [x + w, y + h * 0.4], [x + w * 0.5, y + h], [x - w * 0.5, y + h], [x - w, y + h * 0.4]], c, { sd: 0.18 }); dot(x - w * 0.42, y + h * 0.62, w * 0.18, '#3a1a10'); dot(x + w * 0.42, y + h * 0.62, w * 0.18, '#3a1a10'); }
function blush(x, y, r, a = 0.35) { glow(x, y, r, '#ff6b7a', a); }
// shoulders + neck so heads sit on bodies instead of floating
function torso(w, top, c, o = {}) { B([[-w, 40], [-w * 1.02, top + 40], [-w * 0.8, top + 8], [-w * 0.35, top], [w * 0.35, top], [w * 0.8, top + 8], [w * 1.02, top + 40], [w, 40]], c, o); }
function neck(w, y1, y2, c) { R(-w / 2, y1, w, y2 - y1, w * 0.35, c, { hl: 0.08, sd: 0.25 }); }
// small eye / grin for food faces (thinner lines than the customers')
function peye(x, y, r, o = {}) {
  const sy = o.sy || 1, lx = (o.lx || 0) * r;
  E(x, y, r, r * sy, o.scl || '#fbf7ec', { lw: 1.8, hl: 0, sd: 0.08, v: false });
  if (o.iris) dot(x + lx, y + r * 0.15, r * 0.6, o.iris);
  dot(x + lx, y + r * 0.15, r * (o.iris ? 0.32 : 0.55), '#0d0806'); dot(x + lx - r * 0.25, y - r * 0.15, Math.max(0.9, r * 0.2), '#fff');
  if (o.lid) { const ly = y - r * sy + 2 * r * sy * o.lid; ctx.save(); ctx.clip(ellP(x, y, r * 1.02, r * sy * 1.02, 0, 1, 0)); ctx.fillStyle = o.skin; ctx.fillRect(x - r - 2, y - r * sy - 2, 2 * r + 4, ly - (y - r * sy) + 2); ctx.restore(); Q(x - r * 1.05, ly + r * 0.1, x, ly - r * 0.2, x + r * 1.05, ly + r * 0.1, 1.8); }
}
function pgrin(x, y, w, h, tongue) {
  const p = new Path2D(); p.moveTo(x - w, y); p.quadraticCurveTo(x, y + h * 0.4, x + w, y); p.quadraticCurveTo(x, y + h * 2.2, x - w, y); p.closePath();
  ctx.fillStyle = '#3a0d0a'; ctx.fill(p); ctx.save(); ctx.clip(p); ctx.fillStyle = '#f4ead0'; ctx.fillRect(x - w, y - 1, 2 * w, h * 0.75);
  for (let i = 1; i < 5; i++) L([[x - w + i * w / 2.5, y], [x - w + i * w / 2.5, y + h * 0.7]], 0.8, '#9a8a6a');
  if (tongue) { ctx.fillStyle = '#d9535f'; ctx.beginPath(); ctx.ellipse(x, y + h * 1.8, w * 0.45, h * 0.6, 0, 0, Math.PI * 2); ctx.fill(); }
  ctx.restore(); ctx.lineWidth = 2; ctx.strokeStyle = OLC; ctx.stroke(p);
}

