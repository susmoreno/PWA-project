<template>
    <div class="home">
    <div>
      <h2>Armá tu lista de Personajes Favoritos</h2>
      <div class="modal" tabindex="-1" style="display: block" v-show="estadoModal">
        <div class="modal-dialog">
          <div class="modal-content w-75 align-items-center bg-dark">
            <div class="modal-header">
              <h3 class="modal-title text-light fs-3">Personajes</h3>
            </div>
            <div class="modal-body">
              <h3 :class="{ 'text-success': mensajeAgregado, 'text-danger': !mensajeAgregado }">
                {{ mensajeAgregado ? 'Personaje Agregado con éxito' : 'Su personaje ya se encuentra añadido' }}
              </h3>
    <h4 class="fs-2 text-info text-center">{{ personajeElegido?.name }}</h4>
    <img :src="personajeElegido?.image" class="mx-auto d-block w-75" alt="personaje">
    <p class="fw-bold text-light">Status: {{ personajeElegido?.status }}</p>
    <p class="fw-bold text-light">Especie: {{ personajeElegido?.species }}</p>
    <p class="fw-bold text-light">Género: {{ personajeElegido?.gender }}</p>
    <p class="fw-bold text-light">URL: {{ personajeElegido?.url }}</p>
  </div>
            <div class="modal-footer">
              <button @click="ocultarModal" type="button" class="btn btn-secondary fw-bold" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
  
      <div class="row row-cols-1 row-cols-md-3 g-4">
        <!-- Muestra las tarjetas con tres por fila -->
        <div class="col" v-for="personaje in personajes" :key="personaje.url">
          <div class="card w-75">
            <h4 class="card-title fs-2 text-info text-center p-4">{{ personaje.name }}</h4>
            <img :src="personaje.image" class="card-img-topw mx-auto d-block w-75" alt="personaje">
            <div class="card-body p-4">
              <button class="btn btn-dark" @click="(e) => { verPersonaje(personaje.url) }">Agrega tu Personaje</button>
            </div>
          </div>
        </div>
      </div>
  
      <div class="row">
        <ul>
          <h5 class="text-light p-4">Tus personajes favoritos</h5>
          <li class="text-light" v-for="personaje in storage" :key="personaje.url">
            {{ personaje.name }}
          </li>
        </ul>
        <button class="btn btn-danger" @click="limpiarLocalStorage">Limpiar Personajes Cargados</button>
      </div>
    </div>
  </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        estadoModal: false,
        personajeElegido: null,
        personajes: [],
        storage: [],
        mensajeAgregado: false,
      };
    },
    methods: {
      guardarLocalStorage() {
        localStorage.setItem("personajes", JSON.stringify(this.personajes));
      },
      guardarPersonajeLocal(data, url) {
        const personaje = { ...data, url };
        const storage = JSON.parse(localStorage.getItem("storage")) || [];
  
        const existe = storage.some((p) => p.url === url);
        if (!existe) {
          storage.push(personaje);
          this.storage = storage;
          localStorage.setItem("storage", JSON.stringify(storage));
        }
      },
      obtenerPersonajeStorage(url) {
        const storage = JSON.parse(localStorage.getItem("storage")) || [];
  
        const personaje = storage.find((personaje) => personaje.url === url);
        return personaje || null;
      },
      obtenerLocalStorage() {
    try {
      const personajes = localStorage.getItem("personajes");
      const storage = localStorage.getItem("storage");
  
      if (personajes !== null) {
        this.personajes = JSON.parse(personajes);
      } else {
        console.warn("No tienes nada agregado en tu LocalStorage");
      }
  
      if (storage !== null) {
        this.storage = JSON.parse(storage);
      } else {
        console.warn("No tienes nada agregado en tu LocalStorage");
      }
    } catch (error) {
      console.error("Error al analizar JSON:", error);
    }
  },
      mostrarModal() {
        this.estadoModal = true;
      },
      ocultarModal() {
        this.estadoModal = false;
      },
      verPersonaje(url) {
        fetch(url)
          .then((response) => response.json())
          .then((data) => {
            const { name, status, species, image, gender } = data;
            this.personajeElegido = { name, status, species, image, gender, url };
  
            const existe = this.storage.some((p) => p.url === url);
            if (!existe) {
              this.guardarPersonajeLocal(this.personajeElegido, url);
              this.mensajeAgregado = true;
            } else {
              this.mensajeAgregado = false;
            }
  
            this.mostrarModal();
          });
      },
      limpiarLocalStorage() {
        localStorage.removeItem("storage");
        this.storage = [];
      },
    },
    async mounted() {
      this.obtenerLocalStorage();
      if (this.personajes.length === 0) {
        const response = await fetch("https://rickandmortyapi.com/api/character/?page=2&species=alien");
        const data = await response.json();
        this.personajes = data.results;
        this.guardarLocalStorage();
      }
    },
  };
  </script>
  
  
  <style scoped>
   @import "@/assets/styles.css";
  </style>