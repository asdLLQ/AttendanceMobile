<template>
    <view>
		<view class="center">
			
			<image :src="imageUrl"></image>
			<view>班课号：{{courseID}}</view>
			<view>班课：{{course.name}}</view>
			
		</view>
		<view class="padding flex flex-direction">
			<button class="cu-btn bg-blue margin-tb-sm lg setColor" @tap="classJoin()">加入班课</button>
		</view>
		<!-- 底部状态栏 -->
		<view>
			<view-tabbar tabIndex=5></view-tabbar>
		</view>
    </view>
</template>

<script>
	import Tabbar from '@/components/tab-course.vue'
	export default {
		components: {
			'view-tabbar': Tabbar
		}, 
		data() {
			return {
				imageUrl:"../../../static/course-default.png",
				courseID: '',
				course:'',
			}
		},
		onLoad(option) {
			this.courseID = option.id
			console.log(this.courseID)
			this.searchCourse()
		},
		methods: {
			searchCourse() {
				let url = '/courses/code/' + this.courseID;
				console.log("uid:" + this.uid)
				this.$myRequest.requestWithToken(url ,
					null, 'GET', (res) => {
					if (res.statusCode == 200) {
						console.log("显示课程详情" , res.data.data)
						this.course = res.data.data
						
					} else{
						console.log("fails")
					} 
				})
			},
			classJoin() {
				let uid = uni.getStorageSync('uid')
				let url = '/courses/student/' + uid +'/'+ this.courseID;
				this.$myRequest.requestWithToken(url ,
					null, 'POST', (res) => {
					if (res.statusCode == 200) {
						console.log("显示课程详情" , res.data)
						uni.showToast({
							title:"加入班课成功"
						})
						
					} else{
						console.log("fails")
					} 
				})
			},
		}
	}
	
</script>

<style lang="scss" scoped>
	.center {
		margin-top: 100rpx;
		text-align: center;
		font-size: 50rpx;
	}
	image {
		width: 120upx;
		height: 120upx;
		border-radius: 20%;
	}
	.setColor {
		background: #1CBBB4;
	}
</style>