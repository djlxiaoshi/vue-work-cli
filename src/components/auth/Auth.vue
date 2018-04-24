<template>
  <div class="app-auth-page">
    <div class="page-header">
      <AppHeader
        :tabList="tabList">
      </AppHeader>
    </div>
    <div class="-etl-body-container">
      <router-view/>
    </div>
  </div>
</template>

<script>
import AppHeader from '@/components/app-header/AppHeader';
export default {
  name: 'Auth',
  data () {
    return {
      tabList: [
        {label: '我的权限', name: '我的权限', path: '/auth/apply'},
        {label: '权限审批', name: '权限审批', path: '/auth/check', permission: [2, 3]},
        {label: '权限设置', name: '权限设置', path: '/auth/settings', permission: [2, 3]}
      ]
    };
  },
  props: [],
  components: {
    AppHeader
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
  .app-auth-page {

  }
</style>
