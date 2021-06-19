import {getCartList} from "../../api/cart";

const state = {
        id:'',
        cart_item:[],
        total_price:'',
        uid:''
}

const mutations = {
    SET_CART: (state, data) => {
        Object.assign(state,data)
    },
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
    }
}
export default {
    namespaced :true,
    state,
    mutations,
    actions
}
