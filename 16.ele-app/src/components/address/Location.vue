<template>
  <div class="location">
    <div class="location_title">当前定位</div>
    <div class="location_des">
      <i class="fa fa-location-arrow"></i>
      <span>{{ address }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'me',
  props: {
    address: {
      type: String,
      required: false,
      default: '正在定位...'
    }
  }
}
</script>

<style lang="scss" scoped>
.location {
  background: #eee;
  .location_title {
    margin: 20px 0 10px 15px;
    font-size: 14px;
  }
  .location_des {
    background: #fff;
    height: 44px;
    line-height: 44px;
    padding: 0 10px;
    overflow: hidden;
    i {
      line-height: 44px;
      color: #009eef;
      margin-right: 5px;
      float: left;
    }
    span {
      font-size: 15px;
      width: 80%;
      display: block;
      float: left;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      font-weight: bold;
    }
  }
}
</style>
