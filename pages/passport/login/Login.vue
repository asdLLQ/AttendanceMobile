<template>
	<view class="login">
		<view class='login-title'>
			<text>SIGN IN</text>
		</view>
		<view class='login-area'>
			<view class="login-type">
				<view v-for="(item,index) in loginTypeList" :key="index" @click="loginType = index" 
					:class="{act: loginType === index}" class="login-type-btn">{{item}}</view>
			</view>
			<view class="login-main" v-if="loginType === 0">
				<view class="login-list flex border-all">
					<view class="iconfont icon-shoujihao flex"></view>
					<view class="login-input">
						<input type="number" maxlength="11" placeholder="请输入手机号" 
								class="is-input1 " v-model="phone" @blur="validate('phone')" />
					</view>
				</view>
				<view class="login-list flex border-all">
					<view class="iconfont icon-yanzhengma flex"></view>
					<view class="login-input">
						<input type="text" maxlength="12" placeholder="请输入密码" password class="is-input1 " v-model="password" />
					</view>
				</view>
				<button class="cu-btn login-btn" @click="onLogin(1)">登  录</button>
				<view class="msg-err">{{msgErr}}</view>
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
						<input type="number" maxlength="6" placeholder="请输入验证码" class="is-input1 " v-model="code" />
					</view>
					<view class="code-sx"></view>
					<view class="codeimg" @click.stop="onGetCode()">{{getCodeText}}</view>
				</view>
				<button class="cu-btn login-btn" @click="onLogin(2)">登  录</button>
				<view class="msg-err">{{msgErr}}</view>
			</view>
			<view class="zhuce">
				<view class="login-tip">
					<navigator url="../register/Register">注册账号</navigator>
				</view>
				<view class="login-tip">
					<navigator url="../password/Reset">忘记密码</navigator>
				</view>
			</view>
		</view>
		<view class="login-footer">
			<view class="footer-tip flex">第三方登录</view>
			<view class="footer-icon flex">
				<view class="other-list">
					<image src="../../../static/img/passport/login/loginQQ.png" mode="aspectFill" @click="loginQQ"></image>
				</view>
				<view class="other-list">
					<image src="../../../static/img/passport/login/loginVX.png" mode="aspectFill"></image>
				</view>
				<view class="other-list">
					<image src="../../../static/img/passport/login/loginWb.png" mode="aspectFill"></image>
				</view>
			</view>
		</view>
	</view>
</template>


