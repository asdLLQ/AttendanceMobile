/**
 * 设置密码/ 
 */
<template>
	<view class="login">
		<view class='mytitle'>
			<text>忘记密码</text>
		</view>
		<view class="cu-list menu margin-top">
			<view class="cu-form-group">
				<view class="title">手机号码</view>
				<input placeholder="输入手机号" name="input" v-model="phone" @blur="validate('phone')"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">验证码</view>
				<input placeholder="输入验证码" name="input" v-model="smsCode"></input>
				<button class='cu-btn bg-green shadow' :disabled="btnCode" @click="onGetCode">{{getCodeText}}</button>
			</view>
			<view class="cu-form-group">
				<view class="title">密码</view>
				<input type="text"  password  placeholder="请输入" v-model="password" @blur="validate('password')"></input>
			</view><view class="cu-form-group">
				<view class="title">确认密码</view>
				<input type="text"  password placeholder="请输入" v-model="confirm_pwd" @blur="validate1()"></input>
			</view>
		</view>
		<button class="bg-cyan login-btn margin-top" @click="onSubmit()" :disabled="submit">完成</button>
	</view>
</template>


<script>
	export default {
		data() {
			return {
				getCodeText: '获取验证码',
				phone:'',
				smsCode:'',
				password:'',
				confirm_pwd:'',
				rules:{
					phone:{
						rule:/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
						msg:"手机号错误"
					},
					password:{
						rule:/^[0-9a-zA-Z]{6,16}$/,
						msg:"密码应该为6-16位"
					},
				},
				btnCode: false,//判断是否能发送验证码
				submit: true,
			}
		},
		onLoad(option) {
			
		},
		methods: {
			Timer() {},
			async onGetCode() {
				let _this = this;
				uni.hideKeyboard()

				_this.getCodeText = "发送中..."
				_this.btnCode = true;
				
				var data = {
					'type':"reset_password",'phone':_this.phone
				}
				console.log("获取验证码")
				let res = await this.http.post('/sms',data)
				//示例用定时器模拟请求效果
				setTimeout(() => {
					//uni.showToast({title: '验证码已发送',icon:"none"});
					_this.setTimer();
				}, 1000)
			},
			setTimer() {
				let holdTime = 59
				const _this = this
				_this.getCodeText = "重新获取(60)"
				_this.Timer = setInterval(() => {
					if (holdTime <= 0) {
						_this.btnCode = false;
						_this.getCodeText = "获取验证码"
						clearInterval(_this.Timer);
						return;
					}
					_this.getCodeText = "重新获取(" + holdTime + ")"
					holdTime--;
				}, 1000)
			},
			validate(key) {
				if(!this.rules[key].rule.test(this[key])){
					//提示信息
					uni.showToast({
						icon: "none",
						title:this.rules[key].msg,
					})
				}
			},
			validate1(){
				if(this.confirm_pwd != this.password) {
					uni.showToast({
						icon: "none",
						title:"两次密码不一致",
					})
				}
				else 
					this.submit = false
			},
			async onSubmit() {
				console.log("submit")
				let data = {
					phone: this.phone,
					password:this.password,
					smsCode:this.smsCode,
				}
				console.log(data)
				this.http.post('/auth/password',data).then((res) =>{
					console.log("update pwd success!")
					uni.switchTab({
						url:'../../personal/my'
					})
				})
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