<template>
  <div>
    <!-- 表单开始 -->
    <el-collapse-transition>
      <div style="box-sizing:border-box;" v-show="isShow">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>列表查询</span>
          </div>
          <el-form
            :inline="true"
            :model="searchForm"
            class="demo-form-inline"
            label-width="120px"
            label-position="right"
          >
            <el-form-item label="登录账户:">
              <el-input
                v-model="searchForm.LikeAccount"
                placeholder="请输入登录账户"
              ></el-input>
            </el-form-item>
            <el-form-item label="登录名称:">
              <el-input
                v-model="searchForm.LikeName"
                placeholder="请输入登录名称"
              ></el-input>
            </el-form-item>
            <el-form-item label="主机名称:">
              <el-input
                v-model="searchForm.LikeHost"
                placeholder="请输入主机名称"
              ></el-input>
            </el-form-item>
            <el-form-item label="系统名称:">
              <el-input
                v-model="searchForm.LikePlatform"
                placeholder="请输入系统名称"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="searchForm.page = 1;getData()">查询</el-button>
            </el-form-item>
          </el-form>
        </el-card>
        <div style="height:20px;width:100%"></div>
      </div>
    </el-collapse-transition>
    <!-- 表单结束 -->

    <el-card class="box-card visible">
      <div slot="header" class="clearfix">
        <span>在线用户</span>
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
          field="AccountNumber"
          title="登录账号"
          width="150"
          sortable
          show-overflow
          align="left"
        >
        </vxe-table-column>
        <vxe-table-column
          field="DUser"
          title="登录名称"
          width="150"
          show-overflow
          sortable
          align="left"
        >
        </vxe-table-column>
        <vxe-table-column
          field="HostName"
          title="IP地址"
          width="160"
          sortable
          show-overflow
          align="left"
        >
        </vxe-table-column>
        <vxe-table-column
          field="LoginAddress"
          title="登录地址"
          width="158"
          sortable
          show-overflow
          align="left"
        >
        </vxe-table-column>
        <vxe-table-column
          field="BrowserType"
          title="浏览器"
          width="130"
          sortable
          show-overflow
          align="left"
        >
        </vxe-table-column>
        <vxe-table-column
          field="OSType"
          title="操作系统"
          width="130"
          sortable
          show-overflow
          align="left"
        >
        </vxe-table-column>
        <vxe-table-column
          field="LoginTime"
          title="登录时间"
          width="178"
          sortable
          show-overflow
        >
        </vxe-table-column>
        <vxe-table-column
          field="ActiveTime"
          title="活跃时间"
          width="178"
          sortable
          show-overflow
        >
        </vxe-table-column>
        <vxe-table-column title="操作" width="250" fixed="right">
          <template v-slot="{ row }">
            <el-button size="mini" type="danger" @click="forcedOffline(row)">
              <i class="el-icon-close"></i>
              强制下线
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
        LikeAccount: '',
        LikeName: '',
        LikeHost: '',
        LikePlatform: ''
      },
      isShow: true,
      tableData: [],
      loading: false,
      count: 0,
      exportConfig: {
        filename: 'export',
        sheetName: 'Sheet1',
        types: ['csv', 'xlsx']
      }
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
      var url = '/api/Users/GetActiveUser'
      this.$axios
        .get(url, { params: this.searchForm })
        .then(res => {
          if (res.data.code === 0) {
            this.tableData = res.data.data
            this.count = res.data.count
          } else if (res.data.code === 1) {
            this.$message.error(res.data.msg)
          }
          this.loading = false
        })
        .catch(err => {
          console.error(err)
        })
    },
    // 强制下线
    forcedOffline (row) {
      console.log(row)
      let obj = {
        AutoSystemID: this.searchForm.AutoSystemID,
        OfflieSystemID: row.AutoSystemID,
        Name: row.AccountNumber
      }
      var url = '/api/Users/ForcedOffline'
      this.$axios
        .post(url, obj)
        .then(res => {
          if (res.data.code === 0) {
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

.tree-node-icon {
  width: 20px;
}

#left .vxe-cell {
  text-align: left;
}
</style>
