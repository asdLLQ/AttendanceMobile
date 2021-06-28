/**
 * 设置密码/ 
 */
<template>
	<view class="login">
		<view class="progress">
			<view class="cu-progress xs">
				<view class="bg-blue" :style="[{ width:'100%'}]"></view>
			</view>
		</view>
		<view class='mytitle'>
			<text>忘记密码</text>
		</view>
		<view class="cu-list menu" :class="'card-menu margin-top'">
			
			<view class="cu-form-group margin-top">
				<view class="title">密码</view>
				<input type="text"  password  placeholder="请输入" v-model="data.password" @blur="validate('pwd')" ></input>
			</view><view class="cu-form-group margin-top">
				<view class="title">确认密码</view>
				<input type="text"  password placeholder="请输入" v-model="confirm_pwd" @blur="validate1()"></input>
			</view>
		</view>
		<button class="bg-cyan login-btn margin-top" @tap="fillInfo()">跳过</button>
		<button class="bg-cyan login-btn margin-top" @tap="fillInfo()">完成</button>
	</view>
</template>


<script>
	export default {
		data() {
			return {
				password:'',
				confirm_pwd:'',
				rules:{
					phone:{
						rule:/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
						msg:"手机号错误"
					},
				},
				submit: true,
			}
		},
		onLoad(option) {
			this.data.smsCode = option.smsCode
			this.data.roles = option.roles=="1"?["students"]:["teacher"],
			this.data.phone = option.phone
			console.log(this.data.roles)
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
			async fillInfo() {
				if(this.data.password == '') this.data.password = "123456"
				if(this.data.realName == '') this.data.realName = "asd"+new Date().getTimezoneOffset()
				
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