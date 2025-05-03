interface time {
    YEAR: 'YY'
    YEAR_SHORT: 'Y'
    MONTH: 'MM'
    MONTH_SHORT: 'M'
    DATE: 'DD'
    DATE_SHORT: 'D'
    HOUR: 'hh'
    MINUTE: 'mm'
    SECOND: 'ss'
    FULL_DATE: 'YYYY-MM-DD'
    DATE_TIME: 'YYYY-MM-DD hh:mm:ss'
    HMS: 'hh:mm:ss'
    DHMS: 'DD:hh:mm:ss'
    MS: 'mm:ss'
    /**
     * 根据日期或时间戳，获取日期字符串 (默认格式: YYYY-MM-DD hh:mm:ss)
     * @param dateOrTime 传入Date或时间戳, 缺省为Date.now()
     * @param doubleDigit 是否显示2位数字, 默认显示1位
     *
     * @example
     * g.time.getFullDate()
     * g.time.getFullDate(Date.now())
     * g.time.getFullDate(Date.now(), true)
     * g.time.getFullDate(true)
     * g.time.getFullDate(new Date())
     */
    getFullDate(dateOrTime?: number | Date, doubleDigit?: boolean): string
    getFullDate(doubleDigit: boolean): string
    /**
     * 根据日期或时间戳，获取日期数组 [YYYY,MM,DD,hh,mm,ss]
     * @param dateOrTime 传入Date或时间戳, 缺省为Date.now()
     * @param doubleDigit 是否显示2位数字, 默认显示1位
     */
    getFullDateArray(dateOrTime?: number | Date, doubleDigit?: false): number[]
    getFullDateArray(dateOrTime?: number | Date, doubleDigit: true): string[]
    /**
     * 根据日期或时间戳，获取时间字符串 (默认格式: hh:mm:ss)
     * @param dateOrTime 传入Date或时间戳, 缺省为Date.now()
     * @param doubleDigit 是否显示2位数字, 默认显示1位
     *
     * @example
     * g.time.getTime()
     * g.time.getTime(Date.now())
     * g.time.getTime(Date.now(), true)
     * g.time.getTime(true)
     * g.time.getTime(new Date())
     */
    getTime(dateOrTime?: number | Date, doubleDigit?: boolean): string
    getTime(doubleDigit: boolean): string
    /**
     * 根据日期或时间戳，获取时间数组[hh,mm,ss]
     * @param dateOrTime 传入Date或时间戳, 缺省为Date.now()
     */
    getTimeArray(dateOrTime?: number | Date): number[]
    /**
     * 根据日期或时间戳，获取日期的字符串, 不包括时间 (默认格式: YYYY-MM-DD)
     * @param dateOrTime 传入Date或时间戳, 缺省为Date.now()
     * @param doubleDigit 是否显示2位数字, 默认显示1位
     *
     * @example
     * g.time.getDate()
     * g.time.getDate(Date.now())
     * g.time.getDate(Date.now(), true)
     * g.time.getDate(true)
     * g.time.getDate(new Date())
     */
    getDate(dateOrTime?: number, doubleDigit?: boolean): string
    getDate(doubleDigit: boolean): string
    /**
     * 根据日期或时间戳，获取日期数组 [YYYY,MM,DD]
     * @param dateOrTime 传入Date或时间戳, 缺省为Date.now()
     */
    getDateArray(dateOrTime?: number | Date): number[]
    /**
     * 获取当前时间戳
     * @param millisecond 是否显示毫秒 (默认false, 返回秒)
     */
    getNowStamp(millisecond: boolean | number): number
    /**
     * 格式化时间字符串
     * @param dateOrTime 传入Date或时间戳, 缺省为Date.now()
     * @param format 格式，默认YYYY-MM-DD hh:mm:ss
     *
     * @example
     * g.time.formatTime()
     * g.time.formatTime(Date.now(), 'YYYY年MM月DD日 hh:mm')
     * g.time.formatTime('YYYY年MM月DD日 hh:mm')
     */
    formatTime(dateOrTime?: number | Date, format?: string): string
    formatTime(format: string): string
    /**
     * 获取当前已经运行了多少豪秒
     */
    getTimer(): number
    /**
     * 根据传入的时间(秒)，返回倒计时。(默认格式 DD:hh:mm:ss)
     * @param second 秒
     * @param format 格式 默认 DD:hh:mm:ss
     *
     * @example
     * g.time.getCountDown(123, 'mm:ss') // => 02:03
     */
    getCountDown(second: number, format?: string): string
    /**
     * 根据传入的时间(秒)，返回倒计时数组。[DD,hh,mm,ss]
     * @param second 秒
     */
    getCountDownArray(second?: number): number[]
    /**
     * 获取指定时间戳距离当天0点已经过去了多少秒 (缺省时获取今天的值)
     * @param time
     */
    getPastSecond(time?: number): number
    /**
     * 根据week偏移量，获取当周的日期列表
     * @param weekOffset 周偏移量
     * @param sundayFirst 是否将周日显示在第一位 (默认false)
     */
    getWeek(weekOffset?: number, sundayFirst?: boolean): number[][]
    /**
     * 根据month偏移量，获取当月的日期列表
     * @param monthOffset 月偏移量
     * @param sundayFirst 是否将周日显示在第一位 (默认false)
     */
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
    /**
     * 获取指定日期的当月的日期列表
     * @param dateOrTime 传入Date或时间戳, 缺省为Date.now()
     * @param sundayFirst 是否将周日显示在第一位 (默认false)
     */
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
    /**
     * 据日期/时间戳，获取属于今年第几周（默认从周一开始计算）
     * @param date 日期 [year, month, date]
     * @param startAtMonday 默认true
     */
    getWeekNum(date: [year: number, month: number, date: number], startAtMonday?: boolean): number
    /**
     * 据日期/时间戳，获取属于今年第几周（默认从周一开始计算）
     * @param time 时间戳
     * @param startAtMonday 默认true
     */
    getWeekNum(time?: number, startAtMonday?: boolean): number
    /**
     * 据日期/时间戳，获取属于今年第几周（默认从周一开始计算）
     * @param year 年
     * @param month 月
     * @param date 日
     * @param startAtMonday 默认true
     */
    getWeekNum(year: number, month: number, date: number, startAtMonday?: boolean): number
    /**
     * 获取两个日期的间隔天数
     * @param dateStart 日期1 格式可以是 1时间戳(数字/字符串) 2数组 3日期字符串
     * @param dateEnd 日期2 格式可以是 1时间戳(数字/字符串) 2数组 3日期字符串
     */
    getOffset(dateStart: Date | number | string, dateEnd: Date | number | string): number
}

interface GlobalLib {
    time: time
}

