// Offline support for the installed game. The page itself is fetched fresh when online so new versions show up,
// and the cached copy is used when there is no connection. The game's parts and fonts carry ?v=<hash>, so a cached
// part never goes stale: an update only downloads the parts that changed, and the old copies are dropped.
const CACHE = 'rahma-cart-v2';
const CORE = ['./', 'index.html', 'manifest.webmanifest', 'icon-192.png', 'icon-512.png', 'icon-180.png'];

self.addEventListener('install', e => { self.skipWaiting(); e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE))); });
self.addEventListener('activate', e => e.waitUntil(caches.keys()
  .then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())));

const keep = (req, res) => { if (res && res.ok) { const cp = res.clone(); caches.open(CACHE).then(c => c.put(req, cp)); } return res; };
const prune = u => caches.open(CACHE).then(c => c.keys().then(ks => ks.forEach(k => { const o = new URL(k.url); if (o.pathname === u.pathname && o.search !== u.search) c.delete(k); })));
self.addEventListener('fetch', e => {
  const req = e.request; if (req.method !== 'GET') return;
  const u = new URL(req.url); if (u.origin !== location.origin) return;
  if (u.searchParams.has('v')) e.respondWith(caches.match(req).then(m => m || fetch(req).then(res => { if (res.ok) prune(u); return keep(req, res); })));
  else e.respondWith(fetch(req).then(res => keep(req, res)).catch(() => caches.match(req, { ignoreSearch: true }).then(m => m || caches.match('./'))));
});
