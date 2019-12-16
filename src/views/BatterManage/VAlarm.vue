<template>
  <div>
    <el-card class="box-card">
      <!-- 基础信息 -->
      <!-- 基础信息 -->
      <div slot="header" class="clearfix">
        <span>设备基础信息</span>
      </div>
      <el-form label-width="80px" :inline="true">
        <el-form-item
          v-for="(item, index) in baseIfo"
          :key="index"
          :label="item.label"
        >
          <el-input :value="item.value" :readonly="true"></el-input>
        </el-form-item>
        <el-form-item label="设备Bank">
          <el-select v-model="bank">
            <el-option label="Bank1" value="0"></el-option>
            <el-option label="Bank2" value="1"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="box-card">
      <!-- 详细信息 -->
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="电池电压" name="volAlarm"> </el-tab-pane>
        <el-tab-pane label="电压信息" name="overVolAlarm"> </el-tab-pane>
        <!-- <el-tab-pane label="电池二级报警" name="secondAlarm"> </el-tab-pane> -->
        <!-- 表格操作栏开始 -->
        <div class="table-oper">
          <el-button
            type="primary"
            size="small"
            @click="getData(paramsVA)"
            class="button-left"
          >
            <i class="el-icon-refresh-right"></i>
            刷新
          </el-button>
          <el-button class="menu-btn">
            <i class="fa fa-list"></i>
          </el-button>
          <div class="menu-wrapper">
            <template v-for="(column, index) in customColumns">
              <vxe-checkbox
                v-if="column.property"
                class="checkbox-item"
                v-model="column.visible"
                :key="index"
                @change="$refs.xTable.refreshColumn()"
                >{{ column.title }}</vxe-checkbox
              >
            </template>
          </div>
          <el-button class="menu-btn" title="导出" v-popover:export>
            <i class="fa fa-download"></i>
          </el-button>
          <el-button class="menu-btn" @click="printEvent" title="打印">
            <i class="fa fa-print"></i>
          </el-button>
          <!-- 导出操作开始 -->
          <el-popover
            ref="export"
            placement="bottom"
            width="100"
            trigger="hover"
          >
            <ul id="export">
              <li @click="exportDataEvent">
                导出为Csv文件
              </li>
              <li @click="exportExcel">
                导出为Excel文件
              </li>
            </ul>
          </el-popover>
          <!-- 导出操作结束 -->
        </div>
        <!-- 表格操作栏结束 -->
        <!-- 表格开始 -->
        <vxe-table
          :data="activeArray"
          border
          :customs.sync="customColumns"
          ref="xTable"
          v-loading="loading"
          element-loading-background="rgba(0, 0, 0, 0)"
          resizable
          highlight-hover-row
          highlight-current-row
          align="center"
        >
          <vxe-table-column
            v-for="(config, index) in tableColumn"
            :key="index"
            v-bind="config"
          >
          </vxe-table-column>
        </vxe-table>
        <!-- 表格结束 -->
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      baseIfo: [],
      data: {},
      activeName: 'volAlarm',
      bank: '0',
      bATTERY_FIRST_ALARM_MESSAGE: [],
      bATTERY_SECONDARY_ALARM_MESSAGE: [],
      volInfo: [],
      overVolInfo: [],
      ampereInfo: [],
      powerInfo: [],
      temperatureInfo: [],
      othersInfo: [],
      customColumns: [],
      loading: false,
      api: '/api/Devices/GetRegistrationEquipment',
      tableColumn: [],
      volColumn: [],
      overVolColumn: [],
      ampereColumn: [],
      powerColumn: [],
      temperatureColumn: [],
      othersColumn: [],
      activeArray: [],
      volData: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
      overVolData: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
      ampereData: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
      powerData: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
      temperatureData: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
      othersData: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}]
    }
  },
  computed: {
    ...mapState('detail', ['paramsVA'])
  },
  watch: {
    paramsVA: {
      handler (newName, oldName) {
        this.data = {}
        this.baseIfo = []
        this.getDetail(this.api, this.paramsVA)
        this.getData(this.paramsVA)
      },
      deep: true
    },
    bank: {
      handler (newName, oldName) {
        this.getData(this.paramsVA)
      }
    }
  },
  created () {
    if (this.paramsVA.AutoSystemID && this.paramsVA.batterID) {
      this.getDetail(this.api, this.paramsVA)
      this.getData(this.paramsVA)
    }
  },
  mounted () {
    this.setData()
  },
  methods: {
    // 打印
    printEvent () {
      this.$refs.xTable.print()
    },

    // 导出csv
    exportDataEvent () {
      this.$refs.xTable.exportData({ type: 'csv' })
    },

    // 导出excel
    exportExcel () {
      this.listHead = []
      this.listFilter = []
      for (var i = 2; i < this.customColumns.length; i++) {
        if (this.customColumns[i].visible) {
          this.listFilter.push(this.customColumns[i].property)
          this.listHead.push(this.customColumns[i].title)
        }
      }
      require.ensure([], () => {
        const { export_json_to_excel } = require("@/excel/Export2Excel"); // eslint-disable-line
        const tHeader = this.listHead
        // 上面设置Excel的表格第一行的标题
        const filterVal = this.listFilter
        // 上面的index、nickName、name是tableData里对象的属性
        const list = this.tableData // 把data里的tableData存到list
        const data = this.formatJson(filterVal, list)
        export_json_to_excel(tHeader, data, `${this.fileName}表`)
      })
    },
    formatJson (filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    },
    getData (params) {
      var AutoSystemID = localStorage.getItem('AutoSystemID')
      this.loading = true
      var url = '/api/Chart/GetBatteryBankCRITICALStateCharts'
      this.activeArray = []
      this.tableColumn = []
      this.$axios
        .get(
          `${url}?AutoSystemID=${AutoSystemID}&BatteryIDS=${params.batterID}&BankIndex=${this.bank}`
        )
        .then(res => {
          if (res.data.code === 0) {
            var data = res.data.data
            for (const key in data) {
              //   console.log(data[key])
              if (data.hasOwnProperty(key)) {
                switch (key) {
                  case 'nUMBER_OF_HIGHEST_VOLTAGE_BATTERY_WHEN_ALARMING':
                  case 'tHE_HIGHEST_VOLTAGE_WHEN_ALARMING':
                  case 'nUMBER_OF_HIGHEST_VOLTAGE_BATTERY_WHEN_SHUT_DOWN':
                  case 'mAXIMUM_VOLTAGE_VALUE_WHEN_STOPPED':
                  case 'mINIMUM_VOLTAGE_BATTERY_NUMBER_WHEN_ALARM':
                  case 'mINIMUM_VOLTAGE_WHEN_ALARMING':
                  case 'mINIMUM_VOLTAGE_BATTERY_NUMBER_WHEN_SHUT_DOWN':
                  case 'mINIMUM_VOLTAGE_VALUE_WHEN_SHUTDOWN':
                    data[key].forEach((item, i) => {
                      this.volData[i][key] = item
                    })
                    break
                  case 'tHE_VOLTAGE_VALUE_WHEN_THE_BATTERY_OVERVOLTAGE_ALARM':
                  case 'tHE_VOLTAGE_VALUE_WHEN_THE_BATTERY_OVERVOLTAGE_STOPS':
                  case 'vOLTAGE_VALUE_WHEN_BATTERY_UNDERVOLTAGE_ALARM':
                  case 'tHE_VOLTAGE_VALUE_WHEN_THE_BATTERY_IS_SHUT_DOWN':
                  case 'tOTAL_DIFFERENTIAL_PRESSURE_HIGH_WARNING_VALUE':
                  case 'tOTAL_DIFFERENTIAL_PRESSURE_HIGH_STOP_VALUE':
                  case 'wARNING_VALUE_OF_MONOMER_PRESSURE_DIFFERENCE_HEIGHT':
                  case 'sINGLE_UNIT_DIFFERENTIAL_PRESSURE_HIGH_STOP_VALUE':
                    data[key].forEach((item, i) => {
                      this.overVolData[i][key] = item
                    })
                    break
                  case 'tHE_VALUE_OF_THE_CURRENT_WHEN_THE_BATTERY_OVERCHARGE_ALARM':
                  case 'tHE_VALUE_OF_CURRENT_WHEN_THE_BATTERY_OVERCHARGES_AND_STOPS':
                  case 'bATTERY_DISCHARGE_OVERCURRENT_ALARM_WHEN_THE_CURRENT_VALUE':
                  case 'tHE_CURRENT_VALUE_WHEN_THE_BATTERY_DISCHARGE_OVERCURRENT_STOPS':
                  case 'iNSULATION_TOO_SMALL_ALARM_VALUE':
                  case 'iNSULATION_TOO_SMALL_STOP_VALUE':
                    data[key].forEach((item, i) => {
                      this.ampereData[i][key] = item
                    })
                    break
                }
              }
            }
            switch (this.activeName) {
              case 'volAlarm':
                this.activeArray = this.volData
                this.tableColumn = this.volColumn
                break
              case 'overVolAlarm':
                this.activeArray = this.overVolData
                this.tableColumn = this.overVolColumn
                break
            }
          } else if (res.data.code === 1) {
            this.$message.error(res.data.msg)
          }
          this.loading = false
        })
        .catch(err => {
          console.error(err)
          this.loading = false
        })
    },

    getDetail (api, params) {
      this.$axios
        .get(
          `${api}?AutoSystemID=${params.AutoSystemID}&SystemID=${params.SystemID}`
        )
        .then(res => {
          this.data = res.data.data
          for (var key in this.data) {
            switch (key) {
              case 'DIDS':
                this.baseIfo.push({ label: '设备编号', value: this.data[key] })
                break
              case 'DICCID':
                this.baseIfo.push({
                  label: 'ICCID编号',
                  value: this.data[key]
                })
                break
              case 'DVIN':
                this.baseIfo.push({
                  label: 'VIN编码',
                  value: this.data[key]
                })
                break
              case 'DName':
                this.baseIfo.push({
                  label: '设备名称',
                  value: this.data[key]
                })
                break
            }
          }
        })
        .catch(err => {
          console.error(err)
        })
    },

    handleClick (tab, event) {
      this.getData(this.paramsVA)
    //   console.log(tab)
    //   if (tab.name === 'volAlarm') {
    //     this.tableColumn = this.volColumn
    //     this.activeArray = this.volData
    //   } else if (tab.name === 'overVolAlarm') {
    //     this.tableColumn = this.overVolColumn
    //     this.activeArray = this.overVolData
    //   }
    },

    setData () {
      this.volColumn = [
        { type: 'checkbox', width: 50, fixed: 'left', title: '序号' },
        { type: 'index', width: 50, fixed: 'left' }
      ]
      this.overVolColumn = [
        { type: 'checkbox', width: 50, fixed: 'left', title: '序号' },
        { type: 'index', width: 50, fixed: 'left' }
      ]
      this.volInfo = [
        {
          key: 'nUMBER_OF_HIGHEST_VOLTAGE_BATTERY_WHEN_ALARMING',
          value: '报警时最高电压电池编号'
        },
        {
          key: 'tHE_HIGHEST_VOLTAGE_WHEN_ALARMING',
          value: '报警时最高电压值'
        },
        {
          key: 'nUMBER_OF_HIGHEST_VOLTAGE_BATTERY_WHEN_SHUT_DOWN',
          value: '停机时最高电压电池编号'
        },
        {
          key: 'mAXIMUM_VOLTAGE_VALUE_WHEN_STOPPED',
          value: '停机时最高电压值'
        },
        {
          key: 'mINIMUM_VOLTAGE_BATTERY_NUMBER_WHEN_ALARM',
          value: '报警时最低电压电池编号'
        },
        {
          key: 'mINIMUM_VOLTAGE_WHEN_ALARMING',
          value: '报警时最低电压值'
        },
        {
          key: 'mINIMUM_VOLTAGE_BATTERY_NUMBER_WHEN_SHUT_DOWN',
          value: '停机时最低电压电池编号'
        },
        {
          key: 'mINIMUM_VOLTAGE_VALUE_WHEN_SHUTDOWN',
          value: '停机时最低电压值'
        }
      ]
      this.volInfo.forEach((item, i) => {
        this.volColumn.push({ field: item.key, title: item.value, width: 180 })
      })

      this.overVolInfo = [
        {
          key: 'tHE_VOLTAGE_VALUE_WHEN_THE_BATTERY_OVERVOLTAGE_ALARM',
          value: '电池组过压报警时电压值'
        },
        {
          key: 'tHE_VOLTAGE_VALUE_WHEN_THE_BATTERY_OVERVOLTAGE_STOPS',
          value: '电池组过压停机时电压值'
        },
        {
          key: 'vOLTAGE_VALUE_WHEN_BATTERY_UNDERVOLTAGE_ALARM',
          value: '电池组欠压报警时电压值'
        },
        {
          key: 'tHE_VOLTAGE_VALUE_WHEN_THE_BATTERY_IS_SHUT_DOWN',
          value: '电池组欠压停机时电压值'
        },
        {
          key: 'tOTAL_DIFFERENTIAL_PRESSURE_HIGH_WARNING_VALUE',
          value: '总压差高告警值'
        },
        {
          key: 'tOTAL_DIFFERENTIAL_PRESSURE_HIGH_STOP_VALUE',
          value: '总压差高停机值'
        }
      ]
      this.overVolInfo.forEach((item, i) => {
        this.overVolColumn.push({
          field: item.key,
          title: item.value,
          width: 180
        })
      })

      this.tableColumn = this.volColumn
    }
  }
}
</script>

<style scoped>
.box-card {
  line-height: 10px;
  font-size: 15px;
  text-align: left;
  /* margin-bottom: 20px; */
  box-sizing: border-box;
}

.el-card:nth-last-child(1) {
  margin-top: 20px;
}
</style>
