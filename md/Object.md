# Object Extras

## `__add()`

从目标对象中获取并新增属性, 返回源对象 (源对象会被更新)

#### 语法

```typescript
// typescript declaration

__add(obj: Record<string, any>): this
```

```javascript
let obj = { a: 1, b: 2 }
obj.__add({ c: 3, d: 4 })
// => { a: 1, b: 2, c: 3, d: 4 }
```

## `__every()`

遍历回调每一项, 每一项的 fn 回调均返回 true 则最终返回 true, 否则返回 false

#### 语法

```typescript
// typescript declaration

__every(fn: (key: string, value: any, self: this) => Boolean): Boolean
```

| param | description |
| ----- | ----------- |
| `fn`  | 回调函数    |

## `__filter()`

根据 fn 回调的返回结果过滤并返回新的 object

#### 语法

```typescript
// typescript declaration

__filter(fn: (key: string, value: any, self: this) => Boolean): object
```

| param | description |
| ----- | ----------- |
| `fn`  | undefined   |

```javascript [Example:]
let obj = { a: 1, b: 2, c: 3, 1: 1, 2: 2, 3: 3 }
obj.__filter((k, v) => v >= 2)
// => { '2':2, '3':3, b:2, c:3 }

obj.__filter(k => isNum(k))
// => { '1':1, '2':2, '3':3 }

// 对于数组来说, 会转换为object
let arr = ['tom', 'jerry', 'lucy', 'lily']
arr.__filter(k => k >= 2)
// => { '2':'lucy', '3':'lily' }
```

## `__forEach()`

遍历执行 fn 并返回自身

#### 语法

```typescript
// typescript declaration

__forEach(fn: (key: string, value: any, self: this) => void): this
```

| param | description |
| ----- | ----------- |
| `fn`  | 回调函数    |

## `__forEachAsync()`

异步执行遍历 fn 并返回自身

#### 语法

```typescript
// typescript declaration

__forEachAsync(fn: (key: string, value: any, self: this) => Promise<void>): Promise<this>
```

| param | description  |
| ----- | ------------ |
| `fn`  | 异步回调函数 |

## `__key0`

`(getter)`

return Object.keys(obj)[0]

#### 语法

```typescript
// typescript declaration

get __key0(): string
```

## `__keys`

`(getter)`

return Object.keys(obj)

#### 语法

```typescript
// typescript declaration

get __keys(): string[]
```

## `__map()`

遍历生成新的 Object, 每一组键值对都可用相应的处理器进行转换处理

#### 语法

```typescript
// typescript declaration

__map(valueExecutor: (key: string, value: any, self: this) => any): object

__map(
    keyExecutor: (key: string, value: any, self: this) => string | number,
    valueExecutor: (value: any, key: string, self: this) => any
): object
```

| param           | description |
| --------------- | ----------- |
| `keyExecutor`   | 键处理器    |
| `valueExecutor` | 值处理器    |

```javascript [Example:]
let obj = { a: 1, b: 2 }

obj.__map(v => v + 1) // => {a:2, b:3}
obj.__map(
    (k, v) => v + 1,
    v => v + 1
) // => {2:2, 3:3}
```

## `__remain()`

删除多余的属性, 仅保留 remainKeys (会修改原对象)

#### 语法

```typescript
// typescript declaration

__remain(remainKeys: string[]): this

__remain(...remainKeys: string[]): this
```

| param        | description |
| ------------ | ----------- |
| `remainKeys` | undefined   |

```javascript [Example:]
function fn(obj) {
    trace(obj.__remain('name', 'age'))
}

let a = { id: 1, name: 'tom', age: 10 }
fn(a) // => {name:'tom',age:10}
trace(a) // => {name:'tom',age:10}
```

## `__some()`

遍历回调每一项, 只要有一项的回调 fn 返回 false 则最终返回 false, 否则返回 true

#### 语法

```typescript
// typescript declaration

__some(fn: (key: string, value: any, self: this) => Boolean): Boolean
```

| param | description |
| ----- | ----------- |
| `fn`  | 回调函数    |

## `__toArray()`

Object 转换为 Array,

#### 语法

```typescript
// typescript declaration

__toArray(valueExecutor: (key: string, value: any, self: this, arrayReturn: any[]) => any): any[]
```

| param           | description                  |
| --------------- | ---------------------------- |
| `valueExecutor` | 每一项处理器, 返回最终数组项 |

```javascript [Example:]
let obj = { a: 1, b: 2 }

obj.__toArray((k, v) => `${k}:${v}`)
// => [ 'a:1', 'b:2' ]

obj.__toArray((k, v) => ({ name: k, age: v }))
// => [ { name: 'a', age: 1 }, { name: 'b', age: 2 } ]
```

## `__value0`

`(getter)`

return Object.values(obj)[0]

#### 语法

```typescript
// typescript declaration

get __value0(): any
```

## `__values`

`(getter)`

return Object.values(obj)

#### 语法

```typescript
// typescript declaration

get __values(): any[]
```

```jsx
/**
 * inline: true
 */
import React, { useState, useEffect } from 'react'

export default () => {
    const [display, setDisplay] = useState('block')
    const [opacity, setOpacity] = useState(0)
    const onScroll = () => {
        if (window.scrollY == 0) {
            setOpacity(0)
            setTimeout(() => setDisplay('none'), 200)
        } else {
            setDisplay('block')
            setOpacity(1)
        }
    }

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    useEffect(() => {
        window.addEventListener('scroll', onScroll)
        return () => {
            window.removeEventListener('scroll', onScroll)
        }
    }, [])

    return (
        <div
            className='top-btn'
            style={{
                display: display,
                opacity: opacity,
            }}
            onClick={scrollToTop}
        >
            {'Top'}
        </div>
    )
}
```
