<template>
  <div>
    <button @click="isSearching=true">点击搜索</button>
    <search-page :isShow.sync="isSearching" @choose="searchProduct" displayProp="itemName" ref="searchPageRef"></search-page>
  </div>
</template>

<script>
import SearchPage from '_c/searchPage'
export default {
  name: 'searchPageView',
  components: {
    SearchPage
  },
  data () {
    return {
      // 是否显示搜索层遮罩
      isSearching: false
    }
  },
  methods: {
    // 搜索遮罩层选中关键字
    searchProduct (item) {
      this.$router.push({ path: '/search/searchItem', query: { searchParams: item.itemName } })
      this.$refs.searchPageRef.setValue('')
    }
  }
}
</script>

<style>
</style>
