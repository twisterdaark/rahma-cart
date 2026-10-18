// ---------- persistent state ----------
const KEY = 'rahma-cart-v4';
const fresh = () => ({ money: 0, day: 1, up: { speed: 0, pat: 0, price: 0, store: 0, ah: 0 }, menu: {}, help: {}, tapes: { rahma: 1 }, tape: 'rahma', tut: 0, stars: {}, best: 0, diff: null, seenDiaa: 0,
  extras: {}, served: {}, album: {}, cos: { aw: 'red', lights: 0, neon: 0, gold: 0 }, cosOwn: { red: 1 }, name: '', story: 0, fin: 0, life: 0, chBest: null, meal: 0, rivalW: 0,
  st: { cust: 0, thief: 0, leg: 0, dlv: 0, meals: 0, wrap: 0, s3: 0, endl: 0, wed: 0, qst: 0, ghost: 0, days: 0, bestDay: 0, recon: 0, keys: 0 }, ach: {}, title: '', endBest: 0, fruitSeen: 0, fr: {}, rec: {}, wh: {}, grow: 0, note: [], rate: 3, wheel: '', pre: null, quest: {}, nightSeen: 0, strk: { k: '', n: 0, b: 0 }, snaps: [], sold: {}, codes: {}, diaaNext: 0, br: 0, ch2: 0, gifts: [], upset: null, fig: {} });
let S = fresh(), saved = null, tutGo = 0;   // tutGo: the tutorial was asked for from the title, so skip the "learn again?" question
function load(o) { const f = fresh(); return Object.assign(f, o, { up: Object.assign(f.up, o.up || {}), tapes: Object.assign(f.tapes, o.tapes || {}), cos: Object.assign(f.cos, o.cos || {}), cosOwn: Object.assign(f.cosOwn, o.cosOwn || {}), st: Object.assign(f.st, o.st || {}), ach: Object.assign(f.ach, o.ach || {}) }); }
try { saved = JSON.parse(localStorage.getItem(KEY) || 'null'); if (saved) S = load(saved); } catch (e) { }
function save() { if (CHAL) return; S.svT = Date.now(); try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { } try { if (CLOUD.user) cloudPush(false); } catch (e) { } }
try { const o = JSON.parse(localStorage.getItem(KEY + '-opt') || 'null'); if (o) { sfxV = o.sv ?? 0.7; musV = o.mv ?? 0.5; voiceOn = o.vo ?? true; } } catch (e) { }
function saveOpt() { try { localStorage.setItem(KEY + '-opt', JSON.stringify({ sv: sfxV, mv: musV, vo: voiceOn, lang: LANG })); } catch (e) { } }
function setLang(l) { LANG = l; ENG = l === 'en'; TRC.clear(); saveOpt(); bgDirty = true; for (const k in SL) SL[k].sig = ''; document.title = ENG ? 'Rahma Cart' : 'عربية الرحمة'; }
if (ENG) document.title = 'Rahma Cart';
const DIFFS = {
  easy: { n: 'سهل', d: 'من غير صبر، العب براحتك', c: '#2e9d4a' },
  med: { n: 'متوسط', d: 'الزباين صبرهم طويل', c: '#e08a1e' },
  hard: { n: 'صعب', d: 'صبر قصير وسكرتاعوط بيسرق', c: '#c62828' },
};
// shop: new menu items, 5-level upgrades, helpers that automate a station, and tapes
const MENU_SHOP = [['zarbSmoothie', 140], ['jabFries', 230], ['zoolTea', 200], ['shawqyIce', 290], ['hankSand', 350], ['aaotaMilk', 410], ['sakrFal', 480]];
const UPS = [
  { k: 'speed', n: 'ماكينات أسرع', d: 'الحنفية والقلاية والبراد أسرع', c: [90, 290, 650, 1200, 2000] },
  { k: 'pat', n: 'كراسي بلاستيك', d: 'الزباين بتصبر أكتر', c: [75, 240, 570, 1050, 1730] },
  { k: 'price', n: 'يافطة نيون', d: 'كل الأسعار تزيد ١٥٪', c: [120, 370, 810, 1440, 2300] },
  { k: 'store', n: 'مخزن أكبر', d: 'كل حاجة بتشيل كمية أكبر', c: [60, 220, 510, 960, 1600] },
  { k: 'ah', n: 'قهوة لأبو حسيبة', d: 'أبو حسيبة بيجيب أسرع', c: [60, 200, 460, 840, 1340] },
];
const HELP = [
  { k: 'autoAH', n: 'أبو حسيبة صاحي', d: 'بيجيب اللي يخلص لوحده', c: 600 },
  { k: 'autoTap', n: 'حنفيات ذكية', d: 'العصير بيتملى لوحده', c: 1050 },
  { k: 'autoTea', n: 'براد أوتوماتيك', d: 'الشاي بيتصب لوحده', c: 750, req: 'zoolTea' },
  { k: 'autoFry', n: 'قلاية أوتوماتيك', d: 'البطاطس بتتقلي لوحدها', c: 850, req: 'jabFries' },
  { k: 'tips', n: 'برطمان البقشيش', d: 'البقشيش بيبقى الضعف', c: 950 },
  { k: 'zarb', n: 'الزربوطان مساعد', d: 'بيقدّم الجاهز للزباين، بس بينام', c: 1150 },
];
const DAYLEN = 90, RESTOCK = 2;
const target = d => d <= 6 ? 30 + d * 22 : 162 + (d - 6) * 15;   // grows slower late, so later days don't pile up
const has = p => BASE.includes(p) || !!S.menu[p] || !!(PROD[p] && PROD[p].rec && S.rec[p]) || !!(PROD[p] && PROD[p].sea && G.sea && SEAS[G.sea].src.includes(p)) || !!(PROD[p] && PROD[p].fr && fruitOn());
const owned = () => Object.keys(PROD).filter(p => !PROD[p].rare && has(p));
function patienceFor(n) {
  const d = S.day, base = S.diff === 'easy' ? Infinity : S.diff === 'hard' ? Math.max(18, 34 - d * 1.5) : Math.max(40, 70 - d * 2.5);
  return base * (1 + 0.15 * S.up.pat) * (1 + 0.35 * (n - 1)) * (S.grow ? 1.1 : 1);
}
const dur = base => base * (1 - 0.12 * S.up.speed);

// ---------- stations ----------
const ST = {
  spit: { x: 20, y: 120, w: 100, h: 180 }, bread: { x: 38, y: 420, w: 100, h: 90 }, board: { x: 150, y: 420, w: 170, h: 100 },
  gfal: { x: 150, y: 318, w: 110, h: 72 }, gtray: { x: 275, y: 318, w: 110, h: 72 }, gout: { x: 290, y: 420, w: 80, h: 100 },
  fryer: { x: 395, y: 330, w: 140, h: 110 }, fout: { x: 425, y: 445, w: 80, h: 85 },
  disp: { x: 560, y: 312, w: 210, h: 120 }, kettle: { x: 785, y: 330, w: 95, h: 110 }, kout: { x: 790, y: 445, w: 85, h: 85 },
  trash: { x: 888, y: 420, w: 64, h: 100 }, vit: { x: 886, y: 326, w: 70, h: 90 }, radio: { x: 140, y: 64, w: 90, h: 56 }, freezer: { x: 14, y: 320, w: 126, h: 88 },
  sauce: { x: 374, y: 446, w: 48, h: 84 }, ice: { x: 508, y: 452, w: 50, h: 78 },
};
const TAPS = [{ p: 'aaoJuice', c: '#e8261c' }, { p: 'halaq', c: '#4a1f08' }, { p: 'zarbSmoothie', c: '#7fb240' }, { p: 'aaotaMilk', c: '#f4f2ec' }];
const tapX = i => ST.disp.x + 30 + i * 50;
const SLOT = { board: [235, 492], gout: [330, 492], fout: [465, 500], tap0: [tapX(0), 500], tap1: [tapX(1), 500], tap2: [tapX(2), 500], tap3: [tapX(3), 500], kout: [832, 500], hold0: [939, 404], hold1: [903, 404] };
const HOLDS = ['hold0', 'hold1'], SLOTS_S = { hold0: 0.5, hold1: 0.5 };
// every ingredient has a quantity; when it runs out Abu Hasiba brings more
const STOCK = { bread: 6, spit: 6, gfal: 6, gtray: 5, fryer: 5, kettle: 6, tap0: 6, tap1: 6, tap2: 6, tap3: 6, freezer: 5 };
const STOCKN = { bread: 'العيش', spit: 'الفراخ', gfal: 'الفلافل الخضرا', gtray: 'فلافل السكرتح', fryer: 'البطاطس', kettle: 'الشاي', tap0: 'عصير العاعاعوط', tap1: 'الكولا', tap2: 'السموذي', tap3: 'اللبن', freezer: 'الآيس كريم', gen: 'المولّد' };
const capOf = k => STOCK[k] + 2 * S.up.store;
const stockN = k => G.stock ? (G.stock[k] ?? 0) : capOf(k);
// things you drag straight from their source: the freezer, and the kiosk shelf for the doctor
const SRC = { freezer: { p: 'shawqyIce', st: 'freezer' }, cig: { p: 'cig', x: 884, y: 132, lb: 'سجاير' }, nut: { p: 'nut', x: 914, y: 132, lb: 'نوتيلا' }, wbr: { p: 'wbr', x: 943, y: 132, lb: 'عيش' },
  kun: { p: 'kun', x: 897, y: 132, lb: 'كنافة' }, qat: { p: 'qat', x: 930, y: 132, lb: 'قطايف' }, kahk: { p: 'kahk', x: 897, y: 132, lb: 'كحك' },
  ngl: { p: 'ngl', x: 884, y: 286, lb: 'زنجلاوي' }, zng: { p: 'zng', x: 912, y: 286, lb: 'زنجوجو\nكوكو' }, koala: { p: 'koala', x: 940, y: 286, lb: 'كوالا' } };
