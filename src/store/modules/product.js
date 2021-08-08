import {getProductBySearch} from "@/api/product";

const state = {
    list:[],
    total:0
}

const mutations = {
    SET_LIST:(state,data)=>{
        state.list=data
    },
    SET_TOTAL:(state,data)=>{
        state.total=data
    }
}

const actions ={
    async setList({commit},params){
        try{
            const resp = await getProductBySearch(params)
            commit('SET_LIST',resp.data.list)
            commit('SET_TOTAL',resp.data.total)
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
