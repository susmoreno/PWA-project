<template>
  <div>
    <!-- Verifica si el usuario está autenticado -->
    <div v-if="user">
      <p>Bienvenido, {{ user.email }}</p>
      <button @click="signOut">Cerrar Sesión</button>
    </div>
    <!-- Si no está autenticado, muestra los campos de inicio de sesión/registro -->
    <div v-else>
      <form @submit.prevent="signIn">
        <label>Email:</label>
        <input v-model="email" type="email" placeholder="correo@example.com" autocomplete="username" />

        <label>Contraseña:</label>
        <input v-model="password" type="password" autocomplete="current-password" />

        <button type="submit" :disabled="loading">Iniciar Sesión</button>
      </form>

      <!-- Mostrar mensaje de error -->
      <p v-if="error" style="color: red;">{{ error }}</p>

      <!-- Mostrar indicador de carga -->
      <div v-if="loading">Cargando...</div>
    </div>
  </div>
</template>

<script>
import { auth, signInWithEmailAndPassword, signOut } from '@/firebase';

export default {
  data() {
    return {
      email: '',
      password: '',
      user: null,
      error: null,
      loading: false,
    };
  },
  mounted() {
    // Escucha cambios en la autenticación
    auth.onAuthStateChanged((user) => {
      this.user = user;
    });
  },
  methods: {
    signIn() {
      this.loading = true;
      signInWithEmailAndPassword(auth, this.email, this.password)
        .then(() => {
          this.email = '';
          this.password = '';
          this.error = null;
        })
        .catch(error => {
          console.error(error.message);
          this.error = 'Error al iniciar sesión. Verifica tus credenciales.';
        })
        .finally(() => {
          this.loading = false;
        });
    },

    signOut() {
      signOut(auth)
        .then(() => {
          this.error = null;
          console.log('Cierre de sesión exitoso');
        })
        .catch(error => {
          console.error('Error al cerrar sesión:', error.message);
        });
    },
  },
};
</script>