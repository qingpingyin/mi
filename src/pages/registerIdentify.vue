<template>
    <div class="register">
<div class="wrapper">
    <div class="wrap">
        <div class="layout">
            <div class="n-frame device-frame reg_frame" id="main_container">
                <div class="external_logo_area">
                    <a class="mi_logo" href="javascript:void(0)"></a>
                </div>
                <div class="title-item t_c">
                    <h4 class="title_big30">注册小米帐号</h4>
                </div>
                <div class="regbox">
                    <div class="step2 phone_step2">
                        <div class="xs_title_box">
                            <div class="content_title">
                                我们已经发送一条验证短信至
                                <span class="address-place ff6">+86 {{getPhone}}</span>
                            </div>
                            <p>请输入短信中的验证码</p>
                        </div>
                        <div class="inputbg1 inputsend">
                            <label class="labelbox wap_resend_label err_label">
                                <input v-model="code" class="resendcode" type="text" placeholder="请输入验证码" name="tickt"/>
                                <span class="remain">
                                    <a class="color333 send-status" @click="reckonTime" :class="{'disabled':BtnDisabled}" href="javascript:void(0)">{{BtnText}}</a>
                                </span>
                            </label>
                        </div>
                        <div class="err_tip" :style="{'display':identifyCode}">
                            <div class="dis_box">
                                <em class="icon_error"></em>
                                <span>验证码错误或过期</span>
                            </div>
                        </div>
                        <div class="sns_unavaliable">
                            <a target="_blank" href="https://account.xiaomi.com/helpcenter/faq/zh_CN/02.faqs/05.sms-and-email-verification-code/faq-1">收不到验证码?</a>
                        </div>
                        <div class="fixed_bot mar_phone_dis2">
                            <input class="btn332 btn_reg_1 submit-step" type="submit" value="下一步" @click="goSetPwdPage"/>
                            <input class="btn332 btn_reg_2 change-view" type="button" value="返回" @click="$router.go(-1)"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
        <Footer></Footer>
    </div>
</template>

<script>

    import Footer from "../components/RegisterFooter";
    export default {

        name: "register_identify",
        data(){
            return{
                phone:this.$route.params.phone,
                //验证码倒计时
                waitTime:60,
                //发送验证码按钮
                BtnDisabled:false,
            //    判断验证码是否正确
                identifyCode:'none',
                //验证码
                code:''
            }
        },
        computed:{
            getPhone(){
                let tel = this.phone + "";
                return tel.replace(tel.substring(3,9),"*****")
            },
            BtnText(){
                return this.waitTime !==60 ? `重新发送(${this.waitTime})`:'重新发送';
            }
        },
        methods:{
            //验证 验证码
            identifyCodeIsTrue(){
                if (this.code ==="" ){
                    this.identifyCode = 'block';
                    return false;
                }else{
                    return true;
                }
            },
            //去设置密码界面
            goSetPwdPage(){
            //    首先验证 验证码是否正确
                if (this.identifyCodeIsTrue()){
                    this.$router.push(
                        {
                        name:'registerPwd',
                        params:{
                        phone:this.phone
                        }
                    })
                }
            },
            //   已进入页面进行倒计时
            reckonTime(){
             this.BtnDisabled = true;
             let interval = setInterval(()=>{
                 this.waitTime--;
                 if(this.waitTime === 0){
                     clearInterval(interval)
                     this.BtnDisabled = false;
                     this.waitTime = 60;
                 }
             },1000)
            },
        },
        mounted() {
            //进入页面触发倒计时
            this.reckonTime();

        //    刷新页面返回输入手机号页面
            window.addEventListener('load',()=>{
                let msg = confirm('系统可能不会保存您所做的更改。');
                if(msg === true){
                    if (this.$route.path!=="/register"){
                        this.$router.push('/register')
                    }

                }

            })
        },
        components:{
            Footer
        }

    }
</script>

