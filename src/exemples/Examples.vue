<template>
  <div class="app-examples-page">
    <el-menu :default-active="$route.path" mode="horizontal" :router="true">
      <el-menu-item index="/examples/app-options-eg">AppOptions</el-menu-item>
      <el-menu-item index="/examples/app-table-eg">AppTable</el-menu-item>
      <el-menu-item index="/examples/app-menu-eg">AppMenu</el-menu-item>
    </el-menu>

    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'Examples',
  data () {
    return {};
  },
  props: [],
  methods: {}
};
</script>

<style lang="scss" scoped>

</style>
