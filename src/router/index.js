import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import ErrorPage from '../views/ErrorPage.vue'
import ViewUI from 'view-design'
Vue.use(ViewUI)

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
        component: () => import(/* webpackChunkName: "mainPage" */ '../views/Main.vue'),
        meta: {
          keepAlive: false // 需要被缓存
        }
      },

      {
        path: '/deviceifo',
        name: 'deviceifo',
        component: () => import(/* webpackChunkName: "deviceifo" */ '../views/Device/DeviceIfo.vue'),
        meta: {
          keepAlive: false // 需要被缓存
        }
      },
      {
        path: '/deviceParams',
        name: 'deviceParams',
        component: () => import(/* webpackChunkName: "DeviceParams" */ '../views/Device/DeviceParams.vue'),
        meta: {
          keepAlive: false // 需要被缓存
        }
      },
      {
        path: '/deviceManage',
        name: 'deviceManage',
        component: () => import(/* webpackChunkName: "deviceManage" */ '../views/Device/DeviceManage.vue'),
        meta: {
          keepAlive: false // 需要被缓存
        }
      },
      {
        path: '/equipmentManage',
        name: 'equipmentManage',
        component: () => import(/* webpackChunkName: "EquipmentManage" */ '../views/Device/EquipmentManage.vue'),
        meta: {
          keepAlive: false // 需要被缓存
        }
      },
      {
        path: '/deviceDetail',
        name: 'deviceDetail',
        component: () => import(/* webpackChunkName: "deviceDetail" */ '../views/Device/DeviceDetail.vue'),
        meta: {
          keepAlive: false // 不需要被缓存
        },
        children: [
          {
            path: '',
            name: 'EquipmentInfo',
            component: () => import(/* webpackChunkName: "EquipmentInfo" */ '../views/Device/EquipmentInfo.vue'),
            meta: {
              keepAlive: false // 不需要被缓存
            }
          },
          {
            path: 'NetworkParams',
            name: 'NetworkParams',
            component: () => import(/* webpackChunkName: "NetworkParams" */ '../views/Device/NetworkParams.vue'),
            meta: {
              keepAlive: false // 不需要被缓存
            }
          },
          {
            path: 'ExpandParams',
            name: 'ExpandParams',
            component: () => import(/* webpackChunkName: "ExpandParams" */ '../views/Device/ExpandParams.vue'),
            meta: {
              keepAlive: false // 不需要被缓存
            }
          },
          {
            path: 'SerialParams',
            name: 'SerialParams',
            component: () => import(/* webpackChunkName: "SerialParams" */ '../views/Device/SerialParams.vue'),
            meta: {
              keepAlive: false // 不需要被缓存
            }
          },
          {
            path: 'MountedParams',
            name: 'MountedParams',
            component: () => import(/* webpackChunkName: "MountedParams" */ '../views/Device/MountedParams.vue'),
            meta: {
              keepAlive: false // 不需要被缓存
            }
          },
          {
            path: 'PreBatteryParams',
            name: 'PreBatteryParams',
            component: () => import(/* webpackChunkName: "PreBatteryParams" */ '../views/Device/PreBatteryParams.vue'),
            meta: {
              keepAlive: false // 不需要被缓存
            }
          },
          {
            path: 'BatteryParams',
            name: 'BatteryParams',
            component: () => import(/* webpackChunkName: "BatteryParams" */ '../views/Device/BatteryParams.vue'),
            meta: {
              keepAlive: false // 不需要被缓存
            }
          }
        ]
      },
      {
        path: '/batterDetail',
        name: 'batterDetail',
        component: () => import(/* webpackChunkName: "BatterDetail" */ '../views/Device/BatterDetail.vue'),
        meta: {
          keepAlive: false // 需要被缓存
        }
      },
      {
        path: '/stateDetail',
        name: 'stateDetail',
        component: () => import(/* webpackChunkName: "StateDetail" */ '../views/Device/StateDetail.vue'),
        meta: {
          keepAlive: false // 需要被缓存
        }
      },
      {
        path: '/funcInfo',
        name: 'funcInfo',
        component: () => import(/* webpackChunkName: "FuncInfo" */ '../views/Device/FuncInfo.vue'),
        meta: {
          keepAlive: false // 需要被缓存
        }
      },
      {
        path: '/cmdList',
        name: 'cmdList',
        component: () => import(/* webpackChunkName: "CmdList" */ '../views/Device/CmdList.vue'),
        meta: {
          keepAlive: false // 需要被缓存
        }
      },
      {
        path: '/register',
        name: 'register',
        component: () => import(/* webpackChunkName: "Register" */ '../views/Device/Register.vue'),
        meta: {
          keepAlive: false // 需要被缓存
        }
      },
      {
        path: '/selfInspection',
        name: 'selfInspection',
        component: () => import(/* webpackChunkName: "SelfInspection" */ '../views/Device/SelfInspection.vue'),
        meta: {
          keepAlive: false // 需要被缓存
        }
      },
      {
        path: '/onlineDevice',
        name: 'onlineDevice',
        component: () => import(/* webpackChunkName: "OnlineDevice" */ '../views/Device/OnlineDevice.vue'),
        meta: {
          keepAlive: false // 需要被缓存
        }
      },
      {
        path: '/deviceUpgrade',
        name: 'deviceUpgrade',
        component: () => import(/* webpackChunkName: "DeviceUpgrade" */ '../views/Device/DeviceUpgrade.vue'),
        meta: {
          keepAlive: false // 需要被缓存
        }
      },
      {
        path: '/realtimeData',
        name: 'realtimeData',
        component: () => import(/* webpackChunkName: "RealtimeData" */ '../views/Device/RealtimeData.vue'),
        meta: {
          keepAlive: false // 需要被缓存
        }
      },
      {
        path: '/batteryType',
        name: 'batteryType',
        component: () => import(/* webpackChunkName: "BatterManageBatteryType" */ '../views/BatterManage/BatteryType.vue'),
        meta: {
          keepAlive: false // 需要被缓存
        }
      },
      {
        path: '/batterManage',
        name: 'batterManage',
        component: () => import(/* webpackChunkName: "BatterManageBatterManage" */ '../views/BatterManage/BatterManage.vue'),
        meta: {
          keepAlive: false // 需要被缓存
        }
      },
      {
        path: '/batterInfo',
        name: 'batterInfo',
        component: () => import(/* webpackChunkName: "BatterManageBatterInfo" */ '../views/BatterManage/BatterInfo.vue'),
        meta: {
          keepAlive: false // 需要被缓存
        }
      },
      {
        path: '/temperatureManage',
        name: 'temperatureManage',
        component: () => import(/* webpackChunkName: "TemperatureManage" */ '../views/BatterManage/TemperatureManage.vue'),
        meta: {
          keepAlive: false // 需要被缓存
        }
      },
      {
        path: '/temperatureInfo',
        name: 'temperatureInfo',
        component: () => import(/* webpackChunkName: "TemperatureInfo" */ '../views/BatterManage/TemperatureInfo.vue'),
        meta: {
          keepAlive: false // 需要被缓存
        }
      },
      {
        path: '/systemControl',
        name: 'systemControl',
        component: () => import(/* webpackChunkName: "SystemControl" */ '../views/BatterManage/SystemControl.vue'),
        meta: {
          keepAlive: false // 需要被缓存
        }
      },
      {
        path: '/thresholdSetting',
        name: 'thresholdSetting',
        component: () => import(/* webpackChunkName: "ThresholdSetting" */ '../views/BatterManage/ThresholdSetting.vue'),
        meta: {
          keepAlive: false // 需要被缓存
        }
      },
      {
        path: '/workThreshold',
        name: 'workThreshold',
        component: () => import(/* webpackChunkName: "WorkThreshold" */ '../views/BatterManage/WorkThreshold.vue'),
        meta: {
          keepAlive: false // 需要被缓存
        }
      },
      {
        path: '/batteryAlarm',
        name: 'batteryAlarm',
        component: () => import(/* webpackChunkName: "BatterManageBatteryAlarm" */ '../views/BatterManage/BatteryAlarm.vue'),
        meta: {
          keepAlive: false // 需要被缓存
        }
      },
      {
        path: '/firstAlarm',
        name: 'firstAlarm',
        component: () => import(/* webpackChunkName: "BatterManageFirstAlarm" */ '../views/BatterManage/FirstAlarm.vue'),

        meta: {
          keepAlive: false // 不需要缓存
        }
      },
      {
        path: '/vAlarm',
        name: 'vAlarm',
        component: () => import(/* webpackChunkName: "BatterManageVAlarm" */ '../views/BatterManage/VAlarm.vue'),

        meta: {
          keepAlive: false // 不需要缓存
        }
      },
      {
        path: '/batteryState',
        name: 'batteryState',
        component: () => import(/* webpackChunkName: "BatterManageBatteryState" */ '../views/BatterManage/BatteryState.vue'),

        meta: {
          keepAlive: false // 需要缓存
        }
      },
      {
        path: '/stateInfo',
        name: 'stateInfo',
        component: () => import(/* webpackChunkName: "BatterManageStateInfo" */ '../views/BatterManage/StateInfo.vue'),

        meta: {
          keepAlive: false // 需要缓存
        }
      },
      {
        path: '/dataVisual',
        name: 'dataVisual',
        component: () => import(/* webpackChunkName: "DataVisual" */ '../views/BatterManage/DataVisual.vue'),

        meta: {
          keepAlive: false // 需要缓存
        }
      },
      {
        path: '/batterySummary',
        name: 'batterySummary',
        component: () => import(/* webpackChunkName: "BatterySummary" */ '../views/BatterManage/BatterySummary.vue'),
        meta: {
          keepAlive: false // 需要缓存
        },
        children: [
          {
            path: '/',
            name: 'batterySummaryStateTvpbc',
            component: () => import(/* webpackChunkName: "BatterySummaryStateTvpbc" */ '../views/BatterManage/BatterySummaryStateTvpbc.vue'),
            meta: {
              keepAlive: false // 需要缓存
            }
          },
          {
            path: '/batterySummary/batterySummaryStateCitm',
            name: 'batterySummaryStateCitm',
            component: () => import(/* webpackChunkName: "BatterySummaryStateCitm" */ '../views/BatterManage/BatterySummaryStateCitm.vue'),
            meta: {
              keepAlive: false // 需要缓存
            }
          },
          {
            path: '/batterySummary/batterySummaryStateOb',
            name: 'batterySummaryStateOb',
            component: () => import(/* webpackChunkName: "BatterySummaryStateOb" */ '../views/BatterManage/BatterySummaryStateOb.vue'),
            meta: {
              keepAlive: false // 需要缓存
            }
          },
          {
            path: '/batterySummary/batterySummaryStateHvenpc',
            name: 'batterySummaryStateHvenpc',
            component: () => import(/* webpackChunkName: "BatterySummaryStateHvenpc" */ '../views/BatterManage/BatterySummaryStateHvenpc.vue'),
            meta: {
              keepAlive: false // 需要缓存
            }
          },
          {
            path: '/batterySummary/batterySummaryStateMbt',
            name: 'batterySummaryStateMbt',
            component: () => import(/* webpackChunkName: "BatterySummaryStateMbt" */ '../views/BatterManage/BatterySummaryStateMbt.vue'),
            meta: {
              keepAlive: false // 需要缓存
            }
          },
          {
            path: '/batterySummary/batterySummaryStateHircn',
            name: 'batterySummaryStateHircn',
            component: () => import(/* webpackChunkName: "BatterySummaryStateHircn" */ '../views/BatterManage/BatterySummaryStateHircn.vue'),
            meta: {
              keepAlive: false // 需要缓存
            }
          },
          {
            path: '/batterySummary/batterySummaryStatePeiv',
            name: 'batterySummaryStatePeiv',
            component: () => import(/* webpackChunkName: "BatterySummaryStatePeiv" */ '../views/BatterManage/BatterySummaryStatePeiv.vue'),
            meta: {
              keepAlive: false // 需要缓存
            }
          }
        ]
      },
      {
        path: '/selfCheck',
        name: 'selfCheck',
        component: () => import(/* webpackChunkName: "BatterManageSelfCheck" */ '../views/BatterManage/SelfCheck.vue'),

        meta: {
          keepAlive: false // 不需要缓存
        }
      },
      {
        path: '/batteryRealtime',
        name: 'batteryRealtime',
        component: () => import(/* webpackChunkName: "BatteryRealtime" */ '../views/BatterManage/BatteryRealtime.vue'),

        meta: {
          keepAlive: false // 不需要缓存
        }
      },
      // {
      //   path: '/dayReport',
      //   name: 'dayReport',
      //   component: () => import(/* webpackChunkName: "StatementDayReport" */ '../views/Statement/DayReport.vue'),
      //   meta: {
      //     keepAlive: false // 需要被缓存
      //   }
      // },
      // {
      //   path: '/weekReport',
      //   name: 'weekReport',
      //   component: () => import(/* webpackChunkName: "StatementWeekReport" */ '../views/Statement/WeekReport.vue'),
      //   meta: {
      //     keepAlive: false // 需要被缓存
      //   }
      // },
      // {
      //   path: '/monthReport',
      //   name: 'monthReport',
      //   component: () => import(/* webpackChunkName: "StatementMonthReport" */ '../views/Statement/MonthReport.vue'),
      //   meta: {
      //     keepAlive: false // 需要被缓存
      //   }
      // },
      // {
      //   path: '/yearReport',
      //   name: 'yearReport',
      //   component: () => import(/* webpackChunkName: "StatementYearReport" */ '../views/Statement/YearReport.vue'),
      //   meta: {
      //     keepAlive: false // 需要被缓存
      //   }
      // },
      // {
      //   path: '/alarmReport',
      //   name: 'alarmReport',
      //   component: () => import(/* webpackChunkName: "StatementAlarmReport" */ '../views/Statement/AlarmReport.vue'),
      //   meta: {
      //     keepAlive: false // 需要被缓存
      //   }
      // },
      {
        path: '/batteryReport',
        name: 'batteryReport',
        component: () => import(/* webpackChunkName: "StatementBatteryReport" */ '../views/Statement/BatteryReport.vue'),
        meta: {
          keepAlive: false // 需要被缓存
        }
      },
      {
        path: '/pcsReport',
        name: 'pcsReport',
        component: () => import(/* webpackChunkName: "StatementPcsReport" */ '../views/Statement/PcsReport.vue'),
        meta: {
          keepAlive: false // 需要被缓存
        }
      },
      {
        path: '/abnormalReport',
        name: 'abnormalReport',
        component: () => import(/* webpackChunkName: "StatementAbnormalReport" */ '../views/Statement/AbnormalReport.vue'),
        meta: {
          keepAlive: false // 需要被缓存
        }
      },
      {
        path: '/alarmRealTime',
        name: 'alarmRealTime',
        component: () => import(/* webpackChunkName: "AlarmAlarmRealTime" */ '../views/Alarm/AlarmRealTime.vue'),
        meta: {
          keepAlive: false // 需要被缓存
        }
      },
      {
        path: '/alarmhistory',
        name: 'alarmhistory',
        component: () => import(/* webpackChunkName: "AlarmAlarmhistory" */ '../views/Alarm/Alarmhistory.vue'),
        meta: {
          keepAlive: false // 需要被缓存
        }
      },
      {
        path: '/peakAndValleyPrice',
        name: 'peakAndValleyPrice',
        component: () => import(/* webpackChunkName: "SystemManagementPeakAndValleyPrice" */ '../views/SystemManagement/PeakAndValleyPrice.vue'),
        meta: {
          keepAlive: false // 需要被缓存
        }
      },
      {
        path: '/meunManagement',
        name: 'meunManagement',
        component: () => import(/* webpackChunkName: "SystemManagementMeunManagement" */ '../views/SystemManagement/MeunManagement.vue'),
        meta: {
          keepAlive: false // 需要被缓存
        }
      },
      {
        path: '/dicSystem',
        name: 'dicSystem',
        component: () => import(/* webpackChunkName: "SystemManagementDicSystem" */ '../views/SystemManagement/DicSystem.vue'),
        meta: {
          keepAlive: false // 需要被缓存
        }
      },
      {
        path: '/dictionaryData',
        name: 'dictionaryData',
        component: () => import(/* webpackChunkName: "SystemManagementDictionaryData" */ '../views/SystemManagement/DictionaryData.vue'),
        meta: {
          keepAlive: false // 不需要被缓存
        }
      },
      {
        path: '/monitoring',
        name: 'monitoring',
        component: () => import(/* webpackChunkName: "SystemManagementMonitoring" */ '../views/SystemManagement/Monitoring.vue'),
        meta: {
          keepAlive: false // 需要被缓存
        }
      },
      {
        path: '/perFormance',
        name: 'perFormance',
        component: () => import(/* webpackChunkName: "SystemManagementPerFormance" */ '../views/SystemManagement/PerFormance.vue'),
        meta: {
          keepAlive: false // 需要被缓存
        },
        children: [
          {
            path: 'HistoryMonitor',
            name: 'HistoryMonitor',
            component: () => import(/* webpackChunkName: "HistoryMonitor" */ '../views/SystemManagement/HistoryMonitor.vue'),
            meta: {
              keepAlive: false // 不需要被缓存
            }
          },
          {
            path: '',
            name: 'RealtimeMonitor',
            component: () => import(/* webpackChunkName: "RealtimeMonitor" */ '../views/SystemManagement/RealtimeMonitor.vue'),
            meta: {
              keepAlive: false // 不需要被缓存
            }
          }
        ]
      },
      {
        path: '/helpList',
        name: 'helpList',
        component: () => import(/* webpackChunkName: "SystemManagementHelpList" */ '../views/SystemManagement/HelpList.vue'),
        meta: {
          keepAlive: false // 需要被缓存
        }
      },
      {
        path: '/tokenManage',
        name: 'tokenManage',
        component: () => import(/* webpackChunkName: "SystemManagementTokenManage" */ '../views/SystemManagement/TokenManage.vue'),
        meta: {
          keepAlive: false // 需要被缓存
        }
      },
      {
        path: '/usersManagement',
        name: 'usersManagement',
        component: () => import(/* webpackChunkName: "UsersManagement" */ '../views/UserManagement/UsersManagement.vue'),
        meta: {
          keepAlive: false // 需要被缓存
        }
      },
      {
        path: '/roleManagement',
        name: 'roleManagement',
        component: () => import(/* webpackChunkName: "RoleManagement" */ '../views/UserManagement/RoleManagement.vue'),
        meta: {
          keepAlive: false // 需要被缓存
        }
      },
      {
        path: '/departmentation',
        name: 'departmentation',
        component: () => import(/* webpackChunkName: "Departmentation" */ '../views/UserManagement/Departmentation.vue'),
        meta: {
          keepAlive: false // 需要被缓存
        }
      },
      {
        path: '/active',
        name: 'active',
        component: () => import(/* webpackChunkName: "Active" */ '../views/UserManagement/Active.vue'),
        meta: {
          keepAlive: false // 需要被缓存
        }
      },
      {
        path: '/loginAbnormal',
        name: 'loginAbnormal',
        component: () => import(/* webpackChunkName: "LoginAbnormal" */ '../views/UserManagement/LoginAbnormal.vue'),
        meta: {
          keepAlive: false // 需要被缓存
        }
      },
      {
        path: '/mailBox',
        name: 'mailBox',
        component: () => import(/* webpackChunkName: "mailBox" */ '../views/Mail/MailBox.vue'),
        meta: {
          keepAlive: false // 需要被缓存
        }
      },
      {
        path: '/users',
        name: 'users',
        component: () => import(/* webpackChunkName: "Users" */ '../views/Log/Users.vue'),
        meta: {
          keepAlive: false // 需要被缓存
        }
      },
      {
        path: '/systemLog',
        name: 'systemLog',
        component: () => import(/* webpackChunkName: "SystemLog" */ '../views/Log/SystemLog.vue'),
        meta: {
          keepAlive: false // 需要被缓存
        }
      },
      {
        path: '/hardware',
        name: 'hardware',
        component: () => import(/* webpackChunkName: "Hardware" */ '../views/Log/Hardware.vue'),
        meta: {
          keepAlive: false // 需要被缓存
        }
      },
      {
        path: '/exception',
        name: 'exception',
        component: () => import(/* webpackChunkName: "Exception" */ '../views/Log/Exception.vue'),
        meta: {
          keepAlive: false // 需要被缓存
        }
      },
      {
        path: '/menmorandumListWaitLoad',
        name: 'menmorandumListWaitLoad',
        component: () => import(/* webpackChunkName: "MenmorandumListWaitLoad" */ '../views/Menmorandum/MenmorandumListWaitLoad.vue'),
        meta: {
          keepAlive: false // 需要被缓存
        }
      },
      {
        path: '/menmorandumListOverLoad',
        name: 'menmorandumListOverLoad',
        component: () => import(/* webpackChunkName: "MenmorandumListOverLoad" */ '../views/Menmorandum/MenmorandumListOverLoad.vue'),
        meta: {
          keepAlive: false // 需要被缓存
        }
      },
      {
        path: '/CPUMonitor',
        name: 'CPUMonitor',
        component: () => import(/* webpackChunkName: "CPUMonitor" */ '../views/RealtimeMonitor/CPUMonitor.vue'),
        meta: {
          keepAlive: false // 不需要被缓存
        }
      },
      {
        path: '/diskMonitor',
        name: 'diskMonitor',
        component: () => import(/* webpackChunkName: "DiskMonitor" */ '../views/RealtimeMonitor/DiskMonitor.vue'),
        meta: {
          keepAlive: false // 不需要被缓存
        }
      },
      {
        path: '/memoryMonitor',
        name: 'memoryMonitor',
        component: () => import(/* webpackChunkName: "MemoryMonitor" */ '../views/RealtimeMonitor/MemoryMonitor.vue'),
        meta: {
          keepAlive: false // 不需要被缓存
        }
      },
      {
        path: '/othersMonitor',
        name: 'othersMonitor',
        component: () => import(/* webpackChunkName: "OthersMonitor" */ '../views/RealtimeMonitor/OthersMonitor.vue'),
        meta: {
          keepAlive: false // 不需要被缓存
        }
      },
      {
        path: '/networkMonitor',
        name: 'networkMonitor',
        component: () => import(/* webpackChunkName: "NetworkMonitor" */ '../views/RealtimeMonitor/NetworkMonitor.vue'),
        meta: {
          keepAlive: false // 不需要被缓存
        }
      },
      {
        path: '/systemMonitor',
        name: 'systemMonitor',
        component: () => import(/* webpackChunkName: "SystemMonitor" */ '../views/RealtimeMonitor/SystemMonitor.vue'),
        meta: {
          keepAlive: false // 不需要被缓存
        }
      },
      {
        path: '/CPUHistoryMonitor',
        name: 'CPUHistoryMonitor',
        component: () => import(/* webpackChunkName: "CPUHistoryMonitor" */ '../views/HistoryMonitor/CPUHistoryMonitor.vue'),
        meta: {
          keepAlive: false // 不需要被缓存
        }
      },
      {
        path: '/diskHistoryMonitor',
        name: 'diskHistoryMonitor',
        component: () => import(/* webpackChunkName: "DiskHistoryMonitor" */ '../views/HistoryMonitor/DiskHistoryMonitor.vue'),
        meta: {
          keepAlive: false // 不需要被缓存
        }
      },
      {
        path: '/memoryHistoryMonitor',
        name: 'memoryHistoryMonitor',
        component: () => import(/* webpackChunkName: "MemoryHistoryMonitor" */ '../views/HistoryMonitor/MemoryHistoryMonitor.vue'),
        meta: {
          keepAlive: false // 不需要被缓存
        }
      },
      {
        path: '/othersHistoryMonitor',
        name: 'othersHistoryMonitor',
        component: () => import(/* webpackChunkName: "OthersHistoryMonitor" */ '../views/HistoryMonitor/OthersHistoryMonitor.vue'),
        meta: {
          keepAlive: false // 不需要被缓存
        }
      },
      {
        path: '/networkHistoryMonitor',
        name: 'networkHistoryMonitor',
        component: () => import(/* webpackChunkName: "NetworkHistoryMonitor" */ '../views/HistoryMonitor/NetworkHistoryMonitor.vue'),
        meta: {
          keepAlive: false // 不需要被缓存
        }
      },
      {
        path: '/systemHistoryMonitor',
        name: 'systemHistoryMonitor',
        component: () => import(/* webpackChunkName: "SystemHistoryMonitor" */ '../views/HistoryMonitor/SystemHistoryMonitor.vue'),
        meta: {
          keepAlive: false // 不需要被缓存
        }
      },
      {
        path: '/upsInfo',
        name: 'upsInfo',
        component: () => import(/* webpackChunkName: "UPSInfo" */ '../views/UPS/UPSInfo.vue'),
        meta: {
          keepAlive: false // 不需要被缓存
        }
      },
      {
        path: '/upsStandardStateQuantity',
        name: 'upsStandardStateQuantity',
        component: () => import(/* webpackChunkName: "UPSStandardStateQuantity" */ '../views/UPS/UPSStandardStateQuantity.vue'),
        meta: {
          keepAlive: false // 不需要被缓存
        }
      },
      {
        path: '/upsExtendedStateQuantity',
        name: 'upsExtendedStateQuantity',
        component: () => import(/* webpackChunkName: "UPSExtendedStateQuantity" */ '../views/UPS/UPSExtendedStateQuantity.vue'),
        meta: {
          keepAlive: false // 不需要被缓存
        }
      },
      {
        path: '/upsStandardAnalogQuery',
        name: 'upsStandardAnalogQuery',
        component: () => import(/* webpackChunkName: "UPSStandardAnalogQuery" */ '../views/UPS/UPSStandardAnalogQuery.vue'),
        meta: {
          keepAlive: false // 不需要被缓存
        }
      },
      {
        path: '/upsExtendedAnalogQuery',
        name: 'upsExtendedAnalogQuery',
        component: () => import(/* webpackChunkName: "UPSExtendedAnalogQuery" */ '../views/UPS/UPSExtendedAnalogQuery.vue'),
        meta: {
          keepAlive: false // 不需要被缓存
        }
      },
      {
        path: '/upsSet',
        name: 'upsSet',
        component: () => import(/* webpackChunkName: "UPSSet" */ '../views/UPS/UPSSet.vue'),
        meta: {
          keepAlive: false // 不需要被缓存
        }
      },
      {
        path: '/help',
        name: 'help',
        component: () => import(/* webpackChunkName: "Help" */ '../views/About/Help.vue'),
        meta: {
          keepAlive: false // 不需要被缓存
        }
      },
      {
        path: '/contactUs',
        name: 'contactUs',
        component: () => import(/* webpackChunkName: "ContactUs" */ '../views/About/ContactUs.vue'),
        meta: {
          keepAlive: false // 不需要被缓存
        }
      },
      {
        path: '/about',
        name: 'about',
        component: () => import(/* webpackChunkName: "About" */ '../views/About/About.vue'),
        meta: {
          keepAlive: false // 不需要被缓存
        }
      },
      {
        path: '/realTime',
        name: 'realTime',
        component: () => import(/* webpackChunkName: "Help" */ '../views/Pcs/RealTime.vue'),
        meta: {
          keepAlive: false // 不需要被缓存
        }
      },
      {
        path: '/pcsInfo',
        name: 'pcsInfo',
        component: () => import(/* webpackChunkName: "PcsInfo" */ '../views/Pcs/PcsInfo.vue'),
        meta: {
          keepAlive: false // 不需要被缓存
        }
      },
      {
        path: '/pcsRealtime',
        name: 'pcsRealtime',
        component: () => import(/* webpackChunkName: "PcsRealtime" */ '../views/Pcs/PcsRealtime.vue'),
        meta: {
          keepAlive: false // 不需要被缓存
        }
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '*',
    name: 'errorPage',
    component: ErrorPage,
    meta: { title: '页面走丢了' }
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
  mode: 'history',
  base: process.env.BASE_URL
})

router.beforeEach((to, from, next) => {
  // ...
  ViewUI.LoadingBar.start()
  if (to.name === 'login') {
    next()
  } else {
    var AutoSystemID = localStorage.getItem('AutoSystemID')
    if (AutoSystemID) {
      next()
    } else {
      router.push('/login')
    }
  }
})

router.afterEach(route => {
  ViewUI.LoadingBar.finish()
})

export default router
