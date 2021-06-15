<template>
    <view>
		<!-- 成员列表 -->
		<view class="stu-list flex" v-for="item in list" :key="item.id">
			<view class="stu-item flex" @tap="getSchool(item)">	
				<view class="content">
					<view >{{item.name}}</view>
				</view>
				<view class="score flex" v-if="item.childrenCount!=0">
					<view class="text-gray flex">
						<view class="cuIcon-right"></view>
					</view>
				</view>
			</view>
		</view>
    </view>
</template>

<script>
	export default {
		onLoad() {
			this.getSchool()
		},
		data() {
			return {
				list: "",
				stack:[]
			}
		},
		methods: {
			async getSchool (item=null) {
				let _this = this;
				uni.hideKeyboard() //隐藏软键盘
				console.log(this.stack)
				let url = '/organizations/';
				if(item){
					url +=item.id;
				}else{
					url +=1000;
				}
				this.stack.push()
				console.log(url)
				_this.$myRequest.requestWithToken(url ,
					'', 'GET', (res) => {
					if (res.statusCode == 200) {
						console.log(res)
						this.list = res.data.data.children
					} else{
						console.log("fails")
					} 
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.flex {
		display: flex;
	}

	.stu-list {
		background-color: white;
		margin:20rpx 0;
		padding:20rpx 0rpx;

		.stu-item {
			height: 50rpx;
			.content {
				margin-left: 30rpx;
				font-size: 35rpx;
				width:670rpx;
				line-height: 50rpx;
			}
			
			.score {
				//align-items:center;
				line-height: 50rpx;
				font-size: 35rpx;
			}
		}
	}
</style>