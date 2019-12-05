<template>
  <div>
    <!-- 表单开始 -->
    <el-collapse-transition>
      <div style="box-sizing:border-box;" v-show="isShow">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>登录异常列表查询</span>
          </div>
          <el-form
            :inline="true"
            :model="searchForm"
            class="demo-form-inline"
            label-width="120px"
            label-position="right"
          >
            <el-form-item label="账号名称:">
              <el-input
                v-model="searchForm.LikeAccountNumber"
                placeholder="请输入账号名称"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="getData">查询</el-button>
            </el-form-item>
          </el-form>
        </el-card>
        <div style="height:20px;width:100%"></div>
      </div>
    </el-collapse-transition>
    <!-- 表单结束 -->

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>登录异常</span>
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
          添加异常
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
        </el-button>
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
        :loading="loading"
        show-overflow
        resizable
        align="center"
      >
        <vxe-table-column
          type="checkbox"
          width="50"
          fixed="left"
        ></vxe-table-column>
        <vxe-table-column type="index" width="50" title="序号" fixed="left">
        </vxe-table-column>
        <vxe-table-column
          field="AccountNumber"
          title="登录账号"
          width="200"
          sortable
          show-overflow
        >
        </vxe-table-column>
        <vxe-table-column
          field="StartTime"
          title="锁定时间"
          width="200"
          show-overflow
          sortable
        >
        </vxe-table-column>
        <vxe-table-column
          field="LockTime"
          title="锁定时长"
          width="150"
          sortable
          show-overflow
        >
        </vxe-table-column>
        <vxe-table-column
          field="ErrNum"
          title="错误次数"
          width="150"
          sortable
          show-overflow
        >
        </vxe-table-column>
        <vxe-table-column
          field="Message"
          title="信息"
          show-overflow
          align="left"
        >
        </vxe-table-column>
        <vxe-table-column title="操作" width="150" fixed="right">
          <template v-slot="{ row }">
            <el-button size="mini" type="warning" @click="clsLoginAbnormal(row)">恢复异常</el-button>
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

      <!-- 添加表单开始 -->
      <el-dialog
        width="35%"
        :close-on-click-modal="false"
        :visible.sync="dialogFormAddVisible"
        title="添加异常"
      >
        <el-form label-width="90px" label-position="right" :model="addForm">
            <el-form-item label="锁定账户:">
              <el-select v-model="addForm.AccountNumber">
                <el-option
                  v-for="(item, index) in options"
                  :key="index"
                  :value="item.SystemID"
                  :label="item.Name"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="错误次数:">
              <el-input
                v-model="addForm.ErrNum"
                placeholder="请输入错误次数"
              ></el-input>
            </el-form-item>
            <el-form-item label="锁定时长:">
              <el-input
                v-model="addForm.LockTime"
                placeholder="请输入锁定时长"
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
export default {
  data () {
    return {
      searchForm: {
        AutoSystemID: '',
        page: 1,
        limit: 10,
        LikeAccountNumber: ''
      },
      isShow: true,
      tableData: [],
      loading: false,
      fileName: 'export',
      customColumns: [],
      count: 0,
      dialogFormAddVisible: false,
      addForm: {},
      options: []
    }
  },
  computed: {
    ...mapState('table', ['pageSize'])
  },
  created () {
    this.searchForm.AutoSystemID = sessionStorage.getItem('AutoSystemID')
    this.searchForm.limit = this.pageSize[0]
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
      for (var i = 2; i < this.customColumns.length - 1; i++) {
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
    getData () {
      this.loading = true
      var url = '/api/Users/GetLoginAbnormalList'
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

    // 获取选择列表
    getUserNameList () {
      var url = '/api/Users/GetUserNameList'
      return new Promise((resolve, reject) => {
        this.$axios
          .get(`${url}?AutoSystemID=${this.searchForm.AutoSystemID}`)
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      })
    },

    // 添加
    async addItem () {
      try {
        let res = await this.getUserNameList()
        if (res.data.code === 0) {
          this.options = res.data.data
          this.addForm.AutoSystemID = this.searchForm.AutoSystemID
          this.dialogFormAddVisible = true
        } else if (res.data.code === 1) {
          this.$message.error(res.data.msg)
        }
      } catch (err) {
        console.log(err)
      }
    },

    addHttp () {
      var url = '/api/Users/AddLoginAbnormal'
      this.$axios
        .post(url, this.addForm)
        .then(res => {
          if (res.data.code === 0) {
            this.$message.success(res.data.msg)
            this.addForm = {}
          } else if (res.data.code === 1) {
            this.$message.error(res.data.msg)
          }
          this.dialogFormAddVisible = false
          setTimeout(() => {
            this.getData()
          }, 1000)
        })
        .catch(err => {
          console.error(err)
        })
    },

    // 恢复异常
    clsLoginAbnormal (row) {
      var url = '/api/Users/ClsLoginAbnormal'
      this.$axios
        .post(url, {
          AutoSystemID: this.searchForm.AutoSystemID,
          AccountNumber: row.AccountNumber
        })
        .then(res => {
          if (res.data.code === 0) {
            this.$message.success(res.data.msg)
          } else if (res.data.code === 1) {
            this.$message.error(res.data.msg)
          }
          this.dialogFormAddVisible = false
          setTimeout(() => {
            this.getData()
          }, 1000)
        })
        .catch(err => {
          console.error(err)
        })
    }
  }
}
</script>

<style scoped></style>
