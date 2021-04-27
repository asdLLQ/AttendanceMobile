<template>
	<view class="login">
		<view class='title'>
			<text>个人信息完善</text>
		</view>
		<view class="login-main">
			<view class="personal-info">
				<view></view>	
				<view class="login-list flex border-all">
					<view class="login-input">
						<input type="text" placeholder="姓名" v-model="realname" />
					</view>
				</view>
				<view class="login-list flex border-all">
					<view class="login-gender">性别
						<radio-group @change="sexChange">
							<label>
								<radio value="1" /><text>男</text>
							</label>
							<label>
								<radio value="2" /><text>女</text>
							</label>
						</radio-group>
					</view>
				</view>
				<!-- <view class="cu-form-group">
					<view class="title">学校院系</view>
					<picker mode="multiSelector" @change="MultiChange" @columnchange="MultiColumnChange" :value="multiIndex" :range="multiArray">
						<view class="picker">
							{{multiArray[0][multiIndex[0]]}}，{{multiArray[1][multiIndex[1]]}}
						</view>
					</picker>
				</view> -->
				<view class="login-list flex border-all">
					<view class="login-input">
						<input type="text" placeholder="邮箱(选填)" v-model="email" />
					</view>
				</view>
			</view>
			<button class="cu-btn login-btn" @tap="fillInfo()">完成</button>
		</view>
	</view>
</template>


<script>
	export default {
		data() {
			return {
				/*data:[
					[realName: 0,],
					[email: 0,],
					[gender: 0,],
					[phone: 0,],
				],*/
				phone: "",
				realname:'',
				gender:'',
				email:'',
				role:'',
				multiArray: [
					['福州大学', '福建师范大学'],
					['数学与计算机科学学院', '物信学院', '经管学院', '外语学院'],
				],
				objectMultiArray: [
					[{
							id: 0,
							name: '福州大学'
						},
						{
							id: 1,
							name: '福建师范大学'
						}
					],
					[{
							id: 0,
							name: '数学与计算机科学学院'
						},
						{
							id: 1,
							name: '物信学院'
						},
						{
							id: 2,
							name: '经管学院'
						},
						{
							id: 3,
							name: '外语学院'
						}
					]
				],
				multiIndex: [0, 0, 0]
			}
		},
		onLoad() {
			
		},
		methods: {
			async fillInfo() {
				let _this = this;
				uni.hideKeyboard()
				console.log( _this.realname+_this.email+ _this.gender+_this.phone);
				const res = await _this.$myRequest({
					url:'/sms',
					data:{
						data
					},
					method: 'POST',
				});
				
				if (res.statusCode == 200) {
					console.log("注册成功")
					uni.showToast({
						title: '注册成功！',
						icon: "none"
					});
					uni.navigateTo({
						url:"../login/login"
					});
				}
				/*uni.request({
					url: 'http://attendance.keepdev.top/api/users',
					data: {
						'realName': _this.realname,
						'email': _this.email,
						'gender': _this.gender,
						'role': _this.role,
						'phone': _this.phone,
						
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
				});*/
			},
			// genderChange(e) {
			// 	console.log("/"+e.detail.value+"/");
			// },
			// PickerChange(e) {
			// 	this.index = e.detail.value
			// },
			// MultiChange(e) {
			// 	this.multiIndex = e.detail.value
			// },
			MultiColumnChange(e) {
				let data = {
					multiArray: this.multiArray,
					multiIndex: this.multiIndex
				};
				data.multiIndex[e.detail.column] = e.detail.value;
				switch (e.detail.column) {
					case 0:
						data.multiArray[1] = ['数学与计算机科学学院', '物信学院', '经管学院', '外语学院'];
						data.multiIndex[1] = 0;
						data.multiIndex[2] = 0;
						break;
				}
				this.multiArray = data.multiArray;
				this.multiIndex = data.multiIndex;
			},
		}
	}
</script>



<style lang="scss">
	@import "/checkui/main.css";
	@import "/checkui/icon.css";
	.title {
		font-size: 70rpx;
		margin: 60rpx 0 0 100rpx;
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
			
			.login-gender {
				flex: 1;
				font-size: 30upx;
				color: #999999;
				display: flex;
				justify-content: space-between;
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
