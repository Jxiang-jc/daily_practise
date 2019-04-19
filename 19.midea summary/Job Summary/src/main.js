import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/store'
import filter from './utils/filter' // 全局过滤器
import directives from './directives'

import 'lib-flexible'

// 解决300毫秒延迟
import FastClick from 'fastclick'

// 注册全局过滤器
Object.keys(filter).forEach(key => {
  Vue.filter(key, filter[key])
})
console.log('Vue', directives)

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
