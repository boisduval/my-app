<template>
  <div>
    <el-card class="box-card">
      <!-- 基础信息 -->
      <div slot="header" class="clearfix">
        <span>设备基础信息</span>
      </div>
      <el-form label-width="80px" :inline="true">
        <el-form-item
          style="width:350px"
          v-for="(item, index) in baseIfo"
          :key="index"
          :label="item.label"
        >
          <el-input :value="item.value" :readonly="true" style="width:250px"></el-input>
        </el-form-item>
        <el-form-item label="设备Bank" style="width:400px">
          <el-select v-model="bank" style="width:250px">
            <el-option label="Bank1" value="0"></el-option>
            <el-option label="Bank2" value="1"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="box-card">
      <!-- 详细信息 -->
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="风扇状态" name="fan">
          <div class="wrap">
            <el-row :gutter="20">
              <el-col :span="4" v-for="(item, index) in fan" :key="index">
                <el-card>
                  <div slot="header" class="clearfix">
                    <span>第{{ index + 1 }}簇风扇状态</span>
                    <el-tag :type="item.type" effect="dark">{{
                      item.label
                    }}</el-tag>
                    <div style="clear:both"></div>
                  </div>
                  <div class="ibox-content">
                    <img
                      :src="item.src"
                      alt="风扇"
                      style="height:auto;width:100%"
                    />
                  </div>
                </el-card>
              </el-col>
            </el-row>
          </div>
        </el-tab-pane>

        <el-tab-pane
          v-for="(item, index) in list"
          :key="index"
          :label="item.label"
          :name="item.name"
        >
          <div class="wrap">
            <el-row :gutter="20">
              <el-col :span="4" v-for="(item1, index1) in item.data" :key="index1">
                <el-card>
                  <div slot="header" class="clearfix">
                    <span>第{{ index1 + 1 }}簇{{item.description}}</span>
                    <el-tag effect="dark">{{item.tag}}</el-tag>
                    <div style="clear:both"></div>
                  </div>
                  <div class="ibox-content">
                    <img
                      :src="item1.src"
                      alt="描述"
                      style="height:auto;width:100%"
                    />
                  </div>
                </el-card>
              </el-col>
            </el-row>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  data () {
    return {
      baseIfo: [],
      api: '/api/Devices/GetRegistrationEquipment',
      data: {},
      activeName: 'fan',
      list: [
        {
          label: '充电接触器状态',
          tag: '充电线路',
          name: 'charger',
          data: [],
          description: '接触器状态'
        },
        {
          label: '放电接触器状态',
          name: 'discharger',
          tag: '放电线路',
          data: [],
          description: '接触器状态'
        },
        {
          label: '预充电状态',
          name: 'precharger',
          tag: '预充电状态',
          data: [],
          description: '状态'
        },
        {
          label: 'PCS故障恢复',
          name: 'PCS',
          tag: 'PCS故障恢复',
          data: [],
          description: '状态'
        },
        {
          label: '加热功能开关',
          name: 'switch',
          tag: '加热功能开关',
          data: [],
          description: '状态'
        },
        {
          label: '干节点1输出电平',
          name: 'dry1',
          tag: '干节点1输出电平',
          data: [],
          description: '状态'
        },
        {
          label: '干节点2输出电平',
          name: 'dry2',
          tag: '干节点2输出电平',
          data: [],
          description: '状态'
        }
      ],
      bank: '0',
      infoApi: '/api/Chart/GetBatteryBankCTRLParaCharts',
      cHARGING_CONTACTOR_STATUS: '',
      sTATE_OF_THE_FAN: '',
      dISCHARGE_CONTACTOR_STATUS: '',
      pRECHARGE_STATE: '',
      pCS_FAULT_RECOVERY: '',
      hEATING_SWITCH: '',
      dRY_NODE_OUTPUT_1: '',
      dRY_NODE_OUTPUT_2: '',
      fan: [],
      charger: [],
      discharger: [],
      precharger: [],
      PCS: [],
      switch: [],
      dry1: [],
      dry2: []
    }
  },
  computed: {
    ...mapState('detail', ['paramsS'])
  },
  mounted () {
    if (this.paramsS.AutoSystemID && this.paramsS.SystemID) {
      this.getDetail(this.api, this.paramsS)
    }

    if (this.paramsS.AutoSystemID && this.paramsS.batterID) {
      this.getInfo(this.infoApi)
    }
  },
  methods: {
    ...mapMutations('detail', ['set_paramsS']),
    getDetail (api, params) {
      this.$axios
        .get(
          `${api}?AutoSystemID=${params.AutoSystemID}&SystemID=${params.SystemID}`
        )
        .then(res => {
          this.data = res.data.data
          for (var key in this.data) {
            switch (key) {
              case 'DIDS':
                this.baseIfo.push({ label: '设备编号', value: this.data[key] })
                break
              case 'DICCID':
                this.baseIfo.push({
                  label: 'ICCID编号',
                  value: this.data[key]
                })
                break
              case 'DName':
                this.baseIfo.push({
                  label: '设备名称',
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

    getInfo (api) {
      this.fan = []
      this.charger = []
      this.$axios
        .get(
          `${api}?AutoSystemID=${this.paramsS.AutoSystemID}&BatteryIDS=${this.paramsS.batterID}&BankIndex=${this.bank}`
        )
        .then(res => {
          if (res.data.code === 1) {
            this.$message.error(res.data.msg)
          }
          this.cHARGING_CONTACTOR_STATUS =
            res.data.data.cHARGING_CONTACTOR_STATUS
          this.sTATE_OF_THE_FAN = res.data.data.sTATE_OF_THE_FAN
          this.pRECHARGE_STATE = res.data.data.pRECHARGE_STATE
          this.dISCHARGE_CONTACTOR_STATUS = res.data.data.dISCHARGE_CONTACTOR_STATUS
          this.pCS_FAULT_RECOVERY = res.data.data.pCS_FAULT_RECOVERY
          this.hEATING_SWITCH = res.data.data.hEATING_SWITCH
          this.dRY_NODE_OUTPUT_1 = res.data.data.dRY_NODE_OUTPUT_1
          this.dRY_NODE_OUTPUT_2 = res.data.data.dRY_NODE_OUTPUT_2
          console.log(res.data.data)
          for (var key in this.cHARGING_CONTACTOR_STATUS) {
            if (this.cHARGING_CONTACTOR_STATUS[key]) {
              this.fan.push({
                src: require('@/assets/img/Device/fanstart.gif'),
                type: 'success',
                label: '启用'
              })
            } else {
              this.fan.push({
                src: require('@/assets/img/Device/fanstop.gif'),
                type: 'error',
                label: '禁用'
              })
            }
          }

          // eslint-disable-next-line
          for (var key in this.sTATE_OF_THE_FAN) {
            if (this.sTATE_OF_THE_FAN[key]) {
              this.charger.push({
                src: require('@/assets/img/Device/chargeon.png')
              })
            } else {
              this.charger.push({
                src: require('@/assets/img/Device/chargeoff.png')
              })
            }
          }

          // eslint-disable-next-line
          for (var key in this.dISCHARGE_CONTACTOR_STATUS) {
            if (this.dISCHARGE_CONTACTOR_STATUS[key]) {
              this.discharger.push({
                src: require('@/assets/img/Device/electricityon.png')
              })
            } else {
              this.discharger.push({
                src: require('@/assets/img/Device/electricityoff.png')
              })
            }
          }

          // eslint-disable-next-line
          for (var key in this.pRECHARGE_STATE) {
            if (this.pRECHARGE_STATE[key]) {
              this.precharger.push({
                src: require('@/assets/img/Device/electricityon.png')
              })
            } else {
              this.precharger.push({
                src: require('@/assets/img/Device/electricityoff.png')
              })
            }
          }

          // eslint-disable-next-line
          for (var key in this.pCS_FAULT_RECOVERY) {
            if (this.pCS_FAULT_RECOVERY[key]) {
              this.PCS.push({
                src: require('@/assets/img/Device/electricityon.png')
              })
            } else {
              this.PCS.push({
                src: require('@/assets/img/Device/electricityoff.png')
              })
            }
          }

          // eslint-disable-next-line
          for (var key in this.hEATING_SWITCH) {
            if (this.hEATING_SWITCH[key]) {
              this.switch.push({
                src: require('@/assets/img/Device/electricityon.png')
              })
            } else {
              this.switch.push({
                src: require('@/assets/img/Device/electricityoff.png')
              })
            }
          }

          // eslint-disable-next-line
          for (var key in this.dRY_NODE_OUTPUT_1) {
            if (this.dRY_NODE_OUTPUT_1[key]) {
              this.dry1.push({
                src: require('@/assets/img/Device/electricityon.png')
              })
            } else {
              this.dry1.push({
                src: require('@/assets/img/Device/electricityoff.png')
              })
            }
          }

          // eslint-disable-next-line
          for (var key in this.dRY_NODE_OUTPUT_2) {
            if (this.dRY_NODE_OUTPUT_2[key]) {
              this.dry2.push({
                src: require('@/assets/img/Device/electricityon.png')
              })
            } else {
              this.dry2.push({
                src: require('@/assets/img/Device/electricityoff.png')
              })
            }
          }

          this.list[0].data = this.charger
          this.list[1].data = this.discharger
          this.list[2].data = this.precharger
          this.list[3].data = this.PCS
          this.list[4].data = this.switch
          this.list[5].data = this.dry1
          this.list[6].data = this.dry2
        })
        .catch(err => {
          console.log(err)
        })
    },

    handleClick (tab, event) {
      //   this.getInfo(tab.name)
    }
  },
  watch: {
    paramsS: {
      handler (newName, oldName) {
        this.data = {}
        this.baseIfo = []
        this.getDetail(this.api, this.paramsS)
        this.getInfo(this.infoApi)
      },
      deep: true
    },
    bank: {
      handler (newName, oldName) {
        this.getInfo(this.infoApi)
      }
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

.wrap {
  width: 100%;
  /* height: 100%; */
  background-color: #f3f3f4;
  padding: 0 15px 20px;
}

.wrap .el-tag {
  float: right;
  padding: 0 2px;
  height: 20px;
  line-height: 18px;
}
.wrap .el-card {
  line-height: 20px;
}
</style>
