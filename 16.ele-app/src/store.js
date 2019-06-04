import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// types 正常的操作，应该把常量分一个文件，我这里偷懒了
const types = {
  SEL_LOCATION: 'SEL_LOCATION',
  SEL_ADDRESS: 'SEL_ADDRESS'
}

// state
const state = {
  location: {},
  address: '正在获取地址...'
}

const getters = {
  location: state => state.location,
  address (state) {
    return state.address
  },
  exactLocal: state => {
    if (state.location.addressComponent) {
      return state.location.addressComponent.city || state.location.addressComponent.province
    } else {
      return '获取不到当前位置'
    }
  }
}

const mutations = {
  // ES6简写
  [types.SEL_LOCATION] (state, location) {
    if (location) {
      state.location = location
    } else {
      state.location = null
    }
  },

  [types.SEL_ADDRESS] (state, address) {
    if (address) {
      state.address = address
    } else {
      state.address = ''
    }
  }
}

const actions = {
  setLocation: ({ commit }, location) => {
    commit(types.SEL_LOCATION, location)
  },
  setAddress: ({ commit }, address) => {
    commit(types.SEL_ADDRESS, address)
  }
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
