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
    },
    updataClassify(data: any) {
        return http.request({
            url: '/userInfo/update/userClassify',
            method: 'POST',
            data
        })
    },
    updateUserMatter(data: any) {
        return http.request({
            url: '/userInfo/update/matterlabel',
            method: 'POST',
            data
        })
    },
    uploadImg(data: any) {
        return http.request({
            url: '/userInfo/userAvatar/upload',
            method: 'POST',
            data
        })
    },
    addBillCount(data: any) {
        return http.request({
            url: '/userInfo/update/bill_count',
            method: 'POST',
            data
        })
    },
    getClassifyList(data: any) {
        return http.request({
            url: '/userInfo/update/classifyList',
            method: 'GET',
            data
        })
    }

}