// worker.js

const CACHE_NAME = 'whatever';
const FILES_TO_CACHE = [
  '/',
  'index.html',
  'styles.css',
  'bundle.js',
  '66536.json'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(FILES_TO_CACHE);
      })
  );
});

self.addEventListener('fetch', function(event) {
  if(event.request.mode !== 'navigate') {
    return;
  }
  event.respondWith(
    fetch(event.request)
      .catch(() => {
        return caches.open(CACHE_NAME)
          .then((cache) => {
            return cache.match(event.request);
          })
      })
  );
});