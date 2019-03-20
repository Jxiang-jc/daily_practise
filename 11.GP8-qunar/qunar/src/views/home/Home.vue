<template>
  <div class="homePage">
    <home-header></home-header>
    <home-swiper></home-swiper>
    <home-icons></home-icons>
    <home-location></home-location>
    <home-activity></home-activity>
    <home-popular-list></home-popular-list>
  </div>
</template>

<script>
import HomeHeader from '@/components/home/pages/Header'
import HomeSwiper from '@/components/home/pages/Swiper'
import HomeIcons from '@/components/home/pages/Icons'
import HomeLocation from '@/components/home/pages/Location'
import HomeActivity from '@/components/home/pages/Activity'
import HomePopularList from '@/components/home/pages/PopularList'
export default {
  components: {
    HomeHeader,
    HomeSwiper,
    HomeIcons,
    HomeLocation,
    HomeActivity,
    HomePopularList
  }
}
</script>

<style>
.homePage {
  background: #f5f5f5;
}
</style>
