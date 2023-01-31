"use strict";
const uni_modules_uviewPlus_3_1_23_libs_config_props = require("../../libs/config/props.js");
const props = {
  props: {
    show: {
      type: Boolean,
      default: uni_modules_uviewPlus_3_1_23_libs_config_props.defprops.datetimePicker.show
    },
    showToolbar: {
      type: Boolean,
      default: uni_modules_uviewPlus_3_1_23_libs_config_props.defprops.datetimePicker.showToolbar
    },
    modelValue: {
      type: [String, Number],
      default: uni_modules_uviewPlus_3_1_23_libs_config_props.defprops.datetimePicker.value
    },
    title: {
      type: String,
      default: uni_modules_uviewPlus_3_1_23_libs_config_props.defprops.datetimePicker.title
    },
    mode: {
      type: String,
      default: uni_modules_uviewPlus_3_1_23_libs_config_props.defprops.datetimePicker.mode
    },
    maxDate: {
      type: Number,
      default: uni_modules_uviewPlus_3_1_23_libs_config_props.defprops.datetimePicker.maxDate
    },
    minDate: {
      type: Number,
      default: uni_modules_uviewPlus_3_1_23_libs_config_props.defprops.datetimePicker.minDate
    },
    minHour: {
      type: Number,
      default: uni_modules_uviewPlus_3_1_23_libs_config_props.defprops.datetimePicker.minHour
    },
    maxHour: {
      type: Number,
      default: uni_modules_uviewPlus_3_1_23_libs_config_props.defprops.datetimePicker.maxHour
    },
    minMinute: {
      type: Number,
      default: uni_modules_uviewPlus_3_1_23_libs_config_props.defprops.datetimePicker.minMinute
    },
    maxMinute: {
      type: Number,
      default: uni_modules_uviewPlus_3_1_23_libs_config_props.defprops.datetimePicker.maxMinute
    },
    filter: {
      type: [Function, null],
      default: uni_modules_uviewPlus_3_1_23_libs_config_props.defprops.datetimePicker.filter
    },
    formatter: {
      type: [Function, null],
      default: uni_modules_uviewPlus_3_1_23_libs_config_props.defprops.datetimePicker.formatter
    },
    loading: {
      type: Boolean,
      default: uni_modules_uviewPlus_3_1_23_libs_config_props.defprops.datetimePicker.loading
    },
    itemHeight: {
      type: [String, Number],
      default: uni_modules_uviewPlus_3_1_23_libs_config_props.defprops.datetimePicker.itemHeight
    },
    cancelText: {
      type: String,
      default: uni_modules_uviewPlus_3_1_23_libs_config_props.defprops.datetimePicker.cancelText
    },
    confirmText: {
      type: String,
      default: uni_modules_uviewPlus_3_1_23_libs_config_props.defprops.datetimePicker.confirmText
    },
    cancelColor: {
      type: String,
      default: uni_modules_uviewPlus_3_1_23_libs_config_props.defprops.datetimePicker.cancelColor
    },
    confirmColor: {
      type: String,
      default: uni_modules_uviewPlus_3_1_23_libs_config_props.defprops.datetimePicker.confirmColor
    },
    visibleItemCount: {
      type: [String, Number],
      default: uni_modules_uviewPlus_3_1_23_libs_config_props.defprops.datetimePicker.visibleItemCount
    },
    closeOnClickOverlay: {
      type: Boolean,
      default: uni_modules_uviewPlus_3_1_23_libs_config_props.defprops.datetimePicker.closeOnClickOverlay
    },
    defaultIndex: {
      type: Array,
      default: uni_modules_uviewPlus_3_1_23_libs_config_props.defprops.datetimePicker.defaultIndex
    }
  }
};
exports.props = props;
