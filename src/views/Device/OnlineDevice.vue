<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>在线Socket</span>
      </div>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="在线设备" name="onlineDevice"> </el-tab-pane>
        <el-tab-pane label="在线Socket" name="onlineSocket"> </el-tab-pane>
      </el-tabs>
      <div v-show="activeName === 'onlineDevice'">
        <!-- 表格操作栏开始 -->
        <div class="table-oper">
          <el-button
            type="primary"
            size="small"
            @click="getDeviceData"
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
          <el-popover
            ref="export"
            placement="bottom"
            width="100"
            trigger="hover"
          >
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
          align="center"
          highlight-hover-row
          highlight-current-row
          :sync-resize="activeName === 'onlineDevice'"
        >
          <vxe-table-column
            type="checkbox"
            width="50"
            fixed="left"
          ></vxe-table-column>
          <vxe-table-column type="index" width="50" title="序号" fixed="left">
          </vxe-table-column>
          <vxe-table-column
            field="DeviceID"
            title="设备ID"
            width="200"
            sortable
            show-overflow
          >
          </vxe-table-column>
          <vxe-table-column
            field="Text"
            title="设备名称"
            width="200"
            show-overflow
            sortable
            align='left'
          >
          </vxe-table-column>
          <vxe-table-column
            field="RemoteEndPoint"
            title="远程终结点"
            width="200"
            sortable
            show-overflow
          >
          </vxe-table-column>
          <vxe-table-column
            field="LocalEndPoint"
            title="本地终结点"
            width="180"
            sortable
            show-overflow
          >
          </vxe-table-column>
          <vxe-table-column
            field="DType"
            title="设备注册类型"
            width="180"
            sortable
            show-overflow
          >
          </vxe-table-column>
          <vxe-table-column
            field="RegistrationTime"
            title="设备最新注册时间"
            width="180"
            sortable
            show-overflow
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
      </div>
      <div v-show="activeName === 'onlineSocket'">
        <!-- 表格操作栏开始 -->
        <div class="table-oper">
          <el-button
            type="primary"
            size="small"
            @click="getSocketData"
            class="button-left"
          >
            <i class="el-icon-refresh-right"></i>
            刷新
          </el-button>
          <el-button class="menu-btn">
            <i class="fa fa-list"></i>
          </el-button>
          <div class="menu-wrapper">
            <template v-for="(column, index) in customColumns1">
              <vxe-checkbox
                v-if="column.property"
                class="checkbox-item"
                v-model="column.visible"
                :key="index"
                @change="$refs.xTable1.refreshColumn()"
                >{{ column.title }}</vxe-checkbox
              >
            </template>
          </div>
          <el-button class="menu-btn" title="导出" v-popover:export1>
            <i class="fa fa-download"></i>
          </el-button>
          <el-button class="menu-btn" @click="printEvent" title="打印">
            <i class="fa fa-print"></i>
          </el-button>
          <!-- 导出操作开始 -->
          <el-popover
            ref="export1"
            placement="bottom"
            width="100"
            trigger="hover"
          >
            <ul id="export1">
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
          :data="tableData1"
          border
          :customs.sync="customColumns1"
          ref="xTable1"
          v-loading="loading"
          element-loading-background="rgba(0, 0, 0, 0)"
          show-overflow
          resizable
          align="center"
          highlight-hover-row
          highlight-current-row
          :sync-resize="activeName === 'onlineSocket'"
        >
          <vxe-table-column
            type="checkbox"
            width="50"
            fixed="left"
          ></vxe-table-column>
          <vxe-table-column type="index" width="50" title="序号" fixed="left">
          </vxe-table-column>
          <vxe-table-column
            field="LocdEndPoint"
            title="Socket连接的本地总结点"
            width="200"
            sortable
            show-overflow
          >
          </vxe-table-column>
          <vxe-table-column
            field="RemoteEndPoint"
            title="Socket远端终结点"
            width="200"
            show-overflow
            sortable
          >
          </vxe-table-column>
          <vxe-table-column
            field="SendByte"
            title="发送的总数据量"
            width="200"
            sortable
            show-overflow
          >
          </vxe-table-column>
          <vxe-table-column
            field="ReceiveByte"
            title="接收的总数据量"
            width="180"
            sortable
            show-overflow
          >
          </vxe-table-column>
          <vxe-table-column
            field="SendNumber"
            title="发送数据包的个数"
            width="180"
            sortable
            show-overflow
          >
          </vxe-table-column>
          <vxe-table-column
            field="ReceiveNumber"
            title="接收数据包的个数"
            width="180"
            sortable
            show-overflow
          >
          </vxe-table-column>
          <vxe-table-column
            field="PacketLossProbability"
            title="丢包率"
            width="180"
            sortable
            show-overflow
          >
          </vxe-table-column>
          <vxe-table-column
            field="ConnectTime"
            title="建立连接的时间"
            width="260"
            sortable
            show-overflow
          >
          </vxe-table-column>
          <vxe-table-column
            field="UpdataTime"
            title="收到数据最后更新时间"
            width="260"
            sortable
            show-overflow
          >
          </vxe-table-column>
        </vxe-table>
        <!-- 表格结束 -->
         <!-- 分页开始 -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="searchForm1.page"
          :page-sizes="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="count1"
        >
        </el-pagination>
      </div>
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
        limit: 10
      },
      searchForm1: {
        AutoSystemID: '',
        page: 1,
        limit: 10
      },
      tableData: [],
      tableData1: [],
      loading: false,
      fileName: 'export',
      customColumns: [],
      customColumns1: [],
      count: 0,
      count1: 0,
      activeName: 'onlineDevice',
      listHead: [],
      listFilter: []
    }
  },
  computed: {
    ...mapState('table', ['pageSize'])
  },
  created () {
    this.searchForm.AutoSystemID = localStorage.getItem('AutoSystemID')
    this.searchForm1.AutoSystemID = localStorage.getItem('AutoSystemID')
    this.searchForm.limit = this.pageSize[0]
    this.searchForm1.limit = this.pageSize[0]
    this.getDeviceData()
  },
  methods: {
    // 每页显示多少条
    handleSizeChange (val) {
      switch (this.activeName) {
        case 'onlineDevice':
          this.searchForm.limit = val
          this.getDeviceData()
          break
        case 'onlineSocket':
          this.searchForm1.limit = val
          this.getSocketData()
          break
      }
    },

    // 当前页
    handleCurrentChange (val) {
      switch (this.activeName) {
        case 'onlineDevice':
          this.searchForm.page = val
          this.getDeviceData()
          break
        case 'onlineSocket':
          this.searchForm1.page = val
          this.getSocketData()
          break
      }
    },

    // 打印
    printEvent () {
      switch (this.activeName) {
        case 'onlineDevice':
          this.$refs.xTable.print()
          break
        case 'onlineSocket':
          this.$refs.xTable1.print()
          break
      }
    },

    // 导出csv
    exportDataEvent () {
      switch (this.activeName) {
        case 'onlineDevice':
          this.$refs.xTable.exportData({ type: 'csv' })
          break
        case 'onlineSocket':
          this.$refs.xTable1.exportData({ type: 'csv' })
          break
      }
    },

    // 导出excel
    exportExcel () {
      var customColumns
      var tableData
      switch (this.activeName) {
        case 'onlineDevice':
          customColumns = this.customColumns
          tableData = this.tableData
          break
        case 'onlineSocket':
          customColumns = this.customColumns1
          tableData = this.tableData1
      }
      this.listHead = []
      this.listFilter = []
      for (var i = 2; i < customColumns.length; i++) {
        if (customColumns[i].visible) {
          this.listFilter.push(customColumns[i].property)
          this.listHead.push(customColumns[i].title)
        }
      }
      require.ensure([], () => {
        const { export_json_to_excel } = require("@/excel/Export2Excel"); // eslint-disable-line
        const tHeader = this.listHead
        // 上面设置Excel的表格第一行的标题
        const filterVal = this.listFilter
        // 上面的index、nickName、name是tableData里对象的属性
        const list = tableData // 把data里的tableData存到list
        const data = this.formatJson(filterVal, list)
        export_json_to_excel(tHeader, data, `${this.fileName}表`)
      })
    },
    formatJson (filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    },
    getDeviceData () {
      this.loading = true
      var url = '/api/Devices/GetDevicesOnline'
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
    getSocketData () {
      this.loading = true
      var url = '/api/Devices/GetSocketLinkList'
      this.$axios
        .get(url, { params: this.searchForm1 })
        .then(res => {
          if (res.data.code === 0) {
            this.tableData1 = res.data.data
            this.count1 = res.data.count
          } else if (res.data.code === 1) {
            this.$message.error(res.data.msg)
          }
          this.loading = false
        })
        .catch(err => {
          console.error(err)
        })
    },
    handleClick (tab, event) {
      switch (tab.name) {
        case 'onlineDevice':
          this.getDeviceData()
          break
        case 'onlineSocket':
          this.getSocketData()
          break
      }
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
  min-width: 220px;
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
#export1 {
  list-style: none;
  padding: 0;
  margin: 0;
  padding: 10px 0;
}

#export1 li {
  line-height: 30px;
  height: 30px;
  cursor: pointer;
  padding: 0 10px;
}

#export1 li:hover {
  background-color: #f2f2f2;
}
</style>
