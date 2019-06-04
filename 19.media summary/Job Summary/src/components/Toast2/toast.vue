<template>
  <div v-show="show"
    class="jx-toast"
    :class="[{'jx-word-wrap': wordWrap}, type]"
    :style="{width: widthStyle}"
  >
    {{tips}}
  </div>
</template>

<script>
export default {
  data () {
    return {
      show: false, // 初始化时是否显示
      tips: '', // 提示内容
      type: '', // 弹窗出现的位置
      wordWrap: false, // 是否换行
      width: '' // 用于换行时, 配合worWrap是使用
    }
  },
  computed: {
    widthStyle () {
      return this.width ? this.width + 'px' : ''
    }
  }
}
</script>

<style>

</style>
