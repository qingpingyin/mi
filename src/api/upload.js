import request from '@/utils/request'


export function avatarUpload(data) {
    return request({
        'url':'/avatarUpload',
        'method':'post',
        'header':'multipart/form-data',
        data
    })
}
