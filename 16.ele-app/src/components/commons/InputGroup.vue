<template>
  <div class="text_group">
    <!-- 组件结构 -->
    <!-- 组件容器 -->
    <div class="input_group" :class="{'is_invalid': error}">
      <!-- 输入框 -->
      <input :type="type"
        :value="value"
        :placeholder="placeholder"
        :name="name"
        @input="$emit('input', $event.target.value)"
      > // https://www.cnblogs.com/jiaoyu121/p/7078445.html @input=$emit的解释

      <!-- 输入框后面的按钮 -->
      <button v-if="btnTitle"
        :disabled="disabled"
        @click="$emit('btnClick')"
      >{{ btnTitle }}</button>
    </div>
    <!-- 错误提醒 -->
    <div v-if="error"
      class="invalid_feedback"
    >{{ error }}</div>
  </div>
</template>

<script>
export default {
  name: 'inputGroup',
  props: {
    type: { // 输入框类型
      type: String,
      required: false,
      default: 'text'
    },
    value: { // 输入框的值
      type: String,
      required: false,
    },
    placeholder: String, // 默认占位符
    name: String, // 如果是表单，必须要传
    btnTitle: String, // 按钮标题
    disabled: { // 是否禁止点击
      type: Boolean,
      default: false
    },
    error: String // 错误提示
  }
}
</script>

<style lang="scss" scoped>
.input_group {
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  &.is_invalid {
    border: 1px solid red;
  }
 
  input {
    height: 100%;
    width: 60%;
    outline: none;
  }

  button {
    border: none;
    outline: none;
    background: #fff;
    &[disabled] {
     color: #aaa; 
    }
  }
}
.invalid_feedback {
  color: red;
  padding-top: 5px;
}
</style>
