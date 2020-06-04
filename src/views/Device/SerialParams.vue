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
            this.data['dMS_UART_PARA_INFOs'].forEach((el, i) => {
              var label = 'UART' + (i + 1) + '_BAUD'
              this.EInfo.push({
                label: label,
                value: el['dMS_UART_BAUD']
              })
              this.EInfo.push({
                label: this.$t('serialParams.label')[0],
                value: el['dMS_UART_PROTOCOL']['dATA_BITS']
              })
              this.EInfo.push({
                label: this.$t('serialParams.label')[1],
                value: el['dMS_UART_PROTOCOL']['sTOP_BITS']
              })
              this.EInfo.push({
                label: this.$t('serialParams.label')[2],
                value: el['dMS_UART_PROTOCOL']['pARITY']
              })
            })
          } else if (res.data.code === 1) {
            // this.$message.error(res.data.msg)
          } else if (res.data.code === 3) {
            // this.$message.warning(res.data.msg)
          }
          if (res.data.code !== 0) {
            for (let i = 0; i < 8; i++) {
              var label = 'UART' + (i + 1) + '_BAUD'
              this.EInfo.push({
                label: label,
                value: ''
              })
              this.EInfo.push({
                label: this.$t('serialParams.label')[0],
                value: ''
              })
              this.EInfo.push({
                label: this.$t('serialParams.label')[1],
                value: ''
              })
              this.EInfo.push({
                label: this.$t('serialParams.label')[2],
                value: ''
              })
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
