/**
 * Created by billy on 2017/2/20.
 */

const setup = require('./utils/setup')
require('./base/Function') // Function 扩展
require('./base/Array') // Array 扩展
require('./base/String') // String 扩展
require('./base/Number') // Number 扩展
setup(require('./utils/utils')) // 常用工具方法
setup(require('./utils/instance')) // 实例缓存
setup(require('./utils/defineProperty')) // Object.defineProperties 扩展
global.trace = console.log
global.g = {}
g.time = require('./utils/time') //时间日期 模块
g.setup = setup

module.exports = g
