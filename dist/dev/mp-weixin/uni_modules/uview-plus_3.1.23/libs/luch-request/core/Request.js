"use strict";
const uni_modules_uviewPlus_3_1_23_libs_luchRequest_core_dispatchRequest = require("./dispatchRequest.js");
const uni_modules_uviewPlus_3_1_23_libs_luchRequest_core_InterceptorManager = require("./InterceptorManager.js");
const uni_modules_uviewPlus_3_1_23_libs_luchRequest_core_mergeConfig = require("./mergeConfig.js");
const uni_modules_uviewPlus_3_1_23_libs_luchRequest_core_defaults = require("./defaults.js");
const uni_modules_uviewPlus_3_1_23_libs_luchRequest_utils = require("../utils.js");
const uni_modules_uviewPlus_3_1_23_libs_luchRequest_utils_clone = require("../utils/clone.js");
class Request {
  constructor(arg = {}) {
    if (!uni_modules_uviewPlus_3_1_23_libs_luchRequest_utils.isPlainObject(arg)) {
      arg = {};
      console.warn("\u8BBE\u7F6E\u5168\u5C40\u53C2\u6570\u5FC5\u987B\u63A5\u6536\u4E00\u4E2AObject");
    }
    this.config = uni_modules_uviewPlus_3_1_23_libs_luchRequest_utils_clone.clone({ ...uni_modules_uviewPlus_3_1_23_libs_luchRequest_core_defaults.defaults, ...arg });
    this.interceptors = {
      request: new uni_modules_uviewPlus_3_1_23_libs_luchRequest_core_InterceptorManager.InterceptorManager(),
      response: new uni_modules_uviewPlus_3_1_23_libs_luchRequest_core_InterceptorManager.InterceptorManager()
    };
  }
  setConfig(f) {
    this.config = f(this.config);
  }
  middleware(config) {
    config = uni_modules_uviewPlus_3_1_23_libs_luchRequest_core_mergeConfig.mergeConfig(this.config, config);
    const chain = [uni_modules_uviewPlus_3_1_23_libs_luchRequest_core_dispatchRequest.dispatchRequest, void 0];
    let promise = Promise.resolve(config);
    this.interceptors.request.forEach((interceptor) => {
      chain.unshift(interceptor.fulfilled, interceptor.rejected);
    });
    this.interceptors.response.forEach((interceptor) => {
      chain.push(interceptor.fulfilled, interceptor.rejected);
    });
    while (chain.length) {
      promise = promise.then(chain.shift(), chain.shift());
    }
    return promise;
  }
  request(config = {}) {
    return this.middleware(config);
  }
  get(url, options = {}) {
    return this.middleware({
      url,
      method: "GET",
      ...options
    });
  }
  post(url, data, options = {}) {
    return this.middleware({
      url,
      data,
      method: "POST",
      ...options
    });
  }
  put(url, data, options = {}) {
    return this.middleware({
      url,
      data,
      method: "PUT",
      ...options
    });
  }
  delete(url, data, options = {}) {
    return this.middleware({
      url,
      data,
      method: "DELETE",
      ...options
    });
  }
  connect(url, data, options = {}) {
    return this.middleware({
      url,
      data,
      method: "CONNECT",
      ...options
    });
  }
  head(url, data, options = {}) {
    return this.middleware({
      url,
      data,
      method: "HEAD",
      ...options
    });
  }
  options(url, data, options = {}) {
    return this.middleware({
      url,
      data,
      method: "OPTIONS",
      ...options
    });
  }
  trace(url, data, options = {}) {
    return this.middleware({
      url,
      data,
      method: "TRACE",
      ...options
    });
  }
  upload(url, config = {}) {
    config.url = url;
    config.method = "UPLOAD";
    return this.middleware(config);
  }
  download(url, config = {}) {
    config.url = url;
    config.method = "DOWNLOAD";
    return this.middleware(config);
  }
}
exports.Request = Request;
