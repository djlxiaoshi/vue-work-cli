<template>
  <div class="app-sidebar">
    <h3 class="header">
      <span class="logo">{{ isCollapse ? 'ETL' : ''}}</span>
      <span v-if="!isCollapse" class="text">ETL管理系统</span>
    </h3>
    <el-menu
      :router="true"
      :collapse-transition="false"
      background-color="#001529"
      text-color="#a3b0bf"
      active-text-color="#fff"
      :default-openeds="getDefaultOpens"
      class="body"
      :collapse="isCollapse" >
      <template v-for="(route) in routesConfig">
        <template v-if="!route['hidden'] && (!route['permission'] || route['permission'].includes(globalData.role_id))">
          <el-submenu class="el-submenu-title"
                      :index="route.path"
                      :key="route.path"
                      v-if="route['children'] && route['childrenPosition'] === 'left'"
                      >
            <template slot="title">
                <i class="fa icon" :class="route['icon']"></i>
                <span slot="title">{{route['label']}}</span>
            </template>
            <el-menu-item
              v-for="(child) in route['children']"
              v-if="!child['hidden'] && (!child['permission'] || child['permission'].includes(globalData.role_id))"
              :class="{'is-active': isActive(`${route.path}/${child['path']}`)}"
              :index="`${route.path}/${child['path']}`"
              :key="`${route.path}/${child['path']}`"
              :route="{path: `${route.path}/${child['path']}`}"
            >
                <i class="fa icon" :class="child['icon']" :title="route['label']"></i>
                <span slot="title">{{child['label']}}</span>
            </el-menu-item>
          </el-submenu>
          <el-menu-item
            v-else
            :class="{'is-active': isActive(route.path)}"
            :index="route.path"
            :key="route.path">
              <i class="fa icon" :class="route['icon']" :title="route['label']"></i>
              <span slot="title">{{route['label']}}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
    <footer class="footer" @click="toggleCollapse()">
      <span class="fa fa-angle-double-left" :class="!isCollapse ? 'fa-angle-double-left' : 'fa-angle-double-right'"></span>
    </footer>
  </div>
</template>

<script>
import { mainRoutes } from '@/router/routes';
import globalDataService from '@/assets/js/globalDataService';

export default {
  name: 'AppSidebar',
  data () {
    return {
      routesConfig: mainRoutes,
      globalData: globalDataService.getGlobalData(),
      defaultOpens: []
    };
  },
  props: ['isCollapse'],
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
    /deep/ .el-menu {
      flex: 1;
      border-right: none;
      .el-menu-item {
        display: flex;
        align-items: center;
        padding: 0 !important;
        i.icon {
          flex: 0 0 64px;
        }
      }
      .el-submenu {
        .el-submenu__title {
          display: flex;
          align-items: center;
          padding: 0 !important;
          i.icon {
            flex: 0 0 64px;
            text-align: center;
          }
        }
      }
      .is-opened {
        .el-submenu__title {
          color: #fff !important;
        }
      }
      .is-active {
        color: #fff !important;
      }
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
