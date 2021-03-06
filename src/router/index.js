import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

const router = new VueRouter({
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('@/pages/home'),
            redirect: 'index',
            children: [
                {
                    path: 'index',
                    name: 'index',
                    component:()=> import('@/pages/index')
                },
                {
                    path: 'detail',
                    name: 'detail',
                    component: () => import('@/pages/detail')
                },
                {
                    path: 'addCartSuccess',
                    name: 'addCartSuccess',
                    component: () => import('@/pages/addCartSuccess'),

                },
                {
                    path:'cate',
                    name: 'cate',
                    component: () => import('@/pages/cate')
                },
                {
                    path: 'self',
                    name: 'self',
                    component: () => import('@/pages/self'),
                    children:[
                        {
                            path:'userInfo',
                            name:'userInfo',
                            component: () => import('@/components/UserInfo')
,
                        },
                        {
                            path: 'account',
                            name: 'Account',
                            component: () => import('@/components/Account')
                        },
                        {
                            path: 'favourite',
                            name: 'Favourite',
                            component:() => import('@/components/Favourite')
                        },
                        {
                            path: 'address',
                            name: 'Address',
                            component: () => import('@/components/Address')
                        }
                    ]
                },

            ]
        },
        //???????????? ??????????????????????????????
        {
            path: '/order',
            name: 'order',
            component: ()=> import('@/pages/order'),
            redirect: 'orderComfirm',
            children: [
                {
                    path: 'orderComfirm',
                    name: 'orderComfirm',
                    component: ()=> import('@/pages/orderComfirm'),
                },
                {
                    path: 'orderSuccess',
                    name: 'orderSuccess',
                    component: () => import('@/pages/orderSuccess'),
                },
                {
                    path: 'orderList',
                    name: 'orderList',
                    component: ()=> import('@/pages/orderList'),
                },

            ]
        },
        // ?????????
        {
            path: '/cart',
            name: 'cart',
            component: () => import('@/pages/cart'),
        },
        {
            path: '/validate/email',
            name: 'validateEmail',
            component: () => import('@/pages/validateEmail'),
        },
        // ??????
        {
            path: '/login',
            name: 'login',
            component: () => import('@/pages/login')
        },

        // ??????
        {
            path: '/register',
            name: 'register',
            component: () => import('@/pages/register'),
            children: [
                //????????????
                {
                    path:'identify',
                    name:'identify',
                    component: ()=> import('@/pages/registerIdentify')
                },
                //????????????
                {
                    path:'setPwd',
                    name:'registerPwd',
                    component: () => import('@/pages/registerPwd')
                }
            ]
        },
        //????????????
        {
          path: '/restPassword',
          name: 'restPassword',
          component: () => import('@/pages/restPassword'),
        },
        {
            path: '/restPasswordSms',
            name: 'restPasswordSms',
            component: () => import('@/pages/restPasswordSms'),
        },
        {
            path: '/setPassword',
            name: 'setRestPassword',
            component: () => import('@/pages/setRestPassword')
        },
        {
            path: '/orderPay',
            name: 'orderPay',
            component: () => import('@/pages/orderPay')
        }
    ],
    scrollBehavior() {
        return { x: 0, y: 0 }
    }
})
export default router
