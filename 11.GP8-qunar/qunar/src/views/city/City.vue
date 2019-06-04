<template>
  <div class="city">
    <city-header></city-header>
    <city-hot :hotList="hotList" :sortList="sortList"></city-hot>
  </div>
</template>

<script>
import CityHeader from '@/components/city/pages/Header'
import CityHot from '@/components/city/pages/HotCity'
export default {
  components: {
    CityHeader,
    CityHot
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
    })
  }
}
</script>

<style lang="scss" scoped>
.city {
  background: #f5f5f5;
}
</style>
