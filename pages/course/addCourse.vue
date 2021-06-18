<template>
	<view>
		<form>
			<view class="cu-list menu" :class="'card-menu margin-top'">
				<view class="cu-bar bg-white margin-top">
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
				</view>
			<view class="cu-form-group margin-top">
				<view class="title">课程名称</view>
				<input placeholder="请输入" name="name" v-model="name"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">班级名称</view>
				<input placeholder="请输入" name="address" v-model="address"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">上课时间</view>
				<input placeholder="请输入" name="time" v-model="time"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">上课人数</view>
				<input placeholder="请输入" name="number" v-model="number"></input>
			</view>
			
			<view class="cu-form-group">
				<view class="title">上课学期</view>
				<picker @change="PickerChange" :value="index" :range="picker">
					<view class="picker">
						{{index>-1?picker[index]:picker[2]}}
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
		onLoad(option){
			uni.$on("CHOOSE_SCHOOL",(schoolMajor)=>{
				this.schoolMajorID=schoolMajor.id;
				this.schoolMajorName=schoolMajor.parents + '-' + schoolMajor.name;
			})
		},
		data() {
			return {
				index: -1,
				name: '',
				address: '',
				time: '',
				number: '',
				descirption: '',
				picker: ['2020-2021-1', '2020-2021-2', '2021-2022-1', '2021-2022-2'],
				date: '2020-09-01',
				imgList: [],
				modalName: null,
				schoolMajorID:0,
				schoolMajorName:"点击选择"
			};
		},
		methods: {
			
			addCourse() {
				var data = {
					name: this.name,
					description: this.descirption,
					state: 0,
					semester: this.picker[this.index>0?this.index:0],
					location: this.address,				
					schoolMajorID: this.schoolMajorID,
				}
				let url = '/courses/';
				console.log("courseData:" + this.picker[this.index>0?this.index:3])
				console.log("courseData:" + data)
				this.$myRequest.requestWithToken(url ,
					data, 'POST', (res) => {
					if (res.statusCode == 200) {
						console.log("添加课程结果" , res)
						let code = res.data.data.code
						uni.navigateTo({
							url: './addCourse/add-success?cno=' + code
						})
					} else{
						console.log("fails")
					} 
				})
			},
			PickerChange(e) {
				this.index = e.detail.value
			},
			chooseSchool() {
				uni.navigateTo({
					url: './orgnization/school'
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
