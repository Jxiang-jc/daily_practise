import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('./views/index.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/login/Login.vue')
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
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
