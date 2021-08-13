import axios from "axios";
import store from "@/store";
import {getToken} from "./token";
import {Message,MessageBox} from "element-ui";
import {baseApi} from '@/config'


const service =axios.create({
    baseURL: baseApi,
    timeout:1000*5
})

const reqList =[];
const cancelArr =[];

const stopRepeatRequest =(url,{data,params,intercept,method})=> {
    if(reqList.length>1){
        if(intercept !==2){
            if(intercept===1){
                for (let i = reqList.length-2; i >= 0 ; i--) {
                    if(reqList[i].url===`${url}`){
                        cancelArr[i]();
                        cancelArr.splice(i,1);
                        reqList.splice(i,1);
                    }
                }
            }else {
                const last = reqList.length-1;
                for (let i = reqList.length-2; i >= 0 ; i--) {
                    if (reqList[i].url === `${url}` && reqList[i].data === JSON.stringify(data) && method === 'post') {
                        console.log('post', reqList[i].url);
                        cancelArr[last]();
                        cancelArr.pop();
                        reqList.pop();
                        break;
                    } else if (reqList[i].url === `${url}` && reqList[i].params === JSON.stringify(params) && method === 'get') {
                        console.log('get', reqList[i].url);
                        cancelArr[last]();
                        cancelArr.pop();
                        reqList.pop();
                    }

                }
            }
        }
    }
}
const clearRequest = function ({ url, data }) {
    for (let i = reqList.length - 1; i >= 0; i--) {
        if (reqList[i].url === url && reqList[i].data === data) {
            reqList.splice(i, 1);
            cancelArr.splice(i, 1);
            break; // 每个request只清除自己，所以 break
        }
    }
};

//请求拦截
service.interceptors.request.use(config=>{

    const token = getToken("access_token");
    if(token){
        config.headers["Authorization"]=token;
    }
    config['cancelToken'] = new axios.CancelToken(c => {
        cancelArr.push(c);
    });
    let url = config.url.startsWith('/') ? '' : '/';
    url += config.url;
    reqList.push({
        url: `${url}`,
        data: JSON.stringify(config.data),
        params: config.params,
        method: config.method
    });
    stopRepeatRequest(url, config);
    return config
},error => {
    return Promise.reject(error)
})
//响应拦截
service.interceptors.response.use(
    response => {
        // 增加延迟，相同请求不得在短时间内重复发送
        setTimeout(() => {
            clearRequest(response.config);
        }, 1000);
        const  res  = response.data
        // 正常情况
        if (res.status !== 200) {
            Message({
                message: res.msg,
                type: 'error',
                duration: 5 * 1000
            })
            return Promise.reject(res.msg)
        }
        return res
    },
    async error => {
        const  resp  = error.response
        switch (resp.status) {
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
                 await MessageBox.confirm("请登陆后再操作", '权限不足', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                })
                await store.dispatch('user/resetToken')
                location.reload()
                break
            case 400:
                Message({
                    message: resp.data.msg,
                    type: 'error',
                    duration: 5 * 1000
                })
                break
            default:
                Message({
                    message: '未知错误',
                    type: 'error',
                    duration: 5 * 1000
                })
                break
        }
        if (axios.isCancel(error)) {
            console.log('打断请求成功', error);
        }
        return Promise.reject(error)
    }
)
export default service
