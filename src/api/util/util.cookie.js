/*------------------------------------------- 设置Cookie ----------------------------------------*/

export function setCookie(name, value, expireDays) {
	var expire = new Date();
	expire.setDate(expire.getDate() + expireDays);
	document.cookie = name + "=" + escape(value) + (expireDays == null ? "" : ";expires=" + expire.toUTCString());
}

/*------------------------------------------- 获取Cookie ----------------------------------------*/

export function getCookie(name) {
	var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
	if (arr = document.cookie.match(reg)) {
		return (arr[2]);
	} else {
		return null;
	}
}

/*------------------------------------------- 删除Cookie ----------------------------------------*/

// 可根据格林威治时间 (GMT) 把 Date 对象转换为字符串
export function delCookie(name) {
	var expire = new Date();
	expire.setTime(expire.getTime() - 1);
	var value =  getCookie(name);
	if(value != null){
		document.cookie = name + "=" + value + ";expires=" + expire.toUTCString();
	}
}



