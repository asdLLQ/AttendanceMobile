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
		<button class="cu-btn login-btn" @click="searchCourse()">搜索</button>
		
		<view class="footer-tip flex" v-show="res">结果</view>
		<view class="result"  v-for="item in course" :key="item.id">
			<view class="round lg center">
				<image :src="imageUrl"></image>
			</view>
			<view class="content">
				<view class="center flex weight">{{item.name}}</view>
				<view class="flex center">教师：{{item.teacherName}}</view> 
				<view class="flex center">学期：{{item.semester}}</view>
				<view class="flex center">班课号：{{item.code}}</view>
			</view>
			<button class="cu-btn login-btn" @tap="joinCourse(item.id)">加入班课</button>
		</view>
	</view>
</template>


<script>
	export default {
		data() {
			return {
				courseID: "",
				course:'',
				imageUrl:"/static/img/course/default.png",
				res: false,
			}
		},
		onLoad() {
			
		},
		methods: {
			async searchCourse() {
				const that = this
				console.log("asd",this.courseID)
				let url = '/courses/code/' + this.courseID;
				console.log("uid:" + this.uid)
				let res = await this.http.get(url,null)
				console.log("显示课程详情" , res.data)
				that.course = [res.data]
				that.hideKeyboard()
				that.res = true
				
			},
			async joinCourse(courseID) {
				let uid = uni.getStorageSync('uid')
				let url = '/courses/student/' + uid +'/'+ courseID;
				let res = await this.http.post(url, null)
				console.log("显示课程详情" , res.data)
				uni.showToast({
					title:"加入班课成功！"
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
			margin-top: 70upx;
			height: 80upx;
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
			margin-top: 60upx;
			height: 86upx;
			width: 100%;
			background: #1CBBB4;
			border-radius: 47upx;
			font-size: 34upx;
			color: #ffffff;
		}
	}
	image {
		width: 120upx;
		height: 120upx;
		border-radius: 20%;
	}
	.result {
		margin-top: 50rpx;
		padding-top: 20rpx;
		background-color: white;
		padding: 30rpx auto;
		border-radius: 50upx;
		border: solid 3rpx #1CBBB4;
		justify-content: center;
		.content {
			font-size: 35rpx;
			line-height: 60rpx;
			.weight {font-weight: bolder;}
		}
	}
	.center {
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
</style>
