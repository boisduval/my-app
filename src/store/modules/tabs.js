const state = {
  // 所有打开的路由
  openTab: [],
  activeIndex: '/main', // 当前激活的
  detailLabel: '' // 详情页的标签名
}

const mutations = {
  // 添加tabs
  add_tabs (state, data) {
    state.openTab.push(data)
  },
  // 删除tabs
  delete_tabs (state, name) {
    let index = 0
    for (let option of state.openTab) {
      if (option.name === name) {
        break
      }
      index++
    }
    state.openTab.splice(index, 1)
  },
  // 设置当前激活的tab
  set_active_index (state, index) {
    state.activeIndex = index
  },
  set_detail_label (state, label) {
    state.detailLabel = label
  },
  // 关闭其他选项卡
  delete_others_tabs (state) {
    state.openTab = state.openTab.filter((el) => {
      return el.route === state.activeIndex || el.route === '/main'
    })
    console.log(state.openTab)
  },

  // 关闭全部选项卡
  delete_all_tabs (state) {
    state.openTab = [{
      name: 'main',
      route: '/main',
      label: '首页'
    }]
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
