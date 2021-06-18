/**
 * 设置密码/ 
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
				<text>设置密码</text>
			</view>
			<view class="login-main">
				<view class="login-list flex border-all">
					<view class="iconfont icon-yanzhengma flex"></view>
					<view class="login-input">
						<input type="number" maxlength="11" placeholder="请输入新密码" v-model="password" />
					</view>
				</view>
				<view class="login-list flex border-all">
					<view class="iconfont icon-yanzhengma flex"></view>
					<view class="login-input">
						<input type="number" maxlength="6" placeholder="请再次输入密码" v-model="confirm_password" />
					</view>
				</view>
				<button class="cu-btn login-btn" @tap="setPassword()">完成</button>
			</view>
		</view>
	</view>
</template>


<script>
	export default {
		data() {
			return {
				phone: "",
				confirm_password:'',
				password:'',
			}
		},
		onLoad() {
			
		},
		methods: {
			setPassword() {
				let _this = this;
				uni.hideKeyboard()
				console.log( _this.confirm_password+_this.password);
				uni.request({
					url: 'http://attendance.keepdev.top/api/users',
					data: {
						'phone': _this.phone,
						'smsCode':_this.code
					},
					method: 'POST',
					success: (res) => {
						console.log("注册信息发送到服务器")
						console.log(res);
						if (res.statusCode == 200) {
							console.log("注册成功")
							uni.showToast({
								title: '注册成功！',
								icon: "none"
							});
							uni.navigateTo({
								url:"../login/login"
							});
						} else {
							uni.showToast({
								title: '注册失败',
								icon: "none"
							});
							console.log(res);
							return false;
						}
					}
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
