<template>
  <div>
    <el-card class="box-card visible">
      <!-- <div slot="header" class="clearfix">
        <span>在线Socket</span>
      </div> -->
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane :label="$t('onlineDevice.tabs')[0]" name="onlineDevice">
        </el-tab-pane>
        <el-tab-pane :label="$t('onlineDevice.tabs')[1]" name="onlineSocket">
        </el-tab-pane>
      </el-tabs>
      <div v-show="activeName === 'onlineDevice'">

        <!-- 表格开始 -->
        <vxe-toolbar custom print export>
        <template v-slot:buttons>
          <el-button
            type="primary"
            size="small"
            @click="getDeviceData"
            class="button-left"
          >
            <i class="el-icon-refresh-right"></i>
            {{ $t("base.refresh") }}
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
          :sync-resize="activeName === 'onlineDevice'"
        >
          <vxe-table-column
            type="checkbox"
            width="50"
            fixed="left"
          ></vxe-table-column>
          <vxe-table-column
            type="seq"
            width="50"
            :title="$t('onlineDevice.tableLabel')[0]"
            fixed="left"
          >
          </vxe-table-column>
          <vxe-table-column
            field="DeviceID"
            :title="$t('onlineDevice.tableLabel')[1]"
            width="350"
            sortable
            show-overflow
            show-header-overflow
          >
          </vxe-table-column>
          <vxe-table-column
            field="Text"
            :title="$t('onlineDevice.tableLabel')[2]"
            width="200"
            show-overflow
            sortable
            align="left"
            show-header-overflow
          >
          </vxe-table-column>
          <vxe-table-column
            field="RemoteEndPoint"
            :title="$t('onlineDevice.tableLabel')[3]"
            width="250"
            sortable
            show-overflow
            show-header-overflow
          >
          </vxe-table-column>
          <vxe-table-column
            field="LocalEndPoint"
            :title="$t('onlineDevice.tableLabel')[4]"
            width="250"
            sortable
            show-overflow
            show-header-overflow
          >
          </vxe-table-column>
          <vxe-table-column
            field="DType"
            :title="$t('onlineDevice.tableLabel')[5]"
            width="180"
            sortable
            show-overflow
            show-header-overflow
          >
          </vxe-table-column>
          <vxe-table-column
            field="RegistrationTime"
            :title="$t('onlineDevice.tableLabel')[6]"
            show-header-overflow
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

        <!-- 表格开始 -->
        <vxe-toolbar custom print export>
        <template v-slot:buttons>
          <el-button
            type="primary"
            size="small"
            @click="getSocketData"
            class="button-left"
          >
            <i class="el-icon-refresh-right"></i>
            {{ $t("base.refresh") }}
          </el-button>
        </template>
      </vxe-toolbar>
        <vxe-table
          :data="tableData1"
          border
          :export-config="exportConfig"
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
          <vxe-table-column
            type="seq"
            width="50"
            :title="$t('onlineDevice.tableLabel1')[0]"
            fixed="left"
          >
          </vxe-table-column>
          <vxe-table-column
            field="LocdEndPoint"
            :title="$t('onlineDevice.tableLabel1')[1]"
            width="200"
            sortable
            show-overflow
            show-header-overflow
          >
          </vxe-table-column>
          <vxe-table-column
            field="RemoteEndPoint"
            :title="$t('onlineDevice.tableLabel1')[2]"
            width="200"
            show-overflow
            show-header-overflow
            sortable
          >
          </vxe-table-column>
          <vxe-table-column
            field="SendByte"
            :title="$t('onlineDevice.tableLabel1')[3]"
            width="200"
            sortable
            show-overflow
            show-header-overflow
          >
          </vxe-table-column>
          <vxe-table-column
            field="ReceiveByte"
            :title="$t('onlineDevice.tableLabel1')[4]"
            width="180"
            sortable
            show-overflow
            show-header-overflow
          >
          </vxe-table-column>
          <vxe-table-column
            field="SendNumber"
            :title="$t('onlineDevice.tableLabel1')[5]"
            width="180"
            sortable
            show-overflow
            show-header-overflow
          >
          </vxe-table-column>
          <vxe-table-column
            field="ReceiveNumber"
            :title="$t('onlineDevice.tableLabel1')[6]"
            width="180"
            sortable
            show-overflow
            show-header-overflow
          >
          </vxe-table-column>
          <vxe-table-column
            field="PacketLossProbability"
            :title="$t('onlineDevice.tableLabel1')[7]"
            width="180"
            sortable
            show-overflow
            show-header-overflow
          >
          </vxe-table-column>
          <vxe-table-column
            field="ConnectTime"
            :title="$t('onlineDevice.tableLabel1')[8]"
            width="260"
            sortable
            show-overflow
            show-header-overflow
          >
          </vxe-table-column>
          <vxe-table-column
            field="UpdataTime"
            :title="$t('onlineDevice.tableLabel1')[9]"
            width="260"
            sortable
            show-overflow
            show-header-overflow
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
      count: 0,
      count1: 0,
      activeName: 'onlineDevice',
      listHead: [],
      listFilter: [],
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
