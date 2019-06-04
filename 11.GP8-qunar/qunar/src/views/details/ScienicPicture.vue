<template>
  <div>
    <van-nav-bar
      title="景区风景"
      left-arrow
      @click-left="onClickLeft"
    />
    <ul class="scienic_img_list">
      <li class="scienic_img_item"
        v-for="(imgUrl, index) in imageList"
        :key="index"
        @click="swiperImgClick"
      >
        <img v-lazy="imgUrl" >
      </li>
    </ul>
  </div>
</template>

<script>
import Vue from 'vue'
import { NavBar, Lazyload, ImagePreview } from 'vant'

const options = {
  loading: '../../../static/mock/img/loadImg.png',
  error: '../../../static/image/loadImg.gif',
  preload: 1.3, // 预加载高度的比例
  attempt: 2 // 尝试次数
}
Vue.use(NavBar).use(Lazyload, options).use(ImagePreview)

export default {
  data () {
    return {
      imageList: [
        'http://img1.qunarzz.com/sight/p0/1607/7c/7cda8b6782dabd80b4.img.jpg_350x240_a8e4d8a8.jpg',
        'http://img1.qunarzz.com/sight/p0/1811/d5/d5153b5e337c0644a3.water.jpg_350x240_76c3e0af.jpg',
        'http://img1.qunarzz.com/sight/p0/1811/ff/ff0ba07998df4d1a3.water.jpg_350x240_239b2a47.jpg',
        'http://img1.qunarzz.com/sight/p0/1811/84/8463ffd938924b69a3.water.jpg_350x240_027991f0.jpg',
        'http://img1.qunarzz.com/sight/p0/1811/a8/a86cbcef8dfd35c6a3.water.jpg_350x240_cc9d4693.jpg',
        'http://img1.qunarzz.com/sight/p0/1811/f3/f372e80c97620403a3.water.jpg_350x240_93db9393.jpg',
        'http://img1.qunarzz.com/sight/p0/1811/18/188075bba8b3a675a3.water.jpg_350x240_9bdfa4ed.jpg',
        'http://img1.qunarzz.com/sight/p0/1811/8e/8ee4791d5154fd46a3.water.jpg_350x240_8dbd0437.jpg',
        'http://img1.qunarzz.com/sight/p0/1811/e8/e8462b1d196ea6f4a3.water.jpg_350x240_e710b4a5.jpg',
        'http://img1.qunarzz.com/sight/p0/1811/9a/9aaf0b48afeb205da3.water.jpg_350x240_b57674a7.jpg',
        'http://img1.qunarzz.com/sight/p0/1811/d8/d89d006496443acea3.water.jpg_350x240_addff629.jpg',
        'http://img1.qunarzz.com/sight/p0/1811/cc/cce6ce13449cbdeea3.water.jpg_350x240_1404b0ba.jpg',
        'http://img1.qunarzz.com/sight/p0/1811/be/bed07cf557c93933a3.water.jpg_350x240_6779af74.jpg',
        'http://img1.qunarzz.com/sight/p0/1811/cb/cb222ee1da884c5ca3.water.jpg_350x240_3dc41f66.jpg',
        'http://img1.qunarzz.com/sight/p0/1811/29/298b4c882a43f7a2a3.water.jpg_350x240_065638a2.jpg',
        'http://img1.qunarzz.com/sight/p0/1811/50/5033016fced6d4e7a3.water.jpg_350x240_e3592371.jpg',
        'http://img1.qunarzz.com/sight/p0/1811/a4/a4587025b41cdf6aa3.water.jpg_350x240_753566fa.jpg',
        'http://img1.qunarzz.com/sight/p0/1811/76/766c628f809a8af3a3.water.jpg_350x240_2b0fdff8.jpg',
        'http://img1.qunarzz.com/sight/p0/1811/f0/f018b56a73de587ca3.water.jpg_350x240_fdef6b53.jpg',
        'http://img1.qunarzz.com/sight/p0/1811/90/904c521cbec0e760a3.water.jpg_350x240_77f9ae61.jpg',
        'http://img1.qunarzz.com/sight/p0/1811/2a/2abff49fa8e15b10a3.water.jpg_350x240_3d839e27.jpg',
        'http://img1.qunarzz.com/sight/p0/1811/bd/bd6714f8bb2077ada3.water.jpg_350x240_3324baa4.jpg',
        'http://img1.qunarzz.com/sight/p0/1811/18/18a353e6332df758a3.water.jpg_350x240_12ea13df.jpg',
        'http://img1.qunarzz.com/sight/p0/1811/6c/6c0604a1dda15561a3.water.jpg_350x240_5f6ba6ed.jpg',
        'http://img1.qunarzz.com/sight/p0/1811/f5/f5e3b72f385e9b7ca3.water.jpg_350x240_aa42402c.jpg',
        'http://img1.qunarzz.com/sight/p0/1811/c2/c2045317b4a8c4f7a3.water.jpg_350x240_3f2ea668.jpg',
        'http://img1.qunarzz.com/sight/p0/1811/39/39ee99139a92498a3.water.jpg_350x240_7f5e33e7.jpg',
        'http://img1.qunarzz.com/sight/p0/1811/c1/c1b56405a7b3c036a3.water.jpg_350x240_13a23a4e.jpg',
        'http://img1.qunarzz.com/sight/p0/1811/d0/d049ba68f3a38b2fa3.water.jpg_350x240_b2d4406c.jpg',
        'http://img1.qunarzz.com/sight/p0/1811/96/96caa082b6bf6471a3.water.jpg_350x240_f77b98c9.jpg',
        'http://img1.qunarzz.com/sight/p0/1811/95/957c0c41fc4498d4a3.water.jpg_350x240_563ffec4.jpg',
        'http://img1.qunarzz.com/sight/p0/1811/25/2581835f6ee4c0bca3.water.jpg_350x240_7f06786d.jpg',
        'http://img1.qunarzz.com/sight/p0/1811/28/28f067ece516bee6a3.water.jpg_350x240_6339e5dc.jpg',
        'http://img1.qunarzz.com/sight/p0/1811/8b/8b5f193caf583fea3.water.jpg_350x240_b8c46136.jpg',
        'http://img1.qunarzz.com/sight/p0/1811/7d/7d9adf820cb84fd5a3.water.jpg_350x240_3a50c42b.jpg',
        'http://img1.qunarzz.com/sight/p0/1811/9e/9e0e87e57915a52a3.water.jpg_350x240_f47293fa.jpg',
        'http://img1.qunarzz.com/sight/p0/1811/b7/b71ecc9182a329d0a3.water.jpg_350x240_dbb11150.jpg',
        'http://img1.qunarzz.com/sight/p0/1811/59/59255d9f2653d470a3.water.jpg_350x240_f8e357d4.jpg'
      ]
    }
  },
  methods: {
    onClickLeft () {
      window.history.go(-1)
    },
    swiperImgClick () {
      ImagePreview({
        images: this.imageList,
        startPosition: 1,
        onClose () {
          // do something
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.van-nav-bar__title {
  height: 44px;
}
.scienic_img_list {
  padding: 10px 10px 20px;
  overflow: hidden;
  .scienic_img_item {
    width: 49%;
    padding-top: 5px;
    &:nth-child(odd) {
      float: left;
    }
    &:nth-child(even) {
      float: right;
    }
    img {
      width: 100%;
      height: 120px; // 阻止预加载图片宽高与实际图片宽高不等的bug
      display: block;
      border-radius: 3px;
    }
  }
}
</style>
