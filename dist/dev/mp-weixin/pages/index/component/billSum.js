"use strict";
const common_vendor = require("../../../common/vendor.js");
const piniaStore_login = require("../../../pinia-store/login.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "billSum",
  props: {
    isEdit: {
      type: Boolean,
      default: false
    },
    sumData: {
      type: Object,
      default: () => {
      }
    }
  },
  setup(__props) {
    piniaStore_login.useloginStore();
    common_vendor.ref("");
    const show = common_vendor.ref(false);
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.t(__props.sumData.daySum),
        b: common_vendor.o(($event) => show.value = true),
        c: common_vendor.t(__props.sumData.monthSum.toFixed(2)),
        d: show.value
      }, show.value ? {
        e: common_vendor.o(($event) => show.value = false)
      } : {}, {
        f: show.value ? "translateY(0)" : "translateY(100%)"
      });
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-d32d4986"], ["__file", "D:/uni-css/src/pages/index/component/billSum.vue"]]);
wx.createComponent(Component);
