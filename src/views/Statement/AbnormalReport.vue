<template>
  <div v-loading="loading">
    <!-- 表单开始 -->
    <el-collapse-transition>
      <div style="box-sizing:border-box;" v-show="isShow">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>查询</span>
          </div>
          <el-form
            :inline="true"
            :model="searchForm"
            class="demo-form-inline"
            label-position="right"
          >
            <el-form-item label="范围选择:" label-width="80px">
              <el-date-picker
                v-model="value"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :clearable="false"
                @change="getData"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item label="设备名称:" label-width="80px">
              <el-select v-model="searchForm.DeviceSystemID" @change="getData">
                <el-option
                  v-for="(item, index) in options"
                  :key="index"
                  :value="item.SystemID"
                  :label="item.Name"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="设备Bank" label-width="80px">
              <el-select v-model="searchForm.BankIndex" @change="getData">
                <el-option label="Bank1" value="0"></el-option>
                <el-option label="Bank2" value="1"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label-width="20px" label=" ">
              <el-button
                type="primary"
                plain
                size="mini"
                style="margin-left:20px;"
                @click="goOtherDay('yesterday')"
                >昨天</el-button
              >
              <el-button
                type="primary"
                plain
                size="mini"
                @click="goOtherDay('week')"
                >近一周</el-button
              >
              <el-button
                type="primary"
                plain
                size="mini"
                @click="goOtherDay('month')"
                >近一月</el-button
              >
            </el-form-item>
          </el-form>
        </el-card>
        <div style="height:20px;width:100%"></div>
      </div>
    </el-collapse-transition>
    <!-- 表单结束 -->

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>异常总览</span>
      </div>
      <div class="wrap-box flex-row">
          <div class="wrap" style="width:100%">
            <div style="padding: 0 20px">
              <el-table
                :show-header="false"
                :data="table1"
                :row-class-name="tableRowClassName"
                :border="true"
                style="width: 100%">
                <el-table-column
                  prop="one"
                  align="center"
                  show-overflow-tooltip
                  label="1">
                </el-table-column>
                <el-table-column
                  prop="two"
                  align="center"
                  show-overflow-tooltip
                  label="2">
                </el-table-column>
                <el-table-column
                  prop="three"
                  align="center"
                  show-overflow-tooltip
                  label="3">
                </el-table-column>
                <el-table-column
                  prop="four"
                  align="center"
                  show-overflow-tooltip
                  label="4">
                </el-table-column>
                <el-table-column
                  prop="five"
                  align="center"
                  show-overflow-tooltip
                  label="5">
                </el-table-column>
                <el-table-column
                  prop="six"
                  align="center"
                  show-overflow-tooltip
                  label="6">
                </el-table-column>
                <el-table-column
                  prop="seven"
                  align="center"
                  show-overflow-tooltip
                  label="7">
                </el-table-column>
              </el-table>
            </div>
          </div>
          <div class="wrap">
            <div id="myChart1" style="height:350px;padding: 0 20px"></div>
          </div>
          <div class="wrap">
            <div id="myChart2" style="height:350px;padding: 0 20px"></div>
          </div>
      </div>
    </el-card>
  </div>
</template>

