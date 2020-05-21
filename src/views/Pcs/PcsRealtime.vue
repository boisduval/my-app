<template>
  <div>
    <!-- 表单开始 -->
    <el-collapse-transition>
      <div style="box-sizing:border-box;" v-show="isShow">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>模糊查询</span>
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
          title="序号"
          fixed="left"
          align="center"
        >
        </vxe-table-column>
        <vxe-table-column
          field="DICCID"
          title="ICCID"
          sortable
          width="300"
          show-overflow
          show-header-overflow
        >
        </vxe-table-column>
        <vxe-table-column
          field="DIDS"
          title="设备ID"
          sortable
          width="300"
          show-overflow
          show-header-overflow
        >
        </vxe-table-column>
        <vxe-table-column
          field="DName"
          title="设备名称"
          sortable
          width="200"
          show-overflow
          show-header-overflow
        >
        </vxe-table-column>
        <vxe-table-column
          field="DManageMentUserName"
          title="设备管理员"
          sortable
          width="200"
          show-overflow
          show-header-overflow
        >
        </vxe-table-column>
        <vxe-table-column
          field="DTime"
          title="登记时间"
          width="250"
          sortable
          show-overflow
          show-header-overflow
        >
        </vxe-table-column>
        <vxe-table-column
          title="操作"
          align="center"
          width="250"
          show-overflow
          show-header-overflow
        >
          <template v-slot="{ row }">
            <el-button plain size="small" @click="showDialog(row)">
              <i class="el-icon-info">显示数据</i>
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
        title="显示数据"
        :visible.sync="dialogFormVisible"
        :close-on-click-modal="false"
        width="70%"
      >
        <el-form :model="form" style="position:relative">
          <Spin v-if="spinShow1" fix></Spin>
          <el-form-item label="设备名称" :label-width="formLabelWidth">
            <el-input
              v-model="dname"
              autocomplete="off"
              readonly
            ></el-input>
          </el-form-item>
          <el-form-item label="识别号码" :label-width="formLabelWidth">
            <el-input readonly v-model="deviceid" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="Bank序号" :label-width="formLabelWidth">
            <el-select v-model="form.PCSIndex" @change="getConfig">
              <el-option label="PCS 1" value="0"></el-option>
              <el-option label="PCS 2" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="数据类型" :label-width="formLabelWidth">
            <el-select v-model="form.ConfigType" @change="getConfig">
              <el-option
                v-for="(item, index) in list"
                :key="index"
                :value="item.Type"
                :label="item.Name"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="原始数据" :label-width="formLabelWidth">
            <vxe-table
              height="300px"
              :data="tableData1"
              border
              :customs.sync="customColumns1"
              style="width: 100%"
            >
              <vxe-table-column field="RowIndex" title="起始地址">
              </vxe-table-column>
              <vxe-table-column field="Cell0" title="第一列">
              </vxe-table-column>
              <vxe-table-column field="Cell1" title="第二列">
              </vxe-table-column>
              <vxe-table-column field="Cell2" title="第三列">
              </vxe-table-column>
              <vxe-table-column field="Cell3" title="第四列">
              </vxe-table-column>
              <vxe-table-column field="Cell4" title="第五列">
              </vxe-table-column>
              <vxe-table-column field="Cell5" title="第六列">
              </vxe-table-column>
              <vxe-table-column field="Cell6" title="第七列">
              </vxe-table-column>
              <vxe-table-column field="Cell7" title="第八列">
              </vxe-table-column>
              <vxe-table-column field="Cell8" title="第九列">
              </vxe-table-column>
              <vxe-table-column field="Cell9" title="第十列">
              </vxe-table-column>
            </vxe-table>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" :disabled="spinShow1" @click="exportExcel1"
            >下 载</el-button
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
        DeviceSystemID: '',
        PCSIndex: ''
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
        export_json_to_excel(tHeader, data, `${this.fileName}表`)
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
        export_json_to_excel(tHeader, data, `${this.fileName}表`)
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
      this.form.PCSIndex = '0'
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
          `/api/Dictionaries/GetValueInfo?AutoSystemID=${this.formInline.AutoSystemID}&KeyType=DMS_PCS_TYPE`
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
      var url = '/api/Realtime/GetPCSInfo'
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
