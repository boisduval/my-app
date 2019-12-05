const state = {
  userIfo: {},
  isCollapse: true
}

const mutations = {
  setUserIfo (state, payload) {
    state.userIfo = payload
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
