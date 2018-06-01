/**
 * @Author JohnLi
 * @Date 2018/6/1 11:07
 */
// import BusinessList from '@/pages/modules/business-manage/BusinessList';

import store from '../../../store/index';

const BusinessList = (resolve) => {
  import('./BusinessList.vue').then((module) => {
    resolve(module);
  });
};

export default {
  path: '/business',
  name: 'Business',
  icon: 'fa-briefcase',
  label: '业务管理',
  component: BusinessList,
  permission: [99],
  // 避免直接通过浏览器导航栏进入
  beforeEnter: (to, from, next) => {
    const userMsg = store.state.userMsg;
    const permission = [99];
    permission.includes(userMsg.role_id) ? next() : next('/');
  }
};
