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
        <span>PCS总览</span>
      </div>
      <div class="wrap-box flex-row">
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
                  prop="one"
                  align="center"
                  show-overflow-tooltip
                  width="100px"
                  label="1">
                </el-table-column>
                <el-table-column
                  prop="two"
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
        BankIndex: '',
        Start: '',
        Stop: ''
      },
      tableData: [],
      loading: false,
      isShow: true,
      options: [],
      value: '',
      table1: [
        {
          one: 'U相',
          two: '223.5V',
          three: '223.5V',
          four: '712A',
          five: '162KVA',
          six: '153KW',
          seven: '0.99',
          eight: '98%'
        },
        {
          one: 'U相',
          two: '223.5V',
          three: '223.5V',
          four: '712A',
          five: '162KVA',
          six: '153KW',
          seven: '0.99',
          eight: '98%'
        },
        {
          one: 'U相',
          two: '223.5V',
          three: '223.5V',
          four: '712A',
          five: '162KVA',
          six: '153KW',
          seven: '0.99',
          eight: '98%'
        }
      ],
      table2: [
        {
          one: '机器型号',
          two: 'ABB-12341'
        },
        {
          one: '硬件版本',
          two: 'ABB-12341'
        },
        {
          one: '软件版本',
          two: 'ABB-12341'
        },
        {
          one: '厂家信息',
          two: '杭州xxxxxx设备有限公司'
        }
      ],
      table3: [
        {
          one: '第一簇断路器状态',
          two: '第二簇断路器状态',
          three: '第三簇断路器状态',
          four: '第四簇断路器状态',
          five: '第五簇断路器状态',
          six: '第六簇断路器状态'
        },
        {
          one: '闭合',
          two: '闭合',
          three: '闭合',
          four: '闭合',
          five: '闭合',
          six: '闭合'
        },
        {
          one: '第七簇断路器状态',
          two: '第八簇断路器状态',
          three: '第九簇断路器状态',
          four: '第十簇断路器状态',
          five: '第十一簇断路器状态',
          six: '第十二簇断路器状态'
        },
        {
          one: '闭合',
          two: '闭合',
          three: '闭合',
          four: '闭合',
          five: '闭合',
          six: '闭合'
        }
      ]
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
      var url = 'api/Statistics/GetBattery'
      this.$axios
        .get(url, { params: this.searchForm })
        .then(res => {
          if (res.data.code === 0) {
            this.tableData = res.data.data
            console.log(this.tableData)
            var arr1 = this.tableData.tOTAL_VOLTAGE_PER_BATTERY_CLUSTER
              .valueUnits
            var arr2 = this.tableData.cURRENT_IN_THE_MAIN_CIRCUIT_OF_EACH_BATTERY_CLUSTER
              .valueUnits
            var arr3 = this.tableData.cIRCUIT_BREAKER_FEEDBACK_STATE
              .valueUnits
            this.table1.push({
              one: arr1[0].name,
              two: arr1[1].name,
              three: arr1[2].name,
              four: arr1[3].name,
              five: arr1[4].name,
              six: arr1[5].name,
              seven: this.tableData.tOTAL_BATTERY_VOLTAGE.name
            })
            this.table1.push({
              one: arr1[0].value + arr1[0].unit,
              two: arr1[1].value + arr1[1].unit,
              three: arr1[2].value + arr1[2].unit,
              four: arr1[3].value + arr1[3].unit,
              five: arr1[4].value + arr1[4].unit,
              six: arr1[5].value + arr1[5].unit,
              seven: this.tableData.tOTAL_BATTERY_VOLTAGE.value +
              this.tableData.tOTAL_BATTERY_VOLTAGE.unit
            })
            this.table1.push({
              one: arr1[6].name,
              two: arr1[7].name,
              three: arr1[8].name,
              four: arr1[9].name,
              five: arr1[10].name,
              six: arr1[11].name,
              seven: this.tableData.oVERALL_BATTERY_SOC.name
            })
            this.table1.push({
              one: arr1[6].value + arr1[6].unit,
              two: arr1[7].value + arr1[7].unit,
              three: arr1[8].value + arr1[8].unit,
              four: arr1[9].value + arr1[9].unit,
              five: arr1[10].value + arr1[10].unit,
              six: arr1[11].value + arr1[11].unit,
              seven: this.tableData.oVERALL_BATTERY_SOC.value +
              this.tableData.oVERALL_BATTERY_SOC.unit
            })

            this.table2.push({
              one: arr2[0].name,
              two: arr2[1].name,
              three: arr2[2].name,
              four: arr2[3].name,
              five: arr2[4].name,
              six: arr2[5].name,
              seven: this.tableData.cURRENT_IN_THE_MAIN_CIRCUIT_OF_THE_BATTERY.name
            })
            this.table2.push({
              one: arr2[0].value + arr2[0].unit,
              two: arr2[1].value + arr2[1].unit,
              three: arr2[2].value + arr2[2].unit,
              four: arr2[3].value + arr2[3].unit,
              five: arr2[4].value + arr2[4].unit,
              six: arr2[5].value + arr2[5].unit,
              seven: this.tableData.cURRENT_IN_THE_MAIN_CIRCUIT_OF_THE_BATTERY.value +
              this.tableData.cURRENT_IN_THE_MAIN_CIRCUIT_OF_THE_BATTERY.unit
            })
            this.table2.push({
              one: arr2[6].name,
              two: arr2[7].name,
              three: arr2[8].name,
              four: arr2[9].name,
              five: arr2[10].name,
              six: arr2[11].name,
              seven: this.tableData.oVERALL_BATTERY_HEALTH.name
            })
            this.table2.push({
              one: arr2[6].value + arr2[6].unit,
              two: arr2[7].value + arr2[7].unit,
              three: arr2[8].value + arr2[8].unit,
              four: arr2[9].value + arr2[9].unit,
              five: arr2[10].value + arr2[10].unit,
              six: arr2[11].value + arr2[11].unit,
              seven: this.tableData.oVERALL_BATTERY_HEALTH.value +
              this.tableData.oVERALL_BATTERY_HEALTH.unit
            })

            this.table3.push({
              one: arr3[0].name,
              two: arr3[1].name,
              three: arr3[2].name,
              four: arr3[3].name,
              five: arr3[4].name,
              six: arr3[5].name
            })
            this.table3.push({
              one: arr3[0].value + arr3[0].unit,
              two: arr3[1].value + arr3[1].unit,
              three: arr3[2].value + arr3[2].unit,
              four: arr3[3].value + arr3[3].unit,
              five: arr3[4].value + arr3[4].unit,
              six: arr3[5].value + arr3[5].unit
            })
            this.table3.push({
              one: arr3[6].name,
              two: arr3[7].name,
              three: arr3[8].name,
              four: arr3[9].name,
              five: arr3[10].name,
              six: arr3[11].name
            })
            this.table3.push({
              one: arr3[6].value + arr3[6].unit,
              two: arr3[7].value + arr3[7].unit,
              three: arr3[8].value + arr3[8].unit,
              four: arr3[9].value + arr3[9].unit,
              five: arr3[10].value + arr3[10].unit,
              six: arr3[11].value + arr3[11].unit
            })

            this.tableData.VoltageDifferenceTrendOfEachCluster.series = []
            this.tableData.VoltageDifferenceTrendOfEachCluster.legend = []
            this.tableData.VoltageDifferenceTrendOfEachCluster.SeriesData.forEach(item => {
              this.tableData.VoltageDifferenceTrendOfEachCluster.legend.push(item.name)
              this.tableData.VoltageDifferenceTrendOfEachCluster.series.push({
                name: item.name,
                type: 'line',
                stack: item.stack,
                data: item.data
              })
            })

            this.tableData.CurrentDifferenceTrendOfEachCluster.series = []
            this.tableData.CurrentDifferenceTrendOfEachCluster.legend = []
            this.tableData.CurrentDifferenceTrendOfEachCluster.SeriesData.forEach(item => {
              this.tableData.CurrentDifferenceTrendOfEachCluster.legend.push(item.name)
              this.tableData.CurrentDifferenceTrendOfEachCluster.series.push({
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
          text: '各相视在功率',
          bottom: 0,
          left: 'center'
        },
        // grid: {
        //   left: '50',
        //   right: '20',
        //   bottom: '40',
        //   containLabel: true
        // },
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line'
        }]
      })

      // 第2个图
      var myChart2 = this.$echarts.init(document.getElementById('myChart2'))
      myChart2.setOption({
        title: {
          text: '各相有功功率',
          bottom: 0,
          left: 'center'
        },
        // grid: {
        //   left: '50',
        //   right: '20',
        //   bottom: '40',
        //   containLabel: true
        // },
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line'
        }]
      })

      // 第3个图
      var myChart3 = this.$echarts.init(document.getElementById('myChart3'))
      myChart3.setOption({
        title: {
          text: '电池总电流',
          bottom: 0,
          left: 'center'
        },
        // grid: {
        //   left: '50',
        //   right: '20',
        //   bottom: '40',
        //   containLabel: true
        // },
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line'
        }]
      })

      // 第4个图
      var myChart4 = this.$echarts.init(document.getElementById('myChart4'))
      myChart4.setOption({
        title: {
          text: '电池SOC',
          bottom: 0,
          left: 'center'
        },
        // grid: {
        //   left: '50',
        //   right: '20',
        //   bottom: '40',
        //   containLabel: true
        // },
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line'
        }]
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
