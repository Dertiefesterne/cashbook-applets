"use strict";
const common_vendor = require("../common/vendor.js");
const useloginStore = common_vendor.defineStore({
  id: "login",
  state: () => {
    return {
      info: {},
      userID: common_vendor.index.getStorageSync("userID") ? common_vendor.index.getStorageSync("userID") : -1
    };
  },
  actions: {
    login(userID) {
      common_vendor.index.setStorageSync("userID", userID);
      this.userID = userID;
    },
    logout() {
      common_vendor.index.clearStorage();
      this.userID = -1;
    }
  }
});
exports.useloginStore = useloginStore;
