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
    <!-- 全部城市列表 -->
    <div style="height:100%" v-if="searchList.length ==0">
      <div class="location">
        <!-- 当前定位 -->
        <address-location :address="address"></address-location>
      </div>
      <cities-alphabet ref="allcity"
        :cityInfo="cityInfo"
        :keys="keys"
        @selectCity="selectCity"
      ></cities-alphabet>
    </div>
    <!-- 搜索城市列表 -->
    <div v-else class="search_list">
      <ul>
        <li v-for="(item, index) in searchList"
          :key="index"
          @click="selectCity(item)"
        >{{ item.name }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import AddressHeader from '@/components/address/Header'
import AddressLocation from '@/components/address/Location'
import CitiesAlphabet from '@/components/address/Alphabet'
export default {
  name: 'city',
  components: {
    AddressHeader,
    AddressLocation,
    CitiesAlphabet
  },
  data () {
    return {
      isLeft: {
        boolean: true,
        label: ''
      },
      city_val: '', // 搜索框v-model
      cityInfo: {}, // A-Z对应的城市信息
      keys: [], // 存放 A-Z
      allCities: [], // 所有的城市
      searchList: []
    }
  },
  watch: {
    city_val () {
      this.searchCity()
    }
  },
  computed: {
    address () {
      return this.$store.getters.location.formattedAddress
    }
  },
  created () {
    this.getCityInfo()
  },
  methods: {
    // 获取城市信息
    getCityInfo () {
      this.$http('/api/posts/cities')
        .then(res => {
          // console.log('res: ', res)
          this.cityInfo = res.data

          // 处理key 计算key keys的顺序是固定的
          this.keys = Object.keys(res.data)
          // console.log('this.keys: ', this.keys)

          // 把hotcities移除
          this.keys.pop()

          // 对数组进行排序
          this.keys.sort()

          this.$nextTick(() => {
            this.$refs.allcity.initScroll()
          })

          // 存储所有城市， 用来搜索过滤
          this.keys.forEach(key => {
            this.cityInfo[key].forEach(city => {
              this.allCities.push(city)
            })
          })
          
        })
        .catch(err => {
          console.log('err: ', err)
        })
    },
    // 监听子组件点击选择城市事件
    selectCity (city) {
      this.$router.push({ name: "address", params: { city: city.name } })
    },

    // 城市搜索框事件
    searchCity () {
      if (!this.city_val) {
        // 如果搜索框为空, 数组置空
        this.searchList = []
      } else {
        // 根据搜索框的关键字检索城市 并存入到searchList数组中
        this.searchList = this.allCities.filter(item => {
          return item.name.indexOf(this.city_val) != -1
        })
      }
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
  .search_list {
    background: #fff;
    padding: 5px 16px;
    li {
      padding: 10px;
      border-bottom: 1px solid #eee;
    }
  }
}

</style>
