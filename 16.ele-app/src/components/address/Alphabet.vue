<template>
  <div class="alphablet"
    ref="area_scroll"
    v-if="cityInfo"
  >
    <div class="scroll_wrap">
      <!-- 热门城市 -->
      <div class="hot_wrap citylist">
        <div class="title">热门城市</div>
        <ul class="hot_city">
          <li v-for="(hotCity, index) in cityInfo.hotCities"
            :key="index"
            @click="$emit('selectCity',hotCity)"
          >{{ hotCity.name}}</li>
        </ul>
      </div>

      <!-- 所有城市 -->
      <div class="city_wrap">
        <!-- 循环按字母排序的key -->
        <div class="city_content citylist"
          v-for="(letter, index) in keys"
          :key="index"
        >
          <div class="title">{{ letter }}</div>
          <!-- 根据字母key展示城市名 -->
          <ul>
            <li v-for="(city, idx) in cityInfo[letter]"
              :key="idx"
              @click="$emit('selectCity',city)"
            >{{ city.name}}</li>
          </ul>
        </div>
      </div>

    </div>

    <!-- 右侧字母 -->
    <div class="area_keys">
      <ul>
        <li @click="selectKey(0)">#</li>
        <li v-for="(item, index) in keys"
          :key="index"
          @click="selectKey(index+1)"
        >{{ item }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll"
export default {
  name: 'Alphaber',
  data () {
    return {}
  },
  props: {
    cityInfo: {
      type: Object,
      required: false,
      default: () => {
        return {}
      }
    },
    keys: {
      type: Array,
      required: false,
      default: () => {
        return []
      }
    }
  },
  methods: {
    initScroll () {
      this.scroll = new BScroll(this.$refs['area_scroll'], {
        click: true
      })
    },
    selectKey (index) {
      // 获取到每一个字母对应的div
      const citylist = this.$refs.area_scroll.getElementsByClassName('citylist')

      // 根据索引（字母A-Z）, 找到对应的元素
      let el = citylist[index]

      // 利用bscroll滚动到对应位置
      this.scroll.scrollToElement(el, 500)
    }
  }
}
</script>

<style lang="scss" scoped>
.alphablet {
  margin-top: 12px;
  box-sizing: border-box;
  padding: 0 16px;
  background: #fff;
  height: calc(100% - 100px);
  overflow: hidden;
  .scroll_wrap {
    background: #fff;
    overflow: auto;
    .hot_wrap {
      .title {
        color: #aaa;
        padding: 15px 0;
      }
      .hot_city {
        padding: 0 16px;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        li {
          width: 30%;
          background: #f1f1f1;
          margin: 0 10px 10px 0;
          text-align: center;
          padding: 10px;
          box-sizing: border-box;
        }
      }
    }
  }
  .city_content {
    .title {
      color: #aaa;
      padding: 15px 0;
    }
    li {
      padding: 10px;
      border-bottom: 1px solid #eee;
    }
  }
  .area_keys {
    position: fixed;
    right: 0;
    top: 30%;
    color: #aaa;
    font-size: 12px;
    line-height: 1.4;
    text-align: center;
    padding: 0 5px;
  }
}
</style>
