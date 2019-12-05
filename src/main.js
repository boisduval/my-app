import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from './httpConfig/http'
import VueAxios from 'vue-axios'
import jquery from 'jquery'
import './plugins/iview.js'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/base.css'
import 'element-ui/lib/theme-chalk/base.css'
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition'
import CsvExportor from 'csv-exportor'
import Print from './js/print'
import print from 'print-js'

import md5 from 'js-md5'

import './assets/fonts/font-awesome-4.7.0/css/font-awesome.min.css'

import 'xe-utils'
import VXETable from 'vxe-table'
import 'vxe-table/lib/index.css'
import echarts from 'echarts'
import 'echarts-gl'
// 引入柱状图
import 'echarts/lib/chart/bar'
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueAxios, axios)
Vue.use(Print)
Vue.use(VXETable)
Vue.component(CollapseTransition.name, CollapseTransition)
Vue.prototype.$md5 = md5
Vue.prototype.$axios = axios
Vue.prototype.$ = jquery
Vue.prototype.CsvExportor = CsvExportor
Vue.prototype.$print = print
Vue.prototype.$echarts = echarts

new Vue({
  strict: false,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
