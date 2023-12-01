<template>
  <div class="home">
    <!-- Banner -->
    <div class="banner">
      <img :src="require(`@/assets/${banner.img}`)" alt="banner">
    </div>
    
    <!-- Título -->
    <h1>Rick and Morty</h1>

    <!-- Botón de instalación -->
    <div class="pwa">
      <button class="pwaboton" v-if="showInstallPrompt" @click="instalarPWA">
        Instalar R&M App
      </button>
    </div>

    <!-- Secciones -->
    <div v-for="(section, index) in sections" :key="index" class="seccionesflex">
      <div class="flex" :class="{ 'flex-reverse': index % 2 !== 0 }">
        <!-- Imagen de la sección -->
        <div class="imagen animate__animated">
          <img :src="require(`@/assets/${section.img}`)" alt="seccion imagenes">
        </div>
        <!-- Contenido de la sección -->
        <div>
          <h2 class="animate__animated animate__fadeInRight ">{{ section.title }}</h2>
          <p class="animate__animated animate__fadeIn animate__delay-1s">{{ section.content }}</p>
        </div>
      </div>
    </div>

    <!-- Pantalla de carga -->
    <div v-if="loading" class="loading-screen">
      <p>Loading...</p>
    </div>

    <!-- Mensajes de error -->
    <div v-if="error" class="error-message">
      {{ error }}
    </div>
  </div>
</template>
  
  <script>
  export default {
    name: 'HomeView',
    data() {
      return {
        loading: true,
        error: null,
        showInstallPrompt: false,
        isAppInstalled: false,
        sections: [
          {
            title: 'Rick and Morty',
            content: 'Rick y Morty (en inglés: Rick and Morty) es una serie de televisión estadounidense de animación para adultos creada por Justin Roiland y Dan Harmon en 2013 para Adult Swim, también se emitió en Cartoon Network. La serie sigue las desventuras de un científico, Rick Sánchez, y su fácilmente influenciable nieto, Morty, quienes pasan el tiempo entre la vida doméstica y los viajes espaciales, temporales e intergalácticos. Dan Harmon, el cocreador de la serie y Justin Roiland son los encargados de las voces principales de Morty y Rick, la serie también incluye las voces de Chris Parnell, Spencer Grammer y Sarah Chalke.',
            img:'sec1.jpg',
            alt:'castillo',
          },
          {
            title: 'Temporadas',
            content: 'La primera temporada del programa consta de 11 episodios de 22 minutos. Después de emitir los primeros seis episodios, [adult swim] renovó el programa para una segunda temporada, que consta de 10 episodios de 22 minutos. El programa se renovó para una tercera temporada, que consta de 10 episodios de 22 minutos que se emitieron en el verano de 2017. A partir del otoño de 2019, Rick y Morty regresaron con una cuarta temporada con 10 episodios, siendo la primera mitad de la temporada estrebada en 2019 y la segunda mitad después de año nuevo.',
             img:'sec2.jpg',
            alt:'castillo',
                  
            },{
          title:'Sinopsis',
          content:'Después de desaparecer durante casi 20 años, Rick Sánchez llega repentinamente a la puerta de su hija Beth y busca mudarse con ella y su familia. Beth le da la bienvenida con los brazos abiertos, pero su anodino marido Jerry no está muy emocionado por el reencuentro lleno de lágrimas, ya que la llegada de Rick sirve para sacudir un poco las cosas en la casa. Rick convierte el garaje en su laboratorio personal y se pone a trabajar en todo tipo de peligrosos artilugios y artefacto de ciencia ficción. Eso no sería tan malo si no fuera por el hecho de que Rick continúa involucrando a sus nietos Morty y Summer en sus locas aventuras. Con la excepción del episodio piloto, cada episodio termina con una escena posterior a los créditos.',
          img:'sec3.jpg',
  
            },
          
        ],
        titulo: {
          mensaje: 'Entretenimiento'
        },
        banner: {
          img: 'banner.png',
          alt: 'banner de navidad disney'
        },
        installPromptEvent: null,
      };
    },
  methods: {
    cargarDatos() {
      console.log('cargarDatos: Iniciando carga de datos');
      this.loading = true;
      this.error = null;

      try {
        // Simulación de carga de datos
        setTimeout(() => {
          this.showInstallPrompt = true;
        }, 2000);
      } catch (error) {
        console.error('Error al cargar datos:', error);
        this.error = 'Error al cargar datos. Por favor, verifica tu conexión.';
      } finally {
        this.loading = false;
      }
    },
    async instalarPWA() {
      console.log('instalarPWA: Intentando instalar la aplicación');
      if (window.installPromptEvent) {
        try {
          await window.installPromptEvent.prompt();
          const choiceResult = await window.installPromptEvent.userChoice;

          if (choiceResult.outcome === 'accepted') {
            console.log('Usuario aceptó la instalación');
            // Almacenar en LocalStorage que la aplicación está instalada
            localStorage.setItem('appInstalled', 'true');

            // Actualizar el estado del botón
            this.showInstallPrompt = false;
            this.isAppInstalled = true;
          } else {
            console.log('Usuario canceló la instalación');
          }
        } catch (error) {
          console.error('Error al procesar la elección del usuario:', error);
        } finally {
          // Restablecer el evento global
          window.installPromptEvent = null;
        }
      }
    },
    handleBeforeInstallPrompt(event) {
      console.log('handleBeforeInstallPrompt: Evento de instalación disponible');
      if (!this.isAppInstalled && !this.showInstallPrompt && !this.installPromptEvent) {
        this.showInstallPrompt = true;
        this.installPromptEvent = event;
      }
    },
  },
  mounted() {
    console.log('mounted: El componente ha sido montado en el DOM');

    // Cargar datos
    this.cargarDatos();

    // Suscribirse al evento de instalación
    window.addEventListener('beforeinstallprompt', this.handleBeforeInstallPrompt);

    window.addEventListener('appinstalled', () => {
      console.log('La aplicación se instaló con éxito');
      // Restablecer el evento global
      window.installPromptEvent = null;

      // Actualizar LocalStorage
      localStorage.setItem('appInstalled', 'true');

      // Actualizar el estado del botón
      this.showInstallPrompt = false;
      this.isAppInstalled = true;
    });

    // Verificar el estado de instalación al cargar la página
    const appInstalled = localStorage.getItem('appInstalled');
    this.isAppInstalled = appInstalled === 'true';

    // Actualizar el estado del botón
    this.showInstallPrompt = !this.isAppInstalled;
  },
};
</script>


<style scoped>
  @import "@/assets/styles.css";

  .loading-screen p {
    color: whitesmoke;
    font-size: 2rem;
  }

  .pwa {
    background-color: rgb(88, 28, 145);
    padding: 1rem;
  }
</style>
  