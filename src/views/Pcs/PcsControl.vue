<template>
  <div>
    <!-- 表单开始 -->
    <el-collapse-transition>
      <div style="box-sizing:border-box;" v-show="isShow">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>{{ $t("pcsInfo.searchTitle") }}</span>
          </div>
          <el-form
            :inline="true"
            :model="formInline"
            class="demo-form-inline"
            label-width="90px"
            label-position="right"
          >
            <el-form-item :label="$t('pcsInfo.searchForm.label')[0]">
              <el-input
                v-model="formInline.ICCID"
                :placeholder="$t('pcsInfo.searchForm.placeholder')[0]"
              ></el-input>
            </el-form-item>
            <el-form-item :label="$t('pcsInfo.searchForm.label')[1]">
              <el-input
                v-model="formInline.IDS"
                :placeholder="$t('pcsInfo.searchForm.placeholder')[1]"
              ></el-input>
            </el-form-item>
            <el-form-item :label="$t('pcsInfo.searchForm.label')[2]">
              <el-input
                v-model="formInline.VIN"
                :placeholder="$t('pcsInfo.searchForm.placeholder')[2]"
              ></el-input>
            </el-form-item>
            <el-form-item :label="$t('pcsInfo.searchForm.label')[3]">
              <el-input
                v-model="formInline.Name"
                :placeholder="$t('pcsInfo.searchForm.placeholder')[3]"
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
                >{{$t('base.searchbtn')}}</el-button
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
        <span>{{ $t("pcsInfo.listTitle") }}</span>
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
          {{$t('base.refresh')}}
        </el-button>
        <el-button
          type="primary"
          size="small"
          class="button-left"
          @click="isShow = !isShow"
        >
          <i class="el-icon-search"></i>
          {{$t('base.search')}}
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
        highlight-hover-row
        highlight-current-row
      >
        <vxe-table-column
          type="checkbox"
          width="50"
          fixed="left"
          align="center"
        ></vxe-table-column>
        <vxe-table-column
          type="seq"
          width="50"
          :title="$t('pcsControl.tableLabel')[0]"
          fixed="left"
          align="center"
        >
        </vxe-table-column>
        <vxe-table-column
          field="DeviceID"
          :title="$t('pcsControl.tableLabel')[1]"
          sortable
          width="250"
          show-overflow
          show-header-overflow
        >
        </vxe-table-column>
        <vxe-table-column
          field="DeviceName"
          :title="$t('pcsControl.tableLabel')[2]"
          sortable
          width="180"
          show-overflow
          show-header-overflow
        >
        </vxe-table-column>
        <vxe-table-column
          field="RegistrationTime"
          :title="$t('pcsControl.tableLabel')[3]"
          sortable
          width="180"
          show-header-overflow
        >
        </vxe-table-column>
        <vxe-table-column
          field="DeviceStatusAutoMode"
          :title="$t('pcsControl.tableLabel')[4]"
          align="center"
          width="130"
          show-header-overflow
        >
          <template v-slot="{ row }">
            <i-switch
              true-color="#13ce66"
              size="large"
              v-model="row.DeviceStatusAutoMode"
              @on-change="setStatus(row.DeviceStatusAutoMode, row, urlList[0])"
            >
              <span slot="open">开机</span>
              <span slot="close">关机</span>
            </i-switch>
          </template>
        </vxe-table-column>
        <vxe-table-column
          field="DeviceStatusRemoteOn"
          :title="$t('pcsControl.tableLabel')[5]"
          align="center"
          width="130"
          show-header-overflow
        >
        <template v-slot="{ row }">
            <i-switch
              true-color="#13ce66"
              size="large"
              v-model="row.DeviceStatusRemoteOn"
              @on-change="setStatus(row.DeviceStatusRemoteOn, row, urlList[1])"
            >
              <span slot="open">开机</span>
              <span slot="close">关机</span>
            </i-switch>
          </template>
        </vxe-table-column>
        <vxe-table-column
          field="DeviceStatusAndOffGridMode"
          :title="$t('pcsControl.tableLabel')[6]"
          align="center"
          width="130"
          show-header-overflow
        >
        <template v-slot="{ row }">
            <i-switch
              true-color="#13ce66"
              size="large"
              v-model="row.DeviceStatusAndOffGridMode"
              @on-change="setStatus(row.DeviceStatusAndOffGridMode, row, urlList[2])"
            >
              <span slot="open">并网</span>
              <span slot="close">离网</span>
            </i-switch>
          </template>
        </vxe-table-column>
        <vxe-table-column
          field="DeviceStatusIsland"
          :title="$t('pcsControl.tableLabel')[7]"
          align="center"
          width="130"
          show-header-overflow
        >
        <template v-slot="{ row }">
            <i-switch
              true-color="#13ce66"
              size="large"
              v-model="row.DeviceStatusIsland"
              @on-change="setStatus(row.DeviceStatusIsland, row, urlList[3])"
            >
              <span slot="open">使能</span>
              <span slot="close">禁止</span>
            </i-switch>
          </template>
        </vxe-table-column>
        <vxe-table-column
          field="DeviceStatusPlanCurve"
          :title="$t('pcsControl.tableLabel')[8]"
          align="center"
          width="130"
          show-header-overflow
        >
        <template v-slot="{ row }">
            <i-switch
              true-color="#13ce66"
              size="large"
              v-model="row.DeviceStatusPlanCurve"
              @on-change="setStatus(row.DeviceStatusPlanCurve, row, urlList[4])"
            >
              <span slot="open">开启</span>
              <span slot="close">关闭</span>
            </i-switch>
          </template>
        </vxe-table-column>
        <vxe-table-column
          field="DeviceStatusMPPTMode"
          :title="$t('pcsControl.tableLabel')[9]"
          align="center"
          width="130"
          show-header-overflow
        >
        <template v-slot="{ row }">
            <i-switch
              true-color="#13ce66"
              size="large"
              v-model="row.DeviceStatusMPPTMode"
              @on-change="setStatus(row.DeviceStatusMPPTMode, row, urlList[5])"
            >
              <span slot="open">开启</span>
              <span slot="close">关闭</span>
            </i-switch>
          </template>
        </vxe-table-column>
        <vxe-table-column
          :title="$t('pcsControl.tableLabel')[10]"
          align="center"
          width="450"
          show-header-overflow
        >
          <template v-slot="{ row }">
            <el-button
              plain
              size="small"
              @click="operation(row, 'PCSControlPowerFactor', 'DeviceStatusPowerPactor')"
            >
              <i class="el-icon-info">{{ $t('pcsControl.operation')[0] }}</i>
            </el-button>
            <el-button
              plain
              size="small"
              @click="operation(row, 'PCSControlReactivePower', 'DeviceStatusReactivePower')"
            >
              <i class="el-icon-info">{{ $t('pcsControl.operation')[1] }}</i>
            </el-button>
            <el-button
              plain
              size="small"
              @click="operation(row, 'PCSControlActivePower', 'DeviceStatusActivePower')"
            >
              <i class="el-icon-info">{{ $t('pcsControl.operation')[2] }}</i>
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
    </el-card>
    <!-- 操作框开始 -->
    <el-dialog
        width="35%"
        :close-on-click-modal="false"
        :visible.sync="dialogFormEditVisible"
        title="参数设定"
      >
        <div style="max-height:500px;overflow-y:auto;overflow-x:hidden">
          <el-form
            label-width="90px"
            label-position="right"
            :model="editForm"
            style="position:relative"
          >
            <Spin v-if="spinShow" fix></Spin>
            <el-form-item label="设备ID">
              <el-input
                v-model="editForm.data.IDS"
                readonly
              ></el-input>
            </el-form-item>
            <el-form-item label="设定参数">
              <el-input v-model="editForm.setting"></el-input>
            </el-form-item>
          </el-form>
        </div>

        <div slot="footer" class="dialog-footer">
          <el-button
            @click="editHttp"
            size="medium"
            type="primary"
            :disabled="spinShow"
          >
            提 交
          </el-button>
          <el-button @click="dialogFormEditVisible=false" size="medium">
            取 消
          </el-button>
        </div>
      </el-dialog>
    <!-- 操作框结束 -->
  </div>
