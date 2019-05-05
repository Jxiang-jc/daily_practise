var exp = {
  /*
    组件中引入
    import exp from '~/util'
    在methods中声明一个方法
    methods: {
      example: exp.debounce(function(){}, 800)
    }
  */
  // 防抖函数， 让某个函数在上一次执行后， 满足等待某个时间内不再触发此函数后再执行， 而在这个等待时间内再次触发此函数，等待时间会重新计算
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
  }
}

export default exp
