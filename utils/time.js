/**
 * Created by billy on 2016/11/24.
 */
const YEAR = 'YYYY'
const YEAR_SHORT = 'YY'
const MONTH = 'MM'
const MONTH_SHORT = 'M'
const DATE = 'DD'
const DATE_SHORT = 'D'
const HOUR = 'hh'
const MINUTE = 'mm'
const SECOND = 'ss'
const FULL_DATE = 'YYYY-MM-DD'
const DATE_TIME = 'YYYY-MM-DD hh:mm:ss'
const HMS = 'hh:mm:ss'
const DHMS = 'DD:hh:mm:ss'
const MS = 'mm:ss'

exports.YEAR = YEAR
exports.YEAR_SHORT = YEAR_SHORT
exports.MONTH = MONTH
exports.MONTH_SHORT = MONTH_SHORT
exports.DATE = DATE
exports.DATE_SHORT = DATE_SHORT
exports.HOUR = HOUR
exports.MINUTE = MINUTE
exports.SECOND = SECOND
exports.DATETIME = DATE_TIME
exports.HMS = HMS
exports.DHMS = DHMS
exports.MS = MS

var __START_TIME = Date.now()

function _getTime(dateOrTime) {
    if (dateOrTime instanceof Date) {
        return dateOrTime.getTime()
    }
    if (dateOrTime == null) {
        return Date.now()
    }
    dateOrTime -= 0
    if (typeof dateOrTime !== 'number') {
        return Date.now()
    }
    if (`${dateOrTime}`.length == 10) {
        return dateOrTime * 1000
    }
    return dateOrTime
}

exports.getFullDate = function (dateOrTime, doubleDigit = false) {
    if (typeof dateOrTime === 'boolean') {
        doubleDigit = dateOrTime
        dateOrTime = Date.now()
    }
    return doubleDigit ? formatTime(dateOrTime, DATE_TIME) : formatTime(dateOrTime, 'YYYY-M-D h:m:s')
}

exports.getFullDateArray = function (dateOrTime) {
    let date = new Date(_getTime(dateOrTime))
    return [date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()]
}

exports.getTime = function (dateOrTime, doubleDigit = false) {
    if (typeof dateOrTime === 'boolean') {
        doubleDigit = dateOrTime
        dateOrTime = Date.now()
    }
    return doubleDigit ? formatTime(dateOrTime, HMS) : formatTime(dateOrTime, 'h:m:s')
}

exports.getTimeArray = function (dateOrTime) {
    let date = new Date(_getTime(dateOrTime))
    return [date.getHours(), date.getMinutes(), date.getSeconds()]
}

exports.getDate = function (dateOrTime, doubleDigit = false) {
    if (typeof dateOrTime === 'boolean') {
        doubleDigit = dateOrTime
        dateOrTime = Date.now()
    }
    return doubleDigit ? formatTime(dateOrTime, FULL_DATE) : formatTime(dateOrTime, 'YYYY-M-D')
}

exports.getDateArray = function (dateOrTime) {
    let date = new Date(_getTime(dateOrTime))
    return [date.getFullYear(), date.getMonth(), date.getDate()]
}

exports.getNowStamp = function (millisecond = false) {
    var temptime = Date.now()
    return !millisecond || millisecond == 10 ? Math.floor(temptime / 1000) : temptime
}

function _getBasicTimeArray(time) {
    let date = new Date(time)
    return [
        `${date.getFullYear()}`.padStart(2, '0'),
        `${date.getMonth()}`.padStart(2, '0'),
        `${date.getDate()}`.padStart(2, '0'),
        `${date.getHours()}`.padStart(2, '0'),
        `${date.getMinutes()}`.padStart(2, '0'),
        `${date.getSeconds()}`.padStart(2, '0'),
    ]
}

