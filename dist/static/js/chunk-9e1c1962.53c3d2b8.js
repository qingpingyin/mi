(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-9e1c1962"],{"47a2":function(t,e,s){"use strict";var a=s("fef1"),i=s.n(a);i.a},"51c7":function(t,e,s){"use strict";s.r(e);var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"register"},[s("div",{attrs:{id:"hidden"}},[s("div",{staticClass:"wrapper"},[s("div",{staticClass:"wrap"},[s("div",{staticClass:"layout"},[s("div",{staticClass:"n-frame device-frame reg_frame",attrs:{id:"main_container"}},[t._m(0),t._m(1),s("div",[s("div",{staticClass:"regbox"},[s("div",{staticClass:"phone_step"},[t._m(2),s("div",{staticClass:"listwrap_inside_panel c_b"},[s("div",{staticClass:"inputbg"},[s("label",{staticClass:"labelbox"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.phone,expression:"phone"}],attrs:{type:"tel",name:"phone",placeholder:"邮箱/手机号码/小米账号"},domProps:{value:t.phone},on:{blur:t.phone_blur,keypress:function(e){t.flag=!1},input:function(e){e.target.composing||(t.phone=e.target.value)}}})])]),t.flag?s("div",{staticClass:"err_tip"},[s("div",{staticClass:"dis_box"},[s("em",{staticClass:"icon_error"}),s("span",[t._v(t._s(t.err_message))])])]):t._e()]),s("div",{staticClass:"country_tips "},[t._v(" 用户输入手机号码时请正确选择区域前缀，如：台湾：+8869*******，香港：+8526******* ")]),s("div",{staticClass:"fixed_bot mar_phone_dis1"},[s("input",{staticClass:"btn332 btn_reg_1 submit_step",attrs:{type:"submit",value:"下一步"},on:{click:t.submitPhone}})])])])])])])])])]),s("Footer")],1)},i=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"external_logo_area"},[s("a",{staticClass:"mi_logo",attrs:{href:"javascript:void(0)"}})])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"title-item"},[s("h4",{staticClass:"title_big30"},[t._v("重置密码")])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("p",{staticClass:"tit_normal"},[t._v("请输入注册的邮箱地址、手机号码或小米账号:")])])}],n=s("1da1"),r=(s("96cf"),s("2d11")),o=s("c24f"),c={name:"register",data:function(){return{phone:"",flag:!1,err_message:"请输入手机号码"}},methods:{submitPhone:function(){var t=this;return Object(n["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!t.phone_blur()){e.next=3;break}return e.next=3,Object(o["h"])({mobile:t.phone}).then((function(e){t.display=!1,t.$router.push({name:"restPasswordSms",query:{phone:t.phone,code:e.data}})}));case 3:case"end":return e.stop()}}),e)})))()},phone_blur:function(){var t=/^1[3456789]{1}\d{9}$/;return""===this.phone?(this.flag=!0,!1):!!t.test(this.phone)||(this.err_message="手机号码格式错误",this.flag=!0,!1)}},computed:{},components:{Footer:r["a"]}},l=c,u=(s("47a2"),s("2877")),p=Object(u["a"])(l,a,i,!1,null,"888825e6",null);e["default"]=p.exports},fef1:function(t,e,s){}}]);