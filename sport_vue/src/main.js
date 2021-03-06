import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './plugins/wyz-echarts/wyz-echarts.js'
import './assets/css/main.css'
import axios from 'axios'

Vue.config.productionTip = false
// 配置请求头
axios.interceptors.request.use(config => {
  config.headers.Authorization = window.sessionStorage.getItem('token')
  // config.headers.type = window.sessionStorage.getItem('type')
  return config
})
axios.interceptors.response.use(config => {
  // NProgress.done()
  return config
})
Vue.prototype.$http = axios
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
