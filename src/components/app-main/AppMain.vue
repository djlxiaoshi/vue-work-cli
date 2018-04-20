<template>
  <el-row class="tac">
    <el-col :span="4">
      <AppSidebar></AppSidebar>
    </el-col>
    <el-col :span="20">
      <router-view/>
    </el-col>
  </el-row>
</template>

<script>
import AppSidebar from '@/components/app-sidebar/AppSidebar';
export default {
  name: 'AppMain',
  data () {
    return {};
  },
  props: [],
  components: {
    AppSidebar
  },
  methods: {}
};
</script>

<style lang="scss" scoped>

</style>
