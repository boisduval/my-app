<template>
  <div>
    <el-form class="clearfix">
      <el-col :span="6">
        <el-form-item
          :label="$t('MountedParams.formLabel')[0]"
          label-width="150px"
        >
          <el-input :value="data.uPS_NUMBER" :readonly="true"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item
          :label="$t('MountedParams.formLabel')[1]"
          label-width="150px"
        >
          <el-input :value="data.pCS_NUMBER" :readonly="true"></el-input>
        </el-form-item>
      </el-col>
    </el-form>
    <el-form>
      <el-col
        :span="6"
        v-for="(item, index) in EInfo"
        :key="index"
        :index="index"
      >
        <el-form-item :label="item.label" label-width="150px">
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
      // this.getEInfo(this.api, this.paramsD)
      this.getEInfo1(this.api1, this.paramsD)
    }
  },
  methods: {
    getEInfo1 (api, params) {
      this.$axios
        .get(
          `${api}?AutoSystemID=${params.AutoSystemID}&DeviceDIDS=${params.batterID}`
        )
        .then(res => {
          if (res.data.code === 0) {
            this.data = res.data.data
            for (var key in this.data) {
              switch (key) {
                case 'pRESETS_THE_UPS_DEVICE_MOUNT_STATE':
                  this.EInfo.push({
                    label: this.$t('MountedParams.label')[0],
                    value:
                      this.data[key] === true
                        ? this.$t('MountedParams.state')[0]
                        : this.$t('MountedParams.state')[1]
                  })
                  break
                case 'pRESETS_THE_PCS_DEVICE_MOUNT_STATE':
                  this.EInfo.push({
                    label: this.$t('MountedParams.label')[1],
                    value:
                      this.data[key] === true
                        ? this.$t('MountedParams.state')[0]
                        : this.$t('MountedParams.state')[1]
                  })
                  break
                case 'pRESETS_THE_GENERATOR_EQUIPMENT_MOUNT_STATE':
                  this.EInfo.push({
                    label: this.$t('MountedParams.label')[2],
                    value:
                      this.data[key] === true
                        ? this.$t('MountedParams.state')[0]
                        : this.$t('MountedParams.state')[1]
                  })
                  break
                case 'pRESETS_THE_LINKAGE_MODULE_MOUNT_STATE':
                  this.EInfo.push({
                    label: this.$t('MountedParams.label')[3],
                    value:
                      this.data[key] === true
                        ? this.$t('MountedParams.state')[0]
                        : this.$t('MountedParams.state')[1]
                  })
                  break
                case 'pRE_SET_FIRE_SYSTEM_MOUNT_STATUS':
                  this.EInfo.push({
                    label: this.$t('MountedParams.label')[4],
                    value:
                      this.data[key] === true
                        ? this.$t('MountedParams.state')[0]
                        : this.$t('MountedParams.state')[1]
                  })
                  break
                case 'pRESETS_THE_MOUNTING_STATE_OF_PHOTOVOLTAIC_EQUIPMENT':
                  this.EInfo.push({
                    label: this.$t('MountedParams.label')[5],
                    value:
                      this.data[key] === true
                        ? this.$t('MountedParams.state')[0]
                        : this.$t('MountedParams.state')[1]
                  })
                  break
                case 'pRE_SET_THE_WIND_POWER_EQUIPMENT_MOUNT_STATE':
                  this.EInfo.push({
                    label: this.$t('MountedParams.label')[6],
                    value:
                      this.data[key] === true
                        ? this.$t('MountedParams.state')[0]
                        : this.$t('MountedParams.state')[1]
                  })
                  break
                case 'pRESETS_THE_BATTERY_PACK_EQUIPMENT_MOUNT_STATE':
                  this.EInfo.push({
                    label: this.$t('MountedParams.label')[7],
                    value:
                      this.data[key] === true
                        ? this.$t('MountedParams.state')[0]
                        : this.$t('MountedParams.state')[1]
                  })
                  break
              }
            }
          } else if (res.data.code === 1) {
            // this.$message.error(res.data.msg)
          } else if (res.data.code === 3) {
            // this.$message.warning(res.data.msg)
          }
          if (res.data.code !== 0) {
            this.EInfo.push({
              label: this.$t('MountedParams.label')[0],
              value: ''
            })
            this.EInfo.push({
              label: this.$t('MountedParams.label')[1],
              value: ''
            })
            this.EInfo.push({
              label: this.$t('MountedParams.label')[2],
              value: ''
            })
            this.EInfo.push({
              label: this.$t('MountedParams.label')[3],
              value: ''
            })
            this.EInfo.push({
              label: this.$t('MountedParams.label')[4],
              value: ''
            })
            this.EInfo.push({
              label: this.$t('MountedParams.label')[5],
              value: ''
            })
            this.EInfo.push({
              label: this.$t('MountedParams.label')[6],
              value: ''
            })
            this.EInfo.push({
              label: this.$t('MountedParams.label')[7],
              value: ''
            })
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
