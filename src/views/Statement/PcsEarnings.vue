<template>
  <div>
    <!-- 表单开始 -->
    <el-collapse-transition>
      <div style="box-sizing:border-box;" v-show="isShow">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>{{$t('base.searchbtn')}}</span>
          </div>
          <el-form
            :inline="true"
            :model="searchForm"
            class="demo-form-inline"
            label-position="right"
          >
            <el-form-item :label="$t('pcsEarnings.formLabel')[0]" label-width="80px">
              <el-date-picker
                v-model="value"
                type="daterange"
                :range-separator="$t('base.datePicker.separator')"
                :start-placeholder="$t('base.datePicker.start')"
                :end-placeholder="$t('base.datePicker.end')"
                :clearable="false"
                @change="getData"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item :label="$t('pcsEarnings.formLabel')[1]" label-width="80px">
              <el-select v-model="searchForm.DeviceSystemID" @change="getPcsList">
                <el-option
                  v-for="(item, index) in options"
                  :key="index"
                  :value="item.SystemID"
                  :label="item.Name"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('pcsEarnings.formLabel')[2]" label-width="80px">
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
                >{{$t('base.dateGroup.yesterday')}}</el-button
              >
              <el-button
                type="primary"
                plain
                size="mini"
                @click="goOtherDay('week')"
                >{{$t('base.dateGroup.week')}}</el-button
              >
              <el-button
                type="primary"
                plain
                size="mini"
                @click="goOtherDay('month')"
                >{{$t('base.dateGroup.month')}}</el-button
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
        <span>{{$t('pcsEarnings.title')}}</span>
      </div>
      <div class="wrap-box flex-row" v-loading="loading">
          <div class="wrap" style="width:100%">
            <div style="padding: 0 20px">
              <el-table
                :show-header="true"
                header-row-class-name="light"
                :data="table1"
                :border="true"
                style="width: 100%">
                <el-table-column
                  v-for="(item, index) in th" :key="index"
                  :prop="index.toString()"
                  align="center"
                  show-overflow-tooltip
                  :label="item">
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
      th: []
    }
  },
  created () {
    // this.setData()
    this.searchForm.AutoSystemID = localStorage.getItem('AutoSystemID')
    this.searchForm.PCSIndex = '0'
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
      this.table1 = [{}]
      this.table2 = []
      this.table3 = []
      this.th = []
      this.tableData = ''
      this.searchForm.Start = moment(this.value[0]).format('YYYY-MM-DD')
      this.searchForm.Stop = moment(this.value[1]).format('YYYY-MM-DD')
      var url = 'api/Statistics/GetPCSEarningsReport'
      this.$axios
        .get(url, { params: this.searchForm })
        .then(res => {
          if (res.data.code === 0) {
            this.tableData = res.data.data
            this.th = this.tableData.tABLE_VALUES.valueUnits.map((val, i) => {
              return val.name
            })
            this.tableData.tABLE_VALUES.valueUnits.forEach((val, i) => {
              this.table1[0][i.toString()] = val.value + val.unit
            })

            this.tableData.Dailychargeanddischargestatistics.series = []
            this.tableData.Dailychargeanddischargestatistics.legend = []
            this.tableData.Dailychargeanddischargestatistics.SeriesData.forEach(item => {
              this.tableData.Dailychargeanddischargestatistics.legend.push(item.name)
              this.tableData.Dailychargeanddischargestatistics.series.push({
                name: item.name,
                type: 'bar',
                stack: item.stack,
                data: item.data,
                barGap: 0
              })
            })

            this.tableData.Dailychargeanddischargetrend.series = []
            this.tableData.Dailychargeanddischargetrend.legend = []
            this.tableData.Dailychargeanddischargetrend.SeriesData.forEach(item => {
              this.tableData.Dailychargeanddischargetrend.legend.push(item.name)
              this.tableData.Dailychargeanddischargetrend.series.push({
                name: item.name,
                type: 'line',
                stack: item.stack,
                data: item.data
              })
            })

            this.tableData.Overallearningstrend.series = []
            this.tableData.Overallearningstrend.legend = []
            this.tableData.Overallearningstrend.SeriesData.forEach(item => {
              this.tableData.Overallearningstrend.legend.push(item.name)
              this.tableData.Overallearningstrend.series.push({
                name: item.name,
                type: 'line',
                stack: item.stack,
                data: item.data
              })
            })

            this.tableData.Totaldailyincomestatistics.series = []
            this.tableData.Totaldailyincomestatistics.legend = []
            this.tableData.Totaldailyincomestatistics.SeriesData.forEach(item => {
              this.tableData.Totaldailyincomestatistics.legend.push(item.name)
              this.tableData.Totaldailyincomestatistics.series.push({
                name: item.name,
                type: 'bar',
                stack: item.stack,
                data: item.data,
                barGap: 0,
                barMaxWidth: 30
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
            this.getPcsList()
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

    getEcharts () {
      // 第一个图
      var myChart1 = this.$echarts.init(document.getElementById('myChart1'))
      myChart1.setOption({
        title: {
          text: this.tableData.Dailychargeanddischargestatistics.Name,
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
          data: this.tableData.Dailychargeanddischargestatistics.legend,
          top: '8%',
          type: 'scroll'
        },
        xAxis: {
          type: 'category',
          data: this.tableData.Dailychargeanddischargestatistics.XAxisData
        },
        yAxis: {
          type: 'value',
          scale: true
        },
        series: this.tableData.Dailychargeanddischargestatistics.series
      })

      // 第2个图
      var myChart2 = this.$echarts.init(document.getElementById('myChart2'))
      myChart2.setOption({
        title: {
          text: this.tableData.Dailychargeanddischargetrend.Name,
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
          trigger: 'axis',
          axiosPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: this.tableData.Dailychargeanddischargetrend.legend,
          top: '8%',
          type: 'scroll'
        },
        xAxis: {
          type: 'category',
          data: this.tableData.Dailychargeanddischargetrend.XAxisData
        },
        yAxis: {
          type: 'value',
          scale: 'true'
        },
        series: this.tableData.Dailychargeanddischargetrend.series
      })
      // 第3个图
      var myChart3 = this.$echarts.init(document.getElementById('myChart3'))
      myChart3.setOption({
        title: {
          text: this.tableData.Overallearningstrend.Name,
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
          data: this.tableData.Overallearningstrend.legend,
          top: '8%',
          type: 'scroll'
        },
        xAxis: {
          type: 'category',
          data: this.tableData.Overallearningstrend.XAxisData
        },
        yAxis: {
          type: 'value',
          scale: true
        },
        series: this.tableData.Overallearningstrend.series
      })

      // 第4个图
      var myChart4 = this.$echarts.init(document.getElementById('myChart4'))
      myChart4.setOption({
        title: {
          text: this.tableData.Totaldailyincomestatistics.Name,
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
          trigger: 'axis',
          axiosPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: this.tableData.Totaldailyincomestatistics.legend,
          top: '8%',
          type: 'scroll'
        },
        xAxis: {
          type: 'category',
          data: this.tableData.Totaldailyincomestatistics.XAxisData
        },
        yAxis: {
          type: 'value',
          scale: 'true'
        },
        series: this.tableData.Totaldailyincomestatistics.series
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
