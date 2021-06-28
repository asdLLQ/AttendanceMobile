<template>
	<view class="login">
		<view class="progress">
			<view class="cu-progress xs">
				<view class="bg-blue" :style="[{ width:'66.6%'}]"></view>
			</view>
		</view>
		<view class='title'>
			<text>请选择你的角色</text>
		</view>
		<view class="role-image" >
			<view class="role-size">
				<image src="../../../static/img/passport/register/role-teacher.png"></image>
				<button @tap="onRegister(0)">我是教师</button>
			</view>
			<view class="role-size">
				<image src="../../../static/img/passport/register/role-student.png"></image>
				<button @tap="onRegister(1)">我是学生</button>
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
		onLoad(options) {
			this.phone = options.phone;
			this.code = options.code;
			console.log("角色页面"+this.phone+this.code);
		},
		methods: {
			async onRegister (num) {
				let _this = this;
				uni.hideKeyboard();
				console.log(num);
				uni.navigateTo({
					url:"./InfoAdd?phone="+_this.phone+'&smsCode='+_this.code+'&roles='+num
				});
			},
		}
	}
</script>



<style lang="scss">

	.title {
		font-size: 70rpx;
		margin: 60rpx 0 0 100rpx;
	}
	
	.role-image {
		display: flex;
		
		.role-size {
			width: 300rpx;
			height: 400rpx;
			margin: 80rpx auto 0 auto;
			text-align: center;
			
			image {
				width: 100%;
				height: 100%;
			}
			button {
				margin-top: 20upx;
				width:80%;
				background: $theme-color;
				border-radius: 47upx;
				font-size: 30upx;
				color: #ffffff;
			}
		}
	}
</style>
