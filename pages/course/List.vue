/**
 * 班课列表页面，显示登陆人员的所有班课列表
 */
<template>
	<view>
		<view class="role-type flex">
			<view v-for="(item,index) in roleList" :key="index" @click="role = index" 
				:class="{act: role === index}" class="role-type-btn">{{item}}</view>
		</view>
		<view v-if="role === 1">
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
						<button class="bg-cyan text-white text-sm" @click="detail(item.code)">查看详情</button>
						<button class="bg-cyan text-white text-sm" @click="singnUp(item.id)">签到</button>
					</view>
				</view>
			</view>
		</view>
		<view v-else>
			<view class="cu-list menu-avatar">
				<view class="cu-item margin-top" v-for="item in courseList" :key="item.id">
					<view>{{item.courseClass}}</view>
					<view class="cu-avatar round lg">
						<image :src="imageUrl"></image>
					</view>
					<view class="content">
						<view class="text-grey  text-df flex">{{item.name}}</view>
						<!-- <view class="text-gray text-df flex">教师：{{item.teacherName}}</view> -->
						
						<view class="text-gray text-df flex">学期：{{item.semester}}</view>
						<view class="text-gray text-df flex courseId">班课号：{{item.code}}</view>
					</view>
					<view class="action">
						<button class="bg-cyan text-white text-sm" @click="detail(item.code)">查看详情</button>
						<button class="bg-cyan text-white text-sm" @click="showCheckinModal(item.id)">发起签到</button>
					</view>
				</view>
			</view>
		</view>

		<view class="button-add-location" @click="showCourseModal()" v-show="role === 0">
			<image src="../../static/img/tabbar/tab_add.png"></image>
		</view>
	</view>
</template>

<script>
	import {getMyLocation} from '../../util/util.js'
	export default {
		async onLoad () {
			this.uid = uni.getStorageSync('uid')
		 	this.showCourse()
			this.address = await getMyLocation();
		},
		data() {
			return {
				// 0代表教师，1代表学生
				role: 0,
				roleList: ['我创建的', '我加入的'],
				modalName: null,
				imageUrl:"../../static/img/course/default.png",
				uid: '',
				courseList:'',
				address: [],
				taskId: '',
			}
		},
		methods: {
			showCheckinModal(courseID) {
				const that = this
				// if (that.getCurrentTask(courseID) != '') {
				// 	uni.showToast({
				// 		title:"有签到任务了"
				// 	})
				// }
				that.getCurrentTask(courseID)
				console.log("已有签到任务ID", that.taskId)	
				var data = {
					courseId: courseID,
					longitude: that.address[0],
					latitude: that.address[1],
					type: 1,
				}
				console.log("发起签到的信息：",data)
				uni.showActionSheet({
				    itemList: ['一键签到', '限时签到', '手势签到'],
				    success: function (res) {
				        console.log('选中了第' + (res.tapIndex + 1) + '个签到按钮');
						// 一键签到
						if(res.tapIndex === 0) {
							console.log("一键签到");
							uni.showModal({
							    title: '提示',
							    content: '一键签到将马上开始，请让学生做好准备',
								confirmText: '好的',
							    success: function (res) {
							        if (res.confirm) {
							            console.log('用户点击确定,发起一键签到');
										that.http.post("/checkin-tasks", that.data).then((data) => {
											console.log("发起一键签到结果：")
											console.log(data.id)
											uni.navigateTo({
												url: 'checkin/CheckinIng?id=' + data.id
											})
										})		
							        }
							    }
							});
						} // 限时签到
						else if(res.tapIndex === 1) {
							console.log("限时签到");
							uni.navigateTo({
								url: 'checkin/TimeLimit?courseId=' + courseID
							})
						} // 手势签到
						else {
							console.log("手势签到");
							uni.navigateTo({
								url: "checkin/Gesture"
							})
						}
				    },
				    fail: function (res) {
				        console.log(res.errMsg);
				    }
				});
			},
			showCourseModal(e) {
				uni.showActionSheet({
				    itemList: ['创建班课', '通过班课号加入班课', '扫码加入班课'],
				    success: function (res) {
				        console.log('选中了第' + (res.tapIndex + 1) + '个按钮');
						if(res.tapIndex === 0) {
							console.log("A1");
							uni.navigateTo({
								url: './creation/Creation',
							})
						} else if(res.tapIndex === 1) {
							console.log("B1");
							uni.navigateTo({
								url: './join/CodeSearch',
							})
						} else {
							console.log("C1");
							uni.scanCode({
								scanType: ['qrCode','barCode'],
								success: function (res) {
									const cno = res.result;
									uni.navigateTo({
										url: './detail/Detail?id=' + cno
									});
			
								}
							});
						}
				    },
				    fail: function (res) {
				        console.log(res.errMsg);
				    }
				});
			},
			async showCourse() {
				let url
				if(this.role === 0 )
					url = '/courses/joined/'+this.uid;
				else
					url = '/courses/taught/'+this.uid;
				console.log("uid:" + this.uid)
				let res = await this.http.get(url,'')
				console.log("显示课程" , res.data.content)
				this.courseList = res.data.content
			},
			detail(cid) {
				uni.navigateTo({
					url:'./detail/Detail?cid=' + cid
				});
			},
			async getCurrentTask(courseId) {
				const that = this
				console.log("签到：")
				let url = "/checkin-tasks/courses/" + courseId + "/current"
				this.http.get(url, courseId).then((data) => {
					console.log("学生点击签到：" , data)
					console.log("taskId：" , data.id)
					that.taskId = res.data.id
				})
			},
			singnUp(courseId) {
				//let taskId = this.getCurrentTask(courseId)
				let url = "/checkin-tasks/courses/" + courseId + "/current"
				this.http.get(url, courseId).then((data) => {
					console.log("学生点击签到：" , data)
					console.log("taskId：" , data.id)
					that.taskId = res.data.id
					if (that.taskId)
						uni.navigateTo({
						url: './checkin/Checkin?taskId='+ taskId
					})
				})
				
			}
		}
	}
</script>

<style lang="scss">
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
	.button-add-location {
		position:fixed;
		right: 0rpx;
		bottom: 100rpx
	}
	.courseId {
		color: #1CBBB4;
	}
	.role-type {
		display: flex;
		justify-content:space-evenly;
		font-size: 35rpx;
		
		.role-type-btn {
			line-height: 40px;
			margin: 0rpx 70rpx;
		}
		.role-type-btn.act {
			color: #0FAEFF;
			border-bottom: solid 5rpx #0FAEFF;
		}
	}
</style>

