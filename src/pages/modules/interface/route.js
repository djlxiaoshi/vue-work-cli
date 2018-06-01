/**
 * @Author JohnLi
 * @Date 2018/6/1 11:07
 */
// import Interface from '@/pages/modules/interface/Interface';

import store from '../../../store/index';

const Interface = (resolve) => {
  import(/* webpackChunkName: "interface" */'./Interface.vue').then((module) => {
    resolve(module);
  });
};

export default {
  path: '/interface',
  name: 'Interface',
  icon: 'fa-link',
  label: '接口查询',
  component: Interface,
  permission: [2, 3, 99], // 普通用用户不能查看
  // 避免直接通过浏览器导航栏进入
  beforeEnter: (to, from, next) => {
    const userMsg = store.state.userMsg;
    const permission = [2, 3, 99];
    permission.includes(userMsg.role_id) ? next() : next({
      path: '/auth' // 这里要跳转到一个所有用户都可以进入的路由
    });
  }
};
