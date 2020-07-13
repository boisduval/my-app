<template>
  <div>
    <!-- 表单开始 -->
    <el-collapse-transition>
      <div style="box-sizing:border-box;" v-show="isShow">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>{{$t('userlog.searchTitle')}}</span>
          </div>
          <el-form
            :inline="true"
            :model="searchForm"
            class="demo-form-inline"
            label-width="80px"
            label-position="right"
          >
            <el-form-item :label="$t('hardware.formLabel')[0]">
              <el-date-picker
                v-model="value"
                type="daterange"
                :range-separator="$t('base.datePicker.separator')"
                :start-placeholder="$t('base.datePicker.start')"
                :end-placeholder="$t('base.datePicker.end')"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item :label="$t('hardware.formLabel')[1]">
              <el-select v-model="searchForm.LikeType" clearable>
                <el-option
                  v-for="(item, index) in options"
                  :key="index"
                  :value="item"
                  :label="item"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('hardware.formLabel')[2]">
              <el-input
                v-model="searchForm.LikeMessage"
                :placeholder="$t('hardware.placeholder')[2]"
              ></el-input>
            </el-form-item>
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

    <el-card class="box-card visible">
      <div slot="header" class="clearfix">
        <span>{{$t('userlog.listTitle')}}</span>
      </div>

      <!-- 表格开始 -->
      <vxe-toolbar custom print export>
          <template v-slot:buttons>
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
          </template>
        </vxe-toolbar>
      <vxe-table
        :data="tableData"
        border
        :export-config="exportConfig"
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
        <vxe-table-column type="seq" width="50" :title="$t('userlog.tableLabel')[0]" fixed="left">
        </vxe-table-column>
        <vxe-table-column
          field="Type"
          :title="$t('userlog.tableLabel')[1]"
          sortable
          width="150"
          show-overflow
        >
        </vxe-table-column>
        <vxe-table-column field="Index" :title="$t('userlog.tableLabel')[2]" width="150">
        </vxe-table-column>
        <vxe-table-column
          field="LogAddress"
          :title="$t('userlog.tableLabel')[3]"
          sortable
          width="200"
        >
        </vxe-table-column>
        <vxe-table-column field="LogIP" :title="$t('userlog.tableLabel')[4]" sortable width="200">
        </vxe-table-column>
        <vxe-table-column
          field="Msg"
          :title="$t('userlog.tableLabel')[5]"
          sortable
          width="450"
          align="left"
          show-overflow
        >
        </vxe-table-column>
        <vxe-table-column
          field="RecordingTime"
          :title="$t('userlog.tableLabel')[6]"
          sortable
          width="180"
        >
        </vxe-table-column>
        <vxe-table-column :title="$t('userlog.tableLabel')[7]" width="200" fixed="right">
          <template v-slot="{ row }">
            <el-button plain size="small" @click="toDetail(row)">
              <i class="el-icon-info">{{$t('userlog.operation')[0]}}</i>
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
        :title="$t('userlog.dialog.title')"
        draggable
        width="30"
      >
        <p :style="pStyle">{{$t('userlog.dialog.label')[0]}}</p>
        <div class="demo-drawer-profile">
          {{ activeItem.LogType }}
        </div>
        <Divider />
        <p :style="pStyle">{{$t('userlog.dialog.label')[1]}}</p>
        <div class="demo-drawer-profile">
          {{ activeItem.LogIndex }}
        </div>
        <Divider />
        <p :style="pStyle">{{$t('userlog.dialog.label')[2]}}</p>
        <div class="demo-drawer-profile">
          {{ activeItem.LogIP }}
        </div>
        <Divider />
        <p :style="pStyle">{{$t('userlog.dialog.label')[3]}}</p>
        <div class="demo-drawer-profile">
          {{ activeItem.logHostIP }}
        </div>
        <Divider />
        <p :style="pStyle">{{$t('userlog.dialog.label')[4]}}</p>
        <div class="demo-drawer-profile">
          {{ activeItem.RemoteIP }}
        </div>
        <Divider />
        <p :style="pStyle">{{$t('userlog.dialog.label')[5]}}</p>
        <div class="demo-drawer-profile">
          {{ activeItem.ComputerLocation }}
        </div>
        <Divider />
        <p :style="pStyle">{{$t('userlog.dialog.label')[6]}}</p>
        <div class="demo-drawer-profile">
          {{ activeItem.UserHostName }}
        </div>
        <Divider />
        <p :style="pStyle">{{$t('userlog.dialog.label')[7]}}</p>
        <div class="demo-drawer-profile">
          {{ activeItem.UserLanguage }}
        </div>
        <Divider />
        <p :style="pStyle">{{$t('userlog.dialog.label')[8]}}</p>
        <div class="demo-drawer-profile">
          {{ activeItem.Browser }}
        </div>
        <Divider />
        <p :style="pStyle">{{$t('userlog.dialog.label')[9]}}</p>
        <div class="demo-drawer-profile">
          {{ activeItem.BrowserVersion }}
        </div>
        <Divider />
        <p :style="pStyle">{{$t('userlog.dialog.label')[10]}}</p>
        <div class="demo-drawer-profile">
          {{ activeItem.HttpForwardedAddress }}
        </div>
        <Divider />
        <p :style="pStyle">{{$t('userlog.dialog.label')[11]}}</p>
        <div class="demo-drawer-profile">
          {{ activeItem.StartTime }}
        </div>
        <Divider />
        <p :style="pStyle">{{$t('userlog.dialog.label')[12]}}</p>
        <div class="demo-drawer-profile">
          {{ activeItem.StopTime }}
        </div>
        <Divider />
        <p :style="pStyle">{{$t('userlog.dialog.label')[13]}}</p>
        <div class="demo-drawer-profile">
          {{ activeItem.RecordingTime }}
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
        LikeType: '',
        LikeMessage: '',
        page: 1,
        limit: 10
      },
      tableData: [],
      count: 0,
      isShow: true,
      loading: false,
      options: [],
      value: '',
      activeItem: '',
      value4: false,
      pStyle: {
        fontSize: '16px',
        color: 'rgba(0,0,0,0.85)',
        lineHeight: '24px',
        display: 'block',
        marginBottom: '16px'
      },
      exportConfig: {
        filename: 'export',
        sheetName: 'Sheet1',
        types: ['csv', 'xlsx']
      }
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
    this.getUserType()
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
    getUserType () {
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

    // 详情
    toDetail (row) {
      this.getUserLogInfo(row.SystemID)
    },

    // 获取用户日志信息
    getUserLogInfo (SystemID) {
      var url = '/api/Log/GetUserLogInfo'
      this.$axios
        .get(
          `${url}?AutoSystemID=${this.searchForm.AutoSystemID}&LogSystemID=${SystemID}`
        )
        .then(res => {
          if (res.data.code === 0) {
            this.activeItem = res.data.data[0]
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
