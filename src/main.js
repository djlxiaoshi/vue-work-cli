// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';

import upperFirst from 'lodash/upperFirst';
import camelCase from 'lodash/camelCase';

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

// 自动化全局全局注册
const requireComponent = require.context(
  // 其组件目录的相对路径
  './components/shared/',
  // 是否查询其子目录
  true,
  // 匹配基础组件文件名的正则表达式
  /[A-Z]\w+\.(vue|js)$/
);
requireComponent.keys().forEach(fileName => {
  // 获取组件配置
  const componentConfig = requireComponent(fileName);
  const regexp = /.+\/(.+)\./;
  // 剥去文件名开头的 `'./` 和结尾的扩展名
  fileName = regexp.exec(fileName)[1];
  // 获取组件的 PascalCase 命名
  const componentName = upperFirst(
    camelCase(
      fileName
    )
  );
  // 全局注册组件
  Vue.component(
    componentName,
    // 如果这个组件选项是通过 `export default` 导出的，
    // 那么就会优先使用 `.default`，
    // 否则回退到使用模块的根。
    componentConfig.default || componentConfig
  );
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
