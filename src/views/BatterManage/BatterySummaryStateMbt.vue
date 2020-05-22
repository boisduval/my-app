<template>
  <div>
    <el-col :span="12">
      <el-card class="card odd">
        <div id="myChart1" style="height:400px"></div>
      </el-card>
    </el-col>
    <el-col :span="12">
      <el-card class="card">
        <div id="myChart2" style="height:400px"></div>
      </el-card>
    </el-col>
    <el-col :span="12">
      <el-card class="card odd">
        <div id="myChart3" style="height:400px"></div>
      </el-card>
    </el-col>
    <el-col :span="12">
      <el-card class="card">
        <div id="myChart4" style="height:400px"></div>
      </el-card>
    </el-col>
    <el-col :span="12">
      <el-card class="card odd">
        <div id="myChart5" style="height:400px"></div>
      </el-card>
    </el-col>
    <el-col :span="12">
      <el-card class="card">
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
  props: ['bank'],
  data () {
    return {
      xAxis3: [],
      series3: [],
      xAxis1: [],
      series1: [],
      legend1: [],
      xAxis2: [],
      series2: [],
      xAxis4: [],
      series4: [],
      xAxis5: [],
      series5: [],
      xAxis6: [],
      series6: [],
      url: [
        '/api/Monitor/GetBatterySummaryStateMbtspn',
        '/api/Monitor/GetBatterySummaryStateMbt',
        '/api/Monitor/GetBatterySummaryStateMbtspnn',
        '/api/Monitor/GetBatterySummaryStateMbtn',
        '/api/Monitor/GetBatterySummaryStateTpot'
      ]
    }
  },
  created () {
    this.getBatterySummaryStateMbtspn()
  },
  methods: {
    ...mapMutations('statedetail', ['set_paramsTvpbc']),
    getBatterySummaryStateMbtspn () {
      this.legend1 = []
      this.xAxis1 = []
      this.series1 = []
      this.$axios
        .get(this.url[0], {
          params: {
            AutoSystemID: this.paramsTvpbc.AutoSystemID,
            BatteryIDS: this.paramsTvpbc.batterID,
            BankIndex: this.bank
          }
        })
        .then(res => {
          if (res.data.code === 0) {
            let data = res.data.data
            this.xAxis1 = data.WriteTime.map(
              time => time.split('T')[1].split('.')[0]
            )
            for (let index = 1; index <= 12; index++) {
              this.legend1.push(index)
              this.series1.push({
                name: index,
                type: 'line',
                data: data['Data' + index]
              })
            }
            this.getBatterySummaryStateMbt()
          }
        })
        .catch(err => {
          console.error(err)
        })
    },
    getBatterySummaryStateMbt () {
      this.xAxis2 = []
      this.series2 = []
      this.$axios
        .get(this.url[1], {
          params: {
            AutoSystemID: this.paramsTvpbc.AutoSystemID,
            BatteryIDS: this.paramsTvpbc.batterID,
            BankIndex: this.bank
          }
        })
        .then(res => {
          if (res.data.code === 0) {
            let data = res.data.data
            this.xAxis2 = data.WriteTime.map(
              time => time.split('T')[1].split('.')[0]
            )
            for (let index = 1; index <= 12; index++) {
              this.series2.push({
                name: index,
                type: 'line',
                data: data['Data' + index]
              })
            }
            this.getBatterySummaryStateMbtspnn()
          }
        })
        .catch(err => {
          console.error(err)
        })
    },
    getBatterySummaryStateMbtspnn () {
      this.xAxis3 = []
      this.series3 = []
      this.$axios
        .get(this.url[2], {
          params: {
            AutoSystemID: this.paramsTvpbc.AutoSystemID,
            BatteryIDS: this.paramsTvpbc.batterID,
            BankIndex: this.bank
          }
        })
        .then(res => {
          if (res.data.code === 0) {
            let data = res.data.data
            this.xAxis3 = data.WriteTime.map(
              time => time.split('T')[1].split('.')[0]
            )
            for (let index = 1; index <= 12; index++) {
              this.series3.push({
                name: index,
                type: 'line',
                data: data['Data' + index]
              })
            }
            this.getBatterySummaryStateMbtn()
          }
        })
        .catch(err => {
          console.error(err)
        })
    },
    getBatterySummaryStateMbtn () {
      this.xAxis4 = []
      this.series4 = []
      this.$axios
        .get(this.url[3], {
          params: {
            AutoSystemID: this.paramsTvpbc.AutoSystemID,
            BatteryIDS: this.paramsTvpbc.batterID,
            BankIndex: this.bank
          }
        })
        .then(res => {
          if (res.data.code === 0) {
            let data = res.data.data
            this.xAxis4 = data.WriteTime.map(
              time => time.split('T')[1].split('.')[0]
            )
            for (let index = 1; index <= 12; index++) {
              this.series4.push({
                name: index,
                type: 'line',
                data: data['Data' + index]
              })
            }
            this.getBatterySummaryStateTpot()
          }
        })
        .catch(err => {
          console.error(err)
        })
    },
    getBatterySummaryStateTpot () {
      this.xAxis5 = []
      this.series5 = []
      this.$axios
        .get(this.url[4], {
          params: {
            AutoSystemID: this.paramsTvpbc.AutoSystemID,
            BatteryIDS: this.paramsTvpbc.batterID,
            BankIndex: this.bank
          }
        })
        .then(res => {
          if (res.data.code === 0) {
            let data = res.data.data
            this.xAxis5 = data.WriteTime.map(
              time => time.split('T')[1].split('.')[0]
            )
            for (let index = 1; index <= 12; index++) {
              this.series5.push({
                name: index,
                type: 'line',
                data: data['Data' + index]
              })
            }
            this.getBatterySummaryStateTet()
          }
        })
        .catch(err => {
          console.error(err)
        })
    },
    getBatterySummaryStateTet () {
      this.legend6 = []
      this.xAxis6 = []
      this.series6 = []
      var url = '/api/Monitor/GetBatterySummaryStateTet'
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
            this.legend6.push('环境温度信息')
            this.series6.push({
              name: '环境温度信息',
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
          text: '每簇最高电池温度\n采样点序号信息'
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
          text: '每簇最高电池\n温度值信息'
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
          text: '每簇最低电池温度\n采样点序号信息'
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
          text: '每簇最低\n电池温度值信息'
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
          text: '每簇功率\n温度信息'
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
          text: '环境温度信息'
        },
        tooltip: {
          trigger: 'axis'
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
          myChart6.resize()
        }
      }, 200)
    }
  },
  watch: {
    bank: {
      handler (newName, oldName) {
        this.getBatterySummaryStateMbtspn()
      }
    }
  }
}
</script>

<style scoped>
.card {
  margin-top: 20px;
}
.odd {
    margin-right: 20px;
}
</style>
