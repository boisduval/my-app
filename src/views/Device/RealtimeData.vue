<template>
  <div>
    <!-- 表单开始 -->
    <el-collapse-transition>
      <div style="box-sizing:border-box;" v-show="isShow">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>{{ $t("base.search") }}</span>
          </div>
          <el-form
            :inline="true"
            :model="formInline"
            class="demo-form-inline"
            label-width="90px"
            label-position="right"
          >
            <el-form-item :label="$t('deviceInfo.searchForm.label')[0]">
              <el-input
                v-model="formInline.ICCID"
                :placeholder="$t('deviceInfo.searchForm.placeholder')[0]"
              ></el-input>
            </el-form-item>
            <el-form-item :label="$t('deviceInfo.searchForm.label')[1]">
              <el-input
                v-model="formInline.IDS"
                :placeholder="$t('deviceInfo.searchForm.placeholder')[1]"
              ></el-input>
            </el-form-item>
            <el-form-item :label="$t('deviceInfo.searchForm.label')[2]">
              <el-input
                v-model="formInline.VIN"
                :placeholder="$t('deviceInfo.searchForm.placeholder')[2]"
              ></el-input>
            </el-form-item>
            <el-form-item :label="$t('deviceInfo.searchForm.label')[3]">
              <el-input
                v-model="formInline.Name"
                :placeholder="$t('deviceInfo.searchForm.placeholder')[3]"
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
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>{{ $t("realtimeData.listTitle") }}</span>
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
        <el-popover ref="export" placement="bottom" width="100" trigger="hover">
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
        :data="tableData"
        border
        :customs.sync="customColumns"
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
          :title="$t('realtimeData.tableLabel')[0]"
          fixed="left"
          align="center"
        >
        </vxe-table-column>
        <vxe-table-column
          field="DICCID"
          :title="$t('realtimeData.tableLabel')[1]"
          sortable
          width="300"
          show-overflow
          show-header-overflow
        >
        </vxe-table-column>
        <vxe-table-column
          field="DIDS"
          :title="$t('realtimeData.tableLabel')[2]"
          sortable
          width="300"
          show-overflow
          show-header-overflow
        >
        </vxe-table-column>
        <vxe-table-column
          field="DName"
          :title="$t('realtimeData.tableLabel')[3]"
          sortable
          width="200"
          show-overflow
          show-header-overflow
        >
        </vxe-table-column>
        <vxe-table-column
          field="DManageMentUserName"
          :title="$t('realtimeData.tableLabel')[4]"
          sortable
          width="200"
          show-overflow
          show-header-overflow
        >
        </vxe-table-column>
        <vxe-table-column
          field="DTime"
          :title="$t('realtimeData.tableLabel')[5]"
          width="250"
          sortable
          show-overflow
          show-header-overflow
        >
        </vxe-table-column>
        <vxe-table-column
          :title="$t('realtimeData.tableLabel')[6]"
          align="center"
          width="250"
          show-overflow
          show-header-overflow
        >
          <template v-slot="{ row }">
            <el-button plain size="small" @click="showDialog(row)">
              <i class="el-icon-info">{{
                $t("realtimeData.operation")[0]
              }}</i>
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

      <!-- 数据表单开始 -->
      <el-dialog
        :title="$t('realtimeData.operation')[0]"
        :visible.sync="dialogFormVisible"
        :close-on-click-modal="false"
        width="70%"
      >
        <el-form :model="form" style="position:relative">
          <Spin v-if="spinShow1" fix></Spin>
          <el-form-item
            :label="$t('realtimeData.formLabel')[0]"
            :label-width="formLabelWidth"
          >
            <el-input v-model="dname" autocomplete="off" readonly></el-input>
          </el-form-item>
          <el-form-item
            :label="$t('realtimeData.formLabel')[1]"
            :label-width="formLabelWidth"
          >
            <el-input readonly v-model="deviceid" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item
            :label="$t('realtimeData.formLabel')[2]"
            :label-width="formLabelWidth"
          >
            <el-select v-model="form.ConfigType" @change="getConfig">
              <el-option
                v-for="(item, index) in list"
                :key="index"
                :value="item.Type"
                :label="item.Name"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            :label="$t('realtimeData.formLabel')[3]"
            :label-width="formLabelWidth"
          >
            <vxe-table
              height="300px"
              :data="tableData1"
              border
              :customs.sync="customColumns1"
              style="width: 100%"
            >
              <vxe-table-column
                field="RowIndex"
                :title="$t('realtimeData.tableLabel1')[0]"
              >
              </vxe-table-column>
              <vxe-table-column
                field="Cell0"
                :title="$t('realtimeData.tableLabel1')[1]"
              >
              </vxe-table-column>
              <vxe-table-column
                field="Cell1"
                :title="$t('realtimeData.tableLabel1')[2]"
              >
              </vxe-table-column>
              <vxe-table-column
                field="Cell2"
                :title="$t('realtimeData.tableLabel1')[3]"
              >
              </vxe-table-column>
              <vxe-table-column
                field="Cell3"
                :title="$t('realtimeData.tableLabel1')[4]"
              >
              </vxe-table-column>
              <vxe-table-column
                field="Cell4"
                :title="$t('realtimeData.tableLabel1')[5]"
              >
              </vxe-table-column>
              <vxe-table-column
                field="Cell5"
                :title="$t('realtimeData.tableLabel1')[6]"
              >
              </vxe-table-column>
              <vxe-table-column
                field="Cell6"
                :title="$t('realtimeData.tableLabel1')[7]"
              >
              </vxe-table-column>
              <vxe-table-column
                field="Cell7"
                :title="$t('realtimeData.tableLabel1')[8]"
              >
              </vxe-table-column>
              <vxe-table-column
                field="Cell8"
                :title="$t('realtimeData.tableLabel1')[9]"
              >
              </vxe-table-column>
              <vxe-table-column
                field="Cell9"
                :title="$t('realtimeData.tableLabel1')[10]"
              >
              </vxe-table-column>
            </vxe-table>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">{{
            $t("base.cancel")
          }}</el-button>
          <el-button
            type="primary"
            :disabled="spinShow1"
            @click="exportExcel1"
            >{{ $t("base.download") }}</el-button
          >
        </div>
      </el-dialog>
      <!-- 数据表单结束 -->
    </el-card>
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
      customColumns: [],
      customColumns1: [],
      isShow: true,
      count: 0,
      loading: false,
      form: {
        AutoSystemID: '',
        ConfigType: '',
        DeviceSystemID: ''
      },
      formLabelWidth: '90px',
      dialogFormVisible: false,
      list: [],
      spinShow1: false,
      deviceid: '',
      tableData1: [],
      listHead: '',
      listFilter: '',
      listHead1: '',
      listFilter1: '',
      fileName: 'export',
      dname: ''
    }
  },
  methods: {
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
        export_json_to_excel(tHeader, data, `${this.fileName}`)
      })
    },
    // 导出excel
    exportExcel1 () {
      this.listHead1 = []
      this.listFilter1 = []
      for (var i = 0; i < this.customColumns1.length; i++) {
        if (this.customColumns1[i].visible) {
          this.listFilter1.push(this.customColumns1[i].property)
          this.listHead1.push(this.customColumns1[i].title)
        }
      }
      require.ensure([], () => {
        const { export_json_to_excel } = require("@/excel/Export2Excel"); // eslint-disable-line
        const tHeader = this.listHead1
        // 上面设置Excel的表格第一行的标题
        const filterVal = this.listFilter1
        // 上面的index、nickName、name是tableData里对象的属性
        const list = this.tableData1 // 把data里的tableData存到list
        const data = this.formatJson(filterVal, list)
        export_json_to_excel(tHeader, data, `${this.fileName}`)
      })
    },
    formatJson (filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    },

    // 显示编辑框
    showDialog (row) {
      this.dialogFormVisible = true
      this.spinShow1 = true
      this.form.DeviceSystemID = row.SystemID
      this.deviceid = row.DICCID
      this.dname = row.DName
      this.form.AutoSystemID = this.formInline.AutoSystemID
      this.getValueInfo()
    },

    getData () {
      this.loading = true
      this.$axios
        .get(
          `/api/Devices/GetRegistrationEquipmentList?AutoSystemID=${this.formInline.AutoSystemID}&page=${this.formInline.page}&limit=${this.formInline.limit}&ICCID=${this.formInline.ICCID}&IDS=${this.formInline.IDS}&VIN=${this.formInline.VIN}&Name=${this.formInline.Name}`
        )
        .then(res => {
          if (res.data.code === 0) {
            // this.getValueInfo()
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

    // 获取数据类型接口
    getValueInfo () {
      this.list = []
      this.$axios
        .get(
          `/api/Dictionaries/GetValueInfo?AutoSystemID=${this.formInline.AutoSystemID}&KeyType=DMS_CONFIG_TYPE`
        )
        .then(res => {
          if (res.data.code === 0) {
            res.data.data.forEach(element => {
              this.list.push(element.SlaveInfo)
            })
            this.form.ConfigType = this.list[0].Type
            this.getConfig()
          }
          setTimeout(() => {
            this.spinShow1 = false
          }, 500)
        })
        .catch(error => {
          console.log(error)
        })
    },

    getConfig () {
      this.tableData1 = []
      var url = '/api/Realtime/GetDMSCConfig'
      this.$axios
        .get(url, { params: this.form })
        .then(res => {
          if (res.data.code === 0) {
            this.tableData1 = res.data.data
          } else {
            this.$message.error(res.data.msg)
          }
          setTimeout(() => {
            this.spinShow1 = false
          }, 500)
        })
        .catch(error => {
          console.log(error)
        })
    }
  },
  computed: {
    ...mapState('table', ['pageSize'])
  },
  created () {
    this.formInline.AutoSystemID = localStorage.getItem('AutoSystemID')
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
  line-height: 10px;
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

#upload {
  display: flex;
}

#upload .el-form-item:nth-child(1) {
  flex: 1;
}
#upload .el-form-item:nth-child(1) /deep/.el-form-item__content {
  width: calc(100% - 90px);
}
</style>
