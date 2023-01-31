"use strict";
const common_vendor = require("../common/vendor.js");
const BASE_API = "http://localhost:8080";
const http = new common_vendor.Request({
  baseURL: BASE_API,
  timeout: 3e5,
  header: {
    "Content-Type": "application/json",
    "x-token": common_vendor.index.getStorageSync("x-token") ? common_vendor.index.getStorageSync("x-token") : ""
  }
});
http.interceptors.request.use(
  (config) => {
    const param = config.data;
    config.header = {
      "x-token": common_vendor.index.getStorageSync("x-token") ? common_vendor.index.getStorageSync("x-token") : ""
    };
    if (config.method == "GET")
      param && (config.url = `${config.url}?${getParams(param)}`);
    return config;
  },
  (error) => {
    return Promise.resolve(error);
  }
);
http.interceptors.response.use(
  (response) => {
    switch (response.config.method) {
      case "GET":
        return formatData(response.data);
      case "POST":
        if (response.config.url === "/user/login") {
          common_vendor.index.setStorageSync("x-token", response.data.data["x-token"]);
          return formatData(response.data);
        } else if (response.config.url === "/api/user_withdraw/apply") {
          return formatData(response);
        }
        return formatData(response.data);
      default:
        return formatData(response.data);
    }
  },
  (error) => {
    console.log("\u54CD\u5E94\u62E6\u622A\u5668\u9519\u8BEF\u6355\u83B7", error);
    return Promise.resolve(error);
  }
);
function formatData(data) {
  switch (data.statusCode) {
    case 200:
      return data;
    case 400:
      common_vendor.index.showToast({
        title: data.msg,
        icon: "none"
      });
      return Promise.reject(data);
    case 401:
      common_vendor.index.showToast({
        title: data.msg,
        icon: "none"
      });
      return Promise.reject(data);
    case 405:
      return Promise.reject(data);
    default:
      return data;
  }
}
function getParams(params) {
  let paramStr = "";
  Object.keys(params).forEach((item) => {
    if (paramStr === "") {
      paramStr = `${item}=${params[item]}`;
    } else {
      paramStr = `${paramStr}&${item}=${params[item]}`;
    }
  });
  return paramStr;
}
exports.http = http;
