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
      xAxis1: [],
      series1: [],
      legend1: [],
      legend2: [],
      xAxis2: [],
      series2: [],
      url: [
        '/api/Monitor/GetBatterySummaryStateObSOC',
        '/api/Monitor/GetBatterySummaryStateObSOH'
      ]
    }
  },
  created () {
    this.getBatterySummaryStateObSOC()
  },
  methods: {
    ...mapMutations('statedetail', ['set_paramsTvpbc']),
    getBatterySummaryStateObSOC () {
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
            this.legend1.push('SOC信息')
            this.series1.push({
              name: 'SOC信息',
              type: 'line',
              data: data['Data1']
            })
            this.getBatterySummaryStateObSOH()
          }
        })
        .catch(err => {
          console.error(err)
        })
    },
    getBatterySummaryStateObSOH () {
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
            this.legend2.push('SOH信息')
            this.series2.push({
              name: 'SOH信息',
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
          text: 'SOC信息'
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
          text: 'SOH信息'
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
      setTimeout(function () {
        window.onresize = function () {
          myChart1.resize()
          myChart2.resize()
        }
      }, 200)
    }
  },
  watch: {
    bank: {
      handler (newName, oldName) {
        this.getBatterySummaryStateObSOC()
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
