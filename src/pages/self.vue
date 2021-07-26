<template>
    <div class="self">
    <div class="breadcrumbs">
        <div class="container">
            <a href="/">首页</a>
            <span class="sep">/</span>
        </div>
    </div>
    <div class="main">
        <div class="main-box">
            <div class="user-address-menu">
                <div class="menu-box">
            <h3 class="title">订单中心</h3>
            <ul class="list">
                <li >
                    <router-link :to="{path:'/order/orderList',query:{id:user.id}}">
                        <a href="javascript:void(0)">我的订单</a>
                    </router-link>
                </li>
                <li ><a href="">评价晒单</a></li>
                <li><a href="javascript:void(0)">话费充值订单</a></li>
                <li><a href="javascript:void(0)">以旧换新订单</a></li>
            </ul>
        </div>
                <div class="menu-box">
            <h3 class="title">个人中心</h3>
            <ul class="list">
                <li  class="active" ><a href="/#/self/userInfo">我的个人中心</a></li>
                <li ><a href="//www.mi.com/user/message?r=1626086305" >消息通知<i class="J_miMessageTotal"></i></a></li>
                <li ><a href="javascript:void(0)">购买资格<i class="J_miInviteTotal"></i></a></li>
                <li ><a href="javascript:void(0)">现金账户</a></li>
                <li ><a href="javascript:void(0)" >小米礼品卡</a></li>
                <li ><a href="javascript:void(0)" >现金券</a></li>
                <li >
                    <router-link :to="{path:'/self/favourite',query:{id:user.id}}">
                        <a href="javascript:void(0)" >喜欢的商品</a>
                    </router-link>
                </li>
                <li ><a href="javascript:void(0)" >优惠券</a></li>

                <li >
                    <router-link :to="{path:'/self/address',query:{id:user.id}}">
                    <a href="javascript:void(0)" >收货地址</a>
                    </router-link>
                </li>
                <li ><a href="javascript:void(0)" >红包</a></li>
            </ul>
        </div>
                <div class="menu-box">
                    <h3 class="title">售后服务</h3>
                    <ul class="list">
                        <li ><a href="javascript:void(0)" >服务记录</a></li>
                        <li ><a href="javascript:void(0)" >申请服务</a></li>
                        <li ><a href="javascript:void(0)" >领取快递报销</a></li>
                    </ul>
                </div>
        <div class="menu-box">
            <h3 class="title">账户管理</h3>
            <ul class="list">
                <li>
                    <router-link :to="{path:'/self/account',query:{id:user.id}}">
                        <a href="" >个人信息</a>
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
           <router-view/>
        </div>
    </div>

    </div>
</template>

<script>
    import {mapGetters} from 'vuex';
    export default {
        name: "self",
        data() {
            return {

            };
        },
        mounted() {
        },
        components:{
        },
        methods:{

        },
        computed:{
            ...mapGetters(['user'])
        }
    }
</script>

<style lang="scss" >
    .self {
        height: 997px;
        background:#f5f5f5;
        .clearfix:after {
            content: "";
            display: block;
            clear: both;
        }
        .breadcrumbs {
            height: 40px;
            font-size: 12px;
            line-height: 40px;
            background: #f5f5f5;

            .container {
                width: 1226px;
                margin-right: auto;
                margin-left: auto;
            }

            a {
                color: #757575;
                cursor: pointer;

                &:hover {
                    color: #FF6A00;
                }
            }

            .sep {
                margin: 0 .5em;
                color: #b0b0b0;
            }
        }

        .main{
            background: #f5f5f5;
            .main-box {
                width: 1226px;
                margin-right: auto;
                margin-left: auto;
                background: #f5f5f5;
                .user-address-menu {
                    width: 234px;
                    background: #fff;
                    padding: 36px 0;
                    float: left;
                    .menu-box {
                        margin: 0 48px 12px;

                        .title {
                            font-size: 16px;
                            font-weight: 400;
                            line-height: 52px;
                            color: #333;
                            margin: 0;
                            padding: 0;
                        }

                        .list {
                            margin: 0;
                            padding: 0;
                            list-style: none;

                            li {
                                padding: 6px 0;
                                display: list-item;
                                text-align: -webkit-match-parent;

                                a {
                                    color: #757575;

                                    &:hover {
                                        text-decoration: none;
                                        color: #333;
                                    }
                                }
                            }
                        }
                    }
                }

                .user-info{
                    float: left;
                    width: 978px;
                    float: left;
                    margin-left: 14px;
                    min-height: 1px;
                    .mi-uc-box{
                        padding: 36px 48px;
                        background: #fff;
                        .box-hd{
                            padding-top: 24px;
                            .user-card{
                                position: relative;
                                float: left;
                                width: 302px;
                                height: 160px;
                                padding-left: 180px;
                                padding-top: 40px;
                                .username{
                                    margin: 0;
                                    font-size: 24px;
                                    font-weight: 400;
                                    color: #616161;
                                }
                                .tip{
                                    margin: 0 0 10px;
                                    color: #b0b0b0;
                                }
                                .link{
                                    font-size: 12px;
                                    color: #ff6700;
                                }
                                .avatar{
                                    position: absolute;
                                    left: 0;
                                    top: 0;
                                    padding: 4px;
                                    border: 1px solid #e0e0e0;
                                    border-radius: 150px;
                                }
                            }
                            .user-actions{
                                float: right;
                                width: 358px;
                                margin-top: 35px;
                                .actions-list{
                                    margin: 0;
                                    padding: 0;
                                    list-style-type: none;
                                    color: #757575;
                                    li{
                                        position: relative;
                                        padding: 6px 0;
                                        .level{
                                            color: #ffac13;
                                        }
                                        .tel{
                                            color: #757575;
                                        }
                                        .email{
                                            color: #757575;
                                            .bind-email{
                                                &:hover{
                                                    color: #f25807;
                                                }
                                            }
                                            .unbind-email{
                                                margin-left: 2px;
                                                &:hover{
                                                    color: #f25807;
                                                }
                                            }
                                        }
                                    }

                                }
                            }
                            .portal-sub{
                                .info-list{
                                    margin: 0;
                                    padding: 60px 0 0;
                                    list-style-type: none;
                                    color: #757575;
                                    li{
                                        position: relative;
                                        float: left;
                                        width: 276px;
                                        height: 65px;
                                        padding-left: 112px;
                                        padding-top: 15px;
                                        margin-left: 14px;
                                        margin-bottom: 80px;
                                        h3{
                                            margin: 0;
                                            font-size: 18px;
                                            font-weight: 400;
                                        }
                                        a{
                                            color: #757575;
                                            &:hover{
                                                color: #f25807;
                                            }
                                        }
                                        img{
                                            position: absolute;
                                            left: -10px;
                                            top: -10px;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
</style>
