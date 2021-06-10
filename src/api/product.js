import request from '../utils/request'



export function getProduct(params){
    return request({
        "url":"/product",
        "method":'get',
        params
    })
}

export function getProductDetail(params) {
    return request({
        "url":"/productDetail",
        "method":'get',
        params
    })
}
