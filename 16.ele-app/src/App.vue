<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
import AMap from 'AMap' // 因为是cdn引入的，所以需要在vue.config.js配置中配置， 虽然不配置也可以运行，但是eslint会报错。我自己有强迫症，就添加了

export default {
  name: 'app',
  created () {
    this.getLocation()
  },
  methods: {
    getLocation () {
      const self = this
      AMap.plugin('AMap.Geolocation', function () {
        var geolocation = new AMap.Geolocation({
          // 是否使用高精度定位，默认：true
          enableHighAccuracy: true,
          // 设置定位超时时间，默认：无穷大
          timeout: 10000
        })

        geolocation.getCurrentPosition()
        AMap.event.addListener(geolocation, 'complete', onComplete)
        AMap.event.addListener(geolocation, 'error', onError)

        function onComplete (data) {
          // data是具体的定位信息  精准定位
          console.log('精确定位')
          console.log('data:', data)
          // self.$store.commit('types.SEL_LOCATION', data)
          self.$store.commit('SEL_ADDRESS', data.formattedAddress)
          self.$store.dispatch('setLocation', data)
          // self.$store.dispatch('setAddress', data.formattedAddress)
        }

        function onError (data) {
          // 定位出错    非精准定位
          // console.log(data);
          // 通过经纬度逆向获取当前位置
          self.getLngLatLocation()
        }
      })
    },

    getLngLatLocation () {
      const self = this
      AMap.plugin('AMap.CitySearch', function () {
        var citySearch = new AMap.CitySearch()
        citySearch.getLocalCity(function (status, result) {
          if (status === 'complete' && result.info === 'OK') {
            // 查询成功，result即为当前所在城市信息
            console.log('非精确定位')
            console.log('result: ', result)
            self.adcodeGetCity(result)
          }
        })
      })
    },
    // 通过adcode获取当前地理位置（非精确）
    adcodeGetCity (result) {
      const self = this
      AMap.plugin('AMap.Geocoder', function () {
        var geocoder = new AMap.Geocoder({
          // city 指定进行编码查询的城市，支持传入城市名、adcode 和 citycode
          // adcode: "440100"
          city: result.adcode
        })

        // rectangle: "113.1017375,22.93212254;113.6770499,23.3809537"
        var lnglat = result.rectangle.split(';')[0].split(',')

        geocoder.getAddress(lnglat, function (status, data) {
          if (status === 'complete' && data.info === 'OK') {
            // result为对应的地理位置详细信息
            console.log('data :', data)
            self.$store.dispatch('setLocation', {
              addressComponent: {
                city: result.city,
                province: result.province
              },
              formattedAddress: data.regeocode.formattedAddress
            })
            self.$store.dispatch('setAddress', data.regeocode.formattedAddress)
          }
        })
      })
    }
  }
}
</script>

<style scoped>
html,body {
  height: 100%;
  width: 100%;
}
#app {
  width: 100%;
  height: 100%;
  font-size: 14px;
  background: #f1f1f1;
}
</style>
