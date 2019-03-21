<template>
  <div class="header">
    <div class="header_left">
      <span class="iconfont icon-fanhui"></span>
    </div>
    <div class="header_search">
      <span class="iconfont icon-sousuo"></span>
      输入城市/景点/游玩主题
    </div>
    <div class="header_right">
      广州<span class="iconfont icon-jiantouarrow486"></span>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss">

.header {
  width: 100%;
  height: 44px;
  line-height: 44px;
  background: $bgcolor;
  color: $textColor;
  font-size: 18px;
  display: flex;
  .header_left {
    padding: 0 10px;
    text-align: center;
    font-weight: bold;
  }
  .header_search {
    flex: 1;
    background: #fff;
    height: 30px;
    margin: 7px 0;
    border-radius: 5px;
    color: #e4e7ea;
    line-height: 30px;
    font-size: 14px;
    padding-left: 10px;
  }
  .header_right {
    font-size: 15px;
    padding-left: 10px;
    text-align: center;
  }
}

</style>
