const CACHE_NAME = 'madasa-v1';
const assets = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './LPMQ IsepMisbah.ttf', 
  'https://cdn.tailwindcss.com',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css'
];

// Tahap Install: Download semua file utama
self.addEventListener('install', evt => {
  evt.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Mendownload data aplikasi ke cache...');
      return cache.addAll(assets);
    })
  );
});

// Tahap Fetch: Ambil dari cache jika offline
self.addEventListener('fetch', evt => {
  evt.respondWith(
    caches.match(evt.request).then(cacheRes => {
      return cacheRes || fetch(evt.request);
    })
  );
});
