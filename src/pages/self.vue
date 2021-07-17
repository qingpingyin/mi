<template>
    <div class="self">
    <div class="breadcrumbs">
        <div class="container">
            <a href="/">首页</a>
            <span class="sep">/</span>
            <span>个人中心</span>
        </div>
    </div>
    <div class="main">
        <div class="main-box">
            <div class="user-address-menu">
        <div class="menu-box">
            <h3 class="title">订单中心</h3>
            <ul class="list">
                <li ><a href="//www.mi.com/user/orderList?r=1626086305">我的订单</a></li>
                <li ><a href="//www.mi.com/user/comment?filter=1&r=1626086305"   data-name="bracket" id="J_comment">评价晒单</a></li>
                <li><a href="//recharge.10046.mi.com/list">话费充值订单</a></li>
                <li><a href="//huanxin.mi.com/order/list?r=">以旧换新订单</a></li>
            </ul>
        </div>
        <div class="menu-box">
            <h3 class="title">个人中心</h3>
            <ul class="list">
                <li  class="active" ><a href="//www.mi.com/user/portal?r=1626086305">我的个人中心</a></li>
                <li ><a href="//www.mi.com/user/message?r=1626086305" >消息通知<i class="J_miMessageTotal"></i></a></li>
                <li ><a href="//www.mi.com/user/invite?r=1626086305">购买资格<i class="J_miInviteTotal"></i></a></li>
                <li ><a href="//www.mi.com/user/cashAccount?r=1626086305">现金账户</a></li>
                <li ><a href="//www.mi.com/user/ecard?r=1626086305" >小米礼品卡</a></li>
                <li ><a href="//www.mi.com/user/huanxin?r=1626086305" >现金券</a></li>
                <li ><a href="//www.mi.com/user/favorite?r=1626086305" >喜欢的商品</a></li>
                <li ><a href="//www.mi.com/user/coupon?r=1626086305" >优惠券</a></li>
                <li ><a href="//www.mi.com/user/address?r=1626086305" >收货地址</a></li>
                <li ><a href="//www.mi.com/user/redpacket?r=1626086305" >红包</a></li>
            </ul>
        </div>
        <div class="menu-box">
            <h3 class="title">售后服务</h3>
            <ul class="list">
                <li ><a href="//www.mi.com/service/aftersale/list?r=1626086305" >服务记录</a></li>
                <li ><a href="//www.mi.com/service/aftersale/front?r=1626086305" >申请服务</a></li>
                <li ><a href="//www.mi.com/service/compensate/index?r=1626086305" >领取快递报销</a></li>
            </ul>
        </div>
        <div class="menu-box">
            <h3 class="title">账户管理</h3>
            <ul class="list">
                <li><a href="//account.xiaomi.com" target="_blank" >个人信息</a></li>
                <li><a href="//account.xiaomi.com/pass/auth/security/home#service=setPassword" target="_blank" >修改密码</a></li>

            </ul>
        </div>
    </div>
            <div class="user-info">
                <div class="mi-uc-box">
                    <div class="box-hd">
                        <div class="clearfix">
                            <div class="user-card">
                            <h2  class="username">{{user.nike_name}}</h2>
                            <p  class="tip">晚上好～</p>
                            <a  href="//account.xiaomi.com/pass/userInfo" target="_blank" class="link">修改个人信息 &gt;</a>
                            <img  src="https://cdn.cnbj1.fds.api.mi-img.com/user-avatar/888918f7-4787-476e-a97a-76b8a449777f.jpg" width="150" height="150" alt="冷酷的蛙蛙" class="avatar">
                        </div>
                            <div class="user-actions">
                            <ul class="actions-list">
                                <li>账户安全:<span class="level">普通</span></li>
                                <li>绑定手机:<span class="tel">{{user.mobile}}</span></li>
                                <li>绑定邮箱:<span class="email">
                                    <span @click="dialogVisible=true" class="bind-email" v-if="user.email==''">未绑定(点击绑定邮箱)</span>
                                    <span v-else>{{user.email}}</span>
                                </span></li>
                            </ul>
                        </div>
                        </div>
                        <div class="portal-sub">
                            <ul class="info-list clearfix">
                                <li>
                                    <h3>待支付的订单：<span class="num">0</span></h3>
                                    <a href="">查看待支付订单<i class="iconfont"></i></a>
                                    <img  src="//s01.mifile.cn/i/user/portal-icon-1.png" alt="">
                                </li>
                                <li>
                                    <h3>待收货的订单：<span class="num">0</span></h3>
                                    <a href="">查看待收货订单<i class="iconfont"></i></a>
                                    <img data-v-1ace6eb7="" src="//s01.mifile.cn/i/user/portal-icon-2.png" alt="">
                                </li>
                                <li>
                                    <h3>待评价商品数：<span class="num">0</span></h3>
                                    <a href="">查看待评价商品数<i class="iconfont"></i></a>
                                    <img data-v-1ace6eb7="" src="//s01.mifile.cn/i/user/portal-icon-3.png" alt="">
                                </li>
                                <li>
                                    <h3>喜欢的商品：<span class="num">0</span></h3>
                                    <a href="">查看喜欢的商品<i class="iconfont"></i></a>
                                    <img data-v-1ace6eb7="" src="//s01.mifile.cn/i/user/portal-icon-4.png" alt="">
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- 这里使用elementui 弹框-->
        <el-dialog
                title="绑定邮箱"
                :visible.sync="dialogVisible"
                width="35%"
                :before-close="handleClose"
                >
            <el-input @blur="validateEmail" v-model="BindEmail" placeholder="请输入需要绑定的邮箱"></el-input>
            <span v-if="isShowErr" style="display: block;color: #f25807;margin-left: 3px">{{err_message}}</span>
            <span style="display:block;margin-top: 15px">tips:即将发送一封验证邮件到您的邮箱,此邮箱将作为您的绑定邮箱</span>
            <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="bindEmail">发送验证邮件</el-button>
  </span>
        </el-dialog>
    </div>
</template>

<script>
    import {mapGetters} from "vuex";
    import {bindEmail} from "../api/user";

    export default {
        name: "self",
        data() {
            return {
                BindEmail:'',
                dialogVisible:false,
                isShowErr:false,
                err_message:''
            };
        },
        mounted() {
        },
        components:{
        },
        methods:{
            async bindEmail(){
                if(this.validateEmail()){
                    const resp = await bindEmail({
                        "uid":this.$store.getters.user.id,
                        "email":this.BindEmail,

                    })
                }
            },
            handleClose(done){
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {});
            },
            validateEmail(){
                let emailReg = /^([\w-_]+(?:\.[\w-_]+)*)@((?:[a-z0-9]+(?:-[a-zA-Z0-9]+)*)+\.[a-z]{2,6})$/i;
                if (this.BindEmail === "") {
                    this.isShowErr = true;
                    this.err_message = '邮箱不能为空';
                    return false;
                } else if (!emailReg.test(this.BindEmail)) {
                    this.err_message = '邮箱格式错误';
                    this.isShowErr = true
                    return false;
                } else {
                    this.err_message=""
                    return true;
                }
            }
        },
        computed:{
            ...mapGetters(['user']),
        }
    }
</script>

<style lang="scss" scoped>
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
