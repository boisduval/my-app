const state = {
  paramsRT: {
    AutoSystemID: '',
    SystemID: '',
    batterID: ''
  }
}

const mutations = {
  set_paramsRT (state, params) {
    state.paramsRT.AutoSystemID = params['AutoSystemID']
    state.paramsRT.SystemID = params['SystemID']
    state.paramsRT.batterID = params['batterID']
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
