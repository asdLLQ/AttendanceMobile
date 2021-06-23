/*
 * 学生列表组件
 *
 */
<template>
	<view class="stu-list flex">
		<view class="stu-item flex">
			<view class="number flex">{{index}}</view>
			<view class="flex"><image :src="imageUrl"></image>
			</view>
			<view class="content">
				<view >{{name}}</view>
				<view>{{number}}</view>
			</view>
			<view class="score flex">
				<view class="text-gray flex">{{descrip}}
					<!-- <view class="cuIcon-right"></view> -->
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			index: {
				type: String,
				default: ''
			},
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
			},
			imageUrl: {
				type: String,
				default: '/static/default.png'
			},
			
		},
		data() {
			return {
				// imageUrl: '/static/default.png'
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
		padding:10rpx 0rpx;
		border-bottom-style: solid;
		border-width: 0.5rpx; 
		border-color: #DCDFE6;
	
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
