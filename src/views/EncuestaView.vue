<template>
  <div class="home">
    <EncuestaComponent/>
  </div>
</template>

<script>
// @ is an alias to /src
import EncuestaComponent from '@/components/EncuestaComponent.vue'

export default {
  name: 'EncuestaView',
  components: {
    EncuestaComponent
  }
}
</script>

<style>

</style>