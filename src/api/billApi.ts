
 import http from '@/utils/request'
 
 export function addBill(data:any) {
     return http.request({
         url: '/bill/add',
         method: 'POST',
		 data
     })
 }

 export function deleteBill(data:any) {
    return http.request({
        url: '/bill/delete',
        method: 'GET',
        data
    })
}
  
 export function updateBill(data:any) {
   return http.request({
     url: '/bill/update',
     method: 'POST',
     data
   })
 }
  
 export function getBillList(data:any) {
    return http.request({
      url: '/bill/billList',
      method: 'GET',
      data
    })
  }
  export function getBillDetial(data:any) {
    return http.request({
      url: '/bill/billDetial',
      method: 'GET',
      data
    })
  }

  export function getBillPage(data:any){
    return http.request({
        url: '/bill/billList/byPage',
        method: 'GET',
        data
      })
  }
  export function getBillGroup(data:any){
    return http.request({
        url: '/bill/billList/byGroup',
        method: 'GET',
        data
      })
  }

  export function getBillTime(data:any){
    return http.request({
        url: '/bill/billList/byTime',
        method: 'GET',
        data
      })
  }
  export function getBillCondition(data:any){
    return http.request({
        url: '/bill/billList/byCondition',
        method: 'GET',
        data
      })
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