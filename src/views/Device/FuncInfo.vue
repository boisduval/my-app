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
          style="width:400px"
          v-for="(item, index) in baseIfo"
          :key="index"
          :label="item.label"
        >
          <el-input :value="item.value" :readonly="true" style="width:250px"></el-input>
        </el-form-item>
        <el-form-item label="设备Bank" style="width:400px">
          <el-select v-model="bank" style="width:250px">
            <el-option label="Bank1" value="0"></el-option>
            <el-option label="Bank2" value="1"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="box-card">
      <!-- 详细信息 -->
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="告警功能" name="alarm">
        </el-tab-pane>
        <el-tab-pane label="保护功能" name="protect">
        </el-tab-pane>
        <!-- 表格操作栏开始 -->
          <div class="table-oper">
            <el-button
              type="primary"
              size="small"
              @click="getData(paramsF)"
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
            :seq-config="{seqMethod: seqMethod}"
          >
            <vxe-table-column
              type="checkbox"
              width="50"
              fixed="left"
              align="center"
            ></vxe-table-column>
            <vxe-table-column
              type="seq"
              width="80"
              title="序号"
              fixed="left"
              align="center"
            >
            </vxe-table-column>
            <vxe-table-column
              v-for="(config, index) in tableColumn"
              :key="index"
              v-bind="config"
            >
              <template v-slot="{ row }">
                <template v-if="!row[index]">
                  <el-tag type="success" size="small" >正常</el-tag>
                </template>
                <template v-else>
                  <el-tag type="warning" size="small">告警</el-tag>
                </template>
              </template>
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
      activeName: 'alarm',
      bank: '0',
      aLARM_SWITCH_STATUS_ARRAY: [],
      pROTECT_SWITCH_STATUS_ARRAY: [],
      bitInfo: [],
      customColumns: [],
      loading: false,
      api: '/api/Devices/GetRegistrationEquipment',
      tableColumn: [],
      activeArray: []
    }
  },
  computed: {
    ...mapState('detail', ['paramsF'])
  },
  watch: {
    paramsF: {
      handler (newName, oldName) {
        this.data = {}
        this.baseIfo = []
        this.getDetail(this.api, this.paramsF)
        this.getData(this.paramsF)
      },
      deep: true
    },
    bank: {
      handler (newName, oldName) {
        this.getData(this.paramsF)
      }
    }
  },
  mounted () {
    if (this.paramsF.AutoSystemID && this.paramsF.batterID) {
      this.getDetail(this.api, this.paramsF)
      this.getData(this.paramsF)
      this.activeArray = this.aLARM_SWITCH_STATUS_ARRAY
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
        export_json_to_excel(tHeader, data, `${this.fileName}表`)
      })
    },
    formatJson (filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    },
    getData (params) {
      var AutoSystemID = localStorage.getItem('AutoSystemID')
      this.loading = true
      var url = '/api/Chart/GetBatteryBankCTRLParaCharts'
      this.$axios
        .get(
          `${url}?AutoSystemID=${AutoSystemID}&BatteryIDS=${params.batterID}&BankIndex=${this.bank}`
        )
        .then(res => {
          if (res.data.code === 0) {
            this.aLARM_SWITCH_STATUS_ARRAY =
              res.data.data.aLARM_SWITCH_STATUS_ARRAY
            this.pROTECT_SWITCH_STATUS_ARRAY =
              res.data.data.pROTECT_SWITCH_STATUS_ARRAY
            this.activeArray = this.aLARM_SWITCH_STATUS_ARRAY
            this.setData()
          } else if (res.data.code === 1) {
            this.$message.error(res.data.msg)
          }
          this.loading = false
        })
        .catch(err => {
          console.error(err)
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
      // this.getData()
      console.log(tab)
      if (tab.name === 'protect') {
        this.activeArray = this.pROTECT_SWITCH_STATUS_ARRAY
      } else {
        this.activeArray = this.aLARM_SWITCH_STATUS_ARRAY
      }
    },

    setData () {
      this.bitInfo = [
        '单体过压',
        '系统过压',
        '充电过流',
        '单体欠压',
        '系统欠压',
        '放电过流',
        '充电温度过高',
        '充电温度过低',
        'SOC过低',
        '充电过流三级（无效）',
        '功率温度过高',
        '环境温度过高',
        '环境温度过低',
        '放电过流三级（无效）',
        '放电温度过高',
        '放电温度过低'
      ]
      this.tableColumn = []
      for (var i = 0; i < 16; i++) {
        var key = 'BATTER_BIT_' + (i + 1)
        this.tableColumn.push({ field: key, title: this.bitInfo[i], width: 100 })
      }
    },
    seqMethod ({ rowIndex }) {
      return '第' + (rowIndex + 1) + '簇'
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
