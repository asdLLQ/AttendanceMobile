<template>
	<view class="login">
		<view class="login-type">
			<view v-for="(item,index) in loginTypeList" :key="index" @click="loginType = index" :class="{act: loginType === index}"
			 class="login-type-btn">{{item}}</view>
		</view>
		<view class="login-logo">
			<image class="sun-icon-img" src="../../static/login.jpg"/>
		</view>	
		<view class="login-main" v-if="loginType === 0">
			<view class="login-list flex border-all">
				<view class="iconfont icon-shoujihao flex"></view>
				<view class="login-input">
					<input type="number" maxlength="11" placeholder="请输入手机号" class="is-input1 " v-model="phone" />
				</view>
			</view>
			<view class="login-list flex border-all">
				<view class="iconfont icon-yanzhengma flex"></view>
				<view class="login-input">
					<input type="number" maxlength="6" placeholder="请输入验证码" class="is-input1 " v-model="code" />
				</view>
				<view class="code-sx"></view>
				<view class="codeimg" @click.stop="getCode()">{{getCodeText}}</view>
			</view>
			<!-- <button class="cu-btn login-btn" @tap="doLogin">登  录</button> -->
			<navigator url="../home/myJoin">登  录</navigator>
			<view class="login-tip">
				<navigator url="../register/register">注册账号</navigator>
			</view>
		</view>
		<view class="login-main" v-else>
			<view class="login-list flex border-all">
				<view class="iconfont icon-shoujihao flex"></view>
				<view class="login-input">
					<input type="number" maxlength="11" placeholder="请输入手机号" class="is-input1 " v-model="phone" />
				</view>
			</view>
			<view class="login-list flex border-all">
				<view class="iconfont icon-yanzhengma flex"></view>
				<view class="login-input">
					<input type="number" maxlength="6" placeholder="请输入密码" class="is-input1 " v-model="code" />
				</view>
			</view>
			<button class="cu-btn login-btn" @tap="doLogin">登  录</button>
			<view class="login-tip">
				<navigator url="../register/register">注册账号</navigator>
			</view>
		</view>
		<view class="login-footer">
			<view class="footer-tip flex">其他登录方式</view>
			<view class="footer-other flex">
				<view class="other-list">
					<image src="../../static/loginQQ.png" mode="aspectFill"></image>
				</view>
				<view class="other-list">
					<image src="../../static/loginVX.png" mode="aspectFill"></image>
				</view>
			</view>
		</view>
	</view>
</template>


<script>
	export default {
		data() {
			return {
				phone: "",
				code: '',
				key: '',
				getCodeText: '获取验证码',
				getCodeBtnColor: "#ffffff",
				getCodeisWaiting: false,
				platform: uni.getSystemInfoSync().platform,
				loginType: 0,
				loginTypeList: ['免密登录', '密码登录'],
				mobile: '',
				providerList: [],
				hasProvider: false,
				username: '',
				password: '',
				positionTop: 0,
				isDevtools: false,
				codeDuration: 0,
				loginBtnLoading: false,
				hasAppleLogin: false,
				needCaptcha: uni.getStorageSync('uni-needCaptcha'),
				captchaing: false,
				captchaBase64: '',
				captchaText: ''
			}
		},
		onLoad() {
			this.checkGuide();
		},
		methods: {
			checkGuide() {
				// 思路： 检测是否有启动缓存，如果没有，就是第一次启动，第一次启动就去 启动介绍页面
				const launchFlag = uni.getStorageSync('launchFlag');
				if (launchFlag) {
					this.isLogin();
				} else {
					uni.redirectTo({
						url: '/pages/guide/list'
					});
				}
			},

			isLogin() {
				// 判断缓存中是否登录过，直接登录
				try {
					const value = uni.getStorageSync('access_token');
					if (value) {
						//有登录信息
						console.log("已登录用户：", value);
						uni.switchTab({
							url: '/pages/index/index'
						});
					}
				} catch (e) {

				}
			},

			Timer() {},
			getCode() {
				let _this = this;
				uni.hideKeyboard()
				if (_this.getCodeisWaiting) {
					return;
				}
				if (!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(_this.phone))) {
					uni.showToast({
						title: '请填写正确手机号码',
						icon: "none"
					});
					return false;
				}
				_this.getCodeText = "发送中..."
				_this.getCodeisWaiting = true;
				_this.getCodeBtnColor = "rgba(255,255,255,0.5)"

				uni.request({
					url: _this.websiteUrl + '/sms/notification-sms/codes',
					data: {
						'phone': _this.phone
					},
					method: 'POST',
					header: {
						'Content-Type': 'application/x-www-form-urlencoded',
						//自定义请求头信息
					},
					success: (res) => {
						_this.key = res.data.data.key;
						//TODO 开发模式
						_this.code = res.data.data.code;
					}
				});
				//示例用定时器模拟请求效果
				setTimeout(() => {
					//uni.showToast({title: '验证码已发送',icon:"none"});
					_this.setTimer();
				}, 1000)
			},
			setTimer() {
				let holdTime = 59,
					_this = this;
				_this.getCodeText = "重新获取(60)"
				_this.Timer = setInterval(() => {
					if (holdTime <= 0) {
						_this.getCodeisWaiting = false;
						_this.getCodeBtnColor = "#ffffff";
						_this.getCodeText = "获取验证码"
						clearInterval(_this.Timer);
						return;
					}
					_this.getCodeText = "重新获取(" + holdTime + ")"
					holdTime--;
				}, 1000)
			},
			doLogin() {
				let _this = this;
				uni.hideKeyboard()
				//模板示例部分验证规则
				// if(!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.phone))){ 
				// 	uni.showToast({title: '请填写正确手机号码',icon:"none"});
				// 	return false; 
				// } 

				uni.request({
					url: _this.websiteUrl + '/token/sys/login-sms',
					data: {
						'key': _this.key,
						'code': _this.code,
						'phone': _this.phone
					},
					method: 'POST',
					header: {
						'Content-Type': 'application/x-www-form-urlencoded',
					},
					success: (res) => {
						if (res.data.code == 200) {
							_this.login(true, res.data.data, function() {
								_this.getRongyToken();
							});
						} else {
							uni.showToast({
								title: '验证码不正确',
								icon: "none"
							});
							return false;
						}
					}
				});
			},
		}
	}
