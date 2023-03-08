

export default {
    // 处理中文数字转数字
    charactersTonumber(chnStr: string) {
    },
    // 处理时间（计算是否超过七天）
    dateFormatterDispose(endTime: string, startTime: number) {
        // 开始时间
        var stime = startTime
        // var etime = new Date().getTime()
        // 结束时间()
        var etime = Number(endTime)
        // 刚记录的账单时间距离最新一条记录的时间
        var usedTime = Math.abs(etime - stime) //两个时间戳相差的毫秒数
        var days = Math.floor(usedTime / (24 * 3600 * 1000))
        // //计算出小时数
        // var leave1 = usedTime % (24 * 3600 * 1000) //计算天数后剩余的毫秒数
        // var hours = Math.floor(leave1 / (3600 * 1000))
        // //计算相差分钟数
        // var leave2 = leave1 % (3600 * 1000) //计算小时数后剩余的毫秒数
        // var minutes = Math.floor(leave2 / (60 * 1000))
        // var leave3 = leave2 % (60 * 1000) //计算分钟数后剩余的毫秒数
        // var seconds = Math.round(leave3 / 1000)
        // var time = days + '天' + hours + '时' + minutes + '分'
        // if (days > 0) {
        //     if (days > 7) {
        //         return '7天前'
        //     } else {
        //         return days + '天前'
        //     }
        // } else if (hours > 0) {
        //     return hours + '小时前'
        // } else if (minutes > 0) {
        //     return minutes + '分钟前'
        // } else if (seconds > 0) {
        //     return '刚刚'
        // }
        // return '刚刚'
        if (days > 7)
            return false
        else
            return true
    },
    // 处理时间（计算距离今天是几天）
    dataDays(time: string) {
        // 今天时间戳
        var etime = new Date().getTime()
        // 注册时间
        var stime = Number(time)
        var usedTime = Math.abs(etime - stime) //两个时间戳相差的毫秒数
        var days = Math.floor(usedTime / (24 * 3600 * 1000))
        return days
    },
    // 处理时间（Date)
    dateFormattere(date: Date, type: string = "date") {
        var date = new Date(date)
        var year = date.getFullYear()// 获取完整的年份(4位,1970)
        var month = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1// 获取月份(0-11,0代表1月,进行显示的时候要加一)
        var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()// 获取日(1-31)
        var hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours() // 获取小时数(0-23)，
        var min = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()// 获取分钟数(0-59)
        var seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds() // 获取秒数(0-59)
        if (type == "date") {
            return year + '年' + month + '月' + day + '日'
        }
        else if (type == 'time') {
            return hour + ':' + min;
        }
        else {
            return year + '-' + month + '-' + day + ' ' + hour + ":" + min + ":" + seconds
        }
    },
    // 处理时间（时间戳）
    dateFormattimes(ms: string, type: string = "date") {
        var timestamp: number = Number(ms)
        var date = new Date(timestamp)
        var year = date.getFullYear()// 获取完整的年份(4位,1970)
        var month = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1// 获取月份(0-11,0代表1月,进行显示的时候要加一)
        var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()// 获取日(1-31)
        var hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours() // 获取小时数(0-23)，
        var min = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()// 获取分钟数(0-59)
        var seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds() // 获取秒数(0-59)
        if (type == "date") {
            return year + '年' + month + '月' + day + '日'
        }
        else if (type == 'sDate') {
            return year + '-' + month + '-' + day
        }
        else if (type == 'time') {
            return hour + ':' + min;
        }
        else {
            return year + '-' + month + '-' + day + ' ' + hour + ":" + min + ":" + seconds
        }
    },
    // String日期
    dateFormatString(date: string, type: string = "date") {
        var today = new Date()
        var thisYear = today.getFullYear() + ''
        var year = date.slice(0, 4)
        var month = date.slice(5, 7)
        var day = date.slice(8, 10)
        var hour = date.slice(11, 13)
        var min = date.slice(14, 16)
        var seconds = date.slice(17, 19)
        if (type == "date") {
            // 如果是今年就不显示年份
            if (year == thisYear)
                return month + '月' + day + '日'
            else
                return year + '年' + month + '月' + day + '日'
        }
        else if (type == 'time') {
            return hour + ':' + min;
        }
        else {
            return year + '-' + month + '-' + day + ' ' + hour + ":" + min + ":" + seconds
        }
    },
    // 获得某个月的天数
    getMonthDays(date: string) {
        var d = new Date(date)
        //将日期设为下一个月的一号
        d.setMonth(d.getMonth() + 1)
        d.setDate(1)
        //现在d是下一个月的1号，1号的前一天就是我们所求月份的最后一天，这天的日期就是这个月的天数
        d.setDate(d.getDate() - 1)
        return d.getDate()
    },
    // 计算前一个月的时间戳
    getMonTimes(month: number, direction: number) {
        // 今天时间戳
        var time = new Date().getTime()
        // 31天时间
        var monTime = 31 * 24 * 3600 * 1000
        return time + (direction * monTime) + ''
    }
}