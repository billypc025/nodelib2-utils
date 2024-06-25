const varName = '[a-zA-Z0-9_$#]+'
const colon = '\\?{0,1}\\:'
const base = '(object|string|boolean|number|bigint|symbol|function|Function|any)'
const array = `${base}\\[\\]`
const object = `{[^{}]+}`
const wildcard = 'object|\\*'
const restArgs = `\\.\\.\\.(${varName})`
const typeRegExp = new RegExp(`${varName}${colon}(((${array})|${base}|${object})\\|*)+|${wildcard}|${restArgs}`, 'g')
const restArgsRegExp = new RegExp(restArgs)
const typeDetailRegExp = /({[^{}]+})|([a-zA-Z0-9_$|\[\]]+)|(\?\:)|(\.\.\.[a-zA-Z0-9_$]+)/g

function getParamsWith($paramScheme, [...arg]) {
    let paramSchemeMatched
    for (let paramLine of $paramScheme) {
        let paramGroup = paramLine
            .replace(/\s+?/g, '')
            .match(typeRegExp)
            .map(v => v.match(typeDetailRegExp))
        if (
            paramGroup.every((v, i) => {
                let type = v[v.length - 1]
                return (
                    type === 'any' ||
                    sortType(arg[i], type) ||
                    (arg.length <= i && v[1] === '?:') ||
                    (i === paramGroup.length - 1 && restArgsRegExp.test(type))
                )
            }) &&
            paramGroup.filter(v => v.length === 2).length <= arg.length
        ) {
            paramSchemeMatched = paramGroup
            break
        }
    }
    if (!paramSchemeMatched) {
        console.log('\x1b[1m\x1b[31mIncorrect parameter input: \x1b[39m\x1b[22m', arg)
        throw new Error('Incorrect parameter input.')
    }

    if (paramSchemeMatched.join('') === 'object') {
        return arg[0]
    }

    return paramSchemeMatched.reduce((obj, v, i) => {
        let m = v[0].match(restArgsRegExp)
        if (i === paramSchemeMatched.length - 1 && m) {
            obj[m[1]] = arg.slice(i)
        } else if (arg.length > i) {
            obj[v[0]] = arg[i]
        }
        return obj
    }, {})
}

function sortType(val, targetType) {
    let objectTypeMatch = targetType.match(object)
    if (objectTypeMatch && typeof val === 'object') {
        return getObjectType(targetType).every(t => {
            if (t[0] in val) {
                return sortType(val[t[0]], t[t.length - 1])
            }
            return t[1] === '?:' && t.length === 3
        })
    } else {
        let valType = getValueType(val)
        if (targetType.indexOf('|') > 0) {
            return targetType.split('|').some(v => {
                if (v.toLowerCase() === valType) {
                    return true
                }
                if (Array.isArray(valType)) {
                    return (
                        v === 'any[]' ||
                        valType[0] + '[]' === v ||
                        (valType[0] === 'any' && v.substring(v.length - 2) === '[]')
                    )
                }
                return false
            })
        }
        if (Array.isArray(valType)) {
            return (
                targetType === 'any[]' ||
                valType[0] + '[]' === targetType ||
                (valType[0] === 'any' && v.substring(v.length - 2) === '[]')
            )
        }
        return targetType === valType
    }
}

function getValueType($val) {
    let type = typeof $val
    if (type !== 'object') {
        return type
    } else if (Array.isArray($val)) {
        if ($val.length === 0) return ['any']
        return [typeof $val[0]]
    }
    return 'object'
}

function getObjectType(typeString) {
    typeString = typeString.substring(1, typeString.length - 1)
    return typeString.match(typeRegExp).map(v => v.match(typeDetailRegExp))
}

module.exports = getParamsWith
