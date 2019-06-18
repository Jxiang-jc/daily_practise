import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/store'
import filter from './utils/filter' // 全局过滤器
import directives from './directives' // 自定义指令
import './assets/icon/iconfont.css'
import 'lib-flexible'
import exif from 'exif-js' //用于获取拍摄图片的基本信息（例如：拍摄方向）
import Storage from './utils/storage.js'; // storage二次封装
// console.log('Storage', Storage)
const ls = Storage()
ls.set('jx', 999, {exp: 100})
// console.log('123', ls.get('jx'))

// 解决300毫秒延迟
import FastClick from 'fastclick'

// 自定义弹窗
import Toast from './components/Toast/toast'
// 自定义弹窗进阶版
import './components/Toast2/toast.css'
import Toast2 from './components/Toast2/index'

Vue.use(Toast)
Vue.use(Toast2)

// 注册全局过滤器
Object.keys(filter).forEach(key => {
  Vue.filter(key, filter[key])
})

// 全局注册自定义指令
Object.keys(directives).forEach(key => {
  Vue.directive(key, directives[key])
})


FastClick.attach(document.body)
// 重写ios的fastclick focus事件，解决11.3的快速点击输入框(input、textarea)不聚焦的问题
FastClick.prototype.focus = targetElement => {
  var length;
  // Issue #160: on iOS 7, some input elements (e.g. date datetime month) throw a vague TypeError on setSelectionRange. These elements don't have an integer value for the selectionStart and selectionEnd properties, but unfortunately that can't be used for detection because accessing the properties also throws a TypeError. Just check the type instead. Filed as Apple bug #15122724.
  // https://github.com/ftlabs/fastclick/issues/548
  if (
      methods.isIOS() &&
      targetElement.setSelectionRange &&
      targetElement.type.indexOf('date') !== 0 &&
      targetElement.type !== 'time' &&
      targetElement.type !== 'month'
  ) {
      length = targetElement.value.length;
      targetElement.focus();
      targetElement.setSelectionRange(length, length);
  } else {
      targetElement.focus();
  }
};

Vue.config.productionTip = false
Vue.prototype.EXIF = exif;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
