<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card class="box-card">
          <div id="myChart" style="height:400px"></div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <div id="myChart1" style="height:400px"></div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      xAxis: [],
      yAxis: '',
      series: [],
      AutoSystemID: '',
      data: [],
      NetTrafficSend: [],
      NetTrafficReceive: [],
      SamplingTime: [],
      interval: '',
      myChart: '',
      myChart1: ''
    }
  },
  created () {
    this.AutoSystemID = localStorage.getItem('AutoSystemID')
    this.$nextTick(() => {
      this.getData()
      this.interval = setInterval(() => {
        console.log('ok')
        this.getData()
      }, 6000)
    })
    this.$once('hook:beforeDestroy', () => {
      clearInterval(this.interval)
    })
  },
  methods: {
    getData () {
      // this.NetTrafficSend = []
      // this.NetTrafficReceive = []
      // this.SamplingTime = []
      var url = '/api/Monitor/GetSystemMonitorInfo'
      this.$axios
        .get(url, {
          params: {
            AutoSystemID: this.AutoSystemID
          }
        })
        .then(res => {
          if (res.data.code === 0) {
            this.data = res.data.data
            this.setData()
            this.getEcharts()
          } else if (res.data.code === 1) {
            this.$message.error(res.data.msg)
          }
        })
        .catch(err => {
          console.error(err)
        })
    },

    // 处理数据
    setData () {
      if (this.NetTrafficSend.length > 65) {
        for (const key in this.data[0]) {
          if (this.hasOwnProperty(key)) {
            for (var i = 0; i < 6; i++) {
              this[key].shift()
            }
          }
        }
      }
      this.data.forEach((el, index) => {
        for (const key in el) {
          if (el.hasOwnProperty(key) && this.hasOwnProperty(key)) {
            if (key === 'SamplingTime') {
            } else {
              this[key].push({
                name: '',
                value: []
              })
              var num = this[key].length - 1
              this[key][num].name = new Date(el.SamplingTime)
              this[key][num].value = [new Date(el.SamplingTime), el[key]]
            }
          }
        }
      })
    },

    getEcharts () {
      // 第一个图
      var myChart = this.$echarts.init(document.getElementById('myChart'))
      myChart.setOption({
        tooltip: {
          trigger: 'axis'
        },
        grid: {
          left: '3%',
          right: '8%',
          bottom: '3%',
          containLabel: true
        },
        title: {
          text: '网络流量发送'
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'time',
          boundaryGap: false,
          splitLine: {
            show: false
          }
        },
        yAxis: {
          type: 'value',
          boundaryGap: [0, '100%'],
          splitLine: {
            show: false
          }
        },
        series: [
          {
            symbol: 'none',
            name: '网络流量发送',
            type: 'line',
            data: this.NetTrafficSend,
            smooth: true,
            itemStyle: {
              color: '#7CB5EC'
            }
          }
        ]
      })

      // 第2个图
      var myChart1 = this.$echarts.init(document.getElementById('myChart1'))
      myChart1.setOption({
        tooltip: {
          trigger: 'axis'
        },
        grid: {
          left: '3%',
          right: '8%',
          bottom: '3%',
          containLabel: true
        },
        title: {
          text: '网络流量接收'
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'time',
          boundaryGap: false,
          splitLine: {
            show: false
          }
        },
        yAxis: {
          type: 'value',
          boundaryGap: [0, '100%'],
          splitLine: {
            show: false
          }
        },
        series: [
          {
            symbol: 'none',
            name: '网络流量接收',
            type: 'line',
            data: this.NetTrafficReceive,
            smooth: true,
            itemStyle: {
              color: '#69F9C4'
            }
          }
        ]
      })

      setTimeout(function () {
        window.onresize = function () {
          myChart.resize()
          myChart1.resize()
        }
      }, 200)
    }
  }
}
</script>

<style scoped></style>
