<template>
  <div>
    <!-- 表单开始 -->
    <el-collapse-transition>
      <div style="box-sizing:border-box;" v-show="isShow">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>{{ $t("deviceParams.top.title") }}</span>
          </div>
          <el-form
            :inline="true"
            :model="searchForm"
            class="demo-form-inline"
            label-width="100px"
            label-position="right"
          >
            <el-form-item :label="$t('deviceParams.top.lableList')[0]">
              <el-input
                v-model="searchForm.ICCID"
                :placeholder="$t('deviceParams.top.placeholderList')[0]"
              ></el-input>
            </el-form-item>
            <el-form-item :label="$t('deviceParams.top.lableList')[1]">
              <el-input
                v-model="searchForm.IDS"
                :placeholder="$t('deviceParams.top.placeholderList')[1]"
              ></el-input>
            </el-form-item>
            <el-form-item :label="$t('deviceParams.top.lableList')[2]">
              <el-input
                v-model="searchForm.VIN"
                :placeholder="$t('deviceParams.top.placeholderList')[2]"
              ></el-input>
            </el-form-item>
            <el-form-item :label="$t('deviceParams.top.lableList')[3]">
              <el-input
                v-model="searchForm.Name"
                :placeholder="$t('deviceParams.top.placeholderList')[3]"
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
                >{{ $t("deviceParams.top.search") }}</el-button
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
        <span>{{$t('deviceParams.listTitle')}}</span>
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
        highlight-hover-row
        highlight-current-row
      >
        <vxe-table-column
          type="checkbox"
          width="50"
          fixed="left"
          align="center"
        ></vxe-table-column>
        <vxe-table-column
          type="seq"
          width="50"
          :title="$t('deviceParams.tableLabel')[0]"
          fixed="left"
          align="center"
        >
        </vxe-table-column>
        <vxe-table-column
          field="DICCID"
          :title="$t('deviceParams.tableLabel')[1]"
          sortable
          width="250"
          show-overflow
          show-header-overflow
        >
        </vxe-table-column>
        <vxe-table-column
          field="DIDS"
          :title="$t('deviceParams.tableLabel')[2]"
          sortable
          width="250"
          show-overflow
          show-header-overflow
        >
        </vxe-table-column>
        <vxe-table-column
          field="DVIN"
          :title="$t('deviceParams.tableLabel')[3]"
          sortable
          width="250"
          show-overflow
          show-header-overflow
        >
        </vxe-table-column>
        <vxe-table-column
          field="DName"
          :title="$t('deviceParams.tableLabel')[4]"
          sortable
          width="150"
          show-overflow
          show-header-overflow
        >
        </vxe-table-column>
        <vxe-table-column
          field="DManageMentUserName"
          :title="$t('deviceParams.tableLabel')[5]"
          sortable
          width="150"
          align="left"
          show-overflow
          show-header-overflow
        >
        </vxe-table-column>
        <vxe-table-column
          field="DTime"
          :title="$t('deviceParams.tableLabel')[6]"
          sortable
          width="180"
          align="center"
          show-overflow
          show-header-overflow
        >
        </vxe-table-column>
        <vxe-table-column
          :title="$t('deviceParams.tableLabel')[7]"
          width="300"
          align="center"
          show-header-overflow
        >
          <template v-slot="{ row }">
            <el-button plain size="small" @click="updateSystemTime(row)">
              {{$t('deviceParams.operation')[0]}}
            </el-button>
            <el-button plain size="small" @click="DMSReset(row)">
              {{$t('deviceParams.operation')[1]}}
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
    </el-card>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      searchForm: {
        page: 1,
        limit: 2,
        ICCID: '',
        IDS: '',
        VIN: '',
        Name: '',
        AutoSystemID: ''
      },
      tableData: [],
      customColumns: [],
      isShow: true,
      fileName: 'export',
      count: 0,
      loading: false
    }
  },
  computed: {
    ...mapState('table', ['pageSize'])
  },
  methods: {
    getData () {
      this.loading = true
      this.searchForm.AutoSystemID = localStorage.getItem('AutoSystemID')
      this.$axios
        .get(
          `/api/Devices/GetRegistrationEquipmentList?AutoSystemID=${this.searchForm.AutoSystemID}&page=${this.searchForm.page}&limit=${this.searchForm.limit}&ICCID=${this.searchForm.ICCID}&IDS=${this.searchForm.IDS}&VIN=${this.searchForm.VIN}&Name=${this.searchForm.Name}`
        )
        .then(res => {
          if (res.data.data) {
            this.tableData = res.data.data
          } else {
            this.tableData = []
          }
          this.count = res.data.count
          this.loading = false
          this.$refs.xTable.reloadCustoms([])
        })
        .catch(error => {
          console.log(error)
        })
    },

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

    // 更新系统时间
    updateSystemTime (row) {
      this.$confirm(this.$t('deviceParams.tips')[0], this.$t('deviceParams.tip'), {
        confirmButtonText: this.$t('deviceParams.yes'),
        cancelButtonText: this.$t('deviceParams.no'),
        type: 'warning'
      })
        .then(() => {
          console.log(row)
          var url = '/api/Command/DMSSetSystemTime'
          var obj = {
            AutoSystemID: this.searchForm.AutoSystemID,
            data: {
              Address: 0,
              IDS: row.DICCID,
              Data: [0]
            }
          }
          this.$axios
            .post(url, obj)
            .then(res => {
              if (res.data.code === 0) {
                this.$message.success(res.data.msg)
              } else if (res.data.code === 1) {
                this.$message.error(res.data.msg)
              }
            })
            .catch(err => {
              console.error(err)
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: this.$t('deviceParams.cancel')
          })
        })
    },

    // 设备软重启
    DMSReset (row) {
      this.$confirm(this.$t('deviceParams.tips')[1], this.$t('deviceParams.tip'), {
        confirmButtonText: this.$t('deviceParams.yes'),
        cancelButtonText: this.$t('deviceParams.no'),
        type: 'warning'
      })
        .then(() => {
          var url = '/api/Command/DMSReset'
          var obj = {
            AutoSystemID: this.searchForm.AutoSystemID,
            data: {
              Address: 0,
              IDS: row.DICCID,
              Data: [0]
            }
          }
          this.$axios
            .post(url, obj)
            .then(res => {
              if (res.data.code === 0) {
                this.$message.success(res.data.msg)
              } else if (res.data.code === 1) {
                this.$message.error(res.data.msg)
              }
            })
            .catch(err => {
              console.error(err)
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: this.$t('deviceParams.cancel')
          })
        })
    }
  },
  created () {
    this.searchForm.limit = this.pageSize[0]
    this.getData()
  }
}
</script>

<style scoped>
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  line-height: 10px;
  font-size: 15px;
  text-align: left;
  /* margin-bottom: 20px; */
  box-sizing: border-box;
}

.el-pagination {
  margin-top: 10px;
}

.table-oper {
  height: 40px;
  /* width: 100%; */
}
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

.menu-btn:focus,
.menu-btn:active {
  color: #606266;
  border-color: #dcdfe6;
  background-color: #fff;
}

#export {
  list-style: none;
  padding: 0;
  margin: 0;
  padding: 10px 0;
}

#export li {
  line-height: 30px;
  height: 30px;
  cursor: pointer;
  padding: 0 10px;
}

#export li:hover {
  background-color: #f2f2f2;
}
</style>
