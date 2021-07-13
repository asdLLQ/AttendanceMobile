let BASE_URL = 'https://attendance.keepdev.top/api'
let BASE_HOST = 'https://attendance.keepdev.top'
//const BASE_URL = 'http://172.17.169.27:8080'
const NOAUTH_URL = ['/auth/login', '/', '/version', '/echo']
const OVERRIDED_METHODS = ['PUT', 'DELETE', 'PATCH']
/**
 *  Http Promise 封装
 */
const http = {
	setBaseUrl:(url)=>{
		BASE_URL = url;
	},
	getBaseUrl:()=>BASE_URL,
	request(method, url, data, header = {}) {
		return new Promise((reslove, reject) => {
			uni.request({
				url,
				data,
				header,
				method,
				success: ({
					data,
					statusCode,
					header
				}) => {
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
	},
	upload(url, filePath, name) {
		const token = uni.getStorageSync('token')
		
		if (!url.startsWith('http')) {
			// request 触发前拼接 url 
			url = BASE_URL + url
		}
		const header= {'X-HTTP-Method-Override': 'PUT'}
		header['Authorization'] = 'Bearer ' + token
	
		const fail= (err)=>reject(err);
		return new Promise((reslove, reject) => {
			uni.uploadFile({
				url,
				filePath,
				name,
				header,
				success:(uploadFileRes) =>reslove(JSON.parse(uploadFileRes.data)),
				fail:(err)=>{
					reject(err)
				}
			});
		});
	}

}

function parseUrl(url) {
	var urlParseRE =
		/^\s*(((([^:\/#\?]+:)?(?:(\/\/)((?:(([^:@\/#\?]+)(?:\:([^:@\/#\?]+))?)@)?(([^:\/#\?\]\[]+|\[[^\/\]@#?]+\])(?:\:([0-9]+))?))?)?)?((\/?(?:[^\/\?#]+\/+)*)([^\?#]*)))?(\?[^#]+)?)(#.*)?/;

	var matches = urlParseRE.exec(url || "") || [];

	return {
		href: matches[0] || "",
		hrefNoHash: matches[1] || "",
		hrefNoSearch: matches[2] || "",
		domain: matches[3] || "",
		protocol: matches[4] || "",
		doubleSlash: matches[5] || "",
		authority: matches[6] || "",
		username: matches[8] || "",
		password: matches[9] || "",
		host: matches[10] || "",
		hostname: matches[11] || "",
		port: matches[12] || "",
		pathname: matches[13] || "",
		directory: matches[14] || "",
		filename: matches[15] || "",
		search: matches[16] || "",
		hash: matches[17] || ""
	};
};

//统一异常处理
const handleError = (status, errMsg) => {
	uni.showToast({
		icon: 'none',
		title: errMsg
	})
}

uni.addInterceptor('request', {
	/**
	 * 请求发出前
	 * @param {*} args 
	 */
	invoke(args) {
		if(args.method!='GET'){
			console.log("invoke",args.url)
		}
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


		const path = parseUrl(args.url).pathname

		if (!NOAUTH_URL.includes(path)) {
			//默认携带token，未登录时，token为''
			header['Authorization'] = 'Bearer ' + token
		}
		args.header = {
			...header,
			...args.header
		}
		args.method = method


	},
	/**
	 * 请求成功, 似乎不管状态码是什么都会请求这个
	 * @param {*} args 
	 */
	success({
		data,
		statusCode,
		header,
		errMsg
	}) {
		if (statusCode != 200) {
			//handleError(statusCode, errMsg)
			uni.showToast({
				icon: 'none',
				title: data.message
			})
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

export default {http,BASE_URL,BASE_HOST};
