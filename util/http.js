//const BASE_URL = 'https://attendance.keepdev.top/api'
const BASE_URL = 'http://172.17.169.27:8080'
const NOAUTH_URL = ['/auth/login', '/', '/version', '/echo']
const OVERRIDED_METHODS = ['PUT', 'DELETE', 'PATCH']
/**
 *  Http Promise 封装
 */
const http = {
	request(method, url, data, header = {}) {
		return new Promise((reslove, reject) => {
			uni.request({
				url, data, header,
				method,
				success: ({ data, statusCode, header }) => {
					if (statusCode == 200) reslove(data)
					else reject(data.message)
				},
				fail: (error) => {

					reject(error)
				}
			})
		})
	},
	get(url, data, header = {}) {
		return this.request('GET', url, data, header)
	},
	post(url, data, header = {}) {
		return this.request('POST', url, data, header)
	},
	put(url, data, header = {}) {
		return this.request('PUT', url, data, header)
	},
	delete(url, data, header = {}) {
		return this.request('DELETE', url, data, header)
	},
	patch(url, data, header = {}) {
		return this.request('PATCH', url, data, header)
	}

}

//统一异常处理
const handleError = (status) => {
	switch (status) {
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

uni.addInterceptor('request', {
	/**
	 * 请求发出前
	 * @param {*} args 
	 */
	invoke(args) {
		const token = uni.getStorageSync('token')
		let method = args.method.toUpperCase()
		let header = {}
		if (OVERRIDED_METHODS.includes(method)) {
			// 方法覆写，用post模拟这些方法
			header['X-HTTP-Method-Override'] = method
			method = 'POST'
		}
		if (!args.url.startsWith('http')) {
			// request 触发前拼接 url 
			args.url = BASE_URL + args.url
		}

		const url = new URL(args.url)

		if (!NOAUTH_URL.includes(url.pathname)) {
			//默认携带token，未登录时，token为''
			header['Authorization'] = 'Bearer ' + token
		}
		args.header = { ...header, ...args.header }
		args.method = method


	},
	/**
	 * 请求成功, 似乎不管状态码是什么都会请求这个
	 * @param {*} args 
	 */
	success({ data, statusCode, header, errMsg }) {	
		if (statusCode != 200) {
			handleError(statusCode)
		}
	},
	/**
	 * 请求失败
	 * @param {*} err 
	 */
	fail(err) {
		console.log('interceptor-fail', err)
	},
	// /**
	//  * 请求结束(成功和失败)
	//  * @param {*} res 
	//  */
	// complete(res) {
	// 	console.log('interceptor-complete', res)
	// }
})

export default http;