/**
 * Created by billy on 2017/2/20.
 */
/**
 * 判断对象是否是数组
 * @param d 传入的对象
 * @returns {boolean}
 */
function isArray(d) {
    return Array.isArray(d)
}

/**
 * 在范围中抽取随机数
 * @param a 区间下限(上限) / arr 目标数区间
 * @param b 区间上限(下限) / 小数位数（默认根据a,b来识别）
 * @param c true=0 false=16 默认根据a,b来识别
 */
function random(a, b, c) {
    let min, max, decimal
    if (Array.isArray(a)) {
        ;[min, max] = a
        decimal = b
    } else {
        ;[min, max] = [a, b]
        decimal = c
    }
    typeof min == 'string' && isNum(min) && (min -= 0)
    typeof max == 'string' && isNum(max) && (max -= 0)
    if (min === undefined || max === undefined || typeof min != 'number' || typeof max != 'number') {
        ;(min = 0), (max = 1), (decimal = false)
    }
    if (min === max) {
        return min
    }
    typeof decimal === 'boolean' && (decimal = decimal ? 0 : 16)
    ;(typeof decimal != 'number' || decimal < 0) && (decimal = null)
    if (decimal == null) {
        decimal = Math.max(`${min}`.length - `${parseInt(min)}`.length, `${max}`.length - `${parseInt(max)}`.length)
        decimal > 0 && (decimal -= 1)
    }
    decimal = Math.pow(10, decimal)
    return parseInt((Math.random() * (max - min) + min) * decimal) / decimal
}

/**
 * 在一组数中抽取任意一个（可传n个的数）
 *
 */
function getRandomItem(...arg) {
    if (arg.length > 1) {
        return arg[int(Math.random() * arg.length)]
    } else if (isArray(arg[0])) {
        return arg[0][int(Math.random() * arg[0].length)]
    } else {
        return arg[0]
    }
}

/**
 * 取整
 * @param val 要取整的值
 * @returns {number}
 */
function int(val) {
    return parseInt(val)
}

/**
 * 用给定的数据对象格式化模版字符串
 * @param templateString 模板字符串
 * @param paramObj 数据对象(键值对) or 数组
 * @return {string} 格式化后的字符串
 *
 * @example
 * paramFormat('Everyone knows that {0} likes to {1} every {2}.', 'tom', 'eat fruits', 'day')
 * // => 'Everyone knows that tom likes to eat fruits every day.'
 *
 * paramFormat('Everyone knows that {0} likes to {1} every {2}.', ['tom', 'eat fruits', 'day'])
 * // => 'Everyone knows that tom likes to eat fruits every day.'
 *
 * paramFormat('Everyone knows that {name} likes to {like} every {rate}.', { name: 'tom', like: 'swim', rate: 'two days' })
 * // => Everyone knows that tom likes to swim every two days.
 */
function paramFormat(str, ...arg) {
    return str.paramFormat(...arg)
}

/**
 * 判断源字符串是否是数字，或者能转成数字
 * @param p_string 源
 * @returns {boolean}
 */
function isNum(p_string) {
    if (typeof p_string == 'number') {
        return true
    } else if (typeof p_string == 'string') {
        if (p_string == '') {
            return false
        }
        return !isNaN(p_string - 0)
    }
    return false
}

/**
 * 去除字符串两端的空格
 * @param p_string 字符串/数字/空串/null
 * @returns {string}
 */
function trim(p_string) {
    return `${p_string}`.trim()
}

