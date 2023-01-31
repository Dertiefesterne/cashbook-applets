"use strict";
const common_vendor = require("../../../common/vendor.js");
const utils_dataUtils = require("../../../utils/dataUtils.js");
const api_billApi = require("../../../api/billApi.js");
const piniaStore_login = require("../../../pinia-store/login.js");
require("../../../utils/request.js");
if (!Array) {
  const _easycom_u_icon2 = common_vendor.resolveComponent("u-icon");
  _easycom_u_icon2();
}
const _easycom_u_icon = () => "../../../uni_modules/uview-plus_3.1.23/components/u-icon/u-icon.js";
if (!Math) {
  _easycom_u_icon();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "billAnalyse",
  props: {
    label: { type: String },
    placeholder: { type: String, default: "\u8BF7\u9009\u62E9" },
    serve: { type: Array },
    type: { type: String, default: "default" }
  },
  emits: ["update:modelValue", "addBill"],
  setup(__props, { emit }) {
    const loginStore = piniaStore_login.useloginStore();
    common_vendor.ref();
    const inputText = common_vendor.ref(""), show = common_vendor.ref(false), placeholder = common_vendor.ref("\u8BD5\u8BD5\u8F93\u5165\u201C\u6253\u8F6622\u5757\u201D\u3001\u201C\u901B\u8D85\u5E02\u4E70\u83DC58.3\u5143\u201D\u3001\u201C\u4E70\u8D44\u659939.9\u201D\u3001\u201C\u5DE5\u8D44\u6536\u51651\u4E07\u201D");
    common_vendor.reactive({
      bill_id: 0,
      user_id: Number(loginStore.userID),
      bill_type: -1,
      data_time: utils_dataUtils.formattereTools.dateFormattere(new Date(), "full"),
      timestamp: new Date().getTime() + "",
      money: 0,
      matter: "",
      classify: 0,
      notes: "",
      full_sentences: ""
    });
    const _close = () => {
      show.value = false;
    }, toAddBill = () => {
      common_vendor.index.navigateTo({
        url: "/pages/addBill/index"
      });
    }, anylyseBill = async () => {
      if (inputText.value == "") {
        return;
      }
      const res = await api_billApi.billServer.analyzeBill({ analyzeText: inputText.value, userID: loginStore.userID });
      console.log("\u8BF7\u6C42\u7ED3\u679C", res);
      if (res.statusCode == 200) {
        show.value = false;
        inputText.value = "";
        emit("addBill", Number(res.data.time));
      }
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.p({
          name: "plus",
          color: "#2979ff",
          size: "40"
        }),
        b: common_vendor.o(($event) => show.value = true),
        c: show.value
      }, show.value ? {
        d: common_vendor.o(_close)
      } : {}, {
        e: placeholder.value,
        f: common_vendor.s(inputText.value.length ? "height:40rpx" : "height:80rpx"),
        g: inputText.value,
        h: common_vendor.o(($event) => inputText.value = $event.detail.value),
        i: common_vendor.o(toAddBill),
        j: common_vendor.p({
          name: "grid",
          size: "25"
        }),
        k: common_vendor.o(anylyseBill),
        l: show.value ? "translateY(0)" : "translateY(100%)"
      });
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-d086c738"], ["__file", "D:/uni-css/src/pages/index/component/billAnalyse.vue"]]);
wx.createComponent(Component);
