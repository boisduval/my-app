<template>
  <div>
    <!-- 表单开始 -->
    <el-collapse-transition>
      <div style="box-sizing:border-box;" v-show="isShow">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>设备日报表列表查询</span>
          </div>
          <el-form
            :inline="true"
            :model="searchForm"
            class="demo-form-inline"
            label-position="right"
          >
            <el-form-item label="范围选择:" label-width="80px">
              <el-date-picker
                v-model="value"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item label="设备名称:" label-width="80px">
              <el-select v-model="searchForm.LikeType" clearable>
                <el-option
                  v-for="(item, index) in options"
                  :key="index"
                  :value="item"
                  :label="item"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="设备Bank" label-width="80px">
              <el-select v-model="bank">
                <el-option label="Bank1" value="0"></el-option>
                <el-option label="Bank2" value="1"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label-width="20px" label=" ">
              <el-button
                type="primary"
                @click="
                  searchForm.page = 1;
                  getData();
                "
                >查询</el-button
              >
              <el-button
                type="primary"
                plain
                size="mini"
                style="margin-left:20px;"
                @click="goOtherDay('yesterday')"
                >昨天</el-button
              >
              <el-button
                type="primary"
                plain
                size="mini"
                @click="goOtherDay('week')"
                >近一周</el-button
              >
              <el-button
                type="primary"
                plain
                size="mini"
                @click="goOtherDay('month')"
                >近一月</el-button
              >
            </el-form-item>
          </el-form>
        </el-card>
        <div style="height:20px;width:100%"></div>
      </div>
    </el-collapse-transition>
    <!-- 表单结束 -->

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>异常总览</span>
      </div>
      <div class="wrap-box flex-row">
          <div class="wrap" style="width:100%">
            <div style="padding: 0 20px">
              <el-table
                :show-header="false"
                :data="table1"
                :row-class-name="tableRowClassName"
                :border="true"
                style="width: 100%">
                <el-table-column
                  prop="one"
                  align="center"
                  show-overflow-tooltip
                  label="1">
                </el-table-column>
                <el-table-column
                  prop="two"
                  align="center"
                  show-overflow-tooltip
                  label="2">
                </el-table-column>
                <el-table-column
                  prop="three"
                  align="center"
                  show-overflow-tooltip
                  label="3">
                </el-table-column>
                <el-table-column
                  prop="four"
                  align="center"
                  show-overflow-tooltip
                  label="4">
                </el-table-column>
                <el-table-column
                  prop="five"
                  align="center"
                  show-overflow-tooltip
                  label="5">
                </el-table-column>
                <el-table-column
                  prop="six"
                  align="center"
                  show-overflow-tooltip
                  label="6">
                </el-table-column>
                <el-table-column
                  prop="seven"
                  align="center"
                  show-overflow-tooltip
                  label="7">
                </el-table-column>
              </el-table>
            </div>
          </div>
          <div class="wrap">
            <div id="myChart1" style="height:350px;padding: 0 20px"></div>
          </div>
          <div class="wrap">
            <div id="myChart2" style="height:350px;padding: 0 20px"></div>
          </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { mapState } from 'vuex'
