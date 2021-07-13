/**
 * 班课列表页面，显示登陆人员的所有班课列表
 */
<template>
	<view>
		<!-- <view class="role-type flex">
			<view v-for="(item,index) in roleList" :key="index" @click="role = index" 
				:class="{act: role === index}" class="role-type-btn">{{item}}</view>
		</view> -->
		<view class="role-type flex">
			<view @click="onChangeRole(0)" :class="{act: role === 0}" class="role-type-btn">我创建的</view>
			<view @click="onChangeRole(1)"
				:class="{act: role === 1}" class="role-type-btn">我加入的</view>	
		</view>
		<view v-if="role === 1">
			<view class="cu-list menu-avatar">
				<view class="cu-item margin-top" v-for="item in courseList" :key="item.id">
					<view class="cu-avatar round lg">
						<image :src="item.state==2?imageUrlEnd:(item.avatar ? BASE_HOST+item.avatar :imageUrl)"></image>
					</view>
					<view class="content">
						<view class="text-grey  text-xsl flex">{{item.name}}</view>
						<view class="text-gray text-df flex">任课老师：
							<text>{{item.teacherName}}</text>
						</view>
					</view>
					<view class="action">
						<button class="bg-cyan text-white text-sm" @click="onDetail(item.code,1)">查看详情</button>
						<button class="bg-cyan text-white text-sm" @click="onSingnUp(item.id)">签到</button>
					</view>
				</view>
			</view>
		</view>
		<view v-else>
			<view class="cu-list menu-avatar">
				<view class="cu-item margin-top" v-for="item in courseList" :key="item.id">
					<view class="cu-avatar round xl">
						<image :src="item.state==2?imageUrlEnd:(item.avatar ? BASE_HOST+item.avatar :imageUrl)"></image>
					</view>
					<view class="content">
						<view class="text-grey text-df flex">
							<!-- <text v-show="item.courseClass != null" class="text-grey text-lg flex">
								{{item.courseClass}}--</text> -->
							{{item.name}}
						</view>
						<!-- <view class="text-gray text-df flex">教师：{{item.teacherName}}</view> -->
						
						<view class="text-gray text-df flex">学期：{{item.semester}}</view>
						<view class="text-gray text-df flex courseId">班课号：{{item.code}}</view>
					</view>
					<view class="action">
						<button class="bg-cyan text-white text-sm" @click="onDetail(item.code,0)">查看详情</button>
						<button class="bg-cyan text-white text-sm" @click="showCheckinModal(item.id)">发起签到</button>
					</view>
				</view>
			</view>
		</view>

		<view class="button-add-location" @click="showCourseModal()">
			<image src="../../static/img/tabbar/tab_add.png"></image>
		</view>
	</view>
</template>

<script>
	import {getMyLocation} from '../../util/util.js'
	export default {
		async onLoad () {
			
		},
	    async onShow(){
			const that =this
			uni.showLoading({
				
			})
			this.uid = uni.getStorageSync('uid')
			uni.hideLoading()
			this.showCourse()
			console.log(this.uid)
			this.address = await getMyLocation();
			// uni.getLocation({
			// 	type: 'gcj02',
			// 	success: function(res) {
			// 		uni.showModal({
			// 			title: 'gps:'+[res.longitude, res.latitude]+res,
			// 			icon: 'none',
			// 			duration:10000,
			// 		});
			// 		that.address = [res.longitude, res.latitude]
			// 	},
			// 	fail: function(err) {
			// 		console.log("Location Fail",err)
			// 		console.log("Location Fail code",AMapLocation.getErrorCode())
			// 		uni.showModal({
			// 			title: '获取地址失败，将导致部分功能不可用',
			// 			icon: 'none',
			// 			duration:10000,
			// 		});
			// 	},
			// });
		},
		data() {
			return {
				// 0代表教师，1代表学生
				role: 1,
				roleList: ['我创建的', '我加入的'],
				modalName: null,
				imageUrl:"../../static/img/course/default.png",
				imageUrlEnd:"../../static/img/course/finish.png",
				uid: '',
				courseList:'',
				address: [],
				taskId: '',
				current_task:false,
			}
		},
		methods: {
			//点击发起签到按钮后弹出的模态框
			//就只有这里是courseID
			async showCheckinModal(courseID) {
				const that = this
				uni.showLoading({
					
				})
				const current = await that.getCurrentTask(courseID)
				console.log("await that.getCurrentTask(courseID):",current)
				uni.hideLoading();
				let data = {
					courseId: courseID,
					longitude: that.address[0],
					latitude: that.address[1],
					type: 0,
				}
				console.log("发起签到的信息：",data)
				if(this.current_task) {
					console.log("已有签到: ",this.current_task)
					return;
				}
				uni.showActionSheet({
				    itemList: ['一键签到', '限时签到', '手势签到'],
				    success: function (res) {
						// 一键签到
						if(res.tapIndex === 0) {
							console.log("一键签到");
							uni.showModal({
							    title: '提示',
							    content: '一键签到将马上开始，请让学生做好准备',
								confirmText: '好的',
							    success: function (res) {
							        if (!res.confirm) {
							            return
							        }
									console.log('用户点击确定,发起一键签到');
									that.http.post("/checkin-tasks", data).then((res) => {
										console.log("发起一键签到结果：",res.data)
										uni.navigateTo({
											url: 'checkin/CheckinIng?id=' + res.data.id
										})
									})		
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
								url: "checkin/Gesture?courseId="+courseID
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
										url: './join/CodeSearch?code=' + cno
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
				if(this.role == 1)
					url = '/courses/joined/'+this.uid;
				else
					url = '/courses/taught/'+this.uid;
				console.log("uid:" + this.uid)
				let res = await this.http.get(url,'')
				console.log("显示课程" , res.data.content)
				this.courseList = res.data.content
			},
			onDetail(cid,role) {
				uni.navigateTo({
					url:'./detail/Detail?cid='+cid+'&role='+role
				})
			},
			async getCurrentTask(courseId) {
				//查询是够有签到任务正在进行中
				let url = "/checkin-tasks/courses/" + courseId + "/current"
				let res= await this.http.get(url, null);
				if(!res.data) {
					this.current_task = false
					return false
				}
				console.log("有签到任务：" , res.data)
				let type = res.data.type
				let taskId = res.data.id
				uni.showToast({
					icon:'none',
					title:"当前有正在进行的签到任务"
				})
				// if (type == 0 || type == 1)
				uni.navigateTo({url: './checkin/CheckinIng?id=' + taskId})
				// else
				// 	uni.navigateTo({url: './checkin/CheckinIng?id=' + taskId})
				this.current_task = true
				return true
			},
			async onSingnUp(courseId) {
				let url = "/checkin-tasks/courses/" + courseId + "/current"
				this.http.get(url, courseId).then((res) => {
					console.log("学生点击签到：" , res.data)
					if(res.data == null) 
						uni.showToast({
							title:"目前暂无发起的签到",
							icon:'none'
						})
					else {
						if (res.data.type == 2)
							uni.navigateTo({
								url: "checkin/GestureStu?taskId="+res.data.id+'&param='+res.data.param
							})	
						else
							uni.navigateTo({
								url: './checkin/Checkin?taskId='+ res.data.id
							})
					}
				})
			},
			onChangeRole(val) {
				this.role = val
				this.showCourse()
			}
		}
	}
</script>

<style lang="scss">
	image {
		width: 110upx;
		height: 110upx;
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

