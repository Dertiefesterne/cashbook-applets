"use strict";
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "u-calendar-header",
  mixins: [common_vendor.index.$u.mpMixin, common_vendor.index.$u.mixin],
  props: {
    title: {
      type: String,
      default: ""
    },
    subtitle: {
      type: String,
      default: ""
    },
    showTitle: {
      type: Boolean,
      default: true
    },
    showSubtitle: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {};
  },
  methods: {
    name() {
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $props.showTitle
  }, $props.showTitle ? {
    b: common_vendor.t($props.title)
  } : {}, {
    c: $props.showSubtitle
  }, $props.showSubtitle ? {
    d: common_vendor.t($props.subtitle)
  } : {});
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-e6726d55"], ["__file", "D:/uni-css/src/uni_modules/uview-plus_3.1.23/components/u-calendar/header.vue"]]);
wx.createComponent(Component);
