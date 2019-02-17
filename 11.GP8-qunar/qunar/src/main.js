// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// css
import './assets/css/reset.css'

// iconfont
import './assets/css/iconfont.css'

// 引入rem
import 'lib-flexible/flexible.js' // 淘宝的flexible方案 font-size为37.5px
// import computedRem from '../static/js/rem.js' // 自己写的方法，font-size为100px

// 解决300毫秒延迟
import FastClick from 'fastclick'
FastClick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
