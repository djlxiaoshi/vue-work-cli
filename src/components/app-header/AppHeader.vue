<template>
  <div class="app-header">
    <el-menu
      class="header-menu"
      :default-active="$route.name"
      :router="true"
      active-text-color="#E6A23C"
      mode="horizontal"
      @select="handleSelect">
      <el-menu-item
        v-for="(tab, index) in tabList"
        v-if="!tab['hidden'] && (!tab['permission'] || tab['permission'].includes(globalData['roleTypeId']))"
        :key="index"
        :index="tab['name']"
        :route="{path: tab['path'] }"
        :disabled="tab['disabled']"
      >{{ tab['label'] }}</el-menu-item>
    </el-menu>

    <div class="header-user">
      <el-popover
        popper-class="logout-popover-content"
        class="avatar"
        ref="popover"
        placement="bottom"
        trigger="click">
        <div slot="reference" style="height: 100%;">
          <img src="" alt="">
        </div>
          <p class="username">JohnLi</p>
          <p class="logout">退出登录</p>
      </el-popover>
    </div>
  </div>
</template>

<script>
import globalDataService from '@/assets/js/global';

export default {
  name: 'AppHeader',
  data () {
    return {
      globalData: globalDataService.getGlobalData()
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
  created () {
  },
  methods: {
    handleSelect (tab) {
      this.$emit('onHeaderTabChange', tab);
    }
  }
};
</script>

<style lang="scss" scoped>
  .logout-popover-content {
    p{
      padding: 5px 0;
      cursor: pointer;
      text-align: center;
      &:not(:last-of-type) {
        border-bottom: 1px solid $appBorderColor;
      }
      &:hover {
        color: #EAA23C;
      }
    }
  }
  .app-header {
    display: flex;
    border: solid 1px #e6e6e6;
    .header-menu {
      border: none;
    }
    .header-user {
      margin: 0 50px 0 auto;
      display: flex;
      align-items: center;
      .avatar {
        border: 1px solid #E6E6E6;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        margin-right: 30px;
        cursor: pointer;
        overflow: hidden;
        img {
          width: 40px;
        }
      }
    }
  }
</style>
