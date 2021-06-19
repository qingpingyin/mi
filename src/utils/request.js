import axios from "axios";
import {getToken} from "./token";
import {Message,MessageBox} from "element-ui";


const service =axios.create({
    baseURL:"/",
    timeout:1000*5
})

//请求拦截
service.interceptors.request.use(config=>{
    const token = getToken("access_token");
    if(token){
        config.headers["Authorization"]=token;
    }
    return config
})
//响应拦截
service.interceptors.response.use(
    response => {
        const { data } = response
        // 正常情况
        if (data.status !== 200) {
            Message({
                message: data.msg,
                type: 'error',
                duration: 5 * 1000
            })
            return Promise.reject(data.msg)
        }
        return data
    },
    async error => {
        const { status, data } = error.response
        switch (status) {
            case 500:
                Message({
                    message: '系统错误',
                    type: 'error',
                    duration: 5 * 1000
                })
                break
            case 403:
                Message({
                    message: '没有权限',
                    type: 'error',
                    duration: 5 * 1000
                })
                break
            case 401:
                 await MessageBox.confirm(data.msg, '登录过期，请重新登录', {
                    confirmButtonText: '重新登录',
                    cancelButtonText: '取消',
                    type: 'warning'
                })
                await this.$store.dispatch('user/resetToken')
                location.reload()
                break
            default:
                Message({
                    message: '未知错误',
                    type: 'error',
                    duration: 5 * 1000
                })
                break
        }
        return Promise.reject(error)
    }
)
export default service
