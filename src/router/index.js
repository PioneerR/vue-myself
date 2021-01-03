import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

// 引入自定义组件 - 懒加载(提高页面加载速度)
const hello = resolve => require(['@/components/helloWorld'], resolve);

// 首页
const index = resolve => require(['@/components/index'], resolve);
const login = resolve => require(['@/components/login'], resolve);

// 路由
export default new Router({
	// mode: 'hash', 访问路径为：localhost:8080/#/index
	// mode: 'history', 访问路径为：localhost:8080/index
	mode: 'hash',	// 默认模式
	routes: [
		{
			path: "",
			redirect: "/auth"
		},
		{
			path: "/",
			component: index
		},
		{
			path: "/login",
			component: login,
			meta:{ requireAuth:true }
		},
		{
			path: "/hello",
			component: hello,
			meta:{ requireAuth:true }
		}
	]
})
