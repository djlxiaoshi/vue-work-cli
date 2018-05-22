/**
 * @Author JohnLi
 * @Date 2018/4/19 17:46
 */
import AppMain from '@/components/app-main/AppMain';
import Interface from '@/components/interface/Interface';
import Database from '@/components/database/Database';
import Auth from '@/components/auth/Auth';
import Apply from '@/components/auth/Apply';
import MyApplication from '@/components/auth/MyApplication';
import Check from '@/components/auth/Check';
import Settings from '@/components/auth/Settings';
import BusinessList from '@/components/business-manage/BusinessList';
import Plugins from '@/components/plugins/Plugins';

import NotFound from '@/components/shared/app-exception/NotFound';

import globalDataService from '@/assets/js/globalDataService';

/*
* 配置字段说明 Vue-router 部分 参考此链接 https://router.vuejs.org/zh-cn/api/options.html#routes
*icon：菜单图标
*label：菜单中文名
*hidden： 是否显示在菜单栏中
* childrenPosition: 如果有子路由，子路由是在侧边栏还是在顶部
* permission: 拥有该菜单的角色ID
* */

const globalData = globalDataService.getGlobalData();

const mainRoutes = [
  {
    path: '/interface',
    name: 'Interface',
    icon: 'fa-link',
    label: '接口查询',
    component: Interface
  },
  {
    path: '/database',
    name: 'Database',
    icon: 'fa-database',
    label: '数据库查询',
    component: Database
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
        // permission: [1, 2, 3, 99],
        // 避免直接通过浏览器导航栏进入
        beforeEnter: (to, from, next) => {
          // const permission = [1, 2, 3, 99];
          // permission.includes(globalData.userMsg.role_id) ? next() : next({
          //   path: '/'
          // });
        }
      },
      {
        path: 'settings',
        name: 'Settings',
        label: '权限设置',
        component: Settings,
        // permission: [2, 3, 99],
        // 避免直接通过浏览器导航栏进入
        beforeEnter: (to, from, next) => {
          // const permission = [2, 3, 99];
          // permission.includes(globalData.userMsg.role_id) ? next() : next({
          //   path: '/'
          // });
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
    path: '/business',
    name: 'Business',
    icon: 'fa-briefcase',
    label: '业务管理',
    component: BusinessList,
    // permission: [99],
    // 避免直接通过浏览器导航栏进入
    beforeEnter: (to, from, next) => {
      // const permission = [99];
      // permission.includes(globalData.userMsg.role_id) ? next() : next('/');
    }
  },
  {
    path: '/plugins',
    name: 'Plugins',
    label: '插件',
    component: Plugins,
    permission: [1, 2, 3, 99],
    // 避免直接通过浏览器导航栏进入
    beforeEnter: (to, from, next) => {
      const permission = [1, 2, 3, 99];
      permission.includes(globalData.userMsg.role_id) ? next() : next('/');
    }
  },
  {
    path: '',
    redirect: '/interface',
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
