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
        v-if="!tab['hidden'] && (!tab['permission'] || tab['permission'].includes(userMsg.role_id))"
        :key="index"
        :index="tab['name']"
        :route="{path: tab['path'] }"
        :disabled="tab['disabled']"
      >{{ tab['label'] }}</el-menu-item>
    </el-menu>
    <div class="header-user">
      <span class="username">{{userMsg.user_cname}}</span>
      <span class="logout fa fa-sign-out" @click="logout()" title="退出登录"></span>
    </div>
  </div>
</template>

<script>
import ENV from '@/environment/environment';
import { mapGetters, mapActions } from 'vuex';
export default {
  name: 'AppHeader',
  data () {
    return {
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
  components: {
  },
  created () {
  },
  mounted () {
  },
  methods: {
    ...mapActions([
      'clearUserMsg'
    ]),
    handleSelect (tab) {
      this.$emit('onHeaderTabChange', tab);
    },
    logout () {
      // 清除全局保存的用户信息
      this.clearUserMsg();
      this.$http.get('user/logout/').then(res => {
        window.location.href = ENV.SSO;
      });
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
    height: calc(100% + 2px);
    border: solid 1px #e6e6e6;
    /deep/ .header-menu {
      border: none;
      .el-menu-item {
      }
    }
    .header-user {
      margin: 0 50px 0 auto;
      display: flex;
      align-items: center;
      .username {
        margin-right: 10px;
      }
      .logout {
        cursor: pointer;
      }
    }
  }
</style>
