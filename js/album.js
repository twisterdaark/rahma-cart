// ---------- album, story scenes, challenge result ----------
function albPortrait(ch, x, y, s, on) {
  ctx.save(); ctx.translate(x, y);
  sprite(sl('al' + ch + s), on ? 'on' : 'off', -200 * s, -310 * s, 400 * s, 380 * s, () => {
    ctx.save(); ctx.scale(s, s); CH[ch].d(1, 0); ctx.restore();
    if (!on) { ctx.globalCompositeOperation = 'source-atop'; ctx.fillStyle = '#3a2a4a'; ctx.fillRect(-200 * s, -310 * s, 400 * s, 380 * s); ctx.globalCompositeOperation = 'source-over'; }
  }, SC * DPR);
  ctx.restore();
}
function drawAlbum(t) {
  dim(0.75); panel(40, 16, 880, 510);
  const got = ALB.filter(k => S.album[k]).length;
  R(350, 6, 260, 48, 16, '#8a4ad8', { lw: 3.5 }); T('📖 ألبوم الرحمة', 480, 31, 28, '#fff', FD, 'center', 5, '#3a1a6a');
  T(ar(got) + ' / ' + ar(ALB.length), 660, 31, 20, '#5b3cc4', FD);
  ALB.forEach((ch, i) => {
    const col = i % 7, row = Math.floor(i / 7), cx = 816 - col * 119, y = 70 + row * 140, on = !!S.album[ch], n = S.served[ch] || 0, need = albNeed(ch), gold = on && n >= need * 4;
    const p = RRp(cx - 56, y, 112, 132, 12); ctx.fillStyle = on ? '#ffffff' : '#ece0c8'; ctx.fill(p); ctx.lineWidth = gold ? 4 : 2.5; ctx.strokeStyle = gold ? '#d4a017' : on ? '#b79bff' : '#c8b898'; ctx.stroke(p);
    ctx.save(); ctx.beginPath(); ctx.rect(cx - 53, y + 3, 106, 86); ctx.clip(); if (on) glow(cx, y + 50, 50, CH[ch].vip ? '#ffd86b' : '#fff1a0', 0.6); albPortrait(ch, cx, y + 138, 0.5, on); ctx.restore();
    T(on ? CH[ch].n : '؟؟؟', cx, y + 100, fit(on ? CH[ch].n : '؟؟؟', 104, 13), '#3a1d0e', FD); if (S.quest[ch]) T('📜', cx - 44, y + 16, 15, '#000');
    if (on && !CH[ch].vip && !CH[ch].rare) { const fl = frLv(ch); for (let q = 0; q < 3; q++) { const hp = heartP(cx - 22 + q * 16, y + 116, 6); ctx.fillStyle = q < fl ? '#ff4f7a' : '#e0d2b8'; ctx.fill(hp); ctx.lineWidth = 1.4; ctx.strokeStyle = OLC; ctx.stroke(hp); } }
    else { ctx.fillStyle = '#e0d2b8'; ctx.fill(RRp(cx - 44, y + 112, 88, 10, 5)); const f = Math.min(1, n / need); if (f > 0) { ctx.fillStyle = on ? '#8a4ad8' : '#ff8a3d'; ctx.fill(RRp(cx - 44, y + 112, 88 * f, 10, 5)); } }
    T(on ? '🔊' : ar(Math.min(n, need)) + '/' + ar(need), cx + 47, y + 117, 10, '#7a4a2a');
    btn(cx - 56, y, 112, 132, () => { if (on) { G.albSel = ch; voice(ch, 3); } else { sfx.wrong(); toast('قدّم للشخصية دي ' + (need - Math.min(n, need) === 1 ? 'مرة واحدة كمان عشان تفتح الكارت' : cnt(need - Math.min(n, need), 'مرة كمان عشان تفتح الكارت', 'مرات كمان عشان تفتح الكارت', 'مرتين كمان عشان تفتح الكارت'))); } });
  });
  T(got === ALB.length ? '🏆 كملت الألبوم! العربية الدهب والشريط السري بقوا بتوعك' : 'كمّل الألبوم تفتح العربية الدهب وشريط سري', 480, 504, 14, '#5b3cc4');
  bigBtn(60, 30, 110, 42, 'رجوع', () => { G.state = 'title'; }, '#8a5a3c', 18);
  bigBtn(182, 30, 130, 38, '📒 الوصفات', () => { G.state = 'recipes'; }, '#2e9d4a', 15);
  bigBtn(60, 488, 150, 32, '📸 لقطاتي', () => { G.state = 'snaps'; G.snapPg = 0; G.snapOpen = 0; }, '#ff8a2a', 15);
  if (G.albSel) {
    const ch = G.albSel; BT = BT.filter(b => b.id === 'hud'); dim(0.6); panel(250, 60, 460, 420);
    ctx.save(); ctx.beginPath(); ctx.rect(262, 72, 436, 260); ctx.clip(); glow(480, 200, 160, CH[ch].vip ? '#ffd86b' : '#fff1a0', 0.6); albPortrait(ch, 480, 330, 0.8, true); ctx.restore();
    T(CH[ch].n, 480, 350, 26, '#d7263d', FD);
    const qd = S.quest[ch] && QST[ch]; wrapT('"' + JOKE[ch] + '"', 480, qd ? 378 : 384, 380, 17, '#3a1d0e', 24);
    if (qd) wrapT('📜 ' + qd[1], 405, 414, 290, 13, '#8a5a1a', 18);
    const sv = 'خدمته ' + ((S.served[ch] || 0) === 1 ? 'مرة واحدة' : cnt(S.served[ch] || 0, 'مرة', 'مرات', 'مرتين')) + (CH[ch].vip || CH[ch].rare ? '' : '   •   ❤️ ' + FRN[frLv(ch)]); T(sv, 405, qd ? 458 : 436, fit(sv, 290, 13), '#7a4a2a');
    btn(0, 0, W, H, () => { G.albSel = null; sfx.tap(); });
    bigBtn(560, 410, 120, 44, '🔊 اسمع', () => voice(ch, 3), '#2e7fb8', 16);
  }
}
function drawRecipes(t) {
  dim(0.75); panel(40, 16, 880, 510);
  const ks = Object.keys(REC), got = ks.filter(k => S.rec[k]).length;
  R(350, 6, 260, 48, 16, '#2e9d4a', { lw: 3.5 }); T('📒 كتاب الوصفات', 480, 31, 28, '#fff', FD, 'center', 5, '#0f4a20');
  T(ar(got) + ' / ' + ar(ks.length), 660, 31, 20, '#2e7d32', FD);
  ks.forEach((k, i) => {
    const w = 400, h = 196, x = 490 - (i % 2) * 420, y = 76 + Math.floor(i / 2) * 210, on = !!S.rec[k], ok = recOk(k), P = PROD[k], ix = x + w - 80, tx = x + 128;
    const p = RRp(x, y, w, h, 14); ctx.fillStyle = on ? '#ffffff' : '#ece0c8'; ctx.fill(p); ctx.lineWidth = on ? 3.5 : 2.5; ctx.strokeStyle = on ? '#2e9d4a' : '#c8b898'; ctx.stroke(p);
    glow(ix, y + 92, 64, on ? '#fff1a0' : '#d8c8a8', 0.6);
    if (on) prodIcon(k, ix, y + 136, 1.3); else { E(ix, y + 94, 44, 44, '#5a4a3a', { lw: 3, hl: 0.15, v: false }); T('؟', ix, y + 98, 54, '#ffe9b8', FD); }
    const nm = on ? P.n : '؟؟؟'; T(nm, tx, y + 34, fit(nm, 220, 20, FD), '#3a1d0e', FD);
    wrapT(on ? REC[k].how : REC[k].hint, tx, y + 70, 220, 14, on ? '#2e7d32' : '#7a4a2a', 22);
    const lv = CH[P.ch].n + ' بيدفع فيها الضعف'; T(lv, tx, y + 140, fit(lv, 220, 13), '#8a4ad8');
    if (!ok) { const nd = '🔒 محتاج ' + P.rec.map(q => PROD[q].n).join(' و') + ' من السوق'; T(nd, tx, y + 170, fit(nd, 220, 12), '#c62828'); }
    else T(on ? ar(P.price) + ' ج' : 'جرّبها على اللوح!', tx, y + 170, on ? 16 : 13, on ? '#2e9d4a' : '#2e7fb8', on ? FD : FB);
  });
  T('الوصفة اللي تكتشفها بتدخل المنيو والزباين بيطلبوها', 480, 504, 14, '#2e7d32');
  bigBtn(60, 30, 110, 42, 'رجوع', () => { G.state = 'album'; }, '#8a5a3c', 18);
}
function drawStats(t) {
  dim(0.75); panel(40, 16, 880, 510);
  R(340, 6, 280, 48, 16, '#2e7fb8', { lw: 3.5 }); T('📊 إحصائياتي', 480, 31, 28, '#fff', FD, 'center', 5, '#0e3a5a');
  const fav = Object.keys(S.served).filter(k => CH[k]).sort((a, b) => S.served[b] - S.served[a])[0], top = Object.keys(S.sold).filter(k => PROD[k]).sort((a, b) => S.sold[b] - S.sold[a])[0];
  const L = [['📅', Math.max(S.st.days, S.day - 1), 'يوم شغل'], ['👥', S.st.cust, 'زبون خدمته'], ['💰', S.life, 'جنيه كسبتهم'], ['📈', S.st.bestDay || '—', 'أحسن يوم (ج)'],
    ['⭐', Object.values(S.stars).reduce((a, b) => a + b, 0), 'نجمة'], ['⚡', S.best, 'أعلى كومبو'], ['🔥', S.strk.b, 'أطول أيام ورا بعض'], ['🕵️', S.st.thief, 'نصاب مسكته'],
    ['🛵', S.st.dlv, 'توصيلة'], ['🍱', S.st.meals, 'وجبة كومبو'], ['💍', S.st.wed, 'فرح'], ['👻', S.st.ghost, 'زبون نص الليل'],
    ['🌟', S.st.leg, 'يوم أسطوري'], ['📜', S.st.qst, 'حكاية خلصتها'], [fav ? '' : '😍', fav ? CH[fav].n : '—', 'زبونك المفضل'], [top ? '' : '🥙', top ? PROD[top].n : '—', 'أكتر حاجة بتتباع']];
  L.forEach(([ic, v, lb], i) => {
    const col = i % 4, row = Math.floor(i / 4), x = 700 - col * 212, y = 66 + row * 108, w = 200, h = 100, p = RRp(x, y, w, h, 12);
    ctx.fillStyle = '#ffffff'; ctx.fill(p); ctx.lineWidth = 2.5; ctx.strokeStyle = '#9ac4e6'; ctx.stroke(p);
    if (i === 14 && fav) { ctx.save(); ctx.clip(p); albPortrait(fav, x + w - 36, y + 104, 0.24, true); ctx.restore(); }
    else if (i === 15 && top) prodIcon(top, x + w - 36, y + 72, 0.42);
    else T(ic, x + w - 32, y + 40, 28, '#000');
    const vs = typeof v === 'number' ? ar(v) : v; T(vs, x + w / 2 - 22, y + 40, fit(vs, 128, typeof v === 'number' ? 30 : 18, FD), '#1c4a7a', FD);
    T(lb, x + w / 2 - 22, y + 76, fit(lb, 140, 13), '#7a4a2a');
  });
  T('الأرقام دي من أول ما بدأت تلعب', 480, 504, 14, '#2e7fb8');
  bigBtn(60, 30, 110, 42, 'رجوع', () => { G.state = 'titles'; }, '#8a5a3c', 18);
}
function drawSnaps(t) {
  dim(0.75); panel(40, 16, 880, 510);
  R(340, 6, 280, 48, 16, '#ff8a2a', { lw: 3.5 }); T('📸 لقطاتي', 480, 31, 28, '#fff', FD, 'center', 5, '#7a2a00');
  const L = S.snaps, np = Math.max(1, Math.ceil(L.length / 6)), pg = Math.min(G.snapPg || 0, np - 1);
  if (!L.length) T('لسه مفيش لقطات، كل يوم بتلعبه بيتصوّر هنا 📸', 480, 270, 20, '#7a4a2a', FD);
  L.slice(pg * 6, pg * 6 + 6).forEach((s, j) => {
    const i = pg * 6 + j, col = j % 3, row = Math.floor(j / 3), x = 618 - col * 278, y = 74 + row * 192, w = 262, h = 163;
    ctx.save(); ctx.translate(x + w / 2, y + h / 2); ctx.rotate((hash(i * 7 + s.d) - 0.5) * 0.05);
    sprite(sl('snp' + j), i + '|' + s.d + s.m.ch + s.m.big + S.name, -w / 2 - 6, -h / 2 - 6, w + 12, h + 12, () => { ctx.translate(-w / 2, -h / 2); ctx.scale(w / 580, h / 360); drawComic(0, 0, 580, 360, s.m, s.d); });
    ctx.restore();
    btn(x, y, w, h, () => openSnap(s.m, s.d));
  });
  if (np > 1) {
    T(ar(pg + 1) + ' / ' + ar(np), 480, 461, 18, '#a8743e', FD);
    if (pg < np - 1) bigBtn(280, 440, 130, 40, 'الأقدم ◀', () => { G.snapPg = pg + 1; sfx.tap(); }, '#2e7fb8', 16);
    if (pg > 0) bigBtn(550, 440, 130, 40, '▶ الأحدث', () => { G.snapPg = pg - 1; sfx.tap(); }, '#2e7fb8', 16);
  }
  T('آخر ٢٤ يوم بيتحفظوا هنا • دوس على اللقطة تكبّرها وتشاركها', 480, 506, 13, '#a8743e');
  bigBtn(60, 30, 110, 42, 'رجوع', () => { G.state = 'album'; G.snapOpen = 0; }, '#8a5a3c', 18);
  if (G.snapOpen) drawSnap();
}
function drawTitles(t) {
  dim(0.75); panel(40, 16, 880, 510);
  const got = ACH.filter(a => S.ach[a.k]).length;
  R(350, 6, 260, 48, 16, '#d4a017', { lw: 3.5 }); T('🏅 الألقاب', 480, 31, 28, '#fff', FD, 'center', 5, '#5a3a00');
  T(ar(got) + ' / ' + ar(ACH.length), 660, 31, 20, '#a86a00', FD);
  ACH.forEach((a, i) => {
    const col = i % 4, row = Math.floor(i / 4), x = 700 - col * 212, y = 66 + row * 108, w = 200, h = 100, on = !!S.ach[a.k], sel = S.title === a.k, v = a.v();
    const p = RRp(x, y, w, h, 12); ctx.fillStyle = sel ? '#f2fbe8' : on ? '#ffffff' : '#ece0c8'; ctx.fill(p); ctx.lineWidth = sel ? 4 : 2.5; ctx.strokeStyle = sel ? '#2e9d4a' : on ? '#d4a017' : '#c8b898'; ctx.stroke(p);
    ctx.save(); if (!on) ctx.globalAlpha = 0.35; T(a.i, x + w - 28, y + 36, 28, '#000'); ctx.restore();
    T(a.t, x + w / 2 - 16, y + 26, fit(a.t, w - 66, 17, FD), on ? '#3a1d0e' : '#8a7a68', FD);
    T(a.d, x + w / 2 - 16, y + 50, fit(a.d, w - 66, 12), '#7a4a2a');
    if (on) T(sel ? '✓ متركب على اليافطة' : 'دوس تركّبه', x + w / 2, y + 82, 12, sel ? '#2e7d32' : '#2e7fb8');
    else { const f = clamp(v / a.n, 0, 1); ctx.fillStyle = '#e0d2b8'; ctx.fill(RRp(x + 20, y + 70, w - 40, 10, 5)); if (f > 0) { ctx.fillStyle = '#ff8a3d'; ctx.fill(RRp(x + 20, y + 70, (w - 40) * f, 10, 5)); } T(ar(Math.min(Math.floor(v), a.n)) + ' / ' + ar(a.n), x + w / 2, y + 90, 10, '#7a4a2a'); }
    btn(x, y, w, h, () => { if (on) { S.title = sel ? '' : a.k; save(); sfx.tap(); } else { sfx.wrong(); toast(a.d); } });
  });
  T('اللقب اللي تختاره بيظهر تحت اسمك على يافطة النيون', 480, 504, 14, '#a86a00');
  bigBtn(60, 30, 110, 42, 'رجوع', () => { G.state = 'title'; }, '#8a5a3c', 18);
  bigBtn(182, 30, 150, 42, '📊 الإحصائيات', () => { G.state = 'stats'; }, '#2e7fb8', 16);
}
function drawStory(t) {
  const ln = STORY[G.storyQ[0]][G.storyL], ah = ln[0] === 'ah', k = pop(G.storyT, 0.3);
  dim(0.62);
  ctx.save();
  if (ah) { ctx.translate(810, 478); ctx.scale(0.95, 0.95); drawAH(t, 'sit', 1); }
  else { ctx.translate(160, 290 + Math.sin(t * 3) * 8); ctx.scale(2.2, 2.2); drawBird(0, 0, t); }
  ctx.restore();
  const bx = ah ? 120 : 270, bw = 570;
  ctx.save(); ctx.translate(bx + bw / 2, 430); ctx.scale(k, k); ctx.translate(-(bx + bw / 2), -430);
  panel(bx, 360, bw, 140);
  const nm = ah ? 'أبو حسيبة' : 'المعلم سكرتاعوط'; R(bx + bw - 190, 344, 170, 32, 12, ah ? '#d7263d' : '#2e6ab8', { lw: 3 }); T(nm, bx + bw - 105, 361, 17, '#fff', FD);
  wrapT(ln[1], bx + bw / 2, 412, bw - 60, 20, '#3a1d0e', 30);
  T('دوس عشان تكمّل ◂', bx + 90, 482, 12, '#9a6a4a');
  ctx.restore();
  btn(0, 0, W, H, () => { if (G.storyT > 0.3) storyNext(); });
  bigBtn(W - 150, 70, 110, 40, 'تخطي ⏭', () => { while (G.state === 'story') storyNext(); }, '#8a5a3c', 15);
}
function drawChalEnd() {
  const y = 40, h = 460, k = pop(G.endT, 0.4);
  dim(0.72);
  ctx.save(); ctx.translate(480, y + h / 2); ctx.scale(k, k); ctx.translate(-480, -(y + h / 2));
  panel(170, y, 620, h);
  const EN = CHAL.endless;
  R(330, y - 18, 300, 52, 16, EN ? '#5b3cc4' : '#e08a1e', { lw: 3.5 }); T(EN ? '♾ لا نهائي' : '🏆 تحدي اليوم', 480, y + 8, 30, '#fff', FD, 'center', 5, EN ? '#2a1a5a' : '#5a2a00');
  T(EN ? 'وصلت لمستوى ' + ar(CHAL.lvl) + '   •   ' + AREAS[CHAL.area].n : ar(CHAL.key) + '   •   ' + AREAS[CHAL.area].n, 480, y + 56, EN ? 16 : 14, '#7a4a2a', EN ? FD : FB);
  T(ar(Math.round(G.chScore * clamp(G.endT / 0.9, 0, 1))) + ' ج', 480, y + 112, 56, '#3a1d0e', FD);
  const rec = G.chScore > G.chPrev;
  if (CHAL.vs && !EN) { const vs = CHAL.vs, vn = vs.n || 'صاحبك', w = G.chScore > vs.s; T(w ? '🎉 غلبت ' + vn + '! هو عمل ' + ar(vs.s) + ' ج' : G.chScore === vs.s ? '🤝 اتعادلت مع ' + vn : '😅 ' + vn + ' غلبك، هو عمل ' + ar(vs.s) + ' ج', 480, y + 164, 18, w ? '#2e7d32' : '#c62828', FD); }
  else T(EN ? (rec ? '🎉 رقم قياسي جديد!' : 'أحسن سكور ليك: ' + ar(G.chPrev) + ' ج') : rec ? (G.chPrev ? '🎉 رقم قياسي جديد ليك النهارده!' : 'أول محاولة ليك النهارده') : 'أحسن سكور ليك النهارده: ' + ar(G.chPrev) + ' ج', 480, y + 164, 17, rec ? '#2e7d32' : '#7a4a2a');
  [['مبسوطين', G.happy, '#2e9d4a'], ['تحفة', G.perfect, '#d4a017'], ['أعلى كومبو', G.bestCombo, '#ff6a2a'], ['زعلانين', G.angry, '#c62828']].forEach(([n, v, c], i) => { const x = 660 - i * 120, p = RRp(x - 52, y + 190, 104, 50, 12); ctx.fillStyle = '#fff'; ctx.fill(p); T(ar(v), x, y + 208, 20, c, FD); T(n, x, y + 228, 12, '#7a4a2a'); });
  T(EN ? 'ابعت السكور لصحابك وشوف مين يوصل لمستوى أعلى!' : 'ابعت السكور لصحابك وشوف مين يغلب! بكرة فيه تحدي جديد', 480, y + 270, 15, '#2e7fb8');
  ctx.restore();
  bigBtn(500, y + 300, 250, 58, '📤 ابعت لصحابك', () => { UPFN = shareScore; }, '#2e9d4a', 22);
  bigBtn(210, y + 304, 250, 52, '🔁 العب تاني', () => { const vk = CHAL.vs ? CHAL.key : null; exitChallenge(); EN ? startEndless() : startChallenge(vk); }, '#e08a1e', 20);
  bigBtn(380, y + 384, 200, 50, 'رجوع', exitChallenge, '#8a5a3c', 20);
}
// each station is cached and only redrawn when what it shows changes (or at a low rate while it animates)
const ahOn = k => G.ah && (G.ah.q.includes(k) || G.ah.tgt === k) ? 1 : 0;
const stS = k => stockN(k) + ',' + ahOn(k) + ',' + pressK(k) + (stockN(k) <= 0 && !ahOn(k) ? ',' + tb(12) : '');
const falBall = (x, y) => { for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.moveTo(x - 6 + i * 4, y + 2); ctx.lineTo(x - 4 + i * 4, y + 6); ctx.lineTo(x - 2 + i * 4, y + 2); ctx.fillStyle = '#fff'; ctx.fill(); } };
function drawStations(t) {
  VOL = true; const b = G.board || { st: 'empty' };
  sprite(sl('spit'), stS('spit') + '|' + tb(10, 0.1), 8, 104, 130, 200, () => drawSpit(t));
  sprite(sl('radio'), (musicLive && musV > 0 ? tb(10, 0.6) : 'off') + S.tape, 136, 34, 124, 94, () => drawRadio(t));
  sprite(sl('bread'), stS('bread'), 26, 410, 128, 112, drawBread);
  if (b.st === 'wrap') drawBoard(t); else sprite(sl('board'), b.st + b.fill + !!G.tut + b.sauce + b.mix, 146, 418, 180, 96, () => drawBoard(t));
  if (has('shawqyIce')) sprite(sl('frz'), stS('freezer') + (G.drag && G.drag.key === 'src:freezer'), 10, 290, 136, 124, () => drawFreezer(t));
  const dn = diaaNeeds(); sprite(sl('kiosk'), (dn ? dn.need.join() + tb(12) : '-') + (G.drag ? G.drag.key : '') + G.sea, 858, 56, 102, 106, () => drawKiosk(t));
  for (const [k, col, ball, lb] of [['gfal', '#5f8f2a', null, 'فلافل خضرا'], ['gtray', '#9a917e', falBall, 'فلافل السكرتح']]) if (stationVisible(k)) { const r = ST[k]; sprite(sl(k), stS(k), r.x - 4, r.y - 14, r.w + 22, r.h + 38, () => drawTray(k, col, ball, lb)); }
  if (stationVisible('fryer')) { const r = ST.fryer; sprite(sl('fryer'), stS('fryer') + (G.fry >= 0 ? tb(12, 0.3) : 'i'), r.x - 4, r.y - 30, r.w + 8, r.h + 36, () => drawFryer(t)); }
  const ds = [0, 1, 2, 3].map(i => has(TAPS[i].p) ? stS('tap' + i) + (G.taps && G.taps[i] >= 0 ? 'p' + tb(15, 0.7) : '') : 'x').join('|');
  sprite(sl('disp'), ds, 556, 294, 218, 224, () => drawDisp(t));
  if (stationVisible('kettle')) sprite(sl('kettle'), stS('kettle') + (G.kettle >= 0 ? tb(15, 0.4) : 'i'), 776, 308, 118, 204, () => drawKettle(t));
  sprite(sl('trash'), pressK('trash'), ST.trash.x - 4, ST.trash.y - 4, ST.trash.w + 8, ST.trash.h + 10, drawTrash);
  sprite(sl('vit'), 'v', 880, 306, 82, 114, drawVit);
  if (fruitOn()) sprite(sl('fruit'), (G.drag ? G.drag.key : '') + tb(6), 860, 238, 100, 70, () => drawFruit(t));
  for (const k of ['sauce', 'ice']) if (stationVisible(k)) { const r = ST[k]; sprite(sl(k), pressK(k), r.x - 6, r.y - 14, r.w + 12, r.h + 18, k === 'sauce' ? drawSauce : drawIce); }
  VOL = false;
}

