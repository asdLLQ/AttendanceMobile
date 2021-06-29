import Vue from 'vue'
import App from './App'
import { myRequest } from './util/api.js'
import http from './util/http'

Vue.prototype.$myRequest = myRequest

Vue.prototype.http = http;
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()