<template>
  <div>
    <el-form style="margin-top:10px">
      <el-form-item
        :label="$t('batteryParams.formLabel')[0]"
        label-width="150px"
        style="width:25%"
      >
        <el-input :value="data.bATTERY_NUMBER" :readonly="true"></el-input>
      </el-form-item>
    </el-form>
    <Divider />
    <el-form>
      <el-form-item
        :label="$t('batteryParams.formLabel')[1]"
        label-width="150px"
        style="width:25%"
      >
        <el-input
          :value="data.bATTERY_PACK_1_CLUSTER"
          :readonly="true"
        ></el-input>
      </el-form-item>
      <el-col
        :span="6"
        v-for="(item,
        index) in data.tHE_NUMBER_OF_12_CLUSTERS_OF_CELLS_IN_BATTERY_PACK_1"
        :key="index"
        :index="index"
      >
        <el-form-item
          :label="
            $t('batteryParams.unit')[0] +
              (index + 1) +
              $t('batteryParams.unit')[1]
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
        :label="$t('batteryParams.formLabel')[2]"
        label-width="150px"
        style="width:25%"
      >
        <el-input
          :value="data.bATTERY_PACK_2_CLUSTER"
          :readonly="true"
        ></el-input>
      </el-form-item>
      <el-col
        :span="6"
        v-for="(item,
        index) in data.tHE_NUMBER_OF_12_CLUSTERS_OF_CELLS_IN_BATTERY_PACK_2"
        :key="index"
        :index="index"
      >
        <el-form-item
          :label="
            $t('batteryParams.unit')[0] +
              (index + 1) +
              $t('batteryParams.unit')[1]
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
          if (res.data.code === 0) {
            this.data = res.data.data
          } else if (res.data.code === 1) {
            // this.$message.error(res.data.msg)
          } else if (res.data.code === 3) {
            // this.$message.warning(res.data.msg)
          }
          if (res.data.code !== 0) {
            this.data = {
              bATTERY_NUMBER: '',
              bATTERY_PACK_1_CLUSTER: '',
              bATTERY_PACK_2_CLUSTER: '',
              tHE_NUMBER_OF_12_CLUSTERS_OF_CELLS_IN_BATTERY_PACK_1: new Array([12]).fill(''),
              tHE_NUMBER_OF_12_CLUSTERS_OF_CELLS_IN_BATTERY_PACK_2: new Array([12]).fill('')
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
