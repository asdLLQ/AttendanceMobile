<template>
	<view class="bottom-tab">
		<view class="bottom-tab-item" @click="changeTap(item)" v-for="(item,index) in tabList" :key="index">
			<image v-if="curTab==item.id" class="first-img" :src="item.icon_a"></image>
			<image v-if="curTab!=item.id" class="first-img" :src="item.icon"></image>
			<text :class="curTab==item.id?'text-position text-on':'text-position'">{{item.text}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		name:"wyg-bottom-tab",
		props:{
			tabIndex: {
				//图片的尺寸
				type: String,
				default: "2"
			},
			/*tabListParent:{
				type:Array,
				default:[]
			}*/
		},
		data() {
			return {
				curTab:1,
				tabList:[{
						id:1,
	                    text: '资源',  
	                    icon: '/static/img/tabbar/resource.png',  //未选中图标
	                    icon_a: '/static/img/tabbar/resource_active.png',  //选中图片
	                    url: "/pages/course/course-resource",  //页面路径
	                },{
						id:2,
	                    text: '成员',
	                    icon: '/static/img/tabbar/students.png',
	                    icon_a: '/static/img/tabbar/students_active.png',
	                    url: "/pages/course/course-students",
	                }
	                ,{
						id:3,
	                    text: '详情',
	                    icon: '/static/img/tabbar/activity.png',
	                    icon_a: '/static/img/tabbar/activity_active.png',
	                    url: "/pages/course/detail/Detail",
	                },
	            ]
				
			}
		},
		created(){
			this.curTab=new Number(this.tabIndex);
			/*if(this.tabListParent.length>0){
				this.tabList=this.tabListParent;
			}*/
		},
		methods: {
			$redirect(_url){
				console.log(_url);
				uni.redirectTo({
					"url":_url
				})
			},
			
			changeTap(e){
				this.curTab=e.id;
				this.$redirect(e.url);
			}
			
		}
	}
	
</script>

<style lang="scss">
	.bottom-tab{
		position: fixed;
		background-color: #FDFDFD;
		left: 0%;
		bottom: 0%;
		width: 100%;
		height: 2.9rem;
		
		display: flex;
		align-items:center;
		justify-content:space-between;
		.bottom-tab-item{
			width: 25%;
			display: flex;
			flex-direction: column;
			align-items:center;
			justify-content:center;
			
			.first-img{
				width: 1.5rem;
				height: 1.5rem;
			}
			.text-position{
				margin-top: 0rem;
				font-size: 0.6rem;
				color: #757575;
			}
			.text-on{
				color: #1CBBB4;
			}
			
		}

		
	}
</style>