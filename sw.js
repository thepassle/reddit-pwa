const VERSION = 1;
const CACHENAME = `reddit-pwa-v${VERSION}`;

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHENAME).then((cache) => {
      return cache.addAll([
        '/',
        './src/reddit-pwa-app.js',
        './web_modules/lit-element.js',
        './web_modules/@vaadin/router.js',
        './web_modules/kv-storage-polyfill.js',
        './src/reddit-pwa-comment.js',
        './src/reddit-pwa-search.js',
        './src/reddit-pwa-subreddit.js',
        './src/reddit-pwa-thread.js',
        './src/utils.js',
        './node_modules/es-module-shims/dist/es-module-shims.js'
      ]);
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter(cacheName => cacheName.startsWith('reddit-pwa-') && cacheName !== CACHENAME)
          .map(cacheName => caches.delete(cacheName))
      )
    })
  )
});

self.addEventListener('fetch', async (event) => {
  if (event.request.mode === 'navigate') {
    event.respondWith(caches.match('/'));
    return;
  }

  event.respondWith(caches.match(event.request).then(res => res || fetch(event.request)))
});
