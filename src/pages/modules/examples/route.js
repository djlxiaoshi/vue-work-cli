/**
 * @Author JohnLi
 * @Date 2018/6/1 11:07
 */
// 示例组件
const Examples = (resolve) => {
  import(/* webpackChunkName: "examples" */'./Examples.vue').then((module) => {
    resolve(module);
  });
};

const AppOptionsEg = (resolve) => {
  import(/* webpackChunkName: "examples" */'./AppOptionsEg.vue').then((module) => {
    resolve(module);
  });
};

const AppTableEg = (resolve) => {
  import(/* webpackChunkName: "examples" */'./AppTableEg.vue').then((module) => {
    resolve(module);
  });
};

const AppMenuEg = (resolve) => {
  import(/* webpackChunkName: "examples" */'./AppMenuEg.vue').then((module) => {
    resolve(module);
  });
};

export default {
  path: '/examples',
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
};