// Abu Hasiba's fruit crate on the counter in front of his chair, from day 3
const FRUITK = ['ngl', 'zng', 'koala'], fruitOn = () => S.day >= 3 || !!CHAL;
const fruitAt = (x, y) => fruitOn() && y > 248 && y < 306 ? FRUITK.find(k => Math.abs(x - SRC[k].x) < 14) || null : null;

// ---------- areas: the cart moves every few days, each place pays and fills up differently ----------
const AREAS = [
  { k: 'hara', n: 'حارة الرحمة', from: 1, pay: 1, sp: 1, fav: [] },
  { k: 'corn', n: 'كورنيش الرحمة', from: 5, pay: 1.1, sp: 0.95, fav: ['floba', 'prince', 'shawqy'] },
  { k: 'stad', n: 'استاد الرحمة', from: 9, pay: 1.2, sp: 0.92, fav: ['abbas', 'prince', 'abkh'] },
  { k: 'space', n: 'محطة الرحمة الفضائية', from: 13, pay: 1.3, sp: 0.9, fav: ['dola', 'zool', 'has'] },
];
let CHAL = null, REAL = null;   // daily challenge: a temporary profile replaces S while it runs
const areaI = () => CHAL ? CHAL.area : AREAS.reduce((a, r, i) => S.day >= r.from ? i : a, 0);
const area = () => AREAS[areaI()];
// seeded randomness for gameplay, so the daily challenge gives everyone the same customers
let RNG = Math.random;
const grand = () => RNG(), gpick = a => a[Math.floor(grand() * a.length)], grnd = (a, b) => a + grand() * (b - a);
function seedRng(s) { RNG = () => { s = s + 0x6D2B79F5 | 0; let t = Math.imul(s ^ s >>> 15, 1 | s); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
const dayKey = () => { const d = new Date(); return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate(); };
const strSeed = s => { let h = 2166136261; for (const c of s) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619); } return h >>> 0; };
const GAME_URL = 'https://twisterdaark.github.io/rahma-cart/';
let VS = null;   // a friend's challenge link (?vs=day~score~name) replays that day's challenge against their score
try { const q = new URLSearchParams(location.search).get('vs'); if (q) { const [k, sc, n] = q.split('~'); if (/^\d{4}-\d{1,2}-\d{1,2}$/.test(k) && isFinite(+sc)) VS = { key: k, s: Math.max(0, Math.round(+sc)), n: (n || '').slice(0, 12) }; } } catch (e) { }
// order add-ons: an item string is 'product|x'
const EXTRAS = {
  s: { n: 'صوص طحينة', sh: 'صوص', d: 'الشاورما والساندوتش والفلافل', on: ['hafoWrap', 'hankSand', 'sakrFal'], price: 3, st: 'sauce' },
  i: { n: 'تلج', sh: 'تلج', d: 'أي مشروب', on: ['aaoJuice', 'halaq', 'zarbSmoothie', 'aaotaMilk', 'zoolTea'], price: 2, st: 'ice' },
};
const EXTRA_SHOP = [['s', 170], ['i', 140]];
const pid = it => it.split('|')[0], pex = it => it.split('|')[1] || '';
const oKey = o => o.x ? o.p + '|' + o.x : o.p;
const oName = it => PROD[pid(it)].n + (pex(it) ? ' ب' + EXTRAS[pex(it)].sh : '');
// customer personalities
const TRAITS = {
  rush: { i: '⚡', n: 'مستعجل', say: 'بسرعة الله يخليك! ⚡' },
  picky: { i: '😒', n: 'رخم' },
  rich: { i: '💰', n: 'كريم', say: 'خد راحتك يا باشا 💰' },
  thief: { i: '🕶', n: 'نصاب' },
  haggle: { i: '🤝', n: 'بيفاصل' },
  note: { i: '📒', n: 'على النوتة' },
};
// combo meals: a sandwich, a side and a drink in one bag, paid 25% more
const MEAL = { main: ['hafoWrap', 'hankSand'], side: ['jabFries', 'sakrFal', 'shawqyIce'], drink: ['aaoJuice', 'halaq', 'zarbSmoothie', 'aaotaMilk', 'zoolTea'] };
function mkMeal(n) {
  const o = k => MEAL[k].filter(has), m = o('main'), sd = o('side'), d = o('drink');
  if (!m.length || !d.length) return null;
  return n >= 3 && sd.length ? [gpick(m), gpick(sd), gpick(d)] : [gpick(m), gpick(d)];
}
// seasons on the game calendar: Ramadan (days 8-10, then every 14 days) and the Eid day after it.
// Abu Hasiba's kiosk shelf sells the season's sweets instead of the doctor's things
const seasonOf = d => d < 8 ? null : (d - 8) % 14 < 3 ? 'ram' : (d - 8) % 14 === 3 ? 'eid' : null;
const SEAS = { ram: { n: 'رمضان', src: ['kun', 'qat'] }, eid: { n: 'العيد', src: ['kahk', 'kun'] } };
const kioskKeys = () => G.sea ? SEAS[G.sea].src : ['cig', 'nut', 'wbr'];
const ownOf = ch => { if (G.sea) for (const p of SEAS[G.sea].src) if (PROD[p].ch === ch) return p; return OWN[ch]; };
const COLD = ['aaoJuice', 'halaq', 'zarbSmoothie', 'aaotaMilk', 'shawqyIce'];

// secret recipes: mixing what you already sell on the board; a found one joins the menu and the recipe book
const REC = {
  mixWrap: { hint: 'عباس عايز بروتين دبل: حشوتين في نفس العيشة', how: 'عيش + فراخ + فلافل خضرا، وبعدين لف' },
  friesWrap: { hint: 'فلوبا بيحب البطاطس جوه الشاورما مش جنبها', how: 'عيش + فراخ + اسحب البطاطس على اللوح، وبعدين لف' },
  iceSand: { hint: 'شمقمق بيحط الآيس كريم في العيش على طول', how: 'عيش + اسحب الآيس كريم على اللوح، وبعدين لف' },
  falSand: { hint: 'الدولازليق بياكل فلافل السكرتح جوه عيشة', how: 'عيش + اسحب فلافل السكرتح على اللوح، وبعدين لف' },
};
const recOk = p => PROD[p].rec.every(q => has(q));
const recipeOf = b => b.fill === 'ice' ? 'iceSand' : b.fill === 'fal' ? 'falSand' : b.mix === 'mix' ? 'mixWrap' : b.mix === 'fries' ? 'friesWrap' : b.fill === 'chicken' ? 'hafoWrap' : 'hankSand';
function boardAdd(key) {   // fries onto a chicken wrap, or falafel / ice cream straight into the bread
  const b = G.board, p = prodOf(key); if (G.tut || !p || pex(p)) return false;
  if (p === 'jabFries' && b.st === 'filled' && b.fill === 'chicken' && !b.mix) b.mix = 'fries';
  else if ((p === 'sakrFal' || p === 'shawqyIce') && b.st === 'bread') { b.st = 'filled'; b.fill = p === 'sakrFal' ? 'fal' : 'ice'; }
  else return false;
  takeItem(key); G.sel = null; sfx.pop(2); burst(235, 470, 8, ['#ffd23f', '#ffffff'], 'conf', 0.4); return true;
}
function discover(k) {
  S.rec[k] = 1; save(); sfx.fanfare(); G.flash = 0.3; G.flashC = '#ffd23f'; burst(235, 440, 30, ['#ffd23f', '#ff8ae8', '#ffffff'], 'star', 1);
  addPop(480, 200, '🔓 وصفة سرية: ' + PROD[k].n, '#ffe38a', 30, 2.6); moment(3, PROD[k].ch, 'وصفة سرية!', 'مين اخترع ' + PROD[k].n + ' ده؟ عبقري! 🤫'); toast('📒 اتسجلت في كتاب الوصفات ودخلت المنيو، و' + CH[PROD[k].ch].n + ' بيدفع فيها الضعف', '#ffe38a');
}
// regulars: every happy visit adds friendship; friends wait longer, tip more, and bring a gift at each new level
const FRL = [6, 18, 40], FRN = ['لسه جديد', 'زبون دايم', 'صاحبك', 'أعز أصحابك'];
const frLv = ch => { const p = (S.fr && S.fr[ch]) || 0; return p >= FRL[2] ? 3 : p >= FRL[1] ? 2 : p >= FRL[0] ? 1 : 0; };
const GIFT = { hafo: ['🪴', 'زرعة'], aao: ['📣', 'ميكروفون'], aaota: ['🎀', 'فيونكة'], hank: ['📹', 'كاميرا'], zarb: ['🧸', 'دبدوب'], jab: ['🌶️', 'شطة'], sakr: ['🍬', 'بونبوني'], has: ['🎵', 'نوتة مزيكا'],
  zool: ['🏺', 'زير'], floba: ['🥖', 'عيش فينو'], abkh: ['⏰', 'منبّه'], prince: ['👑', 'تاج'], abbas: ['🏋️', 'دمبل'], shawqy: ['🍦', 'آيس كريم'], shamq: ['🎈', 'بلونة'], dola: ['🪁', 'طيارة ورق'], barber: ['✂️', 'مقص'], hankL: ['🥤', 'كانز دايت'], richard: ['🥕', 'جزرة'], rasoda: ['🪶', 'ريشة سودا'] };
