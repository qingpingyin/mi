<template>
    <div class="register">
        <div id="hidden" >
            <div class="wrapper">
                <div class="wrap">
                    <div class="layout">
                        <div id="main_container" class="n-frame device-frame reg_frame">
                            <div class="external_logo_area">
                                <a class="mi_logo" href="javascript:void(0)"></a>
                            </div>
                            <div class="title-item">
                                <h4 class="title_big30">重置密码</h4>
                            </div>

                            <div>
                                <div class="regbox">
                                    <div class="phone_step">
                                        <div><p class="tit_normal">请输入注册的邮箱地址、手机号码或小米账号:</p></div>
                                        <div class="listwrap_inside_panel c_b">
                                            <div class="inputbg">
                                                <label class="labelbox" >
                                                    <input type="tel" name="phone" placeholder="邮箱/手机号码/小米账号" v-model="phone"  @blur="phone_blur" @keypress="flag=false" />
                                                </label>
                                            </div>
                                            <div class="err_tip" v-if="flag">
                                                <div class="dis_box">
                                                    <em class="icon_error"></em>
                                                    <span>{{err_message}}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="country_tips ">
                                            用户输入手机号码时请正确选择区域前缀，如：台湾：+8869*******，香港：+8526*******
                                        </div>

                                        <div class="fixed_bot mar_phone_dis1">
                                            <input class="btn332 btn_reg_1 submit_step" @click="submitPhone" type="submit" value="下一步">
                                        </div>
                                    </div>
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
    import {sendSms} from "../api/user";
    export default {
        name: "register",
        data() {
            return {
                phone: '',
                flag: false,  //显示错误信息
                err_message: '请输入手机号码',
            }
        },
        methods: {
            //跳转短信发送界面,同时要给手机发送验证码.
            async submitPhone() {
                if (this.phone_blur()) {
                    const resp =await sendSms({
                        "mobile":this.phone
                    })
                    this.display = false
                    this.$router.push({
                        name: 'restPasswordSms', params: {
                            phone: this.phone,
                            code:resp.data
                        }
                    })
                }
            },
            //验证手机格式
            phone_blur() {
                let phone_reg = /^1(3[0-9]|5[0-3,5-9]|7[1-3,5-8]|8[0-9])\d{8}$/;
                if (this.phone === "") {
                    this.flag = true;
                    return false;
                } else if (!phone_reg.test(this.phone)) {
                    this.err_message = '手机号码格式错误';
                    this.flag = true
                    return false;
                } else {
                    return true;
                }
            }
        },
        computed: {},
        components: {
            Footer
        }
    }
</script>

