<template>
  <div>
    <!-- 表单开始 -->
    <el-collapse-transition>
      <div style="box-sizing:border-box;" v-show="isShow">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>{{ $t("thresholdSetting.searchTitle") }}</span>
          </div>
          <el-form
            :inline="true"
            :model="formInline"
            class="demo-form-inline"
            label-width="90px"
            label-position="right"
          >
            <el-form-item :label="$t('thresholdSetting.searchForm.label')[0]">
              <el-input
                v-model="formInline.ICCID"
                :placeholder="$t('thresholdSetting.searchForm.placeholder')[0]"
              ></el-input>
            </el-form-item>
            <el-form-item :label="$t('thresholdSetting.searchForm.label')[1]">
              <el-input
                v-model="formInline.IDS"
                :placeholder="$t('thresholdSetting.searchForm.placeholder')[1]"
              ></el-input>
            </el-form-item>
            <el-form-item :label="$t('thresholdSetting.searchForm.label')[2]">
              <el-input
                v-model="formInline.VIN"
                :placeholder="$t('thresholdSetting.searchForm.placeholder')[2]"
              ></el-input>
            </el-form-item>
            <el-form-item :label="$t('thresholdSetting.searchForm.label')[3]">
              <el-input
                v-model="formInline.Name"
                :placeholder="$t('thresholdSetting.searchForm.placeholder')[3]"
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
                >{{ $t("base.searchbtn") }}</el-button
              >
            </el-form-item>
          </el-form>
        </el-card>
        <div style="height:20px;width:100%"></div>
      </div>
    </el-collapse-transition>
    <!-- 表单结束 -->
    <el-card class="box-card visible">
      <div slot="header" class="clearfix">
        <span>{{ $t("thresholdSetting.listTitle") }}</span>
      </div>

      <!-- 表格开始 -->
      <vxe-toolbar custom print export>
        <template v-slot:buttons>
          <el-button
          type="primary"
          size="small"
          @click="getData"
          class="button-left"
        >
          <i class="el-icon-refresh-right"></i>
          {{ $t("base.refresh") }}
        </el-button>
        <el-button
          type="primary"
          size="small"
          class="button-left"
          @click="isShow = !isShow"
        >
          <i class="el-icon-search"></i>
          {{ $t("base.search") }}
        </el-button>
        </template>
      </vxe-toolbar>
      <vxe-table
        :data="tableData"
        border
        :export-config="exportConfig"
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
        <vxe-table-column
          type="seq"
          width="50"
          :title="$t('thresholdSetting.tableLabel')[0]"
          fixed="left"
        >
        </vxe-table-column>
        <vxe-table-column
          field="DIDS"
          :title="$t('thresholdSetting.tableLabel')[1]"
          sortable
          width="250"
          show-overflow
          show-header-overflow
        >
        </vxe-table-column>
        <vxe-table-column
          field="DName"
          show-overflow
          :title="$t('thresholdSetting.tableLabel')[2]"
          sortable
          width="200"
        >
        </vxe-table-column>
        <vxe-table-column
          field="DManageMentUserName"
          :title="$t('thresholdSetting.tableLabel')[3]"
          sortable
          width="200"
          show-overflow
          show-header-overflow
          align="left"
        >
        </vxe-table-column>
        <vxe-table-column
          field="DTime"
          show-overflow
          show-header-overflow
          :title="$t('thresholdSetting.tableLabel')[4]"
          sortable
          width="250"
        >
        </vxe-table-column>
        <vxe-table-column
          :title="$t('thresholdSetting.tableLabel')[5]"
          width="500"
          show-overflow
          show-header-overflow
        >
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
              <span>{{$t('thresholdSetting.dialog.title')}}</span>
            </div>
            <el-form
              :inline="false"
              :model="formList"
              class="demo-form-inline"
              label-width="90px"
              label-position="right"
            >
              <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
                <el-form-item :label="$t('thresholdSetting.dialog.label')[0]">
                  <el-input
                    :readonly="true"
                    v-model="formList.BatteryIDS"
                  ></el-input>
                </el-form-item>
              </el-col>

              <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
                <el-form-item :label="$t('thresholdSetting.dialog.label')[1]">
                  <el-input
                    :readonly="true"
                    v-model="formList.DName"
                  ></el-input>
                </el-form-item>
              </el-col>

              <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
                <el-form-item :label="$t('thresholdSetting.dialog.label')[2]">
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
              <span>{{ activeDialog.label }}{{$t('thresholdSetting.dialog.suffix')}}</span>
            </div>
            <el-form label-width="170px" label-position="left">
              <el-form-item
                v-for="(item, index) in list"
                :key="index"
                :label="item.label"
              >
                <el-input :value="item.value.toString()"></el-input>
              </el-form-item>
            </el-form>
          </el-card>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submit">{{
            $t("base.submit")
          }}</el-button>
          <el-button type="primary" @click="getBatteryBankCTRLParaCharts">{{
            $t("base.refresh")
          }}</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">{{
            $t("base.cancel")
          }}</el-button>
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
      exportConfig: {
        filename: 'export',
        sheetName: 'Sheet1',
        types: ['csv', 'xlsx']
      },
      isShow: true,
      count: 0,
      loading: false,
      detail: [
        {
          label: this.$t('thresholdSetting.detail')[0],
          path: 'list1',
          BankAddress1: 0x2790,
          BankAddress2: 0x7790
        },
        {
          label: this.$t('thresholdSetting.detail')[1],
          path: 'list2',
          BankAddress1: 0x279c,
          BankAddress2: 0x779c
        },
        {
          label: this.$t('thresholdSetting.detail')[2],
          path: 'list3',
          BankAddress1: 0x27b6,
          BankAddress2: 0x77b6
        },
        {
          label: this.$t('thresholdSetting.detail')[3],
          path: 'list4',
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
          label: this.$t('thresholdSetting.list1')[0],
          name: 'sINGLE_OVERVOLTAGE_STOP_THRESHOLD',
          value: ''
        },
        {
          label: this.$t('thresholdSetting.list1')[1],
          name: 'sINGLE_OVERVOLTAGE_SHUTDOWN_RECOVERY_THRESHOLD',
          value: ''
        },
        {
          label: this.$t('thresholdSetting.list1')[2],
          name: 'tOTAL_OVERVOLTAGE_SHUTDOWN_THRESHOLD',
          value: ''
        },
        {
          label: this.$t('thresholdSetting.list1')[3],
          name: 'tOTAL_VOLTAGE_OVERVOLTAGE_SHUTDOWN_RECOVERY',
          value: ''
        },
        {
          label: this.$t('thresholdSetting.list1')[4],
          name: 'mAIN_LOOP_CHARGING_OVERCURRENT_STOP_THRESHOLD',
          value: ''
        },
        {
          label: this.$t('thresholdSetting.list1')[5],
          name: 'mAIN_LOOP_CHARGING_OVERCURRENT_SHUTDOWN_RECOVER_THRESHOLD',
          value: ''
        },
        {
          label: this.$t('thresholdSetting.list1')[6],
          name: 'sINGLE_UNIT_UNDER_SHUTDOWN_VOLTAGE_THRESHOLD',
          value: ''
        },
        {
          label: this.$t('thresholdSetting.list1')[7],
          name: 'sINGLE_UNIT_UNDER_VOLTAGE_SHUTDOWN_RECOVERY_THRESHOLD',
          value: ''
        },
        {
          label: this.$t('thresholdSetting.list1')[8],
          name: 'tOTAL_VOLTAGE_UNDERVOLTAGE_SHUTDOWN',
          value: ''
        },
        {
          label: this.$t('thresholdSetting.list1')[9],
          name: 'tOTAL_VOLTAGE_UNDER_VOLTAGE_SHUTDOWN_RECOVERY',
          value: ''
        },
        {
          label: this.$t('thresholdSetting.list1')[10],
          name: 'mAIN_LOOP_DISCHARGE_OVERCURRENT_STOP_THRESHOLD',
          value: ''
        },
        {
          label: this.$t('thresholdSetting.list1')[11],
          name: 'mAIN_LOOP_DISCHARGE_OVER_CURRENT_SHUTDOWN_THRESHOLD',
          value: ''
        }
      ],
      list2: [
        {
          label: this.$t('thresholdSetting.list2')[0],
          name: 'cHARGING_TEMPERATURE_TOO_HIGH_STOP_THRESHOLD',
          value: ''
        },
        {
          label: this.$t('thresholdSetting.list2')[1],
          name: 'eXCESSIVE_CHARGING_TEMPERATURE_SHUTDOWN_RECOVERY_THRESHOLD',
          value: ''
        },
        {
          label: this.$t('thresholdSetting.list2')[2],
          name: 'cHARGING_TEMPERATURE_TOO_LOW_STOP_THRESHOLD',
          value: ''
        },
        {
          label: this.$t('thresholdSetting.list2')[3],
          name: 'lOW_CHARGING_TEMPERATURE_SHUTDOWN_RECOVERY_THRESHOLD',
          value: ''
        },
        {
          label: this.$t('thresholdSetting.list2')[4],
          name: 'sOC_TOO_LOW_STOP_THRESHOLD',
          value: ''
        },
        {
          label: this.$t('thresholdSetting.list2')[5],
          name: 'sOC_TOO_LOW_SHUTDOWN_RECOVERY_THRESHOLD',
          value: ''
        }
      ],
      list3: [
        {
          label: this.$t('thresholdSetting.list3')[0],
          name:
            'cHARGING_OVERCURRENT_THREE_STAGE_SHUTDOWN_PROTECTION_THRESHOLD',
          value: ''
        },
        {
          label: this.$t('thresholdSetting.list3')[1],
          name: 'cHARGING_OVERCURRENT_THREE_STAGE_SHUTDOWN_RECOVERY_THRESHOLD',
          value: ''
        },
        {
          label: this.$t('thresholdSetting.list3')[2],
          name:
            'dISCHARGE_OVERCURRENT_THREE_STAGE_SHUTDOWN_PROTECTION_THRESHOLD',
          value: ''
        },
        {
          label: this.$t('thresholdSetting.list3')[3],
          name: 'dISCHARGE_OVERCURRENT_THREE_STAGE_SHUTDOWN_RECOVERY_THRESHOLD',
          value: ''
        }
      ],
      list4: [
        {
          label: this.$t('thresholdSetting.list4')[0],
          name: 'eXCESSIVE_POWER_TEMPERATURE_SHUTDOWN_THRESHOLD',
          value: ''
        },
        {
          label: this.$t('thresholdSetting.list4')[1],
          name: 'eXCESSIVE_POWER_TEMPERATURE_SHUTDOWN_RECOVERY_THRESHOLD',
          value: ''
        },
        {
          label: this.$t('thresholdSetting.list4')[2],
          name: 'iNSULATION_FAILURE_STOP_THRESHOLD',
          value: ''
        },
        {
          label: this.$t('thresholdSetting.list4')[3],
          name: 'iNSULATION_FAILURE_SHUTDOWN_RECOVERY_THRESHOLD',
          value: ''
        },
        {
          label: this.$t('thresholdSetting.list4')[4],
          name: 'sINGLE_UNIT_DIFFERENTIAL_PRESSURE_TOO_HIGH_STOP_THRESHOLD',
          value: ''
        },
        {
          label: this.$t('thresholdSetting.list4')[5],
          name:
            'mONOMER_DIFFERENTIAL_PRESSURE_TOO_HIGH_SHUTDOWN_RECOVERY_THRESHOLD',
          value: ''
        },
        {
          label: this.$t('thresholdSetting.list4')[6],
          name:
            'tHE_TOTAL_VOLTAGE_DIFFERENTIAL_IS_TOO_HIGH_TO_STOP_THE_MACHINE',
          value: ''
        },
        {
          label: this.$t('thresholdSetting.list4')[7],
          name:
            'tOTAL_VOLTAGE_DIFFERENTIAL_TOO_HIGH_SHUTDOWN_RECOVERY_THRESHOLD',
          value: ''
        },
        {
          label: this.$t('thresholdSetting.list4')[8],
          name: 'dISCHARGE_OVER_TEMPERATURE_STOP_THRESHOLD',
          value: ''
        },
        {
          label: this.$t('thresholdSetting.list4')[9],
          name: 'dISCHARGE_OVER_TEMPERATURE_SHUTDOWN_RECOVERY_THRESHOLD',
          value: ''
        },
        {
          label: this.$t('thresholdSetting.list4')[10],
          name: 'dISCHARGE_UNDERTEMPERATURE_SHUTDOWN_THRESHOLD',
          value: ''
        },
        {
          label: this.$t('thresholdSetting.list4')[11],
          name: 'dISCHARGE_UNDERTEMPERATURE_SHOTDOWN_RECOVERY_THRESHOLD',
          value: ''
        },
        {
          label: this.$t('thresholdSetting.list4')[12],
          name: 'hIGH_TEMPERATURE_DIFFERENCE_STOP_THRESHOLD',
          value: ''
        },
        {
          label: this.$t('thresholdSetting.list4')[13],
          name: 'hIGH_TEMPERATURE_DIFFERENCE_DOWNTIME_RECOVERY_THRESHOLD',
          value: ''
        },
        {
          label: this.$t('thresholdSetting.list4')[14],
          name: 'aMBIENT_TEMPERATURE_TOO_HIGH_STOP_THRESHOLD',
          value: ''
        },
        {
          label: this.$t('thresholdSetting.list4')[15],
          name: 'aMBIENT_TEMPERATURE_TOO_HIGH_SHUTDOWN_RECOVERY_THRESHOLD',
          value: ''
        },
        {
          label: this.$t('thresholdSetting.list4')[16],
          name: 'aMBIENT_TEMPERATURE_TOO_LOW_STOP_THRESHOLD',
          value: ''
        },
        {
          label: this.$t('thresholdSetting.list4')[17],
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
