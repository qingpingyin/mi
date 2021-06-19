<template>
  <div class="register">
    <div id="hidden" v-if="IsRegister">
<<<<<<< HEAD
      <div class="wrapper">
        <div class="wrap">
          <div class="layout">
            <div id="main_container" class="n-frame device-frame reg_frame">
              <div class="external_logo_area">
                <a class="mi_logo" href="javascript:void(0)"></a>
              </div>
              <div class="title-item">
                <h4 class="title_big30">注册小米帐号</h4>
              </div>
=======
    <div class="wrapper">
      <div class="wrap">
        <div class="layout">
          <div id="main_container" class="n-frame device-frame reg_frame">
            <div class="external_logo_area">
              <a class="mi_logo" href="javascript:void(0)"></a>
            </div>
            <div class="title-item">
              <h4 class="title_big30">注册小米帐号</h4>
            </div>
>>>>>>> bd5657b2698a0ee0678645ac151345933da77c1c

              <div>
                <div class="regbox">
                  <div class="phone_step">
                    <h4 class="tit_normal">国家/地区</h4>
                    <div class="listwrap select-regions" >
                      <!--国家地区-->
                      <div class="tits display_box">
                        <p class="result">{{countries[0].c_name}}</p>
                      </div>
                    </div>
                    <div class="region_tip_text">成功注册帐号后，国家/地区将不能被修改</div>

                    <div><h4 class="tit_normal">手机号码</h4></div>
                    <div class="listwrap_inside_panel c_b">
                      <div class="inputbg">
                        <label class="labelbox" >
                          <div class="cycode_box" id="select-cycode">
                            <div class="tits display_box">
                              <p id="select-cycode-result">+86</p>
                              <i class="icon_arrow"></i></div>
                          </div>
                          <input type="tel" name="phone" placeholder="请输入手机号码" v-model="phone"  @blur="phone_blur" @keypress="flag=false" />
                        </label>
                      </div>
                      <div class="err_tip" v-if="flag">
                        <div class="dis_box">
                          <em class="icon_error"></em>
                          <span>{{err_message}}</span>
                        </div>
                      </div>
                    </div>
                    <div class="fixed_bot mar_phone_dis1">
                      <input class="btn332 btn_reg_1 submit_step" @click="submit_phone"  type="submit" value="立即注册">
                    </div>
                  </div>
                </div>
                <div class="privacy_box">
                  <div class="msg">
                    <label class="n_checked select-privacy">已阅读并同意：小米</label>
                    <a target="_blank" href="https://static.account.xiaomi.com/html/agreement/user/zh_CN.html"> 用户协议</a>
                    和
                    <a target="_blank" href="https://privacy.mi.com/miaccount/zh_CN/">隐私政策</a>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
<<<<<<< HEAD
=======
    <Footer></Footer>
    </div>
>>>>>>> bd5657b2698a0ee0678645ac151345933da77c1c
    <router-view></router-view>
  </div>
</template>

<script>
  import Footer from "../components/RegisterFooter";
  export default {
    name: "register",
    data(){
      return{
        countries:[
          {
            c_name:'中国',
            upper:'Z'
          }
        ],
        phone:'',
        flag:false,  //显示错误信息
        err_message:'请输入手机号码',
      }
    },
    computed:{
<<<<<<< HEAD
      //  判断当前路由是不是register
      IsRegister(){
        let path = this.$route.name
        return path === "register";
=======
    //  判断当前路由是不是register
      IsRegister(){
        let path = this.$route.name
        return path === "register";

>>>>>>> bd5657b2698a0ee0678645ac151345933da77c1c
      }
    },
    methods:{
      //验证手机格式
      phone_blur(){
        let phone_reg =/^1(3[0-9]|5[0-3,5-9]|7[1-3,5-8]|8[0-9])\d{8}$/;
        if (this.phone ===""){
          this.flag = true;
          return false;
        }else if (!phone_reg.test(this.phone)){
          this.err_message = '手机号码格式错误';
          this.flag = true
          return false;
        }else{
          return true;
        }
      },
      //跳转短信发送界面,同时要给手机发送验证码.
      submit_phone(){
        if(this.phone_blur()){
          this.display = false
          this.$router.push({name:'identify',params:{
              phone:this.phone
            }})
        }
      }
    },
    components:{
      Footer
    }
  }
</script>

<style lang="scss">
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
                font-size:14px;
                font-weight: normal;
                color:#333;
                padding-bottom: 5px;
                margin-top:0;
                margin-bottom: 0;
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
              .listwrap_inside_panel{
                margin-left:-1px ;
                position: relative;
                /*width: 54px;*/
                height: 71px;
                z-index: 3;
                .inputbg{
                  padding-bottom: 15px;
                  .labelbox{
                    display: inline-block;
                    width: 331px;
                    height: 42px;
                    line-height: 42px;
                    .cycode_box{
                      float: left;
                      display: inline-block;
                      height: 42px;
                      .tits{
                        height: 40px;
                        width: 54px;
                        line-height: 40px;
                        display: inline-block;
                        padding-left: 14px;
                        vertical-align: middle;
                        border:1px solid #e8e8e8;
                        color:#555;
                        cursor: pointer;
                        p{
                          float: left;
                          cursor: pointer;
                          height: 40px;
                          border-right: 0 none;
                          margin: 0;
                          padding: 0;
                        }
                        .icon_arrow{
                          float: left;
                          margin: 17px 0 0 10px;
                          width: 0;
                          height: 0;
                          line-height: 0;
                          font-size:0;
                          border-width: 5px;
                          border-style:solid;
                          border-color: #9d9d9d transparent transparent transparent;
                        }
                      }
                    }
                    input{
                      width:239px;
                      height: 20px;
                      line-height: 20px;
                      display: inline-block;
                      padding: 10px;
                      border:1px solid #e8e8e8;
                    }
                  }
                }
                .err_tip{
                  display: block;
                  margin-top: -8px;
                  margin-bottom: 5px;
                  line-height: 20px;
                  /*font-size: 14px;*/
                  color: #f66;
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
                  span{
                    vertical-align: middle;
                  }
                }
              }
              .btn_reg_1{
                background-color: #ff6700;
                margin-top: 15px;
                border:1px solid rgba(186,186,186,3);
                color:#fff;
              }
              .btn332{
                width:330px;
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
