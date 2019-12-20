<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card class="box-card">
          <div id="myChart" style="height:350px"></div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <div id="myChart1" style="height:350px"></div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20" style="margin-top:20px">
      <el-col :span="12">
        <el-card class="box-card">
          <div id="myChart2" style="height:350px"></div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <div id="myChart3" style="height:350px"></div>
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
      CPUDPCTime: [],
      CPUInterruptTime: [],
      CPUPrivilegedTime: [],
      CPUProcessorTime: [],
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
      this.CPUDPCTime = []
      this.CPUInterruptTime = []
      this.CPUPrivilegedTime = []
      this.CPUProcessorTime = []
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
          trigger: 'axis',
          formatter (value) {
            let str = value[0].name + '<br/>'
            value.forEach(item => {
              str +=
                item.marker +
                item.seriesName +
                ': ' +
                item.data +
                '%' +
                '<br/>'
            })
            return str
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        title: {
          text: '处理器Cpu时间'
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
          boundaryGap: [0, '100%'],
          axisLabel: {
            formatter: '{value} (%)'
          }
        },
        series: [
          {
            name: '处理器Cpu时间',
            type: 'line',
            data: this.CPUProcessorTime,
            smooth: true,
            itemStyle: {
              color: '#7CB5EC'
            }
          }
        ],
        animationEasing: 'bounceInOut'
      })

      // 第2个图
      var myChart1 = this.$echarts.init(document.getElementById('myChart1'))
      myChart1.setOption({
        tooltip: {
          trigger: 'axis',
          formatter (value) {
            let str = value[0].name + '<br/>'
            value.forEach(item => {
              str +=
                item.marker +
                item.seriesName +
                ': ' +
                item.data +
                '%' +
                '<br/>'
            })
            return str
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        title: {
          text: 'Cpu特权时间'
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
          boundaryGap: [0, '100%'],
          axisLabel: {
            formatter: '{value} (%)'
          }
        },
        series: [
          {
            name: 'Cpu特权时间',
            type: 'line',
            data: this.CPUPrivilegedTime,
            smooth: true,
            itemStyle: {
              color: '#FF9655'
            }
          }
        ],
        animationEasing: 'bounceInOut'
      })

      // 第3个图
      var myChart2 = this.$echarts.init(document.getElementById('myChart2'))
      myChart2.setOption({
        tooltip: {
          trigger: 'axis',
          formatter (value) {
            let str = value[0].name + '<br/>'
            value.forEach(item => {
              str +=
                item.marker +
                item.seriesName +
                ': ' +
                item.data +
                '%' +
                '<br/>'
            })
            return str
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        title: {
          text: 'Cpu中断时间'
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
          boundaryGap: [0, '100%'],
          axisLabel: {
            formatter: '{value} (%)'
          }
        },
        series: [
          {
            name: 'Cpu中断时间',
            type: 'line',
            data: this.CPUPrivilegedTime,
            smooth: true,
            itemStyle: {
              color: '#69F9C4'
            }
          }
        ],
        animationEasing: 'bounceInOut'
      })

      // 第4个图
      var myChart3 = this.$echarts.init(document.getElementById('myChart3'))
      myChart3.setOption({
        tooltip: {
          trigger: 'axis',
          formatter (value) {
            let str = value[0].name + '<br/>'
            value.forEach(item => {
              str +=
                item.marker +
                item.seriesName +
                ': ' +
                item.data +
                '%' +
                '<br/>'
            })
            return str
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        title: {
          text: 'Cpu DPC时间'
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
          boundaryGap: [0, '100%'],
          axisLabel: {
            formatter: '{value} (%)'
          }
        },
        series: [
          {
            name: 'Cpu DPC时间',
            type: 'line',
            data: this.CPUDPCTime,
            smooth: true,
            itemStyle: {
              color: '#d48265'
            }
          }
        ],
        animationEasing: 'bounceInOut'
      })

      setTimeout(function () {
        window.onresize = function () {
          myChart.resize()
          myChart1.resize()
          myChart2.resize()
          myChart3.resize()
        }
      }, 200)
    }
  }
}
</script>

<style scoped></style>
