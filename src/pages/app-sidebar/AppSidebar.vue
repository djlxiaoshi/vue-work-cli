<template>
  <div class="app-sidebar">
    <h3 class="header">
      <span class="logo">{{ isCollapse ? 'ETL' : ''}}</span>
      <span v-if="!isCollapse" class="text">ETL管理系统</span>
    </h3>
    <AppMenu :collapse="isCollapse" :menus="routesConfig" :licenseKey="userMsg.role_id"></AppMenu>
    <footer class="footer" @click="toggleCollapse()">
      <span class="fa fa-angle-double-left" :class="!isCollapse ? 'fa-angle-double-left' : 'fa-angle-double-right'"></span>
    </footer>
  </div>
</template>

<script>
import { mainRoutes } from '@/router/routes';
import { mapGetters } from 'vuex';

export default {
  name: 'AppSidebar',
  data () {
    return {
      routesConfig: mainRoutes,
      defaultOpens: []
    };
  },
  props: ['isCollapse'],
  components: {
  },
  mounted () {
  },
  methods: {
    toggleCollapse () {
      this.$emit('update:isCollapse', !this.isCollapse);
    },
    isActive (path) {
      const matched = this.$route.matched;
      return matched.some(item => {
        return item.path === path;
      });
    }
  },
  computed: {
    ...mapGetters([
      'userMsg'
    ]),
    getDefaultOpens () {
      const matched = this.$route.matched;
      return matched.map(item => {
        return item.path;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
  .app-sidebar {
    height: 100%;
    display: flex;
    flex-direction: column;
    .header {
      flex: 0 0 60px;
      display: flex;
      align-items: center;
      color: #fff;
      font-size: 18px;
      background-color: black;
      .logo {
        flex: 0 0 64px;
      }
      .text {
        flex: 1;
        text-align: left;
      }
    }
    /deep/ .app-menu {
      flex: 1;
      border-right: 0;
    }
    .footer {
      flex: 0 0 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      border-top: 1px solid #616060;
      span {
        flex: 0 0 14px;
        color: #fff;
      }
    }
  }
</style>
