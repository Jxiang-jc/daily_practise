<template>
  <div class="header-swiper load_img">
    <swiper :options="swiperOption" ref="mySwiper">
      <swiper-slide v-for="(swiper,index) in swiperList"
        :key="index"
      >
        <img :src="swiper.imgUrl" alt="">
      </swiper-slide>
      <div class="swiper-pagination"  slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
  export default {
    name: 'carrousel',
    props: {
      swiperList: {
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
            el: '.swiper-pagination'
          },
          loop: true,
          autoplay: {
            disableOnInteraction: false, // true以后，手动滑动图片会停止自动轮播， 默认是true
            delay: 3000
          }
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
.header-swiper {
  width: 100%;
  height: 100px;
  img {
    width: 100%;
  }
}
.header-swiper /deep/ .swiper-pagination-bullet-active {
  background: #fff;
}
</style>
