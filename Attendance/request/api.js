import store from "@/store/index.js";

// API 请求根路径
var root = "http://127.0.0.1:8080"; //本地
// var root = "http://119.23.34.173:8080"; //服务器

var system = "auth";
var api = "api";

// API url路径
var urls = {
	login: `${root}/${system}/login`, //系统：登录授权
	
}

var searchResult = {}

// 封装请求方法
var req = {
	request(url, data, method, success, fail) {
		uni.request({
			url: url,
			data: data,
			method: method,
			header: {
				'content-type': 'application/json',
				'Authorization': '' //默认携带token，未登录时，token为''
			},
			success: (res) => {
				console.log(res);
				if (res.statusCode == 200) {
					success(res);
				} else if (res.statusCode == 401) {
					uni.showToast({
						icon: "none",
						title: res.errMsg || "登录信息过期，请重新登录！"
					})
				} else {
					// 打印错误提示
					uni.showToast({
						icon: "none",
						title: res.data.message || "请求失败"
					})
				}
			},
			fail: (err) => {
				console.log(method, url, "fail", err);
				if (fail) fail(err); // 如果失败方法非空，执行失败方法
			}
		});
	},
	requestWithToken(url, token, data1, method, success, fail) {
		uni.request({
			url: url,
			header: {
				'content-type': 'application/x-www-form-urlencoded',
				'Authorization': token //默认携带token，未登录时，token为''
			},
			data: data1,
			method: method,
			success: (res) => {
				success(res);
			},
			fail: (err) => {
				console.log(method, url, "fail");
			}
		});
	},
	requestWithToken1(url, token, data1, method, success, fail) {
		uni.request({
			url: url,
			header: {
				'content-type': 'application/json',
				'Authorization': token //默认携带token，未登录时，token为''
			},
			data: data1,
			method: method,
			success: (res) => {
				success(res);
			},
			fail: (err) => {
				console.log(err)
				console.log(method, url, "fail");
				if (fail) fail(err); // 如果失败方法非空，执行失败方法
			}
		});
	},
	getChildrenWithToken(url, token, method, success, fail) {
		uni.request({
			url: url,
			header: {
				'Authorization': token
			},
			// data: data1,
			method: method,
			success: (res) => {
				// console.log(res);
				if (res.statusCode == 200) {
					success(res);
				} else {
					// 打印错误提示
					uni.showToast({
						icon: "none",
						title: res.errMsg || "请求失败"
					})
				}
			},
			fail: (err) => {
				console.log(method, url, "fail");
				if (fail) fail(err); // 如果失败方法非空，执行失败方法
			}
		});
	},
	get(url, data, success, fail) {
		this.request(url, data, 'GET', success, fail);
	},
	getWithToken(url, token, data, success, fail) {
		this.requestWithToken(url, token, data, 'GET', success, fail);
	},
	post(url, data, success, fail) {
		this.request(url, data, 'POST', success, fail);
	},
	put(url, data, success, fail) {
		this.request(url, data, 'PUT', success, fail);
	},
	del(url, data, success, fail) {
		this.request(url, data, 'DELETE', success, fail);
	},


	// 退出登录
	logout() {
		var url = urls.logout;
		var data = {};
		store.commit("logout");
	}
}

export default {
	root,
	urls,
	req,
	searchResult
}
