<template>
  <div>
    <!-- 表单开始 -->
    <el-collapse-transition>
      <div style="box-sizing:border-box;" v-show="isShow">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>{{ $t("loginLog.searchTitle") }}</span>
          </div>
          <el-form
            :inline="true"
            :model="searchForm"
            class="demo-form-inline"
            label-width="100px"
            label-position="right"
          >
            <el-form-item :label="$t('loginLog.searchForm.label')[0]">
              <el-date-picker
                v-model="value"
                type="daterange"
                :range-separator="$t('base.datePicker.separator')"
                :start-placeholder="$t('base.datePicker.start')"
                :end-placeholder="$t('base.datePicker.end')"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item :label="$t('loginLog.searchForm.label')[1]">
              <el-select v-model="searchForm.UserSystemID">
                <el-option
                  v-for="(item, index) in userList"
                  :key="index"
                  :value="item.SystemID"
                  :label="item.Name"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('loginLog.searchForm.label')[2]">
              <el-input
                v-model="searchForm.HostAddress"
              ></el-input>
            </el-form-item>
            <!-- <br> -->
            <el-form-item>
              <el-button
                type="primary"
                @click="
                  searchForm.page = 1;
                  getData();
                "
                >{{ $t("base.searchbtn") }}</el-button
              >
              <el-button
                type="primary"
                plain
                size="mini"
                style="margin-left:20px;"
                @click="goOtherDay('today')"
                >{{ $t("base.dateGroup.today") }}</el-button
              >
              <el-button
                type="primary"
                plain
                size="mini"
                @click="goOtherDay('two')"
                >{{ $t("base.dateGroup.twoDays") }}</el-button
              >
              <el-button
                type="primary"
                plain
                size="mini"
                @click="goOtherDay('week')"
                >{{ $t("base.dateGroup.week") }}</el-button
              >
              <el-button
                type="primary"
                plain
                size="mini"
                @click="goOtherDay('month')"
                >{{ $t("base.dateGroup.month") }}</el-button
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
        <span>{{ $t("loginLog.listTitle") }}</span>
      </div>

      <!-- 表格操作栏开始 -->
      <div class="table-oper">
        <el-button
          type="primary"
          size="small"
          @click="getData"
          class="button-left"
        >
          <i class="el-icon-refresh-right"></i>
          {{ $t("base.refresh") }}
        </el-button>
        <el-button
          type="primary"
          size="small"
          class="button-left"
          @click="isShow = !isShow"
        >
          <i class="el-icon-search"></i>
          {{ $t("base.search") }}
        </el-button>
        <el-button class="menu-btn">
          <i class="fa fa-list"></i>
        </el-button>
        <div class="menu-wrapper">
          <template v-for="(column, index) in customColumns">
            <vxe-checkbox
              v-if="column.property"
              class="checkbox-item"
              v-model="column.visible"
              :key="index"
              @change="$refs.xTable.refreshColumn()"
              >{{ column.title }}</vxe-checkbox
            >
          </template>
        </div>
        <el-button
          class="menu-btn"
          :title="$t('base.export.title')"
          v-popover:export
        >
          <i class="fa fa-download"></i>
        </el-button>
        <el-button
          class="menu-btn"
          @click="printEvent"
          :title="$t('base.export.print')"
        >
          <i class="fa fa-print"></i>
        </el-button>
        <!-- 导出操作开始 -->
        <el-popover ref="export" placement="bottom" width="100" trigger="hover">
          <ul id="export">
            <li @click="exportDataEvent">
              {{ $t("base.export.csv") }}
            </li>
            <li @click="exportExcel">
              {{ $t("base.export.excel") }}
            </li>
          </ul>
        </el-popover>
        <!-- 导出操作结束 -->
      </div>
      <!-- 表格操作栏结束 -->

      <!-- 表格开始 -->
      <vxe-table
        :data="tableData"
        border
        :customs.sync="customColumns"
        ref="xTable"
        v-loading="loading"
        element-loading-background="rgba(0, 0, 0, 0)"
        :edit-config="{ trigger: 'manual', mode: 'row' }"
        resizable
        align="center"
        highlight-hover-row
        highlight-current-row
      >
        <vxe-table-column
          type="checkbox"
          width="50"
          fixed="left"
        ></vxe-table-column>
        <vxe-table-column type="seq" width="50" :title="$t('loginLog.tableLabel')[0]" fixed="left">
        </vxe-table-column>
        <vxe-table-column
          field="AccountNumber"
          :title="$t('loginLog.tableLabel')[1]"
          sortable
          width="150"
          show-overflow
          show-header-overflow
        >
        </vxe-table-column>
        <vxe-table-column
          field="UserName"
          :title="$t('loginLog.tableLabel')[2]"
          sortable
          width="180"
          show-overflow
          show-header-overflow
        >
        </vxe-table-column>
        <vxe-table-column
          field="NativePlace"
          :title="$t('loginLog.tableLabel')[3]"
          width="180"
          show-overflow
          show-header-overflow
        >
        </vxe-table-column>
        <vxe-table-column
          field="HostIP"
          :title="$t('loginLog.tableLabel')[4]"
          sortable
          width="180"
          show-overflow
          show-header-overflow
        >
        </vxe-table-column>
        <vxe-table-column
          field="ComputerLocation"
          :title="$t('loginLog.tableLabel')[5]"
          width="180"
          show-overflow
          show-header-overflow
        >
        </vxe-table-column>
        <vxe-table-column
          field="Platform"
          :title="$t('loginLog.tableLabel')[6]"
          width="180"
          show-overflow
          show-header-overflow
        >
        </vxe-table-column>
        <vxe-table-column
          field="BrowserType"
          :title="$t('loginLog.tableLabel')[7]"
          width="180"
          show-overflow
          show-header-overflow
        >
        </vxe-table-column>
        <vxe-table-column
          field="WriteTime"
          :title="$t('loginLog.tableLabel')[8]"
          sortable
          width="180"
          show-overflow
          show-header-overflow
        >
        </vxe-table-column>
        <vxe-table-column :title="$t('loginLog.tableLabel')[9]" width="200" fixed="right">
          <template v-slot="{ row }">
            <el-button plain size="small" @click="toDetail(row)">
              <i class="el-icon-info">{{$t('loginLog.operation')[0]}}</i>
            </el-button>
          </template>
        </vxe-table-column>
      </vxe-table>
      <!-- 表格结束 -->

      <!-- 分页开始 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="searchForm.page"
        :page-sizes="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="count"
      >
      </el-pagination>
      <!-- 分页结束 -->

      <!-- 详情开始 -->
      <Drawer
        :closable="false"
        v-model="value4"
        :title="$t('register.dialog.title')"
        draggable
        width="30"
      >
        <div class="block">
          <div class="radio">
            {{ $t("register.dialog.order")[0] }}
            <el-radio-group v-model="reverse">
              <el-radio :label="true">{{
                $t("register.dialog.order")[1]
              }}</el-radio>
              <el-radio :label="false">{{
                $t("register.dialog.order")[2]
              }}</el-radio>
            </el-radio-group>
          </div>

          <el-timeline :reverse="reverse">
            <el-timeline-item
              v-for="(activity, index) in activities"
              :key="index"
              :timestamp="activity.timestamp"
              color="#409EFF"
            >
              [ {{activity.UserAddress}} ]{{activity.Msg}}
            </el-timeline-item>
          </el-timeline>
        </div>
      </Drawer>
      <!-- 详情结束 -->
    </el-card>
  </div>
