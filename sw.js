const CACHE_NAME = 'almukhtar-v3';

const STATIC_ASSETS = [
    './',
    './index.html',
    './manifest.json',

    'https://cdn.tailwindcss.com',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css',

    'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap',
    'https://fonts.googleapis.com/css2?family=Amiri:ital,wght@0,400;0,700;1,400&display=swap',
    'https://fonts.googleapis.com/css2?family=Reem+Kufi:wght@700&display=swap'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(cache => cache.addAll(STATIC_ASSETS))
    );

    self.skipWaiting();
});

self.addEventListener('activate', event => {
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

self.addEventListener('fetch', event => {

    const req = event.request;

    if (req.method !== 'GET') return;

    event.respondWith(

        caches.match(req).then(cacheRes => {

            return cacheRes || fetch(req)
            .then(fetchRes => {

                return caches.open(CACHE_NAME).then(cache => {

                    cache.put(req, fetchRes.clone());

                    return fetchRes;
                });

            })
            .catch(() => {

                if (req.destination === 'document') {
                    return caches.match('./index.html');
                }

            });

        })

    );

});
