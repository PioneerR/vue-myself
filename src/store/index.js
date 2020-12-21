import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

// vuex的数据链路：methods先dispatch到actions --> actions再commit到mutations的方法 --> mutations的方法更改state的数据值
export default new Vuex.Store({
	state,
	mutations,
	getters
});

// 状态方法mutations - 同步执行，actions则是异步执行
const mutations = {
	modFetchLoading(state, fetchLoading){
		state.fetchLoading = fetchLoading
	}
};

// 数据中心state
const state = {
	fetchLoading:false,
	position:[]
};

const getters = {
	// 请求数据时，加载状态
	fetchLoading: state => state.fetchLoading
};