/**
 @name: 示例
 @description: 示例请求api
 @author: tjp
 @time: 2022-10-09 15:53:56
 */
 import http from '@/utils/request'
 
 export default {
 // GET
  getInformation(data:any) {
      return http.request({
          url: '/userInfo/info',
          method: 'GET',
      data
      })
  },

  getSegement(data:any) {
    return http.request({
        url: '/analyze/tokenizer/nlp',
        method: 'GET',
        data
    })
},
  isRegister(data:any){
    return http.request({
      url: '/user/userRegister',
      method: 'GET',
      data
    })
  },
login(data:any) {
   return http.request({
     url: '/user/checkUser',
     method: 'GET',
     data
   })
 },
  
 // POST
 register(data:any) {
    return http.request({
      url: '/user/add',
      method: 'POST',
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