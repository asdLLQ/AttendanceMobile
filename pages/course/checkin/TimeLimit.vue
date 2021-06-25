/**
 * 限时签到页面:
 */
<template>
	<view>
		<!-- 时长设置和限时页面 -->
		<view>
			<view class="center margin-top">点击设置签到时长</view>
			<view>
				<picker mode="multiSelector" :range="timeList" :value="timesIndex" @change="bindTimeChange">			
					<view class="set-background center set-numbercolor">
						{{timeList[0][timesIndex[0]]}}
						<text class="text-grey padding">小时</text>{{timeList[1][timesIndex[1]]}}
						<text class="text-grey padding">分钟</text>
					</view>
				</picker>
			</view>
			<view class="margin-top">
				<view class="center">剩余签到时间</view>
				<view  class="border-bottom set-background">
					<uni-countdown :show-day="false"  color="#FFFFFF" background-color="#ffce88"
									border-color="#ffce88" :hour="setHour" :minute="setMin" :second="0">
					</uni-countdown>
				</view>
			</view>
		</view>
		<!-- 人数统计 -->
		
		<view class="main border-bottom flex">
			<view class="title">已签到人数: </view>
		</view>
		<view>
			<stu-list name="张三" number="200327062" descrip="已签到"></stu-list>
			<view v-for="(item,index) in checkStudents" :key="item.id">
				<stu :name="item.stuName" :number="item.stuId" :descrip="item.experience + '经验值'"></stu>
			</view>
		</view>
		<!-- 手动结束签到按钮 -->
		<button class="bg-cyan footer" @click="start()" v-show="isStart">开始签到</button>
		<button class="bg-cyan footer" @click="finish()" v-show="!isStart">结束签到</button>
	</view>
</template>

<script>
	import StuList from '@/components/stu-list/Stu-list.vue'
	import {getMyLocation} from '../../../util/util.js'
	import {formateDate_deadline} from '../../../util/util.js'
	export default {
		components: {
			'stu-list': StuList
		},
		data() {
			return {
				timeList: [[0,1,2,3,4,5,6,7,8,9,10],
							[0,1,2,3,4,5,6,7,8,9,10,
							11,12,13,14,15,16,17,18,19,20,
							21,22,23,24,25,26,27,28,29,30]],
				timesIndex: [0,1],
				isStart: true,
				setMin: 1,
				setHour: 0,
				checkStudents: '',
				courseId:'',
				address: [],
				deadline: '',
			}
		},
		async onLoad(option) {
			this.address = await getMyLocation();
			this.courseId = option.courseId
		},
		methods: {
			bindTimeChange(e){
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.timesIndex = e.target.value
				this.setHour = this.timeList[0][this.timesIndex[0]]
				this.setMin = this.timeList[1][this.timesIndex[1]]
				
			},
			start() {
				const that = this
				let current = new Date()
				that.deadline = formateDate_deadline(new Date(), that.setHour, that.setMin, "Y-M-D h:min:s")
				let data = {
					courseId: that.courseId,
					longitude: that.address[0],
					latitude: that.address[1],
					type: 1,
					deadline: that.deadline,
				}
				console.log('用户发起限时签到', data);
				that.$myRequest.requestWithToken("/checkin-tasks",data, 'POST',(res) => {
					if (res.statusCode == 200) {
						console.log("发起限时签到结果：" , res.data)
						console.log(res.data.data.id)
						
					} else{
						console.log("fails")
					} 
				})
			},
			finish() {
				console.log("结束签到")
				// clearInterval(this.timer)
				// clearTimeout(this.timer )
				// console.log("finish:" + this.timer)
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
			}
		}
	}
</script>

<style>
	.flex {
		display: flex;
	}
	.background {
		background-color: white;
	}
	.center {
		text-align: center;
	}
	.set-numbercolor {
		color: #FFFFFF;
		padding:10rpx;
	}
	.border-bottom {
		border-bottom-style: solid;
		border-width: 1rpx; 
		border-color: #DCDFE6;
	}
	.set-background {
		font-size: 32rpx;
		background-color: #ffce88;
	}
	.main {
		margin-top: 30rpx;
	}
	.title {
		font-size: 35rpx;
		line-height: 60rpx;
	}
	button {
		width: 100%;
		position: absolute;
		bottom: 100rpx;
	}
	
</style>