<template>

</template>


<script>

	export default {
		data() {
			return {
				userId: 0,
			}
		},

		methods: {
			clearInput() {
				$('.input-phone').val('')
			}
		},

		mounted() {
			$("title").html("授权登入中···");
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


</script>


