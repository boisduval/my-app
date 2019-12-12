<template>
  <div>
    <!-- 表单开始 -->
    <el-collapse-transition>
      <div style="box-sizing:border-box;" v-show="isShow">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>待备忘信息列表查询</span>
          </div>
          <el-form
            :inline="true"
            :model="searchForm"
            class="demo-form-inline"
            label-width="80px"
            label-position="right"
          >
            <el-form-item label="范围选择:">
              <el-date-picker
                v-model="value"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item label="备忘名称:">
              <el-input
                v-model="searchForm.LikeName"
                placeholder="请输入备忘名称"
              ></el-input>
            </el-form-item>
            <el-form-item label="备忘内容:">
              <el-input
                v-model="searchForm.LikeMessage"
                placeholder="请输入备忘内容"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                @click="
                  searchForm.page = 1;
                  getData();
                "
                >查询</el-button
              >
              <el-button
                type="primary"
                plain
                size="mini"
                style="margin-left:20px;"
                @click="goOtherDay('today')"
                >当天</el-button
              >
              <el-button
                type="primary"
                plain
                size="mini"
                @click="goOtherDay('two')"
                >前两天</el-button
              >
              <el-button
                type="primary"
                plain
                size="mini"
                @click="goOtherDay('week')"
                >前一周</el-button
              >
              <el-button
                type="primary"
                plain
                size="mini"
                @click="goOtherDay('month')"
                >前一月</el-button
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
        <span>待备忘信息</span>
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
          @click="deleteItems"
          class="button-left"
        >
          <i class="el-icon-delete"></i>
          多选删除
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
        <vxe-table-column type="index" width="50" title="序号" fixed="left">
        </vxe-table-column>
        <vxe-table-column
          field="Name"
          title="名称"
          sortable
          width="180"
          align="left"
          show-overflow
        >
        </vxe-table-column>
        <vxe-table-column
          field="MWriteTime"
          title="日期"
          sortable
          width="180"
          show-overflow
        >
        </vxe-table-column>
        <vxe-table-column
          field="MExpectedOverTime"
          title="预计完成日期"
          show-overflow
          sortable
          width="180"
        >
        </vxe-table-column>
        <vxe-table-column
          field="MInfo"
          title="内容"
          sortable
          show-overflow
          width="180"
          align="left"
        >
        </vxe-table-column>
        <vxe-table-column
          field="MExpectedStutes"
          title="是否超时"
          show-overflow
          width="180"
          sortable
        >
          <template v-slot="{ row }">
            <template v-if="row.MExpectedStutes === '无预计'">
              <el-tag type="info" size="small">{{
                row.MExpectedStutes
              }}</el-tag>
            </template>
            <template v-else-if="row.MExpectedStutes === '已超时'">
              <el-tag type="danger" size="small">{{
                row.MExpectedStutes
              }}</el-tag>
            </template>
            <template v-else>
              <el-tag type="success" size="small">{{
                row.MExpectedStutes
              }}</el-tag>
            </template>
          </template>
        </vxe-table-column>
        <vxe-table-column title="操作" width="300" fixed="right">
          <template v-slot="{ row }">
            <el-button
              type="success"
              plain
              size="mini"
              @click="finishedItem(row)"
            >
              完成
            </el-button>
            <el-button plain size="mini" @click="editItem(row)">
              编辑
            </el-button>
            <el-button type="danger" size="mini" @click="deleteItem(row)">
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

      <!-- 完成表单开始 -->
      <el-dialog
        width="40%"
        :close-on-click-modal="false"
        :visible.sync="dialogFormVisible"
        title="备忘完成"
      >
        <el-form
          label-width="90px"
          label-position="right"
          :model="finishedForm"
        >
          <el-form-item label="完成时间">
            <el-input v-model="finishedForm.Time" readonly></el-input>
          </el-form-item>
          <el-form-item label="备忘名称">
            <el-input v-model="finishedForm.Name" readonly></el-input>
          </el-form-item>
          <el-form-item label="备忘内容">
            <el-input
              type="textarea"
              v-model="finishedForm.MInfo"
              readonly
              :autosize="{ minRows: 4, maxRows: 8 }"
            ></el-input>
          </el-form-item>
          <el-form-item label="完成内容">
            <el-input
              type="textarea"
              v-model="finishedForm.Msg"
              :autosize="{ minRows: 4, maxRows: 8 }"
            ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="finishedHttp" size="medium" type="primary">
            提 交
          </el-button>
          <el-button @click="dialogFormVisible = false" size="medium">
            取 消
          </el-button>
        </div>
      </el-dialog>
      <!-- 完成表单结束 -->

      <!-- 编辑表单开始 -->
      <el-dialog
        width="40%"
        :close-on-click-modal="false"
        :visible.sync="dialogFormEditVisible"
        title="修改备忘"
      >
        <el-form label-width="90px" label-position="right" :model="editForm">
          <el-form-item label="完成时间">
            <el-date-picker
              v-model="editForm.ExpectedOverTime"
              type="date"
              placeholder="选择日期"
              style="width:100%"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="备忘名称">
            <el-input v-model="editForm.Name"></el-input>
          </el-form-item>
          <el-form-item label="备忘内容">
            <el-input
              type="textarea"
              v-model="editForm.Msg"
              :autosize="{ minRows: 4, maxRows: 8 }"
            ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="editHttp" size="medium" type="primary">
            提 交
          </el-button>
          <el-button @click="dialogFormEditVisible = false" size="medium">
            取 消
          </el-button>
        </div>
      </el-dialog>
      <!-- 编辑表单结束 -->

      <!-- 添加表单开始 -->
      <el-dialog
        width="40%"
        :close-on-click-modal="false"
        :visible.sync="dialogFormAddVisible"
        title="添加备忘"
      >
        <el-form label-width="90px" label-position="right" :model="addForm">
          <el-form-item label="完成时间">
            <el-date-picker
              v-model="addForm.ExpectedOverTime"
              type="date"
              placeholder="选择日期"
              style="width:100%"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="备忘名称">
            <el-input v-model="addForm.Name"></el-input>
          </el-form-item>
          <el-form-item label="备忘内容">
            <el-input
              type="textarea"
              v-model="addForm.Msg"
              :autosize="{ minRows: 4, maxRows: 8 }"
            ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addHttp" size="medium" type="primary">
            提 交
          </el-button>
          <el-button @click="dialogFormAddVisible = false" size="medium">
            取 消
          </el-button>
        </div>
      </el-dialog>
      <!-- 添加表单结束 -->
    </el-card>
  </div>
