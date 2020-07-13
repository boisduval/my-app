<template>
  <div>
    <!-- 表单开始 -->
    <el-collapse-transition>
      <div style="box-sizing:border-box;" v-show="isShow">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>{{ $t("exception.searchTitle") }}</span>
          </div>
          <el-form
            :inline="true"
            :model="searchForm"
            class="demo-form-inline"
            label-width="80px"
            label-position="right"
          >
            <el-form-item :label="$t('exception.formLabel')[0]">
              <el-date-picker
                v-model="value"
                type="daterange"
                :range-separator="$t('base.datePicker.separator')"
                :start-placeholder="$t('base.datePicker.start')"
                :end-placeholder="$t('base.datePicker.end')"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item :label="$t('exception.formLabel')[1]">
              <el-input
                v-model="searchForm.LikeType"
                :placeholder="$t('exception.placeholder')[1]"
              ></el-input>
            </el-form-item>
            <el-form-item :label="$t('exception.formLabel')[2]">
              <el-input
                v-model="searchForm.LikeMessage"
                :placeholder="$t('exception.placeholder')[2]"
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
        <span>{{ $t("exception.listTitle") }}</span>
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
        <vxe-table-column
          type="seq"
          width="50"
          :title="$t('exception.tableLabel')[0]"
          fixed="left"
        >
        </vxe-table-column>
        <vxe-table-column
          field="ExcName"
          :title="$t('exception.tableLabel')[1]"
          sortable
          width="120"
          show-overflow
          show-header-overflow
        >
        </vxe-table-column>
        <vxe-table-column
          field="RecordingTime"
          :title="$t('exception.tableLabel')[2]"
          sortable
          width="180"
          show-overflow
          show-header-overflow
        >
        </vxe-table-column>
        <vxe-table-column
          field="TargetSite"
          :title="$t('exception.tableLabel')[3]"
          show-overflow
          width="150"
          show-header-overflow
        >
        </vxe-table-column>
        <vxe-table-column
          field="ExcResult"
          :title="$t('exception.tableLabel')[4]"
          sortable
          width="120"
          show-overflow
          show-header-overflow
        >
        </vxe-table-column>
        <vxe-table-column
          field="Msg"
          :title="$t('exception.tableLabel')[5]"
          show-overflow
          show-header-overflow
          width="615"
          align="left"
        >
        </vxe-table-column>
        <vxe-table-column
          field="WriteTime"
          :title="$t('exception.tableLabel')[6]"
          sortable
          width="200"
          show-overflow
          show-header-overflow
        >
        </vxe-table-column>
        <vxe-table-column
          :title="$t('exception.tableLabel')[7]"
          width="200"
          fixed="right"
        >
          <template v-slot="{ row }">
            <el-button plain size="small" @click="toDetail(row)">
              <i class="el-icon-info">{{$t('exception.operation')[0]}}</i>
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
        :title="$t('exception.dialog.title')"
        draggable
        width="50"
      >
        <p :style="pStyle">{{$t('exception.dialog.label')[0]}}</p>
        <div class="demo-drawer-profile">
          {{ activeItem.SystemName }}
        </div>
        <Divider />
        <p :style="pStyle">{{$t('exception.dialog.label')[1]}}</p>
        <div class="demo-drawer-profile">
          {{ activeItem.Source }}
        </div>
        <Divider />
        <p :style="pStyle">{{$t('exception.dialog.label')[2]}}</p>
        <div class="demo-drawer-profile">
          {{ activeItem.HelpLink }}
        </div>
        <Divider />
        <p :style="pStyle">{{$t('exception.dialog.label')[3]}}</p>
        <div class="demo-drawer-profile" v-html="activeItem.StackTrace"></div>
        <Divider />
        <p :style="pStyle">{{$t('exception.dialog.label')[4]}}</p>
        <div class="demo-drawer-profile">
          {{ activeItem.TargetSite }}
        </div>
        <Divider />
        <p :style="pStyle">{{$t('exception.dialog.label')[5]}}</p>
        <div class="demo-drawer-profile">
          {{ activeItem.Message }}
        </div>
        <Divider />
        <p :style="pStyle">{{$t('exception.dialog.label')[6]}}</p>
        <div class="demo-drawer-profile">
          {{ activeItem.HResult }}
        </div>
        <Divider />
        <p :style="pStyle">{{$t('exception.dialog.label')[7]}}</p>
        <div class="demo-drawer-profile">
          {{ activeItem.WriteTime }}
        </div>
        <Divider />
        <p :style="pStyle">{{$t('exception.dialog.label')[8]}}</p>
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
      dialogFormVisible: false,
      value: '',
      detailData: [],
      activeItem: {},
      value4: false,
      pStyle: {
        fontSize: '14px',
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
      var url = '/api/Log/GetExceptionLogList'
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

    toDetail (row) {
      var url = '/api/Log/GetExceptionLogInfo'
      this.$axios
        .get(url, {
          params: {
            AutoSystemID: this.searchForm.AutoSystemID,
            LogSystemID: row.SystemID
          }
        })
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
