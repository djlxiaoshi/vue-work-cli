/**
 * @Author JohnLi
 * @Date 2018/4/19 17:46
 */
import AppMain from '@/components/app-main/AppMain';
import Interface from '@/components/interface/Interface';
import Database from '@/components/database/Database';
import Auth from '@/components/auth/Auth';
import Apply from '@/components/auth/Apply';
import Check from '@/components/auth/Check';
import Settings from '@/components/auth/Settings';
import Plugins from '@/components/plugins/Plugins';

/*
* 配置字段说明 Vue-router 部分 参考此链接 https://router.vuejs.org/zh-cn/api/options.html#routes
*icon：菜单图标
*label：菜单中文名
*hidden： 是否显示在菜单栏中
* */

const sidebarConfig = [
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
        path: 'check',
        name: 'Check',
        label: '权限审核',
        component: Check
      },
      {
        path: 'settings',
        name: 'Settings',
        label: '权限设置',
        component: Settings
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
    component: Plugins,
    hidden: true
  },
  {
    path: '**',
    redirect: '/interface',
    hidden: true
  }
];

const routes = [
  {
    path: '/',
    component: AppMain,
    children: sidebarConfig
  },
  {
    path: '**',
    redirect: '/'
  }
];

export { routes, sidebarConfig };
