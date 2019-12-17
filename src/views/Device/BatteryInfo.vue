<template>
  <div>
    <el-form :inline="true" :model="formData" class="demo-form-inline">
      <el-form-item label="电池序号">
        <el-input
          v-model="formData.batterNum"
          placeholder="请输入电池序号"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="tableData.currentPage = 1;getData()">查询</el-button>
      </el-form-item>
    </el-form>
    <!-- <el-divider></el-divider> -->
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
    <vxe-table
      :data="tableData"
      border
      :customs.sync="customColumns"
      ref="xTable"
      resizable
      align="center"
      v-loading="loading"
      element-loading-background="rgba(0, 0, 0, 0)"
      highlight-hover-row
      highlight-current-row
    >
      <vxe-table-column
        type="seq"
        title="序号"
        width="50"
        fixed="left"
      ></vxe-table-column>
      <vxe-table-column
        type="checkbox"
        width="50"
        fixed="left"
      ></vxe-table-column>
      <vxe-table-column
        field="BatteryIndex"
        title="电池序号"
        sortable
        width="200"
      >
      </vxe-table-column>
      <vxe-table-column field="Voltage" title="电压" sortable width="200">
      </vxe-table-column>
      <vxe-table-column field="IResis" title="内阻" width="200">
      </vxe-table-column>
      <vxe-table-column field="SOH" title="SOH" sortable width="200">
      </vxe-table-column>
      <vxe-table-column field="SOC" title="SOC" sortable width="200">
      </vxe-table-column>
      <vxe-table-column
        field="UpdateTime"
        title="更新时间"
        sortable
        width="200"
      >
      </vxe-table-column>
    </vxe-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="tablePage.currentPage"
      :page-sizes="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="tablePage.totalResult"
      class="pagination"
    >
    </el-pagination>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      formData: {
        batterNum: ''
      },
      tableData: [],
      api: '/api/Devices/GetDevicesBatteryInfoList',
      list: [],
      tablePage: {
        currentPage: 1,
        // pageSize: 10,
        totalResult: 0,
        limit: 2
      },
      loading: false,
      customColumns: [],
      listHead: [],
      listFilter: [],
      fileName: '电池信息'
    }
  },
  computed: {
    ...mapState('detail', ['paramsD']),
    ...mapState('table', ['pageSize'])
  },
  mounted () {
    this.tablePage.limit = this.pageSize[0]
    if (this.paramsD.AutoSystemID && this.paramsD.batterID) {
      this.getData()
    }
  },
  methods: {
    getData () {
      if (!this.formData.batterNum) {
        this.formData.batterNum = 0
      }
      this.loading = true
      this.$axios
        .get(
          `${this.api}?AutoSystemID=${this.paramsD.AutoSystemID}&BatteryIDS=${this.paramsD.batterID}&page=${this.tablePage.currentPage}&limit=${this.tablePage.limit}&LikeIndex=${this.formData.batterNum}`
        )
        .then(res => {
          if (res.data.code === 0) {
            if (res.data.data !== undefined) {
              this.tableData = res.data.data
            } else {
              this.tableData = []
            }
            this.tablePage.totalResult = res.data.count
            this.$refs.xTable.reloadCustoms([])
          } else if (res.data.code === 1) {
            this.$message.error(res.data.msg)
          } else if (res.data.code === 3) {
            this.$message.warning(res.data.msg)
          }
          this.loading = false
          // this.formData.batterNum = ''
        })
        .catch(err => {
          console.error(err)
        })
    },
    // 每页显示多少条
    handleSizeChange (val) {
      this.tablePage.limit = val
      this.getData()
    },

    // 当前页
    handleCurrentChange (val) {
      this.tablePage.currentPage = val
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
    }
  },
  watch: {
    paramsD: {
      handler (newName, oldName) {
        this.data = {}
        this.DTUInfo = []
        this.getData()
      },
      deep: true
    }
  }
}
</script>

<style scoped>
.pagination {
  margin-top: 10px;
}

.table-oper {
  height: 40px;
  /* width: 100%; */
  position: relative;
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
</style>
