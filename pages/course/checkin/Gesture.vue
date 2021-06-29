/**
 * 手势签到页面:
 */
<template>
	<view class="my-page">
		<view class="my-descrip">
			<view v-if="role">
				通过滑动创建一个签到手势并现场传达给学生，学生输入正确手势完成签到。
			</view>
			<view v-else>
				根据老师现场传达的手势，滑动输入正确手势完成签到。
			</view>
		</view>
		<gesture-password @change="gestureChange"></gesture-password>
		
		<button class="bg-cyan lg" @click="onReset()" v-show="role">重设</button>
		<button class="bg-cyan lg margin-top" @click="onStart()" v-show="role">发起签到</button>
		<button class="bg-cyan lg margin-top" @click="onCheckin()" v-show="!role">签到</button>
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
				role: '',
				points: '',
				courseId:'',
				address: [],
				taskId:'',
				uid:'',
				param:'',
			}
		},
		async onLoad(option) {
			this.address = await getMyLocation();
			this.courseId = option.courseId
			this.role = option.role==0?true:false
			this.taskId = option.taskId
			this.param = option.param
			this.uid = await uni.getStorageSync("uid")
			this.address = await getMyLocation()
		},
		methods: {
			gestureChange(points){
				this.points = points.join(",")
				console.log(this.points)
			},
			onReset() {
				location.reload()
			},
			async onCheckin() {
				if(this.param == this.points) {
					let url = '/checkin-tasks/'+ this.taskId + "/logs";
					let data = {
						uid: this.uid,
						taskId: this.taskId,
						longitude: this.address[0],
						latitude: this.address[1],
					}
					console.log(data)
					let res = await this.http.post(url,data)
					console.log("签到结果：" , res.data)
					console.log(res.data.id)
					uni.switchTab({
						url: '../List'
					})
				}	
			},
			async onStart() {
				let data = {
					courseId: this.courseId,
					longitude: this.address[0],
					latitude: this.address[1],
					type: 2,
					param: this.points
				}
				console.log('用户发起限时签到', data);
				this.http.post("/checkin-tasks", data).then((res) => {
					console.log("发起手势签到结果：",res.data)
					uni.navigateTo({
						url: './CheckinIng?id=' + res.data.id
					})
				})
			},
		},
	}
</script>

<style>
	.my-page {
		margin-top: 50rpx;
	}
	.my-descrip {
		text-align: center;
	}
</style>
