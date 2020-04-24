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
        <span>电池总览</span>
      </div>
      <div class="wrap-box flex-row">
          <div class="wrap">
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
            <div style="padding: 0 20px">
              <el-table
                :show-header="false"
                :data="table2"
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
          <div class="wrap">
            <div id="myChart3" style="height:350px;padding: 0 20px"></div>
          </div>
          <div class="wrap">
            <div style="height:350px;padding: 0 20px" class="flex-column">
                <div class="flex flex-column" style="justify-content: flex-end;padding-bottom: 40px;">
                  <div style="padding: 0 20px">
                    <el-table
                      :show-header="false"
                      :data="table2"
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
                    </el-table>
                  </div>
                </div>
                <div class="text">
                  各簇断路器反馈状态
                </div>
            </div>
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
          one: '第一簇总压',
          two: '第二簇总压',
          three: '第三簇总压',
          four: '第四簇总压',
          five: '第五簇总压',
          six: '第六簇总压',
          seven: '电池总压'
        },
        {
          one: '48.5V',
          two: '48.5V',
          three: '48.5V',
          four: '48.5V',
          five: '48.5V',
          six: '48.5V',
          seven: '48V'
        },
        {
          one: '第七簇总压',
          two: '第八簇总压',
          three: '第九簇总压',
          four: '第十簇总压',
          five: '第十一簇总压',
          six: '第十二簇总压',
          seven: 'SOC'
        },
        {
          one: '48.5V',
          two: '48.5V',
          three: '48.5V',
          four: '48.5V',
          five: '48.5V',
          six: '48.5V',
          seven: '48V'
        }
      ],
      table2: [
        {
          one: '第一簇总流',
          two: '第二簇总流',
          three: '第三簇总流',
          four: '第四簇总流',
          five: '第五簇总流',
          six: '第六簇总流',
          seven: '电池总流'
        },
        {
          one: '15.3A',
          two: '15.3A',
          three: '15.3A',
          four: '15.3A',
          five: '15.3A',
          six: '15.3A',
          seven: '48A'
        },
        {
          one: '第七簇总流',
          two: '第八簇总流',
          three: '第九簇总流',
          four: '第十簇总流',
          five: '第十一簇总流',
          six: '第十二簇总流',
          seven: 'SOC'
        },
        {
          one: '15.3A',
          two: '15.3A',
          three: '15.3A',
          four: '15.3A',
          five: '15.3A',
          six: '15.3A',
          seven: '48A'
        }
      ],
      table3: [
        {
          one: '第一簇断路器状态',
          two: '第二簇断路器状态',
          three: '第三簇断路器状态',
          four: '第四簇断路器状态',
          five: '第五簇断路器状态',
          six: '第六簇断路器状态'
        },
        {
          one: '闭合',
          two: '闭合',
          three: '闭合',
          four: '闭合',
          five: '闭合',
          six: '闭合'
        },
        {
          one: '第七簇断路器状态',
          two: '第八簇断路器状态',
          three: '第九簇断路器状态',
          four: '第十簇断路器状态',
          five: '第十一簇断路器状态',
          six: '第十二簇断路器状态'
        },
        {
          one: '闭合',
          two: '闭合',
          three: '闭合',
          four: '闭合',
          five: '闭合',
          six: '闭合'
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
          text: '各簇总电流',
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

      // 第3个图
      var myChart3 = this.$echarts.init(document.getElementById('myChart3'))
      myChart3.setOption({
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
          myChart3.resize()
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
@media screen and (max-width: 800px) {
  .wrap {
    width: 100%;
  }
}
@media screen and (min-width: 800px) {
  .wrap {
    width: 50%;
  }
}
</style>
