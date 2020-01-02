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
      api1: '/api/Chart/GetUPSExtendedAnalogQueryCharts',
      data: {},
      bank: '0',
      dataArr: []
    }
  },
  computed: {
    ...mapState('upsdetail', ['paramsEAG'])
  },
  mounted () {
    if (this.paramsEAG.AutoSystemID && this.paramsEAG.SystemID) {
      this.getDetail(this.api, this.paramsEAG)
    }

    if (this.paramsEAG.AutoSystemID && this.paramsEAG.batterID) {
      this.getInfo(this.paramsEAG)
    }
  },
  methods: {
    ...mapMutations('upsdetail', ['set_paramsEAG']),
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
                  case 'mAINS_VOLTAGE_U_V_LINE':
                    this.dataArr.push({
                      label: '市电U-V线电压',
                      value: data[key] + ''
                    })
                    break
                  case 'mAINS_VOLTAGE_V_W_LINE':
                    this.dataArr.push({
                      label: '市电V-W线电压',
                      value: data[key] + ''
                    })
                    break
                  case 'mAINS_VOLTAGE_W_U_LINE':
                    this.dataArr.push({
                      label: '市电W-U线电压',
                      value: data[key] + ''
                    })
                    break
                  case 'tHE_BYPASS_VOLTAGE_U_V_LINE':
                    this.dataArr.push({
                      label: '旁路U-V线电压',
                      value: data[key] + ''
                    })
                    break
                  case 'tHE_BYPASS_VOLTAGE_V_W_LINE':
                    this.dataArr.push({
                      label: '旁路V-W线电压',
                      value: data[key] + ''
                    })
                    break
                  case 'tHE_BYPASS_VOLTAGE_W_U_LINE':
                    this.dataArr.push({
                      label: '旁路W-U线电压',
                      value: data[key] + ''
                    })
                    break
                  case 'tHE_OUTPUT_VOLTAGE_U_V_LINE':
                    this.dataArr.push({
                      label: '输出U-V线电压',
                      value: data[key] + ''
                    })
                    break
                  case 'tHE_OUTPUT_VOLTAGE_V_W_LINE':
                    this.dataArr.push({
                      label: '输出V-W线电压',
                      value: data[key] + ''
                    })
                    break
                  case 'tHE_OUTPUT_VOLTAGE_W_U_LINE':
                    this.dataArr.push({
                      label: '输出W-U线电压',
                      value: data[key] + ''
                    })
                    break
                  case 'oUTPUT_U_PHASE_REACTIVE_POWER':
                    this.dataArr.push({
                      label: '输出U相无功功率',
                      value: data[key] + ''
                    })
                    break
                  case 'oUTPUT_V_PHASE_REACTIVE_POWER':
                    this.dataArr.push({
                      label: '输出V相无功功率',
                      value: data[key] + ''
                    })
                    break
                  case 'oUTPUT_W_PHASE_REACTIVE_POWER':
                    this.dataArr.push({
                      label: '输出W相无功功率',
                      value: data[key] + ''
                    })
                    break
                  case 'oUTPUT_U_PHASE_POWER_FACTOR':
                    this.dataArr.push({
                      label: '输出U相功率因数',
                      value: data[key] + ''
                    })
                    break
                  case 'oUTPUT_V_PHASE_POWER_FACTOR':
                    this.dataArr.push({
                      label: '输出V相功率因数',
                      value: data[key] + ''
                    })
                    break
                  case 'oUTPUT_W_PHASE_POWER_FACTOR':
                    this.dataArr.push({
                      label: '输出W相功率因数',
                      value: data[key] + ''
                    })
                    break
                  case 'iNPUT_U_LOOKS_AT_THE_POWER':
                    this.dataArr.push({
                      label: '输入U相视在功率',
                      value: data[key] + ''
                    })
                    break
                  case 'iNPUT_V_LOOKS_AT_THE_POWER':
                    this.dataArr.push({
                      label: '输入V相视在功率',
                      value: data[key] + ''
                    })
                    break
                  case 'iNPUT_W_LOOKS_AT_THE_POWER':
                    this.dataArr.push({
                      label: '输入W相视在功率',
                      value: data[key] + ''
                    })
                    break
                  case 'iNPUT_U_PHASE_REACTIVE_POWER':
                    this.dataArr.push({
                      label: '输入U相无功功率',
                      value: data[key] + ''
                    })
                    break
                  case 'iNPUT_V_PHASE_REACTIVE_POWER':
                    this.dataArr.push({
                      label: '输入V相无功功率',
                      value: data[key] + ''
                    })
                    break
                  case 'iNPUT_W_PHASE_REACTIVE_POWER':
                    this.dataArr.push({
                      label: '输入W相无功功率',
                      value: data[key] + ''
                    })
                    break
                  case 'iNPUT_U_PHASE_POWER_FACTOR':
                    this.dataArr.push({
                      label: '输入U相功率因数',
                      value: data[key] + ''
                    })
                    break
                  case 'iNPUT_V_PHASE_POWER_FACTOR':
                    this.dataArr.push({
                      label: '输入V相功率因数',
                      value: data[key] + ''
                    })
                    break
                  case 'iNPUT_W_PHASE_POWER_FACTOR':
                    this.dataArr.push({
                      label: '输入W相功率因数',
                      value: data[key] + ''
                    })
                    break
                  case 'sYSTEM_RUNNING_STATE':
                    switch (data[key]) {
                      case 0:
                        this.dataArr.push({
                          label: '系统运行状态',
                          value: '关机'
                        })
                        break
                      case 1:
                        this.dataArr.push({
                          label: '系统运行状态',
                          value: '旁路'
                        })
                        break
                      case 2:
                        this.dataArr.push({
                          label: '系统运行状态',
                          value: '逆变'
                        })
                        break
                      case 3:
                        this.dataArr.push({
                          label: '系统运行状态',
                          value: '维护旁路'
                        })
                        break
                      case 4:
                        this.dataArr.push({
                          label: '系统运行状态',
                          value: '故障'
                        })
                        break
                      case 5:
                        this.dataArr.push({
                          label: '系统运行状态',
                          value: 'ECO供电'
                        })
                        break
                      case 6:
                        this.dataArr.push({
                          label: '系统运行状态',
                          value: 'EPO'
                        })
                        break
                      case 7:
                        this.dataArr.push({
                          label: '系统运行状态',
                          value: '待机'
                        })
                        break
                      case 8:
                        this.dataArr.push({
                          label: '系统运行状态',
                          value: '调试模式'
                        })
                        break
                    }
                    break
                  case 'hMI_SOFTWARE_VERSION':
                    this.dataArr.push({
                      label: 'HMI软件版本',
                      value: data[key] + ''
                    })
                    break
                  case 'rECTIFIER_SOFTWARE_VERSION':
                    this.dataArr.push({
                      label: '整流器软件版本',
                      value: data[key] + ''
                    })
                    break
                  case 'iNVERTER_SOFTWARE_VERSION':
                    this.dataArr.push({
                      label: '逆变器软件版本',
                      value: data[key] + ''
                    })
                    break
                  case 'hARDWARE_VERSION':
                    this.dataArr.push({
                      label: '硬件版本',
                      value: data[key] + ''
                    })
                    break
                  case 'sYSTEM_VERSION':
                    this.dataArr.push({
                      label: '系统版本',
                      value: data[key] + ''
                    })
                    break
                }
              }
            }
          } else {
            this.dataArr = [
              {
                label: '市电U-V线电压',
                value: ''
              },
              {
                label: '市电V-W线电压',
                value: ''
              },
              {
                label: '市电W-U线电压',
                value: ''
              },
              {
                label: '旁路U-V线电压',
                value: ''
              },
              {
                label: '旁路V-W线电压',
                value: ''
              },
              {
                label: '旁路W-U线电压',
                value: ''
              },
              {
                label: '输出U-V线电压',
                value: ''
              },
              {
                label: '输出V-W线电压',
                value: ''
              },
              {
                label: '输出W-U线电压',
                value: ''
              },
              {
                label: '输出U相无功功率',
                value: ''
              },
              {
                label: '输出V相无功功率',
                value: ''
              },
              {
                label: '输出W相无功功率',
                value: ''
              },
              {
                label: '输出U相功率因数',
                value: ''
              },
              {
                label: '输出V相功率因数',
                value: ''
              },
              {
                label: '输出W相功率因数',
                value: ''
              },
              {
                label: '输入U相视在功率',
                value: ''
              },
              {
                label: '输入V相视在功率',
                value: ''
              },
              {
                label: '输入W相视在功率',
                value: ''
              },
              {
                label: '输入U相无功功率',
                value: ''
              },
              {
                label: '输入V相无功功率',
                value: ''
              },
              {
                label: '输入W相无功功率',
                value: ''
              },
              {
                label: '输入U相功率因数',
                value: ''
              },
              {
                label: '输入V相功率因数',
                value: ''
              },
              {
                label: '输入W相功率因数',
                value: ''
              },
              {
                label: '系统运行状态',
                value: ''
              },
              {
                label: 'HMI软件版本',
                value: ''
              },
              {
                label: '整流器软件版本',
                value: ''
              },
              {
                label: '逆变器软件版本',
                value: ''
              },
              {
                label: '硬件版本',
                value: ''
              },
              {
                label: '系统版本',
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
