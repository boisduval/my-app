const state = {
  lang: {},
  currentLang: '0'
}

const mutations = {
  setLang (state, payload) {
    state.lang = payload
  },
  setCurrentLang (state, payload) {
    state.currentLang = payload
  }
}

const actions = {}

const namespaced = true

export default {
  state,
  mutations,
  actions,
  namespaced
}
