<template>
  <el-menu
    class="app-tab"
    :default-active="activeIndex"
    :router="true"
    mode="horizontal"
    @select="handleSelect">
    <el-menu-item
      v-for="(tab, index) in tabList"
      :key="index"
      :index="index + ''"
      :route="{path: tab['path'] }"
      :disabled="tab['disabled']"
    >{{ tab['name'] }}</el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: 'AppTab',
  data () {
    return {};
  },
  props: {
    tabList: {
      type: Array,
      default: () => []
    },
    activeIndex: {
      type: String,
      default: '0'
    }
  },
  methods: {
    handleSelect (tab) {
      this.$emit('onTabChange', tab);
    }
  }
};
</script>

<style lang="scss" scoped>
  .app-tab {

  }
</style>
