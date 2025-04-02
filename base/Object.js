const { __setup } = require('../utils/setup')

function isKey(k) {
    return (typeof k == 'string' && k.length > 0) || typeof k == 'number'
}

__setup(
    {
        __forEach(fn) {
            return Object.keys(this).forEach(k => fn(k, this[k], this)), this
        },
        async __forEachAsync(fn) {
            let keys = Object.keys(this)
            for (let i = 0; i < keys.length; i++) {
                await fn(keys[i], this[keys[i]], this)
            }
            return this
        },
        __every(fn) {
            return Object.keys(this).every(k => fn(k, this[k], this))
        },
        __some(fn) {
            return Object.keys(this).some(k => fn(k, this[k], this))
        },
        __map(f1, f2 = null) {
            return !f1 && !f2
                ? { ...this }
                : (!!f2 && ([f2, f1] = [f1, f2]),
                  Object.keys(this).reduce(
                      (o, k) => (f2 && (k = f2(k, this[k], o)), isKey(k) && (o[k] = f1(this[k], k, o)), o),
                      {}
                  ))
        },
        __toArray(fn = null) {
            return fn
                ? Object.keys(this).reduce((list, k) => (list.push(fn(k, this[k], this, list)), list), [])
                : Object.keys(this).map(k => [k, this[k]])
        },
        __add(obj) {
            return obj && Object.keys(obj).forEach(k => (this[k] = obj[k])), this
        },
        __filter(fn) {
            return Object.keys(this)
                .filter(k => fn(k, this[k], this))
                .reduce((o, k) => ((o[k] = this[k]) && !1) || o, {})
        },
        __remain(...list) {
            list.length == 1 && Array.isArray(list[0]) && (list = list[0])
            Array.isArray(list) &&
                list.length > 0 &&
                Object.keys(this).forEach(k => !list.includes(k) && delete this[k])
            return this
        },
    },
    Object.prototype
)
__setup(
    {
        __keys() {
            return Object.keys(this)
        },
        __key0() {
            return Object.keys(this)[0]
        },
        __values() {
            return Object.values(this)
        },
        __value0() {
            return Object.values(this)[0]
        },
    },
    Object.prototype,
    'get'
)
