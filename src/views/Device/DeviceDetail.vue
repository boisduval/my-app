<template>
  <div>
    <el-card class="box-card">
      <!-- 基础信息 -->
      <div slot="header" class="clearfix">
        <span>设备基础信息</span>
      </div>
      <el-form label-width="80px" :inline="true">
        <el-form-item
          v-for="(item, index) in baseIfo"
          :key="index"
          :label="item.label"
        >
          <el-input :value="item.value" :readonly="true"></el-input>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="box-card">
      <!-- 详细信息 -->
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane
          v-for="(item, index) in list"
          :key="index"
          :label="item.label"
          :name="item.name"
        >
        </el-tab-pane>
      </el-tabs>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </el-card>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      baseIfo: [],
      api: '/api/Devices/GetRegistrationEquipment',
      data: {},
      activeName: 'DTUInfo',
      list: [
        {
          label: 'DTU信息',
          name: 'DTUInfo'
        },
        {
          label: '控制器信息',
          name: 'ControllerInfo'
        },
        {
          label: 'BMS信息',
          name: 'BmsInfo'
        },
        // {
        //   label: '电池信息',
        //   name: 'BatteryInfo'
        // },
        // {
        //   label: '温度信息',
        //   name: 'TemperatureInfo'
        // }
        {
          label: '设备信息',
          name: 'EquipmentInfo'
        },
        {
          label: '网络参数',
          name: 'NetworkParams'
        },
        {
          label: '拓展参数',
          name: 'ExpandParams'
        },
        {
          label: '串口参数',
          name: 'SerialParams'
        },
        {
          label: '挂载参数',
          name: 'MountedParams'
        },
        {
          label: '预设置电池参数',
          name: 'PreBatteryParams'
        },
        {
          label: '电池参数',
          name: 'BatteryParams'
        }
      ]
    }
  },
  computed: {
    ...mapState('detail', ['paramsD'])
  },
  watch: {
    $route (to, from) {
      this.activeName = to.name
    },
    paramsD: {
      handler (newName, oldName) {
        this.data = {}
        this.baseIfo = []
        this.getDetail(this.api, this.paramsD)
      },
      deep: true
    }
  },
  mounted () {
    this.$router.push({ name: this.activeName })
    if (this.paramsD.AutoSystemID && this.paramsD.SystemID) {
      this.getDetail(this.api, this.paramsD)
    }
  },
  methods: {
    getDetail (api, params) {
      this.$axios
        .get(
          `${api}?AutoSystemID=${params.AutoSystemID}&SystemID=${params.SystemID}`
        )
        .then(res => {
          // console.log(res)
          this.data = res.data.data
          for (var key in this.data) {
            switch (key) {
              case 'DIDS':
                this.baseIfo.push({
                  label: '设备编号',
                  value: this.data[key]
                })
                break
              case 'DICCID':
                this.baseIfo.push({
                  label: 'ICCID编号',
                  value: this.data[key]
                })
                break
              case 'DVIN':
                this.baseIfo.push({
                  label: 'VIN编号',
                  value: this.data[key]
                })
                break
              case 'DName':
                this.baseIfo.push({
                  label: '设备名称',
                  value: this.data[key]
                })
                break
              case 'DTime':
                this.baseIfo.push({
                  label: '登记时间',
                  value: this.data[key]
                })
                break
            }
          }
        })
        .catch(err => {
          console.error(err)
        })
    },

    handleClick (tab, event) {
      // console.log(tab.name, event)
      this.$router.push({ name: tab.name })
    }
  }
}
</script>

<style scoped>
.box-card {
  line-height: 10px;
  font-size: 15px;
  text-align: left;
  /* margin-bottom: 20px; */
  box-sizing: border-box;
}

.el-card:nth-last-child(1) {
  margin-top: 20px;
}
</style>
