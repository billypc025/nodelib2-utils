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
module.exports = (requireModule, scope = $global) => {
    Object.assign(scope, requireModule)
}
