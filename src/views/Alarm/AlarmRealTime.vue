<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>实时告警</span>
      </div>

      <!-- 表格操作栏开始 -->
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
          field="LevelMsg"
          title="告警级别"
          sortable
          width="150"
          show-overflow
        >
        </vxe-table-column>
        <vxe-table-column field="AlarmTitle" title="告警标题" width="250">
        </vxe-table-column>
        <vxe-table-column field="Source" title="告警来源" width="250">
        </vxe-table-column>
        <vxe-table-column
          field="TheEffectiveTime"
          title="有效时长"
          sortable
          width="200"
        >
        </vxe-table-column>
        <vxe-table-column
          field="CreateDatetime"
          title="产生时间"
          sortable
          width="380"
        >
        </vxe-table-column>
        <vxe-table-column title="操作" width="200" fixed="right">
          <template v-slot="{ row }">
            <el-button plain size="small" @click="toDetail(row)">
              <i class="el-icon-info">&nbsp;告警详情</i>
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

      <!-- 详情Dialog开始 -->
      <!-- <el-dialog
        width="50%"
        :close-on-click-modal="false"
        :visible.sync="dialogFormVisible"
        title="告警详情"
      >
        <vxe-table stripe :data="detailData" border>
          <vxe-table-column field="label1" title="参数"></vxe-table-column>
          <vxe-table-column field="value1" title="值"></vxe-table-column>
          <vxe-table-column field="label2" title="参数"></vxe-table-column>
          <vxe-table-column field="value2" title="值"></vxe-table-column>
        </vxe-table>
      </el-dialog> -->
      <!-- 详情Dialog结束 -->
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
      tableData: [],
      count: 0,
      customColumns: [],
      isShow: true,
      fileName: '告警信息',
      loading: false,
      dialogFormVisible: false,
      detailData: []
    }
  },
  computed: {
    ...mapState('table', ['pageSize'])
  },
  async created () {
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

    // 获取实时告警列表
    getData () {
      var url = '/api/Alarm/GetRealTimeAlarm'
      this.$axios
        .get(url, { params: this.searchForm })
        .then(res => {
          if (res.data.code === 0) {
            this.tableData = res.data.data
            this.count = res.data.count
          } else if (res.data.code === 1) {
            this.$message.error(res.data.msg)
          }
        })
        .catch(err => {
          console.error(err)
        })
    },

    // 详情
    toDetail (row) {
      console.log(row)
    }

    // 获取告警信息
    // getUserLogInfo (SystemID) {
    //   var url = '/api/Log/GetUserLogInfo'
    //   this.$axios
    //     .get(
    //       `${url}?AutoSystemID=${this.searchForm.AutoSystemID}&LogSystemID=${SystemID}`
    //     )
    //     .then(res => {
    //       if (res.data.code === 0) {
    //         let data = res.data.data[0]
    //         this.detailData = [
    //           {
    //             label1: '日志类型',
    //             value1: data.LogType,
    //             label2: '登录序号',
    //             value2: data.LogIndex
    //           },
    //           {
    //             label1: '外网地址',
    //             value1: data.LogIP,
    //             label2: '内网地址',
    //             value2: data.logHostIP
    //           },
    //           {
    //             label1: '客户端地址',
    //             value1: data.RemoteIP,
    //             label2: '客户端属地',
    //             value2: data.ComputerLocation
    //           },
    //           {
    //             label1: '主机名称',
    //             value1: data.UserHostName,
    //             label2: '语言类型',
    //             value2: data.UserLanguage
    //           },
    //           {
    //             label1: '浏览器类型',
    //             value1: data.Browser,
    //             label2: '浏览器版本',
    //             value2: data.BrowserVersion
    //           },
    //           {
    //             label1: '服务器地址',
    //             value1: data.HttpForwardedAddress,
    //             label2: '开始时间',
    //             value2: data.StartTime
    //           },
    //           {
    //             label1: '结束时间',
    //             value1: data.StopTime,
    //             label2: '记录时间',
    //             value2: data.RecordingTime
    //           }
    //         ]
    //         this.dialogFormVisible = true
    //       } else if (res.data.code === 1) {
    //         this.$message.error(res.data.msg)
    //       }
    //     })
    //     .catch(err => {
    //       console.error(err)
    //     })
    // },
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
