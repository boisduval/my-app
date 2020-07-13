<template>
  <div>
    <!-- 表单开始 -->
    <el-collapse-transition>
      <div style="box-sizing:border-box;" v-show="isShow">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>{{ $t("temperatureManage.searchTitle") }}</span>
          </div>
          <el-form
            :inline="true"
            :model="searchForm"
            class="demo-form-inline"
            label-width="120px"
            label-position="right"
          >
            <el-form-item :label="$t('temperatureManage.searchForm.label')[0]">
              <el-select v-model="searchForm.DeviceSystemID">
                <el-option
                  v-for="(item, index) in options"
                  :key="index"
                  :value="item.SystemID"
                  :label="item.Name"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('temperatureManage.searchForm.label')[1]">
              <el-input
                v-model="searchForm.LikeName"
                :placeholder="$t('temperatureManage.searchForm.placeholder')[1]"
              ></el-input>
            </el-form-item>
            <el-form-item :label="$t('temperatureManage.searchForm.label')[2]">
              <el-input
                v-model="searchForm.LikeBatteryIndex"
                :placeholder="$t('temperatureManage.searchForm.placeholder')[2]"
              ></el-input>
            </el-form-item>
            <el-form-item :label="$t('temperatureManage.searchForm.label')[3]">
              <el-input
                v-model="searchForm.LikeBIndex"
                :placeholder="$t('temperatureManage.searchForm.placeholder')[3]"
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
            </el-form-item>
          </el-form>
        </el-card>
        <div style="height:20px;width:100%"></div>
      </div>
    </el-collapse-transition>
    <!-- 表单结束 -->

    <el-card class="box-card visible">
      <div slot="header" class="clearfix">
        <span>{{ $t("temperatureManage.listTitle") }}</span>
      </div>

      <!-- 表格开始 -->
       <vxe-toolbar custom print export>
        <template v-slot:buttons>
         <el-button
          type="primary"
          size="small"
          @click="addItem"
          class="button-left"
        >
          <i class="el-icon-plus"></i>
          {{ $t("base.add") }}
        </el-button>
        <el-button
          type="primary"
          size="small"
          @click="addItems"
          class="button-left"
        >
          <i class="el-icon-plus"></i>
          {{ $t("base.multipleAdd") }}
        </el-button>
        <el-button
          type="primary"
          size="small"
          @click="deleteItems"
          class="button-left"
        >
          <i class="el-icon-delete"></i>
          {{ $t("base.multipleDel") }}
        </el-button>
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
        show-overflow
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
          :title="$t('temperatureManage.tableLabel')[0]"
          fixed="left"
        >
        </vxe-table-column>
        <vxe-table-column
          field="TName"
          :title="$t('temperatureManage.tableLabel')[1]"
          width="350"
          show-overflow
        >
        </vxe-table-column>
        <vxe-table-column
          field="TIndex"
          :title="$t('temperatureManage.tableLabel')[2]"
          width="200"
          show-overflow
          sortable
        >
        </vxe-table-column>
        <vxe-table-column
          field="BmsIndex"
          :title="$t('temperatureManage.tableLabel')[3]"
          width="200"
          show-overflow
          sortable
        >
        </vxe-table-column>
        <vxe-table-column
          field="WriteTime"
          :title="$t('temperatureManage.tableLabel')[4]"
          width="300"
          show-overflow
        >
        </vxe-table-column>
        <vxe-table-column
          :title="$t('temperatureManage.tableLabel')[5]"
          width="250"
          fixed="right"
        >
          <template v-slot="{ row }">
            <el-button size="mini" @click="showDialog(row)">{{
              $t("base.edit")
            }}</el-button>
            <el-button size="mini" type="danger" @click="deleteItem(row)">{{
              $t("base.del")
            }}</el-button>
          </template>
        </vxe-table-column>
      </vxe-table>
      <!-- 表格结束 -->

      <!-- 编辑表单开始 -->
      <el-dialog
        :title="$t('temperatureManage.editDialog.title')"
        :visible.sync="dialogFormVisible"
        width="30%"
        :close-on-click-modal="false"
      >
        <el-form :model="editForm" ref="ruleForm" :rules="rules">
          <el-form-item
            :label="$t('temperatureManage.editDialog.formLabel')[0]"
            :label-width="formLabelWidth"
          >
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
            :label="$t('temperatureManage.editDialog.formLabel')[1]"
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
            :label="$t('temperatureManage.editDialog.formLabel')[2]"
            :label-width="formLabelWidth"
            prop="TName"
          >
            <el-input v-model="editForm.TName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item
            :label="$t('temperatureManage.editDialog.formLabel')[3]"
            :label-width="formLabelWidth"
            prop="TIndex"
          >
            <el-input v-model="editForm.TIndex" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item
            :label="$t('temperatureManage.editDialog.formLabel')[4]"
            :label-width="formLabelWidth"
            prop="BmsIndex"
          >
            <el-input v-model="editForm.BmsIndex" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">{{
            $t("base.cancel")
          }}</el-button>
          <el-button type="primary" @click="edit('ruleForm')">{{
            $t("base.submit")
          }}</el-button>
        </div>
      </el-dialog>
      <!-- 编辑表单结束 -->

      <!-- 添加表单开始 -->
      <el-dialog
        :title="$t('temperatureManage.addDialog.title')"
        :visible.sync="dialogFormAddVisible"
        width="30%"
        :close-on-click-modal="false"
      >
        <el-form :model="addForm" :rules="rules" ref="ruleForm1">
          <el-form-item
            :label="$t('temperatureManage.addDialog.formLabel')[0]"
            :label-width="formLabelWidth"
          >
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
            :label="$t('temperatureManage.addDialog.formLabel')[1]"
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
            :label="$t('temperatureManage.addDialog.formLabel')[2]"
            :label-width="formLabelWidth"
            prop="TName"
          >
            <el-input v-model="addForm.TName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item
            :label="$t('temperatureManage.addDialog.formLabel')[3]"
            :label-width="formLabelWidth"
            prop="TIndex"
          >
            <el-input v-model="addForm.TIndex" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item
            :label="$t('temperatureManage.addDialog.formLabel')[4]"
            :label-width="formLabelWidth"
            prop="BmsIndex"
          >
            <el-input v-model="addForm.BmsIndex" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormAddVisible = false">{{
            $t("base.cancel")
          }}</el-button>
          <el-button type="primary" @click="addHttp('ruleForm1')">{{
            $t("base.submit")
          }}</el-button>
        </div>
      </el-dialog>
      <!-- 添加表单结束 -->

      <!-- 添加多个表单开始 -->
      <el-dialog
        :title="$t('temperatureManage.addMore.title')"
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
          <el-form-item :label="$t('temperatureManage.addMore.formLabel')[0]">
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
          <el-form-item
            :label="$t('temperatureManage.addMore.formLabel')[1]"
            prop="DeviceID"
          >
            <el-input v-model="addList.DeviceID" :readonly="true"></el-input>
          </el-form-item>
          <el-form-item
            :label="$t('temperatureManage.addMore.formLabel')[2]"
            prop="BNameTop"
          >
            <el-input v-model="addList.TNameTop"></el-input>
          </el-form-item>
          <el-form-item :label="$t('temperatureManage.addMore.formLabel')[3]">
            <el-radio-group v-model="addList.BankIndex1">
              <el-radio label="1">Bank1</el-radio>
              <el-radio label="2">Bank2</el-radio>
            </el-radio-group>
          </el-form-item>
          <!-- <el-form-item :label="$t('temperatureManage.addMore.formLabel')[0]" prop="RackStart">
            <el-input v-model="addList.RackStart"></el-input>
          </el-form-item> -->
          <el-form-item
            :label="$t('temperatureManage.addMore.formLabel')[4]"
            prop="RackNum"
          >
            <el-input v-model="addList.RackNum"></el-input>
          </el-form-item>

          <!-- <el-form-item :label="$t('temperatureManage.addMore.formLabel')[0]" prop="CellStart">
            <el-input v-model="addList.CellStart"></el-input>
          </el-form-item> -->
          <el-form-item
            :label="$t('temperatureManage.addMore.formLabel')[5]"
            prop="CellNum"
          >
            <el-input v-model="addList.CellNum"></el-input>
          </el-form-item>
          <el-form-item
            :label="$t('temperatureManage.addMore.formLabel')[6]"
            prop="BmsStart"
          >
            <el-input v-model="addList.BmsStart"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addMoreVisibel = false">{{
            $t("base.cancel")
          }}</el-button>
          <el-button type="primary" @click="addListHttp('ruleForm2')">{{
            $t("base.submit")
          }}</el-button>
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
        callback(new Error(this.$t('temperatureManage.errorTip')))
      } else {
        callback()
      }
    }
    return {
      isShow: true,
      formLabelWidth: '120px',
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
      exportConfig: {
        filename: 'export',
        sheetName: 'Sheet1',
        types: ['csv', 'xlsx']
      },
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
    this.searchForm.AutoSystemID = localStorage.getItem('AutoSystemID')
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
      this.$confirm(
        `${this.$t('base.delConfirm.tip')}${row.TName}`,
        this.$t('base.delConfirm.title'),
        {
          confirmButtonText: this.$t('base.delConfirm.yes'),
          cancelButtonText: this.$t('base.delConfirm.no'),
          type: 'warning'
        }
      )
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
            message: this.$t('base.delConfirm.cancelTip')
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
      this.selectedItems = this.$refs.xTable.getCheckboxRecords()
      var arr = []
      if (this.selectedItems.length === 0) {
        this.$message.warning(this.$t('temperatureManage.warningTip'))
        return false
      }
      for (const item of this.selectedItems) {
        arr.push({
          Name: item.TName,
          SystemID: item.SystemID
        })
      }
      this.$confirm(
        `${this.$t('base.delConfirm.tip1')}`,
        this.$t('base.delConfirm.title'),
        {
          confirmButtonText: this.$t('base.delConfirm.yes'),
          cancelButtonText: this.$t('base.delConfirm.no'),
          type: 'warning'
        }
      )
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
            message: this.$t('base.delConfirm.cancelTip')
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
