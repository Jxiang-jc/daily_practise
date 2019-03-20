<template>
  <div>
    <ul class="location_com border-top">
      <li class="location_item  border-right">
        <i class="iconfont icon-dizhiguanli"></i>
        <span>定位失败</span>
      </li>
      <li class="location_item border-top">
        <i class="iconfont icon-diqiu"></i>
        <span>必游榜单</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.location_com {
  display: flex;
  background: #fff;
  position: relative;
  .location_item {
    flex: 1;
    text-align: center;
    font-size: 14px;
    height: 50px;
    line-height: 50px;
  }
}
.icon-dizhiguanli, .icon-diqiu {
  font-size: 16px;
}
</style>
