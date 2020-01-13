<template>
  <div id="main">
    <header class="header">
      <h3>{{ name }}</h3>
    </header>
    <div class="wrapper">
      <div class="container-fluid">
        <div class="row fill-h">
          <div class="col-lg-3">
            <div class="xpanel-wrapper xpanel-wrapper-2">
              <div class="xpanel">
                <div class="content-box">
                  <div class="title">
                    <h2>总电气状态</h2>
                  </div>
                  <div class="data-box">
                    <div class="content">
                      <h3 class="label">电池总电压</h3>
                      <div class="data">
                        <h3>
                          <span style="color:#ffff00">{{
                            data.TotalVoltage
                          }}</span
                          >
                          V
                        </h3>
                      </div>
                    </div>
                    <div class="content">
                      <h3 class="label">电池总电流</h3>
                      <div class="data">
                        <h3>
                          <span style="color:#ffff00">{{
                            data.TotalCurrent
                          }}</span
                          >
                          A
                        </h3>
                      </div>
                    </div>
                  </div>
                  <div class="title">
                    <h2>配置状态</h2>
                  </div>
                  <div class="data-box">
                    <div class="content">
                      <h3 class="label">充电器输出电流</h3>
                      <div class="data">
                        <h3>
                          <span style="color:#ffff00">{{
                            data.ChargeCurrent
                          }}</span
                          >
                          A
                        </h3>
                      </div>
                    </div>
                    <div class="content">
                      <h3 class="label">系统标称总容量</h3>
                      <div class="data">
                        <h3>
                          <span style="color:#ffff00">{{
                            data.NominalTotalCapacity
                          }}</span
                          >
                          A
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="xpanel-wrapper xpanel-wrapper-3"
              style="margin-top:20px;"
            >
              <div class="xpanel">
                <div class="content-box">
                  <div class="title">
                    <h2>充电信息</h2>
                  </div>
                  <div class="data-box">
                    <div class="content">
                      <h3 class="label1">充放电指示</h3>
                      <div class="data1">
                        <h3>
                          <span style="color:#ffff00"
                            >{{ data.ChargeAndDischargeState }}
                          </span>
                          状态
                        </h3>
                      </div>
                    </div>
                    <div class="content">
                      <h3 class="label1">充电容量</h3>
                      <div class="data1">
                        <h3>
                          <span style="color:#ffff00">{{
                            data.ChargeCapacity
                          }}</span
                          >
                          A
                        </h3>
                      </div>
                    </div>
                    <div class="content">
                      <h3 class="labe1">充电结束时间</h3>
                      <div class="data1">
                        <h3>
                          <span style="color:#ffff00">{{
                            data.ChargingEndTime
                          }}</span
                          >
                          秒
                        </h3>
                      </div>
                    </div>
                    <div class="content">
                      <h3 class="label1">放电结束时间</h3>
                      <div class="data1">
                        <h3>
                          <span style="color:#ffff00">{{
                            data.DischargeEndTime
                          }}</span
                          >
                          秒
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="xpanel-wrapper xpanel-wrapper-1">
              <div class="center-box">
                <div class="header-cube">
                  <div class="cube-line"></div>
                </div>
                <div class="center-data">
                  <div class="center-row">
                    <div class="center-row-label">
                      <h3>SOC</h3>
                    </div>
                    <div class="center-row-data">
                      <h3>
                        <span style="color:#ffff00">{{ data.SOC }}</span> %
                      </h3>
                    </div>
                  </div>
                  <div class="center-row">
                    <div class="center-row-label">
                      <h3>SOH</h3>
                    </div>
                    <div class="center-row-data">
                      <h3>
                        <span style="color:#ffff00">{{ data.SOH }}</span> %
                      </h3>
                    </div>
                  </div>
                  <div class="center-row">
                    <div class="center-row-label">
                      <h3>循环次数</h3>
                    </div>
                    <div class="center-row-data">
                      <h3>
                        <span style="color:#ffff00">{{ data.CycleIndex }}</span>
                        次
                      </h3>
                    </div>
                  </div>
                  <div class="center-row">
                    <div class="center-row-label">
                      <h3>电池容量</h3>
                    </div>
                    <div class="center-row-data">
                      <h3>
                        <span style="color:#ffff00">{{
                          data.BatteryCapacity
                        }}</span>
                        Ah
                      </h3>
                    </div>
                  </div>
                </div>
                <div class="center-pic">
                  <svg
                    viewBox="0 0 450 400"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                  >
                    <!-- Created with Method Draw - http://github.com/duopixel/Method-Draw/ -->

                    <g>
                      <title>background</title>
                      <g display="none" id="canvasGrid">
                        <rect
                          fill="url(#gridpattern)"
                          stroke-width="0"
                          y="0"
                          x="0"
                          height="100%"
                          width="100%"
                          id="svg_1"
                        />
                      </g>
                    </g>
                    <g>
                      <image
                        xlink:href="../../assets/img/svgScreen/chart.png"
                        id="svg_2"
                        height="115"
                        width="126"
                        y="45"
                        x="30"
                      />
                      <image
                        xlink:href="../../assets/img/svgScreen/board.png"
                        id="svg_3"
                        height="112"
                        width="128"
                        y="23"
                        x="284"
                      />
                      <line
                        stroke-linecap="undefined"
                        stroke-linejoin="undefined"
                        id="svg_7"
                        y2="354.45313"
                        x2="331.5"
                        y1="354.45313"
                        x1="330.5"
                        fill-opacity="null"
                        stroke-opacity="null"
                        stroke-width="1.5"
                        stroke="#47a2b4"
                        fill="none"
                      />
                      <path
                        id="svg_8"
                        d="m25,259.45313l189,-67"
                        stroke-opacity="null"
                        stroke-linecap="undefined"
                        stroke-linejoin="undefined"
                        stroke-width="1.5"
                        stroke="#47a2b4"
                        fill-opacity="null"
                        fill="none"
                      />
                      <path
                        id="svg_9"
                        d="m214,192.45313l218,70"
                        stroke-opacity="null"
                        stroke-linecap="undefined"
                        stroke-linejoin="undefined"
                        stroke-width="1.5"
                        stroke="#47a2b4"
                        fill-opacity="null"
                        fill="none"
                      />
                      <image
                        stroke="null"
                        xlink:href="../../assets/img/svgScreen/device.png"
                        id="svg_12"
                        height="133"
                        width="100"
                        y="81"
                        x="159"
                      />
                      <path
                        stroke="#7FFFD4"
                        id="svg_25"
                        d="m231.92857,176.73214l66,21"
                        stroke-opacity="null"
                        stroke-linecap="undefined"
                        stroke-linejoin="undefined"
                        stroke-width="3"
                        fill-opacity="null"
                        fill="none"
                        opacity="0.2"
                      />
                      <path
                        stroke="#7FFFD4"
                        id="svg_27"
                        d="m231.92857,176.73214l66,21"
                        stroke-opacity="null"
                        stroke-linecap="undefined"
                        stroke-linejoin="undefined"
                        stroke-width="3"
                        fill-opacity="null"
                        fill="none"
                        v-if="showLine"
                      />
                      <path
                        id="svg_13"
                        d="m25,259l162,118"
                        stroke-opacity="null"
                        stroke-linecap="undefined"
                        stroke-linejoin="undefined"
                        stroke-width="1.5"
                        stroke="#47a2b4"
                        fill-opacity="null"
                        fill="none"
                      />
                      <path
                        id="svg_14"
                        d="m187,377l0,0zl245,-115"
                        stroke-opacity="null"
                        stroke-linecap="undefined"
                        stroke-linejoin="undefined"
                        stroke-width="1.5"
                        stroke="#47a2b4"
                        fill-opacity="null"
                        fill="none"
                      />
                      <image
                        stroke="null"
                        xlink:href="../../assets/img/svgScreen/cubes.png"
                        id="svg_15"
                        height="145"
                        width="119"
                        y="206"
                        x="166"
                      />
                      <image
                        stroke="null"
                        xlink:href="../../assets/img/svgScreen/battery.png"
                        id="svg_16"
                        height="47"
                        width="47"
                        y="98.5"
                        x="187.5"
                      />
                      <path
                        id="svg_22"
                        d="m235.5,199.45313l53,16.99999"
                        stroke-opacity="null"
                        stroke-linecap="undefined"
                        stroke-linejoin="undefined"
                        stroke-width="1.5"
                        stroke="#47a2b4"
                        fill-opacity="null"
                        fill="none"
                      />
                      <image
                        stroke="null"
                        xlink:href="../../assets/img/svgScreen/device.png"
                        id="svg_11"
                        height="133"
                        width="100"
                        y="116"
                        x="276"
                      />
                      <image
                        stroke="null"
                        xlink:href="../../assets/img/svgScreen/cabinet.png"
                        id="svg_18"
                        height="47"
                        width="47"
                        y="141.5"
                        x="303.5"
                      />
                      <path
                        stroke="#fff"
                        id="svg_26"
                        d="m126.49999,199.45313l67.00001,-24.00001"
                        stroke-opacity="null"
                        stroke-linecap="undefined"
                        stroke-linejoin="undefined"
                        stroke-width="3"
                        fill-opacity="null"
                        fill="none"
                        opacity="0.1"
                      />
                      <path
                        stroke="#7FFFD4"
                        id="svg_28"
                        d="m126.49999,199.45313l67.00001,-24.00001"
                        stroke-opacity="null"
                        stroke-linecap="undefined"
                        stroke-linejoin="undefined"
                        stroke-width="3"
                        fill-opacity="null"
                        fill="none"
                        v-if="showLine"
                      />
                      <image
                        stroke="null"
                        xlink:href="../../assets/img/svgScreen/device.png"
                        id="svg_10"
                        height="133"
                        width="100"
                        y="116"
                        x="57"
                      />
                      <image
                        stroke="null"
                        xlink:href="../../assets/img/svgScreen/power.png"
                        id="svg_17"
                        height="35"
                        width="50"
                        y="150.5"
                        x="84.5"
                      />
                    </g>
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-3">
            <div class="xpanel-wrapper xpanel-wrapper-2">
              <div class="xpanel-r">
                <div class="content-box">
                  <div class="title">
                    <h2>装机状态</h2>
                  </div>
                  <div class="data-box">
                    <div class="content">
                      <h3 class="label">安装总簇数</h3>
                      <div class="data">
                        <h3>
                          <span style="color:#ffff00">{{
                            data.ClustersNumber
                          }}</span
                          >
                          簇
                        </h3>
                      </div>
                    </div>
                    <div class="content">
                      <h3 class="label">单体电池数量</h3>
                      <div class="data">
                        <h3>
                          <span style="color:#ffff00">{{
                            data.QuantityOfSingleBattery
                          }}</span
                          >
                          节
                        </h3>
                      </div>
                    </div>
                  </div>
                  <div class="title">
                    <h2>异常信息</h2>
                  </div>
                  <div class="data-box">
                    <div class="content">
                      <h3 class="label">警告次数</h3>
                      <div class="data">
                        <h3>
                          <span style="color:#ffff00">{{
                            data.AlarmNumber
                          }}</span
                          >
                          次
                        </h3>
                      </div>
                    </div>
                    <div class="content">
                      <h3 class="label">停机次数</h3>
                      <div class="data">
                        <h3>
                          <span style="color:#ffff00">{{
                            data.MachineHaltNumber
                          }}</span
                          >
                          次
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="xpanel-wrapper xpanel-wrapper-3"
              style="margin-top:20px;"
            >
              <div class="xpanel-r">
                <div class="content-box">
                  <div class="title">
                    <h2>极值信息</h2>
                  </div>
                  <div class="data-box">
                    <div class="row-box">
                      <div class="row-label"></div>
                      <div class="row-data-box">
                        <div class="row-data">
                          <h3 style="color:#fff">Max</h3>
                        </div>
                        <div class="row-data">
                          <h3 style="color:#fff">Min</h3>
                        </div>
                        <div class="row-data"></div>
                      </div>
                    </div>
                    <div class="row-box">
                      <div class="row-label">
                        <h3>单体电压</h3>
                      </div>
                      <div class="row-data-box">
                        <div class="row-data">
                          <h3>{{ data.MonomerVoltageMax }}</h3>
                        </div>
                        <div class="row-data">
                          <h3>{{ data.MonomerVoltageMin }}</h3>
                        </div>
                        <div class="row-data">
                          <h3 style="color:#fff">mV</h3>
                        </div>
                      </div>
                    </div>
                    <div class="row-box">
                      <div class="row-label">
                        <h3>电池温度</h3>
                      </div>
                      <div class="row-data-box">
                        <div class="row-data">
                          <h3>{{ data.BatteryTemperatureMax }}</h3>
                        </div>
                        <div class="row-data">
                          <h3>{{ data.BatteryTemperatureMin }}</h3>
                        </div>
                        <div class="row-data">
                          <h3 style="color:#fff">℃</h3>
                        </div>
                      </div>
                    </div>
                    <div class="row-box">
                      <div class="row-label">
                        <h3>单体内阻</h3>
                      </div>
                      <div class="row-data-box">
                        <div class="row-data">
                          <h3>{{ data.BatteryResistanceMax }}</h3>
                        </div>
                        <div class="row-data">
                          <h3>{{ data.BatteryResistanceMin }}</h3>
                        </div>
                        <div class="row-data">
                          <h3 style="color:#fff">mΩ</h3>
                        </div>
                      </div>
                    </div>
                    <div class="row-box">
                      <div class="row-label">
                        <h3>正极绝缘</h3>
                      </div>
                      <div class="row-data-box">
                        <div class="row-data">
                          <h3>{{ data.ThePositiveInsulationMax }}</h3>
                        </div>
                        <div class="row-data">
                          <h3>{{ data.ThePositiveInsulationMin }}</h3>
                        </div>
                        <div class="row-data">
                          <h3 style="color:#fff">kΩ</h3>
                        </div>
                      </div>
                    </div>
                    <div class="row-box">
                      <div class="row-label">
                        <h3>负极绝缘</h3>
                      </div>
                      <div class="row-data-box">
                        <div class="row-data">
                          <h3>{{ data.TheCathodeInsulationMax }}</h3>
                        </div>
                        <div class="row-data">
                          <h3>{{ data.TheCathodeInsulationMin }}</h3>
                        </div>
                        <div class="row-data">
                          <h3 style="color:#fff">kΩ</h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import anime from 'animejs/lib/anime.es.js'
