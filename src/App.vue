<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

import {getToken} from "./utils/token";
import {getUserInfo} from "./api/user";

export default {
  name: "App",
  components: {},
  computed: {
  },
  async mounted() {
    //判断用户是否登陆
      let token = getToken();
      if (token){
          //获取用户信息
          await this.$store.dispatch("user/getUserInfo")
          //获取用户购物车信息
          await this.$store.dispatch("cart/getCartList",{
            "uid":this.$store.getters.user.id
          })
      }

  }
};
</script>
<style lang="scss" >
@import "./assets/scss/normalize.scss";
@import "./assets/iconfont/iconfont.css";
body {
  font: 14px/1.5 Helvetica Neue, Helvetica, Arial, Microsoft Yahei,
    Hiragino Sans GB, Heiti SC, WenQuanYi Micro Hei, sans-serif;
}
#app {
  height: 100%;
}
</style>