function befriend(c, sx) {
  if (CH[c.ch].vip || CH[c.ch].rare || CH[c.ch].dlv || c.legend) return;
  const l0 = frLv(c.ch); S.fr[c.ch] = (S.fr[c.ch] || 0) + 1 + (c.hagOk ? 1 : 0) + (c.quest || c.upset ? 3 : 0) + (S.fig[c.ch] === 2 ? 1 : 0);
  const l1 = frLv(c.ch); if (l1 <= l0) return;
  const g = [0, 30, 60, 120][l1]; S.money += g; S.life += g;
  const gf = l1 === 3 && GIFT[c.ch] && !S.gifts.includes(c.ch); if (gf) { S.gifts.push(c.ch); bgDirty = true; moment(5, c.ch, 'هدية!', 'جبتلك ' + GIFT[c.ch][1] + ' ' + GIFT[c.ch][0] + ' تتحط على العربية، عشان احنا صحاب ❤️'); }
  addPop(sx, 262, '❤️ هدية +' + ar(g) + ' ج', '#ffb3d0', 22, 1.8); toast('❤️ ' + CH[c.ch].n + ' بقى ' + FRN[l1] + '! جابلك ' + (gf ? GIFT[c.ch][1] + ' ' + GIFT[c.ch][0] + ' للعربية و' : 'هدية ') + ar(g) + ' ج', '#ffd0ea', gf ? 3.2 : 1.8);
  sfx.vip(); burst(sx, 160, 16, ['#ff8ae8', '#ffffff'], 'heart', 0.8);
}
// haggling: half price for a happy, patient customer, or full price and a grumpy one
function hagAnswer(c, yes) {   // also answers "put it on my tab": he pays tomorrow, double or nothing
  const nt = c.q === 'note'; c.hag = 0; c.sayT = 1.6; voice(c.ch, yes ? 1 : 2);
  if (yes) { if (nt) c.noteOk = 1; else { c.disc = 0.6; c.hagOk = 1; c.pat = c.max; } c.say = nt ? 'ابن حلال! هعدّي عليك بكره 📒' : 'حبيبي يا معلم! 😍'; sfx.combo(3); burst(SLOTX[c.slot], 120, 10, ['#ff8ae8', '#ffffff'], 'heart', 0.6); }
  else { if (isFinite(c.max)) c.pat = Math.max(2, c.pat - c.max * 0.3); c.shake = 0.5; c.say = nt ? 'طيب هدفع... 😒' : 'ماشي يا عم البخيل 😤'; }
}
const HAGB = [[-40, 1], [12, 0]];
function hagAt(x, y) { for (const c of G.slots) if (c && c.hag === 1 && c.st === 'wait') for (const [dx, yes] of HAGB) if (Math.hypot(x - SLOTX[c.slot] - dx, y - 110) < 26) return [c, yes]; return null; }
// wholesale market: each day one ingredient gets pricey and another cheap; crates bought ahead refill for free
const MKG = ['bread', 'spit', 'gfal', 'gtray', 'fryer', 'kettle', 'tap', 'freezer'], WH_MAX = 10, CRATE = 5;
const mkGrp = k => k.startsWith('tap') ? 'tap' : k;
const grpName = g => g === 'tap' ? 'المشاريب' : STOCKN[g];
const grpOn = g => g === 'tap' ? [0, 1, 2, 3].some(i => stationVisible('tap' + i)) : stationOn(g);
function mkFor(d) {   // fixed for each day number, so the shop and the day agree
  if (d < 3 || CHAL) return {};
  const hi = MKG[Math.floor(hash(d * 7.31) * MKG.length)]; let lo = MKG[Math.floor(hash(d * 3.17 + 1) * MKG.length)]; if (lo === hi) lo = MKG[(MKG.indexOf(hi) + 3) % MKG.length];
  return { [hi]: 6 + Math.floor(d / 2), [lo]: 1 };
}
const mkPrice = g => (G.mk && G.mk[g]) ?? RESTOCK;
// the cart grows: a kiosk (a wider vitrine, more patience), then a shop (new front, higher prices)
const GROW = [{ n: 'العربية تبقى كشك', d: 'فاترينة أوسع والزباين بتصبر +١٠٪', c: 3500 }, { n: 'الكشك يبقى محل', d: 'واجهة جديدة والأسعار +١٥٪', c: 9000 }];
function setHolds() {
  HOLDS.length = 2; delete SLOT.hold2;
  if (S.grow) { HOLDS.push('hold2'); SLOT.hold0 = [945, 404]; SLOT.hold1 = [921, 404]; SLOT.hold2 = [897, 404]; SLOTS_S.hold2 = 0.5; }
  else { SLOT.hold0 = [939, 404]; SLOT.hold1 = [903, 404]; }
}
// a day's weather and event, rolled a day ahead so the hara radio can hint at them
function planDay(d) {
  const legend = !CHAL && d % 7 === 0, sea = !CHAL && !legend ? seasonOf(d) : null;
  const night = !CHAL && !legend && !sea && d >= 6 && (!S.nightSeen || grand() < 0.2), wf = !CHAL && d >= 5 && !S.st.wed;
  const wx = !night && !legend && !sea && d >= 2 && grand() < 0.4 ? gpick(['hot', 'rain']) : null;
  const ev = !night && d >= 3 && !legend && sea !== 'ram' && (wf || grand() < 0.55) ? { k: wf ? 'wed' : gpick(d >= 5 ? ['power', 'match', 'raid', 'wed'] : d >= 4 ? ['power', 'match', 'raid'] : ['power', 'match']), at: grnd(22, 50) } : null;
  return { d, wx, ev, night };
}
// hara radio: a funny bulletin mid-day, then a hint about tomorrow
const NEWS = ['الرؤوس السودا اتلمّوا على سلك الكهربا وبصّوا للعربية ساعتين من غير ما يرمشوا 🐦‍⬛', 'العاعاعوط كسب مسابقة أعلى صرخة للسنة التالتة على التوالي', 'الحنكليس فتح قناة يوتيوب عن الحنكلسة وعنده ٣ مشتركين', 'أبو الزول بيقول الأهرامات اتبنت عشان يبقى ليه مكان يقعد فيه',
  'السكرتح اتمنع من البحر بعد ما عض موجة', 'الدولازليق بيحاول يطير بقاله ١٢ سنة ولسه مكمّل', 'فلوبا رجع من فرنسا وبيقول بونجور لكل حاجة حتى الفول',
  'عباس رفع عربية بإيد واحدة، وبعدين رجّعها مكانها عشان صاحبها زعل', 'الهصلاص هصلص في الجنينة ومحدش فهم يعني إيه', 'أبو حسيبة نام في الكشك ٧ ساعات وصحي يسأل: هو أنا نمت؟',
  'الزربوطان بيدوّر على شغل، بس بعد القيلولة', 'إشاعة: اللي يكتب "الرحمة" على يافطة النيون بتنزله فلوس من السما 💸',
  'أبو حسيبة بيقول: اللي يكتب اسمي على اليافطة هيلاقي هدية في المخزن 📦', 'د. ضياء بيحب يشوف اسمه منوّر على اليافطات 🐔', 'العاعاعوط بيصرخ: اكتبوا اسمي على اليافطة! حد يسمعني!', 'الزربوطان مخبّي شريط سري، وبيقول اللي يكتب اسمه هياخده',
  'حلاق الرحمة بيقول: أي حد يقعد على الكرسي بيقوم بنفس القصّة، والكل مبسوط ✂️', 'الزنجلاوي نزل السوق: شكله فراولة وطعمه موز، والعلماء محتارين 🍓', 'الزنجوجوكوكو صحّت الحارة الفجر بصوت الفرخة، وبعدين رجعت نامت في الصندوق 🐔',
  'كوالا لامبور بقت أغلى فاكهة في الحارة، عشان محدش عارف يقشّرها 🐨', 'ريتشارد باكلي واترسون نام في الشغل، وصحي لقى نفسه مترقّي',
  'حنكليس لايت عامل دايت بقاله أسبوع، وأكل ٣ ساندوتشات بس النهارده'];