</template>

<script>
import { mapState } from 'vuex'
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
      count: 0,
      loading: false,
      exportConfig: {
        filename: 'export',
        sheetName: 'Sheet1',
        types: ['csv', 'xlsx']
      },
      urlList: [
        'PCSControlAutoMode',
        'PCSControlRemoteOn',
        'PCSControlAndOffGridMode',
        'PCSControlIslet',
        'PCSControlPlanCurve',
        'PCSControlMPPTMode'
      ],
      dialogFormEditVisible: false,
      editForm: {
        AutoSystemID: '',
        setting: '',
        data: {
          Address: '',
          IDS: '',
          Data: [
            ''
          ]
        }
      },
      spinShow: false,
      url: ''
    }
  },
  methods: {
    getData () {
      this.loading = true
      this.formInline.AutoSystemID = localStorage.getItem('AutoSystemID')
      this.$axios
        .get(
          `/api/Command/GetPCSOnLineDevices?AutoSystemID=${this.formInline.AutoSystemID}&page=${this.formInline.page}&limit=${this.formInline.limit}&ICCID=${this.formInline.ICCID}&IDS=${this.formInline.IDS}&VIN=${this.formInline.VIN}&Name=${this.formInline.Name}`
        )
        .then(res => {
          if (res.data.data) {
            console.log(res.data.data)
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

    operation (row, url, name) {
      console.log(row, url)
      this.url = url
      this.editForm = {
        AutoSystemID: this.formInline.AutoSystemID,
        setting: row[name],
        data: {
          Address: '0',
          IDS: row.DeviceID,
          Data: [
            '0'
          ]
        }
      }
      this.dialogFormEditVisible = true
    },

    editHttp () {
      console.log(this.url)
      return new Promise((resolve, reject) => {
        this.$axios
          .post(`/api/Command/${this.url}`, this.editForm)
          .then(res => {
            if (res.status === 200) {
              if (res.data.code === 0) {
                this.$message.success(res.data.msg)
                resolve(res.data.data)
              } else {
                this.$message.warning(res.data.msg)
                resolve()
              }
              this.editForm = {
                AutoSystemID: '',
                setting: '',
                data: {
                  Address: '',
                  IDS: '',
                  Data: [
                    ''
                  ]
                }
              }
              this.url = ''
              this.dialogFormEditVisible = false
            }
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    setStatus (status, row, url) {
      console.log(status, row, url)
      return new Promise((resolve, reject) => {
        var AutoSystemID = this.formInline.AutoSystemID
        this.$axios
          .post(`/api/Command/${url}`, {
            AutoSystemID: AutoSystemID,
            switchstate: Number(status),
            data: {
              Address: '0',
              IDS: row.DeviceID,
              Data: [
                0
              ]
            }
          })
          .then(res => {
            if (res.status === 200) {
              if (res.data.code === 0) {
                this.$message.success(res.data.msg)
                resolve(res.data.data)
              } else {
                this.$message.warning(res.data.msg)
                this.getData()
                resolve()
              }
            }
          })
          .catch(error => {
            reject(error)
          })
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
</style>
