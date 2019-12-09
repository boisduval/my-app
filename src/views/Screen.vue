<template>
  <div>
    <div class="dataTable">
      <div class="topTitle">
        开放式平台
      </div>
      <div class="time" id="times"></div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      interval: ''
    }
  },
  created () {
    this.$('.el-main').css({ margin: '0', padding: '0' })
    this.interval = setInterval(() => {
      this.getDate()
    }, 1000)
    this.$once('hook:beforeDestroy', () => {
      clearInterval(this.interval)
    })
  },

  methods: {
    // 获取时间
    getDate () {
      var date = new Date()
      date = date.toLocaleString()
      this.$('#times').text(date)
      console.log(date)
    }
  },
  beforeDestroy () {
    clearInterval(this.interval)
  }
}
</script>

<style scoped>
.dataTable {
  color: #ffffff;
  padding: 1.5rem 1rem 0;
  /*box-sizing: border-box;*/
  /*-moz-box-sizing: border-box;*/
  background: url("../assets/img/dataTableBg1.png") no-repeat;
  -webkit-background-size: 100% 100%;
  -moz-background-size: 100% 100%;
  -o-background-size: 100% 100%;
  background-size: 100% 100%;
  position: relative;
}
.topTitle {
  font-size: 1.3rem;
  text-align: center;
  line-height: 4.45rem;
  width: 100%;
  /*box-sizing: border-box;*/
  background: url("../assets/img/bgTop.png") no-repeat;
  -webkit-background-size: 100% 100%;
  -moz-background-size: 100% 100%;
  -o-background-size: 100% 100%;
  background-size: 100% 100%;
  margin-bottom: 1.75rem;
}
.time {
  position: absolute;
  right: 2.7rem;
  top: 1.7rem;
}
</style>
