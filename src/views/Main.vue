<template>
  <div>
    <div class="main-top">
      <el-row :gutter="20">
        <el-col
          :xs="24"
          :sm="12"
          :md="12"
          :lg="6"
          :xl="6"
          style="height:150px;margin-bottom:20px;"
          v-for="(item, index) in top"
          :key="index"
        >
          <el-card style="height:100%;">
            <div class="main-top-box">
              <div class="top-icon flex3">
                <i :class="item.icon"></i>
              </div>
              <div class="top-content flex5">
                <div class="top-title">
                  <h2>{{ item.title }}</h2>
                </div>
                <div class="top-data">
                  <h3>{{ item.data }}</h3>
                </div>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col
          :xs="24"
          :sm="12"
          :md="12"
          :lg="6"
          :xl="6"
          style="height:150px;margin-bottom:20px;"
        >
          <el-card style="height:100%;">
            <div class="main-top-box">
              <div class="top-icon flex3">
                <p>{{ ControllerOnLineRate }}</p>
              </div>
              <div class="top-content flex5">
                <div class="top-title">
                  <h2>{{$t('main.topInfo[3]')}}</h2>
                </div>
                <div class="top-data">
                  <h3>{{ top4 }}</h3>
                </div>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <div class="function">
      <el-row :gutter="20">
        <el-col
          :xs="8"
          :sm="6"
          :md="4"
          :lg="3"
          :xl="3"
          style="height:110px;margin-bottom:20px;"
          v-for="(item, index) in funcButton"
          :key="index"
        >
          <div @click="toDetail($event, item)">
            <el-card style="height:100%;">
              <div>
                <div class="func-icon">
                  <i :class="item.icon"></i>
                </div>
                <div class="func-label">
                  <span>{{ item.label }}</span>
                </div>
              </div>
            </el-card>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="device-num">
      <el-card>
        <div slot="header" class="clearfix">
          <span>{{$t('main.deviceCount.title')}}</span>
        </div>
        <div class="device-data flex-row">
          <div v-for="(item, index) in device"
              :key="index" class="data-item" >
              <h3 class="flex" style="text-align:right;">
                  {{ item.label }}
                </h3>
                <h3 class="flex" style="text-align:right;">
                  {{ item.num }}
                </h3>
          </div>
        </div>
      </el-card>
    </div>
    <div class="energy">
      <el-card>
        <div slot="header" class="clearfix">
          <span>能源统计</span>
        </div>
        <div class="energy-content">
          <el-row :gutter="20">
            <el-col :xs="24" :sm="24" :md="12" :lg="16" :xl="16">
              <div class="energy-chart">
                <h4 class="energy-title">电量趋势</h4>
                <div id="myChart"></div>
              </div>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <div class="energy-order">
                <h4 class="energy-title">电量排行榜</h4>
                <div class="order-data">
                  <div
                    class="order-row"
                    v-for="(item, index) in batterOrder"
                    :key="index"
                  >
                    <div class="row-l flex">
                      <div class="num">{{ index + 1 }}</div>
                      {{ item.Name }}
                    </div>
                    <div class="row-r flex">{{ item.Value }} Kwh</div>
                  </div>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      top: [
        {
          icon: 'fa fa-hdd-o',
          title: '设备装机量',
          data: ''
        },
        {
          icon: 'el-icon-coin',
          title: '单体电池总数量',
          data: ''
        },
        {
          icon: 'fa fa-battery',
          title: '装机总电量',
          data: ''
        }
        // {
        //   icon: 'fa fa-battery',
        //   title: '当前总电量',
        //   data: ''
        // }
      ],
      funcButton: [
        {
          icon: 'el-icon-user-solid',
          label: '用户',
          path: '/usersManagement'
        },
        {
          icon: 'fa fa-instagram',
          label: '设备',
          path: '/deviceifo'
        },
        {
          icon: 'fa fa-cubes',
          label: '电池',
          path: '/batterInfo'
        },
        {
          icon: 'fa fa-tasks',
          label: 'UPS',
          path: '/upsInfo'
        },
        {
          icon: 'fa fa-exclamation',
          label: '告警',
          path: '/alarmRealTime'
        },
        {
          icon: 'fa fa-envelope',
          label: '站内信',
          path: '/mailBox'
        },
        {
          icon: 'fa fa-bookmark',
          label: '日志',
          path: '/users'
        },
        {
          icon: 'fa fa-edit (alias)',
          label: '备忘',
          path: '/menmorandumListWaitLoad'
        }
      ],
      device: [
        {
          label: '逆变设备装机数量',
          num: ''
        },
        {
          label: '消防设备装机数量',
          num: ''
        },
        {
          label: '控制器在线数量',
          num: ''
        },
        {
          label: '发电机设备装机数量',
          num: ''
        },
        {
          label: '光伏设备装机数量',
          num: ''
        },
        {
          label: '控制器在线率',
          num: ''
        },
        {
          label: '联动设备装机数量',
          num: ''
        },
        {
          label: '风能设备装机数量',
          num: ''
        },
        {
          label: '用户在线数量',
          num: ''
        }
      ],
      batterOrder: '',
      AutoSystemID: '',
      xAxis: [],
      series: [],
      ControllerOnLineRate: '',
      top4: ''
    }
  },
  created () {
    this.setData()
    this.AutoSystemID = localStorage.getItem('AutoSystemID')
    this.getData()
  },
  methods: {
    setData () {
      this.top.forEach((value, index) => {
        value.title = this.$t('main.topInfo')[index]
      })
      this.funcButton.forEach((val, i) => {
        val.label = this.$t('main.topBar')[i]
      })
      this.device.forEach((val, i) => {
        val.label = this.$t('main.deviceCount.value')[i]
      })
    },
    getData () {
      this.$axios
        .get(`/api/Chart/GetSystemFrontPage?AutoSystemID=${this.AutoSystemID}`)
        .then(res => {
          if (res.data.code === 0) {
            var data = res.data.data
            this.top[0].data = data.EquipmentLoadingCapacity
            this.top[1].data = data.TotalNumberOfSingleBatteries
            this.top[2].data = data.TotalInstalledElectricity + ' Kwh'
            // this.top[3].data = data.CurrentTotalElectricQuantity + ' Kwh'
            this.top4 = data.CurrentTotalElectricQuantity + ' Kwh'
            this.ControllerOnLineRate = data.ControllerOnLineRate
            this.device[0].num = data.InstalledNumberOfInverterEquipment
            this.device[1].num = data.InstalledQuantityOfFireFightingEquipment
            this.device[2].num = data.NumberOfControllersOnline
            this.device[3].num = data.InstalledNumberOfGeneratorEquipment
            this.device[4].num = data.InstalledQuantityOfPhotovoltaicEquipment
            this.device[5].num = data.ControllerOnLineRate
            this.device[6].num = data.InstalledNumberOfLinkageEquipment
            this.device[7].num = data.InstalledWindPowerEquipment
            this.device[8].num = data.NumberOfUsersOnline
            this.xAxis = data.EnergyStatisticsTimes
            this.series = data.EnergyStatisticsValues
            this.batterOrder = data.EnergyRankings
          } else if (res.data.code === 1) {
            this.$message.error(res.data.msg)
          }
          this.getChart()
        })
        .catch(err => {
          console.error(err)
        })
    },
    getChart () {
      var myChart = this.$echarts.init(document.getElementById('myChart'))
      myChart.setOption({
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          type: 'category',
          data: this.xAxis
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: this.series,
            type: 'line',
            smooth: true,
            areaStyle: {
              color: '#D0EAFB'
            }
          }
        ],
        itemStyle: {
          color: '#259CEC'
        },
        grid: {
          left: 80,
          top: 20,
          right: 20,
          bottom: 35
        }
      })

      setTimeout(function () {
        window.onresize = function () {
          myChart.resize()
        }
      }, 200)
    },
    toDetail (event, item) {
      var div = this.$(event.currentTarget)
      div.addClass('animated bounce')
      div.one(
        'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',
        () => {
          div.removeClass('animated bounce')
        }
      )
      setTimeout(() => {
        this.$router.push(item.path)
      }, 1000)
    }
  }
}
</script>

