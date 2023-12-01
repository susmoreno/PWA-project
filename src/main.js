import Vue from 'vue';
import App from './App.vue';
import router from './router';
import AnimateCSS from 'animate.css';
import './registerServiceWorker';

Vue.config.productionTip = false;

window.installPromptEvent = null;

new Vue({
  router,
  AnimateCSS,
  render: (h) => h(App),
  mounted() {
    window.addEventListener('beforeinstallprompt', (event) => {
      console.log('handleBeforeInstallPrompt: Evento de instalación disponible');
      window.installPromptEvent = event;
    });

    window.addEventListener('appinstalled', () => {
      console.log('La aplicación se instaló con éxito');
      window.installPromptEvent = null;
    });
  },
}).$mount('#app');