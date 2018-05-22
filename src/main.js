// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';

import upperFirst from 'lodash/upperFirst';
import camelCase from 'lodash/camelCase';

import Http from '@/assets/js/utils/http';
import GlobalDataService from '@/assets/js/globalDataService';

// 引入Element-UI  全部加载
// import ElementUI from 'element-ui';

// 按需加载
import { Button, Select, Option, Table, TableColumn, Input, RadioButton, CheckboxButton, CheckboxGroup, Checkbox, Notification, MessageBox,
  RadioGroup, Tabs, Popover, Menu, MenuItem, Submenu, Card, Dialog, Pagination, Loading, Cascader, Form, FormItem, Switch, Col, Row } from 'element-ui';

import router from './router';

// element-ui 默认样式文件
// import 'element-ui/lib/theme-chalk/index.css';
// element-ui 自定义样式文件
import '../theme/index.css';
// 初始化css
import './assets/styles/initialize.css';
// 引入font-awesome
import 'font-awesome/css/font-awesome.css';

Vue.config.productionTip = false;
// Vue.use(ElementUI);

Vue.use(Button);
Vue.use(Select);
Vue.use(Option);
Vue.use(Input);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Tabs);
Vue.use(Popover);
Vue.use(Menu);
Vue.use(MenuItem);
Vue.use(Submenu);
Vue.use(Card);
Vue.use(RadioButton);
Vue.use(Checkbox);
Vue.use(CheckboxButton);
Vue.use(CheckboxGroup);
Vue.use(RadioGroup);
Vue.use(Dialog);
Vue.use(Pagination);
Vue.use(Cascader);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Switch);
Vue.use(Col);
Vue.use(Row);

Vue.use(Loading.directive);

Vue.prototype.$loading = Loading.service;
Vue.prototype.$confirm = MessageBox.confirm;

Vue.prototype.$http = Http;
Vue.prototype.$notice = Notification;

// 这里设置路由守卫，只有等获取到用户信息之后，才能够进入应用
// 所以这里整个应用要包裹在一个路由之下
function getUserMsg () {
  return new Promise((resolve, reject) => {
    Http.get('user/info/').then(res => {
      resolve(res.data);
    }).catch(error => {
      reject(error);
    });
  });
}

// 用户信息获取的
router.beforeEach((to, from, next) => {
  if (!GlobalDataService.getGlobalData().userMsg) {
    getUserMsg().then(user => {
      GlobalDataService.setGlobalData({
        userMsg: user
      });
      next();
    }, error => {
      next(error);
    });
  } else {
    next();
  }
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
