<template>
  <div>
    <el-card>
      <el-form label-width="80px" :inline="true">
        <el-form-item label="设备Bank" style="width:400px">
          <el-select v-model="bank" style="width:250px">
            <el-option label="Bank1" value="0"></el-option>
            <el-option label="Bank2" value="1"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-card>
    <el-col :span="12">
      <el-card style="margin-top:20px">
        <div id="myChart1" style="height:400px"></div>
      </el-card>
    </el-col>
    <el-col :span="12">
      <el-card style="margin-top:20px">
        <div id="myChart2" style="height:400px"></div>
      </el-card>
    </el-col>
    <el-col :span="12">
      <el-card style="margin-top:20px">
        <div id="myChart3" style="height:400px"></div>
      </el-card>
    </el-col>
    <el-col :span="12">
      <el-card style="margin-top:20px">
        <div id="myChart4" style="height:400px"></div>
      </el-card>
    </el-col>
    <el-col :span="12">
      <el-card style="margin-top:20px">
        <div id="myChart5" style="height:400px"></div>
      </el-card>
    </el-col>
    <el-col :span="12">
      <el-card style="margin-top:20px">
        <div id="myChart6" style="height:400px"></div>
      </el-card>
    </el-col>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
export default {
  computed: {
    ...mapState('statedetail', ['paramsTvpbc'])
  },
  data () {
    return {
      xAxis3: [],
      bank: 0,
      series3: [],
      legend3: [],
      xAxis1: [],
      series1: [],
      legend1: [],
      xAxis2: [],
      series2: [],
      legend2: [],
      xAxis4: [],
      series4: [],
      legend4: [],
      xAxis5: [],
      series5: [],
      legend5: [],
      xAxis6: [],
      series6: [],
      legend6: [],
      url: [
        '/api/Monitor/GetBatterySummaryStateTvpbc',
        '/api/Monitor/GetBatterySummaryStateMmv',
        '/api/Monitor/GetBatterySummaryStateDbp',
        '/api/Monitor/GetBatterySummaryStateTvd',
        '/api/Monitor/GetBatterySummaryStateSvsv'
      ]
    }
  },
  created () {
    this.getData()
    this.getBatterySummaryStateTbv()
  },
  methods: {
    ...mapMutations('statedetail', ['set_paramsTvpbc']),
    getData () {
      for (let i = 1; i <= this.url.length; i++) {
        this.getBatterySummaryState(
          this.url[i - 1],
          this['xAxis' + i],
          this['legend' + i],
          this['series' + i]
        )
      }
    },
    getBatterySummaryState (url, xAxis, legend, series) {
      this.$axios
        .get(url, {
          params: {
            AutoSystemID: this.paramsTvpbc.AutoSystemID,
            BatteryIDS: this.paramsTvpbc.batterID,
            BankIndex: this.bank
          }
        })
        .then(res => {
          if (res.data.code === 0) {
            let data = res.data.data
            xAxis = data.WriteTime.map(
              time => time.split('T')[1].split('.')[0]
            )
            for (let index = 1; index <= 12; index++) {
              legend.push('第' + index + '簇')
              series.push({
                name: '第' + index + '簇',
                type: 'line',
                data: data['Data' + index]
              })
            }
            this.getBatterySummaryStateTbv()
          }
        })
        .catch(err => {
          console.error(err)
        })
    },
    getBatterySummaryStateTbv () {
      var url = '/api/Monitor/GetBatterySummaryStateTbv'
      this.$axios
        .get(url, {
          params: {
            AutoSystemID: this.paramsTvpbc.AutoSystemID,
            BatteryIDS: this.paramsTvpbc.batterID,
            BankIndex: this.bank
          }
        })
        .then(res => {
          if (res.data.code === 0) {
            let data = res.data.data
            this.xAxis6 = data.WriteTime.map(
              time => time.split('T')[1].split('.')[0]
            )
            this.legend6.push('总压信息')
            this.series6.push({
              name: '总压信息',
              type: 'line',
              data: data['Data1']
            })
            this.getEcharts()
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
          text: '每簇电池\n总压信息'
        },
        tooltip: {
          trigger: 'axis',
          formatter (value) {
            let str = value[0].name + '<br/>'
            value.forEach((item, index) => {
              if (index % 2 !== 1) {
                str += item.marker + item.seriesName + ': ' + item.data + ' '
              } else {
                str +=
                  item.marker + item.seriesName + ': ' + item.data + '<br/>'
              }
            })
            return str
          }
        },
        legend: {
          data: this.legend1,
          type: 'scroll',
          width: '50%'
          // bottom: 10,
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.xAxis1
        },
        yAxis: {
          type: 'value'
        },
        series: this.series1
      })

      // 第2个图
      var myChart2 = this.$echarts.init(document.getElementById('myChart2'))
      myChart2.setOption({
        title: {
          text: '每簇单体\n平均电压信息'
        },
        tooltip: {
          trigger: 'axis',
          formatter (value) {
            let str = value[0].name + '<br/>'
            value.forEach((item, index) => {
              if (index % 2 !== 1) {
                str += item.marker + item.seriesName + ': ' + item.data + ' '
              } else {
                str +=
                  item.marker + item.seriesName + ': ' + item.data + '<br/>'
              }
            })
            return str
          }
        },
        legend: {
          data: this.legend2,
          type: 'scroll',
          width: '50%'
          // bottom: 10,
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.xAxis2
        },
        yAxis: {
          type: 'value'
        },
        series: this.series2
      })
      // 第3个图
      var myChart3 = this.$echarts.init(document.getElementById('myChart3'))
      myChart3.setOption({
        title: {
          text: '每簇电池\n压差值信息'
        },
        tooltip: {
          trigger: 'axis',
          formatter (value) {
            let str = value[0].name + '<br/>'
            value.forEach((item, index) => {
              if (index % 2 !== 1) {
                str += item.marker + item.seriesName + ': ' + item.data + ' '
              } else {
                str +=
                  item.marker + item.seriesName + ': ' + item.data + '<br/>'
              }
            })
            return str
          }
        },
        legend: {
          data: this.legend3,
          type: 'scroll',
          width: '50%'
          // bottom: 10,
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.xAxis3
        },
        yAxis: {
          type: 'value'
        },
        series: this.series3
      })
      // 第4个图
      var myChart4 = this.$echarts.init(document.getElementById('myChart4'))
      myChart4.setOption({
        title: {
          text: '每簇总电压\n压差值信息'
        },
        tooltip: {
          trigger: 'axis',
          formatter (value) {
            let str = value[0].name + '<br/>'
            value.forEach((item, index) => {
              if (index % 2 !== 1) {
                str += item.marker + item.seriesName + ': ' + item.data + ' '
              } else {
                str +=
                  item.marker + item.seriesName + ': ' + item.data + '<br/>'
              }
            })
            return str
          }
        },
        legend: {
          data: this.legend4,
          type: 'scroll',
          width: '50%'
          // bottom: 10,
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.xAxis4
        },
        yAxis: {
          type: 'value'
        },
        series: this.series4
      })
      // 第5个图
      var myChart5 = this.$echarts.init(document.getElementById('myChart5'))
      myChart5.setOption({
        title: {
          text: '每簇供电电压\n采样值信息'
        },
        tooltip: {
          trigger: 'axis',
          formatter (value) {
            let str = value[0].name + '<br/>'
            value.forEach((item, index) => {
              if (index % 2 !== 1) {
                str += item.marker + item.seriesName + ': ' + item.data + ' '
              } else {
                str +=
                  item.marker + item.seriesName + ': ' + item.data + '<br/>'
              }
            })
            return str
          }
        },
        legend: {
          data: this.legend5,
          type: 'scroll',
          width: '50%'
          // bottom: 10,
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.xAxis5
        },
        yAxis: {
          type: 'value'
        },
        series: this.series5
      })
      // 第6个图
      var myChart6 = this.$echarts.init(document.getElementById('myChart6'))
      myChart6.setOption({
        title: {
          text: '总压信息'
        },
        tooltip: {
          trigger: 'axis',
          formatter (value) {
            let str = value[0].name + '<br/>'
            value.forEach((item, index) => {
              if (index % 2 !== 1) {
                str += item.marker + item.seriesName + ': ' + item.data + ' '
              } else {
                str +=
                  item.marker + item.seriesName + ': ' + item.data + '<br/>'
              }
            })
            return str
          }
        },
        legend: {
          data: this.legend6,
          type: 'scroll',
          width: '50%'
          // bottom: 10,
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.xAxis6
        },
        yAxis: {
          type: 'value'
        },
        series: this.series6
      })

      setTimeout(function () {
        window.onresize = function () {
          myChart1.resize()
          myChart2.resize()
          myChart3.resize()
          myChart4.resize()
          myChart5.resize()
        }
      }, 200)
    }
  }
}
</script>

<style scoped>
.el-form-item {
  margin-bottom: 0;
}
.el-col .el-card:nth-child(odd) {
  margin-right: 20px;
}
</style>
