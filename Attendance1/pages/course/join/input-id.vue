<template>
	<view class="login">
		<view class="login-main">
			<view class="personal-info">
				<view></view>	
				<view class="login-list flex border-all">
					<view class="login-input">
						<input type="text" placeholder="姓名" v-model="realname" />
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
				phone: "",
				realname:'',
				gender:'',
				email:'',
				role:'',
			}
		},
		onLoad() {
			
		},
		methods: {
		}
	}
</script>



<style lang="scss">
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
