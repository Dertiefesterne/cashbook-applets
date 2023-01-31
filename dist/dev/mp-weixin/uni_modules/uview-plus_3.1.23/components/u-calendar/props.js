"use strict";
const uni_modules_uviewPlus_3_1_23_libs_config_props = require("../../libs/config/props.js");
const props = {
  props: {
    title: {
      type: String,
      default: uni_modules_uviewPlus_3_1_23_libs_config_props.defprops.calendar.title
    },
    showTitle: {
      type: Boolean,
      default: uni_modules_uviewPlus_3_1_23_libs_config_props.defprops.calendar.showTitle
    },
    showSubtitle: {
      type: Boolean,
      default: uni_modules_uviewPlus_3_1_23_libs_config_props.defprops.calendar.showSubtitle
    },
    mode: {
      type: String,
      default: uni_modules_uviewPlus_3_1_23_libs_config_props.defprops.calendar.mode
    },
    startText: {
      type: String,
      default: uni_modules_uviewPlus_3_1_23_libs_config_props.defprops.calendar.startText
    },
    endText: {
      type: String,
      default: uni_modules_uviewPlus_3_1_23_libs_config_props.defprops.calendar.endText
    },
    customList: {
      type: Array,
      default: uni_modules_uviewPlus_3_1_23_libs_config_props.defprops.calendar.customList
    },
    color: {
      type: String,
      default: uni_modules_uviewPlus_3_1_23_libs_config_props.defprops.calendar.color
    },
    minDate: {
      type: [String, Number],
      default: uni_modules_uviewPlus_3_1_23_libs_config_props.defprops.calendar.minDate
    },
    maxDate: {
      type: [String, Number],
      default: uni_modules_uviewPlus_3_1_23_libs_config_props.defprops.calendar.maxDate
    },
    defaultDate: {
      type: [Array, String, Date, null],
      default: uni_modules_uviewPlus_3_1_23_libs_config_props.defprops.calendar.defaultDate
    },
    maxCount: {
      type: [String, Number],
      default: uni_modules_uviewPlus_3_1_23_libs_config_props.defprops.calendar.maxCount
    },
    rowHeight: {
      type: [String, Number],
      default: uni_modules_uviewPlus_3_1_23_libs_config_props.defprops.calendar.rowHeight
    },
    formatter: {
      type: [Function, null],
      default: uni_modules_uviewPlus_3_1_23_libs_config_props.defprops.calendar.formatter
    },
    showLunar: {
      type: Boolean,
      default: uni_modules_uviewPlus_3_1_23_libs_config_props.defprops.calendar.showLunar
    },
    showMark: {
      type: Boolean,
      default: uni_modules_uviewPlus_3_1_23_libs_config_props.defprops.calendar.showMark
    },
    confirmText: {
      type: String,
      default: uni_modules_uviewPlus_3_1_23_libs_config_props.defprops.calendar.confirmText
    },
    confirmDisabledText: {
      type: String,
      default: uni_modules_uviewPlus_3_1_23_libs_config_props.defprops.calendar.confirmDisabledText
    },
    show: {
      type: Boolean,
      default: uni_modules_uviewPlus_3_1_23_libs_config_props.defprops.calendar.show
    },
    closeOnClickOverlay: {
      type: Boolean,
      default: uni_modules_uviewPlus_3_1_23_libs_config_props.defprops.calendar.closeOnClickOverlay
    },
    readonly: {
      type: Boolean,
      default: uni_modules_uviewPlus_3_1_23_libs_config_props.defprops.calendar.readonly
    },
    showConfirm: {
      type: Boolean,
      default: uni_modules_uviewPlus_3_1_23_libs_config_props.defprops.calendar.showConfirm
    },
    maxRange: {
      type: [Number, String],
      default: uni_modules_uviewPlus_3_1_23_libs_config_props.defprops.calendar.maxRange
    },
    rangePrompt: {
      type: String,
      default: uni_modules_uviewPlus_3_1_23_libs_config_props.defprops.calendar.rangePrompt
    },
    showRangePrompt: {
      type: Boolean,
      default: uni_modules_uviewPlus_3_1_23_libs_config_props.defprops.calendar.showRangePrompt
    },
    allowSameDay: {
      type: Boolean,
      default: uni_modules_uviewPlus_3_1_23_libs_config_props.defprops.calendar.allowSameDay
    },
    round: {
      type: [Boolean, String, Number],
      default: uni_modules_uviewPlus_3_1_23_libs_config_props.defprops.calendar.round
    },
    monthNum: {
      type: [Number, String],
      default: 3
    }
  }
};
exports.props = props;
