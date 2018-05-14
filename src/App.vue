<template>
  <div id="app">
    <Fractal/>
  </div>
</template>

<script>
import Fractal from './components/Fractal.vue';

export default {
  name: 'app',
  components: {
    Fractal,
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
