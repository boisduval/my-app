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
    this.getData()
    this.interval = setInterval(() => {
      console.log('ok')
      this.getData()
    }, 3000)
    this.$once('hook:beforeDestroy', () => {
      clearInterval(this.interval)
    })
  },
  methods: {
    getData () {
      this.NetTrafficSend = []
      this.NetTrafficReceive = []
      this.SamplingTime = []
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
      this.data.forEach((el, index) => {
        for (const key in el) {
          if (el.hasOwnProperty(key) && this.hasOwnProperty(key)) {
            if (key === 'SamplingTime') {
              var time = el[key].split('.')[0]
              // time = time.replace('T', '\n')
              time = time.split('T')[1]
              this[key].push(time)
            } else {
              this[key].push(el[key])
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
          right: '4%',
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
          type: 'category',
          boundaryGap: false,
          data: this.SamplingTime
        },
        yAxis: {
          type: 'value',
          boundaryGap: [0, '100%']
        },
        series: [
          {
            name: '网络流量发送',
            type: 'line',
            data: this.NetTrafficSend
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
          right: '4%',
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
          type: 'category',
          boundaryGap: false,
          data: this.SamplingTime
        },
        yAxis: {
          type: 'value',
          boundaryGap: [0, '100%']
        },
        series: [
          {
            name: '网络流量接收',
            type: 'line',
            data: this.NetTrafficReceive
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
