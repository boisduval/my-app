<template>
  <div>
    <!-- 表单开始 -->
    <el-collapse-transition>
      <div style="box-sizing:border-box;" v-show="isShow">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>{{ $t("systemControl.searchTitle") }}</span>
          </div>
          <el-form
            :inline="true"
            :model="formInline"
            class="demo-form-inline"
            label-width="90px"
            label-position="right"
          >
            <el-form-item :label="$t('systemControl.searchForm.label')[0]">
              <el-input
                v-model="formInline.ICCID"
                :placeholder="$t('systemControl.searchForm.placeholder')[0]"
              ></el-input>
            </el-form-item>
            <el-form-item :label="$t('systemControl.searchForm.label')[1]">
              <el-input
                v-model="formInline.IDS"
                :placeholder="$t('systemControl.searchForm.placeholder')[1]"
              ></el-input>
            </el-form-item>
            <el-form-item :label="$t('systemControl.searchForm.label')[2]">
              <el-input
                v-model="formInline.VIN"
                :placeholder="$t('systemControl.searchForm.placeholder')[2]"
              ></el-input>
            </el-form-item>
            <el-form-item :label="$t('systemControl.searchForm.label')[3]">
              <el-input
                v-model="formInline.Name"
                :placeholder="$t('systemControl.searchForm.placeholder')[3]"
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
        <span>{{ $t("systemControl.listTitle") }}</span>
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
        v-loading="loading"
        element-loading-background="rgba(0, 0, 0, 0)"
        resizable
        align="center"
        ref="xTable"
        :expand-config="{}"
        row-id="id"
        highlight-hover-row
        highlight-current-row
      >
        <vxe-table-column type="checkbox" width="50"></vxe-table-column>
        <vxe-table-column
          type="seq"
          width="50"
          :title="$t('systemControl.tableLabel')[0]"
        >
        </vxe-table-column>
        <vxe-table-column
          field="DIDS"
          :title="$t('systemControl.tableLabel')[1]"
          sortable
          width="400"
          show-overflow
          align="left"
        >
        </vxe-table-column>
        <vxe-table-column
          field="DName"
          :title="$t('systemControl.tableLabel')[2]"
          sortable
          width="200"
        >
        </vxe-table-column>
        <vxe-table-column
          field="DManageMentUserName"
          :title="$t('systemControl.tableLabel')[3]"
          sortable
          width="200"
          align="left"
        >
        </vxe-table-column>
        <vxe-table-column
          field="DTime"
          :title="$t('systemControl.tableLabel')[4]"
          sortable
          width="300"
        >
        </vxe-table-column>
        <vxe-table-column
          type="expand"
          :title="$t('systemControl.tableLabel')[5]"
          width="80px"
        >
          <template v-slot:content="{ row }">
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
        <!-- <vxe-table-column title="操作" width="1200" >
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
        </vxe-table-column> -->
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
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>{{ $t("systemControl.dialog.title") }}</span>
          </div>
          <el-form
            :inline="false"
            :model="formList"
            class="demo-form-inline"
            label-width="90px"
            label-position="right"
          >
            <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
              <el-form-item :label="$t('systemControl.dialog.label')[0]">
                <el-input
                  :readonly="true"
                  v-model="formList.BatteryIDS"
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
              <el-form-item :label="$t('systemControl.dialog.label')[1]">
                <el-input :readonly="true" v-model="formList.DName"></el-input>
              </el-form-item>
            </el-col>

            <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
              <el-form-item :label="$t('systemControl.dialog.label')[2]">
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
            <span
              >{{ activeDialog.label
              }}{{ $t("systemControl.dialog.suffix") }}</span
            >
          </div>
          <el-form :inline="true" label-width="180px" label-position="left">
            <el-form-item :label="activeDialog.label" id="state">
              <el-col
                :xs="12"
                :sm="12"
                :md="6"
                :lg="6"
                :xl="6"
                v-for="(item, index) in stateList"
                :key="index"
              >
                <el-switch
                  style="margin-left:20px;vertical-align: center"
                  v-model="item.value"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  :inactive-text="
                    $t('systemControl.unit')[0] +
                      item.index +
                      $t('systemControl.unit')[1]
                  "
                >
                </el-switch>
              </el-col>
            </el-form-item>
            <el-form-item style="float:right;margin-top:20px;">
              <el-button type="primary" @click="submit">{{
                $t("base.submit")
              }}</el-button>
              <el-button type="primary" @click="getBatteryBankCTRLParaCharts">{{
                $t("base.refresh")
              }}</el-button>
              <el-button type="primary" @click="dialogFormVisible = false">{{
                $t("base.cancel")
              }}</el-button>
            </el-form-item>
          </el-form>
        </el-card>
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
      isShow: true,
      exportConfig: {
        filename: 'export',
        sheetName: 'Sheet1',
        types: ['csv', 'xlsx']
      },
      count: 0,
      loading: false,
      detail: [
        {
          label: this.$t('systemControl.detail')[0],
          path: 'sYSTEM_RESET',
          BankAddres1: '0x7785',
          BankAddres2: '0x2785'
        },
        {
          label: this.$t('systemControl.detail')[1],
          path: 'sYSTEM_OPERATION_MODE',
          BankAddres1: '0x7786',
          BankAddres2: '0x2786'
        },
        {
          label: this.$t('systemControl.detail')[2],
          path: 'sHORT_CIRCUIT_PROTECTION_SWITCH',
          BankAddres1: '0x7787',
          BankAddres2: '0x2787'
        },
        {
          label: this.$t('systemControl.detail')[3],
          path: 'sOFT_POWER_OFF',
          BankAddres1: '0x7788',
          BankAddres2: '0x2788'
        },
        {
          label: this.$t('systemControl.detail')[4],
          path: 'sTART_INSULATION_SAMPLING',
          BankAddres1: '0x7789',
          BankAddres2: '0x2789'
        },
        {
          label: this.$t('systemControl.detail')[5],
          path: 'sLAVEID_IS_AUTOMATICALLY_ASSIGNED',
          BankAddres1: '0x778A',
          BankAddres2: '0x278A'
        },
        {
          label: this.$t('systemControl.detail')[6],
          path: '.fAULT_CODE_ENABLE',
          BankAddres1: '0x778B',
          BankAddres2: '0x278B'
        },
        {
          label: this.$t('systemControl.detail')[7],
          path: 'rESET_EEPROM',
          BankAddres1: '0x778C',
          BankAddres2: '0x278C'
        },
        {
          label: this.$t('systemControl.detail')[8],
          path: 'rEVERSE_PROTECTION_SWITCH',
          BankAddres1: '0x778D',
          BankAddres2: '0x278D'
        },
        {
          label: this.$t('systemControl.detail')[9],
          path: 'sTART_THE_TEST',
          BankAddres1: '0x778E',
          BankAddres2: '0x278E'
        },
        {
          label: this.$t('systemControl.detail')[10],
          path: 'pASSIVE_EQUALIZATION',
          BankAddres1: '0x778F',
          BankAddres2: '0x278F'
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
      formData: {},
      value: true,
      stateList: [
        {
          index: '1',
          value: true,
          num: 1
        },
        {
          index: '2',
          value: true,
          num: 2
        },
        {
          index: '3',
          value: true,
          num: 4
        },
        {
          index: '4',
          value: true,
          num: 8
        },
        {
          index: '5',
          value: true,
          num: 16
        },
        {
          index: '6',
          value: true,
          num: 32
        },
        {
          index: '7',
          value: true,
          num: 64
        },
        {
          index: '8',
          value: true,
          num: 128
        },
        {
          index: '9',
          value: true,
          num: 256
        },
        {
          index: '10',
          value: true,
          num: 512
        },
        {
          index: '11',
          value: true,
          num: 1024
        },
        {
          index: '12',
          value: true,
          num: 2048
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
      var url = '/api/Chart/GetBatteryBankCTRLParaCharts'
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
            for (var key in res.data.data[name]) {
              var arr = key.split('_')
              var i = parseInt(arr.pop()) - 1
              this.stateList[i].value = res.data.data[name][key]
            }
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
      let CheckedStatus = 0
      var BankAddres
      var url = '/api/Command/Write'
      for (const el of this.stateList) {
        if (el.value) {
          CheckedStatus = CheckedStatus | el.num
        }
      }
      // eslint-disable-next-line
      if (this.formList.BankIndex == 1) {
        BankAddres = parseInt(this.activeDialog.BankAddres1)
      } else {
        BankAddres = parseInt(this.activeDialog.BankAddres2)
      }
      this.$axios
        .post(url, {
          AutoSystemID: this.formList.AutoSystemID,
          data: {
            Address: BankAddres,
            IDS: this.formList.BatteryIDS,
            Data: [CheckedStatus]
          }
        })
        .then(res => {
          if (res.data.code === 0) {
            this.$message.success(res.data.msg)
            this.dialogFormVisible = false
            setTimeout(() => {
              this.getBatteryBankCTRLParaCharts()
            }, 1000)
          } else if (res.data.code === 1) {
            this.$message.error(res.data.msg)
          }
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
