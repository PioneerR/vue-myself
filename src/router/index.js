import Vue from 'vue'
import Router from 'vue-router' // 引入路由插件后，才能new Router对象
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router) // Vue对象与Router对象的连接接口方法.use()

export default new Router({
  // mode: 'hash', 此时访问路径为：localhost:8080/#/index, 该模式为默认模式
  // mode: 'history', 此时访问路径为：localhost:8080/index
  mode: 'hash',
  routes: [
    {
      path: '/index',
      name: 'HelloWorld',
      component: HelloWorld
    }
  ]
})
