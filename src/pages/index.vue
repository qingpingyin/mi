<template>
  <div class="index">
    <!-- 页面菜单及促销部分 -->
    <section class="menu-banner-area">
      <div class="container">
        <div class="banner-wrapper">
          <!-- 导航菜单 -->
          <div class="nav-menu">
            <div class="menu-item" v-for="(categoryItem,index) in categories" :key="index">
              <a href="javascript:;" class="item-name">{{categoryItem.categories_name}}</a>
              <div class="children-box">
                <ul v-for="(item,i) in categoryItem.children" :key="i">
                  <li  v-for="(j,k) in item.product" :key="k" class="product-item">
                      <router-link :to="{name:'detail',query:{id:j.id}}">
                      <a>
                        <img v-lazy="j.image" alt />
                        <span>{{j.title}}</span>
                      </a>
                      </router-link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <!-- 轮播图 -->
          <div class="swiper-box">
            <swiper :options="swiperOption">
              <swiper-slide v-for="(item, index) in swiperSlides" :key="index">
                  <router-link :to="{name:'detail',query:{id:item.pid}}">
                    <a>
                    <img :src="item.img_url" alt />
                    </a>
                  </router-link>
              </swiper-slide>
              <div class="swiper-pagination" slot="pagination"></div>
              <div class="swiper-btn swiper-button-prev" slot="button-prev"></div>
              <div class="swiper-btn swiper-button-next" slot="button-next"></div>
            </swiper>
          </div>
        </div>
        <!-- 促销商品 -->
          <div class="home-sub">
              <div class="first">
                  <div>
                      <a href="">
                          <img src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/82abdba456e8caaea5848a0cddce03db.png?w=48&h=48" alt="小米秒杀">
                          小米秒杀
                      </a>

                  </div>
                  <div>
                      <a href="">
                          <img src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/806f2dfb2d27978e33fe3815d3851fa3.png?w=48&h=48" alt="企业团购">
                          企业团购
                      </a>

                  </div>
                  <div>
                      <a href="">
                          <img src=" https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/eded6fa3b897a058163e2485532c4f10.png?w=48&h=48" alt="F码通道">
                          F码通道
                      </a>
                  </div>
                  <div>
                      <a href="">
                          <img src=" https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/43a3195efa6a3cc7662efed8e7abe8bf.png?w=48&h=48" alt="F码通道">
                          米粉卡
                      </a>
                  </div>

                  <div>
                      <a href="">
                          <img src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/f4846bca6010a0deb9f85464409862af.png?w=48&h=48" alt="以旧换新">
                          以旧换新
                      </a>
                  </div>
                  <div>
                      <a href="">
                          <img src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/9a76d7636b08e0988efb4fc384ae497b.png?w=48&h=48" alt="话费充值">
                          话费充值
                      </a>

                  </div>
              </div>
              <div class="other" v-for="(item,index) in promoList" :key="index">
                  <img :src="item.img" alt="">
              </div>

          </div>
      </div>
    </section>
    <div class="page-main">
        <div class="container">
            <div class="home-banner-box">
                <router-link :to="{name:'detail',query:{id:27}}">
                <a >
                  <img src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/431e5fd6bfd1b67d096928248be18303.jpg?thumb=1&w=1533&h=150&f=webp&q=90" alt=""/>
                </a>
                </router-link>
            </div>
          <!--手机商品列表-->
          <div class="home-brick-box">
              <div class="box-hd">
                  <h2 class="title">手机</h2>
                  <div class="more">
                      <a href="/#/cate">
                        查看更多
                        <i class="el-icon-arrow-right"></i>
                      </a>
                  </div>
              </div>
              <div class="box-bd clearfix">
                  <div class="row">
                      <div class="list-left">
                          <ul class="brick-promo-list clearfix">
                              <li>
                                  <router-link :to="{name:'detail',query:{id:16}}">
                                  <a>
                                      <img src="//cdn.cnbj1.fds.api.mi-img.com/mi-mall/c583f2edc613f1be20fa415910b13ce3.jpg?thumb=1&w=293&h=768&f=webp&q=90"/>
                                  </a>
                                  </router-link>
                              </li>

                          </ul>
                      </div>
                    <!--right list-->
                    <MyList :list="phoneList" :is-more="false"></MyList>
                  </div>
              </div>
          </div>

            <div class="home-banner-box">
                <a >
                    <img src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/41d16e66381cfeda7b6b39ab67678d5e.jpg?thumb=1&w=1533&h=150&f=webp&q=90" alt=""/>
                </a>
            </div>
            <!--电视产品列表-->
            <div class="home-brick-box">
                <div class="box-hd">
                    <h2 class="title">家电</h2>
                    <div class="more">
                        <MyMenu :val="2" @fromChild="getChildMsg">
                            <span slot="1">热门</span>
                            <span slot="2">电视影音</span>
                        </MyMenu>
                    </div>
                </div>
                <div class="box-bd clearfix">
                    <div class="row">
                        <div class="span4">
                            <ul class="brick-promo-list clearfix">
                                <li>
                                    <router-link :to="{name:'detail',query:{id:33}}">
                                    <a>
                                        <img  src="//cdn.cnbj1.fds.api.mi-img.com/mi-mall/116fc43816b87192be4e67cf762e8da5.jpeg?thumb=1&w=293&h=375&f=webp&q=90" alt/>
                                    </a>
                                    </router-link>
                                </li>
                                <li>
                                    <a>
                                        <img src="//cdn.cnbj1.fds.api.mi-img.com/mi-mall/dfbdabe36b2d630d57a015e6fb5eb3ea.jpg?thumb=1&w=293&h=375&f=webp&q=90" alt/>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <MyList :list="applianceList" :is-more="true"></MyList>
                    </div>
                </div>
            </div>

            <div class="home-banner-box">
                <router-link :to="{name:'detail',query:{id:55}}">
                <a >
                    <img src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/59e8fc8ba9718c266882719fb4bbcedd.jpg?thumb=1&w=1533&h=150&f=webp&q=90" alt=""/>
                </a>
                </router-link>
            </div>
            <!--智能商品列表-->
            <div class="home-brick-box">
                <div class="box-hd">
                    <h2 class="title">智能</h2>
                    <div class="more">
                        <MyMenu :val="3" @fromChild="getChildMsg2">
                            <span slot="1">热门</span>
                            <span slot="2">路由器</span>
                            <span slot="3">笔记本</span>
                        </MyMenu>
                    </div>
                </div>
                <div class="box-bd clearfix">
                    <div class="row">
                        <div class="span4">
                            <ul class="brick-promo-list clearfix">
                                <li>
                                    <a>
                                        <img  src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/ffe114f73fac3a45e5622c3eff56106b.jpg?thumb=1&w=293&h=375&f=webp&q=90" alt/>
                                    </a>
                                </li>
                                <li>
                                    <a>
                                        <img src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/a660ce095e8f553a9ed1515265f4e9fc.jpg?thumb=1&w=293&h=375&f=webp&q=90" alt/>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <MyList :list="intelligenceList" is-more="true"></MyList>
                    </div>
                </div>
            </div>
        </div>
    </div>

  </div>
