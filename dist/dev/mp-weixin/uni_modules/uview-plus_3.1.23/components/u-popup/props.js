"use strict";
const uni_modules_uviewPlus_3_1_23_libs_config_props = require("../../libs/config/props.js");
const props = {
  props: {
    show: {
      type: Boolean,
      default: uni_modules_uviewPlus_3_1_23_libs_config_props.defprops.popup.show
    },
    overlay: {
      type: Boolean,
      default: uni_modules_uviewPlus_3_1_23_libs_config_props.defprops.popup.overlay
    },
    mode: {
      type: String,
      default: uni_modules_uviewPlus_3_1_23_libs_config_props.defprops.popup.mode
    },
    duration: {
      type: [String, Number],
      default: uni_modules_uviewPlus_3_1_23_libs_config_props.defprops.popup.duration
    },
    closeable: {
      type: Boolean,
      default: uni_modules_uviewPlus_3_1_23_libs_config_props.defprops.popup.closeable
    },
    overlayStyle: {
      type: [Object, String],
      default: uni_modules_uviewPlus_3_1_23_libs_config_props.defprops.popup.overlayStyle
    },
    closeOnClickOverlay: {
      type: Boolean,
      default: uni_modules_uviewPlus_3_1_23_libs_config_props.defprops.popup.closeOnClickOverlay
    },
    zIndex: {
      type: [String, Number],
      default: uni_modules_uviewPlus_3_1_23_libs_config_props.defprops.popup.zIndex
    },
    safeAreaInsetBottom: {
      type: Boolean,
      default: uni_modules_uviewPlus_3_1_23_libs_config_props.defprops.popup.safeAreaInsetBottom
    },
    safeAreaInsetTop: {
      type: Boolean,
      default: uni_modules_uviewPlus_3_1_23_libs_config_props.defprops.popup.safeAreaInsetTop
    },
    closeIconPos: {
      type: String,
      default: uni_modules_uviewPlus_3_1_23_libs_config_props.defprops.popup.closeIconPos
    },
    round: {
      type: [Boolean, String, Number],
      default: uni_modules_uviewPlus_3_1_23_libs_config_props.defprops.popup.round
    },
    zoom: {
      type: Boolean,
      default: uni_modules_uviewPlus_3_1_23_libs_config_props.defprops.popup.zoom
    },
    bgColor: {
      type: String,
      default: uni_modules_uviewPlus_3_1_23_libs_config_props.defprops.popup.bgColor
    },
    overlayOpacity: {
      type: [Number, String],
      default: uni_modules_uviewPlus_3_1_23_libs_config_props.defprops.popup.overlayOpacity
    }
  }
};
exports.props = props;
