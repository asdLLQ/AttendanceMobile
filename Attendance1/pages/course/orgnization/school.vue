<template>
    <view>
		<!-- 成员列表 -->
		<view class="stu-list flex" v-for="item in list" :key="item.id">
			<view class="stu-item flex" @tap="getSchool(item)">	
				<view class="content">
					<view >{{item.name}}</view>
				</view>
				<view class="score flex" v-if="item.childrenCount != 0">
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
			uni.showLoading({
				title:"loading"
			})
			this.getSchool()
		},
		data() {
			return {
				list: "",
				stack:[],
			}
		},
		methods: {
			async getSchool (item = null) {
				let _this = this;
				uni.hideKeyboard() //隐藏软键盘
				let url = '/organizations/';
				if(item){
					this.stack.push(item.id)
					url += item.id;
					//倘若无下一级，则返回原页面
					if(item.childrenCount == 0) {
						console.log("****" + this.stack[this.stack.length-1])
						uni.$emit("CHOOSE_SCHOOL",item)
						uni.navigateBack()
					}
				} else {
					url += 1000;
				}
				console.log(url)
				console.log("stack:" + this.stack)
				_this.$myRequest.requestWithToken(url ,
					'', 'GET', (res) => {
					uni.hideLoading()
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