<template>
  <div class="myMenu" id="myMenu">
    <ul class="clearfix">
      <li
        v-for="item in val"
        :key="item"
        :class="activeClass == item ? 'active':''"
        @mouseover="mouseover($event,item)"
      >
        <router-link to>
          <slot :name="item"></slot>
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: ["val"],
  name: "MyMenu",
  data() {
    return {
      activeClass: 1
    };
  },
  methods: {
    // 通过mouseover事件控制当前显示的商品分类，1为该类别的热门商品
    mouseover(e, val) {
      this.activeClass = val;
    }
  },
  watch: {
    // 向父组件传过去当前要显示的商品分类，从而更新商品列表
    activeClass: function(val) {
      this.$emit("fromChild", val);
    }
  }
};
</script>
<style scoped lang="scss">
  .myMenu{
    ul{
      li{
        float: left;
        margin-left: 20px;
        a{
          padding: 3px 0px;
          color: #333333;
        }
        &:hover a{
          color: #ff6700;
          border-bottom: 2px solid #ff6700;
        }
      }
        .active{
          float: left;
          margin-left: 20px;
          a{
            padding: 3px 0px;
            color: #ff6700;
            border-bottom: 2px solid #ff6700;
          }
          &:hover a{
            color: #ff6700;
            border-bottom: 2px solid #ff6700;
          }
        }

    }
    .clearfix:after {
      content: "";
      display: block;
      clear: both;
    }
  }
</style>
