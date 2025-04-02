/**
 * Created by billy on 2017/2/20.
 */

const { __setup, __export } = require('./utils/setup')
require('./base/Object') // Object 扩展
require('./base/Function') // Function 扩展
require('./base/Array') // Array 扩展
require('./base/String') // String 扩展
require('./base/Number') // Number 扩展
__setup(require('./utils/utils')) // 常用工具方法
__setup(require('./utils/instance')) // 实例缓存
__setup(require('./utils/defineProperty')) // Object.defineProperties 扩展

global.trace = console.log

module.exports = __setup({
    g: __export({
        time: require('./utils/time'),
    }),
    __setup,
})
