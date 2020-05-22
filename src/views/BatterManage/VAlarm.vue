<template>
  <div>
    <el-card class="box-card">
      <!-- 基础信息 -->
      <!-- 基础信息 -->
      <div slot="header" class="clearfix">
        <span>{{ $t("vAlarm.searchTitle") }}</span>
      </div>
      <el-form label-width="80px" :inline="true">
        <el-form-item
          v-for="(item, index) in baseIfo"
          :key="index"
          :label="item.label"
        >
          <el-input :value="item.value" :readonly="true"></el-input>
        </el-form-item>
        <el-form-item :label="$t('vAlarm.formLabel')[0]">
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
        <el-tab-pane :label="$t('vAlarm.tabs')[0]" name="volAlarm">
        </el-tab-pane>
        <el-tab-pane :label="$t('vAlarm.tabs')[1]" name="temperatureAlarm">
        </el-tab-pane>
        <el-tab-pane :label="$t('vAlarm.tabs')[2]" name="othersAlarm">
        </el-tab-pane>
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
            {{ $t("base.refresh") }}
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
          <el-button
            class="menu-btn"
            :title="$t('base.export.title')"
            v-popover:export
          >
            <i class="fa fa-download"></i>
          </el-button>
          <el-button
            class="menu-btn"
            @click="printEvent"
            :title="$t('base.export.print')"
          >
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
                {{ $t("base.export.csv") }}
              </li>
              <li @click="exportExcel">
                {{ $t("base.export.excel") }}
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
            v-for="(config, index) in volColumn"
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
      volInfo: [],
      temperatureInfo: [],
      othersInfo: [],
      customColumns: [],
      loading: false,
      api: '/api/Devices/GetRegistrationEquipment',
      tableColumn: [],
      volColumn: [],
      temperatureColumn: [],
      othersColumn: [],
      activeArray: [],
      volData: [],
      temperatureData: [],
      othersData: [],
      fileName: 'export'
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
      this.isShow()
    }
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
        export_json_to_excel(tHeader, data, `${this.fileName}`)
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
          this.setData()
          if (res.data.code === 0) {
            // var data = res.data.data
            this.data = res.data.data
            // 设置电压数据
            this.volData = []
            this.volInfo.forEach((item, i) => {
              this.volData.push({ name: item.value })
              if (this.data.hasOwnProperty(item.key)) {
                this.data[item.key].forEach((val, index) => {
                  this.volData[i]['index' + index] = val
                })
              }
            })
            // 设置温度数据
            this.temperatureData = []
            this.temperatureInfo.forEach((item, i) => {
              this.temperatureData.push({ name: item.value })
              if (this.data.hasOwnProperty(item.key)) {
                this.data[item.key].forEach((val, index) => {
                  this.temperatureData[i]['index' + index] = val
                })
              }
            })
            // 设置其他数据
            this.othersData = []
            this.othersInfo.forEach((item, i) => {
              this.othersData.push({ name: item.value })
              if (this.data.hasOwnProperty(item.key)) {
                this.data[item.key].forEach((val, index) => {
                  this.othersData[i]['index' + index] = val
                })
              }
            })
            this.isShow()
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
                this.baseIfo.push({
                  label: this.$t('vAlarm.formLabel')[2],
                  value: this.data[key]
                })
                break
              case 'DICCID':
                this.baseIfo.push({
                  label: this.$t('vAlarm.formLabel')[1],
                  value: this.data[key]
                })
                break
              case 'DVIN':
                this.baseIfo.push({
                  label: this.$t('vAlarm.formLabel')[3],
                  value: this.data[key]
                })
                break
              case 'DName':
                this.baseIfo.push({
                  label: this.$t('vAlarm.formLabel')[4],
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
      this.isShow()
    },

    setData () {
      this.volColumn = [
        { type: 'checkbox', width: 50, fixed: 'left' },
        { type: 'index', width: 50, fixed: 'left', title: '序号' }
      ]
      this.volInfo = [
        {
          key: 'nUMBER_OF_HIGHEST_VOLTAGE_BATTERY_WHEN_ALARMING',
          value: this.$t('vAlarm.volInfo')[0]
        },
        {
          key: 'tHE_HIGHEST_VOLTAGE_WHEN_ALARMING',
          value: this.$t('vAlarm.volInfo')[1]
        },
        {
          key: 'nUMBER_OF_HIGHEST_VOLTAGE_BATTERY_WHEN_SHUT_DOWN',
          value: this.$t('vAlarm.volInfo')[2]
        },
        {
          key: 'mAXIMUM_VOLTAGE_VALUE_WHEN_STOPPED',
          value: this.$t('vAlarm.volInfo')[3]
        },
        {
          key: 'mINIMUM_VOLTAGE_BATTERY_NUMBER_WHEN_ALARM',
          value: this.$t('vAlarm.volInfo')[4]
        },
        {
          key: 'mINIMUM_VOLTAGE_WHEN_ALARMING',
          value: this.$t('vAlarm.volInfo')[5]
        },
        {
          key: 'mINIMUM_VOLTAGE_BATTERY_NUMBER_WHEN_SHUT_DOWN',
          value: this.$t('vAlarm.volInfo')[6]
        },
        {
          key: 'mINIMUM_VOLTAGE_VALUE_WHEN_SHUTDOWN',
          value: this.$t('vAlarm.volInfo')[7]
        },
        {
          key: 'tHE_VOLTAGE_VALUE_WHEN_THE_BATTERY_OVERVOLTAGE_ALARM',
          value: this.$t('vAlarm.volInfo')[8]
        },
        {
          key: 'tHE_VOLTAGE_VALUE_WHEN_THE_BATTERY_OVERVOLTAGE_STOPS',
          value: this.$t('vAlarm.volInfo')[9]
        },
        {
          key: 'vOLTAGE_VALUE_WHEN_BATTERY_UNDERVOLTAGE_ALARM',
          value: this.$t('vAlarm.volInfo')[10]
        },
        {
          key: 'tHE_VOLTAGE_VALUE_WHEN_THE_BATTERY_IS_SHUT_DOWN',
          value: this.$t('vAlarm.volInfo')[11]
        },
        {
          key: 'wARNING_VALUE_OF_MONOMER_PRESSURE_DIFFERENCE_HEIGHT',
          value: this.$t('vAlarm.volInfo')[12]
        },
        {
          key: 'tHE_VOLTAGE_VALUE_WHEN_THE_BATTERY_IS_SHUT_DOWN',
          value: this.$t('vAlarm.volInfo')[13]
        },
        {
          key: 'wARNING_VALUE_OF_MONOMER_PRESSURE_DIFFERENCE_HEIGHT',
          value: this.$t('vAlarm.volInfo')[14]
        },
        {
          key: 'tOTAL_DIFFERENTIAL_PRESSURE_HIGH_STOP_VALUE',
          value: this.$t('vAlarm.volInfo')[15]
        }
      ]
      this.temperatureInfo = [
        {
          key: 'nUMBER_OF_HIGHEST_BATTERY_TEMPERATURE_POINT_WHEN_ALARMING',
          value: this.$t('vAlarm.temperatureInfo')[0]
        },
        {
          key: 'tHE_HIGHEST_BATTERY_TEMPERATURE_WHEN_ALARMING',
          value: this.$t('vAlarm.temperatureInfo')[1]
        },
        {
          key: 'nUMBER_OF_HIGHEST_BATTERY_TEMPERATURE_POINT_WHEN_SHUT_DOWN',
          value: this.$t('vAlarm.temperatureInfo')[2]
        },
        {
          key: 'mAXIMUM_BATTERY_TEMPERATURE_WHEN_SHUT_DOWN',
          value: this.$t('vAlarm.temperatureInfo')[3]
        },
        {
          key: 'nUMBER_OF_LOWEST_BATTERY_TEMPERATURE_POINT_WHEN_ALARMING',
          value: this.$t('vAlarm.temperatureInfo')[4]
        },
        {
          key: 'mINIMUM_BATTERY_TEMPERATURE_WHEN_ALARMING',
          value: this.$t('vAlarm.temperatureInfo')[5]
        },
        {
          key: 'mINIMUM_BATTERY_TEMPERATURE_POINT_NUMBER_WHEN_SHUT_DOWN',
          value: this.$t('vAlarm.temperatureInfo')[6]
        },
        {
          key: 'mINIMUM_BATTERY_TEMPERATURE_WHEN_SHUT_DOWN',
          value: this.$t('vAlarm.temperatureInfo')[7]
        },
        {
          key: 'nUMBER_OF_THE_HIGHEST_POWER_TEMPERATURE_POINT_WHEN_ALARMING',
          value: this.$t('vAlarm.temperatureInfo')[8]
        },
        {
          key: 'mAXIMUM_POWER_TEMPERATURE_WHEN_ALARMING',
          value: this.$t('vAlarm.temperatureInfo')[9]
        },
        {
          key: 'nUMBER_OF_HIGHEST_POWER_TEMPERATURE_POINT_WHEN_SHUTDOWN',
          value: this.$t('vAlarm.temperatureInfo')[10]
        },
        {
          key: 'mAXIMUM_POWER_TEMPERATURE_VALUE_DURING_SHUTDOWN',
          value: this.$t('vAlarm.temperatureInfo')[11]
        },
        {
          key: 'hIGH_TEMPERATURE_DIFFERENCE_ALARM_VALUE_OF_SINGLE_UNIT',
          value: this.$t('vAlarm.temperatureInfo')[12]
        },
        {
          key: 'sINGLE_TEMPERATURE_DIFFERENCE_HIGH_STOP_VALUE',
          value: this.$t('vAlarm.temperatureInfo')[13]
        }
      ]
      this.othersInfo = [
        {
          key: 'oPERATING_STATE_OF_THIS_BRANCH',
          value: this.$t('vAlarm.othersInfo')[0]
        },
        {
          key: 'eQUIPMENT_FAULT_ALARM_MESSAGE',
          value: this.$t('vAlarm.othersInfo')[1]
        },
        {
          key: 'tHE_VALUE_OF_THE_CURRENT_WHEN_THE_BATTERY_OVERCHARGE_ALARM',
          value: this.$t('vAlarm.othersInfo')[2]
        },
        {
          key: 'tHE_VALUE_OF_CURRENT_WHEN_THE_BATTERY_OVERCHARGES_AND_STOPS',
          value: this.$t('vAlarm.othersInfo')[3]
        },
        {
          key: 'bATTERY_DISCHARGE_OVERCURRENT_ALARM_WHEN_THE_CURRENT_VALUE',
          value: this.$t('vAlarm.othersInfo')[4]
        },
        {
          key: 'tHE_CURRENT_VALUE_WHEN_THE_BATTERY_DISCHARGE_OVERCURRENT_STOPS',
          value: this.$t('vAlarm.othersInfo')[5]
        },
        {
          key: 'iNSULATION_TOO_SMALL_ALARM_VALUE',
          value: this.$t('vAlarm.othersInfo')[6]
        },
        {
          key: 'iNSULATION_TOO_SMALL_STOP_VALUE',
          value: this.$t('vAlarm.othersInfo')[7]
        }
      ]
      this.volColumn.push({
        field: 'name',
        title: this.$t('vAlarm.title'),
        width: 250,
        align: 'left'
      })
      for (let index = 0; index < 12; index++) {
        this.volColumn.push({
          field: 'index' + index,
          title: this.$t('vAlarm.unit')[0] + (index + 1) + this.$t('vAlarm.unit')[1],
          width: 100
        })
      }
    },
    // 判断页面
    isShow () {
      switch (this.activeName) {
        case 'volAlarm':
          this.activeArray = this.volData
          break
        case 'temperatureAlarm':
          this.activeArray = this.temperatureData
          break
        case 'othersAlarm':
          this.activeArray = this.othersData
          break
      }
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
.menu-btn {
  position: relative;
  /* width: 25px;
  height: 25px; */
  float: right;
}

.button-left {
  float: left;
}

.menu-btn:hover + .menu-wrapper {
  display: block;
}
.menu-wrapper:hover {
  display: block;
}
.table-oper {
  position: relative;
}

.menu-wrapper {
  display: none;
  position: absolute;
  width: 150px;
  top: 16px;
  right: 0;
  z-index: 9;
  background-color: #fff;
  font-size: 14px;
  padding: 4px 10px;
  user-select: none;
  border: 1px solid #e8eaec;
  text-align: left;
}

.checkbox-item {
  display: block;
  margin: 4px 0;
}

.icon-menu {
  width: 16px;
  height: 0px;
  display: inline-block;
  margin-bottom: 16px;
  box-shadow: 0 6px 0 2px #606266, 0 0 0 2px #606266, 0 12px 0 2px #606266;
}

.table-oper .el-button {
  padding: 8px 10px;
  margin-left: 5px;
}

.menu-btn:focus,
.menu-btn:active {
  color: #606266;
  border-color: #dcdfe6;
  background-color: #fff;
}
</style>