export default {
  data () {
    return {
      data: {
        SOC: '',
        SOH: '',
        CycleIndex: '',
        BatteryCapacity: '',
        ClustersNumber: '',
        QuantityOfSingleBattery: '',
        AlarmNumber: '',
        MachineHaltNumber: '',
        MonomerVoltageMax: '',
        MonomerVoltageMin: '',
        BatteryTemperatureMax: '',
        BatteryTemperatureMin: '',
        BatteryResistanceMax: '',
        BatteryResistanceMin: '',
        ThePositiveInsulationMax: '',
        ThePositiveInsulationMin: '',
        TheCathodeInsulationMax: '',
        TheCathodeInsulationMin: '',
        TotalVoltage: '',
        TotalCurrent: '',
        ChargeCurrent: '',
        NominalTotalCapacity: '',
        ChargeAndDischargeState: '',
        ChargeCapacity: '',
        ChargingEndTime: '',
        DischargeEndTime: ''
      },
      showLine: false
    }
  },
  computed: {
    ...mapState('dataV', ['name', 'id'])
  },
  created () {
    this.AutoSystemID = localStorage.getItem('AutoSystemID')
    this.getData()
  },
  mounted () {
    this.batteryAnime()
  },
  methods: {
    getData () {
      var url = '/api/Chart/GetDeviceBatteryInfo'
      this.$axios
        .get(url, {
          params: {
            AutoSystemID: this.AutoSystemID,
            BatteryIDS: this.id,
            DeviceName: this.name
          }
        })
        .then(res => {
          if (res.data.code === 0) {
            this.data = res.data.data
            var state = this.data.ChargeAndDischargeState
            switch (state) {
              case '静置':
                this.showLine = true
                break
              case '未知':
                this.showLine = false
                break
              case '离线':
                this.showLine = false
                break
              case '放电':
                this.showLine = true
                this.$nextTick(() => {
                  this.play('svg_27')
                })
                break
              case '充电':
                this.showLine = true
                this.$nextTick(() => {
                  this.play('svg_28')
                })
            }
            this.$message.success(res.data.msg)
          } else if (res.data.code === 1) {
            this.$message.error(res.data.msg)
          }
        })
        .catch(err => {
          console.error(err)
        })
    },
    play (id) {
      var pathEl = document.getElementById(id)
      console.log(pathEl)
      var offset = anime.setDashoffset(pathEl)
      pathEl.setAttribute('stroke-dashoffset', offset)
      anime({
        targets: pathEl,
        strokeDashoffset: [offset, 0],
        duration: 3000,
        delay: 100,
        loop: true,
        direction: 'normal',
        easing: 'easeInOutSine',
        autoplay: true
      })
    },
    batteryAnime () {
      anime({
        targets: '#svg_16',
        translateY: 5,
        direction: 'alternate',
        loop: true,
        easing: 'cubicBezier(.5, .05, .1, .3)'
      })
    }
  }
}
</script>

