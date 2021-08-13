import request from '@/utils/request'


export function createCollect(data) {
    return request({
        'url':'/collect',
        'method':'post',
        data
    })
}
export function collectList(params) {
    return request({
        "url":"/collect",
        "method":"get",
        params
    })
}
export function delCollect(uid,pid) {
    return request({
        "url":"/collect/"+uid+"/"+pid,
        "method":"delete"
    })
}
export function getCollectCount() {
    return request({
        "url":"/getCollectCount",
        "method":"get"
    })
}