function newsHint(d, pl) {
  const legend = d % 7 === 0, sea = !legend && seasonOf(d), A = AREAS.reduce((a, r, i) => d >= r.from ? i : a, 0);
  if (A !== areaI()) return 'بيقولوا العربية هتتنقل ' + AREAS[A].n + ' بكره 📍';
  if (legend) return 'بكره الرحمة الكونية نازلة الحارة بطلبات كتير 🌟';
  if (sea === 'ram' && seasonOf(d - 1) !== 'ram') return 'رمضان على الأبواب، بكره الفوانيس هتنوّر 🌙';
  if (sea === 'eid') return 'بكره العيد! الكحك عند أبو حسيبة والبقشيش الضعف 🎉';
  if (!sea && d >= 6 && d % 3 === 0 && S.ch2 < 4) return 'سكرتاعوط بيقول إنه هيفتح عربية قصادك بكره 😤';
  if (pl && pl.night) return 'بكره سهرة لنص الليل… وبيقولوا فيه زباين مش من الدنيا بتظهر 👻';
  if (pl && pl.ev) return { wed: 'بكره فيه فرح في الحارة 💍 جهّز شاورما كتير', match: 'بكره ماتش الرحمة الكبير ⚽ هتبقى زحمة', power: 'شركة الكهربا بتقول ممكن تقطع بكره ⚡', raid: 'البلدية ناوية تعمل كبسة بكره 🚨' }[pl.ev.k];
  if (pl && pl.wx) return pl.wx === 'hot' ? 'الأرصاد: بكره حر نار ☀️ الساقع هيكسّر' : 'الأرصاد: بكره مطر 🌧 جهّز الشاي';
  return null;
}
function updateNews() { const n = G.news; if (n && n.length && G.dayT >= n[0].at && G.time > 8 && !G.toast) { toast('📻 راديو الحارة: ' + n.shift().s, '#cfe4ff', 4.5); sfx.radio(); } }
// end-of-day reviews: three posts about you, and a rating that brings more (or fewer) customers tomorrow
const REV = {
  fast: ['أسرع من صاروخ الرحمة 🚀', 'لسه بقول عايز لقيت الأكل في إيدي', 'خدمة ولا في الفنادق، تسلم إيدك', 'غمّضت عيني وفتحتها لقيت الطلب قدامي ⚡', 'الواد ده إيده فيها موتور 🏎️', 'طلبت وقبل ما أطلّع الفلوس كان جاهز', 'لحقت آكل وأرجع الشغل قبل ما المدير ياخد باله 😎', 'السرعة دي مش طبيعية، أكيد فيه عفريت بيساعده 👀', 'ولا ثانية استنيت، الواحد اتعوّد على الدلع', 'النت عندي أبطأ من العربية دي 📶', 'قلت أصوّر الطابور ملحقتش، مفيش طابور أصلًا 📸', 'ده مش بياع، ده فلاش 🌩️', 'جيت جعان ومشيت مبسوط في دقيقة', 'الأكل وصل قبل الجوع ما يوصل 😂', 'يا ريت المواصلات تمشي بالسرعة دي 🚌', 'عشرة من عشرة، مفيش كلام 🔟', 'أول مرة آكل سخن من غير ما أستنى 🔥', 'خدت طلبي ومشيت، ولا كأني وقفت أصلًا', 'بيشتغل بإيديه الاتنين وإيد تالتة اسمها قلبه ❤️', 'نصحت الحارة كلها: خدمة صاروخ وأكل نضيف'],
  fav: ['عملي {p} زي ما بحبه بالظبط 😍', '{p} هنا أحسن من بتاع أمي، متقولوش لها', '{p} بتاعه حكاية، هحلم بيه النهارده 😴', 'جيت عشان {p} بس، ورجعت عشانه برضه', 'مفيش {p} زي ده في العالمين 🌍', 'اديت {p} عشر نجوم بس الأبلكيشن مرضيش 😂', '{p} ده رجّعني لأيام زمان 🥹', '{v} {p} وحسيت إن الدنيا لسه بخير', 'لو {p} ده بني آدم كنت اتجوزته 💘', 'بقيت مدمن {p}، حد يلحقني 🆘'],
  ok: ['الأكل حلو بس الطابور طوّل شوية', 'كويس، هرجع تاني بكره إن شاء الله', 'ماشي الحال، الصوص كان ناقص حبة', 'الأكل كويس بس الكراسي محتاجة رحمة 🪑', 'مش وحش، بس أنا متعوّد على أكل حماتي 😶', 'يعني… تلاتة ونص، والنص ده عشان ابتسامته', 'الأكل حلو والسعر معقول، بس الزحمة يا جماعة', 'كان ممكن يبقى أحلى بشوية ملح 🧂', 'تمام، مفيش شكوى ومفيش زغروطة برضه', 'العيش كان مقرمش زيادة بس مش مشكلة', 'حلو، بس اللي جنبي خد أحلى مني 👀', 'أكلة محترمة، هرجع أول ما أقبض 💸', 'الساندوتش حلو بس كان نفسي في حاجة ساقعة معاه 🥤', 'مقبول، والقطة اللي في الكشك كانت لطيفة معايا 🐱'],
  angry: ['استنيت لحد ما دقني طولت 😤', 'مشيت جعان، العربية دي محتاجة رحمة', 'نجمة واحدة عشان مفيش أقل من كده', 'طلبت الصبح واستلمت بالليل 🌙', 'الطابور ده كان أطول من طابور العيش ⏳', 'وقفت لحد ما رجليا نمّلت، ومشيت من غير أكل', 'الصبر حلو بس مش للدرجة دي 😤', 'جيت جعان ومشيت جعان وزعلان كمان 😠', 'المرة الجاية هجيب أكلي معايا من البيت 🍱', 'لو فيه نجمة بالسالب كنت اديتها', 'عجّزت وأنا مستني، حد يجيبلي عكاز 🦯', 'خلّصت مسلسل كامل وأنا واقف 📺', 'قالوا رحمة، طلعت عذاب 😩', 'مش راجع تاني… إلا لو جعت أوي', 'اتلغى العشا بتاعي، شكرًا يا عربية الرحمة 🙄'],
  dirty: ['الدبان كان واكل قبلي 🤢', 'الأكل حلو بس الكاونتر محتاج يتمسح يا جماعة', 'الدبانة دي كانت بتاكل معايا من نفس الطبق 🪰', 'لقيت فتافيت من امبارح على الكاونتر 🤢', 'الأكل نضيف بس الكاونتر لأ خالص', 'علبة كانز فاضية فضلت تبصلي طول ما أنا باكل 🥫', 'محتاجين فوطة وشوية ضمير 🧽', 'الطعم عشرة، النضافة صفر 🧹', 'اتصورت سيلفي مع الدبان من كتره 📸'],
  hag: ['فاصلته ووافق، راجل جدع ❤️', 'نزّلّي في السعر وكمان ابتسم، تحفة', 'وفّرت كام جنيه في الفصال، أحلى من الأكل نفسه 😂', 'راجل بيفهم في الأصول، والفصال عنده مقبول 🤝', 'فاصلت بهزار ونزّل بجد، حبيبي يا كبير', 'السعر نزل والضحكة طلعت، صفقة العمر 😁'],
  note: ['سجّلي على النوتة من غير كلام، ابن حلال', 'أول مرة حد يصدقني، هرجع أدفع والله 😅', 'مكانش معايا فكة وقالي ولا يهمك ❤️', 'النوتة بتاعته أطول من نوتة البقال، بس قلبه أكبر 📒', 'هسدّد يوم الخميس، وعد الرحمة 🤞', 'زي البنك بالظبط بس من غير فوايد ولا طوابير 🏦'],
  rec: ['جربت الوصفة السرية… مش هقول لحد 🤫', 'مين اخترع {p} ده؟ عبقري', '{p} ده مش في أي منيو، حاجة من الآخر ✨', 'سألته على السر قالي ده سر الصنعة 🤐', 'طعم جديد خالص، لساني لسه مستغرب 👅', 'أول واحد في الحارة يدوق {p}، فخر 🏆'],
  caught: ['اتمسكت وأنا بجري، بس الأكل كان يستاهل 😅', 'جريت واتقفشت، بس الساندوتش كان يستاهل الغرامة', 'مكنتش ناوي أهرب… رجليا هي اللي جريت 🏃', 'اتقفشت وهدفع، بس الطعم لسه في بُقّي 😋', 'العربية دي ليها حراسة؟ حرّمت 😅', 'كانت محاولة… وأحلى أكلة اتمسكت عشانها'], vip: ['الكون كله بيشكرك 🌌', 'النجوم نفسها نزلت تاكل هنا 🌠', 'طعم كوني، مفيش كلام تاني 🪐', 'لفّيت المجرة كلها ومفيش أكل زي ده 🚀', 'الكون راضي عنك النهارده ✨'], dlv: ['الطلب وصل سخن والطيار مبسوط 🛵', 'الطيار وصل قبل ما أقفل التليفون 📞', 'الأكل وصل سليم والصوص في مكانه 👌', 'لقيت الطيار على الباب وأنا لسه بلبس الشبشب 🩴', 'الطيار سلّم وابتسم، والأكل كان سخن نار 🔥'],
  wed: ['أحلى فرح في الحارة، والأكل كان نجم الليلة 💍', 'الزفة كانت نار والأكل أنار 🎊', 'المعازيم نسيوا العروسة واتلمّوا على الأكل 😂', 'أكل الفرح خلص في خمس دقايق، يبقى تحفة 🎉', 'العريس أكل أكتر من المعازيم كلهم 🤵'], qst: ['وقف جنبي في حكايتي، جدع وابن بلد ❤️', 'ساعدني من غير ما يسأل، ربنا يخليه 📜', 'حكايتي خلصت نهاية سعيدة بفضله 🌟', 'مش بس بيأكّل، ده بيحل مشاكل كمان 🛠️', 'لو الحارة كلها زيه الدنيا تبقى أحلى 🏘️'],
  ghost: ['جيت من نص الليل ومحدش شافني غيرك 👻', 'بخخخ… أحلى أكل في العالم التاني', 'أنا ميت من مية سنة ودي أحلى أكلة كلتها 💀', 'عدّيت من الحيطة عشان أوصل للعربية 🧱', 'هقول لكل العفاريت، استعدوا لزحمة بكره بالليل 👻', 'الأكل سخن والجو برد… ولا أنا اللي بارد؟ 🥶'],
};
const revSeen = [];   // review lines shown lately, so the same line does not come back for a while
// lines for today's weather, season or event, and each regular's own words (good days and bad days)
const REVE = {
  rain: ['الشاي في المطر ده كان حضن ☔', 'المطر بره والدفا عند العربية', 'اتبليت كلي بس الأكل دفّاني من جوه'],
  hot: ['الحر كان نار والساقع كان جنة 🧊', 'التلج ده أنقذ حياتي النهارده', 'لولا العربية دي كنت سيحت في الشارع ☀️'],
  ram: ['أحلى فطار في رمضان، رمضان كريم 🌙', 'المدفع ضرب والأكل كان جاهز، احترافية', 'فطرت هنا وهتسحر هنا، العربية دي بيتي'],
  eid: ['العيدية كلها راحت هنا ومش ندمان 🎉', 'كل سنة وانت طيب يا معلم، الكحك كان تحفة', 'عيد سعيد وأكل أسعد'],
  power: ['النور قطع والأكل فضل منوّر 🔦', 'في الضلمة الطعم كان أحلى، مش عارف ليه', 'الكهربا قطعت بس المعلم مقطعش'],
  match: ['الماتش كان حلو بس الأكل كان أحلى ⚽', 'جووول! … قصدي الساندوتش', 'شجّعت وأكلت وزعّقت، يوم مثالي'],
  raid: ['البلدية جت والعربية فضلت صامدة 💪', 'المفتش مشي والأكل فضل، انتصار', 'كبسة وأكشن وأكل حلو، يوم فيلم'],
  rival: ['سكرتاعوط فاتح قصاده بس ولا يجي جنبه', 'جربت العربية التانية… ورجعت هنا جري', 'المنافسة حلوة، بس المكسب هنا'],
  legend: ['يوم أسطوري وأكل أسطوري 🌟', 'شفت الرحمة الكونية بعيني، وأكلت جنبها!', 'النهارده هيتحكي في كتب التاريخ'],
};
const CRV = {
  hafo: ['حافوزلقت من الطعم، وده مش بيحصل كتير', 'أكل جميل هو، قال الحافوزليق', 'صبر كتير عندي، بس محتجتوش خالص'],
  aao: ['عاعاعاعاعا!!! (ترجمتها: أحلى أكل في حياتي)', 'عاعا… عاعاعا… خمس نجوم عاعا', 'صرخت من الفرحة والجيران افتكروا حصلت حاجة'],
  aaota: ['عيطت من الفرحة، المرة دي مش من البصل 😭', 'دموعي نزلت على الساندوتش وبرضه كان حلو', 'الخدمة دي عاعاعوطتني'],
  hank: ['ودني سمعت الأكل بيتطبخ من أول الشارع 👂', 'حنكلستها صح المرة دي، يا عيني', 'الحنكليس مبسوط، والحنكليس مش بيتبسط بسهولة'],
  zarb: ['كسلان أكتب ريفيو… بس الأكل يستاهل ⭐', 'لو فيه توصيل للسرير كنت اتجوزت العربية', 'زربطتها يا كبير، صحيت مخصوص عشانك'],
  jab: ['جعبقني الطعم جعبقة محترمة', 'الجعبوق بيدي خمس نجوم، والجعبوق مش بيدي نجوم', 'جيت متضايق، ومشيت جعبوقي'],
  sakr: ['السكر في دمي على آخره، بس الحلاوة دي تستاهل', 'سكرتحتني من الحلاوة، هرجع بكره بدري', 'السكرتح سعيد، والسكرتح السعيد خطر 🍬'],
  has: ['هصلص هصلص! (معناها خمس نجوم)', 'عادةً بخطف الأكل، المرة دي دفعت عن طيب خاطر 🐦', 'طرت من البحر مخصوص عشان العربية دي'],
  zool: ['الأهرامات مبسوطة منك، وأنا كمان', 'أكل يستاهل يتنقش على جدران المعبد 🏺', 'من أيام الفراعنة مكلتش كده'],
  floba: ['Magnifique! أحلى من كرواسون باريس', 'Merci يا معلم، خمس نجوم بالفرنساوي', 'فلوبا يحييك ويقولك Bon appétit 🥖'],
  abkh: ['تاني تاني تاني! هاجي بكره تاني', 'أكلت مرة وطلبت تاني وتالت ورابع', 'الأبخنوس بيحبك، والأبخنوس عايز حضن 🤗'],
  prince: ['البرنس ماستناش، والبرنس راضي 👑', 'خدمة تليق بالبرنس، وأنا البرنس', 'عاش يا برنس… قصدي يا معلم'],
  abbas: ['بروتين يا وحش! عضلاتي بتسقف 💪', 'حسبت الماكروز وطلع الطعم ١٠٠٪', 'أكلت هنا ورحت الجيم رفعت الضعف'],
  shawqy: ['برد وحلاوة، زي القطب الشمالي بالظبط 🐻‍❄️', 'الآيس كريم ده رجّعني لطفولتي على الجليد', 'أبو شوقي بيشكرك وبيسلم عليك من التلاجة'],
  shamq: ['إيييي إيييي! (دي ضحكة، متقلقش)', 'شمقمقتني يا جدع، هشمقمق صحابي كلهم', 'ضحكت لحد ما الجيران اشتكوا، والأكل هو السبب'],
  dola: ['طاير من الفرحة، حرفيًا، أنا فوق دلوقتي 🕊', 'دولازلقتني! هرفرف لحد البيت', 'شفت العربية من فوق، وهي أحلى حاجة في {a}'],
  rasoda: ['كااااو… الأكل ده ملعون من حلاوته 🐦‍⬛', 'جينا من الضلمة عشان الساندوتش ده، وكان يستاهل', 'الرؤوس السودا راضية… المرة دي بس', 'كلنا وقفنا على السلك نسقفلك 🖤'],
  barber: ['الأكل ده شيك لدرجة إنه محتاج قصّة شعر ✂️', 'نعيمًا عليا أنا المرة دي', 'قصّيت لزبونين وأنا مستني، ومحدش اشتكى'],
  hankL: ['خفيف ولذيذ، زيي بالظبط', 'الحنكليس الكبير هيغير مني لما يعرف', 'لايت في السعرات، تقيل في الطعم'],
  richard: ['أكلت لحد ما نمت على الترابيزة، خمس نجوم', 'أحسن حاجة عملتها النهارده إني صحيت عشان آكل هنا', 'لو الأكل ببلاش كنت إديته ست نجوم'],
  diaa: ['ده كله صحي على فكرة، أنا دكتور', 'اللي بيحب العربية يبعتلها ٣٠٠ جنيه', 'النوتيلا دي طبيعية ١٠٠٪، أشهد بكده'],
};
const CRB = {
  hafo: 'استنيت كتير أنا، زعلان أنا',
  aao: 'عاااااااع!!! (ترجمتها: اتأخرت جدًا)',
  aaota: 'عيطت من الزعل المرة دي 😢',
  hank: 'ودني سمعت الطابور بيشتم',
  zarb: 'نمت وأنا واقف في الطابور، وصحيت لسه واقف',
  jab: 'الجعبوق مش متجعبق النهارده خالص',
  sakr: 'السكر وقع عندي من كتر الانتظار',
  has: 'هصلص… زعلان. المرة الجاية هخطف الأكل وخلاص',
  zool: 'الأهرامات اتبنت في وقت أقل من طلبي',
  floba: 'Non non non… الانتظار ده مش Magnifique',
  abkh: 'كنت عايز تاني بس ملحقتش آخد أول',
  prince: 'البرنس ميستناش، والبرنس استنى، والبرنس زعلان',
  abbas: 'خسرت عضلات وأنا مستني 😤',
  shawqy: 'الآيس كريم بتاعي ساح قبل ما يوصل',
  shamq: 'إيييي… دي مش ضحكة المرة دي',
  dola: 'طرت ومشيت، ومش راجع غير لما تعتذر',
  barber: 'استنيت لحد ما شعري طوّل تاني ✂️',
  rasoda: 'استنينا لحد ما الليل خلص… كاو 😠',
  hankL: 'خسيت من كتر الانتظار، شكرًا يعني 😒',
  richard: 'نمت وأنا مستني، وصحيت ولسه مستني',
};
const revEv = () => [G.wx, G.sea, G.ev && G.ev.on && G.ev.k, G.rival && 'rival', G.legend && 'legend'].filter(e => e && REVE[e]);
function revLine(k, ch) {   // the character's own line sometimes, a line about today's weather or event sometimes, else the general pool
  const un = a => (a || []).filter(t => !revSeen.includes(t)), good = k === 'fast' || k === 'fav' || k === 'rec', a = REV[k], f = un(a);
  const own = un(good ? CRV[ch] : k === 'angry' && CRB[ch] ? [CRB[ch]] : null), ev = un(k === 'fast' || k === 'ok' ? [].concat(...revEv().map(e => REVE[e])) : null);
  const t = own.length && Math.random() < 0.45 ? pick(own) : ev.length && Math.random() < 0.5 ? pick(ev) : pick(f.length ? f : a); revSeen.push(t); if (revSeen.length > 60) revSeen.shift(); return t;
}
function rateDay() {
  const rv = G.revs || [], bad = rv.filter(r => r.k === 'angry' || r.k === 'dirty'), gd = rv.length - bad.length, gw = gd + G.perfect * 0.3;
  G.rate = rv.length ? Math.round(clamp(1 + 4 * gw / (gw + bad.length * 1.6), 1, 5) * 2) / 2 : 3; S.rate = G.rate;
  const mix = a => a.sort(() => Math.random() - 0.5), sp = mix(rv.filter(r => !['ok', 'fast', 'angry', 'dirty'].includes(r.k))).slice(0, 2);
  const seen = {}; G.posts = [];
  for (const r of [].concat(bad.length ? [pick(bad)] : [], sp, mix(rv.filter(r => r.k === 'fast' || r.k === 'ok')))) {
    if (G.posts.length >= 3 || seen[r.ch]) continue; seen[r.ch] = 1; const b = r.k === 'angry' || r.k === 'dirty';
    G.posts.push({ lk: 3 + Math.floor(Math.random() * (b ? 12 : 60)), ch: r.ch, st: b ? 1 + (Math.random() < 0.4 ? 1 : 0) : r.k === 'ok' ? 3 + (Math.random() < 0.5 ? 1 : 0) : 5, s: tr(revLine(r.k, r.ch)).split('{p}').join(r.p ? tr(PROD[r.p].n) : '').split('{v}').join(tr(MEAL.drink.includes(r.p) ? 'شربت' : 'أكلت')).split('{a}').join(tr(area().n)) });
  }
}
// a dirty counter: crumbs, cans and flies pile up as you serve; past halfway customers lose patience faster. Swipe it clean
const DIRTX = [160, 335, 505, 675, 843];
const dirtN = () => Math.min(5, Math.floor((G.dirt || 0) * 6));
function updateDirt(dt) {
  if (S.day < 3) return;
  G.dirt = Math.min(1, G.dirt + dt * 0.0035);
  if (G.dirt >= 0.5 && !G.dirtWarn) { G.dirtWarn = 1; toast('🪰 الكاونتر اتوسخ والزباين بتقرف! امسحه بصباعك', '#ffe9b8', 2.6); }
  const n = dirtN(); if (n < G.dirtN) { burst(DIRTX[n], CT - 10, 10, ['#ffffff', '#bfe6ff'], 'star', 0.5); sfx.pop(4); if (!n) G.dirtWarn = 0; } G.dirtN = n;
}
function wipeTo(x, y) {
  const w = G.wipe, d = Math.hypot(x - w.x, y - w.y), on = y > CT - 26 && y < CT + 20; w.x = x; w.y = clamp(y, CT - 12, CT + 6);   // only the counter itself can be wiped
  if (!on) return; G.dirt = Math.max(0, G.dirt - d / 650);
  if ((w.d += d) > 70) { w.d = 0; sfx.wipe(); burst(x, y, 3, ['#ffffff', '#bfe6ff'], 'conf', 0.3); }
}
// luck wheel: one free spin on the first visit of each calendar day
const WHEEL = [{ k: 'm', v: 30, s: '٣٠ ج', c: '#e8a42a' }, { k: 'm', v: 60, s: '٦٠ ج', c: '#ff6a2a' }, { k: 'crate', s: 'كرتونة', c: '#a8743e' }, { k: 'm', v: 120, s: '١٢٠ ج', c: '#2e9d4a' },
  { k: 'none', s: 'حظ أوفر', c: '#8a7a8a' }, { k: 'tape', s: 'شريط', c: '#e0388a' }, { k: 'm', v: 250, s: '٢٥٠ ج', c: '#5b3cc4' }, { k: 'aw', s: 'تندة', c: '#2e7fb8' }];
