/**
 * 手势签到页面:
 */
<template>
	<view class="my-page">
		<view class="my-descrip">
			<view>
				根据老师现场传达的手势，滑动输入正确手势完成签到。
			</view>
		</view>
		<gesture-password @change="gestureChange"></gesture-password>
		<button class="bg-cyan lg margin-top" @click="onCheckin()">签到</button>
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
				points: '',
				courseId:'',
				address: [],
				taskId:'',
				uid:'',
				param:'',
			}
		},
		onLoad(option){
			this.courseId = option.courseId
			this.taskId = option.taskId
			this.param = option.param
			this.uid =  uni.getStorageSync("uid")
		},
		async onShow(option) {
			this.address = await getMyLocation();
			
		},
		methods: {
			gestureChange(points){
				this.points = points.join(",")
				console.log(this.points)
			},
			onReset() {
				uni.$emit('clearDraw')
			},
			async onCheckin() {
				console.log(`checking:${this.param} , ${this.points}`)
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
					uni.showModal({
					    title:"签到成功！！",
					   showCancel:false,
					    success: function (res) {
					        uni.switchTab({
					        	url: '../List'
					        })
					    }
					});
				
					
				}else{
					const that = this
					uni.showToast({
						icon:"none",
						title:"手势错误！",
						complete() {
							that.onReset();
						}
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
					uni.navigateBack({
						
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
