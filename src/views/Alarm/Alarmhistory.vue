<template>
  <div>
    <!-- 表单开始 -->
    <el-collapse-transition>
      <div style="box-sizing:border-box;" v-show="isShow">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>{{ $t('alarmHistory.searchTitle') }}</span>
          </div>
          <el-form
            :inline="true"
            :model="searchForm"
            class="demo-form-inline"
            label-width="80px"
            label-position="right"
          >
            <el-form-item :label="$t('alarmHistory.searchForm.label')[0]">
              <el-date-picker
                v-model="value"
                type="daterange"
                :range-separator="$t('base.datePicker.separator')"
                :start-placeholder="$t('base.datePicker.start')"
                :end-placeholder="$t('base.datePicker.end')"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item :label="$t('alarmHistory.searchForm.label')[1]">
              <el-select v-model="searchForm.Affirm">
                <el-option
                  v-for="(item, index) in options"
                  :key="index"
                  :value="item.value"
                  :label="item.label"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('alarmHistory.searchForm.label')[2]">
              <el-input
                v-model="searchForm.LikeMessage"
                :placeholder="$t('alarmHistory.searchForm.placeholder')[2]"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                @click="
                  searchForm.page = 1;
                  getData();
                "
                >{{ $t('base.searchbtn') }}</el-button
              >
              <el-button
                type="primary"
                plain
                size="mini"
                style="margin-left:20px;"
                @click="goOtherDay('today')"
                >{{ $t('base.dateGroup.today') }}</el-button
              >
              <el-button
                type="primary"
                plain
                size="mini"
                @click="goOtherDay('two')"
                >{{ $t('base.dateGroup.twoDays') }}</el-button
              >
              <el-button
                type="primary"
                plain
                size="mini"
                @click="goOtherDay('week')"
                >{{ $t('base.dateGroup.week') }}</el-button
              >
              <el-button
                type="primary"
                plain
                size="mini"
                @click="goOtherDay('month')"
                >{{ $t('base.dateGroup.month') }}</el-button
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
        <span>{{ $t("alarmHistory.listTitle") }}</span>
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
        <vxe-table-column
          type="seq"
          width="50"
          :title="$t('alarmHistory.tableLabel')[0]"
          fixed="left"
        >
        </vxe-table-column>
        <vxe-table-column
          field="Level"
          :title="$t('alarmHistory.tableLabel')[1]"
          sortable
          width="120"
          show-overflow
          show-header-overflow
        >
        </vxe-table-column>
        <vxe-table-column
          field="Type"
          :title="$t('alarmHistory.tableLabel')[2]"
          width="130"
          sortable
          show-overflow
          show-header-overflow
        >
        </vxe-table-column>
        <vxe-table-column
          field="Name"
          :title="$t('alarmHistory.tableLabel')[3]"
          sortable
          width="140"
          show-overflow
          show-header-overflow
        >
        </vxe-table-column>
        <vxe-table-column
          field="Msg"
          :title="$t('alarmHistory.tableLabel')[4]"
          width="420"
          align="left"
          show-overflow
          show-header-overflow
        >
        </vxe-table-column>
        <!-- <vxe-table-column field="Msg" title="日志信息" sortable width="450" align="left">
        </vxe-table-column> -->
        <vxe-table-column
          field="WriteTime"
          :title="$t('alarmHistory.tableLabel')[5]"
          sortable
          width="180"
          show-overflow
          show-header-overflow
        >
        </vxe-table-column>
        <vxe-table-column
          field="OverTime"
          :title="$t('alarmHistory.tableLabel')[6]"
          sortable
          width="180"
          show-overflow
          show-header-overflow
        >
        </vxe-table-column>
        <vxe-table-column
          :title="$t('alarmHistory.tableLabel')[7]"
          width="330"
          fixed="right"
        >
          <template v-slot="{ row }">
            <el-button plain size="mini" @click="toDetail(row)">
              <i class="el-icon-info"
                >&nbsp;{{ $t("alarmHistory.operationbtn")[0] }}</i
              >
            </el-button>
            <el-button
              type="danger"
              size="mini"
              @click="showCheckDialog(row)"
              :disabled="row.OverTime >= '2001/1/1 0:00:00'"
            >
              <i class="el-icon-circle-check"
                >&nbsp;{{ $t("alarmHistory.operationbtn")[1] }}</i
              >
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

      <!--  确认报警Dialog开始 -->
      <el-dialog
        width="40%"
        :close-on-click-modal="false"
        :visible.sync="dialogFormCheckVisible"
        :title="$t('alarmHistory.dialog.title')"
      >
        <el-form label-width="90px" label-position="right" :model="checkForm">
          <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
            <el-form-item :label="$t('alarmHistory.dialog.formLabel')[0]">
              <el-input :readonly="true" v-model="checkForm.Level"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
            <el-form-item :label="$t('alarmHistory.dialog.formLabel')[1]">
              <el-input :readonly="true" v-model="checkForm.Type"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
            <el-form-item :label="$t('alarmHistory.dialog.formLabel')[2]">
              <el-input
                :readonly="true"
                v-model="checkForm.WriteTime"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
            <el-form-item :label="$t('alarmHistory.dialog.formLabel')[3]">
              <el-input :readonly="true" v-model="checkForm.Name"></el-input>
            </el-form-item>
          </el-col>
          <el-form-item :label="$t('alarmHistory.dialog.formLabel')[4]">
            <el-input
              type="textarea"
              v-model="checkList.AlarmOverInfo"
              :placeholder="$t('alarmHistory.dialog.formPlaceholder')"
              :autosize="{ minRows: 4, maxRows: 8 }"
            ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button
            @click="
              checkList.AlarmOverInfo = $t('alarmHistory.dialog.default.msg')
            "
            size="medium"
            type="primary"
          >
            {{ $t("alarmHistory.dialog.default.btn") }}
          </el-button>
          <el-button @click="setAlarmOver" size="medium" type="primary">
            {{ $t("base.submit") }}
          </el-button>
          <el-button @click="dialogFormCheckVisible = false" size="medium">
            {{ $t("base.cancel") }}
          </el-button>
        </div>
      </el-dialog>
      <!--  确认报警Dialog结束 -->

      <!-- 详情开始 -->
      <Drawer
        :closable="false"
        v-model="value4"
        title="告警详情"
        draggable
        width="30"
      >
        <p :style="pStyle">{{ $t("alarmHistory.detail.label")[0] }}</p>
        <div class="demo-drawer-profile">
          {{ activeItem.Level }}
        </div>
        <Divider />
        <p :style="pStyle">{{ $t("alarmHistory.detail.label")[1] }}</p>
        <div class="demo-drawer-profile">
          {{ activeItem.Type }}
        </div>
        <Divider />
        <p :style="pStyle">{{ $t("alarmHistory.detail.label")[2] }}</p>
        <div class="demo-drawer-profile">
          {{ activeItem.ASource }}
        </div>
        <Divider />
        <p :style="pStyle">{{ $t("alarmHistory.detail.label")[3] }}</p>
        <div class="demo-drawer-profile">
          {{ activeItem.Name }}
        </div>
        <Divider />
        <p :style="pStyle">{{ $t("alarmHistory.detail.label")[4] }}</p>
        <div class="demo-drawer-profile">
          {{ activeItem.Msg }}
        </div>
        <Divider />
        <p :style="pStyle">{{ $t("alarmHistory.detail.label")[5] }}</p>
        <div class="demo-drawer-profile">
          {{ activeItem.OverAccountNumber }}
        </div>
        <Divider />
        <p :style="pStyle">{{ $t("alarmHistory.detail.label")[6] }}</p>
        <div class="demo-drawer-profile">
          {{ activeItem.OverUserName }}
        </div>
        <Divider />
        <p :style="pStyle">{{ $t("alarmHistory.detail.label")[7] }}</p>
        <div class="demo-drawer-profile">
          {{ activeItem.OverMsg }}
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
      searchForm: {
        AutoSystemID: '',
        Start: '',
        Stop: '',
        Affirm: '100',
        LikeMessage: '',
        page: 1,
        limit: 10
      },
      tableData: [],
      count: 0,
      customColumns: [],
      isShow: true,
      fileName: 'export',
      loading: false,
      dialogFormVisible: false,
      options: [
        {
          label: this.$t('alarmHistory.detail.options')[0],
          value: '100'
        },
        {
          label: this.$t('alarmHistory.detail.options')[1],
          value: '1'
        },
        {
          label: this.$t('alarmHistory.detail.options')[2],
          value: '0'
        }
      ],
      value: '',
      detailData: [],
      dialogFormCheckVisible: false,
      checkList: {
        AlarmOverInfo: '',
        AlarmSystemID: '',
        AutoSystemID: ''
      },
      checkForm: {
        Level: '',
        Type: '',
        WriteTime: '',
        Name: ''
      },
      activeItem: '',
      value4: false,
      pStyle: {
        fontSize: '16px',
        color: 'rgba(0,0,0,0.85)',
        lineHeight: '24px',
        display: 'block',
        marginBottom: '16px'
      }
    }
  },
  computed: {
    ...mapState('table', ['pageSize'])
  },
  created () {
    var today = moment()
      .subtract(0, 'days')
      .format('YYYY-MM-DD')
    this.value = [today, today]
    this.searchForm.AutoSystemID = localStorage.getItem('AutoSystemID')
    this.searchForm.limit = this.pageSize[0]
    this.getData()
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

    // 获取日报信息列表
    getData () {
      this.loading = true
      this.searchForm.Start = moment(this.value[0]).format('YYYY-MM-DD')
      this.searchForm.Stop = moment(this.value[1]).format('YYYY-MM-DD')
      var url = '/api/Alarm/GetAlarmhistory'
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

    // 详情
    toDetail (row) {
      this.getAlarmhistoryInfo(row.SystemID)
    },

    // 获取用户日志信息
    getAlarmhistoryInfo (SystemID) {
      var url = '/api/Alarm/GetAlarmhistoryInfo'
      this.$axios
        .get(
          `${url}?AutoSystemID=${this.searchForm.AutoSystemID}&SystemID=${SystemID}`
        )
        .then(res => {
          if (res.data.code === 0) {
            this.activeItem = res.data.data
            this.value4 = true
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
    },

    // 告警确认
    showCheckDialog (row) {
      this.checkForm.Level = row.Level
      this.checkForm.Name = row.Name
      this.checkForm.Type = row.Type
      this.checkForm.WriteTime = row.WriteTime
      this.checkList.AutoSystemID = this.searchForm.AutoSystemID
      this.checkList.AlarmSystemID = row.SystemID
      this.dialogFormCheckVisible = true
    },

    // 提交确认信息
    setAlarmOver () {
      var url = '/api/Alarm/SetAlarmOver'
      this.$axios
        .post(url, this.checkList)
        .then(res => {
          if (res.data.code === 0) {
            this.$message.success(res.data.msg)
            this.dialogFormCheckVisible = false
            this.getData()
          } else if (res.data.code === 1) {
            this.$message.error(res.data.msg)
          }
        })
        .catch(err => {
          console.error(err)
        })
    }
  }
}
</script>

<style scoped>
.menu-btn {
  position: relative;
  /* width: 25px;
  height: 25px; */
  float: right;
}

.button-left {
  float: left;
}

.menu-btn:hover + .menu-wrapper {
  display: block;
}
.menu-wrapper:hover {
  display: block;
}
.table-oper {
  position: relative;
}

.menu-wrapper {
  display: none;
  position: absolute;
  width: 150px;
  top: 16px;
  right: 0;
  z-index: 9;
  background-color: #fff;
  font-size: 14px;
  padding: 4px 10px;
  user-select: none;
  border: 1px solid #e8eaec;
  text-align: left;
}

.checkbox-item {
  display: block;
  margin: 4px 0;
}

.icon-menu {
  width: 16px;
  height: 0px;
  display: inline-block;
  margin-bottom: 16px;
  box-shadow: 0 6px 0 2px #606266, 0 0 0 2px #606266, 0 12px 0 2px #606266;
}

.table-oper .el-button {
  padding: 8px 10px;
  margin-left: 5px;
}

.menu-btn:focus,
.menu-btn:active {
  color: #606266;
  border-color: #dcdfe6;
  background-color: #fff;
}
</style>
