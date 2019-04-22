import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/store'
import filter from './utils/filter' // 全局过滤器
import directives from './directives' // 自定义指令

import 'lib-flexible'

// 解决300毫秒延迟
import FastClick from 'fastclick'

// 自定义弹窗
import Toast from './components/Toast/toast'
// 自定义弹窗进阶版
import './components/Toast2/toast.css'
import Toast2 from './components/Toast2/toast'

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

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
