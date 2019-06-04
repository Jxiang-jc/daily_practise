<template>
  <div class="icons">
    <swiper :options="swiperOption" ref="mySwiper">
      <swiper-slide v-for="(iconList,index) in page"
        :key="index"
      >
        <div class="icons-item"
          v-for="(icon, index) in iconList"
          :key="index"
        >
          <img :src="icon.imgUrl" alt="">
          <p>{{icon.content}}</p>
        </div>
      </swiper-slide>
      <div class="icons-pagination"  slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
export default {
  props: {
    iconList: {
      type: Array,
      required: true,
      // 当type的类型为Array或者Object的时候default必须是一个函数：
      default: () => {
        return []
      }
    }
  },

  data () {
    return {
      swiperOption: {
         pagination: {
            el: '.icons-pagination'
          }
      }
    }
  },
  computed: {
    page () {
      let pages = []
      this.iconList.forEach((item, index) => {
        let idx = Math.floor(index / 8)

        if (!pages[idx]) pages[idx] = []

        pages[idx].push(item)
      })
      return pages
    }
  }
}
</script>

<style lang="scss" scoped>
.icons {
  width: 100%;
  overflow: hidden;
  background: #fff;
}
.icons-item {
  width: 25%;
  height: 80px;
  padding-top:5px;
  background: #fff;
  float: left;
  img {
    width: 55px;
    display:block;
    margin: 0 auto
  }
  p {
    text-align: center;
    font-size: 14px;
    color: #212121;
    padding-top: 2px;
  }
}
.icons /deep/ .icons-pagination {
  position: static;
  text-align: center;
  -webkit-transition: 300ms opacity;
  -o-transition: 300ms opacity;
  transition: 300ms opacity;
  -webkit-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
  z-index: 10;
  padding: 5px 0;
}
.icons /deep/ .swiper-pagination-bullet {
  height: 6px;
  width: 6px;
}
</style>