</script>



<style lang="scss">
	page {
		background-color: #FFFFFF;
	}
	.login-type {
		display: flex;
		justify-content: center;
	}
	
	.login-type-btn {
		line-height: 30px;
		margin: 0px 15px;
	}
	
	.login-type-btn.act {
		color: #0FAEFF;
		border-bottom: solid 1px #0FAEFF;
	}
	.flex{
		display: flex;
	}
	.login {
		position: absolute;
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
	}
	
	.login-logo {
		width: 248upx;
		height: 242upx;
		padding-bottom: 50upx;
		margin: 120upx auto 0 auto;
	
		image {
			width: 100%;
			height: 100%;
		}
	}
	
	.login-main {
		flex: 1;
		padding: 0 70upx;

		.login-list {
			margin-top: 35upx;
			height: 100upx;
			align-items: center;
			padding: 0 30upx;

			&.border-all {
				&:after {
					border: 1px solid #D0D0D0;
					border-radius: 100upx;
				}
			}

			.iconfont {
				width: 65upx;
				font-size: 44upx;
				align-items: center;

				&:after {
					margin-left: 20upx;
					content: '';
					width: 2upx;
					height: 35upx;
					background: #D0D0D0;
					display: block;
				}
			}

			.login-input {
				flex: 1;

				input {
					font-size: 28upx;
					color: #333333;
					padding-left: 20upx;
				}
			}

			.code-sx {
				content: '';
				width: 2upx;
				height: 25upx;
				background: #D0D0D0;
				margin-right: 25upx;
			}

			.codeimg {
				font-size: 24upx;
				color: #999999;
			}
		}

		.login-btn {
			margin-top: 70upx;
			height: 96upx;
			width: 100%;
			background: linear-gradient(-90deg, rgba(80, 85, 168, 1), rgba(104, 110, 210, 1));
			border-radius: 47upx;
			font-size: 34upx;
			color: #ffffff;
		}

		.login-tip {
			padding-top: 26upx;
			font-size: 22upx;
			color: #666666;
			text-align: center;

			navigator {
				margin-left: 10upx;
				display: inline-block;
				color: #5055A8;
			}
		}
	}

	.login-footer {
		padding: 0 70upx;

		.footer-tip {
			align-items: center;
			font-size: 24upx;
			color: #999999;
			text-align: center;

			&:before {
				flex: 1;
				content: '';
				height: 2upx;
				background: #D0D0D0;
				margin-right: 30upx;
			}

			&:after {
				margin-left: 30upx;
				flex: 1;
				content: '';
				height: 2upx;
				background: #D0D0D0;
			}

		}

		.footer-other {
			padding: 40upx 0 100upx 0;
			justify-content: center;

			.other-list {
				width: 80upx;
				height: 80upx;
				margin: 0 75upx;

				image {
					width: 100%;
					height: 100%;
				}
			}
		}
	}
</style>
