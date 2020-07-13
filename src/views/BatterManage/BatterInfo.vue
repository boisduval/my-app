<template>
  <div>
    <!-- 表单开始 -->
    <el-collapse-transition>
      <div style="box-sizing:border-box;" v-show="isShow">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>{{ $t("batterInfo.searchTitle") }}</span>
          </div>
          <el-form
            :inline="true"
            :model="searchForm"
            class="demo-form-inline"
            label-width="120px"
            label-position="right"
          >
            <el-form-item :label="$t('batterInfo.searchForm.label')[0]">
              <el-select v-model="searchForm.DeviceSystemID">
                <el-option
                  v-for="(item, index) in options"
                  :key="index"
                  :value="item.SystemID"
                  :label="item.Name"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('batterInfo.searchForm.label')[1]">
              <el-input
                v-model="searchForm.LikeName"
                :placeholder="$t('batterInfo.searchForm.placeholder')[1]"
              ></el-input>
            </el-form-item>
            <el-form-item :label="$t('batterInfo.searchForm.label')[2]">
              <el-input
                v-model="searchForm.LikeBatteryIndex"
                :placeholder="$t('batterInfo.searchForm.placeholder')[2]"
              ></el-input>
            </el-form-item>
            <el-form-item :label="$t('batterInfo.searchForm.label')[3]">
              <el-input
                v-model="searchForm.LikeBIndex"
                :placeholder="$t('batterInfo.searchForm.placeholder')[3]"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                @click="
                  searchForm.page = 1;
                  getData();
                "
                >{{ $t("base.searchbtn") }}</el-button
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
        <span>{{ $t("batterInfo.listTitle") }}</span>
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
            {{ $t("base.refresh") }}
          </el-button>
          <el-button
            type="primary"
            size="small"
            class="button-left"
            @click="isShow = !isShow"
          >
            <i class="el-icon-search"></i>
            {{ $t("base.search") }}
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
        <vxe-table-column
          type="seq"
          width="50"
          :title="$t('batterInfo.tableLabel')[0]"
          fixed="left"
        >
        </vxe-table-column>
        <vxe-table-column
          field="BName"
          :title="$t('batterInfo.tableLabel')[1]"
          width="350"
          show-overflow
        >
        </vxe-table-column>
        <vxe-table-column
          field="BIndex"
          :title="$t('batterInfo.tableLabel')[2]"
          width="200"
          show-overflow
          sortable
        >
        </vxe-table-column>
        <vxe-table-column
          field="BmsIndex"
          :title="$t('batterInfo.tableLabel')[3]"
          width="200"
          show-overflow
          sortable
        >
        </vxe-table-column>
        <vxe-table-column
          field="WriteTime"
          :title="$t('batterInfo.tableLabel')[4]"
          width="300"
          show-overflow
        >
        </vxe-table-column>
        <vxe-table-column
          :title="$t('batterInfo.tableLabel')[5]"
          width="250"
          fixed="right"
        >
          <template v-slot="{ row }">
            <el-button plain size="mini" @click="showDialog(row)">
              <i class="el-icon-info">{{ $t("batterInfo.operationbtn")[0] }}</i>
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
        :title="$t('batterInfo.dialog.title')"
        :visible.sync="dialogFormVisible"
        width="80%"
        top="10vh"
        :close-on-click-modal="false"
        :destroy-on-close="true"
      >
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>{{ $t("batterInfo.dialog.searchTitle") }}</span>
          </div>
          <el-form :model="echartsData" label-width="80px" :inline="true">
            <el-form-item :label="$t('batterInfo.dialog.formLabel')[0]">
              <el-input v-model="echartsData.BName" :readonly="true"></el-input>
            </el-form-item>
            <el-form-item :label="$t('batterInfo.dialog.formLabel')[1]">
              <el-date-picker
                v-model="value"
                type="datetimerange"
                :range-separator="$t('batterInfo.dialog.datePicker.separator')"
                :start-placeholder="$t('batterInfo.dialog.datePicker.start')"
                :end-placeholder="$t('batterInfo.dialog.datePicker.end')"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="getBatteryChartData">{{
                $t("base.search")
              }}</el-button>
            </el-form-item>
          </el-form>
        </el-card>

        <el-card class="box-card" style="margin-top:20px">
          <div slot="header" class="clearfix">
            <span>{{ $t("batterInfo.dialog.listTitle") }}</span>
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
      pieces: [],
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
  async created () {
    this.searchForm.AutoSystemID = localStorage.getItem('AutoSystemID')
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
          min: 0,
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
      setTimeout(function () {
        window.onresize = function () {
          myChart.resize()
        }
      }, 200)
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
