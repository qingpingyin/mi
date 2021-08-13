<template>
  <div class="cart">
    <order-header title="我的购物车" :tipsShow="true"></order-header>
    <div class="main-wrapper">
      <!-- 购物车 -->
      <div class="cart-list" v-if=" cart.count> 0 ">
          <!-- 购物车列表头 -->
          <div class="cart-list-header">
              <div class="col col-check">
            <span class="btn-check" :class="{'checked':isAllCheck}"  @click="checkAll(isAllCheck)">
              <i class="iconfont icon-right"></i>
            </span> 全选
              </div>
              <div class="col col-img"></div>
              <div class="col col-name">商品名称</div>
              <div class="col col-price">单价</div>
              <div class="col col-amount">数量</div>
              <div class="col col-total">小计</div>
              <div class="col col-action">操作</div>
          </div>
          <!-- 购物车列表 -->
          <ul class="cart-list-body">
              <li class="cart-list-item"  v-for="(item,index) in this.$store.getters.cart.cart_item" :key="index">
                  <div class="col col-check">

              <span
                      class="btn-check"
                      :class="{'checked':item.product.is_checked }"
                      @click="checkChange(index,item.product.is_checked)"
              >
                <i class="iconfont icon-right"></i>
              </span>
                  </div>
                  <div class="col col-img">
                      <a href>
                          <img v-lazy="item.product.img_url"  alt />
                      </a>
                  </div>
                  <div class="col col-name">
                      <a href>{{item.product.title}}</a>
                  </div>
                  <div class="col col-price">{{item.product.shop_price}}</div>
                  <div class="col col-amount">
                      <div class="count">
                <span
                        class="btn minus"
                        @click="decreaseProduct(item.product.id,item.num,index)"
                >-</span>
                          <input
                                  class="num"
                                  v-model="item.num"
                                  @blur="changeQuantity(item.product.id,item.num,item.product.inventory,index)"
                          />
                          <span
                                  class="btn plus"
                                  @click="increaseProduct(item.product.id,item.num,item.product.inventory,index)"
                          >+</span>
                      </div>
                  </div>
                  <div class="col col-total">{{item.num * item.product.shop_price}}</div>
                  <div class="col col-action">
              <span class="btn-delete" @click="deleteProduct(item.product.id)">
                <i class="iconfont icon-close"></i>
              </span>
                  </div>
              </li>
          </ul>
          <!-- 购物车脚部 -->
          <div class="cart-bar">
              <a href class="backup-shopping">继续购物</a>
              <div class="count">
                  <div class="total-mount">
                      共
                      <span class="hignlight">{{cart.cart_item.length}}</span>件商品，已选择
                      <span class="hignlight">{{checkNum}}</span>件
                  </div>
                  <div class="total-price">
                      合计:
                      <span class="price">{{getTotalPrice}}</span>元
                  </div>
              </div>
              <router-link
                      class="btn-pay"
                      :class="{active:getTotalPrice > 0}"
                      to="/order/orderComfirm"
              >去结算</router-link>
          </div>
      </div>
      <!-- 购物车为空 -->
      <div class="cart-empty" v-show="cart.count==0">
        <h2>你的购物车还是空的!</h2>
        <div class="btn-tobuy" @click="$router.push({name:'index'})">马上去购物</div>
      </div>
    </div>
    <nav-footer></nav-footer>
  </div>
