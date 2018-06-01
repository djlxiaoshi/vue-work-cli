/**
 * @Author JohnLi
 * @Date 2018/6/1 11:07
 */
// import Auth from '@/pages/modules/auth/Auth';
// import Apply from '@/pages/modules/auth/Apply';
// import MyApplication from '@/pages/modules/auth/MyApplication';
// import Check from '@/pages/modules/auth/Check';
import store from '../../../store/index';

// const Auth = resolve => {
//   require.ensure(['./Auth.vue'], () => {
//     resolve(require('./Auth.vue'));
//   }, 'auth');
// };

const Auth = (resolve) => {
  import(/* webpackChunkName: "auth" */'./Auth.vue').then((module) => {
    resolve(module);
  });
};

const Apply = (resolve) => {
  import(/* webpackChunkName: "auth" */'./Apply.vue').then((module) => {
    resolve(module);
  });
};

const MyApplication = (resolve) => {
  import(/* webpackChunkName: "auth" */'./MyApplication.vue').then((module) => {
    resolve(module);
  });
};

const Check = (resolve) => {
  import(/* webpackChunkName: "auth" */'./Check.vue').then((module) => {
    resolve(module);
  });
};

export default {
  path: '/auth',
  icon: 'fa-th-large',
  label: '权限管理',
  component: Auth,
  childrenPosition: 'top',
  children: [
    {
      path: 'apply',
      name: 'Apply',
      label: '权限申请',
      component: Apply
    },
    {
      path: 'myApplication',
      name: 'myApplication',
      label: '我的申请',
      component: MyApplication
    },
    {
      path: 'check',
      name: 'Check',
      label: '我的审核',
      component: Check,
      permission: [2, 3, 99],
      // 避免直接通过浏览器导航栏进入
      beforeEnter: (to, from, next) => {
        const userMsg = store.state.userMsg;
        const permission = [2, 3, 99];
        permission.includes(userMsg.role_id) ? next() : next({
          path: '/auth'
        });
      }
    },
    {
      path: '',
      redirect: 'apply',
      hidden: true
    }
  ]
};
