<template>
  <div class="header">
    <!-- 返回按钮 -->
    <div class="header_left">
      <span class="iconfont icon-fanhui"></span>
    </div>

    <!-- 城市选择 -->
    <div class="header_title">
      城市选择
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>

.header {
  width: 100%;
  height: 44px;
  line-height: 44px;
  background: $bgcolor;
  color: $textColor;
  font-size: 18px;
  position: relative;
  .header_left {
    position: absolute;
    padding: 0 10px;
    text-align: center;
    font-weight: bold;
  }
  .header_title {
    text-align: center;
    font-size: 16px;
  }
}

</style>
