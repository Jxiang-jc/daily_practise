<template>
  <div>
    <!-- 详情页图片 -->
    <div class="details_banner"
      @click="showLists"
    >
      <div class="details_img_box">
        <img src="//img1.qunarzz.com/sight/p0/1607/7c/7cda8b6782dabd80b4.img.jpg_600x330_8572a930.jpg" alt="">
      </div>
      <div class="details_img_info">
        <span>上海迪士尼乐园</span>
        <span class="details_video">视频<i class="iconfont icon-arrow-right-copy-copy-copy"></i>
        </span>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  data () {
    return {
      showList: false
    }
  },
  methods: {
    // 显示风景图片
    showLists () {
      this.$router.push('/scienic')
    }
  }
}
</script>

<style lang="scss" scoped>
.details_banner {
  position: relative;
  .details_img_box {
    width: 100%;
    img {
      width: 100%;
    }
  }
  .details_img_info {
    position: absolute;
    bottom: 12px;
    left: 10px;
    color: #fff;
    font-size: 18px;
    width: 100%;
    .details_video {
      float: right;
      padding-right: 12px;
    }
  }
}

</style>