declare global {
    const g: GlobalLib

    /**
     * 根据类定义创建实例对象，并可根据id缓存对象
     * @param def - 定义
     * @param constructorParams - 构造参数
     * @returns 实例对象
     */
    function _<T>(def: (new () => T) | Function, ...constructorParams: any[]): T
    /**
     * 根据类定义创建实例对象，并可根据id缓存对象
     * @param id - 目标实例id
     * @param def - 定义
     * @param constructorParams - 构造参数
     * @returns 实例对象
     */
    function _<T>(id: string, def: (new () => T) | Function, ...constructorParams: any[]): T

    const trace: {
        /**
         * 终端打印输出, 默认为调用console.log(...arg), 可通过trace.setDefault()进行修改
         * @param ...arg
         *
         * @example
         * trace(...arg) //相当于调用console.log
         *
         * trace.setDefault(tracex.data)  //设置trace默认调用的方法是tracex.data
         * trace(...arg)  //相当于调用tracex.data
         */
        (...arg: any[]): void
    }

    const $: {
        (id: string): any
    }

    interface Object {
        /**
         * return Object.keys(obj)
         */
        get __keys(): string[]
        /**
         * return Object.keys(obj)[0]
         */
        get __key0(): string
        /**
         * return Object.values(obj)
         */
        get __values(): any[]
        /**
         * return Object.values(obj)[0]
         */
        get __value0(): any
        /**
         * 遍历执行fn并返回自身
         * @param fn 回调函数
         */
        __forEach(fn: (key: string, value: any, self: this) => void): ThisType
        /**
         * 异步执行遍历fn并返回自身
         * @param fn 异步回调函数
         */
        __forEachAsync(fn: (key: string, value: any, self: this) => Promise<void>): Promise<ThisType>
        /**
         * 遍历回调每一项, 每一项的fn回调均返回true则最终返回true, 否则返回false
         * @param fn 回调函数
         */
        __every(fn: (key: string, value: any, self: this) => Boolean): Boolean
        /**
         * 遍历回调每一项, 只要有一项的回调fn返回false则最终返回false, 否则返回true
         * @param fn 回调函数
         */
        __some(fn: (key: string, value: any, self: this) => Boolean): Boolean
        /**
         * 遍历生成新的Object, 每一组键值对都可用相应的处理器进行转换处理
         * @param keyExecutor 键处理器
         * @param valueExecutor 值处理器
         *
         * @example
         * let obj = { a: 1, b: 2 }
         *
         * obj.__map(v => v+1) // => {a:2, b:3}
         * obj.__map((k, v) => v+1, v => v+1) // => {2:2, 3:3}
         *
         * // 如果k不是一个有效的String或Number, 在map过程中会丢弃该项
         * let obj = { a: 1, b: 2, _c: 3 }
         *
         * obj.__map(
         *     (k, v) => !k.startsWith('_') && k, // 丢弃下划线开头的项
         *     (v, k) => v
         * )
         * // => { a: 1, b: 2}
         *
         * // 以下是一个很简单的示例, 使用__map创建 accessor descriptor 以实现一个 SafeData 生成器
         * function createSafeData(initData) {
         *     // 内部创建一个 safeData
         *     let safeData = { ...initData }
         *     return __def(
         *         {},
         *         {
         *             // 遍历每一项, 生成与之对应的 accessor descriptor
         *             ...safeData.__map((v, k) => __def_get('e', () => safeData[k])),
         *
         *             // 只能通过 update({...}) 更新内部数据
         *             update(updateData) {
         *                 safeData.__forEach(k => {
         *                     k in updateData && (safeData[k] = updateData[k])
         *                 })
         *             },
         *         }
         *     )
         * }
         *
         * let obj = createSafeData({ name: 'billypc', age: 40 })
         * trace(obj.name, obj.age)
         * obj.update({ name: 'billy' })
         * trace(obj.name, obj.age)
         */
        __map(valueExecutor: (value: any, key: string, self: this) => any): object
        __map(
            keyExecutor: (key: string, value: any, self: this) => string | number,
            valueExecutor: (value: any, key: string, self: this) => any
        ): object
        /**
         * Object 转换为 Array,
         * @param valueExecutor 每一项处理器, 返回最终数组项
         *
         * @example
         * let obj = { a: 1, b: 2 }
         *
         * obj.__toArray((k, v) => `${k}:${v}`)
         * // => [ 'a:1', 'b:2' ]
         *
         * obj.__toArray((k, v) => ({ name: k, age: v }))
         * // => [ { name: 'a', age: 1 }, { name: 'b', age: 2 } ]
         */
        __toArray(valueExecutor: (key: string, value: any, self: this, arrayReturn: any[]) => any): any[]
        /**
         * 从目标对象中获取并新增属性
         * @param obj
         *
         * @example
         *
         * let obj = { a: 1, b: 2 }
         * obj.__add({ c: 3, d: 4 })
         * // => { a: 1, b: 2, c: 3, d: 4 }
         */
        __add(obj: Record<string,any>): this
        /**
         * 根据fn回调的返回结果过滤并返回新的object
         * @param fn
         *
         * @example
         *
         * let obj = { a:1, b:2, c:3, 1:1, 2:2, 3:3 }
         * obj.__filter((k, v) => v >= 2)
         * // => { '2':2, '3':3, b:2, c:3 }
         *
         * obj.__filter(k => isNum(k))
         * // => { '1':1, '2':2, '3':3 }
         *
         * // 对于数组来说, 会转换为object
         * let arr = ['tom', 'jerry', 'lucy', 'lily']
         * arr.__filter(k => k >= 2)
         * // => { '2':'lucy', '3':'lily' }
         *
         */
        __filter(fn: (key: string, value: any, self: this) => Boolean): object
    }

    interface Array<T> {
        /**
         * Convert Array to Object
         *
         * @param key - 当Array每一项是{[key]:any}时, 可根据key进行转换, 默认值id
         * @param valueGroup - 生成value group，默认false
         * @param valKey - 指定value对应的key
         * @returns 键值对
         *
         * @example
         * [{id:'a'}, {id:'b'}, {id:'c'}].toHash('id')
         * // => {a:{id:1}, b:{id:2}, c:{id:3}}
         *
         * @example
         * [{id:'a',content:'txt1'}, {id:'b',content:'txt2'}, {id:'c',content:'txt1'}].toHash('content', true)
         * // =>
         * // {
         * //   txt1: [ { id: 'a', content: 'txt1' }, { id: 'c', content: 'txt1' } ],
         * //   txt2: [ { id: 'b', content: 'txt2' } ]
         * // }
         */
        toHash<T1 = keyof T>(key?: T1, valueGroup?: false): { [k: string | number]: T }
        toHash<T1 = keyof T>(key: T1, valueGroup: true): { [k: string | number]: T[] }
        toHash<T1 = keyof T, T2 = keyof T>(key: T1, valueGroup: false, valKey: T2): { [k: string | number]: any }
        toHash<T1 = keyof T, T2 = keyof T>(key: T1, valueGroup: true, valKey: T2): { [k: string | number]: any[] }
        /**
         * 数组根据指标标识,计算数量
         * @param key - 要统计的key
         * @param totalKey - 指定统计结果key并生成新的Object，通常用于构造新的Object（详见@example）
         * @returns 统计结果键值对
         * @example
         * [{userId:'aaa'},{userId:'bbb'},{userId:'aaa'},{userId:'aaa'}].getCountGroupBy('userId')
         * // => {aaa:3, bbb:1}
         *
         * [{userId:'aaa'},{userId:'bbb'},{userId:'aaa'},{userId:'aaa'}].getCountGroupBy('userId','orderNum')
         * // => {aaa:{orderNum:3}, bbb:{orderNum:1}}
         */
        getCountGroupBy(key: string, totalKey: string): { [key: string]: number | { [totalKey: string]: number } }
        /**
         * 将传入的对象，根据指定的key, 合并到到原始数组对应的项中，并返回原始数组（会修改原始数组）
         * @param kvObj - 目标对象数据集(待合并数据)
         * @param key - 目标数据集与原始数组一一对应的关联字段（相当于外键）
         * @param targetKey - 将目标对象的数据，覆写到原始Array对应项的targetKey的值上 (深度Copy)
         * @returns 合并了数据集中对应数据的原始数组（该方法会修改原始数组属性值，从数据集中获取数据采用深度复制到原始数组，因此后续数据处理不会对数据集产生影响）
         *
         * @example
         * [{id:1,name:'tom'},{id:2,name:'jerry'}].mergeTo({1:21,2:20}, 'id', 'age')
         * //=> [{id:1, name:'tom', age:21}, {id:2, name:'jerry', age:20}]  //如果原始数组项中有age属性，将会被覆盖
         */
        mergeTo<T1, T2>(kvObj: { [key: string]: T2 }, key: string, targetKey?: string): Array<T1 & T2>
        /**
         * 将传入数组的数据集，合并到原始数组对应的项中
         * @param list - 数据集数组(待合并数据)
         * @param key - 目标数据集与原始数组一一对应的关联字段（相当于外键）
         * @param mergeKey - 将目标对象的数据，覆写到原始Array对应项的targetKey的值上 (默认深度Copy)
         * @param mergeExecutor - 合并方法，默认采用__merge方法（深度Copy)
         * @returns 合并了数据集中数据的原始数组（会修改原始数组），该方法通常用于合并两组能够一一对应的数据
         *
         * @example
         * [{id:1,name:"A"}].mergeList([{sid:1,"age":11}],"sid","id")
         * // => [{id:1,name:"A",age:11}]
         */
        mergeList<T1, T2>(
            list: T2[],
            key: string,
            mergeKey?: string,
            mergeExecutor?: (target: object, source: object) => void
        ): Array<T1 & T2>
        /**
         * 调用push后返回原数组对象，主要用于链式语法
         * @param ...arg - 待操作对象
         * @returns 返回原数组对象，可继续编写链式调用
         */
        add(...arg: T[]): T[]
        /**
         * 调用unshift后返回原数组对象，主要用于链式语法
         * @param ...arg - 待操作对象
         * @returns 返回原数组对象，可继续编写链式调用
         */
        addFirst(...arg: T[]): T[]
        /**
         * 调用splice后返回原数组对象，主要用于链式语法
         * @param startIndex - 开始索引
         * @param deleteLength - 删除长度
         * @returns 返回原数组对象，可继续编写链式调用
         */
        remove(startIndex: number, deleteLength: number): T[]
        /**
         * 删除指定的item，并返回原数组对象
         * @param item 要删除的item (若数组内未找到item,不做任何处理)
         * @returns 返回原数组对象，可继续编写链式调用
         */
        removeItem(item: T): T[]
        /**
         * 调用splice从末尾开始删除后返回原数组对象，主要用于链式语法
         * @param deleteLength - 从末尾开始删除的长度
         * @returns 返回原数组对象，可继续编写链式调用
         */
        removeLast(deleteLength: number): T[]
        /**
         * 调用splice从开头开始删除后返回原数组对象，主要用于链式语法
         * @param deleteLength - 从头开始删除的长度
         * @returns 返回原数组对象，可继续编写链式调用
         */
        removeFirst(deleteLength: number): T[]
        /**
         * 调用forEach后返回原数组对象，主要用于链式语法
         * @param callbackfn - callback function
         * @param thisArg - this
         * @returns 返回原数组对象，可继续编写链式调用
         */
        forEachReturn(callbackfn: (value: T, index: number, array: readonly T[]) => void): T[]
        forEachAsync(callbackfn: (value: T, index: number, array: readonly T[]) => Promise<void>): Promise<T[]>
        /**
         * 根据传入的规则方法进行匹配，并返回第一个匹配项的计算结果
         * @param callbackfn
         * @param thisArg
         * @returns 第一个匹配项的技术结果
         *
         * @example
         *
         * let word = 'userName=tom'
         * let matchResult = [/^userName=(\S+?)$/, /^userId=(\S+?)$/].match(v => word.match(v))
         * matchResult && trace(matchResult[1])
         * // => tom
         * 一般用于批量正则匹配拿到结果
         */
        match(callbackfn: (value: T, index: number, array: readonly T[]) => void): any
        /**
         * 根据数组每项值, 生成以该值为key的键值对
         *
         * <Feature>
         * - Array 转换 Object
         * - 可自定义Key
         * - 可自定义Value
         * </Feature>
         *
         * @param keyExecutor 生成key的回调方法
         * @param valueExecutor 生成与key对应的value的回调方法
         * @return 新的键值对
         *
         * @example
         *
         * // 数组的每一项是 number 或 string 时
         * [1,2,3].mapToObject()
         * // => {1:1, 2:2, 3:3}
         *
         * @example
         *
         * const output = ['info', 'warn', 'error', 'success'].mapToObject(v => msg => trace(`[${v.toUpperCase()}] ${msg}`))
         * output.info('hello world, farewell.')
         * // => [INFO] hello world, farewell.
         *
         * @example
         *
         * const output = [
         *     'info',
         *     'warn',
         *     'error',
         *     'success'
         * ].mapToObject(
         *     v => msg => trace(`[${v.toUpperCase()}] ${msg}`)
         * )
         * output.info('hello world, farewell.') // => [INFO] hello world, farewell.
         *
         * //另一种用法, 可生成新的key和value:
         * const { tom, jerry } = [
         *     { name: 'tom', color: 'blue' },
         *     { name: 'jerry', color: 'yellow' },
         * ].mapToObject(
         *     v => v.name,
         *     v => __def(v, { say: msg => trace(`<span style='color:${v.color}'>${v.name}: ${msg}</span>`) }),
         * )
         *
         * tom.say('hello')    // => <span style='color:blue'>tom: hello</span>
         * jerry.say('hello')  // => <span style='color:yello'>jerry: hello</span>
         *
         * @example
         *
         * // 特殊情况: 当转换后的key无法作为键时(即类型不是字符串或数字, 以及''), 该项将会被舍弃
         * [1, null, 3].mapToObject(v=>v)
         * // => {'1': 1, '3': 3}
         *
         * [{ name: 'tom', age: 6 }, { name: 'jerry', age: 8 }].mapToObject(
         *     v => v.age > 6 && v.name,
         *     v => v.age
         * )
         * // => { jerry: 8 }
         *
         */
        mapToObject<T1>(
            keyExecutor: (item: T, index: number, array: readonly T[], returnObj: T1) => string | number,
            valueExecutor: (item: T, index: number, array: readonly T[], returnObj: T1) => any
        ): object
        mapToObject<T1>(valueExecutor: (item: T, index: number, array: readonly T[], returnObj: T1) => any): object
        mapToObject(): { [k: string]: string | number }
        /**
         * 字符排序 (字符逐位比较, 有3种排序方式供选择)
         * @param executor 排序回调 sortCore:排序处理器, val1, val2: 为待比较项
         * @param rule 排序规则(默认0) 0:第一排序字符串长度升序, 第二排序unicode字节码升序  1:第一排序unicode字节码升序, 第二排序字符串长度升序  2:数字优先 + 字符unicode升序 + 长度升序
         *
         * @example
         *
         * 排序规则用常量会使代码更加清晰
         * Array.SORT_length_char : 0     //长度升序 + 字符unicode升序
         * Array.SORT_char_length : 1     //字符unicode升序 + 长度升序
         * Array.SORT_num_char_length : 2 //数字优先 + 字符unicode升序 + 长度升序
         *
         * ['home', 'hat', 'hot', 'how'].charSort((f, a, b) => f(a, b)) // 完整调用
         * ['home', 'hat', 'hot', 'how'].charSort() // 数组项不是object时, 可省略参数
         * // => [ 'hat', 'hot', 'how', 'home' ]
         *
         * //当数组项是object, 需要用某一属性进行排序, 如下:
         * [{k:'home'}, {k:'hat'}, {k:'hot'}, { k: 'how' }].charSort((f, a, b) => f(a.k, b.k))
         * // => [ { k: 'hat' }, { k: 'hot' }, { k: 'how' }, { k: 'home' } ]
         *
         * ['home', 'hat', 'hot', 'how'].charSort(1) // 先按字符排序, 再按长度排序
         * // => [ 'hat', 'home', 'hot', 'how' ]
         *
         * [{k:'home'}, {k:'hat'}, {k:'hot'}, { k: 'how' }].charSort((f, a, b) => f(a.k, b.k), 1)
         * // => [ { k: 'hat' }, { k: 'home' }, { k: 'hot' }, { k: 'how' } ]
         */
        charSort(executor?: (sortCore: (val1: T, val2: T) => number, val1: T, val2: T) => void, rule?: 0 | 1 | 2): T[]
        /**
         * 字符排序 (字符逐位比较, 有3种排序方式供选择)
         * @param rule 排序规则(默认0) 0:第一排序字符串长度升序, 第二排序unicode字节码升序  1:第一排序unicode字节码升序, 第二排序字符串长度升序  2:数字优先 + 字符unicode升序 + 长度升序
         *
         * @example
         *
         * ['home', 'hat', 'hot', 'how'].charSort(1) // 先按字符排序, 再按长度排序
         * // => [ 'hat', 'home', 'hot', 'how' ]
         */
        charSort(rule: 0 | 1 | 2): T[]
        /**
         * 增强的数组过滤器
         * @param filtValue 过滤条件 (过滤条件是function时, 等同于Array.prototype.filter)
         * @param option 过滤选项 (仅当过滤条件是Array/String时, 值为 true/false/'prefix'/'suffix')
         *
         * @example
         *
         * // 从给定的数组中过滤
         * ['a','b','c','d'].fitlerBy(['b','c'])
         * // => ['b','c']
         *
         * ['a','b_0','b_1','c','d'].fitlerBy(['b','c'], 'prefix')
         * // => ['b_0','b_1','c']
         *
         * ['prefix_a','prefix_b','prefix_c','prefix_d'].fitlerBy(['b','c'], 'suffix')
         * // => ['prefix_b','prefix_c']
         *
         * // 反向过滤
         * ['a','b','c','d'].fitlerBy(['b','c'], false)   // => ['a','d']
         *
         * // 数组项为object
         * [{name:'a'},{name:'b_0'},{name:'b_1'},{name:'c_0'},{name:'c_1'}].fitlerBy(['b','c'], {key:'name', fix:'prefix'})
         * // => [{name:'b_0'},{name:'b_1'},{name:'c_0'},{name:'c_1'}]
         *
         * // 另一种入参方式
         * [{name:'a'},{name:'b_0'},{name:'b_1'},{name:'c_0'},{name:'c_1'}].fitlerBy(['b','c'], {key:v=>v.name, fix:'prefix'})
         * // => [{name:'b_0'},{name:'b_1'},{name:'c_0'},{name:'c_1'}]
         *
         * //用指定的string来过滤数组项
         * ['a','b_0','b_1','c'].fitlerBy('b', 'prefix')
         * // => ['b_0','b_1']
         *
         * [{name:'a'},{name:'b_0'},{name:'b_1'},{name:'c'}].fitlerBy('b', {key:v=>v.name,fix:'prefix'})
         * // => ['b_0','b_1']
         *
         * // 反选 - 过滤出前缀不为b的项
         * ['a','b_0','b_1','c'].fitlerBy('b', {contain:false, fix:'prefix'})
         * // => ['a','c']
         *
         * //过滤出非空项
         * ['a','','c'].filterBy(true)
         * // => ['a','c']
         *
         * //根据正则过滤
         * ['a_001','b_102','c_903'].filterBy(/_[1-9]{1}\d{2}/)
         * // => ['b_102','c_903']
         */
        filterBy(
            filtValue: (val: T, index: number, array: T[]) => boolean | any[] | string | boolean | RegExp,
            option?:
                | true
                | false
                | 'prefix'
                | 'suffix'
                | { key?: string | ((val: T) => any); contain?: true | false; fix?: 'prefix' | 'suffix' }
        ): T[]
        /**
         * 取数组开头的n项 (1 ≤ n ≤ length, 默认1)
         * @param n
         *
         * [1,2,3,4].firstItem(2)
         * // => [1,2]
         *
         */
        firstItem(n: number): T[]
        /**
         * 取数组尾部的n项 (1 ≤ n ≤ length, 默认1)
         * @param n
         *
         * [1,2,3,4].lastItem(2)
         * // => [3,4]
         *
         */
        lastItem(n: number): T[]
        /**
         * 数组最后一项, 即 arr[arr.length-1]
         *
         * @example
         *
         * ;[1, 2, 3, 4].last
         * // => 4
         *
         * ;[1, 2, 3, 4].last++
         * // 原数组=> [1,2,3,5]
         */
        last: T
        /**
         * 替换数组项, 并返回原数组
         * @param fn
         *
         * @example
         *
         * // 源数组每项 +1
         * [1, 2, 3, 4, 5, 6].replace(v => v + 1)
         * // => [ 2, 3, 4, 5, 6, 7 ]
         *
         * // 删除源数组中的奇数
         * Array.fromLength(8, v => v + 1).replace((v, i, a, del) => (v % 2 == 0 ? v : del()))
         * // => [ 2, 4, 6, 8 ]
         *
         * // 删除源数组中的奇数, 剩余每一项转换为2的幂次方
         * Array.fromLength(8, v => v + 1).replace((v, i, a, del) => (v % 2 == 0 ? Math.pow(2, v) : del()))
         * // => [ 4, 16, 64, 256 ]
         */
        replace(fn: (item: T, index: number, array: this, delFn: () => undefined) => T | undefined): T[]
        /**
         * 从数组最后一项开始查找符合条件的项, 并返回该项
         * @param fn
         *
         * @example
         *
         * [{name:'tom', age:10}, {name:'jerry', age:10}].find(v=>v.age==10)
         * // => {name:'jerry', age:10}
         */
        findLast(fn: (item: T, index: number, array: this) => boolean): T
        /**
         * 从数组最后一项开始查找符合条件项, 并返回其索引
         * @param fn
         *
         * @example
         *
         * ['b', 'c', 'a', 'd', 'c'].findLastIndex(v => v=='c')
         * // => 4
         */
        findLastIndex(fn: (item: T, index: number, array: this) => boolean): number
    }

    interface ArrayConstructor {
        /**
         * 初始化并生成一个指定长度的Array，每项值为0
         * @param len - 新数组的length
         * @param mapFn - map方法, 用于初始化新数组的每一项, 传入index, 或用初始值填充每一项
         * @returns 每项值为index的新数组
         *
         * ps: 单纯生成指定长度的数组 Array.fromLength(length) 比 Array.from({length}) 速度快一倍以上
         *
         * @example
         *
         * // Each item is 0
         * Array.fromLength(5) // => [0, 0, 0, 0, 0]
         *
         * // Each item is default value
         * Array.fromLength(5, '') // => ['', '', '', '', '']
         *
         * // Each item is index
         * Array.fromLength(5, v => v) // => [0, 1, 2, 3, 4]
         *
         * // use mapFn
         * Array.fromLength(5, v => String.fromCharCode(v + 65)) // => [ 'A', 'B', 'C', 'D', 'E' ]
         */
        fromLength<T>(
            len: number,
            mapFn?: ((index: number, array: T<any>[]) => any) | string | object | any[] | number | boolean | symbol
        ): T<any>[]
        /** [].charSort方法排序规则: 长度升序 + 字符unicode升序 */
        SORT_length_char: 0
        /** [].charSort方法排序规则: 字符unicode升序 + 长度升序 */
        SORT_char_length: 1
        /** [].charSort方法排序规则: 数字优先 + 字符unicode升序 + 长度升序 */
        SORT_num_char_length: 2
    }

    interface FunctionConstructor {
        /**
         * 根据参数匹配规则(用一个数组来描述函数重载类型), 识别参数值 (用于实现重载函数的参数识别)
         * @param paramDefRules - 参数匹配规则列表, 可识别函数入参的ts类型声明, 如(url:string, param:object)=>void
         * @param args - 直接传入argument进行参数解析
         * @returns 入参键值对
         *
         * @example
         *
         * 定义hello函数实现重载的效果, 满足3种入参方式:
         * function hello(name: string, age?: number|string, someSpeak?: string): void
         * function hello(name: string, someSpeak: string,age?: number): void
         * function hello(obj: { name: string; age?: number; someSpeak?: string }): void
         *
         * hello函数实现如下:
         * const hello = (...arg) => {
         *   let {
         *        name,
         *        age = 0,
         *        someSpeak = '',
         *   } = Function.getParamsWith(
         *       [
         *           'name:string, age?:number, someSpeak?:string'
         *           'name:string, someSpeak:string, age?:number',
         *           'object'
         *       ],
         *       arg
         *   )
         *   console.log(`hello ${name}.${age > 0 ? ` I am ${age} years old.` : ''}${someSpeak ? ` ${someSpeak}` : ''}`)
         * }
         *
         * hello('billy', 40, 'farewell!')
         * // => 'hello billy. I am 40 years old. farewell!'
         *
         * hello('billy', 'farewell!', 40)
         * // => 'hello billy. I am 40 years old. farewell!'
         *
         * hello('billy', 40, 'farewell!')
         * // => hello billy. I am 40 years old.
         *
         * hello('billy', 'farewell!')
         * // => hello billy. farewell!
         *
         * hello({ name: 'billy', age: 40 })
         * // => hello billy. I am 40 years old.
         *
         * 注1: 目前支持基础类型如 string, number, boolean, object, function, string[], number[], object[], {[k]:<type>}等, 语法可参照函数参数的ts类型声明
         * 注2: 如果入参是一个包含所有字段的Obj, 定义应直接为'object' (见示例参数规则列表的最后一项)
         * 注3: 须注意['a:string, b?:string', 'b:string']和['a:string, b:string', 'b:string']是不一样的两个匹配规则
         *      前者可以简写为['a:string, b?:string'], 或者直接将入参写在函数定义内, 而后者不行
         *
         * @example
         *
         * 使用...语法来获取不定数量的剩余参数
         *
         * 以下示例实现了一个用于创建定时器的方法:
         * const _intervalCache = {}
         * function createInterval() {
         *     let {
         *         name = 'defaule',
         *         executor,
         *         time = 3600,
         *         params,  // 注意: 因为在定义中使用...params来获取剩余入参, 因此params是一个数组 ( params:any[] )
         *     } = Function.getParamsWith(
         *         [
         *             'id:string, executor:Function, time:number, ...params',
         *             'id:string, executor:Function, ...params',
         *             'executor:Function, time:number, ...params',
         *             'executor:Function, ...params',
         *         ],
         *         arguments
         *     )
         *     _intervalCache[name] = _intervalCache[name] || []
         *     _intervalCache[name].push(setInterval(executor, time * 1000, ...params))
         * }
         *
         * function autoSave(file_path) {
         *     // 每隔60秒执行一次自动保存文件
         *     trace('autoSave', file_path)
         * }
         * function fetch(url, default_value) {
         *     // 每隔7200秒执行一次fetch url
         *     trace('fetch', url, default_value)
         * }
         * const socket = {
         *     sendHeartbeat() {
         *         // 每隔90秒执行一次发送心跳
         *         trace('socket.sendHeartbeat')
         *     },
         * }
         *
         * createInterval('task:autoSave', autoSave, 60, 'file_path')
         * createInterval('task:notice', fetch, 7200, 'web_url', 'default_value')
         * createInterval('heartbeat', socket.sendHeartbeat, 90)
         *
         *
         * @example
         * function foo(){
         *    let {a='a', b} = Function.getParamsWith(
         *         [
         *            'a:string, b:string',
         *            'b:string'
         *         ],
         *         arguments
         *    )
         *    trace(a + b)
         * }
         * foo()        // 缺失了必要参数, throw Error
         * foo('A','B') // => AB   (匹配到第1条规则)
         * foo('B') // => aB   (必要参数只有1个，匹配到第2条规则)
         *
         * @example
         * // 类型为{[key:string]:<type>}
         * function test(...arg) {
         *     let { a, b } = Function.getParamsWith(
         *         [
         *            'a:{[k]:string[]}, b:{add:string}',
         *            'b:{add:string}, a:{[k]:string[]}',
         *         ], arg
         *     )
         *     trace({ a, b })
         * }
         *
         * test({ add: [] }, { add: '' })  // => { a: { add: [] }, b: { add: '' } }
         * test({ add: '' }, { add: [] })  // => { a: { add: [] }, b: { add: '' } }
         */
        getParamsWith(paramDefRules: string[], args: any[]): { [k: string]: any }
    }

    interface String {
        /**
         * 调用Number.parseInt()方法依据指定基数,解析字符串并返回一个整数。
         * @param base 基数(默认10)
         * @returns
         */
        parseInt(base: number): number
        /**
         * 首尾去空格
         * @returns
         */
        trim(): string
        /**
         * 用给定的数据对象格式化模版字符串
         * @param paramObj - 数据对象(键值对) or 数组
         * @return {string} 格式化后的字符串
         *
         * @example
         *
         * let templateString = 'Everyone knows that {0} likes to {1} every {2}.'
         *
         * templateString.paramFormat('tom', 'eat fruits', 'day')
         * // => 'Everyone knows that tom likes to eat fruits every day.'
         *
         * templateString.paramFormat(['tom', 'eat fruits', 'day'])
         * // => 'Everyone knows that tom likes to eat fruits every day.'
         *
         * @example
         *
         * 'Everyone knows that {name} likes to {like} every {rate}.'.paramFormat({ name: 'tom', like: 'swim', rate: 'two days' })
         * // => Everyone knows that tom likes to swim every two days.
         *
         * '裁判判罚了{0}! 这是今天第一个{0}判罚, 看来{1}已经可以开始提前庆祝胜利了.'.paramFormat(['点球', '客队'])
         * // => 裁判判罚了点球, 这是今天第一个点球判罚, 看来客队已经开始提前庆祝胜利.
         *
         * let htmlTemplate = '<span class="color-key">{keyName}:</span><span class="color-type-{valueType}">{valueType}</span>'
         * htmlTemplate.paramFormat({ keyName: '姓名', valueType: 'string' })
         * // => <span class="color-key">姓名:</span><span class="color-type-string">string</span>
         */
        paramFormat(paramObj: { [k: string]: string | number } | (string | number)[]): string
        /**
         * 用给定的数据对象格式化模版字符串
         * @param ...arg - 数据参数数组
         * @return {string} 格式化后的字符串
         *
         * @example
         *
         * let templateString = 'Everyone knows that {0} likes to {1} every {2}.'
         *
         * templateString.paramFormat('tom', 'eat fruits', 'day')
         * // => 'Everyone knows that tom likes to eat fruits every day.'
         *
         * templateString.paramFormat(['tom', 'eat fruits', 'day'])
         * // => 'Everyone knows that tom likes to eat fruits every day.'
         *
         * 'Everyone knows that {name} likes to {like} every {rate}.'.paramFormat({ name: 'tom', like: 'swim', rate: 'two days' })
         * // => Everyone knows that tom likes to swim every two days.
         *
         * '裁判判罚了{0}! 这是今天第一个{0}判罚, 看来{1}已经可以开始提前庆祝胜利了.'.paramFormat(['点球', '客队'])
         * // => 裁判判罚了点球, 这是今天第一个点球判罚, 看来客队已经开始提前庆祝胜利.
         *
         * let htmlTemplate = '<span class="color-key">{keyName}:</span><span class="color-type-{valueType}">{valueType}</span>'
         * htmlTemplate.paramFormat({ keyName: '姓名', valueType: 'string' })
         * // => <span class="color-key">姓名:</span><span class="color-type-string">string</span>
         */
        paramFormat(...arg: (string | number)[]): string
        /**
         * 返回一个URL对象
         * @param baseOrPath 根据当前字符串判断入参是base还是path,具体看示例
         * @returns URL对象
         *
         * @example
         *
         * //当前字符串是path:
         * '/'.toURL('https://test.com')
         * 'login'.toURL('https://test.com/api/')
         * '/login'.toURL('https://test.com')
         *
         * //当前字符串是base:
         * 'https://test.com'.toURL('/')
         * 'https://test.com'.toURL('/api/login')
         */
        toURL(baseOrPath: string): URL
        /**
         * 比较2个字符串的大小
         * @param str - 要比较的字符串
         * @param rule - lengthFirst表示优先比较长度,charFirst表示优先比较charCode
         * @returns 返回 -1/0/1(分别表示 < = > )
         *
         * @example
         *
         * 'c'.compare('a11')  // => -1
         * 'c'.compare('a11', 'charFirst')  // => 1
         * 'a1'.compare('a11')  // => -1
         * 'a1'.compare('a11', 'charFirst')  // => -1
         *
         * @example
         * lengthFirst用于排序的场景:
         * c
         * a11
         * b11
         * a111
         * b111
         *
         * charFirst用于排序的场景:
         * a11
         * a111
         * b11
         * b111
         * c
         */
        compare(str: string, rule: 'lengthFirst' | 'charFirst'): number
        /**
         * 生成格式化字符串
         * @param template 格式化模板, 默认: #,##0 (千分位逗号分隔)
         *
         * @example
         *
         * // 保留1位小数
         * '40.123'.format('0.0') // => '40.1'
         *
         * // 千分位逗号分隔 (不保留小数)
         * '403424.123'.format() // => '403,424'
         *
         * // 千分位逗号分隔+保留2位小数
         * '403424.1'.format('#,##0.00') // => '403,424.10'
         *
         * //科学计数法
         * '40.123'.format('0.0E+00') // => '4.0E+01'
         * '40.123'.format('0.00E+0') // => '4.01E+1'
         * '4723525622347'.format('0.00E+0') // => '4.72E+12'
         *
         * //百分比
         * '1'.format('0.00%') // => '100.00%'
         * '0.45342'.format('0.00%') // => '45.34%'
         * '0.45342'.format('%') // => '45%'
         */
        format(template: string): string
    }

    interface Number {
        /**
         * 设置数字的限制范围
         * @param range 取值范围
         * @returns 最终数字
         *
         * @example
         *
         * const num = 80
         *
         * // 设置上限 & 下限
         * num.setRange([0,100])  // => 80
         * num.setRange([90,100])  // => 90
         * num.setRange([0,10])  // => 10
         * // 仅设置下限
         * num.setRange([0])  // => 80
         * num.setRange([90])  // => 90
         * // 仅设置上限
         * num.setRange([,100])  // => 80
         * num.setRange([,50])  // => 50
         */
        setRange(range: [number, number]): number
        setRange(range0: number, range1: number): number
        /**
         * 判断数字是否在限制范围内 (包含边界)
         * @param range 目标范围
         * @returns
         *
         * @example
         *
         * const num=80
         * // 下限 ≤ num ≤ 上限
         * num.inRange([0,100])  // => true
         * num.inRange([0,10])  // => false
         * num.inRange([90,100])  // => false
         *
         * // 下限 ≤ num
         * num.inRange([0])  // => true
         * num.inRange([90])  // => false
         *
         * // num ≤ 上限
         * num.inRange([,0])  // => false
         * num.inRange([,90])  // => true
         */
        inRange(range: [number, number]): boolean
        inRange(range0: number, range1: number): boolean
        /**
         * 取max
         * @param arg
         * @returns
         *
         * @example
         *
         * let num=3, numList=[2,5,-1,6,8,4]
         * num.max(numList)  // => 8
         * num.max(...numList)  // => 8
         * num.max(6) // => 6
         */
        max(...arg): number
        /**
         * 取min
         * @param arg
         * @returns
         *
         * @example
         *
         * let num=3, numList=[2,5,-1,6,8,4]
         * num.min(numList)  // => -1
         * num.min(...numList)  // => -1
         * num.min(6) // => 3
         */
        min(...arg): number
        /**
         * 向下取整
         * @returns
         *
         * @example
         *
         * (3.4).floor() // => 3
         */
        floor(): number
        /**
         * 向上取整
         * @returns
         *
         * @example
         *
         * (3.4).ceil() // => 4
         */
        ceil(): number
        /**
         * 四舍五入
         * @returns
         *
         * @example
         *
         * (3.4).round() // => 3
         */
        round(): number
        /**
         * 取绝对值
         * @returns
         *
         * @example
         *
         * (-3).abs() // => 3
         */
        abs(): number
        /**
         * 在当前数范围内取随机数
         * @param round 是否取整(true/false), 默认true
         * @returns
         *
         * @example
         *
         * (30).random() // => [0,30)的随机整数
         * (30).random(0) // => [0,30)的随机小数
         */
        random(round: boolean): number
        /**
         * 弧度->度
         * @returns
         */
        toDegree(): number
        /**
         * 度->弧度
         * @returns
         */
        toRadian(): number
        /**
         * 调用Number.parseInt()方法依据指定基数,解析字符串并返回一个整数。
         * @param base 基数(默认10)
         * @returns
         */
        parseInt(base: number): number
        /**
         * 幂函数
         * @param power 幂指数
         * @returns
         */
        pow(power: number): number
        /**
         * 生成格式化字符串
         * @param template 格式化模板, 默认: #,##0 (千分位逗号分隔)
         *
         * @example
         *
         * // 保留1位小数
         * (40.123).format('0.0') // => '40.1'
         *
         * // 千分位逗号分隔 (不保留小数)
         * (403424.123).format() // => '403,424'
         *
         * // 千分位逗号分隔+保留2位小数
         * (403424.1).format('#,##0.00') // => '403,424.10'
         *
         * //科学计数法
         * (40.123).format('0.0E+00') // => '4.0E+01'
         * (40.123).format('0.00E+0') // => '4.01E+1'
         * (4723525622347).format('0.00E+0') // => '4.72E+12'
         *
         * //百分比
         * (1).format('0.00%') // => '100.00%'
         * (0.45342).format('0.00%') // => '45.34%'
         * (0.45342).format('%') // => '45%'
         */
        format(template: string): string
    }

    /**
     * 在目标对象上调用Object.defineProperties (与第三方包d类似, 可参看https://www.npmjs.com/package/d)
     * @param obj 目标对象
     * @param tag 标记位 e=enumerable c=configurable w=writable
     * @param properties 属性对象
     * @returns 扩展属性后的原始对象
     *
     * __def用于在对象上扩展，相当于Object.defineProperties
     * __def_value, __def_get, __def_set, __def_gs用于生成单个property对象, 可通过传入'cew'来生成对应的属性描述
     *
     * @example
     * let obj = __def({}, 'e', {
     *   name: {...}
     * })
     *
     * let obj1 = __def({}, 'ew', {name: 'billy'})
     *
     * let obj2 = __def({}, {
     *   name: __def_gs(()=>{return ''},v=>{})
     * })
     */
    function __def<T>(obj: T, tag: string, properties: object): T
    /**
     * 在目标对象上调用Object.defineProperties, 标记位默认'ecw'
     * @param obj 目标对象
     * @param properties 属性对象
     * @returns 扩展属性后的原始对象
     */
    function __def<T>(obj: T, properties: object): T
    /**
     * 与__def相似, 区别在于__def仅定义属性, __def_bind会自动将属性中的方法bind到目标对象
     * @param obj 目标对象
     * @param tag 标记位 e=enumerable c=configurable w=writable
     * @param properties 属性对象
     * @returns 扩展属性后的原始对象
     *
     * @example
     * 来看MDN上Function.prototype.bind的示例, 如下:
     * const module = {
     *   x: 42,
     *   getX: function () {
     *     return this.x;
     *   },
     * };
     *
     * const boundGetX = module.getX.bind(module);
     * console.log(boundGetX()); // => 42
     *
     * 使用__def_bind来达成同样效果:
     * const module = __def_bind({}, { x: 42, getX: () => this.x })
     * const boundGetX = module.getX;
     * console.log(boundGetX()); // => 42
     *
     * // ！！！注意到了吗？ getX:()=>this.x 使用了箭头语法, 但并不能改变this指向
     *
     * 使用defineProperty可以通过属性描述操作符对子属性进行自定义, 另外__def_bind支持了方法到对象的自动绑定(这个绑定只针对子属性是Function,并且需要调用this)
     * 适用场景: 可用于内置的底层方法,用__def_bind控制属性的可操作性及是否可枚举, 可以达到关键对象防篡改的目的。还可用于某个对象的方法在长调用链中进行传递时保持this指向正确.
     */
    function __def_bind<T>(obj: T, tag: string, properties: object): T
    /**
     * 在目标对象上调用Object.defineProperties,并bind到目标对象 标记位默认'ecwb'
     * @param obj 目标对象
     * @param properties 属性对象
     * @returns 扩展属性后的原始对象
     */
    function __def_bind<T>(obj: T, properties: object): T
    function __def_value<T>(descTag: string, value: any): object
    function __def_value<T>(value: any): object
    function __def_get<T>(descTag: string, getter: () => any): object
    function __def_get<T>(getter: () => any): object
    function __def_set<T>(descTag: string, setter: (val: any) => void): object
    function __def_set<T>(setter: (val: any) => void): object
    function __def_gs<T>(descTag: string, getter: () => any, setter: (val: any) => void): object
    function __def_gs<T>(getter: () => any, setter: (val: any) => void): object

    /**
     * 判断传入的值是否是一个数组
     * @param value - 传入的值
     * @returns true/false
     */
    function isArray(value: any): boolen
    /**
     * 在给定的范围[x,y)中取随机值 (左闭右开)
     * @param a - 范围数组,确定取随机数的范围
     * @param digit - 可保留小数位数, 默认根据数值范围来识别(向下取整)
     * @returns 范围内的随机数
     *
     * @example
     *
     * random() => [0,1)中的随机小数,等同于Math.random()
     * random(0, 6) => [0,6)中的随机整数
     * random(0, 6, 1) => [0,6)中的随机小数(小数点后保留1位)
     * random([0, 6]) => [0,6)中的随机整数
     * random([0, 6], 2) => [0,6)中的随机小数(小数点后保留2位)
     * random([0.6, 6]) => [0.6,6)中的随机小数(因识别到0.6是1位小数, 因此小数点后保留1位)
     * random([5.65, 8.5]) => [5.65,8.5)中的随机小数(因识别到5.65是2位小数, 因此小数点后保留2位)
     */
    function random(a: [x0: number, x1: number], digit?: boolean | number): number
    /**
     * 在给定的范围[x,y)中取随机值 (左闭右开)
     * @param a - 取值范围边界值1
     * @param b - 取值范围边界值2
     * @param digit - 可保留小数位数, 默认根据数值范围来识别(向下取整)
     * @returns 范围内的随机数
     *
     * @example
     *
     * random() => [0,1)中的随机小数,等同于Math.random()
     * random(0, 6) => [0,6)中的随机整数
     * random(0, 6, 1) => [0,6)中的随机小数(小数点后保留1位)
     * random([0, 6]) => [0,6)中的随机整数
     * random([0, 6], 2) => [0,6)中的随机小数(小数点后保留2位)
     * random([0.6, 6]) => [0.6,6)中的随机小数(因识别到0.6是1位小数, 因此小数点后保留1位)
     * random([5.65, 8.5]) => [5.65,8.5)中的随机小数(因识别到5.65是2位小数, 因此小数点后保留2位)
     */
    function random(a?: number, b?: number, digit?: boolean | number): number
    /**
     * 取数组中的任意一项
     * @param array - 传入的数组
     * @returns 随机项
     *
     * @example
     * getRandomItem([15, 25, 35, 45]) => 35
     * getRandomItem(['tom', 'jerry', 'spike', 'tyke']) => 'jerry'
     * getRandomItem(15, 25, 35, 45) => 25
     * getRandomItem('tom', 'jerry', 'spike', 'tyke') => 'tom'
     */
    function getRandomItem<T>(array: T[]): T
    /**
     * 取入参的随机一项
     * @param ...arg 待随机值以...arg形式传入
     * @returns 随机项
     *
     * @example
     * getRandomItem([15, 25, 35, 45]) => 35
     * getRandomItem(['tom', 'jerry', 'spike', 'tyke']) => 'jerry'
     * getRandomItem(15, 25, 35, 45) => 25
     * getRandomItem('tom', 'jerry', 'spike', 'tyke') => 'tom'
     */
    function getRandomItem<T>(...arg: T[]): T
    /**
     * 取整
     * @param value - 要取整的值
     * @returns {number}
     */
    function int(value: number): number
    /**
     * 用给定的数据对象格式化模版字符串
     * @param templateString - 模板字符串
     * @param paramObj - 数据对象(键值对) or 数组
     * @return {string} 格式化后的字符串
     *
     * @example
     * paramFormat('Everyone knows that {0} likes to {1} every {2}.', 'tom', 'eat fruits', 'day')
     * // => 'Everyone knows that tom likes to eat fruits every day.'
     *
     * paramFormat('Everyone knows that {0} likes to {1} every {2}.', ['tom', 'eat fruits', 'day'])
     * // => 'Everyone knows that tom likes to eat fruits every day.'
     *
     * paramFormat('Everyone knows that {name} likes to {like} every {rate}.', { name: 'tom', like: 'swim', rate: 'two days' })
     * // => Everyone knows that tom likes to swim every two days.
     *
     * paramFormat('裁判判罚了{0}! 这是今天第一个{0}判罚, 看来{1}已经可以开始提前庆祝胜利了.', ['点球', '客队'])
     * // => 裁判判罚了点球, 这是今天第一个点球判罚, 看来客队已经开始提前庆祝胜利.
     *
     * paramFormat('<span class="color-key">{keyName}:</span><span class="color-type-{valueType}">{valueType}</span>', { keyName: '姓名', valueType: 'string' })
     * // => <span class="color-key">姓名:</span><span class="color-type-string">string</span>
     */
    function paramFormat(
        templateString: string,
        paramObj: { [k: string]: string | number } | (string | number)[]
    ): string
    /**
     * 用给定的数据对象格式化模版字符串
     * @param templateString - 模板字符串
     * @param ...arg - 数据参数数组
     * @return {string} 格式化后的字符串
     *
     * @example
     * paramFormat('Everyone knows that {0} likes to {1} every {2}.', 'tom', 'eat fruits', 'day')
     * // => 'Everyone knows that tom likes to eat fruits every day.'
     *
     * paramFormat('Everyone knows that {0} likes to {1} every {2}.', ['tom', 'eat fruits', 'day'])
     * // => 'Everyone knows that tom likes to eat fruits every day.'
     *
     * paramFormat('Everyone knows that {name} likes to {like} every {rate}.', { name: 'tom', like: 'swim', rate: 'two days' })
     * // => Everyone knows that tom likes to swim every two days.
     *
     * paramFormat('裁判判罚了{0}! 这是今天第一个{0}判罚, 看来{1}已经可以开始提前庆祝胜利了.', ['点球', '客队'])
     * // => 裁判判罚了点球, 这是今天第一个点球判罚, 看来客队已经开始提前庆祝胜利.
     *
     * paramFormat('<span class="color-key">{keyName}:</span><span class="color-type-{valueType}">{valueType}</span>', { keyName: '姓名', valueType: 'string' })
     * // => <span class="color-key">姓名:</span><span class="color-type-string">string</span>
     */
    function paramFormat(templateString: string, ...arg: (string | number)[]): string
    /**
     * 复制合并两个obj（将第2个obj复制合并到第1个obj, 会修改第1个obj, 非深度复制）
     * @param a - 要返回的合并后的对象
     * @param b - 待合并键值对
     * @param createNew 是否创建a中没有的property true/false 默认false
     */
    function __copy(a: { [k: string]: any }, b: { [k: string]: any }, createNew?: boolean): any
    /**
     * 判断值是否是 Number，或者是否能转换成 Number
     * @param value - 值(可以是字符串)
     * @returns true/false
     *
     * @example
     * isNum('423') // true
     */
    function isNum(value: any): boolean
    /**
     * 去除字符串两端空格
     * @param str - 要处理的字符串
     * @returns {string}
     */
    function trim(str: string): string
    /**
     * 解析URL字符串
     * @param url - url字符串
     * @returns {url, host, bookmark, query, domain, port, protocol}
     */
    function parseUrl(url: string): {
        url: string
        host: string
        bookmark: string
        query: { [k: string]: any }
        domain: string
        port: number
        protocol: string
    }
    /**
     * 深度复制合并两个obj（将第2个obj深度复制合并到第1个obj, 会修改第1个obj）
     * @param a - 要返回的合并后的对象
     * @param b - 待合并键值对
     * @param cover - 是否根据propertyName覆盖a中对应的值 true/false (默认false)
     * @returns 返回第一个对象
     *
     * @example
     * __merge({}, { a: 1 })
     * // => { a: 1 }
     *
     * __merge({ a: [] }, { a: 1 })
     * // => { a: [] }
     *
     * __merge({ a: [] }, { a: 1 }, true)
     * // => { a: 1 }
     *
     * __merge({ a: [1, 2, 3] }, { a: [1, 2, 3, 4, 5] })
     * // => { a: [ 1, 2, 3, 4, 5 ] }
     *
     * __merge([{ id: 1, name: 'tom' }, { id: 2, name: 'jerry' }], [{ id: 1, age: 20 }, { id: 2, age: 23 }])
     * // => [ { id: 1, name: 'tom', age: 20 }, { id: 2, name: 'jerry', age: 23 } ]
     */
    function __merge(a: { [k: string]: any }, b: { [k: string]: any }, cover?: boolean): object
    /**
     * 从obj中取property的值,如property不存在, 返回指定的默认值
     * 等同于 obj[key] ?? defaultValue, 主要用于获取动态计算key
     * @param obj - 源对象
     * @param key - 属性key
     * @param defaultValue - 默认值
     * @return {any}
     *
     * @example
     *
     * getObject({ age: 10 }, 'age', 0)
     * // =>  10
     *
     * getObject({ 'max-age': 0 }, 'max-age', 86400)
     * // 类似于 let { ['max-age']: maxAge = 86400 } = obj (用解构赋值有时候不适用于仅取值的情况, 会多声明1个变量)
     * // => 0
     *
     * getObject({ method: 'get' }, 'port', 80)
     * // => 80
     *
     */
    function getObject(obj: { [key: string]: any }, key: string, defaultValue: any): any
    /**
     * 获取对象constructor的类型 (Object.prototype.toString)
     * @param obj
     * @return {string}
     *
     * @example
     * getType({}) // => 'Object'
     * getType([]) // => 'Array'
     * getType(new Event('change')) // => 'Event'
     *
     * 自定义对象:
     * getType({ get [Symbol.toStringTag]() { return 'STH' }})
     * // => 'STH'
     *
     * 自定义类:
     * class STH { get [Symbol.toStringTag]() { return 'STH' }}
     * getType(new STH())
     * // => 'STH'
     *
     */
    function getType(obj: any): string
    /**
     * (将弃用) 请使用 __def(obj, properties) / __def(obj, tag, properties)
     */
    function defineProperty<T>(targetObj, propertyName, getFunc, setFunc, enumerable, configurable): T
    /**
     * 调用typeof val判断是否是string
     * @param val
     * @returns ture/false
     */
    function isString(val: any): boolean
    /**
     * 判断对象是否没有内容
     * @param val
     * @returns true/false
     *
     * @example
     * 注: 仅判断对象是否持有可用的内容或值, 和对象自身存在哪些属性无关
     * 注: 数字0也算是有内容
     *
     * isEmpty('')  =>  true
     * isEmpty({})  =>  true
     * isEmpty([])  =>  true
     * isEmpty(null)  =>  true
     * isEmpty(0)  =>  false
     * isEmpty({a:1})  =>  false
     * isEmpty(false)  =>  false
     */
    function isEmpty(val: any): boolean
    /**
     * 判断obj中是否有所需的数据
     * @param obj
     * @param keys 所需的key
     * @return true/false
     *
     * @example
     *
     * hasData({ a: 1, b: 1 }, 'b') //查询对象中是否有b
     * // => true
     *
     * hasData({ a: 1, b: 1 }, 'c') //查询对象中是否有c
     * // => false
     *
     * 适用场景: 数据校验
     */
    function hasData(obj: { [k: string]: any }, keys: string[]): boolean
    /**
     * 判断obj中是否有所需的数据
     * @param obj
     * @param ...keys 所需的key
     * @returns true/false
     *
     * @example
     *
     * hasData({ a: 1, b: 1 }, 'b') //查询对象中是否有b
     * // => true
     *
     * hasData({ a: 1, b: 1 }, 'c') //查询对象中是否有c
     * // => false
     *
     * 适用场景: 数据校验
     */
    function hasData(obj: { [k: string]: any }, ...keys: string[]): boolean
    /**
     * 判断传入的对象是否内容相等
     * @param ...arg
     * @returns true/false
     *
     * @example
     *
     * 2个对象不相等, 但所持有的内容相等,返回true
     * equal([1,2], [1,2])  => true
     * equal({a:[1,2]}, {a:[1,2]})  => true
     *
     * 2个对象持有的内容不相等, 返回false
     * equal({a:1}, {a:[1]})  => true
     * equal({a:1}, {a:1, b:1})  => true
     */
    function equal(...arg): boolean
    /**
     * 对象转为字符串
     * @param obj
     */
    function getObjectStr(obj: any): string
    /**
     * 合并所有对象到第一个入参对象
     * @param arg
     */
    function __mergeAll(...arg): object
    function sortByString<T>(list: T[]): T[]
    /**
     * 比较2个字符串的大小
     * @param a - 字符串1
     * @param b - 字符串2
     * @param rule - lengthFirst表示优先比较长度,charFirst表示优先比较charCode
     * @returns 返回 -1/0/1(分别表示 < = > )
     *
     * @example
     *
     * compareString('c', 'a11')  // => -1
     * compareString('c', 'a11', 'charFirst')  // => 1
     * compareString('a1', 'a11')  // => -1
     * compareString('a1', 'a11', 'charFirst')  // => -1
     *
     * @example
     * lengthFirst用于排序的场景:
     * c
     * a11
     * b11
     * a111
     * b111
     *
     * charFirst用于排序的场景:
     * a11
     * a111
     * b11
     * b111
     * c
     */
    function compareString(a: string, b: string, rule: 'lengthFirst' | 'charFirst'): number
    function __clone(obj: object, keys: string[]): object
    function __cloneWithFilter(obj: object, keys: string[]): object
    function __override(to: object, from: object): object
    /**
     * 异步延迟
     * @param callback 延迟结束后的回调
     * @param callbackArgs 回调参数
     * @param delay 延迟时长(单位ms)
     * @param cancelToken 取消函数(同步执行)
     * @returns {Promise}
     *
     * @example
     *
     * // 通常用于aync function内
     *
     * async function func() {
     *     await __setTimeout(2000) // sleep 2s
     *     await __setTimeout(2000, (cancel)=>cancel()) // sleep 2s, 并立即取消 (同步执行)
     *     let result= await __setTimeout(()=>{return Date.now()}, 2000) // result为2s后的系统时间戳
     * }
     *
     * // __setTimeout(time)
     * // __setTimeout(time,cancelToken)
     * // __setTimeout(callback, time)
     * // __setTimeout(callback, time, cancelToken)
     * // __setTimeout(callback, callbackArgs, time)
     * // __setTimeout(callback, callbackArgs, time, cancelToken)
     *
     */
    function __setTimeout(delay: number, cancelToken?: (cancelFn: Function) => void): Promise<void>
    function __setTimeout(callback: Function, delay: number, cancelToken?: (cancelFn: Function) => void): Promise<void>
    function __setTimeout(
        callback: Function,
        callbackArgs: any[],
        delay: number,
        cancelToken?: (cancelFn: Function) => void
    ): Promise<void>
    /**
     * 开始计时, 和__endTiming配合使用
     */
    function __startTiming(): void
    /**
     * 结束计时, 和__startTiming配合使用
     * @param trace 是否输出trace信息
     * @returns 开始到结束的时间差(单位ms)
     */
    function __endTiming(trace: boolean): number
    /**
     * 获取应用已经运行了多久(单位ms)
     */
    function __getRunTime(): number
    /**
     * 返回一个promise, 支持1个或多个promise, 以及同步方法的promisify
     * @param executor
     * @returns Promise
     *
     * @example
     *
     * __promise(resolved=>{ fs.readFile('path',resolved) })
     * __promise([resolved=>{ fs.readFile('path1',resolved) }], [resolved=>{ fs.readFile('path2',resolved) }])
     * __promise(fs.readFile, 'path')
     */
    function __promise(executor: (resolve: (value: any) => void, reject: (reason?: any) => void) => void): Promise<any>
    /**
     * 防抖
     * @param executor
     * @param delay 延迟(单位毫秒)
     *
     * @example
     *
     * const traceDealy = __debounce(trace,300)
     * traceDealy(1)  // won't be output
     * traceDealy(2)  // => 2
     */
    function __debounce(executor: (...arg: any) => void, delay: number): number
    /**
     * 节流
     * @param executor
     * @param delay 延迟(单位毫秒)
     *
     * @example
     *
     * // 防连点
     * const clickBtn = __throttle(() => {
     *     // do sth
     * }, 1000)
     *
     * <Button onClick={clickBtn} />
     */
    function __throttle(executor: (...arg: any) => void, delay: number): number
    /**
     * 生成指定长度的随机字符串
     * @param len 目标字符串长度 (默认1, 最长128位)
     */
    function randomString(len: number): string
    /**
     * 获取list的二维表格形式字符串
     * @param array
     * @param options
     *
     * @example
     * trace(traceTable([{name:'tom',age:10}, {name:'jerry',age:9}], {column:{name:'名称',age:'年龄'}, indexStart:1}))
     */
    function getTraceTable(
        array: any[],
        options: {
            colums: string[] | { [k: string]: string }
            color: { line: (s: string) => string; column: (s: string) => string }
            isNode: boolean
            indexStart: number
            showIndex: boolean
        }
    ): string
    /**
     * 获取list的二维表格形式字符串
     * @param array
     * @param options
     *
     * @example
     * traceTable([{name:'tom',age:10}, {name:'jerry',age:9}], {column:{name:'名称',age:'年龄'}, indexStart:1})
     */
    function traceTable(
        array: any[],
        options: {
            colums: string[] | { [k: string]: string }
            color: { line: (s: string) => string; column: (s: string) => string }
            isNode: boolean
            indexStart: number
            showIndex: boolean
        }
    ): void
    /**
     * 用给定的字符串填充当前字符串（可能重复），使生成的字符串达到给定的长度。填充是从当前字符串的开头（左）开始应用的。
     * @param value 原始值 (非字符串值自动转换)
     * @param maxLength 填充当前字符串后得到的字符串的长度。如果此参数小于当前字符串的长度，则当前字符串将按原样返回。
     * @param fill 填充值(非字符串值自动转换)。如果此字符串太长，它将被截断，并应用最左边的部分。此参数的默认值为“ ”（U+0020）
     *
     * @example
     *
     * [9, 10, 11].map(v => padStart(v, 3, 0))
     * // => [ '009', '010', '011' ]
     */
    function padStart(value: any, maxLength: number, fill?: any): string
    /**
     * 用给定的字符串填充当前字符串（可能重复），使生成的字符串达到给定的长度。填充是从当前字符串的末尾（右）开始应用的。
     * @param value 原始值 (非字符串值自动转换)
     * @param maxLength 填充当前字符串后得到的字符串的长度。如果此参数小于当前字符串的长度，则当前字符串将按原样返回。
     * @param fill 填充值(非字符串值自动转换)。如果此字符串太长，它将被截断，并应用最左边的部分。此参数的默认值为“ ”（U+0020）。
     */
    function padEnd(value: any, maxLength: number, fill?: any): string
    /**
     * 返回一个字符串值，该值由附加在一起的计数副本组成。如果count为0，则返回空字符串。
     * @param value 原始值 (非字符串值自动转换)
     * @param count 重复次数 (默认0次)
     */
    function repeat(value: any, count: number): string
    /**
     * 从目标对象中 pick 指定的属性, 生成新的Object
     * @param keys
     *
     * @example
     *
     * let obj = { a: 1, b: 2, c: 3, d: 4 }
     * pick(obj, 'a', 'c') // => {a:1, c:3}
     * pick(obj, ['a', 'c']) // => {a:1, c:3}
     *
     */
    function pick(obj: object, ...keys: string[]): object
    /**
     * 计算目标字符串的字节长度 (部分中文及全角符号计作2)
    部分 *
     *部分 * 英文字符都是1个字节
     *部分 * utf-8编码的中文一般占用3个字节,也有4个字节的, 但是这里统统记作 2
     *部分 * GBK编码的中文字符一般占用2个字节
     * @param str
     *
     * @example
     *
     * getBytesLen('hello')
     * // => 5
     *
     * getBytesLen('，|')
     * // => 4
     *
     * getBytesLen(123)
     * // => 3
     *
     * ;['123456','“2345”', '1你好6', '12，56'].forEach(v => trace(v + '|', getBytesLen(v)))
     *
     * // 123456| 6
     * // “2345”| 6
     * // 1你好6| 6
     * // 12，56| 6
     *
     */
    function getBytesLen(str: any): number
}

export const g: Global
