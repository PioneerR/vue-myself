import Vue from 'vue'


/* ------------------- 引入 - 插件 -------------------------- */

import axios from "axios"				// 引入ajax
import vueResource from 'vue-resource'	// $http.post()
import router from './router'			// 引入路由配置
import App from './App'					// 引入根组件App.vue
import qs from 'qs'	 					// 能把json格式的直接转成data所需的格式
import $ from 'jquery'					// jQuery
// import $ from 'zepto'				// 轻量级的jQuery
import exif from 'exif-js';				// 图片旋转
import clipboard from 'vue-clipboard2';	// 剪切板
import waterfall from 'vue-waterfall2';	// 瀑布流布局


/* ------------------- 引入 - 插件 - UI --------------------- */

import vant from 'vant';				// 组件库
import ElementUI from 'element-ui'		// 饿了么ui组件库

import {Search} from 'mint-ui';			// 移动端ui组件库 - 搜索框
import {Popup} from 'mint-ui';			// 移动端ui组件库 - 弹出框
import {Picker} from 'mint-ui' 			// 移动端ui组件库 - 单选
import {Cell} from 'mint-ui';			// 移动端ui组件库 - 单元格
import {Loadmore} from 'mint-ui';		// 移动端ui组件库 - 下拉/上拉刷新
import {InfiniteScroll} from 'mint-ui';	// 移动端ui组件库 - 无限滚动
import {Toast} from 'mint-ui';			// 移动端ui组件库 - 简短消息提示框
import {Indicator} from 'mint-ui';			// 移动端ui组件库 - 加载提示框


/* ------------------- 引入 - CSS --------------------------- */

import 'element-ui/lib/theme-chalk/index.css';
import 'mint-ui/lib/style.css'
import response from "vue-resource/src/http/response";


/* --------------------- 注册 - 插件 ------------------------ */

Vue.use(ElementUI);
Vue.use(vueResource);
Vue.use(InfiniteScroll);
Vue.use(vant);
Vue.use(clipboard);
Vue.use(waterfall);

// 注册 - jquery插件
window.jQuery = $;
window.$ = $;


/* --------------------- 注册 - 全局组件 -------------------- */

Vue.component(Cell.name, Cell);
Vue.component(Search.name, Search);
Vue.component(Popup.name, Popup);
Vue.component(Toast.name, Toast);
Vue.component(Picker.name, Picker);
Vue.component(Loadmore.name, Loadmore);


/* ------------- 定义 - 原型属性/全局属性/常量 --------------- */

Vue.prototype.$axios = axios;
Vue.prototype.$qs = qs;
Vue.prototype.$exif = exif;

Vue.prototype.imgUrl = 'http://oss.yzmjnts.com/images';
Vue.prototype.fileUrl = 'http://oss.yzmjnts.com/file';


// true  true  : 本地环境
// false true  : 测试环境
// false false : 正式环境
const debug = true;
const wxDebug = true;

// 本地环境
if (debug && wxDebug) {
	Vue.prototype.apiUrl = 'http://localhost:8080/api';
}
// 测试环境
else if (!debug && wxDebug) {
	Vue.prototype.apiUrl = 'http://39.106.23.233:8080/api';
}
// 正式环境
else if (!debug && !wxDebug) {
	Vue.prototype.apiUrl = 'http://www.sx.com/api';
}


/* --------------------- axios - 参数配置 -------------------- */

axios.defaults.baseURL = Vue.prototype.apiUrl;	// axios访问路径前缀

/* ----------------- axios - 请求前/请求后处理 --------------- */

