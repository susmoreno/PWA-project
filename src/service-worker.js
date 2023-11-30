self.addEventListener('install', (event) => {
    event.waitUntil(
      caches.open('mi-pwa-parcial-cache').then((cache) => {
        return cache.addAll([
          '/',
          '/index.html',
          '/manifest.json',
          '/main.js',
          '/style.css',
          '/api/characters',
          // Agrega aquí los recursos específicos para cada sección
          '/src/sec1.jpg',
          '/src/sec2.jpg',
          '/src/sec3.jpg',
          '/src/banner.png'
        ]);
      })
    );
  });