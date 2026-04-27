const CACHE_NAME = 'calsindo-pwa-v3';

const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './calsindo.jpeg',
  'https://cdn.tailwindcss.com',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css'
];

// Install
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
  self.skipWaiting(); // Langsung aktif
});

// Activate
self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim()); // Ambil kontrol langsung
});

// Fetch
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
      .catch(() => {
        // Jika offline dan tidak ada di cache
        return new Response('Offline', { status: 503 });
      })
  );
});
