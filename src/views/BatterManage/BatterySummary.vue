<template>
  <div>
    <el-card style="text-align:left;">
      <el-form label-width="100px" :inline="true">
        <el-form-item
          :label="$t('batterySummary.formLabel')"
          style="width:400px"
        >
          <el-select v-model="bank" style="width:250px">
            <el-option label="Bank1" :value="0"></el-option>
            <el-option label="Bank2" :value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-radio-group
            v-model="activeItem"
            size="small"
            @change="handlePath"
          >
            <el-radio-button
              :label="item.label"
              v-for="(item, index) in radioList"
              :key="index"
            ></el-radio-button>
          </el-radio-group>
        </el-form-item>
      </el-form>
    </el-card>
    <router-view :bank="bank" />
  </div>
</template>

<script>
export default {
  data () {
    return {
      bank: '',
      activeItem: '',
      radioList: ''
    }
  },
  methods: {
    handlePath () {
      switch (this.activeItem) {
        case this.radioList[0].label:
          this.$router.push({ name: 'batterySummaryStateTvpbc' })
          break
        case this.radioList[1].label:
          this.$router.push({ name: 'batterySummaryStateCitm' })
          break
        case this.radioList[2].label:
          this.$router.push({ name: 'batterySummaryStateOb' })
          break
        case this.radioList[3].label:
          this.$router.push({ name: 'batterySummaryStateHvenpc' })
          break
        case this.radioList[4].label:
          this.$router.push({ name: 'batterySummaryStateMbt' })
          break
        case this.radioList[5].label:
          this.$router.push({ name: 'batterySummaryStateHircn' })
          break
        case this.radioList[6].label:
          this.$router.push({ name: 'batterySummaryStatePeiv' })
          break
      }
    }
  },
  created () {
    this.bank = 0
    this.radioList = this.$t('batterySummary.radioLabel')
    this.activeItem = this.radioList[0].label
  }
}
</script>

<style scoped>
.el-form-item {
  margin-bottom: 0;
}
</style>
