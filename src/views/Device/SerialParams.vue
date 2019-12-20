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
      this.getEInfo1(this.api1, this.paramsD)
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
            this.data = res.data.data
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
            var data = res.data.data
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
