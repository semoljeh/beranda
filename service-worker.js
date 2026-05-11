const CACHE_NAME = 'almukhtar-v5';

const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',

  './assets/css/tailwind.min.css',
  './assets/css/all.min.css',

  './app.js',
  './data.json',

  './icon-192.png',
  './icon-512.png',
  './foto-profil.jpg',
  './notif.mp3'
];

// INSTALL
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(ASSETS_TO_CACHE))
  );

  self.skipWaiting();
});

// ACTIVATE
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );

  self.clients.claim();
});

// FETCH
self.addEventListener('fetch', (event) => {

  // hanya GET request
  if (event.request.method !== 'GET') return;

  event.respondWith(

    caches.match(event.request).then((cachedResponse) => {

      // jika ada cache → pakai cache
      if (cachedResponse) {
        return cachedResponse;
      }

      // jika tidak ada → fetch internet
      return fetch(event.request)
        .then((networkResponse) => {

          // response tidak valid
          if (!networkResponse || networkResponse.status !== 200) {
            return networkResponse;
          }

          // clone response
          const responseClone = networkResponse.clone();

          // simpan cache
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone);
          });

          return networkResponse;
        })
        .catch(() => {

          // fallback offline
          if (event.request.destination === 'document') {
            return caches.match('./index.html');
          }

        });

    })

  );

});
