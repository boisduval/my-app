<template>
  <div>
    <el-col :span="12">
      <div id="myChart" style="height:400px"></div>
    </el-col>
    <el-col :span="12">
      <div id="myChart1" style="height:400px"></div>
    </el-col>
    <el-col :span="12">
      <div id="myChart2" style="height:400px"></div>
    </el-col>
    <el-col :span="12">
      <div id="myChart3" style="height:400px"></div>
    </el-col>
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
      CONTENTSwitches: [],
      CPUDPCTime: [],
      CPUInterruptTime: [],
      CPUPrivilegedTime: [],
      CPUProcessorTime: [],
      DISCQueueLengh: [],
      DISKAverageTimeRead: [],
      DISKAverageTimeWrite: [],
      DISKRead: [],
      DISKTime: [],
      DISKWrite: [],
      HANDLECountCounter: [],
      MEMAvailable: [],
      MEMCached: [],
      MEMCommitLimit: [],
      MEMCommited: [],
      MEMCommitedPerc: [],
      MEMPoolNonPaged: [],
      MEMPoolPaged: [],
      NetTrafficReceive: [],
      NetTrafficSend: [],
      PageFile: [],
      ProcessorQueueLengh: [],
      SYSTEMCalls: [],
      SamplingTime: [],
      THREADCount: [],
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
      // if (this.myChart !== '') {
      //   this.myChart.clear()
      // }
      this.CONTENTSwitches = []
      this.CPUDPCTime = []
      this.CPUInterruptTime = []
      this.CPUPrivilegedTime = []
      this.CPUProcessorTime = []
      this.DISCQueueLengh = []
      this.DISKAverageTimeRead = []
      this.DISKAverageTimeWrite = []
      this.DISKRead = []
      this.DISKTime = []
      this.DISKWrite = []
      this.HANDLECountCounter = []
      this.MEMAvailable = []
      this.MEMCached = []
      this.MEMCommitLimit = []
      this.MEMCommited = []
      this.MEMCommitedPerc = []
      this.MEMPoolNonPaged = []
      this.MEMPoolPaged = []
      this.NetTrafficReceive = []
      this.NetTrafficSend = []
      this.PageFile = []
      this.ProcessorQueueLengh = []
      this.SYSTEMCalls = []
      this.SamplingTime = []
      this.THREADCount = []
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
          position: function (pt) {
            return [pt[0], '10%']
          },
          formatter (value) {
            let str = value[0].name + '<br/>'
            value.forEach(item => {
              str += item.marker + item.seriesName + ': ' + item.data + '%' + '<br/>'
            })
            return str
          }
        },
        legend: {
          // data: ['处理器Cpu时间', 'Cpu特权时间', 'Cpu中断时间', 'Cpu DPC时间']
          data: ['处理器Cpu时间']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        title: {
          text: 'CPU监控'
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
            data: this.CPUProcessorTime
          }
          // {
          //   name: 'Cpu特权时间',
          //   type: 'line',
          //   data: this.CPUPrivilegedTime
          // },
          // {
          //   name: 'Cpu中断时间',
          //   type: 'line',
          //   data: this.CPUPrivilegedTime
          // },
          // {
          //   name: 'Cpu DPC时间',
          //   type: 'line',
          //   data: this.CPUDPCTime
          // }
        ]
      })

      // 第二个图
      var myChart1 = this.$echarts.init(document.getElementById('myChart1'))
      myChart1.setOption({
        tooltip: {
          trigger: 'axis',
          position: function (pt) {
            return [pt[0], '10%']
          },
          formatter (value) {
            let str = value[0].name + '<br/>'
            value.forEach(item => {
              str += item.marker + item.seriesName + ': ' + item.data + '%' + '<br/>'
            })
            return str
          }
        },
        legend: {
          // data: ['可用内存', '通用内存', '最大内存', '内存使用比例']
          data: ['内存使用比例']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        title: {
          text: '内存监控'
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
          max: 100,
          axisLabel: {
            formatter: '{value} (%)'
          }
        },
        series: [
          // {
          //   name: '可用内存',
          //   type: 'line',
          //   data: this.MEMAvailable
          // },
          // {
          //   name: '通用内存',
          //   type: 'line',
          //   data: this.MEMCommited
          // },
          // {
          //   name: '最大内存',
          //   type: 'line',
          //   data: this.MEMCommitLimit
          // },
          {
            name: '内存使用比例',
            type: 'line',
            data: this.MEMCommitedPerc
          }
        ]
      })

      // 第三个图
      var myChart2 = this.$echarts.init(document.getElementById('myChart2'))
      myChart2.setOption({
        tooltip: {
          trigger: 'axis',
          position: function (pt) {
            return [pt[0], '10%']
          }
        },
        legend: {
          // data: ['可用内存', '通用内存', '最大内存', '内存使用比例']
          data: ['网络流量发送', '网络流量接收']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        title: {
          text: '网络监控'
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
          // {
          //   name: '可用内存',
          //   type: 'line',
          //   data: this.MEMAvailable
          // },
          // {
          //   name: '通用内存',
          //   type: 'line',
          //   data: this.MEMCommited
          // },
          // {
          //   name: '最大内存',
          //   type: 'line',
          //   data: this.MEMCommitLimit
          // },
          {
            name: '网络流量发送',
            type: 'line',
            data: this.NetTrafficSend
          },
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
          myChart2.resize()
        }
      }, 200)
    }
  }
}
</script>

<style scoped></style>
