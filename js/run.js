// ---------- run state ----------
let G ={ state: 'title', t: 0, parts: [], pops: [], coins: [], walkers: [], walkT: 0.5 };
let dispMoney = S.money, moneyBounce = 0, ptr = { x: 0, y: 0 }, OVL = null, slideB = null;
const fullStock = () => { const o = {}; for (const k in STOCK) o[k] = capOf(k); return o; };
function newDay() {
  const legend = !CHAL && S.day % 7 === 0, sea = !CHAL && !legend ? seasonOf(S.day) : null;
  const rival = !CHAL && !legend && !sea && S.day >= 6 && S.day % 3 === 0 && S.ch2 < 4, pl = !CHAL && S.pre && S.pre.d === S.day ? S.pre : planDay(S.day), wx = pl.wx;
  if (!CHAL) for (const k in GIFT) if (frLv(k) >= 3 && !S.gifts.includes(k)) S.gifts.push(k);   // friends made before gifts existed
  if (!CHAL) { if (pl.night) S.nightSeen = 1; if (pl.ev && pl.ev.k === 'wed') S.st.wed++; }
  if (!CHAL) S.pre = S.pre && S.pre.d === S.day + 1 ? S.pre : planDay(S.day + 1);
  let noteR = null;   // yesterday's tab: friends are likelier to come back and pay double
  if (!CHAL && S.note.length) { noteR = { paid: 0, n: 0, gone: 0 }; for (const nt of S.note) { if (Math.random() < 0.55 + 0.12 * frLv(nt.ch)) { noteR.paid += nt.a * 2; noteR.n++; } else noteR.gone++; } S.money += noteR.paid; S.life += noteR.paid; S.note = []; save(); }
  const hint = !CHAL && S.day >= 2 ? newsHint(S.day + 1, S.pre) : null;
  if (sea) SEAS[sea].src.forEach((k, i) => SRC[k].x = 897 + i * 33);
  setHolds();
  G = { state: 'intro', t: G.t, time: DAYLEN, dayT: 0, slots: [null, null, null, null], spawnT: 1.2, earned: 0, spent: 0, happy: 0, angry: 0, perfect: 0,
    combo: 0, bestCombo: 0, comboT: 0, parts: [], pops: [], coins: [], toast: null, bird: null, walkers: G.walkers || [], walkT: 1,
    birdAt: (S.diff === 'hard' && S.day >= 2) || (S.diff === 'med' && S.day >= 3) ? grnd(25, 60) : -1,
    diaaAt: !sea && !pl.night && S.day >= 2 && (S.diaaNext || grand() < 0.3 || (S.day >= 3 && !S.seenDiaa)) ? grnd(20, 50) : -1,
    vipLeft: legend ? 0 : S.day >= 2 ? 1 + (S.day >= 4 ? 1 : 0) : 0, flash: 0, flashC: '#fff', shake: 0, press: {}, introT: 0, endT: 0, lastTick: 99,
    board: { st: 'empty', fill: null, wrapT: 0 }, taps: [-1, -1, -1, -1], fry: -1, kettle: -1, items: {}, born: {}, drag: null, sel: null, missed: {},
    stock: fullStock(), ah: { st: 'sit', t: 0, x: AHX, y: AHY, q: [], tgt: null, say: null, sayT: 0, warned: {} },
    tut: S.tut ? null : { step: 0, t: 0 }, paused: false, shopTab: 'menu',
    power: true, powerT: 0, matchT: 0, raid: null, legend: legend ? { at: 26, on: 0 } : null,
    ev: pl.ev ? Object.assign({}, pl.ev, { on: 0 }) : null,
    cnt: {}, favN: 0, exN: 0, caught: 0, bonus: 0, ms: [], storyQ: null, storyL: 0, storyT: 0,
    sea, wx, rival: rival ? { e: 0 } : null, iftar: sea === 'ram' ? { at: 40, on: 0 } : null, iftarT: 0, meals: 0,
    noteR, dirt: 0, dirtN: 0, wipe: null, revs: [], news: !CHAL && S.day >= 2 ? [{ at: 24, s: pick(NEWS) }].concat(hint ? [{ at: 58, s: hint }] : []) : [],
    mk: mkFor(S.day), dlvQ: S.day >= 4 ? [grnd(25, 45), grnd(55, 75)].slice(0, S.day >= 7 ? 2 : 1) : [], hlp: S.help.zarb ? { st: 'idle', t: 0, cd: 2, say: null, sayT: 0, happy: 0 } : null, fly: [],
    night: !!pl.night, ghostQ: pl.night ? [grnd(26, 36), grnd(56, 66)] : [], qst: !CHAL && !legend && !pl.night && S.day >= 4 ? pickQuest() : null, upQ: !CHAL && !legend && S.upset && CH[S.upset.ch] ? { ch: S.upset.ch, at: rnd(14, 34), on: 0 } : null, moment: null, lastCh: null };
  G.tutQ = !!G.tut && !tutGo && (S.day > 1 || S.st.cust > 0); tutGo = 0;
  if (!CHAL) { G.ms = mkMissions(); G.forceThief = G.ms.some(m => m.k === 'thief'); const q = storyQueue(); if (q.length) { G.storyQ = q; G.state = 'story'; } if (S.ch2 >= 4) G.rival = null; }
  dispMoney = S.money;
}
function goHome() { sfx.tap(); if (CHAL) { exitChallenge(); return; } saved = S; save(); fast = false; G = { state: 'title', t: G.t, parts: [], pops: [], coins: [], walkers: G.walkers, walkT: 1 }; dispMoney = S.money; }
function startPlay() { G.state = 'play'; G.stock = fullStock(); sfx.bell(); if (G.tut) tutEnter();
  if (fruitOn() && !CHAL && !S.fruitSeen) { S.fruitSeen = 1; toast('🍓🐨 أبو حسيبة جاب فاكهة جديدة للكشك: النجلاوي وكوالا لامبور!', '#ffe38a', 3.5); if (G.ah) { G.ah.say = 'فاكهة طازة 👇'; G.ah.sayT = 3.5; } } }
