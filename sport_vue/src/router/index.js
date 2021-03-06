import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../Login.vue'
import Register from '../register.vue'
import Home from '../Home.vue'
import Mymeeage from '../components/Mymessage/Mymessage.vue'
import Messagegocharts from '../components/Charts/charView.vue'
import User from '../components/User/User.vue'
import InfoList from '../components/UserInfo/UserInfo.vue'
import Searchmyinfo from '../components/UserInfo/Searchmyinfo.vue'
import Tempture from '../components/Charts/tempure.vue'
import Suger from '../components/Charts/suger.vue'
import Pressure from '../components/Charts/pressure.vue'
import Water from '../components/Charts/water.vue'
import Sport from '../components/Charts/Sport.vue'
import Temsearch from '../components/Charts/Temsearch.vue'
import Presuresearch from '../components/Charts/Puresuresearch.vue'
import Sugersearch from '../components/Charts/Sugersearch.vue'
import Watesearch from '../components/Charts/Watersearch.vue'
import Sprtsearch from '../components/Charts/Sportsearch.vue'
import Edit from '../components/User/Edit.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [{ path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    {
      path: '/home',
      component: Home,
      children: [{ path: '/mymessage', component: Mymeeage },
        { path: '/messagegocharts', component: Messagegocharts },
        { path: '/userLidt', component: User },
        { path: '/infoList', component: InfoList },
        { path: '/searchmyinfo', component: Searchmyinfo },
        { path: '/tempture', component: Tempture },
        { path: '/suger', component: Suger },
        { path: '/pressure', component: Pressure },
        { path: '/water', component: Water },
        { path: '/sport', component: Sport },
        { path: '/Stempture', component: Temsearch },
        { path: '/Ssuger', component: Sugersearch },
        { path: '/Spressure', component: Presuresearch },
        { path: '/Swater', component: Watesearch },
        { path: '/Ssport', component: Sprtsearch },
        { path: '/editmymsg', component: Edit }
      ]
    }
  ]
})
router.beforeEach((to, from, next) => {
  // to ?????????????????????
  // from ???????????????????????????
  // next ?????? ??????  next()????????????  next(./login) ????????????
  if (to.path === '/login' | to.path === '/register') return next()
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) {
    // this.$message.info('????????????')
    return next('/login')
  }
  next()
})

export default router
