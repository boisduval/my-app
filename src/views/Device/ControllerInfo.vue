<template>
  <div>
    <el-form label-width="90px">
      <el-form-item
        v-for="(item, index) in ControllerInfo"
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
      ControllerInfo: [],
      api: '/api/Devices/GetDevicesControllerInfo',
      data: {}
    }
  },
  computed: {
    ...mapState('detail', ['paramsD'])
  },
  mounted () {
    if (this.paramsD.AutoSystemID && this.paramsD.SystemID) {
      this.getControllerInfo(this.api, this.paramsD)
    }
  },
  methods: {
    getControllerInfo (api, params) {
      this.$axios
        .get(
          `${api}?AutoSystemID=${params.AutoSystemID}&SystemID=${params.SystemID}`
        )
        .then(res => {
          if (res.data.code === 0) {
            this.data = res.data.data
            for (var key in this.data) {
              switch (key) {
                case 'Name':
                  this.ControllerInfo.push({
                    label: '控制器名称',
                    value: this.data[key]
                  })
                  break
                case 'VIN':
                  this.ControllerInfo.push({
                    label: 'VIN码',
                    value: this.data[key]
                  })
                  break
                case 'HVersions':
                  this.ControllerInfo.push({
                    label: '硬件版本号',
                    value: this.data[key]
                  })
                  break
                case 'SVersions':
                  this.ControllerInfo.push({
                    label: '软件版本号',
                    value: this.data[key]
                  })
                  break
                case 'BmsNumber':
                  this.ControllerInfo.push({
                    label: '管理器数量',
                    value: this.data[key]
                  })
                  break
                case 'BatteryNumber':
                  this.ControllerInfo.push({
                    label: '电池数量',
                    value: this.data[key]
                  })
                  break
                case 'UpDateTime':
                  this.ControllerInfo.push({
                    label: '更新时间',
                    value: this.data[key]
                  })
                  break
                case 'WriteTime':
                  this.ControllerInfo.push({
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
        this.getControllerInfo(this.api, this.paramsD)
      },
      deep: true
    }
  }
}
</script>

<style scoped></style>
