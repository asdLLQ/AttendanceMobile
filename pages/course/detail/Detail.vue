<template>
    <view>
		<view class="nav flex">
			<view class="nav-item" @click="onGetStudents()">
				<view class="cuIcon-group person"></view>
				<text>成员列表</text>
			</view>
			<view class="nav-item" @click="onGetTasks()">
				<view class="cuIcon-edit checkin"></view>
				<text>签到任务</text>
			</view>
			<view class="nav-item" @click="onGetDetail()">
				<view class="cuIcon-calendar detail"></view>
				<text>班课详情</text>
			</view>
		</view>
		<!-- 成员列表 -->
		<view v-if="page === 0">
			<view class="describe">成员</view>
			<view v-for="(item,index) in students" :key="item.id">
				<stu :name="item.stuName" :number="item.stuId" :descrip="item.experience + '经验值'"></stu>
			</view>
		</view>
		<!-- 签到记录 -->
		<view v-if="page === 1">
			<view class="describe">签到任务统计</view>
			<view class="cu-list menu" v-for="(item,index) in tasks" :key="item.id">
				<view class="cu-form-group" @click="onGetTaskDetails(item.id)">
					<view>{{item.startTime}}
						<text v-if="item.type == 0">一键签到</text>
						<text v-if="item.type == 1">限时签到</text>
						<text v-if="item.type == 2">手势签到</text>
					</view>
					<view class="cuIcon-right"></view>
				</view>
			</view>
		</view>
		<!-- 班课详情 -->
		<view v-if="page === 2">
			<view class="edit flex">
				<view class="describe">班课详情</view>
				<view class="describe" @click="onEdit()"  v-show="role == 0"><text>编辑</text></view>
			</view>
			
			<view class="cu-list menu">
				<view class="cu-form-group">
					<view>班课</view>
					<input :value="course.name" :disabled="edit" v-model="course.name"></input>
				</view>
				<view class="cu-form-group">
					<view>学期</view>
					<view class="text-gray">
					<picker @change="onPickerChange" :value="semesterIndex" :range="picker" :disabled="edit">
						{{course.semester}}<!-- <input :value="course.semester" :disabled="edit" v-model="course.semester"></input> -->
					</picker></view>
					<!-- <view class="text-gray">{{course.semester}}</view> -->
				</view>
			</view>
			<view class="cu-list menu margin-top">	
				<view class="cu-form-group">
					<view>班课号</view>
					<view class="text-gray flex">{{course.code}}
						<canvas canvas-id="qrcode" id="qrcode" @click="onPreiewImg"></canvas>
					</view>
				</view>
				<view class="cu-form-group">
					<view>允许加入</view>
					<view> <switch @change="onSwitchA" :class="switchA?'checked':''" :checked="switchA?true:false"></switch></view>
				</view>
				<view class="cu-form-group">
					<view>课程状态</view>
					<view class="text-gray">{{course.stateName}}</view>
				</view>
				<view class="cu-form-group">
					<view>任课老师</view>
					<view class="text-gray">{{course.teacherName}}</view>
				</view>
				<view class="cu-form-group">
					<view>学院</view>
					<!-- <input :value="course.schoolMajorName" :disabled="edit"></input> -->
					<view class="text-gray">{{course.schoolMajorName}}</view>
				</view>
			</view>
			<view v-show="role == 0">
				<button class="margin-top bg-cyan lg" v-show="!edit" @click="onCancleEdit()">取消</button>
				<button class="margin-top bg-cyan lg" v-show="!edit" @click="onSubmitEdit()">完成编辑</button>
				<button class="margin-top bg-cyan lg" v-show="edit" 
						@click="onSetCourseState('2')" :disabled="this.course.state == 2">结束班课</button>
				<button class="margin-top bg-cyan lg" v-show="this.course.state == 2" @click="onDelCourse()">删除班课</button>
			</view>
			
		</view>
    </view>
</template>

