(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-403f00f0"],{3185:function(t,e,n){"use strict";n.r(e);var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"uc-content"},[t._m(0),n("div",{staticClass:"list"},[n("div",{staticClass:"user-favourite"},[n("ul",{staticClass:"goods-list clearfix"},t._l(t.collectList,(function(e,r){return n("li",{key:r,staticClass:"goods-list-item"},[n("div",{staticClass:"figure-img"},[n("router-link",{attrs:{to:{name:"detail",query:{id:e.id}}}},[n("a",[n("img",{attrs:{src:e.product_img[0].img_url}})])])],1),n("h3",{staticClass:"goods-title"},[n("a",[t._v(t._s(e.title))])]),n("p",{staticClass:"price"},[n("span",[t._v(t._s(e.shop_price)+"元 "),e.market_price>0?n("del",[t._v(t._s(e.market_price))]):t._e()])]),n("div",{staticClass:"actions"},[n("a",{staticClass:"btn-del",on:{click:function(n){return t.delCollect(e.id)}}},[t._v(" 删除 ")]),n("router-link",{attrs:{to:{name:"detail",query:{id:e.id}}}},[n("a",{staticClass:"btn-detail "},[t._v("查看详情")])])],1)])})),0)])])])},i=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"title"},[n("h1",[t._v("喜欢的商品")])])}],c=n("1da1"),a=(n("96cf"),n("960d")),s={name:"Favourite",data:function(){return{uid:this.$route.query.id,collectList:[]}},methods:{delCollect:function(t){var e=this;return Object(c["a"])(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,Object(a["c"])(e.uid,t).then((function(){e.initCollect()}));case 2:case"end":return n.stop()}}),n)})))()},initCollect:function(){var t=this;return Object(c["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Object(a["a"])({uid:t.uid}).then((function(e){t.collectList=e.data}));case 2:case"end":return e.stop()}}),e)})))()}},created:function(){var t=this;return Object(c["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:t.initCollect();case 1:case"end":return e.stop()}}),e)})))()}},u=s,o=(n("b7f3"),n("2877")),l=Object(o["a"])(u,r,i,!1,null,"21406891",null);e["default"]=l.exports},"440b":function(t,e,n){},"960d":function(t,e,n){"use strict";n.d(e,"b",(function(){return i})),n.d(e,"a",(function(){return c})),n.d(e,"c",(function(){return a})),n.d(e,"d",(function(){return s}));var r=n("b775");function i(t){return Object(r["a"])({url:"/collect",method:"post",data:t})}function c(t){return Object(r["a"])({url:"/collect",method:"get",params:t})}function a(t,e){return Object(r["a"])({url:"/collect/"+t+"/"+e,method:"delete"})}function s(){return Object(r["a"])({url:"/getCollectCount",method:"get"})}},b7f3:function(t,e,n){"use strict";var r=n("440b"),i=n.n(r);i.a}}]);