<template>
  <div class="login">
    <div class="logo">
      <img src="@/assets/logo.jpg" alt="ele logo">
    </div>
    <!-- 手机号 -->
    <input-group type="number"
      v-model="phone"
      placeholder="手机号"
      :btnTitle="btnTitle"
      :disabled="disabled"
      :error="errors.phone"
      @btnClick="getVerifyCode"
    />

    <!-- 验证码 -->
    <input-group type="number"
      v-model="verifyCode"
      placeholder="验证码"
      :error="errors.code"
    />

    <!-- 用户服务协议 -->
    <div class="login_des">
      <p>
        新用户登录即自动注册，表示已同意
        <span>《用户服务协议》</span>
      </p>
    </div>

    <!-- 登录按钮 -->
    <div class="login_btn">
      <button :disabled="isClick"
        @click="handleLogin"
        :class="loginBtnTitle === '登录中...' ? 'isLogin' : ''"
      >{{ loginBtnTitle }}</button>
    </div>
  </div>
</template>

<script>
import InputGroup from '@/components/commons/InputGroup.vue'
export default {
  components: {
    InputGroup
  },
  data () {
    return {
      phone: '', // 手机号
      btnTitle: '获取验证码',
      disabled: false, // 否可以点击获取验证码
      errors: {}, // 报错信息, 如果是对象, template中可以任意写errors.xxx
      verifyCode: '', // 验证码
      loginBtnTitle: '登录' // 登录按钮文字显示
    }
  },

  computed: {
    // 判断输入框是否为空，
    isClick () {
      if (!this.phone || !this.verifyCode) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    // 获取验证码
    getVerifyCode () {
      if (this.validatePhone()) {
        this.validateBtn()
        this.$http
          .post('/api/posts/sms_send', {
            tpl_id: '145724', // 聚合数据申请的模板id
            key: '36f3c4179bb3b128f747a17f8284fbe2',
            phone: this.phone
          })
          .then(res => {
            console.log('res: ', res)
          })
          .catch(err => {
            console.log('err: ', err)
          })
      }
    },

    // 验证码倒计时
    validateBtn () {
      let time = 60
      let timer = setInterval(() => {
        if (time === 0) {
          clearInterval(timer)
          this.btnTitle = '获取验证码'
          this.disabled = false
        } else {
          this.btnTitle = `${time}秒后重试`
          this.disabled = true
          time--
        }
      }, 1000)
    },

    // 验证手机号码
    validatePhone () {
      if (!this.phone) {
        this.errors = {
          phone: '手机号码不能为空'
        }
        return false
      } else if (!/^1[345678]\d{9}$/.test(this.phone)) {
        this.errors = {
          phone: '请填写正确的手机号码'
        }
        return false
      } else {
        this.errors = {}
        return true
      }
    },

    // 登录验证
    handleLogin () {
      // 每次点击时先清空错误提醒
      this.errors = {}
      this.loginBtnTitle = '登录中...'
      // 发送请求
      this.$http
        .post('/api/posts/sms_back', {
          phone: this.phone,
          code: this.verifyCode
        })
        .then(res => {
          // console.log('res: ', res)
          // 检验成功 设置登录状态并且跳转到首页
          localStorage.setItem('ele_login', true)
          this.$router.push('/')
        })
        .catch(err => {
          // 返回错误信息
          this.errors = {
            code: err.response.data.msg
          }
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;
  padding: 30px;
  box-sizing: border-box;
  background: #fff;
}
.logo {
  text-align: center;
  img {
    width: 150px;
  }
}
.text_group,
.login_des,
.login_btn {
  margin-top: 20px;
}
.login_des {
  color: #aaa;
  line-height: 22px;
  span {
    color: #4d90fe;
  }
}
.login_btn {
  button {
    width: 100%;
    height: 40px;
    background: #4cd96f;
    border-radius: 4px;
    color: #fff;
    border: none;
    outline: none;
    &[disabled] {
      background: #8bda81;
    }
    &.isLogin {
      background: #ccc;
    }
  }
}
</style>
