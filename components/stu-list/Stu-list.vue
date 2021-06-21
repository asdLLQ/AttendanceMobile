/*
 * 学生列表组件
 *
 */
<template>
	<view class="stu-list flex">
		<view class="stu-item flex">
			<view class="number flex">1</view>
			<view class="flex"><image :src="imageUrl"></image>
			</view>
			<view class="content">
				<view >莫甘娜</view>
				<view>200327062</view>
			</view>
			<view class="score flex">
				<view class="text-gray flex">22经验值
					<!-- <view class="cuIcon-right"></view> -->
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			name: {
				type: String,
				default: ''
			},
			number: {
				type: String,
				default: ''
			},
			descrip: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				imageUrl: '../../static/img/default.png'
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
	.flex {
		display: flex;
	}
	
	.stu-list {
		background-color: white;
		margin:10rpx 0;
		padding:10rpx 0rpx;
	
		.stu-item {
		   .number {
				align-items:center;
				font-size: 30rpx;
				padding: 20rpx;
			}
	   
			image {
				width: 100upx;
				height: 100upx;
				border-radius: 20%;
			}
			
			.content {
				margin-left: 30rpx;
				font-size: 30rpx;
				width:400rpx;
				line-height: 50rpx;
			}
			
			.score {
				//align-items:center;
				line-height: 100rpx;
				font-size: 30rpx;
			}
		}
	}
</style>
