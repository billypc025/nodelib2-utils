# Array Extras

### 1. Array 上扩展的静态方法

#### `fromLength`

初始化并生成一个指定长度的 Array，每项值为 0

> 单纯生成指定长度的数组 Array.fromLength(length) 比 Array.from({length}) 速度快一倍以上

```typescript
fromLength<T>(len: number, mapFn?: (index: number, array: T<any>[]) => any): T<any>[]
```

```javascript
// Each item is 0
Array.fromLength(5) // => [0, 0, 0, 0, 0]

// Each item is defaultValue
Array.fromLength(5, 'ok') // => ['ok', 'ok', 'ok', 'ok', 'ok']

// Each item is index
Array.fromLength(5, v => v) // => [0, 1, 2, 3, 4]

// use mapFn
Array.fromLength(5, v => String.fromCharCode(v + 65)) // => [ 'A', 'B', 'C', 'D', 'E' ]
```

### 2. 调用后返回原数组，便于链式调用

定义：

```typescript
// 调用push后返回原数组对象，主要用于链式语法
add<t>(...arg: any[]): T[]

// 调用unshift后返回原数组对象，主要用于链式语法
addFirst<T>(...arg: any[]): T[]

// 调用splice后返回原数组对象对象，主要用于链式语法
remove<T>(startIndex: number, deleteLength: number): T[]

// 删除指定的item后返回原数组对象
removeItem<T>(item: T): T[]

// 调用splice从开头开始删除后返回原数组对象，主要用于链式语法
removeFirst<T>(deleteLength: number): T[]

// 调用splice从末尾开始删除后返回原数组对象，主要用于链式语法
removeLast<T>(deleteLength: number): T[]

// 调用forEach后返回原数组对象，主要用于链式语法
forEachReturn<T>(callbackfn: (value: T, index: number, array: readonly T[]) => void, thisArg?: any): T[]
```

示例：

```js
;[].add(1).addFirst(2).remove() // => 1
;[1, 2, 3].removeFirst() // => [2, 3]
;[1, 2, 3].removeFirst(2) // => [3]
;[1, 2, 3].removeLast() // => [1, 2]
;[1, 2, 3].removeLast(2) // => [1]
;[1, 2, 3].removeItem(2) // => [1, 3]
;[1, 2, 3, 4, 5].remove(2, 2) // => [1, 2, 5]
;[1, 2, 3].forEachReturn(v => v + 1) // => [2, 3, 4]
```

### 3. 对数组项进行操作，生成新对象

#### `mapToHash`

根据数组每项值, 生成以该值为 key 的键值对

```typescript
mapToHash<T1>(
    keyExecutor: (item: T, index: number, array: readonly T[], returnObj: T1) => string | number,
    valueExecutor: (item: T, index: number, array: readonly T[], returnObj: T1) => any
): object

mapToHash<T1>(valueExecutor: (item: T, index: number, array: readonly T[], returnObj: T1) => any): object

mapToHash<T1 = (string | number)[]>(): { [k: string]: string | number }
```

```javascript
// example 1
// 数组的每一项是 number 或 string 时
[1,2,3].mapToHash()
// => {1:1, 2:2, 3:3}


// example 2
const output = ['info', 'warn', 'error', 'success'].mapToHash(v => msg => trace(`[${v.toUpperCase()}] ${msg}`))
output.info('hello world, farewell.') // => [INFO] hello world, farewell.


// example 3
const { tom, jerry } = [
    { name: 'tom', color: 'blue' },
    { name: 'jerry', color: 'yellow' },
].mapToHash(
    v => v.name
    v => __def(v, { say: msg => trace(`<span style='color:${v.color}'>${v.name}: ${msg}</span>`) }),
    )

tom.say('hello')    // => <span style='color:blue'>tom: hello</span>
jerry.say('hello')  // => <span style='color:yello'>jerry: hello</span>


// example 4
['a', 'b', 'c'].mapToHash(v => v) // => {a, b, c}


// example 5
// 特殊情况: 当转换后的key无法作为键时(即类型不是字符串或数字, 以及''), 该项将会被舍弃
[1, null, 3].mapToHash(v=>v)
// => {'1': 1, '3': 3}

[{ name: 'tom', age: 6 }, { name: 'jerry', age: 8 }].mapToHash(
    v => v.age > 6 && v.name,
    v => v.age
)
// => { jerry: 8 }
```

