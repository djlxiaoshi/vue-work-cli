<template>
  <el-menu
    class="app-header"
    :default-active="$route.path"
    :router="true"
    active-text-color="#E6A23C"
    mode="horizontal"
    @select="handleSelect">
    <el-menu-item
      v-for="(tab, index) in tabList"
      v-if="!tab['permission'] || tab['permission'].includes(globalData['roleTypeId'])"
      :key="index"
      :index="tab['path']"
      :route="{path: tab['path'] }"
      :disabled="tab['disabled']"
      >{{ tab['name'] }}</el-menu-item>
  </el-menu>
</template>

<script>
import globalData from '@/assets/js/global';
export default {
  name: 'AppHeader',
  data () {
    return {
      globalData: globalData.getGlobalData()
    };
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
