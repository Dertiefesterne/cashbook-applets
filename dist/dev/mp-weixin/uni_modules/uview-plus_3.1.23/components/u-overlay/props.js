"use strict";
const uni_modules_uviewPlus_3_1_23_libs_config_props = require("../../libs/config/props.js");
const props = {
  props: {
    show: {
      type: Boolean,
      default: uni_modules_uviewPlus_3_1_23_libs_config_props.defprops.overlay.show
    },
    zIndex: {
      type: [String, Number],
      default: uni_modules_uviewPlus_3_1_23_libs_config_props.defprops.overlay.zIndex
    },
    duration: {
      type: [String, Number],
      default: uni_modules_uviewPlus_3_1_23_libs_config_props.defprops.overlay.duration
    },
    opacity: {
      type: [String, Number],
      default: uni_modules_uviewPlus_3_1_23_libs_config_props.defprops.overlay.opacity
    }
  }
};
exports.props = props;
