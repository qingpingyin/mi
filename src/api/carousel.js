import request from '@/utils/request'


export function initCarousel() {
    return request({
        "url":"/carousel",
        "method":"get"
    })
}
