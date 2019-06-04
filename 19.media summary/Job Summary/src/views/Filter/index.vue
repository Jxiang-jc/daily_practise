<template>
  <div class="show_box">
    <div>{{date | formatDate('yyyy-MM-dd hh:mm:ss')}}</div>
    <br/>
    <div v-bind:class="'rawId' | formatId"></div>
    <br/>
    <div v-bind:class="test2 | formatId"></div>
    <br/>
    <!-- vue2.0以后不能在v-model中直接使用，如果想用，请用computed -->
    <input type="text" v-model="message">
    {{message | capitalize}}
  </div>
</template>

<script>
export default {
  name: 'filterTest',
  data () {
    return {
      date: new Date().getTime(),
      test2: 'rawId',
      message: 'abc'
    }
  },
  filters: {
    formatId (val) {
      if (!val) return ''
      val = val + 1
      return val
    },
    // 首字母大写
    capitalize (val) {
      if (!val) return ''
      val = val.toString()
      return val.charAt(0).toUpperCase() + val.slice(1)
    }
  }
}
</script>

<style scoped>
.show_box {
  font-size: 3em;
  color: #58bc58;
}
.rawId1 {
  width: 50px;
  height: 50px;
  background: #4d63bc;
  margin: 0 auto;
}
</style>
