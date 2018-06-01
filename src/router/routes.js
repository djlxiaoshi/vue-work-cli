/**
 * @Author JohnLi
 * @Date 2018/4/19 17:46
 */
import AppMain from '@/pages/app-main/AppMain';
import NotFound from '@/components/app-exception/NotFound.vue';

/*
* 配置字段说明 Vue-router 部分 参考此链接 https://router.vuejs.org/zh-cn/api/options.html#routes
*icon：菜单图标
*label：菜单中文名
*hidden： 是否显示在菜单栏中
* childrenPosition: 如果有子路由，子路由是在侧边栏还是在顶部
* permission: 拥有该菜单的角色ID
* */

const mainRoutes = [
  ...(r => {
    return r.keys().map(key => r(key).default);
  })(require.context('../pages/modules', true, /route\.js$/)),
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
