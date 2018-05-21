<template>
  <div class="app-auth-page">
    <router-view/>
  </div>
</template>

<script>
import AppHeader from '@/components/app-header/AppHeader';

export default {
  name: 'Auth',
  data () {
    return {
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
