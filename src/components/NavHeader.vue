<template>
  <header class="header">
    <!-- 顶部导航条 -->
    <nav class="nav-topbar">
      <div class="container">
        <!-- 菜单导航 -->
        <ul class="topbar-menu">
          <li>
            <a href="javascript:;">小米商城</a>
          </li>
          <li>
            <a href="javascript:;">MIUI</a>
          </li>
          <li>
            <a href="javascript:;">IoT</a>
          </li>
          <li>
            <a href="javascript:;">云服务</a>
          </li>
          <li>
            <a href="javascript:;">天星数科</a>
          </li>
          <li>
            <a href="javascript:;">有品</a>
          </li>
          <li>
            <a href="javascript:;">小爱开放平台</a>
          </li>
          <li>
            <a href="javascript:;">企业团购</a>
          </li>
          <li>
            <a href="javascript:;">资质证照</a>
          </li>
          <li>
            <a href="javascript:;">协议规则</a>
          </li>

          <li>
            <a href="javascript:;">下载app</a>
          </li>
          <li>
            <a href="javascript:;">智能生活</a>
          <li>
            <a href="javascript:;">Select Location</a>
          </li>
        </ul>
        <!-- 用户信息 -->
        <div class="topbar-user">
          <!-- 已登录显示 -->
          <span class="is-login" v-if="user.nike_name">
            <a href="javascript:;" class="user">
              <span class="username">{{user.nike_name}}</span>
              <ul class="userzone">
                <li>
                  <a href="/#/self/userInfo">个人中心</a>
                </li>
                <li>
                  <a>评价晒单</a>
                </li>
                <li>
                   <router-link :to="{path:'/self/favourite',query:{id:user.id}}">
                      <a href="">我的喜欢</a>
                    </router-link>
                </li>
                <li>
                  <a href="javascript:;" @click="logout">退出登录</a>
                </li>
              </ul>
            </a>
            <router-link :to="{path:'/order/orderList',query:{id:user.id}}">
            <a href="javascript:void(0)" class="my-order" target="_blank">我的订单</a>
            </router-link>
          </span>
          <!-- 未登录显示 -->
          <span class="not-login" v-else>
            <a href="/#/login">登录</a>
            <a  @click="$emit('register-click')">注册</a>
          </span>
          <a class="msg">消息通知</a>
          <a href="/#/cart" class="my-cart" :class="{'has-goods':cart.count>0}">
            <span class="iconfont icon-Cart"></span>
            购物车({{cart.count}})
          </a>
        </div>
      </div>
    </nav>
    <!-- 头部导航 -->
    <div class="nav-header">
      <div class="container">
        <!-- logo -->
        <Logo/>
        <!-- 导航菜单 -->
        <ul class="header-menu">
          <li class="menu-item" v-for="(categoryItem,index) in NavCategoryList" :key="index">
                <span class="item-name" >{{categoryItem.categories_name}}</span>
            <ul class="children" v-if="categoryItem.parent_id > 0">
              <li   v-for="(item,i) in categoryItem.product" :key="i" class="product-item">
                <router-link :to="{name:'detail',query:{id:item.id}}">
                <a>
                  <img :src="item.img_url" class="product-img" />
                  <p class="product-name">{{item.title}}</p>
                  <p class="product-price">{{item.shop_price}}元起</p>
                </a>
                </router-link>
              </li>
            </ul>
          </li>
        </ul>
        <!-- 搜索框 -->
        <div class="header-search">
          <input type="text" class="search-input" v-model="where" :placeholder="placeholderValue"/>
            <a :href="'/#/cate?search='+this.where" @click="search" class="search-btn"></a>
        </div>
      </div>
    </div>
  </header>
</template>
<script>

import Logo from './Logo'
import {mapGetters} from 'vuex'
import {getCate} from "@/api/cate";
import {logout} from "@/api/user";

