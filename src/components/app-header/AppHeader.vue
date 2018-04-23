<template>
  <el-menu
    class="app-header"
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
  name: 'AppHeader',
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
      this.$emit('onHeaderTabChange', tab);
    }
  }
};
</script>

<style lang="scss" scoped>

</style>
