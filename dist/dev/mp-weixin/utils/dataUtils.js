"use strict";
const formattereTools = {
  charactersTonumber(chnStr) {
  },
  dateFormatterDispose(str, val) {
    var stime = val;
    var etime = Number(str);
    var usedTime = etime - stime;
    var days = Math.floor(usedTime / (24 * 3600 * 1e3));
    if (days > 7)
      return false;
    else
      return true;
  },
  dateFormattere(date, type = "date") {
    var date = new Date(date);
    var year = date.getFullYear();
    var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
    var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    var hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
    var min = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    var seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
    if (type == "date") {
      return year + "\u5E74" + month + "\u6708" + day + "\u65E5";
    } else if (type == "time") {
      return hour + ":" + min;
    } else {
      return year + "-" + month + "-" + day + " " + hour + ":" + min + ":" + seconds;
    }
  },
  dateFormattimes(ms, type = "date") {
    var timestamp = Number(ms);
    var date = new Date(timestamp);
    var year = date.getFullYear();
    var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
    var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    var hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
    var min = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    var seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
    if (type == "date") {
      return year + "\u5E74" + month + "\u6708" + day + "\u65E5";
    } else if (type == "time") {
      return hour + ":" + min;
    } else {
      return year + "-" + month + "-" + day + " " + hour + ":" + min + ":" + seconds;
    }
  },
  dateFormatString(date, type = "date") {
    var today = new Date();
    var thisYear = today.getFullYear() + "";
    var year = date.slice(0, 4);
    var month = date.slice(5, 7);
    var day = date.slice(8, 10);
    var hour = date.slice(11, 13);
    var min = date.slice(14, 16);
    var seconds = date.slice(17, 19);
    if (type == "date") {
      if (year == thisYear)
        return month + "\u6708" + day + "\u65E5";
      else
        return year + "\u5E74" + month + "\u6708" + day + "\u65E5";
    } else if (type == "time") {
      return hour + ":" + min;
    } else {
      return year + "-" + month + "-" + day + " " + hour + ":" + min + ":" + seconds;
    }
  },
  testYy(val) {
    let yy = val + 1;
    return yy;
  }
};
exports.formattereTools = formattereTools;
