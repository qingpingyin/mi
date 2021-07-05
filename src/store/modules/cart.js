import {getCartList} from "../../api/cart";

const state = {
        id:'',
        cart_item:[],
        uid:'',
        isCheckAll:'',
        checkGoods:[],
        count:'',
}
const mutations = {
    SET_COUNT:(state)=>{
        // 购物车商品总数量
        let totalNum = 0;
        for (let i = 0; i < state.cart_item.length; i++) {
            totalNum ++;
        }
        state.count=totalNum
    },
    SET_CART: (state, data) => {
        Object.assign(state,data)
    },
    SET_CHECK_GOODS:(state,data) =>{
        state.checkGoods = data
    },
    CHECK_ALL:(state,data) =>{
        for (let i = 0; i < state.cart_item.length; i++) {
            state.cart_item[i].product.is_checked = data
        }
    },
    UPDATE_CART:(state,payload) => {
          // 更新购物车
          if(payload.prop=="check"){
              state.cart_item[payload.key].product.is_checked=payload.val;
          }
        // 用于购物车点击勾选及加减商品数量
        if (payload.prop == "num") {
            // 判断效果的商品数量是否大于限购数量或小于1
            if (state.cart_item[payload.key].product.inventory < payload.val) {
                return;
            }
            if (payload.val < 1) {
                return;
            }
        }
          state.cart_item[payload.key][payload.prop] = payload.val;
    },
    DELETE_CART:(state,id) => {
        // 根据购物车id删除购物车商品
        for (let i = 0; i < state.cart_item.length; i++) {
            const temp = state.cart_item[i];
            if (temp.product.id == id) {
                state.cart_item.splice(i, 1);
            }
        }
    }
}

const actions = {
    async getCartList({ commit },params){
        try{
            const data = await getCartList(params)
            commit('SET_CART',data.data)
            return Promise.resolve()
        }catch (err) {
            return Promise.reject(err)
        }
    },
    async checkAll({commit},data){
        commit("CHECK_ALL",data)
    },
    async updateCart ({ commit }, payload) {
        commit('UPDATE_CART', payload);
    },
    async setCheckGoods({commit},data) {
        commit('SET_CHECK_GOODS',data)
    },
    async deleteCart({commit},id){
        commit('DELETE_CART',id)
    },
    async setCount({commit}){
        commit('SET_COUNT')
    }
}
export default {
    namespaced :true,
    state,
    mutations,
    actions
}
