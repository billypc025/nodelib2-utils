# nodelib2-utils

**JavaScript 实用程序库，为常用内置对象 `Function`、`Array`、`Number`、`String` 提供了好用的额外功能，并且提供了一些实用的全局方法（如`trace`用于结果打印、`__def`用于自定义属性、`paramFormat`用于格式化字符串、`__merge`用于合并对象、`sortString`可根据排序规则对字符串序列进行排序）**

Implement more convenient API calls which base on JavaScript, enjoy it.

## install

```bash
npm i --save nodelib2-utils
```

## API

-   [Function extras API](./md/Function.md)
-   [Array extras API](./md/Array.md)
-   [String extras API](./md/String.md)
-   [Number extras API](./md/Number.md)
-   [Object extras API](./md/Object.md)
-   [Global function](./md/global.md)
-   [Global tool: g.time](./md/time.md)

## Examples

-   [Example 1: 实现一个简单的 mock data 生成器](#1-实现一个简单的-mock-data-生成器)
-   [Example 2: 实现 Excel 中用于解析单元格格式字符串的例子例子中演示了 number 如何进行转换](#2-excel-中用于解析单元格格式字符串的例子例子中演示了-number-如何进行转换)
-   [Example 3: 实现一个规则匹配器，用于解析 .gitignore 配置列表](#3-实现一个规则匹配器用于解析-gitignore-配置列表)

## Usage

### `Function.getParamsWith` 实现重构

```javascript
// 用 Function.getParamsWith 要实现如下定义：
/*
  function __def(obj: object | Function | any[], tag: string, properties: object)
  function __def(obj: object | Function | any[], properties: object)
*/

require('nodelib2-utils')

function __def(...arg) {
    let {
        obj,
        tag = '',
        properties,
    } = Function.getParamsWith(
        ['obj:object|Function|any[], tag:string, properties:object', 'obj:object|function|any[], properties:object'],
        arg
    )
    trace({ obj, tag, properties })
}
```

### `String.prototype.paramFormat` 进行字符串变量替换

> 还可以使用全局方法 `paramFormat`

```javascript
require('nodelib2-utils')

let url = 'https://www.npmjs.com/search?q={search}'
url.paramFormat({ search: 'lodash' })

let productListPage = 'https://domainname.com/product/{catalog}/{page}'
productListPage.paramFormat({ catalog: 'tools', page: 1 })

let content = 'Sorry, {account} already exists. You can try using {account}{ranNum}'
paramFormat(content, { account: 'tom', ranNum: random(1000, 9999) })

let tips = '正确摆放的顺序是: {0}, {1}, {2}, {3}。'
tips.paramFormat('香蕉', '苹果', '橙子', '猕猴桃')
```

### `String.prototype.compare` 进行字符串排序

```javascript
require('nodelib2-utils')

let list = ['a', 'a1', 'a2', 'a10', 'b', 'b1', 'b2', 'b10']

// 逐字比较, 按 Ascii code 升序排列
list.sort((a, b) => compareString(a, b, 'charFirst'))
// => ['a', 'a1', 'a10', 'a2', 'b', 'b1', 'b10','b2']

// 按长度排序, 相同长度逐字比较 Ascii
list.sort((a, b) => compareString(a, b, 'lengthFirst'))
// => ['a', 'b', 'a1', 'a2', 'b1', 'b2', 'a10', 'b10']
```

### `String.prototype.format` 格式化字符串

```javascript
require('nodelib2-utils')

// 保留1位小数
'40.123'.format('0.0') // => '40.1'

// 千分位逗号分隔 (不保留小数)
'403424.123'.format() // => '403,424'

// 千分位逗号分隔+保留2位小数
'403424.1'.format('#,##0.00') // => '403,424.10'

//科学计数法
'40.123'.format('0.0E+00') // => '4.0E+01'
'40.123'.format('0.00E+0') // => '4.01E+1'
'4723525622347'.format('0.00E+0') // => '4.72E+12'

//百分比
'1'.format('0.00%') // => '100.00%'
'0.45342'.format('0.00%') // => '45.34%'
'0.45342'.format('%') // => '45%'
```

-   [参看: 更多 String 增强方法](./md/String.md)

### `Array.fromLength`快速生成 Array

```javascript
// Array.fromLength(length) 比 Array.from({length}) 速度快一倍

require('nodelib2-utils')

// Each item is 0
Array.fromLength(5) // => [0, 0, 0, 0, 0]

// Each item is index
Array.fromLength(5, v => v) // => [0, 1, 2, 3, 4]

// use mapFn
Array.fromLength(5, v => String.fromCharCode(v + 65)) // => [ 'A', 'B', 'C', 'D', 'E' ]
```

### `Array.prototype.mapToHash` 将 Array 转换为 key-valye object

```javascript
require('nodelib2-utils')

const logTypeList = ['info', 'warn', 'error', 'success']
const output = logTypeList.mapToHash(v => msg => trace(`[${v.toUpperCase()}] ${msg}`))

output.info('hello world, farewell.')
// => [INFO] hello world, farewell.
```

### `Array.prototype.charSort` 对字符进行排序

```javascript
require('nodelib2-utils')

let list = ['a', 'a1', 'a2', 'a10', 'b', 'b1', 'b2', 'b10']

list.charSort(0)
// => ['a', 'b', 'a1', 'a2', 'b1', 'b2', 'a10', 'b10']

//字符unicode升序 + 长度升序
list.charSort(1)
// => ['a', 'a1', 'a10', 'a2', 'b', 'b1', 'b10','b2']

// 对 name 进行比较并排序
let userList = [{ name: 'tom' }, { name: 'tim' }, { name: 'tina' }]
userList.charSort((f, a, b) => f(a.name, b.name), 0)
// => [ { name: 'tim' }, { name: 'tom' }, { name: 'tina' } ]
```

-   [参看: 更多 Array 增强方法](./md/Array.md)

### 用 Number.prototype.setRange 对数字范围进行限制, 通常用于确保值域安全

```javascript
require('nodelib2-utils')

const num = 80

// 设置上限 & 下限
num.setRange([0, 100]) // => 80
num.setRange([90, 100]) // => 90
num.setRange([0, 10]) // => 10

// 仅设置下限
num.setRange([0]) // => 80
num.setRange([90]) // => 90

// 仅设置上限
num.setRange([, 100]) // => 80
num.setRange([, 50]) // => 50
```

### 用 `Number.prototype.inRange` 对数字范围进行检验, 通常用于值域校验

```javascript
require('nodelib2-utils')

const num = 80
// 下限 < num < 上限
num.inRange([0, 100]) // => true
num.inRange([0, 10]) // => false
num.inRange([90, 100]) // => false

// 下限 < num
num.inRange([0]) // => true
num.inRange([90]) // => false

// num < 上限
num.inRange([, 0]) // => false
num.inRange([, 90]) // => true
```

-   [参看: 更多 Number 增强方法](./md/Number.md)

### 日期时间增强工具 `g.time`

-   [参看: g.time API](./md/time.md)

```javascript
require('nodelib2-utils')

let timeStamp = 1474528152000

g.time.formatTime(timeStamp) // => 2016-08-22 15:09:12
g.time.formatTime(timeStamp, 'YYYY-MM-DD hh:mm:ss') // => 2016-08-22 15:09:12
g.time.formatTime(timeStamp, 'YYYY年M月') // => 2016年8月
g.time.formatTime(timeStamp, 'M月D日h时m分s秒') // => 8月22日15时9分12秒
g.time.formatTime(timeStamp, 'hh:mm:ss M/D/YY') // => 15:09:12 8/22/16
g.time.formatTime(timeStamp, 'h:m:s MM/DD/YY') // => 15:9:12 08/22/16
```

```javascript
// g.time.getMonth
let { year, month, list } = g.time.getMonth(1474528152000)
let calendar = `${year} 年 ${month} 月\n${'-'.repeat(21)}`
list.forEach(([, m, d], i) => {
    i % 7 === 0 && (calendar += '\n')
    if (m == month) {
        calendar += padStart(d, 3, ' ')
    } else {
        calendar += ' '.repeat(3)
    }
})
trace(calendar)

/*
2016 年 8 月
---------------------
              1  2  3
  4  5  6  7  8  9 10
 11 12 13 14 15 16 17
 18 19 20 21 22 23 24
 25 26 27 28 29 30 
*/
```

## Example

#### 1. 实现一个简单的 mock data 生成器

> 例子中使用到了如下方法：
>
> -   `Array.fromLength` _生成指定项及内容的数组_
> -   `mapToHash` _将数组转换为 键值对_
> -   全局方法：`random` _根据规则获取随机数_

```javascript
require('nodelib2-utils')

const RULES = {
    '+1': (k, base) => {
        RULES.__order__ = RULES.__order__ || {}
        RULES.__order__[k] = RULES.__order__[k] || base
        RULES.__order__[k]++
        return RULES.__order__[k]
    },
    'random': (k, baseValue, range) => {
        let num = random(range.split('-'))
        if (typeof baseValue === 'string') {
            if (baseValue === '') {
                return Array.fromLength(num, i => String.fromCharCode(random(97, 97 + 26))).join('')
            } else {
                return ''.padEnd(num, baseValue)
            }
        }
        return num
    },
}

function mockObject(config) {
    return Object.keys(config).mapToHash(
        k => k.split('|')[0],
        k => {
            let val = config[k]
            let rule = k.split('|')[1]
            let ruleParam = rule
            if (rule.match(/^\d+-\d+$/)) {
                rule = 'random'
            }
            let key = k.split('|')[0]
            if (typeof val === 'string') {
                return RULES[rule](key, val, ruleParam)
            } else if (typeof val === 'number') {
                return RULES[rule](key, val, ruleParam)
            }
        }
    )
}
function mockList(item, numRule) {
    let num = random(numRule.split('-'))
    return Array.fromLength(num, v => item)
}

function mock(config) {
    if (Array.isArray(config)) {
        return config.map(v => mockObject(v))
    } else if (typeof config === 'object') {
        return mockObject(config)
    }
}

let mockData = mock(
    mockList(
        {
            'id|+1': 0,
            'name|6-20': '',
            'age|10-30': 0,
        },
        '3-6'
    )
)

trace(mockData)
/*
[
  { id: 1, name: 'yjcmburfom', age: 23 },
  { id: 2, name: 'uftlwzuuubywmzyx', age: 22 },
  { id: 3, name: 'chyxpubyt', age: 14 },
  { id: 4, name: 'vtvdcvnbfevcr', age: 28 },
  { id: 5, name: 'wefbbdqcgvoqbtbs', age: 25 }
]
*/
```

#### 2. 实现 Excel 中用于解析单元格格式字符串的例子（例子中演示了 number 如何进行转换）

本例使用 `Function.getParamsWith()` 实现了定义重构

```javascript
const MONEY_SYMBOL = { RMB: '￥', $: '$', Euro: '€' }
const CELL_TYPE = {
    number(...arg) {
        let {
            symbol = '',
            decimal = 0,
            split3 = false,
            unit = '',
        } = Function.getParamsWith(
            [
                'symbol:string, decimal:number, split3?:boolean, unit?:string',
                'symbol:string, decimal:number, unit?:string',
                'decimal:number, split3?:boolean, unit?:string',
                'symbol:string, unit:string',
                'symbol:string, split3:boolean',
                'decimal:number, unit?:string',
                'split3:boolean, unit?:string',
                'unit?:string',
            ],
            arg
        )
        if (decimal == 0) {
            decimal = '0'
        } else {
            decimal = `0.${'0'.repeat(decimal)}`
        }
        decimal += '_ '
        split3 = split3 ? '#,##' : ''
        !!unit && (unit = `${unit} `.replace('/', '\\/'))
        let body = `${split3}${decimal}${unit}`
        if (symbol) {
            if (symbol in MONEY_SYMBOL) {
                symbol = `_ ${symbol}* `
            }
            return `${symbol}${body};${symbol}-${body}`
        }
        return body
    },
}

// 1.23456 => 1.23 万
trace(CELL_TYPE.number(2, '万')) // => 0.00_ 万

// 1.23456 => 1 万
trace(CELL_TYPE.number('万')) // => 0_ 万

// 123456 => 123,456 万
trace(CELL_TYPE.number(true, '万')) // => #,##0_ 万

// 1234.5678 => $ 1234 万
trace(CELL_TYPE.number(MONEY_SYMBOL.$, true, '万')) // => _ $* #,##0_ 万 ;_ $* -#,##0_ 万 ;_ $* "-"_ ;_ @_

// 1234.5678 => ￥ 1234.56 万
trace(CELL_TYPE.number(MONEY_SYMBOL.RMB, 2, true, '万')) // => ￥#,##0.00_ 万 ;￥-#,##0.00_ 万 ;￥"-"??_ ;_ @_
```

#### 3. 实现一个规则匹配器，用于解析 .gitignore 配置列表

```javascript
require('nodelib2-utils')

// 已经读取到的 .gitignore 文件内容如下
let gitignoreFileContent = `/.idea/
/node_modules/
/foo/*/src/*.js
*.log
/*.log
/bin/*.exe
/bin/*
bin/*
/bin/*/
.DS_Store
/.DS_Store
/docs/
docs/
docs/link/
docs/aaa/bbbb/
`

// 已经读取到的工作目录文件列表如下
let fileList = [
    '/src/index.js',
    '/src/index.html',
    '/bin/run.js',
    '/bin/utils/index.js',
    '/docs/readme.md',
    '/docs/img/example1.png',
    '/errors.log',
]

let gitFileList = getGitFileList(fileList, gitignoreFileContent)
trace(gitFileList)
// => [ '/src/index.js', '/src/index.html' ]

function getGitFileList(files, ingoreContent) {
    //使用 String.prototype.match 生成规则匹配工厂
    let ignoreRules = [
        (path, handlers) => {
            // 'foo'
            let match = path.match(/^[^*/]+$/g)
            if (match) {
                path = path.replace(/\./g, '\\.')
                path = `(/${path}/)|(/${path}$)`
                return new RegExp(path, 'i')
            }
            return null
        },
        (path, handlers) => {
            // '*.ext' or '/*/'
            let match = path.match(/(\*)\.[a-zA-Z0-9]+?$|\/\*\//g)
            if (match) {
                path = path.replace(/\./g, '\\.')
                let regStr = path.replace(/\*/g, '[^/*]+')
                if (match[match.length - 1].indexOf('*.') == 0) {
                    regStr += '$'
                }
                if (path.charAt(0) === '/') {
                    regStr = '^' + regStr
                }
                return new RegExp(regStr, 'i')
            }
            return null
        },
        (path, handlers) => {
            // 'foo/*', '/foo/*'
            let match = path.match(/(\/\*{0,1})$/)
            if (match && match[1]) {
                let regStr = path.substring(0, match.index) + '/'
                regStr = regStr.replace(/\./g, '\\.')
                if (path.charAt(0) === '/') {
                    regStr = '^' + regStr
                } else {
                    regStr = '/' + regStr
                }
                return new RegExp(regStr, 'i')
            }
            return null
        },
        (path, handlers) => {
            // '/foo/', 'foo/'
            let match = path.match(/\/([^/]+?)$/)
            if (match && match[1]) {
                let regStr = '^' + path.replace(/\./g, '\\.') + '$'
                return new RegExp(regStr)
            }
            return null
        },
    ]
    let ignoreList = ingoreContent
        .split('\n')
        .map(v => trim(v))
        .filter(v => !!v && v.charAt(0) !== '#')
        .map(v => {
            if (/[^/]+\/[^/]+/g.test(v)) {
                if (v.charAt(0) !== '/') {
                    v = '/' + v
                }
            }
            let regExp = ignoreRules.match(m => m(v))
            return regExp
        })
    return files.filter(v => !ignoreList.some(regExp => regExp.test(v)))
}
```
