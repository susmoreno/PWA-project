const CACHE_NAME = 'mi-pwa-parcial-cache-v2';

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll([
        '/',
        '/index.html',
        '/manifest.json',
        '/js/app.js',
        '/src/styles.css',
        '/src/sec1.jpg',
        '/src/sec2.jpg',
        '/src/sec3.jpg',
        '/src/banner.png'
      ]);
    })
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;

  if (request.url.includes('/api/characters')) {
    event.respondWith(
      caches.open(CACHE_NAME).then((cache) => {
        return cache.match(request).then((response) => {
          return (
            response ||
            fetch(request)
              .then((networkResponse) => {
                if (networkResponse.ok) {
                  cache.put(request, networkResponse.clone());
                  return networkResponse.clone();
                } else {
                  throw new Error('No se pudo cargar el personaje');
                }
              })
              .catch((error) => {
                console.error('Error al hacer la solicitud de red:', error);
                throw new Error('No se pudo cargar el personaje');
              })
          );
        });
      })
    );
  } else {
    event.respondWith(
      caches.match(request).then((response) => {
        return response || fetch(request);
      })
    );
  }
});self.addEventListener('fetch', (event) => {
  const { request } = event;

  if (request.url.includes('/api/characters')) {
    event.respondWith(
      caches.open(CACHE_NAME).then((cache) => {
        return cache.match(request).then((response) => {
          return (
            response ||
            fetch(request)
              .then((networkResponse) => {
                if (networkResponse.ok) {
                  cache.put(request, networkResponse.clone());
                  return networkResponse.clone();
                } else {
                  throw new Error('No se pudo cargar el personaje');
                }
              })
              .catch((error) => {
                console.error('Error al hacer la solicitud de red:', error);
                throw new Error('No se pudo cargar el personaje');
              })
          );
        });
      })
    );
  } else {
    event.respondWith(
      caches.match(request).then((response) => {
        return response || fetch(request);
      })
    );
  }
});