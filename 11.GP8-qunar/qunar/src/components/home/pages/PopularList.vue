<template>
  <div class="popularList">
    <div class="hot_title">
      <span class="hot_title_left">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-remen"></use>
        </svg>
        本周热门榜单
      </span>
      <span class="hot_title_right">
        全部榜单<i class="iconfont icon-arrow-right-copy-copy-copy"></i>
      </span>
    </div>

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
          <span class="hot_price_left">￥{{hotSale.price}}</span>起
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      hotSales: [
        {
          id: 1,
          imgUrl: 'http://img1.qunarzz.com/sight/p0/201403/07/30b534b0de51ccac2906bcb6ba159988.jpg_250x250_86778c54.jpg',
          title: '长隆野生动物世界',
          price: this.formatPrice('272.9')
        },
        {
          id: 2,
          imgUrl: 'http://img1.qunarzz.com/sight/p0/201405/27/ef08b0cb4a5afb2f570e5c4dff5f743e.jpg_250x250_2e9029da.jpg',
          title: '长隆国际大马戏剧院',
          price: this.formatPrice('319')
        },
        {
          id: 3,
          imgUrl: 'http://img1.qunarzz.com/sight/p0/1707/88/889ae02b07140066a3.img.jpg_250x250_d4ca7f0a.jpg',
          title: '长隆欢乐世界',
          price: this.formatPrice('139.9')
        },
        {
          id: 4,
          imgUrl: 'http://img1.qunarzz.com/sight/p0/1603/ee/ee2fb567add7969390.water.jpg_250x250_9f556831.jpg',
          title: '广州塔',
          price: this.formatPrice('75')
        },
        {
          id: 5,
          imgUrl: 'http://img1.qunarzz.com/sight/p0/1809/56/5639ccfd58c4cca4a3.img.png_250x250_e8f9a22a.png',
          title: '广州正佳极地海洋世界',
          price: this.formatPrice('75')
        },
        {
          id: 6,
          imgUrl: 'http://img1.qunarzz.com/sight/p0/201212/31/309a88f591369b6893835fbb.png_250x250_19f299f9.png',
          title: '广东科学中心',
          price: this.formatPrice('48')
        },
        {
          id: 7,
          imgUrl: 'http://img1.qunarzz.com/sight/p0/1603/3b/3bd311262ee06d8c90.img.jpg_250x250_787a066a.jpg',
          title: '广州长隆旅游度假区',
          price: this.formatPrice('93.01')
        },
        {
          id: 8,
          imgUrl: 'http://img1.qunarzz.com/sight/p0/201403/07/1faf03354267996c8b039aa15290377b.jpg_250x250_0e19ad91.jpg',
          title: '天适樱花悠乐园',
          price: this.formatPrice('51')
        },
        {
          id: 9,
          imgUrl: 'http://img1.qunarzz.com/sight/p0/1603/1c/1c67791edbe2677b90.img.jpg_250x250_8f1dcbbd.jpg',
          title: '珠江夜游',
          price: this.formatPrice('145')
        },
        {
          id: 10,
          imgUrl: 'http://img1.qunarzz.com/sight/p51/201211/00/c4d081fb6347029f93835fbb.jpg_250x250_951bf3af.jpg',
          title: '珠江夜游天字码头',
          price: this.formatPrice('55')
        }
      ]
    }
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
  background: #fff;
  margin-top: 10px;
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
    @include testOverflow;
  }
  .hot_sale_title {
    color: $smallSizeColor;
    margin-top: 6px;
    font-size: 12px;
  }
  .hot_price {
    // color: $miniSizeColor;
    margin-top: 6px;
    font-size: 12px;
    .hot_price_left {
      color: #ff8300;
      font-size: 14px;
    }
  }
}
</style>
