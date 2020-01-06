<template>
  <div>
    <!-- 表单开始 -->
    <el-collapse-transition>
      <div style="box-sizing:border-box;" v-show="isShow">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>电价列表查询</span>
          </div>
          <el-form
            :inline="true"
            :model="searchForm"
            class="demo-form-inline"
            label-width="80px"
            label-position="right"
          >
            <el-form-item label="电价名称:">
              <el-input
                v-model="searchForm.LikeName"
                placeholder="请输入电价名称"
              ></el-input>
            </el-form-item>
            <el-form-item label="时令信息:">
              <el-select v-model="searchForm.Summer">
                <el-option
                  v-for="(item, index) in options1"
                  :key="index"
                  :value="item.value"
                  :label="item.label"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="平高峰:">
              <el-select v-model="searchForm.Climax">
                <el-option
                  v-for="(item, index) in options2"
                  :key="index"
                  :value="item.value"
                  :label="item.label"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                @click="
                  searchForm.page = 1;
                  getData();
                "
                >查询</el-button
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
        <span>电价表</span>
      </div>

      <!-- 表格操作栏开始 -->
      <div class="table-oper">
        <el-button
          type="primary"
          size="small"
          @click="addItem"
          class="button-left"
        >
          <i class="el-icon-plus"></i>
          添加
        </el-button>
        <el-button
          type="primary"
          size="small"
          @click="getData"
          class="button-left"
        >
          <i class="el-icon-refresh-right"></i>
          刷新
        </el-button>
        <el-button
          type="primary"
          size="small"
          class="button-left"
          @click="isShow = !isShow"
        >
          <i class="el-icon-search"></i>
          模糊查询
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
        <el-button class="menu-btn" title="导出" v-popover:export>
          <i class="fa fa-download"></i>
        </el-button>
        <el-button class="menu-btn" @click="printEvent" title="打印">
          <i class="fa fa-print"></i>
        </el-button>
        <!-- 导出操作开始 -->
        <el-popover ref="export" placement="bottom" width="100" trigger="hover">
          <ul id="export">
            <li @click="exportDataEvent">
              导出为Csv文件
            </li>
            <li @click="exportExcel">
              导出为Excel文件
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
        <vxe-table-column type="seq" width="50" title="序号" fixed="left">
        </vxe-table-column>
        <vxe-table-column
          field="VText"
          title="电价标签"
          sortable
          width="200"
          show-overflow
        >
        </vxe-table-column>
        <vxe-table-column title="时令" width="130" sortable>
          <template v-slot="{ row }">
            <el-tag
              :type="row.Summer === '冬令时' ? '' : 'danger'"
              effect="dark"
              size="mini"
              >{{ row.Summer }}</el-tag
            >
          </template>
        </vxe-table-column>
        <vxe-table-column field="Name" title="是否过期" sortable width="120">
          <template v-slot="{ row }">
            <el-tag
              :type="
                new Date(row.ExpireTime).getTime() > new Date().getTime()
                  ? ''
                  : 'danger'
              "
              effect="dark"
              size="mini"
              >{{
                new Date(row.ExpireTime).getTime() > new Date().getTime()
                  ? "否"
                  : "是"
              }}</el-tag
            >
          </template>
        </vxe-table-column>
        <vxe-table-column field="VTime" title="登记时间" width="250">
        </vxe-table-column>
        <vxe-table-column
          field="ExpireTime"
          title="过期时间"
          sortable
          width="250"
        >
        </vxe-table-column>
        <vxe-table-column title="操作" width="330" fixed="right">
          <template v-slot="{ row }">
            <el-button plain size="mini" @click="toDetail(row)">
              <i class="el-icon-info">&nbsp;电价曲线</i>
            </el-button>
            <el-button size="mini" @click="edit(row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="deleteItem(row)">
              删除
            </el-button>
          </template>
        </vxe-table-column>
      </vxe-table>
      <!-- 表格结束 -->

      <!-- 电价曲线开始 -->
      <el-dialog
        title="电价曲线"
        :visible.sync="dialogFormVisible"
        width="85%"
        top="10vh"
        :close-on-click-modal="false"
        :destroy-on-close="true"
      >
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>电价基本信息</span>
          </div>
          <el-form :model="echartsData" label-width="80px" :inline="true">
            <el-form-item label="电价标签">
              <el-input v-model="echartsData.VText" :readonly="true"></el-input>
            </el-form-item>
            <el-form-item label="电价时令">
              <el-input
                v-model="echartsData.Summer"
                :readonly="true"
              ></el-input>
            </el-form-item>
            <el-form-item label="平高峰">
              <el-input
                v-model="echartsData.Climax"
                :readonly="true"
              ></el-input>
            </el-form-item>
            <el-form-item label="登记时间">
              <el-input v-model="echartsData.VTime" :readonly="true"></el-input>
            </el-form-item>
            <el-form-item label="过期时间">
              <el-input
                v-model="echartsData.ExpireTime"
                :readonly="true"
              ></el-input>
            </el-form-item>
          </el-form>
        </el-card>

        <el-card class="box-card" style="margin-top:20px">
          <div slot="header" class="clearfix">
            <span>电价曲线</span>
          </div>
          <div id="myChart"></div>
        </el-card>
      </el-dialog>
      <!-- 电价曲线结束 -->

      <!-- 编辑表单开始 -->
      <el-dialog
        title="修改信息"
        :visible.sync="dialogFormEditVisible"
        width="60%"
        :close-on-click-modal="false"
      >
        <div style="max-height:500px;overflow:auto;">
          <el-form :model="editForm" label-width="90px">
            <el-form-item label="电价标签" prop="VText">
              <el-input v-model="editForm.VText"></el-input>
            </el-form-item>
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="8">
              <el-form-item label="过期时间">
                <el-date-picker
                  v-model="value"
                  type="date"
                  placeholder="选择日期"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="8">
              <el-form-item label="电价时令">
                <el-radio-group v-model="editForm.Summer">
                  <el-radio label="夏令时"></el-radio>
                  <el-radio label="冬令时"></el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="8">
              <el-form-item label="平高峰">
                <el-radio-group v-model="editForm.Climax">
                  <el-radio label="高峰"></el-radio>
                  <el-radio label="平峰"></el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col
              :xs="24"
              :sm="24"
              :md="12"
              :lg="6"
              :xl="6"
              v-for="(item, index) in PVChart"
              :key="index"
            >
              <el-form-item :label="'第' + index + '时电价'">
                <el-input v-model="PVChart[index]"></el-input>
              </el-form-item>
            </el-col>
          </el-form>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormEditVisible = false">取 消</el-button>
          <el-button type="primary" @click="editHttp">提 交</el-button>
        </div>
      </el-dialog>
      <!-- 编辑表单结束 -->

      <!-- 添加表单开始 -->
      <el-dialog
        title="添加电池信息"
        :visible.sync="dialogFormAddVisible"
        width="50%"
        :close-on-click-modal="false"
      >
        <div style="max-height:500px;overflow:auto;">
          <el-form :model="addForm" label-width="90px">
            <el-form-item label="电价标签" prop="VText">
              <el-input v-model="addForm.VText"></el-input>
            </el-form-item>
            <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
              <el-form-item label="过期时间">
                <el-date-picker
                  v-model="value"
                  type="date"
                  placeholder="选择日期"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
              <el-form-item label="电价时令">
                <el-radio-group v-model="addForm.Summer">
                  <el-radio label="夏令时"></el-radio>
                  <el-radio label="冬令时"></el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
              <el-form-item label="平高峰">
                <el-radio-group v-model="addForm.Climax">
                  <el-radio label="高峰"></el-radio>
                  <el-radio label="平峰"></el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col
              :xs="24"
              :sm="24"
              :md="12"
              :lg="6"
              :xl="6"
              v-for="(item, index) in addPVChart"
              :key="index"
            >
              <el-form-item :label="'第' + index + '时电价'">
                <el-input v-model="addPVChart[index]"></el-input>
              </el-form-item>
            </el-col>
          </el-form>
        </div>

        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormAddVisible = false">取 消</el-button>
          <el-button type="primary" @click="addHttp">提 交</el-button>
        </div>
      </el-dialog>
      <!-- 添加表单结束 -->

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
let moment = require('moment')
export default {
  data () {
    return {
      searchForm: {
        AutoSystemID: '',
        page: 1,
        limit: 10,
        LikeName: '',
        Summer: '100',
        Climax: '100'
      },
      options1: [
        {
          label: '选择时令信息',
          value: '100'
        },
        {
          label: '夏令',
          value: '1'
        },
        {
          label: '冬令',
          value: '0'
        }
      ],
      options2: [
        {
          label: '选择平高峰',
          value: '100'
        },
        {
          label: '高峰期',
          value: '1'
        },
        {
          label: '平峰期',
          value: '0'
        }
      ],
      isShow: true,
      tableData: [],
      count: 0,
      customColumns: [],
      fileName: '日志信息',
      loading: false,
      dialogFormVisible: false,
      echartsData: {
        VText: '',
        Summer: '',
        Climax: '',
        VTime: '',
        ExpireTime: ''
      },
      PVChart: '',
      editForm: '',
      formLabelWidth: '100px',
      dialogFormEditVisible: false,
      value: '',
      dialogFormAddVisible: false,
      addForm: {
        Climax: '高峰',
        Summer: '夏令时'
      },
      addPVChart: [
        1.2,
        1.2,
        1.2,
        1.2,
        1.2,
        1.2,
        1.2,
        1.2,
        1.2,
        1.2,
        1.2,
        1.2,
        1.2,
        1.2,
        1.2,
        1.2,
        1.2,
        1.2,
        1.2,
        1.2,
        1.2,
        1.2,
        1.2,
        1.2
      ]
    }
  },
  computed: {
    ...mapState('table', ['pageSize'])
  },
  created () {
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
        export_json_to_excel(tHeader, data, `${this.fileName}表`)
      })
    },
    formatJson (filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    },

    // 获取电价信息列表
    getData () {
      this.loading = true
      var url = '/api/Price/GetPeakAndValleyList'
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

    // 电价曲线
    toDetail (row) {
      console.log(row)
      this.echartsData = row
      this.dialogFormVisible = true
      var url = '/api/Price/GetPeakAndValleyInfo'
      this.$axios
        .get(url, {
          params: {
            AutoSystemID: this.searchForm.AutoSystemID,
            SystemID: row.SystemID
          }
        })
        .then(res => {
          if (res.data.code === 0) {
            this.$message.success(res.data.msg)
            this.PVChart = res.data.data.PVChart
            this.getEcharts()
          } else if (res.data.code === 1) {
            this.$message.error(res.data.msg)
          }
        })
        .catch(err => {
          console.error(err)
        })
    },

    // echarts
    getEcharts () {
      let myChart = this.$echarts.init(document.getElementById('myChart'))
      myChart.setOption({
        title: {
          left: 'center',
          text: '电价曲线'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['']
        },
        lineStyle: {
          color: '#2ec7c9'
        },
        itemStyle: {
          color: '#FF8C00'
        },
        grid: {
          left: '5%', // x:'5%',
          right: '5%', // y:60,
          bottom: '5%', // x2:'5%',
          containLabel: true // y2: 30,
          // borderWidth:1
        },
        xAxis: {
          type: 'category',
          data: [
            '0',
            '1',
            '2',
            '3',
            '4',
            '5',
            '6',
            '7',
            '8',
            '9',
            '10',
            '11',
            '12',
            '13',
            '14',
            '15',
            '16',
            '17',
            '18',
            '19',
            '20',
            '21',
            '22',
            '23'
          ],
          name: '(时刻)'
        },
        yAxis: {
          type: 'value',
          name: '(电价)'
        },
        series: [
          {
            name: '价格',
            type: 'line',
            data: this.PVChart,
            smooth: true
          }
        ]
      })
    },

    // 编辑
    edit (row) {
      console.log(row)
      this.editForm = row
      this.value = moment(row.ExpireTime).format('YYYY-MM-DD')
      this.dialogFormEditVisible = true
      var url = '/api/Price/GetPeakAndValleyInfo'
      this.$axios
        .get(url, {
          params: {
            AutoSystemID: this.searchForm.AutoSystemID,
            SystemID: row.SystemID
          }
        })
        .then(res => {
          if (res.data.code === 0) {
            this.PVChart = res.data.data.PVChart
          } else if (res.data.code === 1) {
            this.$message.error(res.data.msg)
          }
        })
        .catch(err => {
          console.error(err)
        })
    },
    editHttp () {
      var Climax = this.editForm.Climax === '高峰' ? '1' : '0'
      var ExpireTime = moment(this.value).format('YYYY-MM-DD')
      var Summer = this.editForm.Summer === '夏令时' ? '1' : '0'
      var url = '/api/Price/UpdataPeakAndValleyInfo'
      var form = {
        AutoSystemID: this.searchForm.AutoSystemID,
        Climax: Climax,
        ExpireTime: ExpireTime,
        Summer: Summer,
        SystemID: this.editForm.SystemID,
        VText: this.editForm.VText
      }
      this.PVChart.forEach((el, index) => {
        var key = 'TimeZone' + index
        form[key] = el + ''
      })
      this.$axios
        .post(url, form)
        .then(res => {
          if (res.data.code === 0) {
            this.$message.success(res.data.msg)
            this.dialogFormEditVisible = false
            this.getData()
          } else if (res.data.code === 1) {
            this.$message.error(res.data.msg)
          }
        })
        .catch(err => {
          console.error(err)
        })
    },

    // 删除
    deleteItem (row) {
      this.$confirm(`是否删除[ ${row.VText} ]`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          var url = '/api/Price/DeletePeakAndValleyInfo'
          this.$axios
            .post(url, {
              AutoSystemID: this.searchForm.AutoSystemID,
              SystemID: row.SystemID,
              VText: row.VText
            })
            .then(res => {
              if (res.data.code === 0) {
                this.$message.success(res.data.msg)
                let totalPage = Math.ceil(
                  (this.count - 1) / this.searchForm.limit
                )
                let currentPage =
                  this.searchForm.page > totalPage
                    ? totalPage
                    : this.searchForm.page
                this.searchForm.page = currentPage < 1 ? 1 : currentPage
                this.getData()
              } else if (res.data.code === 1) {
                this.$message.error(res.data.msg)
              }
              console.log(res)
            })
            .catch(err => {
              console.error(err)
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },

    // 添加
    addItem () {
      this.dialogFormAddVisible = true
    },
    addHttp () {
      var Climax = this.addForm.Climax === '高峰' ? '1' : '0'
      var ExpireTime = moment(this.value).format('YYYY-MM-DD')
      var Summer = this.addForm.Summer === '夏令时' ? '1' : '0'
      var url = 'api/Price/AddPeakAndValleyInfo'
      var form = {
        AutoSystemID: this.searchForm.AutoSystemID,
        Climax: Climax,
        ExpireTime: ExpireTime,
        Summer: Summer,
        SystemID: '',
        VText: this.addForm.VText
      }
      this.addPVChart.forEach((el, index) => {
        var key = 'TimeZone' + index
        form[key] = el + ''
      })
      this.$axios
        .post(url, form)
        .then(res => {
          if (res.data.code === 0) {
            this.$message.success(res.data.msg)
            this.dialogFormAddVisible = false
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
#myChart {
  height: 500px;
}
.el-form {
  margin-right: 10px;
}
</style>
