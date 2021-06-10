import {login,getUserInfo} from "../../api/user";
import {getToken, setToken} from "../../utils/token";
import { Base64 } from 'js-base64'
const getDefaultState = () => {
    return {
        token: getToken(),
        id: 0,
        real_name: '',//真实姓名
        mobile: '',
        sub: '',
        email:'',
        nike_name:'',//昵称
        exp: 0 // 过期时间
    }
}

function parseToken(token) {
    if (!token) {
        return { id: 0 }
    }
    const jwt_arr = token.split('.')
    return JSON.parse(Base64.decode(jwt_arr[1]))
}

const state = getDefaultState()

const mutations = {
    RESET_STATE: (state) => {
        Object.assign(state, getDefaultState())
    },
    SET_TOKEN: (state, token) => {
        state.token = token
        Object.assign(state, parseToken(state.token))
    },
    SET_USER_INFO: (state, user) => {
        Object.assign(state, parseToken(state.token))
        state.id = user.id
        state.real_name = user.real_name
        state.email=user.email
        state.mobile=user.mobile
        state.nike_name=user.nike_name

    }
}

const actions = {
    //user login
    async login({commit,dispatch},userInfo){
        try {
            const data =await login(userInfo)
            commit('SET_TOKEN', data.data.access_token)
            setToken("access_token",data.data.access_token)
            await dispatch('getUserInfo')
            return  Promise.resolve()
        }catch (err) {
            return Promise.reject(err)
        }
    },
    async getUserInfo({ commit }) {
        try {
            const data  = await getUserInfo()
            console.log(data.data)
            commit('SET_USER_INFO', data.data)
            return Promise.resolve()
        } catch (err) {
            return Promise.reject(err)
        }
    },
}

export default {
    namespaced :true,
    state,
    mutations,
    actions
}
