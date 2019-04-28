/**
 * 自定义 提示框( Toast2 )组件
 * 进阶版本
 */
import ToastComponent from './toast.vue'
var Toast = {}

var showToast = false // 存储toast显示状态
var toastVM = null // 存储toast vm

Toast.install = function (Vue, options) {
  // options 的参数在Vue.use的时候传进来
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

  /**
   *
   *
   * @param { 文字提示 } tips
   * @param { 出现的问题 bootom center top } type
   * @returns
   */
  Vue.prototype.$toast2 = function (tips, type) {
    let curType = type !== undefined ? type : opt.defaultType
    let wordWrap = opt.wordWrap === true

    if (showToast) {
      // 如果toast还在，则不再执行
      return null
    }

    if (!toastVM) {
      // Vue.extend 返回的是一个“扩展实例构造器”,
      // 也就是一个预设了部分选项的 Vue 实例构造器
      // 后可使用vue.component进行实例化、或使用new extendName().$mount(''+el)方式进行实例化（从而实现模拟组件）。
      let ToastTpl = Vue.extend(ToastComponent)

      toastVM = new ToastTpl()

      let tpl = toastVM.$mount().$el
      document.body.appendChild(tpl)
    }

    toastVM.type = 'lx-toast-' + curType
    toastVM.wordWrap = wordWrap
    toastVM.tips = tips
    toastVM.show = showToast = true
    // toastVM.width = 200 // 一般配合换行使用，不设置默认占80%

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
