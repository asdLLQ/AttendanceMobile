<template>
	<view>
		<view class="progress">
			<view class="cu-progress xs">
				<view class="bg-blue" :style="[{ width:'100%'}]"></view>
			</view>
		</view>
		<view class='mytitle'>
			<text>个人信息完善</text>
		</view>
		<view class="cu-list margin-top card-menu">
			<view class="cu-form-group">
				<view class="title">姓名</view>
				<input type="text" placeholder="请输入" v-model="data.realName"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">性别</view>
				 <picker @change="PickerChange" :value="index" :range="picker">
					<view class="picker">
						{{index>-1?picker[index]:"请选择"}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">邮箱</view>
				<input type="text" placeholder="请输入" v-model="data.email" @blur="validate('email')" ></input>
			</view>
			<view class="cu-form-group">
				<view class="title">密码</view>
				<input type="text"  password  placeholder="请输入" v-model="data.password" @blur="validate('pwd')" ></input>
			</view><view class="cu-form-group">
				<view class="title">确认密码</view>
				<input type="text"  password placeholder="请输入" v-model="confirm_pwd" @blur="validate1()"></input>
			</view>
		</view>
		<button class="bg-cyan margin-top" @tap="fillInfo()">跳过</button>
		<button class="bg-cyan margin-top" @tap="fillInfo()">完成</button>
	</view>
</template>


<script>
	export default {
		data() {
			return {
				index: -1,
				picker:[],
				data: {
					realName:'',
					gender:'',
					email:'',
					roles:'',
					password:'',
					smsCode:'',
					phone:'',
				},	
				confirm_pwd:'',
				rules:{
					email:{
						rule:/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
						msg:"邮箱错误"
					},
					pwd:{
						rule:/^[0-9a-zA-Z]{6,16}$/,
						msg:"密码应该为6-16位"
					},
				},
				submit: true,
			}
		},
		async onLoad(option) {
			this.data.smsCode = option.smsCode
			this.data.roles = option.roles=="1"?["students"]:["teacher"],
			this.data.phone = option.phone
			var that = this
			this.http.get('/dictionaries/code/sex', '').then((res) => {
				console.log("result:",res.data.details)
				res.data.details.forEach(function (item) {
					console.log(item.name)
					that.picker.push(item.name)
				}) 
			})
			console.log(this.picker)
		},
		methods: {
			validate(key) {
				console.log(key)
				if(!this.rules[key].rule.test(this[key])){
					this.submit = false
					//提示信息
					uni.showToast({
						icon: "none",
						title:this.rules[key].msg,
					})
					//this.msgErr = this.rules[key].msg
				}
			},
			validate1(){
				if(this.confirm_pwd != this.data.password) {
					this.submit = false
					uni.showToast({
						icon: "none",
						title:"两次密码不一致",
					})
				}
			},
			PickerChange(e) {
				this.index = e.detail.value
				this.data.gender = this.picker[this.index>0?this.index:0]
				console.log(this.data.gender)
			},
			async fillInfo() {
				if(this.data.password == '') this.data.password = "123456"
				if(this.data.realName == '') this.data.realName = this.data.roles[0] +new Date().getTimezoneOffset()
				
				uni.hideKeyboard()
				console.log(this.data)
				if(this.submit) {
					let res =  await this.http.post('/auth/register',this.data)
					console.log("注册成功")
					uni.navigateTo({
						url:"../login/Login"
					});
				}
				else {
					uni.showToast({
						icon: "none",
						title:"请按格式填写完信息后再提交",
					})
				}
			},
			
			sexChange(e) {
				console.log("/"+e.detail.value+"/");
			},
		}
	}
</script>



<style lang="scss">
	.mytitle {
		font-size: 70rpx;
		margin: 60rpx 0 0 100rpx;
	}
	input {
		text-align: right;
	}
</style>
