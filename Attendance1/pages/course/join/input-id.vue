<template>
	<view class="login-main">
		<view class="personal-info">
			<view class="login-list flex border-all">
				<view class="login-input">
					<input type="text" placeholder="请输入班课号" v-model="courseID" />
				</view>
			</view>
		</view>
		<button class="cu-btn login-btn" @tap="searchCourse()">搜索</button>
	</view>
</template>


<script>
	export default {
		data() {
			return {
				courseID: "",
			}
		},
		onLoad() {
			
		},
		methods: {
			searchCourse() {
				let _this = this;
				uni.hideKeyboard() //隐藏软键盘
				var uid = uni.getStorageSync('uid')
				let url = '/organizations/courses/student/' + uid + '/' + this.courseID;
				
				console.log(url)
				_this.$myRequest.requestWithToken(url ,
					'', 'POST', (res) => {
					if (res.statusCode == 200) {
						console.log("searchCourse")
					} else{
						console.log("fails")
					} 
				})
			}
		}
	}
</script>



<style lang="scss">
	
	.flex{
		display: flex;
	}
		
	.login-main {
		flex: 1;
		padding: 0 60upx;

		.login-list {
			margin-top: 80upx;
			height: 90upx;
			align-items: center;
			padding: 0 30upx;

			&.border-all {
				&:after {
					border: 2px solid #888888;
					border-radius: 100upx;
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
		}

		.login-btn {
			margin-top: 70upx;
			height: 96upx;
			width: 100%;
			background: #1CBBB4;
			border-radius: 47upx;
			font-size: 34upx;
			color: #ffffff;
		}
	}
</style>