function formatTime(dateOrTime, format = DATE_TIME) {
    if (typeof dateOrTime === 'string') {
        format = dateOrTime
        dateOrTime = Date.now()
    }
    let [Y, M, D, h, m, s] = _getBasicTimeArray(_getTime(dateOrTime))
    return format
        .replace(/YYYY/g, Y)
        .replace(/yyyy/g, Y)
        .replace(/YY/g, `${Y}`.substring(2))
        .replace(/MM/g, M)
        .replace(/M/g, M - 0)
        .replace(/DD/g, D)
        .replace(/dd/g, D)
        .replace(/D/g, D - 0)
        .replace(/hh/g, h)
        .replace(/h/g, h - 0)
        .replace(/mm/g, m)
        .replace(/m/g, m - 0)
        .replace(/ss/g, s)
        .replace(/s/g, s - 0)
}
exports.formatTime = formatTime

exports.getCountDown = function (second = 0, format = DHMS) {
    second -= 0
    if (typeof second != 'number') {
        second = 0
    }
    second = Math.max(0, Math.floor(second))
    var [D, h, m, s] = getCountDownArray(second).map(v => `${v}`.padStart(2, '0'))
    if (format.match(/Y|M/g)) {
        format = DHMS
        if (D - 0 == 0) {
            format = HMS
        }
    }
    return format
        .replace(/DD/g, D)
        .replace(/dd/g, D)
        .replace(/D/g, D - 0)
        .replace(/hh/g, h)
        .replace(/h/g, h - 0)
        .replace(/mm/g, m)
        .replace('m', m - 0)
        .replace(/ss/g, s)
        .replace('s', s - 0)
}

exports.getTimer = function () {
    return Date.now() - __START_TIME
}

function getCountDownArray(second) {
    return [parseInt(second / 86400), parseInt((second % 86400) / 3600), parseInt((second % 3600) / 60), second % 60]
}
exports.getCountDownArray = getCountDownArray

exports.getPastSecond = function (time = 0) {
    var [h, m, s] = getTimeArray(time)
    return h * 3600 + m * 60 + s
}
exports.getWeek = function (weekOffset = 0, sundayFirst = true) {
    var resultList = []
    var da = new Date()
    var y = da.getFullYear()
    var m = da.getMonth()
    var d = da.getDate() + weekOffset * 7
    var day = da.getDay()
    if (!sundayFirst) {
        day--
        day == -1 && (day = 6)
    }

    for (let i = 0; i < 7; i++) {
        var temp = new Date(y, m, d - day + i)
        resultList.push([
            temp.getTime(),
            temp.getTime() + 86400000,
            temp.getFullYear(),
            temp.getMonth(),
            temp.getDate(),
        ])
    }

    return resultList
}

exports.getMonthByOffset = function (monthOffset = 0, sundayFirst = true) {
    var dateList = []
    var da = new Date()
    var nowY = da.getFullYear()
    var nowM = da.getMonth()
    var y = nowY
    var m = nowM + monthOffset
    var start = new Date(y, m, 1)
    var end = new Date(y, m + 1, 0)
    y = start.getFullYear()
    m = start.getMonth()
    var endDate = end.getDate()
    for (let i = 1; i <= end.getDate(); i++) {
        dateList.push([y, m, i])
    }
    var day = new Date(y, m, 1).getDay()
    if (!sundayFirst) {
        day = (day + 6) % 7
    }
    for (let i = 0; i < day; i++) {
        var tempDate = new Date(y, m, -i)
        dateList.unshift([tempDate.getFullYear(), tempDate.getMonth(), tempDate.getDate()])
    }
    day = end.getDay()
    if (!sundayFirst) {
        day = (day + 6) % 7
    }
    for (let i = 1; i < 7 - day; i++) {
        var tempDate = new Date(y, m, i + endDate)
        dateList.push([tempDate.getFullYear(), tempDate.getMonth(), tempDate.getDate()])
    }
    var resultObj = Object.create(null)
    resultObj.nowYear = nowY
    resultObj.nowMonth = nowM
    resultObj.nowDate = da.getDate()
    resultObj.year = y
    resultObj.month = m
    resultObj.now = { year: nowY, month: nowM, date: da.getDate() }
    var startDateArr = dateList[0]
    var endDateArr = dateList[dateList.length - 1]
    resultObj.startTime = new Date(startDateArr[0], startDateArr[1], startDateArr[2]).getTime() / 1000
    resultObj.endTime = new Date(endDateArr[0], endDateArr[1], endDateArr[2]).getTime() / 1000 + 86400
    resultObj.list = dateList
    return resultObj
}

