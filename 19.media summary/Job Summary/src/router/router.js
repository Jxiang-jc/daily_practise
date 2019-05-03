import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    },
    {
      path: '/countup', // 数字滚动插件
      name: 'Countup',
      component: () => import('../views/VueCountupV2')
    },
    {
      path: '/moment', // 格式化时间类库
      name: 'Moment',
      component: () => import('../views/Moment')
    },
    {
      path: '/filter', // 过滤器使用
      name: 'Filter',
      component: () => import('../views/Filter')
    },
    {
      path: '/directive', // 自定义指令的使用
      name: 'Directive',
      component: () => import('../views/Directive')
    },
    {
      path: '/toast', // 自定义弹窗提示
      name: 'toast',
      component: () => import('../views/Toast')
    },
    {
      path: '/clickoutside', // 在外部点击触发，内部点击不生效
      name: 'clickoutside',
      component: () => import('../views/Directive/clickoutside')
    },
    {
      path: '/time',
      name: 'time',
      component: () => import('../views/Directive/time')
    }
  ]
})
