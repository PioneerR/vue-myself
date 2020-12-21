import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

// 引入自定义组件 - 懒加载(提高页面加载速度)
const HelloWorld = resolve => require(['@/components/HelloWorld'], resolve);

// 路由
export default new Router({
  // mode: 'hash', 访问路径为：localhost:8080/#/index
  // mode: 'history', 访问路径为：localhost:8080/index
  mode: 'hash',	// 默认模式
  routes: [
    {
      path: '/index',
      component: HelloWorld
    }
  ]
})
