<template name="gesture-password">
	<view ref="gestureArea" class="gesture-box" @touchstart="touchstart" @touchmove="touchmove" @touchend="touchend">
		<view class="points">
			<view class="item" v-for="(item,index) in items" :key="index" :class="{active: item.active}">
				<view class="dot-outer">
					<view class="dot"></view>
				</view>
			</view>
		</view>
		
		<div class="line-segment" v-for="line in lineSegment" :style="{
			top: line.top+'px',
			left: line.left+'px',
			width: line.width+'px',
			transform: 'rotate('+ line.angle +'deg)'}"></div>
	</view>
</template>

<script>
	export default {
		name:"gesture-password",
		data() {
			return {
				items: [
					{
						active: false
					},
					{
						active: false
					},
					{
						active: false
					},
					{
						active: false
					},
					{
						active: false
					},
					{
						active: false
					},
					{
						active: false
					},
					{
						active: false
					},
					{
						active: false
					},
				],
				areaAxis: {
					x: 0,
					y: 0
				},
				axisPoints: [],
				activeRadius: 0,
				drawPoints: [],
				segmentNode: null,
				lineSegment: [],
			}
		},
		methods: {
			touchstart(e){
				this.segmentNode = null;
				let startX = e.touches[0].pageX - this.areaAxis.x;
				let startY = e.touches[0].pageY - this.areaAxis.y;
				this.drawPoints = [];
				for (let i = 0; i < 9; i++){
					let x = this.axisPoints[i].x;
					let y = this.axisPoints[i].y;
					let d = this.getPointerDistance(x,y,startX,startY);
					if(d <= this.activeRadius){
						this.drawPoints.push(i+1);
						this.items[i].active = true;
						this.setLineSegment(x,y);
						break;
					}
				}
			},
			touchmove(e){
				let newX = e.touches[0].pageX - this.areaAxis.x;
				let newY = e.touches[0].pageY - this.areaAxis.y;
				this.updateLineSegment(newX,newY);
				for (let i = 0; i < 9; i++){
					let x = this.axisPoints[i].x;
					let y = this.axisPoints[i].y;
					let d = this.getPointerDistance(x,y,newX,newY);
					if(d <= this.activeRadius){
						let val = i+1;
						if(this.drawPoints.indexOf(val) > -1){
							break;
						}else{
							this.drawPoints.push(val);
							this.items[i].active = true;
							this.setLineSegment(x,y);
							break;
						}
					}
				}
			},
			touchend(e){
				//判断绘制的点是否小于4个
				if(this.drawPoints.length < 4){
					this.drawPoints = [];
					this.clearDraw();
					uni.hideToast();
					uni.showToast({
						icon: 'none',
					    title: '请至少连接四个点',
					    duration: 2000,
						//position: 'bottom'
					});
				}
				if(this.segmentNode && this.segmentNode.node){
					this.lineSegment.pop();
				}
				this.segmentNode = null;
				// console.log(this.drawPoints);
				this.$emit('change',this.drawPoints);
			},
			setLineSegment(x,y){//闭合完整线段并绘制线段起点
				if(this.segmentNode != null){
					let d = this.getPointerDistance(x,y,this.segmentNode.sX,this.segmentNode.sY);
					let angle = this.getAngle(this.segmentNode.sX,this.segmentNode.sY,x,y);
					this.segmentNode.node.width = d;
					this.segmentNode.node.angle = angle;
				}
				let lineNode = this.createSegment(x,y);
				this.segmentNode = {
					node: lineNode,
					sX: x,
					sY: y
				};
			},
			updateLineSegment(x,y){//更新不完整线段的结束点
				if(this.segmentNode !=null ){
					let d = this.getPointerDistance(x,y,this.segmentNode.sX,this.segmentNode.sY);
					let angle = this.getAngle(this.segmentNode.sX,this.segmentNode.sY,x,y);
					this.segmentNode.node.width = d;
					this.segmentNode.node.angle = angle;
				}
			},
			createSegment(x,y){
				let lineNode = {
					left: x,
					top: y-2.5,
					width: 0,
					angle: 0
				}
				this.lineSegment.push(lineNode);
				return lineNode;
			},
			getPointerDistance(px1,py1,px2,py2){//获取两个坐标点之间的距离
				let x = Math.abs(px1 - px2);
				let y = Math.abs(py1 - py2);
				let val = x*x + y*y;
				return Math.sqrt(val);
			},
			clearDraw(){
				this.items.forEach(item=>{
					item.active = false;
				})
				this.lineSegment = [];
			},
			getAngle(px1,py1,px2,py2){//获取两坐标点形成的直线与X轴夹角(顺时针)
				let rad = Math.atan2((py2-py1), (px2-px1));
				let angle = rad*(180/Math.PI);
				return angle;
			},
		},
		mounted() {
			//获取点的触发半径（在css中.dot-outerde的宽高默认120rpx,如需调整大小也可以定义为变量）
			const resp = uni.getSystemInfoSync();
			this.activeRadius = resp.screenWidth / 750 * 120 / 2;
			//获取绘制区域的位置
			uni.createIntersectionObserver(this).relativeTo('.gesture-box').observe('.points', (res) => {
				console.log("top "+res.boundingClientRect.top)
				this.areaAxis.x = res.boundingClientRect.left;
				this.areaAxis.y = res.boundingClientRect.top;
				
				//获取九个点的坐标
				let itemWidth = resp.screenWidth / 750 * 600 / 3;
				let itemRadius = itemWidth / 2;
				for (let i = 0;i < 9;i++) {
					let x = (i % 3) * itemWidth + itemRadius;
					let y = Math.floor(i / 3) * itemWidth + itemRadius;
					this.axisPoints.push({
						x: x,
						y: y
					});
				}
			})
			uni.$on('clearDraw',()=>{
				this.clearDraw();
			})
		},
		destroyed(){
			uni.$off('clearDraw',()=>{})
		}
	}
</script>

<style lang="scss">
	.gesture-box{
		width: 600rpx;
		height: 600rpx;
		position: relative;
		margin: 0 auto;
		
		.points{
			width: 100%;
			height: 100%;
			position: relative;
			display: grid;
			grid-template-columns: 1fr 1fr 1fr;
			grid-gap: 0rpx 0rpx;
			overflow: hidden;
			.item{
				display: flex;
				justify-content: center;
				align-items: center;
				
				.dot-outer{
					background-color: transparent;
					width: 80rpx;
					height: 80rpx;
					border-radius: 50%;
					display: flex;
					justify-content: center;
					align-items: center;
				}
				.dot{
					background-color: #dddddd;
					width: 80rpx;
					height: 80rpx;
					border-radius: 50%;
				}
			}
			.active{
				.dot-outer{
					background-color: #A6D3E0 !important;
				}
				.dot{
					background-color: #039CDF !important;
				}
			}
		}
		.line-segment{
			height: 5rpx;
			position: absolute;
			background-color: #0295d3;
			transform-origin: 0 50% 0;
		}
	}
</style>
