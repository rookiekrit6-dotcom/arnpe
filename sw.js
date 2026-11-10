/* © 2026 อ่านเป๊ะ Arnpe — เปิดเว็บแล้วได้ของใหม่เสมอเมื่อมีเน็ต ถ้าไม่มีเน็ตใช้ของที่เก็บไว้ */
const CACHE = 'arnpe-v1';
const CORE = ['./', 'index.html', 'words.html', 'manifest.webmanifest', 'assets/mascot.webp', 'assets/logo-192.png', 'assets/bg-dark.webp', 'assets/bg-light.webp',
  'assets/st_typing.webp', 'assets/st_speaker.webp', 'assets/st_thumbs.webp', 'assets/st_check.webp', 'assets/st_perfect.webp', 'assets/st_love.webp', 'assets/st_party.webp', 'assets/st_sleep.webp'];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  const r = e.request;
  if (r.method !== 'GET' || new URL(r.url).origin !== location.origin) return;
  e.respondWith(fetch(r).then(res => {
    if (res && res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(r, copy)); }
    return res;
  }).catch(() => caches.match(r).then(m => m || caches.match('index.html'))));
});
