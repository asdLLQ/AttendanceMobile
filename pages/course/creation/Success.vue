/**
 * 班课创建成功页面，显示班课的二维码、班课号和返回按钮
 */
<template>
	<view class="content">
		<cu-custom bgColor="bg-gradual-blue" :isBack="true"><block slot="backText" @tap="onBack">返回</block><block slot="content">创建成功</block></cu-custom>
		<view class="tip">
			<view >班课已成功创建</view>
			<view >快把班课信息通知学生吧</view>
		</view>
		<view class = 'classnum'>
			<view style="margin: 20rpx;">
				{{cno}}
			</view>
			<view class="qrcode" style="margin: 20rpx;">
			       <canvas canvas-id="qrcode" id="qrcode"/>
			</view>
		</view>
		<view class="padding flex flex-direction">
			<button class="cu-btn bg-cyan margin-tb-sm lg setColor" @tap="classBegin">开始班课</button>
		</view>
	</view>
</template>

<script>
	import CODE from '@/components/uni-code';
	export default {
		components: {
			'cu-custom': CODE
		},
		data() {
			return {
				cno:'',
				qrc:{// 二维码配置
					id: 'qrcode', // canvas的canvas-id
					size: 225, // 二维码大小
					level: 4, //等级 0～4
					bgColor: '#FFFFFF', //二维码背景色 默认白色

					// img: require('@/static/logo.png'),//图片
					iconSize: 40, //二维码图标的大小
					color: '#000' // 二维码颜色 默认黑色
				}
			}
		},
		onReady() {
		        this.findCan()
		    },
		onLoad(option) {
			this.cno = option.cno;
			const { windowWidth, windowHeight } = uni.getSystemInfoSync();
			this.qrc.size=windowWidth*0.61;
		},
		methods: {
			findCan () {
				CODE.QRCode({...this.qrc,code: this.cno});
			},
			classBegin(e){
				uni.switchTab({
					url:'../List'
				})
			}
		}
	}
</script>

<style>
	.tip{
		color: gray;
		font-size: small;
		display: flex;
		flex-direction: column;
		align-items: center;
		margin: 30rpx;
	}
	.classnum{
		color: orange;
		font-size: x-large;
		display: flex;
		flex-direction: column;
		align-items: center;
		margin: 30rpx;
	}
	.qrcode {
	    height: 460rpx;
	    display: flex;
	    flex-direction: column;
	    justify-content: center;
	    align-items: center;
	}
	#qrcode{
	    width: 460rpx;
	    height: 460rpx;
	    background-color: #fff;
	}
	.setColor {
		background: #1CBBB4;
	}
</style>
