const state = {
  name: '',
  id: ''
}

const mutations = {
  set_paramsName (state, params) {
    state.name = params.name
    state.id = params.id
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
