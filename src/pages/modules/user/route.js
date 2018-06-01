/**
 * @Author JohnLi
 * @Date 2018/6/1 11:07
 */
import store from '../../../store/index';

const UserList = (resolve) => {
  import(/* webpackChunkName: "user" */'./UserList.vue').then((module) => {
    resolve(module);
  });
};

export default {
  path: '/settings',
  name: 'Settings',
  icon: 'fa-users',
  label: '用户列表',
  component: UserList,
  permission: [99],
  // 避免直接通过浏览器导航栏进入
  beforeEnter: (to, from, next) => {
    const userMsg = store.state.userMsg;
    const permission = [99];
    permission.includes(userMsg.role_id) ? next() : next({
      path: '/auth'
    });
  }
};
