<template>
  <div>
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
              <el-select v-model="searchForm.DeviceSystemID" @change="getPcsList">
                <el-option
                  v-for="(item, index) in options"
                  :key="index"
                  :value="item.SystemID"
                  :label="item.Name"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="PCS" label-width="80px">
              <el-select v-model="searchForm.PCSIndex" @change="getData">
                <el-option v-for="(item, index) in pcsList" :key="index" :label="item.unit" :value="item.value"></el-option>
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
        <span>PCS总览</span>
      </div>
      <div class="wrap-box flex-row" v-loading="loading">
          <div class="wrap">
            <div style="padding: 0 20px">
              <el-table
                header-row-class-name="light"
                :data="table1"
                :border="true"
                style="width: 100%">
                <el-table-column
                  prop="one"
                  align="center"
                  show-overflow-tooltip
                  :resizable="false"
                  label="相序">
                </el-table-column>
                <el-table-column
                  prop="two"
                  align="center"
                  :resizable="false"
                  show-overflow-tooltip
                  label="电网电压">
                </el-table-column>
                <el-table-column
                  prop="three"
                  align="center"
                  :resizable="false"
                  show-overflow-tooltip
                  label="输出电压">
                </el-table-column>
                <el-table-column
                  prop="four"
                  align="center"
                  :resizable="false"
                  show-overflow-tooltip
                  label="输出电流">
                </el-table-column>
                <el-table-column
                  prop="five"
                  align="center"
                  :resizable="false"
                  show-overflow-tooltip
                  label="视在功率">
                </el-table-column>
                <el-table-column
                  prop="six"
                  align="center"
                  :resizable="false"
                  show-overflow-tooltip
                  label="有功功率">
                </el-table-column>
                <el-table-column
                  prop="seven"
                  align="center"
                  :resizable="false"
                  show-overflow-tooltip
                  label="PF值">
                </el-table-column>
                <el-table-column
                  prop="eight"
                  align="center"
                  :resizable="false"
                  show-overflow-tooltip
                  label="负载量">
                </el-table-column>
              </el-table>
            </div>
          </div>
          <div class="wrap">
            <div style="padding: 0 20px">
              <el-table
                :show-header="false"
                :data="table2"
                :cell-class-name="tableColClassName"
                :border="true"
                style="width: 100%">
                <el-table-column
                  prop="name"
                  align="center"
                  show-overflow-tooltip
                  width="100px"
                  label="1">
                </el-table-column>
                <el-table-column
                  prop="value"
                  show-overflow-tooltip
                  label="2">
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
          <div class="wrap">
            <div id="myChart3" style="height:350px;padding: 0 20px"></div>
          </div>
          <div class="wrap">
            <div id="myChart4" style="height:350px;padding: 0 20px"></div>
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
        PCSIndex: '',
        Start: '',
        Stop: ''
      },
      tableData: [],
      loading: false,
      isShow: true,
      options: [],
      value: '',
      pcsList: [],
      table1: [],
      table2: []
    }
  },
  created () {
    // this.setData()
    this.searchForm.AutoSystemID = localStorage.getItem('AutoSystemID')
    this.searchForm.BankIndex = 1
    var today = moment()
      .subtract(0, 'days')
      .format('YYYY-MM-DD')
    var yesterday = moment()
      .subtract(1, 'days')
      .format('YYYY-MM-DD')
    this.value = [yesterday, today]
    this.getDevices()
    // this.getDevices()
    // this.getData()
  },
  methods: {
    // 获取日报信息列表
    getData () {
      this.loading = true
      this.table1 = []
      this.table2 = []
      this.tableData = ''
      this.searchForm.Start = moment(this.value[0]).format('YYYY-MM-DD')
      this.searchForm.Stop = moment(this.value[1]).format('YYYY-MM-DD')
      var url = 'api/Statistics/GetPCSReport'
      this.$axios
        .get(url, { params: this.searchForm })
        .then(res => {
          if (res.data.code === 0) {
            this.tableData = res.data.data
            console.log(this.tableData)
            var arr1 = this.tableData.u_PHASE_INFO.valueUnits
            var arr2 = this.tableData.v_PHASE_INFO.valueUnits
            var arr3 = this.tableData.w_PHASE_INFO.valueUnits
            this.table1.push({
              one: 'U相',
              two: arr1[0].value + arr1[0].unit,
              three: arr1[1].value + arr1[1].unit,
              four: arr1[2].value + arr1[2].unit,
              five: arr1[3].value + arr1[3].unit,
              six: arr1[4].value + arr1[4].unit,
              seven: arr1[5].value + arr1[5].unit,
              eight: arr1[6].value + arr1[6].unit
            })
            this.table1.push({
              one: 'V相',
              two: arr2[0].value + arr2[0].unit,
              three: arr2[1].value + arr2[1].unit,
              four: arr2[2].value + arr2[2].unit,
              five: arr2[3].value + arr2[3].unit,
              six: arr2[4].value + arr2[4].unit,
              seven: arr2[5].value + arr2[5].unit,
              eight: arr2[6].value + arr2[6].unit
            })
            this.table1.push({
              one: 'W相',
              two: arr3[0].value + arr3[0].unit,
              three: arr3[1].value + arr3[1].unit,
              four: arr3[2].value + arr3[2].unit,
              five: arr3[3].value + arr3[3].unit,
              six: arr3[4].value + arr3[4].unit,
              seven: arr3[5].value + arr3[5].unit,
              eight: arr3[6].value + arr3[6].unit
            })
            this.table2 = this.tableData.dEVICE_INFO.valueUnits

            this.tableData.EachLooksAtThePower.series = []
            this.tableData.EachLooksAtThePower.legend = []
            this.tableData.EachLooksAtThePower.SeriesData.forEach(item => {
              this.tableData.EachLooksAtThePower.legend.push(item.name)
              this.tableData.EachLooksAtThePower.series.push({
                name: item.name,
                type: 'line',
                stack: item.stack,
                data: item.data
              })
            })

            this.tableData.ActivePowerOfEachPhase.series = []
            this.tableData.ActivePowerOfEachPhase.legend = []
            this.tableData.ActivePowerOfEachPhase.SeriesData.forEach(item => {
              this.tableData.ActivePowerOfEachPhase.legend.push(item.name)
              this.tableData.ActivePowerOfEachPhase.series.push({
                name: item.name,
                type: 'line',
                stack: item.stack,
                data: item.data
              })
            })

            this.tableData.TotalBatteryCurrent.series = []
            this.tableData.TotalBatteryCurrent.legend = []
            this.tableData.TotalBatteryCurrent.SeriesData.forEach(item => {
              this.tableData.TotalBatteryCurrent.legend.push(item.name)
              this.tableData.TotalBatteryCurrent.series.push({
                name: item.name,
                type: 'line',
                stack: item.stack,
                data: item.data
              })
            })

            this.tableData.BatterySOC.series = []
            this.tableData.BatterySOC.legend = []
            this.tableData.BatterySOC.SeriesData.forEach(item => {
              this.tableData.BatterySOC.legend.push(item.name)
              this.tableData.BatterySOC.series.push({
                name: item.name,
                type: 'line',
                stack: item.stack,
                data: item.data
              })
            })
            this.$nextTick(() => {
              this.getEcharts()
            })
            setTimeout(() => {
              this.loading = false
            }, 500)
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
      this.options = []
      var url = '/api/Devices/GetDevicesNameList'
      this.$axios
        .get(`${url}?AutoSystemID=${this.searchForm.AutoSystemID}`)
        .then(res => {
          if (res.data.code === 0) {
            this.options = res.data.data
            this.searchForm.DeviceSystemID = this.options[0].SystemID
            this.getPcsList()
          } else if (res.data.code === 1) {
            this.$message.error(res.data.msg)
          }
        })
        .catch(err => {
          console.error(err)
        })
    },

    // 获取PCS列表
    getPcsList () {
      this.pcsList = []
      var url = '/api/Statistics/GetPCSIndexList'
      this.$axios
        .get(`${url}?AutoSystemID=${this.searchForm.AutoSystemID}&DeviceSystemID=${this.searchForm.DeviceSystemID}`)
        .then(res => {
          if (res.data.code === 0) {
            this.pcsList = res.data.data.pCS_INDEX.valueUnits
            this.searchForm.PCSIndex = this.pcsList[0].value
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

    tableColClassName ({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        return 'primary-row'
      }
      return ''
    },

    getEcharts () {
      // 第一个图
      var myChart1 = this.$echarts.init(document.getElementById('myChart1'))
      myChart1.setOption({
        title: {
          text: this.tableData.EachLooksAtThePower.Name,
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
          data: this.tableData.EachLooksAtThePower.legend,
          top: '8%',
          type: 'scroll'
        },
        xAxis: {
          type: 'category',
          data: this.tableData.EachLooksAtThePower.XAxisData
        },
        yAxis: {
          type: 'value',
          min: this.tableData.EachLooksAtThePower.YAxisMin,
          max: this.tableData.EachLooksAtThePower.YAxisMax
        },
        series: this.tableData.EachLooksAtThePower.series
      })

      // 第2个图
      var myChart2 = this.$echarts.init(document.getElementById('myChart2'))
      myChart2.setOption({
        title: {
          text: this.tableData.ActivePowerOfEachPhase.Name,
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
          data: this.tableData.ActivePowerOfEachPhase.legend,
          top: '8%',
          type: 'scroll'
        },
        xAxis: {
          type: 'category',
          data: this.tableData.ActivePowerOfEachPhase.XAxisData
        },
        yAxis: {
          type: 'value',
          min: this.tableData.ActivePowerOfEachPhase.YAxisMin,
          max: this.tableData.ActivePowerOfEachPhase.YAxisMax
        },
        series: this.tableData.ActivePowerOfEachPhase.series
      })

      // 第3个图
      var myChart3 = this.$echarts.init(document.getElementById('myChart3'))
      myChart3.setOption({
        title: {
          text: this.tableData.TotalBatteryCurrent.Name,
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
          data: this.tableData.TotalBatteryCurrent.legend,
          top: '8%',
          type: 'scroll'
        },
        xAxis: {
          type: 'category',
          data: this.tableData.TotalBatteryCurrent.XAxisData
        },
        yAxis: {
          type: 'value',
          min: this.tableData.TotalBatteryCurrent.YAxisMin,
          max: this.tableData.TotalBatteryCurrent.YAxisMax
        },
        series: this.tableData.TotalBatteryCurrent.series
      })

      // 第4个图
      var myChart4 = this.$echarts.init(document.getElementById('myChart4'))
      myChart4.setOption({
        title: {
          text: this.tableData.BatterySOC.Name,
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
          data: this.tableData.BatterySOC.legend,
          top: '8%',
          type: 'scroll'
        },
        xAxis: {
          type: 'category',
          data: this.tableData.BatterySOC.XAxisData
        },
        yAxis: {
          type: 'value',
          min: this.tableData.BatterySOC.YAxisMin,
          max: this.tableData.BatterySOC.YAxisMax
        },
        series: this.tableData.BatterySOC.series
      })

      setTimeout(function () {
        window.onresize = function () {
          myChart1.resize()
          myChart2.resize()
          myChart3.resize()
          myChart4.resize()
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
@media screen and (max-width: 800px) {
  .wrap {
    width: 100%;
  }
}
@media screen and (min-width: 800px) {
  .wrap {
    width: 50%;
  }
}
</style>
