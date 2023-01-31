"use strict";
const utils_request = require("../utils/request.js");
const userServer = {
  getInformation(data) {
    return utils_request.http.request({
      url: "/user/deleteUser",
      method: "GET",
      data
    });
  },
  getSegement(data) {
    return utils_request.http.request({
      url: "/analyze/tokenizer/nlp",
      method: "GET",
      data
    });
  },
  isRegister(data) {
    return utils_request.http.request({
      url: "/user/userRegister",
      method: "GET",
      data
    });
  },
  login(data) {
    return utils_request.http.request({
      url: "/user/checkUser",
      method: "GET",
      data
    });
  },
  register(data) {
    return utils_request.http.request({
      url: "/user/add",
      method: "POST",
      data
    });
  }
};
exports.userServer = userServer;
