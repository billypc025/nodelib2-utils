/**
 * Created by billy on 2020/11/11.
 */

const { __setup } = require('../utils/setup')

Array.fromLength = (len, mapFn) =>
    mapFn
        ? typeof mapFn != 'function'
            ? new Array(len).fill(mapFn)
            : new Array(len).fill(0).map((v, i, a) => mapFn(i, a))
        : new Array(len).fill(0)

__setup(
    {
        toHash,
        mergeTo,
        mergeList,
        getCountGroupBy,
        toListBy,
        sortByKeyList,
        add,
        addFirst,
        remove,
        removeItem,
        removeLast,
        removeFirst,
        forEachReturn,
        forEachAsync,
        match,
        mapToHash,
        charSort,
        filterBy,
        firstItem,
        lastItem,
        replace,
        findLast,
        findLastIndex,
    },
    Array.prototype
)
__setup(
    {
        last: {
            get() {
                return this[this.length - 1]
            },
            set(v) {
                this[this.length - 1] = v
            },
        },
    },
    Array.prototype,
    'gs'
)

//数组转object
function toHash(key = 'id', valueGroup = false, valKey = '') {
    return this.reduce((hash, item) => {
        if (!valueGroup) {
            hash[item[key]] = item[valKey] || item
        } else {
            !hash[item[key]] && (hash[item[key]] = [])
            hash[item[key]].push(val)
        }
        return hash
    }, {})
}

/**
 * 数组根据指标标识,计算数量
 * @param {string} key
 * @param {string} totalKey
 * @return
 * @example
 * [{userId:'aaa'},{userId:'bbb'},{userId:'aaa'},{userId:'aaa'}].getCountGroupBy('userId')
 * // => {aaa:3, bbb:1}
 *
 * [{userId:'aaa'},{userId:'bbb'},{userId:'aaa'},{userId:'aaa'}].getCountGroupBy('userId','orderNum')
 * // => {aaa:{orderNum:3}, bbb:{orderNum:1}}
 */
function getCountGroupBy(key, totalKey) {
    var hash = {}
    for (var item of this) {
        var id = item
        if (typeof item == 'object') {
            id = item[key]
        }
        if (!hash[id]) {
            if (totalKey) {
                var obj = {}
                obj[totalKey] = 0
                hash[id] = obj
            } else {
                hash[id] = 0
            }
        }
        if (totalKey) {
            hash[id][totalKey]++
        } else {
            hash[id]++
        }
    }
    return hash
}

/**
 * 将传入的hash数据,更新到当前数组
 * @param kvObj 目标hash数据集(待合并数据)
 * @param key  源数据待更新字段名称
 * 【示例】
 * var list=[{id:1,name:"A",age:0},{id:2,name:"B",age:0}];
 * var hash={1:11,2:20};
 * list.mergeTo(hash, "id","age");
 * 结果: [{id:1,name:"A",age:11},{id:2,name:"B",age:20}]
 */
function mergeTo(kvObj, key, targetKey = null) {
    this.forEach(item => {
        let target = kvObj[item[key]]
        if (targetKey) {
            item[targetKey] = target
        } else {
            delete target[key]
            __merge(item, target, true)
        }
    })
    return this
}

/**
 * 将传入数组的数据合并到当前数组
 * @param list 目标数据数组(待合并数据)
 * @param key 目标数据的id名称(数据唯一标识)
 * @param mergeKey 源数据的id名称(源数据唯一标识)
 * 【示例】
 * var list1=[{id:1,name:"A"}];
 * var list2=[{sid:1,"age":11}]
 * list1.mergeList(list2,"sid","id");
 * 结果: [{id:1,name:"A",age:11}]
 */
function mergeList(list, key, mergeKey, mergeFunc = __merge) {
    let kvo = list.reduce((o, v) => ((o[v[key]] = v) && delete v[key] && !1) || o, {})
    this.forEach(v => mergeFunc(v, kvo[v[mergeKey]]))
    return this
}

/**
 * 生成数组内对象某一字段值的新数组
 * @param key 字段名
 * @param filterEmpty 过滤空数据
 * @return {Array.<T>}
 * 【示例】
 * var list = [{id: 1}, {id: 3}, {id: 2}, {id: 3}, {id: 2}, {id: 1}];
 * list = list.toListBy("id");
 * 结果: [1,3,2]
 */
function toListBy(key, filterEmpty = true) {
    return this.map(v => v[key]).filter((v, index, arr) => arr.indexOf(v) == index && (filterEmpty ? !!v : true))
}

function sortByKeyList(sortKey = '', sortList = []) {
    sortList.length > 0 &&
        this.sort((a, b) => {
            var valA = sortKey ? a[sortKey] : a
            var valB = sortKey ? b[sortKey] : b
            return sortList.indexOf(valA) - sortList.indexOf(valB)
        })
}

function add(...arg) {
    this.push.apply(this, arg)
    return this
}

function addFirst(...arg) {
    this.unshift.apply(this, arg)
    return this
}

function remove(startIndex, len = 1) {
    this.splice(startIndex, len)
    return this
}

function removeItem(item) {
    let index = this.indexOf(item)
    if (index >= 0) {
        this.splice(index, 1)
    }
    return this
}

function removeLast(n = 1) {
    return (n = Math.min(Math.max(1, n), this.length)), this.splice(this.length - n, n), this
}

function removeFirst(n = 1) {
    return (n = Math.min(Math.max(1, n), this.length)), this.splice(0, n), this
}

function forEachReturn(f) {
    return this.forEach(f), this
}

