<template>
    <view>
		<view>
			<view>班课号：</view>
			<view>班课</view>
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
				courseName:'',
			}
		},
		onLoad(option) {
			this.courseID = options.id
		},
		methods: {
			searchCourse() {
				let url = '/courses/' + this.courseID;
				console.log("uid:" + this.uid)
				this.$myRequest.requestWithToken(url ,
					'', 'GET', (res) => {
					if (res.statusCode == 200) {
						console.log("显示课程详情" , res.data.data)
						this.courseList = res.data.data
						/*cno = res.data.data.cno
						uni.navigateTo({
							url: './add-success?cno=' + cno
						})*/
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