const CACHE_NAME = "semoljeh-v2.0.3";

const urlsToCache = [
  "./",
  "./manifest.json",
  "./notif.mp3",
  "./icon-192.png",
  "./icon-512.png"
];

// INSTALL
self.addEventListener("install", event => {

  self.skipWaiting();

  event.waitUntil(

    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))

  );

});

// ACTIVATE
self.addEventListener("activate", event => {

  event.waitUntil(

    caches.keys().then(keys => {

      return Promise.all(

        keys.map(key => {

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
self.addEventListener("fetch", event => {

  event.respondWith(

    fetch(event.request)

      .then(response => response)

      .catch(() => caches.match(event.request))

  );

});

// FORCE UPDATE
self.addEventListener("message", event => {

  if (event.data.action === "skipWaiting") {
    self.skipWaiting();
  }

});
