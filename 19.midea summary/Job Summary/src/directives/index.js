
export default {
  /**
   * 钩子函数 bind update
   * 表单验证
   * v-check="{type:'date',val:currentDate}"
   */
  check (el, binding) {
    // 获取当前的值
    // console.log(binding.value)
    if (binding.oldValue && binding.oldValue.val) {
      // 进行判断,避免同时触发多个判断
      if (binding.oldValue.val !== binding.value.val) {
        // 定义验证状态 局部变量
        let checkStatus = true
        if (binding.value.type === 'phone') {
          // 验证手机号码
          if (!/^1(3|4|5|7|8)\d{9}$/g.test(binding.value.val)) {
            checkStatus = false
          }
        } else if (binding.value.type === 'date') {
          // 验证日期
          if (!/^((?:19|20)\d\d)-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/g.test(binding.value.val)) {
            checkStatus = false
          }
        } else if (binding.value.type === 'identification_card') {
          // 验证身份证
          if (!/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(binding.value.val)) {
            checkStatus = false
          }
        } else if (binding.value.type === 'email') {
          // 验证邮箱
          if (!/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/g.test(binding.value.val)) {
            checkStatus = false
          }
        } else if (binding.value.type === 'zip_code') {
          // 验证邮编
          if (!/^\d{6}$/g.test(binding.value.val)) {
            checkStatus = false
          }
        }

        // checkStatus true 成功 false 失败
        if (checkStatus) {
          el.style.border = '1px solid #58bc58'
        } else {
          el.style.border = '1px solid red'
        }
      }
    }
  },
  /*
    官方demo
  */
  demo (el, binding, vnode) {
    var s = JSON.stringify
    el.innerHTML =
      'v-demo:foo.a.b="message"' + '<br/><br/>' +
      'name: ' + s(binding.name) + '<br>' +
      'value: ' + s(binding.value) + '<br>' +
      'expression: ' + s(binding.expression) + '<br>' +
      'argument: ' + s(binding.arg) + '<br>' +
      'modifiers: ' + s(binding.modifiers) + '<br>' +
      'vnode keys: ' + Object.keys(vnode).join(', ')
  }
}