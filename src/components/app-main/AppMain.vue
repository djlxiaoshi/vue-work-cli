<template>
  <el-row class="app-main">
    <el-col :span="4" class="sidebar-wrap" :class="{'collapse-width': isCollapse}">
      <AppSidebar :isCollapse="isCollapse"></AppSidebar>
    </el-col>
    <el-col :span="20">
      <router-view/>
    </el-col>
  </el-row>
</template>

<script>
import AppSidebar from '@/components/app-sidebar/AppSidebar';
export default {
  name: 'AppMain',
  data () {
    return {
      isCollapse: window.innerWidth < 960
    };
  },
  props: [],
  components: {
    AppSidebar
  },
  mounted () {
    window.addEventListener('resize', (event) => {
      this.isCollapse = window.innerWidth < 960;
    });
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
  @import '../../assets/styles/index';
  .app-main {
    height: 100vh;
    .sidebar-wrap {
      height: 100%;
      background-color: $appSidebarBgColor;
      .el-menu {
        border: none;
      }
    }
    .collapse-width {
      width: 64px;
    }
  }
</style>
