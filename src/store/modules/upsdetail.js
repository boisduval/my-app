const state = {
  paramsSSG: {
    AutoSystemID: '',
    SystemID: '',
    batterID: ''
  },
  paramsESG: {
    AutoSystemID: '',
    SystemID: '',
    batterID: ''
  }
}

const mutations = {
  set_paramsSSG (state, params) {
    state.paramsSSG.AutoSystemID = params['AutoSystemID']
    state.paramsSSG.SystemID = params['SystemID']
    state.paramsSSG.batterID = params['batterID']
  },
  set_paramsESG (state, params) {
    state.paramsESG.AutoSystemID = params['AutoSystemID']
    state.paramsESG.SystemID = params['SystemID']
    state.paramsESG.batterID = params['batterID']
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
