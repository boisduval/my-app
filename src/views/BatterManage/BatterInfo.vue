<template>
  <div>
    <!-- 表单开始 -->
    <el-collapse-transition>
      <div style="box-sizing:border-box;" v-show="isShow">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>电池类型列表查询</span>
          </div>
          <el-form
            :inline="true"
            :model="searchForm"
            class="demo-form-inline"
            label-width="120px"
            label-position="right"
          >
            <el-form-item label="设备名称:">
              <el-select v-model="searchForm.DeviceSystemID">
                <el-option
                  v-for="(item, index) in options"
                  :key="index"
                  :value="item.SystemID"
                  :label="item.Name"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="信息名称:">
              <el-input
                v-model="searchForm.LikeName"
                placeholder="请输入信息名称"
              ></el-input>
            </el-form-item>
            <el-form-item label="电池序号:">
              <el-input
                v-model="searchForm.LikeBatteryIndex"
                placeholder="请输入电池序号"
              ></el-input>
            </el-form-item>
            <el-form-item label="模块电池序号:">
              <el-input
                v-model="searchForm.LikeBIndex"
                placeholder="请输入模块电池序号"
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

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>电池类型</span>
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
          field="BName"
          title="电池名称"
          width="350"
          show-overflow
        >
        </vxe-table-column>
        <vxe-table-column
          field="BIndex"
          title="电池序号"
          width="200"
          show-overflow
          sortable
        >
        </vxe-table-column>
        <vxe-table-column
          field="BmsIndex"
          title="模块电池序号"
          width="200"
          show-overflow
          sortable
        >
        </vxe-table-column>
        <vxe-table-column
          field="WriteTime"
          title="记录时间"
          width="300"
          show-overflow
        >
        </vxe-table-column>
        <vxe-table-column title="操作" width="250" fixed="right">
          <template v-slot="{ row }">
            <el-button plain size="mini" @click="showDialog(row)">
              <i class="el-icon-info">电压趋势</i>
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

      <!-- 电压曲线图开始 -->
      <el-dialog
        title="电池详情"
        :visible.sync="dialogFormVisible"
        width="80%"
        top="10vh"
        :close-on-click-modal="false"
        :destroy-on-close="true"
      >
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>电池类型列表查询</span>
          </div>
          <el-form :model="echartsData" label-width="80px" :inline="true">
            <el-form-item label="电池名称">
              <el-input v-model="echartsData.BName" :readonly="true"></el-input>
            </el-form-item>
            <el-form-item label="起止时间">
              <el-date-picker
                v-model="value"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="getBatteryChartData"
                >查询</el-button
              >
            </el-form-item>
          </el-form>
        </el-card>

        <el-card class="box-card" style="margin-top:20px">
          <div slot="header" class="clearfix">
            <span>电池类型</span>
          </div>
          <div id="myChart"></div>
        </el-card>
      </el-dialog>
      <!-- 电压曲线图结束 -->
    </el-card>
  </div>
</template>

<script>
import { mapState } from 'vuex'
let moment = require('moment')
export default {
  data () {
    return {
      isShow: true,
      formLabelWidth: '80px',
      customColumns: [],
      tableData: [],
      loading: false,
      count: 0,
      searchForm: {
        AutoSystemID: '',
        LikeName: '',
        LikeBatteryIndex: '',
        LikeBIndex: '',
        page: 1,
        limit: 2,
        DeviceSystemID: ''
      },
      options: [],
      fileName: '电池信息',
      echartsData: {
        AutoSystemID: '',
        BatterySystemID: '',
        StartTime: '',
        StopTime: '',
        BName: ''
      },
      value: '',
      dialogFormVisible: false,
      DataArray: [],
      dataZoom: {},
      yAxis: [],
      pieces: []
    }
  },

  computed: {
    ...mapState('table', ['pageSize'])
  },
  async created () {
    this.searchForm.AutoSystemID = sessionStorage.getItem('AutoSystemID')
    try {
      let res = await this.getBatteryList()
      this.options = res.data.data
      this.searchForm.DeviceSystemID = this.options[0].SystemID
      this.searchForm.limit = this.pageSize[0]
      this.getData()
    } catch (err) {
      console.log(err)
    }
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

    // 获取设备名称列表
    getBatteryList () {
      var url = '/api/Devices/GetDevicesNameList'
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

    // 获取电池信息列表
    async getData () {
      this.loading = true
      var url = '/api/Battery/GetBatteryList'
      try {
        let res = await this.$axios.get(url, { params: this.searchForm })
        this.tableData = res.data.data
        this.count = res.data.count
        this.loading = false
      } catch (err) {
        console.error(err)
      }
    },

    // 获取电压趋势
    async getBatteryChartData () {
      this.echartsData.StartTime = moment(this.value[0]).format(
        'YYYY-MM-DDTHH:mm:ss'
      )
      this.echartsData.StopTime = moment(this.value[1]).format(
        'YYYY-MM-DDTHH:mm:ss'
      )
      var url = `/api/Devices/GetBatteryChartData`
      try {
        let res = await this.$axios.get(url, {
          params: {
            AutoSystemID: this.echartsData.AutoSystemID,
            BatterySystemID: this.echartsData.BatterySystemID,
            StartTime: this.echartsData.StartTime,
            StopTime: this.echartsData.StopTime
          }
        })
        if (res.data.code === 0) {
          console.log(res)
          this.yAxis = res.data.data.yAxes
          this.pieces = res.data.data.pieces
          this.dataZoom = res.data.data.dataZoom
          this.DataArray = res.data.data.DataArray
          this.getEcharts()
          this.$message.success(res.data.msg)
        } else if (res.data.code === 1) {
          this.yAxis = ''
          this.pieces = ''
          this.dataZoom = ''
          this.DataArray = ''
          this.$message.error(res.data.msg)
        }
      } catch (err) {
        console.log(err)
      }
    },

    showDialog (row) {
      this.echartsData.AutoSystemID = this.searchForm.AutoSystemID
      this.echartsData.BatterySystemID = row.SystemID
      this.echartsData.BName = row.BName
      this.value = [
        moment(new Date())
          .startOf('day')
          .format('YYYY-MM-DDTHH:mm:ss'),
        new Date()
      ]
      this.getBatteryChartData()
      //   this.getEcharts()
      this.dialogFormVisible = true
    },

    // echarts
    getEcharts () {
      let myChart = this.$echarts.init(document.getElementById('myChart'))
      myChart.setOption({
        // title: {
        //     text: 'Beijing AQI'
        // },
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          data: this.DataArray.map(function (item) {
            return item[0]
          })
        },
        yAxis: {
          splitLine: {
            show: false
          },
          min: 2400,
          max: 4000,
          name: '(mv)'
        },
        toolbox: {
          left: 'center',
          feature: {
            dataZoom: {
              yAxisIndex: 'none'
            },
            restore: {},
            saveAsImage: {}
          }
        },
        dataZoom: [
          this.dataZoom,
          {
            type: 'inside'
          }
        ],
        visualMap: {
          top: 10,
          right: 10,
          pieces: this.pieces,
          outOfRange: {
            color: '#999'
          }
        },
        series: {
          name: this.echartsData.BName + '[mv]',
          type: 'line',
          data: this.DataArray.map(function (item) {
            return item[1]
          }),
          markLine: {
            silent: false,
            data: this.yAxis
          }
        }
      })
    }
  }
}
</script>

<style scoped>
#myChart {
  height: 400px;
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
