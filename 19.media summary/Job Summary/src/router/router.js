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
      name: 'Toast',
      component: () => import('../views/Toast')
    },
    {
      path: '/clickoutside', // 在外部点击触发，内部点击不生效
      name: 'Clickoutside',
      component: () => import('../views/Directive/clickoutside')
    },
    {
      path: '/time',
      name: 'Time',
      component: () => import('../views/Directive/time')
    },
		{
			path: '/search', // 封装搜索框
			name: 'Search',
			component: () => import('../views/SearchPage/index')
		},
		{
			path: '/search/searchItem', // 搜索页
			name: 'SearchItem',
			component: () => import('../views/SearchPage/search')
		},
		{
			path: '/imgUpload', // 搜索页
			name: 'imgUpload',
			component: () => import('../views/ImgUpload')
    },
    {
      path: '/filterBar', // 筛选功能
      name: 'filterBar',
      component: () => import('../views/FilterBar')
    },
    {
      path: '/pdfPreview', // pdf预览
      name: 'pdfPreview',
      component: () => import('../views/PdfPreview')
    },
    {
      path: '/ceiling', // 吸顶
      name: 'ceiling',
      component: () => import('../views/Ceiling')
    },
    {
      path: '/attrsAndListener', // 父组件与孙子间通信
      name: 'attrsAndListener',
      component: () => import('../views/AttrsAndListener/index')
    }
  ]
})
