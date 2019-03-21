<template>
  <div class="hot">
    <div class="hot_title">
      热门城市
    </div>
    <ul class="hot_list">
      <li class="hot_item"
        v-for="(hotCity, index) in hotList"
        :key="index"
      >{{hotCity.name}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    hotList: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.hot {
  .hot_title {
    font-size: 12px;
    color:#212121;
    padding: 12px 15px;
  }
  .hot_list {
    background: #fff;
    color:#212121;
    position: relative;
    overflow: hidden; /* 这个是border的关键 */
    &:before {
      content: '';
      position: absolute;
      width: 33.333%;
      height: 100%;
      left: 33.333%;
      border-left:1px solid #ddd;
      border-right: 1px solid #ddd;
    }
    .hot_item {
      float: left;
      width: 33.333%;
      height: 45px;
      line-height: 45px;
      font-size: 14px;
      text-align: center;
      border-bottom: 1px solid #ddd;
    }
  }
}

</style>