<script>
	import api from "@/util/api.js"
	
	export default {
		data() {
			return {
				phone: "",
				code: '',
				password: '',
				msgErr: '',
				msgShow: false,
				getCodeText: '获取验证码',
				getCodeBtnColor: "#ffffff",
				getCodeisWaiting: false,    //判断是否能发送验证码
				platform: uni.getSystemInfoSync().platform,
				loginType: 0,
				loginTypeList: ['密码登录', '免密登录'],
				hasProvider: false,
				data:[],
				//验证的规则
				rules:{
					phone:{
						rule:/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
						msg:"手机号错误"
					},
					password:{
						rule:/^[0-9a-zA-Z]{6,16}$/,
						msg:"密码应该为6-16位"
					},
				}
			}
		},
		onLoad() {
			//this.$myRequest.patch('/echo',{data:"content"},(res)=>{console.log("PATCH:",res.data)})
			this.checkGuide();
		},
		methods: {
			//检测是否有启动缓存，如果没有，就是第一次启动，第一次启动就去 欢迎页
			checkGuide() {
				const token = uni.getStorageSync('token');
				if (token) {
					uni.switchTab({
					  url: '../../course/List',
					})
				} else {
					uni.redirectTo({
						url: '/pages/passport/login/Login'
					});
				}
			},
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
			isLogin() {
				// 判断缓存中是否登录过，直接登录
				try {
					const value = uni.getStorageSync('access_token');
					if (value) {
						//有登录信息
						console.log("已登录用户：", value);
						uni.switchTab({
							url: '/pages/login/login'
						});
					}
				} catch (e) {
					console.log("(isLogin)出错了")
				}
			},

			Timer() {},
			async onGetCode() {
				let _this = this;
				uni.hideKeyboard()
				if (_this.getCodeisWaiting) {
					return;
				}

				_this.getCodeText = "发送中..."
				_this.getCodeisWaiting = true;
				_this.getCodeBtnColor = "rgba(255,255,255,0.5)"
				
				var data = {
					'type':"login",'phone':_this.phone
				}
				console.log("获取验证码")
				let res = await this.http.post('/sms',data)
				//示例用定时器模拟请求效果
				setTimeout(() => {
					//uni.showToast({title: '验证码已发送',icon:"none"});
					_this.setTimer();
				}, 1000)
			},
			setTimer() {
				let holdTime = 59
				const _this = this
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
			onLogin(num){
				if(num === 1) 
					this.data = {'account':this.phone,'password':this.password};
				else 
					this.data = {'account':this.phone,'smsCode':this.code};
				console.log("登录方式:"+num,  this.data);
				this.login(this.data);
			},
			//用户名密码(验证码)登录
			async login(data) {
				uni.hideKeyboard() //隐藏软键盘
				console.log(this.phone+ " " + this.password)
				let res = await this.http.post('/auth/login', data)
				console.log(res)
				uni.setStorageSync('token', res.data.token)
				uni.setStorageSync('uid', res.data.uid)
				uni.switchTab({
				  url: '../../course/List',
				})
			},
			//第三方登录--QQ
			loginQQ() {
				uni.login({
					provider: 'qq',	//微信:wx   QQ:qq
					success: function (loginRes) {
						console.log(loginRes.authResult);
						// 获取用户信息
						uni.getUserInfo({
							provider: 'qq',	//微信:wx   QQ:qq
							success: function (infoRes) {
								console.log('用户昵称为：' + infoRes.userInfo.nickName);
								uni.navigateTo({
									url:"../course/homework?data="+JSON.stringify(loginRes)
								})
							}
						});
					}
				});
			}
		}
	}
</script>



<style lang="scss">
	.flex{
		display: flex;
	}
	.login {
		position: absolute;
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		background: #eee;
	}
	.login-title {
		font-size: 70rpx;
		margin: 150rpx 0 0 120rpx;
	}
	.login-area {
		margin:65rpx 7%;
		width:86%;
		height: 680rpx;
		background: white;
		border-radius: 60upx;
		padding:50rpx 0rpx;
		
		.login-type {
			display: flex;
			justify-content: center;
			
			.login-type-btn {
				line-height: 30px;
				margin: 0rpx 70rpx;
			}
			.login-type-btn.act {
				color: #0FAEFF;
				border-bottom: solid 5rpx #0FAEFF;
			}
		}
		
		.zhuce {
			display: flex; 
			justify-content: space-around;

			.login-tip {
				font-size: 25upx;
				color: #666666;
				text-align: center;
				color: #0FAEFF;
			}
		}
	}
	
	.login-main {
		padding: 0 70upx;

		.login-list {
			margin-top: 40rpx;
			height: 100upx;
			align-items: center;
			padding: 0 40rpx;

			&.border-all {
				&:after {
					border: 1px solid #D0D0D0;
					border-radius: 60upx;
				}
			}

			.iconfont {
				width: 65upx;
				font-size: 45upx;
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
			margin-top: 50rpx;
			height: 96upx;
			width: 100%;
			background: $theme-color;
			border-radius: 50rpx;
			font-size: 35upx;
			color: #ffffff;
		}
	}
	
	.msg-err {
		color: red;
		text-align: center;
		line-height: 1em;
		margin-top: 40rpx;
	}

	.login-footer {
		padding: 10rpx 70rpx;
		
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
				margin-right: 30rpx;
			}

			&:after {
				margin-left: 30upx;
				flex: 1;
				content: '';
				height: 2upx;
				background: #D0D0D0;
			}

		}

		.footer-icon {
			padding: 40upx 0 100upx 0;
			justify-content: center;
			.other-list {
				width: 80upx;
				height: 80upx;
				margin: 0 50upx;
				image {
					width: 100%;
					height: 100%;
				}
			}
		}
	}
</style>
