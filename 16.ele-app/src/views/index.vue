<template>
  <div class="index">
    <!-- <router-view></router-view> -->
    <transition :name="name" >
      <router-view class="router"/>
    </transition>
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
      ],
      name: 'left-fade',
    }
  },

  watch: {
    '$route': function () {
      if (this.$router.isBack) {
        this.name = 'right-fade'
        this.$router.isBack = false
      } else {
        this.name = 'left-fade'
      }
    }
  }
}
</script>

<style lang="scss" scoped>

.index {
  width: 100%;
  height: calc(100% - 45px);
}

  .router{
    position: absolute;
    top:0;
    left: 0;
    right: 0;
    bottom: 0;
    transition:  all cubic-bezier(.55,0,.1,1)   .5s ;
  }
  .left-fade-leave-to{
    transform: translateX(-100%);
  }
  .left-fade-enter{
    transform: translateX(100%);
  }
  .right-fade-leave-to{
    transform: translateX(100%);
  }
  .right-fade-enter{
    transform: translateX(-100%);
  }
</style>
