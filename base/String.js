String.prototype.parseInt = function (base = 10) {
    let str = this
    return parseInt(str, base)
}

String.prototype.trim = function () {
    let str = this
    return !!str ? str.replace(/^\s+|\s+$/g, '') : ''
}

String.prototype.paramFormat = function (...arg) {
    let str = this
    return ((typeof arg[0] === 'object' && (arg = arg[0]) && 0) || Object.keys(arg)).reduce(
        (str, k) => str.replace(new RegExp(`\\{${k}\\}`, 'g'), arg[k]),
        str
    )
}

String.prototype.toURL = function (baseOrPath) {
    let str = this
    if (/^https{0,1}\:\/\/[^\s]+/.test(str)) {
        return new URL(baseOrPath || '/', str)
    }
    return new URL(str, baseOrPath)
}

String.prototype.compare = function (str2, rule = 'lengthFirst') {
    let str1 = this
    str2 = `${str2}`
    if (!str1 && !str2) {
        return 0
    } else if (!str1 || !str2) {
        return str1.length - str2.length > 0 ? 1 : -1
    }
    if (!['lengthFirst', 'charFirst'].includes(rule)) {
        rule = 'lengthFirst'
    }
    if (rule === 'lengthFirst') {
        if (str1.length === str2.length) {
            return compareWithChar(str1, str2)
        } else {
            return str1.length - str2.length > 0 ? 1 : -1
        }
    } else if (rule === 'charFirst') {
        if (str1.startsWith(str2) || str2.startsWith(str1)) {
            return str1.length - str2.length > 0 ? 1 : -1
        } else {
            return compareWithChar(str1, str2)
        }
    }
    return 0
}

function compareWithChar(a, b) {
    let i = 0,
        len = Math.max(a.length, b.length)
    while (i < len) {
        let a0 = a.charCodeAt(i) || 0
        let b0 = b.charCodeAt(i) || 0
        if (a0 !== b0) {
            return a0 - b0 > 0 ? 1 : -1
        }
        i++
    }
    return 0
}

String.prototype.format = function (template = '#,##0') {
    let n = this
    n = `${n}`
    if (!isNum(n)) {
        return n
    }
    n -= 0
    let isPcent = template.includes('%')
    isPcent && (n *= 100)
    let integer = `${n}`,
        negative = n < 0,
        decimal = ''
    negative && (integer = integer.substring(1))
    let pointIndex = integer.indexOf('.')
    if (pointIndex === 0) {
        decimal = integer.substring(1)
        integer = '0'
    } else if (pointIndex > 0) {
        decimal = integer.substring(pointIndex + 1)
        integer = integer.substring(0, pointIndex)
    }
    template === '%' && (decimal = '')
    let eMatch = template.match(/0(\.0+){0,1}E\+(0+)/)
    if (eMatch) {
        let [, { length: decLen }, { length: eLen }] = eMatch
        decLen -= 1
        let e = `${integer.length - 1}`.padStart(eLen, '0')
        decimal = `${integer.substring(1)}${decimal}`
        decimal = `${decimal.padEnd(decLen, '0').substring(0, decLen)}E+${e}`
        integer = integer.substring(0, 1)
    } else {
        let deciMatch = template.match(/0\.0+/)
        if (deciMatch) {
            let len = deciMatch[0].substring(2).length
            decimal = decimal.padEnd(len, '0')
            decimal = decimal.substring(0, len)
        }
        let commaMatch = template.match(/#,##/)
        if (commaMatch && integer.length > 3) {
            let i = integer.length % 3
            i == 0 && (i = 3)
            integer = integer.substring(0, i) + integer.substring(i).replace(/\d{3}/g, v => `,${v}`)
        }
    }
    return `${negative ? '-' : ''}${integer}${decimal ? '.' + decimal : ''}${isPcent ? '%' : ''}`
}
