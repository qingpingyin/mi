<template>
  <div class="order-comfirm">
    <order-header title="确认订单"></order-header>
    <!-- 订单信息区 -->
    <div class="order-info-area">
      <div class="container">
        <div class="order-section" v-if="addressList.length >0 ||this.$store.getters.cart.checkGoods.length >0">
          <div class="order-content">
            <!-- 收获地址 -->
            <section class="address-wrapper">
              <h3>收货地址</h3>
              <div class="address">
                <div
                  v-for="(item,index) in addressList"
                  :key="index"
                  class="addr-box user-address"
                  :class="{selected:isSelected === index + 1}"
                  @click="chooseAddress(item,index)"
                >
                  <h4 class="consignee">{{item.receiver_name}}</h4>
                  <p class="phone">{{item.receiver_mobile}}</p>
                  <p>{{item.receiver_province}} {{item.receiver_city}} {{item.receiver_district}}</p>
                  <p>{{item.receiver_address}}</p>
                  <p class="footer" v-if="isSelected === index + 1">
                    <span class="iconfont icon-delete" @click="delModalShow = true"></span>
                    <span class="btn-modify" @click="modifyAddress(item)">修改</span>
                  </p>
                </div>
                <div class="addr-box add-address" @click="modalShow = true">
                  <span class="icon-plus">+</span>
                  <span class="text">添加新地址</span>
                </div>
              </div>
            </section>
            <!-- 商品及优惠 -->
            <section class="product-wrapper">
              <h3>商品及优惠券</h3>
              <ul class="product-list">
                <li class="product-item" v-for="(item,index) in cart.checkGoods" :key="index">
                  <div class="col col-img">
                    <img v-lazy="item.product.img_url" alt />
                  </div>
                  <div class="col col-name">
                    <a href>{{item.product.title}}</a>
                  </div>
                  <div class="col col-price">{{item.num}} x {{item.product.shop_price}}</div>
                  <div class="col col-total">{{item.num * item.product.shop_price}}元</div>
                </li>
              </ul>
            </section>
            <!-- 配送方式 -->
            <section class="dilivery-ways">
              <h3>配送方式</h3>
              <span class="ways">包邮</span>
            </section>
            <!-- 订单预览 -->
            <section class="order-views-wrapper">
              <div class="left"></div>
              <div class="right">
                <ul class="title-list">
                  <li>商品件数:</li>
                  <li>商品总价:</li>
                  <li>活动优惠:</li>
                  <li>优惠券抵扣:</li>
                  <li>运费:</li>
                  <li class="total-price-title">应付总额:</li>
                </ul>
                <ul class="nums-list">
                  <li>{{cart.checkGoods.length}}件</li>
                  <li>{{totalPrice}}元</li>
                  <li>-0元</li>
                  <li>-0元</li>
                  <li>0元</li>
                  <li>
                    <span class="total-price">{{totalPrice}}</span> 元
                  </li>
                </ul>
              </div>
            </section>
          </div>
          <!-- 底栏 -->
          <div class="order-footer" v-if="isSelected !== 0">
            <div class="reveiver-address">
              <p v-show="isSelected">{{userInfo}}</p>
              <p v-show="isSelected">
                {{address}}
              </p>
            </div>
            <div class="btn-group">
              <span class="btn btn-back" @click="$router.push({name:'cart'})">返回购物车</span>
              <span class="btn btn-pay" @click="toOrder">去下单</span>
            </div>
          </div>
        </div>
        <!-- loading -->
        <div class="spinner" v-show="showLoading">
          <div class="rect1"></div>
          <div class="rect2"></div>
          <div class="rect3"></div>
          <div class="rect4"></div>
          <div class="rect5"></div>
        </div>
      </div>
    </div>
    <!-- 增加地址modal -->
    <Modal
      :modalShow="modalShow"
      title="收货地址"
      @close="modalShow = false"
      @cancle="modalShow = false"
      @confirm="addNewAddress"
    >
      <template v-slot:dialog-body>
        <form class="new-address">
<!--           收货人姓名-->
          <div class="input-group">
            <div
              class="input-item"
              :class="{'input-focus':target == 1,'input-active':newAddress.receiver_name != ''}"
            >
              <label for="name">姓名</label>
              <input
                type="text"
                :placeholder="target == 1?'收货人姓名':''"
                id="name"
                @focus="target = 1"
                @blur="target = 0"
                v-model="newAddress.receiver_name"
              />
            </div>
