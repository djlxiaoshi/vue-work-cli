<template>
  <div class="app-main">
    <div class="app-main-left" :class="sidebarWidthClass">
      <AppSidebar :isCollapse.sync="isCollapse"></AppSidebar>
    </div>
    <div class="app-main-body" :class="bodyWidthClass">
      <router-view/>
    </div>
  </div>
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
  computed: {
    bodyWidthClass () {
      return this.isCollapse ? 'body-collapse-width' : 'body-width';
    },
    sidebarWidthClass () {
      return this.isCollapse ? 'sidebar-collapse-width' : 'sidebar-width';
    }
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
  @import '../../assets/styles/index';
  .app-main {
    height: 100vh;
    width: 100%;
    display: flex;
    .app-main-left {
      height: 100%;
      background-color: $appSidebarBgColor;
      .el-menu {
        border: none;
      }
    }
    .sidebar-width {
      width: 256px;
    }
    .sidebar-collapse-width {
      flex: 0 0 64px;
    }
    .app-main-body {
    }
    .body-width {
      width: calc(100% - 256px);
    }
    .body-collapse-width {
      width: calc(100% - 64px);
    }
  }
</style>
