<template>
  <el-tabs
    class="app-tab"
    v-model="currentTabName"
    @tab-click="handleSelect">
    <el-tab-pane
      :label="tab['label']"
      v-for="tab in tabList"
      :key="tab['name']"
      :name="tab['name']"></el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  name: 'AppTab',
  data () {
    return {
      currentTabName: ''
    };
  },
  props: {
    tabList: {
      type: Array,
      default: () => []
    },
    activeTabName: {
      type: String,
      default: ''
    }
  },
  watch: {
    activeTabName (val) {
      this.currentTabName = val;
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
