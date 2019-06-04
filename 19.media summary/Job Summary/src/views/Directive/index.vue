<template>
  <div>
    <div>
      <input type="text" v-model="message" v-focus>
    </div>
    <br>
    <div v-demo:foo.a.b="message" class="demo">
    </div>
    <br>
    <hr/>
    <div class="check_box" style="width: 500px; height: 350px;">
      <input
        type="text"
        v-check="{type:'phone',val:currentPhone}"
        placeholder="请输入手机号码"
        v-model="currentPhone"
      >
      <input
        type="text"
        v-check="{type:'date',val:currentDate}"
        placeholder="请输入日期"
        v-model="currentDate"
      >
      <input
        type="text"
        v-check="{type:'identification_card',val:currentIdentificationCard}"
        placeholder="请输入身份证"
        v-model="currentIdentificationCard"
      >
      <input
        type="text"
        v-check="{type:'email',val:currentEmail}"
        placeholder="请输入邮箱"
        v-model="currentEmail"
      >
      <input
        type="text"
        v-check="{type:'zip_code',val:currentZipCode}"
        placeholder="请输入邮编"
        v-model="currentZipCode"
      >
    </div>
    <br>
    <hr/>
    <div v-clamp style="color:#58bc58;">这是默认文本溢出省略(1行省略).这是默认文本溢出省略(1行省略).这是默认文本溢出省略(1行省略).这是默认文本溢出省略(1行省略)</div>
    <br>
    <div v-clamp="2" style="color:#4d63bc;">这是设置2行溢出省略.这是设置2行溢出省略.这是设置2行溢出省略.这是设置2行溢出省略.这是设置2行溢出省略.这是设置2行溢出省略这是设置2行溢出省略这是设置2行溢出省略这是设置2行溢出省略这是设置2行溢出省略这是设置2行溢出省略这是设置2行溢出省略</div>
  </div>
</template>

<script>
export default {
  name: 'directiveTest',
  data () {
    return {
      message: 'Jxiang',
      currentPhone: '',
      currentDate: '',
      currentIdentificationCard: '',
      currentEmail: '',
      currentZipCode: ''
    }
  },
  directives: {
    focus: {
      // 指令的定义
      inserted: function (el) {
        el.focus()
      }
    }
  }
}
</script>

<style scoped>
.demo {
  font-size: 1.5em;
  color: #4d63bc;
  text-align: left;
  width: 50%;
  margin: 0 auto;
}
/* 输入框 */
.check_box input[type="text"] {
  display: block;
  width: 90%;
  height: 40px;
  line-height: 40px;
  font-size: 16px;
  text-indent: 1em;
  margin: 5px auto;
  outline: none;
  border: 1px solid #ccc;
}
.check_box input[type="button"] {
  display: block;
  width: 70%;
  height: 40px;
  margin: 10px auto;
}
</style>
