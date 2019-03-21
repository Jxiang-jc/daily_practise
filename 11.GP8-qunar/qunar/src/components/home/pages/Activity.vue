<template>
  <div class="activity border-top">
    <div class="activity_item">
      <img src="http://img1.qunarzz.com/piao/fusion/1806/29/30427c0e0658b502.png">
    </div>
    <div class="activity_item">
      <img src="http://img1.qunarzz.com/piao/fusion/1806/36/e89032c5f7714f02.png">
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped lang='scss'>
.activity {
  display: flex;
  position: relative;
  @include bgColor;
  .activity_item {
    flex: 1;
    font-size: 14px;;
    text-align: center;
    height: 80px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
