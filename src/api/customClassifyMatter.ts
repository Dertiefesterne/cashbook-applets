import http from '@/utils/request'

export default {
    get(data: any) {
        return http.request({
            url: '/userClassify/get/customClassifyMatter',
            method: 'GET',
            data
        })
    },
    getClassify(data: any) {
        return http.request({
            url: '/userClassify/getClassify/customClassifyMatter',
            method: 'GET',
            data
        })
    },
    update(data: any) {
        return http.request({
            url: '/userClassify/update/customClassifyMatter',
            method: 'POST',
            data
        })
    }
}