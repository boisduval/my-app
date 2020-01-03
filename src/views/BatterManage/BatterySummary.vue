<template>
  <div>
    <el-card style="text-align:left;">
      <el-form label-width="100px" :inline="true">
        <el-form-item label="设备Bank" style="width:400px">
          <el-select v-model="bank" style="width:250px">
            <el-option label="Bank1" value="0"></el-option>
            <el-option label="Bank2" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-radio-group v-model="activeItem" size="small" @change="handlePath">
            <el-radio-button label="总压曲线"></el-radio-button>
            <el-radio-button label="系统状态"></el-radio-button>
            <el-radio-button label="健康状态"></el-radio-button>
            <el-radio-button label="电压极值"></el-radio-button>
            <el-radio-button label="温度极值"></el-radio-button>
            <el-radio-button label="内阻极值"></el-radio-button>
            <el-radio-button label="绝缘曲线"></el-radio-button>
          </el-radio-group>
        </el-form-item>
      </el-form>
    </el-card>
    <router-view :bank="bank"/>
  </div>
</template>

<script>
export default {
  data () {
    return {
      bank: 0,
      radio1: '总压曲线',
      radio2: '系统状态',
      radio3: '健康状态',
      radio4: '电压极值',
      radio5: '温度极值',
      radio6: '内阻极值',
      radio7: '绝缘曲线',
      activeItem: '总压曲线'
    }
  },
  methods: {
    handlePath () {
      switch (this.activeItem) {
        case '总压曲线':
          this.$router.push({ name: 'batterySummaryStateTvpbc' })
          break
        case '系统状态':
          this.$router.push({ name: 'batterySummaryStateCitm' })
          break
        case '健康状态':
          this.$router.push({ name: 'batterySummaryStateOb' })
          break
        case '电压极值':
          this.$router.push({ name: 'batterySummaryStateHvenpc' })
          break
        case '温度极值':
          this.$router.push({ name: 'batterySummaryStateMbt' })
          break
        case '内阻极值':
          this.$router.push({ name: 'batterySummaryStateHircn' })
          break
        case '绝缘曲线':
          this.$router.push({ name: 'batterySummaryStatePeiv' })
          break
      }
    }
  }
}
</script>

<style scoped>
.el-form-item {
  margin-bottom: 0;
}
</style>
