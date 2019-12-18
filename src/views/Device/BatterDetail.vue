<template>
  <div>
    <el-card class="box-card">
      <!-- 基础信息 -->
      <div slot="header" class="clearfix">
        <span>设备信息</span>
      </div>
      <el-form label-width="80px" :inline="true">
        <el-form-item
          v-for="(item, index) in baseIfo"
          :key="index"
          :label="item.label"
        >
          <el-input :value="item.value" :readonly="true"></el-input>
        </el-form-item>
        <el-form-item label="设备Bank">
          <el-select v-model="bank">
            <el-option label="Bank1" value="0"></el-option>
            <el-option label="Bank2" value="1"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="box-card">
      <!-- 详细信息 -->
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane
          v-for="(item, index) in list"
          :key="index"
          :label="item.label"
          :name="item.name"
        >
        </el-tab-pane>
      </el-tabs>
      <div id="myChart"></div>
    </el-card>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
export default {
  data () {
    return {
      baseIfo: [],
      api: '/api/Devices/GetRegistrationEquipment',
      data: {},
      activeName: 'GetBatterySingleSOCInformationBar3DCharts',
      list: [
        {
          label: 'SOC实时状态',
          name: 'GetBatterySingleSOCInformationBar3DCharts'
        },
        {
          label: 'SOH实时状态',
          name: 'GetBatterySingleSOHInformationBar3DCharts'
        },
        {
          label: '内阻实时状态',
          name: 'GetBatterySingleResistanceInformationBar3DCharts'
        },
        {
          label: '电压实时状态',
          name: 'GetBatterySingleVoltageInformationBar3DCharts'
        },
        {
          label: '温度实时状态',
          name: 'GetBatterySingleTemperatureInformationBar3DCharts'
        }
      ],
      bank: '0',
      xAxis: [],
      yAxis: [],
      seriesData: [],
      infoApi: '/api/Chart/GetBatterySingleSOCInformationBar3DCharts'
    }
  },
  computed: {
    ...mapState('detail', ['paramsB'])
  },
  mounted () {
    if (this.paramsB.AutoSystemID && this.paramsB.SystemID) {
      this.getDetail(this.api, this.paramsB)
    }

    if (this.paramsB.AutoSystemID && this.paramsB.batterID) {
      this.getInfo(this.activeName)
    }
  },
  methods: {
    ...mapMutations('detail', ['set_paramsB']),
    getDetail (api, params) {
      this.$axios
        .get(
          `${api}?AutoSystemID=${params.AutoSystemID}&SystemID=${params.SystemID}`
        )
        .then(res => {
          // console.log(res)
          this.data = res.data.data
          for (var key in this.data) {
            switch (key) {
              case 'DIDS':
                this.baseIfo.push({ label: '设备ID', value: this.data[key] })
                break
              case 'DICCID':
                this.baseIfo.push({
                  label: 'ICCID编号',
                  value: this.data[key]
                })
                break
              case 'DVIN':
                this.baseIfo.push({
                  label: 'VIN编号',
                  value: this.data[key]
                })
                break
              case 'DName':
                this.baseIfo.push({
                  label: '设备名称',
                  value: this.data[key]
                })
                break
            }
          }
        })
        .catch(err => {
          console.error(err)
        })
    },

    getInfo (api) {
      this.$axios
        .get(
          `/api/Chart/${api}?AutoSystemID=${this.paramsB.AutoSystemID}&BatteryIDS=${this.paramsB.batterID}&BankIndex=${this.bank}`
        )
        .then(res => {
          if (res.data.code === 0) {
            this.yAxis = res.data.data.xAxis3D
            this.xAxis = res.data.data.yAxis3D
            this.seriesData = res.data.data.seriesdata
            this.getEcharts()
          } else if (res.data.code === 1) {
            this.$message.error(res.data.msg)
          }
        })
        .catch(err => {
          console.log(err)
        })
    },

    handleClick (tab, event) {
      this.getInfo(tab.name)
    },

    getEcharts () {
      let myChart = this.$echarts.init(document.getElementById('myChart'))
      myChart.setOption({
        tooltip: {},
        visualMap: {
          max: 20,
          inRange: {
            color: [
              '#313695',
              '#4575b4',
              '#74add1',
              '#abd9e9',
              '#e0f3f8',
              '#ffffbf',
              '#fee090',
              '#fdae61',
              '#f46d43',
              '#d73027',
              '#a50026'
            ]
          }
        },
        xAxis3D: {
          type: 'category',
          data: this.xAxis
        },
        yAxis3D: {
          type: 'category',
          data: this.yAxis
        },
        zAxis3D: {
          type: 'value'
        },
        grid3D: {
          boxWidth: 200,
          boxDepth: 80,
          viewControl: {
            // projection: 'orthographic'
          },
          light: {
            main: {
              intensity: 1.2,
              shadow: true
            },
            ambient: {
              intensity: 0.3
            }
          }
        },
        series: [
          {
            type: 'bar3D',
            data: this.seriesData.map(function (item) {
              return {
                value: [item[1], item[0], item[2]]
              }
            }),
            shading: 'lambert',

            label: {
              textStyle: {
                fontSize: 16,
                borderWidth: 1
              }
            },

            emphasis: {
              label: {
                textStyle: {
                  fontSize: 20,
                  color: '#900'
                }
              },
              itemStyle: {
                color: '#900'
              }
            }
          }
        ]
      })
      setTimeout(function () {
        window.onresize = function () {
          myChart.resize()
        }
      }, 200)
    }
  },
  watch: {
    paramsB: {
      handler (newName, oldName) {
        this.data = {}
        this.baseIfo = []
        this.getDetail(this.api, this.paramsB)
        this.getInfo(this.activeName)
      },
      deep: true
    },
    bank: {
      handler (newName, oldName) {
        this.getInfo(this.activeName)
      }
    }
  }
}
</script>

<style scoped>
.box-card {
  line-height: 10px;
  font-size: 15px;
  text-align: left;
  /* margin-bottom: 20px; */
  box-sizing: border-box;
}

.el-card:nth-last-child(1) {
  margin-top: 20px;
}

#myChart {
  height: 600px;
  width: 100%;
}
</style>
