/**
 * @Author JohnLi
 * @Date 2018/4/19 17:46
 */
import HelloWorld from '@/components/HelloWorld';

export default [
  {
    path: '/',
    name: 'HelloWorld',
    icon: 'el-icon-location',
    label: '导航一',
    component: HelloWorld
  },
  {
    path: '/about',
    name: 'About3',
    icon: 'el-icon-menu',
    label: '导航二',
    component: HelloWorld,
    children: [
      {
        path: '/about',
        name: 'About',
        label: '选项一',
        component: HelloWorld
      },
      {
        path: '/about2',
        name: 'About2',
        label: '选项二',
        component: HelloWorld
      }
    ]
  },
  {path: '', redirect: '/'}
];
