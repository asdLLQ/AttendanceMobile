
var isReady=false;var onReadyCallbacks=[];
var isServiceReady=false;var onServiceReadyCallbacks=[];
var __uniConfig = {"pages":["pages/login/login","pages/register/register","pages/register/register-role","pages/register/register-info","pages/set/set-password","pages/personal/my","pages/course/course","pages/course/addCourse","pages/course/courseDatail/course-activity","pages/course/courseDatail/course-detail","pages/course/courseDatail/course-message","pages/course/courseDatail/course-resource","pages/course/courseDatail/course-students","pages/course/courseDatail/stu-detail","pages/course/signup/gesture","pages/course/signup/onekey","pages/course/signup/tlimit","pages/course/orgnization/school","pages/course/join/input-id","pages/course/addCourse/add-success","pages/course/showModal"],"window":{"navigationBarTextStyle":"white","navigationBarBackgroundColor":"#1CBBB4","backgroundColor":"#f8f8f8"},"tabBar":{"selectedColor":"#1CBBB4","midButton":{"width":"120rpx","height":"125rpx","iconWidth":"80rpx","iconPath":"static/tab_add.png"},"list":[{"pagePath":"pages/course/course","iconPath":"static/tab_course.png","selectedIconPath":"static/tab_course_active.png","text":"课程"},{"pagePath":"pages/personal/my","iconPath":"static/tab_person.png","selectedIconPath":"static/tab_person_active.png","text":"我的"}]},"nvueCompiler":"uni-app","nvueStyleCompiler":"weex","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"Attendance","compilerVersion":"3.1.12","entryPagePath":"pages/login/login","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/login/login","meta":{"isQuit":true},"window":{"navigationStyle":"custom","titleNView":false}},{"path":"/pages/register/register","meta":{},"window":{"titleNView":false}},{"path":"/pages/register/register-role","meta":{},"window":{"navigationStyle":"custom","titleNView":false}},{"path":"/pages/register/register-info","meta":{},"window":{"navigationStyle":"custom","titleNView":false}},{"path":"/pages/set/set-password","meta":{},"window":{"navigationStyle":"custom","titleNView":false}},{"path":"/pages/personal/my","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"个人中心"}},{"path":"/pages/course/course","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"我的班课"}},{"path":"/pages/course/addCourse","meta":{},"window":{"navigationBarTitleText":"创建班课"}},{"path":"/pages/course/courseDatail/course-activity","meta":{},"window":{}},{"path":"/pages/course/courseDatail/course-detail","meta":{},"window":{}},{"path":"/pages/course/courseDatail/course-message","meta":{},"window":{}},{"path":"/pages/course/courseDatail/course-resource","meta":{},"window":{}},{"path":"/pages/course/courseDatail/course-students","meta":{},"window":{}},{"path":"/pages/course/courseDatail/stu-detail","meta":{},"window":{}},{"path":"/pages/course/signup/gesture","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/course/signup/onekey","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/course/signup/tlimit","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/course/orgnization/school","meta":{},"window":{"navigationBarTitleText":"选择院校"}},{"path":"/pages/course/join/input-id","meta":{},"window":{"navigationBarTitleText":"加入班课"}},{"path":"/pages/course/addCourse/add-success","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/course/showModal","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
__uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});