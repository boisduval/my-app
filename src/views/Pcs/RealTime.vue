<template>
  <div>
    <el-card class="box-card">
      <!-- 基础信息 -->
      <div slot="header" class="clearfix">
        <span>{{$t('pcsRealtime.searchTitle')}}</span>
      </div>
      <el-form label-width="80px" :inline="true">
        <el-form-item
          v-for="(item, index) in baseIfo"
          :key="index"
          :label="item.label"
          style="width:350px"
        >
          <el-input
            :value="item.value"
            :readonly="true"
            style="width:250px"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('pcsRealtime.label')[0]" style="width:400px">
          <el-select v-model="bank" style="width:250px">
            <el-option label="1" value="0"></el-option>
            <el-option label="2" value="1"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="box-card">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane :label="$t('pcsRealtime.tabs')[0]" name="deviceInfo">
          <el-form label-width="130px">
            <el-form-item
              :label="item.label"
              v-for="(item, index) in deviceInfo"
              :key="index"
            >
              <el-input v-model="item.value" readonly></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane :label="$t('pcsRealtime.tabs')[1]" name="inState">
          <el-form label-width="130px">
            <el-form-item
              :label="item.label"
              v-for="(item, index) in inState"
              :key="index"
            >
              <el-input v-model="item.value" readonly></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane :label="$t('pcsRealtime.tabs')[2]" name="outState">
          <el-form label-width="130px">
            <el-form-item
              :label="item.label"
              v-for="(item, index) in outState"
              :key="index"
            >
              <el-input v-model="item.value" readonly></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane :label="$t('pcsRealtime.tabs')[3]" name="batteryState">
          <el-form label-width="130px">
            <el-form-item
              :label="item.label"
              v-for="(item, index) in batteryState"
              :key="index"
            >
              <el-input v-model="item.value" readonly></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane :label="$t('pcsRealtime.tabs')[4]" name="incomeStatistics">
          <el-form label-width="130px">
            <el-form-item
              :label="item.label"
              v-for="(item, index) in incomeStatistics"
              :key="index"
            >
              <el-input v-model="item.value" readonly></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane :label="$t('pcsRealtime.tabs')[5]" name="othersStatistics">
          <el-form label-width="130px">
            <el-form-item
              :label="item.label"
              v-for="(item, index) in othersStatistics"
              :key="index"
            >
              <el-input v-model="item.value" readonly></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
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
      api1: '/api/PCSMent/GetPCSRTAnalogQuantityInfo',
      data: {},
      bank: '0',
      dataArr: [],
      activeName: 'deviceInfo',
      deviceInfo: [],
      inState: [],
      outState: [],
      batteryState: [],
      incomeStatistics: [],
      othersStatistics: []
    }
  },
  computed: {
    ...mapState('pcsdetail', ['paramsRT'])
  },
  mounted () {
    if (this.paramsRT.AutoSystemID) {
      this.getDetail(this.api, this.paramsRT)
    }

    if (this.paramsRT.AutoSystemID) {
      this.getInfo(this.paramsRT)
    }
  },
  methods: {
    ...mapMutations('pcsdetail', ['set_paramsRT']),
    getDetail (api, params) {
      this.$axios
        .get(
          `${api}?AutoSystemID=${params.AutoSystemID}&SystemID=${params.SystemID}`
        )
        .then(res => {
          this.data = res.data.data
          for (var key in this.data) {
            switch (key) {
              case 'DICCID':
                this.baseIfo.push({
                  label: this.$t('pcsRealtime.label')[1],
                  value: this.data[key]
                })
                break
              case 'DIDS':
                this.baseIfo.push({ label: this.$t('pcsRealtime.label')[2], value: this.data[key] })
                break
              case 'DName':
                this.baseIfo.push({
                  label: this.$t('pcsRealtime.label')[3],
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
    handleClick (tab, event) {
      console.log(tab, event)
    },
    getInfo (params) {
      this.$axios
        .get(
          `${this.api1}?AutoSystemID=${params.AutoSystemID}&DeviceDIDS=${params.batterID}&DeviceIndex=${this.bank}`
        )
        .then(res => {
          if (res.data.code === 0) {
            this.$message.success(res.data.msg)
            let data = res.data.data
            this.setData()
            this.deviceInfo[0].value = data.mACHINE_MODEL + ''
            this.deviceInfo[1].value = data.dEVICE_HARDWARE_VERSION + ''
            this.deviceInfo[2].value = data.dEVICE_SOFTWARE_VERSION + ''
            this.deviceInfo[3].value = data.tOUCH_SCREEN_VERSION + ''
            this.deviceInfo[4].value = data.tHE_MANUFACTURER_INFORMATION + ''
            this.inState[0].value = data.u_PHASE_GRID_VOLTAGE + ''
            this.inState[1].value = data.v_PHASE_GRID_VOLTAGE + ''
            this.inState[2].value = data.w_PHASE_GRID_VOLTAGE + ''
            this.inState[3].value = data.lINE_FREQUENCY + ''
            this.inState[4].value = data.aC_LEAKAGE_CURRENT + ''
            this.inState[5].value = data.aND_OFF_THE_GRID + ''
            this.outState[0].value = data.oFF_GRID_FREQUENCY + ''
            this.outState[1].value = data.oUTPUT_APPARENT_POWER + ''
            this.outState[2].value = data.oUTPUT_ACTIVE_POWER + ''
            this.outState[3].value = data.oUTPUT_REACTIVE_POWER + ''
            this.outState[4].value = data.u_PHASE_OUTPUT_VOLTAGE + ''
            this.outState[5].value = data.u_PHASE_OUTPUT_CURRENT + ''
            this.outState[6].value = data.tHE_U_PHASE_OUTPUT_IS_APPARENT_POWER + ''
            this.outState[7].value = data.u_PHASE_OUTPUT_ACTIVE_POWER + ''
            this.outState[8].value = data.u_PHASE_VALUES_OF_PF + ''
            this.outState[9].value = data.u_PHASE_LOAD + ''
            this.outState[10].value = data.v_PHASE_OUTPUT_VOLTAGE + ''
            this.outState[11].value = data.v_PHASE_OUTPUT_CURRENT + ''
            this.outState[12].value = data.tHE_V_PHASE_OUTPUT_IS_APPARENT_POWER + ''
            this.outState[13].value = data.v_PHASE_OUTPUT_ACTIVE_POWER + ''
            this.outState[14].value = data.v_PHASE_VALUES_OF_PF + ''
            this.outState[15].value = data.v_PHASE_LOAD + ''
            this.outState[16].value = data.w_PHASE_OUTPUT_VOLTAGE + ''
            this.outState[17].value = data.w_PHASE_OUTPUT_CURRENT + ''
            this.outState[18].value = data.tHE_W_PHASE_OUTPUT_IS_APPARENT_POWER + ''
            this.outState[19].value = data.w_PHASE_OUTPUT_ACTIVE_POWER + ''
            this.outState[20].value = data.w_PHASE_VALUES_OF_PF + ''
            this.outState[21].value = data.w_PHASE_LOAD + ''
            this.batteryState[0].value = data.dIRECT_VOLTAGE + ''
            this.batteryState[1].value = data.dIRECT_CURRENT + ''
            this.batteryState[2].value = data.tOTAL_DC_POWER + ''
            this.batteryState[3].value = data.tOTAL_BATTERY_VOLTAGE + ''
            this.batteryState[4].value = data.tOTAL_BATTERY_CURRENT + ''
            this.batteryState[5].value = data.bATTERY_SOC + ''
            this.batteryState[6].value = data.bATTERY_SOH + ''
            this.incomeStatistics[0].value = data.tOTAL_LOAD + ''
            this.incomeStatistics[1].value = data.dAILY_CHARGE + ''
            this.incomeStatistics[2].value = data.dAY_DISCHARGE + ''
            this.incomeStatistics[3].value = data.oN_THE_DAY_OF_GAINS + ''
            this.incomeStatistics[4].value = data.tHE_TOTAL_AMOUNT_OF_CHARGE + ''
            this.incomeStatistics[5].value = data.tHE_TOTAL_DISCHARGE + ''
            this.incomeStatistics[6].value = data.tOTAL_REVENUE + ''
            this.othersStatistics[0].value = data.iNTERNAL_TEMPERATURE + ''
            this.othersStatistics[1].value = data.rADIATOR_TEMPERATURE + ''
            this.othersStatistics[2].value = data.tHE_CURRENT_PRICE + ''
            this.othersStatistics[3].value = data.aVAILABLE_POWER + ''
            this.othersStatistics[4].value = data.rEMOTE_CONTROL_STATUS + ''
            this.othersStatistics[5].value = data.cHARGE_LIMITING_CURRENT + ''
            this.othersStatistics[6].value = data.dISCHARGE_LIMITING_CURRENT + ''
            this.othersStatistics[7].value = data.lIMITED_CHARGE_VOLTAGE + ''
            this.othersStatistics[8].value = data.dISCHARGE_LIMITING_VOLTAGE + ''
            this.othersStatistics[9].value = data.iT_TAKES_ELECTRICITY_TO_CHARGE + ''
            this.othersStatistics[10].value = data.dISCHARGE_ENERGY + ''
          } else {
            this.setData()
          }
        })
        .catch(err => {
          console.error(err)
        })
    },
    setData () {
      // eslint-disable-next-line no-unused-expressions
      this.deviceInfo = [
        {
          label: this.$t('pcsRealtime.list1')[0],
          value: ''
        },
        {
          label: this.$t('pcsRealtime.list1')[1],
          value: ''
        },
        {
          label: this.$t('pcsRealtime.list1')[2],
          value: ''
        },
        {
          label: this.$t('pcsRealtime.list1')[3],
          value: ''
        },
        {
          label: this.$t('pcsRealtime.list1')[4],
          value: ''
        }
      ]
      this.inState = [
        {
          label: this.$t('pcsRealtime.list2')[0],
          value: ''
        },
        {
          label: this.$t('pcsRealtime.list2')[1],
          value: ''
        },
        {
          label: this.$t('pcsRealtime.list2')[2],
          value: ''
        },
        {
          label: this.$t('pcsRealtime.list2')[3],
          value: ''
        },
        {
          label: this.$t('pcsRealtime.list2')[4],
          value: ''
        },
        {
          label: this.$t('pcsRealtime.list2')[5],
          value: ''
        }
      ]
      this.outState = [
        {
          label: this.$t('pcsRealtime.list3')[0],
          value: ''
        },
        {
          label: this.$t('pcsRealtime.list3')[1],
          value: ''
        },
        {
          label: this.$t('pcsRealtime.list3')[2],
          value: ''
        },
        {
          label: this.$t('pcsRealtime.list3')[3],
          value: ''
        },
        {
          label: this.$t('pcsRealtime.list3')[4],
          value: ''
        },
        {
          label: this.$t('pcsRealtime.list3')[5],
          value: ''
        },
        {
          label: this.$t('pcsRealtime.list3')[6],
          value: ''
        },
        {
          label: this.$t('pcsRealtime.list3')[7],
          value: ''
        },
        {
          label: this.$t('pcsRealtime.list3')[8],
          value: ''
        },
        {
          label: this.$t('pcsRealtime.list3')[9],
          value: ''
        },
        {
          label: this.$t('pcsRealtime.list3')[10],
          value: ''
        },
        {
          label: this.$t('pcsRealtime.list3')[11],
          value: ''
        },
        {
          label: this.$t('pcsRealtime.list3')[12],
          value: ''
        },
        {
          label: this.$t('pcsRealtime.list3')[13],
          value: ''
        },
        {
          label: this.$t('pcsRealtime.list3')[14],
          value: ''
        },
        {
          label: this.$t('pcsRealtime.list3')[15],
          value: ''
        },
        {
          label: this.$t('pcsRealtime.list3')[16],
          value: ''
        },
        {
          label: this.$t('pcsRealtime.list3')[17],
          value: ''
        },
        {
          label: this.$t('pcsRealtime.list3')[18],
          value: ''
        },
        {
          label: this.$t('pcsRealtime.list3')[19],
          value: ''
        },
        {
          label: this.$t('pcsRealtime.list3')[20],
          value: ''
        },
        {
          label: this.$t('pcsRealtime.list3')[21],
          value: ''
        }
      ]
      this.batteryState = [
        {
          label: this.$t('pcsRealtime.list4')[0],
          value: ''
        },
        {
          label: this.$t('pcsRealtime.list4')[1],
          value: ''
        },
        {
          label: this.$t('pcsRealtime.list4')[2],
          value: ''
        },
        {
          label: this.$t('pcsRealtime.list4')[3],
          value: ''
        },
        {
          label: this.$t('pcsRealtime.list4')[4],
          value: ''
        },
        {
          label: this.$t('pcsRealtime.list4')[5],
          value: ''
        },
        {
          label: this.$t('pcsRealtime.list4')[6],
          value: ''
        }
      ]
      this.incomeStatistics = [
        {
          label: this.$t('pcsRealtime.list5')[0],
          value: ''
        },
        {
          label: this.$t('pcsRealtime.list5')[1],
          value: ''
        },
        {
          label: this.$t('pcsRealtime.list5')[2],
          value: ''
        },
        {
          label: this.$t('pcsRealtime.list5')[3],
          value: ''
        },
        {
          label: this.$t('pcsRealtime.list5')[4],
          value: ''
        },
        {
          label: this.$t('pcsRealtime.list5')[5],
          value: ''
        },
        {
          label: this.$t('pcsRealtime.list5')[6],
          value: ''
        }
      ]
      this.othersStatistics = [
        {
          label: this.$t('pcsRealtime.list6')[0],
          value: ''
        },
        {
          label: this.$t('pcsRealtime.list6')[1],
          value: ''
        },
        {
          label: this.$t('pcsRealtime.list6')[2],
          value: ''
        },
        {
          label: this.$t('pcsRealtime.list6')[3],
          value: ''
        },
        {
          label: this.$t('pcsRealtime.list6')[4],
          value: ''
        },
        {
          label: this.$t('pcsRealtime.list6')[5],
          value: ''
        },
        {
          label: this.$t('pcsRealtime.list6')[6],
          value: ''
        },
        {
          label: this.$t('pcsRealtime.list6')[7],
          value: ''
        },
        {
          label: this.$t('pcsRealtime.list6')[8],
          value: ''
        },
        {
          label: this.$t('pcsRealtime.list6')[9],
          value: ''
        },
        {
          label: this.$t('pcsRealtime.list6')[10],
          value: ''
        }
      ]
    }
  },
  watch: {
    bank: {
      handler (newName, oldName) {
        this.getInfo(this.paramsEAG)
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
</style>
