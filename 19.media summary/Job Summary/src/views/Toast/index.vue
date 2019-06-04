<template>
  <div class="toast_test">
    toast 测试
    <button @click="showToast">toast 测试</button>

    <!-- 进阶版 -->
    <div class="btn_box">
      <button class="btn_top" @click="openTop()">top</button>
      <button class="btn_center" @click="openCenter()">center</button>
      <button class="btn_bottom" @click="openBottom()">bottom</button>
    </div>

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
      this.$toast2.top('top')
    },
    openCenter () {
      this.$toast2.center('center')
    },
    openBottom () {
      this.$toast2('bottom') // or this.$toast.bottom('bottom');
    }
  }
  // beforeRouteLeave (to, from, next) {
  //   this.$hideToast()
  //   next()
  // }
}
</script>

<style scoped lang="scss">
.toast_test {
  font-size: 3em;
  color: #4d63bc;
}
.btn_box {
  display: flex;
  justify-content: space-between;
  margin: 20px auto;
  width: 500px;
  button {
    font-family: '微软雅黑','Helvetica Neue',Helvetica,Arial,sans-serif;
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2), 0 2px 2px rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12);;
    cursor: pointer;
    text-decoration: none;
    transition: 0.12s ease-in;
    border: 0;
    outline: 0;
    user-select: none;
    border-radius: 5px;
    padding: 3px 18px;
    font-size: 13px;
    height: 30px;
    line-height: 18px;
    text-align: center;
    background-color: #10a2f7;
    color: #fff;
    &:not([disabled]):active {
      box-shadow: 0 2px 2px 2px rgba(0, 0, 0, 0.2), 0 2px 2px 2px rgba(0, 0, 0, 0.14), 0 2px 2px 2px rgba(0, 0, 0, 0.12);
      background: #3383da;
    }
  }
}

</style>
