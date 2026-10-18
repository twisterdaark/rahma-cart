// ---------- audio ----------
let AC = null, master = null, sfxG = null, musG = null, sfxV = 0.8, musV = 0.6, voiceOn = true;
let acReset = false;   // iOS can leave the audio "interrupted" after switching apps; the next tap builds a fresh one
function ac() {
  if (AC && acReset) { acReset = false; const old = AC; AC = null; nbuf = null; mNext = 0; try { old.close(); } catch (e) { } }
  if (!AC) { try { AC = new (window.AudioContext || window.webkitAudioContext)(); master = AC.createGain(); master.gain.value = 0.85; const comp = AC.createDynamicsCompressor(); master.connect(comp); comp.connect(AC.destination); sfxG = AC.createGain(); musG = AC.createGain(); sfxG.connect(master); musG.connect(master); applyVol(); } catch (e) { AC = null; } }
  if (AC && AC.state !== 'running') { try { const p = AC.resume(); if (p && p.catch) p.catch(() => { }); } catch (e) { } }
}
function applyVol() { if (sfxG) sfxG.gain.value = sfxV; if (musG) musG.gain.value = musV * 0.9; }
function tone(f, d, type = 'sine', v = 0.1, when = 0, slide = 0, lp = 0, music = false) {
  if (!AC || (music ? musV <= 0 : sfxV <= 0)) return;
  const t = AC.currentTime + when, o = AC.createOscillator(), g = AC.createGain();
  o.type = type; o.frequency.setValueAtTime(f, t); if (slide) o.frequency.exponentialRampToValueAtTime(Math.max(30, f * slide), t + d);
  g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(v, t + 0.008); g.gain.exponentialRampToValueAtTime(0.0001, t + d);
  let n = o; if (lp) { const fl = AC.createBiquadFilter(); fl.type = 'lowpass'; fl.frequency.value = lp; o.connect(fl); n = fl; }
  n.connect(g); g.connect(music ? musG : sfxG); o.start(t); o.stop(t + d + 0.03);
}
let nbuf = null;
function noise(d, v, when = 0, hp = 2500, music = false, lpf = 0) {
  if (!AC || (music ? musV <= 0 : sfxV <= 0)) return;
  if (!nbuf) { nbuf = AC.createBuffer(1, AC.sampleRate * 0.5, AC.sampleRate); const a = nbuf.getChannelData(0); for (let i = 0; i < a.length; i++) a[i] = Math.random() * 2 - 1; }
  const t = AC.currentTime + when, s = AC.createBufferSource(), f = AC.createBiquadFilter(), g = AC.createGain();
  s.buffer = nbuf; f.type = lpf ? 'lowpass' : 'highpass'; f.frequency.value = lpf || hp;
  g.gain.setValueAtTime(v, t); g.gain.exponentialRampToValueAtTime(0.0001, t + d);
  s.connect(f); f.connect(g); g.connect(music ? musG : sfxG); s.start(t); s.stop(t + d + 0.02);
}
function ambN(d, v, type, f, q = 0.7, when = 0) {   // a soft swell of filtered noise
  if (!AC || sfxV <= 0) return;
  if (!nbuf) { nbuf = AC.createBuffer(1, AC.sampleRate * 0.5, AC.sampleRate); const a = nbuf.getChannelData(0); for (let i = 0; i < a.length; i++) a[i] = Math.random() * 2 - 1; }
  const t = AC.currentTime + when, s = AC.createBufferSource(), fl = AC.createBiquadFilter(), g = AC.createGain();
  s.buffer = nbuf; s.loop = true; fl.type = type; fl.frequency.value = f; fl.Q.value = q;
  g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(v, t + d * 0.4); g.gain.linearRampToValueAtTime(0.0001, t + d);
  s.connect(fl); fl.connect(g); g.connect(sfxG); s.start(t, Math.random() * 0.4); s.stop(t + d + 0.05);
}
function ambO(f, d, v) {   // a slow hum that fades in and out
  if (!AC || sfxV <= 0) return;
  const t = AC.currentTime, o = AC.createOscillator(), g = AC.createGain(); o.frequency.value = f;
  g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(v, t + d * 0.4); g.gain.linearRampToValueAtTime(0.0001, t + d);
  o.connect(g); g.connect(sfxG); o.start(t); o.stop(t + d + 0.05);
}
function ambTick(dt) {   // hara chatter and horns, waves on the corniche, the crowd at the stadium, a hum in space; rain and crickets on top
  if (G.state !== 'play' || G.paused || !AC || AC.state !== 'running' || sfxV <= 0 || document.hidden) return;
  if ((G.ambT = (G.ambT ?? 0) - dt) > 0) return;
  const ai = areaI(), r = Math.random();
  if (ai === 0) { G.ambT = 2.6; ambN(3.4, 0.02, 'bandpass', 520, 0.6); if (r < 0.12) { const w = rnd(0, 1.5); tone(392, 0.22, 'square', 0.012, w, 0, 1400); tone(370, 0.3, 'square', 0.012, w + 0.28, 0, 1400); } else if (r < 0.2) { tone(2400, 0.12, 'sine', 0.014, 0.4); tone(2400, 0.12, 'sine', 0.014, 0.58); } }
  else if (ai === 1) { G.ambT = 3.6; ambN(4.6, 0.035, 'lowpass', 380, 0.4); ambN(3, 0.008, 'bandpass', 520, 0.6, 0.5); if (r < 0.07) tone(98, 1.2, 'sawtooth', 0.01, 0.6, 0, 300); }
  else if (ai === 2) { G.ambT = 2.4; ambN(3.2, 0.03, 'bandpass', 900, 0.5); if (r < 0.12) ambN(2.4, 0.06, 'bandpass', 1300, 0.8, 0.3); else if (r < 0.24) for (let i = 0; i < 3; i++) tone(90, 0.18, 'sine', 0.06, 0.2 + i * 0.36); }
  else { G.ambT = 3.2; ambO(55, 4.2, 0.03); ambO(82.4, 4.2, 0.012); if (r < 0.12) for (let i = 0; i < 4; i++) tone(rnd(1400, 2200), 0.05, 'sine', 0.012, 0.3 + i * 0.09); }
  if (ai < 3 && G.wx === 'rain') ambN(3.4, 0.03, 'highpass', 2500, 0.5);
  if (ai < 3 && (G.night || dayPh() > 0.75) && Math.random() < 0.6) for (let i = 0; i < 3; i++) tone(4400, 0.035, 'sine', 0.006, 0.5 + i * 0.07);   // crickets at night
}
const sfx = {
  pop(n = 0) { tone(480 + n * 90, 0.1, 'sine', 0.2, 0, 1.9); },
  coin(k = 0) { const f = 1320 * Math.pow(2, Math.min(k, 12) / 24); tone(f, 0.07, 'square', 0.03, 0, 0, 4000); tone(f * 1.5, 0.16, 'triangle', 0.07, 0.05); },
  cash() { tone(1046, 0.08, 'triangle', 0.12); tone(1568, 0.25, 'triangle', 0.12, 0.07); noise(0.12, 0.05, 0, 6000); },
  wrong() { tone(196, 0.18, 'sawtooth', 0.07, 0, 0.8, 1200); tone(147, 0.3, 'sawtooth', 0.07, 0.15, 0.8, 1200); },
  tap() { tone(820, 0.04, 'triangle', 0.08); },
  pick() { tone(660, 0.06, 'triangle', 0.08, 0, 1.4); },
  drop() { tone(520, 0.08, 'sine', 0.12, 0, 0.6); },
  trash() { noise(0.25, 0.14, 0, 600); tone(220, 0.2, 'sine', 0.08, 0, 0.4); },
  bell() { tone(1760, 0.5, 'sine', 0.06); tone(2637, 0.4, 'sine', 0.03, 0.02); },
  pour() { noise(0.9, 0.05, 0, 0, false, 1200); },
  sizzle() { noise(1.2, 0.05, 0, 3000); },
  wrap() { noise(0.15, 0.08, 0, 2000); tone(300, 0.1, 'sine', 0.06, 0.05, 1.5); },
  ding() { tone(2093, 0.2, 'sine', 0.07); },
  talk(f) { for (let i = 0; i < 6; i++) tone(f * rnd(0.8, 1.35), 0.07, 'square', 0.03, i * 0.085, 0, 2200); },
  squawk() { tone(900, 0.25, 'sawtooth', 0.07, 0, 0.5, 2500); tone(1000, 0.2, 'sawtooth', 0.06, 0.25, 0.5, 2500); },
  combo(k) { const base = 523 * Math.pow(2, Math.min(k, 10) / 12); [0, 4, 7].forEach((s, i) => tone(base * Math.pow(2, s / 12), 0.18, 'triangle', 0.09, i * 0.05)); },
  star(i) { const f = [784, 988, 1175][i]; tone(f, 0.4, 'triangle', 0.12); tone(f * 2, 0.3, 'sine', 0.05, 0.03); noise(0.2, 0.04, 0, 7000); },
  fanfare() { [0, 4, 7, 12, 7, 12].forEach((s, i) => tone(392 * Math.pow(2, s / 12), 0.22, 'triangle', 0.1, i * 0.11)); },
  tick() { tone(1200, 0.03, 'square', 0.03, 0, 0, 3000); },
  whoosh() { noise(0.3, 0.06, 0, 1500); },
  vip() { [0, 7, 12, 16, 19].forEach((s, i) => tone(523 * Math.pow(2, s / 12), 0.35, 'sine', 0.07, i * 0.07)); },
  cluck() { for (let i = 0; i < 3; i++) tone(620 + i * 40, 0.07, 'square', 0.05, i * 0.11, 0.7, 2500); tone(520, 0.22, 'sawtooth', 0.05, 0.36, 1.6, 2500); },
  meow() { tone(520, 0.12, 'triangle', 0.08, 0, 1.6); tone(820, 0.28, 'triangle', 0.06, 0.1, 0.55); },
  box() { noise(0.12, 0.12, 0, 400); tone(160, 0.12, 'sine', 0.12, 0, 0.6); },
  clack() { tone(300, 0.03, 'square', 0.05); noise(0.06, 0.05, 0.03, 3000); },
  squirt() { noise(0.18, 0.08, 0, 900); tone(240, 0.12, 'sine', 0.06, 0, 0.5); },
  clink() { tone(2400, 0.06, 'triangle', 0.06); tone(3100, 0.08, 'triangle', 0.04, 0.05); },
  power() { tone(220, 0.6, 'sawtooth', 0.06, 0, 0.25, 900); noise(0.2, 0.06, 0, 2000); },
  siren() { for (let i = 0; i < 4; i++) tone(i % 2 ? 660 : 880, 0.22, 'square', 0.035, i * 0.22, 0, 2000); },
  phone() { for (let r = 0; r < 2; r++) for (let i = 0; i < 6; i++) tone(i % 2 ? 1350 : 1650, 0.08, 'square', 0.04, r * 0.7 + i * 0.09, 0, 3000); },
  radio() { [0, 4, 7, 12].forEach((s, i) => tone(660 * Math.pow(2, s / 12), 0.1, 'square', 0.03, i * 0.09, 0, 2200)); noise(0.35, 0.02, 0.4, 4000); },
  wipe() { noise(0.12, 0.05, 0, 2500); },
  notif() { tone(1320, 0.09, 'sine', 0.08); tone(1760, 0.16, 'sine', 0.07, 0.08); },
  zag() { for (let k = 0; k < 16; k++) tone(k % 2 ? 2250 : 1850, 0.055, 'sine', 0.045, k * 0.055); tone(1500, 0.35, 'sine', 0.04, 0.9, 1.35); },
  ghost() { tone(420, 0.9, 'sine', 0.07, 0, 0.55); tone(630, 0.8, 'triangle', 0.03, 0.1, 0.6); noise(0.6, 0.02, 0, 3000); },
  cannon() { noise(0.9, 0.3, 0, 0, false, 320); tone(68, 0.9, 'sine', 0.4, 0, 0.4); tone(110, 0.3, 'square', 0.05, 0, 0.3, 500); },
};
// ---------- cassette tapes: each is a little procedural band ----------
const SCL = {
  hij: [0, 1, 4, 5, 7, 8, 10, 12, 13, 16, 17, 19], nah: [0, 2, 3, 5, 7, 8, 11, 12, 14, 15, 17, 19],
  rast: [0, 2, 3.5, 5, 7, 9, 10.5, 12, 14, 15.5, 17, 19], bay: [0, 1.5, 3, 5, 7, 8, 10, 12, 13.5, 15, 17, 19], pent: [0, 3, 5, 7, 10, 12, 15, 17, 19, 22, 24, 27],
};
const hz = (root, sc, d) => root * Math.pow(2, sc[d] / 12);
const MEL = [[7, -1, 6, 5, 4, -1, 5, 4, 3, 2, 3, -1, 1, -1, 0, -1], [4, 5, 6, 7, 8, -1, 7, 6, 7, -1, 5, 4, 5, -1, 4, -1], [7, -1, 9, 8, 7, 6, 7, -1, 5, 6, 5, 4, 3, -1, 2, 1], [0, 1, 2, 3, 4, -1, 3, 2, 1, -1, 2, 1, 0, -1, -1, -1]];
const MAHR = [[7, -1, 7, -1, 8, -1, 7, -1, 5, -1, 4, -1, 5, -1, -1, -1], [4, -1, 4, -1, 5, -1, 4, -1, 2, -1, 1, -1, 2, -1, -1, -1], [7, -1, 8, -1, 9, -1, 8, -1, 7, -1, 5, -1, 7, -1, 8, -1], [7, -1, 5, -1, 4, -1, 2, -1, 1, -1, 2, -1, 0, -1, -1, -1]];
const SAIDI = [[4, 5, 4, 2, 4, -1, 2, 1], [2, 4, 2, 1, 0, -1, 1, 2], [4, 5, 7, 5, 4, 5, 4, 2], [1, 2, 1, 0, 0, -1, -1, -1]];
const LOFI = [[4, -1, -1, 3, -1, 2, -1, -1], [-1, 3, -1, -1, 1, -1, -1, -1], [2, -1, 3, -1, 4, -1, -1, -1], [-1, -1, 1, -1, 0, -1, -1, -1]];
const ZF = [[0, 1, 2, 3, 4, 3, 2, 1], [2, 3, 4, 5, 4, -1, 3, 2], [4, 5, 4, 3, 2, 3, 2, 1], [1, 2, 1, 0, 0, -1, -1, -1]];
const LCH = [[0, 3, 7, 10], [-4, 0, 3, 7], [-7, -4, 0, 3], [-5, -1, 2, 5]], COS = [[0, 3, 7, 12], [-4, 0, 3, 8], [1, 5, 8, 13], [-2, 2, 5, 10]];
const TAPES = {
  rahma: { n: 'شريط الرحمة', d: 'حجاز على مقسوم', cost: 0, c: '#d7263d', bpm: 104, div: 2, play(i, w, st) {
    const s = i % 8;
    if (s === 0 || s === 4) tone(110, 0.22, 'sine', 0.26, w, 0.5, 0, true);
    if (s === 1 || s === 3 || s === 6) { noise(0.05, 0.07, w, 3500, true); tone(660, 0.03, 'triangle', 0.03, w, 0, 0, true); }
    if (s === 2 || s === 5 || s === 7) noise(0.03, 0.025, w, 8000, true);
    if (s === 0) tone(73.42, st * 3.6, 'triangle', 0.06, w, 0, 0, true);
    const ph = MEL[Math.floor(i / 16) % 4][i % 16];
    if (ph >= 0) { const f = hz(293.66, SCL.hij, ph); tone(f, st * 0.95, 'sawtooth', 0.022, w, 0, 1700, true); tone(f * 2, st * 0.6, 'sine', 0.012, w, 0, 0, true); }
  } },
  mahr: { n: 'مهرجان العاعاعوط', d: 'مهرجان شعبي سريع', cost: 120, c: '#ff3fa4', bpm: 132, div: 4, play(i, w, st) {
    const s = i % 16, bar = Math.floor(i / 16) % 4;
    if (s === 0 || s === 6 || s === 8 || s === 11 || (bar === 3 && s === 14)) tone(150, 0.25, 'sine', 0.42, w, 0.3, 0, true);
    if (s === 4 || s === 12) { noise(0.14, 0.16, w, 1200, true); noise(0.05, 0.1, w + 0.012, 2500, true); }
    if (s % 2 === 0) noise(0.025, 0.035, w, 9000, true); else if (s % 4 === 3) noise(0.07, 0.03, w, 7000, true);
    const bd = [0, -1, 0, -1, -1, -1, 0, -1, 3, -1, -1, 3, -1, -1, 5, -1][s]; if (bd >= 0) tone(hz(73.42, SCL.nah, bd), st * 1.8, 'sawtooth', 0.07, w, 0, 600, true);
    const L = MAHR[bar][s]; if (L >= 0) { const f = hz(587.33, SCL.nah, L); tone(f, st * 1.7, 'square', 0.022, w, 1.015, 2400, true); tone(f * 1.005, st * 1.7, 'square', 0.014, w, 0, 2000, true); }
  } },
  saidi: { n: 'مزمار أبو الزول', d: 'صعيدي ورقص بالعصاية', cost: 160, c: '#e8a42a', bpm: 98, div: 2, play(i, w, st) {
    const s = i % 8, bar = Math.floor(i / 8) % 4;
    if (s === 0 || s === 3 || s === 4) tone(95, 0.28, 'sine', 0.32, w, 0.55, 0, true);
    if (s === 1 || s === 6) { noise(0.06, 0.08, w, 3000, true); tone(700, 0.03, 'triangle', 0.03, w, 0, 0, true); }
    noise(0.04, 0.02, w + st / 2, 7000, true);
    if (s === 0 && bar === 0) tone(146.83, st * 30, 'sawtooth', 0.012, w, 0, 900, true);
    const L = SAIDI[bar][s]; if (L >= 0) { const f = hz(587.33, SCL.rast, L); tone(f, st * 0.95, 'sawtooth', 0.03, w, 0, 2800, true); tone(f * 1.007, st * 0.95, 'sawtooth', 0.018, w, 0, 2800, true); tone(f * 2, st * 0.9, 'square', 0.006, w, 0, 3500, true); }
  } },
  lofi: { n: 'لوفاي الجعبوق', d: 'هادي ورايق', cost: 140, c: '#4a6a8a', bpm: 74, div: 2, play(i, w, st) {
    const s = i % 8, bar = Math.floor(i / 8) % 4, sw = s % 2 ? st * 0.12 : 0;
    if (s === 0 || s === 5) tone(70, 0.3, 'sine', 0.3, w, 0.5, 0, true);
    if (s === 4) noise(0.18, 0.08, w, 0, true, 1800);
    if (s % 2 === 1) noise(0.03, 0.015, w + sw, 6000, true);
    if (s === 0) for (const n of LCH[bar]) tone(220 * Math.pow(2, n / 12), st * 7.5, 'triangle', 0.025, w, 0, 1100, true);
    const L = LOFI[bar][s]; if (L >= 0) { const f = hz(440, SCL.pent, L); tone(f, st * 1.8, 'sine', 0.03, w + sw, 0, 0, true); tone(f, st * 1.8, 'sine', 0.01, w + sw + st * 1.5, 0, 0, true); }
    if (Math.random() < 0.3) noise(0.01, 0.012, w + Math.random() * st, 4000, true);
  } },
  zaffa: { n: 'زفة الحافوزليق', d: 'طبل وزغاريد', cost: 200, c: '#2e9d4a', bpm: 112, div: 2, play(i, w, st) {
    const s = i % 8, bar = Math.floor(i / 8) % 8;
    if (s === 0 || s === 4 || s === 5) tone(85, 0.3, 'sine', 0.36, w, 0.5, 0, true);
    if (s === 2 || s === 3 || s === 6) noise(0.06, 0.09, w, 2500, true);
    noise(0.05, 0.03, w, 8000, true); noise(0.05, 0.02, w + st / 2, 8000, true);
    const L = ZF[bar % 4][s]; if (L >= 0) { const f = hz(440, SCL.bay, L); tone(f, st * 0.95, 'square', 0.018, w, 0, 2200, true); tone(f * 1.004, st * 0.95, 'sawtooth', 0.012, w, 0, 2200, true); }
    if (bar === 7 && s < 6) for (let k = 0; k < 6; k++) tone(k % 2 ? 2200 : 1850, st / 6, 'sine', 0.03, w + k * st / 6, 0, 0, true);   // زغروطة
  } },
  secret: { n: 'الشريط السري', d: 'جايزة الألبوم الكامل', cost: 0, lock: 1, c: '#c9961a', bpm: 84, div: 2, play(i, w, st) {
    const s = i % 8, bar = Math.floor(i / 8) % 8;
    if (s === 0 || s === 5) tone(65.4, 0.5, 'sine', 0.3, w, 0.6, 0, true);
    if (s === 2 || s === 6) noise(0.08, 0.05, w, 0, true, 2500);
    if (s === 0 && bar % 2 === 0) for (const n of COS[(bar / 2) % 4]) tone(196 * Math.pow(2, n / 12), st * 15, 'triangle', 0.016, w, 0, 1200, true);
    const ph = MEL[Math.floor(i / 16) % 4][i % 16]; if (ph >= 0 && s % 2 === 0) { const f = hz(392, SCL.hij, ph); tone(f, st * 1.8, 'sine', 0.03, w, 0, 0, true); tone(f * 2.01, st * 1.2, 'sine', 0.01, w + st * 0.5, 0, 0, true); }
  } },
  cosmic: { n: 'ترانس الرحمة الكونية', d: 'سينث من الفضاء', cost: 260, c: '#5b3cc4', bpm: 120, div: 4, play(i, w, st) {
    const s = i % 16, bar = Math.floor(i / 16) % 4, ch = COS[bar];
    if (s === 0 || s === 8) tone(60, 0.4, 'sine', 0.3, w, 0.4, 0, true);
    if (s === 4 || s === 12) noise(0.2, 0.05, w, 0, true, 3000);
    if (s % 2 === 1) noise(0.02, 0.02, w, 10000, true);
    const f = 220 * Math.pow(2, (ch[s % 4] + (s % 8 >= 4 ? 12 : 0)) / 12);
    tone(f, st * 1.6, 'triangle', 0.03, w, 0, 0, true); tone(f, st * 1.6, 'sine', 0.012, w + st * 3, 0, 0, true);
    if (s === 0) for (const n of ch) tone(110 * Math.pow(2, n / 12), st * 15, 'sawtooth', 0.01, w, 0, 700, true);
  } },
};
let mNext = 0, mStep = 0, musicLive = false, fast = false, curTape = null;
function musicTick() {
  if (!AC) return;
  const tp = TAPES[S.tape] || TAPES.rahma;
  if (musV <= 0 || !musicLive) { mNext = AC.currentTime + 0.05; return; }
  if (curTape !== S.tape) { curTape = S.tape; mStep = 0; }
  const st = 60 / (tp.bpm * (fast ? 1.12 : 1)) / tp.div; if (mNext < AC.currentTime) mNext = AC.currentTime + 0.05;
  while (mNext < AC.currentTime + 0.25) { tp.play(mStep, mNext - AC.currentTime, st); mNext += st; mStep++; }
}
setInterval(musicTick, 80);
// character voices: a tiny hum in each one's own pitch ("hmm?" for an order, "mm-hm!" when served), never real words
const VK = { aao: 'a', aaota: 'a', abkh: 'a', shamq: 'e', has: 'e', jab: 'g', dola: 'g', abbas: 'g', zarb: 'g', sakr: 'g', rasoda: 'g', cosmic: 'c' };
function hum(f0, f1, d, when, k) {   // one voiced syllable: a buzzy source through a mouth-shaped filter, with a little vibrato
  const t = AC.currentTime + when, o = AC.createOscillator(), g = AC.createGain(), lp = AC.createBiquadFilter(), lfo = AC.createOscillator(), lg = AC.createGain(), v = k === 'e' ? 0.05 : 0.075;
  o.type = 'sawtooth'; o.frequency.setValueAtTime(f0, t); o.frequency.exponentialRampToValueAtTime(f1, t + d);
  lfo.frequency.value = 5.5; lg.gain.value = f0 * (k === 'c' ? 0.07 : 0.02); lfo.connect(lg); lg.connect(o.frequency);
  lp.type = 'lowpass'; lp.frequency.value = k === 'a' ? 1300 : k === 'e' ? 2600 : f0 * (k === 'g' ? 3.5 : 2.6); lp.Q.value = k === 'a' || k === 'e' ? 4 : 0.8;
  g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(v, t + 0.03); g.gain.setValueAtTime(v, t + d * 0.6); g.gain.exponentialRampToValueAtTime(0.0001, t + d);
  o.connect(lp); lp.connect(g); g.connect(sfxG);
  if (k === 'g') { const o2 = AC.createOscillator(); o2.type = 'square'; o2.frequency.setValueAtTime(f0 * 0.5, t); o2.frequency.exponentialRampToValueAtTime(f1 * 0.5, t + d); o2.connect(lp); o2.start(t); o2.stop(t + d + 0.03); }
  o.start(t); o.stop(t + d + 0.03); lfo.start(t); lfo.stop(t + d + 0.03);
}
function voice(ch, k = 0) {   // k: 0 an order "hmm?", 1 happy "mm-hm!", 2 grumpy "hmm…", 3 a chuckle
  const c = CH[ch]; if (!AC || !c || !voiceOn || sfxV <= 0) return;
  const f = 110 + c.f * 0.9, v = VK[ch] || 'm';
  if (k === 0) hum(f, f * 1.22, 0.3, 0, v);
  else if (k === 1) { hum(f * 1.05, f, 0.11, 0, v); hum(f * 1.3, f * 1.16, 0.2, 0.15, v); }
  else if (k === 2) hum(f * 1.05, f * 0.8, 0.36, 0, v);
  else for (let i = 0; i < 3; i++) hum(f * (1.25 - i * 0.05), f * (1.18 - i * 0.05), 0.075, i * 0.11, v);
}

