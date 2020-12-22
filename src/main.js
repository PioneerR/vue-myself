import Vue from 'vue'

/* ------------------- 引入 - 插件 -------------------------- */

import axios from "axios"		// 引入ajax
import router from './router'	// 引入路由配置
import App from './App'			// 引入根组件App.vue
import qs from 'qs'	 			// 能把json格式的直接转成data所需的格式

/* ------------------- 引入 - 插件 - UI --------------------- */

import ElementUI from 'element-ui'	// 饿了么ui组件库
import {Picker} from 'mint-ui' 		// 移动端ui组件库
import {Search} from 'mint-ui'

/* ------------------- 引入 - CSS --------------------------- */






/* --------------------- 注册 - 插件 ------------------------ */

Vue.use(ElementUI);



/* --------------------- 注册 - 全局组件 -------------------- */

Vue.component(Search.name, Search);




/* ------------- 定义 - 原型属性/全局属性/常量 --------------- */

Vue.prototype.$axios = axios;
Vue.prototype.$qs = qs;

Vue.prototype.imgUrl = 'http://oss.yzmjnts.com/images';
Vue.prototype.fileUrl = 'http://oss.yzmjnts.com/file';


// true  true  : 本地环境
// false true  : 测试环境
// false false : 正式环境
const debug = true;
const wxDebug = true;

// 本地环境
if(debug && wxDebug){
	Vue.prototype.apiUrl = 'http://localhost:8080/api';
}
// 测试环境
else if(!debug && wxDebug){
	Vue.prototype.apiUrl = 'http://39.106.23.233:8080/api';
}
// 正式环境
else if(!debug && !wxDebug){
	Vue.prototype.apiUrl = 'http://www.sx.com/api';
}


// 路由 - 前处理
router.beforeEach((to, from, next) =>{
	// 分享id
	var shareUserId = window.sessionStorage.getItem("shareUserId");
	if(shareUserId == undefined || shareUserId == 'undefined'){
		shareUserId = to.query.shareUserId;
	}
	shareUserId = undefined == shareUserId ? 0 : shareUserId;
	window.sessionStorage.setItem("shareUserId", shareUserId);


	// 要求授权，且路径不是登录和首页时，获取当前登录用户后，next()
	if(to.meta.requireAuth && to.path != '/' && to.path != '/login'){
		var user = window.sessionStorage.getItem("user") != 'undefined' ? JSON.parse(window.sessionStorage.getItem("user")) : null;
		if(user == null || user == undefined){
			// 微信授权登录 - 测试环境、正式环境
			if(!debug){
				window.location.href = this.apiUrl + "/weixin/login?shareUserId=" + shareUserId;
			}
			// 测试环境
			else{
				next('/login');
			}
			return;
		}
	}
	next();
});


// 路由 - 后处理 - 滚动到0,0坐标
router.afterEach((to, from, next) =>{
	window.scrollTo(0, 0);
});


/* --------------------- 初始化 - 实例 --------------------- */

new Vue({
  el: '#app',  		   // 会替换index.html这个容器文件中 id为app的div元素, 将所有视图放在id值为app这个dom元素中
  router, 	  		   // 使用路由，路由文件在router文件夹下的index.js，路由对象在文件中生成
  components: { App }, // 表示当前使用App组件，即App.vue文件/视图，每一个组件都是单页面组件，当我们引入这个文件后，就相当于引入对应的结构、样式和JS代码
  template: '<App/>'   // 这个文件的内容将以<App/>这样的标签写进#app中，表示用<app></app>替换index.html里面的<div id="app"></div>
});


Vue.config.productionTip = false; // 阻止启动生产消息