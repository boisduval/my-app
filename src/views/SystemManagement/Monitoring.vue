<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>数据库信息</span>
      </div>
      <el-form
        :inline="true"
        :model="formData"
        class="demo-form-inline"
        label-width="100px"
        label-position="right"
      >
        <el-form-item label="名称:">
          <el-input v-model="formData.Name" readonly></el-input>
        </el-form-item>
        <el-form-item label="值:">
          <el-input v-model="formData.Value" readonly></el-input>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="box-card visible" style="margin-top:20px">
      <!-- 详细信息 -->
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane
          v-for="(item, index) in list"
          :key="index"
          :label="item.label"
          :name="item.name"
        >
        </el-tab-pane>
      </el-tabs>
      <el-form
        :model="searchForm"
        label-width="80px"
        label-position="right"
        :inline="true"
      >
        <el-form-item label="参数名称:">
          <el-input v-model="searchForm.LikeName" placeholder="请输入参数名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="searchForm.page = 1;getData()" size="medium">查询</el-button>
        </el-form-item>
      </el-form>

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
          title="参数名称"
          sortable
          show-overflow
          align="left"
        >
        </vxe-table-column>
        <vxe-table-column
          field="Value"
          title="参数内容"
          show-overflow
          sortable
          align="left"
        >
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
      formData: {
        Name: '',
        Value: ''
      },
      tableData: [],
      loading: false,
      exportConfig: {
        filename: 'export',
        sheetName: 'Sheet1',
        types: ['csv', 'xlsx']
      },
      count: 0,
      searchForm: {
        AutoSystemID: '',
        page: 1,
        limit: 10,
        LikeName: ''
      },
      list: [
        {
          label: 'MySql数据库',
          name: 'Monitor/GetMySQLMonitor'
        },
        {
          label: 'MongoDB数据库',
          name: 'Monitor/GetMongoDBServiceMonitor'
        }
      ],
      activeName: 'Monitor/GetMySQLMonitor'
    }
  },
  computed: {
    ...mapState('table', ['pageSize'])
  },
  created () {
    this.searchForm.AutoSystemID = localStorage.getItem('AutoSystemID')
    this.searchForm.limit = this.pageSize[0]
    this.getBasicMonitor()
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
      var url = '/api/' + this.activeName
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

    getBasicMonitor () {
      var url = '/api/Monitor/GetBasicMonitor'
      this.$axios
        .get(url, {
          params: {
            AutoSystemID: this.searchForm.AutoSystemID
          }
        })
        .then(res => {
          if (res.data.code === 0) {
            this.formData = res.data.data[0]
          } else if (res.data.code === 1) {
            this.$message.error(res.data.msg)
          }
        })
        .catch(err => {
          console.error(err)
        })
    },
    handleClick () {
      this.searchForm.page = 1
      this.searchForm.limit = this.pageSize[0]
      this.getData()
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
