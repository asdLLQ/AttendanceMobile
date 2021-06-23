<template>
	<view>
		<!-- 人数统计 -->
		<view class="border-bottom flex">
			<view class="title">已签到学生: </view>
		</view>
		<view v-for="item in stuList" :key="item.id">
			<stu :name="item.stuName" :number="item.stuId" descrip="已签到"></stu>
		</view>
		<!-- 手动结束签到按钮 -->
		<button class="bg-cyan footer" @click="finish()">结束签到</button>
	</view>
</template>

<script>
	import StuList from '@/components/stu-list/Stu-list.vue'
	export default {
		components: {
			'stu': StuList
		},
		data() {
			return {
				taskId: '',
				timer: '',
				stuList: '',
			}
		},
		onLoad (option) {
			this.taskId = option.id
			console.log(Date.now())
			this.timer = setInterval(() => {  
				console.log(Date.now())
				that.getStudentList()
			}, 5000); 
		},
		methods: {
			finish() {
				clearInterval(this.timer)
				clearTimeout(this.timer )
				console.log("finish:" + this.timer)
				var url = "/checkin-tasks/" + that.taskId + "/ended"
				that.$myRequest.requestWithToken(url,
					null, 'POST', (res) => {
					if (res.statusCode == 200) {
						console.log("结束签到：" , res.data)
						uni.switchTab({
						  url: '../List',
						})
					} else{
						console.log("fails")
					} 
				})
			},
			//获取签到的学生列表----定时刷新
			getStudentList() {
				var that = this;
				var url = "/checkin-tasks/" + that.taskId + "/logs"
				that.$myRequest.requestWithToken(url,
					null, 'GET', (res) => {
					if (res.statusCode == 200) {
						console.log("刷新中：" , res.data.data.content)
						that.stuList = res.data.data.content
						
					} else{
						console.log("fails")
					} 
				})
			}
		}
	}
</script>

<style>
	.flex {
		display: flex;
	}
	.border-bottom {
		border-bottom-style: solid;
		border-width: 1rpx; 
		border-color: #DCDFE6;
	}
	.title {
		justify-content: center;
		font-size: 35rpx;
		line-height: 60rpx;
	}
	button {
		width: 100%;
		position: absolute;
		bottom: 60rpx;
	}
</style>
