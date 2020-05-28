<template>
  <div>
    <el-card class="box-card">
      <!-- 基础信息 -->
      <div slot="header" class="clearfix">
        <span>{{ $t("deviceDetail.searchTitle") }}</span>
      </div>
      <el-form label-width="80px" :inline="true">
        <el-form-item
          style="width:350px"
          v-for="(item, index) in baseIfo"
          :key="index"
          :label="item.label"
        >
          <el-input
            :value="item.value"
            :readonly="true"
            style="width:250px"
          ></el-input>
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
      <router-view></router-view>
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
      activeName: 'EquipmentInfo',
      list: [
        {
          label: this.$t('deviceDetail.list')[0],
          name: 'EquipmentInfo'
        },
        {
          label: this.$t('deviceDetail.list')[1],
          name: 'NetworkParams'
        },
        {
          label: this.$t('deviceDetail.list')[2],
          name: 'ExpandParams'
        },
        {
          label: this.$t('deviceDetail.list')[3],
          name: 'SerialParams'
        },
        {
          label: this.$t('deviceDetail.list')[4],
          name: 'MountedParams'
        },
        {
          label: this.$t('deviceDetail.list')[5],
          name: 'PreBatteryParams'
        },
        {
          label: this.$t('deviceDetail.list')[6],
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
                  label: this.$t('deviceDetail.formLabel')[0],
                  value: this.data[key]
                })
                break
              case 'DICCID':
                this.baseIfo.push({
                  label: this.$t('deviceDetail.formLabel')[1],
                  value: this.data[key]
                })
                break
              case 'DName':
                this.baseIfo.push({
                  label: this.$t('deviceDetail.formLabel')[2],
                  value: this.data[key]
                })
                break
              case 'DTime':
                this.baseIfo.push({
                  label: this.$t('deviceDetail.formLabel')[3],
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
