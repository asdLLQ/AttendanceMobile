/**
 * 手势签到页面:
 */
<template>
	<view class="my-page">
		<view class="my-descrip">
			<view v-if="role === 0">
				通过滑动创建一个签到手势并现场传达给学生，学生输入正确手势完成签到。
			</view>
			<view v-else>
				根据老师现场传达的手势，滑动输入正确手势完成签到。
			</view>
		</view>
		<gesture-password @change="gestureChange"></gesture-password>
		
		<view class="my-button flex">
			<button class="cu-btn bg-cyan lg">重设</button>
			<button class="cu-btn bg-cyan lg">开始</button>
		</view>
	</view>	
</template>

<script>
	import gesturePassword from '../../../components/gesture/gesture-password.vue';  
	import {getMyLocation} from '../../../util/util.js'
	export default {
		components: {
			gesturePassword
		},
		data() {
			return {
				//角色选择 0-教师   1-学生根据
				role: 0,
				points: '',
				courseId:'',
				address: [],
			}
		},
		async onLoad(option) {
			this.address = await getMyLocation();
			this.courseId = option.courseId
		},
		methods: {
			gestureChange(points){
				console.log(points)
				this.points = points
			},
			async checkin() {
				let url = '/checkin-tasks/'+ that.taskId + "/logs";
				var data = {
					uid: this.uid,
					taskId: this.taskId,
					longitude: this.address[0],
					latitude: this.address[1],
					pararm: this.points,
				}
				console.log(data)
				let res = await this.http.post(url,data)
				console.log("签到结果：" , res.data)
				console.log(res.data.id)
				uni.switchTab({
					url: '../List'
				})
			},
			async start() {
				let current = new Date()
				let data = {
					courseId: this.courseId,
					longitude: this.address[0],
					latitude: this.address[1],
					type: 2,
				}
				console.log('用户发起限时签到', data);
				let res = await this.http.post("/checkin-tasks",data)
				console.log("发起限时签到结果：" , res.data)
				console.log(res.data.id)
			},
			async finish() {
				console.log("结束签到")
				// clearInterval(this.timer)
				// clearTimeout(this.timer )
				// console.log("finish:" + this.timer)
				var url = "/checkin-tasks/" + this.taskId + "/ended"
				let res = await this.http.post(url,null)
				console.log("结束签到：" , res.data)
				uni.switchTab({
				  url: '../List',
				})
			}
		},
	}
</script>

<style>
	.my-page {
		margin-top: 200rpx;
	}
	.my-descrip {
		text-align: center;
	}
	.my-button {
		margin-top: 30rpx;
		display: flex;
		justify-content: space-around;
	}
</style>
