<template>
  <div>
    <div class="fondito" v-if="user">
      <p>Bienvenido, {{ user.email }}</p>
      <button @click="signOut">Cerrar Sesión</button>
    </div>
    <div class="fondito" v-else>
      <form class="flexxx" @submit.prevent="signIn">
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

<style scoped>
  @import "@/assets/styles.css";

  .loading-screen p {
    color: whitesmoke;
    font-size: 2rem;
  }

  .flexxx{
    display: flex;
    flex-direction: column;
  }

.fondito{
  background-color: rgb(27, 27, 27);
  border-radius: 10px;
  padding: 1rem;
  color: yellowgreen;
  width: 30%;
  margin: auto;
}

input {
  margin: 1rem;
  padding: 0.5rem;
  border-radius: 10px;
}
label{
  font-size: 2rem;
}
button {
  border: none;
  border-radius: 10px;
  width: 30%;
  margin: auto;
}

button:hover{
  background-color: yellowgreen;
}

.fondito p{
  font-size: 1.7rem;
  color: yellowgreen;
  padding: 1.3rem;
}
</style>