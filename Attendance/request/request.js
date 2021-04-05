// 全局请求封装
const token = uni.getStorageSync('token');
import service from "./service.js";  // 请求字典


export default (url, method, params) => {
	uni.showLoading({
		title: "加载中"
	});
	const api = service.filter(item => {
		return item.url === url; // 匹配serviceId对应的接口
	});

	return new Promise((resolve, reject) => {
		wx.request({
			url: "https://www.piop.cn/api" + url,
			method: method,
			header: {
				token: token
			},
			data: {
				serviceId: api[0].serviceId,
				...params
			},
			success(res) {
				resolve(res.data);
			},
			fail(err) {
				reject(err);
			},
			complete() {
				uni.hideLoading();
			}
		});
	});
};