/**
 * 自定义 提示框( Toast2 )组件
 * 进阶版本
 */
var Toast = {}

var showToast = false // 存储toast显示状态
var toastVM = null // 存储toast vm

Toast.install = function (Vue, options) {
  // 参数
  var opt = {
    defaultType: 'bottom',
    duration: '2500',
    wordWrap: false
  }

  // 原生js
  // for (var property in options) {
  //   opt[property] = options[property]
  // }
  // ES5，以下两种写法都可以
  // opt = Object.assign(opt, options)
  Object.assign(opt, options)

  Vue.prototype.$toast2 = function (tips, type) {
    let curType = type !== undefined ? type : opt.defaultType
    let wordWrap = opt.wordWrap ? 'lx-word-wrap' : ''
    let style = opt.width ? 'style="width:' + opt.width + '"' : ''
    let tmp = '<div v-show="show" :class="type" class="lx-toast ' + wordWrap + '" ' + style + '>{{tip}}</div>'

    if (showToast) {
      // 如果toast还在，则不再执行
      return null
    }

    if (!toastVM) {
      let ToastTpl = Vue.extend({
        data: function () {
          return {
            show: showToast,
            tip: tips,
            type: 'lx-toast-' + curType
          }
        },
        template: tmp
      })

      toastVM = new ToastTpl()

      let tpl = toastVM.$mount().$el
      document.body.appendChild(tpl)
    }

    toastVM.type = 'lx-toast-' + curType
    toastVM.tip = tips
    toastVM.show = showToast = true

    setTimeout(function () {
      toastVM.show = showToast = false
    }, opt.duration)
  }

  let arr = ['bottom', 'center', 'top']

  arr.forEach(function (type) {
    Vue.prototype.$toast2[type] = function (tips) {
      return Vue.prototype.$toast2(tips, type)
    }
  })
}

export default Toast
