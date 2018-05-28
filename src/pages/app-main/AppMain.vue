<template>
  <div class="app-main">
    <div class="app-main-left" :class="leftWidthClass">
      <AppSidebar :isCollapse.sync="isCollapse"></AppSidebar>
    </div>
    <div class="app-main-right" :class="rightWidthClass">
      <div class="header">
        <AppHeader :tabList="globalHeader"></AppHeader>
      </div>
      <div class="body">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
import AppSidebar from '@/pages/app-sidebar/AppSidebar';
import AppHeader from '@/pages/app-header/AppHeader';
import { mapGetters } from 'vuex';

export default {
  name: 'AppMain',
  data () {
    return {
      isCollapse: window.innerWidth < 960,
      topNavList: []
    };
  },
  props: [],
  components: {
    AppSidebar,
    AppHeader
  },
  mounted () {
    window.addEventListener('resize', (event) => {
      this.isCollapse = window.innerWidth < 960;
    });
  },
  created () {
  },
  computed: {
    ...mapGetters([
      'globalHeader'
    ]),
    rightWidthClass () {
      return this.isCollapse ? 'right-collapse-width' : 'right-width';
    },
    leftWidthClass () {
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
    .app-main-right {
      .header {
        height: 60px;
        box-sizing: border-box;
      }
      .body {
        padding: 20px;
      }
    }
    .sidebar-width {
      width: 256px;
    }
    .sidebar-collapse-width {
      flex: 0 0 64px;
    }
    .right-width {
      width: calc(100% - 256px);
    }
    .right-collapse-width {
      width: calc(100% - 64px);
    }
  }
</style>
