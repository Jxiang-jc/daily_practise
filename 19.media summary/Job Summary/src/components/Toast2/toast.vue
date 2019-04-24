<template>
  <div v-show="show"
    class="lx-toast"
    :class="{'lx-word-wrap': wordWrap, type}"
    :style="{width: widthStyle}"
  >
    {{tips}}
  </div>
</template>

<script>
export default {
  data () {
    return {
      show: false,
      tips: '',
      type: '', // 弹窗出现的位置
      wordWrap: false, // 是否换行
      width: ''
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
