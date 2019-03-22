<template>
  <div class="header">
    <div class="header_left">
      <span class="iconfont icon-fanhui"></span>
    </div>
    <div class="header_search">
      <span class="iconfont icon-sousuo"></span>
      输入城市/景点/游玩主题
    </div>
    <div class="header_right" >
      <router-link to="/city">
        {{city}}<span class="iconfont icon-jiantouarrow486"></span>
      </router-link>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  computed: {
    ...mapState(['city'])
  }
}
</script>

<style lang="scss" scoped>

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
    font-size: 16px;
    padding: 0 10px;
    text-align: center;
    a {
      color: #fff;
    }
  }
}

</style>
