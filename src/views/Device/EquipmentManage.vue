<template>
  <div>
    <!-- 表单开始 -->
    <el-collapse-transition>
      <div style="box-sizing:border-box;" v-show="isShow">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>项目管理列表查询</span>
          </div>
          <el-form
            :inline="true"
            :model="searchForm"
            class="demo-form-inline"
            label-width="90px"
            label-position="left"
          >
            <el-form-item label="项目名称:">
              <el-input
                v-model="searchForm.Name"
                placeholder="请输入项目名称"
              ></el-input>
            </el-form-item>
            <el-form-item label="项目类型:">
              <el-input
                v-model="searchForm.Type"
                placeholder="请输入项目类型"
              ></el-input>
            </el-form-item>
            <el-form-item label="项目内容:">
              <el-input
                v-model="searchForm.Content"
                placeholder="请输入项目内容"
              ></el-input>
            </el-form-item>
            <el-form-item label="项目地点:">
              <el-input
                v-model="searchForm.Site"
                placeholder="请输入项目地点"
              ></el-input>
            </el-form-item>
            <!-- <br> -->
            <el-form-item>
              <el-button
                type="primary"
                @click="
                  searchForm.page = 1;
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
        <vxe-table-column
          type="seq"
          width="50"
          title="序号"
          fixed="left"
          align="center"
        >
        </vxe-table-column>
        <vxe-table-column
          field="PName"
          title="项目名称"
          sortable
          width="200"
          show-overflow
        >
        </vxe-table-column>
        <vxe-table-column
          field="PType"
          title="项目类型"
          sortable
          width="200"
          show-overflow
        >
        </vxe-table-column>
        <vxe-table-column
          field="PContent"
          title="项目内容"
          sortable
          width="200"
          show-overflow
        >
        </vxe-table-column>
        <vxe-table-column field="PSite" title="项目地点" sortable width="200">
        </vxe-table-column>
        <vxe-table-column
          field="TotalInvestment"
          title="项目总投资"
          sortable
          width="200"
          show-overflow
        >
        </vxe-table-column>
        <vxe-table-column
          field="PPlannedCompletionTime"
          title="计划完工时间"
          sortable
          width="200"
          show-overflow
          align="center"
        >
        </vxe-table-column>
        <vxe-table-column title="操作" width="300" fixed="right" align="center">
          <template v-slot="{ row }">
            <el-button size="small" @click="showDialog(row)">编辑</el-button>
            <el-button size="small" @click="toDetail(row)" type="primary">
              详情
            </el-button>
            <el-button size="small" type="danger" @click="deleteItem(row)">
              删除
            </el-button>
          </template>
        </vxe-table-column>
      </vxe-table>
      <!-- 表格结束 -->

      <!-- 分页开始 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="searchForm.page"
        :page-sizes="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="count"
      >
      </el-pagination>
      <!-- 分页结束 -->

      <!-- 编辑表单开始 -->
      <el-dialog
        title="修改项目"
        :visible.sync="dialogFormVisible"
        :close-on-click-modal="false"
      >
        <div style="height:500px;overflow:auto;">
          <el-form :model="form">
            <el-form-item label="项目名称" :label-width="formLabelWidth">
              <el-input v-model="form.PName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="项目类型" :label-width="formLabelWidth">
              <el-input v-model="form.PType" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="项目规模" :label-width="formLabelWidth">
              <el-input v-model="form.PScale" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="项目内容" :label-width="formLabelWidth">
              <el-input
                v-model="form.PContent"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label="项目地点" :label-width="formLabelWidth">
              <el-input v-model="form.PSite" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="项目总投资" :label-width="formLabelWidth">
              <el-input
                v-model="form.PTotalInvestment"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label="项目回报率" :label-width="formLabelWidth">
              <el-input
                v-model="form.PRateOfReturn"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label="项目回报周期" :label-width="formLabelWidth">
              <el-input
                v-model="form.PPaybackPeriod"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label="项目描述" :label-width="formLabelWidth">
              <el-input
                v-model="form.PDescribe"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label="计划完工时间" :label-width="formLabelWidth">
              <el-date-picker
                v-model="form.PPlannedCompletionTime"
                type="datetime"
                placeholder="选择日期时间"
                :clearable="false"
              >
              </el-date-picker>
            </el-form-item>
          </el-form>
        </div>

        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="edit">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 编辑表单结束 -->

      <!-- 添加表单开始 -->
      <el-dialog
        title="添加项目"
        :visible.sync="dialogFormAddVisible"
        :close-on-click-modal="false"
      >
        <div style="height:500px;overflow:auto;">
          <el-form :model="formAdd">
            <el-form-item label="项目名称" :label-width="formLabelWidth">
              <el-input v-model="formAdd.PName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="项目类型" :label-width="formLabelWidth">
              <el-input v-model="formAdd.PType" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="项目规模" :label-width="formLabelWidth">
              <el-input v-model="formAdd.PScale" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="项目内容" :label-width="formLabelWidth">
              <el-input
                v-model="formAdd.PContent"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label="项目地点" :label-width="formLabelWidth">
              <el-input v-model="formAdd.PSite" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="项目总投资" :label-width="formLabelWidth">
              <el-input
                v-model.number="formAdd.PTotalInvestment"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label="项目回报率" :label-width="formLabelWidth">
              <el-input
                v-model="formAdd.PRateOfReturn"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label="项目回报周期" :label-width="formLabelWidth">
              <el-input
                v-model="formAdd.PPaybackPeriod"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label="项目描述" :label-width="formLabelWidth">
              <el-input
                v-model="formAdd.PDescribe"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label="计划完工时间" :label-width="formLabelWidth">
              <el-date-picker
                v-model="formAdd.PPlannedCompletionTime"
                type="datetime"
                placeholder="选择日期时间"
                :clearable="false"
              >
              </el-date-picker>
            </el-form-item>
          </el-form>
        </div>

        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormAddVisible = false">取 消</el-button>
          <el-button type="primary" @click="addHttp">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 添加表单结束 -->

      <!-- 详情开始 -->
      <Drawer
        :closable="false"
        v-model="value4"
        title="项目详情"
        draggable
        width="30"
      >
        <p :style="pStyle">项目名称</p>
        <div class="demo-drawer-profile">
          {{ activeItem.PName }}
        </div>
        <Divider />
        <p :style="pStyle">系统ID</p>
        <div class="demo-drawer-profile">
          {{ activeItem.SystemID }}
        </div>
        <Divider />
        <p :style="pStyle">项目规模</p>
        <div class="demo-drawer-profile">
          {{ activeItem.PScale }}
        </div>
        <Divider />
        <p :style="pStyle">项目回报率</p>
        <div class="demo-drawer-profile">
          {{ activeItem.PRateOfReturn }}
        </div>
        <Divider />
        <p :style="pStyle">项目回报周期</p>
        <div class="demo-drawer-profile">
          {{ activeItem.PPaybackPeriod }}
        </div>
        <Divider />
        <p :style="pStyle">项目描述</p>
        <div class="demo-drawer-profile">
          {{ activeItem.PDescribe }}
        </div>
        <Divider />
        <p :style="pStyle">项目添加时间</p>
        <div class="demo-drawer-profile">
          {{ activeItem.PWriteTime }}
        </div>
      </Drawer>
      <!-- 详情结束 -->
    </el-card>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