</template>

<script>
import { mapState } from 'vuex'
let moment = require('moment')
export default {
  data () {
    return {
      searchForm: {
        AutoSystemID: '',
        Start: '',
        Stop: '',
        LikeName: '',
        LikeMessage: '',
        page: 1,
        limit: 10
      },
      tableData: [],
      count: 0,
      customColumns: [],
      isShow: true,
      fileName: '日志信息',
      loading: false,
      dialogFormVisible: false,
      value: '',
      finishedForm: {
        Time: '',
        AutoSystemID: '',
        Msg: '',
        Name: '',
        SystemID: '',
        MInfo: ''
      },
      editForm: {
        AutoSystemID: '',
        ExpectedOverTime: '',
        Msg: '',
        Name: '',
        SystemID: ''
      },
      dialogFormEditVisible: false,
      value1: '',
      selectedItems: [],
      addForm: {
        AutoSystemID: '',
        ExpectedOverTime: '',
        Msg: '',
        Name: '',
        SystemID: ''
      },
      dialogFormAddVisible: false
    }
  },
  computed: {
    ...mapState('table', ['pageSize'])
  },
  created () {
    this.searchForm.AutoSystemID = localStorage.getItem('AutoSystemID')
    this.searchForm.limit = this.pageSize[0]
    var today = moment()
      .subtract(0, 'days')
      .format('YYYY-MM-DD')
    this.value = [today, today]
    this.getData()
  },
  methods: {
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

    // 获取日报信息列表
    getData () {
      this.loading = true
      this.searchForm.Start = moment(this.value[0]).format('YYYY-MM-DD')
      this.searchForm.Stop = moment(this.value[1]).format('YYYY-MM-DD')
      var url = '/api/Memorandum/GetWaitList'
      this.$axios
        .get(url, { params: this.searchForm })
        .then(res => {
          if (res.data.code === 0) {
            this.tableData = res.data.data
            this.count = res.data.count
            this.loading = false
          } else if (res.data.code === 1) {
            this.$message.error(res.data.msg)
          }
        })
        .catch(err => {
          console.error(err)
        })
    },

    // 切换时间
    goOtherDay (time) {
      var num
      switch (time) {
        case 'today':
          num = moment()
            .subtract(0, 'days')
            .format('YYYY-MM-DD')
          break
        case 'two':
          num = moment()
            .subtract(2, 'days')
            .format('YYYY-MM-DD')
          console.log(num)
          break
        case 'week':
          num = moment()
            .subtract(1, 'weeks')
            .format('YYYY-MM-DD')
          break
        case 'month':
          num = moment()
            .subtract(1, 'months')
            .format('YYYY-MM-DD')
          break
      }
      this.value = [num, new Date()]
    },

    // 完成
    finishedItem (row) {
      console.log(row)
      // 获取当前时间
      this.finishedForm.Time = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
      this.finishedForm.Name = row.Name
      this.finishedForm.SystemID = row.SystemID
      this.finishedForm.Msg = ''
      this.finishedForm.MInfo = row.MInfo
      this.dialogFormVisible = true
    },
    finishedHttp () {
      let obj = {
        AutoSystemID: this.searchForm.AutoSystemID,
        SystemID: this.finishedForm.SystemID,
        Name: this.finishedForm.Name,
        Msg: this.finishedForm.Msg
      }
      var url = '/api/Memorandum/SetOverInfo'
      this.$axios
        .post(url, obj)
        .then(res => {
          if (res.data.code === 0) {
            this.dialogFormVisible = false
            this.$message.success(res.data.msg)
            let totalPage = Math.ceil((this.count - 1) / this.searchForm.limit)
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
    },

    // 编辑
    editItem (row) {
      this.editForm.ExpectedOverTime = moment()
        .subtract(0, 'days')
        .format('YYYY-MM-DD')
      this.editForm.AutoSystemID = this.searchForm.AutoSystemID
      this.editForm.Name = row.Name
      this.editForm.Msg = row.MInfo
      this.editForm.SystemID = row.SystemID
      this.dialogFormEditVisible = true
    },
    editHttp () {
      var url = '/api/Memorandum/UpdataInfo'
      this.$axios
        .post(url, this.editForm)
        .then(res => {
          if (res.data.code === 0) {
            this.dialogFormEditVisible = false
            this.$message.success(res.data.msg)
            this.getData()
          } else if (res.data.code === 1) {
            this.$message.error(res.data.msg)
          }
        })
        .catch(err => {
          console.error(err)
        })
    },

    // 删除
    deleteItem (row) {
      console.log(row)
      var url = '/api/Memorandum/DeleteInfo'
      let obj = {
        AutoSystemID: this.searchForm.AutoSystemID,
        data: [
          {
            SystemID: row.SystemID,
            Name: row.Name
          }
        ]
      }
      this.$confirm(`确定删除吗`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$axios
            .post(url, obj)
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

    // 删除多个
    deleteItems () {
      this.selectedItems = this.$refs.xTable.getSelectRecords()
      var arr = []
      if (this.selectedItems.length === 0) {
        this.$message.warning('请选择要删除的用户')
        return false
      }
      for (const item of this.selectedItems) {
        arr.push({
          Name: item.Name,
          SystemID: item.SystemID
        })
      }
      this.$confirm(`确定删除吗`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          var url = '/api/Memorandum/DeleteInfo'
          this.$axios
            .post(url, {
              AutoSystemID: this.searchForm.AutoSystemID,
              data: arr
            })
            .then(res => {
              if (res.data.code === 0) {
                this.$message.success('删除成功')
                let totalPage = Math.ceil(
                  (this.count - this.selectedItems.length) /
                    this.searchForm.limit
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
    addItem (row) {
      this.addForm.AutoSystemID = this.searchForm.AutoSystemID
      this.addForm.Name = row.Name
      this.addForm.Msg = row.MInfo
      this.addForm.SystemID = row.SystemID
      this.dialogFormAddVisible = true
    },
    addHttp () {
      var url = '/api/Memorandum/AddInfo'
      this.$axios
        .post(url, this.addForm)
        .then(res => {
          if (res.data.code === 0) {
            this.dialogFormAddVisible = false
            this.$message.success(res.data.msg)
            this.getData()
          } else if (res.data.code === 1) {
            this.$message.error(res.data.msg)
          }
        })
        .catch(err => {
          console.error(err)
        })
    }
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
