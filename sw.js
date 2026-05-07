self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('fetch', (event) => {
  // Service worker harus memiliki event fetch agar dianggap PWA valid
  event.respondWith(fetch(event.request));
});
