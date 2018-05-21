<template>
  <div class="exception-page">
    <div class="left">
      <img src="@/assets/images/server-error.svg">
    </div>
    <div class="right">
      <h1 class="item">500</h1>
      <p class="item">抱歉，服务器出错了</p>
      <div class="item">
        <el-button type="primary">
          <router-link :to="{ path: '/' }">刷新重试</router-link>
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ServerError',
  data () {
    return {
    };
  },
  mounted () {
  },
  props: {
    type: {
      type: Number,
      default: 1
    },
    redirectTo: {
      type: String,
      default: '/'
    }
  },
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
  .exception-page {
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
