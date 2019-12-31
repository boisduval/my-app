const state = {
  paramsSG: {
    AutoSystemID: '',
    SystemID: '',
    batterID: ''
  }
}

const mutations = {
  set_paramsSG (state, params) {
    state.paramsSG.AutoSystemID = params['AutoSystemID']
    state.paramsSG.SystemID = params['SystemID']
    state.paramsSG.batterID = params['batterID']
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
