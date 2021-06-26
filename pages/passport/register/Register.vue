/**
 * 注册页面，手机号和角色必填
 */
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
						<input type="number" maxlength="11" placeholder="请输入手机号" v-model="phone"  @blur="validate('phone')"/>
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
				getCodeText: '获取验证码',
				getCodeBtnColor: "#ffffff",
				rules:{
					phone:{
						rule:/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
						msg:"手机号错误"
					},
				}
			}
		},
		onLoad() {
			
		},
		methods: {
			Timer() {},
			//验证手机号
			validate(key) {
				console.log(key)
				if(!this.rules[key].rule.test(this[key])){
					//提示信息
					uni.showToast({
						icon: "none",
						title:this.rules[key].msg,
					})
					this.msgErr = this.rules[key].msg
					console.log("validate(phone)")
				} else {
					this.msgErr = ''
				}
			},
			async onGetCode() {
				let _this = this;
				uni.hideKeyboard()
				if (_this.getCodeisWaiting) {
					return;
				}

				_this.getCodeText = "发送中..."
				_this.getCodeisWaiting = true;
				_this.getCodeBtnColor = "rgba(255,255,255,0.5)"
				
				let data = {
					'type':"register",
					'phone':this.phone
				}
				console.log("发送验证码")
				let res =  _this.http.post('/sms',data)

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
				let url = '/sms/register/'+_this.phone+'/'+_this.code
				let res =  await _this.http.post(url,null)
				console.log("校验验证码成功")
				uni.navigateTo({
					url:"./register-role?phone="+_this.phone+'&code='+_this.code
				});
				
			},
		}
	}
</script>



<style lang="scss">
	
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
