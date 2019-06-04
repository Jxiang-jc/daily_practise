<template>
  <div class="ui-title-box">
    <div class="title">
      <!-- 留给iconfont的插槽 -->
      <span class="title_left">
        <slot name="iconfont"></slot>
        {{title}}
      </span>
      <span class="title_right">
        <slot name="more"></slot>
      </span>
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'title-box',
  props: {
    title: {
      type: String,
      required: true
    }
  },
  data () {
    return {}
  }
}
</script>

<style scoped lang='scss'>
.title {
  padding: 12px 0;
  .title_left {
    padding-left: 10px;
    font-size: 16px;
    height: 22px;
    line-height: 22px;
    color: $smallSizeColor;
  }
  .title_right {
    float: right;
    padding-right: 10px;
    font-size: 12px;
    color: $miniSizeColor;
  }
}
</style>
