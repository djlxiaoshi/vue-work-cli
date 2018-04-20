/**
 * @Author JohnLi
 * @Date 2018/4/19 17:46
 */
import AppMain from '@/components/app-main/AppMain';
import Child1 from '@/components/child/Child1';
import Child2 from '@/components/child/Child2';
import Child3 from '@/components/child/Child3';
import Parent1 from '@/components/parent/Parent1';

const sidebarConfig = [
  {
    path: '/home',
    name: 'Home',
    icon: 'el-icon-location',
    label: '导航一',
    component: Child1
  },
  {
    path: '/parent',
    icon: 'el-icon-menu',
    label: '导航二',
    component: Parent1, // 这里必须要有一个父组件 里面设置<router-view/>，不然里面的子组件会找不到<router-view/>
    children: [
      {
        path: 'child2',
        name: 'Child2',
        label: '选项一',
        component: Child2
      },
      {
        path: 'child3',
        name: 'Child3',
        label: '选项二',
        component: Child3
      },
      {
        path: '**',
        redirect: 'child2',
        notShowAtSidebar: true
      }
    ]
  },
  {
    path: '**',
    redirect: '/home',
    notShowAtSidebar: true
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
