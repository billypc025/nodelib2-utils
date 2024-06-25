# global API

### 1. `__def`

在目标对象上调用 Object.defineProperties (与第三方包 d 类似, 可参看https://www.npmjs.com/package/d)

```typescript
__def<T>(obj: T, tag: string, properties: object): T
__def<T>(obj: T, properties: object): T

// __def_bind与__def的区别是，__def_bind会将属性bind到目标对象
__def_bind<T>(obj: T, tag: string, properties: object): T
__def_bind<T>(obj: T, properties: object): T

// 生成一个定义为 value 的 properties 对象
__def_value<T>(descTag: string, value: any): object
__def_value<T>(value: any): object

// 生成一个定义为 getter 的 properties 对象
__def_get<T>(descTag: string, getter: () => any): object
__def_get<T>(getter: () => any): object
// 生成一个定义为 setter 的 properties 对象
__def_set<T>(descTag: string, setter: (val: any) => void): object
__def_set<T>(setter: (val: any) => void): object

// 生成一个定义为 getter & setter 的 properties 对象
__def_gs<T>(descTag: string, getter: () => any, setter: (val: any) => void): object
__def_gs<T>(getter: () => any, setter: (val: any) => void): object
```

> 用 `'e'` `'c'` `w'` 来来表示 `enumerable` `configurable` `writable`  
> 如: 设为 `ew` 即表示 `{configurable: false, enumerable: true, writable: false}`

```javascript
let obj = __def({}, 'e', {
    name: {
        get: () => {
            return ''
        },
        set: v => {},
    },
})

let obj1 = __def({}, 'ew', { name: 'billy' })

let obj2 = __def(
    {},
    {
        name: __def_gs(
            () => {
                return ''
            },
            v => {}
        ),
    }
)
```

```javascript
// 这是MDN上Function.prototype.bind的示例, 如下:
const module = {
    x: 42,
    getX: function () {
        return this.x
    },
}
const boundGetX = module.getX.bind(module)
console.log(boundGetX()) // => 42

// 使用__def_bind来实现，代码如下:
const module = __def_bind({}, { x: 42, getX: () => this.x })
const boundGetX = module.getX
console.log(boundGetX()) // => 42
```

> 使用 `__def` 可以通过属性描述操作符对子属性进行自定义, 另外 `__def_bind` 支持了方法到对象的自动绑定(这个绑定只针对子属性是 `Function`, 并且需要调用 `this`)
>
> 适用场景: 可用于内置的底层方法,用 `__def_bind` 控制属性的可操作性及是否可枚举, 可以达到关键对象防篡改的目的。还可用于某个对象的方法在长调用链中进行传递时保持 `this` 指向正确.

### 2. `paramFormat`

用给定的数据对象格式化模版字符串

```typescript
paramFormat(
        templateString: string,
        paramObj: { [k: string]: string | number } | (string | number)[]
    ): string

paramFormat(templateString: string, ...arg: (string | number)[]): string
```

> 另可参见[String.paramFormat](./String.md#1-paramformat)

```javascript
paraFormat('Everyone knows that {0} likes to {1} every {2}.', 'tom', 'eat fruits', 'day')
// => 'Everyone knows that tom likes to eat fruits every day.'

paramFormat('Everyone knows that {0} likes to {1} every {2}.', ['tom', 'eat fruits', 'day'])
// => 'Everyone knows that tom likes to eat fruits every day.'

paramFormat('Everyone knows that {name} likes to {like} every {rate}.', { name: 'tom', like: 'swim', rate: 'two days' })
// => Everyone knows that tom likes to swim every two days.

paramFormat('裁判判罚了{0}! 这是今天第一个{0}判罚, 看来{1}已经可以开始提前庆祝胜利了.', ['点球', '客队'])
// => 裁判判罚了点球, 这是今天第一个点球判罚, 看来客队已经开始提前庆祝胜利.

paramFormat('<span class="color-key">{keyName}:</span><span class="color-type-{valueType}">{valueType}</span>', {
    keyName: '姓名',
    valueType: 'string',
})
// => <span class="color-key">姓名:</span><span class="color-type-string">string</span>
```

### 3. `__merge`

深度复制合并两个 obj（将第 2 个 obj 深度复制合并到第 1 个 obj, 会修改第 1 个 obj）

```typescript
__merge(a: { [k: string]: any }, b: { [k: string]: any }, cover?: boolean): object
```

```javascript
__merge({}, { a: 1 })
// => { a: 1 }

__merge({ a: [] }, { a: 1 })
// => { a: [] }

__merge({ a: [] }, { a: 1 }, true)
// => { a: 1 }

__merge({ a: [1, 2, 3] }, { a: [1, 2, 3, 4, 5] })
// => { a: [ 1, 2, 3, 4, 5 ] }

__merge(
    [
        { id: 1, name: 'tom' },
        { id: 2, name: 'jerry' },
    ],
    [
        { id: 1, age: 20 },
        { id: 2, age: 23 },
    ]
)
// => [ { id: 1, name: 'tom', age: 20 }, { id: 2, name: 'jerry', age: 23 } ]
```

同类的方法还有：

```typescript
// 复制合并两个obj（将第2个obj复制合并到第1个obj, 会修改第1个obj, 非深度复制）
__copy(a: { [k: string]: any }, b: { [k: string]: any }, createNew?: boolean): any

// 合并所有对象到第一个入参对象
__mergeAll(...arg): object

__clone(obj: object, keys: string[]): object
__cloneWithFilter(obj: object, keys: string[]): object
__override(to: object, from: object): object
```

### 4. `getType`

获取对象 constructor 的类型 (Object.prototype.toString)

```typescript
getType(obj: any): string
```

```javascript
getType({}) => Object
getType([]) => Array
getType(new Event('change'))  => Event
自定义对象:
getType({ get [Symbol.toStringTag]() { return 'STH' }})
// => STH
自定义类:
class STH { get [Symbol.toStringTag]() { return 'STH' }}
getType(new STH())
// => STH
```

### 5. `isEmpty`

判断对象是否没有内容

```typescript
isEmpty(val: any): boolean
```

> 注意: 仅判断对象是否持有可用的内容或值, 和对象自身存在哪些属性无关  
> 注意: 数字 `0` 也算是有内容

```javascript
isEmpty('')  =>  true
isEmpty({})  =>  true
isEmpty([])  =>  true
isEmpty(null)  =>  true
isEmpty(0)  =>  false
isEmpty({a:1})  =>  false
isEmpty(false)  =>  false
```

### 6. `equal`

判断传入的对象是否内容相等 (只判断属性及对应的值, 和引用类型无关)

```typescript
equal(...arg): boolean
```

```javascript
// 2个对象所持有的内容相同,返回true
equal([1,2], [1,2])  => true
equal({a:[1,2]}, {a:[1,2]})  => true
// 2个对象持有的内容不相同, 返回false
equal({a:1}, {a:[1]})  => true
equal({a:1}, {a:1, b:1})  => true
```

### 7. 其他方法

```typescript
// 全局对象g, 持有全局可用工具方法
const g: GlobalLib

// 终端打印输出, 默认为调用console.log(...arg), 可通过trace.setDefault()进行修改
trace(...arg: any[]): void

// setTimeout的promise实现
__setTimeout(delay: number): Promise<void>
__setTimeout(callback: asyncFunction, delay: number): Promise<void>

// 开始计时
__startTiming(): void

// 结束计时
__endTiming(trace: boolean): number

// 获取已运行时长
__getRunTime(): number

// 返回一个promise, 支持1个或多个promise, 以及同步方法的promisify
__promise(executor: (resolve: (value: any) => void, reject: (reason?: any) => void) => void): Promise<any>

// 生成指定长度的随机字符串 (最长128位)
randomString(len: number): string

// 在给定的范围[x,y)中取随机值 (左闭右开)
random(a: [x0: number, x1: number], digit?: boolean | number): number
random(a?: number, b?: number, digit?: boolean | number): number

// 取数组中的随机项
getRandomItem<T>(array: T[]): T
getRandomItem<T>(...arg: T[]): T

// 取整
int(value: number): number

// 判断值是否是 Number，或者是否能转换成 Number
// isNum('423') => true
isNum(value: any): boolean

trim(str: string): string

// 解析URL字符串
parseUrl(url: string): {
        url: string
        host: string
        bookmark: string
        query: { [k: string]: any }
        domain: string
        port: number
    }

function padStart(value: any, maxLength: number, fillString?: string | undefined): string

function padEnd(value: any, maxLength: number, fillString?: string | undefined): string

function repeat(value: any, count: number): string
```

-   `__promise`

    ```javascript
    // __promise 等同于 new Promise(...)
    __promise(resolved => {
        fs.readFile('path', resolved)
    })
    __promise(
        [
            resolved => {
                fs.readFile('path1', resolved)
            },
        ],
        [
            resolved => {
                fs.readFile('path2', resolved)
            },
        ]
    )
    __promise(fs.readFile, 'path')
    ```

-   `random` & `getRandomItem`

    ```javascript
    random() // => [0,1)中的随机小数,等同于Math.random()
    random(0, 6) // => [0,6)中的随机整数
    random(0, 6, 1) // => [0,6)中的随机小数(小数点后保留1位)
    random([0, 6]) // => [0,6)中的随机整数
    random([0, 6], 2) // => [0,6)中的随机小数(小数点后保留2位)
    random([0.6, 6]) // => [0.6,6)中的随机小数(因识别到0.6是1位小数, 因此小数点后保留1位)
    random([5.65, 8.5]) // => [5.65,8.5)中的随机小数(因识别到5.65是2位小数, 因此小数点后保留2位)

    getRandomItem([15, 25, 35, 45]) => 35
    getRandomItem(['tom', 'jerry', 'spike', 'tyke']) => 'jerry'
    getRandomItem(15, 25, 35, 45) => 25
    getRandomItem('tom', 'jerry', 'spike', 'tyke') => 'tom'
    ```