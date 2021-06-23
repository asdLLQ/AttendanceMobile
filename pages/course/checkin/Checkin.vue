/*
 * 学生签到页面
 
*/
<template>
	<view>
		<button calss="bg-cyan" @click="checkin()">签到</button>
	</view>
</template>

<script>
	import {getMyLocation} from '@/util/util.js'
	export default {
		async onLoad(option) {
			this.taskId = option.taskId
			this.address = await getMyLocation()
			this.uid = await uni.getStorageSync("uid")
		},
		data() {
			return {
				taskId: '',
				address: '',
				uid:'',
			}
		},
		methods: {
			checkin() {
				const that = this
				let url = '/checkin-tasks/'+ that.taskId + "/logs";
				var data = {
					uid: that.uid,
					taskId: that.taskId,
					longitude: that.address[0],
					latitude: that.address[1],
				}
				console.log(data)
				that.$myRequest.requestWithToken(url,
					data, 'POST', (res) => {
					if (res.statusCode == 200) {
						console.log("签到结果：" , res.data)
						console.log(res.data.data.id)
						uni.switchTab({
							url: '../List'
						})
					} else{
						console.log("fails")
					} 
				})
			}
		}
	}
</script>

<style>
	button {
		width: 150rpx;
		height: 150rpx;
		border-radius: 50%;
		background-color: #1CBBB4;
		color: white;
		padding: 30rpx;
		position:fixed;
		bottom: 400rpx;
		left: 300rpx;
	}
</style>
