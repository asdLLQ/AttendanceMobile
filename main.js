import Vue from 'vue'
import App from './App'

import HTTP from './util/http'
console.log(HTTP)

Vue.prototype.http = HTTP.http;
Vue.prototype.BASE_URL =HTTP.BASE_URL;
Vue.prototype.BASE_HOST =HTTP.BASE_HOST;

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()