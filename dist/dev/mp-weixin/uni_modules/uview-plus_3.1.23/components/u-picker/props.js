"use strict";
const uni_modules_uviewPlus_3_1_23_libs_config_props = require("../../libs/config/props.js");
const props = {
  props: {
    show: {
      type: Boolean,
      default: uni_modules_uviewPlus_3_1_23_libs_config_props.defprops.picker.show
    },
    showToolbar: {
      type: Boolean,
      default: uni_modules_uviewPlus_3_1_23_libs_config_props.defprops.picker.showToolbar
    },
    title: {
      type: String,
      default: uni_modules_uviewPlus_3_1_23_libs_config_props.defprops.picker.title
    },
    columns: {
      type: Array,
      default: uni_modules_uviewPlus_3_1_23_libs_config_props.defprops.picker.columns
    },
    loading: {
      type: Boolean,
      default: uni_modules_uviewPlus_3_1_23_libs_config_props.defprops.picker.loading
    },
    itemHeight: {
      type: [String, Number],
      default: uni_modules_uviewPlus_3_1_23_libs_config_props.defprops.picker.itemHeight
    },
    cancelText: {
      type: String,
      default: uni_modules_uviewPlus_3_1_23_libs_config_props.defprops.picker.cancelText
    },
    confirmText: {
      type: String,
      default: uni_modules_uviewPlus_3_1_23_libs_config_props.defprops.picker.confirmText
    },
    cancelColor: {
      type: String,
      default: uni_modules_uviewPlus_3_1_23_libs_config_props.defprops.picker.cancelColor
    },
    confirmColor: {
      type: String,
      default: uni_modules_uviewPlus_3_1_23_libs_config_props.defprops.picker.confirmColor
    },
    visibleItemCount: {
      type: [String, Number],
      default: uni_modules_uviewPlus_3_1_23_libs_config_props.defprops.picker.visibleItemCount
    },
    keyName: {
      type: String,
      default: uni_modules_uviewPlus_3_1_23_libs_config_props.defprops.picker.keyName
    },
    closeOnClickOverlay: {
      type: Boolean,
      default: uni_modules_uviewPlus_3_1_23_libs_config_props.defprops.picker.closeOnClickOverlay
    },
    defaultIndex: {
      type: Array,
      default: uni_modules_uviewPlus_3_1_23_libs_config_props.defprops.picker.defaultIndex
    },
    immediateChange: {
      type: Boolean,
      default: uni_modules_uviewPlus_3_1_23_libs_config_props.defprops.picker.immediateChange
    }
  }
};
exports.props = props;
