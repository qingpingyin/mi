import request from '@/utils/request'



export function createOrder(data) {
    return request({
        "url":"/createOrder",
        "method":"post",
        data
    })
}

export function getOrderList(params) {
    return request({
        "url":"/order",
        "method":"get",
        params
    })
}
export function getOrderById(params) {
    return request({
        "url":"/orderById",
        "method":"get",
        params
    })
}
export function getOrderCountBy(params) {
    return request({
        "url":"/getOrderCount",
        "method":"get",
        params
    })
}
