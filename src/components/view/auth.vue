<template>

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

			if(this.userId == null){
				this.$router.push("/login");
				return;
			}
			else{
				var vm = this;
				vm.$http.post(
					vm.apiUrl + '/wx/login',
					{},
					{emulateJSON: true}
				).then((response) => {
					// success callback


				}, (response) => {
					// error callback

				})
			}
		}
	}


</script>


