import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueLazyload from 'vue-lazyload'
import store from './store'
import NProgress from 'nprogress'
import './assets/nprogress/nprogress.css'
import ElementUI, {Message} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import {getToken} from "./utils/token";

Vue.use(ElementUI)

NProgress.configure({
  easing: 'ease',  // 动画方式
  speed: 500,  // 递增进度条的速度
  showSpinner: false, // 是否显示加载ico
  trickleSpeed: 200, // 自动递增间隔
  minimum: 0.3 // 初始化时的最小百分比
})



const WhiteList = ["/","/index","/login","/register","/register/identify","/register/setPwd","/detail","/cate","/restPassword","/restPasswordSms","/setPassword","/validate/email"]
//全局拦截器
router.beforeEach(async(to, from, next) => {
  // 每次切换页面时，调用进度条
  NProgress.start();

  const hasToken =getToken()

  if(hasToken){
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/index' })
      NProgress.done()
    }else{
      if(store.getters.user.id==0){
        await store.dispatch('user/getUserInfo')
      }
      if (store.getters.user.id == 0) {
        await store.dispatch('user/resetToken')
        next(`/login`)
        NProgress.done()
        return
      }
      next()
    }
  }else{
    //no token
    if (WhiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    }else{
      Message({
        message: '请登录之后再操作',
        type: 'warning',
        duration: 5 * 1000
      })
      next("/index")
      NProgress.done()
      return
    }
  }
  next();
});
router.afterEach(() => {
  // 在即将进入新的页面组件前，关闭掉进度条
  NProgress.done()
})

// or with options
Vue.use(VueLazyload, {
  loading: '/imgs/loading-svg/placeholder-220.png',
})


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
