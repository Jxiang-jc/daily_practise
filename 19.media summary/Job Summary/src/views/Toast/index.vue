<template>
  <div class="toast_test">
    toast 测试
    <button @click="showToast">toast 测试</button>

    <!-- 进阶版 -->
    <button @click="openTop()">top</button>
    <!-- <button @click="openCenter()">center</button> -->
    <!-- <button @click="openBottom()">bottom</button> -->
  </div>
</template>

<script>
export default {
  name: 'toast',
  methods: {
    showToast () {
      this.$toast('Jxiang')
    },
    openTop () {
      console.log(this.$toast2)
      this.$toast2.top('topopo地方')
    },
    // openCenter () {
    //   this.$toast2.center('center')
    // },
    // openBottom () {
    //   this.$toast2('bottom') // or this.$toast.bottom('bottom');
    // }
  }
  // beforeRouteLeave (to, from, next) {
  //   this.$hideToast()
  //   next()
  // }
}
</script>

<style scoped>
.toast_test {
  font-size: 3em;
  color: #4d63bc;
}
</style>
