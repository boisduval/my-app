import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    redirect: '/main',
    children: [
      {
        path: '/main',
        name: 'main',
        component: () => import(/* webpackChunkName: "main" */ '../views/Main.vue')
      },
      {
        path: '/screen',
        name: 'screen',
        component: () => import(/* webpackChunkName: "screen" */ '../views/Screen.vue')
      },
      {
        path: '/deviceifo',
        name: 'deviceifo',
        component: () => import(/* webpackChunkName: "deviceifo" */ '../views/DeviceIfo.vue')
      },
      {
        path: '/deviceManage',
        name: 'deviceManage',
        component: () => import(/* webpackChunkName: "deviceManage" */ '../views/DeviceManage.vue')
      },
      {
        path: '/deviceDetail',
        name: 'deviceDetail',
        component: () => import(/* webpackChunkName: "deviceDetail" */ '../views/DeviceDetail.vue'),
        children: [
          {
            path: '',
            name: 'DTUInfo',
            component: () => import(/* webpackChunkName: "DTUInfo" */ '../views/DTUInfo.vue')
          },
          {
            path: 'ControllerInfo',
            name: 'ControllerInfo',
            component: () => import(/* webpackChunkName: "ControllerInfo" */ '../views/ControllerInfo.vue')
          },
          {
            path: 'BmsInfo',
            name: 'BmsInfo',
            component: () => import(/* webpackChunkName: "BmsInfo" */ '../views/BmsInfo.vue')
          },
          {
            path: 'BatteryInfo',
            name: 'BatteryInfo',
            component: () => import(/* webpackChunkName: "BatteryInfo" */ '../views/BatteryInfo.vue')
          },
          {
            path: 'TemperatureInfo',
            name: 'TemperatureInfo',
            component: () => import(/* webpackChunkName: "TemperatureInfo" */ '../views/TemperatureInfo.vue')
          }
        ]
      },
      {
        path: '/batterDetail',
        name: 'batterDetail',
        component: () => import(/* webpackChunkName: "BatterDetail" */ '../views/BatterDetail.vue')
      },
      {
        path: '/stateDetail',
        name: 'stateDetail',
        component: () => import(/* webpackChunkName: "StateDetail" */ '../views/StateDetail.vue')
      },
      {
        path: '/selfInspection',
        name: 'selfInspection',
        component: () => import(/* webpackChunkName: "SelfInspection" */ '../views/SelfInspection.vue')
      },
      {
        path: '/batteryType',
        name: 'batteryType',
        component: () => import(/* webpackChunkName: "BatterManageBatteryType" */ '../views/BatterManage/BatteryType.vue')
      },
      {
        path: '/batterManage',
        name: 'batterManage',
        component: () => import(/* webpackChunkName: "BatterManageBatterManage" */ '../views/BatterManage/BatterManage.vue')
      },
      {
        path: '/batterInfo',
        name: 'batterInfo',
        component: () => import(/* webpackChunkName: "BatterManageBatterInfo" */ '../views/BatterManage/BatterInfo.vue')
      },
      {
        path: '/temperatureManage',
        name: 'temperatureManage',
        component: () => import(/* webpackChunkName: "BatterManageTemperatureManage" */ '../views/BatterManage/TemperatureManage.vue')
      },
      {
        path: '/temperatureInfo',
        name: 'temperatureInfo',
        component: () => import(/* webpackChunkName: "BatterManageTemperatureInfo" */ '../views/BatterManage/TemperatureInfo.vue')
      },
      {
        path: '/systemControl',
        name: 'systemControl',
        component: () => import(/* webpackChunkName: "BatterManageSystemControl" */ '../views/BatterManage/SystemControl.vue')
      },
      {
        path: '/thresholdSetting',
        name: 'thresholdSetting',
        component: () => import(/* webpackChunkName: "BatterManageThresholdSetting" */ '../views/BatterManage/ThresholdSetting.vue')
      },
      {
        path: '/workThreshold',
        name: 'workThreshold',
        component: () => import(/* webpackChunkName: "BatterManageWorkThreshold" */ '../views/BatterManage/WorkThreshold.vue')
      },
      {
        path: '/dayReport',
        name: 'dayReport',
        component: () => import(/* webpackChunkName: "StatementDayReport" */ '../views/Statement/DayReport.vue')
      },
      {
        path: '/weekReport',
        name: 'weekReport',
        component: () => import(/* webpackChunkName: "StatementWeekReport" */ '../views/Statement/WeekReport.vue')
      },
      {
        path: '/monthReport',
        name: 'monthReport',
        component: () => import(/* webpackChunkName: "StatementMonthReport" */ '../views/Statement/MonthReport.vue')
      },
      {
        path: '/yeerReport',
        name: 'yeerReport',
        component: () => import(/* webpackChunkName: "StatementYeerReport" */ '../views/Statement/YeerReport.vue')
      },
      {
        path: '/alarmReport',
        name: 'alarmReport',
        component: () => import(/* webpackChunkName: "StatementAlarmReport" */ '../views/Statement/AlarmReport.vue')
      },
      {
        path: '/alarmRealTime',
        name: 'alarmRealTime',
        component: () => import(/* webpackChunkName: "AlarmAlarmRealTime" */ '../views/Alarm/AlarmRealTime.vue')
      },
      {
        path: '/alarmhistory',
        name: 'alarmhistory',
        component: () => import(/* webpackChunkName: "AlarmAlarmhistory" */ '../views/Alarm/Alarmhistory.vue')
      },
      {
        path: '/peakAndValleyPrice',
        name: 'peakAndValleyPrice',
        component: () => import(/* webpackChunkName: "SystemManagementPeakAndValleyPrice" */ '../views/SystemManagement/PeakAndValleyPrice.vue')
      },
      {
        path: '/meunManagement',
        name: 'meunManagement',
        component: () => import(/* webpackChunkName: "SystemManagementMeunManagement" */ '../views/SystemManagement/MeunManagement.vue')
      },
      {
        path: '/dicSystem',
        name: 'dicSystem',
        component: () => import(/* webpackChunkName: "SystemManagementDicSystem" */ '../views/SystemManagement/DicSystem.vue')
      },
      {
        path: '/dictionaryData',
        name: 'dictionaryData',
        component: () => import(/* webpackChunkName: "SystemManagementDictionaryData" */ '../views/SystemManagement/DictionaryData.vue')
      },
      {
        path: '/monitoring',
        name: 'monitoring',
        component: () => import(/* webpackChunkName: "SystemManagementMonitoring" */ '../views/SystemManagement/Monitoring.vue')
      },
      {
        path: '/perFormance',
        name: 'perFormance',
        component: () => import(/* webpackChunkName: "SystemManagementPerFormance" */ '../views/SystemManagement/PerFormance.vue')
      },
      {
        path: '/helpList',
        name: 'helpList',
        component: () => import(/* webpackChunkName: "SystemManagementHelpList" */ '../views/SystemManagement/HelpList.vue')
      },
      {
        path: '/usersManagement',
        name: 'usersManagement',
        component: () => import(/* webpackChunkName: "UsersManagement" */ '../views/UserManagement/UsersManagement.vue')
      },
      {
        path: '/roleManagement',
        name: 'roleManagement',
        component: () => import(/* webpackChunkName: "RoleManagement" */ '../views/UserManagement/RoleManagement.vue')
      },
      {
        path: '/departmentation',
        name: 'departmentation',
        component: () => import(/* webpackChunkName: "Departmentation" */ '../views/UserManagement/Departmentation.vue')
      },
      {
        path: '/active',
        name: 'active',
        component: () => import(/* webpackChunkName: "Active" */ '../views/UserManagement/Active.vue')
      },
      {
        path: '/loginAbnormal',
        name: 'loginAbnormal',
        component: () => import(/* webpackChunkName: "LoginAbnormal" */ '../views/UserManagement/LoginAbnormal.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  }
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

router.beforeEach((to, from, next) => {
  // ...
  if (to.name === 'login') {
    next()
  } else {
    var AutoSystemID = sessionStorage.getItem('AutoSystemID')
    if (AutoSystemID) {
      next()
    } else {
      router.push('/login')
    }
  }
})

export default router
