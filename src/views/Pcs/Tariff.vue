<template>
  <div>
    <el-card class="box-card">
      <!-- 基础信息 -->
      <div slot="header" class="clearfix">
        <span>{{ $t("tariff.searchTitle") }}</span>
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
        <el-form-item :label="$t('tariff.label')[0]" style="width:400px">
          <el-select v-model="bank" style="width:250px">
            <el-option label="1" value="0"></el-option>
            <el-option label="2" value="1"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="box-card">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane :label="$t('tariff.tabs')[0]" name="time">
          <el-form label-width="180px">
            <el-form-item
              :label="item.label"
              v-for="(item, index) in time.list1"
              :key="index"
            >
              <el-input v-model="item.value" readonly></el-input>
            </el-form-item>
            <div class="wrap-item">
              <div
                style="width:50%"
                v-for="(item, index) in time.list2"
                :key="'list2' + index"
              >
                <el-form-item :label="item.label">
                  <el-input v-model="item.value" readonly></el-input>
                </el-form-item>
              </div>
            </div>
          </el-form>
        </el-tab-pane>
        <el-tab-pane :label="$t('tariff.tabs')[1]" name="power">
          <el-form label-width="180px">
            <div class="wrap-item">
              <div
                style="width:50%"
                v-for="(item, index) in power"
                :key="index"
              >
                <el-form-item :label="item.label">
                  <el-input v-model="item.value" readonly></el-input>
                </el-form-item>
              </div>
            </div>
          </el-form>
        </el-tab-pane>
        <el-tab-pane :label="$t('tariff.tabs')[2]" name="tariff">
          <el-form label-width="180px" v-for="(item1, index) in tariff" :key="index" style="margin-bottom:40px;">
            <el-form-item
              :label="item.label"
              v-for="(item, index) in item1.list1"
              :key="index"
            >
              <el-input v-model="item.value" readonly></el-input>
            </el-form-item>
            <div class="wrap-item">
              <div
                style="width:50%"
                v-for="(item, index) in item1.list2"
                :key="'list2' + index"
              >
                <el-form-item :label="item.label">
                  <el-input v-model="item.value" readonly></el-input>
                </el-form-item>
              </div>
            </div>
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
      api1: '/api/PCSMent/GetPCSRTConfigurationPara',
      data: {},
      bank: '0',
      dataArr: [],
      activeName: 'time',
      time: {
        list1: [],
        list2: []
      },
      power: [],
      tariff: new Array([4]).fill(
        {
          list1: [],
          list2: []
        }
      )
    }
  },
  computed: {
    ...mapState('pcsdetail', ['paramsT'])
  },
  mounted () {
    if (this.paramsT.AutoSystemID) {
      this.getDetail(this.api, this.paramsT)
    }

    if (this.paramsT.AutoSystemID) {
      this.getInfo(this.paramsT)
    }
  },
  methods: {
    ...mapMutations('pcsdetail', ['set_paramsT']),
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
                  label: this.$t('tariff.label')[1],
                  value: this.data[key]
                })
                break
              case 'DIDS':
                this.baseIfo.push({
                  label: this.$t('tariff.label')[2],
                  value: this.data[key]
                })
                break
              case 'DName':
                this.baseIfo.push({
                  label: this.$t('tariff.label')[3],
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
            this.time.list1[0].value =
              data.sYSTEM_TIME_YEAR +
              '-' +
              data.sYSTEM_TIME_MONTH +
              '-' +
              data.sYSTEM_TIME_DAY +
              ' ' +
              data.sYSTEM_TIME_HOUR +
              ':' +
              data.sYSTEM_TIME_MINUTE +
              ':' +
              data.sYSTEM_TIME_SECOND
            this.time.list1[1].value =
              data.nUMBER_OF_PLANNED_CURVE_PERIODS + ''
            data.pLANNED_CURVE_PERIOD.forEach((val, i) => {
              this.time.list2[i * 2].value = val.StartTime
              this.time.list2[i * 2 + 1].value = val.StopTime
            })
            data.pLANNED_CURVE_ACTIVE_POWER.forEach((val, i) => {
              this.power[i * 2].value = val
            })
            data.pLANNED_CURVE_REACTIVE_POWER.forEach((val, i) => {
              this.power[i * 2 + 1].value = val
            })
            this.tariff[0].list1[0].value = data.nUMBER_OF_PEAK_PERIODS
            this.tariff[0].list1[1].value = data.tIP_WHEN_ELECTRICITY
            data.eLECTRICITY_PRICE_SETTING_PEAK_PERIOD.forEach((val, i) => {
              this.tariff[0].list2[i * 2].value = val.StartTime
              this.tariff[0].list2[i * 2 + 1].value = val.StopTime
            })
            this.tariff[1].list1[0].value = data.nUMBER_OF_PEAK_HOURS
            this.tariff[1].list1[1].value = data.pEAK_ELECTRICITY
            data.eLECTRICITY_PRICE_SETTING_PEAK_HOUR_PERIOD.forEach((val, i) => {
              this.tariff[1].list2[i * 2].value = val.StartTime
              this.tariff[1].list2[i * 2 + 1].value = val.StopTime
            })
            this.tariff[2].list1[0].value = data.nORMAL_TIME_QUANTITY
            this.tariff[2].list1[1].value = data.eLECTRICITY_AT_ORDINARY_TIMES
            data.eLECTRICITY_PRICE_SETTING_NORMAL_PERIOD.forEach((val, i) => {
              this.tariff[2].list2[i * 2].value = val.StartTime
              this.tariff[2].list2[i * 2 + 1].value = val.StopTime
            })
            this.tariff[3].list1[0].value = data.qUANTITY_OF_VALLEY_TIME_PERIOD
            this.tariff[3].list1[1].value = data.tHE_VALLEY_OF_ELECTRICITY
            data.eLECTRICITY_PRICE_SETTING_VALLEY_TIME_PERIOD.forEach((val, i) => {
              this.tariff[3].list2[i * 2].value = val.StartTime
              this.tariff[3].list2[i * 2 + 1].value = val.StopTime
            })
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
      this.time = {
        list1: [
          {
            label: this.$t('tariff.list1')[0],
            value: ''
          },
          {
            label: this.$t('tariff.list1')[1],
            value: ''
          }
        ],
        list2: []
      }
      var arr = this.$t('tariff.list1')
      arr.forEach((val, i) => {
        if (i !== 0 && i !== 1) {
          this.time.list2.push({
            label: val,
            value: ''
          })
        }
      })
      this.power = []
      var arr1 = this.$t('tariff.list2')
      arr1.forEach((val, i) => {
        this.power.push({
          label: val,
          value: ''
        })
      })
      this.tariff = [
        {
          list1: [],
          list2: []
        },
        {
          list1: [],
          list2: []
        },
        {
          list1: [],
          list2: []
        },
        {
          list1: [],
          list2: []
        }
      ]
      var arr2 = this.$t('tariff.list3')
      for (let i = 0; i < arr2.length; i++) {
        for (let j = 0; j < arr2[i].list1.length; j++) {
          this.tariff[i].list1.push({
            label: arr2[i].list1[j],
            value: ''
          })
        }
        for (let k = 0; k < arr2[i].list2.length; k++) {
          this.tariff[i].list2.push({
            label: arr2[i].list2[k],
            value: ''
          })
        }
      }
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

.wrap-item {
  display: flex;
  flex-wrap: wrap;
}
</style>
