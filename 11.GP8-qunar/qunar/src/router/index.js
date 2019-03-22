import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/home/Home'
import City from '@/views/city/City'
import Details from '@/views/details/Details'

// vue-cli2.x版本好像只能用这种方法懒加载
const ScienicPicture = () => import('@/views/details/ScienicPicture')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        keepAlive: true // 需要被缓存
      }
    },
    {
      path: '/city',
      name: 'City',
      component: City,
      meta: {
        keepAlive: false // 不需要缓存, 正常操作这里应该被缓存。现在只是测试
      }
    },
    {
      path: '/details',
      name: 'Details',
      component: Details,
      meta: {
        keepAlive: true
      }
    },
    { // 景区图片
      path: '/scienic',
      name: 'Scienic',
      component: ScienicPicture,
      meta: {
        keepAlive: true
      }
    }
  ]
})
