<template>
	<view>
		<view>
			<view class="title flex">
				<view>未签到</view>
				<view>{{unCheckStudents.length}}人</view>
			</view>
			<view v-for="(item,index) in unCheckStudents" :key="item.id">
				<stu :name="item.stuName" :number="item.stuId" :descrip="item.experience + '经验值'"></stu>
			</view>
		</view>
		<view class="margin-top">
			<view class="title flex">
				<view>已签到</view>
				<view>{{checkStudents.length}}人</view>
			</view>
			<view v-for="(item,index) in checkStudents" :key="item.id">
				<stu :name="item.stuName" :number="item.stuId" :descrip="item.experience + '经验值'"></stu>
			</view>
		</view>
		<view  class="margin-top">
			<button class="bg-cyan lg" @click="onReturn()">返 回</button>
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
				taskId: '',
				checkStudents: '',
				unCheckStudents: '',
			}
		},
		onLoad(option) {
			this.taskId = option.taskId
			console.log(this.taskID)
			this.getCheckedStudents()
			this.getUncheckedStudents()
		},
		methods: {
			getCheckedStudents() {
				const that = this
				let url = '/checkin-tasks/'+  this.taskId + '/logs';
				this.$myRequest.requestWithToken(url ,
					that.taskId, 'GET', (res) => {
					if (res.statusCode == 200) {
						console.log("已签到的学生列表" , res.data.data.content)
						that.checkStudents = res.data.data.content
					} else{
						console.log("fails")
					} 
				})
			},
			getUncheckedStudents() {
				const that = this
				let url = '/checkin-tasks/'+  this.taskId + '/unchecked';
				this.$myRequest.requestWithToken(url ,
					that.taskId, 'GET', (res) => {
					if (res.statusCode == 200) {
						console.log("未签到的学生列表" , res.data.data.content)
						that.unCheckStudents = res.data.data.content
					} else{
						console.log("fails")
					} 
				})
			},
			onReturn() {
				uni.navigateBack({})
			}
		}
	}
</script>

<style>
	.footer {
		position: absolute;
		bottom: 10rpx;
	}
	.title {
		justify-content: space-between;
	}
</style>
