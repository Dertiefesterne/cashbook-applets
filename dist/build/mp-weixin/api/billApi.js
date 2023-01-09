"use strict";const t=require("../utils/request.js");exports.addBill=function(e){return t.http.request({url:"/bill/add",method:"POST",data:e})};
