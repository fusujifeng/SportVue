import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './plugins/wyz-echarts.js'
import '../public/assets/css/main.css'
import './plugins/eventbus'
import axios from 'axios'
import store from "@/store/store";
import io from "socket.io-client";

Vue.config.productionTip = false

Vue.prototype.socket=io('http://127.0.0.1:8082')

// 配置请求头
axios.interceptors.request.use(config => {
  config.headers.Authorization = window.sessionStorage.getItem('token')

  // 每次请求的时候会带着请求头发送请求
  return config
})

axios.interceptors.response.use(config => {
  // NProgress.done()
  return config
})
Vue.prototype.$http = axios

//关闭vue的生产提示
Vue.config.productionTip = false

new Vue({
  beforeCreate() {
    Vue.prototype.$bus=this
  },
  router,
  store,

  render: h => h(App)
}).$mount('#app')


