<template>
  <el-menu
    :router="true"
    :collapse-transition="false"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    class="el-menu-vertical-demo"
    :collapse="isCollapse" >
    <template v-for="(route) in routesConfig">
      <template v-if="!route['notShowAtSidebar']">
        <el-submenu :index="route.path" v-if="route['children'] && !route['notShowAtSidebar']" :key="route.path">
          <template slot="title">
            <i :class="route['icon']"></i>
            <span slot="title">{{route['label']}}</span>
          </template>
          <el-menu-item
            v-for="(child) in route['children']"
            v-if="!child['notShowAtSidebar']"
            :index="`${route.path}/${child['path']}`"
            :key="`${route.path}/${child['path']}`"
          >
            <i :class="child['icon']"></i>
            <span slot="title">{{child['label']}}</span>
          </el-menu-item>
        </el-submenu>
        <el-menu-item
        v-else
        :index="route.path"
        :key="route.path">
        <i :class="route['icon']"></i>
        <span slot="title">{{route['label']}}</span>
      </el-menu-item>
      </template>
    </template>
  </el-menu>
</template>

<script>
import { sidebarConfig } from '@/router/routes';
export default {
  name: 'AppSidebar',
  data () {
    return {
      routesConfig: sidebarConfig
    };
  },
  props: ['isCollapse'],
  methods: {
  }
};
</script>

<style lang="scss" scoped>

</style>