<style scoped>
.main-top-box {
  display: flex;
  height: 100%;
  align-items: center;
}
.top-content {
  text-align: left;
}
.top-content h3 {
  color: #666;
  margin-top: 10px;
}
.top-icon i {
  font-size: 50px;
  color: #409eff;
}
.top-icon p {
  font-size: 24px;
  font-weight: 700;
  color: #409eff;
}
.el-card /deep/ .el-card__body {
  height: 100%;
}
.func-icon {
  margin-bottom: 10px;
}
.func-icon i {
  font-size: 32px;
}
.function .el-row .el-col:nth-child(1) .el-card .func-icon i {
  color: #409eff;
}
.function .el-row .el-col:nth-child(2) .el-card .func-icon i {
  color: rgb(149, 222, 100);
}
.function .el-row .el-col:nth-child(3) .el-card .func-icon i {
  color: rgb(255, 156, 110);
}
.function .el-row .el-col:nth-child(4) .el-card .func-icon i {
  color: rgb(179, 127, 235);
}
.function .el-row .el-col:nth-child(5) .el-card .func-icon i {
  color: rgb(255, 214, 102);
}
.function .el-row .el-col:nth-child(6) .el-card .func-icon i {
  color: rgb(92, 219, 211);
}
.function .el-row .el-col:nth-child(7) .el-card .func-icon i {
  color: rgb(255, 133, 192);
}
.function .el-row .el-col:nth-child(8) .el-card .func-icon i {
  color: rgb(255, 192, 105);
}
.function .el-card:hover {
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
  border-color: #ccc;
  cursor: pointer;
}
.function .el-card:checked {
  scale: 0.8;
}
.main-top .el-card:hover {
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
  border-color: #ccc;
}
.data-item {
  padding-bottom: 10px;
  display: flex;
  justify-content: space-between;
}
/deep/.el-card__header {
  text-align: left;
  font-size: 16px;
}
.device-data {
  flex-wrap: wrap;
  width: calc(100% - 20px);
  margin: 0 10px;
}
.data-item h3 {
  font-weight: 700;
  /* font-size: 18px; */
}
#myChart {
  height: 280px;
}
.energy {
  margin: 20px 0;
}
.energy-title {
  /* font-size: 14px; */
  color: #515a6e;
  text-align: left;
}
.order-data {
  margin-top: 10px;
}
.num {
  width: 24px;
  height: 24px;
  line-height: 24px;
  border-radius: 50%;
  color: rgb(140, 140, 140);
  background-color: rgb(245, 245, 245);
  display: inline-block;
  text-align: center;
  margin-right: 5px;
}
.order-row {
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
}
.row-l {
  text-align: left;
}
.row-r {
  text-align: right;
}
.order-data .order-row:nth-child(1) .num,
.order-data .order-row:nth-child(2) .num,
.order-data .order-row:nth-child(3) .num {
  color: rgb(24, 144, 255);
  background-color: rgb(230, 247, 255);
}
@media screen and (max-width: 576px) {
  .data-item {
    width: 100%;
  }
}
@media screen and (min-width: 576px) {
  .data-item {
    width: 100%;
  }
}
@media screen and (min-width: 768px) {
  .data-item {
    width: 100%;
  }
}
@media screen and (min-width: 992px) {
  .data-item {
    width: 50%;
  }
}
@media screen and (min-width: 1200px) {
  .data-item {
    width: 50%;
  }
}
@media screen and (min-width: 1600px) {
  .data-item {
    width: 33.3%;
  }
}
</style>
