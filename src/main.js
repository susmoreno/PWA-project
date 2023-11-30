import Vue from 'vue';
import App from './App.vue';
import router from './router';
import AnimateCSS from 'animate.css';
import './registerServiceWorker';

Vue.config.productionTip = false;

// Almacenar el evento beforeinstallprompt globalmente
window.installPromptEvent = null;

new Vue({
  router,
  AnimateCSS,
  render: (h) => h(App),
  mounted() {
    // Manejar el evento beforeinstallprompt
    window.addEventListener('beforeinstallprompt', (event) => {
      console.log('handleBeforeInstallPrompt: Evento de instalación disponible');
      // Almacenar el evento globalmente
      window.installPromptEvent = event;
    });

    // Manejar el evento appinstalled
    window.addEventListener('appinstalled', () => {
      console.log('La aplicación se instaló con éxito');
      // Restablecer el evento global
      window.installPromptEvent = null;
    });
  },
}).$mount('#app');