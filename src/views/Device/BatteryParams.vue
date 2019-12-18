<template>
  <div>
    <el-form>
      <el-form-item label="电池组1簇数量" label-width="150px" style="width:25%">
        <el-input :value="data.bATTERY_PACK_1_CLUSTER" :readonly="true"></el-input>
      </el-form-item>
      <el-col
        :span="6"
        v-for="(item, index) in data.tHE_NUMBER_OF_12_CLUSTERS_OF_CELLS_IN_BATTERY_PACK_1"
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
      <el-form-item label="电池组2簇数量" label-width="150px" style="width:25%">
        <el-input :value="data.bATTERY_PACK_2_CLUSTER" :readonly="true"></el-input>
      </el-form-item>
      <el-col
        :span="6"
        v-for="(item, index) in data.tHE_NUMBER_OF_12_CLUSTERS_OF_CELLS_IN_BATTERY_PACK_2"
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
      api: '/api/Devices/GetDMSRunStateInfo',
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
