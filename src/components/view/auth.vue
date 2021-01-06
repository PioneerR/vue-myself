<template>
	<div class="hello">
		<h1>auth</h1>
	</div>
</template>


<script>

	export default {
		data() {
			return {
				userId: 0,
				path:''
			}
		},

		methods: {
			clearInput() {
				$('.input-phone').val('')
			}
		},

		mounted() {
			$("title").html("授权登入中···");
			this.userId = this.$route.query.userId;
			this.path = this.$route.query.path;
			console.log("userId:" + this.userId);

			if(this.userId == null){
				this.$router.push("/login");
				return;
			}
			else{
				this.$http.post(
					this.apiUrl + '/login',
					{userId: this.userId},
					{emulateJSON: true}
				).then((response) => {
					// 获取 - 返回数据
					var data = response.data;
					if(data.success){
						window.sessionStorage.setItem("user", JSON.stringify(data.user));
						if(this.path == "/login" || this.path == ""){
							this.$router.push("/index");
						}else{
							this.$router.push(this.path);
						}
						
					}else{
						this.$message({
							type: 'error',
							duration: 1000,
							message: "登录失败"
						});
						this.$router.push("/login");
					}
				}, (response) => {
					// error callback

				})
			}
		}
	}


</script>


