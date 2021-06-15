<template>
	<view>
		<view class="cu-bar bg-cyan search">
			<view class="search-form radius">
				<text class="cuIcon-search"></text>
				<!-- @blur="InputBlur" :adjust-position="false" -->
				<input @focus="InputFocus" type="text" placeholder="搜索班课" confirm-type="search"></input>
			</view>
			<view class="action">
				<text class="cuIcon-add" @click="showModal" data-target="bottomModal"></text>				
			</view>
		</view>
		<view v-if="role === 0">
			<view class="cu-list menu-avatar">
				<view class="cu-item margin-top" v-for="item in courseList" :key="item.id">
					<view class="cu-avatar round lg">
						<image :src="imageUrl"></image>
					</view>
					<view class="content">
						<view class="text-grey  text-xsl flex">{{item.name}}</view>
						<view class="text-gray text-df flex">任课老师：
							<text>{{item.teacherName}}</text>
						</view>
					</view>
					<view class="action">
						<button class="text-grey text-sm" @tap="detail(item.code)">查看详情</button>
						<button class="text-grey text-sm">签到</button>
					</view>
				</view>
			</view>
		</view>
		<view v-else>
			<view class="cu-list menu-avatar">
				<view class="cu-item margin-top" v-for="item in courseList" :key="item.id">
					<view class="cu-avatar round lg">
						<image :src="imageUrl"></image>
					</view>
					<view class="content">
						<view class="text-grey  text-df flex">{{item.name}}</view>
						<view class="text-gray text-df flex">任课老师：
							<text>{{item.teacherName}}</text>
						</view>
					</view>
					<view class="action">
						<button class="text-grey text-sm" @tap="detail(item.code)">查看详情</button>
						<button class="text-grey text-sm" @click="showModal">发起签到</button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 0代表学生，1代表教师
				role: 1,
				modalName: null,
				imageUrl:"../../static/course-default.png",
				uid: '',
				courseList:'',
			}
		},
		onLoad () {
			this.uid = uni.getStorageSync('uid')
		 	this.showCourse()
		},
		methods: {
			showModal(e) {
				/*uni.showActionSheet({
				    itemList: ['一键签到', '限时签到', '手势签到'],
				    success: function (res) {
				        console.log('选中了第' + (res.tapIndex + 1) + '个按钮');
						if(res.tapIndex === 0) {
							console.log("A1");
							uni.navigateTo({
								url: '../course/addCourse',
							})
						} else if(res.tapIndex === 1) {
							console.log("B1");
						} else {
							console.log("C1");
						}
				    },
				    fail: function (res) {
				        console.log(res.errMsg);
				    }
				});*/
				uni.showActionSheet({
				    itemList: ['创建班课', '通过班课号加入班课', '扫码加入班课'],
				    success: function (res) {
				        console.log('选中了第' + (res.tapIndex + 1) + '个按钮');
						if(res.tapIndex === 0) {
							console.log("A1");
							uni.navigateTo({
								url: './addCourse',
							})
						} else if(res.tapIndex === 1) {
							console.log("B1");
							uni.navigateTo({
								url: './join/input-id',
							})
						} else {
							console.log("C1");
							uni.scanCode({
								scanType: ['qrCode','barCode'],
								success: function (res) {
									const cno = JSON.stringify(res.result);
									console.log('条码类型：' + res.scanType);
									uni.navigateTo({
										url:'join-class?cno='+cno
									})
								}
							});
						}
				    },
				    fail: function (res) {
				        console.log(res.errMsg);
				    }
				});
			},
			showCourse() {
				let url = '/courses/';
				console.log("uid:" + this.uid)
				this.$myRequest.requestWithToken(url ,
					'', 'GET', (res) => {
					if (res.statusCode == 200) {
						console.log("显示课程" , res.data.data.content)
						this.courseList = res.data.data.content
						/*cno = res.data.data.cno
						uni.navigateTo({
							url: './add-success?cno=' + cno
						})*/
					} else{
						console.log("fails")
					} 
				})
			},
			detail(code) {
				console.log("查看详情",code)
				uni.navigateTo({
					url:'courseDatail/course-detail?id=' + code
				});
			},
		}
	}
</script>

<style>
	image {
		width: 100upx;
		height: 100upx;
		border-radius: 20%;
	}
	
	button {
		width:160upx;
		height: 60upx;
		margin-bottom: 15upx;
		line-height: 60rpx;
	}
</style>

