<template>
  <div class="product">
    <product-params @btn-click="buy" :productName="product.title"></product-params>
    <div class="product-detail">
      <div class="product-intro">
<!--        <h1 class="name">{{product.title}}</h1>-->
<!--        <p class="subtitle">{{product.description}}</p>-->
<!--        <p class="keyword"></p>-->
<!--        <p class="price" >{{product.shop_price}}元</p>-->
      </div>
        <div v-for="(item,i) in product.product_img" :key="i">
            <img :src="item.img_url" alt />
        </div>
        </div>
  </div>
</template>
<script>
import ProductParams from "../components/ProductParams";
import {getProductDetail} from "../api/product";

export default {
  name: "product",
  data() {
    return {
      id: this.$route.params.id,
      product: ""
    };
  },
  components: {
    ProductParams
  },
  methods: {
    buy() {
      this.$router.push(`/detail/${this.id}`);
    },
    async getProduct() {
        const product = await getProductDetail({
          "pid":this.id
        })
      this.product = product.data
    }
  },
  mounted() {
    this.getProduct();
  }
};
</script>
<style lang="scss" >
.product {
  img {
    width: 100%;
  }
  .product-detail {
    position: relative;
    .product-intro {
      position: absolute;
      width: 100%;
      text-align: center;
      .name {
        font-size: 80px;
        color: #333;
        margin: 30px 0;
      }
      .subtitle {
        font-size: 24px;
        margin: 20px 0;
      }
      .price {
        font-size: 38px;
      }
    }
  }
}
</style>
