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
              <div class="top-icon">
                <i :class="item.icon"></i>
              </div>
              <div class="top-content">
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
          <el-card style="height:100%;">
            <div @click="$router.push(item.path)">
              <div class="func-icon">
                <i :class="item.icon"></i>
              </div>
              <div class="func-label">
                <span>{{ item.label }}</span>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <div class="device-num">
      <el-card>
        <div slot="header" class="clearfix">
          <span>设备统计</span>
        </div>
        <div class="device-data">
          <el-row :gutter="200">
            <el-col
              :xs="24"
              :sm="24"
              :md="12"
              :lg="8"
              :xl="8"
              v-for="(item, index) in device"
              :key="index"
              style="margin-bottom: 10px;"
            >
              <div class="data-item">
                <h3>
                  {{ item.label }}
                </h3>
                <h3>
                  {{ item.num }}
                </h3>
              </div>
            </el-col>
          </el-row>
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
                  <div class="order-row" v-for="(item, index) in batterOrder" :key="index">
                    <div class="row-l">
                      <div class="num">{{index + 1}}</div>
                      {{item.label}}
                    </div>
                    <div class="row-r">{{item.num}}Kw</div>
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
          icon: 'el-icon-coin',
          title: '设备装机量',
          data: '32'
        },
        {
          icon: 'el-icon-coin',
          title: '单体电池总数量',
          data: '32323'
        },
        {
          icon: 'el-icon-coin',
          title: '装机总电量',
          data: '1000Kw'
        },
        {
          icon: 'el-icon-coin',
          title: '当前总电量',
          data: '825.3Kw'
        }
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
          num: '32'
        },
        {
          label: '消防设备装机数量',
          num: '32'
        },
        {
          label: '控制器在线数量',
          num: '32'
        },
        {
          label: '发电机设备装机数量',
          num: '32'
        },
        {
          label: '光伏设备装机数量',
          num: '32'
        },
        {
          label: '控制器在线率',
          num: '32'
        },
        {
          label: '联动设备装机数量',
          num: '32'
        },
        {
          label: '风能设备装机数量',
          num: '32'
        },
        {
          label: '用户在线数量',
          num: '32'
        }
      ],
      batterOrder: [
        {
          label: '控制器1',
          num: '323'
        },
        {
          label: '控制器1',
          num: '323'
        },
        {
          label: '控制器1',
          num: '323'
        },
        {
          label: '控制器1',
          num: '323'
        },
        {
          label: '控制器1',
          num: '323'
        },
        {
          label: '控制器1',
          num: '323'
        },
        {
          label: '控制器1',
          num: '323'
        },
        {
          label: '控制器1',
          num: '323'
        }
      ]
    }
  },
  created () {
    this.$nextTick(() => {
      this.getChart()
    })
  },
  methods: {
    getChart () {
      var myChart = this.$echarts.init(document.getElementById('myChart'))
      myChart.setOption({
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
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
          left: 50,
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
  flex: 4;
  text-align: left;
}
.top-content h3 {
  color: #666;
  margin-top: 10px;
}
.top-icon {
  flex: 3;
  /* padding-left: 40px; */
}
.top-icon i {
  font-size: 50px;
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
}
.data-item {
  display: flex;
  justify-content: space-between;
}
/deep/.el-card__header {
  text-align: left;
  font-size: 16px;
}
.device-data {
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
.row-l,
.row-r {
  flex: 1;
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
</style>
