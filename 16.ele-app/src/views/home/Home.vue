<template>
  <div class="home">
    <div class="home_header">
      <div class="home_address_map">
        <i class="fa fa-map-marker"></i>
        <span>{{ home_address }}</span>
        <i class="fa fa-sort-desc"></i>
      </div>
      <div class="home_shop_search">
        <i class="fa fa-search"></i>
        搜索商家 商家名称
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
export default {
  name: 'home',
  computed: {
    // 第一种方法
    // address () {
    //   return this.$store.getters.address
    // }
    // 第二种方法
    // ...mapGetters(['address'])
    // 第三种方法（个人建议用这种咯）
    ...mapGetters({
      home_address: 'address' // 用单引号代表简写
      // address: state => state.address 这种写法是state才有， getter是没有的，会报错
    }),

    ...mapState({
      address: state => state.address
    })
  }
}
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
  .home_header {
    background: #009eef;
    padding: 16px;
    .home_address_map {
      color: #fff;
      font-weight: bold;
      i {
        margin: 0 3px;
        font-size: 18px;
      }
      span {
        display: inline-block;
        width: 80%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
    .home_shop_search {
      margin-top: 10px;
      background-color: #fff;
      padding: 10px 0;
      border-radius: 4px;
      text-align: center;
      color: #aaa;
    }
  }
}
</style>