<style scoped>
#main {
  /* width:100%; */
  height: calc(100% + 20px);
  min-height: 635px;
  font-family: "microsoft yahei", arial, sans-serif;
  background-color: #0f1c30;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100% 100%;
  overflow-x: hidden;
  overflow-y: auto;
  background-image: url("../../assets/img/bg.png");
  margin: -20px -20px 0 -20px;
  padding: 0;
  position: relative;
}
.header {
  margin: 0 auto;
  width: 100%;
  height: 65px;
  max-width: 1920px;
  background: url("../../assets/img/header.png") center no-repeat;
  background-size: auto 100%;
}
.header h3 {
  margin: 0;
  padding: 0;
  line-height: 65px;
  text-align: center;
  font-size: 24px;
  color: #5dc2fe;
}
.wrapper {
  position: absolute;
  top: 80px;
  bottom: 0;
  left: 0;
  right: 0;
  min-height: 555px;
}
.container-fluid {
  height: 100%;
  min-height: 100%;
  display: flex;
}
.row {
  margin-left: -7px;
  margin-right: -8px;
  display: flex;
  flex-direction: row;
  padding: 0 10px;
}
.col-lg-3 {
  flex: 5;
}
.col-lg-6 {
  flex: 6;
  display: flex;
  justify-content: center;
  flex-direction: column;
}
.row > div {
  padding-left: 7px;
  padding-right: 8px;
}
.xpanel-wrapper {
  padding-bottom: 15px;
  box-sizing: border-box;
}
.xpanel-wrapper-1 {
  height: 100%;
}
.xpanel-wrapper-2 {
  height: calc(55% - 10px);
}
.xpanel-wrapper-3 {
  height: calc(45% - 10px);
}
.xpanel {
  padding: 15px;
  height: 100%;
  min-height: 170px;
  background: url("../../assets/img/border-l.png") center no-repeat;
  background-size: 100% 100%;
  box-sizing: border-box;
}
.xpanel-r {
  padding: 15px;
  height: 100%;
  min-height: 170px;
  background: url("../../assets/img/border-r.png") center no-repeat;
  background-size: 100% 100%;
  box-sizing: border-box;
}
.title {
  height: 30px;
  width: 50%;
  background: url("../../assets/img/title.png") center no-repeat;
  background-size: 100% 100%;
  box-sizing: border-box;
}
.title h2 {
  color: white;
  line-height: 30px;
  font-weight: 500;
}
.content-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  padding: 20px;
  height: 100%;
}
.data-box {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.content {
  /* flex: 3; */
  display: flex;
  justify-content: space-between;
  width: 80%;
  margin-top: 10px;
}

h3 {
  color: white;
  font-size: 20px;
  font-weight: 500;
}
.row-box {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
.row-label {
  flex: 2;
}
.row-data-box {
  flex: 3;
  display: flex;
  justify-content: center;
}
.row-data {
  flex: 1;
}
.row-data h3 {
  color: #ffff00;
}
.center-box {
  height: 100%;
  width: 80%;
  margin-left: 10%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.header-cube {
  flex: 2;
  display: flex;
  align-items: center;
}
.header-cube .cube-line {
  height: 8px;
  width: 70%;
  margin-left: 15%;
  background: url("../../assets/img/cube.png") center no-repeat;
  background-size: 100% 100%;
  box-sizing: border-box;
}
.center-data {
  flex: 10;
  width: 80%;
  /* background-color: #fff; */
  margin-left: 10%;
  display: flex;
  flex-direction: column;
}
.center-row {
  flex: 1;
  margin-top: 20px;
  width: 100%;
  background: url("../../assets/img/label.png") center no-repeat;
  background-size: 100% 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.center-row-label {
  margin-left: 10%;
}
.center-row-data {
  margin-right: 50px;
}
.center-pic {
  flex: 10;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
div {
  box-sizing: border-box;
}
.center-pic {
  /* background: url("../../assets/img/animation.gif") center no-repeat;
  background-size: 100% 100%; */
}
/* tool */
.fill-h {
  height: 100%;
  width: 100%;
  /* min-height: 100%; */
}
.no-margin {
  margin: 0 !important;
}
.no-padding {
  padding: 0 !important;
}

/* scrollbar */
::-webkit-scrollbar {
  width: 0;
  height: 0;
}
::-webkit-scrollbar-track {
  background-color: transparent;
}
::-webkit-scrollbar-thumb {
  border-radius: 5px;
  background-color: rgba(0, 0, 0, 0.3);
}

@media (max-width: 1170px) {
  .row {
    flex-direction: column;
    flex: 1;
  }

  .col-lg-3,
  .col-lg-6 {
    flex: auto;
  }
  .col-lg-6 {
    order: -1;
  }
  h3 {
    font-size: 20px;
  }
}
@media (max-width: 1300px) {
  h3 {
    font-size: 16px;
  }
}
</style>
