<template>
  <div>
    <el-card class="box-card">
      <el-form inline>
        <el-form-item label="起始时间">
          <el-date-picker
            v-model="value1"
            type="datetime"
            placeholder="选择日期时间"
            :clearable="false"
            @change="setSearchTime"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label=" " label-width="30px">
          <el-radio-group v-model="time" size="mini" @change="setSearchTime">
            <el-radio-button label="1">1小时</el-radio-button>
            <el-radio-button label="6">6小时</el-radio-button>
            <el-radio-button label="12">12小时</el-radio-button>
            <el-radio-button label="24">24小时</el-radio-button>
            <el-radio-button label="48">48小时</el-radio-button>
          </el-radio-group>
        </el-form-item>
      </el-form>
    </el-card>
    <el-row :gutter="20" style="margin-top:20px">
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
    </el-row>
    <el-row :gutter="20" style="margin-top:20px">
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
let moment = require('moment')
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
      Start: '',
      Stop: '',
      value1: '',
      value2: '',
      time: '24'
    }
  },
  created () {
    var today = moment()
      .subtract(0, 'days')
      .format('YYYY-MM-DD')
    today = today + 'T00:00:00'
    this.value1 = new Date(today)
    this.AutoSystemID = localStorage.getItem('AutoSystemID')
    this.setSearchTime()
  },
  methods: {
    getData () {
      this.DISKRead = []
      this.DISKAverageTimeRead = []
      this.DISKAverageTimeWrite = []
      this.DISKWrite = []
      this.DISCQueueLengh = []
      this.DISKTime = []
      this.SamplingTime = []
      this.Start = moment(this.value1).format('YYYY-MM-DDTHH:mm:ss')
      this.Stop = moment(this.value2).format('YYYY-MM-DDTHH:mm:ss')
      var url = '/api/Monitor/GetSystemParamsInfo'
      this.$axios
        .get(url, {
          params: {
            AutoSystemID: this.AutoSystemID,
            Start: this.Start,
            Stop: this.Stop
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
              time = time.replace('T', '\n')
              //   time = time.split('T')[1]
              this[key].push(time)
            } else {
              this[key].push(el[key])
            }
          }
        }
      })
    },

    // 选择时间
    setSearchTime () {
      this.value2 = new Date(this.value1.getTime() + 3600 * 1000 * this.time)
      this.getData()
    },

    getEcharts () {
      // 第一个图
      var myChart = this.$echarts.init(document.getElementById('myChart'))
      myChart.setOption({
        tooltip: {
          trigger: 'axis'
        },
        grid: {
          left: '60',
          right: '80',
          bottom: '50',
          containLabel: true
        },
        dataZoom: [
          {
            show: true,
            realtime: true,
            start: 65,
            end: 85
          },
          {
            type: 'inside',
            realtime: true,
            start: 65,
            end: 85
          }
        ],
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
          left: '60',
          right: '80',
          bottom: '50',
          containLabel: true
        },
        dataZoom: [
          {
            show: true,
            realtime: true,
            start: 65,
            end: 85
          },
          {
            type: 'inside',
            realtime: true,
            start: 65,
            end: 85
          }
        ],
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
          left: '60',
          right: '80',
          bottom: '50',
          containLabel: true
        },
        dataZoom: [
          {
            show: true,
            realtime: true,
            start: 65,
            end: 85
          },
          {
            type: 'inside',
            realtime: true,
            start: 65,
            end: 85
          }
        ],
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
          left: '60',
          right: '80',
          bottom: '50',
          containLabel: true
        },
        dataZoom: [
          {
            show: true,
            realtime: true,
            start: 65,
            end: 85
          },
          {
            type: 'inside',
            realtime: true,
            start: 65,
            end: 85
          }
        ],
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
          left: '60',
          right: '80',
          bottom: '50',
          containLabel: true
        },
        dataZoom: [
          {
            show: true,
            realtime: true,
            start: 65,
            end: 85
          },
          {
            type: 'inside',
            realtime: true,
            start: 65,
            end: 85
          }
        ],
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
          left: '60',
          right: '80',
          bottom: '50',
          containLabel: true
        },
        dataZoom: [
          {
            show: true,
            realtime: true,
            start: 65,
            end: 85
          },
          {
            type: 'inside',
            realtime: true,
            start: 65,
            end: 85
          }
        ],
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

<style scoped>
.el-form-item {
  margin-bottom: 0;
}
</style>