export default {
  name: "nav-header",
  data() {
    return {
      where:'',
      NavCategoryList: [],
      placeholderValue: "小米手机10"
    };
  },
  computed: {
    ...mapGetters([
            'user',
            'cart'
    ])
  },
  components:{
    Logo
  },
  async mounted() {
    const searchInput = document.querySelector(".search-input");
    const headerSearch = document.querySelector(".header-search");
    const searchBtn = document.querySelector(".search-btn");
    searchInput.addEventListener("focus", () => {
      headerSearch.classList.add("input-focus");
      searchBtn.style.borderLeftColor = "#f60";
    });
    searchInput.addEventListener("blur", () => {
      headerSearch.classList.remove("input-focus");
      searchBtn.style.borderLeftColor = "#e0e0e0";
    });
    await getCate({
      "is_nav":1
    }).then(resp=>{
      this.NavCategoryList =resp.data
    })
  },
  methods: {
    async logout() {
      await logout().then(()=>{
        this.$store.dispatch('user/logout')
        this.$store.dispatch('cart/initCart')
        this.$router.push({ path: this.redirect || '/index' })
      })
    },
    async search(){
      this.$store.dispatch("product/setList",{
        "page":1,
        "pageSize":20,
        "search":this.where
      })
    }
  }
};
</script>
<style lang="scss" >
@import "../assets/scss/config.scss";
.header {
  // nav-topbar
  .nav-topbar {
    width: 100%;
    height: 39px;
    background-color: $colorB;
    .container {
      width: 1226px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .topbar-menu {
        height: 39px;
        box-sizing: border-box;
        li {
          display: inline-block;
          line-height: 39px;
          margin-right: 17px;
          a {
            font-size: 12px;
            text-decoration: none;
            color: #b0b0b0;
            transition: color 0.5s;
            &:hover {
              color: #fff;
            }
          }
        }
      }
      .topbar-user {
        vertical-align: middle;
        a {
          font-size: 12px;
          text-decoration: none;
          color: #b0b0b0;
          transition: color 0.4s;
          &:hover {
            color: #fff;
          }
        }
        // 未登录时
        .not-login {
          a {
            padding: 0 4px;
            margin-right: 12px;
            cursor: pointer;
          }
        }
        // 已登录
        .is-login {
          .user,
          .my-order {
            margin-right: 22px;
          }
          .user {
            position: relative;
            padding: 12px 30px;
            color: #fff;
            .username::after {
              content: "";
              position: absolute;
              right: 15px;
              top: 50%;
              content: "";
              display: inline-block;
              width: 0;
              height: 0;
              border-style: solid;
              border-width: 4px;
              border-color: #fff transparent transparent transparent;
            }
            .userzone {
              // 隐藏状态
              height: 0;
              opacity: 0;
              padding: 0;
              position: absolute;
              left: 0;
              z-index: 999;
              background: #fff;
              width: 100%;
              box-shadow: 1px 7px 7px 0px #0000001a;
              transition: height 0.5s, padding 0.4s, opacity 0.2s;
              li {
                display: none;
                box-sizing: border-box;
                text-align: center;
                padding: 11px 8px;
                a {
                  color: #424242;
                }
              }
            }
            &:hover {
              color: $colorA;
              background-color: #fff;
              ::after {
                border-top-color: #f60;
              }
              .userzone {
                height: 170px;
                opacity: 1;
                padding: 10px 0;
                li {
                  display: block;
                  &:hover {
                    background-color: #f5f5f5;
                    a {
                      color: #f60;
                    }
                  }
                }
              }
            }
          }
        }
        .msg {
          margin-right: 18px;
        }
        .my-cart {
          position: relative;
          display: inline-block;
          text-align: center;
          width: 110px;
          height: 39px;
          line-height: 39px;
          background: #424242;
          &.has-goods{
            background-color: #f60;
            color: #fff;
          }
          &:hover {
            background-color: #fff;
            color: $colorA;
          }
        }
      }
    }
  }
  // nav-header
  .nav-header {
    background: #fff;
    .container {
      position: relative;
      width: 1226px;
      height: 112px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .header-logo {
        width: 55px;
        height: 55px;
        overflow: hidden;
        background-color: $colorA;
        .icon-logo {
          display: inline-block;
          width: 110px;
          height: 55px;
          transition: margin 0.4s;
          &:before {
            content: "";
            display: inline-block;
            width: 55px;
            height: 55px;
            background: url(../assets/img/navheader/mi-logo.png) no-repeat;
            background-size: 55px;
          }
          &:after {
            content: "";
            display: inline-block;
            width: 55px;
            height: 55px;
            background: url(../assets/img/navheader/mi-home.png) no-repeat;
            background-size: 55px;
          }
          &:hover {
            margin-left: -55px;
          }
        }
      }
      .header-menu {
        margin-left: 125px;
        .menu-item {
          display: inline-block;
          font-size: 16px;
          color: #333;
          margin-right: 20px;
          cursor: pointer;
          transition: color 0.4s;
          &:hover {
            color: $colorA;
            .children {
              opacity: 1;
              height: 220px;
              border-top: 1px solid #e5e5e5;
              .product-item a {
                display: block;
              }
            }
          }
          .item-name {
            display: inline-block;
            height: 112px;
            line-height: 112px;
          }
          .children {
            display: flex;
            position: absolute;
            left: 0;
            opacity: 0;
            top: 112px;
            z-index: 999;
            width: 1226px;
            height: 0px;
            background-color: #fff;
            box-shadow: 0px 7px 6px 0px rgba(0, 0, 0, 0.11);
            transition: all 0.3s ease-in-out;
            .product-item {
              width: 204px;
              box-sizing: border-box;
              a {
                display: none;
                text-align: center;
                font-size: 12px;
                text-decoration: none;
                .product-img {
                  margin-top: 18px;
                  width: auto;
                  height: 110px;
                }
                .product-name {
                  color: $colorB;
                  font-weight: bold;
                  padding: 28px 0 8px;
                }
                .product-price {
                  color: $colorA;
                }
              }
            }
          }
        }
      }
      .header-search {
        transition: border 0.5s;
        width: 317px;
        height: 50px;
        box-sizing: border-box;
        border: 1px solid #e0e0e0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .search-input {
          font-size: 12px;
          color: #333;
          flex: 1;
          padding: 2px 10px;
          border: none;
          outline: none;
        }
        .search-btn {
          transition: border 0.5s;
          display: inline-block;
          width: 55px;
          height: 50px;
          border-left: 1px solid #e0e0e0;
          background: url(../assets/img/navheader/icon-search.png) no-repeat;
          background-size: 18px;
          background-position: center;
        }
      }
      .input-focus {
        border-color: #f60;
      }
    }
  }
}
</style>
