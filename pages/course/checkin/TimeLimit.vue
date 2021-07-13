/**
 * 限时签到页面:
 */
<template>
	<view>
		<!-- 时长设置和限时页面 -->
		<view>
			<view class="center margin-top">点击设置签到时长</view>
			<view>
				<picker mode="multiSelector" :range="timeList" :value="timesIndex" @change="bindTimeChange" :disabled="edit">			
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
			<view class="title" v-show="!isStart">已签到人数: </view>
		</view>
		<view>
			<!-- <stu-list name="张三" number="200327062" descrip="已签到"></stu-list> -->
			<view v-for="(item,index) in stuList" :key="item.id">
				<stu :name="item.stuName" :number="item.stuId" descrip="已签到" :distance="item.distance"></stu>
			</view>
		</view>
		<!-- 手动结束签到按钮 -->
		<button class="bg-cyan footer" @click="start()" v-show="isStart">发起签到</button>
		<button class="bg-cyan footer" @click="finish()" v-show="!isStart">结束签到</button>
	</view>
</template>

<script>
	import StuList from '@/components/stu-list/Stu-list.vue'
	import {getMyLocation} from '../../../util/util.js'
	import {formateDate_deadline} from '../../../util/util.js'
	export default {
		components: {
			'stu': StuList
		},
		data() {
			return {
				timeList: [[0,1,2,3,4,5,6,7,8,9,10],
							[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,
							21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40]],
				timesIndex: [0,1],
				isStart: true,edit: false,
				setMin: 0,setHour: 0,
				checkStudents: [],
				courseId:'',
				address: [],
				current: '',deadline: '',
				timer:null,
				taskId: '',
				stuList: '',
			}
		},
		async onLoad(option) {
			this.courseId = option.courseId
			console.log(this.courseId,option.courseId)
			this.address = await getMyLocation();
		},
		
		onHide(){
			console.log(" hide")
			this.stopTimer();
		},
		onUnload(){
			console.log(" unload")
			this.stopTimer();
		},
			
		onShow() {
			
		},
		methods: {
			stopTimer(){
				if(this.timer){
					clearInterval(this.timer)
					this.timer = null;
				}
			},
			bindTimeChange(e){
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.timesIndex = e.target.value
			},
			async start() {
				this.edit = true
				this.current = new Date()
				this.setHour = this.timeList[0][this.timesIndex[0]]
				this.setMin = this.timeList[1][this.timesIndex[1]]
				console.log(this.setMin,'-', this.setHour)
				this.deadline = formateDate_deadline(this.current, this.setHour, this.setMin, "Y-M-D h:min:s")
				let data = {
					courseId: this.courseId,
					longitude: this.address[0],
					latitude: this.address[1],
					type: 1,
					deadline: this.deadline,
				}
				let res = await this.http.post("/checkin-tasks",data)
				console.log("发起限时签到结果：" , res.data)
				this.taskId = res.data.id
				this.isStart = false
				const that = this
				uni.$once('timeup',() => {
					console.log('监听到事件来自 finish ，携带参数 msg 为：')
					that.finish("时间到")
				})
				//监听倒计时是否结束
				// that.timer = setInterval(() => {
				// 	console.log("start")
					
				// }, 1000);
				//刷新学生签到列表
				that.timer = setInterval(() => {
					that.getStudentList()
				}, 3000);
			},

			finish(title="提示") {
				
				// 手动结束和时间到都会调用
				this.stopTimer();
				console.log("结束签到")
				var url = "/checkin-tasks/" + this.taskId + "/ended"
				// let res = await this.http.post(url,null)
				uni.showModal({
					title,
					content: '签到结束',
					
					success: function (res) {
					    if (res.confirm) {
							uni.switchTab({
								url: '../List',
							})		
						}
					}
				})
				this.isStart = false
				uni.navigateTo({
					url:"./CheckinResult?taskId="+this.taskId
				})
			},
			//获取签到的学生列表----定时刷新
			getStudentList() {
				var url = "/checkin-tasks/" + this.taskId + "/logs"
				this.http.get(url,null).then((res) => {
					this.stuList = res.data.content
				})
				console.log("刷新中：" , this.stuList)
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