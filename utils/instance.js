/**
 * Created by billy on 2019/11/4.
 */
var _instanceHash = {}
/**
 * 根据类定义创建实例
 */
function _(...arg) {
    let { id, def, args } = Function.getParamsWith(['id:string, def:Function, ...args', 'def:Function, ...args'], arg)

    if (typeof def != 'function') {
        if (id) {
            _instanceHash[id] = def
        }
        return def
    }

    if (!def.prototype.constructor.name) {
        if (id) {
            _instanceHash[id] = def
        }
        return def
    }

    var obj = new def(...args)
    if (id) {
        _instanceHash[id] = obj
    }
    return obj
}

/**
 * 根据id返回运行时创建的实例
 * @param id 实例id
 * @return {*}
 */
function $(id) {
    if (/^#.+/.test(`${id}`)) {
        return _instanceHash[id.substring(1)]
    }
    return null
}

class GError extends Error {
    constructor($data) {
        super('gError')
        this.data = $data
    }
}

module.exports = {
    _,
    $,
    GError,
}
