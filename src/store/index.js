import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import modules from './modules'

Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  reducer (val) {
    return {
      // 只储存state中的user
      home: val.home
    }
  }
})
export default new Vuex.Store({
  modules,
  strict: process.env.NODE_ENV !== 'production',
  // plugins: [createPersistedState({
  //   storage: window.sessionStorage,
  //   reducer (val) {
  //     return {
  //       // 只储存state中的user
  //       user: val.userIfo
  //     }
  //   }
  // })]
  plugins: [vuexLocal.plugin]
})
