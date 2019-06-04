<template>
  <div class="popularList">
    <!-- <div class="hot_title">
      <span class="hot_title_left">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-remen"></use>
        </svg>
        本周热门榜单
      </span>
      <span class="hot_title_right">
        全部榜单<i class="iconfont icon-arrow-right-copy-copy-copy"></i>
      </span>
    </div> -->

    <!-- 使用复用UI组件 -->
    <title-box :title="'本周热门榜单'">
      <!-- iconfont插槽 -->
      <svg class="icon" aria-hidden="true" slot="iconfont">
        <use xlink:href="#icon-remen"></use>
      </svg>

      <!-- more插槽 -->
      <span slot="more">
        全部榜单<i class="iconfont icon-arrow-right-copy-copy-copy"></i>
      </span>

      <!-- 匿名插槽 -->
      <ul class="hot_sale">
        <li class="hot_sale_item"
          v-for="(hotSale, index) in hotSales"
          :key=index
        >
          <div class="load_img">
            <img :src="hotSale.imgUrl">
          </div>
          <p class="hot_sale_title">{{ hotSale.title }}</p>
          <p class="hot_price">
            <span class="hot_price_left">￥{{formatPrice(hotSale.price)}}</span>起
          </p>
        </li>
      </ul>
    </title-box>

  </div>
</template>

<script>
import TitleBox from '@/components/commons/TitleBox'

export default {
  components: {
    TitleBox
  },
  props: {
    hotSales: {
      type: Array,
      required: true,
      // 当type的类型为Array或者Object的时候default必须是一个函数：
      default: () => {
        return []
      }
    }
  },
  data () {
    return {}
  },

  methods: {
    formatPrice (price) {
      return price
    }
  }
}
</script>

<style lang="scss" scoped>

.popularList {
  @include bgColor;
}
.hot_title {
  padding: 12px 0;
  .hot_title_left {
    padding-left: 10px;
    font-size: 16px;
    height: 22px;
    line-height: 22px;
    color: #212121;
  }
  .hot_title_right {
    float: right;
    padding-right: 10px;
    font-size: 12px;
    color: #616161;
  }
}
.hot_sale {
  padding: 0 12px 8px 8px;
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;
}
.hot_sale_item {
  width: 100px;
  display: inline-block;
  margin-left: 6px;
  text-align: center;
  img {
    display: block;
    border-radius: 3px;
    width: 100%;
  }
  p {
    @include textOverflow;
  }
  .hot_sale_title {
    color: $smallSizeColor;
    margin-top: 6px;
    font-size: 12px;
  }
  .hot_price {
    color: $miniSizeColor;
    margin-top: 6px;
    font-size: 12px;
    .hot_price_left {
      color: #ff8300;
      font-size: 14px;
    }
  }
}
</style>
