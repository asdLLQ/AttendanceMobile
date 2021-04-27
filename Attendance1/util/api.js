const BASR_URL = 'http://attendance.keepdev.top/api'
export const myRequest = (options)=>{
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
				console.log(err)
				uni.showToast({
					title:'请求接口失败'
				})
				reject(err)
			}
		})
	})
} 
