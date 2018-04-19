<template>
  <div id="app">
    <el-row class="tac">
      <el-col :span="4">
        <AppSidebar></AppSidebar>
      </el-col>
      <el-col :span="20">
        <router-view/>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import AppSidebar from '@/components/app-sidebar/AppSidebar';
export default {
  name: 'App',
  components: {
    AppSidebar
  }
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
