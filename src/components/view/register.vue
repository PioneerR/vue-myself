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
			console.log("register..........")
			
		}
	}


</script>


