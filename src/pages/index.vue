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
                      <a href="javascript:;">
                        <img v-lazy="j.image" alt />
                        <span>{{j.title}}</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <!-- 轮播图 -->
          <div class="swiper-box">
            <swiper :options="swiperOption">
              <swiper-slide v-for="(slide, index) in swiperSlides" :key="index">
                <a :href="'/#/detail/'+slide.pid" target="_blank">
                  <img :src="slide.img_url" alt />
                </a>
              </swiper-slide>
              <div class="swiper-pagination" slot="pagination"></div>
              <div class="swiper-btn swiper-button-prev" slot="button-prev"></div>
              <div class="swiper-btn swiper-button-next" slot="button-next"></div>
            </swiper>
          </div>
        </div>
        <!-- 促销商品 -->
        <ul class="product-promo-list">
          <li v-for="(item,index) in promoList" :key="index">
            <a :href="'/#/detail/'+ item.id" target="_blank">
              <img v-lazy="item.img" alt />
            </a>
          </li>
        </ul>
        <!-- 发布会活动海报 -->
        <a href="javascript:;" class="activity-link">
          <img v-lazy="'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/431e5fd6bfd1b67d096928248be18303.jpg?thumb=1&w=1533&h=150&f=webp&q=90'" alt />
        </a>
      </div>
    </section>
    <!-- 商品列表部分 -->
    <section class="product-list-area">
      <div class="container">
        <div class="product-list-wrapper">
          <!-- 分类标题 -->
          <h3 class="category-title">手机</h3>
          <span class="more">查看更多</span>
          <!-- 容器 -->
          <section>
            <!-- 主推产品 -->
            <div class="import-product">
              <a href="javascript:;">
                <img v-lazy="'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/c583f2edc613f1be20fa415910b13ce3.jpg?thumb=1&w=293&h=768&f=webp&q=90'" alt />
              </a>
            </div>
            <!-- 产品列表 -->
            <div class="product-list">
              <ul >
                <li v-for="(item,index) in phoneList" :key="index">
                  <a :href="'/#/detail/'+item.id" target="_blank">
                    <img v-lazy="item.img_url" alt />
                    <p class="product-name">{{item.title}}</p>
                    <p class="product-subtitle">{{item.description}}</p>
                    <div class="price">
                      <p class="product-price">{{item.shop_price}}元起</p>
                      <p class="product-price-market" v-if="item.market_price != 0">
                        <del>
                          {{item.market_price}}元
                        </del>
                      </p>
                    </div>
                  </a>
                </li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    </section>


  </div>
</template>
<script>
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import {initCarousel} from "../api/carousel";
import {getCate} from "../api/cate";
import {getProduct} from "../api/product";
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
          img: "/imgs/promo/promo-1.png"
        },
        {
          id: "45",
          img: "/imgs/promo/promo-2.png"
        },
        {
          id: "46",
          img: "/imgs/promo/promo-3.png"
        },
        {
          id: "34",
          img: "/imgs/promo/promo-4.png"
        }
      ],
      //   手机商品列表
      phoneList: [],
      //categories
      categories: []
    };
  },
   async mounted() {

     //轮播图
     const data = await initCarousel()
     this.swiperSlides =data.data
     //类别
     const categories = await getCate({
       //0 :递归查询 1 :header-nav
       "is_nav":0
     })
     this.categories =categories.data
     //促销列表

     //手机列表
     const phoneList = await getProduct({
       "page":1,
       "pageSize":8,
       "cid":1
     })
     this.phoneList = phoneList.data

  },
  components: {
    swiper,
    swiperSlide
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
                    padding: 10px 0px;
                    display: inline-block;
                    text-decoration: none;
                    color: #333;
                    font-size: 14px;
                    img {
                      width:  40px;
                      height: 40px;
                      margin: 0 20px 0 12px;
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
      .product-promo-list {
        margin-top: 14px;
        display: flex;
        justify-content: space-between;
        li {
          a {
            display: inline-block;
            position: relative;
            background-color: #f5f5f5;
            width: 296px;
            height: 167px;
            img[lazy="loading"] {
              position: absolute;
              left: 50%;
              top: 50%;
              transform: translate(-50%, -50%);
              width: 140px;
              height: 140px;
            }
            img[lazy="loaded"] {
              width: 100%;
              height: 100%;
            }
          }
        }
      }
      // 活动
      .activity-link {
        display: inline-block;
        background-color: #f5f5f5;
        width: 100%;
        height: 120px;
        margin: 31px 0 50px;
        position: relative;
        img[lazy="loading"] {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 140px;
          height: 140px;
        }
        img[lazy="loaded"] {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  //   产品部分
  .product-list-area {
    background-color: #f5f5f5;
    .container {
      width: 1226px;
      margin: 0 auto;
      .product-list-wrapper {
        .category-title {
          font-size: 22px;
          color: #333;
          padding: 30px 0 20px;
        }
        .more {
        }
        section {
          display: flex;
          justify-content: space-between;
          //   添加过渡
          a {
            transition: all 0.3s;
            &:hover {
              transform: translateY(-3px);
              box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
            }
          }
          // 重磅产品
          .import-product {
            margin-right: 16px;
            a {
              display: inline-block;
              width: 224px;
              height: 619px;
              background-color: #fff;
              position: relative;
              img[lazy="loading"] {
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
                width: 140px;
                height: 140x;
              }
              img[lazy="loaded"] {
                /*your style here*/
                width: 224px;
                height: 619px;
              }
            }
          }
          // 产品列表
          .product-list {
            ul {
              li {
                display: inline-block;
                margin-right: 14px;
                margin-bottom: 14px;
                &:nth-last-child(1) {
                  margin-right: 0;
                }
                a {
                  box-sizing: border-box;
                  display: inline-block;
                  width: 232px;
                  height: 302px;
                  background-color: #fff;
                  display: flex;
                  flex-direction: column;
                  justify-content: center;
                  align-items: center;
                  padding: 50px 0 30px;
                  text-decoration: none;
                  img {
                    width: auto;
                    height: 140px;
                    padding: 0 0 10px;
                  }
                  .product-name {
                    font-size: 14px;
                    color: #333;
                    text-align: center;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    overflow: hidden;
                    /*font-weight: bold;*/
                    padding: 10px 0;
                  }
                  .product-subtitle {
                    font-size: 12px;
                    color: #999;
                    /*padding: 0 0 20px;*/
                  }
                  .price {
                      p{
                        display: inline-block;
                        margin:0px 10px 0px  10px;
                        font-size: 14px;
                      }
                  }
                  .product-price {
                    color: #f60;
                  }
                  .product-price-market{
                      color: #999;
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