function parseUrl($url) {
    var res = Object.create(null)
    var url = $url.split('?')[0]
    var protocol = url.split('://')[0]
    var tempurl = url.substr(protocol == '' ? 0 : protocol.length + 3)
    var domain = tempurl.substring(0, tempurl.indexOf('/'))
    var host = domain
    var port = 80
    if (domain.indexOf(':') > 0) {
        port = domain.substring(domain.indexOf(':') + 1) - 0
        domain = domain.substring(0, domain.indexOf(':'))
    }
    $url = $url.replace(url, '')
    var query = Object.create(null)
    var bookmark = ''
    $url = $url.trim().replace(/^(\?|#|&)/, '')
    if ($url.indexOf('#') > 0) {
        bookmark = $url.substr($url.indexOf('#') + 1)
        $url = $url.replace('#' + bookmark, '')
    }

    if ($url) {
        $url.split('&').forEach(function (param) {
            var parts = param.replace(/\+/g, ' ').split('=')
            var key = decodeURIComponent(parts.shift())
            var val = parts.length > 0 ? decodeURIComponent(parts.join('=')) : null

            if (query[key] === undefined) {
                query[key] = val
            } else if (Array.isArray(query[key])) {
                query[key].push(val)
            } else {
                query[key] = [query[key], val]
            }
        })
    }
    res.url = url
    res.host = host
    res.bookmark = bookmark
    res.query = query
    res.domain = domain
    res.port = port
    res.protocol = protocol
    return res
}

/**
 * 合并两个对象（将第二个对象合并到第一个对象），也可用于深度复制
 * @param d 要输出的对象
 * @param b 要合并的对象
 * @param cover 是否覆盖属性
 * @private
 */
function __merge(d, b, cover) {
    if (b) {
        for (var k in b) {
            if (typeof b[k] == 'object' && (!d[k] || typeof d[k] == 'object')) {
                if (b[k] === null && cover) {
                    d[k] = null
                } else {
                    if (Array.isArray(b[k])) {
                        d[k] = d[k] || []
                        __merge(d[k], b[k], cover)
                    } else {
                        d[k] = d[k] || {}
                        __merge(d[k], b[k], cover)
                    }
                }
            } else {
                !(!cover && d.hasOwnProperty(k)) && (d[k] = b[k])
            }
        }
    }
    return d
}

function __copy(d, b, createNew = false) {
    var r = {}
    for (var k in b) {
        ;(d.hasOwnProperty(k) || createNew) && (r[k] = b[k])
    }
    return r
}

function getObject($dObj, $key, $defaultValue = null) {
    if (typeof $dObj === 'object') {
        if ($dObj.hasOwnProperty && $dObj.hasOwnProperty($key)) {
            return $dObj[$key]
        }
    }
    return $defaultValue
}

/**
 * 判断对象的类型
 * @param $obj 传入的对象
 * @returns {string}
 */
function getType($obj) {
    return Object.prototype.toString.call($obj).replace(/(\[)object |(\])/g, '')
}

/**
 * Object.defineProperty
 * @param {*} $targetObj 目标对象
 * @param {*} propertyName 属性名称
 * @param {*} getFunc 只读方法
 * @param {*} setFunc 只写方法
 * @param {*} enumerable 可否枚举
 * @param {*} configurable 可否
 */
function defineProperty($targetObj, propertyName, getFunc, setFunc, enumerable = true, configurable = true) {
    var propertyObj = {
        enumerable,
        configurable,
    }

    getFunc && (propertyObj.get = getFunc)
    setFunc && (propertyObj.set = setFunc)

    return Object.defineProperty($targetObj, propertyName, propertyObj)
}

function isString($str) {
    return typeof $str == 'string'
}

function debug_old($obj, $maxDepth = 7) {
    return debuga({}, $obj, 0, $maxDepth)

    function debuga(hash, obj, depth, maxDepth) {
        if (
            obj == null ||
            obj == undefined ||
            typeof obj == 'number' ||
            typeof obj == 'string' ||
            typeof obj == 'boolean'
        ) {
            return obj
        } else if (Array.isArray(obj)) {
            var a = []
            for (var i = 0; i < obj.length; i++) {
                a[i] = debuga({}, obj[i], depth + 1, maxDepth)
            }
            return a
        } else if (typeof obj == 'function') {
            return '[function]'
        } else {
            if (depth >= maxDepth) {
                return '[object object]'
            }

            for (var k in obj) {
                hash[k] = debuga({}, obj[k], depth + 1, maxDepth)
            }
            return hash
        }
    }
}

function isEmpty($obj) {
    if (typeof $obj == 'number' || typeof $obj == 'boolean' || typeof $obj == 'string') {
        if ($obj === '') {
            return true
        }
        return false
    }

    if (!$obj) {
        return true
    }

    return Object.keys($obj).length == 0
}

function getValueByKey($obj, $key, $defaultValue) {
    if ($defaultValue === undefined) {
        $defaultValue = 0
    }

    if ($obj != null && $key != null && $obj[$key] != null) {
        return $obj[$key]
    }

    return $defaultValue
}

function hasData(obj, ...arg) {
    return typeof obj === 'object' && (Array.isArray(arg[0]) ? arg[0] : arg).every(v => v in obj)
}

function makeMap($str, $expectsLowerCase = true) {
    var map = Object.create(null)
    var list = $str.split(',')
    for (let i = 0; i < list.length; i++) {
        map[list[i]] = true
    }
    return $expectsLowerCase ? $key => map[$key.toLowerCase()] : $key => map[$key]
}

function equal(...arg) {
    var type = getType(arg[0])
    var value = ''

    for (var i = 1; i < arg.length; i++) {
        if (getType(arg[i]) != type) {
            return false
        }
    }

    value = getObjectStr(arg[0])
    for (var i = 0; i < arg.length; i++) {
        if (getObjectStr(arg[i]) != value) {
            return false
        }
    }
    return true
}

function getObjectStr($dObj) {
    if (getType($dObj) == 'Object') {
        var arr = []
        for (var key in $dObj) {
            if (($dObj.hasOwnProperty && $dObj.hasOwnProperty(key)) || !$dObj.hasOwnProperty) {
                arr.push({
                    name: key,
                    value: $dObj[key],
                })
            }
        }

        arr.sort((a, b) => {
            if (a.name <= b.name) {
                return -1
            }
            return 1
        })
        arr = arr.map(a => {
            return a.name + ':' + getObjectStr(a.value)
        })
        return '{' + arr.join(',') + '}'
    } else {
        return JSON.stringify($dObj)
    }
}

function __mergeAll(target, ...arg) {
    let cover = false
    if (typeof arg[arg.length - 1] === 'boolean') {
        cover = arg[arg.length - 1]
        arg.removeLast()
    }
    return arg.reduce((targetObj, obj) => {
        __merge(targetObj, obj, cover)
    }, target)
}

function sortByString($list) {
    $list.sort(compareString)
    return $list
}

function compareString(a, b, rule = 'lengthFirst') {
    return `${a}`.compare(b, rule)
}

/**
 * 根据规则深度克隆对象
 * @param $data 待克隆对象
 * @param $cols 可复制的字段
 * @private
 */
function __clone($data, $cols) {
    var obj = __merge({}, $data)
    if (!$cols) {
        return obj
    }

    if (!Array.isArray($cols) && typeof $cols == 'object') {
        $cols = Object.keys($cols)
    }
    if (Array.isArray($cols) && $cols.length > 0) {
        for (var k in obj) {
            if ($cols.indexOf(k) < 0) {
                delete obj[k]
            }
        }
    }
    return obj
}

/**
 * 根据规则深度克隆对象
 * @param $data 待克隆对象
 * @param $cols 需要过滤的字段
 * @private
 */
function __cloneWithFilter($data, $cols) {
    var obj = __merge({}, $data)
    if (!$cols) {
        return obj
    }

    if (!Array.isArray($cols) && typeof $cols == 'object') {
        $cols = Object.keys($cols)
    }
    if (Array.isArray($cols) && $cols.length > 0) {
        for (var k in obj) {
            if ($cols.indexOf(k) >= 0) {
                delete obj[k]
            }
        }
    }
    return obj
}

function __override($target, $data) {
    for (var k in $data) {
        $target.hasOwnProperty(k) && ($target[k] = $data[k])
    }
    return $target
}

const $startTime = Date.now()
var startTime = $startTime
function __getRunTime() {
    return Date.now() - $startTime
}

function __startTiming() {
    startTime = Date.now()
}

function __endTiming($trace = true) {
    var num = Date.now() - startTime
    if ($trace) {
        if (num < 1000) {
            console.log(num + ' ms')
        } else {
            console.log((num / 1000).toFixed(3) + ' s')
        }
    }
    return num
}

// __setTimeout(time)
// __setTimeout(time,cancelToken)
// __setTimeout(callback, time)
// __setTimeout(callback, time, cancelToken)
// __setTimeout(callback, callbackArgs, time)
// __setTimeout(callback, callbackArgs, time, cancelToken)
function __setTimeout(callback, callbackArgs, time, cancelToken) {
    return new Promise((resolved, reject) => {
        typeof time != 'number' &&
            (typeof callback == 'number'
                ? ((time = callback), (cancelToken = callbackArgs), (callback = callbackArgs = null))
                : ((cancelToken = time), (time = callbackArgs), (callbackArgs = null)))
        cancelToken &&
            cancelToken(() => {
                clearTimeout(timeout)
                reject('canceled')
            })
        let timeout = setTimeout(() => {
            callback ? resolved(callback(...callbackArgs)) : resolved()
        }, time)
    })
}

/**
 * 创建一个promise
 * @param executor 回调数组/回调方法
 * @return {*}
 * @private
 */
function __promise(executor, ...arg) {
    if (arg.length == 0) {
        if (Array.isArray(executor)) {
            return Promise.all(executor)
        }
        return new Promise(executor)
    } else {
        return new Promise((resolved, reject) => {
            try {
                executor(...arg, (...arg) => {
                    resolved(...arg)
                })
            } catch (e) {
                reject(e)
            }
        })
    }
}

/**
 * 防抖
 */
function __debounce(func, delay) {
    let debounceId
    return (...arg) => {
        clearTimeout(debounceId)
        debounceId = setTimeout(func, delay, ...arg)
    }
}

/**
 * 节流
 */
function __throttle(func, delay) {
    let executorTime = 0
    return (...arg) => {
        if (Date.now() - executorTime < delay) {
            return
        }
        executorTime = Date.now()
        func(...arg)
    }
}

const CHAR_SEQUENCE = Array.fromLength(10, v => String.fromCharCode(v + 48))
    .concat(Array.fromLength(26, v => String.fromCharCode(v + 65)))
    .concat(Array.fromLength(26, v => String.fromCharCode(v + 97)))
    .join('')

function randomString(len = 1) {
    len = parseInt(len.setRange([1, 128]))
    return Array.fromLength(len, v => CHAR_SEQUENCE[random(0, CHAR_SEQUENCE.length)]).join('')
}

function getBytesLen(str) {
    return `${str ?? ''}`.split('').reduce((n, v) => n + (v.charCodeAt(0) < 11904 ? 1 : 2), 0)
}

function getTraceTable($list, { column, color = {}, isNode = global.isNode, indexStart = 0, showIndex = true } = {}) {
    let keysLabel = typeof column === 'object' && !Array.isArray(column) ? column : {}
    let color_line = color.line || (isNode ? s => `\x1b[38;5;241m${s}\x1b[39m` : s => s)
    let color_column = color.column || (isNode ? s => `\x1b[1m\x1b[36m${s}\x1b[39m\x1b[22m` : s => s)
    let alginLeftKeys = []
    let columnHash = $list.reduce((o, v) => {
        let cols = Array.isArray(column) ? column : Object.keys(v)
        cols.forEach(k => {
            !alginLeftKeys.includes(k) && !isNum(v[k]) && alginLeftKeys.push(k)
            o[k] = Math.max(o[k] || 0, getBytesLen(keysLabel[k] || k), getBytesLen(v[k]))
        })
        return o
    }, {})
    let indexLen = getBytesLen($list.length - 1)
    let indexLineStr = '─'.repeat(indexLen)
    let keys = Object.keys(columnHash)
    let lineStrList = keys.map(k => '─'.repeat(columnHash[k] + 2))
    let lineStrTop = color_line(`┌${showIndex ? `${indexLineStr}┬` : ''}${lineStrList.join('┬')}┐`)
    let lineStrMid = color_line(`├${showIndex ? `${indexLineStr}┼` : ''}${lineStrList.join('┼')}┤`)
    let lineStrBtm = color_line(`└${showIndex ? `${indexLineStr}┴` : ''}${lineStrList.join('┴')}┘`)
    let splitLine = color_line('│')
    let tableStr = `${lineStrTop}\n`
    tableStr += `${splitLine}${showIndex ? `${color_column(c('#', indexLen))}${splitLine}` : ''}${keys
        .map(k => color_column(c(keysLabel[k] || k, columnHash[k] + 2)))
        .join(splitLine)}${splitLine}\n`
    tableStr += `${lineStrMid}\n`
    tableStr += $list
        .map(
            (v, i) =>
                `${splitLine}${showIndex ? `${num(i + indexStart, indexLen)}${splitLine}` : ''}${keys
                    .map(k => (alginLeftKeys.includes(k) ? l : r)(v[k], columnHash[k] + 2))
                    .join(`${splitLine}`)}${splitLine}`
        )
        .join(`\n${lineStrMid}\n`)
    tableStr += `\n${lineStrBtm}`
    return tableStr

    function c(val, len) {
        let valLen = getBytesLen(val)
        let start = parseInt((len - valLen) / 2)
        let end = len - valLen - start
        return `${' '.repeat(start)}${val}${' '.repeat(end)}`
    }
    function l(val, len) {
        return ` ${val ?? ''}${' '.repeat(len - getBytesLen(val) - 1)}`
    }

    function r(val, len) {
        return `${' '.repeat(len - getBytesLen(val) - 1)}${val ?? ''} `
    }
    function num(val, len) {
        return `${' '.repeat(len - getBytesLen(val))}${val ?? ''}`
    }
}
function traceTable($list, $options) {
    console.log(getTraceTable($list, $options))
}

function padStart(val, maxLength, fill) {
    return `${val}`.padStart(maxLength, `${fill}`)
}
function padEnd(val, maxLength, fill) {
    return `${val}`.padEnd(maxLength, `${fill}`)
}
function repeat(val, count = 0) {
    return `${val}`.repeat(count)
}
function pick(targetObj, ...keys) {
    if (typeof targetObj != 'object') {
        return null
    }
    keys = keys.flat()
    if (keys.length == 0) return {}
    return keys.mapToHash(
        v => {
            if (typeof v == 'string') {
                return v
            } else if (typeof v == 'object') {
                return Object.keys(v)[0]
            }
            return null
        },
        v => {
            if (typeof v == 'object') {
                return Object.values(v)[0]
            }
            return targetObj[v] ?? null
        }
    )
}

module.exports = {
    isArray,
    random,
    getRandomItem,
    int,
    paramFormat,
    __copy,
    isNum,
    trim,
    parseUrl,
    __merge,
    getObject,
    getType,
    defineProperty,
    isString,
    isEmpty,
    hasData,
    makeMap,
    equal,
    getObjectStr,
    __mergeAll,
    sortByString,
    compareString,
    __clone,
    __cloneWithFilter,
    __override,
    __setTimeout,
    __startTiming,
    __endTiming,
    __getRunTime,
    __promise,
    __debounce,
    randomString,
    traceTable,
    getTraceTable,
    padStart,
    padEnd,
    repeat,
    pick,
    getBytesLen,
}
