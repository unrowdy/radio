// worker.js

const CACHE_NAME = 'whatever';
const FILES_TO_CACHE = [
  'index.html'
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
    // check cache first on any request, otherwise fetch
    /*caches.match(event.request)
      .then(function(response) {
        if(response) {
          return response;
        }
        return fetch(event.request);
      })*/
    // if any fetch fails return the 'offline' page from cache
    fetch(event.request)
      .catch(() => {
        return caches.open(CACHE_NAME)
          .then((cache) => {
            return cache.match('index.html');
          })
      })
  );
});