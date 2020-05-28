<template>
  <div>
    <el-form label-width="140px">
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
                case 'eXTEND_IP_CAPABILITIES_TO_ENABLE':
                  this.EInfo.push({
                    label: '扩展IP功能使能',
                    value: this.data[key].toString()
                  })
                  break
                case 'eXTENDED_IP_ON':
                  this.EInfo.push({
                    label: '扩展IP开启',
                    value: this.data[key]
                  })
                  break
                case 'eXTENSION_IP_1':
                  this.EInfo.push({
                    label: '扩展IP_1',
                    value: this.data[key]
                  })
                  break
                case 'eXTENSION_PORT_1':
                  this.EInfo.push({
                    label: '扩展端口PORT_1',
                    value: this.data[key]
                  })
                  break
                case 'eXTENSION_IP_2':
                  this.EInfo.push({
                    label: '扩展IP_2',
                    value: this.data[key]
                  })
                  break
                case 'eXTENSION_PORT_2':
                  this.EInfo.push({
                    label: '扩展端口PORT_2',
                    value: this.data[key]
                  })
                  break
                case 'eXTENSION_IP_3':
                  this.EInfo.push({
                    label: '扩展IP_3',
                    value: this.data[key]
                  })
                  break
                case 'eXTENSION_PORT_3':
                  this.EInfo.push({
                    label: '扩展端口PORT_3',
                    value: this.data[key]
                  })
                  break
                case 'eXTENSION_IP_4':
                  this.EInfo.push({
                    label: '扩展IP_4',
                    value: this.data[key]
                  })
                  break
                case 'eXTENSION_PORT_4':
                  this.EInfo.push({
                    label: '扩展端口PORT_4',
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
              label: '扩展IP功能使能',
              value: ''
            })
            this.EInfo.push({
              label: '扩展IP开启',
              value: ''
            })
            this.EInfo.push({
              label: '扩展IP_1',
              value: ''
            })
            this.EInfo.push({
              label: '扩展端口PORT_1',
              value: ''
            })
            this.EInfo.push({
              label: '扩展IP_2',
              value: ''
            })
            this.EInfo.push({
              label: '扩展端口PORT_2',
              value: ''
            })
            this.EInfo.push({
              label: '扩展IP_3',
              value: ''
            })
            this.EInfo.push({
              label: '扩展端口PORT_3',
              value: ''
            })
            this.EInfo.push({
              label: '扩展IP_4',
              value: ''
            })
            this.EInfo.push({
              label: '扩展端口PORT_4',
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
