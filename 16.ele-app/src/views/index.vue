<template>
  <div class="index">
    <router-view></router-view>
    <tar-bar :tabData="tabbarData"></tar-bar>
  </div>
</template>

<script>
import TarBar from '../components/commons/TarBar'
export default {
  name: 'index',
  components: {
    TarBar
  },
  data () {
    return {
      tabbarData: [
        {
          id: 1,
          path: '/home',
          icon: 'home',
          label: '首页'
        },
        {
          id: 2,
          path: '/order',
          icon: 'file-text-o',
          label: '订单'
        },
        {
          id: 3,
          path: '/profile',
          icon: 'user',
          label: '我的'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
  .index {
    width: 100%;
    height: calc(100% -45px);
  }
</style>
