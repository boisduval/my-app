<template>
  <div>
    <!-- 表单开始 -->
    <el-collapse-transition>
      <div style="box-sizing:border-box;" v-show="isShow">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>温度信息列表查询</span>
          </div>
          <el-form
            :inline="true"
            :model="searchForm"
            class="demo-form-inline"
            label-width="120px"
            label-position="right"
          >
            <el-form-item label="设备名称:">
              <el-select v-model="searchForm.DeviceSystemID">
                <el-option
                  v-for="(item, index) in options"
                  :key="index"
                  :value="item.SystemID"
                  :label="item.Name"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="信息名称:">
              <el-input
                v-model="searchForm.LikeName"
                placeholder="请输入信息名称"
              ></el-input>
            </el-form-item>
            <el-form-item label="电池序号:">
              <el-input
                v-model="searchForm.LikeBatteryIndex"
                placeholder="请输入电池序号"
              ></el-input>
            </el-form-item>
            <el-form-item label="模块电池序号:">
              <el-input
                v-model="searchForm.LikeBIndex"
                placeholder="请输入模块电池序号"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="searchForm.page = 1;getData()">查询</el-button>
            </el-form-item>
          </el-form>
        </el-card>
        <div style="height:20px;width:100%"></div>
      </div>
    </el-collapse-transition>
    <!-- 表单结束 -->

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>温度信息</span>
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
          @click="addItems"
          class="button-left"
        >
          <i class="el-icon-plus"></i>
          多条添加
        </el-button>
        <el-button
          type="primary"
          size="small"
          @click="deleteItems"
          class="button-left"
        >
          <i class="el-icon-delete"></i>
          多选删除
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
        </el-button>
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
        show-overflow
        resizable
        align="center"
      >
        <vxe-table-column
          type="checkbox"
          width="50"
          fixed="left"
        ></vxe-table-column>
        <vxe-table-column type="index" width="50" title="序号" fixed="left">
        </vxe-table-column>
        <vxe-table-column
          field="TName"
          title="电池名称"
          width="350"
          show-overflow
        >
        </vxe-table-column>
        <vxe-table-column
          field="TIndex"
          title="电池序号"
          width="200"
          show-overflow
          sortable
        >
        </vxe-table-column>
        <vxe-table-column
          field="BmsIndex"
          title="模块电池序号"
          width="200"
          show-overflow
          sortable
        >
        </vxe-table-column>
        <vxe-table-column
          field="WriteTime"
          title="记录时间"
          width="300"
          show-overflow
        >
        </vxe-table-column>
        <vxe-table-column title="操作" width="250" fixed="right">
          <template v-slot="{ row }">
            <el-button size="mini" @click="showDialog(row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="deleteItem(row)"
              >删除</el-button
            >
          </template>
        </vxe-table-column>
      </vxe-table>
      <!-- 表格结束 -->

      <!-- 编辑表单开始 -->
      <el-dialog
        title="修改信息"
        :visible.sync="dialogFormVisible"
        width="30%"
        :close-on-click-modal="false"
      >
        <el-form :model="editForm" ref="ruleForm" :rules="rules">
          <el-form-item label="设备名称" :label-width="formLabelWidth">
            <el-select
              v-model="editForm.DeviceSystemID"
              @change="getDeviceId(editForm)"
            >
              <el-option
                v-for="(item, index) in options"
                :key="index"
                :value="item.SystemID"
                :label="item.Name"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="设备编号"
            :label-width="formLabelWidth"
            prop="DeviceID"
          >
            <el-input
              v-model="editForm.DeviceID"
              autocomplete="off"
              :readonly="true"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="温度名称"
            :label-width="formLabelWidth"
            prop="TName"
          >
            <el-input v-model="editForm.TName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item
            label="温度序号"
            :label-width="formLabelWidth"
            prop="TIndex"
          >
            <el-input v-model="editForm.TIndex" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item
            label="温度模块序号"
            :label-width="formLabelWidth"
            prop="BmsIndex"
          >
            <el-input v-model="editForm.BmsIndex" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="edit('ruleForm')">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 编辑表单结束 -->

      <!-- 添加表单开始 -->
      <el-dialog
        title="添加电池信息"
        :visible.sync="dialogFormAddVisible"
        width="30%"
        :close-on-click-modal="false"
      >
        <el-form :model="addForm" :rules="rules" ref="ruleForm1">
          <el-form-item label="设备名称" :label-width="formLabelWidth">
            <el-select
              v-model="addForm.DeviceSystemID"
              @change="getDeviceId(addForm)"
            >
              <el-option
                v-for="(item, index) in options"
                :key="index"
                :value="item.SystemID"
                :label="item.Name"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="设备编号"
            :label-width="formLabelWidth"
            prop="DeviceID"
          >
            <el-input
              v-model="addForm.DeviceID"
              autocomplete="off"
              :readonly="true"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="温度名称"
            :label-width="formLabelWidth"
            prop="TName"
          >
            <el-input v-model="addForm.TName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item
            label="温度序号"
            :label-width="formLabelWidth"
            prop="TIndex"
          >
            <el-input v-model="addForm.TIndex" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item
            label="温度模块序号"
            :label-width="formLabelWidth"
            prop="BmsIndex"
          >
            <el-input v-model="addForm.BmsIndex" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormAddVisible = false">取 消</el-button>
          <el-button type="primary" @click="addHttp('ruleForm1')"
            >确 定</el-button
          >
        </div>
      </el-dialog>
      <!-- 添加表单结束 -->

      <!-- 添加多个表单开始 -->
      <el-dialog
        title="添加电池信息"
        :visible.sync="addMoreVisibel"
        width="60%"
        :close-on-click-modal="false"
      >
        <el-form
          :model="addList"
          :rules="rules"
          ref="ruleForm2"
          label-width="100px"
        >
          <el-form-item label="设备名称">
            <el-select
              v-model="addList.DeviceSystemID"
              @change="getDeviceId(addList)"
            >
              <el-option
                v-for="(item, index) in options"
                :key="index"
                :value="item.SystemID"
                :label="item.Name"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="设备编号" prop="DeviceID">
            <el-input v-model="addList.DeviceID" :readonly="true"></el-input>
          </el-form-item>
          <el-form-item label="温度名称头" prop="BNameTop">
            <el-input v-model="addList.TNameTop"></el-input>
          </el-form-item>
          <el-form-item label="Bank选择">
            <el-radio-group v-model="addList.BankIndex1">
              <el-radio label="1">Bank1</el-radio>
              <el-radio label="2">Bank2</el-radio>
            </el-radio-group>
          </el-form-item>
          <!-- <el-form-item label="Rack起始地址" prop="RackStart">
            <el-input v-model="addList.RackStart"></el-input>
          </el-form-item> -->
          <el-form-item label="Rack添加数量" prop="RackNum">
            <el-input v-model="addList.RackNum"></el-input>
          </el-form-item>

          <!-- <el-form-item label="Cell起始地址" prop="CellStart">
            <el-input v-model="addList.CellStart"></el-input>
          </el-form-item> -->
          <el-form-item label="Cell添加数量" prop="CellNum">
            <el-input v-model="addList.CellNum"></el-input>
          </el-form-item>
          <el-form-item label="温度序号头" prop="BmsStart">
            <el-input v-model="addList.BmsStart"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addMoreVisibel = false">取 消</el-button>
          <el-button type="primary" @click="addListHttp('ruleForm2')"
            >确 定</el-button
          >
        </div>
      </el-dialog>
      <!-- 添加多个表单结束 -->

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
    var valiNumberPass1 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入内容'))
      } else {
        callback()
      }
    }
    return {
      isShow: true,
      formLabelWidth: '120px',
      customColumns: [],
      tableData: [],
      loading: false,
      count: 0,
      searchForm: {
        AutoSystemID: '',
        LikeName: '',
        LikeBatteryIndex: '',
        LikeBIndex: '',
        page: 1,
        limit: 2,
        DeviceSystemID: ''
      },
      options: [],
      fileName: '电池信息',
      dialogFormVisible: false,
      dialogFormAddVisible: false,
      addMoreVisibel: false,
      editForm: {
        AutoSystemID: '',
        TIndex: '',
        TName: '',
        BmsIndex: '',
        DeviceID: '',
        DeviceSystemID: '',
        SystemID: ''
      },
      addForm: {
        AutoSystemID: '',
        TIndex: '',
        TName: '',
        BmsIndex: '',
        DeviceID: '',
        DeviceSystemID: '',
        SystemID: ''
      },
      rules: {
        TIndex: [
          { required: true, validator: valiNumberPass1, trigger: 'blur' }
        ],
        TName: [
          { required: true, validator: valiNumberPass1, trigger: 'blur' }
        ],
        BmsIndex: [
          { required: true, validator: valiNumberPass1, trigger: 'blur' }
        ],
        DeviceSystemID: [
          { required: true, validator: valiNumberPass1, trigger: 'blur' }
        ],
        SystemID: [
          { required: true, validator: valiNumberPass1, trigger: 'blur' }
        ]
      },
      addList: {
        AutoSystemID: '',
        TNameTop: '',
        BankIndex1: '1',
        BmsStart: '',
        CellNum: '',
        CellStart: '1',
        DeviceID: '',
        DeviceSystemID: '',
        RackNum: '',
        RackStart: '1'
      },
      selectedItems: []
    }
  },
  computed: {
    ...mapState('table', ['pageSize'])
  },
  async created () {
    this.searchForm.AutoSystemID = sessionStorage.getItem('AutoSystemID')
    try {
      let res = await this.getBatteryList()
      this.options = res.data.data
      this.searchForm.DeviceSystemID = this.options[0].SystemID
      this.searchForm.limit = this.pageSize[0]
      this.getData()
    } catch (err) {
      console.log(err)
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
      for (var i = 2; i < this.customColumns.length - 1; i++) {
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

    // 获取设备名称列表
    getBatteryList () {
      var url = '/api/Devices/GetDevicesNameList'
      return new Promise((resolve, reject) => {
        this.$axios
          .get(`${url}?AutoSystemID=${this.searchForm.AutoSystemID}`)
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      })
    },

    // 获取温度信息列表
    getData () {
      this.loading = true
      var url = '/api/Battery/GetTemperatureList'
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
      // try {
      //   let res = await this.$axios.get(url, { params: this.searchForm })
      //   if (res.data.code === 0) {
      //     this.tableData = res.data.data
      //     this.count = res.data.count
      //   } else if (res.data.code === 1) {
      //     this.$message.error(res.data.msg)
      //   }
      // } catch (err) {
      //   console.error(err)
      // }
    },

    getDeviceId (obj) {
      var that = this
      obj.DeviceID = that.options.filter(function (el) {
        return el.SystemID == obj.DeviceSystemID; // eslint-disable-line
      })[0].Para
    },

    // 编辑
    showDialog (row) {
      console.log(row)
      this.editForm = row
      this.editForm.AutoSystemID = this.searchForm.AutoSystemID
      this.getDeviceId(this.editForm)
      this.dialogFormVisible = true
    },
    edit (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          var url = '/api/Battery/UpDataTemperature'
          this.$axios
            .post(url, this.editForm)
            .then(res => {
              if (res.data.code === 0) {
                this.$message.success(res.data.msg)
              } else if (res.data.code === 1) {
                this.$message.error(res.data.msg)
              }
              this.dialogFormVisible = false
              this.getData()
            })
            .catch(err => {
              console.error(err)
            })
        } else {
          // console.log('error submit!!');
          return false
        }
      })
    },

    // 删除
    deleteItem (row) {
      this.$confirm(`是否删除[ ${row.TName} ]`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          var url = '/api/Battery/DelTemperature'
          this.$axios
            .post(url, {
              AutoSystemID: this.searchForm.AutoSystemID,
              data: [
                {
                  SystemID: row.SystemID,
                  Name: row.TName
                }
              ]
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
      this.addForm.AutoSystemID = this.searchForm.AutoSystemID
      this.dialogFormAddVisible = true
    },
    addHttp (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          var url = '/api/Battery/AddTemperature'
          this.$axios
            .post(url, this.addForm)
            .then(res => {
              if (res.data.code === 0) {
                console.log(res)
                this.$message.success(res.data.msg)
                this.addForm = {}
                this.getData()
              } else if (res.data.code === 1) {
                this.$message.error(res.data.msg)
              }
              this.dialogFormAddVisible = false
            })
            .catch(err => {
              console.error(err)
            })
        } else {
          // console.log('error submit!!');
          return false
        }
      })
    },

    // 多条添加
    addItems () {
      this.addList.AutoSystemID = this.searchForm.AutoSystemID
      this.addMoreVisibel = true
    },
    addListHttp (formName) {
      this.addList.RackStart = '1'
      this.addList.CellStart = '1'
      this.$refs[formName].validate(valid => {
        if (valid) {
          var url = 'api/Battery/AddTemperatures'
          this.$axios
            .post(url, this.addList)
            .then(res => {
              if (res.data.code === 0) {
                this.$message.success(res.data.msg)
                this.addList = {}
                this.addList.BankIndex1 = '1'
                setTimeout(() => {
                  this.getData()
                }, 100)
              } else if (res.data.code === 1) {
                this.$message.error(res.data.msg)
              }
              this.addMoreVisibel = false
            })
            .catch(err => {
              console.error(err)
            })
        } else {
          // console.log('error submit!!');
          return false
        }
      })
    },

    // 删除多个
    deleteItems () {
      this.selectedItems = this.$refs.xTable.getSelectRecords()
      var arr = []
      if (this.selectedItems.length === 0) {
        this.$message.warning('请选择要删除的用户')
        return false
      }
      for (const item of this.selectedItems) {
        arr.push({
          Name: item.TName,
          SystemID: item.SystemID
        })
      }
      this.$confirm(`确定删除吗`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          var url = '/api/Battery/DelTemperature'
          this.$axios
            .post(url, {
              AutoSystemID: this.searchForm.AutoSystemID,
              data: arr
            })
            .then(res => {
              if (res.data.code === 0) {
                this.$message.success(res.data.msg)
                let totalPage = Math.ceil(
                  (this.count - this.selectedItems.length) /
                    this.searchForm.limit
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

.menu-btn:hover .menu-wrapper {
  display: block;
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
