<template>
    <view>
		<view class="basic-info border-set">
			<view class="title">基本信息</view>
			<view class="flex">
				<view class="flex"><image :src="imageUrl"></image></view>
				<view class="content">
					<view>姓名：莫甘娜</view>
					<view>学号：200327062</view>
					<view>手机号：13015911092</view>
					<view>专业：电子信息</view>
				</view>
			</view>
		</view>
		
		<view class="sign-info border-set">
			<view class="title">签到统计信息</view>
			<view class="content flex">
				<view class="describe">
					<view>经验值：89/100</view>
					<view>出勤等级：L1</view>
				</view>
				<view class="pie-chart">
					<canvas id="myCanvas" class="chart" canvas-id="myCanvas"></canvas>
				</view>
			</view>
		</view>
			
		
		<view class="sign-detail border-set">
			<view class="title">经验值明细</view>
			<view class="content flex">
				<view class="date-info">20210326  15:44</view>
				<view>签到-经验值+1</view>
				<view class="date-info">20210326  15:44</view>
				<view>签到-经验值+1</view>
			</view>
		</view>
		<!-- 底部状态栏 -->
		<view>
			<view-tabbar tabIndex=2></view-tabbar>
		</view>
    </view>
</template>

<script>
	import Tabbar from '@/components/tab-course.vue'
	export default {
		components: {
			'view-tabbar': Tabbar
		}, 
		onload(options) {
			
		},
		data() {
			return {
				index: 0,
				imageUrl:"../../static/default.png",
				title: 'Hello',
				animationData: {},
				routeHistory: 0
			}
		},
		methods: {
			createCavans() {
				const ctx = uni.createCanvasContext('myCanvas')
				const query = uni.createSelectorQuery().in(this);
				let width = 0,
					height = 0
				query.select('#myCanvas').boundingClientRect(data => {
					width = data.width;
					height = data.height;
				}).exec();
				console.log(width+" "+height)
				// 扇形个数
				let num=[{
					prent:70,
					color:'#aa55ff'
				},{
					prent:30,
					color:'#aaffff'
				}]
				let angle = Math.PI*2/100
				let isAngel = 0
				//
				for(let i =0;i<num.length;i++){
					let sAngle = i==0?0:isAngel
					let eAngle = angle*num[i].prent+isAngel
					isAngel = eAngle
					ctx.beginPath()
					ctx.moveTo(width / 2, height / 2);
					let r = Math.random()*255
					let g = Math.random()*255
					let b = Math.random()*255
					ctx.fillStyle=num[i].color
					ctx.arc(width / 2, height / 2, 50,sAngle, eAngle);
					ctx.fill()
				}
				ctx.draw()
			},
		},
		onShow() {
			setTimeout(res => {
				this.createCavans()
			})
		},
	}
</script>

<style lang="scss" scoped>
	.flex {
		display: flex;
	}
		
	.border-set {
		background-color: white;
		width:700rpx;
		margin: 50rpx 25rpx;
		border-radius: 4%;
		.title {
			padding: 20rpx;
			font-size: 50rpx;
		}	
	}
		
	
	.basic-info {	
		image {
			margin: 30rpx;
			width: 160upx;
			height: 160upx;
			border-radius: 50%;
		}
		.content {
			margin-left: 50rpx;
			font-size: 35rpx;
			line-height: 60rpx;
		}
	}
	
	.sign-info {
		.content {
			.describe {
				margin-left: 20rpx;
				font-size: 35rpx;
				line-height: 100rpx;
			}
			.chart {
				margin-left: 150rpx;
				width: 200rpx;
				height: 200rpx;
			}
		}
	}
	
	.sign-detail {
		margin-bottom: 100rpx;
		.content {
			margin-left: 10rpx;
			font-size: 35rpx;
			line-height: 70rpx;
			flex-wrap: wrap;
			
			.date-info {
				padding-left: 10rpx;
				width:350rpx;
			}
		}
	}
</style>