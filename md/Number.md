# Number Extras

### 1. `setRange`

设置数字的限制范围

```typescript
setRange(range: [number, number]): number
setRange(range0: number, range1: number): number
```

```javascript
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

### 2. `inRange`

判断数字是否在限制范围内

```typescript
inRange(range: [number, number]): boolean
inRange(range0: number, range1: number): boolean
```

```javascript
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

### 3. `max` & `min`

取 max & 取 min

```typescript
max(...arg): number
min(...arg): number
```

```javascript
let num = 3,
    numList = [2, 5, -1, 6, 8, 4]
num.max(numList) // => 8
num.max(...numList) // => 8
num.max(6) // => 6

num.min(numList) // => -1
num.min(...numList) // => -1
num.min(6) // => 3
```

### 4. `foramt`
生成格式化字符串
```typescript
format(template: string): string
```

```javascript
// 保留1位小数
(40.123).format('0.0') // => '40.1'
         
// 千分位逗号分隔 (不保留小数)
(403424.123).format() // => '403,424'
         
// 千分位逗号分隔+保留2位小数
(403424.1).format('#,##0.00') // => '403,424.10'

//科学计数法
(40.123).format('0.0E+00') // => '4.0E+01'
(40.123).format('0.00E+0') // => '4.01E+1'
(4723525622347).format('0.00E+0') // => '4.72E+12'

//百分比
(1).format('0.00%') // => '100.00%'
(0.45342).format('0.00%') // => '45.34%'
(0.45342).format('%') // => '45%'
```

### 5. 其他快捷调用

```typescript
floor(): number
ceil(): number
round(): number
abs(): number
random(round: boolean): number
toDegree(): number
toRadian(): number
parseInt(base: number): number
pow(power: number): number
```

```javascript
(3.4).floor() // => 3
```