let moment = require('moment')
export default {
  data () {
    return {
      searchForm: {
        page: 1,
        limit: 2,
        Name: '',
        Type: '',
        Content: '',
        Site: '',
        AutoSystemID: ''
      },
      tableData: [],
      customColumns: [],
      isShow: true,
      fileName: '项目信息',
      count: 0,
      loading: false,
      dialogFormVisible: false,
      dialogFormAddVisible: false,
      form: {
        AutoSystemID: '',
        PName: '',
        PType: '',
        PScale: '',
        PContent: '',
        PSite: '',
        PTotalInvestment: '',
        PRateOfReturn: '',
        PPaybackPeriod: '',
        PDescribe: '',
        PPlannedCompletionTime: ''
      },
      formLabelWidth: '100px',
      userList: [],
      formAdd: {
        AutoSystemID: '',
        PName: '',
        PType: '',
        PScale: '',
        PContent: '',
        PSite: '',
        PTotalInvestment: '',
        PRateOfReturn: '',
        PPaybackPeriod: '',
        PDescribe: '',
        PPlannedCompletionTime: ''
      },
      value4: false,
      pStyle: {
        fontSize: '16px',
        color: 'rgba(0,0,0,0.85)',
        lineHeight: '24px',
        display: 'block',
        marginBottom: '16px'
      },
      activeItem: ''
    }
  },
  computed: {
    ...mapState('table', ['pageSize'])
  },
  methods: {
    ...mapMutations('detail', ['set_paramsD', 'set_paramsB', 'set_paramsS']),
    ...mapMutations('tabs', ['set_detail_label']),
    getData () {
      this.loading = true
      this.searchForm.AutoSystemID = localStorage.getItem('AutoSystemID')
      this.form.AutoSystemID = this.searchForm.AutoSystemID
      this.formAdd.AutoSystemID = this.searchForm.AutoSystemID
      this.$axios
        .get(`/api/Project/GetProjectList`, { params: this.searchForm })
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
      this.searchForm.limit = val
      this.getData()
    },

    // 当前页
    handleCurrentChange (val) {
      this.searchForm.page = val
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
      this.form = {
        AutoSystemID: this.searchForm.AutoSystemID,
        PName: row.PName,
        PType: row.PType,
        PScale: row.PScale,
        PContent: row.PContent,
        PSite: row.PSite,
        PTotalInvestment: row.TotalInvestment,
        PRateOfReturn: row.PRateOfReturn,
        PPaybackPeriod: row.PPaybackPeriod,
        PDescribe: row.PDescribe,
        PPlannedCompletionTime: row.PPlannedCompletionTime,
        SystemID: row.SystemID
      }
      this.dialogFormVisible = true
    },

    // 编辑
    edit () {
      this.form.PPlannedCompletionTime = moment(
        this.form.PPlannedCompletionTime
      ).format('YYYY-MM-DDTHH:mm:ss')
      var url = '/api/Project/UpdataProject'
      this.$axios
        .post(url, this.form)
        .then(res => {
          this.dialogFormVisible = false
          if (res.data.code === 0) {
            this.$message.success(res.data.msg)
          } else if (res.data.code === 1) {
            this.$message.error(res.data.msg)
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
      this.$confirm(`是否删除用户[ ${row.PName} ]`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          var url = '/api/Project/DelProject'
          this.$axios
            .post(url, {
              AutoSystemID: this.searchForm.AutoSystemID,
              PName: row.PName,
              SystemID: row.SystemID
            })
            .then(res => {
              if (res.data.code === 0) {
                this.$message.success(res.data.msg)
                let totalPage = Math.ceil(
                  (this.count - 1) / this.searchForm.limit
                )
                let currentPage =
                  this.searchForm.page > totalPage
                    ? totalPage
                    : this.searchForm.page
                this.searchForm.page = currentPage < 1 ? 1 : currentPage
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
      this.formAdd.PPlannedCompletionTime = new Date()
    },
    addHttp () {
      this.formAdd.PPlannedCompletionTime = moment(
        this.formAdd.PPlannedCompletionTime
      ).format('YYYY-MM-DDTHH:mm:ss')
      var url = '/api/Project/AddProject'
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
    },

    // 详情
    toDetail (row) {
      this.value4 = true
      this.activeItem = row
    }
  },

  created () {
    this.searchForm.limit = this.pageSize[0]
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

.el-dialog {
  width: 50%;
}
.el-form {
  margin-right: 10px;
}

.el-date-editor.el-input, .el-date-editor.el-input__inner {
  width: 100%;
}
</style>
