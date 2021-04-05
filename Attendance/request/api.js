import request from "./request.js"


const token = uni.getStorageSync('token');
export default {
	// 密码登录
	passwordLogin(params) {
		return request("/platform/metadata/logon", "GET", params)
	},

	// 短信登录
	noteLogin(params) {
		return request("/platform/metadata/login", "GET", params)
	},

	// 获取验证码：用于短信登陆、密码找回、用户注销
	getAuthCode(params) {
		return request("/platform/metadata/sms", "GET", params)
	},

	// 获取注册账号验证码
	getRegistAuthCode(params) {
		return request("/platform/metadata/sms1", "GET", params)
	},

	// 登录者信息
	getMyInfo(params) {
		return request("/platform/metadata/bindinfo", "GET", params)
	},

	// 注册账号
	registerAccount(params) {
		return request("/platform/metadata/register", "GET", params)
	},

	// 找回密码
	retrievePassword(params) {
		return request("/platform/metadata/back", "GET", params)
	},

	// 注销账号
	offAccount(params) {
		return request("/platform/metadata/cancel", "GET", params)
	},
	
}