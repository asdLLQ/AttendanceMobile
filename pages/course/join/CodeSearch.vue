/** 
 * 加入班课前搜索页面，通过班课号搜索，下方显示搜索结果
 */
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
				console.log("asd",this.courseID)
				let url = '/courses/code/' + this.courseID;
				console.log("uid:" + this.uid)
				this.$myRequest.requestWithToken(url ,
					null, 'GET', (res) => {
					if (res.statusCode == 200) {
						console.log("显示课程详情" , res.data.data)
						uni.navigateTo({
							url:'../courseDatail/course-detail?id=' + this.courseID
						});
					} else{
						console.log("fails")
					} 
				})
				
			},
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
