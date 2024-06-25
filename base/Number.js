Number.prototype.setRange = function (a, b) {
    if (Array.isArray(a)) {
        ;[a, b] = a
    }
    let n = this
    a != null && (n = Math.max(a, n))
    b != null && (n = Math.min(n, b))
    return n
}

Number.prototype.inRange = function (a, b) {
    if (Array.isArray(a)) {
        ;[a, b] = a
    }
    let n = this
    let r = true
    a != null && (r = r && n >= a)
    b != null && (r = r && n <= b)
    return r
}

Number.prototype.max = function (...arg) {
    let n = this
    if (arg.length == 0 && Array.isArray(arg)) {
        arg = arg[0]
    }
    arg = arg.map(v => (isNum(v) ? v - 0 : v)).filter(v => typeof v === 'number')
    return arg.length > 0 ? Math.max(n, ...arg) : n
}

Number.prototype.min = function (...arg) {
    let n = this
    if (arg.length == 0 && Array.isArray(arg)) {
        arg = arg[0]
    }
    arg = arg.map(v => (isNum(v) ? v - 0 : v)).filter(v => typeof v === 'number')
    return arg.length > 0 ? Math.min(n, ...arg) : n
}

Number.prototype.floor = function () {
    let n = this
    return Math.floor(n)
}

Number.prototype.ceil = function () {
    let n = this
    return Math.ceil(n)
}

Number.prototype.round = function () {
    let n = this
    return Math.round(n)
}

Number.prototype.abs = function () {
    let n = this
    return Math.abs(n)
}

Number.prototype.random = function (round = true) {
    let n = this
    let ranNum = Math.random(n) * n
    return !!round ? Math.round(ranNum) : ranNum
}
Number.prototype.toDegree = function () {
    let n = this
    return (n / Math.PI) * 180
}
Number.prototype.toRadian = function () {
    let n = this
    return (n / 180) * Math.PI
}
Number.prototype.parseInt = function (base = 10) {
    let n = this
    return parseInt(n, base)
}

Number.prototype.pow = function (power) {
    let n = this
    return Math.pow(n, power)
}

Number.prototype.format = function (template = '#,##0') {
    let n = this,
        isPcent = template.includes('%')
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