function toast(s, c = '#fff3d6', d = 1.8) { G.toast = { s, c, t: d }; }
function addPop(x, y, s, c, size = 30, life = 1.2) { G.pops.push({ x, y, s, c, size, t: 0, life }); }
function burst(x, y, n, cols, kind = 'conf', spd = 1) { n = Math.min(n, 160 - G.parts.length); for (let i = 0; i < n; i++) { const a = rnd(0, Math.PI * 2), v = rnd(100, 320) * spd; G.parts.push({ x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v - rnd(80, 200), life: rnd(0.7, 1.3), t: 0, c: pick(cols), s: rnd(5, 10), r: rnd(0, 6), vr: rnd(-10, 10), kind }); } }
function makeCust(ch, order, slot, tr = null) {
  const vip = CH[ch].vip, rare = CH[ch].rare, max = patienceFor(order.length) * (vip ? 0.8 : rare ? 1.5 : 1) * (tr === 'rush' ? 0.55 : 1) * (1 + 0.1 * frLv(ch));
  G.slots[slot] = { ch, order: order.map(p => ({ p: pid(p), x: pex(p), done: false })), slot, st: 'in', t: 0, pat: max, max, say: null, sayT: 0, shake: 0, vip: vip || rare, tr, pickT: tr === 'picky' ? rnd(3, 6) : 0, acc: vip || rare ? '' : accPick(ch) };
  if (ch === 'barber' && !CHAL && !S.served.barber) toast('✂️ حلاق الرحمة بنفسه جه العربية!', '#ffe38a', 3);
  voice(ch, 0); if (vip) { sfx.vip(); toast('✨ الرحمة الكونية وصلت! بتدفع ٣ أضعاف', '#ffe38a'); }
  if (rare) { sfx.cluck(); sfx.vip(); G.slots[slot].say = 'عايز ' + order.map(oName).join(' و '); G.slots[slot].sayT = 3; G.diaaHint = 9; if (G.ah) { G.ah.say = 'طلباته عندي هنا 👆'; G.ah.sayT = 3.5; } toast('🐔 د. ضياء وصل راكب الفرخة! طلباته في كشك أبو حسيبة 👉', '#ffe38a'); }
  if (tr && TRAITS[tr].say) { G.slots[slot].say = TRAITS[tr].say; G.slots[slot].sayT = 2; }
  if (tr === 'haggle') Object.assign(G.slots[slot], { hag: 1, hagT: 6, say: 'تعملهولي بنص التمن؟ 🥺', sayT: 6 });
  if (tr === 'note') Object.assign(G.slots[slot], { hag: 1, q: 'note', hagT: 6, say: 'سجّلها عليا في النوتة؟ 📒', sayT: 6 });
  if (G.dirt >= 0.5 && !G.slots[slot].say) { G.slots[slot].say = 'إيه القرف ده 🤢'; G.slots[slot].sayT = 1.6; }
}
const legOrder = () => { const up = owned(); return [0, 1, 2].map(() => gpick(up)); };
function spawn() {   // returns false when it held back, so the timer retries soon
  const free = [0, 1, 2, 3].filter(i => !G.slots[i]); if (!free.length) return false;
  if (G.slots.filter(c => c && (c.st === 'wait' || c.st === 'in')).length >= (S.day <= 10 ? 3 : 4)) return false;
  if (G.raid || (G.legend && !G.legend.on && G.dayT > G.legend.at - 6)) return false;
  const here = G.slots.filter(Boolean).map(c => c.ch), favs = area().fav.concat(Object.keys(S.fig).filter(k => S.fig[k] === 2)).filter(c => !here.includes(c));
  let ch; if (G.vipLeft > 0 && G.dayT > 20 && grand() < 0.15) { ch = 'cosmic'; G.vipLeft--; } else ch = favs.length && grand() < 0.35 ? gpick(favs) : gpick(POOL.filter(c => !here.includes(c)));
  if (!CHAL && !G.tut && !S.served.barber && ch !== 'cosmic' && !here.includes('barber') && S.day >= 2 && G.dayT > 12 && grand() < 0.35) ch = 'barber';
  const up = owned(), upN = up.filter(p => !PROD[p].rec && !PROD[p].fr), upR = up.filter(p => PROD[p].rec), frs = up.filter(p => PROD[p].fr);
  let n = 1; if (grand() < Math.min(0.5, 0.2 + S.day * 0.06)) n++; if (S.day >= 6 && grand() < 0.15) n++;
  const order = [];
  let wish = null;
  const own = ownOf(ch);
  if (own && has(own) && grand() < 0.7) order.push(own);
  else if (own && !has(own) && (!PROD[own].rec || recOk(own)) && grand() < 0.65) { wish = own; if (!PROD[own].rec) G.missed[wish] = (G.missed[wish] || 0) + 1; }
  const pk = () => {   // hot days want cold drinks, rainy days want tea, and each season has its sweets
    if (G.wx === 'hot' && grand() < 0.55) { const c = up.filter(p => COLD.includes(p)); if (c.length) return gpick(c); }
    if (G.wx === 'rain' && has('zoolTea') && grand() < 0.45) return 'zoolTea';
    if (G.sea && grand() < 0.3) return gpick(SEAS[G.sea].src);
    if (frs.length && grand() < 0.1) return gpick(frs);
    if (upR.length && grand() < 0.12) return gpick(upR);
    return gpick(upN);
  };
  while (order.length < n) { const p = pk(); if (!order.includes(p) || up.length < 3) order.push(p); }
  let meal = false; if (S.meal && n >= 2 && !wish && grand() < 0.4) { const m = mkMeal(n); if (m) { order.length = 0; order.push(...m); meal = true; } }
  order.forEach((p, i) => { for (const x in EXTRAS) if (S.extras[x] && EXTRAS[x].on.includes(p) && grand() < (x === 'i' && G.wx === 'hot' ? 0.6 : 0.3)) order[i] = p + '|' + x; });
  let tr = null;
  if (!CH[ch].vip && S.day >= 3 && !G.tut) { if (G.forceThief && G.dayT > 8) { tr = 'thief'; G.forceThief = false; } else if (grand() < 0.25) { const tl = S.diff === 'easy' ? ['rich', 'picky', 'thief'] : ['rich', 'picky', 'thief', 'rush']; if (S.day >= 5) tl.push('haggle'); if (!CHAL && S.day >= 6 && S.note.length < 3) tl.push('note'); tr = gpick(tl); } }
  const slot = pick(free); makeCust(ch, order, slot, tr);
  if (wish) { G.slots[slot].say = PROD[wish].rec ? 'تعرف تعمل ' + PROD[wish].n + '؟ 🤔' : 'مفيش ' + PROD[wish].n + '؟ 😢'; G.slots[slot].sayT = 2.4; }
  if (meal) { const c = G.slots[slot]; c.meal = 1; c.max *= 1.15; c.pat = c.max; }
  return true;
}
function roomFor() { const free = [0, 1, 2, 3].filter(i => !G.slots[i]); return free.length && G.slots.filter(c => c && (c.st === 'wait' || c.st === 'in')).length < (S.day <= 10 ? 3 : 4) ? free : null; }
function custAt(x, y) { if (G.raid && G.raid.shut > 0.5) return null; for (const c of G.slots) if (c && c.st === 'wait' && Math.abs(x - SLOTX[c.slot]) < 84 && y > 50 && y < CT + 20) return c; return null; }
function wants(c, p) { return c && c.st === 'wait' && c.order.some(o => oKey(o) === p && !o.done); }
function runAt(x, y) { for (const c of G.slots) if (c && c.st === 'run' && Math.abs(x - SLOTX[c.slot] - (c.rx || 0)) < 90 && y > 40 && y < CT + 10) return c; return null; }
function catchThief(c) {
  const x = SLOTX[c.slot] + c.rx; S.money += c.due; G.earned += c.due; S.life += c.due; G.caught++; S.st.thief++;
  c.st = 'angry'; c.t = 0; c.say = 'خلاص خلاص هدفع 😅'; c.sayT = 99; if (G.revs) G.revs.push({ ch: c.ch, k: 'caught' }); moment(2, c.ch, 'مسكتك!', 'خلاص خلاص هدفع… بس الأكل كان يستاهل الجري 😅');
  addPop(x, 150, 'مسكته! +' + ar(c.due) + ' ج', '#9be37a', 30); for (let i = 0; i < 6; i++) G.coins.push({ x0: x + rnd(-20, 20), y0: 200, t: -i * 0.05, d: 0.6, k: i });
  burst(x, 160, 20, ['#ffd23f', '#ffffff', '#9be37a'], 'star'); sfx.cash(); sfx.squawk(); buzz(30); G.shake = 0.2;
}
function pickyChange(c) {
  const i = c.order.findIndex(o => !o.done), opts = owned().filter(p => !c.order.some(o => o.p === p)); if (i < 0 || !opts.length) return;
  c.order[i] = { p: pick(opts), x: '', done: false }; c.say = 'لا لا، غيّرت رأيي! 😒'; c.sayT = 2.2; c.shake = 0.4; c.pat = Math.min(c.max, c.pat + c.max * 0.2); voice(c.ch, 2);
}
const prodOf = key => key && key.startsWith('src:') ? SRC[key.slice(4)].p : G.items[key];
function takeItem(key) { if (key.startsWith('src:')) { const s = SRC[key.slice(4)]; if (s.st) use(s.st); } else G.items[key] = null; }
function deliver(c, key) {
  const p = prodOf(key); if (!p) return;
  G.sel = null;
  const sx = SLOTX[c.slot];
  const o = c.order.find(o => oKey(o) === p && !o.done);
  if (!o) {
    const nr = c.order.find(o => o.p === pid(p) && !o.done);
    c.pat -= c.max * 0.3; c.shake = 0.6; c.say = nr ? (nr.x ? 'نسيت ال' + EXTRAS[nr.x].sh + '!' : 'أنا مطلبتش ' + EXTRAS[pex(p)].sh + '!') : 'مش ده اللي طلبته!'; c.sayT = 1.4;
    if (G.combo >= 2) addPop(480, 250, 'الكومبو راح!', '#ff7a6a', 28);
    G.combo = 0; G.shake = 0.3; G.flash = 0.2; G.flashC = '#ff3b30'; sfx.wrong(); buzz([30, 40, 30]);
    if (G.tut) c.pat = Math.max(c.pat, c.max * 0.5);
    return;
  }
  takeItem(key);
  G.cnt[o.p] = (G.cnt[o.p] || 0) + 1; if (o.x) G.exN++;
  if (o.n > 1) { o.n--; sfx.drop(); burst(sx + 70, 140, 6, ['#ff8ae8', '#ffffff'], 'heart', 0.5); addPop(sx + 66, 120, 'فاضل ' + ar(o.n), '#ffe9b8', 20, 0.8); if (isFinite(c.max)) c.pat = Math.min(c.max, c.pat + c.max * 0.05); buzz(12); return; }
  o.done = true; sfx.drop(); burst(sx + 70, 140, 8, ['#9be37a', '#ffffff'], 'star', 0.5); buzz(12);
  if (G.tut) tutEvent('deliver');
  if (c.order.every(o => o.done)) complete(c);
}
function complete(c) {
  const sx = SLOTX[c.slot], f = isFinite(c.max) ? c.pat / c.max : 0.8;
  G.combo++; G.bestCombo = Math.max(G.bestCombo, G.combo);
  const mult = 1 + 0.08 * Math.min(G.combo - 1, 5);
  const fav = c.order.some(o => PROD[o.p].ch === c.ch), base = c.order.reduce((s, o) => s + (PROD[o.p].price * (PROD[o.p].ch === c.ch ? 2 : 1) + (o.x ? EXTRAS[o.x].price : 0)) * (o.t || 1), 0);
  const pay = Math.round(base * (1 + 0.15 * S.up.price) * (c.vip ? 3 : 1) * (c.dlv ? 1.4 : 1) * mult * area().pay * (G.matchT > 0 ? 1.3 : 1) * (c.tr === 'rush' ? 1.5 : 1) * (c.meal ? 1.25 : 1) * (G.iftarT > 0 ? 1.25 : 1) * (c.disc || 1) * (S.grow >= 2 ? 1.15 : 1) * (c.ghost ? 2.5 : 1));
  const tip = Math.round(pay * f * 0.2 * (S.help.tips ? 2 : 1) * (c.tr === 'rich' ? 3 : 1) * (G.sea === 'eid' ? 2 : 1) * (1 + 0.3 * frLv(c.ch))) + (c.tr === 'rich' ? 5 : 0);
  G.happy++; if (fav) G.favN++; served(c.ch, sx, 240);
  if (c.tr === 'thief') {   // runs off without paying: tap him to get the money
    c.st = 'run'; c.t = 0; c.rx = 0; c.due = pay + tip; c.dir = sx < 480 ? -1 : 1; c.say = 'سلام يا معلم! 🏃'; c.sayT = 99;
    toast('🕶 النصاب بيجري من غير ما يدفع! دوس عليه', '#ffd0c8'); sfx.whoosh(); if (G.tut) tutEvent('complete'); return;
  }
  const got = c.noteOk ? 0 : pay + tip; if (c.noteOk) S.note.push({ ch: c.ch, a: pay + tip });
  S.money += got; G.earned += got; S.life += got;
  const rp = c.order.find(o => PROD[o.p].rec), fp = c.order.find(o => PROD[o.p].ch === c.ch);
  if (G.revs) G.revs.push({ ch: c.ch, k: CH[c.ch].vip ? 'vip' : c.wed ? 'wed' : c.quest ? 'qst' : c.ghost ? 'ghost' : c.dlv ? 'dlv' : c.noteOk ? 'note' : c.hagOk ? 'hag' : rp ? 'rec' : fav ? 'fav' : f > 0.66 ? 'fast' : 'ok', p: (rp || fp || c.order[0]).p });
  if (S.day >= 3) G.dirt = Math.min(1, (G.dirt || 0) + 0.035);
  for (const o of c.order) S.sold[o.p] = (S.sold[o.p] || 0) + (o.n || 1); S.st.cust++; S.st.wrap += c.order.filter(o => o.p === 'hafoWrap').length; if (c.meal) S.st.meals++; if (c.dlv) S.st.dlv++;
  befriend(c, sx); G.lastCh = c.ch;
  const fm = !CHAL && S.fig[c.ch]; if (fm === 1 && Math.random() < 0.35) { const kp = keyPrice(); S.money += kp; S.life += kp; G.earned += kp; S.st.keys++; addPop(sx, 205, '🔑 اشترى ميدالية +' + ar(kp) + ' ج', '#ffe38a', 19, 1.6); }
  else if (fm === 2 && Math.random() < 0.5) addPop(sx, 205, '🎁 خد ميدالية ببلاش ❤️', '#ffd0ea', 18, 1.5);
  if (c.quest && !CHAL) { S.quest[c.ch] = 1; S.st.qst++; const r = 50 + 10 * S.day; S.money += r; S.life += r; G.earned += r; addPop(sx, 262, '📜 مكافأة الحكاية +' + ar(r) + ' ج', '#ffe9b8', 22, 2); toast('📜 ' + CH[c.ch].n + ': ' + QST[c.ch][1], '#ffe9b8', 4.2); moment(5, c.ch, 'حكاية!', QST[c.ch][1]); }
  if (c.upset && !CHAL) { const r = 25 + 4 * S.day; S.money += r; S.life += r; G.earned += r; S.st.recon++; addPop(sx, 262, '🤝 اتصالحتوا +' + ar(r) + ' ج', '#9be37a', 22, 2); sfx.combo(3); moment(5, c.ch, 'صافيين!', 'رجع زعلان ومشي مبسوط… الأكل الحلو بيصالح 🤝'); }
  if (c.wed) { const nq = 20 + S.day * 4; S.money += nq; S.life += nq; G.earned += nq; addPop(sx, 262, '💸 النقطة +' + ar(nq) + ' ج', '#ffd0ea', 24, 2); sfx.zag(); burst(sx, 150, 30, ['#ff8ae8', '#ffffff', '#ffd23f'], 'heart', 1); moment(6, c.ch, 'زغروطة!', 'أحلى فرح في الحارة، وأكلك كان نجم الليلة 💍'); }
  if (c.ghost) moment(4, c.ch, 'بخخخ!', 'جيت من نص الليل… وأكلك رجّعني للدنيا 👻');
  if (c.legend && c.waves > 0) { c.waves--; c.order = legOrder().map(p => ({ p: pid(p), x: pex(p), done: false })); c.pat = c.max; c.t = 0; c.say = 'كمان! 🌌'; c.sayT = 1.6; }
  else {
    c.st = 'happy'; c.t = 0; c.say = c.upset ? 'خلاص صافيين يا معلم 🤝' : G.sea === 'eid' && Math.random() < 0.5 ? 'كل سنة وانت طيب 🎉' : G.sea === 'ram' && Math.random() < 0.3 ? 'رمضان كريم 🌙' : pick(CH[c.ch].joy); c.sayT = 99;
    if (c.legend) { moment(7, 'cosmic', 'أسطوري!', 'الكون كله شبعان النهارده بفضلك 🌌'); S.st.leg++; const b = 40 + S.day * 6; S.money += b; S.life += b; G.bonus += b; addPop(480, 130, '🌟 مكافأة أسطورية +' + ar(b) + ' ج', '#ffe38a', 30, 2.2); sfx.fanfare(); }
  }
  const rating = f > 0.66 ? ['تحفة!', '#ffd23f'] : f > 0.36 ? ['حلو!', '#9be37a'] : ['ماشي', '#ffe9b8'];
  if (f > 0.66) G.perfect++;
  addPop(sx, 110, rating[0], rating[1], f > 0.66 ? 44 : 34);
  if (fav) { addPop(sx, 160, 'طبقه المفضل! ×٢', '#ff8ae8', 24, 1.4); burst(sx, 160, 10, ['#ff8ae8', '#ffffff'], 'heart', 0.6); }
  if (c.meal) { G.meals++; addPop(sx, 236, '🛍 وجبة الرحمة +٢٥٪', '#ffd9a0', 22, 1.4); }
  addPop(sx, 200, c.noteOk ? '📒 على النوتة ' + ar(pay + tip) + ' ج' : '+' + ar(pay + tip) + ' ج', c.noteOk ? '#ffe9b8' : '#fff3d6', 28, 1.3);
  const n = c.noteOk ? 0 : clamp(Math.round((pay + tip) / 4), 4, 14);
  for (let i = 0; i < n; i++) G.coins.push({ x0: sx + rnd(-30, 30), y0: 220 + rnd(-30, 30), t: -i * 0.05, d: 0.65 + rnd(0, 0.15), k: i });
  burst(sx, 180, f > 0.66 ? 34 : 18, c.vip ? ['#ffd86b', '#b79bff', '#ffffff'] : ['#ffd23f', '#ff5e7a', '#6be3ff', '#9be37a', '#ffffff']);
  burst(sx, 150, 5, ['#ff5e7a'], 'heart', 0.5);
  sfx.cash(); voice(c.ch, 1); buzz(20);
  if (G.combo >= 2) { G.comboT = 1.2; sfx.combo(G.combo); }
  if (G.combo >= 5) moment(1 + G.combo / 100, c.ch, 'كومبو ×' + ar(G.combo) + '!', cnt(G.combo, 'زبون ورا بعض من غير ولا غلطة؟! إيدك دي ولا ماكينة؟', 'زباين ورا بعض من غير ولا غلطة؟! إيدك دي ولا ماكينة؟'));
  if (G.combo === 3 || G.combo === 5 || G.combo % 8 === 0) { G.flash = 0.35; G.flashC = '#ffd23f'; G.shake = 0.25; burst(480, 200, 30, ['#ffd23f', '#ff8a3d', '#ffffff'], 'star', 1.2); sfx.fanfare(); }
  if (G.tut) tutEvent('complete');
}
// station actions
function act(key) {
  G.press[key] = 0.18;
  if (G.power === false && (key.startsWith('tap') || key === 'fryer' || key === 'kettle')) { toast('⚡ الكهربا قاطعة! دوس على أبو حسيبة يشغّل المولّد'); sfx.wrong(); return; }
  if (key in STOCK && G.stock[key] <= 0) { emptyAsk(key); return; }
  const b = G.board;
  if (key === 'sauce' || key === 'ice') {
    const xt = key === 'sauce' ? 's' : 'i';
    if (G.sel && !G.sel.startsWith('src:')) { applyExtra(xt, G.sel); return; }
    if (xt === 's' && (b.st === 'bread' || b.st === 'filled') && !b.sauce) { b.sauce = 1; sfx.squirt(); burst(235, 466, 8, ['#f4ead0', '#ffffff'], 'conf', 0.4); return; }
    const k = Object.keys(SLOT).find(k => G.items[k] && EXTRAS[xt].on.includes(pid(G.items[k])) && !pex(G.items[k]));
    if (k) applyExtra(xt, k); else toast(xt === 's' ? 'حط عيش على اللوح أو اختار ساندوتش، وبعدين دوس على الصوص' : 'مفيش مشروب ساقع جاهز للتلج');
    return;
  }
  if (key === 'bread') { if (b.st === 'empty' && !G.items.board) { b.st = 'bread'; use('bread'); sfx.pop(0); if (G.tut) tutEvent('bread'); } else toast(G.items.board ? 'شيل اللي على اللوح الأول' : 'العيش على اللوح خلاص'); return; }
  if (key === 'spit' || key === 'gfal') {
    if (b.st === 'empty') { toast('حط عيش على اللوح الأول'); sfx.wrong(); return; }
    if (b.st === 'filled') { if (!G.tut && !b.mix && (b.fill === 'chicken' || b.fill === 'gfal') && b.fill !== (key === 'spit' ? 'chicken' : 'gfal')) { b.mix = 'mix'; use(key); sfx.pop(2); burst(235, 470, 8, ['#b46a2a', '#5f8f2a'], 'conf', 0.4); } else toast('حشوة واحدة بس'); return; }
    if (b.st === 'bread') { b.st = 'filled'; b.fill = key === 'spit' ? 'chicken' : 'gfal'; use(key); sfx.pop(2); burst(235, 470, 8, key === 'spit' ? ['#b46a2a', '#d08a3a'] : ['#5f8f2a', '#8fbf43'], 'conf', 0.4); if (G.tut) tutEvent(key); }
    return;
  }
  if (key === 'board' && G.sel) { const s = G.sel; G.sel = null; if (boardAdd(s)) return; }
  if (key === 'board') { if (b.st === 'filled') { b.st = 'wrap'; b.wrapT = 0; sfx.wrap(); if (G.tut) tutEvent('board'); } else if (b.st === 'bread') toast(has('hankSand') ? 'حط فراخ أو فلافل خضرا' : 'حط فراخ من السيخ'); return; }
  if (key === 'gtray') { if (!G.items.gout) { G.items.gout = 'sakrFal'; G.born.gout = G.t; use('gtray'); sfx.pop(3); G.press.gout = 0.3; } else toast('قدّم الفلافل اللي جاهزة الأول'); return; }
  if (key === 'fryer') { if (G.fry < 0 && !G.items.fout) { G.fry = 0; use('fryer'); sfx.sizzle(); } else if (G.fry >= 0) toast('البطاطس بتتقلي...'); else toast('قدّم البطاطس اللي جاهزة الأول'); return; }
  if (key === 'kettle') { if (G.kettle < 0 && !G.items.kout) { G.kettle = 0; use('kettle'); sfx.pour(); } return; }
  if (key.startsWith('tap')) { const i = +key[3]; if (G.taps[i] < 0 && !G.items[key]) { G.taps[i] = 0; use(key); sfx.pour(); if (G.tut) tutEvent(key); } return; }
  if (key === 'trash') {
    if (G.sel) { if (!G.sel.startsWith('src:')) G.items[G.sel] = null; G.sel = null; sfx.trash(); return; }
    if (b.st === 'bread' || b.st === 'filled') { b.st = 'empty'; b.fill = null; b.sauce = 0; b.mix = null; sfx.trash(); burst(235, 470, 10, ['#888', '#c8a070'], 'conf', 0.5); }
    return;
  }
  if (key === 'radio') nextTape();
  if (key === 'vit') { if (!storeItem(G.sel)) { G.sel = null; if (HOLDS.every(h => G.items[h])) return; toast('اسحب أي طلب جاهز هنا عشان تحفظه'); } }
}
function applyExtra(xt, key) {
  const E = EXTRAS[xt], it = key && G.items[key];
  if (!it || !E.on.includes(pid(it))) { toast(xt === 's' ? 'الصوص للشاورما والساندوتش بس' : 'التلج للمشاريب الساقعة بس'); sfx.wrong(); return false; }
  if (pex(it)) { toast('عليه ' + EXTRAS[pex(it)].sh + ' خلاص'); return false; }
  G.items[key] = it + '|' + xt; G.born[key] = G.t; G.sel = null; xt === 's' ? sfx.squirt() : sfx.clink();
  const [x, y] = SLOT[key]; burst(x, y - 30, 8, xt === 's' ? ['#f4ead0', '#ffffff'] : ['#bfe6ff', '#ffffff'], 'star', 0.4); return true;
}
// the hired Zarbotan: hands ready items to whoever ordered them, and dozes off now and then
const HLPX = 175;
function updateHelper(dt) {
  const h = G.hlp; if (h.sayT > 0) h.sayT -= dt; if (h.happy > 0) h.happy -= dt;
  if (h.st === 'sleep') { h.t -= dt; if (h.t <= 0) { h.st = 'idle'; h.cd = 1; } return; }
  if ((h.cd -= dt) > 0) return;
  h.cd = 0.4; if (G.raid && G.raid.shut > 0.5) return;
  for (const key in SLOT) {
    const p = G.items[key]; if (!p || G.sel === key || (G.drag && G.drag.key === key)) continue;
    const c = G.slots.find(c => wants(c, p)); if (!c) continue;
    const [x0, y0] = SLOT[key], sel = G.sel; G.fly.push({ p, x0, y0, x1: SLOTX[c.slot], y1: 200, t: 0 }); deliver(c, key); G.sel = sel;
    h.cd = 3.2; h.happy = 0.8; if (Math.random() < 0.22) { h.st = 'sleep'; h.t = rnd(7, 11); h.say = 'هريّح خمسة 😴'; h.sayT = 1.6; }
    return;
  }
}
function wakeHelper() { const h = G.hlp; h.st = 'idle'; h.cd = 0.6; h.say = pick(['صحيت صحيت 😪', 'أنا صاحي أصلًا!', 'حاضر يا معلم']); h.sayT = 1.6; voice('zarb', 2); }
// ---------- stock & Abu Hasiba ----------
function use(k) {
  if (!G.stock || !(k in G.stock)) return;
  G.stock[k] = Math.max(0, G.stock[k] - 1);
  if (G.stock[k] === 0) { if (S.help.autoAH) requestRestock(k); else if (!G.ah.warned[k]) { G.ah.warned[k] = 1; toast(STOCKN[k] + ' خلص! دوس عليه وأبو حسيبة يجيب', '#ffd0c8'); } }
}
function emptyAsk(k) { if (G.ah.q.includes(k) || G.ah.tgt === k) { toast('أبو حسيبة جايبه أهو...'); return; } requestRestock(k); }
function requestRestock(k) {
  const a = G.ah; if (a.q.includes(k) || a.tgt === k) return;
  a.q.push(k); sfx.meow(); if (a.st === 'sit') { a.say = pick(['حاضر يا معلم', 'من عينيا', 'ثواني وجاي']); a.sayT = 1.4; }
}
function ahTarget(k) { if (k === 'gen') return [ST.disp.x + 105, ST.disp.y + 66]; if (k.startsWith('tap')) return [tapX(+k[3]), ST.disp.y + 66]; const r = ST[k]; return [r.x + r.w / 2, r.y + r.h / 2]; }
function updateAH(dt) {
  const a = G.ah; if (a.sayT > 0) { a.sayT -= dt * 0.65; if (a.sayT <= 0) a.say = null; }
  if (S.help.autoAH) for (const k in G.stock) if (G.stock[k] <= 0 && stationOn(k) && !a.q.includes(k) && a.tgt !== k) a.q.push(k);
  a.t += dt;
  if (a.st === 'sit') { if (a.q.length && a.sayT <= 1) { a.tgt = a.q.shift(); a.st = 'go'; a.t = 0; a.from = [AHX, AHY]; a.to = ahTarget(a.tgt); a.d = 0.25 + Math.hypot(a.to[0] - AHX, a.to[1] - AHY) / 1400; sfx.box(); } return; }
  if (a.st === 'go' || a.st === 'back') {
    const k = Math.min(1, a.t / a.d), e = easeOut(k);
    a.x = lerp(a.from[0], a.to[0], e); a.y = lerp(a.from[1], a.to[1], e) - Math.sin(k * Math.PI) * 70;
    if (k >= 1) { if (a.st === 'go') { a.st = 'work'; a.t = 0; a.wd = 2.2 * (1 - 0.14 * S.up.ah); } else { a.st = 'sit'; a.t = 0; a.x = AHX; a.y = AHY; } }
    return;
  }
  if (a.st === 'work') {
    if (Math.floor(a.t * 6) !== Math.floor((a.t - dt) * 6)) sfx.clack();
    if (a.t >= a.wd) { finishRestock(a.tgt); a.tgt = null; if (a.q.length) { a.tgt = a.q.shift(); a.from = [a.x, a.y]; a.to = ahTarget(a.tgt); a.st = 'go'; } else { a.from = [a.x, a.y]; a.to = [AHX, AHY]; a.st = 'back'; } a.t = 0; a.d = 0.25 + Math.hypot(a.to[0] - a.x, a.to[1] - a.y) / 1400; }
  }
}
function finishRestock(k) {
  if (k === 'gen') { G.power = true; const [x, y] = ahTarget(k); addPop(x, y - 40, '💡 النور رجع!', '#ffe38a', 26); sfx.ding(); burst(x, y, 14, ['#ffe066', '#ffffff'], 'star', 0.6); return; }
  const g = mkGrp(k), wh = !CHAL && (S.wh[g] || 0) > 0; if (wh) S.wh[g]--;
  const c = wh ? 0 : Math.min(S.money, mkPrice(g)); S.money -= c; G.spent += c;
  G.stock[k] = capOf(k); delete G.ah.warned[k];
  const [x, y] = ahTarget(k); addPop(x, y - 40, '+' + ar(capOf(k)) + (wh ? '  📦 من المخزن' : c ? '  -' + ar(c) + ' ج' : ''), wh ? '#9be3ff' : c > RESTOCK ? '#ffb38a' : '#9be37a', 24); sfx.ding(); burst(x, y, 10, ['#ffd23f', '#c8a070', '#ffffff'], 'conf', 0.5);
}
const stationOn = k => k === 'freezer' ? has('shawqyIce') : stationVisible(k);
function ahTap() {
  const a = G.ah;
  if (G.power === false) { if (!a.q.includes('gen') && a.tgt !== 'gen') { requestRestock('gen'); a.say = 'حاضر، هشغّل المولّد'; a.sayT = 1.2; } return; } let ks = Object.keys(G.stock).filter(k => stationOn(k) && G.stock[k] <= 0);
  if (!ks.length) ks = Object.keys(G.stock).filter(k => stationOn(k) && G.stock[k] < capOf(k) / 2);
  ks = ks.filter(k => !a.q.includes(k) && a.tgt !== k);
  if (!ks.length) { a.say = a.st === 'sit' ? 'كله مليان يا معلم' : 'شغال أهو!'; a.sayT = 1.4; sfx.meow(); return; }
  ks.forEach(requestRestock);
}
function nextTape() {
  const ks = Object.keys(TAPES).filter(k => S.tapes[k]); S.tape = ks[(ks.indexOf(S.tape) + 1) % ks.length]; save();
  if (musV <= 0) { musV = 0.6; applyVol(); saveOpt(); }
  toast('📼 ' + TAPES[S.tape].n, '#fff3d6'); sfx.box();
}
function stationVisible(k) {
  if (k === 'gfal') return has('hankSand');
  if (k === 'gtray' || k === 'gout') return has('sakrFal');
  if (k === 'fryer' || k === 'fout') return has('jabFries');
  if (k === 'kettle' || k === 'kout') return has('zoolTea');
  if (k.startsWith('tap')) return has(TAPS[+k[3]].p);
  if (k === 'freezer') return false;
  if (k === 'sauce') return !!S.extras.s;
  if (k === 'ice') return !!S.extras.i;
  return true;
}
function srcAt(x, y) {
  const f = ST.freezer; if (has('shawqyIce') && x > f.x && x < f.x + f.w && y > f.y && y < f.y + f.h) return 'freezer';
  for (const k of kioskKeys()) { const s = SRC[k]; if (Math.abs(x - s.x) < (G.sea ? 17 : 15) && y > s.y - 46 && y < s.y + 4) return k; }
  return fruitAt(x, y);
}
function stationAt(x, y) {
  const order = ['radio', 'spit', 'bread', 'board', 'gfal', 'gtray', 'fryer', 'kettle', 'trash', 'vit', 'sauce', 'ice'];
  for (let i = 0; i < 4; i++) { const tx = tapX(i); if (stationVisible('tap' + i) && x > tx - 24 && x < tx + 24 && y > ST.disp.y && y < 530) return 'tap' + i; }
  for (const k of order) { const r = ST[k]; if (stationVisible(k) && x > r.x && x < r.x + r.w && y > r.y && y < r.y + r.h) return k; }
  return null;
}
function itemAt(x, y) {
  for (const k of HOLDS) { if (!G.items[k]) continue; const [sx, sy] = SLOT[k]; if (Math.abs(x - sx) < (HOLDS.length > 2 ? 12 : 18) && y > sy - 54 && y < sy + 8) return k; }
  for (const k in SLOT) { if (!G.items[k] || HOLDS.includes(k)) continue; const [sx, sy] = SLOT[k]; if (Math.abs(x - sx) < 38 && y > sy - 80 && y < sy + 14) return k; }
  return null;
}
const inVit = (x, y) => { const r = ST.vit; return x > r.x && x < r.x + r.w && y > r.y && y < r.y + r.h; };
function storeItem(key) {
  if (!key || key.startsWith('src:') || HOLDS.includes(key) || !G.items[key]) return false;
  const h = HOLDS.find(h => !G.items[h]); if (!h) { toast('الفاترينة مليانة'); sfx.wrong(); return false; }
  G.items[h] = G.items[key]; G.items[key] = null; G.born[h] = G.t; G.sel = null; sfx.drop(); return true;
}