let moment = require('moment')
export default {
  data () {
    return {
      searchForm: {
        AutoSystemID: '',
        Start: '',
        Stop: '',
        LikeType: '',
        LikeMessage: '',
        page: 1,
        limit: 10
      },
      tableData: [],
      count: 0,
      customColumns: [],
      isShow: true,
      fileName: '日志信息',
      loading: false,
      options: [],
      value: '',
      bank: 0,
      table1: [
        {
          one: '单体过压停机次数',
          two: '电池过压停机次数',
          three: '电池充电过流停机次数',
          four: '单体欠压停机次数',
          five: '电池欠压停机次数',
          six: '电池放电过流停机次数',
          seven: '电池过温停机次数'
        },
        {
          one: '0',
          two: '0',
          three: '0',
          four: '0',
          five: '0',
          six: '0',
          seven: '0'
        },
        {
          one: '电池欠温停机次数',
          two: '单体过压告警次数',
          three: '电池过压告警次数',
          four: '电池充电过流告警次数',
          five: '单体欠压告警次数',
          six: '电池欠压告警次数',
          seven: '电池放电过流告警次数'
        },
        {
          one: '0',
          two: '0',
          three: '0',
          four: '0',
          five: '0',
          six: '0',
          seven: '0'
        },
        {
          one: '电池过温告警次数',
          two: '电池欠温告警次数',
          three: '功率过温停机次数',
          four: '功率过温告警次数',
          five: '单体之间压差过大告警次数',
          six: '单体之间压差过大停机次数',
          seven: '绝缘电阻值过小告警次数'
        },
        {
          one: '0',
          two: '0',
          three: '0',
          four: '0',
          five: '0',
          six: '0',
          seven: '0'
        },
        {
          one: '绝缘电阻值过小停机次数',
          two: '总压差过大告警次数',
          three: '总压差过大停机次数',
          four: '环境温度过高告警次数',
          five: '环境温度过高保护次数',
          six: '环境温度过低告警次数',
          seven: '环境温度过低保护次数'
        }
      ]
    }
  },
  computed: {
    ...mapState('table', ['pageSize'])
  },
  created () {
    this.searchForm.AutoSystemID = localStorage.getItem('AutoSystemID')
    this.searchForm.limit = this.pageSize[0]
    var today = moment()
      .subtract(0, 'days')
      .format('YYYY-MM-DD')
    this.value = [today, today]
    // this.getDevices()
    // this.getData()
    this.$nextTick(() => {
      this.getEcharts()
    })
  },
  methods: {
    // 获取日报信息列表
    getData () {
      this.loading = true
      this.searchForm.Start = moment(this.value[0]).format('YYYY-MM-DD')
      this.searchForm.Stop = moment(this.value[1]).format('YYYY-MM-DD')
      var url = '/api/Log/GetUserLogList'
      this.$axios
        .get(url, { params: this.searchForm })
        .then(res => {
          if (res.data.code === 0) {
            this.tableData = res.data.data
            this.count = res.data.count
            this.loading = false
          } else if (res.data.code === 1) {
            this.$message.error(res.data.msg)
          }
        })
        .catch(err => {
          console.error(err)
        })
    },

    // 获取类型列表
    getDevices () {
      var url = '/api/Log/GetUserType'
      this.$axios
        .get(`${url}?AutoSystemID=${this.searchForm.AutoSystemID}`)
        .then(res => {
          if (res.data.code === 0) {
            this.options = res.data.data
          } else if (res.data.code === 1) {
            this.$message.error(res.data.msg)
          }
        })
        .catch(err => {
          console.error(err)
        })
    },

    // 切换时间
    goOtherDay (time) {
      var num
      switch (time) {
        case 'yesterday':
          num = moment()
            .subtract(1, 'days')
            .format('YYYY-MM-DD')
          break
        case 'week':
          num = moment()
            .subtract(1, 'weeks')
            .format('YYYY-MM-DD')
          break
        case 'month':
          num = moment()
            .subtract(1, 'months')
            .format('YYYY-MM-DD')
          break
      }
      this.value = [num, new Date()]
    },

    tableRowClassName ({ row, rowIndex }) {
      if (rowIndex % 2 === 0) {
        return 'primary-row'
      }
      return ''
    },

    getEcharts () {
      // 第一个图
      var myChart1 = this.$echarts.init(document.getElementById('myChart1'))
      myChart1.setOption({
        title: {
          text: '各簇总电压',
          bottom: 0,
          left: 'center'
        },
        // grid: {
        //   left: '50',
        //   right: '20',
        //   bottom: '40',
        //   containLabel: true
        // },
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line'
        }]
      })

      // 第2个图
      var myChart2 = this.$echarts.init(document.getElementById('myChart2'))
      myChart2.setOption({
        title: {
          text: '各簇单体内阻极值',
          bottom: 0,
          left: 'center'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'bar',
            barGao: '40%',
            name: '1'
          },
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'bar',
            barGao: '40%',
            name: '2'
          }
        ]
      })

      setTimeout(function () {
        window.onresize = function () {
          myChart1.resize()
          myChart2.resize()
        }
      }, 200)
    }
  }
}
</script>

<style scoped>
.wrap-box {
    width: 100%;
    flex-wrap: wrap;
}
.wrap {
    padding: 10px 20px;
}
.wrap .text {
  font-size: 18px;
  font-weight: 800;
  text-align: center;
  line-height: 30px;
}
@media screen and (max-width: 850px) {
  .wrap {
    width: 100%;
  }
}
@media screen and (min-width: 850px) {
  .wrap {
    width: 50%;
  }
}
</style>