#### `toHash`

Array -> Object

```typescript
toHash<T>(key?: string, valueGroup?: boolean, valKey?: string): { [key: string]: any }
```

```javascript
let idList = [{ id: 'a' }, { id: 'b' }, { id: 'c' }]
idList.toHash('id') // => {a:{id:1}, b:{id:2}, c:{id:3}}
```

#### `getCountGroupBy`

分组统计指定条件的项的数量

```typescript
getCountGroupBy(key: string, totalKey: string): {
        [key: string]: number | { [totalKey: string]: number }
    }
```

```javascript
let userList = [({ userId: 'aaa' }, { userId: 'bbb' }, { userId: 'aaa' }, { userId: 'aaa' })]
userList.getCountGroupBy('userId') // => {aaa:3, bbb:1}
userList.getCountGroupBy('userId', 'orderNum') // => {aaa:{orderNum:3}, bbb:{orderNum:1}}
```

#### `mergeTo`

根据传入的键值对，进行匹配后做数据合并

```typescript
mergeTo<T1, T2>(
        kvObj: { [key: string]: T2 },
        key: string, targetKey?: string
    ): Array<T1 & T2>

```

```javascript
let userList = [
    { id: 1, name: 'tom' },
    { id: 2, name: 'jerry' },
]
let ageHash = { 1: 21, 2: 20 }
userList.mergeTo(ageHash, 'id', 'age')
//=> [{id:1, name:'tom', age:21}, {id:2, name:'jerry', age:20}]
```

#### `mergeList`

根据传入的数组，进行匹配后做数据合并

```typescript
mergeTo<T1, T2>(
        list: T2[],
        key: string,
        mergeKey: string,
        mergeExecutor?: (target: object, source: object) => void
    ): Array<T1 & T2>
```

```javascript
let userList = [
    { id: 1, name: 'tom' },
    { id: 2, name: 'jerry' },
]
let ageList = [
    { id: 1, age: 21 },
    { id: 2, age: 20 },
]
userList.mergeList(ageList, 'id', 'id')
//=> [{id:1, name:'tom', age:21}, {id:2, name:'jerry', age:20}]
```

#### `charSort`

字符排序 (字符逐位比较, 有 3 种排序方式供选择)

> `rule = 0` 长度升序 + 字符 unicode 升序  
> `rule = 1` 字符 unicode 升序 + 长度升序  
> `rule = 2` 数字优先 + 字符 unicode 升序 + 长度升序

```typescript
charSort<T>(
        executor?: (sortCore: (val1: T, val2: T) => number, val1: T, val2: T) => void,
        rule?: 0 | 1 | 2
    ): T[]
```

```javascript
let wordList = ['home', 'hat', 'hot', 'how']

wordList.charSort((f, a, b) => f(a, b)) // 完整调用
// => [ 'hat', 'hot', 'how', 'home' ]

wordList.charSort() // 数组项不是object时, 可省略参数
// => [ 'hat', 'hot', 'how', 'home' ]

wordList.charSort(1) // 先按字符排序, 再按长度排序
// => [ 'hat', 'hot', 'how', 'home' ]

// 当数组项是object, 需要用某一属性进行排序
let dataList = [{ k: 'home' }, { k: 'hat' }, { k: 'hot' }, { k: 'how' }]

dataList.charSort((f, a, b) => f(a.k, b.k))
// => [ { k: 'hat' }, { k: 'hot' }, { k: 'how' }, { k: 'home' } ]

dataList.charSort((f, a, b) => f(a.k, b.k), 1)
// => [ { k: 'hat' }, { k: 'home' }, { k: 'hot' }, { k: 'how' } ]
```

