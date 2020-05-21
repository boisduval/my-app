<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>实时告警</span>
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
          :title="$t('alarmRealtime.tableLabel')[0]"
          fixed="left"
        >
        </vxe-table-column>
        <vxe-table-column
          field="LevelMsg"
          :title="$t('alarmRealtime.tableLabel')[1]"
          sortable
          width="150"
          show-overflow
        >
        </vxe-table-column>
        <vxe-table-column
          field="AlarmTitle"
          :title="$t('alarmRealtime.tableLabel')[2]"
          width="250"
        >
        </vxe-table-column>
        <vxe-table-column
          field="Source"
          :title="$t('alarmRealtime.tableLabel')[3]"
          width="250"
        >
        </vxe-table-column>
        <vxe-table-column
          field="TheEffectiveTime"
          :title="$t('alarmRealtime.tableLabel')[4]"
          sortable
          width="200"
        >
        </vxe-table-column>
        <vxe-table-column
          field="CreateDatetime"
          :title="$t('alarmRealtime.tableLabel')[5]"
          sortable
          width="380"
        >
        </vxe-table-column>
        <vxe-table-column
          :title="$t('alarmRealtime.tableLabel')[6]"
          width="200"
          fixed="right"
          align="center"
        >
          <template v-slot="{ row }">
            <el-button plain size="small" @click="toDetail(row)">
              <i class="el-icon-info"
                >&nbsp;{{ $t("alarmRealtime.operationbtn")[0] }}</i
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

      <!-- 详情开始 -->
      <Drawer
        :closable="false"
        v-model="value4"
        :title="$t('alarmRealtime.detail.title')"
        draggable
        width="30"
      >
        <p :style="pStyle">{{ $t("alarmRealtime.detail.label")[0] }}</p>
        <div class="demo-drawer-profile">
          {{ activeItem.Appid }}
        </div>
        <Divider />
        <p :style="pStyle">{{ $t("alarmRealtime.detail.label")[1] }}</p>
        <div class="demo-drawer-profile">
          {{ activeItem.AppName }}
        </div>
        <Divider />
        <p :style="pStyle">{{ $t("alarmRealtime.detail.label")[2] }}</p>
        <div class="demo-drawer-profile">
          {{ activeItem.Source }}
        </div>
        <Divider />
        <p :style="pStyle">{{ $t("alarmRealtime.detail.label")[3] }}</p>
        <div class="demo-drawer-profile">
          {{ activeItem.Alarmid }}
        </div>
        <Divider />
        <p :style="pStyle">{{ $t("alarmRealtime.detail.label")[4] }}</p>
        <div class="demo-drawer-profile">
          {{ activeItem.Level }}
        </div>
        <Divider />
        <p :style="pStyle">{{ $t("alarmRealtime.detail.label")[5] }}</p>
        <div class="demo-drawer-profile">
          {{ activeItem.LevelMsg }}
        </div>
        <Divider />
        <p :style="pStyle">{{ $t("alarmRealtime.detail.label")[6] }}</p>
        <div class="demo-drawer-profile">
          {{ activeItem.AlarmTitle }}
        </div>
        <Divider />
        <p :style="pStyle">{{ $t("alarmRealtime.detail.label")[7] }}</p>
        <div class="demo-drawer-profile">
          {{ activeItem.AlarmMsg }}
        </div>
      </Drawer>
      <!-- 详情结束 -->
    </el-card>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      searchForm: {
        AutoSystemID: '',
        page: 1,
        limit: 10
      },
      tableData: [],
      count: 0,
      customColumns: [],
      isShow: true,
      fileName: 'export',
      loading: false,
      detailData: [],
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
  async created () {
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

    // 获取实时告警列表
    getData () {
      var url = '/api/Alarm/GetRealTimeAlarm'
      this.$axios
        .get(url, { params: this.searchForm })
        .then(res => {
          if (res.data.code === 0) {
            this.tableData = res.data.data
            this.count = res.data.count
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
      console.log(row)
      this.activeItem = row
      this.value4 = true
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
