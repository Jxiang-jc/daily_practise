<template>
  <div class="moment_box">
    <span>{{ date }}</span>&nbsp;
    <span>{{ time }}</span>
  </div>
</template>

<script>
// 引入日期处理类库
const moment = require('moment')
export default {
  data () {
    return {
      date: '0000年00月00日星期一',
      time: '00时00分00秒'
    }
  },
  methods: {
    showDate () {
      this.timer = setInterval(() => {
        this.date = moment().format('YYYY年MM-DD')
        this.time = moment().format('hh:mm:ss')
      }, 1000)
    }
  },

  mounted () {
    this.showDate()
  },

  destroyed () {
    clearInterval(this.timer)
  }
}
</script>

<style scoped>
.moment_box {
  font-size: 6em;
  margin: 0;
  color: #4d63bc;
}
</style>