#### `match`

根据传入的规则方法进行匹配，并返回第一个匹配项的计算结果

```typescript
match<T>(
        callbackfn: (value: T, index: number, array: readonly T[]) => void,
        thisArg?: any
    ): any
```

```javascript
// 一般用于批量正则匹配后直接获取匹配结果
let word = 'userName=tom'
let rules = [/^userName=(\S+?)$/, /^userId=(\S+?)$/]
let matchResult = rules.match(v => word.match(v))
matchResult && trace(matchResult[1]) // => tom
```

#### `firstItem`

取数组开头的 n 项 (1 ≤ n ≤ length, 默认 1)

```typescript
firstItem(n: number): T[]
```

```javascript
;[1, 2, 3, 4].firstItem(2)
// => [1,2]
```

#### `lastItem`

取数组尾部的 n 项 (1 ≤ n ≤ length, 默认 1)

```typescript
lastItem(n: number): T[]
```

```javascript
;[1, 2, 3, 4].lastItem(2)
// => [3,4]
```

#### `last`

数组最后一项, 即 arr[arr.length-1]

```typescript
last: T //(getter/setter)
```

```javascript
;[1, 2, 3, 4].last
// => 4
;[1, 2, 3, 4].last++
// 原数组=> [1,2,3,5]
```

#### `filterBy`

增强的数组过滤器, 可过滤、筛选、匹配前后缀

```typescript
filterBy<T>(
        filtValue: (val: T, index: number, array: T[]) => boolean | any[] | string | boolean | RegExp,
        option?:
            | true
            | false
            | 'prefix'
            | 'suffix'
            | { key?: string | ((val: T) => any);
                contain?: true | false;
                fix?: 'prefix' | 'suffix' }
    ): T[]
```

```javascript
// 从给定的数组中过滤
;['a', 'b', 'c', 'd']
    .fitlerBy(['b', 'c']) // => ['b','c']

    [('a', 'b_0', 'b_1', 'c', 'd')].fitlerBy(['b', 'c'], 'prefix') // => ['b_0','b_1','c']

    [('prefix_a', 'prefix_b', 'prefix_c', 'prefix_d')].fitlerBy(['b', 'c'], 'suffix') // => ['prefix_b','prefix_c']

    [
        // 反向过滤
        ('a', 'b', 'c', 'd')
    ].fitlerBy(['b', 'c'], false) // => ['a','d']

    [
        // 数组项为object
        ({ name: 'a' }, { name: 'b_0' }, { name: 'b_1' }, { name: 'c_0' }, { name: 'c_1' })
    ].fitlerBy(['b', 'c'], { key: 'name', fix: 'prefix' }) // => [{name:'b_0'},{name:'b_1'},{name:'c_0'},{name:'c_1'}]

    [
        // 另一种入参方式
        ({ name: 'a' }, { name: 'b_0' }, { name: 'b_1' }, { name: 'c_0' }, { name: 'c_1' })
    ].fitlerBy(['b', 'c'], { key: v => v.name, fix: 'prefix' })

    [
        // => [{name:'b_0'},{name:'b_1'},{name:'c_0'},{name:'c_1'}]
        //用指定的string来过滤数组项
        ('a', 'b_0', 'b_1', 'c')
    ].fitlerBy('b', 'prefix') // => ['b_0','b_1']

    [
        //过滤出非空项
        ('a', '', 'c')
    ].filterBy(true) // => ['a','c']

    [
        //根据正则过滤
        ('a_001', 'b_102', 'c_903')
    ].filterBy(/_[1-9]{1}\d{2}/) // => ['b_102','c_903']
```
