<template>
  <div>
    <!-- 表单开始 -->
    <el-collapse-transition>
      <div style="box-sizing:border-box;" v-show="isShow">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>用户列表查询</span>
          </div>
          <el-form
            :inline="true"
            :model="searchForm"
            class="demo-form-inline"
            label-width="120px"
            label-position="right"
          >
            <el-form-item label="登记名称:">
              <el-input
                v-model="searchForm.LikeUserName"
                placeholder="请输入登记名称"
              ></el-input>
            </el-form-item>
            <el-form-item label="登记手机:">
              <el-input
                v-model="searchForm.LikePhone"
                placeholder="请输入登记手机"
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
            </el-form-item>
          </el-form>
        </el-card>
        <div style="height:20px;width:100%"></div>
      </div>
    </el-collapse-transition>
    <!-- 表单结束 -->
    <el-card class="box-card visible">
      <div slot="header" class="clearfix">
        <span>用户列表</span>
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
          </template>
        </vxe-toolbar>
      <vxe-table
        :data="tableData"
        border
        :export-config="exportConfig"
        ref="xTable"
        v-loading="loading"
        element-loading-background="rgba(0, 0, 0, 0)"
        show-overflow
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
        <vxe-table-column type="seq" width="50" title="序号" fixed="left">
        </vxe-table-column>
        <vxe-table-column
          field="Name"
          title="名称"
          width="135"
          sortable
          show-overflow
          show-header-overflow
        >
        </vxe-table-column>
        <vxe-table-column
          field="Phone"
          title="手机号码"
          width="180"
          show-overflow
          show-header-overflow
          sortable
        >
        </vxe-table-column>
        <vxe-table-column
          field="Reason"
          title="申请原因"
          show-overflow
          show-header-overflow
          width="200"
        >
        </vxe-table-column>
        <vxe-table-column
          field="RecordDate"
          title="申请时间"
          width="200"
          sortable
          show-overflow
          show-header-overflow
        >
        </vxe-table-column>
        <vxe-table-column
          field="Indate"
          title="有效时间"
          width="200"
          sortable
          show-overflow
          show-header-overflow
        >
        </vxe-table-column>
        <vxe-table-column
          field="IsLock"
          title="审核"
          width="150"
          sortable
          show-overflow
          show-header-overflow
        >
          <template v-slot="{ row }">
            {{ row.Audit === "1" ? "是" : "否" }}
            <el-switch
              v-model="row.Audit"
              active-color="#00A854"
              active-value="1"
              inactive-color="#F04134"
              inactive-value="0"
              :disabled="row.Audit === '1'"
              @change="editStatus(row)"
            >
            </el-switch>
          </template>
        </vxe-table-column>
        <vxe-table-column title="操作" width="150" fixed="right">
          <template v-slot="{ row }">
            <el-button size="mini" type="danger" @click="deleteItem(row)"
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
        :current-page="searchForm.page"
        :page-sizes="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="count"
      >
      </el-pagination>
      <!-- 分页结束 -->
    </el-card>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      searchForm: {
        LikeName: '',
        LikePhone: '',
        page: 1,
        limit: 10
      },
      tableData: [],
      loading: false,
      count: 0,
      exportConfig: {
        filename: 'export',
        sheetName: 'Sheet1',
        types: ['csv', 'xlsx']
      },
      isShow: true
    }
  },
  computed: {
    ...mapState('table', ['pageSize'])
  },
  created () {
    this.searchForm.AutoSystemID = localStorage.getItem('AutoSystemID')
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

    getData () {
      this.loading = true
      var url = '/api/Users/GetTokenList'
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
    deleteItem (row) {
      var url = '/api/Users/DelToken'
      let obj = {
        AutoSystemID: this.searchForm.AutoSystemID,
        TokenSystemID: row.SystemID
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
              } else if (res.data.code === 1) {
                this.$message.error(res.data.msg)
              }
              setTimeout(() => {
                this.$message.success('删除成功')
                let totalPage = Math.ceil(
                  (this.count - 1) / this.searchForm.limit
                )
                let currentPage =
                  this.searchForm.page > totalPage
                    ? totalPage
                    : this.searchForm.page
                this.searchForm.page = currentPage < 1 ? 1 : currentPage
                this.getData()
              }, 100)
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

    // 审核
    editStatus (row) {
      let obj = {
        AutoSystemID: this.searchForm.AutoSystemID,
        TokenSystemID: row.SystemID
      }
      var url = '/api/Users/SetTokenAudit'
      this.$axios
        .post(url, obj)
        .then(res => {
          if (res.data.code === 0) {
            this.$message.success(res.data.msg)
            // this.getData()
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

<style scoped></style>
