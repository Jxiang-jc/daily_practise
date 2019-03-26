import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      // name: 'home', 有子路由时不需要name
      component: () => import('./views/index.vue'),
      children: [
        {
          path: '',
          redirect: '/home'
        },
        {
          path: '/home',
          name: 'home',
          component: () => import('./views/home/Home.vue')
        },
        {
          path: '/order',
          name: 'order',
          component: () => import('./views/order/Order.vue')
        },
        {
          path: '/profile',
          name: 'profile',
          component: () => import('./views/profile/Profile.vue')
        },
        {
          path: '/address',
          name: 'address',
          component: () => import('./views/address/Address.vue')
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/login/Login.vue')
    }
  ]
})

// 全局路由守卫
router.beforeEach((to, from, next) => {
  // const isLogin = localStorage.ele_login ? true : false
  // 下面写法是简写。 eslint也建议这样的写法
  const isLogin = localStorage.ele_login !== undefined

  if (to.path === '/login') {
    next()
  } else {
    // 判断是否已经登陆
    isLogin ? next() : next('/login')
  }
})

export default router
