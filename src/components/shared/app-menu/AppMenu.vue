<template>
  <el-menu
    :router="true"
    :collapse-transition="false"
    background-color="#001529"
    text-color="#a3b0bf"
    active-text-color="#fff"
    class="app-menu"
    :default-openeds="getDefaultOpens"
    :collapse="collapse"
  >
    <AppMenuItem v-bind="$attrs"></AppMenuItem>
  </el-menu>
</template>

<script>
export default {
  name: 'AppMenu',
  data () {
    return {};
  },
  props: {
    collapse: {
      type: Boolean,
      default: false
    }
  },
  methods: {},
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
  .app-menu {
    width: 100%;
  }
</style>
