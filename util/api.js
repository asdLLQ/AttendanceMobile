//const BASR_URL = 'https://attendance.keepdev.top/api'
const BASR_URL = 'http://172.17.169.27:8080'
/*export const myRequest = (options)=>{
	return new Promise((resolve,reject)=>{
		uni.request({
			url:BASR_URL + options.url,
			method:options.method || 'GET',
			data:options.data || {},
			success: (res)=>{
				console.log(res)
				if(res.data.status !== 200) {
					return uni.showToast({
						title:'请求失败'
					})
				}
				resolve(res)
			},
			fali:(err)=>{
				//if(err)
				console.log(err)
				uni.showToast({
					title:'请求接口失败'
				})
				reject(err)
			}
		})
	})
} */

// 封装请求方法
 export const myRequest = {
	setToken(token){
		console.log("token:" + token)
		uni.setStorageSync('token', token)
	},
	request(url, data, method, success, fail) {
		uni.request({
			url: BASR_URL + url,
			data: data,
			method: method,
			success: (res) => {
				console.log(res);
				success(res);
			},
			fail: (err) => {
				console.log(method, url, "fail", err);
				//fail(err); // 如果失败方法非空，执行失败方法
			}
		});
	},
	requestWithToken(url, data1, method, success, fail) {
		const token = uni.getStorageSync('token')
		console.log("requestWithToken：" + token)
		uni.request({
			url: BASR_URL + url,
			header: {
				'content-type': 'application/json',
				'Authorization': 'Bearer '+token //默认携带token，未登录时，token为''
			},
			data: data1,
			method: method,
			success: (res) => {
				if (res.statusCode == 200) {

					console.log('inside api:success',res)
					success(res.data)
				} else {
					console.log("status code:",res.statusCode);
					uni.showToast({
						icon:"none",
						title:res.data.message
					});
					if(fail){
						fail(res);
					}
				} 
				console.log("success request");
				success(res);
			},
			fail: (err) => {
				console.log(method, url, "fail");
				uni.showToast({
					icon:"none",
					title:err.data.message
				});
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