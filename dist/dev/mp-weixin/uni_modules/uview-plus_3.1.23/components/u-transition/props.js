"use strict";
const uni_modules_uviewPlus_3_1_23_libs_config_props = require("../../libs/config/props.js");
const props = {
  props: {
    show: {
      type: Boolean,
      default: uni_modules_uviewPlus_3_1_23_libs_config_props.defprops.transition.show
    },
    mode: {
      type: String,
      default: uni_modules_uviewPlus_3_1_23_libs_config_props.defprops.transition.mode
    },
    duration: {
      type: [String, Number],
      default: uni_modules_uviewPlus_3_1_23_libs_config_props.defprops.transition.duration
    },
    timingFunction: {
      type: String,
      default: uni_modules_uviewPlus_3_1_23_libs_config_props.defprops.transition.timingFunction
    }
  }
};
exports.props = props;