exports.getMonth = function (dateOrTime = 0, sundayFirst = true) {
    var dateList = []
    var da = new Date()
    var nowY = da.getFullYear()
    var nowM = da.getMonth()
    var start = new Date(_getTime(dateOrTime))
    var y = start.getFullYear()
    var m = start.getMonth()
    var end = new Date(y, m + 1, 0)
    var endDate = end.getDate()
    for (let i = 1; i <= end.getDate(); i++) {
        dateList.push([y, m, i])
    }
    var day = new Date(y, m, 1).getDay()
    if (!sundayFirst) {
        day = (day + 6) % 7
    }
    for (let i = 0; i < day; i++) {
        var tempDate = new Date(y, m, -i)

        dateList.unshift([tempDate.getFullYear(), tempDate.getMonth(), tempDate.getDate()])
    }
    day = end.getDay()
    if (!sundayFirst) {
        day = (day + 6) % 7
    }
    for (let i = 1; i < 7 - day; i++) {
        var tempDate = new Date(y, m, i + endDate)
        dateList.push([tempDate.getFullYear(), tempDate.getMonth(), tempDate.getDate()])
    }
    var resultObj = Object.create(null)
    resultObj.now = { year: nowY, month: nowM, date: da.getDate() }
    resultObj.year = y
    resultObj.month = m
    var startDateArr = dateList[0]
    var endDateArr = dateList[dateList.length - 1]
    resultObj.startTime = new Date(startDateArr[0], startDateArr[1], startDateArr[2]).getTime() / 1000
    resultObj.endTime = new Date(endDateArr[0], endDateArr[1], endDateArr[2]).getTime() / 1000 + 86400
    resultObj.list = dateList
    return resultObj
}

exports.getWeekNum = function (...arg) {
    let startAtMonday = true,
        dayCount = 0,
        date,
        date1,
        startDay = 0,
        time,
        time1
    if (typeof arg[arg.length - 1] === 'boolean') {
        startAtMonday = arg[arg.length - 1]
        arg.pop()
        if (arg.length == 1) {
            date = Array.isArray(arg[0]) ? new Date(...arg[0]) : newDate(arg[0])
        } else if (arg.length == 3) {
            date = new Date(...arg)
        } else {
            date = new Date()
        }
    }
    time = date.getTime()
    date1 = new Date(date.getFullYear(), 0, 1)
    time1 = date1.getTime()
    startDay = time1.getDay()
    dayCount = Math.floor((time - time1) / 1000 / 86400)
    if (startAtMonday) {
        dayCount = startDay == 0 ? dayCount - 1 : dayCount - (7 - startDay)
    } else {
        dayCount = dayCount - (8 - startDay)
    }
    return Math.ceil(dayCount / 7) + 1
}

exports.getOffset = function ($date1, $date2) {
    var time1 = getTimeStampByDate($date1)
    var time2 = getTimeStampByDate($date2)

    return parseInt((time2 - time1) / 86400000)
}

function getTimeStampByDate($date) {
    if (typeof $date == 'string') {
        if (Number($date) != $date - 0) {
            var dateArr = $date.split(' ')[0].split('-')
            return new Date(dateArr).getTime()
        } else {
            if ($date.length == 10) {
                return Number($date) * 1000
            }
            return Number($date)
        }
    } else if (Array.isArray($date)) {
        return new Date($date).getTime()
    } else if (typeof $date == 'number') {
        if (($date + '').length == 10) {
            return $date * 1000
        }
        return $date
    }
}
