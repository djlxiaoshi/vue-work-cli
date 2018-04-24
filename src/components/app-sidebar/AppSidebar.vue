<template>
  <div class="app-sidebar">
    <h3 class="title">
      <!--<img src="@/assets/images/logo.png" alt="ETL管理系统" width="80" v-if="!isCollapse">-->
      <span class="logo">{{ isCollapse ? 'ETL' : ''}}</span>
      <span v-if="!isCollapse" class="text">ETL管理系统</span>
    </h3>
    <el-menu
      :router="true"
      :collapse-transition="false"
      background-color="#545c64"
      text-color="#fff"
      :default-active="$route.path"
      active-text-color="#ffd04b"
      class="el-menu-vertical-demo"
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
  }
};
</script>

<style lang="scss" scoped>
  .app-sidebar {
    .el-menu {
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
    .title {
      height: 60px;
      display: flex;
      align-items: center;
      padding: 0 16px;
      color: #fff;
      font-size: 18px;
      border-bottom: 2px solid #fff;
      .logo {
        flex: 0 0 40px;
      }
      .text {
        flex: 1;
        text-align: left;
      }
    }
  }
</style>
