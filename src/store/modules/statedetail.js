const state = {
  paramsTvpbc: {
    AutoSystemID: '',
    SystemID: '',
    batterID: ''
  }
}

const mutations = {
  set_paramsTvpbc (state, params) {
    state.paramsTvpbc.AutoSystemID = params['AutoSystemID']
    state.paramsTvpbc.SystemID = params['SystemID']
    state.paramsTvpbc.batterID = params['batterID']
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
