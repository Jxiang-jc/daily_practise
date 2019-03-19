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
    data () {
      return {
        swiperList: [
          {
            id: 1,
            imgUrl: require('@/assets/img/swiper1.jpg')
          },
          {
            id: 2,
            imgUrl: require('@/assets/img/swiper2.jpg')
          },
          {
            id: 3,
            imgUrl: require('@/assets/img/swiper3.jpg')
          },
          {
            id: 4,
            imgUrl: require('@/assets/img/swiper4.jpg')
          }
        ],
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
