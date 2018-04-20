// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
// 初始化css
import './assets/styles/initialize.css';
// 引入Element-UI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 引入font-awesome
import 'font-awesome/css/font-awesome.css';

Vue.config.productionTip = false;
Vue.use(ElementUI);

// 这里设置路由守卫，只有等获取到用户信息之后，才能够进入应用
// 所以这里整个应用要包裹在一个路由之下
function getUserMsg () {
  return new Promise((resolve, reject) => {
    resolve();
    // reject(new Error('出错啦!'));
  });
}

router.beforeEach((to, from, next) => {
  getUserMsg().then(res => {
    next();
  }, error => {
    console.log(error);
    next(error);
  });
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
