"use strict";
const Toast = {
  toast: {
    zIndex: 10090,
    loading: false,
    text: "",
    icon: "",
    type: "",
    loadingMode: "",
    show: "",
    overlay: false,
    position: "center",
    params: () => {
    },
    duration: 2e3,
    isTab: false,
    url: "",
    callback: null,
    back: false
  }
};
exports.Toast = Toast;
