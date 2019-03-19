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
  data () {
    return {
      icons: [
        {
          id: 1,
          imgUrl: 'http://img1.qunarzz.com/piao/fusion/1803/95/f3dd6c383aeb3b02.png',
          content: '景点门票'
        },
        {
          id: 2,
          imgUrl: 'http://img1.qunarzz.com/piao/fusion/1804/ff/fdf170ee89594b02.png',
          content: '广州必游'
        },
        {
          id: 3,
          imgUrl: 'http://img1.qunarzz.com/piao/fusion/1803/76/eb88861d78fb9902.png',
          content: '动植物园'
        },
        {
          id: 4,
          imgUrl: 'http://img1.qunarzz.com/piao/fusion/1803/96/c70f1e85ae4a4f02.png',
          content: '自然风光'
        },
        {
          id: 5,
          imgUrl: 'http://img1.qunarzz.com/piao/fusion/1803/3e/86314b2af03b7502.png',
          content: '珠江夜游'
        },
        {
          id: 6,
          imgUrl: 'http://img1.qunarzz.com/piao/fusion/1803/ab/6f7d6e44963c9302.png',
          content: '泡温泉'
        },
        {
          id: 7,
          imgUrl: 'http://img1.qunarzz.com/piao/fusion/1804/5a/13ceb38dcf262f02.png',
          content: '一日游'
        },
        {
          id: 8,
          imgUrl: 'http://mp-piao-admincp.qunarzz.com/mp_piao_admin_mp_piao_admin/admin/20193/184e261814a5d07a5d3d08cd29cf590d.png',
          content: '长隆度假区'
        },
        {
          id: 9,
          imgUrl: 'http://mp-piao-admincp.qunarzz.com/mp_piao_admin_mp_piao_admin/admin/20193/c032ae43b15a3dac34b5e07bb0e46850.png',
          content: '广州塔'
        },
        {
          id: 10,
          imgUrl: 'http://img1.qunarzz.com/piao/fusion/1803/bd/9f7b9b2b60c1502.png',
          content: '踏青赏花'
        }
      ],
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
      this.icons.forEach((item, index) => {
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
