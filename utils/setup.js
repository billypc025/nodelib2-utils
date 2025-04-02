let $global =
    typeof globalThis !== 'undefined'
        ? globalThis
        : typeof global !== 'undefined'
        ? global
        : typeof window !== 'undefined'
        ? window
        : {}

$global.isNode =
    typeof process !== 'undefined' &&
    typeof process.release !== 'undefined' &&
    typeof process.release.name === 'string' &&
    typeof process.versions !== 'undefined' &&
    typeof process.versions.node === 'string' &&
    typeof __dirname === 'string' &&
    typeof __filename === 'string' &&
    typeof Buffer === 'function'

$global.isBrowser =
    typeof navigator !== 'undefined' &&
    typeof navigator.userAgent !== 'undefined' &&
    typeof window !== 'undefined' &&
    typeof window.document !== 'undefined' &&
    typeof document !== 'undefined' &&
    typeof document.querySelectorAll === 'function' &&
    typeof document.querySelector === 'function' &&
    typeof document.createElement === 'function' &&
    typeof FormData === 'function' &&
    typeof localStorage !== 'undefined' &&
    typeof localStorage.getItem === 'function' &&
    typeof TouchEvent === 'function'

$global.global = $global

$global.__forEachAsync = async (target, fn) => {
    if (Array.isArray(target)) {
        for (let i = 0; i < target.length; i++) {
            await fn(target[i], i, target)
        }
    } else if (typeof target == 'object') {
        let keys = Object.keys(target)
        for (let i = 0; i < keys.length; i++) {
            await fn(target[keys[i]], keys[i], target)
        }
    } else {
        await fn(target)
    }
    return target
}
$global.__sleep = (millisecond = 0) => {
    let startTime = Date.now()
    white(Date.now() - startTime < millisecond)
}

function __path(v) {}

module.exports = {
    __setup(requireModule, scope, ...arg) {
        scope = scope || $global
        let dk = 'value',
            filter = null
        arg.forEach(v => {
            typeof v == 'string' && (dk = v)
            Array.isArray(v) && v.length > 0 && v.every(i => typeof i === 'string') && (filter = v)
        })
        filter && (requireModule = pick(requireModule, filter))
        Object.defineProperties(
            scope,
            requireModule.__map(v => (dk == 'gs' ? { ...v } : { [dk]: v }))
        )
    },
    __export(modules) {
        return __def(
            {},
            modules.__map(v => __def_get('e', () => v))
        )
    },
}
