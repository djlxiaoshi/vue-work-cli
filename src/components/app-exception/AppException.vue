<template>
  <div class="no-permission-page exception-page">
    <div class="left">
      <img :src="config[$route.params.type].imgSrc" alt="">
    </div>
    <div class="right">
      <h1 class="item">{{ config[$route.params.type].code }}</h1>
      <p class="item">{{ config[$route.params.type].errorMsg }}</p>
      <div class="item">
        <el-button type="primary">
          <router-link :to="{ path: $route.params.redirectTo }">{{ config[$route.params.type].btnText }}</router-link>
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppException',
  data () {
    return {
      config: [
        {
          code: 403,
          errorMsg: '抱歉，你无权访问该页面',
          btnText: '返回首页',
          imgSrc: '/static/no-permission.svg'
        },
        {
          code: 404,
          errorMsg: '抱歉，你访问的页面不存在',
          btnText: '返回首页',
          imgSrc: '/static/no-page.svg'
        },
        {
          code: 500,
          errorMsg: '抱歉，服务器出错了',
          btnText: '刷新重试',
          imgSrc: '/static/server-error.svg'
        }
      ]
    };
  },
  mounted () {
    console.log(this.$route);
  },
  props: [],
  methods: {}
};
</script>

<style lang="scss" scoped>
  .exception-page {
    display: flex;
    height: 100vh;
    align-items: center;
    justify-content: center;
  }
  .no-permission-page {
    .left {
      flex: 0 0 30%;
      height: 300px;
    }
    .right {
      .item {
        margin: 25px auto;
      }
      h1 {
        font-size: 40px;
      }
      button {
        a {
          color: #fff;
          text-decoration: none;
        }

      }
    }
  }
</style>
