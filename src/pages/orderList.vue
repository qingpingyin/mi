<template>
  <div class="order-list">
    <order-header title="我的订单"></order-header>
    <main>
      <div class="order-container">
        <!-- loading -->
        <Loadding v-show="showLoading" />
        <!-- 订单列表 -->
        <transition name="fade">
          <div v-if="!showLoading">
            <div>
            <div class="title">
              <h2>所有订单</h2>
              <p>请谨防钓鱼链接或诈骗电话</p>
            </div>
            <div class="order-list-nav">全部有效订单</div>
            <div class="order-list-body" v-for="(item,index) in orderList" :key="index">
              <div class="order-status">
                <span class="status">待支付</span>
                <div class="order-info">
                  <div>
                    <span class="date">{{item.create_at | formatDate}}</span>
                    <span class="split">|</span>
                    <span class="receiver">{{user.nike_name}}</span>
                    <span class="split">|</span>
                    <span class="orderNo">订单号:{{item.id}}</span>
                    <span class="split">|</span>
                    <span>在线支付</span>
                  </div>
                  <div class="total-price">
                    应付金额:
                    <span class="num">{{item.payment}}</span>元
                  </div>
                </div>
              </div>
              <div class="order-product-list">
                <div class="order-actioins">
                  <div class="btn btn-primary">立即付款</div>
                  <div class="btn">订单详情</div>
                  <div class="btn">联系客服</div>
                </div>
                <ul>
                  <li class="product-item" v-for="(productItem,i) in item.order_item" :key="i">
                    <a href>
                      <img :src="productItem.img_url" alt />
                    </a>
                    <div>
                      <p class="product-name">
                        <a href>{{productItem.title}}</a>
                      </p>
                      <p class="price">{{productItem.price}}*{{productItem.num}}</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
         </div>
        </transition>
      </div>
      <div class="page-container" >
        <el-pagination background
                       :current-page="page"
                       :page-size="pageSize"
                       layout="prev, pager, next"
                       :total="total"
                       @current-change="handleCurrentChange" />
      </div>
    </main>
  </div>
</template>
<script>
import OrderHeader from "@/components/OrderHeader";
import {getOrderList} from "@/api/order";
import {formatDate} from "@/utils/format"
import {mapGetters} from 'vuex'
export default {
  name: "order-list",
  data() {
    return {
      uid:this.$route.query.id,
      orderList: [],
      showLoading: true,
      page:1,
      pageSize:5,
      total:0
    };
  },
  components: {
    OrderHeader,
  },
  computed:{
    ...mapGetters(['user'])
  },
  methods:{
    handleCurrentChange(val){
      this.page=val
      this.initOrderList()
    },
    async initOrderList(){
      await getOrderList({
        "uid":this.uid,
        "page":this.page,
        "pageSize":this.pageSize,
      }).then(resp=>{
        this.showLoading=false
        this.orderList=resp.data.list
        this.total=resp.data.count
      })
    }
  },
  filters:{
    formatDate(time) {
      // 秒处理为毫秒
      time = time * 1000
      let date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd hh:mm')
    }
  },
  async mounted() {
      this.initOrderList()
  }
};
</script>

<style lang="scss">
.order-list {
  main {
    background: #f5f5f5;
    padding: 30px 0;
    .order-container {
      box-sizing: border-box;
      width: 1226px;
      margin: 0 auto;
      padding: 36px 48px;
      background: #fff;
      .fade-enter-active,
      .fade-leave-active {
        transition: all 1s ease;
      }
      .fade-enter,
      .fade-leave-to {
        transform: translateY(100px);
        opacity: 0;
      }
      .title {
        width: 100%;
        display: flex;
        color: #757575;
        line-height: 68px;
        h2 {
          font-size: 30px;
        }
        p {
          font-size: 12px;
          margin-left: 10px;
        }
      }
    }
    .order-list-nav {
      color: #ff6700;
      font-size: 16px;
      padding: 18px 0;
    }
    .order-list-body {
      border: 1px solid #e0e0e0;
      margin-bottom: 20px;
      background: #fff;
      .order-status {
        padding: 25px 30px;
        border-bottom: 1px solid #e0e0e0;
        .status {
          font-size: 18px;
          color: #ff6700;
        }
        .order-info {
          display: flex;
          justify-content: space-between;
          font-size: 14px;
          color: #757575;
          .split {
            margin: 0 3.5px;
          }
          .total-price {
            line-height: 0;
            .num {
              font-size: 28px;
              color: #333;
            }
          }
        }
      }
      .order-product-list {
        position: relative;
        padding: 10px 30px;
        .order-actioins {
          position: absolute;
          right: 30px;
          top: 20px;
          .btn {
            margin-bottom: 10px;
            box-sizing: border-box;
            width: 120px;
            height: 30px;
            line-height: 30px;
            text-align: center;
            border: 1px solid #b0b0b0;
            font-size: 12px;
            color: #757575;
            background: #fff;
            &.btn-primary {
              color: #fff;
              border-color: #ff6700;
              background: #ff6700;
            }
          }
        }
        .product-item {
          display: flex;
          min-height: 100px;
          margin: 10px 0;
          font-size: 14px;
          color: #333;
          img {
            width: 80px;
            margin-right: 40px;
          }
          .product-name {
            padding: 15px 0 3px;
            a {
              color: #333;
            }
          }
          .product-price {
          }
        }
      }
    }
    .page-container{
      padding-top: 20px;
      text-align: center;
    }
  }
}
</style>
