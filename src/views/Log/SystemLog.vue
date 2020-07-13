<template>
  <div>
    <!-- 表单开始 -->
    <el-collapse-transition>
      <div style="box-sizing:border-box;" v-show="isShow">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>{{ $t("systemLog.searchTitle") }}</span>
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
        <span>{{ $t("systemLog.listTitle") }}</span>
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
          :title="$t('systemLog.tableLabel')[0]"
          fixed="left"
        >
        </vxe-table-column>
        <vxe-table-column
          field="Type"
          :title="$t('systemLog.tableLabel')[1]"
          sortable
          width="150"
          show-header-overflow
          show-overflow
        >
        </vxe-table-column>
        <vxe-table-column
          field="Msg"
          :title="$t('systemLog.tableLabel')[2]"
          show-header-overflow
          show-overflow
          align="left"
        >
        </vxe-table-column>
        <vxe-table-column
          field="RecordingTime"
          :title="$t('systemLog.tableLabel')[3]"
          sortable
          width="200"
          align="left"
          show-header-overflow
          show-overflow
        >
        </vxe-table-column>
        <vxe-table-column
          field="WriteTime"
          :title="$t('systemLog.tableLabel')[4]"
          sortable
          width="200"
          align="left"
          show-header-overflow
          show-overflow
        >
        </vxe-table-column>
        <vxe-table-column
          field="Parameter"
          :title="$t('systemLog.tableLabel')[5]"
          width="200"
          align="left"
          show-header-overflow
          show-overflow
        >
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

      <!-- 详情Dialog开始 -->
      <el-dialog
        width="50%"
        :close-on-click-modal="false"
        :visible.sync="dialogFormVisible"
        title="用户日志"
      >
        <vxe-table stripe :data="detailData" border>
          <vxe-table-column field="label1" title="参数"></vxe-table-column>
          <vxe-table-column field="value1" title="值"></vxe-table-column>
          <vxe-table-column field="label2" title="参数"></vxe-table-column>
          <vxe-table-column field="value2" title="值"></vxe-table-column>
        </vxe-table>
        <div slot="footer" class="dialog-footer">
          <el-button
            @click="dialogFormVisible = false"
            size="medium"
            type="primary"
            >确 定</el-button
          >
        </div>
      </el-dialog>
      <!-- 详情Dialog结束 -->
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
      options: [],
      value: '',
      detailData: [],
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
      var url = '/api/Log/GetSysLogList'
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
      var url = '/api/Log/GetSysType'
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
