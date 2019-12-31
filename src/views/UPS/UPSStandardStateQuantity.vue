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
      api1: '/api/Chart/GetUPSStandardStateQuantityQueryCharts',
      data: {},
      bank: '0',
      dataArr: []
    }
  },
  computed: {
    ...mapState('upsdetail', ['paramsSG'])
  },
  mounted () {
    if (this.paramsSG.AutoSystemID && this.paramsSG.SystemID) {
      this.getDetail(this.api, this.paramsSG)
    }

    if (this.paramsSG.AutoSystemID && this.paramsSG.batterID) {
      this.getInfo(this.paramsSG)
    }
  },
  methods: {
    ...mapMutations('upsdetail', ['set_paramsSG']),
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
                  case 'bATTERY_TO_BE_REPLACED':
                    this.dataArr.push({
                      label: '电池需更换',
                      value: data[key] ? '需更换' : '正常'
                    })
                    break
                  case 'bATTERY_INVERSION':
                    this.dataArr.push({
                      label: '电池逆变状态',
                      value: data[key] ? '逆变' : '非逆变'
                    })
                    break
                  case 'lOW_BATTERY_CAPACITY':
                    this.dataArr.push({
                      label: '电池容量低',
                      value: data[key] ? '异常' : '正常'
                    })
                    break
                  case 'tHE_BATTERY_IS_RUNNING_OUT':
                    this.dataArr.push({
                      label: '电池即将耗尽',
                      value: data[key] ? '异常' : '正常'
                    })
                    break
                  case 'tEMPERATURE_ANOMALY':
                    this.dataArr.push({
                      label: '温度异常',
                      value: data[key] ? '异常' : '正常'
                    })
                    break
                  case 'gRID_ABNORMAL':
                    this.dataArr.push({
                      label: '市电异常',
                      value: data[key] ? '异常' : '正常'
                    })
                    break
                  case 'aBNORMAL_OUTPUT':
                    this.dataArr.push({
                      label: '输出异常',
                      value: data[key] ? '异常' : '正常'
                    })
                    break
                  case 'oUTPUT_OVERLOAD':
                    this.dataArr.push({
                      label: '输出过载',
                      value: data[key] ? '异常' : '正常'
                    })
                    break
                  case 'bYPASS_OUTPUT_STATUS':
                    this.dataArr.push({
                      label: '旁路输出状态',
                      value: data[key] ? '异常' : '正常'
                    })
                    break
                  case 'tHE_BYPASS_ABNORMAL':
                    this.dataArr.push({
                      label: '旁路异常',
                      value: data[key] ? '异常' : '正常'
                    })
                    break
                  case 'cLOSE_THE_OUTPUT':
                    this.dataArr.push({
                      label: '关闭输出',
                      value: data[key] ? '是' : '否'
                    })
                    break
                  case 'rEMOTE_DEVICE_SHUTDOWN':
                    this.dataArr.push({
                      label: '远程设备关机',
                      value: data[key] ? '是' : '否'
                    })
                    break
                  case 'aBNORMAL_CHARGER':
                    this.dataArr.push({
                      label: '充电器异常',
                      value: data[key] ? '异常' : '正常'
                    })
                    break
                  case 'sYSTEM_NO_OUTPUT':
                    this.dataArr.push({
                      label: '系统无输出',
                      value: data[key] ? '异常' : '正常'
                    })
                    break
                  case 'eQUIPMENT_SHUTDOWN':
                    this.dataArr.push({
                      label: '设备关机',
                      value: data[key] ? '异常' : '正常'
                    })
                    break
                  case 'fAN_FAULT':
                    this.dataArr.push({
                      label: '风机故障',
                      value: data[key] ? '异常' : '正常'
                    })
                    break
                  case 'fUSE_FAILURE':
                    this.dataArr.push({
                      label: '保险丝故障',
                      value: data[key] ? '异常' : '正常'
                    })
                    break
                  case 'uPS_GENERAL_FAULT':
                    this.dataArr.push({
                      label: 'UPS通用故障',
                      value: data[key] ? '异常' : '正常'
                    })
                    break
                  case 'uPS_DETECTION_FAILURE':
                    this.dataArr.push({
                      label: 'UPS检测失败',
                      value: data[key] ? '异常' : '正常'
                    })
                    break
                  case 'aBNORMAL_COMMUNICATION':
                    this.dataArr.push({
                      label: '通信异常',
                      value: data[key] ? '异常' : '正常'
                    })
                    break
                  case 'wAITING_FOR_POWER_TO_RESTORE':
                    this.dataArr.push({
                      label: '等待市电恢复',
                      value: data[key] ? '有效' : '无效'
                    })
                    break
                  case 'dELAYED_SHUTDOWN':
                    this.dataArr.push({
                      label: '延时关机中',
                      value: data[key] ? '有效' : '无效'
                    })
                    break
                  case 'pOWER_OFF_IN_5_SECONDS':
                    this.dataArr.push({
                      label: '5秒内即将关机',
                      value: data[key] ? '有效' : '无效'
                    })
                    break
                  case 'bATTERY_TEST':
                    this.dataArr.push({
                      label: '电池测试中',
                      value: data[key] ? '测试中' : '未测试'
                    })
                    break
                  case 'bATTERY_UNDERVOLTAGE_PROTECTION':
                    this.dataArr.push({
                      label: '电池欠压保护',
                      value: data[key] ? '异常' : '正常'
                    })
                    break
                  case 'UPS_TYPE':
                    this.dataArr.push({
                      label: 'UPS类型',
                      value: data[key]
                    })
                    break
                  case 'oN_OFF_STATE':
                    this.dataArr.push({
                      label: '开关机状态',
                      value: data[key] ? '开机' : '关机'
                    })
                    break
                  case 'bUZZER_STATUS':
                    this.dataArr.push({
                      label: '蜂鸣器状态',
                      value: data[key] ? '开启' : '关闭'
                    })
                    break
                  case 'rECTIFIER_ANOMALY':
                    this.dataArr.push({
                      label: '整流器异常',
                      value: data[key] ? '异常' : '正常'
                    })
                    break
                  case 'rECTIFIER_OPERATING_STATE':
                    this.dataArr.push({
                      label: '整流器运行状态',
                      value: data[key] ? '运行中' : '未工作'
                    })
                    break
                  case 'iNVERTER_OPERATING_STATE':
                    this.dataArr.push({
                      label: '逆变器运行状态',
                      value: data[key] ? '运行中' : '未工作'
                    })
                    break
                  case 'sTATIC_BYPASS_SWITCH_STATE':
                    this.dataArr.push({
                      label: '静态旁路开关状态',
                      value: data[key] ? '逆变端' : '旁路端'
                    })
                    break
                  case 'mANUAL_BYPASS_OPEN':
                    this.dataArr.push({
                      label: '手动旁路空开状态',
                      value: data[key] ? '闭合' : '断开'
                    })
                    break
                  case 'oUTPUT_SHORT_CIRCUIT_STOP':
                    this.dataArr.push({
                      label: ' 输出短路停机',
                      value: data[key] ? '异常' : '正常'
                    })
                    break
                  case 'oVERHEATING_DOWNTIME':
                    this.dataArr.push({
                      label: '过热停机',
                      value: data[key] ? '异常' : '正常'
                    })
                    break
                  case 'aBNORMAL_SHUTDOWN_OF_INVERTER_OUTPUT_VOLTAGE':
                    this.dataArr.push({
                      label: '逆变输出电压异常停机',
                      value: data[key] ? '异常' : '正常'
                    })
                    break
                  case 'oVERLOAD_PROTECTION':
                    this.dataArr.push({
                      label: '过载保护',
                      value: data[key] ? '异常' : '正常'
                    })
                    break
                  case 'mANUAL_BYPASS_SHUTDOWN':
                    this.dataArr.push({
                      label: '手动旁路闭合停机',
                      value: data[key] ? '异常' : '正常'
                    })
                    break
                  case 'DC_INPUT_OVER_SHUTDOWN':
                    this.dataArr.push({
                      label: '直流输入过高停机',
                      value: data[key] ? '异常' : '正常'
                    })
                    break
                  case 'ePO':
                    this.dataArr.push({
                      label: 'EPO状态',
                      value: data[key] ? '开启' : '关闭'
                    })
                    break
                }
              }
            }
          } else {
            this.dataArr = [
              {
                label: '电池需更换',
                value: ''
              },
              {
                label: '电池逆变状态',
                value: ''
              },
              {
                label: '电池容量低',
                value: ''
              },
              {
                label: '温度异常',
                value: ''
              },
              {
                label: '市电异常',
                value: ''
              },
              {
                label: '输出异常',
                value: ''
              },
              {
                label: '输出过载',
                value: ''
              },
              {
                label: '旁路输出状态',
                value: ''
              },
              {
                label: '旁路异常',
                value: ''
              },
              {
                label: '关闭输出',
                value: ''
              },
              {
                label: '设备关机',
                value: ''
              },
              {
                label: '充电器异常',
                value: ''
              },
              {
                label: '系统无输出',
                value: ''
              },
              {
                label: '设备关机',
                value: ''
              },
              {
                label: '风机故障',
                value: ''
              },
              {
                label: '保险丝故障',
                value: ''
              },
              {
                label: 'UPS通用故障',
                value: ''
              },
              {
                label: 'UPS检测失败',
                value: ''
              },
              {
                label: '通信异常',
                value: ''
              },
              {
                label: '等待市电恢复',
                value: ''
              },
              {
                label: '延时关机中',
                value: ''
              },
              {
                label: '5秒内即将关机',
                value: ''
              },
              {
                label: '电池测试中',
                value: ''
              },
              {
                label: '电池欠压保护',
                value: ''
              },
              {
                label: 'UPS类型',
                value: ''
              },
              {
                label: '开关机状态',
                value: ''
              },
              {
                label: '蜂鸣器状态',
                value: ''
              },
              {
                label: '整流器异常',
                value: ''
              },
              {
                label: '整流器运行状态',
                value: ''
              },
              {
                label: '逆变器运行状态',
                value: ''
              },
              {
                label: '静态旁路开关状态',
                value: ''
              },
              {
                label: '手动旁路空开状态',
                value: ''
              },
              {
                label: '输出短路停机',
                value: ''
              },
              {
                label: '过热停机',
                value: ''
              },
              {
                label: '逆变输出电压异常停机',
                value: ''
              },
              {
                label: '过载保护',
                value: ''
              },
              {
                label: '手动旁路闭合停机',
                value: ''
              },
              {
                label: '直流输入过高停机',
                value: ''
              },
              {
                label: 'EPO',
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
        this.getInfo(this.paramsSG)
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
