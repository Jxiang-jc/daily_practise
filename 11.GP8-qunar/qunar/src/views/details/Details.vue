<template>
  <div>
     <details-banner></details-banner>
     <details-header></details-header>
     <div style="height: 2000px;"></div>
  </div>
</template>

<script>
import DetailsBanner from '@/components/details/pages/Banner'
import DetailsHeader from '@/components/details/pages/Header'

export default {
  components: {
    DetailsBanner,
    DetailsHeader
  },
  activated () {
    document.documentElement.scrollTop = 0
  }
}
</script>

<style>
</style>