function forEachAsync(f) {
    let self = this
    return new Promise((resolved, reject) => {
        ;(async function () {
            for (let i = 0; i < self.length; i++) {
                await f(self[i], i, self)
            }
            resolved(self)
        })()
    })
}

function match(f) {
    let result = null
    for (let i = 0; i < this.length; i++) {
        result = f(this[i], Number(i), this)
        if (result) return result
    }
    return result
}

function mapToHash(f1, f2 = null) {
    return this.length == 0
        ? {}
        : (!!f2 && ([f2, f1] = [f1, f2]),
          this.reduce(
              (o, v, i, a, k) => (
                  (k = f2 ? f2(v, i, a, o) : v),
                  ['string', 'number'].includes(typeof k) && k != '' && (o[k] = f1 ? f1(v, i, a, o) : k),
                  o
              ),
              {}
          ))
}

Array.SORT_length_char = 0 //长度升序 + 字符unicode升序
Array.SORT_char_length = 1 //字符unicode升序 + 长度升序
Array.SORT_num_char_length = 2 //数字优先 + 字符unicode升序 + 长度升序

const _charSortCore = [
    (a, b) => {
        ;(a = `${a}`) && (b = `${b}`)
        if (a.length != b.length) {
            return a.length - b.length
        }
        let i = 0
        while (a.charCodeAt(i) == b.charCodeAt(i) && i < a.length - 1) {
            i++
        }
        return a.charCodeAt(i) - b.charCodeAt(i)
    },
    (a, b) => {
        ;(a = `${a}`) && (b = `${b}`)
        let i = 0,
            a0 = a.charCodeAt(i),
            b0 = b.charCodeAt(i),
            minLen = Math.min(a.length, b.length)
        while (a0 == b0 && i < minLen - 1) {
            i++
            a0 = a.charCodeAt(i)
            b0 = b.charCodeAt(i)
        }
        return a0 - b0 || a.length - b.length
    },
    (a, b) => {
        ;(a = `${a}`) && (b = `${b}`)
        if (isNum(a) && isNum(b)) {
            return Number(a) - Number(b)
        } else if (isNum(a)) {
            return -1
        } else if (isNum(b)) {
            return 1
        }
        let i = 0,
            a0 = a.charCodeAt(i),
            b0 = b.charCodeAt(i),
            minLen = Math.min(a.length, b.length)
        while (a0 == b0 && i < minLen - 1) {
            i++
            a0 = a.charCodeAt(i)
            b0 = b.charCodeAt(i)
        }
        return a0 - b0 || a.length - b.length
    },
]

function charSort(executor = null, rule = 0) {
    executor !== null && typeof executor == 'number' && (rule = executor) && (executor = null)
    return this.sort((a, b) => (executor && executor(_charSortCore[rule], a, b)) || _charSortCore[rule](a, b))
}
function filterBy(filtValue, option = true) {
    if (typeof filtValue === 'function') {
        return this.filter(filtValue)
    } else if (Array.isArray(filtValue)) {
        let { key, contain, fix } = getFilterOption(option)
        return this.filter(v => {
            v = getFilterValueByOptionKey(v, key)
            let r
            if (fix === 'prefix') {
                r = filtValue.some(f => v.startsWith(f))
            } else if (fix === 'suffix') {
                r = filtValue.some(f => v.endsWith(f))
            } else {
                r = filtValue.includes(v)
            }
            contain === false && (r = !r)
            return r
        })
    } else if (typeof filtValue === 'string') {
        let { key, contain, fix } = getFilterOption(option)
        this.filter(v => {
            v = getFilterValueByOptionKey(v, key)
            let r
            if (fix === 'prefix') {
                r = v.startsWith(filtValue)
            } else if (fix === 'suffix') {
                r = v.endsWith(filtValue)
            } else {
                r = filtValue === v
            }
            contain === false && (r = !r)
            return r
        })
    } else if (typeof filtValue === 'boolean') {
        return this.filter(v => !!v === filtValue)
    } else if (getType(filtValue) === 'RegExp') {
        return this.filter(v => filtValue.test(v))
    }
    return this
}
function getFilterOption(option) {
    if (typeof option == 'object') {
        let { key = '', contain = true, fix = '' } = option
        return { key, contain, fix }
    } else if (typeof option == 'boolean') {
        return { key: '', contain: option, fix: '' }
    } else if (typeof option == 'string') {
        return { key: '', contain: true, fix: option }
    }
    return { key: '', contain: true, fix: '' }
}
function getFilterValueByOptionKey(value, optionsKey) {
    if (optionsKey) {
        if (typeof optionsKey == 'string') {
            return value[optionsKey]
        } else if (typeof optionsKey == 'function') {
            return optionsKey(value)
        }
    }
    return value
}
function firstItem(n = 1) {
    n = Math.min(Math.max(1, n), this.length)
    return this.slice(0, n)
}
function lastItem(n = 1) {
    n = Math.min(Math.max(1, n), this.length)
    return this.slice(this.length - n)
}
function replace(fn) {
    for (let i = this.length - 1, v; i >= 0; i--) {
        v =
            fn &&
            fn(this[i], i, this, () => {
                this.splice(i, 1)
            })
        v !== undefined && (this[i] = v)
    }
    return this
}
function findLast(fn) {
    for (let i = this.length - 1; i >= 0; i--) {
        if (fn(this[i], i, this)) {
            return this[i]
        }
    }
    return null
}
function findLastIndex(fn) {
    for (let i = this.length - 1; i >= 0; i--) {
        if (fn(this[i], i, this)) {
            return i
        }
    }
    return null
}
