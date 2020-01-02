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
          style="width:350px"
        >
          <el-input
            :value="item.value"
            :readonly="true"
            style="width:250px"
          ></el-input>
        </el-form-item>
        <el-form-item label="设备Bank" style="width:400px">
          <el-select v-model="bank" style="width:250px">
            <el-option label="Bank1" value="0"></el-option>
            <el-option label="Bank2" value="1"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="box-card">
      <el-form label-width="160px">
        <el-col :span="6" v-for="(item, index) in dataArr" :key="index">
          <el-form-item :label="item.label" :class="item.warn?'warn':''">
            <el-input v-model="item.value" readonly></el-input>
          </el-form-item>
        </el-col>
      </el-form>
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
      api1: '/api/Chart/GetUPSExtendedStateQuantityQueryCharts',
      data: {},
      bank: '0',
      dataArr: []
    }
  },
  computed: {
    ...mapState('upsdetail', ['paramsESG'])
  },
  mounted () {
    if (this.paramsESG.AutoSystemID && this.paramsESG.SystemID) {
      this.getDetail(this.api, this.paramsESG)
    }

    if (this.paramsESG.AutoSystemID && this.paramsESG.batterID) {
      this.getInfo(this.paramsESG)
    }
  },
  methods: {
    ...mapMutations('upsdetail', ['set_paramsESG']),
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
    getInfo (params) {
      this.$axios
        .get(
          `${this.api1}?AutoSystemID=${params.AutoSystemID}&BatteryIDS=${params.batterID}&BankIndex=${this.bank}`
        )
        .then(res => {
          if (res.data.code === 0) {
            var data = res.data.data
            console.log(data)
            for (const key in data) {
              if (data.hasOwnProperty(key)) {
                switch (key) {
                  case 'aBNORMAL_AMPLITUDE':
                    this.dataArr.push({
                      label: '市电幅值异常',
                      value: data[key] ? '异常' : '正常',
                      warn: data[key]
                    })
                    break
                  case 'mAINS_VOLTAGE':
                    this.dataArr.push({
                      label: '市电欠压',
                      value: data[key] ? '异常' : '正常',
                      warn: data[key]
                    })
                    break
                  case 'aBNORMAL_POWER_FREQUENCY':
                    this.dataArr.push({
                      label: '市电频率异常',
                      value: data[key] ? '异常' : '正常',
                      warn: data[key]
                    })
                    break
                  case 'mAINS_POWER_FREQUENCY_UNDERFREQUENCY':
                    this.dataArr.push({
                      label: '市电频率欠频',
                      value: data[key] ? '异常' : '正常',
                      warn: data[key]
                    })
                    break
                  case 'tHE_MAINS_LACKS':
                    this.dataArr.push({
                      label: '市电缺相',
                      value: data[key] ? '异常' : '正常',
                      warn: data[key]
                    })
                    break
                  case 'tHE_MAINS_VOLTAGE_IS_UNBALANCED':
                    this.dataArr.push({
                      label: '市电电压不平衡',
                      value: data[key] ? '异常' : '正常',
                      warn: data[key]
                    })
                    break
                  case 'aBNORMAL_ELECTRICAL_PHASE_SEQUENCE':
                    this.dataArr.push({
                      label: '市电相序异常',
                      value: data[key] ? '异常' : '正常',
                      warn: data[key]
                    })
                    break
                  case 'mAINS_POWER':
                    this.dataArr.push({
                      label: '市电掉电',
                      value: data[key] ? '异常' : '正常',
                      warn: data[key]
                    })
                    break
                  case 'aBNORMAL_FUSE_OF_POWER_SUPPLY':
                    this.dataArr.push({
                      label: '市电保险丝异常',
                      value: data[key] ? '异常' : '正常',
                      warn: data[key]
                    })
                    break
                  case 'iNPUT_CIRCUIT_ANOMALY':
                    this.dataArr.push({
                      label: '输入回路异常',
                      value: data[key] ? '异常' : '正常',
                      warn: data[key]
                    })
                    break
                  case 'aBNORMAL_CELLS':
                    this.dataArr.push({
                      label: '电池异常',
                      value: data[key] ? '异常' : '正常',
                      warn: data[key]
                    })
                    break
                  case 'bATTERY_OVER_VOLTAGE':
                    this.dataArr.push({
                      label: '电池过压',
                      value: data[key] ? '异常' : '正常',
                      warn: data[key]
                    })
                    break
                  case 'aBNORMAL_BATTERY_CIRCUIT':
                    this.dataArr.push({
                      label: '电池回路异常',
                      value: data[key] ? '异常' : '正常',
                      warn: data[key]
                    })
                    break
                  case 'tHE_BATTERY_POLARITY_IS_REVERSED':
                    this.dataArr.push({
                      label: '电池极性接反',
                      value: data[key] ? '异常' : '正常',
                      warn: data[key]
                    })
                    break
                  case 'bATTERY_DONT_ANSWER':
                    this.dataArr.push({
                      label: '电池未接',
                      value: data[key] ? '异常' : '正常',
                      warn: data[key]
                    })
                    break
                  case 'aBNORMAL_BATTERY_TEMPERATURE':
                    this.dataArr.push({
                      label: '电池温度异常',
                      value: data[key] ? '异常' : '正常',
                      warn: data[key]
                    })
                    break
                  case 'aBNORMAL_BATTERY_FUSE':
                    this.dataArr.push({
                      label: '电池保险丝异常',
                      value: data[key] ? '异常' : '正常',
                      warn: data[key]
                    })
                    break
                  case 'oVERCHARGE_BATTERY_WARNING':
                    this.dataArr.push({
                      label: '电池过充告警',
                      value: data[key] ? '异常' : '正常',
                      warn: data[key]
                    })
                    break
                  case 'bATTERY_OVERCHARGE_PROTECTION':
                    this.dataArr.push({
                      label: '电池过充保护',
                      value: data[key] ? '异常' : '正常',
                      warn: data[key]
                    })
                    break
                  case 'aBNORMAL_BATTERY_CHARGING':
                    this.dataArr.push({
                      label: '电池充电异常',
                      value: data[key] ? '异常' : '正常',
                      warn: data[key]
                    })
                    break
                  case 'bATTERY_IGBT_C_PROTECTION':
                    this.dataArr.push({
                      label: '电池IGBT C级保护',
                      value: data[key] ? '异常' : '正常',
                      warn: data[key]
                    })
                    break
                  case 'tHE_BYPASS_OVERVOLTAGE':
                    this.dataArr.push({
                      label: '旁路过压',
                      value: data[key] ? '异常' : '正常',
                      warn: data[key]
                    })
                    break
                  case 'tHE_BYPASS_UNDERVOLTAGE':
                    this.dataArr.push({
                      label: '旁路欠压',
                      value: data[key] ? '异常' : '正常',
                      warn: data[key]
                    })
                    break
                  case 'bYPASS_FREQUENCY_OVERFREQUENCY':
                    this.dataArr.push({
                      label: '旁路频率过频',
                      value: data[key] ? '异常' : '正常',
                      warn: data[key]
                    })
                    break
                  case 'bYPASS_FREQUENCY_UNDERFREQUENCY':
                    this.dataArr.push({
                      label: '旁路频率欠频',
                      value: data[key] ? '异常' : '正常',
                      warn: data[key]
                    })
                    break
                  case 'tHE_BYPASS_LACKS':
                    this.dataArr.push({
                      label: '旁路缺相',
                      value: data[key] ? '异常' : '正常',
                      warn: data[key]
                    })
                    break
                  case 'aBNORMAL_BYPASS_PHASE_SEQUENCE':
                    this.dataArr.push({
                      label: '旁路相序异常',
                      value: data[key] ? '异常' : '正常',
                      warn: data[key]
                    })
                    break
                  case 'bYPASSED_BY_ELECTRICITY':
                    this.dataArr.push({
                      label: '旁路掉电',
                      value: data[key] ? '异常' : '正常',
                      warn: data[key]
                    })
                    break
                  case 'aBNORMAL_BYPASS_FUSE':
                    this.dataArr.push({
                      label: '旁路保险丝异常',
                      value: data[key] ? '异常' : '正常',
                      warn: data[key]
                    })
                    break
                  case 'bYPASS_OVERLOAD_PROTECTION':
                    this.dataArr.push({
                      label: '旁路过载保护',
                      value: data[key] ? '异常' : '正常',
                      warn: data[key]
                    })
                    break
                  case 'tHE_BYPASS_VOLTAGE_IS_UNBALANCED':
                    this.dataArr.push({
                      label: '旁路电压不平衡',
                      value: data[key] ? '异常' : '正常',
                      warn: data[key]
                    })
                    break
                  case 'aBNORMAL_BYPASS_CIRCUIT':
                    this.dataArr.push({
                      label: '旁路回路异常',
                      value: data[key] ? '异常' : '正常',
                      warn: data[key]
                    })
                    break
                  case 'bYPASS_OVERHEAT_PROTECTION':
                    this.dataArr.push({
                      label: '旁路过温保护',
                      value: data[key] ? '异常' : '正常',
                      warn: data[key]
                    })
                    break
                  case 'aBNORMAL_OUTPUT_CIRCUIT':
                    this.dataArr.push({
                      label: '输出回路异常',
                      value: data[key] ? '异常' : '正常',
                      warn: data[key]
                    })
                    break
                  case 'oUTPUT_FUSE_ABNORMAL':
                    this.dataArr.push({
                      label: '输出保险丝异常',
                      value: data[key] ? '异常' : '正常',
                      warn: data[key]
                    })
                    break
                  case 'oUTPUT_OVERVOLTAGE_PROTECTION':
                    this.dataArr.push({
                      label: '输出过压保护',
                      value: data[key] ? '异常' : '正常',
                      warn: data[key]
                    })
                    break
                  case 'oUTPUT_LOW_VOLTAGE_PROTECTION':
                    this.dataArr.push({
                      label: '输出低压保护',
                      value: data[key] ? '异常' : '正常',
                      warn: data[key]
                    })
                    break
                  case 'iNTERNAL_COMMUNICATION_FAILURE':
                    this.dataArr.push({
                      label: '内部通讯故障',
                      value: data[key] ? '异常' : '正常',
                      warn: data[key]
                    })
                    break
                  case 'pFC_POWER_LIMIT_WARNING':
                    this.dataArr.push({
                      label: 'PFC限功率告警',
                      value: data[key] ? '异常' : '正常',
                      warn: data[key]
                    })
                    break
                  case 'eCO_FAULT':
                    this.dataArr.push({
                      label: 'ECO故障',
                      value: data[key] ? '异常' : '正常',
                      warn: data[key]
                    })
                    break
                  case 'rECTIFIER_PROTECTION':
                    this.dataArr.push({
                      label: '整流器保护',
                      value: data[key] ? '异常' : '正常',
                      warn: data[key]
                    })
                    break
                  case 'iNVERTER_PROTECTION':
                    this.dataArr.push({
                      label: '逆变器保护',
                      value: data[key] ? '异常' : '正常',
                      warn: data[key]
                    })
                    break
                  case 'iNVERTER_OVERVOLTAGE':
                    this.dataArr.push({
                      label: '逆变过压',
                      value: data[key] ? '异常' : '正常',
                      warn: data[key]
                    })
                    break
                  case 'iNVERTER_UNDER_VOLTAGE':
                    this.dataArr.push({
                      label: '逆变欠压',
                      value: data[key] ? '异常' : '正常',
                      warn: data[key]
                    })
                    break
                  case 'iNVERTER_SHORT_CIRCUIT_PROTECTION':
                    this.dataArr.push({
                      label: '逆变短路保护',
                      value: data[key] ? '异常' : '正常',
                      warn: data[key]
                    })
                    break
                  case 'iNVERTER_OVERLOAD_PROTECTION':
                    this.dataArr.push({
                      label: '逆变过载保护',
                      value: data[key] ? '异常' : '正常',
                      warn: data[key]
                    })
                    break
                  case 'iNVERT_OVERTEMPERATURE_PROTECTION':
                    this.dataArr.push({
                      label: '逆变过温保护',
                      value: data[key] ? '异常' : '正常',
                      warn: data[key]
                    })
                    break
                  case 'aBNORMAL_INVERTER_FUSE':
                    this.dataArr.push({
                      label: '逆变保险丝异常',
                      value: data[key] ? '异常' : '正常',
                      warn: data[key]
                    })
                    break
                  case 'sOVEREIGN_FAULT':
                    this.dataArr.push({
                      label: '主权故障',
                      value: data[key] ? '异常' : '正常',
                      warn: data[key]
                    })
                    break
                  case 'pARALLEL_CONNECTION_1_FAULT':
                    this.dataArr.push({
                      label: '并联线1故障',
                      value: data[key] ? '异常' : '正常',
                      warn: data[key]
                    })
                    break
                  case 'pARALLEL_CONNECTION_2_FAULT':
                    this.dataArr.push({
                      label: '并联线2故障',
                      value: data[key] ? '异常' : '正常',
                      warn: data[key]
                    })
                    break
                  case 'pOWER_ON_PARAMETERS_DO_NOT_MATCH':
                    this.dataArr.push({
                      label: '上电参数不匹配',
                      value: data[key] ? '异常' : '正常',
                      warn: data[key]
                    })
                    break
                  case 'sYNCHRONOUS_SOVEREIGN_FAULT':
                    this.dataArr.push({
                      label: '同步主权故障',
                      value: data[key] ? '异常' : '正常',
                      warn: data[key]
                    })
                    break
                  case 'vALID_VALUE_SOVEREIGN_FAULT':
                    this.dataArr.push({
                      label: '有效值主权故障',
                      value: data[key] ? '异常' : '正常',
                      warn: data[key]
                    })
                    break
                  case 'pARALLEL_COMMUNICATION_FAULT':
                    this.dataArr.push({
                      label: '并联通讯故障',
                      value: data[key] ? '异常' : '正常',
                      warn: data[key]
                    })
                    break
                  case 'aBNORMAL_PARALLEL_LINE':
                    this.dataArr.push({
                      label: '并机线异常',
                      value: data[key] ? '异常' : '正常',
                      warn: data[key]
                    })
                    break
                  case 'nO_REDUNDANCY_IN_PARALLEL_OPERATION':
                    this.dataArr.push({
                      label: '并机无冗余',
                      value: data[key] ? '异常' : '正常',
                      warn: data[key]
                    })
                    break
                }
              }
            }
          } else {
            this.dataArr = [
              {
                label: '市电幅值异常',
                value: ''
              },
              {
                label: '市电欠压',
                value: ''
              },
              {
                label: '市电频率异常',
                value: ''
              },
              {
                label: '市电频率欠频',
                value: ''
              },
              {
                label: '市电缺相',
                value: ''
              },
              {
                label: '市电电压不平衡',
                value: ''
              },
              {
                label: '市电相序异常',
                value: ''
              },
              {
                label: '市电掉电',
                value: ''
              },
              {
                label: '市电保险丝异常',
                value: ''
              },
              {
                label: '输入回路异常',
                value: ''
              },
              {
                label: '电池异常',
                value: ''
              },
              {
                label: '电池过压',
                value: ''
              },
              {
                label: '电池回路异常',
                value: ''
              },
              {
                label: '电池极性接反',
                value: ''
              },
              {
                label: '电池未接',
                value: ''
              },
              {
                label: '电池温度异常',
                value: ''
              },
              {
                label: '电池保险丝异常',
                value: ''
              },
              {
                label: '电池过充告警',
                value: ''
              },
              {
                label: '电池过充保护',
                value: ''
              },
              {
                label: '电池充电异常',
                value: ''
              },

              {
                label: '电池IGBT C级保护',
                value: ''
              },
              {
                label: '旁路过压',
                value: ''
              },
              {
                label: '旁路欠压',
                value: ''
              },
              {
                label: '旁路频率过频',
                value: ''
              },
              {
                label: '旁路频率欠频',
                value: ''
              },
              {
                label: '旁路缺相',
                value: ''
              },
              {
                label: '旁路相序异常',
                value: ''
              },
              {
                label: '旁路掉电',
                value: ''
              },
              {
                label: '旁路保险丝异常',
                value: ''
              },
              {
                label: '旁路过载保护',
                value: ''
              },
              {
                label: '旁路电压不平衡',
                value: ''
              },
              {
                label: '旁路回路异常',
                value: ''
              },
              {
                label: '旁路过温保护',
                value: ''
              },
              {
                label: '输出回路异常',
                value: ''
              },
              {
                label: '输出保险丝异常',
                value: ''
              },
              {
                label: '输出过压保护',
                value: ''
              },
              {
                label: '输出低压保护',
                value: ''
              },
              {
                label: '内部通讯故障',
                value: ''
              },
              {
                label: 'PFC限功率告警',
                value: ''
              },
              {
                label: 'ECO故障',
                value: ''
              },
              {
                label: '整流器保护',
                value: ''
              },
              {
                label: '逆变器保护',
                value: ''
              },
              {
                label: '逆变过压',
                value: ''
              },
              {
                label: '逆变欠压',
                value: ''
              },
              {
                label: '逆变短路保护',
                value: ''
              },
              {
                label: '逆变过载保护',
                value: ''
              },
              {
                label: '逆变过温保护',
                value: ''
              },
              {
                label: '逆变保险丝异常',
                value: ''
              },
              {
                label: '主权故障',
                value: ''
              },
              {
                label: '并联线1故障',
                value: ''
              },
              {
                label: '并联线2故障',
                value: ''
              },
              {
                label: '上电参数不匹配',
                value: ''
              },
              {
                label: '同步主权故障',
                value: ''
              },
              {
                label: '有效值主权故障',
                value: ''
              },
              {
                label: '并联通讯故障',
                value: ''
              },
              {
                label: '并机线异常',
                value: ''
              },
              {
                label: '并机无冗余',
                value: ''
              }
            ]
            if (res.data.code === 1) {
              this.$message.error(res.data.msg)
            }
          }
        })
        .catch(err => {
          console.error(err)
        })
    }
  },
  watch: {
    bank: {
      handler (newName, oldName) {
        this.getInfo(this.paramsESG)
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

.warn /deep/ .el-input__inner {
  color: #F56C6C;
}
</style>
