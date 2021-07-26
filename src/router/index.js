import Vue from 'vue'
import VueRouter from 'vue-router'
//首页 、产品页 、详情页
import Home from '../pages/home'
import Index from '../pages/index'
import Product from '../pages/product'
import Detail from '../pages/detail'
import addCartSuccess from '../pages/addCartSuccess'

//订单列表 、订单确认、订单支付
import Order from '../pages/order'
import OrderList from '../pages/orderList'
import OrderComfirm from '../pages/orderComfirm'
import OrderSuccess from '../pages/orderSuccess'
import OrderPay from '../pages/orderPay'
// 购物车
import Cart from '../pages/cart'
// 登录&注册
import Register from '../pages/register'
import RegisterIdentify from '../pages/registerIdentify'
import Login from '../pages/login'
import RegisterPwd from '../pages/registerPwd'
import restPassword from "../pages/restPassword";
import restPasswordSms from "../pages/restPasswordSms";
import setRestPassword from "../pages/setRestPassword";
import self from "../pages/self";
import validateEmail from "../pages/validateEmail";
import UserInfo from "../components/UserInfo";
import Account from "../components/Account";
import Favourite from "../components/Favourite";
import Address from "../components/Address";

Vue.use(VueRouter);

const router = new VueRouter({
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
            redirect: 'index',
            children: [
                {
                    path: 'index',
                    name: 'index',
                    component: Index
                },
                {
                    path: 'product/:id',
                    name: 'prodcut',
                    component: Product
                },
                {
                    path: 'detail/:id',
                    name: 'detail',
                    component: Detail
                },
                {
                    path: 'addCartSuccess/:id',
                    name: 'addCartSuccess',
                    component: addCartSuccess
                },
                {
                    path: 'self',
                    name: 'self',
                    component: self,
                    children:[
                        {
                            path:'userInfo',
                            name:'UserInfo',
                            component:UserInfo
                        },
                        {
                            path: 'account',
                            name: 'Account',
                            component: Account
                        },
                        {
                            path: 'favourite',
                            name: 'Favourite',
                            component:Favourite
                        },
                        {
                            path: 'address',
                            name: 'Address',
                            component: Address
                        }
                    ]
                },

            ]
        },
        //订单列表 、订单确认、订单支付
        {
            path: '/order',
            name: 'order',
            component: Order,
            redirect: 'orderComfirm',
            children: [
                {
                    path: 'orderComfirm',
                    name: 'orderComfirm',
                    component: OrderComfirm
                },
                {
                    path: 'orderSuccess',
                    name: 'orderSuccess',
                    component: OrderSuccess,
                },
                {
                    path: 'orderList',
                    name: 'orderList',
                    component: OrderList
                },

            ]
        },
        // 购物车
        {
            path: '/cart',
            name: 'cart',
            component: Cart
        },
        {
            path: '/validate/email/:token',
            name: 'validateEmail',
            component: validateEmail
        },
        // 登录
        {
            path: '/login',
            name: 'login',
            component: Login
        },

        // 注册
        {
            path: '/register',
            name: 'register',
            component: Register,
            children: [
                //短信验证
                {
                    path:'/register/:phone',
                    name:'identify',
                    component: RegisterIdentify
                },
                //设置密码
                {
                    path:'/register/:phone/SetPwd',
                    name:'registerPwd',
                    component:RegisterPwd
                }
            ]
        },
        //忘记密码
        {
          path: '/restPassword',
          name: 'restPassword',
          component: restPassword,
        },
        {
            path: '/restPasswordSms/:phone',
            name: 'restPasswordSms',
            component: restPasswordSms,
        },
        {
            path: '/restPassword/:phone/:code',
            name: 'setRestPassword',
            component: setRestPassword
        },
        {
            path: '/orderPay',
            name: 'orderPay',
            component: OrderPay
        }
    ],
    scrollBehavior() {
        return { x: 0, y: 0 }
    }
})
export default router
