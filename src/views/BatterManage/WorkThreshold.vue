<template>
  <div>
    <!-- 表单开始 -->
    <el-collapse-transition>
      <div style="box-sizing:border-box;" v-show="isShow">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>{{ $t("workThreshold.searchTitle") }}</span>
          </div>
          <el-form
            :inline="true"
            :model="formInline"
            class="demo-form-inline"
            label-width="90px"
            label-position="right"
          >
            <el-form-item :label="$t('workThreshold.searchForm.label')[0]">
              <el-input
                v-model="formInline.ICCID"
                :placeholder="$t('workThreshold.searchForm.placeholder')[0]"
              ></el-input>
            </el-form-item>
            <el-form-item :label="$t('workThreshold.searchForm.label')[1]">
              <el-input
                v-model="formInline.IDS"
                :placeholder="$t('workThreshold.searchForm.placeholder')[1]"
              ></el-input>
            </el-form-item>
            <el-form-item :label="$t('workThreshold.searchForm.label')[2]">
              <el-input
                v-model="formInline.VIN"
                :placeholder="$t('workThreshold.searchForm.placeholder')[2]"
              ></el-input>
            </el-form-item>
            <el-form-item :label="$t('workThreshold.searchForm.label')[3]">
              <el-input
                v-model="formInline.Name"
                :placeholder="$t('workThreshold.searchForm.placeholder')[3]"
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
        <span>{{ $t("workThreshold.listTitle") }}</span>
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
        :loading="loading"
        :edit-config="{ trigger: 'manual', mode: 'row' }"
        resizable
        align="center"
        v-loading="loading"
        element-loading-background="rgba(0, 0, 0, 0)"
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
          :title="$t('workThreshold.tableLabel')[0]"
          fixed="left"
        >
        </vxe-table-column>
        <vxe-table-column
          field="DIDS"
          :title="$t('workThreshold.tableLabel')[1]"
          sortable
          width="250"
          show-overflow
          show-header-overflow
        >
        </vxe-table-column>
        <vxe-table-column
          field="DName"
          :title="$t('workThreshold.tableLabel')[2]"
          sortable
          width="200"
          show-overflow
          show-header-overflow
        >
        </vxe-table-column>
        <vxe-table-column
          field="DManageMentUserName"
          :title="$t('workThreshold.tableLabel')[3]"
          sortable
          width="200"
          align="left"
          show-overflow
          show-header-overflow
        >
        </vxe-table-column>
        <vxe-table-column
          field="DTime"
          :title="$t('workThreshold.tableLabel')[4]"
          sortable
          width="250"
          show-overflow
          show-header-overflow
        >
        </vxe-table-column>
        <vxe-table-column
          :title="$t('workThreshold.tableLabel')[5]"
          width="300"
          show-header-overflow
        >
          <template v-slot="{ row }">
            <el-button
              plain
              size="small"
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
        width="60%"
        :close-on-click-modal="false"
        :title="activeDialog.label"
        :visible.sync="dialogFormVisible"
      >
        <div style="height:400px;overflow:auto">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>{{ $t("workThreshold.dialog.title") }}</span>
            </div>
            <el-form
              :inline="true"
              :model="formList"
              class="demo-form-inline"
              label-width="90px"
              label-position="right"
            >
              <el-form-item :label="$t('workThreshold.dialog.label')[0]">
                <el-input
                  :readonly="true"
                  v-model="formList.BatteryIDS"
                ></el-input>
              </el-form-item>
              <el-form-item :label="$t('workThreshold.dialog.label')[0]">
                <el-input :readonly="true" v-model="formList.DName"></el-input>
              </el-form-item>
              <el-form-item :label="$t('workThreshold.dialog.label')[0]">
                <el-select v-model="formList.BankIndex">
                  <el-option label="Bank1" value="0"></el-option>
                  <el-option label="Bank2" value="1"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </el-card>
          <el-card class="box-card" style="margin-top:20px">
            <div slot="header" class="clearfix">
              <span
                >{{ activeDialog.label
                }}{{ $t("workThreshold.dialog.suffix") }}</span
              >
            </div>
            <el-form
              :model="formData"
              :inline="true"
              label-width="100px"
              label-position="right"
            >
              <el-form-item :label="activeDialog.label">
                <el-switch
                  style="margin-left:20px;"
                  v-for="(item, index) in stateList"
                  :key="index"
                  v-model="item.value"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  :inactive-text="
                    $t('workThreshold.dialog.unit')[0] +
                      item.index +
                      $t('workThreshold.dialog.unit')[1]
                  "
                >
                </el-switch>
              </el-form-item>
            </el-form>
          </el-card>
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
          label: this.$t('workThreshold.detail'),
          path: 'sYSTEM_RESET'
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
          value: true
        },
        {
          index: '2',
          value: true
        },
        {
          index: '3',
          value: true
        },
        {
          index: '4',
          value: true
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

    // 操作页
    toDetail (row, item) {
      console.log(row, item)
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
      var url = 'api/Chart/GetBatteryBankSTOPParaCharts'
      this.$axios
        .get(url, {
          params: {
            AutoSystemID: this.formList.AutoSystemID,
            BatteryIDS: this.formList.BatteryIDS,
            BankIndex: this.formList.BankIndex
          }
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
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  font-size: 15px;
  text-align: left;
  /* margin-bottom: 20px; */
  box-sizing: border-box;
}

.el-pagination {
  margin-top: 10px;
}

.table-oper {
  height: 40px;
  /* width: 100%; */
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

.menu-btn:focus,
.menu-btn:active {
  color: #606266;
  border-color: #dcdfe6;
  background-color: #fff;
}

#export {
  list-style: none;
  padding: 0;
  margin: 0;
  padding: 10px 0;
}

#export li {
  line-height: 30px;
  height: 30px;
  cursor: pointer;
  padding: 0 10px;
}

#export li:hover {
  background-color: #f2f2f2;
}
</style>
