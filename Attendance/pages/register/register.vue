<template>
	<view class="login">
		
		<view class="login-main">
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
			<view class="login-list flex border-all">
				<view class="iconfont icon-yanzhengma flex"></view>
				<view class="login-input">
					<input type="number" maxlength="6" placeholder="请输入密码" class="is-input1 " v-model="confirmCode" />
				</view>
			</view>
			<view class="login-list flex border-all">
				<view class="iconfont icon-yanzhengma flex"></view>
				<view class="login-input">
					<input type="number" maxlength="6" placeholder="请再次输入密码" class="is-input1 " v-model="code" />
				</view>
			</view>
			<button class="cu-btn login-btn" @tap="doRegister">学生注册</button>
			<button class="cu-btn login-btn" @tap="doLogin">教师注册</button>
		</view>
	</view>
</template>


<script>
	export default {
		data() {
			return {
				phone: "",
				code: '',
				confirmCode: '',
				key: '',
				getCodeText: '获取验证码',
				getCodeBtnColor: "#ffffff",
			}
		},
		onLoad() {
			this.checkGuide();
		},
		methods: {
			
			isUser() {
				// 判断缓存中是否存在此用户
				try {
					const value = uni.getStorageSync('access_token');
					if (value) {
						//有用户信息
						console.log("已注册用户：", value);
						uni.switchTab({
							url: '/pages/login/login'
						});
					}
				} catch (e) {
					console.log("isUser出错了")
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
			doRegister() {
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
						'phone': _this.phone,
						'code': _this.code,
						'confirmCode': _this.confirmCode
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

</style>
