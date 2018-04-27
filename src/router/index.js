import Vue from 'vue';
import Router from 'vue-router';
import { routes, mainRoutes } from './routes';
import globalDataService from '@/assets/js/global';

const path = require('path');
Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: routes
});

router.beforeEach((to, from, next) => {
  // 解析路由
  const pathArr = to.fullPath.split('/');
  pathArr.shift();
  const topNavList = getTopNavList(mainRoutes, pathArr);
  globalDataService.setGlobalHeader(topNavList);
  globalDataService.globalHeaderChange(topNavList);
  next();
});

/*
 * 使用path.join 的目的是 把/a 和 a 路径都转换成/a 统一格式
 * */
function getTopNavList (routes, pathArr) {
  let classIndex = 0;
  let currentPath = path.join('/', pathArr[classIndex]);
  let currentRoute = routes;
  let navList = [];
  loop(currentRoute, currentPath);
  function loop (currentRoute, currentPath) {
    currentRoute.forEach(route => {
      if (!route.hidden) {
        const _path = path.join('/', route.path);
        if (_path === currentPath && Array.isArray(route.children)) {
          if (route['childrenPosition'] !== 'top') {
            currentRoute = route.children;
            classIndex++;
            currentPath = path.join('/', pathArr[classIndex]);
            loop(currentRoute, currentPath);
          } else {
            navList = route['children'];
          }
        }
      }
    });
  }
  return navList;
}

export default router;
