<template>
  <div ref='container' class='container'>
    <div>
      <!-- 热门城市 -->
      <div class="hot">
        <div class="hot_title">
          热门城市
        </div>
        <ul class="hot_list">
          <li class="hot_item"
            v-for="(hotCity, index) in hotList"
            :key="index"
            @click="changeCityName(hotCity.name)"
          >{{hotCity.name}}</li>
        </ul>
      </div>

      <!-- 字母排序 -->
      <div class="sort">
        <div class="sort_title">字母排序</div>
        <ul class="sort_list">
          <li class="sort_item"
            v-for="(val, key) in sortList"
            :key="key"
            @click="changeSort(key)"
          >{{ key }}</li>
        </ul>
        <!--
          1. 循环数组时候两个参数，第一个为数组内元素，第二个为元素索引（item,index)
          2. 循环对象时候可以有三个参数，第一个为键值，第二个为键名，第三个为索引（value,key,index)
        -->
        <div class="letter_list">
          <div v-for="(value, letter) in sortList"
            :key="letter"
            :ref="letter"
          >
            <div class="list_title">{{ letter }}</div>
            <ul class="list_msg">
              <li class="list_msg_item"
                v-for="(city, index) in sortList[letter]"
                :key="index"
                @click="changeCityName(city.name)"
              >{{ city.name }}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import { mapMutations } from 'vuex'

export default {
  props: {
    hotList: {
      type: Array,
      required: true
    },
    sortList: {
      type: Object,
      required: true
    }
  },
  mounted () {
    this.$nextTick(() => {
      let container = this.$refs.container
      this.scroll = new BScroll(container)
    })
  },

  methods: {
    // 点击更换城市
    changeCityName (cityName) {
      console.log('cityName: ', cityName)
      this.changeCity(cityName)

      this.$router.push('/')
    },

    // 获取vuex中mutation的方法
    ...mapMutations(['changeCity']),

    // 点击跳转当前字母城市
    changeSort (sortName) {
      // http://ustbhuangyi.github.io/better-scroll/doc/api.html
      this.scroll.scrollToElement(this.$refs[sortName][0], 800)
    }
  }
}
</script>

<style lang="scss" scoped>
.container { // better-scroll的关键
  position: absolute;
  overflow: hidden;
  left: 0;
  right: 0;
  bottom: 0;
  top: 44px;
  background: #f5f5f5;
}
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
      position:relative; // 因为上面UL使用了伪元素（before）定位，因此z-index会覆盖在上面，如果想点击的话，就给hot_item（每一个li）添加定位  // 或者给z-index：-1 给伪元素
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
.sort {
  /* A-Z英文字母 */
  .sort_title {
    font-size: 12px;
    color:#212121;
    padding: 12px 15px;
  }
  .sort_list {
    background: #fff;
    color:#212121;
    position: relative;
    overflow: hidden; /* 这个是border的关键 */
    .sort_item {
      float: left;
      width: 16.666%;
      height: 45px;
      line-height: 45px;
      text-align: center;
      font-size: 14px;
      color: $smallSizeColor;
    }
  }

  /* 按字母分类 */
  .list_title {
    font-size: 12px;
    color:#212121;
    padding: 12px 15px;
  }
  .list_msg {
    background: #fff;
    color:#212121;
    position: relative;
    overflow: hidden; /* 这个是border的关键 */
    position: relative;
    &:before {
      content: '';
      position: absolute;
      width: 25%;
      height: 100%;
      left: 25%;
      border-left: 1px solid #ddd;
      border-right: 1px solid #ddd;
    }
    &:after {
      content: '';
      position: absolute;
      width: 25%;
      height: 100%;
      left: 50%;
      border-right: 1px solid #ddd;
      z-index:-1;
    }
    .list_msg_item {
      position: relative;
      float: left;
      width: 25%;
      height: 45px;
      line-height: 45px;
      text-align: center;
      font-size: 14px;
      color: $smallSizeColor;
      @include textOverflow;
      border-bottom: 1px solid #ddd;
    }
  }
}
</style>
