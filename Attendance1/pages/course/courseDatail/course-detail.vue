<template>
    <view>
		<view>
			<view>班课号：{{courseID}}</view>
			<view>班课:{{course.name}}</view>
		</view>
		<!-- 底部状态栏 -->
		<view>
			<view-tabbar tabIndex=5></view-tabbar>
		</view>
    </view>
</template>

<script>
	import Tabbar from '@/components/tab-course.vue'
	export default {
		components: {
			'view-tabbar': Tabbar
		}, 
		data() {
			return {
				courseID: '',
				course:'',
			}
		},
		onLoad(option) {
			this.courseID = option.id
			console.log(this.courseID)
			this.searchCourse()
		},
		methods: {
			searchCourse() {
				let url = '/courses/code/' + this.courseID;
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
			}
		}
	}
	
</script>

<style lang="scss" scoped>
   
</style>