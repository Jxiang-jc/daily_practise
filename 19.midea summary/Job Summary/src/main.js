import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/store'

import 'lib-flexible'

// 解决300毫秒延迟
import FastClick from 'fastclick'
FastClick.attach(document.body)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
