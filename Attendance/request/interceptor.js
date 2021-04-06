import api from '../api.js'


const baseUrl = api.req.urls;
// 定义基础请求路径(处理链接的拦截器)
const baseRequest = (opts, data) => {
	let baseDefaultOpts = {
		url: baseUrl + opts.url,
		// 请求接口地址
		data: data,
		// 传入请求参数
		method: opts.method,
		// 配置请求类型
		header: opts.method == 'get' ? {
			'X-Requested-With': 'XMLHttpRequest',
			"Accept": "application/json",
			"Content-Type": "application/json; charset=UTF-8"
		} : {
			'X-Requested-With': 'XMLHttpRequest',
			'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
		},
		// 配置请求头
		dataType: 'json',
	}
	let promise = new Promise(function(resolve, reject) {
		uni.request(baseDefaultOpts).then(
			(res) => {
				console.log(JSON.stringify(res[1].data))
				if (res[1].data.state == '200' || res[1].data.state == 201) {
					resolve(res[1].data)
				}
				if (res[1].data.state == '401') {
					uni.showToast({
						icon: 'none',
						title: '尚未登录',
						duration: 2000
					});
					return false
				}
			}
		).catch(
			(response) => {
				reject(response)
				handleError(response)
			}
		)
	})
	return promise
};

//带Token请求(处理token的拦截器)
const TokenRequest = (opts, data) => {
	let daoyunToken = "";
	uni.getStorage({
		key: 'token',
		success: function(res) {
			daoyunToken = res.data
		}
	});
	//token是登录成功后后台返回保存在storage中的
	let DefaultOpts = {
		url: baseUrl + opts.url,
		data: data,
		method: opts.method,
		header: opts.method == 'get' ? {
			'Token': daoyunToken,
			'X-Requested-With': 'XMLHttpRequest',
			"Accept": "application/json",
			"Content-Type": "application/json; charset=UTF-8"
		} : {
			'Token': daoyunToken,
			'X-Requested-With': 'XMLHttpRequest',
			'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
		},
		dataType: 'json',
	}
	let promise = new Promise(function(resolve, reject) {
		uni.request(DefaultOpts).then(
			(res) => {
				console.log(JSON.stringify(res[1].data))
				if (res[1].data.state == '200' || res[1].data.state == 201) {
					resolve(res[1].data)
				}
				if (res[1].data.state == '105' || res[1].data.state == 105) {
					uni.showToast({
						icon: 'none',
						title: '尚未登录',
						duration: 2000
					});
					return false
				}
			}
		).catch(
			(response) => {
				reject(response)
				handleError(response)
			}
		)
	})
	return promise
}

//统一异常处理
const handleError = (response) => {
	switch (response) {
		case 400:
			uni.showToast({
				icon: 'none',
				title: '请求描述不正确',
				duration: 2000
			});
			
		case 401:
			uni.showToast({
				icon: 'none',
				title: '尚未授权',
				duration: 2000
			});

		case 404:
			uni.showToast({
				icon: 'none',
				title: '访问路径不存在',
				duration: 2000
			});
			
		case 403:
			uni.showToast({
				icon: 'none',
				title: '操作不被服务器执行',
				duration: 2000
			});	
			
		case 500:
			uni.showToast({
				icon: 'none',
				title: '服务器出错了',
				duration: 2000
			});
	}
}

export default {
	baseUrl,
	baseRequest,
	TokenRequest
}