</template>

<script>
import { mapState } from 'vuex'
let moment = require('moment')
export default {
  data () {
    return {
      isShow: true,
      searchForm: {
        Start: '',
        Stop: '',
        page: 1,
        limit: 10,
        UserSystemID: '',
        HostAddress: ''
      },
      value: '',
      userList: '',
      tableData: [],
      count: 0,
      customColumns: [],
      fileName: 'export',
      loading: false,
      options: [],
      value4: false,
      activities: '',
      pStyle: {
        fontSize: '14px',
        color: 'rgba(0,0,0,0.85)',
        lineHeight: '24px',
        display: 'block',
        marginBottom: '16px'
      },
      reverse: false
    }
  },
  methods: {
    // 每页显示多少条
    handleSizeChange (val) {
      this.searchForm.limit = val
      this.getData()
    },

    // 当前页
    handleCurrentChange (val) {
      this.searchForm.page = val
      this.getData()
    },

    // 打印
    printEvent () {
      this.$refs.xTable.print()
    },

    // 导出csv
    exportDataEvent () {
      this.$refs.xTable.exportData({ type: 'csv' })
    },

    // 导出excel
    exportExcel () {
      this.listHead = []
      this.listFilter = []
      for (var i = 2; i < this.customColumns.length; i++) {
        if (this.customColumns[i].visible) {
          this.listFilter.push(this.customColumns[i].property)
          this.listHead.push(this.customColumns[i].title)
        }
      }
      require.ensure([], () => {
        const { export_json_to_excel } = require("@/excel/Export2Excel"); // eslint-disable-line
        const tHeader = this.listHead
        // 上面设置Excel的表格第一行的标题
        const filterVal = this.listFilter
        // 上面的index、nickName、name是tableData里对象的属性
        const list = this.tableData // 把data里的tableData存到list
        const data = this.formatJson(filterVal, list)
        export_json_to_excel(tHeader, data, `${this.fileName}`)
      })
    },
    formatJson (filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    },
    getUserList () {
      return new Promise((resolve, reject) => {
        var AutoSystemID = localStorage.getItem('AutoSystemID')
        this.$axios
          .get(`/api/Users/GetUserNames?AutoSystemID=${AutoSystemID}`)
          .then(res => {
            if (res.status === 200) {
              if (res.data.code === 0) {
                console.log(res.data.data)
                this.userList = res.data.data
                this.searchForm.UserSystemID = this.userList[0].SystemID
                resolve(res.data.data)
              } else {
                resolve()
              }
            }
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    getData () {
      this.loading = true
      this.searchForm.Start = moment(this.value[0]).format('YYYY-MM-DD')
      this.searchForm.Stop = moment(this.value[1]).format('YYYY-MM-DD')
      var url = '/api/Users/GetUserLogins'
      this.$axios
        .get(url, { params: this.searchForm })
        .then(res => {
          if (res.data.code === 0) {
            this.tableData = res.data.data
            this.count = res.data.count
            this.loading = false
          } else if (res.data.code === 1) {
            this.$message.error(res.data.msg)
            this.loading = false
          }
        })
        .catch(err => {
          console.error(err)
        })
    },
    toDetail (row) {
      this.value4 = true
      var id = row.AutoSystemID
      this.activities = []
      this.$axios
        .get(`/api/Users/GetUserOperatingRecords?AutoSystemID=${this.searchForm.AutoSystemID}&ORASystemID=${id}`)
        .then(res => {
          if (res.data.code === 0) {
            console.log(res.data.data)
            let data = res.data.data
            data.map(item => {
              this.activities.push({
                timestamp: item.OperTime,
                UserAddress: item.UserAddress,
                Msg: item.Msg
              })
            })
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
        case 'today':
          num = moment()
            .subtract(0, 'days')
            .format('YYYY-MM-DD')
          break
        case 'two':
          num = moment()
            .subtract(2, 'days')
            .format('YYYY-MM-DD')
          console.log(num)
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
    }
  },
  created () {
    this.searchForm.AutoSystemID = localStorage.getItem('AutoSystemID')
    this.searchForm.limit = this.pageSize[0]
    var today = moment()
      .subtract(0, 'days')
      .format('YYYY-MM-DD')
    this.value = [today, today]
    this.getUserList().then(res => {
      return this.getData()
    })
  },
  computed: {
    ...mapState('table', ['pageSize'])
  }
}
</script>

<style scoped>
ul {
  margin-top: 20px;
}</style>