<script>
	import Stu from '@/components/stu-list/Stu-list.vue'
	import CODE from '@/components/uni-code'
	export default {
		components: {
			'cu-custom': CODE,
			'stu': Stu,
		},
		data() {
			return {
				cno:'',
				qrc:{// 二维码配置
					id: 'qrcode', // canvas的canvas-id
					size: 25, // 二维码大小
					level: 4, //等级 0～4
					bgColor: '#FFFFFF', //二维码背景色 默认白色
					iconSize: 10, //二维码图标的大小
					color: '#000' // 二维码颜色 默认黑色
				},
				imageUrl:"../../../static/img/course/default.png",
				cid: '',
				course:'',
				page: 2,
				students: '',
				tasks: '',
				switchA: true,
				edit: true,
				picker: ['2020-2021-1', '2020-2021-2', '2021-2022-1', '2021-2022-2'],
				semesterIndex: '',
				role:'',
			}
		},
		onLoad(option) {
			const { windowWidth, windowHeight } = uni.getSystemInfoSync();
			this.qrc.size=windowWidth*0.06;
			this.cid = option.cid
			this.role = option.role
			console.log(this.courseID)
			this.searchCourse()
		},
		onNavigationBarButtonTap(){
			uni.switchTab({
				url:"../List"
			})
		},
		methods: {
			async searchCourse() {
				const that = this
				let url = '/courses/code/' + that.cid;
				console.log("uid:" + that.cid)
				that.http.get(url, '').then((res) => {
					console.log("显示课程详情" , res.data)
					that.course = res.data
					that.switchA = that.course.state == 0 ?true:false
					that.findCan()
				})
			},
			async onGetStudents() {
				this.page = 0;
				let url = '/courses/' + this.course.id + '/students';
				console.log("uid:" + url)
				let res = await this.http.get(url, null)
				this.students = res.data.content
			},
			async onGetTasks() {
				this.page = 1;
				let url = '/checkin-tasks/courses/' + this.course.id;
				console.log("uid:" + url)
				let res = await this.http.get(url, null)
				this.tasks = res.data.content
				console.log("签到任务列表：" , this.tasks)
			},
			onGetDetail() {
				this.page = 2;
			},
			onSwitchA(e) {
				this.switchA = e.detail.value
				if(this.switchA) this.state = '0'
				else this.state = '1'
				console.log(this.state)
				this.onSetCourseState(this.state)
			},
			onPickerChange(e) {
				this.semesterIndex = e.detail.value
				console.log(this.picker[this.semesterIndex])
				this.course.semester = this.picker[this.semesterIndex]
			},
			onEdit() {
				this.edit = false
			},
			async onSubmitEdit() {
				var data = {
					name: this.course.name,
					semester: this.course.semester,
				}
				let url = '/courses/'+  this.course.id;
				console.log("courseData:" , data)
				let res = await this.http.patch(url, data)
				console.log("修改课程结果" , res.data)
				this.searchCourse()
				this.edit = true
			},
			onCancleEdit() {
				this.edit = !this.edit;
			},
			async onSetCourseState(state) {
				let url = '/courses/'+this.course.id+'/state'
				let res = await this.http.put(url, state)
				console.log("修改课程结果" , res.data)
				this.course = res.data
			},
			onGetTaskDetails(taskId) {
				uni.navigateTo({
					url: "../checkin/CheckinResult?taskId=" + taskId
				})
			},
			onDelCourse() {
				let url = '/courses/'+this.course.id
				this.http.delete(url,'').then((res) => {
					console.log("删除课程结果" , res.data)
					uni.switchTab({
						url:'../List'
					})
				})
			},
			findCan () {
				CODE.QRCode({...this.qrc,code: this.course.code});
			},
			onPreiewImg() {
				uni.canvasToTempFilePath({
					canvasId: 'qrcode',
					fileType: 'png',
					destWidth: 200,
					destHeight:200,
					success: function(res) {
						console.log(res.tempFilePath)
						this.imageUrl = res.tempFilePath
						console.log(this.imageUrl)
						// 在这里保存图片
						uni.previewImage({
							urls:[this.imageUrl]
						})
					},
					fail: function(error) {
						console.log(error)
					},})
				
			}
		}
	}
	
</script>

<style lang="scss" scoped>
	.center {
		margin-top: 100rpx;
		text-align: center;
		font-size: 50rpx;
	}
	.nav {
		background-color: #cff4f8;
		padding: 20rpx;
		.nav-item{
			width: 33.33%;
			text-align: center;
			view{
				width: 100rpx;
				height: 100rpx;
				border-radius: 50%;
				line-height: 100rpx;
				font-size: 50rpx;
				margin:10rpx auto;
			}
			.checkin{background-color: #7ed9ff;}
			.person{background-color: #ffb3b4;}
			.detail{background-color: #f4ee9b;}
		}
	}
	image {
		width: 50upx;
		height: 50upx;
		border-radius: 50%;
	}
	.edit {justify-content:space-between;font-size: 100rpx;
		text {color:#0FAEFF}
	}
	.describe {
		font-size: 30rpx;
		line-height: 70rpx;
	}
	input {text-align: right;font-size: 28rpx;color: #aaaaaa;}
	.qrcode {
	    height: 35rpx;
	    display: flex;
	    flex-direction: column;
	    justify-content: center;
	    align-items: center;
	}
	#qrcode{
	    width: 35rpx;
	    height: 35rpx;
	    background-color: #fff;
	}
</style>