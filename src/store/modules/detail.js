const state = {
  paramsD: {
    AutoSystemID: '',
    SystemID: '',
    batterID: ''
  },
  paramsB: {
    AutoSystemID: '',
    SystemID: '',
    batterID: ''
  },
  paramsS: {
    AutoSystemID: '',
    SystemID: '',
    batterID: ''
  },
  paramsF: {
    AutoSystemID: '',
    SystemID: '',
    batterID: ''
  },
  paramsFA: {
    AutoSystemID: '',
    SystemID: '',
    batterID: ''
  },
  paramsVA: {
    AutoSystemID: '',
    SystemID: '',
    batterID: ''
  },
  dictionaryDataParams: {
    KeySystemID: ''
  }
}

const mutations = {
  set_paramsD (state, params) {
    state.paramsD.AutoSystemID = params['AutoSystemID']
    state.paramsD.SystemID = params['SystemID']
    state.paramsD.batterID = params['batterID']
  },
  set_paramsB (state, params) {
    state.paramsB.AutoSystemID = params['AutoSystemID']
    state.paramsB.SystemID = params['SystemID']
    state.paramsB.batterID = params['batterID']
  },
  set_paramsS (state, params) {
    state.paramsS.AutoSystemID = params['AutoSystemID']
    state.paramsS.SystemID = params['SystemID']
    state.paramsS.batterID = params['batterID']
  },
  set_paramsF (state, params) {
    state.paramsF.AutoSystemID = params['AutoSystemID']
    state.paramsF.SystemID = params['SystemID']
    state.paramsF.batterID = params['batterID']
  },
  set_paramsFA (state, params) {
    state.paramsFA.AutoSystemID = params['AutoSystemID']
    state.paramsFA.SystemID = params['SystemID']
    state.paramsFA.batterID = params['batterID']
  },
  set_paramsVA (state, params) {
    state.paramsVA.AutoSystemID = params['AutoSystemID']
    state.paramsVA.SystemID = params['SystemID']
    state.paramsVA.batterID = params['batterID']
  },
  set_dictionaryDataParams (state, params) {
    state.dictionaryDataParams.KeySystemID = params
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
