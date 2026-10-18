// ---------- main loop ----------
let last = performance.now(), errShown = false;
let pfDt = 0, pfW = 0, pfN = 0, pfSlow = 0, pfFast = 0, pfTop = 0, pfUp = false;   // pfTop: the best level that stayed smooth after going back up
function frame(now) {
  const raw = now - last, dt = clamp(raw / 1000, 0, 0.05), w0 = performance.now(); last = now;
  try {
    update(dt);
    if (bgDirty || bgK !== bgKey()) renderBG();
    BT = [];
    const sh = G.shake > 0 ? G.shake * 18 : 0, ox = sh ? rnd(-sh, sh) : 0, oy = sh ? rnd(-sh, sh) : 0;
    ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.fillStyle = '#15100c'; ctx.fillRect(0, 0, cv.width, cv.height);
    ctx.drawImage(bg, ox * SC * DPR, oy * SC * DPR);
    ctx.setTransform(SC * DPR, 0, 0, SC * DPR, ox * SC * DPR, oy * SC * DPR);
    if (G.state === 'title' || (G.state === 'shop' && G.shopFrom === 'title') || G.state === 'diff' || G.state === 'album' || G.state === 'titles' || G.state === 'recipes' || G.state === 'wheel' || G.state === 'stats' || G.state === 'snaps') { drawTitle(G.t); drawLights(G.t); ctx.setTransform(SC * DPR, 0, 0, SC * DPR, 0, 0); if (G.state === 'diff') drawDiff(G.t); if (G.state === 'album') { BT = BT.filter(b => b.id === 'hud'); drawAlbum(G.t); } if (G.state === 'titles') { BT = BT.filter(b => b.id === 'hud'); drawTitles(G.t); } if (G.state === 'recipes') { BT = BT.filter(b => b.id === 'hud'); drawRecipes(G.t); } if (G.state === 'wheel') { BT = BT.filter(b => b.id === 'hud'); drawWheel(G.t); } if (G.state === 'stats') { BT = BT.filter(b => b.id === 'hud'); drawStats(G.t); } if (G.state === 'snaps') { BT = BT.filter(b => b.id === 'hud'); drawSnaps(G.t); } if (G.state === 'shop') { BT = BT.filter(b => b.id === 'hud'); drawShop(G.t); } drawHUD(G.t); drawFX(G.t); }
    else {
      if (G.night) drawNight(G.t); drawWalkers(G.t); drawRival(G.t); drawHeat(G.t);
      if (G.state === 'play') { drawCustomers(G.t); if (G.raid) drawRaid(G.t); }
      drawRain(G.t); drawLights(G.t); drawSeason(G.t);   // under the order bubbles
      drawAHSeat(G.t);
      ctx.drawImage(bg, 0, (CT - 14) * SC * DPR, bg.width, 24 * SC * DPR, 0, CT - 14, W, 24);
      if (G.state === 'play') { drawHelper(G.t); drawDirt(G.t); }
      drawStations(G.t);
      if (G.state === 'play') { nameTags(); drawOrders(G.t); drawItems(G.t); if (G.power === false) drawBlackout(G.t); drawAHMove(G.t); }
      ctx.setTransform(SC * DPR, 0, 0, SC * DPR, 0, 0);
      if (G.state === 'play') { drawFX(G.t); if (G.raid) drawRaidUI(G.t); if (G.tut) drawTut(G.t); }
      drawHUD(G.t);
      if (G.state === 'intro') { BT = BT.filter(b => b.id === 'hud'); drawIntro(); drawFX(G.t); }
      if (G.state === 'end') { BT = BT.filter(b => b.id === 'hud'); drawEnd(); drawFX(G.t); }
      if (G.state === 'story') { BT = BT.filter(b => b.id === 'hud'); drawStory(G.t); }
      if (G.state === 'shop') { BT = BT.filter(b => b.id === 'hud'); drawShop(G.t); drawHUD(G.t); drawFX(G.t); }
      if (G.state === 'play' && G.paused) drawPause();
    }
    if (OVL === 'set') { drawSettings(G.t); if (G.toast) drawToast(); }
    if (ROT && G.state === 'title' && G.t < 6) { ctx.save(); ctx.globalAlpha = Math.min(1, 6 - G.t); const p = RRp(330, 250, 300, 40, 20); ctx.fillStyle = 'rgba(28,18,12,.85)'; ctx.fill(p); T('📱 لف الموبايل بالعرض عشان تلعب', 480, 271, 16, '#ffe9b8'); ctx.restore(); }
  } catch (e) { if (!errShown) { errShown = true; console.error(e); } }
  // watch the frame rate; if it stays low, lower the resolution and the character redraw rate
  // (the first seconds after loading or a resize don't count, and the resolution goes back up once the phone is smooth again)
  if (raw < 250 && !document.hidden && performance.now() > pfHold) { pfDt += raw; pfW += performance.now() - w0; pfN++; }
  if (pfDt >= 1500) { const ad = pfDt / pfN, aw = pfW / pfN; pfDt = pfW = pfN = 0;
    if (ad > 24 && aw > 4) { pfFast = 0; if (++pfSlow >= 2 && QL < QS.length - 1) { QL++; pfSlow = 0; if (pfUp) { pfTop = QL; pfUp = false; } ANI = [1, 0.6, 0.35][QL]; resize(); } }
    else if (ad < 19 && QL > pfTop) { pfSlow = 0; if (++pfFast >= 3) { QL--; pfFast = 0; pfUp = true; ANI = [1, 0.6, 0.35][QL]; resize(); } }
    else pfSlow = pfFast = 0; }
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);
const IOS = /iP(hone|ad|od)/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
// installable app: only on the game's own site (GitHub Pages), never inside the Claude viewer
const PWA = /github\.io$/.test(location.hostname) && !window.claude;
let instEv = null;
// the Android app: the game files are bundled inside it, so there's no browser, no install button and no service worker
const APP = (() => { try { return !!window.RahmaApp; } catch (e) { return false; } })();
const NSI = APP && (() => { try { return !!RahmaApp.canSignIn && !!RahmaApp.canSignIn(); } catch (e) { return false; } })();   // Google sign-in through Android
const standalone = () => { try { return matchMedia('(display-mode: standalone)').matches || matchMedia('(display-mode: fullscreen)').matches || navigator.standalone === true; } catch (e) { return false; } };
if (PWA) {
  try {
    const add = (t, a) => { const e = document.createElement(t); for (const k in a) e.setAttribute(k, a[k]); document.head.appendChild(e); };
    add('link', { rel: 'manifest', href: 'manifest.webmanifest' }); add('link', { rel: 'apple-touch-icon', href: 'icon-180.png' }); add('meta', { name: 'theme-color', content: '#15100c' });
    add('meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }); add('meta', { name: 'mobile-web-app-capable', content: 'yes' });
    add('meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' }); add('meta', { name: 'apple-mobile-web-app-title', content: 'عربية الرحمة' });
    if ('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js').catch(() => { });
  } catch (e) { }
  addEventListener('beforeinstallprompt', e => { e.preventDefault(); instEv = e; });
}
// Google account save (Firebase): the save lives in saves/{uid}; only on the game's own site and in the Android app
const FB_CFG = { apiKey: 'AIzaSyBOmkjc-PtVVys1RLlnJElJXnlYQsZz_EE', authDomain: 'rahma-cart-50088.firebaseapp.com', projectId: 'rahma-cart-50088', storageBucket: 'rahma-cart-50088.firebasestorage.app', messagingSenderId: '735409593798', appId: '1:735409593798:web:9a880de0ca7aec474fe6c7' };
const FBV = 'https://www.gstatic.com/firebasejs/10.12.2/', SYNCK = 'rahma-cart-sync';
const CLOUD = { on: PWA || NSI, st: 'off', user: null, fb: null, pushT: 0, dirty: false };   // st: off, loading, out, busy, in
let syncMeta = {}; try { syncMeta = JSON.parse(localStorage.getItem(SYNCK) || '{}') || {}; } catch (e) { }
const setMeta = m => { syncMeta = m; try { localStorage.setItem(SYNCK, JSON.stringify(m)); } catch (e) { } };
function cloudInit() {
  if (!CLOUD.on || CLOUD.st !== 'off') return; CLOUD.st = 'loading';
  Promise.all(['firebase-app.js', 'firebase-auth.js', 'firebase-firestore.js'].map(f => import(FBV + f))).then(([A, U, F]) => {
    const app = A.initializeApp(FB_CFG); CLOUD.fb = { U, F, auth: U.getAuth(app), db: F.getFirestore(app) }; CLOUD.st = 'out';
    U.onAuthStateChanged(CLOUD.fb.auth, u => { CLOUD.user = u; CLOUD.st = u ? 'in' : 'out'; if (u) cloudPull(); else CLOUD.pulled = 1; });
  }).catch(() => { CLOUD.st = 'fail'; });
}
// in the Android app Google's window can't open inside the game, so Android asks for the account and hands back a sign-in token
const nativeToken = () => new Promise((res, rej) => {
  window.rahmaSignIn = (tok, why) => { window.rahmaSignIn = null; if (tok) res(tok); else rej({ code: why || 'cancelled' }); };
  try { RahmaApp.googleSignIn(); } catch (e) { rej({ code: 'app' }); }
});
function cloudSignIn() {   // runs on pointerup so the browser lets the Google window open
  const f = CLOUD.fb; if (!f) { if (CLOUD.st === 'fail') CLOUD.st = 'off'; toast(navigator.onLine === false ? 'محتاج نت عشان تدخل بحساب جوجل 📶' : 'لسه بيحمّل، جرّب كمان ثانية ⏳'); cloudInit(); return; }
  CLOUD.st = 'busy';
  const ok = () => { sfx.fanfare(); toast('☁️ دخلت بحساب جوجل! تقدّمك هيتحفظ عليه', '#9be37a', 3); },
    bad = e => { CLOUD.st = CLOUD.user ? 'in' : 'out'; const c = (e && e.code) || ''; if (!/cancel|closed/.test(c)) toast('تسجيل الدخول مكملش 😕 ' + c.replace('auth/', ''), '#ffd0c8', 3.5); };
  if (NSI) { nativeToken().then(tok => f.U.signInWithCredential(f.auth, f.U.GoogleAuthProvider.credential(tok))).then(ok, bad); return; }
  f.U.signInWithPopup(f.auth, new f.U.GoogleAuthProvider()).then(ok).catch(bad);
}
function cloudDelete() {   // an account made in the game can be deleted from the game (Google Play rule); the progress on this device stays
  const f = CLOUD.fb, u = CLOUD.user; if (!f || !u) return; CLOUD.st = 'busy';
  const del = () => f.F.deleteDoc(f.F.doc(f.db, 'saves', u.uid)).then(() => f.U.deleteUser(u));
  del().catch(e => { if (e && e.code === 'auth/requires-recent-login') return (NSI ? nativeToken().then(tok => f.U.reauthenticateWithCredential(u, f.U.GoogleAuthProvider.credential(tok))) : f.U.reauthenticateWithPopup(u, new f.U.GoogleAuthProvider())).then(del); throw e; })
    .then(() => { setMeta({}); CLOUD.st = 'out'; toast('🗑 اتمسح حسابك وتقدّمك من على جوجل، واللي على الجهاز ده لسه موجود', '#ffe9b8', 3.5); })
    .catch(e => { CLOUD.st = CLOUD.user ? 'in' : 'out'; toast('المسح مكملش 😕 ' + ((e && e.code) || '').replace('auth/', ''), '#ffd0c8', 3.5); });
}
function cloudSignOut() { const f = CLOUD.fb; if (NSI) try { RahmaApp.googleSignOut && RahmaApp.googleSignOut(); } catch (e) { } if (f) f.U.signOut(f.auth).then(() => toast('خرجت من حساب جوجل، والتقدّم لسه على الجهاز ده')); }
function cloudPush(now) {
  const f = CLOUD.fb, u = CLOUD.user; if (!f || !u) return;
  if (!now && Date.now() - CLOUD.pushT < 15000) { CLOUD.dirty = true; return; }   // at most every 15 s; the timer below sends the rest
  const src = REAL || S, t = src.svT || Date.now(); CLOUD.pushT = Date.now(); CLOUD.dirty = false;
  f.F.setDoc(f.F.doc(f.db, 'saves', u.uid), { s: JSON.stringify(src), t, day: src.day, money: src.money, name: src.name || '' }).then(() => setMeta({ uid: u.uid, at: t })).catch(() => { CLOUD.dirty = true; });
}
setInterval(() => { if (CLOUD.dirty && CLOUD.user && Date.now() - CLOUD.pushT >= 15000) cloudPush(true); }, 5000);
document.addEventListener('visibilitychange', () => { if (document.hidden && CLOUD.dirty && CLOUD.user) cloudPush(true); });
function cloudPull() {   // after sign-in: keep whichever side moved on, and ask only when both did
  const f = CLOUD.fb, u = CLOUD.user; if (!f || !u) return;
  f.F.getDoc(f.F.doc(f.db, 'saves', u.uid)).then(d => {
    CLOUD.pulled = 1;
    const r = d.exists() ? d.data() : null, loc = REAL || S, mine = syncMeta.uid === u.uid;
    if (!r || !r.s) return cloudPush(true);
    if (r.t === loc.svT) return setMeta({ uid: u.uid, at: r.t });
    if (mine && syncMeta.at === loc.svT) return r.t > loc.svT ? cloudAdopt(r) : cloudPush(true);
    if (mine && syncMeta.at === r.t) return cloudPush(true);
    if (!loc.svT || (loc.day <= 1 && !loc.life)) return cloudAdopt(r);
    cloudAsk(r);
  }).catch(() => { CLOUD.pulled = 1; toast('مقدرتش أوصل للحفظ على جوجل دلوقتي 😕', '#ffd0c8'); });
}
function cloudAdopt(r) {
  try {
    const o = JSON.parse(r.s); if (CHAL) exitChallenge();
    S = load(o); S.svT = r.t; try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { } setMeta({ uid: CLOUD.user.uid, at: r.t });
    saved = S; dispMoney = S.money; fast = false; OVL = null; bgDirty = true; G = { state: 'title', t: G.t, parts: [], pops: [], coins: [], walkers: G.walkers, walkT: 1 };
    toast('☁️ اتحمّل تقدّمك من جوجل: اليوم ' + ar(S.day), '#9be37a', 3);
  } catch (e) { }
}
function cloudAsk(r) {
  if (document.getElementById('nm')) return;
  const loc = REAL || S, box = document.createElement('div'), b = 'margin:12px 6px 0;font:800 17px Cairo,Tahoma,sans-serif;color:#fff;border:3px solid #1c120c;border-radius:12px;padding:6px 18px;';
  box.id = 'nm'; box.style.cssText = 'position:fixed;inset:0;display:flex;align-items:center;justify-content:center;background:rgba(20,8,2,.7);z-index:5';
  box.innerHTML = box.h = '<div style="background:#fff3d6;border:4px solid #1c120c;border-radius:18px;padding:18px 22px;text-align:center;direction:rtl;max-width:84vw;font:800 17px/1.8 Cairo,Tahoma,sans-serif;color:#3a1d0e">☁️ لقيت تقدّم تاني على حساب جوجل<br>'
    + '<span style="font-weight:600">على جوجل: اليوم ' + ar(r.day) + ' • ' + ar(r.money) + ' ج<br>على الجهاز ده: اليوم ' + ar(loc.day) + ' • ' + ar(loc.money) + ' ج</span><br>'
    + '<button data-k="c" style="' + b + 'background:#2e7fb8">كمّل من جوجل</button><button data-k="h" style="' + b + 'background:#2e9d4a">خلّي اللي هنا</button></div>';
  if (ENG) box.innerHTML = tr(box.h); document.body.appendChild(box);
  box.querySelector('[data-k=c]').onclick = () => { box.remove(); cloudAdopt(r); };
  box.querySelector('[data-k=h]').onclick = () => { box.remove(); try { const o = JSON.parse(r.s); if (o.wheel === dayKey()) { loc.wheel = o.wheel; localStorage.setItem(WHK, o.wheel); } } catch (e) { } cloudPush(true); };
}
if (CLOUD.on && syncMeta.uid) setTimeout(cloudInit, 800);   // signed in before: reconnect and sync on start
function installApp() {
  if (instEv) { const e = instEv; instEv = null; e.prompt(); e.userChoice.then(r => { if (r.outcome === 'accepted') toast('اتنزلت! هتلاقيها على الشاشة الرئيسية 🎉', '#9be37a'); }).catch(() => { }); return; }
  infoBox(IOS ? 'من سفاري دوس على زرار المشاركة ⬆️ تحت، وبعدين اختار <b>إضافة إلى الشاشة الرئيسية</b> (Add to Home Screen)' : 'من قايمة المتصفح ⋮ فوق اختار <b>تثبيت التطبيق</b> (Install app) أو Add to Home screen');
}
function infoBox(html) {
  if (document.getElementById('nm')) return;
  const box = document.createElement('div'); box.id = 'nm';
  box.style.cssText = 'position:fixed;inset:0;display:flex;align-items:center;justify-content:center;background:rgba(20,8,2,.7);z-index:5';
  box.innerHTML = box.h = '<div style="background:#fff3d6;border:4px solid #1c120c;border-radius:18px;padding:18px 22px;text-align:center;direction:rtl;max-width:80vw;font:800 17px/1.7 Cairo,Tahoma,sans-serif;color:#3a1d0e">📲 ' + html
    + '<br><button style="margin-top:12px;font:800 18px Cairo,Tahoma,sans-serif;background:#2e9d4a;color:#fff;border:3px solid #1c120c;border-radius:12px;padding:6px 26px">تمام</button></div>';
  if (ENG) box.innerHTML = tr(box.h); document.body.appendChild(box);
  box.querySelector('button').onclick = () => box.remove(); box.addEventListener('pointerdown', e => { if (e.target === box) box.remove(); });
}
document.addEventListener('visibilitychange', () => {
  if (!AC) return;
  if (document.hidden) { try { AC.suspend(); } catch (e) { } if (IOS) acReset = true; if (G.state === 'play') G.paused = true; }
  else { const a = AC; try { const p = a.resume(); if (p && p.then) p.then(() => { if (a.state !== 'running') acReset = true; }, () => { acReset = true; }); } catch (e) { acReset = true; } }
});
// Android back button in the app: close settings or the photo, pause a running day; otherwise the app goes to the background
window.rahmaBack = () => {
  try { if (document.getElementById('nm')) return true; if (OVL) { OVL = null; return true; } if (G.snapOpen) { G.snapOpen = 0; return true; } if (G.state === 'play' && !G.paused) { G.paused = true; return true; } } catch (e) { }
  return false;
};
addEventListener('pageshow', e => { if (e.persisted && AC) acReset = true; });
addEventListener('touchend', ac, { passive: true });
try { window.claude?.hot?.snapshot?.(() => ({ S: REAL || S })); const d = window.claude?.hot?.data; if (d && d.S) { S = Object.assign(fresh(), d.S); dispMoney = S.money; } } catch (e) { }
