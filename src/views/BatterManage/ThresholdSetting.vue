<template>
  <div>
    <!-- 表单开始 -->
    <el-collapse-transition>
      <div style="box-sizing:border-box;" v-show="isShow">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>设备管理列表查询</span>
          </div>
          <el-form
            :inline="true"
            :model="formInline"
            class="demo-form-inline"
            label-width="90px"
            label-position="right"
          >
            <el-form-item label="ICCID编号:">
              <el-input
                v-model="formInline.ICCID"
                placeholder="请输入ICCID编号"
              ></el-input>
            </el-form-item>
            <el-form-item label="设备编号:">
              <el-input
                v-model="formInline.IDS"
                placeholder="请输入设备编号"
              ></el-input>
            </el-form-item>
            <el-form-item label="VIN编码:">
              <el-input
                v-model="formInline.VIN"
                placeholder="请输入VIN编码"
              ></el-input>
            </el-form-item>
            <el-form-item label="设备名称:">
              <el-input
                v-model="formInline.Name"
                placeholder="请输入设备名称"
              ></el-input>
            </el-form-item>
            <!-- <br> -->
            <el-form-item>
              <el-button
                type="primary"
                @click="
                  formInline.page = 1;
                  getData();
                "
                >查询</el-button
              >
            </el-form-item>
          </el-form>
        </el-card>
        <div style="height:20px;width:100%"></div>
      </div>
    </el-collapse-transition>
    <!-- 表单结束 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>设备管理</span>
      </div>

      <!-- 表格操作栏开始 -->
      <div class="table-oper">
        <el-button
          type="primary"
          size="small"
          @click="getData"
          class="button-left"
        >
          <i class="el-icon-refresh-right"></i>
          刷新
        </el-button>
        <el-button
          type="primary"
          size="small"
          class="button-left"
          @click="isShow = !isShow"
        >
          <i class="el-icon-search"></i>
          模糊查询
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
        <el-button class="menu-btn" :title="$t('base.export.title')" v-popover:export>
          <i class="fa fa-download"></i>
        </el-button>
        <el-button class="menu-btn" @click="printEvent" :title="$t('base.export.print')">
          <i class="fa fa-print"></i>
        </el-button>
        <!-- 导出操作开始 -->
        <el-popover ref="export" placement="bottom" width="100" trigger="hover">
          <ul id="export">
            <li @click="exportDataEvent">
              {{$t('base.export.csv')}}
            </li>
            <li @click="exportExcel">
              {{$t('base.export.excel')}}
            </li>
          </ul>
        </el-popover>
        <!-- 导出操作结束 -->
      </div>
      <!-- 表格操作栏结束 -->

      <!-- 表格开始 -->
      <vxe-table
        :data="tableData"
        border
        :customs.sync="customColumns"
        ref="xTable"
        v-loading="loading"
        element-loading-background="rgba(0, 0, 0, 0)"
        :edit-config="{ trigger: 'manual', mode: 'row' }"
        resizable
        align="center"
        highlight-hover-row
        highlight-current-row
      >
        <vxe-table-column
          type="checkbox"
          width="50"
          fixed="left"
        ></vxe-table-column>
        <vxe-table-column type="seq" width="50" title="序号" fixed="left">
        </vxe-table-column>
        <vxe-table-column
          field="DIDS"
          title="设备ID字符串"
          sortable
          width="250"
          show-overflow
        >
        </vxe-table-column>
        <vxe-table-column field="DName" show-overflow title="设备名称" sortable width="200">
        </vxe-table-column>
        <vxe-table-column
          field="DManageMentUserName"
          title="设备管理员"
          sortable
          width="200"
          show-overflow
          align="left"
        >
        </vxe-table-column>
        <vxe-table-column field="DTime" show-overflow title="登记时间" sortable width="250">
        </vxe-table-column>
        <vxe-table-column title="操作" width="500">
          <template v-slot="{ row }">
            <el-button
              plain
              size="mini"
              v-for="(item, index) in detail"
              :key="index"
              @click="toDetail(row, item)"
            >
              <i class="el-icon-info">{{ item.label }}</i>
            </el-button>
          </template>
        </vxe-table-column>
      </vxe-table>
      <!-- 表格结束 -->

      <!-- 分页开始 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="formInline.page"
        :page-sizes="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="count"
      >
      </el-pagination>
      <!-- 分页结束 -->

      <!-- 详情Dialog开始 -->
      <el-dialog
        width="50%"
        :close-on-click-modal="false"
        :title="activeDialog.label"
        :visible.sync="dialogFormVisible"
      >
        <div style="height:500px;overflow:auto">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>设备信息</span>
            </div>
            <el-form
              :inline="false"
              :model="formList"
              class="demo-form-inline"
              label-width="90px"
              label-position="right"
            >
              <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
                <el-form-item label="设备编号:">
                  <el-input
                    :readonly="true"
                    v-model="formList.BatteryIDS"
                  ></el-input>
                </el-form-item>
              </el-col>

              <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
                <el-form-item label="设备名称:">
                  <el-input
                    :readonly="true"
                    v-model="formList.DName"
                  ></el-input>
                </el-form-item>
              </el-col>

              <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
                <el-form-item label="设备Bank">
                  <el-select
                    v-model="formList.BankIndex"
                    @change="getBatteryBankCTRLParaCharts"
                  >
                    <el-option label="Bank1" value="0"></el-option>
                    <el-option label="Bank2" value="1"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-form>
          </el-card>

          <el-card class="box-card" style="margin-top:20px">
            <div slot="header" class="clearfix">
              <span>{{ activeDialog.cardTop }}</span>
            </div>
            <el-form label-width="170px" label-position="left">
              <el-form-item
                v-for="(item, index) in list"
                :key="index"
                :label="item.label"
              >
                <el-input v-model="item.value"></el-input>
              </el-form-item>
            </el-form>
          </el-card>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submit">提交</el-button>
          <el-button type="primary" @click="getBatteryBankCTRLParaCharts"
            >刷新</el-button
          >
          <el-button type="primary" @click="dialogFormVisible = false"
            >取消</el-button
          >
        </div>
      </el-dialog>
      <!-- 详情Dialog结束 -->
    </el-card>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
