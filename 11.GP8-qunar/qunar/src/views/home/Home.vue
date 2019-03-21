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
      vacationList: []
    }
  },
  mounted () {
    this.$http
      .get('/api/dataHome.json')
      .then(res => {
        console.log('res: ', res)
        const data = res.data.data[0] || []
        this.swiperList = data.swiperList
        this.iconList = data.iconList
        this.likeList = data.likeList
        this.hotSales = data.hotSales
        this.vacationList = data.vacationList
      })
  }
}
</script>

<style>
.homePage {
  background: #f5f5f5;
}
</style>
