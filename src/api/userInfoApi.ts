import http from '@/utils/request'

export default {
    updateInfo(data: any) {
        return http.request({
            url: '/userInfo/update',
            method: 'POST',
            data
        })
    },
    updateUserClassify(data: any) {
        return http.request({
            url: '/userInfo/update/classify',
            method: 'POST',
            data
        })
    }
}