<!--             收货人手机号-->
            <div
              class="input-item"
              :class="{'input-focus':target == 2,'input-active':newAddress.receiver_mobile != ''}"
            >
              <label for="phone">手机号</label>
              <input
                type="text"
                :placeholder="target == 2?'手机号':''"
                id="phone"
                @focus="target = 2"
                @blur="target = 0"
                v-model="newAddress.receiver_mobile"
              />
            </div>
          </div>
          <div class="aj-china-area">
            <span>省:</span>
            <select v-model="newAddress.receiver_province" @change="changeCity()" class="aj-select" >
              <option value="">请选择</option>
              <option v-for="(item, index) in optionData" :value="item.name" :key="index">{{item.name}}</option>
            </select>
            <span>市: </span>
            <select v-model="newAddress.receiver_city" @change="changeDistrict()" class="aj-select" >
              <option v-for="(item, index) in cityArr" :value="item.name" :key="index">{{item.name}}</option>
            </select>
            <span>区:</span>
            <select v-model="newAddress.receiver_district" class="aj-select"  >
              <option v-for="(item, index) in districtArr" :value="item.name" :key="index">{{item.name}}</option>
            </select>
          </div>

<!--          详细地址-->
          <div class="input-group textarea-wrapper">
            <div
              class="input-item"
              :class="{'input-focus':target == 3,'input-active':newAddress.receiver_address != ''}"
            >
              <label for="address-name">详细地址</label>
              <textarea
                :placeholder="target == 3?'详细地址，路名或街道名称，门牌号':''"
                id="address-name"
                @focus="target = 3"
                @blur="target = 0"
                v-model="newAddress.receiver_address"
              ></textarea>
            </div>
          </div>
        </form>
      </template>
    </Modal>
    <!-- 删除地址modal -->
    <Modal
      :modalShow="delModalShow"
      title="删除收货地址"
      @close="delModalShow = false"
      @cancle="delModalShow = false"
      @confirm="delAddress"
      msg="确定要删除这个地址吗？"
    ></Modal>
  </div>
</template>
<script>
import OrderHeader from "../components/OrderHeader";
import Modal from "../components/Modal";
import {mapGetters} from 'vuex';
import {createAddress, deleteAddress, getAddress} from "../api/address";
import optionData from '../assets/city'
import {createOrder} from "../api/order";
export default {
  name: "confirm-order",
  data() {
    return {
      optionData,
      cityArr:[],
      districtArr:[],
      showLoading: true, //是否显示加载动画
      delModalShow: false, //是否显示删除地址弹出框
      modalShow: false, //是否显示添加地址弹出框
      target: 0, // modal组件动态绑定样式
      addressList: [], //收货地址列表
      isSelected: 0, //选中的收获地址索引
      addressId: null, //地址的id
      selectedAddress: {}, //用户选择的地址
      newAddress: {
        receiver_name: "",
        receiver_mobile: "",
        receiver_province: "",
        receiver_city: "",
        receiver_district: "",
        receiver_address: ""
      },
    }
  },
  computed: {
    ...mapGetters(['cart']),
    address() {
      let {
        receiver_province,
        receiver_city,
        receiver_district,
        receiver_address
      } = this.selectedAddress;
      return `${receiver_province} ${receiver_city} ${receiver_district} ${receiver_address}`;
    },
    // 收货人信息
    userInfo() {
      let { receiver_name, receiver_mobile } = this.selectedAddress;
      return `${receiver_name} ${receiver_mobile}`;
    },
    totalPrice(){
      let totalPrice = 0;
      for (let i = 0; i <this.$store.getters.cart.checkGoods.length;i++) {
          const temp = this.$store.getters.cart.checkGoods[i];
          totalPrice += temp.num * temp.product.shop_price
      }
      return totalPrice
    },
  },
  methods: {
    async addNewAddress(){
      const resp = await createAddress(this.newAddress)
      if(resp.status==200){
        this.modalShow = false
        this.initAddress()
      }
    },
    changeCity() {
        var _this = this
        var  item =''
        _this.optionData.forEach(function (ele) {
          if(ele.name===_this.newAddress.receiver_province){
              item =ele
            }
        })
        this.cityArr = item.sub;//将选中的item的sub设置给cityArr 用于显示市
        this.newAddress.receiver_city = item.sub[0].name;//默认选择第一个市
    },
    changeDistrict(){
      var _this = this
      var  item =''
      _this.cityArr.forEach(function (ele) {

        if(ele.name===_this.newAddress.receiver_city){
          item =ele
        }
      })
      this.districtArr = item.sub;//将选中的item的sub设置给cityArr 用于显示市
      this.newAddress.receiver_district = item.sub[0].name;//默认选择第一个市
    },
    // 下单
   async  toOrder() {
     let arr = this.$store.getters.cart.checkGoods;
     let data = []
      arr.forEach(function (item) {
          data.push(item.product.id)
      })
     const resp = await createOrder({
        "uid":this.$store.getters.user.id,
        "address_id":this.addressId,
        "pids":data,
      })
     if(resp.status==200){
       this.$router.push("/order/orderSuccess")
     }
    },
    // 删除收货地址
    async delAddress() {
      const resp = await deleteAddress(this.addressId)
      if (resp.status==200){
        this.delModalShow=false;
        this.initAddress();
      }
    },
    // 修改收货地址
    modifyAddress(item) {
      this.modalShow = true;
      this.newAddress = item;
      // this.addressId=item.id;
    },
    // 选择收货地址
    chooseAddress(item, index) {
      this.isSelected = index + 1;
      this.selectedAddress = item;
      this.addressId=item.id;
    },
    async initAddress(){
      const  resp = await getAddress({
        "uid": this.$store.getters.user.id
      })
      this.addressList = resp.data
      if(resp.status==200){
        this.showLoading =false
      }
    }
  },
  components: {
    OrderHeader,
    Modal
  },
  mounted() {
    this.initAddress()
  }

};
</script>

