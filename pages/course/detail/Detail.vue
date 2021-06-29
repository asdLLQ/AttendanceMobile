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
				<view class="describe" @click="onEdit()"><text>编辑</text></view>
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
					<view>允许加入</view>
					<view> <switch @change="onSwitchA" :class="switchA?'checked':''" :checked="switchA?true:false"></switch></view>
				</view>
				<view class="cu-form-group">
					<view>班课号</view>
					<!-- <input :value="course.code" :disabled="edit"></input>
					<view class="text-gray">{{course.code}}</view>
				</view>
				<view class="cu-form-group">
					<view>任课老师</view>
					<!-- <input :value="course.teacherName" :disabled="edit"></input> -->
					<view class="text-gray">{{course.teacherName}}</view>
				</view>
				<view class="cu-form-group">
					<view>学院</view>
					<!-- <input :value="course.schoolMajorName" :disabled="edit"></input> -->
					<view class="text-gray">{{course.schoolMajorName}}</view>
				</view>
			</view>
			<button class="margin-top bg-cyan lg" v-show="!edit" @click="onCancleEdit()">取消</button>
			<button class="margin-top bg-cyan lg" v-show="!edit" @click="onSubmitEdit()">完成编辑</button>
			<button class="margin-top bg-cyan lg" v-show="edit" @click="onFinishCourse()">结束班课</button>
		</view>

    </view>
</template>

<script>
	import Stu from '@/components/stu-list/Stu-list.vue'
	export default {
		components: {
			'stu': Stu
		},
		data() {
			return {
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
			}
		},
		onLoad(option) {
			this.cid = option.cid
			console.log(this.courseID)
			this.searchCourse()
		},
		methods: {
			async searchCourse() {
				let url = '/courses/code/' + this.cid;
				console.log("uid:" + this.cid)
				let res = await this.http.get(url, null)
				console.log("显示课程详情" , res.data)
				this.course = res.data
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
			onFinishCourse() {
				
			},
			onGetTaskDetails(taskId) {
				uni.navigateTo({
					url: "../checkin/CheckinResult?taskId=" + taskId
				})
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
		background-color: #FFFFFF;
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
			.checkin{background-color: #19c1e6;}
			.person{background-color: #ff3d46;}
			.detail{background-color: #f4ea2a;}
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
</style>