<style lang="scss">

        .wrapper {
            width: 100%;
            min-height: 100%;
            height: auto;
            display: -webkit-box;
            -webkit-box-align: center;
            -webkit-box-pack: center;

            .wrap {
                /*底部内边距*/
                padding-top: 0;
                padding-bottom: 80px;

                .layout {
                    width: 854px;
                    margin: 0 auto;
                    padding-bottom: 10px;

                    .n-frame {
                        padding: 34px 34px 0;
                    }

                    .device-frame {
                        padding-bottom: 30px;
                        border: none;
                        border-radius: 0;
                        padding-top: 0;
                        background-color: #fff;
                        min-height: 400px;

                        .external_logo_area {
                            display: block;
                            padding: 30px 0 40px;

                            .mi_logo {
                                width: 48px;
                                height: 48px;
                                margin: 0 auto;
                                display: block;
                                cursor: default;
                                background-image: url("https://account.xiaomi.com/static/res/8df71d6/account-static/respassport/acc-2014/img/milogo.png");
                            }
                        }
                        .title-item {
                            text-align: center;
                            clear: both;

                            .title_big30 {
                                font-size: 30px;
                                font-weight: normal;
                                line-height: 1.5;
                                color: #333;
                                margin-top: 0;
                                margin-bottom: 0;
                            }
                        }
                        .regbox {
                            width: 332px;
                            padding: 30px 0;
                            line-height: 20px;
                            margin: 0 auto;
                            .xs_title_box{
                                padding: 0 0 20px 0;
                                p{
                                    margin: 0;
                                }
                                .content_title{
                                    color:#333;
                                    font-size:15px;
                                    font-weight: bold;
                                    .address-place{
                                        color:#ff6700;
                                    }
                                }
                            }
                            .inputbg1{
                                padding-bottom: 15px;
                                .labelbox{
                                    width: 100%;
                                    box-sizing: border-box;
                                    height:42px;
                                    line-height: 42px;
                                    display: inline-block;
                                    border:1px solid #e8e8e8;
                                    .resendcode{
                                        width:170px;
                                        max-width:180px;
                                        height:20px;
                                        line-height: 20px;
                                        padding: 10px;
                                        display: inline-block;
                                        background: none;
                                        border:0 none;
                                        outline: none;
                                    }
                                    .remain{
                                        margin-left: 8px;
                                        vertical-align: middle;
                                        display: inline-block;
                                        height: 40px;
                                        line-height: 40px;
                                        .disabled{
                                            color:#9d9d9d !important;
                                            cursor: not-allowed !important;
                                            background: none !important;
                                            pointer-events: none !important;

                                        }

                                        a{
                                            color:#333;
                                            cursor:pointer;
                                            padding: 0 10px;
                                            display: block;
                                        }
                                    }
                                }
                            }
                            .err_tip{
                                margin-top: -8px;
                                margin-bottom: 10px;
                                font-size: 14px;
                                color:#f66;
                                line-height: 20px;
                                .icon_error{
                                    width: 14px;
                                    height:14px;
                                    margin:-1px 5px 0 0;
                                    overflow: hidden;
                                    display: inline-block;
                                    /*设置行内元素对齐方式*/
                                    vertical-align: middle;
                                    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RThERTYwMzA1REI3MTFFNDg1NkRDMzZGRjlFNjlEMzMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RThERTYwMzE1REI3MTFFNDg1NkRDMzZGRjlFNjlEMzMiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpFOERFNjAyRTVEQjcxMUU0ODU2REMzNkZGOUU2OUQzMyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpFOERFNjAyRjVEQjcxMUU0ODU2REMzNkZGOUU2OUQzMyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PhTWU2QAAADRSURBVHjaYvyfb8uABESAuAiIfYBYDSp2A4g3AfEkIH4DU8iIpDEYiOcCMT8DdvAJiJOAeC2Iw4SkaTUeTSDAB1UTDNMoCsTzQLajKJtwCIJRASNUrRhIYy7UNGIBSG0BSKMfA+nAB6RRgwyN6kwM5IFfLNB40seQKrDDp/EeEzRyMQH2UIWBrSCNU6CRSywAqZ0AcuoraIpYjRKX2J36H6r2FSxwQMkoDIg/47EJJBeKnuRAYA0QKwFxOxBfAeLfQPwViM8DcQtUbi1MMUCAAQBgriw0RAfMMAAAAABJRU5ErkJggg==");
                                    background-repeat: no-repeat;
                                    span{
                                        vertical-align: middle;
                                    }
                                }
                            }
                            .sns_unavaliable{
                                a{
                                    color: #46639c;
                                }
                            }
                            .fixed_bot :first-child:hover{
                                background-color: #ff936a;
                            }
                            .fixed_bot{
                                .btn332{
                                    width: 330px;
                                    height:42px;
                                    /*margin:0 auto;*/
                                    line-height: 42px;
                                    text-align: center;
                                    font-size:14px;
                                    display: block;
                                    cursor:pointer;
                                    overflow: hidden;
                                }
                                .btn_reg_1{
                                    background-color: #ff6700;
                                    margin-top: 15px;
                                    border:1px solid rgba(186,186,186,.3);
                                    color:#fff;
                                }

                                .btn_reg_2{
                                    background-color: #ffffff;
                                    margin-top: 10px;
                                    border:1px solid #ddd;
                                    color:#7c7c7c;
                                }
                            }

                        }
                    }
                }
            }
        }
</style>
