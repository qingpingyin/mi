(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2243db2f"],{6450:function(t,n,s){"use strict";var e=s("969b"),r=s.n(e);r.a},"969b":function(t,n,s){},f6b9:function(t,n,s){"use strict";s.r(n);var e=function(){var t=this,n=t.$createElement,s=t._self._c||n;return s("div",{staticClass:"buy-success"},[s("div",{staticClass:"container"},[s("div",{staticClass:"success-tips"},[s("img",{attrs:{src:"/imgs/slider/success.png",alt:""}}),s("div",[s("h3",[t._v("已成功加入购物车！")]),s("p",[t._v(t._s(t.productName))])])]),s("div",{staticClass:"btn-group"},[s("span",{staticClass:"btn btn-gray",on:{click:function(n){return t.$router.go(-1)}}},[t._v("返回上一级")]),s("router-link",{staticClass:"btn btn-primary",attrs:{tag:"span",to:"/cart"}},[t._v("去购物车结算")])],1)])])},r=[],a=s("1da1"),c=(s("96cf"),s("c4c8")),i={name:"buy-scuuess",data:function(){return{id:this.$route.query.id,productName:""}},mounted:function(){var t=this;return Object(a["a"])(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,Object(c["c"])({pid:t.id}).then((function(n){t.productName=n.data.title}));case 2:case"end":return n.stop()}}),n)})))()}},u=i,o=(s("6450"),s("2877")),d=Object(o["a"])(u,e,r,!1,null,null,null);n["default"]=d.exports}}]);