// ---------- tutorial ----------
const TUT = [
  { txt: ['أهلاً بيك في عربية الرحمة!', 'زباين عالم الرحمة جعانين، تعالى نعلّمك.'], tap: 1 },
  { txt: ['ده الحافوزليق، وطلبه مرسوم جنبه:', 'شاورما الحافوزليق وعصير العاعاعوط'], tap: 1, hl: 'order', spawn: ['hafo', ['hafoWrap', 'aaoJuice'], 0] },
  { txt: ['دوس على العيش'], hl: 'bread' },
  { txt: ['دوس على سيخ الشاورما عشان تحط فراخ'], hl: 'spit' },
  { txt: ['دوس على اللوح عشان تلف الساندوتش'], hl: 'board' },
  { txt: ['اسحب الشاورما للحافوزليق', 'أو دوس عليها وبعدين دوس عليه'], hl: 'drag:board' },
  { txt: ['دوس على حنفية العصير الأحمر'], hl: 'tap0' },
  { txt: ['استنى العصير يتملي، وبعدين اسحبه للحافوزليق'], hl: 'drag:tap0' },
  { txt: ['ده أبو حسيبة، قاعد في الكشك جنبك.', 'كل حاجة ليها كمية، ولما تخلص دوس عليها', 'وأبو حسيبة يجيبلك تاني بجنيهين.'], tap: 1, hl: 'ah' },
  { txt: ['برافو! 🎉', 'القلب اللي تحت الطلب هو صبر الزبون.', 'قدّم ورا بعض من غير غلط عشان تعمل كومبو.'], tap: 1 },
];
function tutEnter() { const st = TUT[G.tut.step]; G.tut.t = 0; if (st.spawn) G.tut.pend = st.spawn; }
function tutNext() {
  G.tut.step++;
  if (G.tut.step >= TUT.length) { G.tut = null; S.tut = 1; save(); toast('اليوم بدأ! يلا بينا', '#9be37a'); G.spawnT = 1; sfx.fanfare(); return; }
  tutEnter();
}
function tutEvent(e) {
  const st = TUT[G.tut.step];
  if (st.hl === e) tutNext();
  else if (st.hl === 'drag:board' && e === 'deliver') tutNext();
  else if (st.hl === 'drag:tap0' && e === 'complete') setTimeout(() => G.tut && tutNext(), 900);
}
function tutRect() {
  const st = TUT[G.tut.step]; if (!st.hl) return null;
  if (st.hl === 'ah') return { x: 866, y: 140, w: 92, h: 160 };
  if (st.hl === 'order') return { x: SLOTX[0] - 80, y: 56, w: 200, h: CT - 50 };
  if (st.hl === 'drag:board') return { x: 160, y: 420, w: 150, h: 96 };
  if (st.hl === 'drag:tap0') return { x: tapX(0) - 30, y: 400, w: 60, h: 120 };
  if (st.hl.startsWith('tap')) return { x: tapX(0) - 26, y: ST.disp.y + 10, w: 52, h: 210 };
  const r = ST[st.hl]; return r ? { x: r.x, y: r.y, w: r.w, h: r.h } : null;
}
function tutAllows(kind, key) {
  if (!G.tut) return true; const st = TUT[G.tut.step];
  if (st.tap) return false;
  if (kind === 'station') return st.hl === key;
  if (kind === 'item') return st.hl === 'drag:' + key;
  if (kind === 'cust') return st.hl && st.hl.startsWith('drag:');
  return false;
}

