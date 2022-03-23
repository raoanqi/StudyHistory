/*
* 如何监测数据的变化
* */
function defineReactive(data, key, val) {
    Object.defineProperty(data, key, {
        enumerable: true,
        configurable: true,
        get: function () {
            return val
        },
        set: function (newVal) {
            if (val === newVal) {
                return
            }
            val = newVal
        }
    })
}

/*
*如何收集依赖
*
* 为什么要收集依赖？
* 因为当数据发生变化的时候，可以将新的数据下发到对这个数据有依赖的地方
* */

// 封装依赖收集的class
class Dep {
    constructor() {
        this.subs = []
    }

    addSub(sub) {
        this.subs.push(sub)
    }

    removeSub(sub) {
        remove(this.subs, sub)
    }

    depend() {
        if (window.target) {
            this.addSub(window.target)
        }
    }

    notify() {
        const subs = this.subs.slice()
        for (let i = 0, l = this.subs.length; i < l; i++) {
            subs.update()
        }
    }
}

function remove(arr, item) {
    if (arr.length) {
        const index = arr.indexOf(item)
        if (index > -1) {
            return arr.splice(index, 1)
        }
    }
}

function defineReactive(data, key, val) {
    let dep = new Dep()
    Object.defineProperty(data, key, {
        enumerable: true,
        configurable: true,
        get: function () {
            // 收集依赖
            dep.depend()
            return val
        },
        set: function (newVal) {
            if (val === newVal) {
                return
            }
            val = newVal
            // 触发依赖
            dep.notify()
        }
    })
}

/*
* 什么是依赖Watcher
* Watcher属于一个中介的角色，数据发生变化时，会通知Watcher，然后Watcher会通知到具体的地方
* */
class Watcher {
    constructor(vm, expOrFn, cb) {
        this.vm = vm
        this.getter = parsePath(expOrFn)
        this.cb = cb
        this.value = this.get()
    }

    get() {
        // 将window.target设置前为当前watcher的实例。然后调用getter，getter中会进行依赖收集
        window.target = this
        let value = this.getter.call(this.vm, this.vm)
        window.target = undefined
        return value
    }

    update() {
        const oldValue = this.value
        this.value = this.get()
        this.cb.call(this.vm, this.value, oldValue)
    }
}

// 解析简答路径
function parsePath(path) {
    const regex = /[^\w.$]/
    if (regex.test(path)) {
        return
    }
    const arr = path.split('.')
    // 闭包
    return function (obj) {
        for (let i = 0, l = arr.length; i < l; i++) {
            if (!obj) {
                return
            }
            obj = obj[arr[i]]
        }
        return obj
    }
}

