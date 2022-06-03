import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../Login.vue'
import Register from '../register.vue'
import Home from '../Home.vue'
import Mymessage from '../views/Mymessage/Mymessage.vue'
import Mymessagedit from '../views/Mymessage/MymessageEdit'
import AdminUserSearch from '../views/AdminUser/AdminUserSearch.vue'
import AdminUserList from '../views/AdminUser/AdminUserList'
import AllDataSearch from '../views/AllData/AllDataSearch.vue'
import temperatureInput from '../views/PartData/temperatureInput.vue'
import temperatureSearch from "@/views/PartData/temperatureSearch";
import sugarInput from "@/views/PartData/sugarInput";
import sugarSearch from "@/views/PartData/sugarSearch";
import pressureinput from '../views/PartData/pressureInput.vue'
import presuresearch from '../views/PartData/pressureSearch.vue'
import waterInput from "@/views/PartData/waterInput";
import waterSearch from "@/views/PartData/waterSearch";

import sportInput from "@/views/Sport/sportInput";
import sportSearch from "@/views/Sport/sportSearch";
// 添加日志功能
import journal from "@/views/More/Journal";
//地图功能
import baiduMap from "@/views/More/baiduMap";
import AllDataInput from "@/views/AllData/AllDataInput";
//excel功能
import TablePage from "@/views/More/TablePage";
import ImportExcel from "@/views/More/ImportExcel";
//上传图片功能
import UpImage from "@/views/More/UpImage";
import upImage from "@/views/More/UpImage";
//在线聊天室功能
import Wechat from "@/views/More/Wechat";

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [{ path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    {
      path: '/home',
      component: Home,
      children: [
        //个人信息管理
        { path: '/mymessage', component: Mymessage },
        { path: '/mymessagedit', component: Mymessagedit },

        //管理员用户数据管理
        { path: '/usercontrol', component: AdminUserSearch },
        { path: '/adminuserlist', component: AdminUserList },



        //整体数据测绘
        { path: '/alldatainput', component: AllDataInput },
        { path: '/alldatasearch', component: AllDataSearch },

        //部分数据测绘--(八个小分支)
        { path: '/temperatureinput', component: temperatureInput },
        { path: '/temperaturesearch', component: temperatureSearch },
        { path: '/sugarinput', component: sugarInput },
        { path: '/sugarsearch', component: sugarSearch },
        { path: '/pressureinput', component: pressureinput },
        { path: '/pressuresearch', component: presuresearch },
        { path: '/waterinput', component: waterInput },
        { path: '/watersearch', component: waterSearch },

        //运动数据
        { path: '/sportinput', component: sportInput },
        { path: '/sportsearch', component: sportSearch },

        //更多信息
        { path: '/journal', component: journal },
        { path: '/map', component: baiduMap },
        { path: '/tablepage', component: TablePage },
        { path: '/importExcel', component: ImportExcel },
        {path:'/upimage',component:upImage},
        {path:"/wechat",component:Wechat}

      ]
    }
  ]
})

//导航守卫，路由元信息，验证用户是否登录
router.beforeEach((to, from, next) => {
  // to 将要访问的地址,from 从哪个路径跳转而来
  // next 函数 放行  next()直接放行  next(./login) 跳转地址
  if (to.path === '/login' | to.path === '/register') return next()
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) {
    return next('/login')
  }
  next()
})

export default router
