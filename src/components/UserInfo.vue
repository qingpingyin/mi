<template>
    <div>
       <div class="user-info">
            <div class="mi-uc-box">
                <div class="box-hd">
                     <div class="clearfix">
                           <div class="user-card">
                           <h2  class="username">{{user.nike_name}}</h2>
                           <p  class="tip">晚上好～</p>
                           <a  href="/#/self/account" class="link">修改个人信息 &gt;</a>
                           <img  src="https://cdn.cnbj1.fds.api.mi-img.com/user-avatar/888918f7-4787-476e-a97a-76b8a449777f.jpg" width="150" height="150"  class="avatar">
                     </div>
                     <div class="user-actions">
                           <ul class="actions-list">
                           <li>账户安全:<span class="level">普通</span></li>
                           <li>绑定手机:<span class="tel">{{user.mobile}}</span></li>
                           <li>绑定邮箱:<span class="email">
                                <span @click="dialogVisible=true" class="bind-email" v-if="user.email==''">未绑定(点击绑定邮箱)</span>
                                <span v-else @click="unbindEmail()">{{user.email}}<span class="unbind-email">(解绑邮箱)</span></span>
                                </span>
                           </li>
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
        <!-- 这里使用elementui 弹框-->
        <el-dialog
                title="绑定邮箱"
                :visible.sync="dialogVisible"
                width="35%"
                :before-close="handleClose"
        >
            <el-input @blur="validateEmail" v-model="BindEmail" placeholder="请输入需要绑定的邮箱"></el-input>
            <span v-if="isShowErr" style="display: block;color: #f25807;margin-left: 3px">{{err_message}}</span>
            <span style="display:block;margin-top: 15px">{{tips}}</span>
            <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button  type="primary" @click="bindEmail">发送验证邮件</el-button>
  </span>
        </el-dialog>
    </div>
</template>

<script>
    import {bindEmail} from "../api/user";
    import {mapGetters} from "vuex";

    export default {
        name: "userInfo",
        data() {
            return {

                BindEmail: '',
                dialogVisible: false,
                isShowErr: false,
                err_message: '',
                tips:'tips:即将发送一封验证邮件到您的邮箱,此邮箱将作为您的绑定邮箱'
            };
        },
        mounted() {
        },
        components: {},
        methods: {
            async unbindEmail() {
                const resp = await bindEmail({
                    "user_id": this.$store.getters.user.id,
                    "email": this.$store.getters.user.email,
                    "operation_type": 2
                })
                console.log(resp)
                if(resp.status==200){
                    this.tips='邮件已发送，十五分钟之内有效，请查看邮箱信息，进行下一步操作!'
                }
            },
            async bindEmail() {
                if (this.validateEmail()) {
                    const resp = await bindEmail({
                        "user_id": this.$store.getters.user.id,
                        "email": this.BindEmail,
                        "operation_type": 1,

                    })
                    console.log(resp)
                    if(resp.status==200){
                        this.tips='邮件已发送，十五分钟之内有效，请查看邮箱信息，进行下一步操作'
                    }
                }
            },
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {
                    });
            },
            validateEmail() {
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
                    this.err_message = ""
                    return true;
                }
            }
        },
        computed: {
            ...mapGetters(['user']),
        }
    }
</script>

<style scoped lang="scss">
</style>
