
class Util {
    constructor () {
        if (Util.instance) return Util.instance

        return this.getInstance(...arguments)
    }

    getInstance () {
        let instance = {
            /**
             * [formatTime 格式化时间(s)为 hour: minutes: seconds]
             * @param {number} time [ 传入歌曲时间]
             * @return {string} [hour:minutes:seconds]
             */
            formatTime (time) {
                // 当没有传time的时候
                if (time === undefined) {
                    this.handleError(123, { method: 'formate', param: 'time' })
                    return false
                }

                let _time    = Math.floor(time) // 向下取整
                let _minutes = Math.floor(_time / 60)
                let _hours   = Math.floor(_minutes / 60)
                let _seconds = _time - (_minutes * 60)

                return (_hours ? this.fillZero(_hours) + ':' : '') + this.fillZero(_minutes - ( _hours * 60 )) + ':' + this.fillZero(_seconds)
            },

            /**
             * [fillZero 为小于10的数字补0]
             * @param {number} num [传入时分秒]
             * @return {string} ['01'/'02'等等]
             */
            fillZero (num) {
                // 当没有传入num的时候
                if (!num) {
                    this.handleError(123, {method: 'fillZero', param: 'num'})
                    return false
                }

                // 这个函数只是让我们在渲染/显示的时候有一个不同的效果, 不要操作原数据
                return num > 9 ? num : '0' + num
            },
            errors: {
                123: ({method, param}) => {
                    return method + 'function need a param' + param
                }
            },
            // 处理报错
            handleError (code, options) {
                console.error('[util error] message: ' + this.error[code](options))
            }
        }

        Util.instance = instance
        return instance
    }
}

// 为了这个工具以后在模块化环境依然可以使用, 需要判断一下, 如果是在模块化环境, 就将其暴露出去

// commonJs
if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = Util
}

// AMD
if (typeof define === 'function' && define.amd) {
    define('util', [], function () {
        return Util
    })
}