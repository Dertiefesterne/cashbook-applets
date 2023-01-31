
 import http from '@/utils/request'
 import { Bill, groupBill,responseType } from '@/entity/bill'

 export default {

  analyzeBill(data:any) {
    return http.request({
        url: '/analyze/tokenizer/nlp',
        method: 'GET',
        data
    })
  },
 
 addBill(data:any) {
     return http.request({
         url: '/bill/add',
         method: 'POST',
		 data
     })
 },

 deleteBill(data:any) {
    return http.request({
        url: '/bill/delete',
        method: 'GET',
        data
    })
},
  
 updateBill(data:any) {
   return http.request({
     url: '/bill/update',
     method: 'POST',
     data
   })
 },
  getBillList(data:any) {
    return http.request({
      url: '/bill/billList',
      method: 'GET',
      data
    })
  },
  getBillSum(data:any){
    return http.request({
      url:'/bill/billList/billSum',
      method: 'GET',
      data
    })
  },
  getBillDetial(data:any) {
    return http.request({
      url: '/bill/billDetial',
      method: 'GET',
      data
    })
  },

  getBillPage(data:any){
    return http.request({
        url: '/bill/billList/byPage',
        method: 'GET',
        data
      })
  },
  getBillGroup(data:any){
    return http.request({
        url: '/bill/billList/byGroup',
        method: 'GET',
        data
      })
  },
   getBillTime(data:any){
    return http.request({
        url: '/bill/billList/byTime',
        method: 'GET',
        data
      })
  },
  getBillCondition(data:any){
    return http.request({
        url: '/bill/billList/byCondition',
        method: 'GET',
        data
      })
  },
  getBillChartData(data:any){
    return http.request({
      url:'/bill/billList/chartData',
      method: 'GET',
      data
    })
  }
}
 // 指定类型
 /*export function switchLanguage(data: types.languageTypes) {
     return http.request({
         url: '/api/common/language',
         method: 'POST',
         data
     })
 }*/
  
 // 类型
 /*interface userLoginTypes {
     address: string
     sign: string
     code?: string | boolean
 }
 interface languageTypes {
     language: string
 }
 export { userLoginTypes, languageTypes }*/