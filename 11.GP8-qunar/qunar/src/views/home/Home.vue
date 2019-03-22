<template>
  <div class="homePage">
    <home-header></home-header>
    <home-swiper :swiperList="swiperList"></home-swiper>
    <home-icons :iconList="iconList"></home-icons>
    <home-location></home-location>
    <home-activity></home-activity>
    <home-popular-list :hotSales="hotSales"></home-popular-list>
    <home-like :likeList="likeList"></home-like>
    <home-vacation :vacationList="vacationList"></home-vacation>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import HomeHeader from '@/components/home/pages/Header'
import HomeSwiper from '@/components/home/pages/Swiper'
import HomeIcons from '@/components/home/pages/Icons'
import HomeLocation from '@/components/home/pages/Location'
import HomeActivity from '@/components/home/pages/Activity'
import HomePopularList from '@/components/home/pages/PopularList'
import HomeLike from '@/components/home/pages/Like'
import HomeVacation from '@/components/home/pages/Vacation'
export default {
  components: {
    HomeHeader,
    HomeSwiper,
    HomeIcons,
    HomeLocation,
    HomeActivity,
    HomePopularList,
    HomeLike,
    HomeVacation
  },
  data () {
    return {
      swiperList: [],
      iconList: [],
      likeList: [],
      hotSales: [],
      vacationList: [],
      changeCity: '' // 配合activated生命周期使用
    }
  },
  computed: {
    ...mapState(['city'])
  },
  methods: {
    getData () {
      this.$http
        .get('/api/dataHome.json')
        .then(res => {
          console.log('res: ', res)
          const data = res.data.data || []
          data.forEach((item, idx) => {
            if (item.city === this.city) {
              this.changeCity = item.city
              this.swiperList = item.swiperList
              this.iconList = item.iconList
              this.likeList = item.likeList
              this.hotSales = item.hotSales
              this.vacationList = item.vacationList
            }
          })
        })
    }
  },
  mounted () {
    this.getData()
  },

  activated () {
    // 如果页面城市发生改变， 则请求数据， 否则，keep-alive缓存
    if (this.changeCity !== this.city) {
      this.getData()
      this.changeCity = this.city
    }
  }
}
</script>

<style>
.homePage {
  background: #f5f5f5;
}
</style>
