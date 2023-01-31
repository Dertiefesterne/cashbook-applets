"use strict";
const common_vendor = require("../common/vendor.js");
const utils_filters = require("../utils/filters.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "billTypeIcon",
  props: {
    classify: {
      type: Number,
      default: 0
    },
    choose: {
      type: Boolean,
      default: true
    }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return {
        a: common_vendor.n(common_vendor.unref(utils_filters.filters).billTypeIcon(__props.classify)),
        b: !__props.choose ? 1 : "",
        c: common_vendor.s(common_vendor.unref(utils_filters.filters).billTypeColor(__props.classify))
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-ced6aa9c"], ["__file", "D:/uni-css/src/components/billTypeIcon.vue"]]);
wx.createComponent(Component);
