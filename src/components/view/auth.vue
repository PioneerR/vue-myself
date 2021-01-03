<template>

</template>


<script>
	
	import * as cookie from '../../api/util.cookie.js'
	
	export default {
		data() {
			return {
				userId:0,
				loc:''
			}
		},
		
		methods:{
			clearInput(){
				$('.input-phone').val('')
			},
			login(){
				// index.goIndex(this);
			}
		},
		
		mounted() {
			$("title").html("授权登入中···");
			this.userId = this.$route.query.userId;
			if(this.userId == null){
				this.$router.push("/login");
				return;
			}
			else{
				var vm = this;
				
				
				
			}
		}
	}


</script>


