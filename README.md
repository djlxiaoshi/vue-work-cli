# ETL System

## 安装

``` bash
# install dependencies
npm install

# serve with hot reload at http://etl-local.oa.com:8080
npm run startLocal  // 本地环境
npm run startTest  // 测试环境

# build for production with minification
npm run buildLocal  // 本地环境
npm run buildLocal  // 测试环境

```

## 环境列表

|环境名称|分支|配置文件|前端域名|后端域名|sso登录地址|
|:------|:---|:------|:-------|:------|:---------|
|本地环境|dev|environment/dev.env.js|etl-local.oa.com(127.0.0.1)|etl-server-test.oa.com|sso.boyaa.com/Index/login/appid/1873|
|测试环境|test|environment/test.env.js|etl-test.oa.com|etl-server-test.oa.com|sso.boyaa.com/Index/login/appid/1871|
|正式环境|release|environment/prod.env.js|etl.oa.com|etl-server.oa.com|sso.boyaa.com/Index/login/appid/1554|

## 目录结构
```text
+-- src
| +-- assets // 项目公共资源
| | +-- css // 初始化浏览器样式
| | +-- images // 项目中所有用到的图片资源
| | +-- js // 公共js
| +-- components // 项目公共组件 （这个里面的组件会自动全局注册，详见main.js自动注册代码部分）
| +-- pages // 项目页面
| |+-- core // 
| |+-- modules // 项目模块（每一个侧边栏的菜单都是一个模块）
| +-- plugins // Vue插件
| +-- router // 路由
| +-- store // Vuex文件
| +-- environment // 环境配置文件
| +-- App.vue // Vue根组件
| +-- loading.html // 项目启动时的loading
| +-- main.js // 项目入口文件
+-- static // 项目静态文件
+-- test // 项目测试文件
+-- theme // element-ui主题文件 （使用请看[element-ui自定义主题](http://element-cn.eleme.io/#/zh-CN/component/custom-theme)）
+-- cp-environment.js  // 设置环境的js代码（利用shell.js进行文件的整体复制）

```
## 相关资源
  - MVVM框架  [Vue](https://cn.vuejs.org/v2/guide/)
  - 路由  [Vue-Router](https://router.vuejs.org/zh/)
  - 数据管理 [Vuex](https://vuex.vuejs.org/zh/)
  - UI框架 [Element-UI](http://element.eleme.io)
  - ajax请求 [axios](https://github.com/axios/axios)
  - 字体图标库 [font-awesome@4.7.0](http://fontawesome.dashgame.com/)
  - 页面上方进度条 [nprogress@0.2.0](https://github.com/rstacruz/nprogress)
  - 人员选择器  [参考链接](http://cms.oa.com/demo/uCheck2.html)  属于公司内部插件
  - 计算表格列宽 [gettabledatasize](https://github.com/taozhiw/getTableDataSize)
  
## 项目公共组件配置
  
  [app-table](src/components/app-table/config.md)
  
  [ap-options](src/components/app-options/config.md)
  
  [app-menu](src/components/app-menu/config.md)
  
## 项目用到的一些优化技术
  - element-ui 组件按需加载 
  - 公共组件自动化全局注册 使用webpack的require.context来进行加载
  - route路由配置文件去中心化 同样是使用webpack的require.context来进行组件加载
  - [路由懒加载](https://router.vuejs.org/zh/guide/advanced/lazy-loading.html#%E6%8A%8A%E7%BB%84%E4%BB%B6%E6%8C%89%E7%BB%84%E5%88%86%E5%9D%97) 每一个侧边栏的菜单都是一个模块，每个模块都是到使用的时候才会加载 
  - 利用递归组件实现无限层级菜单，具体参考[递归组件](https://cn.vuejs.org/v2/guide/components-edge-cases.html#%E9%80%92%E5%BD%92%E7%BB%84%E4%BB%B6)
  - 利用\$attrs和\$listeners方便跨层级组件通信
  - 利用webpack-html-plugin实现白屏时loading插入和favicon.jpg的设置
  - [实用的优化技巧](https://zhuanlan.zhihu.com/p/37148975?utm_source=wechat_session&utm_medium=social&utm_oi=32383348768768&from=timeline&isappinstalled=0)
  - [更多](http://djl.pub)
  
## 项目数据说明
**role_id:** `user/info/`  接口
```text
 1: 普通用户
 2: 业务管理人员
 3: 业务配置人员
 99: 管理人员
```
