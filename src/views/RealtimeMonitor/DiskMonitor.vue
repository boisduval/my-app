<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card class="box-card">
          <div id="myChart" style="height:350px"></div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card>
          <div id="myChart1" style="height:350px"></div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="box-card">
          <div id="myChart2" style="height:350px"></div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card>
          <div id="myChart3" style="height:350px"></div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card>
          <div id="myChart4" style="height:350px"></div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card>
          <div id="myChart5" style="height:350px"></div>
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
      DISKRead: [],
      DISKWrite: [],
      DISKAverageTimeRead: [],
      DISKAverageTimeWrite: [],
      DISKTime: [],
      DISCQueueLengh: [],
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
      // this.DISKRead = []
      // this.DISKAverageTimeRead = []
      // this.DISKAverageTimeWrite = []
      // this.DISKWrite = []
      // this.DISCQueueLengh = []
      // this.DISKTime = []
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
          text: '读硬盘速度'
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
            name: '读硬盘速度',
            type: 'line',
            data: this.DISKRead,
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
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        title: {
          text: '写硬盘速度'
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
            name: '写硬盘速度',
            type: 'line',
            data: this.DISKWrite,
            smooth: true,
            itemStyle: {
              color: '#FF9655'
            }
          }
        ]
      })

      // 第3个图
      var myChart2 = this.$echarts.init(document.getElementById('myChart2'))
      myChart2.setOption({
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
          text: '磁盘平均读取时间'
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
            name: '磁盘平均读取时间',
            type: 'line',
            data: this.DISKAverageTimeRead,
            smooth: true,
            itemStyle: {
              color: '#69F9C4'
            }
          }
        ]
      })

      // 第4个图
      var myChart3 = this.$echarts.init(document.getElementById('myChart3'))
      myChart3.setOption({
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
          text: '磁盘平均写入时间'
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
            name: '磁盘平均写入时间',
            type: 'line',
            data: this.DISKAverageTimeWrite,
            smooth: true,
            itemStyle: {
              color: '#d48265'
            }
          }
        ]
      })

      // 第5个图
      var myChart4 = this.$echarts.init(document.getElementById('myChart4'))
      myChart4.setOption({
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
          text: '硬盘队列长度'
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
            name: '硬盘队列长度',
            type: 'line',
            data: this.DISCQueueLengh,
            smooth: true,
            itemStyle: {
              color: '#24CBE5'
            }
          }
        ]
      })

      // 第6个图
      var myChart5 = this.$echarts.init(document.getElementById('myChart5'))
      myChart5.setOption({
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
          text: '磁盘时间'
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
            name: '磁盘时间',
            type: 'line',
            data: this.DISKTime,
            smooth: true,
            itemStyle: {
              color: '#64E572'
            }
          }
        ]
      })

      setTimeout(function () {
        window.onresize = function () {
          myChart.resize()
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

<style scoped></style>
