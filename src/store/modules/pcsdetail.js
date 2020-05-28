const state = {
  paramsRT: {
    AutoSystemID: '',
    SystemID: '',
    batterID: ''
  },
  paramsCS: {
    AutoSystemID: '',
    SystemID: '',
    batterID: ''
  },
  paramsT: {
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
  },
  set_paramsCS (state, params) {
    state.paramsCS.AutoSystemID = params['AutoSystemID']
    state.paramsCS.SystemID = params['SystemID']
    state.paramsCS.batterID = params['batterID']
  },
  set_paramsT (state, params) {
    state.paramsT.AutoSystemID = params['AutoSystemID']
    state.paramsT.SystemID = params['SystemID']
    state.paramsT.batterID = params['batterID']
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