</template>
<script>
import OrderHeader from "@/components/OrderHeader";
import NavFooter from "@/components/NavFooter";
import {mapGetters} from 'vuex'
import {deleteCart, updateNum} from "@/api/cart";
import {Message} from "element-ui";
export default {
  name: "cart",
  components: {
    OrderHeader,
    NavFooter,
  },
  data() {
    return {
    };
  },
  methods: {
    // 修改单个商品数量
    async changeQuantity(productId, quantity, productStock,key) {
      await this.$store.dispatch("cart/updateCart",{ key: key, prop: "check", val: true })
        // 判断用户输入的是否为数字
      const NUM_REG = /^[0-9]+$/; //匹配正整数正则
      let isNumber = NUM_REG.test(quantity);
      if (isNumber) {
        if (quantity > productStock) {
            Message({
                message:"商品加入购物车数量超过限购数" ,
                type: 'error',
                duration: 5 * 1000
            })
          return;
        } else if (quantity <= 0) {
            Message({
                message:"商品加入购物车数量不能少于1件" ,
                type: 'error',
                duration: 5 * 1000
            })
          return;
        } else if (quantity === productStock) {
          return;
        }else{
            await updateNum(this.$store.getters.user.id,productId,quantity)
            await this.$store.dispatch("cart/updateCart",{ key: key, prop: "num", val: quantity })
        }
      } else {
          Message({
              message:"只能输入数字" ,
              type: 'error',
              duration: 5 * 1000
          })
        return;
      }

    },
    //   商品减一
      async decreaseProduct(productId, quantity,key) {
          await this.$store.dispatch("cart/updateCart",{ key: key, prop: "check", val: true })
          if (quantity === 1){
            return
          }else{
              await updateNum(this.$store.getters.user.id,productId,quantity-1)
              await this.$store.dispatch("cart/updateCart",{ key: key, prop: "num", val: quantity-1})
          }
      },
      // 商品加一
      async increaseProduct(productId, quantity, productStock,key) {
        await this.$store.dispatch("cart/updateCart",{ key: key, prop: "check", val: true })
          if (quantity === productStock) {
              Message({
                  message:"商品加入购物车数量超过限购数" ,
                  type: 'error',
                  duration: 5 * 1000
              })
              return;
          }else{

              await updateNum(this.$store.getters.user.id,productId,quantity+1)
              await this.$store.dispatch("cart/updateCart",{ key: key, prop: "num", val: quantity+1})
          }
      },
    // 删除商品
    async deleteProduct(pid) {
      await deleteCart(this.$store.getters.user.id,pid);
      await this.$store.dispatch("cart/deleteCart",pid)
      await this.$store.dispatch("cart/setCount")
    },
    // 全选按钮点击
    async checkAll(val) {
        if(!val){
            await this.$store.dispatch("cart/checkAll", true)
        }else {
            await this.$store.dispatch("cart/checkAll", false)
        }
        this.checkGoods()
    },
    async checkChange(key,val){
        if(!val){
            await this.$store.dispatch("cart/updateCart",{ key: key, prop: "check", val: true })
        }else {
            await this.$store.dispatch("cart/updateCart",{ key: key, prop: "check", val: false })
        }
        this.checkGoods()
    },
    async checkGoods(){
        let checkGoods = [];
        for (let i = 0; i < this.$store.getters.cart.cart_item.length; i++) {
            const temp = this.$store.getters.cart.cart_item[i];
            if (temp.product.is_checked) {
                checkGoods.push(temp)
            }
        }
        await this.$store.dispatch("cart/setCheckGoods",checkGoods)
      }
  },
  computed:{
      ...mapGetters(['cart']),
      isAllCheck(){
              for (let i = 0; i < this.$store.getters.cart.cart_item.length; i++) {
                  const temp = this.$store.getters.cart.cart_item[i];
                  // 只要有一个商品没有勾选立即return false;
                  if (!temp.product.is_checked) {
                      return false;
                  }
              }
              return true;
          },
      checkNum(){
          // 获取购物车勾选的商品数量
          let totalNum = 0;
          for (let i = 0; i < this.$store.getters.cart.cart_item.length; i++) {
              const temp = this.$store.getters.cart.cart_item[i];
              if (temp.product.is_checked) {
                  totalNum ++;
              }
          }
          return totalNum;
      },
      getTotalPrice () {
          // 购物车勾选的商品总价格
          let totalPrice = 0;
          for (let i = 0; i < this.$store.getters.cart.cart_item.length; i++) {
              const temp = this.$store.getters.cart.cart_item[i];
              if (temp.product.is_checked) {
                  totalPrice += temp.num * temp.product.shop_price
              }
          }
          return totalPrice;
      },
  },
  async mounted() {
       //获取用户购物车信息
      await this.$store.dispatch("cart/getCartList")
  }
};
</script>
<style lang="scss" scoped>
.cart {
  font-size: 14px;
  color: #424242;
  .main-wrapper {
    padding: 32px 0;
    background-color: #f5f5f5;
    .cart-list {
      width: 1226px;
      margin: 0 auto;
      /* 设置购物车每一列 */
      .col {
        display: flex;
        justify-content: center;
        align-items: center;
        &.col-check {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          width: 110px;
          .btn-check {
            box-sizing: border-box;
            display: inline-block;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 20px;
            height: 20px;
            text-align: center;
            background-color: #fff;
            border: 1px solid #e0e0e0;
            margin: 0 15px 0 24px;
            color: #fff;
            font-weight: bold;
            transition: color 0.3s;
            cursor: pointer;
            &:hover {
              color: #424242;
            }
            &.checked {
              background-color: #f60 !important;
              border: none !important;
              &:hover {
                color: #fff;
              }
            }
          }
        }
        &.col-img {
          width: 120px;
        }
        &.col-name {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          width: 380px;
        }
        &.col-price {
          width: 140px;
          padding-right: 18px;
        }
        &.col-amount {
          width: 150px;
        }
        &.col-total {
          width: 210px;
        }
        &.col-action {
          width: 80px;
        }
      }
      .cart-list-header {
        display: flex;
        height: 70px;
        background-color: #fff;
      }
      .cart-list-body {
        background-color: #fff;
        .cart-list-item {
          display: flex;
          height: 116px;
          border-top: 1px solid #e0e0e0;
          .col-img {
            img {
              width: 80px;
            }
          }
          .col-name {
            a {
              font-size: 18px;
              color: #442244;
            }
          }
          .col-price {
            font-size: 16px;
          }
          .col-amount {
            .count {
              display: flex;
              width: 148px;
              height: 38px;
              line-height: 38px;
              text-align: center;
              border: 1px solid #e0e0e0;
              background-color: #fff;
              .btn {
                display: inline-block;
                width: 38px;
                font-size: 20px;
                color: #757575;
                font-weight: bold;
                cursor: pointer;
                &:hover {
                  background-color: #e0e0e0;
                }
              }
              .num {
                text-align: center;
                outline: none;
                border: none;
                width: 72px;
                font-size: 16px;
                color: #424242;
              }
            }
          }
          .col-total {
            font-size: 16px;
            color: #ff6700;
          }
          .col-action {
            .btn-delete {
              width: 24px;
              height: 24px;
              border-radius: 50%;
              font-size: 20px;
              text-align: center;
              line-height: 24px;
              cursor: pointer;
              transition: background-color 0.4s;
              .icon-close {
                font-size: 20px;
              }
              &:hover {
                color: #fff;
                background-color: #e53935;
              }
            }
          }
        }
      }
      .cart-bar {
        display: flex;
        height: 50px;
        line-height: 50px;
        color: 14px;
        color: #757575;
        background-color: #fff;
        margin: 20px 0;
        .backup-shopping {
          color: #757575;
          margin-left: 32px;
          transition: color 0.5s;
          &:hover {
            color: #ff6700;
          }
        }
        .count {
          flex: 1;
          display: flex;
          justify-content: space-between;
          .total-mount {
            margin-left: 24px;
            padding-left: 8px;
            &::before {
              content: "|";
              color: #eee;
            }
            .hignlight {
              color: #ff6700;
            }
          }
          .total-price {
            color: #ff6700;
            .price {
              font-size: 30px;
            }
          }
        }
        .btn-pay {
          display: inline-block;
          text-align: center;
          width: 202px;
          background-color: #b0b0b0;
          font-size: 18px;
          color: #e0e0e0;
          margin-left: 50px;
          cursor: pointer;
          transition: background-color 0.4s;
          &.active {
            color: #fff;
            background-color: #ff6700;
            &:hover {
              background-color: #f25807;
              border-color: #f25807;
            }
          }
        }
      }
    }
    .cart-empty {
      width: 1226px;
      height: 273px;
      margin: 65px auto 130px;
      box-sizing: border-box;
      background: url("/imgs/cart-empty.png") no-repeat;
      padding-left: 550px;
      background-position-x: 130px;
      h2 {
        font-size: 36px;
        color: #b0b0b0;
        line-height: 145px;
        font-weight: bold;
      }
      .btn-tobuy {
        width: 172px;
        height: 50px;
        background-color: #ff6700;
        color: #fff;
        line-height: 50px;
        text-align: center;
        cursor: pointer;
      }
    }
  }
}
</style>
