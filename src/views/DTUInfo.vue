<template>
  <div>
    <el-form label-width="90px">
      <el-form-item
        v-for="(item, index) in DTUInfo"
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
      DTUInfo: [],
      api: '/api/Devices/GetDevicesDTUInfo',
      data: {}
    }
  },
  computed: {
    ...mapState('detail', ['paramsD'])
  },
  mounted () {
    if (this.paramsD.AutoSystemID && this.paramsD.SystemID) {
      this.getDTUInfo(this.api, this.paramsD)
    }
  },
  methods: {
    getDTUInfo (api, params) {
      this.$axios
        .get(
          `${api}?AutoSystemID=${params.AutoSystemID}&SystemID=${params.SystemID}`
        )
        .then(res => {
          if (res.data.code === 0) {
            this.data = res.data.data
            for (var key in this.data) {
              switch (key) {
                case 'ICCID':
                  this.DTUInfo.push({
                    label: 'ICCID编号',
                    value: this.data[key]
                  })
                  break
                case 'IP':
                  this.DTUInfo.push({
                    label: 'IP地址',
                    value: this.data[key]
                  })
                  break
                case 'Mask':
                  this.DTUInfo.push({
                    label: '设备掩码',
                    value: this.data[key]
                  })
                  break
                case 'Gateway':
                  this.DTUInfo.push({
                    label: '设备网关',
                    value: this.data[key]
                  })
                  break
                case 'DNS1':
                  this.DTUInfo.push({
                    label: 'DNS1地址',
                    value: this.data[key]
                  })
                  break
                case 'DNS2':
                  this.DTUInfo.push({
                    label: 'DNS2地址',
                    value: this.data[key]
                  })
                  break
                case 'UpDateTime':
                  this.DTUInfo.push({
                    label: '更新时间',
                    value: this.data[key]
                  })
                  break
                case 'WriteTime':
                  this.DTUInfo.push({
                    label: '写入时间',
                    value: this.data[key]
                  })
                  break
              }
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
  },
  watch: {
    paramsD: {
      handler (newName, oldName) {
        this.data = {}
        this.DTUInfo = []
        this.getDTUInfo(this.api, this.paramsD)
      },
      deep: true
    }
  }
}
</script>

<style scoped></style>
