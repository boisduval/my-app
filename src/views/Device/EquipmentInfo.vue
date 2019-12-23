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
      this.getEInfo1(this.api1, this.paramsD)
    }
  },
  methods: {
    async getEInfo (api, params) {
      try {
        let res = await (() => {
          return new Promise((resolve, reject) => {
            this.$axios
              .get(
                `${api}?AutoSystemID=${params.AutoSystemID}&DeviceDIDS=${params.batterID}`
              )
              .then(res => {
                resolve(res)
              })
              .catch(err => {
                reject(err)
              })
          })
        })
        if (res.data.code === 0) {
          this.data = res.data.data
          for (var key in this.data) {
            switch (key) {
              case 'dMS_DEVICE_ID':
                this.EInfo.push({
                  label: 'DMS设备ID',
                  value: this.data[key]
                })
                break
              case 'dMS_PROJECT_NUMBER':
                this.EInfo.push({
                  label: '项目编号',
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
        if (res.data.code !== 0) {
          this.EInfo.push({
            label: 'DMS设备ID',
            value: ''
          })
          this.EInfo.push({
            label: '项目编号',
            value: ''
          })
        }
      } catch (err) {
        console.log(err)
      }
      // this.$axios
      //   .get(
      //     `${api}?AutoSystemID=${params.AutoSystemID}&DeviceDIDS=${params.batterID}`
      //   )
      //   .then(res => {
      //     if (res.data.code === 0) {
      //       this.data = res.data.data;
      //       for (var key in this.data) {
      //         switch (key) {
      //           case "dMS_DEVICE_ID":
      //             this.EInfo.push({
      //               label: "DMS设备ID",
      //               value: this.data[key]
      //             });
      //             break;
      //           case "dMS_PROJECT_NUMBER":
      //             this.EInfo.push({
      //               label: "项目编号",
      //               value: this.data[key]
      //             });
      //             break;
      //         }
      //       }
      //     } else if (res.data.code === 1) {
      //       this.$message.error(res.data.msg);
      //     } else if (res.data.code === 3) {
      //       this.$message.warning(res.data.msg);
      //     }
      //     if (res.data.code !== 0) {
      //       this.EInfo.push({
      //         label: "DMS设备ID",
      //         value: ""
      //       });
      //       this.EInfo.push({
      //         label: "项目编号",
      //         value: ""
      //       });
      //     }
      //   })
      //   .catch(err => {
      //     console.error(err);
      //   });
    },
    getEInfo1 (api, params) {
      this.$axios
        .get(
          `${api}?AutoSystemID=${params.AutoSystemID}&DeviceDIDS=${params.batterID}`
        )
        .then(res => {
          if (res.data.code === 0) {
            var data = res.data.data
            for (var key in data) {
              switch (key) {
                case 'dMS_HARDWARE_VERSION_NUMBER':
                  this.EInfo.push({
                    label: 'DMS硬件版本号',
                    value: data[key]
                  })
                  break
                case 'dMS_FIRMWARE_VERSION_NUMBER':
                  this.EInfo.push({
                    label: 'DMS固件版本号',
                    value: data[key]
                  })
                  break
                case 'rEAD_RTC_TIME':
                  this.EInfo.push({
                    label: 'RTC时间',
                    value: data[key]
                  })
                  break
                case 'tHE_MAC_ADDRESS':
                  this.EInfo.push({
                    label: 'MAC地址',
                    value: data[key]
                  })
                  break
                case 'lOCAL_DHCP_ON_STATUS':
                  var state = data[key] ? '开启' : '关闭'
                  this.EInfo.push({
                    label: '本地DHCP开启状态',
                    value: state
                  })
                  break
                case 'dNS_DOMAIN_NAME_OPEN_STATE':
                  var state1 = data[key] ? '开启' : '关闭'
                  this.EInfo.push({
                    label: 'DNS域名开启状态',
                    value: state1
                  })
                  break
                case 'dNS_DOMAIN_NAME_FETCH_STATUS':
                  var state2 = data[key] ? '已获取' : '未获取'
                  this.EInfo.push({
                    label: 'DNS域名获取状态',
                    value: state2
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
          if (res.data.code !== 0) {
            this.EInfo.push({
              label: 'DMS硬件版本号',
              value: ''
            })
            this.EInfo.push({
              label: 'DMS固件版本号',
              value: ''
            })
            this.EInfo.push({
              label: 'RTC时间',
              value: ''
            })
            this.EInfo.push({
              label: 'MAC地址',
              value: ''
            })
            this.EInfo.push({
              label: '本地DHCP开启状态',
              value: ''
            })
            this.EInfo.push({
              label: 'DNS域名开启状态',
              value: ''
            })
            this.EInfo.push({
              label: '本地DHCP开启状态',
              value: ''
            })
            this.EInfo.push({
              label: 'DNS域名开启状态',
              value: ''
            })
            this.EInfo.push({
              label: 'DNS域名获取状态',
              value: ''
            })
            this.EInfo.push({
              label: '扩展IP开启状态',
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
