<template>
    <div class="rest_password">
        <div class="wrapper">
            <div class="wrap">
                <div class="layout">
                    <div class="n-frame device-frame reg_frame" id="main_container">
                        <div class="external_logo_area">
                            <a class="mi_logo" href="javascript:void(0)"></a>
                        </div>
                        <div class="title-item t_c">
                            <h4 class="title_big30">重置小米帐号</h4>
                        </div>
                        <div class="regbox1">
                            <div class="step3 phone_step3">
                                <dl>
                                    <dt>
                                        <h4>您重置的手机号为
                                            <span class="ff6 register-ph-num">+86 {{getPhone}}</span>
                                        </h4>
                                        <h4>请设置您的密码:</h4>
                                    </dt>
                                    <dd>
                                        <div class="inputbg">
                                            <label class="labelbox1">
                                                <input  v-model="password" class="set-password inputpwd" type="password" name="password" placeholder="请输入密码"/>
                                            </label>
                                        </div>
                                    </dd>
                                    <dd>
                                        <div class="inputbg">
                                            <label class="labelbox1">
                                                <input @blur="regPwd" v-model="repassword" class="inputpwd" type="password" name="repassword" placeholder="请输入确认密码"/>
                                            </label>
                                        </div>
                                    </dd>
                                </dl>
                                <div class="err_tip pwd_tip">
                                    <div class="disbox">
                                        <em :class="{'icon_error':flag}"></em>
                                        <span :class="{'error-password':flag}">{{errTip}}</span>
                                    </div>
                                </div>
                                <div class="fixed_bot">
                                    <input @click="submitPwd" class="btn332 btn_reg_1" type="submit" value="提交"/>
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
    import Footer from "@/components/RegisterFooter";
    import {forgetPassword} from "@/api/user";
    export default {
        name: "setRestPassword",
        data(){
            return{
                phone:this.$route.query.phone,
                code:this.$route.query.code,
                password:'',
                repassword:'',
                flag:false,//显示错误信息
                errTip:'密码长度8~16位，数字、字母、字符至少包含两种'
            }
        },
        computed:{
            getPhone(){
                let tel = this.phone + "";
                return tel.replace(tel.substring(3,9),"*****")
            }
        },
        methods:{
            //    提交
            async submitPwd(){
                try {
                   await forgetPassword({
                        "mobile":this.phone,
                        "code":this.code,
                        "password":this.password,
                    }).then(()=>{
                       this.$router.replace("/login")
                   })
                }catch (err) {
                    console.log(err)
                }
            },
            //    密码正则验证
            regPwd(){
                let pwdReg = /^(?=.*[a-z])(?=.*\d)[\s\S]{8,16}$/;
                if (this.pwdCompile()){
                    //判断密码是否符合格式
                    if(!pwdReg.test(this.password)){
                        this.flag=true;
                        return false;
                    }
                    return true;
                }
            },
            //    判断两次输入密码是否相等
            pwdCompile(){
                if (this.password === "" || this.repassword === ""){
                    this.flag = true;
                    this.errTip = '请输入密码';
                    return false;
                }else if(this.password === this.repassword){
                    this.flag = false;
                    this.errTip = '密码长度8~16位，数字、字母、字符至少包含两种';
                    return true;
                }else if(this.password !== this.repassword){
                    this.flag = true;
                    this.errTip = '密码输入不一致'
                    return false;
                }
            }
        },
        components:{
            Footer
        },
        created() {
            //刷新页面返回输入手机号页面
            window.addEventListener('load',()=>{
                let msg = confirm('系统可能不会保存您所做的更改。');
                if(msg === true){
                    if (this.$route.path!=="/restPassword"){
                        this.$router.go(-2);
                        this.$router.replace('/restPassword')
                    }
                }

            })
        },
    }
</script>

<style lang="scss" scoped>
    .wrapper {
        width: 100%;
        min-height: 100%;
        height: auto;
        display: -webkit-box;
        -webkit-box-align: center;
        -webkit-box-pack: center;

        .wrap {
            /*底部内边距*/
            padding-top: 26px;
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
                    .regbox1 {
                        width: 332px;
                        padding: 30px 0;
                        line-height: 20px;
                        margin: 0 auto;
                        .step3 dt{
                            margin:15px 0;
                        }
                        .step3 dt dd{
                            display: block;
                            margin-left: 0;
                            margin-inline-start:40px ;
                        }
                        h4{
                            font-weight: bold;
                            color:#666;
                        }
                        .ff6{
                            color: #ff6700;
                        }
                        .inputbg{
                            padding-bottom: 15px;
                            .labelbox1{
                                height: 42px;
                                line-height: 42px;
                                display: inline-block;
                                border: 1px solid #e8e8e8;
                            }
                            input{
                                width:310px;
                                height:20px;
                                line-height: 20px;
                                padding: 10px;
                                display: inline-block;
                                color:#333;
                                border:0 none;
                                background: 0 none;
                                outline: none;
                            }
                        }

                        .err_tip{
                            margin-top: -8px;
                            font-size:14px;
                            line-height: 20px;
                            margin-bottom: 5px;
                            .error-password{
                                color:#f66;
                            }
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
                            }
                        }
                        .fixed_bot{
                            margin-top: 30px;
                            .btn332{
                                border: 1px solid;
                                background-color: #ff6700;
                                color:#fff;
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
                        }
                    }
                }
            }
        }
    }
</style>

