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
        <el-form-item label=" " label-width="60px">
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
let moment = require('moment')
export default {
  data () {
    return {
      xAxis: [],
      yAxis: '',
      series: [],
      AutoSystemID: '',
      data: [],
      MEMPoolPaged: [],
      MEMPoolNonPaged: [],
      PageFile: [],
      CONTENTSwitches: [],
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
      this.MEMPoolPaged = []
      this.PageFile = []
      this.CONTENTSwitches = []
      this.MEMPoolNonPaged = []
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
          text: '内存池分页'
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
            name: '内存池分页',
            type: 'line',
            data: this.MEMPoolPaged,
            itemStyle: {
              color: '#7CB5EC'
            },
            smooth: true
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
          text: '内存池未分页'
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
            name: '内存池未分页',
            type: 'line',
            data: this.MEMPoolNonPaged,
            itemStyle: {
              color: '#FF9655'
            },
            smooth: true
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
          text: '页面文件'
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
            name: '页面文件',
            type: 'line',
            data: this.PageFile,
            itemStyle: {
              color: '#69F9C4'
            },
            smooth: true
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
          text: '内容切换'
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
            name: '内容切换',
            type: 'line',
            data: this.CONTENTSwitches,
            itemStyle: {
              color: '#d48265'
            },
            smooth: true
          }
        ]
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

<style scoped>
.el-form-item {
  margin-bottom: 0;
}
</style>
