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
      url: [
        '/api/Monitor/GetBatterySummaryStateHvenpc',
        '/api/Monitor/GetBatterySummaryStateMvvoscbn',
        '/api/Monitor/GetBatterySummaryStateMvvosu',
        '/api/Monitor/GetBatterySummaryStateThvobcc'
      ]
    }
  },
  created () {
    this.getBatterySummaryStateHvenpc()
  },
  methods: {
    ...mapMutations('statedetail', ['set_paramsTvpbc']),
    getBatterySummaryStateHvenpc () {
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
            this.getBatterySummaryStateMvvoscbn()
          }
        })
        .catch(err => {
          console.error(err)
        })
    },
    getBatterySummaryStateMvvoscbn () {
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
            this.getBatterySummaryStateMvvosu()
          }
        })
        .catch(err => {
          console.error(err)
        })
    },
    getBatterySummaryStateMvvosu () {
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
            this.getBatterySummaryStateThvobcc()
          }
        })
        .catch(err => {
          console.error(err)
        })
    },
    getBatterySummaryStateThvobcc () {
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
          text: '每簇单体电压最高\n节带电池序号信息'
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
          text: '每簇单体最低电压值\n电池序号信息'
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
          text: '每簇单体最低\n电压值信息'
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
          text: '每簇单体电压\n最高值信息'
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
      setTimeout(function () {
        window.onresize = function () {
          myChart1.resize()
          myChart2.resize()
          myChart3.resize()
          myChart4.resize()
        }
      }, 200)
    }
  },
  watch: {
    bank: {
      handler (newName, oldName) {
        this.getBatterySummaryStateHvenpc()
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
