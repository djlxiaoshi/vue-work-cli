<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  created () {}
};
</script>

<style lang="scss">
@import './assets/styles/index';
#app {
  font-family: 'Microsoft Yahei', 'Open Sans', 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $appFontColor;
}
</style>
