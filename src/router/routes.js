/**
 * @Author JohnLi
 * @Date 2018/4/19 17:46
 */
import AppMain from '@/pages/app-main/AppMain';
import Interface from '@/pages/interface/Interface';
import Database from '@/pages/database/Database';
import Auth from '@/pages/auth/Auth';
import Apply from '@/pages/auth/Apply';
import MyApplication from '@/pages/auth/MyApplication';
import Check from '@/pages/auth/Check';
import Settings from '@/pages/auth/Settings';
import BusinessList from '@/pages/business-manage/BusinessList';
import Plugins from '@/pages/plugins/Plugins';
import Examples from '@/exemples/Examples';
import NotFound from '@/components/app-exception/NotFound.vue';

// 示例组件
import AppOptionsEg from '@/exemples/AppOptionsEg';
import AppTableEg from '@/exemples/AppTableEg';
import AppMenuEg from '@/exemples/AppMenuEg';

import store from '../store/index';

/*
* 配置字段说明 Vue-router 部分 参考此链接 https://router.vuejs.org/zh-cn/api/options.html#routes
*icon：菜单图标
*label：菜单中文名
*hidden： 是否显示在菜单栏中
* childrenPosition: 如果有子路由，子路由是在侧边栏还是在顶部
* permission: 拥有该菜单的角色ID
* */

const mainRoutes = [
  {
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
  },
  {
    path: '/database',
    name: 'Database',
    icon: 'fa-database',
    label: '数据库查询',
    permission: [], // 隐藏
    component: Database
  },
  {
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
  },
  {
    path: '/settings',
    name: 'Settings',
    icon: 'fa-users',
    label: '用户列表',
    component: Settings,
    permission: [99],
    // 避免直接通过浏览器导航栏进入
    beforeEnter: (to, from, next) => {
      const userMsg = store.state.userMsg;
      const permission = [99];
      permission.includes(userMsg.role_id) ? next() : next({
        path: '/auth'
      });
    }
  },
  {
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
  },
  {
    path: '/plugins',
    name: 'Plugins',
    label: '插件',
    component: Plugins,
    hidden: true // 隐藏  浏览器导航栏可以进入
  },
  {
    path: '/examples',
    name: 'Examples',
    label: '示例',
    component: Examples,
    hidden: true, // 隐藏  浏览器导航栏可以进入
    children: [
      {
        path: 'app-options-eg',
        component: AppOptionsEg
      },
      {
        path: 'app-table-eg',
        component: AppTableEg
      },
      {
        path: 'app-menu-eg',
        component: AppMenuEg
      },
      {
        path: '',
        redirect: 'app-options-eg'
      }
    ]
  },
  {
    path: '',
    redirect: '/auth',
    hidden: true
  }
];

const routes = [
  {
    path: '/',
    component: AppMain,
    children: mainRoutes
  },
  {
    path: '**',
    component: NotFound
  }
];

export { routes, mainRoutes };
