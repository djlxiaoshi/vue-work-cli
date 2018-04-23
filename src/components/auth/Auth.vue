<template>
  <div class="app-auth-page">
    <AppTab
      :tabList="[
    {name: '我的权限', path: 'apply', active: true},
    {name: '权限审批', path: 'check'},
    {name: '权限设置', path: 'settings'}
  ]"></AppTab>
    <router-view/>
  </div>
</template>

<script>
import AppTab from '@/components/shared/app-tab/AppTab';
export default {
  name: 'Auth',
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
  .app-auth-page {

  }
</style>
