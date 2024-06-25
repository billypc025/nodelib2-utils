# String Extras

### 1. `paramFormat`

用给定的数据对象格式化模版字符串

```typescript
paramFormat(paramObj: { [k: string]: string | number } | (string | number)[]): string
paramFormat(...arg: (string | number)[]): string
```

```javascript
let templateString = 'Everyone knows that {0} likes to {1} every {2}.'

templateString.paramFormat('tom', 'eat fruits', 'day')
// => 'Everyone knows that tom likes to eat fruits every day.'

templateString.paramFormat(['tom', 'eat fruits', 'day'])
// => 'Everyone knows that tom likes to eat fruits every day.'

'Everyone knows that {name} likes to {like} every {rate}.'.paramFormat({ name: 'tom', like: 'swim', rate: 'two days' })
// => Everyone knows that tom likes to swim every two days.

'裁判判罚了{0}! 这是今天第一个{0}判罚, 看来{1}已经可以开始提前庆祝胜利了.'.paramFormat(['点球', '客队'])
// => 裁判判罚了点球, 这是今天第一个点球判罚, 看来客队已经开始提前庆祝胜利.

let htmlTemplate = '<span class="color-key">{keyName}:</span><span class="color-type-{valueType}">{valueType}</span>'
htmlTemplate.paramFormat({ keyName: '姓名', valueType: 'string' })
// => <span class="color-key">姓名:</span><span class="color-type-string">string</span>
```

### 2. `compare`

比较 2 个字符串的大小

```typescript
compare(str: string, rule: 'lengthFirst' | 'charFirst'): number
```

> lengthFirst 用于排序的场景:
>
> -   c
> -   a11
> -   b11
> -   a111
> -   b111
>
> charFirst 用于排序的场景:
>
> -   a11
> -   a111
> -   b11
> -   b111
> -   c

```javascript
'c'.compare('a11') // => -1
'c'.compare('a11', 'charFirst') // => 1
'a1'.compare('a11') // => -1
'a1'.compare('a11', 'charFirst') // => -1
```

### 3. `format`

根据规则模板，生成格式化字符串

```typescript
format(template: string): string
```

```javascript
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

### 3. `toURL`

解析有效的 url，返回一个 URL 对象

```typescript
toURL(baseOrPath: string): URL
```

```javascript
//当前字符串是path:
'/'.toURL('https://domain.com')
'login'.toURL('https://domain.com/api/')
'/login'.toURL('https://domain.com')

//当前字符串是base:
'https://domain.com'.toURL('/')
'https://domain.com'.toURL('/api/login')
```

### 5. 其他方法

```typescript
// 调用Number.parseInt()方法依据指定基数,解析字符串并返回一个整数。 base-基数(默认10)
parseInt(base: number): number

// 首尾去空格
trim(): string
```
