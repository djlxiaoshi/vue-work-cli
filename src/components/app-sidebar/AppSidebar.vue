<template>
  <el-menu
    :router="true"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    class="el-menu-vertical-demo"
    :collapse="isCollapse" >
    <template v-for="(route) in routesConfig">
      <el-submenu :index="route.path" v-if="route['children']" :key="route.path">
        <template slot="title">
          <i :class="route['icon']"></i>
          <span slot="title">{{route['label']}}</span>
        </template>
        <el-menu-item
          v-for="(child) in route['children']"
          :index="`${route.path}${child['path']}`"
          :key="`${route.path}${child['path']}`"
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
  </el-menu>
</template>

<script>
import routes from '@/router/routes';
import index from '@/router/index';
console.log(index);
export default {
  name: 'AppSidebar',
  data () {
    return {
      isCollapse: false,
      routesConfig: routes
    };
  },
  props: [],
  methods: {
  }
};
</script>

<style lang="scss" scoped>

</style>