<script>
let moment = require('moment')
export default {
  data () {
    return {
      searchForm: {
        AutoSystemID: '',
        DeviceSystemID: '',
        BankIndex: '',
        Start: '',
        Stop: ''
      },
      tableData: [],
      loading: false,
      isShow: true,
      options: [],
      value: '',
      table1: []
    }
  },
  created () {
    // this.setData()
    this.searchForm.AutoSystemID = localStorage.getItem('AutoSystemID')
    this.searchForm.BankIndex = 1
    this.getDevices()
    var today = moment()
      .subtract(0, 'days')
      .format('YYYY-MM-DD')
    this.value = [today, today]
    // this.getDevices()
    // this.getData()
  },
  methods: {
    // 获取日报信息列表
    getData () {
      this.loading = true
      this.table1 = []
      this.table2 = []
      this.table3 = []
      this.tableData = ''
      this.searchForm.Start = moment(this.value[0]).format('YYYY-MM-DD')
      this.searchForm.Stop = moment(this.value[1]).format('YYYY-MM-DD')
      var url = 'api/Statistics/GetAlarmReport'
      this.$axios
        .get(url, { params: this.searchForm })
        .then(res => {
          if (res.data.code === 0) {
            this.tableData = res.data.data
            console.log(this.tableData)
            var arr1 = this.tableData.bATTERY_CLUSTER_INFO.valueUnits
            for (var i = 0; i < 4; i++) {
              this.table1.push({
                one: arr1[0 + i * 7].name,
                two: arr1[1 + i * 7].name,
                three: arr1[2 + i * 7].name,
                four: arr1[3 + i * 7].name,
                five: arr1[4 + i * 7].name,
                six: arr1[5 + i * 7].name,
                seven: arr1[6 + i * 7].name
              })
              this.table1.push({
                one: arr1[0 + i * 7].value + arr1[0 + i * 7].unit,
                two: arr1[1 + i * 7].value + arr1[1 + i * 7].unit,
                three: arr1[2 + i * 7].value + arr1[2 + i * 7].unit,
                four: arr1[3 + i * 7].value + arr1[3 + i * 7].unit,
                five: arr1[4 + i * 7].value + arr1[4 + i * 7].unit,
                six: arr1[5 + i * 7].value + arr1[5 + i * 7].unit,
                seven: arr1[6 + i * 7].value + arr1[6 + i * 7].unit
              })
            }

            this.tableData.bATTERY_ALARM_TREND.series = []
            this.tableData.bATTERY_ALARM_TREND.legend = []
            this.tableData.bATTERY_ALARM_TREND.SeriesData.forEach(item => {
              this.tableData.bATTERY_ALARM_TREND.legend.push(item.name)
              this.tableData.bATTERY_ALARM_TREND.series.push({
                name: item.name,
                type: 'line',
                stack: item.stack,
                data: item.data
              })
            })

            this.tableData.bATTERY_ALARM_STATISTICS.series = []
            this.tableData.bATTERY_ALARM_STATISTICS.legend = []
            this.tableData.bATTERY_ALARM_STATISTICS.SeriesData.forEach(item => {
              this.tableData.bATTERY_ALARM_STATISTICS.legend.push(item.name)
              this.tableData.bATTERY_ALARM_STATISTICS.series.push({
                name: item.name,
                type: 'line',
                stack: item.stack,
                data: item.data
              })
            })

            setTimeout(() => {
              this.loading = false
            }, 500)
            this.$nextTick(() => {
              this.getEcharts()
            })
          } else if (res.data.code === 1) {
            setTimeout(() => {
              this.loading = false
            }, 500)
            this.$message.error(res.data.msg)
          } else {
            setTimeout(() => {
              this.loading = false
            }, 500)
          }
        })
        .catch(err => {
          console.error(err)
        })
    },

    // 获取设备列表
    getDevices () {
      var url = '/api/Devices/GetDevicesNameList'
      this.$axios
        .get(`${url}?AutoSystemID=${this.searchForm.AutoSystemID}`)
        .then(res => {
          if (res.data.code === 0) {
            this.options = res.data.data
            this.searchForm.DeviceSystemID = this.options[0].SystemID
            this.getData()
          } else if (res.data.code === 1) {
            this.$message.error(res.data.msg)
          }
        })
        .catch(err => {
          console.error(err)
        })
    },

    // 切换时间
    goOtherDay (time) {
      var num
      switch (time) {
        case 'yesterday':
          num = moment()
            .subtract(1, 'days')
            .format('YYYY-MM-DD')
          break
        case 'week':
          num = moment()
            .subtract(1, 'weeks')
            .format('YYYY-MM-DD')
          break
        case 'month':
          num = moment()
            .subtract(1, 'months')
            .format('YYYY-MM-DD')
          break
      }
      this.value = [num, new Date()]
      this.getData()
    },

    tableRowClassName ({ row, rowIndex }) {
      if (rowIndex % 2 === 0) {
        return 'primary-row'
      }
      return ''
    },

    getEcharts () {
      // 第一个图
      var myChart1 = this.$echarts.init(document.getElementById('myChart1'))
      myChart1.setOption({
        title: {
          text: this.tableData.bATTERY_ALARM_TREND.Name,
          bottom: 0,
          left: 'center'
        },
        grid: {
          left: '25',
          right: '20',
          bottom: '40',
          top: '20%',
          containLabel: true
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: this.tableData.bATTERY_ALARM_TREND.legend,
          top: '8%',
          type: 'scroll'
        },
        xAxis: {
          type: 'category',
          data: this.tableData.bATTERY_ALARM_TREND.XAxisData
        },
        yAxis: {
          type: 'value',
          min: this.tableData.bATTERY_ALARM_TREND.YAxisMin,
          max: this.tableData.bATTERY_ALARM_TREND.YAxisMax
        },
        series: this.tableData.bATTERY_ALARM_TREND.series
      })

      // 第2个图
      var myChart2 = this.$echarts.init(document.getElementById('myChart2'))
      myChart2.setOption({
        title: {
          text: this.tableData.bATTERY_ALARM_STATISTICS.Name,
          bottom: 0,
          left: 'center'
        },
        grid: {
          left: '25',
          right: '20',
          bottom: '40',
          top: '20%',
          containLabel: true
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: this.tableData.bATTERY_ALARM_STATISTICS.legend,
          top: '8%',
          type: 'scroll'
        },
        xAxis: {
          type: 'category',
          data: this.tableData.bATTERY_ALARM_STATISTICS.XAxisData
        },
        yAxis: {
          type: 'value',
          min: this.tableData.bATTERY_ALARM_STATISTICS.YAxisMin,
          max: this.tableData.bATTERY_ALARM_STATISTICS.YAxisMax
        },
        series: this.tableData.bATTERY_ALARM_STATISTICS.series
      })

      setTimeout(function () {
        window.onresize = function () {
          myChart1.resize()
          myChart2.resize()
        }
      }, 200)
    }
  }
}
</script>

<style scoped>
.wrap-box {
    width: 100%;
    flex-wrap: wrap;
}
.wrap {
    padding: 10px 20px;
}
.wrap .text {
  font-size: 18px;
  font-weight: 800;
  text-align: center;
  line-height: 30px;
}
@media screen and (max-width: 850px) {
  .wrap {
    width: 100%;
  }
}
@media screen and (min-width: 850px) {
  .wrap {
    width: 50%;
  }
}
</style>
