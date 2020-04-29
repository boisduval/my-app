<template>
  <div>
    <el-card>
      <div class="content"></div>
    </el-card>
    <el-card style="margin-top:20px;">
      <div style="padding: 20px 10px" v-if="data">
        <div class="text">
          {{ data.SystemText }}
        </div>
        <div class="text">
          {{ data.Copyright }}
        </div>
        <div class="text">
          {{ data.SystemText }}
          <el-link type="primary" :href="data.TermsOfService.unit">{{
            data.TermsOfService.value
          }}</el-link>
        </div>
        <div class="text">
          {{ data.CompanyName }}
          <el-link type="primary" :href="data.EnterpriseWebsite.unit">{{
            data.EnterpriseWebsite.value
          }}</el-link>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      AutoSystemID: '',
      data: ''
    }
  },
  methods: {
    getData () {
      this.$axios
        .get(`/api/Ablut/GetToAblutInfo?AutoSystemID=${this.AutoSystemID}`)
        .then(res => {
          if (res.data.code === 0) {
            this.data = res.data.data
          }
        })
        .catch(err => {
          console.error(err)
        })
    }
  },
  created () {
    this.AutoSystemID = localStorage.getItem('AutoSystemID')
    this.getData()
  }
}
</script>

<style scoped>
.content {
  height: 520px;
  background: url("../../assets/img/Hresys.png") center no-repeat;
  background-size: contain;
}
.text {
  font-size: 14px;
  text-align: left;
  line-height: 26px;
}
.el-link {
  vertical-align: baseline;
}
</style>
