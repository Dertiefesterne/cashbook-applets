"use strict";
const common_vendor = require("../../common/vendor.js");
const piniaStore_login = require("../../pinia-store/login.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const loginStore = piniaStore_login.useloginStore();
    const loginOut = () => {
      common_vendor.index.showModal({
        title: "\u63D0\u793A",
        content: "\u662F\u5426\u786E\u8BA4\u9000\u51FA\u767B\u5F55",
        success: function(res) {
          if (res.confirm) {
            loginStore.logout();
            common_vendor.index.navigateTo({
              url: "/pages/login/index"
            });
          } else if (res.cancel) {
            return;
          }
        }
      });
    };
    common_vendor.onMounted(() => {
      console.log("homestorage", common_vendor.index.getStorageSync("USER_INFORMATION"));
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(loginStore).userID != -1
      }, common_vendor.unref(loginStore).userID != -1 ? {
        b: common_vendor.o(loginOut)
      } : {});
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-276ac604"], ["__file", "D:/uni-css/src/pages/my/index.vue"]]);
wx.createPage(MiniProgramPage);
