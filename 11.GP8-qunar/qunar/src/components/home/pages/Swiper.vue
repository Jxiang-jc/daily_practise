<template>
  <div class="header-swiper load_img">
    <swiper v-if="loopList.length>0" :options="swiperOption" ref="mySwiper">
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
    watch: {
      swiperList: {
        handler (nVal, oVal) {
          this.loopList = nVal
        }
      }
    },

    data () {
      return {
        loopList: [], // 存放数据的list， 监听数据变化， 否则loop不生效
        swiperOption: {
          pagination: {
            el: '.swiper-pagination'
          },
          loop: true,
          speed: 800, // 滑动速度
          autoplay: {
            disableOnInteraction: false, // true以后，手动滑动图片会停止自动轮播， 默认是true
            delay: 3000
          }
        }
      }
    },
    computed: {
      swiper () {
        return this.$refs.mySwiper.swiper
      }
    },

    methods: {
    },

    mounted () {

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
