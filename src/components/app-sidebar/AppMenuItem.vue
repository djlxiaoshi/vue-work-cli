<template>
  <div>
      <template v-for="route in menus">
        <template v-if="!route['hidden'] && (!route['permission'] || route['permission'].includes(userMsg.role_id))">
          <el-submenu
            v-if="route['children'] && route['childrenPosition'] !== 'top'"
            class="el-submenu-title"
            :index="route.path"
            :key="route.path"
          >
            <template slot="title">
              <i class="fa icon" :class="route['icon']"></i>
              <span slot="title">{{route['label']}}</span>
            </template>
            <template v-if="route['children'] && route['children'].length">
              <AppMenuItem :menus="route['children']" :basePath="getBasePath(route['path'])"></AppMenuItem>
            </template>
          </el-submenu>
          <el-menu-item
            v-else
            :class="{'is-active': isActive(route.path)}"
            :index="`${basePath}/${route.path}`"
            :key="`${basePath}/${route.path}`">
            <i class="fa icon" :class="route['icon']" :title="route['label']"></i>
            <span slot="title">{{route['label']}}</span>
          </el-menu-item>
        </template>
      </template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
const path = require('path');
export default {
  name: 'AppMenuItem',
  data () {
    return {};
  },
  mounted () {
    console.log(this.menus);
  },
  props: {
    menus: {
      type: Array,
      default: () => []
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  methods: {
    isActive (path) {
      const matched = this.$route.matched;
      return matched.some(item => {
        return item.path === path;
      });
    },
    getBasePath (_path) {
      return path.join(this.basePath, _path);
    }
  },
  computed: {
    ...mapGetters([
      'userMsg'
    ])
  }
};
</script>

<style lang="scss" scoped>

</style>
