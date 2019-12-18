<template>
  <div>
    <el-form>
      <el-form-item label="预设置电池组1簇数量" label-width="150px" style="width:25%">
        <el-input :value="data.pRE_SET_NUMBER_OF_BATTERY_BANK_1" :readonly="true"></el-input>
      </el-form-item>
      <el-col
        :span="6"
        v-for="(item, index) in data.nUMBER_OF_12_TUFTS_IN_BANK_1"
        :key="index"
        :index="index"
      >
          <el-form-item :label="'第'+(index+1)+'簇电芯数量'" label-width="150px">
            <el-input :value="item" :readonly="true"></el-input>
          </el-form-item>
      </el-col>
    </el-form>
    <Divider />
    <el-form>
      <el-form-item label="预设置电池组2簇数量" label-width="150px" style="width:25%">
        <el-input :value="data.pRE_SET_NUMBER_OF_BATTERY_BANK_2" :readonly="true"></el-input>
      </el-form-item>
      <el-col
        :span="6"
        v-for="(item, index) in data.nUMBER_OF_12_TUFTS_IN_BANK_2"
        :key="index"
        :index="index"
      >
          <el-form-item :label="'第'+(index+1)+'簇电芯数量'" label-width="150px">
            <el-input :value="item" :readonly="true"></el-input>
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
      data: {}
    }
  },
  computed: {
    ...mapState('detail', ['paramsD'])
  },
  mounted () {
    if (this.paramsD.AutoSystemID && this.paramsD.SystemID) {
      this.getEInfo(this.api, this.paramsD)
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
          } else if (res.data.code === 1) {
            this.$message.error(res.data.msg)
          } else if (res.data.code === 3) {
            this.$message.warning(res.data.msg)
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
