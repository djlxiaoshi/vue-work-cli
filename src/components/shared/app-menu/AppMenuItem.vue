<template>
  <div class="app-menu-item">
    <template v-for="route in menus">
      <template v-if="!route['hidden'] && (!route['permission'] || route['permission'].includes(licenseKey))">
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
            <AppMenuItem :menus="route['children']" :basePath="getFullPath(route['path'])"></AppMenuItem>
          </template>
        </el-submenu>
        <el-menu-item
          v-else
          :class="{'is-active': isActive(getFullPath(route.path))}"
          :index="getFullPath(route.path)"
          :key="`${basePath}/${route.path}`">
          <i class="fa icon" :class="route['icon']" :title="route['label']"></i>
          <span slot="title">{{route['label']}}</span>
        </el-menu-item>
      </template>
    </template>
  </div>
</template>

<script>
const path = require('path');
export default {
  name: 'AppMenuItem',
  data () {
    return {};
  },
  mounted () {
  },
  props: {
    menus: {
      type: Array,
      default: () => []
    },
    basePath: {
      type: String,
      default: ''
    },
    licenseKey: {
      type: Number,
      default: 3
    }
  },
  methods: {
    isActive (path) {
      const matched = this.$route.matched;
      return matched.some(item => {
        return item.path === path;
      });
    },
    getFullPath (_path) {
      return path.join(this.basePath, _path);
    }
  }
};
</script>

<style lang="scss" scoped>
  .app-menu-item {
    /deep/ .el-menu-item {
      display: flex;
      align-items: center;
      padding: 0 !important;
      i.icon {
        flex: 0 0 64px;
      }
    }
    /deep/ .el-submenu {
      .el-submenu__title {
        display: flex;
        align-items: center;
        padding: 0 !important;
        i.icon {
          flex: 0 0 64px;
          text-align: center;
        }
      }
    }
    .is-opened {
      .el-submenu__title {
        color: #fff !important;
      }
    }
    .is-active {
      color: #fff !important;
    }
  }
</style>
