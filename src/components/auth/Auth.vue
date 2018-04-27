<template>
  <div class="app-auth-page">
    <keep-alive include="Apply">
      <router-view/>
    </keep-alive>
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
        {label: '权限审批', name: '权限审批', path: '/auth/check', permission: [1, 2, 3]},
        {label: '权限设置', name: '权限设置', path: '/auth/settings', permission: [1, 2, 3]}
      ]
    };
  },
  props: [],
  components: {
    AppHeader
  }
};
</script>

<style lang="scss" scoped>
  .app-auth-page {

  }
</style>
