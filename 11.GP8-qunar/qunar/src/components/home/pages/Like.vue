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
  data () {
    return {
      likeList: [
        {
          id: 1,
          imgUrl: 'http://img1.qunarzz.com/sight/p0/201403/07/30b534b0de51ccac2906bcb6ba159988.jpg_200x200_2f08733b.jpg',
          title: '长隆野生动物世界',
          commont: '12345',
          price: '274',
          location: '广州长隆...',
          feature: '熊猫三胞胎与您共享欢乐时光'
        },
        {
          id: 2,
          imgUrl: 'http://img1.qunarzz.com/sight/p0/1410/20/41d723daadc98045fe6b7283ba0af40c.jpg_200x200_5a05d5bc.jpg',
          title: '碧水湾温泉度假村',
          commont: '2222',
          price: '345',
          location: '从化市'
        },
        {
          id: 3,
          imgUrl: 'http://img1.qunarzz.com/sight/p0/1603/3c/3c514c20a740128b90.water.jpg_200x200_c7102a23.jpg',
          title: '南沙百万葵园',
          commont: '3333',
          price: '123',
          location: '南沙区'
        },
        {
          id: 4,
          imgUrl: 'http://img1.qunarzz.com/sight/p0/1603/3b/3bd311262ee06d8c90.img.jpg_200x200_c118d7da.jpg',
          title: '广州长隆旅游度假区',
          commont: '4444',
          price: '274',
          location: '番禺',
          feature: '《奔跑吧兄弟》取景地'
        },
        {
          id: 5,
          imgUrl: 'http://img1.qunarzz.com/sight/p0/1508/d9/12d379fbfee474d481da6e950b740ff3.water.jpg_200x200_4a3f867b.jpg',
          title: '增城金叶子温泉',
          commont: '5555',
          price: '212',
          location: '增城',
          feature: '高山温泉水疗养生，视野开阔滋养身心'
        }
      ]
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