const WHK = 'rahma-cart-wheel';   // the spin day is also kept per device, so a reset or a Google copy can't give a second spin
function wheelDue() { const k = dayKey(); let w = ''; try { w = localStorage.getItem(WHK) || ''; } catch (e) { } return S.wheel !== k && w !== k && !document.getElementById('nm') && (!CLOUD.on || !syncMeta.uid || CLOUD.pulled || CLOUD.st === 'fail' || G.t > 10); }
function spinWheel() { const w = G.whl; if (w.st !== 'idle') return; w.st = 'spin'; w.v = 13 + Math.random() * 7; sfx.tap(); }
function updWheel(dt) {
  const w = G.whl, sg = Math.PI / 4; w.t += dt; if (w.st !== 'spin') return;
  const a0 = w.a; w.a += w.v * dt; w.v *= Math.exp(-dt * 0.85); if (Math.floor(a0 / sg) !== Math.floor(w.a / sg)) sfx.tick();
  if (w.v < 0.25) { w.st = 'done'; w.t = 0; w.prize = wheelGive(WHEEL[((Math.round(-w.a / sg) % 8) + 8) % 8]); S.wheel = dayKey(); try { localStorage.setItem(WHK, S.wheel); } catch (e) { } save(); sfx.fanfare(); burst(480, 250, 40, ['#ffd23f', '#ffffff', '#ff8ae8'], 'star', 1.2); }
}
function wheelGive(p) {
  if (p.k === 'm') { const v = Math.round(p.v * strMul()); S.money += v; return 'كسبت ' + ar(v) + ' ج! 🎉' + (v > p.v ? ' 🔥' : ''); }
  if (p.k === 'tape') { const ks = Object.keys(TAPES).filter(k => !S.tapes[k] && !TAPES[k].lock); if (ks.length) { const k = pick(ks); S.tapes[k] = 1; return 'كسبت ' + TAPES[k].n + '! 📼'; } }
  if (p.k === 'aw') { const ks = Object.keys(AWN).filter(k => !S.cosOwn[k]); if (ks.length) { const k = pick(ks); S.cosOwn[k] = 1; return 'كسبت ' + AWN[k].n + '! ركّبها من زينة العربية'; } }
  if (p.k === 'crate') { const g = pick(MKG.filter(grpOn)); S.wh[g] = Math.min(WH_MAX, (S.wh[g] || 0) + CRATE); return 'كسبت كرتونة ' + grpName(g) + ' في المخزن 📦'; }
  if (p.k === 'none') return 'حظ أوفر المرة الجاية 😅';
  S.money += 80; return 'كسبت ٨٠ ج! 🎉';
}
// side quests: a regular brings a little story and a set order; finishing it pays well and makes you closer friends
const QST = {
  hafo: ['عندي مقابلة مع حمايا النهارده، عايز أكل يرفع راسي قدامه', 'حمايا وافق! وقال هات من الشاورما دي كل جمعة 💍'],
  aao: ['عندي مسابقة صريخ وصوتي راح، محتاج حاجة تصلّح الحنجرة', 'عاعاعاعاعا! الصوت رجع والكاس بتاعنا 🏆'],
  aaota: ['بعيط من الصبح ومش عارفة ليه، يمكن جعانة؟', 'طلعت جعانة فعلًا 😭 دي دموع فرحة دلوقتي'],
  hank: ['فاتح قناة يوتيوب وعايز أصوّر فيديو أكل، اعملّي أحلى طلب', 'الفيديو جاب ٤ مشاهدات! واحدة زيادة عن المشتركين 📈'],
  zarb: ['لقيت شغل أخيرًا! بس محتاج فطار يصحّيني', 'اترفدت عشان نمت… بس الفطار كان يستاهل 😴'],
  jab: ['ضيّعت مفتاح البيت وأنا بجعبق، محتاج أكل أفكر بيه', 'لقيته! كان في جيبي من الأول 🔑'],
  sakr: ['الدكتور قالي قلّل السكر… هات وماتقولش للدكتور', 'الدكتور شافني 😬 بس طلب ساندوتش هو كمان'],
  has: ['الجيران زعلانين من الهصلصة بالليل، عايز أصالحهم بأكل', 'صالحتهم! وبقوا يهصلصوا معايا 🎶'],
  zool: ['رايح أبني هرم جديد الويك إند، محتاج زوادة للعمال', 'الهرم خلص والعمال بيسلموا عليك 🔺'],
  floba: ['رجعت من فرنسا وماما عاملة عزومة، عايز أكل يبيّض وشي', 'ماما عيطت وقالت ده أحلى من باريس 🇪🇬'],
  abkh: ['عايز أكسر الرقم القياسي في كلمة تاني، اديني طاقة', 'تاني تاني تاني… الرقم اتكسر! 🥇'],
  prince: ['جايلي ضيوف مهمين وعايز سفرة تليق بالبرنس', 'الضيوف انبهروا والبرنس رجع برنس 👑'],
  abbas: ['عندي بطولة كمال أجسام بكره، محتاج أكل بالكوم', 'خدت المركز الأول وشلت الحكم كمان 🏋️'],
  shawqy: ['عايز أثبت إن الآيس كريم بيتاكل في الشتا، ساعدني', 'اتثبت علميًا! والناس بتسقف 🍦'],
  shamq: ['رايح أعمل تجربة أداء في السيرك، محتاج طاقة', 'إيييي! اتقبلت المهرج الرئيسي 🎪'],
  dola: ['النهارده آخر محاولة طيران ليا، محتاج وقود', 'طرت ٣ ثواني كاملين! رقم قياسي 🕊'],
  rasoda: ['القمر غاب ومش لاقيين طريقنا، أكّلنا لحد ما نلاقيه', 'لقينا القمر! كان مستخبي ورا الكشك 🌙'],
  barber: ['عندي عريس النهارده ولازم إيدي تبقى ثابتة، أكّلني', 'العريس طلع زي القمر واتصوّر ٢٠٠ صورة ✂️'],
  hankL: ['عامل دايت لايت، عايز حاجة خفيفة ومشبّعة', 'نزلت نص كيلو! ورجّعتهم في نفس اليوم 😅'],
  richard: ['اترفدت من الشغل تاني، محتاج أكل يرفع المعنويات', 'لقيت شغل جديد: مذوّق أكل عندك 🐰'],
};
function pickQuest() {
  const ks = Object.keys(QST).filter(k => !S.quest[k]); if (!ks.length) return null;
  const met = ks.filter(k => S.album[k]), ch = pick(met.length ? met : ks), up = owned().filter(p => !PROD[p].sea), own = OWN[ch];
  const ord = own && has(own) ? [own] : []; while (ord.length < Math.min(S.day >= 8 ? 3 : 2, up.length)) { const p = pick(up); if (!ord.includes(p)) ord.push(p); }
  return { ch, ord, at: rnd(30, 55), on: 0 };
}
// the day's best moment, kept for the comic snapshot on the end screen
function moment(pr, ch, big, cap) { if (CHAL || !CH[ch]) return; if (!G.moment || pr >= G.moment.pr) G.moment = { pr, ch, big, cap }; }
// daily missions
function mkMissions() {
  const d = S.day, r = 12 + d * 3, pool = [
    { k: 'serve', p: gpick(owned()), n: 2 + Math.floor(d / 4) }, { k: 'combo', n: 3 + Math.min(4, Math.floor(d / 3)) }, { k: 'happy', n: Math.min(14, 5 + d) },
    { k: 'perfect', n: Math.min(7, 2 + Math.floor(d / 3)) }, { k: 'earn', n: Math.round(target(d) * 1.4) }, { k: 'fav', n: 2 + Math.floor(d / 4) }, { k: 'noAngry', n: 1 }];
  if (S.extras.s || S.extras.i) pool.push({ k: 'extras', n: 2 + Math.floor(d / 4) });
  if (d >= 3) pool.push({ k: 'thief', n: 1 });
  const out = []; while (out.length < 3) out.push(Object.assign(pool.splice(Math.floor(grand() * pool.length), 1)[0], { r, done: 0 }));
  return out;
}
function mText(m) {
  return { serve: 'قدّم ' + ar(m.n) + ' ' + (m.p && PROD[m.p].n), combo: 'اعمل كومبو ×' + ar(m.n), happy: 'خلّي ' + cnt(m.n, 'زبون مبسوطين', 'زباين مبسوطين'), perfect: cnt(m.n, 'طلب "تحفة"', 'طلبات "تحفة"', 'طلبين "تحفة"'),
    earn: 'اكسب ' + ar(m.n) + ' ج', fav: cnt(m.n, 'زبون ياخدوا طبقهم المفضل', 'زباين ياخدوا طبقهم المفضل', 'زبونين ياخدوا طبقهم المفضل'), noAngry: 'ولا زبون يمشي زعلان', extras: 'قدّم ' + cnt(m.n, 'طلب بإضافات', 'طلبات بإضافات', 'طلبين بإضافات'), thief: 'امسك النصاب 🕶' }[m.k];
}
function mProg(m) { return { serve: G.cnt[m.p] || 0, combo: G.bestCombo, happy: G.happy, perfect: G.perfect, earn: G.earned, fav: G.favN, noAngry: m.done ? 1 : 0, extras: G.exN, thief: G.caught }[m.k] || 0; }
function missionDone(m, quiet) {
  m.done = 1; S.money += m.r; S.life += m.r; G.bonus += m.r; moneyBounce = 1;
  if (!quiet) { toast('🎯 ' + mText(m) + ' ✓  +' + ar(m.r) + ' ج', '#9be37a'); sfx.combo(6); }
}
// character card album: serve someone enough times to unlock their card
const ALB = POOL.concat(['cosmic', 'diaa']);
const albNeed = ch => ch === 'diaa' ? 1 : ch === 'cosmic' ? 2 : 5;
const JOKE = {
  hafo: 'أنا مش بحافوزلق، أنا بعبّر عن نفسي', aao: 'عاعاعا... دي مش لغة، دي حالة', aaota: 'بعيط من الفرحة، ومن الزعل، ومن البصل', hank: 'ودني دي بتسمع الطلب قبل ما تقوله',
  zarb: 'الكسل مش عيب، العيب إنك تقوم', jab: 'جعبقتها؟ لأ هي اللي جعبقتني', sakr: 'السكر في دمي واصل للسقف', has: 'هصلص هصلص... معرفش معناها بس حلوة',
  zool: 'الأهرامات دي بنيتها في ويك إند', floba: 'Bonjour يا معلم، فين الفول؟', abkh: 'تاني تاني تاني... لحد ما المحل يقفل', prince: 'البرنس ميستناش، البرنس يتستنى',
  abbas: 'هو البروتين اللي في الشاورما بيتحسب؟', shawqy: 'الآيس كريم في الشتا ده مبدأ', shamq: 'إيييي إيييي... دي ضحكة مش إنذار', dola: 'طاير من الفرحة، حرفيًا',
  barber: 'نعيمًا! حتى لو مقصّتش', hankL: 'أنا الحنكليس بس من غير سكر', richard: 'الشغل حلو… من بعيد', rasoda: 'إحنا مش ملعونين، إحنا بس مكسلين نبتسم',
  cosmic: 'الكون كله جعان، وأنا مندوبته', diaa: 'أنا جاي أشتري للبحث العلمي بس 🔬',
};
function served(ch, x, y) {
  if (CHAL) return;
  S.served[ch] = (S.served[ch] || 0) + 1;
  if (!ALB.includes(ch) || S.album[ch] || S.served[ch] < albNeed(ch)) return;
  S.album[ch] = 1; addPop(x, y, '🃏 كارت جديد في الألبوم!', '#ffe38a', 22, 1.8); sfx.vip();
  if (ALB.every(k => S.album[k])) { S.cosOwn.gold = 1; S.tapes.secret = 1; toast('🏆 كملت الألبوم! فتحت العربية الدهب والشريط السري', '#ffe38a'); }
}
// cart cosmetics
const AWN = { red: { n: 'تندة حمرا', c: ['#d7263d', '#fff6ec'], cost: 0 }, green: { n: 'تندة خضرا', c: ['#2e9d4a', '#fff6ec'], cost: 80 }, blue: { n: 'تندة زرقا', c: ['#2e6ab8', '#ffe9b8'], cost: 80 }, cosmic: { n: 'تندة كونية', c: ['#5b3cc4', '#ffd86b'], cost: 150 } };
const awCols = () => S.cos.gold ? ['#c9961a', '#2a1a0a'] : (AWN[S.cos.aw] || AWN.red).c;
const bgKey = () => areaI() + S.cos.aw + S.cos.gold + (S.cos.neon ? S.name : '') + S.title + '|' + S.grow + S.gifts.join() + Object.keys(S.fig).join();
// Abu Hasiba's debt story: a short scene when the cart moves, and a finale when it's paid off
const DEBT = 15000;   // paid from everything the cart earns; about two weeks of good days (Twister 2026-10-18: 3000 ended the story too soon)
const STORY = [
  [['bird', 'أبو حسيبة! فين الـ١٥٠٠٠ جنيه بتوعي؟ 😠'], ['ah', 'يا معلم سكرتاعوط، اديني فرصة بس 😿'], ['bird', 'الفلوس... ولا هاخد الكشك!'], ['ah', 'يا معلم، كل جنيه هنكسبه من العربية هسدد منه الدين. يلا بينا!']],
  [['ah', 'سكرتاعوط بيلف في الحارة يدور علينا 🙀'], ['ah', 'نقلت العربية على الكورنيش، والزباين هنا بيدفعوا أكتر'], ['bird', 'شايفكم من فوق الكوبري على فكرة! 👀']],
  [['bird', 'ماشي يا أبو حسيبة، ادفع ولا هبلّغ البلدية!'], ['ah', 'هنقف جنب الاستاد، يوم الماتش الزحمة دهب ⚽'], ['ah', 'وخلي بالك، البلدية بتكبس فجأة. لو شفت المفتش اقفل بسرعة']],
  [['ah', 'مفيش حتة على الأرض سكرتاعوط مش عارفها...'], ['ah', 'عشان كده طلعنا الفضاء 🚀 الرحمة الكونية هي اللي عزمتنا'], ['bird', '...أنا معايا جناحات على فكرة']],
  [['ah', 'سددنا الدين كله! الكشك بقى بتاعنا 🎉'], ['bird', 'مبروك... طب ممكن ساندوتش حافوزليق على الحساب؟'], ['ah', 'على الحساب لأ 😼 وخد انت يا معلم ٢٠٠ جنيه مكافأة']],
  [['bird', 'فاكرين نفسكم كسبتوا؟ أنا فتحت سلسلة عربيات في كل حتة 😏'], ['ah', 'سلسلة؟! يبقى احنا كمان نفتح فرع تاني!'], ['ah', 'الفرع التاني في السوق تحت الترقيات 🏪 بيكسبلك فلوس كل يوم لوحده']],
  [['ah', 'الفرع التاني اتفتح! 🎉 والجعبوق هو اللي ماسكه'], ['ah', 'كل يوم الفرع هيبعتلك فلوس، وكل ما تكبّره يكسب أكتر'], ['bird', 'إزاي عربياتي بتخسر وانتو بتكسبوا؟! 😟']],
  [['bird', 'يا أبو حسيبة... السلسلة بتاعتي فلّست 😢'], ['bird', 'ممكن أشتغل معاكم؟ بطير وأوصّل الطلبات بسرعة'], ['ah', 'هفكّر... كبّر الفرع لآخره الأول وبعدين نشوف 😼']],
  [['ah', 'الفرع بقى أكبر فرع في البلد كلها! 🏆'], ['bird', 'خلاص، أنا معاكم. مفيش عربيات قصادكم تاني 🤝'], ['ah', 'أهلا بيك في عيلة الرحمة يا معلم، وخد انت كمان ٥٠٠ جنيه 🎉']],
];
function storyQueue() {
  const q = [], ai = areaI();
  if (S.story === 0) { q.push(0); S.story = 1; }
  if (ai > 0 && S.story <= ai) { q.push(ai); S.story = ai + 1; }
  if (S.life >= DEBT && !S.fin) { q.push(4); S.fin = 1; }
  if (S.fin && !q.includes(4)) { const c = S.ch2, b = S.br; if (c === 0 || (c === 1 && b >= 1) || (c === 2 && b >= 3) || (c === 3 && b >= 5)) { q.push(5 + c); S.ch2 = c + 1; } }
  if (q.length) save();
  return q;
}
function storyNext() {
  G.storyL++; G.storyT = 0;
  const sc = STORY[G.storyQ[0]];
  if (G.storyL >= sc.length) { if (G.storyQ[0] === 4 || G.storyQ[0] === 8) storyReward(G.storyQ[0] === 8 ? 500 : 200); G.storyQ.shift(); G.storyL = 0; }
  if (!G.storyQ.length) { G.state = 'intro'; G.introT = 0; return; }
  const ln = STORY[G.storyQ[0]][G.storyL]; ln[0] === 'ah' ? sfx.meow() : sfx.squawk();
}
function storyReward(v = 200) { S.money += v; dispMoney = S.money - v; save(); sfx.fanfare(); burst(480, 300, 40, ['#ffd23f', '#ffffff', '#ff8ae8'], 'star', 1.2); }
// daily challenge
function startChallenge(k) {
  if (CHAL) return;
  const key = k || dayKey(), seed = strSeed('rahma' + key);
  REAL = S; CHAL = { key, seed, area: seed % 4, vs: VS && VS.key === key ? VS : null };
  S = Object.assign(fresh(), { day: 6, diff: 'med', tut: 1, money: 0, seenDiaa: 1, up: { speed: 2, pat: 1, price: 0, store: 2, ah: 2 }, help: { autoAH: 1 },
    menu: Object.fromEntries(MENU_SHOP.map(([p]) => [p, 1])), extras: { s: 1, i: 1 }, tapes: REAL.tapes, tape: REAL.tape, cos: REAL.cos, cosOwn: REAL.cosOwn, name: REAL.name });
  seedRng(seed); saved = null; newDay(); dispMoney = 0;
}
function exitChallenge() {
  S = REAL; REAL = null; CHAL = null; RNG = Math.random; saved = S; dispMoney = S.money; fast = false;
  G = { state: 'title', t: G.t, parts: [], pops: [], coins: [], walkers: G.walkers, walkT: 1 };
}
function shareScore() {
  const txt = CHAL.endless ? '♾ المود اللانهائي في عربية الرحمة\nوصلت لمستوى ' + ar(CHAL.lvl) + ' وعملت ' + ar(G.chScore) + ' ج! تقدر تغلبني؟\n' + GAME_URL + (ENG ? '?lang=en' : '')
    : '🏆 تحدي عربية الرحمة (' + ar(CHAL.key) + ')\n' + (CHAL.vs && G.chScore > CHAL.vs.s ? 'غلبت ' + (CHAL.vs.n || 'صاحبي') + ' وعملت ' : 'عملت ') + ar(G.chScore) + ' ج في يوم واحد! تقدر تغلبني؟ افتح اللينك وجرّب نفس اليوم\n'
      + GAME_URL + '?vs=' + encodeURIComponent(CHAL.key + '~' + G.chScore + '~' + (S.name || '').replace(/~/g, '')) + (ENG ? '&lang=en' : '');
  try { if (APP) { RahmaApp.share(tr(txt)); return; } if (navigator.share) { navigator.share({ text: tr(txt) }).catch(() => { }); return; } } catch (e) { }
  try { navigator.clipboard.writeText(tr(txt)).then(() => toast('اتنسخ! ابعته لصحابك 📋', '#9be37a'), () => toast('صوّر الشاشة وابعتها لصحابك 📸')); } catch (e) { toast('صوّر الشاشة وابعتها لصحابك 📸'); }
}
// titles: lifetime achievements; the chosen one shows under the name on the neon sign
const ACH = [
  { k: 'first', i: '🛒', t: 'بياع جديد', d: 'قدّم لأول زبون', v: () => S.st.cust, n: 1 },
  { k: 'cust100', i: '🍳', t: 'معلم الحارة', d: 'قدّم لـ١٠٠ زبون', v: () => S.st.cust, n: 100 },
  { k: 'cust500', i: '👑', t: 'أسطورة الرحمة', d: 'قدّم لـ٥٠٠ زبون', v: () => S.st.cust, n: 500 },
  { k: 'wrap', i: '🌯', t: 'ملك الشاورما', d: 'قدّم ٥٠ شاورما', v: () => S.st.wrap, n: 50 },
  { k: 'combo', i: '🔥', t: 'ملك الكومبو', d: 'اعمل كومبو ×١٠', v: () => S.best, n: 10 },
  { k: 'thief', i: '🕶', t: 'صياد النصابين', d: 'امسك ٥ نصابين', v: () => S.st.thief, n: 5 },
  { k: 'stars', i: '⭐', t: 'تلات نجوم', d: 'خد ٣ نجوم في يوم واحد', v: () => S.st.s3, n: 1 },
  { k: 'legend', i: '🌟', t: 'صاحب الأسطورة', d: 'خلّص موجات الرحمة الكونية', v: () => S.st.leg, n: 1 },
  { k: 'rival', i: '🥊', t: 'قاهر سكرتاعوط', d: 'اغلب عربية سكرتاعوط ٣ مرات', v: () => S.rivalW, n: 3 },
  { k: 'dlv', i: '🛵', t: 'طيار الحارة', d: 'وصّل ١٠ طلبات دليفري', v: () => S.st.dlv, n: 10 },
  { k: 'meal', i: '🛍', t: 'ملك الوجبات', d: 'بيع ٢٠ وجبة كومبو', v: () => S.st.meals, n: 20 },
  { k: 'rich', i: '💰', t: 'مليونير الرحمة', d: 'يبقى معاك ٢٠٠٠ ج مرة واحدة', v: () => S.money, n: 2000 },
  { k: 'space', i: '🚀', t: 'رائد فضاء', d: 'وصّل العربية لمحطة الفضاء', v: () => S.day >= 13 ? 1 : 0, n: 1 },
  { k: 'album', i: '📖', t: 'جامع الكروت', d: 'كمّل ألبوم الرحمة', v: () => ALB.filter(k => S.album[k]).length, n: ALB.length },
  { k: 'debt', i: '😼', t: 'سدّاد الديون', d: 'سدّد دين أبو حسيبة', v: () => S.fin, n: 1 },
  { k: 'endl', i: '♾', t: 'ما بيتعبش', d: 'وصّل المستوى ٥ في المود اللانهائي', v: () => S.st.endl, n: 5 },
];
function checkAch() {
  if (CHAL) return;
  for (const a of ACH) if (!S.ach[a.k] && a.v() >= a.n) { S.ach[a.k] = 1; if (!S.title) S.title = a.k; toast('🏅 لقب جديد: ' + a.t, '#ffe38a'); sfx.vip(); save(); return; }
}
// endless mode, after the debt is paid: one open day that speeds up each time you pass the goal; three upset customers end it
function startEndless() {
  if (CHAL) return;
  const ai = areaI(); REAL = S; S = JSON.parse(JSON.stringify(REAL));
  Object.assign(S, { day: 6, tut: 1, money: 0, diff: REAL.diff === 'hard' ? 'hard' : 'med' });
  CHAL = { endless: 1, key: 'endless', area: ai, lvl: 1, goal: 80, prev: 0, strikes: 0 };
  saved = null; newDay(); G.time = Infinity; dispMoney = 0;
}
function endlessTick(dt) {
  const E = CHAL;
  if (G.earned - G.spent >= E.goal) { E.lvl++; E.prev = E.goal; E.goal += 60 + E.lvl * 25; S.day++; toast('⚡ مستوى ' + ar(E.lvl) + '! الزباين هتيجي أسرع', '#9be37a'); sfx.fanfare(); burst(480, 120, 30, ['#ffd23f', '#9be37a', '#ffffff'], 'star', 1); }
  if (G.overT > 0 && (G.overT -= dt) <= 0) endDay();
}
// name for the neon sign: a small HTML box, so the phone keyboard works
// secret codes typed on the neon sign; the radio drops hints about them
const CODES = {
  'رحمه': () => { S.money += 150; S.life += 150; return 'الرحمة الكونية بعتتلك ١٥٠ ج من السما 💸'; },
  'ابوحسيبه': () => wheelGive({ k: 'crate' }).replace('كسبت', 'أبو حسيبة ادّاك'),
  'زربوطان': () => wheelGive({ k: 'tape' }),
  'ضياء': () => { S.diaaNext = 1; return 'د. ضياء هييجي يزورك على فرخته قريب 🐔'; },
  'عاعاعوط': () => wheelGive({ k: 'aw' }),
};
function secretCode(v) {
  let k = v.replace(/[\s.\-_ـ]/g, '').replace(/[أإآ]/g, 'ا').replace(/ة/g, 'ه').replace(/ى/g, 'ي').toLowerCase().replace(/^ال/, '');
  k = { rahma: 'رحمه', abuhasiba: 'ابوحسيبه', zarbotan: 'زربوطان', diaa: 'ضياء', drdiaa: 'ضياء', aaaoot: 'عاعاعوط' }[k] || k; if (k === 'دضياء' || k === 'ضيا') k = 'ضياء';
  if (!CODES[k]) return false;
  if (S.codes[k]) { toast('الكود ده استخدمته قبل كده 😉'); return true; }
  S.codes[k] = 1; const msg = CODES[k](); save(); sfx.fanfare(); burst(480, 270, 40, ['#ffd23f', '#ffffff', '#4ae0ff'], 'star', 1.2); toast('🔑 كود سري! ' + msg, '#9be37a', 3.2); return true;
}
// days in a row: the first visit of each day ticks it, and it raises the luck wheel's money prizes
function streakTick() {
  const k = dayKey(), y = new Date(Date.now() - 864e5), yk = y.getFullYear() + '-' + (y.getMonth() + 1) + '-' + y.getDate(), s = S.strk;
  if (s.k === k) return; s.n = s.k === yk ? s.n + 1 : 1; s.k = k; s.b = Math.max(s.b, s.n); save();
}
const strMul = () => 1 + 0.2 * clamp(S.strk.n - 1, 0, 5);
function askName() {
  if (document.getElementById('nm')) return;
  const box = document.createElement('div'); box.id = 'nm';
  box.style.cssText = 'position:fixed;inset:0;display:flex;align-items:center;justify-content:center;background:rgba(20,8,2,.7);z-index:5';
  box.innerHTML = box.h = '<div style="background:#fff3d6;border:4px solid #1c120c;border-radius:18px;padding:18px;text-align:center;direction:rtl;max-width:86vw"><div style="font:800 18px Cairo,Tahoma,sans-serif;color:#d7263d;margin-bottom:10px">اكتب اسمك على اليافطة</div>'
    + '<input maxlength="12" style="font:800 20px Cairo,Tahoma,sans-serif;padding:8px 12px;border:3px solid #1c120c;border-radius:12px;width:220px;max-width:70vw;text-align:center;direction:rtl;-webkit-user-select:text;user-select:text"><br>'
    + '<button style="margin-top:12px;font:800 18px Cairo,Tahoma,sans-serif;background:#2e9d4a;color:#fff;border:3px solid #1c120c;border-radius:12px;padding:6px 26px">تمام</button></div>';
  if (ENG) box.innerHTML = tr(box.h); document.body.appendChild(box);
  const inp = box.querySelector('input'), ok = () => { const v = inp.value.trim().slice(0, 12); if (v && !secretCode(v)) { S.name = v; S.cos.neon = 1; save(); } box.remove(); };
  inp.value = S.name || ''; setTimeout(() => inp.focus(), 50);
  box.querySelector('button').onclick = ok; inp.onkeydown = e => { if (e.key === 'Enter') ok(); };
  box.addEventListener('pointerdown', e => { if (e.target === box) box.remove(); });
}

