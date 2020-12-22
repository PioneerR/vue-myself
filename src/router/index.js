import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

// 引入自定义组件 - 懒加载(提高页面加载速度)
const HelloWorld = resolve => require(['@/components/HelloWorld'], resolve);
// 首页
const Index = resolve => require(['@/components/Index'], resolve);
const Login = resolve => require(['@/components/Login'], resolve);

// 路由
export default new Router({
	// mode: 'hash', 访问路径为：localhost:8080/#/index
	// mode: 'history', 访问路径为：localhost:8080/index
	mode: 'hash',	// 默认模式
	routes: [
		{
			path: '/',
			component: Index
		},
		{
			path: '/login',
			component: Login
		},
		{
			path: '/index',
			component: HelloWorld,
			meta:{ requireAuth:true }
		}
	]
})
