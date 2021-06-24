<template>
    <view>
		<view class="nav flex">
			<view class="nav-item" @click="getStudents()">
				<view class="cuIcon-group person"></view>
				<text>成员列表</text>
			</view>
			<view class="nav-item" @click="getTasks()">
				<view class="cuIcon-edit checkin"></view>
				<text>签到任务</text>
			</view>
			<view class="nav-item" @click="getDetail()">
				<view class="cuIcon-calendar detail"></view>
				<text>班课详情</text>
			</view>
		</view>
		<!-- 成员列表 -->
		<view v-if="page === 0">
			<view class="describe">成员</view>
			<view v-for="(item,index) in students" :key="item.id">
				<stu :index="index" :name="item.stuName" :number="item.stuId" :descrip="item.experience + '经验值'"></stu>
			</view>
		</view>
		<!-- 签到记录 -->
		<view v-if="page === 1">
			<view class="describe">签到任务统计</view>
			<view v-for="(item,index) in tasks" :key="item.id" class="flex">
				<view>{{item.deadline}}</view>
				<view v-if="item.type == 0">一键签到</view>
				<view v-if="item.type == 1">限时签到</view>
				<view v-if="item.type == 2">手势签到</view>
			</view>
		</view>
		<!-- 班课详情 -->
		<view v-if="page === 2">
			<view class="edit flex">
				<view class="describe">班课详情</view>
				<view class="describe" @click="edit()"><text>编辑</text></view>
			</view>
			<view class="cu-list menu">
				<view class="cu-form-group">
					<view>班课</view>
					<input v-model="course"></input>
				</view>
				<view class="cu-form-group">
					<view>班课号</view>
					<view class="text-gray">{{course.code}}</view>
				</view>
				<view class="cu-form-group">
					<view>允许加入</view>
					<view> <switch @change="SwitchA" :class="switchA?'checked':''" :checked="switchA?true:false"></switch></view>
				</view>
				<view class="cu-form-group">
					<view>学期</view>
					<view class="text-gray">{{course.semester}}</view>
				</view>
				<view class="cu-form-group">
					<view>任课老师</view>
					<view class="text-gray">{{course.teacherName}}</view>
				</view>
				<view class="cu-form-group">
					<view>学院</view>
					<view class="text-gray">{{course.schoolMajorName}}</view>
				</view>
			</view>
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
			}
		},
		onLoad(option) {
			this.cid = option.cid
			console.log(this.courseID)
			this.searchCourse()
		},
		methods: {
			searchCourse() {
				let url = '/courses/code/' + this.cid;
				console.log("uid:" + this.uid)
				this.$myRequest.requestWithToken(url ,
					null, 'GET', (res) => {
					if (res.statusCode == 200) {
						console.log("显示课程详情" , res.data.data)
						this.course = res.data.data
						
					} else{
						console.log("fails")
					} 
				})
			},
			getStudents() {
				const that = this
				that.page = 0;
				let url = '/courses/' + this.course.id + '/students';
				console.log("uid:" + url)
				this.$myRequest.requestWithToken(url ,
					null, 'GET', (res) => {
					if (res.statusCode == 200) {
						that.students = res.data.data.content
						console.log("班课成员" , that.students)
					} else{
						console.log("fails")
					} 
				})
			},
			getTasks() {
				const that = this
				that.page = 1;
				let url = '/checkin-tasks/courses/' + this.course.id;
				console.log("uid:" + url)
				this.$myRequest.requestWithToken(url ,
					null, 'GET', (res) => {
					if (res.statusCode == 200) {
						that.tasks = res.data.data.content
						console.log("签到任务列表：" , that.tasks)
					} else{
						console.log("fails")
					} 
				})
			},
			getDetail() {
				this.page = 2;
			},
			SwitchA(e) {
				this.switchA = e.detail.value
			},
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
</style>