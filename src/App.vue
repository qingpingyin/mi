<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
  computed: {
  },
  async created() {

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
