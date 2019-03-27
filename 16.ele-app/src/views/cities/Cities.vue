<template>
  <div class="cities">
    <!-- 头部 -->
    <address-header title="城市选择"
      :isLeft="isLeft"
    ></address-header>
    <!-- 搜索框 -->
    <div class="search_box">
      <div class="search">
        <i class="fa fa-search"></i>
        <input type="text" v-model="city_val" placeholder="输入城市名或拼音" />
        <button v-show="city_val !==''">x</button>
      </div>
    </div>
    <div class="location">
      <!-- 当前定位 -->
      <address-location :address="address"></address-location>
    </div>
  </div>
</template>

<script>
import AddressHeader from '@/components/address/Header'
import AddressLocation from '@/components/address/Location'
export default {
  name: 'city',
  components: {
    AddressHeader,
    AddressLocation
  },
  data () {
    return {
      isLeft: {
        boolean: true,
        label: ''
      },
      city_val: ''
    }
  },
  computed: {
    address () {
      return this.$store.getters.location.formattedAddress
    }
  }
}
</script>

<style lang="scss" scoped>
.cities {
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
  padding-top: 90px;
  .search_box {
    position: fixed;
    top: 45px;
    height: 45px;
    width: 100%;
    background: #009eef;
    box-sizing: border-box;
  }
  .search {
    background: #fff;
    width: 80%;
    height: 30px;
    margin: 0 auto;
    line-height: 30px;
    border-radius: 15px;
    border:none;
    outline: none;
    i {
      color: #e6e5e5;
      padding: 0 6px;
    }
    input {
      outline: none;
      border: none;
      width: 80%;
    }
    button {
      outline: none;
      border: none;
      color: #666;
      background: #fff;
      margin-right: 10px;
    }
  }
  /* 如果项目中有sass， 就无法使用deep。 必须先把sass的包卸载了，才能使用， 我也不知道为什么 */
  .location /deep/ .location_des span {
    font-weight: normal;
  }
}

</style>
