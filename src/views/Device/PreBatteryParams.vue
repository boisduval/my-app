<template>
  <div>
    <el-form style="margin-top:10px">
      <el-form-item
        :label="$t('preBatteryParams.label')[0]"
        label-width="150px"
        style="width:25%"
      >
        <el-input
          :value="data.pRE_SET_NUMBER_OF_BATTERY_PACKS"
          :readonly="true"
        ></el-input>
      </el-form-item>
    </el-form>
    <Divider />
    <el-form>
      <el-form-item
        :label="$t('preBatteryParams.label')[1]"
        label-width="150px"
        style="width:25%"
      >
        <el-input
          :value="data.pRE_SET_NUMBER_OF_BATTERY_BANK_1"
          :readonly="true"
        ></el-input>
      </el-form-item>
      <el-col
        :span="6"
        v-for="(item, index) in data.nUMBER_OF_12_TUFTS_IN_BANK_1"
        :key="index"
        :index="index"
      >
        <el-form-item
          :label="
            $t('preBatteryParams.unit')[0] +
              (index + 1) +
              $t('preBatteryParams.unit')[1]
          "
          label-width="150px"
        >
          <el-input :value="item" :readonly="true"></el-input>
        </el-form-item>
      </el-col>
    </el-form>
    <Divider />
    <el-form>
      <el-form-item
        :label="$t('preBatteryParams.label')[2]"
        label-width="150px"
        style="width:25%"
      >
        <el-input
          :value="data.pRE_SET_NUMBER_OF_BATTERY_BANK_2"
          :readonly="true"
        ></el-input>
      </el-form-item>
      <el-col
        :span="6"
        v-for="(item, index) in data.nUMBER_OF_12_TUFTS_IN_BANK_2"
        :key="index"
        :index="index"
      >
        <el-form-item
          :label="
            $t('preBatteryParams.unit')[0] +
              (index + 1) +
              $t('preBatteryParams.unit')[1]
          "
          label-width="150px"
        >
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
          if (res.data.code === 0) {
            this.data = res.data.data
          } else if (res.data.code === 1) {
            // this.$message.error(res.data.msg)
          } else if (res.data.code === 3) {
            // this.$message.warning(res.data.msg)
          }
          if (res.data.code !== 0) {
            this.data = {
              pRE_SET_NUMBER_OF_BATTERY_PACKS: '',
              pRE_SET_NUMBER_OF_BATTERY_BANK_1: '',
              pRE_SET_NUMBER_OF_BATTERY_BANK_2: '',
              nUMBER_OF_12_TUFTS_IN_BANK_1: [
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                ''
              ],
              nUMBER_OF_12_TUFTS_IN_BANK_2: [
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                ''
              ]
            }
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
