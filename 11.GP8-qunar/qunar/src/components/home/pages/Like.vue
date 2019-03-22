<template>
  <div class="guessYourLike">
    <title-box :title="'猜你喜欢'">
      <svg class="icon" aria-hidden="true" slot="iconfont">
        <use xlink:href="#icon-xin"></use>
      </svg>

      <!-- 数据列表 -->
      <div>
        <ul class="like_item_box">
          <li class="like_item border-bottom"
            v-for="(item, index) in likeList"
            :key="index"
            @click="ToDetails"
          >
            <div class="like_img">
              <img :src="item.imgUrl">
            </div>
            <div class="like_text">
              <p class="like_tile">
                <span>{{item.title}}</span>
              </p>
              <p class="like_commont">
                <span>{{item.commont}}条评论</span>
              </p>
              <p class="like_price">
                <span class="price_item_left">￥<b>{{item.price}}</b></span>起
                <span class="price_item_right">
                  {{item.location}}
                </span>
              </p>
              <p class="like_feature"
                v-if="item.feature"
              >{{item.feature}}</p>
            </div>
          </li>
        </ul>
        <div>
          <a href="" class="like_more">查看所有产品</a>
        </div>
      </div>
    </title-box>
  </div>
</template>

<script>
import TitleBox from '../../commons/TitleBox'

export default {
  components: {
    TitleBox
  },
  props: {
    likeList: {
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
    ToDetails () {
      this.$router.push('/details')
    }
  }
}
</script>

<style lang="scss" scoped>
.guessYourLike {
  @include bgColor;
}
.like_item_box {
  margin-left: 12px;
}
.like_item {
  position: relative;
  padding: 10px 0;
  overflow: hidden;
  .like_img {
    float: left;
    width: 100px;
    height: 100px;
    img {
      width: 100%;
    }
  }
  .like_text {
    padding-left: 10px;
    overflow: hidden; /* 这个样式很关键, 实现ellipsis的关键 */
    .like_tile {
      height: 22px;
      line-height: 22px;
      font-size: 16px;
      margin-top: 13px;
      color: $smallSizeColor;
      @include textOverflow;
    }
    .like_commont {
      margin-top: 7px;
      color: $miniSizeColor;
      font-size: 12px;
    }
    .like_price {
      margin-top: 7px;
      color: $miniSizeColor;
      font-size: 12px;
      .price_item_left {
        color:#ff8300;
        b {
          font-size: 20px;
        }
      }
      .price_item_right {
        float: right;
        padding-right: 10px;
      }
    }
    .like_feature {
      display: inline-block;
      margin-top: 24px;
      margin-right: 12px;
      background: #fff9f9;
      padding: 2px 5px;
      color: #f55;
      font-size: 12px;
      line-height: 17px;
    }
  }
}
.like_more {
    display: block;
    padding: 10px 0;
    color: #00afc7;
    font-size: 14px;
    line-height: 20px;
    text-align: center;
}
</style>
