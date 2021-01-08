// 执行 - 登录
export function login(vm) {
	vm.$axios.post("/login-manual", vm.$qs.stringify({
	  phone: vm.phone,
	  password: vm.password
	})).then(res => {
	  var data = res.data;
	  if (data.success) {
	  	vm.$message({
	  	  showClose: true,
	  	  type: 'success',
	  	  message: "登录成功"
	  	});
	  	var user = data.user;
	  	window.sessionStorage.setItem("user", JSON.stringify(user));

	  	// 跳转首页
	  	vm.$router.push("/index");
	  }
	  else {
		vm.$message({
		  showClose: true,
		  type: 'warning',
		  message: data.info
		});
	  }
	});
}



