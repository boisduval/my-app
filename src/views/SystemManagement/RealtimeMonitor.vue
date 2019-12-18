<template>
  <div>
    <el-col :span="12">
      <div id="myChart"></div>
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
      THREADCount: []
    }
  },
  created () {
    this.AutoSystemID = localStorage.getItem('AutoSystemID')
    this.getData()
  },
  methods: {
    getData () {
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
            // this[key][index] = el[key]
            this[key].push(el[key])
          }
        }
      })
    },

    getEcharts () {
      let myChart = this.$echarts.init(document.getElementById('myChart'))
      myChart.setOption({
        // xAxis: {
        //   type: 'category',
        //   data: this.SamplingTime
        // },
        // yAxis: {
        //   type: 'value'
        // },
        // series: [
        //   {
        //     type: 'line',
        //     data: this.CONTENTSwitches
        //   }
        // ]
        tooltip: {
          trigger: 'axis',
          position: function (pt) {
            return [pt[0], '10%']
          }
        },
        title: {
          left: 'center',
          text: '大数据量面积图'
        },
        toolbox: {
          feature: {
            dataZoom: {
              yAxisIndex: 'none'
            },
            restore: {},
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
        dataZoom: [{
          type: 'inside',
          start: 0,
          end: 10
        }, {
          start: 0,
          end: 10,
          handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
          handleSize: '80%',
          handleStyle: {
            color: '#fff',
            shadowBlur: 3,
            shadowColor: 'rgba(0, 0, 0, 0.6)',
            shadowOffsetX: 2,
            shadowOffsetY: 2
          }
        }],
        series: [
          {
            name: '模拟数据',
            type: 'line',
            smooth: true,
            symbol: 'none',
            sampling: 'average',
            itemStyle: {
              color: 'rgb(255, 70, 131)'
            },
            areaStyle: {
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgb(255, 158, 68)'
              }, {
                offset: 1,
                color: 'rgb(255, 70, 131)'
              }])
            },
            data: this.CONTENTSwitches
          }
        ]
      })
      setTimeout(function () {
        window.onresize = function () {
          myChart.resize()
        }
      }, 200)
    }
  }
}
</script>

<style scoped>
#myChart {
  height: 400px;
  width: 100%;
}
</style>
