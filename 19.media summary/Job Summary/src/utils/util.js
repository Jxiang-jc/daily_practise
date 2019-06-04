var exp = {
  // 防抖技术即是可以把多个顺序地调用合并成一次，也就是在一定时间内，规定事件被触发的次数。
  /*
    组件中引入
    import exp from '~/util'
    在methods中声明一个方法
    methods: {
      example: exp.debounce(function(){}, 800)
    }
  */
  // 防抖函数， 让某个函数在上一次执行后， 满足等待某个时间内不再触发此函数后再执行， 而在这个等待时间内再次触发此函数，等待时间会重新计算
  /**
   *
   *
   * @param {function} 要执行的函数 func
   * @param {ms} 多少毫秒内执行一次 wait
   * @param {boolean} 是否立刻执行 immediate
   * @returns
   */
  debounce (func, wait, immediate) {
    var timeout, args, context, timestamp, result

    var later = function () {
      var last = Date.now() - timestamp

      if (last < wait && last >= 0) {
        timeout = setTimeout(later, wait - last)
      } else {
        timeout = null
        if (!immediate) {
          result = func.apply(context, args)
          if (!timeout) {
            context = args = null
          }
        }
      }
    }

    return function () {
      context = this
      args = arguments
      timestamp = Date.now()
      var callNow = immediate && !timeout
      if (!timeout) timeout = setTimeout(later, wait)

      if (callNow) {
        result = func.apply(context, args)
        context = args = null
      }
      return result
    }
  },

  // 节流函数，只允许一个函数在 X 毫秒内执行一次.
  // 与防抖相比，节流函数最主要的不同在于它保证在 X 毫秒内至少执行一次我们希望触发的事件 handler。
  /**
   *
   *
   * @param {function} 要执行的函数 func
   * @param {ms} 等待时间 wait
   * @param {ms} 每隔多少毫秒必执行一次函数 mustRun
   * @returns
   */
  throttle (func, wait, mustRun) {
    var timeout
    var startTime = new Date()

    return function () {
      var context = this
      var args = arguments
      var curTime = new Date()

      clearTimeout(timeout)
      // 如果达到了规定的触发时间间隔，触发 handler
      if (curTime - startTime >= mustRun) {
        func.apply(context, args)
        startTime = curTime
        // 没达到触发间隔，重新设定定时器
      } else {
        timeout = setTimeout(func, wait)
      }
    }
  }
}

export default exp
