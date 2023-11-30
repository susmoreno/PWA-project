import { register } from 'register-service-worker'

if (process.env.NODE_ENV === 'production') {
  const swUrl = `${process.env.BASE_URL}service-worker.js`;

  register(swUrl, {
    ready() {
      console.log(
        'La aplicación se sirve desde la caché mediante un Service Worker.\n' +
        'Para más detalles, visita https://goo.gl/AFskqB'
      );
    },
    registered() {
      console.log('Service worker ha sido registrado.');
    },
    cached() {
      console.log('El contenido ha sido almacenado en caché para su uso sin conexión.');
    },
    updatefound() {
      console.log('Se está descargando nuevo contenido.');
    },
    updated() {
      console.log('Nuevo contenido disponible; por favor, actualiza la página.');
    },
    offline() {
      console.log('No se encontró conexión a Internet. La aplicación se ejecuta en modo sin conexión.');
    },
    error(error) {
      console.error('Error durante el registro del Service Worker:', error);
    }
  });
}