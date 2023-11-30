<template>
    <div class="encuesta">
      <div class="container bg-dark text-white m-5 mx-auto border rounded-5">
        <h2 class="verdito p-5 fs-1">Envíanos tu Personaje Favorito</h2>
        <form @submit.prevent="enviarDatosAlBackend">
          <div class="row align-items-center justify-content-center">
            <div class="col-lg-7">
              <div class="fs-4 p-2">
                <label for="nombre" class="form-label">Nombre:</label>
                <input type="text" v-model="datosFormulario.nombre" class="form-control" required>
              </div>
              <div class="fs-4 p-2">
                <label for="edad" class="form-label">Edad:</label>
                <input type="number" v-model="datosFormulario.edad" class="form-control" required>
              </div>
              <div class="fs-4 p-2">
                <label for="email" class="form-label">Email:</label>
                <input type="email" v-model="datosFormulario.email" class="form-control" required>
              </div>
              <div class="fs-4 p-2">
                <label for="alien" class="form-label">Alien favorito:</label>
                <select v-model="datosFormulario.alien" class="form-select" required>
                  <option value="chris">Chris</option>
                  <option value="crabSpider">Crab Spider</option>
                  <option value="cynthia">Cynthia</option>
                  <option value="courierFlap">Courier Flap</option>
                </select>
              </div>
            </div>
            <div class="col-5">
              <img src="@/assets/form.png" alt="Icono Alien" class="w-100">
            </div>
          </div>
          <button type="submit" class="m-5 btn btn-success p-2 px-5 fs-4">Enviar</button>
          <div v-if="mensajeExito" class="text-success fs-5">{{ mensajeExito }}</div>
          <div v-if="mensajeError" class="text-danger fs-5">{{ mensajeError }}</div>
        </form>
      </div>
    </div>
  </template>
 <script>
 import Vue from 'vue';
 import Notifications from 'vue-notification';
 
 Vue.use(Notifications);
 
 export default {
  data() {
    return {
      datosFormulario: {
        nombre: '',
        edad: null,
        email: '',
        alien: '',
      },
      mensajeExito: '',
      mensajeError: '',
    };
  },
  methods: {
    async enviarDatosAlBackend() {
      try {
        // Validaciones adicionales en el frontend
        if (!/^[a-zA-Z\s]+$/.test(this.datosFormulario.nombre)) {
          this.mostrarError('El nombre debe contener solo letras y espacios');
          return;
        }

        // Otras validaciones aquí...

        const response = await fetch('http://localhost:8080/encuesta', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.datosFormulario),
        });

        if (!response.ok) {
          this.mostrarError('Error al enviar datos al backend: ' + response.statusText);
          console.error('Error al enviar datos al backend:', response.statusText);
        } else {
          const data = await response.json();
          this.mostrarExito('Se han enviado sus datos correctamente');
          console.log('Respuesta del backend:', data);
        }
      } catch (error) {
        this.mostrarError('Error al enviar datos al backend: ' + error.message);
        console.error('Error al enviar datos al backend:', error);
      }
    },
    mostrarError(mensaje) {
      // Implementa la lógica para mostrar errores en el frontend (puede ser un componente o una alerta)
      this.mensajeError = mensaje;
      console.error('Error:', mensaje);
    },
    mostrarExito(mensaje) {
      // Implementa la lógica para mostrar mensajes de éxito en el frontend
      this.mensajeExito = mensaje;
      console.log('Éxito:', mensaje);
    },
  },
};
</script>

<style scoped>
@import '@/assets/styles.css';

.verdito {
  color: greenyellow;
}
</style>