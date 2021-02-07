<template>
	<div class="hello">
		<span>{{ msg }}</span>
	</div>
</template>


<script>
	export default {
		data() {
			return {
				msg: '这里是首页！'
			}
		},
		mounted() {
			$("title").html("首页");
			this.getIndexInfo();


		},
		methods: {
			getIndexInfo: function () {
				// var vm = this;
				/*this.$http.post(
					this.apiUrl + '/index/info',
					{},
					{emulateJSON: true}
				).then((response) => {
					// 获取 - 返回数据
					var data = response.data;
					if (data.success) {
						var info = data.info;
						console.log("info :" + info);

					} else {
						this.$message({
							type: 'error',
							duration: 1000,
							message: "系统异常，请稍后重试"
						});
					}
				}, (response) => {
					// error callback

				})*/
				var vm = this;
				vm.$axios.post("/index/info", {
				  // phone: vm.phone
				}).then(res => {
				  var data = res.data;
				  if (data.success) {
					 
				  }
				  else {
				    vm.$message({
				      showClose: true,
				      type: 'warning',
				      message: "失败"
				    });
				  }
				});
			}

		}
	}
</script>


<style scoped>
	h1, h2 {
		font-weight: normal;
	}
	
	ul {
		list-style-type: none;
		padding: 0;
	}
	
	li {
		display: inline-block;
		margin: 0 10px;
	}
	
	a {
		color: #42b983;
	}
</style>
