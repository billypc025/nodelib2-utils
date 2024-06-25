# time API

### example

```javascript
g.time.formatTime(7200, 'hh:mm:ss') // => 02:00:00
g.time.formatTime(8255, 'h个小时m分钟') // => 2个小时17分钟
g.time.getFullDateArray(1519446146122) // => [ 2018, 2, 24, 12, 22, 26 ]
```

### API

#### 1. `getFullDate`

根据日期或时间戳，获取日期字符串 (默认格式: YYYY-MM-DD hh:mm:ss)

```typescript
getFullDate(dateOrTime?: number | Date, doubleDigit?: boolean): string
getFullDate(doubleDigit: boolean): string
```

```javascript
g.time.getFullDate()
g.time.getFullDate(Date.now())
g.time.getFullDate(Date.now(), true)
g.time.getFullDate(true)
g.time.getFullDate(new Date())
g.time.getFullDate(0) // => 1970-0-1 8:0:0
g.time.getFullDate(0, true) // => 1970-00-01 08:00:00
```

#### 2. `getFullDateArray`

根据日期或时间戳，获取日期数组 [YYYY,MM,DD,hh,mm,ss]

```typescript
getFullDateArray(dateOrTime?: number | Date): number[]
```

#### 3. `getTime`

根据日期或时间戳，获取时间字符串 (默认格式: hh:mm:ss)

```typescript
getTime(dateOrTime?: number | Date, doubleDigit?: boolean): string
getTime(doubleDigit: boolean): string
```

```javascript
g.time.getTime()
g.time.getTime(Date.now())
g.time.getTime(Date.now(), true)
g.time.getTime(true)
g.time.getTime(new Date())
```

#### 4. `getTimeArray`

根据日期或时间戳，获取时间数组[hh,mm,ss]

```typescript
getTimeArray(dateOrTime?: number | Date): number[]
```

#### 5. `getDate`

根据日期或时间戳，获取日期的字符串, 不包括时间 (默认格式: YYYY-MM-DD)

```typescript
getDate(dateOrTime?: number, doubleDigit?: boolean): string
getDate(doubleDigit: boolean): string
```

```javascript
g.time.getDate(0) // => 1970-0-1
g.time.getDate(0, true) // => 1970-00-01
```

#### 6. `getDateArray`

根据日期或时间戳，获取日期数组 [YYYY,MM,DD]

```typescript
getDateArray(dateOrTime?: number | Date): number[]
```

#### 7. `getNowStamp`

获取当前时间戳

```typescript
getNowStamp(millisecond: boolean | number): number
```

#### 8. `formatTime`

格式化时间字符串

```typescript
formatTime(dateOrTime?: number | Date, format?: string): string
formatTime(format: string): string
```

```javascript
g.time.formatTime()
g.time.formatTime(Date.now(), 'YYYY年MM月DD日 hh:mm')
g.time.formatTime('YYYY年MM月DD日 hh:mm')
```

#### 9. `getTimer`

获取当前已经运行了多少豪秒

```typescript
getTimer(): number
```

#### 10. `getCountDown`

根据传入的时间(秒)，返回倒计时。(默认格式 DD:hh:mm:ss)

```typescript
getCountDown(second: number, format?: string): string
```

```javascript
g.time.getCountDown(123, 'mm:ss') // => 02:03
```

#### 11. `getCountDownArray`

根据传入的时间(秒)，返回倒计时数组。[DD,hh,mm,ss]

```typescript
getCountDownArray(second?: number): number[]
```

#### 12. `getPastSecond`

获取指定时间戳距离当天 0 点已经过去了多少秒 (缺省时获取今天的值)

```typescript
getPastSecond(time?: number): number
```

#### 13. `getWeek`

根据 week 偏移量，获取当周的日期列表

```typescript
getWeek(weekOffset?: number, sundayFirst?: boolean): number[][]
```

#### 13. `getMonthByOffset`

根据 month 偏移量，获取当月的日期列表

```typescript
getMonthByOffset(
        monthOffset?: number,
        sundayFirst?: boolean
    ): {
        now: { year: number; month: number; date: number }
        year: number
        month: number
        startTime: number
        endTime: number
        list: number[][]
    }
```

#### 14. `getMonth`

获取指定日期的当月的日期列表

```typescript
getMonth(
        dateOrTime?: number,
        sundayFirst?: boolean
    ): {
        now: { year: number; month: number; date: number }
        year: number
        month: number
        startTime: number
        endTime: number
        list: number[][]
    }
```

#### 15. `getWeekNum`

据日期/时间戳，获取属于今年第几周（默认从周一开始计算）

```typescript
getWeekNum(date: [year: number, month: number, date: number], startAtMonday?: boolean): number
getWeekNum(time?: number, startAtMonday?: boolean): number
getWeekNum(year: number, month: number, date: number, startAtMonday?: boolean): number
```

#### 16. `getOffset`

获取两个日期的间隔天数

```typescript
getOffset(dateStart: Date | number | string, dateEnd: Date | number | string): number
```