// ---------- input ----------
let BT = [], UPFN = null;   // UPFN runs on the next pointerup: phones only allow sharing from a finished tap
function btn(x, y, w, h, fn, id = '', slide = false) { BT.push({ x, y, w, h, fn, id, slide }); }
function hitBT(x, y, f) { for (let i = BT.length - 1; i >= 0; i--) { const b = BT[i]; if ((!f || f(b)) && x >= b.x && x <= b.x + b.w && y >= b.y && y <= b.y + b.h) return b; } return null; }
function toGame(e) {
  const r = cv.getBoundingClientRect();
  if (ROT) return { x: (e.clientY - r.top) / SC, y: (r.right - e.clientX) / SC };
  return { x: (e.clientX - r.left) / SC, y: (e.clientY - r.top) / SC };
}
cv.addEventListener('pointerdown', e => {
  e.preventDefault(); ac();
  const { x, y } = toGame(e); ptr = { x, y };
  if (OVL) { const b = hitBT(x, y, b => b.id === 'ovl'); if (b) { if (b.slide) slideB = b; b.fn(x, y); } return; }
  const hud = hitBT(x, y, b => b.id === 'hud'); if (hud) { hud.fn(x, y); return; }
  if (G.state !== 'play') { const b = hitBT(x, y); if (b) b.fn(x, y); return; }
  if (G.paused) { const b = hitBT(x, y, b => b.id === 'pause'); if (b) b.fn(x, y); return; }
  if (G.tut && TUT[G.tut.step].tap) { if (G.tut.t > 0.5) { sfx.tap(); tutNext(); } return; }
  const rb = hitBT(x, y, b => b.id === 'raid'); if (rb) { rb.fn(x, y); return; }
  const th = runAt(x, y); if (th) { catchThief(th); return; }
  const hg = hagAt(x, y); if (hg) { hagAnswer(hg[0], hg[1]); return; }
  if (G.bird && Math.hypot(x - G.bird.x, y - G.bird.y) < 64) {
    burst(G.bird.x, G.bird.y, 22, ['#e53935', '#ffd23f', '#ffffff']); addPop(G.bird.x, G.bird.y - 30, 'مسكته! +١٠', '#9be37a', 32);
    S.money += 10; G.earned += 10; G.coins.push({ x0: G.bird.x, y0: G.bird.y, t: 0, d: 0.6, k: 0 }); G.bird = null; sfx.squawk(); sfx.cash(); buzz(30); return;
  }
  if (G.hlp && G.hlp.st === 'sleep' && Math.abs(x - HLPX) < 42 && y > 228 && y < CT + 12) { wakeHelper(); return; }
  if (!G.tut && x > 866 && y > 140 && y < CT && !fruitAt(x, y)) { ahTap(); return; }
  const it = itemAt(x, y);
  if (it && tutAllows('item', it)) { G.drag = { key: it, x, y, sx: x, sy: y, moved: false }; sfx.pick(); return; }
  const sk = srcAt(x, y);
  if (sk && tutAllows('src')) { const s = SRC[sk]; if (s.st && G.stock[s.st] <= 0) { emptyAsk(s.st); return; } G.drag = { key: 'src:' + sk, x, y, sx: x, sy: y, moved: false }; sfx.pick(); return; }
  if (G.sel) { const c = custAt(x, y); if (c && tutAllows('cust')) { deliver(c, G.sel); return; } }
  if (!G.tut && G.dirt > 0.04 && y > CT - 34 && y < CT + 10 && x > 140 && x < 860) { G.wipe = { x, y, d: 0 }; return; }
  const k = stationAt(x, y);
  if (k && tutAllows('station', k)) { if (k === 'trash' || k === 'vit' || k === 'sauce' || k === 'ice' || k === 'board' || !G.sel) act(k); else { G.sel = null; act(k); } return; }
  if (!G.tut) G.sel = null;
});
cv.addEventListener('pointermove', e => { const p = toGame(e); ptr = p; if (slideB) slideB.fn(p.x, p.y); if (G.wipe) wipeTo(p.x, p.y); if (G.drag) { G.drag.x = p.x; G.drag.y = p.y; if (Math.hypot(p.x - G.drag.sx, p.y - G.drag.sy) > 10) G.drag.moved = true; } });
addEventListener('pointerup', e => {
  if (UPFN) { const f = UPFN; UPFN = null; try { f(); } catch (err) { } }
  slideB = null; G.wipe = null; if (!G.drag) return; const p = toGame(e), d = G.drag; G.drag = null;
  if (!d.moved) { G.sel = G.sel === d.key ? null : d.key; return; }
  const c = custAt(p.x, p.y);
  if (c && tutAllows('cust')) { deliver(c, d.key); return; }
  const bd = ST.board; if (p.x > bd.x && p.x < bd.x + bd.w && p.y > bd.y && p.y < bd.y + bd.h && boardAdd(d.key)) return;
  if (!G.tut && inVit(p.x, p.y) && storeItem(d.key)) return;
  for (const xt in EXTRAS) { const sk = EXTRAS[xt].st, r = ST[sk]; if (!G.tut && stationVisible(sk) && !d.key.startsWith('src:') && p.x > r.x && p.x < r.x + r.w && p.y > r.y && p.y < r.y + r.h) { applyExtra(xt, d.key); return; } }
  const r = ST.trash; if (!G.tut && !d.key.startsWith('src:') && p.x > r.x && p.x < r.x + r.w && p.y > r.y && p.y < r.y + r.h) { G.items[d.key] = null; sfx.trash(); return; }
  sfx.drop();
});

