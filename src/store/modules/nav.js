const state = {
  asideItem: [
    { // 显示首页
      ID: '637032130932778696',
      Href: '/',
      Class: 'fa fa-home',
      Text: '显示首页',
      SOrder: 1090000,
      ShowNum: '0',
      Use: true,
      LeveList: {
        Count: 2,
        List: [
          {
            ID: '637032132192732124',
            MID: '637032130932778696',
            Href: 'main',
            Class: 'J_menuItem',
            DataIndex: '1000',
            Text: '首页显示',
            Use: true
          }

        ]
      }
    },
    { // 我的设备
      ID: '3',
      Href: '/',
      Class: 'fa fa-instagram',
      Text: '我的设备',
      SOrder: 1200000,
      ShowNum: '0',
      Use: true,
      LeveList: {
        Count: 6,
        List: [
          {
            ID: '7',
            MID: '3',
            Href: 'deviceParams',
            Class: 'J_menuItem',
            DataIndex: '1000',
            Text: '设备参数',
            Use: true
          },
          {
            ID: '9',
            MID: '3',
            Href: 'deviceManage',
            Class: 'J_menuItem',
            DataIndex: '1000',
            Text: '设备管理',
            Use: true
          },
          {
            ID: '637043925293584115',
            MID: '3',
            Href: 'deviceifo',
            Class: 'J_menuItem',
            DataIndex: '1000',
            Text: '设备信息',
            Use: true
          },
          {
            ID: '10',
            MID: '3',
            Href: 'register',
            Class: 'J_menuItem',
            DataIndex: '1000',
            Text: '注册流水',
            Use: true
          },
          {
            ID: '12',
            MID: '3',
            Href: 'cmdList',
            Class: 'J_menuItem',
            DataIndex: '1000',
            Text: '命令流水',
            Use: true
          },
          {
            ID: '8',
            MID: '3',
            Href: 'selfInspection',
            Class: 'J_menuItem',
            DataIndex: '1000',
            Text: '自动召测',
            Use: true
          },
          {
            ID: '13',
            MID: '3',
            Href: 'onlineDevice',
            Class: 'J_menuItem',
            DataIndex: '1000',
            Text: '在线设备',
            Use: true
          },
          {
            ID: '13',
            MID: '3',
            Href: 'equipmentManage',
            Class: 'J_menuItem',
            DataIndex: '1000',
            Text: '项目管理',
            Use: true
          },
          {
            ID: '13',
            MID: '3',
            Href: 'deviceUpgrade',
            Class: 'J_menuItem',
            DataIndex: '1000',
            Text: '设备升级',
            Use: true
          },
          {
            ID: '13',
            MID: '3',
            Href: 'realtimeData',
            Class: 'J_menuItem',
            DataIndex: '1000',
            Text: '设备实时数据',
            Use: true
          }
        ]
      }
    },
    { // 电池管理
      ID: '637084646010653918',
      Href: '/',
      Class: 'fa fa-cubes',
      Text: '电池管理',
      SOrder: 1300000,
      ShowNum: '0',
      Use: true,
      LeveList: {
        Count: 8,
        List: [
          {
            ID: '637087532596344457',
            MID: '637084646010653918',
            Href: 'batteryType',
            Class: 'J_menuItem',
            DataIndex: '1000',
            Text: '电池类型',
            Use: true
          },
          {
            ID: '637087576046465195',
            MID: '637084646010653918',
            Href: 'batterManage',
            Class: 'J_menuItem',
            DataIndex: '1000',
            Text: '电池管理',
            Use: true
          },
          {
            ID: '637087576282428921',
            MID: '637084646010653918',
            Href: 'batterInfo',
            Class: 'J_menuItem',
            DataIndex: '1000',
            Text: '电池信息',
            Use: true
          },
          {
            ID: '637087576898242525',
            MID: '637084646010653918',
            Href: 'temperatureManage',
            Class: 'J_menuItem',
            DataIndex: '1000',
            Text: '温度管理',
            Use: true
          },
          {
            ID: '637087577177350501',
            MID: '637084646010653918',
            Href: 'temperatureInfo',
            Class: 'J_menuItem',
            DataIndex: '1000',
            Text: '温度信息',
            Use: true
          },
          {
            ID: '637084726044437714',
            MID: '637084646010653918',
            Href: 'systemControl',
            Class: 'J_menuItem',
            DataIndex: '1000',
            Text: '系统控制',
            Use: true
          },
          {
            ID: '637084862226802248',
            MID: '637084646010653918',
            Href: 'thresholdSetting',
            Class: 'J_menuItem',
            DataIndex: '1000',
            Text: '停机门限',
            Use: true
          },
          {
            ID: '637084863136927728',
            MID: '637084646010653918',
            Href: 'workThreshold',
            Class: 'J_menuItem',
            DataIndex: '1000',
            Text: '工作门限',
            Use: true
          },
          {
            ID: '637084863136927728',
            MID: '637084646010653918',
            Href: 'batteryAlarm',
            Class: 'J_menuItem',
            DataIndex: '1000',
            Text: '电池告警',
            Use: true
          },
          {
            ID: '637084863136927728',
            MID: '637084646010653918',
            Href: 'batteryState',
            Class: 'J_menuItem',
            DataIndex: '1000',
            Text: '电池状态',
            Use: true
          },
          {
            ID: '637084863136927728',
            MID: '637084646010653918',
            Href: 'stateInfo',
            Class: 'J_menuItem',
            DataIndex: '1000',
            Text: '状态信息',
            Use: true
          },
          {
            ID: '637084863136927728',
            MID: '637084646010653918',
            Href: 'batteryRealtime',
            Class: 'J_menuItem',
            DataIndex: '1000',
            Text: '电池实时数据',
            Use: true
          }
        ]
      }
    },
    { // 报表管理
      ID: '5',
      Href: '/',
      Class: 'fa fa-clipboard',
      Text: '报表管理',
      SOrder: 1400000,
      ShowNum: '0',
      Use: true,
      LeveList: {
        Count: 5,
        List: [
          // {
          //   ID: '13',
          //   MID: '5',
          //   Href: 'dayReport',
          //   Class: 'J_menuItem',
          //   DataIndex: '1000',
          //   Text: '设备日报表',
          //   Use: true
          // },
          // {
          //   ID: '14',
          //   MID: '5',
          //   Href: 'weekReport',
          //   Class: 'J_menuItem',
          //   DataIndex: '1000',
          //   Text: '设备周报表',
          //   Use: true
          // },
          // {
          //   ID: '15',
          //   MID: '5',
          //   Href: 'monthReport',
          //   Class: 'J_menuItem',
          //   DataIndex: '1000',
          //   Text: '设备月报表',
          //   Use: true
          // },
          // {
          //   ID: '16',
          //   MID: '5',
          //   Href: 'yearReport',
          //   Class: 'J_menuItem',
          //   DataIndex: '1000',
          //   Text: '设备年报表',
          //   Use: true
          // },
          // {
          //   ID: '17',
          //   MID: '5',
          //   Href: 'alarmReport',
          //   Class: 'J_menuItem',
          //   DataIndex: '1000',
          //   Text: '报警报表',
          //   Use: true
          // },
          {
            ID: '18',
            MID: '5',
            Href: 'batteryReport',
            Class: 'J_menuItem',
            DataIndex: '1000',
            Text: '电池报表',
            Use: true
          },
          {
            ID: '18',
            MID: '5',
            Href: 'pcsReport',
            Class: 'J_menuItem',
            DataIndex: '1000',
            Text: 'PCS电气报表',
            Use: true
          },
          {
            ID: '18',
            MID: '5',
            Href: 'pcsEarnings',
            Class: 'J_menuItem',
            DataIndex: '1000',
            Text: 'PCS收益报表',
            Use: true
          },
          {
            ID: '18',
            MID: '5',
            Href: 'abnormalReport',
            Class: 'J_menuItem',
            DataIndex: '1000',
            Text: '异常报表',
            Use: true
          }
        ]
      }
    },
    { // UPS管理
      ID: '637084647579493664',
      Href: 'Main.aspx',
      Class: 'fa fa-tasks',
      Text: 'UPS管理',
      SOrder: 1500000,
      ShowNum: '0',
      Use: true,
      LeveList: {
        Count: 0,
        List: [
          {
            ID: '18',
            MID: '6',
            Href: 'upsInfo',
            Class: 'J_menuItem',
            DataIndex: '1000',
            Text: 'UPS信息',
            Use: true
          },
          {
            ID: '18',
            MID: '6',
            Href: 'upsSet',
            Class: 'J_menuItem',
            DataIndex: '1000',
            Text: 'UPS设置',
            Use: true
          }
        ]
      }
    },
    { // ESS管理
      ID: '637084651199696764',
      Href: 'Main.aspx',
      Class: 'fa fa-tasks',
      Text: 'ESS管理',
      SOrder: 1700000,
      ShowNum: '0',
      Use: true,
      LeveList: {
        Count: 0,
        List: []
      }
    },
    { // 告警管理
      ID: '6',
      Href: 'Main.aspx',
      Class: 'fa fa-exclamation',
      Text: '告警管理',
      SOrder: 3000000,
      ShowNum: '0',
      Use: true,
      LeveList: {
        Count: 2,
        List: [
          {
            ID: '18',
            MID: '6',
            Href: 'alarmRealTime',
            Class: 'J_menuItem',
            DataIndex: '1000',
            Text: '实时告警',
            Use: true
          },
          {
            ID: '19',
            MID: '6',
            Href: 'alarmhistory',
            Class: 'J_menuItem',
            DataIndex: '1000',
            Text: '历史告警',
            Use: true
          }
        ]
      }
    },
    { // 系统管理
      ID: '7',
      Href: '/',
      Class: 'fa fa-cogs',
      Text: '系统管理',
      SOrder: 4000000,
      ShowNum: '0',
      Use: true,
      LeveList: {
        Count: 6,
        List: [
          {
            ID: '21',
            MID: '7',
            Href: 'peakAndValleyPrice',
            Class: 'J_menuItem',
            DataIndex: '1000',
            Text: '电价管理',
            Use: true
          },
          {
            ID: '50',
            MID: '7',
            Href: 'meunManagement',
            Class: 'J_menuItem',
            DataIndex: '1000',
            Text: '菜单管理',
            Use: true
          },
          {
            ID: '39',
            MID: '7',
            Href: 'dicSystem',
            Class: 'J_menuItem',
            DataIndex: '1000',
            Text: '配置字典',
            Use: true
          },
          {
            ID: '637043072846143531',
            MID: '7',
            Href: 'monitoring',
            Class: 'J_menuItem',
            DataIndex: '1000',
            Text: '系统监控',
            Use: true
          },
          {
            ID: '637048345358639920',
            MID: '7',
            Href: 'perFormance',
            Class: 'J_menuItem',
            DataIndex: '1000',
            Text: '系统性能',
            Use: true
          },
          {
            ID: '48',
            MID: '7',
            Href: 'helpList',
            Class: 'J_menuItem',
            DataIndex: '1000',
            Text: '配置帮助',
            Use: true
          },
          {
            ID: '48',
            MID: '7',
            Href: 'tokenManage',
            Class: 'J_menuItem',
            DataIndex: '1000',
            Text: '令牌管理',
            Use: true
          },
          {
            ID: '48',
            MID: '7',
            Href: 'serviceManage',
            Class: 'J_menuItem',
            DataIndex: '1000',
            Text: '服务条款',
            Use: true
          }
        ]
      }
    },
    { // 实时监控
      ID: '8',
      Href: '/',
      Class: 'fa fa-dashboard',
      Text: '实时监控',
      SOrder: 4000000,
      ShowNum: '0',
      Use: true,
      LeveList: {
        Count: 6,
        List: [
          {
            ID: '21',
            MID: '8',
            Href: 'CPUMonitor',
            Class: 'J_menuItem',
            DataIndex: '1000',
            Text: 'CPU监控',
            Use: true
          },
          {
            ID: '50',
            MID: '8',
            Href: 'memoryMonitor',
            Class: 'J_menuItem',
            DataIndex: '1000',
            Text: '内存监控',
            Use: true
          },
          {
            ID: '39',
            MID: '8',
            Href: 'networkMonitor',
            Class: 'J_menuItem',
            DataIndex: '1000',
            Text: '网络监控',
            Use: true
          },
          {
            ID: '39',
            MID: '8',
            Href: 'diskMonitor',
            Class: 'J_menuItem',
            DataIndex: '1000',
            Text: '磁盘监控',
            Use: true
          },
          {
            ID: '39',
            MID: '8',
            Href: 'systemMonitor',
            Class: 'J_menuItem',
            DataIndex: '1000',
            Text: '系统监控',
            Use: true
          },
          {
            ID: '638043082846143531',
            MID: '8',
            Href: 'othersMonitor',
            Class: 'J_menuItem',
            DataIndex: '1000',
            Text: '其他信息监控',
            Use: true
          }
        ]
      }
    },
    { // 历史监控
      ID: '9',
      Href: '/',
      Class: 'fa fa-line-chart',
      Text: '历史监控',
      SOrder: 4000000,
      ShowNum: '0',
      Use: true,
      LeveList: {
        Count: 6,
        List: [
          {
            ID: '21',
            MID: '8',
            Href: 'CPUHistoryMonitor',
            Class: 'J_menuItem',
            DataIndex: '1000',
            Text: 'CPU历史监控',
            Use: true
          },
          {
            ID: '50',
            MID: '8',
            Href: 'memoryHistoryMonitor',
            Class: 'J_menuItem',
            DataIndex: '1000',
            Text: '内存历史监控',
            Use: true
          },
          {
            ID: '39',
            MID: '8',
            Href: 'networkHistoryMonitor',
            Class: 'J_menuItem',
            DataIndex: '1000',
            Text: '网络历史监控',
            Use: true
          },
          {
            ID: '39',
            MID: '8',
            Href: 'diskHistoryMonitor',
            Class: 'J_menuItem',
            DataIndex: '1000',
            Text: '磁盘历史监控',
            Use: true
          },
          {
            ID: '39',
            MID: '8',
            Href: 'systemHistoryMonitor',
            Class: 'J_menuItem',
            DataIndex: '1000',
            Text: '系统历史监控',
            Use: true
          },
          {
            ID: '638043082846143531',
            MID: '8',
            Href: 'othersHistoryMonitor',
            Class: 'J_menuItem',
            DataIndex: '1000',
            Text: '其他信息历史监控',
            Use: true
          }
        ]
      }
    },
    { // PCS管理
      ID: '10',
      Href: '/',
      Class: 'fa fa-tasks',
      Text: 'PCS管理',
      SOrder: 4000000,
      ShowNum: '0',
      Use: true,
      LeveList: {
        Count: 6,
        List: [
          {
            ID: '21',
            MID: '10',
            Href: 'pcsInfo',
            Class: 'J_menuItem',
            DataIndex: '1000',
            Text: 'PCS信息',
            Use: true
          },
          {
            ID: '21',
            MID: '10',
            Href: 'pcsSettings',
            Class: 'J_menuItem',
            DataIndex: '1000',
            Text: 'PCS配置',
            Use: true
          },
          {
            ID: '21',
            MID: '10',
            Href: 'pcsControl',
            Class: 'J_menuItem',
            DataIndex: '1000',
            Text: 'PCS控制',
            Use: true
          },
          {
            ID: '21',
            MID: '10',
            Href: 'pcsRealtime',
            Class: 'J_menuItem',
            DataIndex: '1000',
            Text: 'PCS实时数据',
            Use: true
          }
        ]
      }
    },
    { // 用户管理
      ID: '637031848502576736',
      Href: '/',
      Class: 'fa fa-group (alias)',
      Text: '用户管理',
      SOrder: 5000000,
      ShowNum: '0',
      Use: true,
      LeveList: {
        Count: 5,
        List: [
          {
            ID: '23',
            MID: '637031848502576736',
            Href: 'usersManagement',
            Class: 'J_menuItem',
            DataIndex: '1000',
            Text: '基本信息',
            Use: true
          },
          {
            ID: '24',
            MID: '637031848502576736',
            Href: 'roleManagement',
            Class: 'J_menuItem',
            DataIndex: '1000',
            Text: '角色配置',
            Use: true
          },
          {
            ID: '25',
            MID: '637031848502576736',
            Href: 'departmentation',
            Class: 'J_menuItem',
            DataIndex: '1000',
            Text: '部门划分',
            Use: true
          },
          {
            ID: '49',
            MID: '637031848502576736',
            Href: 'active',
            Class: 'J_menuItem',
            DataIndex: '1000',
            Text: '在线用户',
            Use: true
          },
          {
            ID: '51',
            MID: '637031848502576736',
            Href: 'loginAbnormal',
            Class: 'J_menuItem',
            DataIndex: '1000',
            Text: '登陆异常',
            Use: true
          },
          {
            ID: '51',
            MID: '637031848502576736',
            Href: 'loginLog',
            Class: 'J_menuItem',
            DataIndex: '1000',
            Text: '登陆记录',
            Use: true
          }
        ]
      }
    },
    // { // 站内信箱
    //   ID: '637031848503652954',
    //   Href: '/',
    //   Class: 'fa fa-envelope',
    //   Text: '站内信箱',
    //   SOrder: 6000000,
    //   ShowNum: '0',
    //   Use: true,
    //   LeveList: {
    //     Count: 1,
    //     List: [
    //       {
    //         ID: '27',
    //         MID: '637031848503652954',
    //         Href: 'mailBox',
    //         Class: 'J_menuItem',
    //         DataIndex: '1000',
    //         Text: '站内信',
    //         Use: true
    //       }
    //     ]
    //   }
    // },
    { // 日志管理
      ID: '637031848504354649',
      Href: '/',
      Class: 'fa fa-bookmark',
      Text: '日志管理',
      SOrder: 7000000,
      ShowNum: '0',
      Use: true,
      LeveList: {
        Count: 4,
        List: [
          {
            ID: '34',
            MID: '637031848504354649',
            Href: 'users',
            Class: 'J_menuItem',
            DataIndex: '1000',
            Text: '用户日志',
            Use: true
          },
          {
            ID: '35',
            MID: '637031848504354649',
            Href: 'systemLog',
            Class: 'J_menuItem',
            DataIndex: '1000',
            Text: '系统日志',
            Use: true
          },
          {
            ID: '44',
            MID: '637031848504354649',
            Href: 'hardware',
            Class: 'J_menuItem',
            DataIndex: '1000',
            Text: '硬件日志',
            Use: true
          },
          {
            ID: '46',
            MID: '637031848504354649',
            Href: 'exception',
            Class: 'J_menuItem',
            DataIndex: '1000',
            Text: '异常日志',
            Use: true
          }
        ]
      }
    },
    // { // 备忘信息
    //   ID: '637031848504872645',
    //   Href: '/',
    //   Class: 'fa fa-edit (alias)',
    //   Text: '备忘信息',
    //   SOrder: 8001900,
    //   ShowNum: '0',
    //   Use: true,
    //   LeveList: {
    //     Count: 2,
    //     List: [
    //       {
    //         ID: '37',
    //         MID: '637031848504872645',
    //         Href: 'menmorandumListWaitLoad',
    //         Class: 'J_menuItem',
    //         DataIndex: '1000',
    //         Text: '待完成备忘',
    //         Use: true
    //       },
    //       {
    //         ID: '38',
    //         MID: '637031848504872645',
    //         Href: 'menmorandumListOverLoad',
    //         Class: 'J_menuItem',
    //         DataIndex: '1000',
    //         Text: '已完成备忘',
    //         Use: true
    //       }
    //     ]
    //   }
    // },
    { // 关于信息
      ID: '637031848503872542',
      Href: 'Main.aspx',
      Class: 'fa fa-bank (alias)',
      Text: '关于信息',
      SOrder: 9002000,
      ShowNum: '0',
      Use: true,
      LeveList: {
        Count: 4,
        List: [
          {
            ID: '41',
            MID: '637031848503872542',
            Href: 'help',
            Class: 'J_menuItem',
            DataIndex: '1000',
            Text: '帮助信息',
            Use: true
          },
          {
            ID: '45',
            MID: '637031848503872542',
            Href: 'contactUs',
            Class: 'J_menuItem',
            DataIndex: '1000',
            Text: '联系我们',
            Use: true
          },
          {
            ID: '43',
            MID: '637031848503872542',
            Href: 'about',
            Class: 'J_menuItem',
            DataIndex: '1000',
            Text: '关于',
            Use: true
          }
        ]
      }
    },
    { // 系统工具
      ID: '637031848503872543',
      Href: 'Main.aspx',
      Class: 'fa fa-wrench (alias)',
      Text: '系统工具',
      SOrder: 9002000,
      ShowNum: '0',
      Use: true,
      LeveList: {
        Count: 4,
        List: [
          {
            ID: '27',
            MID: '637031848503872543',
            Href: 'mailBox',
            Class: 'J_menuItem',
            DataIndex: '1000',
            Text: '站内信',
            Use: true
          },
          {
            ID: '37',
            MID: '637031848503872543',
            Href: 'menmorandumListWaitLoad',
            Class: 'J_menuItem',
            DataIndex: '1000',
            Text: '待完成备忘',
            Use: true
          },
          {
            ID: '38',
            MID: '637031848503872543',
            Href: 'menmorandumListOverLoad',
            Class: 'J_menuItem',
            DataIndex: '1000',
            Text: '已完成备忘',
            Use: true
          },
          {
            ID: '39',
            MID: '637031848503872543',
            Href: 'languageManage',
            Class: 'J_menuItem',
            DataIndex: '1000',
            Text: '语言管理',
            Use: true
          }
        ]
      }
    }
  ],
  isCollapse: true
}

const mutations = {
  set_asideItem (state, val) {
    state.asideItem = val
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
