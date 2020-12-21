import Vue from 'vue'
import App from './App'			// 引入 同级的 App.vue文件/组件
import router from './router'   // 引入路由配置

// Vue.config.productionTip = false

new Vue({
  el: '#app',  		   // 会替换index.html这个容器文件中 id为app的div元素, 将所有视图放在id值为app这个dom元素中
  router, 	  		   // 使用路由，路由文件在router文件夹下的index.js，路由对象在文件中生成
  components: { App }, // 表示当前使用App组件，即App.vue文件/视图，每一个组件都是单页面组件，当我们引入这个文件后，就相当于引入对应的结构、样式和JS代码
  template: '<App/>'   // 这个文件的内容将以<App/>这样的标签写进#app中，表示用<app></app>替换index.html里面的<div id="app"></div>
});
