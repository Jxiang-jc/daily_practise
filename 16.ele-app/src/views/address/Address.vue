<template>
  <div class="address">
    <!-- 头部 -->
    <address-header :title="title"
      :isLeft="isLeft"
      :isRight="isRight"
    ></address-header>
    <!-- 搜索框 -->
    <div class="address_city_search">
      <div class="address_search">
        <span class="address_city_select">
         <span class="address_city_name">{{ city }}</span>
          <i class="fa fa-angle-down"></i>
        </span>
      </div>
      <div class="address_input">
        <i class="fa fa-search"></i>
        <input type="text"
          v-model="search_val"
          placeholder="请输入地址"
        />
      </div>
    </div>
    <!-- 当前定位 -->
    <address-location :address="address"></address-location>

    <!-- 搜索显示列表 -->
    <div class="area">
      <ul class="area_list"
        v-for="(item,index) in areaList"
        :key="index"
      >
        <li>
          <h4>{{ item.name}}</h4>
          <p>{{ item.district }}{{ item.address}}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import AMap from 'AMap'
import AddressHeader from '@/components/address/Header'
import AddressLocation from '@/components/address/Location'

export default {
  name: 'Address',
  components: {
    AddressHeader,
    AddressLocation
  },
  computed: {
    address () {
      return this.$store.getters.location.formattedAddress
    }
  },
  watch: {
    // 监听输入地址
    search_val () {
      this.searchPlace()
    }
  },
  data () {
    return {
      isLeft: {
        boolean: true,
        label: '返回'
      },
      isRight: {
        boolean: true,
        label: '新增地址'
      },
      title: '请选择收货地址', // title是原生属性，也可以直接写在标签当中
      search_val: '',
      city: '', // 当前城市
      areaList: []
    }
  },
  methods: {
    searchPlace () {
      const self = this
      // console.log(this.search_val);
      AMap.plugin('AMap.Autocomplete', function () {
        // 实例化Autocomplete
        var autoOptions = {
          // city 限定城市，默认全国
          city: self.city
        }
        var autoComplete = new AMap.Autocomplete(autoOptions)
        autoComplete.search(self.search_val, function (status, result) {
          // 搜索成功时，result即是对应的匹配数据
          // console.log(result);
          self.areaList = result.tips
        })
      })
    }
  },
  beforeRouteEnter (to, from, next) {
    // console.log('from: ', from)
    // console.log('to: ', to)
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
    next(vm => {
      // console.log('vm: ', vm)
      // vm就是vue实例
      vm.city = to.params.city
    })
  }
}
</script>

<style lang="scss" scoped>
.address {
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
  padding-top: 45px;
  .address_city_search {
      background-color: #fff;
      padding: 10px 15px;
      color: #333;
      display: flex;
    .address_search {
      background: #fff;
      height: 40px;
      border-radius: 10px;
      box-sizing: border-box;
      line-height: 40px;
      flex: 0.7;
      align-items: center;
      .address_city_select {
        padding: 0 10px;
        height: 40px;
        line-height: 40px;
        display: flex;
        align-items: center;
        .address_city_name {
          display: inline-block;
          width: 50px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        i {
          margin-right: 10px;
        }
      }
    }
    .address_input {
      flex: 2;
      line-height: 40px;
      background: #eee;
      i {
          margin:0 10px;
      }
      input {
        margin-left: 5px;
        background: #eee;
        outline: none;
        border: none;
      }
    }
  }
}

.area {
  margin-top: 16px;
  background: #fff;
  li {
    border-bottom: 1px solid #eee;
    padding: 8px 16px;
    color: #aaa;
    h4 {
      font-weight: bold;
      color: #333;
      margin-bottom: 5px;
    }
  }
}
</style>
