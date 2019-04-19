<template>
  <div id="app">
    <div style="height: 100px;width:100vw;background-color:#f00" v-clickoutside="handleClose"></div>
  </div>
</template>

<script>
import ClickOutSide from '../src/index.js'

export default {
  name: 'App',
  directives: {
    'clickoutside': ClickOutSide
  },
  methods: {
    handleClose() {
      console.log('colose');
    }
  }
}
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
