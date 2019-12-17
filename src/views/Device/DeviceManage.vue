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
            label-position="left"
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
              <el-button type="primary" @click="formInline.page = 1;getData()">查询</el-button>
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
          @click="addItem"
          class="button-left"
        >
          <i class="el-icon-plus"></i>
          添加
        </el-button>
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
        <el-button class="menu-btn" title="导出" v-popover:export>
          <i class="fa fa-download"></i>
        </el-button>
        <el-button class="menu-btn" @click="printEvent" title="打印">
          <i class="fa fa-print"></i>
        </el-button>
        <!-- 导出操作开始 -->
        <el-popover ref="export" placement="bottom" width="100" trigger="hover">
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
        :data="tableData"
        border
        :customs.sync="customColumns"
        ref="xTable"
        v-loading="loading"
        element-loading-background="rgba(0, 0, 0, 0)"
        show-overflow
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
        <vxe-table-column type="seq" width="50" title="序号" fixed="left" align="center">
        </vxe-table-column>
        <vxe-table-column
          field="DICCID"
          title="ICCID"
          sortable
          width="200"
          show-overflow
        >
        </vxe-table-column>
        <vxe-table-column
          field="DIDS"
          title="设备ID字符串"
          sortable
          width="200"
          show-overflow
        >
        </vxe-table-column>
        <vxe-table-column
          field="DVIN"
          title="VIN码"
          sortable
          width="180"
          show-overflow
        >
        </vxe-table-column>
        <vxe-table-column field="DName" title="设备名称" sortable width="150">
        </vxe-table-column>
        <vxe-table-column
          field="DManageMentUserName"
          title="设备管理员"
          sortable
          width="150"
          align="center"
        >
        </vxe-table-column>
        <vxe-table-column field="DTime" title="登记时间" sortable width="180">
        </vxe-table-column>
        <vxe-table-column title="操作" width="150" fixed="right" align="center">
          <template v-slot="{ row }">
            <el-button size="small" @click="showDialog(row)">编辑</el-button>
            <el-button size="small" type="danger" @click="deleteItem(row)"
              >删除</el-button
            >
          </template>
        </vxe-table-column>
      </vxe-table>
      <!-- 表格结束 -->

      <!-- 分页开始 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="formInline.page"
        :page-sizes="[2, 4, 8]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="count"
      >
      </el-pagination>
      <!-- 分页结束 -->

      <!-- 编辑表单开始 -->
      <el-dialog
        title="修改设备"
        :visible.sync="dialogFormVisible"
        :close-on-click-modal="false"
      >
        <el-form :model="form">
          <el-form-item label="ICCID编码" :label-width="formLabelWidth">
            <el-input v-model="form.ICCID" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="设备编号" :label-width="formLabelWidth">
            <el-input
              v-model="form.DeviceIdentifyNumber"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="VIN编码" :label-width="formLabelWidth">
            <el-input v-model="form.VIN" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="设备名称" :label-width="formLabelWidth">
            <el-input v-model="form.Name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="设备管理员" :label-width="formLabelWidth">
            <el-select v-model="form.DManageMentUserID">
              <el-option
                v-for="(item, index) in userList"
                :key="index"
                :value="item.SystemID"
                :label="item.Name"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="设备持有人" :label-width="formLabelWidth">
            <el-select v-model="form.DAffiliationUserID">
              <el-option
                v-for="(item, index) in userList"
                :key="index"
                :value="item.SystemID"
                :label="item.Name"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="edit">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 编辑表单结束 -->

      <!-- 添加表单开始 -->
      <el-dialog
        title="添加设备"
        :visible.sync="dialogFormAddVisible"
        :close-on-click-modal="false"
      >
        <el-form :model="formAdd">
          <el-form-item label="ICCID编码" :label-width="formLabelWidth">
            <el-input v-model="formAdd.ICCID" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="设备编号" :label-width="formLabelWidth">
            <el-input
              v-model="formAdd.DeviceIdentifyNumber"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="VIN编码" :label-width="formLabelWidth">
            <el-input v-model="formAdd.VIN" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="设备名称" :label-width="formLabelWidth">
            <el-input v-model="formAdd.Name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="设备管理员" :label-width="formLabelWidth">
            <el-select v-model="formAdd.DManageMentUserID">
              <el-option
                v-for="(item, index) in userList"
                :key="index"
                :value="item.SystemID"
                :label="item.Name"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="设备持有人" :label-width="formLabelWidth">
            <el-select v-model="formAdd.DAffiliationUserID">
              <el-option
                v-for="(item, index) in userList"
                :key="index"
                :value="item.SystemID"
                :label="item.Name"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormAddVisible = false">取 消</el-button>
          <el-button type="primary" @click="addHttp">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 添加表单结束 -->
    </el-card>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
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
      dialogFormVisible: false,
      dialogFormAddVisible: false,
      form: {
        AutoSystemID: '',
        ICCID: '',
        DeviceIdentifyNumber: '',
        VIN: '',
        Name: '',
        DManageMentUserID: '',
        DAffiliationUserID: '',
        SystemID: ''
      },
      formLabelWidth: '90px',
      userList: [],
      formAdd: {
        AutoSystemID: '',
        ICCID: '',
        DeviceIdentifyNumber: '',
        VIN: '',
        Name: '',
        DManageMentUserID: '',
        DAffiliationUserID: ''
      }
    }
  },
  methods: {
    ...mapMutations('detail', ['set_paramsD', 'set_paramsB', 'set_paramsS']),
    ...mapMutations('tabs', ['set_detail_label']),
    getData () {
      this.loading = true
      this.formInline.AutoSystemID = localStorage.getItem('AutoSystemID')
      this.form.AutoSystemID = this.formInline.AutoSystemID
      this.formAdd.AutoSystemID = this.formInline.AutoSystemID
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

    // 显示编辑框
    showDialog (row) {
      this.getUserList()
      this.form.ICCID = row.DICCID
      this.form.DeviceIdentifyNumber = row.DIDS
      this.form.VIN = row.DVIN
      this.form.Name = row.DName
      this.form.DManageMentUserID = row.DManageMentUserID
      this.form.DAffiliationUserID = row.DAffiliationUserID
      this.form.SystemID = row.SystemID
      this.dialogFormVisible = true
    },

    // 获取用户列表
    getUserList () {
      this.$axios
        .get(`/api/Mail/GetUserList?AutoSystemID=${this.form.AutoSystemID}`)
        .then(res => {
          this.userList = res.data.data
        })
        .catch(err => {
          console.error(err)
        })
    },

    // 编辑
    edit () {
      var url = '/api/Devices/UpdataRegistrationEquipment'
      this.$axios
        .post(url, this.form)
        .then(res => {
          this.dialogFormVisible = false
          if (res.data.code === 0) {
            this.$message.success('编辑成功')
          }
          this.getData()
        })
        .catch(err => {
          console.error(err)
        })
    },

    // 删除
    deleteItem (row) {
      console.log(row)
      this.$confirm(`是否删除用户[ ${row.DName} ]`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          var name = row.DName
          var id = row.SystemID
          var AutoSystemID = this.formInline.AutoSystemID
          var url = '/api/Devices/DeleteRegistrationEquipment'
          this.$axios
            .post(url, {
              AutoSystemID: AutoSystemID,
              Name: name,
              SystemID: id
            })
            .then(res => {
              if (res.data.code === 0) {
                this.$message.success(res.data.msg)
                let totalPage = Math.ceil(
                  (this.count - 1) / this.formInline.limit
                )
                let currentPage =
                  this.formInline.page > totalPage
                    ? totalPage
                    : this.formInline.page
                this.formInline.page = currentPage < 1 ? 1 : currentPage
                this.getData()
              } else if (res.data.code === 1) {
                this.$message.error(res.data.msg)
              }
            })
            .catch(err => {
              console.error(err)
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },

    // 添加
    addItem () {
      this.dialogFormAddVisible = true
      this.getUserList()
    },
    addHttp () {
      var url = '/api/Devices/AddRegistrationEquipment'
      this.$axios
        .post(url, this.formAdd)
        .then(res => {
          if (res.data.code === 0) {
            this.formAdd = {}
            this.$message.success(res.data.msg)
            this.getData()
          } else if (res.data.code === 1) {
            this.$message.error(res.data.msg)
          }
          this.dialogFormAddVisible = false
        })
        .catch(err => {
          console.error(err)
        })
    }
  },

  created () {
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
  line-height: 14px;
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

.menu-btn:hover+.menu-wrapper {
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

.el-button {
  padding: 8px 10px;
  margin-left: 5px;
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

.el-dialog {
  width: 50%;
}
</style>
