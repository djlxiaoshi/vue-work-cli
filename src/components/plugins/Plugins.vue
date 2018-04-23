<template>
  <AppTab
  :tabList="[
    {name: '我的权限'},
    {name: '权限审批'},
    {name: '权限设置'}
  ]"
  ></AppTab>
</template>

<script>
import AppTab from '@/components/shared/app-tab/AppTab';

export default {
  name: 'Plugins',
  data () {
    return {};
  },
  props: [],
  components: {
    AppTab
  },
  methods: {}
};
</script>

<style lang="scss" scoped>

</style>
