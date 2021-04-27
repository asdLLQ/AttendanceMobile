<template>
	<view>
		<view class="progress">
			<view class="cu-progress xs">
				<view class="bg-blue" :style="[{ width:'33.3%'}]"></view>
			</view>
		</view>
		<view class="login">
			<view class="back">
				<text class="cuIcon-back"></text>
			</view>
			<view class='login-title'>
				<text>SIGN UP</text>
			</view>
			<view class="login-main">
				<view class="login-list flex border-all">
					<view class="iconfont icon-shoujihao flex"></view>
					<view class="login-input">
						<input type="number" maxlength="11" placeholder="请输入手机号" v-model="phone" />
					</view>
				</view>
				<view class="login-list flex border-all">
					<view class="iconfont icon-yanzhengma flex"></view>
					<view class="login-input">
						<input type="number" maxlength="6" placeholder="请输入验证码" v-model="code" />
					</view>
					<view class="code-sx"></view>
					<view class="codeimg" @click.stop="onGetCode()">{{getCodeText}}</view>
				</view>
				<button class="cu-btn login-btn" @tap="onNext()">下一步</button>
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
				confirm_pwd:'',
				password:'',
				getCodeText: '获取验证码',
				getCodeBtnColor: "#ffffff",
			}
		},
		onLoad() {
			
		},
		methods: {
			Timer() {},
			async onGetCode() {
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
				
				const res = await _this.$myRequest({
					url:'/sms',
					data:{
						'type':"register",
						'phone':this.phone
					},
					method: 'POST',
				});
				_this.code = res.data.code;
				console.log(_this.code);
				/*uni.request({
					url: "http://attendance.keepdev.top/api/sms",
					data: {
						'type':"register",
						'phone':this.phone
					},
					method: 'POST',
					success: (res) => {
						console.log(res);
						_this.code = res.data.code;
						console.log(_this.code);
					}
				});*/
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
			async onNext() {
				let _this = this;
				uni.hideKeyboard()
				console.log(_this.phone+_this.code);
				const res = await _this.$myRequest({
					url:'/sms/register/'+_this.phone+'/'+_this.code,
					method: 'POST',
				});
				if (res.statusCode == 200) {
					console.log("校验验证码成功")
					uni.navigateTo({
						url:"./register-role?phone="+_this.phone+'&code='+_this.code
					});
				}
				
				/*uni.request({
					url: 'http://attendance.keepdev.top/api/sms/register/'+_this.phone+'/'+_this.code,
					data: {
					},
					method: 'POST',
					success: (res) => {
						console.log("校验验证码"+res);
						if (res.statusCode == 200) {
							console.log("校验验证码成功")
							uni.navigateTo({
								url:"./register-role?phone="+_this.phone+'&code='+_this.code
							});
						} else {
							uni.showToast({
								title: '验证码错误失败',
								icon: "none"
							});
							console.log(res);
							return false;
						}
					}
				});*/
			},
		}
	}
</script>



<style lang="scss">
	@import "/checkui/main.css";
	@import "/checkui/icon.css";
	
	.progress {
		margin-top: 0rpx;
	}
	
	.back {
		font-size: 60rpx;
		margin: 20rpx 0 0 30rpx;
	}
	
	.login-title {
		font-size: 70rpx;
		margin: 70rpx 0 0 100rpx;
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
		padding: 20rpx 70upx;

		.login-list {
			margin-top: 35upx;
			height: 90upx;
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
			background: $theme-color;
			border-radius: 47upx;
			font-size: 34upx;
			color: #ffffff;
		}
	}
</style>
