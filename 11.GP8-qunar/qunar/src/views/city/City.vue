<template>
  <div class="city">
    <city-header></city-header>
    <city-hot :hotList="hotList"></city-hot>
    <city-sort :sortList="sortList"></city-sort>
  </div>
</template>

<script>
import CityHeader from '@/components/city/pages/Header'
import CityHot from '@/components/city/pages/HotCity'
import CitySort from '@/components/city/pages/SortCity'
export default {
  components: {
    CityHeader,
    CityHot,
    CitySort
  },
  data () {
    return {
      hotList: [],
      sortList: {}
    }
  },
  mounted () {
    this.$http
      .get('/api/city.json')
      .then(res => {
        const data = res.data.data || []
        this.hotList = data.hotCities || []
        this.sortList = data.cities || {}
        console.log('this.sortList: ', this.sortList)
    })
  }
}
</script>

<style lang="scss" scoped>
.city {
  background: #f5f5f5;
}
</style>
