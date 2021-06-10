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
				<input placeholder="请输入" name="name"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">上课地点</view>
				<input placeholder="请输入" name="address"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">上课时间</view>
				<input placeholder="请输入" name="time"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">上课人数</view>
				<input placeholder="请输入" name="number"></input>
			</view>
			
			<view class="cu-form-group">
				<view class="title">上课学期</view>
				<picker @change="PickerChange" :value="index" :range="picker">
					<view class="picker">
						{{index>-1?picker[index]:picker[1]}}
					</view>
				</picker>
			</view>

			<view class="cu-form-group margin-top">
				<view class="title">学校院系</view>
				<picker mode="multiSelector" @change="MultiChange" @columnchange="MultiColumnChange" :value="multiIndex" :range="multiArray">
					<view class="picker">
						{{multiArray[0][multiIndex[0]]}}，{{multiArray[1][multiIndex[1]]}}
					</view>
				</picker>
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
			<view class="cu-form-group">
				<view class="title">学习要求</view>
				<input maxlength="-1" placeholder="请输入"></textarea>
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
		data() {
			return {
				index: -1,
				picker: ['2020-2021-1', '2020-2021-2', '2021-2022-1', '2021-2022-2'],
				multiArray: [
					['福州大学', '福建师范大学'],
					['数学与计算机科学学院', '物信学院', '经管学院', '外语学院'],
				],
				objectMultiArray: [
					[{
							id: 0,
							name: '福州大学'
						},
						{
							id: 1,
							name: '福建师范大学'
						}
					],
					[{
							id: 0,
							name: '数学与计算机科学学院'
						},
						{
							id: 1,
							name: '物信学院'
						},
						{
							id: 2,
							name: '经管学院'
						},
						{
							id: 3,
							name: '外语学院'
						}
					]
				],
				multiIndex: [0, 0, 0],
				date: '2020-09-01',
				imgList: [],
				modalName: null
			};
		},
		methods: {
			addCourse() {
				uni.redirectTo({
					url:"./course"
				})
			},
			PickerChange(e) {
				this.index = e.detail.value
			},
			MultiChange(e) {
				this.multiIndex = e.detail.value
			},
			MultiColumnChange(e) {
				let data = {
					multiArray: this.multiArray,
					multiIndex: this.multiIndex
				};
				data.multiIndex[e.detail.column] = e.detail.value;
				switch (e.detail.column) {
					case 0:
						data.multiArray[1] = ['数学与计算机科学学院', '物信学院', '经管学院', '外语学院'];
						data.multiIndex[1] = 0;
						data.multiIndex[2] = 0;
						break;
				}
				this.multiArray = data.multiArray;
				this.multiIndex = data.multiIndex;
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
	
	textarea {
		text-align: ;
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
