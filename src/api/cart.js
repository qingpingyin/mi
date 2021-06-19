import Request from '../utils/request'
import request from "../utils/request";



export function getCartList(params){
    return Request({
        url:"/cartList",
        method:'get',
        params
    })
}

export function addCart(data) {
    return request({
        url: '/addCart',
        method: 'post',
        data
    })
}

export function updateNum(uid,pid,num) {
    return request({
        url:'/updateCartNum/'+uid+"/"+pid+'/'+num,
        method:'put'
    })
}

export function deleteCart(uid,pid) {
    return request({
        url:'/deleteCart/'+uid+"/"+pid,
        method:'delete'
    })
}