// 请求前处理
axios.interceptors.request.use(config => {
	// 加载提示框，某些路径，调用加载动画
	var url = config.url;
	if(url.indexOf("/test") >= 0){
		$(".mint-indicator-spin").html('<img src="/static/images/loading.gif" height="100%" width="100%" />');
		$(".mint-indicator-spin").css("width", "1rem");
		$(".mint-indicator-wrapper").css("z-index", "999");
		$(".mint-indicator-wrapper").css("background-color", "inherit");
		Indicator.open({text: '', spinnerType: 'fading-circle'});
	}

	// 请求头加上sysToken、userId
	var user = window.sessionStorage.getItem("user");
	var token, userId;
	if (user != undefined && user != null) {
		user = JSON.parse(user);
		token = user.sysToken;
		userId = user.id;
	}
	// 如果token存在，http header加上token和userId
	if (token) {
		config.headers.Authorization = token;
		config.headers.userId = userId;
	}
	return config;
}, error => {
	return Promise.reject(error);
});


// 请求后处理
axios.interceptors.response.use(res => {
	Indicator.close();
	return res;
}, error => {
	return Promise.reject(error);
});

/* ------------------ vue-resource 请求前处理 ------------------ */

Vue.http.interceptors.push(function (request, next) {
	// 加载提示框，某些路径，调用加载动画
	var url = config.url;
	if(url.indexOf("/test") >= 0){
		$(".mint-indicator-spin").html('<img src="/static/images/loading.gif" height="100%" width="100%" />');
		$(".mint-indicator-spin").css("width", "1rem");
		$(".mint-indicator-wrapper").css("z-index", "999");
		$(".mint-indicator-wrapper").css("background-color", "inherit");
		Indicator.open({text: '', spinnerType: 'fading-circle'});
	}

	// 请求头加上sysToken、userId
	var user = window.sessionStorage.getItem("user");
	var token, userId;
	if (user != undefined && user != null) {
		user = JSON.parse(user);
		token = user.sysToken;
		userId = user.id;
	}
	// 如果token存在，http header加上token和userId
	if (token) {
		Vue.http.headers.common.Authorization = token;
		Vue.http.headers.common.userId = userId;
	}

	next(response =>{
		Indicator.close();
		return response;
	});
});


/* ------------------ 路由 - 前处理/后处理 ------------------ */

// 路由 - 前处理 - 微信授权登陆 or 账号密码登陆
router.beforeEach((to, from, next) => {
	// 分享id
	/*var shareUserId = window.sessionStorage.getItem("shareUserId");
	if(shareUserId == undefined || shareUserId == 'undefined'){
		shareUserId = to.query.shareUserId;
	}
	shareUserId = undefined == shareUserId ? 0 : shareUserId;
	window.sessionStorage.setItem("shareUserId", shareUserId);*/


	// 要求授权，且访问路径不是登录页时，获取当前登录用户后，next()
	if (to.meta.requireAuth && to.path != '/login') {
		// console.log("进入页面，需要授权");
		var user = window.sessionStorage.getItem("user") != 'undefined' ? JSON.parse(window.sessionStorage.getItem("user")) : null;
		if (user == null || user == undefined) {
			// 测试环境、正式环境 - 微信授权登录
			if (!debug) {
				// path中有特殊字符，传输到后端时，需要转义
				window.location.href = this.apiUrl + "/wx/login?path=" + encodeURIComponent(to.path);
			}
			// 本地环境 - 账号密码登陆
			else {
				next('/login');
			}
			return;
		}
	}
	// console.log("不需要授权，直接通过");
	next();
});


// 路由 - 后处理 - 滚动到0,0坐标
router.afterEach((to, from, next) => {
	window.scrollTo(0, 0);
});


/* --------------------- 初始化 - 实例 --------------------- */

new Vue({
	el: '#app',  		   // 会替换index.html这个容器文件中 id为app的div元素, 将所有视图放在id值为app这个dom元素中
	router, 	  		   // 使用路由，路由文件在router文件夹下的index.js，路由对象在文件中生成
	components: {App}, // 表示当前使用App组件，即App.vue文件/视图，每一个组件都是单页面组件，当我们引入这个文件后，就相当于引入对应的结构、样式和JS代码
	template: '<App/>'   // 这个文件的内容将以<App/>这样的标签写进#app中，表示用<app></app>替换index.html里面的<div id="app"></div>
});


Vue.config.productionTip = false; // 阻止启动生产消息