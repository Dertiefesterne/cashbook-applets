"use strict";
const common_vendor = require("../../common/vendor.js");
const api_userApi = require("../../api/userApi.js");
const piniaStore_login = require("../../pinia-store/login.js");
require("../../utils/request.js");
if (!Array) {
  const _easycom_u_icon2 = common_vendor.resolveComponent("u-icon");
  _easycom_u_icon2();
}
const _easycom_u_icon = () => "../../uni_modules/uview-plus_3.1.23/components/u-icon/u-icon.js";
if (!Math) {
  (_easycom_u_icon + BillTypeIconVue)();
}
const BillTypeIconVue = () => "../../components/billTypeIcon.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const loginStore = piniaStore_login.useloginStore();
    common_vendor.ref();
    const userName = common_vendor.ref(""), passWord = common_vendor.ref(""), noRegister = common_vendor.ref(false);
    const confirmLogin = async () => {
      if (userName.value == "") {
        common_vendor.index.showToast({
          title: "\u8BF7\u8F93\u5165\u8D26\u53F7",
          icon: "none",
          duration: 1e3
        });
        return;
      }
      if (passWord.value == "") {
        common_vendor.index.showToast({
          title: "\u8BF7\u8F93\u5165\u5BC6\u7801",
          icon: "none",
          duration: 1e3
        });
        return;
      }
      const res = await api_userApi.userServer.login({ userName: userName.value, passWord: passWord.value });
      if (res.data > 0) {
        common_vendor.index.showToast({
          title: "\u767B\u5F55\u6210\u529F",
          icon: "success",
          duration: 1e3
        });
        let userID = res.data;
        loginStore.login(userID);
        common_vendor.index.switchTab({
          url: "/pages/index/index"
        });
      } else if (res.data == 0) {
        common_vendor.index.showToast({
          title: "\u5BC6\u7801\u9519\u8BEF\uFF0C\u8BF7\u91CD\u65B0\u8F93\u5165",
          icon: "none",
          duration: 1e3
        });
      } else {
        common_vendor.index.showToast({
          title: "\u6B64\u8D26\u53F7\u672A\u6CE8\u518C",
          icon: "none",
          duration: 1e3
        });
      }
    };
    const registerUser = async () => {
      if (!noRegister)
        return;
      const res = await api_userApi.userServer.register({ userName: userName.value, passWord: passWord.value });
      if (res.statusCode == 200) {
        common_vendor.index.showToast({
          title: "\u6CE8\u518C\u6210\u529F",
          icon: "success",
          duration: 1e3
        });
        let userID = res.data;
        loginStore.login(userID);
        common_vendor.index.switchTab({
          url: "/pages/index/index"
        });
      } else {
        common_vendor.index.showToast({
          title: "\u8BE5\u8D26\u53F7\u5DF2\u6CE8\u518C\uFF0C\u8BF7\u76F4\u63A5\u767B\u5F55",
          icon: "none",
          duration: 1e3
        });
      }
    }, ifRegister = async (name) => {
      if (name == "") {
        return;
      }
      const res = api_userApi.userServer.isRegister({ userName: name });
      if ((await res).data == -1) {
        noRegister.value = true;
      } else {
        noRegister.value = false;
      }
    };
    common_vendor.onMounted(() => {
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o([($event) => userName.value = $event.detail.value, ($event) => ifRegister(userName.value)]),
        b: userName.value,
        c: noRegister.value && userName.value.length
      }, noRegister.value && userName.value.length ? {
        d: common_vendor.p({
          name: "info-circle",
          color: "red"
        })
      } : {}, {
        e: passWord.value,
        f: common_vendor.o(($event) => passWord.value = $event.detail.value),
        g: common_vendor.o(confirmLogin),
        h: noRegister.value,
        i: common_vendor.o(registerUser),
        j: !noRegister.value
      });
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-45258083"], ["__file", "D:/uni-css/src/pages/login/index.vue"]]);
wx.createPage(MiniProgramPage);
