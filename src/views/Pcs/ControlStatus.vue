<template>
  <div>
    <el-card class="box-card">
      <!-- 基础信息 -->
      <div slot="header" class="clearfix">
        <span>{{$t('controlStatus.searchTitle')}}</span>
      </div>
      <el-form label-width="80px" :inline="true">
        <el-form-item
          v-for="(item, index) in baseIfo"
          :key="index"
          :label="item.label"
          style="width:350px"
        >
          <el-input
            :value="item.value"
            :readonly="true"
            style="width:250px"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('controlStatus.label')[0]" style="width:400px">
          <el-select v-model="bank" style="width:250px">
            <el-option label="1" value="0"></el-option>
            <el-option label="2" value="1"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="box-card">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane :label="$t('controlStatus.tabs')[0]" name="state">
          <el-form label-width="130px">
            <el-form-item
              :label="item.label"
              v-for="(item, index) in state"
              :key="index"
            >
              <el-input v-model="item.value" readonly></el-input>
            </el-form-item>
            <el-form-item
              :label="item.label"
              v-for="(item, index) in state1"
              :key="'state1' + index"
            >
              <el-input v-model="item.value" readonly></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
export default {
  data () {
    return {
      baseIfo: [],
      api: '/api/Devices/GetRegistrationEquipment',
      api1: '/api/PCSMent/GetPCSRTControlsPara',
      data: {},
      bank: '0',
      dataArr: [],
      activeName: 'state',
      state: [],
      state1: []
    }
  },
  computed: {
    ...mapState('pcsdetail', ['paramsCS'])
  },
  mounted () {
    if (this.paramsCS.AutoSystemID) {
      this.getDetail(this.api, this.paramsCS)
    }

    if (this.paramsCS.AutoSystemID) {
      this.getInfo(this.paramsCS)
    }
  },
  methods: {
    ...mapMutations('pcsdetail', ['set_paramsCS']),
    getDetail (api, params) {
      this.$axios
        .get(
          `${api}?AutoSystemID=${params.AutoSystemID}&SystemID=${params.SystemID}`
        )
        .then(res => {
          this.data = res.data.data
          for (var key in this.data) {
            switch (key) {
              case 'DICCID':
                this.baseIfo.push({
                  label: this.$t('controlStatus.label')[1],
                  value: this.data[key]
                })
                break
              case 'DIDS':
                this.baseIfo.push({ label: this.$t('controlStatus.label')[2], value: this.data[key] })
                break
              case 'DName':
                this.baseIfo.push({
                  label: this.$t('controlStatus.label')[3],
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
      console.log(tab, event)
    },
    getInfo (params) {
      this.$axios
        .get(
          `${this.api1}?AutoSystemID=${params.AutoSystemID}&DeviceDIDS=${params.batterID}&DeviceIndex=${this.bank}`
        )
        .then(res => {
          if (res.data.code === 0) {
            this.$message.success(res.data.msg)
            let data = res.data.data
            this.setData()
            this.state[0].value = data.oN_OFF_SETTING ? this.$t('controlStatus.state')[0] : this.$t('controlStatus.state')[1]
            this.state[1].value = data.aUTOMATIC_MODE_SWITCHING ? this.$t('controlStatus.state')[0] : this.$t('controlStatus.state')[1]
            this.state[2].value = data.aCTIVE_ISLAND_ENABLE ? this.$t('controlStatus.state1')[0] : this.$t('controlStatus.state1')[1]
            this.state[3].value = data.pLANNED_CURVE_OPERATION ? this.$t('controlStatus.state')[0] : this.$t('controlStatus.state')[1]
            this.state[4].value = data.mPPT_PATTERN ? this.$t('controlStatus.state')[0] : this.$t('controlStatus.state')[1]
            this.state1[0].value = data.pOWER_FACTOR.toString()
            this.state1[1].value = data.rEACTIVE_POWER_SETTING.toString()
            this.state1[2].value = data.mANUAL_AND_OFF_GRID_MODE.toString()
            this.state1[3].value = data.aCTIVE_POWER_SETTINGS.toString()
            this.state1[4].value = data.rUNNING_MODE.toString()
            this.state1[5].value = data.cONSTANT_CURRENT_MODE_CURRENT.toString()
            this.state1[6].value = data.rEACTIVE_POWER_OPERATION_MODE.toString()
            this.state1[7].value = data.eMERGENCY_POWER_VALUE.toString()
            console.log(data)
          } else {
            this.setData()
          }
        })
        .catch(err => {
          console.error(err)
        })
    },
    setData () {
      // eslint-disable-next-line no-unused-expressions
      this.state = [
        {
          label: this.$t('controlStatus.list1')[0],
          value: ''
        },
        {
          label: this.$t('controlStatus.list1')[1],
          value: ''
        },
        {
          label: this.$t('controlStatus.list1')[2],
          value: ''
        },
        {
          label: this.$t('controlStatus.list1')[3],
          value: ''
        },
        {
          label: this.$t('controlStatus.list1')[4],
          value: ''
        }
      ]
      this.state1 = [
        {
          label: this.$t('controlStatus.list2')[0],
          value: ''
        },
        {
          label: this.$t('controlStatus.list2')[1],
          value: ''
        },
        {
          label: this.$t('controlStatus.list2')[2],
          value: ''
        },
        {
          label: this.$t('controlStatus.list2')[3],
          value: ''
        },
        {
          label: this.$t('controlStatus.list2')[4],
          value: ''
        },
        {
          label: this.$t('controlStatus.list2')[5],
          value: ''
        },
        {
          label: this.$t('controlStatus.list2')[6],
          value: ''
        },
        {
          label: this.$t('controlStatus.list2')[7],
          value: ''
        }
      ]
    }
  },
  watch: {
    bank: {
      handler (newName, oldName) {
        this.getInfo(this.paramsEAG)
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
</style>
