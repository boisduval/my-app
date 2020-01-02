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
          <el-form-item :label="item.label">
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
      api1: '/api/Chart/GetUPSStandardAnalogQueryCharts',
      data: {},
      bank: '0',
      dataArr: []
    }
  },
  computed: {
    ...mapState('upsdetail', ['paramsSAG'])
  },
  mounted () {
    if (this.paramsSAG.AutoSystemID && this.paramsSAG.SystemID) {
      this.getDetail(this.api, this.paramsSAG)
    }

    if (this.paramsSAG.AutoSystemID && this.paramsSAG.batterID) {
      this.getInfo(this.paramsSAG)
    }
  },
  methods: {
    ...mapMutations('upsdetail', ['set_paramsSAG']),
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
            for (const key in data) {
              if (data.hasOwnProperty(key)) {
                switch (key) {
                  case 'bATTERY_PERFORMANCE_STATE':
                    switch (data[key]) {
                      case 0:
                        this.dataArr.push({
                          label: '电池性能状态',
                          value: '未知'
                        })
                        break
                      case 1:
                        this.dataArr.push({
                          label: '电池性能状态',
                          value: '正常'
                        })
                        break
                      case 2:
                        this.dataArr.push({
                          label: '电池性能状态',
                          value: '容量低'
                        })
                        break
                      case 3:
                        this.dataArr.push({
                          label: '电池性能状态',
                          value: '耗尽'
                        })
                        break
                    }
                    break
                  case 'bATTERY_DISCHARGE_DURATION':
                    this.dataArr.push({
                      label: '电池持续放电时间',
                      value: data[key] + ''
                    })
                    break
                  case 'rEMAINING_BATTERY_LIFE':
                    if (data[key] === 0xFFFF) {
                      this.dataArr.push({
                        label: '电池剩余供电时间',
                        value: '计算中'
                      })
                    } else {
                      this.dataArr.push({
                        label: '电池剩余供电时间',
                        value: data[key] + ''
                      })
                    }
                    break
                  case 'rESIDUAL_BATTERY_CAPACITY':
                    this.dataArr.push({
                      label: '电池剩余容量',
                      value: data[key] + ''
                    })
                    break
                  case 'tHE_BATTERY_VOLTAGE':
                    this.dataArr.push({
                      label: '电池电压',
                      value: data[key] + ''
                    })
                    break
                  case 'tHE_BATTERY_CURRENT':
                    this.dataArr.push({
                      label: '电池电流',
                      value: data[key] + ''
                    })
                    break
                  case 'bATTERY_TEMPERATURE':
                    if (data[key] === 0x8000) {
                      this.dataArr.push({
                        label: '电池温度',
                        value: '温度传感器未接'
                      })
                    } else {
                      this.dataArr.push({
                        label: '电池温度',
                        value: data[key] + ''
                      })
                    }
                    break
                  case 'nUMBER_OF_INPUT_PHASE':
                    this.dataArr.push({
                      label: '输入相数',
                      value: data[key] + ''
                    })
                    break
                  case 'aBNORMAL_TIMES_OF_POWER_SUPPLY':
                    this.dataArr.push({
                      label: '市电异常次数',
                      value: data[key] + ''
                    })
                    break
                  case 'eNTER_MAINS_FREQUENCY':
                    this.dataArr.push({
                      label: '输入市电频率',
                      value: data[key] + ''
                    })
                    break
                  case 'iNPUT_U_PHASE_VOLTAGE':
                    this.dataArr.push({
                      label: '输入(U相)电压',
                      value: data[key] + ''
                    })
                    break
                  case 'iNPUT_V_PHASE_VOLTAGE':
                    this.dataArr.push({
                      label: '输入(V相)电压',
                      value: data[key] + ''
                    })
                    break
                  case 'iNPUT_W_PHASE_VOLTAGE':
                    this.dataArr.push({
                      label: '输入(W相)电压',
                      value: data[key] + ''
                    })
                    break
                  case 'iNPUT_U_PHASE_CURRENT':
                    this.dataArr.push({
                      label: '输入(U相)电流',
                      value: data[key] + ''
                    })
                    break
                  case 'iNPUT_V_PHASE_CURRENT':
                    this.dataArr.push({
                      label: '输入(V相)电流',
                      value: data[key] + ''
                    })
                    break
                  case 'iNPUT_W_PHASE_CURRENT':
                    this.dataArr.push({
                      label: '输入(W相)电流',
                      value: data[key] + ''
                    })
                    break
                  case 'iNPUT_U_PHASE_ACTIVE_POWER':
                    this.dataArr.push({
                      label: '输入(U相)有功功率',
                      value: data[key] + ''
                    })
                    break
                  case 'iNPUT_V_PHASE_ACTIVE_POWER':
                    this.dataArr.push({
                      label: '输入(V相)有功功率',
                      value: data[key] + ''
                    })
                    break
                  case 'iNPUT_W_PHASE_ACTIVE_POWER':
                    this.dataArr.push({
                      label: '输入(W相)有功功率',
                      value: data[key] + ''
                    })
                    break
                  case 'oUTPUT_MODE':
                    switch (data[key]) {
                      case 0:
                        this.dataArr.push({
                          label: '输出工作方式',
                          value: '其他输出'
                        })
                        break
                      case 1:
                        this.dataArr.push({
                          label: '输出工作方式',
                          value: '无输出'
                        })
                        break
                      case 2:
                        this.dataArr.push({
                          label: '输出工作方式',
                          value: '市电'
                        })
                        break
                      case 3:
                        this.dataArr.push({
                          label: '输出工作方式',
                          value: '旁路'
                        })
                        break
                      case 4:
                        this.dataArr.push({
                          label: '输出工作方式',
                          value: '电池'
                        })
                        break
                    }
                    break
                  case 'tHE_OUTPUT_FREQUENCY':
                    this.dataArr.push({
                      label: '输出频率',
                      value: data[key] + ''
                    })
                    break
                  case 'tHE_OUTPUT_PHASE_NUMBER':
                    this.dataArr.push({
                      label: '输出相数',
                      value: data[key] + ''
                    })
                    break
                  case 'oUTPUT_U_PHASE_VOLTAGE':
                    this.dataArr.push({
                      label: '输出(U相)电压',
                      value: data[key] + ''
                    })
                    break
                  case 'oUTPUT_V_PHASE_VOLTAGE':
                    this.dataArr.push({
                      label: '输出(V相)电压',
                      value: data[key] + ''
                    })
                    break
                  case 'oUTPUT_W_PHASE_VOLTAGE':
                    this.dataArr.push({
                      label: '输出(W相)电压',
                      value: data[key] + ''
                    })
                    break
                  case 'oUTPUT_U_PHASE_CURRENT':
                    this.dataArr.push({
                      label: '输出(U相)电流',
                      value: data[key] + ''
                    })
                    break
                  case 'oUTPUT_V_PHASE_CURRENT':
                    this.dataArr.push({
                      label: '输出(V相)电流',
                      value: data[key] + ''
                    })
                    break
                  case 'oUTPUT_W_PHASE_CURRENT':
                    this.dataArr.push({
                      label: '输出(W相)电流',
                      value: data[key] + ''
                    })
                    break
                  case 'oUTPUT_U_PHASE_ACTIVE_POWER':
                    this.dataArr.push({
                      label: '输出(U相)有功功率',
                      value: data[key] + ''
                    })
                    break
                  case 'oUTPUT_V_PHASE_ACTIVE_POWER':
                    this.dataArr.push({
                      label: '输出(V相)有功功率',
                      value: data[key] + ''
                    })
                    break
                  case 'oUTPUT_W_PHASE_ACTIVE_POWER':
                    this.dataArr.push({
                      label: '输出(W相)有功功率',
                      value: data[key] + ''
                    })
                    break
                  case 'oUTPUT_U_PHASE_LOAD_RATE':
                    this.dataArr.push({
                      label: '输出(U相)负载率',
                      value: data[key] + ''
                    })
                    break
                  case 'oUTPUT_V_PHASE_LOAD_RATE':
                    this.dataArr.push({
                      label: '输出(V相)负载率',
                      value: data[key] + ''
                    })
                    break
                  case 'oUTPUT_W_PHASE_LOAD_RATE':
                    this.dataArr.push({
                      label: ' 输出(W相)负载率',
                      value: data[key] + ''
                    })
                    break
                  case 'bYPASS_INPUT_FREQUENCY':
                    this.dataArr.push({
                      label: '旁路输入频率',
                      value: data[key] + ''
                    })
                    break
                  case 'tHE_BYPASS_PHASE_NUMBER':
                    this.dataArr.push({
                      label: '旁路相数',
                      value: data[key] + ''
                    })
                    break
                  case 'tHE_BYPASS_U_PHASE_VOLTAGE':
                    this.dataArr.push({
                      label: '旁路(U相)电压',
                      value: data[key] + ''
                    })
                    break
                  case 'tHE_BYPASS_V_PHASE_VOLTAGE':
                    this.dataArr.push({
                      label: '旁路(V相)电压',
                      value: data[key] + ''
                    })
                    break
                  case 'tHE_BYPASS_W_PHASE_VOLTAGE':
                    this.dataArr.push({
                      label: '旁路(W相)电压',
                      value: data[key] + ''
                    })
                    break
                  case 'tHE_BYPASS_U_PHASE_CURRENT':
                    this.dataArr.push({
                      label: '旁路(U相)电流',
                      value: data[key] + ''
                    })
                    break
                  case 'tHE_BYPASS_V_PHASE_CURRENT':
                    this.dataArr.push({
                      label: '旁路(V相)电流',
                      value: data[key] + ''
                    })
                    break
                  case 'tHE_BYPASS_W_PHASE_CURRENT':
                    this.dataArr.push({
                      label: '旁路(W相)电流',
                      value: data[key] + ''
                    })
                    break
                  case 'tHE_BYPASS_U_PHASE_ACTIVE_POWER':
                    this.dataArr.push({
                      label: '旁路(U相)有功功率',
                      value: data[key] + ''
                    })
                    break
                  case 'tHE_BYPASS_V_PHASE_ACTIVE_POWER':
                    this.dataArr.push({
                      label: '旁路(V相)有功功率',
                      value: data[key] + ''
                    })
                    break
                  case 'tHE_BYPASS_W_PHASE_ACTIVE_POWER':
                    this.dataArr.push({
                      label: '旁路(W相)有功功率',
                      value: data[key] + ''
                    })
                    break
                  case 'tHE_TEST_RESULTS':
                    switch (data[key]) {
                      case 0:
                        this.dataArr.push({
                          label: '测试结果',
                          value: '测试通过'
                        })
                        break
                      case 1:
                        this.dataArr.push({
                          label: '测试结果',
                          value: '告警'
                        })
                        break
                      case 2:
                        this.dataArr.push({
                          label: '测试结果',
                          value: '故障'
                        })
                        break
                      case 3:
                        this.dataArr.push({
                          label: '测试结果',
                          value: '中止'
                        })
                        break
                      case 4:
                        this.dataArr.push({
                          label: '测试结果',
                          value: '测试中'
                        })
                        break
                      case 5:
                        this.dataArr.push({
                          label: '测试结果',
                          value: '待测试'
                        })
                        break
                    }
                    break
                  case 'tEST_DURATION':
                    this.dataArr.push({
                      label: '测试持续时间',
                      value: data[key] + ''
                    })
                    break
                  case 'bATTERY_RUNNING_STATE':
                    switch (data[key]) {
                      case 0:
                        this.dataArr.push({
                          label: '电池运行状态',
                          value: '放电'
                        })
                        break
                      case 1:
                        this.dataArr.push({
                          label: '电池运行状态',
                          value: '均充'
                        })
                        break
                      case 2:
                        this.dataArr.push({
                          label: '电池运行状态',
                          value: '浮充'
                        })
                        break
                      case 3:
                        this.dataArr.push({
                          label: '电池运行状态',
                          value: '未知'
                        })
                        break
                    }
                    break
                  case 'tHE_BATTERY_SECTION_NUMBER':
                    this.dataArr.push({
                      label: '电池节数',
                      value: data[key] + ''
                    })
                    break
                  case 'oUTPUT_U_PHASE_APPARENT_POWER':
                    this.dataArr.push({
                      label: '输出(U相)视在功率',
                      value: data[key] + ''
                    })
                    break
                  case 'oUTPUT_V_PHASE_APPARENT_POWER':
                    this.dataArr.push({
                      label: '输出(V相)视在功率',
                      value: data[key] + ''
                    })
                    break
                  case 'oUTPUT_W_PHASE_APPARENT_POWER':
                    this.dataArr.push({
                      label: '输出(W相)视在功率',
                      value: data[key] + ''
                    })
                    break
                  case 'tHE_ENVIRONMENT_TEMPERATURE':
                    if (data[key] === 0x8000) {
                      this.dataArr.push({
                        label: '环境温度',
                        value: '温度传感器未接'
                      })
                    } else {
                      this.dataArr.push({
                        label: '环境温度',
                        value: data[key] + ''
                      })
                    }
                    break
                  case 'wORK_SYSTEM':
                    this.dataArr.push({
                      label: '工作制式',
                      value: data[key] + ''
                    })
                    break
                  case 'rATED_OUTPUT_VOLTAGE':
                    this.dataArr.push({
                      label: '额定输出电压',
                      value: data[key] + ''
                    })
                    break
                  case 'rATED_OUTPUT_CURRENT':
                    this.dataArr.push({
                      label: '额定输出电流',
                      value: data[key] + ''
                    })
                    break
                  case 'rATED_OUTPUT_FREQUENCY':
                    this.dataArr.push({
                      label: '额定输出频率',
                      value: data[key] + ''
                    })
                    break
                  case 'rATED_OUTPUT':
                    this.dataArr.push({
                      label: '额定输出功率',
                      value: data[key] + ''
                    })
                    break
                  case 'rATED_BATTERY_VOLTAGE':
                    this.dataArr.push({
                      label: '额定电池电压',
                      value: data[key] + ''
                    })
                    break
                  case 'rECTIFIER_RATING_INFORMATION':
                    this.dataArr.push({
                      label: '整流器额定信息',
                      value: data[key] + ''
                    })
                    break
                  case 'rATED_FREQUENCY_OF_RECTIFIER':
                    this.dataArr.push({
                      label: '整流器额定频率',
                      value: data[key] + ''
                    })
                    break
                  case 'bYPASS_RATING_INFORMATION':
                    this.dataArr.push({
                      label: '旁路额定信息',
                      value: data[key] + ''
                    })
                    break
                  case 'bYPASS_RATED_FREQUENCY':
                    this.dataArr.push({
                      label: '旁路额定频率',
                      value: data[key] + ''
                    })
                    break
                  case 'mANUFACTURERS':
                    this.dataArr.push({
                      label: '制造商',
                      value: data[key] + ''
                    })
                    break
                  case 'pRODUCT_MODEL':
                    this.dataArr.push({
                      label: '产品型号',
                      value: data[key] + ''
                    })
                    break
                  case 'uPS_SOFTWARE_VERSION':
                    this.dataArr.push({
                      label: 'Ups软件版本',
                      value: data[key] + ''
                    })
                    break
                }
              }
            }
          } else {
            this.dataArr = [
              {
                label: '电池性能状态',
                value: ''
              },
              {
                label: '电池持续放电时间',
                value: ''
              },
              {
                label: '电池剩余供电时间',
                value: ''
              },
              {
                label: '电池剩余容量',
                value: ''
              },
              {
                label: '电池电压',
                value: ''
              },
              {
                label: '电池电流',
                value: ''
              },
              {
                label: '电池温度',
                value: ''
              },
              {
                label: '输入相数',
                value: ''
              },
              {
                label: '市电异常次数',
                value: ''
              },
              {
                label: '输入市电频率',
                value: ''
              },
              {
                label: '输入(U相)电压',
                value: ''
              },
              {
                label: '输入(V相)电压',
                value: ''
              },
              {
                label: '输入(W相)电压',
                value: ''
              },
              {
                label: '输入(U相)电流',
                value: ''
              },
              {
                label: '输入(V相)电流',
                value: ''
              },
              {
                label: '输入(W相)电流',
                value: ''
              },
              {
                label: '输入(U相)有功功率',
                value: ''
              },
              {
                label: '输入(V相)有功功率',
                value: ''
              },
              {
                label: '输入(W相)有功功率',
                value: ''
              },
              {
                label: '输出工作方式',
                value: ''
              },
              {
                label: '输出频率',
                value: ''
              },
              {
                label: '输出相数',
                value: ''
              },
              {
                label: '输出(U相)电压',
                value: ''
              },
              {
                label: '输出(V相)电压',
                value: ''
              },
              {
                label: '输出(W相)电压',
                value: ''
              },
              {
                label: '输出(U相)电流',
                value: ''
              },
              {
                label: '输出(V相)电流',
                value: ''
              },
              {
                label: '输出(W相)电流',
                value: ''
              },
              {
                label: '输出(U相)有功功率',
                value: ''
              },
              {
                label: '输出(V相)有功功率',
                value: ''
              },
              {
                label: '输出(W相)有功功率',
                value: ''
              },
              {
                label: '输出(U相)负载率',
                value: ''
              },
              {
                label: '输出(V相)负载率',
                value: ''
              },
              {
                label: '输出(W相)负载率',
                value: ''
              },
              {
                label: '旁路输入频率',
                value: ''
              },
              {
                label: '旁路相数',
                value: ''
              },
              {
                label: '旁路(U相)电压',
                value: ''
              },
              {
                label: '旁路(V相)电压',
                value: ''
              },
              {
                label: '旁路(W相)电压',
                value: ''
              },
              {
                label: '旁路(U相)电流',
                value: ''
              },
              {
                label: '旁路(V相)电流',
                value: ''
              },
              {
                label: '旁路(W相)电流',
                value: ''
              },
              {
                label: '旁路(U相)有功功率',
                value: ''
              },
              {
                label: '旁路(V相)有功功率',
                value: ''
              },
              {
                label: '旁路(W相)有功功率',
                value: ''
              },
              {
                label: '测试结果',
                value: ''
              },
              {
                label: '测试持续时间',
                value: ''
              },
              {
                label: '电池运行状态',
                value: ''
              },
              {
                label: '电池节数',
                value: ''
              },
              {
                label: '输出(U相)视在功率',
                value: ''
              },
              {
                label: '输出(V相)视在功率',
                value: ''
              },
              {
                label: '输出(W相)视在功率',
                value: ''
              },
              {
                label: '环境温度',
                value: ''
              },
              {
                label: '工作制式',
                value: ''
              },
              {
                label: '额定输出电压',
                value: ''
              },
              {
                label: '额定输出电流',
                value: ''
              },
              {
                label: '额定输出频率',
                value: ''
              },
              {
                label: '额定输出功率',
                value: ''
              },
              {
                label: '额定电池电压',
                value: ''
              },
              {
                label: '整流器额定信息',
                value: ''
              },
              {
                label: '整流器额定频率',
                value: ''
              },
              {
                label: '旁路额定信息',
                value: ''
              },
              {
                label: '旁路额定频率',
                value: ''
              },
              {
                label: '制造商',
                value: ''
              },
              {
                label: '产品型号',
                value: ''
              },
              {
                label: 'Ups软件版本',
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
        this.getInfo(this.paramsSAG)
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
