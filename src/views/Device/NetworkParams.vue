<template>
  <div>
    <el-form label-width="130px">
      <el-form-item
        v-for="(item, index) in EInfo"
        :key="index"
        :label="item.label"
      >
        <el-input :value="item.value" :readonly="true"></el-input>
      </el-form-item>
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
            for (var key in this.data) {
              switch (key) {
                case 'lOCAL_IP_PROTOCOL_TYPE':
                  this.EInfo.push({
                    label: this.$t('networkParams.list')[0],
                    value: this.data[key]
                  })
                  break
                case 'lOCAL_IP_ACCESS':
                  this.EInfo.push({
                    label: this.$t('networkParams.list')[1],
                    value: this.data[key]
                  })
                  break
                case 'lOCAL_CLIENT_PORT_NUMBER':
                  this.EInfo.push({
                    label: this.$t('networkParams.list')[2],
                    value: this.data[key]
                  })
                  break
                case 'lOCAL_STATIC_IP_ADDRESS':
                  this.EInfo.push({
                    label: this.$t('networkParams.list')[3],
                    value: this.data[key]
                  })
                  break
                case 'lOCAL_SUBNET_MASK':
                  this.EInfo.push({
                    label: this.$t('networkParams.list')[4],
                    value: this.data[key]
                  })
                  break
                case 'lOCAL_GATEWAY_ADDRESS':
                  this.EInfo.push({
                    label: this.$t('networkParams.list')[5],
                    value: this.data[key]
                  })
                  break
                case 'sERVER_IP_ACCESS_METHOD':
                  this.EInfo.push({
                    label: this.$t('networkParams.list')[6],
                    value: this.data[key]
                  })
                  break
                case 'sERVER_PORT':
                  this.EInfo.push({
                    label: this.$t('networkParams.list')[7],
                    value: this.data[key]
                  })
                  break
                case 'sERVER_STATIC_IP':
                  this.EInfo.push({
                    label: this.$t('networkParams.list')[8],
                    value: this.data[key]
                  })
                  break
                case 'sERVER_DOMAIN_NAME_ADDRESS':
                  this.EInfo.push({
                    label: this.$t('networkParams.list')[9],
                    value: this.data[key]
                  })
                  break
                case 'dNS_1_ADDRESS':
                  this.EInfo.push({
                    label: this.$t('networkParams.list')[10],
                    value: this.data[key]
                  })
                  break
                case 'dNS_2_ADDRESS':
                  this.EInfo.push({
                    label: this.$t('networkParams.list')[11],
                    value: this.data[key]
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
              label: this.$t('networkParams.list')[0],
              value: ''
            })
            this.EInfo.push({
              label: this.$t('networkParams.list')[1],
              value: ''
            })
            this.EInfo.push({
              label: this.$t('networkParams.list')[2],
              value: ''
            })
            this.EInfo.push({
              label: this.$t('networkParams.list')[3],
              value: ''
            })
            this.EInfo.push({
              label: this.$t('networkParams.list')[4],
              value: ''
            })
            this.EInfo.push({
              label: this.$t('networkParams.list')[5],
              value: ''
            })
            this.EInfo.push({
              label: this.$t('networkParams.list')[6],
              value: ''
            })
            this.EInfo.push({
              label: this.$t('networkParams.list')[7],
              value: ''
            })
            this.EInfo.push({
              label: this.$t('networkParams.list')[8],
              value: ''
            })
            this.EInfo.push({
              label: this.$t('networkParams.list')[9],
              value: ''
            })
            this.EInfo.push({
              label: this.$t('networkParams.list')[10],
              value: ''
            })
            this.EInfo.push({
              label: this.$t('networkParams.list')[11],
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