<style lang="scss" >
.order-comfirm {
  color: #333;
  .order-info-area {
    padding: 40px 0 60px;
    background-color: #f5f5f5;
    .container {
      width: 1226px;
      margin: 0 auto;
      .order-section {
        .order-content {
          box-sizing: border-box;
          padding: 48px;
          background-color: #fff;
          h3 {
            font-size: 18px;
            line-height: 40px;
          }
          .address-wrapper {
            margin-bottom: 24px;
            .address {
              display: flex;
              flex-wrap: wrap;
              .addr-box {
                box-sizing: border-box;
                width: 268px;
                height: 178px;
                border: 1px solid #e0e0e0;
                cursor: pointer;
                &.user-address {
                  position: relative;
                  margin-right: 17px;
                  padding: 16px 24px;
                  &.selected {
                    border-color: #ff6700;
                  }
                  .consignee {
                    font-size: 18px;
                    color: #333;
                    margin-bottom: 10px;
                  }
                  p {
                    font-size: 14px;
                    color: #757575;
                    line-height: 22px;
                    &.footer {
                      position: absolute;
                      left: 24px;
                      bottom: 16px;
                      color: #ff6700;
                      font-size: 12px;
                      .icon-delete {
                        display: inline-block;
                        margin-right: 185px;
                        transition: transform 0.3;
                        &:hover {
                          transform: scale(1.2);
                        }
                      }
                    }
                  }
                }
                &.add-address {
                  display: flex;
                  flex-direction: column;
                  justify-content: center;
                  align-items: center;
                  color: #b0b0b0;
                  transition: color 0.4s, background-color 0.4s,
                    border-color 0.4s;
                  &:hover {
                    color: #757575;
                    border-color: #757575;
                    .icon-plus {
                      background-color: #757575;
                    }
                  }
                  .icon-plus {
                    width: 30px;
                    height: 30px;
                    line-height: 30px;
                    background: #e0e0e0;
                    border-radius: 50%;
                    text-align: center;
                    font-weight: bolder;
                    color: #fff;
                    font-size: 26px;
                    margin-bottom: 10px;
                  }
                }
              }
            }
          }
          .product-wrapper {
            .product-list {
              border-top: 1px solid #e0e0e0;
              border-bottom: 1px solid #e0e0e0;
              padding: 5px 0;
              .product-item {
                display: flex;
                height: 50px;
                font-size: 14px;
                color: #424242;
                .col {
                  display: flex;
                  justify-content: center;
                  align-items: center;
                }
                .col-img {
                  width: 30px;
                  margin-right: 10px;
                  img {
                    width: 30px;
                  }
                }
                .col-name {
                  justify-content: flex-start;
                  width: 650px;
                  a {
                    color: #424242;
                  }
                }
                .col-price {
                  width: 150px;
                }
                .col-total {
                  width: 230px;
                  color: #ff6700;
                  padding-left: 60px;
                }
              }
            }
          }
          .dilivery-ways {
            height: 90px;
            border-bottom: 1px solid #e0e0e0;
            display: flex;
            align-items: center;
            .ways {
              color: #ff6700;
              margin-left: 70px;
            }
          }
          .order-views-wrapper {
            padding-top: 30px;
            display: flex;
            justify-content: space-between;
            .right {
              display: flex;
              text-align: right;
              font-size: 14px;
              color: #757575;
              line-height: 2;
              .title-list {
                width: 126px;
                margin-right: 25px;
                & .total-price-title {
                  padding-top: 20px;
                }
              }
              .nums-list {
                color: #ff6700;
                & .total-price {
                  font-size: 30px;
                }
              }
            }
          }
        }
        .order-footer {
          display: flex;
          justify-content: space-between;
          border-top: 2px solid #f5f5f5;
          padding: 20px 48px;
          background-color: #fff;
          .reveiver-address {
            font-size: 14px;
            color: #424242;
            line-height: 21px;
            span {
              cursor: pointer;
              color: #ff6700;
            }
          }
          .btn {
            margin-left: 30px;
            display: inline-block;
            width: 160px;
            height: 40px;
            font-size: 14px;
            line-height: 40px;
            text-align: center;
            border: 1px solid #b0b0b0;
            cursor: pointer;
            &.btn-back {
              color: rgba(0, 0, 0, 0.27);
              border-color: rgba(0, 0, 0, 0.27);
            }
            &.btn-pay {
              background: #ff6700;
              border-color: #ff6700;
              color: #fff;
              transition: all 0.4s;
              &:hover {
                background-color: #f25807;
                border-color: #f25807;
              }
            }
          }
        }
      }
      // 加载动画
      .spinner {
        width: 1226px;
        margin: 17px auto;
        height: 25px;
        text-align: center;
        font-size: 10px;
      }

      .spinner > div {
        background-color: #ff6700;
        height: 100%;
        width: 4px;
        display: inline-block;
        margin: 2px;
        -webkit-animation: sk-stretchdelay 1.1s infinite ease-in-out;
        animation: sk-stretchdelay 1.1s infinite ease-in-out;
      }
      .spinner .rect2 {
        -webkit-animation-delay: -1.1s;
        animation-delay: -1.1s;
      }

      .spinner .rect3 {
        -webkit-animation-delay: -1s;
        animation-delay: -1s;
      }

      .spinner .rect4 {
        -webkit-animation-delay: -0.9s;
        animation-delay: -0.9s;
      }

      .spinner .rect5 {
        -webkit-animation-delay: -0.8s;
        animation-delay: -0.8s;
      }

      @-webkit-keyframes sk-stretchdelay {
        0%,
        40%,
        100% {
          -webkit-transform: scaleY(0.4);
        }
        20% {
          -webkit-transform: scaleY(1);
        }
      }

      @keyframes sk-stretchdelay {
        0%,
        40%,
        100% {
          transform: scaleY(0.4);
          -webkit-transform: scaleY(0.4);
        }
        20% {
          transform: scaleY(1);
          -webkit-transform: scaleY(1);
        }
      }
    }
  }
  .new-address {
    .input-group {
      display: flex;
      justify-content: space-between;
      margin-bottom: 14px;
      .input-item {
        position: relative;
        width: 283px;
        height: 40px;
        border: 1px solid #e0e0e0;
        box-sizing: border-box;
        font-size: 14px;
        color: #b0b0b0;
        transition: border-color 0.4s;
        &:hover {
          border-color: #b0b0b0;
        }
        label {
          position: absolute;
          font-size: 14px;
          left: 14px;
          top: 10px;
          z-index: 333;
          background-color: #fff;
          padding: 2px 2px;
          transition: all 0.4s;
        }
        input {
          position: absolute;
          left: 0;
          top: 50%;
          outline: none;
          border: none;
          padding-left: 16px;
          transform: translateY(-50%);
          transition: all 0.5s;
          &::placeholder {
            color: #b0b0b0;
          }
        }
        &.input-focus {
          border-color: #ff6700;
          label {
            font-size: 12px;
            top: -10px;
            color: #ff6700;
          }
        }
        &.input-active {
          label {
            font-size: 12px;
            top: -10px;
          }
        }
      }
    }
    .aj-china-area{
      color: #757575;
      .aj-select{
        width: 100px;
        margin: 0 15px;
        padding: 0 10px;
        border: 1px solid #e0e0e0;
        color: #757575;
        height: 30px;
        border-radius: 4px;
      }
    }
    .textarea-wrapper {
      margin-top: 8px;
      width: 100%;
      .input-item {
        width: 100%;
        height: 64px;
        label {
          top: 10px;
        }
        textarea {
          width: 100%;
          height: 100%;
          border: none;
          box-sizing: border-box;
          padding: 10px 16px;
          outline: none;
        }
      }
    }
    .tag-wrapper {
      width: 100%;
      .input-item {
        width: 100%;
        input {
          box-sizing: border-box;
          width: 100%;
        }
      }
    }
  }
}
</style>
