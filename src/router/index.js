import Vue from 'vue';
import VueRouter from 'vue-router';
import EncuestaView from '../views/EncuestaView.vue';

// Importa los componentes de autenticación
import LoginComp from '@/components/LoginComp.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: EncuestaView
  },
  {
    path: '/inicio',
    name: 'Inicio',
    component: () => import(/* webpackChunkName: "Inicio" */ '../views/Inicio.vue')
  },
  {
    path: '/about',
    name: 'Aliens',
    component: () => import(/* webpackChunkName: "about" */ '../views/PlanificadorView.vue')
  },
  {
    path: '/encuesta',
    name: 'Encuesta',
    component: () => import(/* webpackChunkName: "about" */ '../views/EncuestaView.vue')
  },
  // Rutas de autenticación
  {
    path: '/inicio-sesion',
    name: 'LoginComp',
    component: LoginComp
  }
];

const router = new VueRouter({
  routes
});


export default router;