// ---------- update ----------
function update(dt) {
  G.t += dt;
  moneyBounce = Math.max(0, moneyBounce - dt * 3);
  dispMoney = lerp(dispMoney, S.money, Math.min(1, dt * 6)); if (Math.abs(dispMoney - S.money) < 0.5) dispMoney = S.money;
  G.parts = (G.parts || []).filter(p => { p.t += dt; p.x += p.vx * dt; p.y += p.vy * dt; p.vy += 600 * dt; p.vx *= 0.99; p.r += p.vr * dt; return p.t < p.life; });
  G.pops = (G.pops || []).filter(p => (p.t += dt) < p.life);
  updateWalkers(dt);
  if (G.toast) { G.toast.t -= dt; if (G.toast.t <= 0) G.toast = null; }
  G.achT = (G.achT || 0) - dt; if (G.achT <= 0 && !G.toast) { G.achT = 1; checkAch(); }
  musicLive = !(G.state === 'play' && G.paused) || OVL === 'set';
  if (G.state === 'shop') return;
  if (G.state === 'story') { G.storyT += dt; return; }
  if (G.state === 'intro') { G.introT += dt; return; }
  if (G.state === 'end') { if (G.endPh === 'rev') { G.revT += dt; revTick(dt); return; } G.endT += dt; sumTick(dt); const st = G.stars || 0; [0.9, 1.4, 1.9].forEach((tt, i) => { if (i < st && G.endT - dt < tt && G.endT >= tt) { sfx.star(i); burst(380 + i * 100, G.endY + 110, 24, ['#ffd23f', '#ffffff', '#ff8a3d'], 'star'); } }); return; }
  if (G.state === 'wheel') { updWheel(dt); return; }
  if (G.state === 'title' && !OVL && !CHAL && CLOUD.on && !syncMeta.uid && !S.cloudHint && S.day >= 3 && G.t > 4 && G.state !== 'wheel') { S.cloudHint = 1; save(); toast('☁️ تقدر تحفظ تقدّمك بحساب جوجل من ⚙ الإعدادات', '#ffe9b8', 3.5); }
  if (G.state === 'title' && !OVL && !CHAL && S.day >= 2 && S.tut && wheelDue() && G.t > 1.5) { streakTick(); G.state = 'wheel'; G.whl = { a: 0, v: 0, st: 'idle', t: 0 }; }
  if (G.state !== 'play' || G.paused) return;
  G.coins = G.coins.filter(c => { c.t += dt; if (c.t >= c.d) { moneyBounce = 1; sfx.coin(c.k); return false; } return true; });
  if (G.fly) G.fly = G.fly.filter(f => (f.t += dt) < 0.35);
  if (G.flash > 0) G.flash -= dt; if (G.shake > 0) G.shake -= dt; if (G.comboT > 0) G.comboT -= dt;
  for (const k in G.press) G.press[k] -= dt;
  // stations
  const b = G.board;
  if (b.st === 'wrap') { b.wrapT += dt; if (b.wrapT > 0.42) { const rc = recipeOf(b); G.items.board = rc + (b.sauce && EXTRAS.s.on.includes(rc) ? '|s' : ''); G.born.board = G.t; b.st = 'empty'; b.fill = null; b.sauce = 0; b.mix = null; sfx.ding(); burst(235, 460, 10, ['#ffd23f', '#ffffff'], 'star', 0.5); if (PROD[rc].rec && !S.rec[rc]) discover(rc); } }
  const pw = G.power !== false;
  if (pw) for (let i = 0; i < 4; i++) if (G.taps[i] >= 0) { G.taps[i] += dt; if (G.taps[i] >= dur(1.3)) { G.taps[i] = -1; G.items['tap' + i] = TAPS[i].p; G.born['tap' + i] = G.t; sfx.ding(); } }
  if (G.fry >= 0 && pw) { G.fry += dt; if (G.fry >= dur(2.6)) { G.fry = -1; G.items.fout = 'jabFries'; G.born.fout = G.t; sfx.ding(); burst(465, 470, 8, ['#f4c430', '#ffffff'], 'star', 0.4); } }
  if (G.kettle >= 0 && pw) { G.kettle += dt; if (G.kettle >= dur(1.6)) { G.kettle = -1; G.items.kout = 'zoolTea'; G.born.kout = G.t; sfx.ding(); } }
  const tut = !!G.tut;
  updateAH(dt);
  if (!tut && pw) {   // helpers bought in the shop
    const st = G.stock;
    if (S.help.autoTea && has('zoolTea') && G.kettle < 0 && !G.items.kout && st.kettle > 0) { G.kettle = 0; use('kettle'); }
    if (S.help.autoFry && has('jabFries') && G.fry < 0 && !G.items.fout && st.fryer > 0) { G.fry = 0; use('fryer'); }
    if (S.help.autoTap) for (let i = 0; i < 4; i++) { const k = 'tap' + i; if (stationVisible(k) && G.taps[i] < 0 && !G.items[k] && st[k] > 0) { G.taps[i] = 0; use(k); } }
  }
  if (tut) { G.tut.t += dt; const p = G.tut.pend; if (p && !G.slots[p[2]]) { makeCust(p[0], p[1], p[2]); G.tut.pend = null; } }
  else {
    G.dayT += dt;
    if (G.time > 0) {
      G.time = Math.max(0, G.time - dt);
      const sec = Math.ceil(G.time); if (G.time < 10 && sec !== G.lastTick) { G.lastTick = sec; sfx.tick(); }
      fast = G.time < 15 && G.time > 0;
      G.spawnT -= dt; if (G.spawnT <= 0) G.spawnT = spawn() ? Math.max(5.5, 9 - S.day * 0.45) * (1 - 0.025 * Object.keys(S.menu).length) * area().sp * (G.matchT > 0 ? 0.6 : 1) * (G.iftar && !G.iftar.on ? 1.5 : G.iftarT > 0 ? 0.65 : 1) * (S.rate >= 4.5 ? 0.9 : S.rate <= 2 ? 1.1 : 1) * rnd(0.75, 1.2) : 1;
      if (G.time === 0) { toast('الوقت خلص! خلّص الزباين اللي فاضلين', '#ffd0c8'); sfx.bell(); }
    }
  }
  const shut = G.raid && G.raid.shut > 0.5;
  for (let i = 0; i < 4; i++) {
    const c = G.slots[i]; if (!c) continue;
    c.t += dt; if (c.shake > 0) c.shake -= dt;
    if (c.sayT > 0) { c.sayT -= dt * 0.55; if (c.sayT <= 0 && c.st === 'wait') c.say = null; }
    if (c.st === 'wait' && c.tr === 'picky' && c.pickT > 0 && !tut) { c.pickT -= dt; if (c.pickT <= 0) pickyChange(c); }
    if (c.st === 'wait' && c.hag === 1 && !tut && (c.hagT -= dt) <= 0) hagAnswer(c, false);
    if (c.st === 'in' && c.t > 0.45) { c.st = 'wait'; c.t = 0; }
    else if (c.st === 'run') { c.rx = c.dir * Math.pow(Math.min(1, c.t / 1.8), 2) * 560; if (c.t > 1.8) { toast('النصاب هرب بـ' + ar(c.due) + ' ج 😤', '#ffd0c8'); G.slots[i] = null; } }
    else if (c.st === 'wait' && !tut && isFinite(c.max) && !shut) {
      c.pat -= dt * (G.dirt >= 0.5 ? 1.2 : 1);
      if (c.pat <= 0) { c.st = 'angry'; c.t = 0; c.say = pick(['مفيش رحمة!', 'أنا ماشي!', 'إيه البطء ده؟!']); c.sayT = 99; G.angry++; if (!CHAL && POOL.includes(c.ch) && !c.ghost && !c.quest) { if (c.upset) { S.fr[c.ch] = Math.max(0, (S.fr[c.ch] || 0) - 4); c.say = 'كده خلاص... 💔'; } else S.upset = { ch: c.ch }; } if (G.revs) G.revs.push({ ch: c.ch, k: G.dirt >= 0.5 ? 'dirty' : 'angry' });
        if (c.dlv) c.say = 'الزبون لغى الطلب! 😤';
        if (CHAL && CHAL.endless && !(G.overT > 0)) { CHAL.strikes++; G.shake = 0.3; if (CHAL.strikes >= 3) { G.overT = 1.4; toast('❌❌❌ ٣ زباين مشيوا زعلانين! خلصت', '#ffd0c8'); } }
        if (G.rival && !c.dlv) { const v = c.order.reduce((s, o) => s + PROD[o.p].price, 0); G.rival.e += v; c.say = 'هروح لسكرتاعوط! 😤'; addPop(RIVX, 150, '+' + ar(v) + ' ج لسكرتاعوط', '#ff8a8a', 18, 1.4); } if (G.combo >= 2) addPop(480, 250, 'الكومبو راح!', '#ff7a6a', 28); G.combo = 0; sfx.wrong(); }
    }
    else if ((c.st === 'happy' || c.st === 'angry') && c.t > 2) { c.st = 'out'; c.t = 0; sfx.whoosh(); }
    else if (c.st === 'out' && c.t > 0.4) G.slots[i] = null;
  }
  if (!tut && G.diaaAt > 0 && G.dayT >= G.diaaAt && G.time > 8) { const free = [0, 1, 2, 3].filter(i => !G.slots[i]); if (free.length) { G.diaaAt = -1; S.diaaNext = 0; const ks = ['cig', 'nut', 'wbr'].sort(() => grand() - 0.5), ord = ks.slice(0, 1 + Math.floor(grand() * 3)); if (ord.length < 3 && grand() < 0.5) ord.push(gpick(owned())); makeCust('diaa', ord, pick(free)); S.seenDiaa = 1; save(); } }
  if (G.diaaHint > 0) G.diaaHint -= dt;
  if (!tut && G.dlvQ && G.dlvQ.length && G.dayT >= G.dlvQ[0] && G.time > 15 && !G.raid) {   // the phone rings and a delivery rider pulls up
    const free = [0, 1, 2, 3].filter(i => !G.slots[i]), busy = G.slots.filter(c => c && (c.st === 'wait' || c.st === 'in')).length;
    if (free.length && busy < (S.day <= 10 ? 3 : 4)) {
      G.dlvQ.shift(); const up = owned().filter(p => !PROD[p].sea && !PROD[p].rec), sl2 = pick(free); makeCust('dlv', [gpick(up), gpick(up)], sl2);
      const c = G.slots[sl2]; c.dlv = 1; c.max = c.pat = S.diff === 'easy' ? 70 : 40; sfx.phone(); toast('📞 طلب دليفري! جهّزه قبل ما الطيار يمشي 🛵', '#ffe38a');
    }
  }
  const U = G.upQ; if (!tut && U && !U.on && G.dayT >= U.at && G.time > 20 && !G.raid && !G.slots.some(c => c && c.ch === U.ch)) {
    const free = roomFor(); if (free) { U.on = 1; S.upset = null; const up = owned().filter(p => !PROD[p].sea), own = OWN[U.ch], ord = [own && has(own) ? own : pick(up)]; if (Math.random() < 0.5 && up.length > 1) ord.push(pick(up.filter(p => p !== ord[0])));
      const sl = pick(free); makeCust(U.ch, ord, sl); const c = G.slots[sl]; c.upset = 1; c.max *= 1.3; c.pat = c.max; c.say = 'لسه زعلان منك من امبارح 😤'; c.sayT = 3; toast('😤 ' + CH[U.ch].n + ' راجع زعلان من امبارح، صالحه بطلب سريع', '#ffd0c8', 3.5); }
  }
  const Q = G.qst; if (!tut && Q && !Q.on && G.dayT >= Q.at && G.time > 20 && !G.raid && !G.slots.some(c => c && c.ch === Q.ch)) {
    const free = roomFor(); if (free) { Q.on = 1; const sl = pick(free); makeCust(Q.ch, Q.ord, sl); const c = G.slots[sl]; c.quest = 1; c.max *= 1.6; c.pat = c.max; c.say = 'محتاجك في خدمة 📜'; c.sayT = 3; sfx.vip(); toast('📜 حكاية ' + CH[Q.ch].n + ': ' + QST[Q.ch][0], '#ffe9b8', 4.5); }
  }
  if (!tut && G.ghostQ && G.ghostQ.length && G.dayT >= G.ghostQ[0] && G.time > 12 && !G.raid) {   // a midnight customer: see-through, wants the kiosk's things, pays 2.5x
    const free = roomFor(); if (free) { G.ghostQ.shift(); const here = G.slots.filter(Boolean).map(c => c.ch), ch = gpick(POOL.filter(c => !here.includes(c))), ord = ['cig', 'nut', 'wbr'].sort(() => grand() - 0.5).slice(0, grand() < 0.4 ? 2 : 1);
      ord.push(gpick(owned().filter(p => !PROD[p].sea))); const sl = pick(free); makeCust(ch, ord, sl); const c = G.slots[sl]; c.ghost = 1; c.max *= 1.3; c.pat = c.max; c.say = 'بخخخ… أنا جاي من نص الليل 👻'; c.sayT = 2.6; G.diaaHint = 6; S.st.ghost++;
      sfx.ghost(); toast('👻 زبون من نص الليل! طلباته عند أبو حسيبة وبيدفع ٢.٥ ضعف', '#d9c8ff', 3); }
  }
  if (!tut) { updateEvents(dt); updateDirt(dt); updateNews(); }
  if (!tut && G.hlp) updateHelper(dt);
  if (!tut && CHAL && CHAL.endless) endlessTick(dt);
  if (!tut && G.birdAt > 0 && G.dayT >= G.birdAt && G.time > 0) { G.birdAt = -1; G.bird = { x: W + 70, y: 150, t: 0 }; toast('امسك سكرتاعوط قبل ما يسرق الدرج!', '#ffd0c8'); sfx.squawk(); }
  if (G.bird) { G.bird.t += dt; G.bird.x -= 150 * dt; G.bird.y = 150 + Math.sin(G.bird.t * 4) * 30; if (G.bird.x < -80) { const s = Math.min(15, S.money); S.money -= s; G.earned -= s; G.bird = null; if (s) toast('سكرتاعوط سرق ' + ar(s) + ' ج!', '#ffd0c8'); sfx.squawk(); } }
  if (!tut && G.time <= 0 && G.slots.every(s => !s) && !G.bird && !G.coins.length) endDay();
}
function endDay() {
  G.state = 'end'; G.endT = 0; G.drag = null; G.sel = null; G.dayDone = S.day; fast = false; G.toast = null; G.raid = null; G.power = true; G.matchT = 0; G.iftarT = 0;
  if (CHAL && CHAL.endless) {
    const sc = Math.max(0, G.earned - G.spent); G.chScore = sc; G.chPrev = REAL.endBest || 0; G.stars = 0; REAL.endBest = Math.max(G.chPrev, sc); REAL.st.endl = Math.max(REAL.st.endl, CHAL.lvl);
    try { localStorage.setItem(KEY, JSON.stringify(REAL)); } catch (e) { }
    sfx.fanfare(); return;
  }
  if (CHAL) {
    const sc = Math.max(0, G.earned - G.spent), b = REAL.chBest && REAL.chBest.d === CHAL.key ? REAL.chBest.s : 0;
    G.chScore = sc; G.chPrev = b; G.stars = 0; if (CHAL.key === dayKey()) REAL.chBest = { d: CHAL.key, s: Math.max(b, sc) };
    try { localStorage.setItem(KEY, JSON.stringify(REAL)); } catch (e) { }
    sfx.fanfare(); return;
  }
  for (const m of G.ms) if (!m.done && m.k === 'noAngry' && G.angry === 0 && G.happy >= 3) missionDone(m, true);
  rateDay();
  if (G.rival) { G.rivalWin = G.earned - G.spent >= G.rival.e; if (G.rivalWin) { G.rivalB = 20 + S.day * 4; S.money += G.rivalB; S.life += G.rivalB; S.rivalW++; if (G.lastCh) moment(4, G.lastCh, 'غلبته!', 'سكرتاعوط قفل عربيته وروّح يعيط 😂'); } }
  const tg = target(S.day), net = G.earned - G.spent; G.stars = net >= tg * 2 ? 3 : net >= tg * 1.5 ? 2 : net >= tg ? 1 : 0;
  if (!G.moment && G.lastCh) G.moment = { pr: 0, ch: G.lastCh, big: G.stars ? 'تحفة!' : 'معلش!', cap: G.stars ? JOKE[G.lastCh] || 'تسلم إيدك يا معلم!' : 'بكره أحسن إن شاء الله، الرحمة واسعة 🤲' };
  if (G.moment) { S.snaps.unshift({ d: S.day, m: G.moment }); S.snaps.length = Math.min(S.snaps.length, 24); }
  S.st.days++; S.st.bestDay = Math.max(S.st.bestDay, net);
  G.brI = S.br ? Math.round(BRI[S.br] * (0.85 + Math.random() * 0.3)) : 0; S.money += G.brI; S.life += G.brI;
  S.stars[S.day] = Math.max(S.stars[S.day] || 0, G.stars); S.best = Math.max(S.best, G.bestCombo); if (G.stars === 3) S.st.s3 = 1;
  if (G.stars) S.day++; save();
  G.revT = 0; G.revShake = 0; if (G.posts && G.posts.length) G.endPh = 'rev'; else startSummary();
}
// random day events, the legendary wave customer, and missions
function startEvent(k) {
  if (k === 'power') { G.power = false; G.powerT = 0; sfx.power(); G.shake = 0.2; toast('⚡ الكهربا قطعت! دوس على أبو حسيبة يشغّل المولّد', '#ffe38a'); G.ah.say = 'دوس عليا أشغّل المولّد ⚡'; G.ah.sayT = 4; }
  if (k === 'match') { G.matchT = 25; sfx.fanfare(); toast('⚽ ماتش الرحمة بدأ! زحمة والأسعار +٣٠٪', '#9be37a'); }
  if (k === 'raid') { G.raid = { st: 'come', t: 0, x: CLIPX[0] - 40, shut: 0 }; sfx.siren(); toast('🚨 كبسة بلدية! اقفل العربية قبل ما المفتش يوصل', '#ffd0c8'); }
  if (k === 'wed') {   // the groom's family orders for the whole wedding: several of each, a long timer, and النقطة on top
    const free = roomFor(); if (!free || G.raid) return false;
    const here = G.slots.filter(Boolean).map(c => c.ch), ch = gpick(POOL.filter(c => !here.includes(c))), m = gpick(['hafoWrap', 'hankSand', 'mixWrap', 'friesWrap', 'falSand'].filter(has)), dr = gpick(['aaoJuice', 'halaq', 'zarbSmoothie', 'aaotaMilk'].filter(has));
    const n1 = 3 + (S.day >= 9 ? 1 : 0), n2 = 2 + (S.day >= 12 ? 1 : 0), sl = pick(free); makeCust(ch, [m, dr], sl);
    const c = G.slots[sl]; c.wed = 1; c.order[0].n = c.order[0].t = n1; c.order[1].n = c.order[1].t = n2; if (isFinite(c.max)) c.max = c.pat = patienceFor(1) * (1 + 0.4 * (n1 + n2 - 1)) * (1 + 0.1 * frLv(ch));
    c.say = 'الفرح النهارده! 🎊'; c.sayT = 3; sfx.zag(); burst(SLOTX[sl], 150, 26, ['#ff8ae8', '#ffffff', '#ffd23f'], 'conf', 0.9); toast('💍 فرح في الحارة! عايزين ' + ar(n1) + ' ' + PROD[m].n + ' و' + ar(n2) + ' ' + PROD[dr].n, '#ffd0ea', 3.6);
  }
}
function updateEvents(dt) {
  if (G.ev && !G.ev.on && G.dayT >= G.ev.at && G.time > 15 && startEvent(G.ev.k) !== false) G.ev.on = 1;
  if (G.rival && G.time > 0) G.rival.e += target(S.day) * 0.9 / DAYLEN * dt;
  const I = G.iftar; if (I && !I.on && G.dayT >= I.at && G.time > 10) { I.on = 1; G.iftarT = 30; sfx.cannon(); G.shake = 0.4; G.flash = 0.3; G.flashC = '#ffd86b'; toast('🌙 مدفع الإفطار! زحمة الفطار بدأت والأسعار +٢٥٪', '#ffe38a'); }
  if (G.iftarT > 0) G.iftarT -= dt;
  if (G.matchT > 0) G.matchT -= dt;
  if (G.power === false) {
    G.powerT += dt; if (S.help.autoAH && G.powerT > 1.5) requestRestock('gen');
    if (G.powerT > 16 && G.ah.tgt !== 'gen') { G.power = true; G.ah.q = G.ah.q.filter(k => k !== 'gen'); toast('💡 النور رجع لوحده', '#9be37a'); }
  }
  const r = G.raid;
  if (r) {
    r.t += dt;
    if (r.st === 'come') { r.x += 70 * dt; if (r.x >= 470) { r.st = 'fine'; r.t = 0; const f = Math.min(S.money, 15 + S.day * 2); S.money -= f; G.spent += f; toast('🧾 مخالفة! المفتش خد ' + ar(f) + ' ج', '#ffd0c8'); sfx.wrong(); G.shake = 0.3; } }
    else if (r.st === 'closed') { r.shut = Math.min(1, r.shut + dt * 4); r.x += 160 * dt; if (r.x > CLIPX[1] + 60) { r.st = 'open'; r.t = 0; } }
    else if (r.st === 'fine') { if (r.t > 1.6) { r.x += 110 * dt; if (r.x > CLIPX[1] + 60) G.raid = null; } }
    else if (r.st === 'open') { r.shut = Math.max(0, r.shut - dt * 3); if (r.shut <= 0) { G.raid = null; toast('المفتش مشي، افتحنا تاني 😅', '#9be37a'); } }
  }
  const L = G.legend;
  if (L && !L.on && G.dayT >= L.at && G.time > 20) {
    const free = [0, 1, 2, 3].filter(i => !G.slots[i]);
    if (free.length) { L.on = 1; const sl = pick(free); makeCust('cosmic', legOrder(), sl); const c = G.slots[sl]; c.waves = 2; c.legend = 1; c.max = c.pat = 32; toast('🌟 الرحمة الكونية جاية بـ٣ طلبات ورا بعض! خلّصهم قبل التايمر', '#ffe38a'); }
  }
  for (const m of G.ms) if (!m.done && m.k !== 'noAngry' && mProg(m) >= m.n) missionDone(m);
}
// passers-by: neighbours of the hara walking, a tuk-tuk, the bread bike, the gas-cylinder guy, something flying
function updateWalkers(dt) {
  G.walkers = (G.walkers || []).filter(w => { w.x += w.v * w.dir * dt; return w.x > CLIPX[0] - 160 && w.x < CLIPX[1] + 160; });
  G.walkT = (G.walkT ?? 1) - dt; if (G.walkT > 0 || G.walkers.length >= (QL >= 2 ? 1 : 3)) return;
  G.walkT = rnd(3, 6.5);
  const r = Math.random(), dir = Math.random() < 0.5 ? 1 : -1;
  const kind = r < 0.55 ? 'walk' : r < 0.68 ? 'tuk' : r < 0.8 ? 'bike' : r < 0.9 ? 'gas' : 'fly';
  const w = { kind, dir, x: dir > 0 ? CLIPX[0] - 120 : CLIPX[1] + 120, y: 262, seed: rnd(0, 9), s: 0.42, v: rnd(40, 60) };
  if (kind === 'walk') w.ch = pick(WALKERS);
  if (kind === 'tuk') { w.v = 140; w.s = 0.5; w.y = 294; }
  if (kind === 'bike') { w.v = 95; w.s = 0.44; w.y = 286; }
  if (kind === 'fly') { w.ch = S.seenDiaa && Math.random() < 0.5 ? 'diaa' : 'dola'; w.y = rnd(150, 175); w.v = 80; w.s = 0.3; }
  G.walkers.push(w);
}

