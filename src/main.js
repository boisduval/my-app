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
import zh from '@/assets/lang/zh'
import en from '@/assets/lang/en'
// import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
import zhTwLocale from 'element-ui/lib/locale/lang/zh-TW'
import enLocale from 'element-ui/lib/locale/lang/en'
import './assets/css/base.css'
import 'element-ui/lib/theme-chalk/base.css'
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition'

import md5 from 'js-md5'

import './assets/fonts/font-awesome-4.7.0/css/font-awesome.min.css'

import 'xe-utils'
import VXETable from 'vxe-table'
import 'vxe-table/lib/index.css'
import VXETablePluginExportXLSX from 'vxe-table-plugin-export-xlsx'
import VXETablePluginElement from 'vxe-table-plugin-element'
import echarts from 'echarts'
import 'echarts-gl'
// 引入柱状图
import 'echarts/lib/chart/bar'
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'babel-polyfill'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import animate from 'animate.css'
import VueI18n from 'vue-i18n'
import BaiduMap from 'vue-baidu-map'

// 组件
import BorderLeft from './components/BorderLeft.vue'
import BorderRight from './components/BorderRight.vue'

import global_ from './components/Global'
Vue.prototype.GLOBAL = global_

Vue.config.productionTip = false
Vue.use(ElementUI, {
  i18n: (key, value) => i18n.t(key, value)
})
Vue.use(VueAxios, axios)
Vue.use(VXETable)
Vue.use(animate)
Vue.use(VueAwesomeSwiper /* { default global options } */)
Vue.use(VueI18n)
Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: 'qw85SoGjGEBX62CTN0Vfp8Lz8mg5vExr'
})
VXETable.use(VXETablePluginExportXLSX)
VXETable.use(VXETablePluginElement)
Vue.component(CollapseTransition.name, CollapseTransition)
Vue.prototype.$md5 = md5
Vue.prototype.$axios = axios
Vue.prototype.$ = jquery
Vue.prototype.$echarts = echarts
Vue.component('BorderLeft', BorderLeft)
Vue.component('BorderRight', BorderRight)

const i18n = new VueI18n({
  locale: localStorage.lang || 'zh',
  messages: {
    'zh': { ...zh, ...zhLocale },
    'en': { ...en, ...enLocale },
    'zh-TW': { ...zhTwLocale }
  }
})
new Vue({
  strict: false,
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
