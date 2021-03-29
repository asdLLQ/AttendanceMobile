import Vue from 'vue'
import App from './App'
Vue.prototype.websiteUrl = 'http://0.0.0.0:8088'; 

Vue.config.productionTip = false
 
const msg = (title, duration=1500, mask=false, icon='none')=>{
	//统一提示方便全局修改
	if(Boolean(title) === false){
		return;
	}
	uni.showToast({
		title,
		duration,
		mask,
		icon
	});
}
const json = type=>{
	//模拟异步请求数据
	return new Promise(resolve=>{
		setTimeout(()=>{
			resolve(Json[type]);
		}, 500)
	})
}

const prePage = ()=>{
	let pages = getCurrentPages();
	let prePage = pages[pages.length - 2];
	// #ifdef H5
	return prePage;
	// #endif
	return prePage.$vm;
}


Vue.config.productionTip = false
Vue.prototype.$fire = new Vue();
Vue.prototype.$api = {msg, json, prePage};

App.mpType = 'app'


const app = new Vue({
    ...App
})
app.$mount()



Vue.prototype.login = function(state,data,callBack){
	if(state){
		uni.setStorage({
		    key: 'userInfo',  
		    data: data.loginUser  
		}) 
		uni.setStorageSync('access_token', data.access_token);
		callBack();
		if(data.isWriteDate){
			uni.setStorage({
			    key: 'reg_qyList',
			    data: data.qyList,
			    success: function (resq) {
					if(resq.errMsg=="setStorage:ok"){
						uni.setStorage({
						    key: 'reg_zwList',
						    data: data.zwList,
						    success: function (resz) {
								if(resz.errMsg=="setStorage:ok"){
									uni.reLaunch({
										url: '/pages/login/register'
									});
								}
						        
						    }
						});
					}
			        
			    }
			});
			
		}else{
			uni.reLaunch({
				url: '/pages/index/index'
			});
		}
		
	}else{
		uni.removeStorage({
			key: 'userInfo'  
		});
		uni.removeStorageSync('access_token');
		uni.reLaunch({
			url:'/pages/login/login'
		});
	}
}

 
Vue.prototype.sendRequest = function(url,param,method,callBack){
    var _self = this, 
        // method = param.method,
        header = {},
        data = param|| {}, 
        token =uni.getStorageSync("access_token");
    //拼接完整请求地址
    var requestUrl = this.websiteUrl + url;

    var timestamp = Date.parse(new Date());//时间戳
    data["timestamp"] = timestamp;
    // #ifdef MP-WEIXIN
    data["device"] = "wxapp";
    data["ver"] = "1.1.30";
    // #endif
    // #ifdef APP-PLUS || H5
    data["device"] = "iosapp";
    data["ver"] = "1.0.0";
	data["access_token"]=token;
    // #endif
    //请求方式:GET或POST(POST需配置header: {'content-type' : "application/x-www-form-urlencoded"},)
    if(method){
        method = method.toUpperCase();//小写改为大写
        if(method=="POST"){
            header = {'content-type' : "application/x-www-form-urlencoded"};
        }else{
            header = {'content-type' : "application/json"};
        }
    }else{
        method = "GET";
        header = {'content-type' : "application/json"};
    }
    //网络请求
    uni.request({
        url: requestUrl,
		data: data,
        method: method, 
        header: header,
        success: res => {
			if(res.data.code==200){
				callBack(res.data.data); 
			}else{
				_self.login(false);
			}
        },
        fail: (e) => {
            //console.log("网络请求fail:" + JSON.stringify(e));
            uni.showModal({
                content:"" + e.errMsg
            });
            // typeof param.fail == "function" && param.fail(e.data);
        },
        complete: () => {
            //console.log("网络请求complete");
            // uni.hideLoading();
            // typeof param.complete == "function" && param.complete();
            //return;
        }
    });
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
}