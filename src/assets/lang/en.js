export default {
  main: {
    topInfo: [
      'Device installed capacity',
      'Total number of single cells',
      'Total installed power',
      'Current total power'
    ],
    topBar: [
      'Users',
      'Devices',
      'Battery',
      'UPS',
      'Warning',
      'Station letters',
      'Logs',
      'Notes'
    ],
    deviceCount: {
      title: 'Device statistics',
      value: [
        'Number of installed inverter device',
        'Number of installed fire fighting device',
        'Number of controllers online',
        'Number of installed generator device',
        'Number of installed photovoltaic device',
        'Controller online rate',
        'Number of linked device installed',
        'Number of installed wind energy device',
        'Number of users online'
      ]
    },
    energyStatistics: {
      title: 'Energy statistics',
      trend: 'Power trend',
      order: 'Power ranking'
    }
  },
  deviceParams: {
    top: {
      title: 'Fuzzy Search',
      lableList: [
        'ICCID number',
        'Device ID',
        'VIN number',
        'Device name'
      ],
      placeholderList: [
        'Please enter the ICCID number',
        'Please enter the device number',
        'Please enter the VIN code',
        'Please enter VIN code please enter device name'
      ],
      search: 'Search'
    }
  },
  header: {
    search: 'Please enter what you are looking for...',
    close: {
      title: 'Close',
      label: [
        'Close the other tabs',
        'Close all tabs'
      ]
    },
    logout: 'Logout'
  },
  base: {
    submit: 'Submit',
    cancel: 'Cancel',
    download: 'Download',
    search: 'Fuzzy search',
    searchbtn: 'Search',
    refresh: 'Refresh',
    add: 'Add',
    del: 'Delete',
    edit: 'Edit',
    multipleAdd: 'Multiple add',
    multipleDel: 'Multiple delete',
    export: {
      csv: 'Export to CSV',
      excel: 'Export to  Excel',
      title: 'Export',
      print: 'print'
    },
    delConfirm: {
      tip: 'Do you want to delete ',
      tip1: 'Are you sure to delete it?',
      title: 'Delete confirmation',
      yes: 'OK',
      no: 'Cancel',
      cancelTip: 'Cancelled delete'
    },
    datePicker: {
      start: 'Start date',
      end: 'Ending date',
      separator: 'To'
    },
    dateGroup: {
      today: 'today',
      yesterday: 'yesterday',
      twoDays: 'Two days before',
      week: 'Last week',
      month: 'Last month'
    }
  },
  user: {
    dropdownList: [
      'Modify the picture',
      'Personal data',
      'Contact us',
      'Receipt mail'
    ]
  },
  screenFull: {
    title: 'Full Screen',
    tip: 'Full screen is not supported'
  },
  home: {
    feedback: {
      title: 'Feedback',
      formLabel: [
        'Headline',
        'Content'
      ],
      tip: 'Please enter the body'
    }
  },
  tabName: {
    main: 'main',
    systemPerformance: 'system performance'
  },
  logout: {
    tip: 'Are you sure you want to quit?',
    title: 'Logout confirmation',
    yes: 'OK',
    no: 'Cancel'
  },
  login: {
    headline: 'Welcome to the system',
    tip: 'Please enter your account and password',
    placeholder: [
      'Account',
      'Password'
    ],
    login: 'Log in',
    footer: 'All right reserved'
  },
  alarmHistory: {
    searchTitle: 'History warning list query',
    listTitle: 'History alarm',
    searchForm: {
      label: [
        'Range',
        'Confirm alarm',
        'Log'
      ],
      placeholder: [
        '',
        '',
        'Please enter log'
      ]
    },
    tableLabel: [
      'No.',
      'Alarm level',
      'Alarm type',
      'Alarm name',
      'Details',
      'Occurred time',
      'Confirm time',
      'Operation'
    ],
    operationbtn: [
      'Details',
      'Confirm alarm'
    ],
    dialog: {
      title: 'Userlog',
      formLabel: [
        'Alarm level',
        'Alarm type',
        'Occurred time',
        'Alarm source',
        'Content'
      ],
      formPlaceholder: 'Please enter the content',
      default: {
        btn: 'Default',
        msg: 'The abnormal information has been confirmed without any problem, so please confirm OK first.'
      }
    },
    detail: {
      title: 'Details of the alarm',
      label: [
        'Alarm level',
        'Alarm type',
        'Alarm source',
        'Brief description',
        'Details',
        'Account name',
        'Username',
        'Over message'
      ],
      options: [
        'All',
        'Confirmed',
        'Unconfirmed'
      ]
    }
  },
  alarmRealtime: {
    listTitle: 'Real-time Alarm',
    tableLabel: [
      'No.',
      'Alarm level',
      'Alarm title',
      'Alarm source',
      'Effective time',
      'Time of generation',
      'Operation'
    ],
    operationbtn: [
      'Details '
    ],
    detail: {
      title: 'Details of the alarm',
      label: [
        'Application number',
        'Application name',
        'Alarm source',
        'Alarm number',
        'Alarm level',
        'Alarm level name',
        'Alarm title',
        'Alarm message'
      ]
    }
  },
  batterInfo: {
    searchTitle: 'Battery type list query',
    listTitle: 'Type of battery',
    searchForm: {
      label: [
        'Device name',
        'Information name',
        'Battery number',
        'Module battery number'
      ],
      placeholder: [
        '',
        'Please enter the information name',
        'Please enter the number of the battery',
        'Please enter the number of the module battery'
      ]
    },
    tableLabel: [
      'No.',
      'Battery name',
      'Battery number',
      'Module battery number',
      'Write time',
      'Write time'
    ],
    operationbtn: [
      'Voltage trend'
    ],
    dialog: {
      title: 'Details of the battery',
      searchTitle: 'Battery type list query',
      listTitle: 'Battery type',
      formLabel: [
        'Battery name',
        'Range'
      ],
      datePicker: {
        start: 'Start date',
        end: 'Ending date',
        separator: 'To'
      }
    }
  },
  batterManage: {
    searchTitle: 'Battery type list query',
    listTitle: 'Type of battery',
    searchForm: {
      label: [
        'Device name',
        'Information name',
        'Battery number',
        'Module battery number'
      ],
      placeholder: [
        '',
        'Please enter the information name',
        'Please enter the number of the battery',
        'Please enter the number of the module battery'
      ]
    },
    tableLabel: [
      'No.',
      'Battery name',
      'Battery number',
      'Battery material',
      'Battery capacity',
      'Standard voltage',
      'Battery number',
      'Write time',
      'Write time'
    ],
    editDialog: {
      title: 'Add battery information',
      formLabel: [
        'Battery type',
        'Device name',
        'Device number',
        'Battery information',
        'Battery number',
        'Battery module'
      ]
    },
    addDialog: {
      title: 'Add battery information',
      formLabel: [
        'Battery type',
        'Device name',
        'Device number',
        'Battery information',
        'Battery number',
        'Battery module'
      ]
    },
    addMultiple: {
      title: 'Add battery information',
      formLabel: [
        'Battery type',
        'Device name',
        'Device number',
        'Battery name head',
        'Choose Bank',
        'Rack attach amount',
        'Cell attach amount',
        'Start number of battery module'
      ]
    },
    errorTip: 'Please enter the content',
    delErrorTip: 'Please select the user to delete'
  },
  batteryAlarm: {
    searchTitle: 'Device management list query',
    listTitle: 'Device management',
    searchForm: {
      label: [
        'ICCID',
        'Device number',
        'VIN',
        'Device name'
      ],
      placeholder: [
        'Please enter the ICCID',
        'Please enter the device number',
        'Please enter the VIN',
        'Please enter the device name'
      ]
    },
    tableLabel: [
      'No.',
      'DIDS',
      'Device name',
      'Device Manager',
      'Registration time',
      'Operation'
    ],
    detail: [
      'Battery alarm',
      'Alarm voltage'
    ]
  },
  batteryRealtime: {
    searchForm: {
      label: [
        'ICCID',
        'Device number',
        'VIN',
        'Device name'
      ],
      placeholder: [
        'Please enter the ICCID',
        'Please enter the device number',
        'Please enter the VIN',
        'Please enter the device name'
      ]
    },
    listTitle: 'Device management',
    tableLabel: [
      'No.',
      'ICCID',
      'DIDS',
      'Device name',
      'Device Manager',
      'Registration time',
      'Operation'
    ],
    operationbtn: [
      'Data display'
    ],
    dialog: {
      title: 'Data display',
      formLabel: [
        'Device name',
        'Identification number',
        'Bank number',
        ' Data type',
        'Original data'
      ],
      table: [
        'Start address',
        'Col1',
        'Col2',
        'Col3',
        'Col4',
        'Col5',
        'Col6',
        'Col7',
        'Col8',
        'Col9',
        'Col10'
      ]
    }
  },
  batteryState: {
    searchTitle: 'Device management list query',
    listTitle: 'Device management',
    searchForm: {
      label: [
        'ICCID',
        'Device number',
        'VIN',
        'Device name'
      ],
      placeholder: [
        'Please enter the ICCID',
        'Please enter the device number',
        'Please enter the VIN',
        'Please enter the device name'
      ]
    },
    tableLabel: [
      'No.',
      'ICCID',
      'DIDS',
      'Device name',
      'Device Manager',
      'Registration time',
      'Operation'
    ],
    operationbtn: [
      'Hardware',
      'Outage',
      'Warning',
      'Others'
    ],
    hardware: {
      title: 'Hardware Information',
      label: [
        'Device Bank',
        'Item number',
        'Master version',
        'Child version',
        'Fixed version',
        'Hardware master version',
        'Hardware child version',
        'Bootloader master version',
        'Bootloader child version',
        'Bootloader fixed version'
      ]
    },
    outage: {
      title: 'Outage information',
      label: [
        'Device Bank',
        'Single overvoltage shutdown times',
        'Battery overvoltage shutdown times',
        'Battery charging overcurrent shutdown times',
        'Single undervoltage shutdown times',
        'Battery undervoltage shutdown times',
        'Battery discharge overcurrent shutdown times',
        'Overheated battery shutdown times',
        'Battery undertemperature shutdown times',
        'Power over temperature shutdown times',
        'Shutdown times of excessive pressure difference between monomers',
        'The insulation resistance value is too small shutdown times',
        'Total pressure difference too large shutdown times'
      ]
    },
    alarm: {
      title: 'Warning message',
      label: [
        'Device Bank',
        'Alarm times of monomer overvoltage',
        'Alarm times of battery overvoltage',
        'Alarm times of battery overcharge',
        'Alarm times of monomer undervoltage',
        'Alarm times of battery undervoltage',
        'Alarm times of battery discharge overcurrent',
        'Alarm times of battery overtemperature',
        'Alarm times of battery undertemperature',
        'Alarm times of power over temperature',
        'Alarm times of excessive pressure difference between monomers',
        'Alarm times for too small insulation resistance',
        'Alarm times of excessive total differential pressure',
        'Alarm times of high ambient temperature',
        'Alarm times of low ambient temperature'
      ]
    },
    others: {
      title: 'Other information',
      label: [
        'Device Bank',
        'Battery cycle times',
        'Total battery capacity',
        'System operation time',
        'Last charge capacity(0.01Ah)',
        'End time of last charge(seconds)',
        'Last discharge end time(seconds)',
        'Times of over temperature protection',
        'Protection times of low ambient temperature',
        'Alarm times of power over temperature',
        'Alarm times for excessive pressure difference between units',
        'Alarm times for too small insulation resistance',
        'Alarm times of excessive total differential pressure',
        'Alarm times of high ambient temperature',
        'Alarm times of low ambient temperature'
      ]
    },
    detail: 'Master self-check status'
  },
  batterySummary: {
    formLabel: 'Device Bank',
    radioLabel: [
      {
        label: 'Total pressure curve'
      },
      {
        label: 'system state '
      },
      {
        label: 'health status'
      },
      {
        label: 'Voltage extremum'
      },
      {
        label: 'Extreme temperature'
      },
      {
        label: 'Internal resistance extremum'
      },
      {
        label: 'Insulation curve'
      }
    ]
  },
  batteryType: {
    searchTitle: 'Battery type list query',
    listTitle: 'Type of battery',
    searchForm: {
      label: [
        'Info Name',
        'Usage capacity',
        'Usage material'
      ],
      placeholder: [
        'Please enter info name',
        'Please enter usage capacity',
        'Please enter usage material'
      ]
    },
    tableLabel: [
      'No.',
      'Name',
      'Battery capacity',
      'Standard voltage',
      'Self discharge rate',
      'Battery material',
      'Maximum voltage',
      'Minimum voltage',
      'Maximum temperature',
      'Minimum temperature',
      'Charge ratio',
      'Discharge ratio',
      'Write time',
      'Operation'
    ],
    editDialog: {
      title: 'Modify battery type',
      label: [
        'Battery name',
        'Battery capacity',
        'Internal resistance',
        'Self discharge rate',
        'Battery material',
        'Standard voltage',
        'Maximum voltage',
        'Minimum voltage',
        'Maximum temperature',
        'Minimum temperature',
        'Charge rate',
        'Discharge rate'
      ]
    },
    addDialog: {
      title: 'Add battery type',
      label: [
        'Battery name',
        'Battery capacity',
        'Internal resistance',
        'Self discharge rate',
        'Battery material',
        'Standard voltage',
        'Maximum voltage',
        'Minimum voltage',
        'Maximum temperature',
        'Minimum temperature',
        'Charge rate',
        'Discharge rate'
      ]
    },
    errorTip: [
      'Please enter content',
      'Please enter number',
      'Battery name cannot be empty'
    ]
  },
  dataVisual: {
    box1: {
      title: [
        'General electrical status',
        'Configuration status'
      ],
      label: [
        'Total battery voltage',
        'Total battery current',
        'Charger output current',
        'Nominal total system capacity'
      ]
    },
    box2: {
      title: [
        'Charging information'
      ],
      label: [
        'Charge and discharge indication',
        'Charge capacity',
        'Charge end time',
        'Discharge end time'
      ],
      unit: [
        'Status'
      ]
    },
    box3: {
      label: [
        'Number of cycles',
        'Battery capacity'
      ],
      unit: [
        'Times'
      ]
    },
    box4: {
      title: [
        'Installation status',
        'Abnormal information'
      ],
      label: [
        'Number of installed clusters',
        'Number of single batteries',
        'Warning times',
        'Shutdown times'
      ],
      unit: [
        'Clusters',
        'Section',
        'Times',
        'Times'
      ]
    },
    box5: {
      title: 'Extremum information',
      label: [
        'Cell voltage',
        'Cell temperature',
        'Cell internal resistance',
        'Positive insulation',
        'Negative insulation'
      ]
    }
  },
  firstAlarm: {
    searchTitle: 'Basic information of equipment',
    formLabel: [
      'Device Bank',
      'Device number',
      'ICCID',
      'VIN',
      'Device name'
    ],
    tabs: [
      'Battery level 1 alarm',
      'Battery level 2 alarm'
    ],
    tableLabel: [
      'No.',
      'Unit overvoltage',
      'System overvoltage',
      'Charging overcurrent',
      'Unit undervoltage',
      'System undervoltage',
      'Discharge overcurrent',
      'Charging temperature is too high',
      'Charging temperature is too low',
      'SOC is too low',
      'Charging overcurrent level III',
      'Power temperature is too high',
      'Ambient temperature is too high',
      'Ambient temperature is too low',
      'Discharge overcurrent level III',
      'Discharge temperature is too high',
      'Discharge temperature is too low'
    ],
    state: [
      'Normal',
      'Alarm'
    ]
  },
  selfCheck: {
    searchTitle: 'Basic information of equipment',
    formLabel: [
      'Device Bank',
      'ICCID',
      'Device number',
      'VIN',
      'Device name'
    ],
    tableLabel: [
      'No.',
      'EEPROM failure',
      'Master id out of range',
      'PCS standby failure',
      'Flash self test status'
    ],
    state: [
      'Normal',
      'Alarm'
    ]
  },
  stateInfo: {
    searchTitle: 'Device management list query',
    listTitle: 'Device management',
    searchForm: {
      label: [
        'ICCID',
        'Device number',
        'VIN',
        'Device name'
      ],
      placeholder: [
        'Please enter iccid number',
        'Please enter device number',
        'Please enter VIN code',
        'Please enter device name'
      ]
    },
    tableLabel: [
      'No.',
      'ICCID',
      'DIDS',
      'VIN',
      'Device name',
      'Device manager',
      'Registration time',
      'Operation'
    ],
    detail: [
      'Curve',
      'Data display'
    ]
  },
  systemControl: {
    searchTitle: 'Device management list query',
    listTitle: 'Device management',
    searchForm: {
      label: [
        'ICCID',
        'Device number',
        'VIN',
        'Device name'
      ],
      placeholder: [
        'Please enter iccid number',
        'Please enter device number',
        'Please enter VIN code',
        'Please enter device name'
      ]
    },
    tableLabel: [
      'No.',
      'DIDS',
      'Device name',
      'Device manager',
      'Registration time',
      'Expand'
    ],
    dialog: {
      title: 'Device info',
      label: [
        'Device number',
        'Device name',
        'Device Bank'
      ],
      suffix: ' info'
    },
    unit: [
      'No. ',
      ''
    ],
    detail: [
      'System reset',
      'Operation mode',
      'Short circuit protection',
      'Soft shutdown',
      'Insulation sampling',
      'Slave ID automatic allocation',
      'Fault code enable',
      'Reset EEPROM',
      'Reverse protection',
      'Start test',
      'Passive equalization'
    ]
  },
  temperatureInfo: {
    searchTitle: 'Temperature information list query',
    listTitle: 'Temperature information',
    searchForm: {
      label: [
        'Device name',
        'Information name',
        'Battery number',
        'Module battery number'
      ],
      placeholder: [
        '',
        'Please enter the information name',
        'Please enter the number of the battery',
        'Please enter the number of the module battery'
      ]
    },
    tableLabel: [
      'No.',
      'Battery name',
      'Battery number',
      'Module battery number',
      'Write time',
      'Operation'
    ],
    operationbtn: [
      'Details'
    ],
    dialog: {
      title: 'Details of the temperature',
      label: [
        'Temperature name',
        'Range'
      ],
      searchTitle: 'Temperature type list query',
      listTitle: 'Temperature information'
    }
  },
  temperatureManage: {
    searchTitle: 'Temperature information list query',
    listTitle: 'Temperature information',
    searchForm: {
      label: [
        'Device name',
        'Information name',
        'Battery number',
        'Module battery number'
      ],
      placeholder: [
        '',
        'Please enter the information name',
        'Please enter the number of the battery',
        'Please enter the number of the module battery'
      ]
    },
    tableLabel: [
      'No.',
      'Battery name',
      'Battery number',
      'Module battery number',
      'Write time',
      'Operation'
    ],
    editDialog: {
      title: 'Change information',
      formLabel: [
        'Device name',
        'Device number',
        'Temperature name',
        'Temperature number',
        'Module temperature number'
      ]
    },
    addDialog: {
      title: 'Add battery information',
      formLabel: [
        'Device name',
        'Device number',
        'Temperature name',
        'Temperature number',
        'Module temperature number'
      ]
    },
    addMore: {
      title: 'Add battery information',
      formLabel: [
        'Device name',
        'Device number',
        'Temperature name header',
        'Bank',
        'Rack attach amount',
        'Cell attach amount',
        'Temperature sequence header'
      ]
    },
    errorTip: 'Please enter the content'
  },
  thresholdSetting: {
    searchTitle: 'Device management list query',
    listTitle: 'Device management',
    searchForm: {
      label: [
        'ICCID',
        'Device number',
        'VIN',
        'Device name'
      ],
      placeholder: [
        'Please enter the ICCID',
        'Please enter the device number',
        'Please enter the VIN',
        'Please enter the device name'
      ]
    },
    tableLabel: [
      'No.',
      'DIDS',
      'Device name',
      'Device Manager',
      'Registration time',
      'Operation'
    ],
    dialog: {
      title: 'Device information',
      label: [
        'Device number',
        'Device name',
        'Bank'
      ],
      suffix: 'Info'
    },
    detail: [
      'Voltage threshold',
      'Charging general threshold',
      'Charging over-current threshold',
      'Environmental threshold'
    ],
    list1: [
      'Unit overvoltage shutdown',
      'Unit overvoltage shutdown recovery',
      'Total pressure overpressure shutdown',
      'Total pressure overpressure shutdown recovery',
      'Main circuit charging overcurrent shutdown',
      'Main circuit charging overcurrent shutdown recovery',
      'Unit under shutdown voltage',
      'Unit undervoltage shutdown recovery',
      'Total undervoltage shutdown',
      'Total undervoltage shutdown recovery',
      'Main circuit discharge overcurrent shutdown',
      'Main circuit discharge overcurrent shutdown recovery'
    ],
    list2: [
      'High charging temperature shutdown',
      'High charging temperature shutdown',
      'Low charging temperature shutdown',
      'Low charging temperature shutdown recovery',
      'SOC too low shutdown',
      'SOC too low shutdown recovery'
    ],
    list3: [
      'Charging overcurrent three-level shutdown protection',
      'Charging overcurrent three-stage shutdown recovery',
      'Discharge overcurrent three-stage shutdown protection',
      'Discharge overcurrent three-stage shutdown recovery'
    ],
    list4: [
      'Power over temperature shutdown',
      'Power over temperature shutdown recovery',
      'Insulation failure shutdown',
      'Insulation failure shutdown recovery',
      'Unit differential pressure too high shutdown',
      'Unit differential pressure too high shutdown recovery',
      'Total voltage differential too high shutdown',
      'Total voltage differential too high shutdown recovery',
      'Discharge over temperature shutdown',
      'Discharge over temperature shutdown recovery',
      'Discharge under temperature shutdown',
      'Discharge under temperature shutdown recovery',
      'Over temperature shutdown',
      'High temperature difference shutdown recovery',
      'High ambient temperature shutdown',
      'Ambient temperature too high shutdown recovery',
      'Shutdown due to low ambient temperature',
      'Low ambient temperature shutdown recovery'
    ]
  },
  vAlarm: {
    searchTitle: 'Basic information of equipment',
    formLabel: [
      'Device Bank',
      'ICCID',
      'Device numbe',
      'VIN',
      'Device name'
    ],
    tabs: [
      'Voltage information',
      'Temperature information',
      'Other information'
    ],
    volInfo: [
      'Maximum voltage battery number in case of alarm',
      'Maximum voltage at alarm',
      'Maximum voltage battery number at shutdown',
      'Maximum voltage at shutdown',
      'Minimum voltage battery number in case of alarm',
      'Minimum voltage at alarm',
      'Minimum voltage battery number at shutdown',
      'Minimum voltage at shutdown',
      'Voltage value in case of overvoltage alarm of battery pack',
      'Voltage value of battery pack during overvoltage shutdown',
      'Voltage value of battery under voltage alarm',
      'Voltage value of battery under voltage shutdown',
      'High alarm value of single differential pressure',
      'High unit differential pressure shutdown value',
      'Total differential pressure high alarm value',
      'Total differential pressure high shutdown value'
    ],
    temperatureInfo: [
      'Maximum battery temperature point number in case of alarm',
      'Maximum battery temperature value during alarm',
      'Maximum battery temperature point number at shutdown',
      'Maximum battery temperature at shutdown',
      'Minimum battery temperature point number in case of alarm',
      'Minimum battery temperature value at alarm',
      'Minimum battery temperature point number at shutdown',
      'Minimum battery temperature value at shutdown',
      'Maximum power temperature point number in case of alarm',
      'Maximum power temperature value at alarm',
      'Maximum power temperature point number at shutdown',
      'Maximum power temperature value at shutdown',
      'Single temperature difference high alarm value',
      'High shutdown value of single temperature difference'
    ],
    othersInfo: [
      'Operation status of this branch',
      'Equipment failure alarm information',
      'Current value of battery charging overcurrent alarm',
      'Current value of battery charging overcurrent shutdown',
      'Current value of battery discharge overcurrent alarm',
      'Current value during battery discharge overcurrent shutdown',
      'Insulation too small alarm resistance value',
      'Insulation too small shutdown resistance'
    ],
    unit: [
      'No. ',
      ''
    ],
    title: 'Name'
  },
  service: {
    print: 'Print the terms'
  },
  serviceManage: {
    title: 'Terms of Service',
    label: 'Language Type',
    update: 'Update'
  }
}
