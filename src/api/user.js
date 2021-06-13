import request from "../utils/request"
/*
*
* use api
*
*/
export function login(data) {
    return request({
        url: '/login',
        method: 'post',
        data
    })
}

export function getUserInfo() {
    return request({
        url:"/userInfo",
        method:"get",
    })
}

export function logout(params) {
    return request({
        url:"/logout",
        method:"post",
        params
    })
}

