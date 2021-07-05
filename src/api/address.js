import request from '../utils/request'



export function getAddress(params) {
    return request({
        "url":"/address",
        "method":"get",
        params
    })
}

export function createAddress(data) {
    return request({
        "url":"/address",
        "method":"post",
    })
}

export function deleteAddress(params) {
    return request({
        "url":"/address/"+params,
        "method":"delete",
        params
    })
}
