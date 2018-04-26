<template>
  <div class="app-sidebar">
    <h3 class="header">
      <!--<img src="@/assets/images/logo.png" alt="ETL管理系统" width="80" v-if="!isCollapse">-->
      <span class="logo">{{ isCollapse ? 'ETL' : ''}}</span>
      <span v-if="!isCollapse" class="text">ETL管理系统</span>
    </h3>
    <el-menu
      :router="true"
      :collapse-transition="false"
      background-color="#001529"
      text-color="#fff"
      :default-active="$route.path"
      active-text-color="#ffd04b"
      class="body"
      :collapse="isCollapse" >
      <template v-for="(route) in routesConfig">
        <template v-if="!route['hidden'] && (!route['permission'] || route['permission'].includes(globalData['roleTypeId']))">
          <el-submenu class="el-submenu-title"
                      :index="route.path"
                      :key="route.path"
                      v-if="route['children'] && route['childrenPosition'] === 'left'"
                      >
            <template slot="title">
              <div class="etl-menu-item">
                <i class="fa icon" :class="route['icon']"></i>
                <span slot="title">{{route['label']}}</span>
              </div>
            </template>
            <el-menu-item
              v-for="(child) in route['children']"
              v-if="!child['hidden'] && (!child['permission'] || child['permission'].includes(globalData['roleTypeId']))"
              :index="`${route.path}/${child['path']}`"
              :key="`${route.path}/${child['path']}`"
            >
              <div class="etl-menu-item">
                <i class="fa icon" :class="child['icon']" :title="route['label']"></i>
                <span slot="title">{{child['label']}}</span>
              </div>
            </el-menu-item>
          </el-submenu>
          <el-menu-item
            v-else
            :index="route.path"
            :key="route.path">
            <div class="etl-menu-item">
              <i class="fa icon" :class="route['icon']" :title="route['label']"></i>
              <span slot="title">{{route['label']}}</span>
            </div>
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
import { sidebarConfig } from '@/router/routes';
import globalData from '@/assets/js/global';

export default {
  name: 'AppSidebar',
  data () {
    return {
      routesConfig: sidebarConfig,
      globalData: globalData
    };
  },
  props: ['isCollapse'],
  methods: {
    toggleCollapse () {
      this.$emit('update:isCollapse', !this.isCollapse);
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
      padding: 0 16px;
      color: #fff;
      font-size: 18px;
      background-color: black;
      .logo {
        flex: 0 0 40px;
      }
      .text {
        flex: 1;
        text-align: left;
      }
    }
    .body {
      flex: 1;
      border-right: none;
      .etl-menu-item {
        display: flex;
        align-items: center;
        height: 100%;
        i.icon {
          text-align: left;
          flex: 0 0 40px;
        }
        span {
          flex: 1;
          text-align: left;
        }
      }
      .el-menu-item {
        padding-left: 20px !important;
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
