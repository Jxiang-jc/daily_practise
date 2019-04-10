<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

import API from '@/api/common.js'

export default {
  name: 'home',
  components: {
    HelloWorld
  },
  created () {
    // 请求参数
    let data = {}
    API.login(data)
      .then(res => {
        // 请求成功
        console.log('res: ', res)
      })
      .catch(err => {
        // 请求失败
        console.log('err: ', err)
      })
  }
}
</script>
