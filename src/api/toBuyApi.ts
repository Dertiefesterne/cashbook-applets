import http from '@/utils/request'

export default {
    changeState(data: any) {
        return http.request({
            url: '/toBuy/changeState',
            method: 'POST',
            data
        })
    },
    add(data: any) {
        return http.request({
            url: '/toBuy/add',
            method: 'POST',
            data
        })
    },
    getList(data: any) {
        return http.request({
            url: '/toBuy/list',
            method: 'GET',
            data
        })
    },
    delete(data: any) {
        return http.request({
            url: '/toBuy/delete',
            method: 'POST',
            data
        })
    }, update(data: any) {
        return http.request({
            url: '/toBuy/update',
            method: 'POST',
            data
        })
    }
}