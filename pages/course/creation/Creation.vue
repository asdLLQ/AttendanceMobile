/**
 * 班课创建页面: 
	 - 课程封面
	 - 课程名称
	 - 班级名称
	 - 上课时间
	 - 上课人数
	 - 上课学期
	 - 学校院系
	 - 学习要求
	创建成功后跳转到success页
 */
<template>
	<view>
		<form>
			<view class="cu-list menu" :class="'card-menu margin-top'">
				<!-- <view class="cu-bar bg-white margin-top">
					<view class="action">
						班课封面
					</view>
				</view>
				<view class="cu-form-group">
					<view class="grid col-4 grid-square flex-sub">
						<view class="bg-img" v-for="(item,index) in imgList" :key="index" @tap="ViewImage" :data-url="imgList[index]">
						 <image :src="imgList[index]" mode="aspectFill"></image>
							<view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index">
								<text class='cuIcon-close'></text>
							</view>
						</view>
						<view class="solids" @tap="ChooseImage" v-if="imgList.length<4">
							<text class='cuIcon-cameraadd'></text>
						</view>
					</view>
				</view> -->
			<view class="cu-form-group margin-top">
				<view class="title">课程名称</view>
				<input placeholder="请输入" name="course" v-model="course"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">班级名称</view>
				<input placeholder="请输入" name="name" v-model="name"></input>
			</view>
			<!-- <view class="cu-form-group">
				<view class="title">上课时间</view>
				<input placeholder="请输入" name="time" v-model="time"></input>
			</view> -->
			<view class="cu-form-group">
				<view class="title">上课人数</view>
				<input placeholder="请输入" name="number" v-model="number"></input>
			</view>
			
			<view class="cu-form-group">
				<view class="title">上课学期</view>
				 <picker @change="PickerChange" :value="index" :range="picker">
					<view class="picker">
						{{index>-1?picker[index]:"请选择"}}
					</view>
				</picker>
			</view>

			<view class="cu-form-group margin-top" @click="chooseSchool()">
				<view class="title">学校院系</view>
				<view>{{schoolMajorName}}</view>
			</view>
			<view class="cu-form-group">
				<view class="title">考试安排</view>
				 <!-- @change="DateChange" -->
				<picker mode="date" :value="date" start="2016-09-01" end="2021-09-01">
					<view class="picker">
						{{date}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group" >
				<view class="title">学习要求</view>
				<input maxlength="-1" placeholder="请输入" v-model="descirption"></textarea>
			</view>
			</view>
		</form>
		<view >
			<button class="login-btn" @click="addCourse()">创建班课</button>
		</view>
	</view>
</template>

<script>
	export default {
		async onLoad(option){
			uni.$on("CHOOSE_SCHOOL",(schoolMajor)=>{
				this.schoolMajorID=schoolMajor.id;
				this.schoolMajorName=schoolMajor.parents + '-' + schoolMajor.name;
			})
			var that = this
			this.http.get('/dictionaries/code/semester', '').then((res) => {
				console.log("result:",res.data.details)
				res.data.details.forEach(function (item) {
					console.log(item.name)
					that.picker.push(item.name)
				}) 
			})
			console.log(this.picker)
		},
		data() {
			return {
				index: -1,
				name: '',
				course:'',
				time: '',
				number: '',
				descirption: '',
				picker:[],
				date: '2020-09-01',
				imgList: [],
				modalName: null,
				schoolMajorID:0,
				schoolMajorName:"点击选择"
			};
		},
		methods: {
			async addCourse() {
				let uid = uni.getStorageSync('uid')
				var data = {
					name: this.name,
					courseClass: this.course,
					description: this.descirption,
					state: 0,
					semester: this.picker[this.index>0?this.index:0],
					location: this.address,				
					schoolMajorID: this.schoolMajorID,
					teacherId: uid,
				}
				let url = '/courses/';
				console.log("courseData:" + this.picker[this.index>0?this.index:3])
				console.log("courseData:" , data)
				let res = await this.http.post(url, data)
				console.log("添加课程结果" , res)
				let code = res.data.code
				uni.navigateTo({
					url: './Success?cno=' + code
				})
			},
			PickerChange(e) {
				this.index = e.detail.value
			},
			chooseSchool() {
				uni.navigateTo({
					url: '../../orgnization/School'
				})
			},
		}
	}
</script>

<style>
	.cu-form-group .title {
		min-width: calc(4em + 15px);
	}
	
	input {
		text-align: right;
	}
	
	.creat-button {
		
	}
	.login-btn {
		margin-top: 50rpx;
		height: 96upx;
		width: 80%;
		background: #1CBBB4;
		border-radius: 40rpx;
		font-size: 40upx;
		color: #ffffff;
	}
</style>
