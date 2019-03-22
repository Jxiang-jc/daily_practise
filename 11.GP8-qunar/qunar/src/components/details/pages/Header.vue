<template>
  <div class="details_header">
    <!-- 默认显示返回按钮 -->
    <div class="header_return"
      v-show="showHeader"
    >
      <span class="border_return"></span>
      <i class="iconfont icon-fanhui" @click="toHome"></i>
    </div>

    <!-- 滚动条到一定位置显示的头部 -->
    <div class="header_top"
      v-show="!showHeader"
      :style="styleOpacity"
    >
      <div>
        <span class="iconfont icon-fanhui" @click="toHome"></span>
      </div>
      <span>上海迪士尼乐园</span>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      showHeader: true,
      styleOpacity: {
        opacity: 0
      }
    }
  },
  methods: {
    toHome () {
      this.$router.push('/')
    },
    scrollShow () {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      if (scrollTop > 45) {
        let opacity = scrollTop / 130 // 经验
        opacity = opacity > 1 ? 1 : opacity
        this.styleOpacity = {opacity}
        this.showHeader = false
      } else {
        this.showHeader = true
      }
    }
  },
  mounted () {
    window.addEventListener('scroll', this.scrollShow)
  },
  destroyed () {
    window.removeEventListener('scroll', this.scrollShow)
  }
}
</script>

<style lang="scss" scoped>

.header_return {
  position: absolute;
  left: 5px;
  top: 5px;
  width: 36px;
  height: 36px;
  .border_return {
    border-radius: 50%;
    display: block;
    width: 36px;
    height: 36px;
    opacity: 0.5;
    background: #000;
  }
  .icon-fanhui {
    position: absolute;
    top: 5px;
    left: 8px;
    color: #fff;
    font-size: 22px;
    font-weight: bold;
  }
}
.header_top {
  position: fixed;
  top: 0;
  width: 100%;
  height: 44px;
  line-height: 44px;
  background: $bgcolor;
  color: $textColor;
  font-size: 18px;
  text-align: center;
  .icon-fanhui {
    position: absolute;
    left: 10px;
    font-size: 22px;
    font-weight: bold;
  }
}
</style>
