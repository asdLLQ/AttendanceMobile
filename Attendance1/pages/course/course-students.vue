<template>
    <view>
		<view class="title flex">
			<view class="people">
				<view>成员总数：{{num}}</view>
			</view>
			<view class="orderlist flex">
				<view>排序：</view>
				<view>
					<picker @change="orderPickerChange" :value="index" :range="array">
						<view class="orderItem flex">{{array[index]}}
							<view class="cuIcon-unfold"></view>
						</view>
					</picker>
				</view>
			</view>
		</view>
		
		<view class="stu-list flex">
			<view class="stu-item flex">
				<view class="number flex">1</view>
				<view class="flex"><image :src="imageUrl"></image></view>
				
				<view class="content">
					<view >莫甘娜</view>
					<view>200327062</view>
				</view>
				<view class="score flex">
					<view class="text-gray flex">22经验值
						<view class="cuIcon-right"></view>
					</view>
				</view>
			</view>
		</view>
		<view class="stu-list flex">
			<view class="stu-item flex">
				<view class="number flex">1</view>
				<view class="flex"><image :src="imageUrl"></image></view>
				
				<view class="content">
					<view >莫甘娜</view>
					<view>200327062</view>
				</view>
				<view class="score flex">
					<view class="text-gray flex">22经验值
						<view class="cuIcon-right"></view>
					</view>
				</view>
			</view>
		</view>
		
		<view class="stu-list flex">
			<view class="stu-item flex">
				<view class="number flex">1</view>
				<view class="flex"><image :src="imageUrl"></image></view>
				
				<view class="content">
					<view >莫甘娜</view>
					<view>200327062</view>
				</view>
				<view class="score flex">
					<view class="text-gray flex">22经验值
						<view class="cuIcon-right"></view>
					</view>
				</view>
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
				title: '',
				num: 0,
				array: ['经验值','学号'],
				index: 0,
				imageUrl:"../../static/default.png"
			}
		},
		methods: {
			orderPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.index = e.target.value
			},
		}
	}
</script>

<style lang="scss" scoped>
	.flex {
		display: flex;
	}
	
	.title {
		background-color:#DCDFE6;
		border-radius: 30rpx;
		justify-content: space-around;
		margin-top: 20rpx;
		font-size: 40rpx;
		padding:20rpx;
	   
		.orderItem {
			padding:5rpx;
			font-size: 35rpx;
			background-color:white;
			border-radius: 20rpx;
		}
   }
   
	.stu-list {
		background-color: white;
		margin:20rpx 0;
		padding:20rpx 0rpx;

		.stu-item {
			
			
		   .number {
				align-items:center;
				font-size: 40rpx;
				padding: 20rpx;
			}
	   
			image {
				width: 100upx;
				height: 100upx;
				border-radius: 20%;
			}
			
			.content {
				margin-left: 30rpx;
				font-size: 35rpx;
				width:320rpx;
				line-height: 50rpx;
			}
			
			.score {
				//align-items:center;
				line-height: 100rpx;
				font-size: 35rpx;
			}
		}
	}
</style>