export default {
  data () {
    return {
      formInline: {
        page: 1,
        limit: 2,
        ICCID: '',
        IDS: '',
        VIN: '',
        Name: '',
        AutoSystemID: ''
      },
      tableData: [],
      customColumns: [],
      isShow: true,
      fileName: '设备信息',
      count: 0,
      loading: false,
      detail: [
        {
          label: '电压门限',
          path: 'list1',
          cardTop: '电压门限信息',
          BankAddress1: 0x2790,
          BankAddress2: 0x7790
        },
        {
          label: '充电一般门限',
          path: 'list2',
          cardTop: '充电一般门限信息',
          BankAddress1: 0x279c,
          BankAddress2: 0x779c
        },
        {
          label: '充电过流门限',
          path: 'list3',
          cardTop: '充电过流门限信息',
          BankAddress1: 0x27b6,
          BankAddress2: 0x77b6
        },
        {
          label: '环境门限',
          path: 'list4',
          cardTop: '环境门限信息',
          BankAddress1: 0x2934,
          BankAddress2: 0x7934
        }
      ],
      dialogFormVisible: false,
      activeDialog: '',
      formList: {
        AutoSystemID: '',
        BatteryIDS: '',
        BankIndex: '',
        DName: ''
      },
      list: [],
      list1: [
        {
          label: '单体过压停机',
          name: 'sINGLE_OVERVOLTAGE_STOP_THRESHOLD',
          value: ''
        },
        {
          label: '单体过压停机恢复',
          name: 'sINGLE_OVERVOLTAGE_SHUTDOWN_RECOVERY_THRESHOLD',
          value: ''
        },
        {
          label: '总压过压停机',
          name: 'tOTAL_OVERVOLTAGE_SHUTDOWN_THRESHOLD',
          value: ''
        },
        {
          label: '总压过压停机恢复',
          name: 'tOTAL_VOLTAGE_OVERVOLTAGE_SHUTDOWN_RECOVERY',
          value: ''
        },
        {
          label: '主回路充电过流停机',
          name: 'mAIN_LOOP_CHARGING_OVERCURRENT_STOP_THRESHOLD',
          value: ''
        },
        {
          label: '主回路充电过流停机恢复',
          name: 'mAIN_LOOP_CHARGING_OVERCURRENT_SHUTDOWN_RECOVER_THRESHOLD',
          value: ''
        },
        {
          label: '单体欠停机压',
          name: 'sINGLE_UNIT_UNDER_SHUTDOWN_VOLTAGE_THRESHOLD',
          value: ''
        },
        {
          label: '单体欠压停机恢复',
          name: 'sINGLE_UNIT_UNDER_VOLTAGE_SHUTDOWN_RECOVERY_THRESHOLD',
          value: ''
        },
        {
          label: '总压欠压停机',
          name: 'tOTAL_VOLTAGE_UNDERVOLTAGE_SHUTDOWN',
          value: ''
        },
        {
          label: '总压欠压停机恢复',
          name: 'tOTAL_VOLTAGE_UNDER_VOLTAGE_SHUTDOWN_RECOVERY',
          value: ''
        },
        {
          label: '主回路放电过流停机',
          name: 'mAIN_LOOP_DISCHARGE_OVERCURRENT_STOP_THRESHOLD',
          value: ''
        },
        {
          label: '主回路放电过流停机恢复',
          name: 'mAIN_LOOP_DISCHARGE_OVER_CURRENT_SHUTDOWN_THRESHOLD',
          value: ''
        }
      ],
      list2: [
        {
          label: '充电温度过高停机',
          name: 'cHARGING_TEMPERATURE_TOO_HIGH_STOP_THRESHOLD',
          value: ''
        },
        {
          label: '充电温度过高停机恢复',
          name: 'eXCESSIVE_CHARGING_TEMPERATURE_SHUTDOWN_RECOVERY_THRESHOLD',
          value: ''
        },
        {
          label: '充电温度过低停机',
          name: 'cHARGING_TEMPERATURE_TOO_LOW_STOP_THRESHOLD',
          value: ''
        },
        {
          label: '充电温度过低停机恢复',
          name: 'lOW_CHARGING_TEMPERATURE_SHUTDOWN_RECOVERY_THRESHOLD',
          value: ''
        },
        {
          label: 'SOC过低停机',
          name: 'sOC_TOO_LOW_STOP_THRESHOLD',
          value: ''
        },
        {
          label: 'SOC过低停机恢复',
          name: 'sOC_TOO_LOW_SHUTDOWN_RECOVERY_THRESHOLD',
          value: ''
        }
      ],
      list3: [
        {
          label: '充电过流三级停机保护',
          name:
            'cHARGING_OVERCURRENT_THREE_STAGE_SHUTDOWN_PROTECTION_THRESHOLD',
          value: ''
        },
        {
          label: '充电过流三级停机恢复',
          name: 'cHARGING_OVERCURRENT_THREE_STAGE_SHUTDOWN_RECOVERY_THRESHOLD',
          value: ''
        },
        {
          label: '放电过流三级停机保护',
          name:
            'dISCHARGE_OVERCURRENT_THREE_STAGE_SHUTDOWN_PROTECTION_THRESHOLD',
          value: ''
        },
        {
          label: '放电过流三级停机恢复',
          name: 'dISCHARGE_OVERCURRENT_THREE_STAGE_SHUTDOWN_RECOVERY_THRESHOLD',
          value: ''
        }
      ],
      list4: [
        {
          label: '功率温度过高停机',
          name: 'eXCESSIVE_POWER_TEMPERATURE_SHUTDOWN_THRESHOLD',
          value: ''
        },
        {
          label: '功率温度过高停机恢复',
          name: 'eXCESSIVE_POWER_TEMPERATURE_SHUTDOWN_RECOVERY_THRESHOLD',
          value: ''
        },
        {
          label: '绝缘失效停机',
          name: 'iNSULATION_FAILURE_STOP_THRESHOLD',
          value: ''
        },
        {
          label: '绝缘失效停机恢复',
          name: 'iNSULATION_FAILURE_SHUTDOWN_RECOVERY_THRESHOLD',
          value: ''
        },
        {
          label: '单体压差过高停机',
          name: 'sINGLE_UNIT_DIFFERENTIAL_PRESSURE_TOO_HIGH_STOP_THRESHOLD',
          value: ''
        },
        {
          label: '单体压差过高停机恢复',
          name:
            'mONOMER_DIFFERENTIAL_PRESSURE_TOO_HIGH_SHUTDOWN_RECOVERY_THRESHOLD',
          value: ''
        },
        {
          label: '总电压压差过高停机',
          name:
            'tHE_TOTAL_VOLTAGE_DIFFERENTIAL_IS_TOO_HIGH_TO_STOP_THE_MACHINE',
          value: ''
        },
        {
          label: '总电压压差过高停机恢复',
          name:
            'tOTAL_VOLTAGE_DIFFERENTIAL_TOO_HIGH_SHUTDOWN_RECOVERY_THRESHOLD',
          value: ''
        },
        {
          label: '放电过温停机',
          name: 'dISCHARGE_OVER_TEMPERATURE_STOP_THRESHOLD',
          value: ''
        },
        {
          label: '放电过温停机恢复',
          name: 'dISCHARGE_OVER_TEMPERATURE_SHUTDOWN_RECOVERY_THRESHOLD',
          value: ''
        },
        {
          label: '放电欠温停机',
          name: 'dISCHARGE_UNDERTEMPERATURE_SHUTDOWN_THRESHOLD',
          value: ''
        },
        {
          label: '放电欠温停机恢复',
          name: 'dISCHARGE_UNDERTEMPERATURE_SHOTDOWN_RECOVERY_THRESHOLD',
          value: ''
        },
        {
          label: '温差过高停机',
          name: 'hIGH_TEMPERATURE_DIFFERENCE_STOP_THRESHOLD',
          value: ''
        },
        {
          label: '温差过高停机恢复',
          name: 'hIGH_TEMPERATURE_DIFFERENCE_DOWNTIME_RECOVERY_THRESHOLD',
          value: ''
        },
        {
          label: '环境温度过高停机',
          name: 'aMBIENT_TEMPERATURE_TOO_HIGH_STOP_THRESHOLD',
          value: ''
        },
        {
          label: '环境温度过高停机恢复',
          name: 'aMBIENT_TEMPERATURE_TOO_HIGH_SHUTDOWN_RECOVERY_THRESHOLD',
          value: ''
        },
        {
          label: '环境温度过低停机',
          name: 'aMBIENT_TEMPERATURE_TOO_LOW_STOP_THRESHOLD',
          value: ''
        },
        {
          label: '环境温度过低停机恢复',
          name: 'aMBIENT_TEMPERATURE_TOO_LOW_SHUTDOWN_RECOVERY_THRESHOLD',
          value: ''
        }
      ]
    }
  },
  methods: {
    ...mapMutations('detail', ['set_paramsD', 'set_paramsB', 'set_paramsS']),
    ...mapMutations('tabs', ['set_detail_label']),
    getData () {
      this.loading = true
      this.formInline.AutoSystemID = localStorage.getItem('AutoSystemID')
      this.$axios
        .get(
          `/api/Devices/GetRegistrationEquipmentList?AutoSystemID=${this.formInline.AutoSystemID}&page=${this.formInline.page}&limit=${this.formInline.limit}&ICCID=${this.formInline.ICCID}&IDS=${this.formInline.IDS}&VIN=${this.formInline.VIN}&Name=${this.formInline.Name}`
        )
        .then(res => {
          if (res.data.data) {
            this.tableData = res.data.data
          } else {
            this.tableData = []
          }
          this.count = res.data.count
          this.loading = false
          this.$refs.xTable.reloadCustoms([])
        })
        .catch(error => {
          console.log(error)
        })
    },

    // 每页显示多少条
    handleSizeChange (val) {
      this.formInline.limit = val
      this.getData()
    },

    // 当前页
    handleCurrentChange (val) {
      this.formInline.page = val
      this.getData()
    },

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

    // 操作页
    toDetail (row, item) {
      this.activeDialog = item
      this.formList.BatteryIDS = row.DIDS
      this.formList.AutoSystemID = this.formInline.AutoSystemID
      this.formList.BankIndex = '0'
      this.formList.DName = row.DName
      this.getBatteryBankCTRLParaCharts()
      this.dialogFormVisible = true
    },

    // 获取详细数据
    getBatteryBankCTRLParaCharts () {
      var name = this.activeDialog.path
      var url = '/api/Chart/GetBatteryBankSTOPParaCharts'
      this.$axios
        .get(url, {
          params: {
            AutoSystemID: this.formList.AutoSystemID,
            BatteryIDS: this.formList.BatteryIDS,
            BankIndex: this.formList.BankIndex
          }
        })
        .then(res => {
          if (res.data.code === 0) {
            for (const el of this[name]) {
              el.value = res.data.data[el.name]
            }
            this.list = this[name]
          } else if (res.data.code === 1) {
            this.$message.error(res.data.msg)
          }
        })
        .catch(err => {
          console.error(err)
        })
    },

    // 提交
    submit () {
      var arr = []
      for (const el of this.list) {
        switch (el.name) {
          case 'sINGLE_OVERVOLTAGE_STOP_THRESHOLD':
          case 'sINGLE_OVERVOLTAGE_SHUTDOWN_RECOVERY_THRESHOLD':
          case 'sINGLE_UNIT_UNDER_VOLTAGE_SHUTDOWN_RECOVERY_THRESHOLD':
          case 'sINGLE_UNIT_UNDER_SHUTDOWN_VOLTAGE_THRESHOLD':
          case 'sINGLE_UNIT_DIFFERENTIAL_PRESSURE_TOO_HIGH_STOP_THRESHOLD':
          case 'mONOMER_DIFFERENTIAL_PRESSURE_TOO_HIGH_SHUTDOWN_RECOVERY_THRESHOLD':
            arr.push(parseFloat(el.value) * 1000)
            break
          case 'tOTAL_OVERVOLTAGE_SHUTDOWN_THRESHOLD':
          case 'tOTAL_VOLTAGE_OVERVOLTAGE_SHUTDOWN_RECOVERY':
          case 'mAIN_LOOP_CHARGING_OVERCURRENT_STOP_THRESHOLD':
          case 'mAIN_LOOP_CHARGING_OVERCURRENT_SHUTDOWN_RECOVER_THRESHOLD':
          case 'tOTAL_VOLTAGE_UNDERVOLTAGE_SHUTDOWN':
          case 'tOTAL_VOLTAGE_UNDER_VOLTAGE_SHUTDOWN_RECOVERY':
          case 'mAIN_LOOP_DISCHARGE_OVERCURRENT_STOP_THRESHOLD':
          case 'mAIN_LOOP_DISCHARGE_OVER_CURRENT_SHUTDOWN_THRESHOLD':
          case 'tHE_TOTAL_VOLTAGE_DIFFERENTIAL_IS_TOO_HIGH_TO_STOP_THE_MACHINE':
          case 'tOTAL_VOLTAGE_DIFFERENTIAL_TOO_HIGH_SHUTDOWN_RECOVERY_THRESHOLD':
            arr.push(el.value * 10)
            break
          case 'cHARGING_TEMPERATURE_TOO_HIGH_STOP_THRESHOLD':
          case 'cHARGING_TEMPERATURE_TOO_LOW_STOP_THRESHOLD':
          case 'lOW_CHARGING_TEMPERATURE_SHUTDOWN_RECOVERY_THRESHOLD':
          case 'eXCESSIVE_CHARGING_TEMPERATURE_SHUTDOWN_RECOVERY_THRESHOLD':
          case 'eXCESSIVE_POWER_TEMPERATURE_SHUTDOWN_THRESHOLD':
          case 'aMBIENT_TEMPERATURE_TOO_HIGH_STOP_THRESHOLD':
          case 'aMBIENT_TEMPERATURE_TOO_HIGH_SHUTDOWN_RECOVERY_THRESHOLD':
          case 'aMBIENT_TEMPERATURE_TOO_LOW_STOP_THRESHOLD':
          case 'aMBIENT_TEMPERATURE_TOO_LOW_SHUTDOWN_RECOVERY_THRESHOLD':
            arr.push((parseFloat(el.value) + 60) * 10)
            break
          case 'sOC_TOO_LOW_STOP_THRESHOLD':
          case 'sOC_TOO_LOW_SHUTDOWN_RECOVERY_THRESHOLD':
            arr.push(parseFloat(el.value) * 1)
            break
          case 'cHARGING_OVERCURRENT_THREE_STAGE_SHUTDOWN_PROTECTION_THRESHOLD':
          case 'cHARGING_OVERCURRENT_THREE_STAGE_SHUTDOWN_RECOVERY_THRESHOLD':
          case 'dISCHARGE_OVERCURRENT_THREE_STAGE_SHUTDOWN_PROTECTION_THRESHOLD':
          case 'dISCHARGE_OVERCURRENT_THREE_STAGE_SHUTDOWN_RECOVERY_THRESHOLD':
            arr.push(parseFloat(el.value) * 10 + 0x8000)
            break
          case 'eXCESSIVE_POWER_TEMPERATURE_SHUTDOWN_RECOVERY_THRESHOLD':
          case 'dISCHARGE_OVER_TEMPERATURE_STOP_THRESHOLD':
          case 'dISCHARGE_OVER_TEMPERATURE_SHUTDOWN_RECOVERY_THRESHOLD':
          case 'dISCHARGE_UNDERTEMPERATURE_SHUTDOWN_THRESHOLD':
          case 'dISCHARGE_UNDERTEMPERATURE_SHOTDOWN_RECOVERY_THRESHOLD':
          case 'hIGH_TEMPERATURE_DIFFERENCE_STOP_THRESHOLD':
          case 'hIGH_TEMPERATURE_DIFFERENCE_DOWNTIME_RECOVERY_THRESHOLD':
            arr.push((parseFloat(el.value) + 60) * 1)
            break
          case 'iNSULATION_FAILURE_STOP_THRESHOLD':
          case 'iNSULATION_FAILURE_SHUTDOWN_RECOVERY_THRESHOLD':
            arr.push(parseFloat(el.value) * 1)
            break
        }
      }
      var BankAddress
      var url = '/api/Command/Write'
      // eslint-disable-next-line
      if (this.formList.BankIndex == 0)
        BankAddress = this.activeDialog.BankAddress1
      else BankAddress = this.activeDialog.BankAddress2
      var obj = {
        Address: BankAddress,
        IDS: this.formList.BatteryIDS,
        Data: arr
      }
      obj = JSON.stringify(obj)
      this.$axios
        .post(url, {
          AutoSystemID: this.formList.AutoSystemID,
          data: obj
        })
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          console.error(err)
        })
    }
  },

  computed: {
    ...mapState('table', ['pageSize'])
  },

  created () {
    this.formInline.limit = this.pageSize[0]
    this.getData()
  }
}
</script>

<style scoped>
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
