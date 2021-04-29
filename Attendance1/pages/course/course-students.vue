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
		<view class="cu-list menu-avatar">
			<view class="cu-item ">
				<view class="cu-avatar round lg" style="background-image:url(https://ossweb-img.qq.com/images/lol/img/champion/Morgana.png);"></view>
				<view class="content">
					<view class="text-pink"><view class="text-cut">莫甘娜</view></view>
					<view class="text-gray text-sm flex"> <view class="text-cut">200327062</view></view>
				</view>
				<view class="action">
					<view class="text-gray">22:20</view>
				</view>
			</view>
			<view class="cu-item ">
				<view class="cu-avatar radius lg" style="background-image:url(https://ossweb-img.qq.com/images/lol/img/champion/Morgana.png);"></view>
				<view class="content">
					<view class="text-pink"><view class="text-cut">莫甘娜</view></view>
					<view class="text-gray text-sm flex"> <view class="text-cut">200327062</view></view>
				</view>
				<view class="action">
					<view class="text-gray">22:20</view>
				</view>
			</view>
		</view>
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
	   margin: 20rpx;
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
	   border:5upx solid #fff;
	   border-radius: 5%;
	   margin:10rpx;
	   
	   image {
		   margin-left: 50upx;
		   width: 100upx;
		   height: 100upx;
		   
		   border-radius: 0%;
	   }
   }
</style>