</template>
<script>
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import MyMenu from "@/components/MyMenu";
import MyList from "@/components/MyList";
import {initCarousel} from "@/api/carousel";
import {getCate} from "@/api/cate";
import {getProduct} from "@/api/product";
export default {
  name: "index",
  data() {
    return {
      // swiper配置参数
      swiperSlides :[],
      swiperOption: {
        allowTouchMove: false,
        speed: 1000,
        effect: "fade",
        fadeEffect: {
          crossFade: true
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
          bulletClass: "my-bullet",
          bulletActiveClass: "my-bullet-active"
        },
        loop: true,
        autoplay: {
          delay: 3000,
          stopOnLastSlide: false,
          disableOnInteraction: false
        }
      },
      //   商品推荐
      promoList: [
        {
          id: "42",
          img: "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/5d4298059889417157e8492750328492.jpg?w=632&h=340"
        },
        {
          id: "45",
          img: "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/b30177d629bfbe2fb42251c1b8538f7b.jpg?w=632&h=340"
        },
        {
          id: "46",
          img: "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/9f18ac756fa2cedb16ea429b9c0001af.png?w=632&h=340"
        },

      ],
      //   手机商品列表
      phoneList: [],//手机列表
      categories: [],//商品列表
      miTvList: [], // 小米电视商品列表
      applianceList: [], // 家电商品列表
      applianceHotList: [], //热门家电商品列表
      intelligenceList:[],  //智能商品列表
      intelligenceHotList:[],//智能 热门列表
      routersList:[],//智能 路由器
      noteBookList:[],//智能 笔记本
      applianceActive: 1, // 家电当前选中的商品分类
      intelligenceActive:1,//智能分类
    };
  },
  watch:{
    // 家电当前选中的商品分类，响应不同的商品数据
    applianceActive: function(val) {
      // 页面初始化的时候把applianceHotList(热门家电商品列表)直接赋值给applianceList(家电商品列表)
      // 所以在切换商品列表时判断applianceHotList是否为空,为空则是第一次切换,把applianceList赋值给applianceHotList
      if (this.applianceHotList == "") {
        this.applianceHotList = this.applianceList;
      }
      if (val == 1) {
        // 1为热门商品
        this.applianceList = this.applianceHotList;
        return;
      }
      if (val == 2) {
        // 2为电视商品
        this.applianceList = this.miTvList;
        return;
      }
    },
      intelligenceActive(val){
          if (this.intelligenceHotList == "") {
              this.intelligenceHotList = this.intelligenceList;
          }
          if (val == 1) {
              // 1为热门商品
              this.intelligenceList = this.intelligenceHotList;
              return;
          }
          if (val == 2) {
              //路由
              this.intelligenceList = this.routersList;
              return;
          }
          if(val==3){
              //笔记本
              this.intelligenceList =this.noteBookList
              return
          }
      }
  },
  methods:{
    // 获取家电模块子组件传过来的数据
    getChildMsg(val) {
      this.applianceActive = val;
    },
    // 获取配件模块子组件传过来的数据
    getChildMsg2(val) {
      this.intelligenceActive = val;
    }
  },
   async mounted() {
     //轮播图
     await initCarousel().then(resp=>{
         this.swiperSlides =resp.data
     })
     //类别
     await getCate({
       //0 :递归查询 1 :header-nav
       "is_nav":0
     }).then(resp=>{
         this.categories = resp.data
     })
     //促销列表

     //手机列表
     await getProduct({
       "page":1,
       "pageSize":8,
       "cid":1,
       "is_recursion":true
     }).then(resp=>{
         this.phoneList = resp.data
     })
     //家电 热门
     await getProduct({
         "page":1,
         "pageSize":7,
         "cid":4,
         "is_recursion":true
     }).then(resp=>{
         this.applianceList = resp.data
     })
     //家电 电视
     await getProduct({
         "page":1,
         "pageSize":7,
         "cid":12,
         "is_recursion":false
     }).then(resp=>{
         this.miTvList=resp.data
     })
     //智能 热门
     await getProduct({
         "page":1,
         "pageSize":7,
         "cid":6,
         "is_recursion":true
     }).then(resp=>{
         this.intelligenceList=resp.data
     })
     //智能 路由器
     await getProduct({
         "page":1,
         "pageSize":7,
         "cid":15,
         "is_recursion":false
     }).then(resp=>{
         this.routersList=resp.data
     })
       //智能 路由器
     await getProduct({
         "page":1,
         "pageSize":7,
         "cid":13,
         "is_recursion":false
    }).then(resp=>{
         this.noteBookList=resp.data
     })
  },
  components: {
    swiper,
    swiperSlide,
    MyMenu,
    MyList
  }
};
</script>
<style lang="scss" >
.index {
  // 菜单与banner部分
  .menu-banner-area {
    background-color: #fff;
    .container {
      width: 1226px;
      margin: 0 auto;
      // 轮播图和菜单
      .banner-wrapper {
        position: relative;
        .nav-menu {
          box-sizing: border-box;
          position: absolute;
          z-index: 99;
          width: 234px;
          height: 100%;
          background-color: rgba(105, 101, 101, 0.6);
          padding: 20px 0;
          .menu-item {
            height: 42px;
            line-height: 42px;
            .item-name {
              position: relative;
              height: 50px;
              display: block;
              padding: 0px 30px;
              text-decoration: none;
              color: #fff;
              font-size: 14px;
              &:after {
                content: "";
                position: absolute;
                right: 30px;
                top: 50%;
                transform: translateY(-7.5px);
                display: inline-block;
                width: 10px;
                height: 15px;
                background: url(../assets/img/index/icon-arrow.png) no-repeat;
                background-size: 10px 15px;
                background-position: center;
              }
            }
            .children-box {
              display: none;
              position: absolute;
              left: 234px;
              top: 0;
              box-shadow: 0 8px 16px rgba(0, 0, 0, 0.18);
              ul {
                width: 248px;
                height: 451px;
                background-color: #fff;
                .product-item {
                  width: 100%;
                  background-color: #fff;
                  a {
                    position: relative;
                    width: 100%;
                    padding: 8px 0px;
                    display: inline-block;
                    text-decoration: none;
                    color: #333;
                    font-size: 14px;
                    img {
                      width:  40px;
                      height: 40px;
                      margin: 0 18px 0 12px;
                      vertical-align: middle;
                    }
                    span {
                      line-height: 40px;
                      width: 150px;
                      white-space: nowrap;
                      text-overflow: ellipsis;
                      overflow: hidden;
                    }
                    &:hover {
                      color: #f60;
                    }
                  }
                }
              }
            }
            &:hover {
              background: #f60;
              .children-box {
                display: flex;
              }
            }
          }
        }
        .swiper-box {
          width: 100%;
          height: 451px;
          .swiper-container {
            position: relative;
            .swiper-wrapper a{
              width: 100%;
              display: inline-block;
            }
            // 分页器
            .swiper-pagination {
              display: inline-block;
              position: absolute;
              left: auto;
              right: 30px;
              bottom: 20px;
              width: auto;
              .my-bullet {
                display: inline-block;
                margin: 0 4px;
                width: 6px;
                height: 6px;
                border: 2px solid #fff;
                border-color: hsla(0, 0%, 100%, 0.3);
                border-radius: 10px;
                overflow: hidden;
                background: rgba(0, 0, 0, 0.4);
                opacity: 1;
                outline: none;
                cursor: pointer;
                &.my-bullet-active {
                  background: hsla(0, 0%, 100%, 0.4);
                  border-color: rgba(0, 0, 0, 0.4);
                }
              }
            }
            // 切换按钮
            .swiper-btn {
              color: #f5f5f5;
              width: 41px;
              height: 69px;
              background: url(/imgs/slider/icon-slides.png) no-repeat;
              background-size: auto 69px;
              background-color: rgba($color: #000000, $alpha: 0);
              &.swiper-button-prev {
                position: absolute;
                left: 234px;
                border-top-right-radius: 2px;
                border-bottom-right-radius: 2px;
                background-position: -84px top;
                &:hover {
                  background-position: left top;
                }
              }
              &.swiper-button-next {
                right: 0;
                background-position: -124px top;
                border-top-left-radius: 2px;
                border-bottom-left-radius: 2px;
                &:hover {
                  background-position: -41px top;
                }
              }
              &:focus{
                outline: none;
              }
            }
          }
          img {
            width: 100%;
            height: 451px;
          }
        }
      }
      // 促销列表
        .home-sub{
            height: 170px;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            margin-top: 12px;
            cursor: pointer;
            .first{
                width: 234px;
                height: 170px;
                display: flex;
                flex-flow: row wrap;
                div{
                    width: 70px;
                    height: 77px;
                    padding: 4px;
                    font-size: 12px;
                    text-align: center;
                    background: #5f5750;
                    a{
                        display: block;
                        color: #757575;
                        background: rgba(0, 0, 0, 0);
                        padding-top: 18px;
                        border-top: #665E57 1px solid;
                        border-left: #665E57 1px solid ;
                        &:hover{
                            color: #fff;
                        }
                        img{
                            width: 24px;
                            height: 24px;
                            display: block;
                            margin: 0 auto 4px;
                        }
                    }
                }
            }
            .other{
                width: 316px;
                img{
                    width: 100%;
                    height: 170px;
                }
            }
        }
    }
  }
  .page-main{
    background-color: #f5f5f5;
    padding-top: 4px;
    padding-bottom: 12px;
    .container{
      width: 1226px;
      margin-right: auto;
      margin-left: auto;
      cursor: pointer;
      .home-banner-box{
        height: 120px;
        margin: 22px 0;
        overflow: hidden;
        a{
          color: #757575;
          img{
            width: 1226px;
            aspect-ratio: auto 1226 / 120;
            height: 120px;
          }
        }
      }
      .home-brick-box{
        margin-bottom: 8px;
        .box-hd{
          position: relative;
          height: 58px;
          -webkit-font-smoothing: antialiased;
          .title{
            margin: 0;
            font-size: 22px;
            font-weight: 200;
            line-height: 58px;
            color: #333;
          }
          .more{
            position: absolute;
            top: 0;
            right: 0;
            a{
              font-size: 16px;
              line-height: 58px;
              color: #424242;
              -webkit-transition: all .4s;
              transition: all .4s;
              i{
                width: 12px;
                height: 12px;
                padding: 4px;
                margin-left: 6px;
                border-radius: 16px;
                font-size: 12px;
                line-height: 12px;
                background: #b0b0b0;
                color: #fff;
                vertical-align: 1px;
                -webkit-transition: all .4s;
                transition: all .4s;
              }
                &:hover{
                    color: #f25807;
                    i{
                        background-color: #f25807;
                    }
                }
            }
          }
        }
        .box-bd{
            height: 628px;
            .row{
                margin-left: -14px;
                .list-left {
                    width: 234px;
                    float: left;
                    margin-left: 14px;
                    min-height: 1px;

                    ul {
                        margin: 0 0 -14px -14px;
                        height: 614px;
                        padding: 0;
                        list-style-type: none;

                        li {
                            height: 614px;
                            position: relative;
                            z-index: 1;
                            float: left;
                            width: 234px;
                            margin-left: 14px;
                            margin-bottom: 14px;
                            background: #fff;
                            -webkit-transition: all .2s linear;
                            transition: all .2s linear;

                            a {
                                display: block;
                                width: 100%;
                                height: 100%;

                                img {
                                    height: 614px;
                                    width: 234px;
                                }
                            }
                        }
                    }
                }
                .span4{
                    width: 234px;
                    float: left;
                    margin-left: 14px;
                    min-height: 1px;
                    .brick-promo-list{
                        margin: 0 0 -14px -14px;
                        height: 614px;
                        padding: 0;
                        list-style-type: none;
                        li{
                            height: 300px;
                            padding: 0;
                            position: relative;
                            z-index: 1;
                            float: left;
                            width: 234px;
                            margin-left: 14px;
                            margin-bottom: 14px;
                            background: #fff;
                            -webkit-transition: all .2s linear;
                            transition: all .2s linear;
                            a{
                                display: block;
                                width: 100%;
                                height: 100%;
                                img{
                                    height: 300px;
                                    width: 234px;
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
    .clearfix:after, .clearfix:before {
        content: " ";
        display: table;
    }
}
</style>
