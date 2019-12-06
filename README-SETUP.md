# WEB-HTML
## 1. 前端技术选型
1.1. https://cn.vuejs.org/
> Vue.js,Vue (读音 /vjuː/，类似于 view) 是一套用于构建用户界面的渐进式框架。与其它大型框架不同的是，Vue 被设计为可以自底向上逐层应用。Vue 的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合。另一方面，当与现代化的工具链以及各种支持类库结合使用时，Vue 也完全能够为复杂的单页应用提供驱动。

1.2. https://element.eleme.cn/
> Element，一套为开发者、设计师和产品经理准备的基于 Vue 2.0 的桌面端组件库.

1.3. http://www.axios-js.com/zh-cn/docs/index.html
> Axios 是一个基于 promise 的 HTTP 库，可以用在浏览器和 node.js 中。

## 2. 前端环境搭建
2.1 http://nodejs.cn/
> 安装NODEJS

2.2 淘宝镜像cnpm安装
> `npm install -g cnpm --registry=https://registry.npm.taobao.org`

> `cnpm : 无法加载文件 C:\Users\hp\AppData\Roaming\npm\cnpm.ps1` 解决方法:1.以管理员身份运行power shell；2.输入set-ExecutionPolicy RemoteSigned；3.然后输入A，回车，问题解决。

2.3 webpack 全局安装
> `cnpm install -g webpack`

2.4 vue脚手架全局安装 -- 用于生成vue模板
> `cnpm install -g vue-cli`

2.5 使用脚手架构建vue项目 -- 一路回车就行了
> `vue init webpack`

* 到这一步，就可以直接使用vue+webpack开发了

2.6 element-ui安装
> cnpm i element-ui

2.7 依赖安装，这里用cnpm安装，因为依赖太多不然，不然让你等的蛋疼 -- 会在项目中生成一个node_modules文件
> cnpm install

* 大功告成，这里可以运行了
> npm run dev

2.8 在\src\components\新建个vue组件，组件名为radio
...
<template>
  <el-radio-group v-model="radio2">
    <el-radio :label="3">备选项</el-radio>
    <el-radio :label="6">备选项</el-radio>
    <el-radio :label="9">备选项</el-radio>
  </el-radio-group>
</template>
 
<script>
  export default {
    data () {
      return {
        radio2: 3
      };
    }
  }
</script>
'''

2.9 在\src\router.js中设置路由
...js
import radio from '@/components/radio' //引入刚创建的组件
//设置路由
{
      path: '/radio',
      name: 'radio',
      component: radio
}
...

2.10 在\src\main.js中加入element-ui的js和css
...js
import ElementUI from 'element-ui' //element-ui的全部组件
import 'element-ui/lib/theme-chalk/index.css'//element-ui的css
Vue.use(ElementUI) //使用elementUI
...


## 3. 运行调试命令行
# html

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
