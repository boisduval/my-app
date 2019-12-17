<template>
  <div>
    <el-form label-width="120px">
      <el-col :span="6" v-for="(item, index) in EInfo" :key="index">
        <el-form-item :label="item.label">
          <el-input :value="item.value" :readonly="true"></el-input>
        </el-form-item>
      </el-col>
    </el-form>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      EInfo: [],
      api: '/api/Devices/GetDMSStartParaInfo',
      api1: '/api/Devices/GetDMSRunStateInfo',
      data: {}
    }
  },
  computed: {
    ...mapState('detail', ['paramsD'])
  },
  mounted () {
    if (this.paramsD.AutoSystemID && this.paramsD.SystemID) {
      this.getEInfo(this.api, this.paramsD)
      //   this.getEInfo1(this.api1, this.paramsD)
    }
  },
  methods: {
    getEInfo (api, params) {
      this.$axios
        .get(
          `${api}?AutoSystemID=${params.AutoSystemID}&DeviceDIDS=${params.batterID}`
        )
        .then(res => {
          if (res) {
            // this.data = res.data.data;
            this.data = {
              dMS_DEVICE_ID: 'HRESYS-A016-191212-0001',
              dMS_PROJECT_NUMBER: 'A016',
              lOCAL_IP_PROTOCOL_TYPE: 2,
              lOCAL_IP_ACCESS: 1,
              lOCAL_CLIENT_PORT_NUMBER: 1349,
              lOCAL_STATIC_IP_ADDRESS: '127.0.0.1',
              lOCAL_SUBNET_MASK: '255.255.255.0',
              lOCAL_GATEWAY_ADDRESS: '127.0.0.1',
              sERVER_IP_ACCESS_METHOD: 1,
              sERVER_PORT: 5005,
              sERVER_STATIC_IP: '127.0.0.1',
              sERVER_DOMAIN_NAME_ADDRESS: 'www.baidu.com',
              dNS_1_ADDRESS: '114.114.114.114',
              dNS_2_ADDRESS: '29.29.29.119',
              eXTEND_IP_CAPABILITIES_TO_ENABLE: 0,
              eXTENDED_IP_ON: 0,
              eXTENSION_IP_1: '0.0.0.0',
              eXTENSION_PORT_1: 5005,
              eXTENSION_IP_2: '0.0.0.0',
              eXTENSION_PORT_2: 5005,
              eXTENSION_IP_3: '0.0.0.0',
              eXTENSION_PORT_3: 5005,
              eXTENSION_IP_4: '0.0.0.0',
              eXTENSION_PORT_4: 5005,
              dMS_UART_PARA_INFOs: [
                {
                  dMS_UART_BAUD: 19200,
                  dMS_UART_PROTOCOL: {
                    dATA_BITS: 8,
                    sTOP_BITS: 1,
                    pARITY_ENABLE: false,
                    pARITY: 2
                  }
                },
                {
                  dMS_UART_BAUD: 19200,
                  dMS_UART_PROTOCOL: {
                    dATA_BITS: 8,
                    sTOP_BITS: 1,
                    pARITY_ENABLE: false,
                    pARITY: 2
                  }
                },
                {
                  dMS_UART_BAUD: 19200,
                  dMS_UART_PROTOCOL: {
                    dATA_BITS: 8,
                    sTOP_BITS: 1,
                    pARITY_ENABLE: false,
                    pARITY: 2
                  }
                },
                {
                  dMS_UART_BAUD: 19200,
                  dMS_UART_PROTOCOL: {
                    dATA_BITS: 8,
                    sTOP_BITS: 1,
                    pARITY_ENABLE: false,
                    pARITY: 2
                  }
                },
                {
                  dMS_UART_BAUD: 19200,
                  dMS_UART_PROTOCOL: {
                    dATA_BITS: 8,
                    sTOP_BITS: 1,
                    pARITY_ENABLE: false,
                    pARITY: 2
                  }
                },
                {
                  dMS_UART_BAUD: 19200,
                  dMS_UART_PROTOCOL: {
                    dATA_BITS: 8,
                    sTOP_BITS: 1,
                    pARITY_ENABLE: false,
                    pARITY: 2
                  }
                },
                {
                  dMS_UART_BAUD: 19200,
                  dMS_UART_PROTOCOL: {
                    dATA_BITS: 8,
                    sTOP_BITS: 1,
                    pARITY_ENABLE: false,
                    pARITY: 2
                  }
                },
                {
                  dMS_UART_BAUD: 19200,
                  dMS_UART_PROTOCOL: {
                    dATA_BITS: 8,
                    sTOP_BITS: 1,
                    pARITY_ENABLE: false,
                    pARITY: 2
                  }
                }
              ],
              dMS_CAN_BAUD_1: 19200,
              dMS_CAN_BAUD_2: 19200,
              pRESETS_THE_BATTERY_PACK_EQUIPMENT_MOUNT_STATE: true,
              pRE_SET_NUMBER_OF_BATTERY_PACKS: 2,
              pRE_SET_NUMBER_OF_BATTERY_BANK_1: 12,
              nUMBER_OF_12_TUFTS_IN_BANK_1: [
                200,
                200,
                200,
                200,
                200,
                200,
                200,
                200,
                200,
                200,
                200,
                200
              ],
              pRE_SET_NUMBER_OF_BATTERY_BANK_2: 12,
              nUMBER_OF_12_TUFTS_IN_BANK_2: [
                200,
                200,
                200,
                200,
                200,
                200,
                200,
                200,
                200,
                200,
                200,
                200
              ],
              pRESETS_THE_UPS_DEVICE_MOUNT_STATE: false,
              uPS_NUMBER: 0,
              pRESETS_THE_PCS_DEVICE_MOUNT_STATE: false,
              pCS_NUMBER: 0,
              pRESETS_THE_GENERATOR_EQUIPMENT_MOUNT_STATE: false,
              pRESETS_THE_LINKAGE_MODULE_MOUNT_STATE: false,
              pRE_SET_FIRE_SYSTEM_MOUNT_STATUS: false,
              pRESETS_THE_MOUNTING_STATE_OF_PHOTOVOLTAIC_EQUIPMENT: false,
              pRE_SET_THE_WIND_POWER_EQUIPMENT_MOUNT_STATE: false
            }
            this.data['dMS_UART_PARA_INFOs'].forEach((el, i) => {
              var label = 'UART' + (i + 1) + '_BAUD'
              this.EInfo.push({
                label: label,
                value: el['dMS_UART_BAUD']
              })
              this.EInfo.push({
                label: '数据位',
                value: el['dMS_UART_PROTOCOL']['dATA_BITS']
              })
              this.EInfo.push({
                label: '停止位',
                value: el['dMS_UART_PROTOCOL']['sTOP_BITS']
              })
              this.EInfo.push({
                label: '奇偶校验位',
                value: el['dMS_UART_PROTOCOL']['pARITY']
              })
            })
          } else if (res.data.code === 1) {
            this.$message.error(res.data.msg)
          } else if (res.data.code === 3) {
            this.$message.warning(res.data.msg)
          }
        })
        .catch(err => {
          console.error(err)
        })
    },
    getEInfo1 (api, params) {
      this.$axios
        .get(
          `${api}?AutoSystemID=${params.AutoSystemID}&DeviceDIDS=${params.batterID}`
        )
        .then(res => {
          if (res) {
            // var data = res.data.data
            var data = {
              sOFT_RESTART_ENABLE_BIT: false,
              sOFT_RESET_SWITCH: false,
              sYSTEM_OPERATION_TYPE: 0,
              rESTORE_FACTORY_SETTINGS_ENABLED: false,
              rESTORE_FACTORY_SWITCH: false,
              rTC_TIME_SYNCHRONIZATION_SETTINGS: 0,
              wRITE_RTC_TIME: 591831401,
              bMS_UPDATE_UPGRADE_ENABLE: false,
              bMS_GENERAL_CONTROL_UPGRADE_STATUS: 0,
              bMS_SLAVE_CONTROL_UPGRADE_STATUS: [
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0
              ],
              uPS_UPDATE_AND_UPGRADE_ENABLE: false,
              uPS_UPGRADE_STATUS: 0,
              pCS_UPDATE_AND_UPGRADE_ENABLE: false,
              pCS_UPGRADE_STATUS: 0,
              gENERATOR_UPDATE_AND_UPGRADE_ENABLE: false,
              gENERATOR_UPGRADE_STATUS: 0,
              lINKAGE_UPDATE_AND_UPGRADE_ENABLE: false,
              lINKAGE_UPGRADE_STATUS: 0,
              fIRE_PROTECTION_UPDATE_AND_UPGRADE_ENABLE: false,
              fIRE_PROTECTION_UPGRADE_STATUS: 0,
              pV_UPDATE_AND_UPGRADE_ENABLE: false,
              pV_UPGRADE_STATUS: 0,
              wIND_POWER_UPDATE_AND_UPGRADE_ENABLE: false,
              wIND_POWER_UPGRADE_STATUS: 0,
              rEAD_SYSTEM_ALARM_LOG_ENABLE: false,
              rEAD_SYSTEM_ALARM_LOG_SWITCH: 0,
              rEAD_DEBUG_INFORMATION_ENABLE: false,
              rEAD_THE_DEBUG_INFORMATION_SWITCH: 0,
              dMS_HARDWARE_VERSION_NUMBER: '.0.1V2',
              dMS_FIRMWARE_VERSION_NUMBER: '.1.2',
              tHE_MAC_ADDRESS: 'A4-A3-01-00-A1-69',
              rEAD_RTC_TIME: 74566,
              lOCAL_DHCP_ON_STATUS: true,
              dNS_DOMAIN_NAME_OPEN_STATE: true,
              dNS_DOMAIN_NAME_FETCH_STATUS: false,
              eXTEND_IP_ENABLED_STATUS: 0,
              uART_PORT_OPEN_STATE: 0,
              cAN_PORT_OPEN_STATE: 1,
              bATTERY_EQUIPMENT_MOUNT_STATUS: true,
              bATTERY_NUMBER: 12,
              bATTERY_PACK_1_CLUSTER: 200,
              tHE_NUMBER_OF_12_CLUSTERS_OF_CELLS_IN_BATTERY_PACK_1: [
                200,
                200,
                200,
                200,
                200,
                200,
                200,
                200,
                200,
                200,
                200,
                12
              ],
              bATTERY_PACK_2_CLUSTER: 200,
              tHE_NUMBER_OF_12_CLUSTERS_OF_CELLS_IN_BATTERY_PACK_2: [
                200,
                200,
                200,
                200,
                200,
                200,
                200,
                200,
                200,
                200,
                200,
                0
              ],
              pRESETS_THE_UPS_DEVICE_MOUNT_STATE: false,
              uPS_NUMBER: 0,
              pRESETS_THE_PCS_DEVICE_MOUNT_STATE: false,
              pCS_NUMBER: 0,
              pRESETS_THE_GENERATOR_EQUIPMENT_MOUNT_STATE: false,
              pRESETS_THE_LINKAGE_MODULE_MOUNT_STATE: false,
              pRE_SET_FIRE_SYSTEM_MOUNT_STATUS: false,
              pRESETS_THE_MOUNTING_STATE_OF_PHOTOVOLTAIC_EQUIPMENT: false,
              pRE_SET_THE_WIND_POWER_EQUIPMENT_MOUNT_STATE: false
            }
            for (var key in data) {
              switch (key) {
                case 'tHE_MAC_ADDRESS':
                  this.EInfo.push({
                    label: 'MAC地址',
                    value: data[key]
                  })
                  break
                case 'lOCAL_DHCP_ON_STATUS':
                  this.EInfo.push({
                    label: '本地DHCP开启状态',
                    value: data[key]
                  })
                  break
                case 'dNS_DOMAIN_NAME_OPEN_STATE':
                  this.EInfo.push({
                    label: 'DNS域名开启状态',
                    value: data[key]
                  })
                  break
                case 'dNS_DOMAIN_NAME_FETCH_STATUS':
                  this.EInfo.push({
                    label: 'DNS域名获取状态',
                    value: data[key]
                  })
                  break
                case 'eXTEND_IP_ENABLED_STATUS':
                  this.EInfo.push({
                    label: '扩展IP开启状态',
                    value: data[key]
                  })
                  break
              }
            }
          } else if (res.data.code === 1) {
            // this.$message.error(res.data.msg)
          } else if (res.data.code === 3) {
            // this.$message.warning(res.data.msg)
          }
        })
        .catch(err => {
          console.error(err)
        })
    }
  }
}
</script>

<style scoped></style>
