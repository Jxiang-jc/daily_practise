import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let defaultCity = localStorage.city || '广州'

const state = {
  city: defaultCity
}

const mutations = {
  changeCity (state, cityName) {
    state.city = cityName
    localStorage.city = cityName
  }
}

export default new Vuex.Store({
  state,
  mutations
})
