const TAG_KEYS = ['configurable', 'enumerable', 'writable']

function __def(...arg) {
    let {
        obj,
        tag = '',
        properties,
    } = Function.getParamsWith(
        ['obj:object|Function|any[], tag:string, properties:object', 'obj:object|Function|any[], properties:object'],
        arg
    )

    // for (let key in properties) {
    //     let v = properties[key]
    //     if (getType(v) === '__def_prop') {
    //         if (!!v.get || !!v.set) {
    //             properties[key] = deleteTag({ ...getTag(tag), ...v }, 'vw')
    //         } else {
    //             properties[key] = deleteTag({ ...getTag(tag), ...v }, 'gs')
    //         }
    //     } else {
    //         properties[key] = __def_value(tag, v)
    //     }
    // }

    let toBindObj = tag.indexOf('b') >= 0
    toBindObj && (tag = tag.replace(/b/g, ''))

    Object.defineProperty(obj, toBindObj ? '__def_bind' : '__def', { value: true, ...getTag('') })
    return Object.defineProperties(
        obj,
        Object.keys(properties).reduce((o, key) => {
            let v = properties[key]
            if (getType(v) === '__def_prop') {
                if (!!v.get || !!v.set) {
                    o[key] = deleteTag({ ...getTag(tag), ...(toBindObj ? bind(key, v, obj) : v) }, 'vw')
                } else {
                    o[key] = deleteTag({ ...getTag(tag), ...(toBindObj ? bind(key, v, obj) : v) }, 'gs')
                }
            } else {
                o[key] = __def_value(tag, toBindObj ? bind(key, v, obj) : v)
            }
            return o
        }, {})
    )
}

function __def_bind(...arg) {
    let {
        obj,
        tag = 'b',
        properties,
    } = Function.getParamsWith(
        ['obj:object|Function|any[], tag:string, properties:object', 'obj:object|Function|any[], properties:object'],
        arg
    )
    tag.indexOf('b') < 0 && (tag += 'b')
    return __def(obj, tag, properties)
}

function bind(k, v, obj) {
    if (getType(v) === '__def_prop') {
        let resultBound = { ...v }
        if (v.get) {
            resultBound.get = bind(k, v.get, obj)
        }
        if (v.set) {
            resultBound.set = bind(k, v.set, obj)
        }
        if (v.value) {
            resultBound.value = bind(k, v.value, obj)
        }
        return resultBound
    } else if (typeof v === 'function' && !v.__def && !v.__def_bind) {
        let funcBody = v.toString()
        if (funcBody.match(/(class .+?){/) || funcBody.indexOf('this.') < 0) {
            return v
        }
        let bound = v.bind(obj)
        Object.defineProperty(bound, 'toString', { value: v.toString.bind(v) })
        Object.defineProperty(bound, 'bind', {
            value: Object.defineProperty(o => v.bind(o), 'toString', { value: v.toString.bind(v) }),
        })
        return bound
    }

    return v
}

function __def_value(...arg) {
    return getValue('value', arg)
}

function __def_get(...arg) {
    let val = arg.pop()
    return deleteTag(getValue('get', [...arg, typeof val === 'function' ? val : () => val]), 'w')
}

function __def_set(...arg) {
    return deleteTag(getValue('set', arg), 'w')
}

function __def_gs(...arg) {
    let {
        tag = '',
        get,
        set,
    } = Function.getParamsWith(['tag:string, get:Function, set:Function', 'get:Function, set:Function'], arg)
    return deleteTag({ ...getTag(tag), ...(!!get ? { get } : {}), ...(!!set ? { set } : {}) }, 'w')
}

function getValue(propertyKey, arg) {
    let { tag = '', value } = Function.getParamsWith(['tag:string, value:any', 'value:any'], arg)
    return {
        ...getTag(tag),
        [propertyKey]: value,
        get [Symbol.toStringTag]() {
            return '__def_prop'
        },
    }
}

function deleteTag(obj, tag) {
    return Object.keys(obj).reduce((o, k) => {
        tag.indexOf(k.charAt(0)) >= 0 && delete o[k]
        return o
    }, obj)
}

function getTag(tag) {
    tag = tag.toLowerCase()
    return TAG_KEYS.reduce((obj, v) => ((obj[v] = tag.indexOf(v.charAt(0)) >= 0) && 0) || obj, {})
}

module.exports = {
    __def,
    __def_bind,
    __def_value,
    __def_get,
    __def_set,
    __def_gs,
}
