// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
/* eslint-disable */
import Vue from 'vue'
import App from './App'
import router from './router'

// css
import 'css/reset.css'
import './stylesheets/main.scss'
/* 
  sass的变量，只能组件需要的时候，以import的方式引入。
  main.js中引入的sass文件，可以作为全局样式。
  全局变量，在webpack看来，是无法识别的。
  如果需要全局使用。 那么需要去到build文件下的 utils.js 配置一下
  scss: generateLoaders('sass').concat({
        loader: 'sass-resources-loader', // 这个是全局使用scss资源的配置
        options: {
          resources: path.resolve(__dirname, '../src/stylesheets/_base.scss')
        }
    }),
    但是如果在vue-cli3的话，我就不知道怎么配置了
 */
// iconfont
import 'css/iconfont.css'
import './assets/iconfont/iconfont.js'

// 引入rem
import 'lib-flexible/flexible.js' // 淘宝的flexible方案 font-size为37.5px
// import computedRem from '../static/js/rem.js' // 自己写的方法，font-size为100px

// 解决300毫秒延迟
import FastClick from 'fastclick'
FastClick.attach(document.body)

// 轮播图
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
Vue.use(VueAwesomeSwiper)

// axios
import axios from 'axios'
Vue.prototype.$http = axios

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
