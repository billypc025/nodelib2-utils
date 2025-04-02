# Function Extras

### `getParamsWith`

根据参数匹配规则(用一个数组来描述函数重载类型), 识别参数值 (用于实现重载函数的参数识别)

#### 定义

```typescript
getParamsWith(paramDefRules: string[], args: any[]): { [k: string]: any }
```

示例

```js
/* 示例一
  定义hello函数实现重载的效果, 满足3种入参方式:
  
  function hello(name: string, age?: number|string, someSpeak?: string): void

  function hello(name: string, someSpeak: string,age?: number): void
  
  function hello(obj: { name: string; age?: number; someSpeak?: string }): void
*/

const hello = (...arg) => {
    let {
        name,
        age = 0,
        someSpeak = '',
    } = Function.getParamsWith(
        ['name:string, age?:number, someSpeak?:string', 'name:string, someSpeak:string, age?:number', 'object'],
        arg
    )
    console.log(`hello ${name}.${age > 0 ? ` I am ${age} years old.` : ''}${someSpeak ? ` ${someSpeak}` : ''}`)
}

hello('billy', 40, 'farewell!')
// => 'hello billy. I am 40 years old. farewell!'

hello('billy', 'farewell!', 40)
// => 'hello billy. I am 40 years old. farewell!'

hello('billy', 40)
// => 'hello billy. I am 40 years old.'

hello('billy', 'farewell!')
// => 'hello billy. farewell!'

hello({ name: 'billy', age: 40 })
// => 'hello billy. I am 40 years old.'
```

```js
// 示例二, 实现了一个用于创建定时器的方法:
const _intervalCache = {}
function createInterval() {
    let {
        name = 'defaule',
        executor,
        time = 3600,
        params, // 注意: 因为在定义中使用...params来获取剩余入参, 因此params是一个数组 ( params:any[] )
    } = Function.getParamsWith(
        [
            'id:string, executor:Function, time:number, ...params',
            'id:string, executor:Function, ...params',
            'executor:Function, time:number, ...params',
            'executor:Function, ...params',
        ],
        arguments
    )
    _intervalCache[name] = _intervalCache[name] || []
    _intervalCache[name].push(setInterval(executor, time * 1000, ...params))
}

function autoSave(file_path) {
    // 每隔60秒执行一次自动保存文件
    trace('autoSave', file_path)
}
function fetch(url, default_value) {
    // 每隔7200秒执行一次fetch url
    trace('fetch', url, default_value)
}
const socket = {
    sendHeartbeat() {
        // 每隔90秒执行一次发送心跳
        trace('socket.sendHeartbeat')
    },
}

createInterval('task:autoSave', autoSave, 60, 'file_path')
createInterval('task:notice', fetch, 7200, 'web_url', 'default_value')
createInterval('heartbeat', socket.sendHeartbeat, 90)
```

```js
// 示例三
function foo() {
    let { a = 'a', b } = Function.getParamsWith(
        [
            'a:string, b:string',
            'b:string'
        ],
        arguments
    )
    trace(a + b)
}
foo() // 缺失了必要参数, throw Error
foo('A', 'B') // => AB   (匹配到第1条规则)
foo('B') // => aB   (必要参数只有1个，匹配到第2条规则)
```

```js
// 示例四: 类型为{[key:string]: <type>}
function test(...arg) {
    let { a, b } = Function.getParamsWith(
        [
            'a:{[k]:string[]}, b:{add:string}',
            'b:{add:string}, a:{[k]:string[]}'
        ],
        arg
    )
    trace({ a, b })
}

test({ add: [] }, { add: '' }) // => { a: { add: [] }, b: { add: '' } }
test({ add: '' }, { add: [] }) // => { a: { add: [] }, b: { add: '' } }
```
