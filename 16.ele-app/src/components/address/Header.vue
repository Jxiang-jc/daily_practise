<template>
  <div class="header">
    <!-- 左侧返回 -->
    <div class="header_button is_left"
      v-show="isLeft.boolean"
      @click="$router.go(-1)"
    >
      <i class="fa fa-chevron-left"></i><button>{{ isLeft.label }}</button>
    </div>
    <!-- 中间标题 -->
    <h1 class="header_title">{{ title }}</h1>

    <!-- 右侧内容 -->
    <div class="header_right"
      v-show="isRight.boolean"
    >
      {{ isRight.label }}
    </div>
    <!-- 右侧插槽 -->
    <div class="header_right">
       <slot name="addCity"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: false
    },
    isLeft: {
      type: Object,
      required: false,
      default: () => {
        return {
          boolean: true,
          label: '返回'
        }
      }
    },
    isRight: {
      type: Object,
      required: false,
      default: () => {
        return {
          boolean: false,
          label: 'Jxiang'
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  position: fixed;
  top: 0;
  width: 100%;
  background: #009eef;
  box-sizing: border-box;
  display: flex;
  font-size: 17px;
  height: 45px;
  line-height: 45px;
  white-space: nowrap;
  color: #fff;
  text-align: center;
  padding: 0 5px;
  .header_button {
    button {
      background: transparent;
      border: 0;
      outline: none;
      box-shadow: none;
      color: inherit;
      display: inline-block;
      font-size: inherit;
    }
  }
  .is_left {
    position: absolute;
    left: 10px;
  }
  .header_title {
    flex: 1;
  }
  .header_right {
    position: absolute;
    right: 10px;
  }
}
</style>
