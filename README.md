# ETL System

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at http://etl-local.oa.com:8080
npm run startLocal  // 本地环境

# build for production with minification
npm run buildLocal  // 本地环境



```

## 环境列表

|环境名称|分支|配置文件|前端域名|后端域名|sso登录地址|
|:------|:---|:------|:-------|:------|:---------|
|本地环境|dev|dev.env.js|etl-local.boyaa.com(127.0.0.1)|etl-test.boyaa.com|sso.boyaa.com/Index/login/appid/1554|
|测试环境|test|test.env.js|etl-test.boyaa.com|etl-test.boyaa.com|sso.boyaa.com/Index/login/appid/1554|
|正式环境|release|prod.env.js|etl.boyaa.com|etl.boyaa.com|sso.boyaa.com/Index/login/appid/1554|

