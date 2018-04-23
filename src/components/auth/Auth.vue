<template>
  <div class="app-auth-page">
    <AppHeader
      :tabList="tabList"></AppHeader>
    <router-view/>
  </div>
</template>

<script>
import AppHeader from '@/components/app-header/AppHeader';
export default {
  name: 'Auth',
  data () {
    return {
      tabList: [
        {label: '我的权限', name: '我的权限', path: 'apply'},
        {label: '权限审批', name: '权限审批', path: 'check'},
        {label: '权限设置', name: '权限设置', path: 'settings'}
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
