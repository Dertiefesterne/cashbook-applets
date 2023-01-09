"use strict";const e=require("../common/vendor.js"),t=new e.Request({baseURL:"http://localhost:8080",timeout:3e5,header:{"Content-Type":"application/json","x-token":e.index.getStorageSync("x-token")?e.index.getStorageSync("x-token"):""}});function n(t){switch(t.code){case 200:return t.data;case 400:case 401:return e.index.showToast({title:t.msg,icon:"none"}),Promise.reject(t);case 405:return Promise.reject(t);default:return t}}t.interceptors.request.use((t=>{const n=t.data;return t.header={"x-token":e.index.getStorageSync("x-token")?e.index.getStorageSync("x-token"):""},"GET"==t.method&&n&&(t.url=`${t.url}?${function(e){let t="";return Object.keys(e).forEach((n=>{t=""===t?`${n}=${e[n]}`:`${t}&${n}=${e[n]}`})),t}(n)}`),t}),(e=>Promise.resolve(e))),t.interceptors.response.use((t=>{switch(t.config.method){case"GET":default:return n(t.data);case"POST":return"/user/login"===t.config.url?(e.index.setStorageSync("x-token",t.data.data["x-token"]),n(t.data)):"/api/user_withdraw/apply"===t.config.url?n(t):n(t.data)}}),(e=>(console.log("响应拦截器错误捕获",e),Promise.resolve(e)))),exports.http=t;