<style lang="scss" scoped>
    .register{
        height: 100%;
        margin:0;
        padding: 0;
        display: block;
        background-color: #f9f9f9;
        font-size:14px;
        font-family: Helvetica,arial,"MI Lan Pro","Hiragino Sans GB","PingFang SC","Microsoft YaHei","微軟正黑體","儷黑 Pro",sans-serif;
        .wrapper{
            width:100%;
            min-height: 100%;
            height: auto;
            display: -webkit-box;
            -webkit-box-align: center;
            -webkit-box-pack: center;
            .wrap{
                /*底部内边距*/
                padding-top: 26px;
                padding-bottom: 80px;
                .layout{
                    width:854px;
                    margin: 0 auto;
                    padding-bottom: 10px;
                    .n-frame{
                        padding: 34px 34px 0;
                    }
                    .device-frame{
                        padding-bottom: 30px;
                        border:none;
                        border-radius: 0;
                        padding-top: 0;
                        background-color: #fff;
                        min-height: 400px;
                        .external_logo_area{
                            display: block;
                            padding: 30px 0 40px;
                            .mi_logo{
                                width: 48px;
                                height: 48px;
                                margin: 0 auto;
                                display: block;
                                cursor: default;
                                background-image: url("https://account.xiaomi.com/static/res/8df71d6/account-static/respassport/acc-2014/img/milogo.png");
                            }
                        }
                        .title-item{
                            text-align: center;
                            clear:both;
                            .title_big30{
                                font-size:30px;
                                font-weight: normal;
                                line-height: 1.5;
                                color:#333;
                                margin-top:0;
                                margin-bottom: 0;
                            }
                        }
                        .regbox{
                            width: 332px;
                            padding: 30px 0;
                            line-height: 20px;
                            margin: 0 auto;
                            .tit_normal{
                                font-size:15px;
                                color:#666;
                            }
                            .listwrap{
                                /*padding-bottom: 15px;*/
                                position: relative;
                                height: 42px;
                                .tits{
                                    width:314px;
                                    height: 40px;
                                    line-height: 40px;
                                    display: inline-block;
                                    padding-left: 14px;
                                    vertical-align: middle;
                                    border:1px solid #e8e8e8;
                                    color:#555;
                                    cursor: pointer;
                                    p{
                                        float: left;
                                        width:275px;
                                        /*border-right: 1px solid #e8e8e8;*/
                                        cursor: pointer;
                                    }
                                }
                            }
                            .region_tip_text{
                                /*font-size: 14px;*/
                                color:#666;
                                margin-bottom: 15px;
                            }
                            .listwrap_inside_panel {
                                margin-left: -1px;
                                position: relative;
                                /*width: 54px;*/
                                height: 71px;
                                z-index: 3;

                                .inputbg {
                                    padding-bottom: 15px;

                                    .labelbox {
                                        display: inline-block;
                                        width: 331px;
                                        height: 42px;
                                        line-height: 42px;

                                        .cycode_box {
                                            float: left;
                                            display: inline-block;
                                            height: 42px;

                                            .tits {
                                                height: 40px;
                                                width: 54px;
                                                line-height: 40px;
                                                display: inline-block;
                                                padding-left: 14px;
                                                vertical-align: middle;
                                                border: 1px solid #e8e8e8;
                                                color: #555;
                                                cursor: pointer;

                                                p {
                                                    float: left;
                                                    cursor: pointer;
                                                    height: 40px;
                                                    border-right: 0 none;
                                                    margin: 0;
                                                    padding: 0;
                                                }

                                                .icon_arrow {
                                                    float: left;
                                                    margin: 17px 0 0 10px;
                                                    width: 0;
                                                    height: 0;
                                                    line-height: 0;
                                                    font-size: 0;
                                                    border-width: 5px;
                                                    border-style: solid;
                                                    border-color: #9d9d9d transparent transparent transparent;
                                                }
                                            }
                                        }

                                        input {
                                            width: 330px;
                                            height: 20px;
                                            line-height: 20px;
                                            display: inline-block;
                                            padding: 10px;
                                            border: 1px solid #e8e8e8;
                                        }
                                    }
                                }
                            }
                            .country_tips {
                                    width: 100%;
                                    color: #c5c5c5;
                                    zoom: 1;
                                    margin-bottom: 5px;
                                }
                            .btn_reg_1{
                                background-color: #ff6700;
                                margin-top: 15px;
                                border:1px solid rgba(186,186,186,3);
                                color:#fff;
                            }
                            .btn332{
                                width:350px;
                                height: 42px;
                                margin: 0;
                                border:0;
                                line-height: 42px;
                                text-align: center;
                                /*font-size: 14px;*/
                                display: block;
                                cursor: pointer;
                                overflow: hidden;
                            }
                        }
                        .privacy_box{
                            text-align: center;
                            padding-top: 40px;
                            .msg{
                                color: #9d9d9d;
                                /*font-size:14px;*/
                                .n_checked{
                                    padding: 10px 0;
                                    cursor:pointer;
                                    display: inline-block;
                                }
                                a{
                                    color: #333;
                                    font-weight: bold;
                                    text-decoration: none;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
</style>
