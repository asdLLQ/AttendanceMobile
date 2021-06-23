/**
 * 限时签到页面:
 */
<template>
	<view>
		<!-- 时长设置和限时页面 -->
		<view class="set-background">
			<view>点击设置签到时长:</view>
			<view>
				<picker mode="multiSelector" :range="timeList" :value="timesIndex" @change="bindTimeChange">			
					<view class="background center set-color felx">
						{{timeList[0][timesIndex[0]]}}
						<text class="text-gray">小时</text>{{timeList[1][timesIndex[1]]}}
						<text class="text-gray">分钟</text>
					</view>
				</picker>
			</view>
			<view>剩余签到时间：</view>
			<view  class="border-bottom">
				<uni-countdown :show-day="false" color="#FFFFFF" background-color="#00B26A"
								border-color="#00B26A" :hour="setHour" :minute="setMin" :second="0">
				</uni-countdown>
			</view>
		</view>
		<!-- 人数统计 -->
		<view class="main background border-bottom flex">
			<view class="title">已签到人数: </view>
		</view>
		<view>
			<stu-list name="张三" number="200327062" descrip="已签到"></stu-list>
			<stu-list name="张三" number="200327062" descrip="已签到"></stu-list>
		</view>
		<!-- 手动结束签到按钮 -->
		<button class="bg-cyan footer" @click="finish()">结束签到</button>
	</view>
</template>

<script>
	import StuList from '@/components/stu-list/Stu-list.vue'	
	export default {
		components: {
			'stu-list': StuList
		},
		data() {
			return {
				timeList: [['00','01','02','03','04','05','06','07','08','09','10'],
							['00','01','02','03','04','05','06','07','08','09','10',
							      '11','12','13','14','15','16','17','18','19','20',
							      '21','22','23','24','25','26','27','28','29','30']],
				timesIndex: [0,1],
				setMin: '',
				setHour: ' ',
			}
		},
		methods: {
			bindTimeChange(e){
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.timesIndex = e.target.value
				this.setHour = this.timeList[0][this.timesIndex[0]]
				this.setMin = this.timeList[1][this.timesIndex[1]]
				
			},
			finish() {
				console.log("结束签到")
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
		font-size: 40rpx;
	}
	.set-color {
		color: #4876FF;
	}
	.border-bottom {
		border-bottom-style: solid;
		border-width: 1rpx; 
		border-color: #DCDFE6;
	}
	.set-background {
		font-size: 35rpx;
		background-color: #EBEEF5;
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
		bottom: 60rpx;
	}
	
</style>