<template>
  <div id="app">
    <nav>
      <router-link to="/inicio">Inicio</router-link> 
      <router-link to="/about">Personajes</router-link> 
      <router-link to="/">Envíanos tu personaje favorito</router-link>
    <router-link to="/inicio-sesion">Login</router-link>      
    </nav>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  font-size: 1.4rem;
}

nav a {
  padding: 40px 30px;
  font-weight: bold;
  color: rgb(214, 210, 210);
  text-decoration: none;
}

nav a:hover{
  color: greenyellow;
}

nav a.router-link-exact-active {
  color: greenyellow;
}
</style>
