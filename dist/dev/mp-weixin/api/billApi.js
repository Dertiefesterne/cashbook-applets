"use strict";
const utils_request = require("../utils/request.js");
const billServer = {
  analyzeBill(data) {
    return utils_request.http.request({
      url: "/analyze/tokenizer/nlp",
      method: "GET",
      data
    });
  },
  addBill(data) {
    return utils_request.http.request({
      url: "/bill/add",
      method: "POST",
      data
    });
  },
  deleteBill(data) {
    return utils_request.http.request({
      url: "/bill/delete",
      method: "GET",
      data
    });
  },
  updateBill(data) {
    return utils_request.http.request({
      url: "/bill/update",
      method: "POST",
      data
    });
  },
  getBillList(data) {
    return utils_request.http.request({
      url: "/bill/billList",
      method: "GET",
      data
    });
  },
  getBillSum(data) {
    return utils_request.http.request({
      url: "/bill/billList/billSum",
      method: "GET",
      data
    });
  },
  getBillDetial(data) {
    return utils_request.http.request({
      url: "/bill/billDetial",
      method: "GET",
      data
    });
  },
  getBillPage(data) {
    return utils_request.http.request({
      url: "/bill/billList/byPage",
      method: "GET",
      data
    });
  },
  getBillGroup(data) {
    return utils_request.http.request({
      url: "/bill/billList/byGroup",
      method: "GET",
      data
    });
  },
  getBillTime(data) {
    return utils_request.http.request({
      url: "/bill/billList/byTime",
      method: "GET",
      data
    });
  },
  getBillCondition(data) {
    return utils_request.http.request({
      url: "/bill/billList/byCondition",
      method: "GET",
      data
    });
  }
};
exports.billServer = billServer;
