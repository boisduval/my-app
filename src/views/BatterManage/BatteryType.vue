<template>
  <div>
    <!-- 表单开始 -->
    <el-collapse-transition>
      <div style="box-sizing:border-box;" v-show="isShow">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>电池类型列表查询</span>
          </div>
          <el-form
            :inline="true"
            :model="formInline"
            class="demo-form-inline"
            label-width="80px"
            label-position="right"
          >
            <el-form-item label="信息名称:">
              <el-input
                v-model="formInline.BName"
                placeholder="请输入信息名称"
              ></el-input>
            </el-form-item>
            <el-form-item label="使用容量:">
              <el-input
                v-model="formInline.Capacity"
                placeholder="请输入使用容量"
              ></el-input>
            </el-form-item>
            <el-form-item label="使用材料:">
              <el-input
                v-model="formInline.Materials"
                placeholder="请输入使用材料"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                @click="
                  formInline.page = 1;
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
        <span>电池类型</span>
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
              >{{ column.title }}
            </vxe-checkbox>
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
        align="center"
        :data="tableData"
        border
        :customs.sync="customColumns"
        ref="xTable"
        v-loading="loading"
        element-loading-background="rgba(0, 0, 0, 0)"
        show-overflow
        resizable
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
        <vxe-table-column field="BName" title="名称" width="100" show-overflow>
        </vxe-table-column>
        <vxe-table-column
          field="Capacity"
          title="电池容量"
          sortable
          width="100"
          show-overflow
        >
        </vxe-table-column>
        <vxe-table-column
          field="StandardVoltage"
          title="标准电压"
          sortable
          width="100"
          show-overflow
        >
        </vxe-table-column>
        <vxe-table-column
          field="SelfDischarge"
          title="自放电率"
          sortable
          width="100"
        >
        </vxe-table-column>
        <vxe-table-column
          field="Materials"
          title="电池材料"
          width="100"
          show-overflow
        >
        </vxe-table-column>
        <vxe-table-column
          field="VoltageMax"
          title="最大电压"
          sortable
          width="100"
          show-overflow
        >
        </vxe-table-column>
        <vxe-table-column
          field="VoltageMin"
          title="最小电压"
          sortable
          width="100"
          show-overflow
        >
        </vxe-table-column>
        <vxe-table-column
          field="TemperatureMax"
          title="最大温度"
          sortable
          width="100"
          show-overflow
        >
        </vxe-table-column>
        <vxe-table-column
          field="TemperatureMin"
          title="最小温度"
          sortable
          width="100"
          show-overflow
        >
        </vxe-table-column>
        <vxe-table-column
          field="ChargingRatio"
          title="充电比率"
          sortable
          width="100"
          show-overflow
        >
        </vxe-table-column>
        <vxe-table-column
          field="DischargeRate"
          title="放电比率"
          sortable
          width="100"
          show-overflow
        >
        </vxe-table-column>
        <vxe-table-column
          field="WriteTime"
          title="写入时间"
          sortable
          width="180"
        >
        </vxe-table-column>
        <vxe-table-column title="操作" width="200" fixed="right">
          <template v-slot="{ row }">
            <el-button size="mini" @click="showDialog(row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="deleteItem(row)"
              >删除</el-button
            >
          </template>
        </vxe-table-column>
      </vxe-table>
      <!-- 表格结束 -->

      <!-- 分页开始 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="formInline.page"
        :page-sizes="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="count"
      >
      </el-pagination>
      <!-- 分页结束 -->

      <!-- 编辑表单开始 -->
      <el-dialog
        title="修改电池类型"
        :visible.sync="dialogFormVisible"
        class="abow_dialog"
        :close-on-click-modal="false"
      >
        <div style="max-height:500px;overflow:auto;">
          <el-form :model="form" :inline="true" :rules="rules" ref="ruleForm1">
            <el-form-item
              label="电池名称"
              :label-width="formLabelWidth"
              prop="BName"
            >
              <el-input v-model="form.BName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item
              label="电池容量"
              :label-width="formLabelWidth"
              prop="Capacity"
            >
              <el-input v-model="form.Capacity" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item
              label="电池内阻"
              :label-width="formLabelWidth"
              prop="InternalResistance"
            >
              <el-input
                v-model="form.InternalResistance"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="自放电率"
              :label-width="formLabelWidth"
              prop="SelfDischarge"
            >
              <el-input
                v-model="form.SelfDischarge"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="电池材料"
              :label-width="formLabelWidth"
              prop="batteryMaterIDAdd"
            >
              <el-select v-model="batteryMaterID" clearable>
                <el-option
                  v-for="(item, index) in batteryMaterialList"
                  :key="index"
                  :value="item.SystemID"
                  :label="item.Name"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="标准电压"
              :label-width="formLabelWidth"
              prop="StandardVoltage"
            >
              <el-input
                v-model="form.StandardVoltage"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="最大电压"
              :label-width="formLabelWidth"
              prop="VoltageMax"
            >
              <el-input v-model="form.VoltageMax" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item
              label="最小电压"
              :label-width="formLabelWidth"
              prop="VoltageMin"
            >
              <el-input v-model="form.VoltageMin" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item
              label="最大温度"
              :label-width="formLabelWidth"
              prop="TemperatureMax"
            >
              <el-input
                v-model="form.TemperatureMax"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="最小温度"
              :label-width="formLabelWidth"
              prop="TemperatureMin"
            >
              <el-input
                v-model="form.TemperatureMin"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="充电比率"
              :label-width="formLabelWidth"
              prop="ChargingRatio"
            >
              <el-input
                v-model="form.ChargingRatio"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="放电比率"
              :label-width="formLabelWidth"
              prop="DischargeRate"
            >
              <el-input
                v-model="form.DischargeRate"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="edit('ruleForm1')">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 编辑表单结束 -->

      <!-- 添加表单开始 -->
      <el-dialog
        title="添加电池类型"
        :visible.sync="dialogFormAddVisible"
        :close-on-click-modal="false"
      >
        <div style="max-height:500px;overflow:auto;">
          <el-form
            :model="formAdd"
            :inline="true"
            :rules="rules"
            ref="ruleForm"
          >
            <el-form-item
              label="电池名称"
              :label-width="formLabelWidth"
              prop="BName"
            >
              <el-input v-model="formAdd.BName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item
              label="电池容量"
              :label-width="formLabelWidth"
              prop="Capacity"
            >
              <el-input
                v-model="formAdd.Capacity"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="电池内阻"
              :label-width="formLabelWidth"
              prop="InternalResistance"
            >
              <el-input
                v-model="formAdd.InternalResistance"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="自放电率"
              :label-width="formLabelWidth"
              prop="SelfDischarge"
            >
              <el-input
                v-model="formAdd.SelfDischarge"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="电池材料"
              :label-width="formLabelWidth"
              prop="batteryMaterIDAdd"
            >
              <el-select v-model="batteryMaterIDAdd" clearable>
                <el-option
                  v-for="(item, index) in batteryMaterialList"
                  :key="index"
                  :value="item.SystemID"
                  :label="item.Name"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="标准电压"
              :label-width="formLabelWidth"
              prop="StandardVoltage"
            >
              <el-input
                v-model="formAdd.StandardVoltage"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="最大电压"
              :label-width="formLabelWidth"
              prop="VoltageMax"
            >
              <el-input
                v-model="formAdd.VoltageMax"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="最小电压"
              :label-width="formLabelWidth"
              prop="VoltageMin"
            >
              <el-input
                v-model="formAdd.VoltageMin"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="最大温度"
              :label-width="formLabelWidth"
              prop="TemperatureMax"
            >
              <el-input
                v-model="formAdd.TemperatureMax"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="最小温度"
              :label-width="formLabelWidth"
              prop="TemperatureMin"
            >
              <el-input
                v-model="formAdd.TemperatureMin"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="充电比率"
              :label-width="formLabelWidth"
              prop="ChargingRatio"
            >
              <el-input
                v-model="formAdd.ChargingRatio"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="放电比率"
              :label-width="formLabelWidth"
              prop="DischargeRate"
            >
              <el-input
                v-model="formAdd.DischargeRate"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-form>
        </div>

        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormAddVisible = false">取 消</el-button>
          <el-button type="primary" @click="addHttp('ruleForm')"
            >确 定</el-button
          >
        </div>
      </el-dialog>
      <!-- 添加表单结束 -->
    </el-card>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
export default {
  data () {
    var valiNumberPass1 = (rule, value, callback) => {
      // 包含小数的数字
      let reg = /^[+-]?(0|([1-9]\d*))(\.\d+)?$/g
      if (value === '') {
        callback(new Error('请输入内容'))
      } else if (!reg.test(value)) {
        callback(new Error('请输入数字'))
      } else {
        callback()
      }
    }
    return {
      formInline: {
        page: 1,
        limit: 2,
        BName: '',
        Capacity: '',
        Materials: '',
        AutoSystemID: ''
      },
      tableData: [],
      customColumns: [],
      isShow: true,
      fileName: '电池信息',
      count: 0,
      loading: false,
      dialogFormVisible: false,
      dialogFormAddVisible: false,
      form: {
        AutoSystemID: '',
        BName: '',
        Capacity: '',
        ChargingRatio: '',
        DischargeRate: '',
        InternalResistance: '',
        Materials: '',
        SelfDischarge: '',
        StandardVoltage: '',
        SystemID: '',
        TemperatureMax: '',
        TemperatureMin: '',
        VoltageMax: '',
        VoltageMin: ''
      },
      formLabelWidth: '90px',
      batteryMaterialList: [],
      formAdd: {
        AutoSystemID: '',
        BName: '',
        Capacity: '',
        ChargingRatio: '',
        DischargeRate: '',
        InternalResistance: '',
        Materials: '',
        SelfDischarge: '',
        StandardVoltage: '',
        SystemID: '',
        TemperatureMax: '',
        TemperatureMin: '',
        VoltageMax: '',
        VoltageMin: ''
      },
      batteryMaterID: '',
      batteryMaterIDAdd: '',
      rules: {
        BName: [
          { required: true, message: '电池名称不能为空', trigger: 'blur' }
        ],
        Capacity: [
          { required: true, validator: valiNumberPass1, trigger: 'blur' }
        ],
        InternalResistance: [
          { required: true, validator: valiNumberPass1, trigger: 'blur' }
        ],
        SelfDischarge: [
          { required: true, validator: valiNumberPass1, trigger: 'blur' }
        ],
        StandardVoltage: [
          { required: true, validator: valiNumberPass1, trigger: 'blur' }
        ],
        TemperatureMax: [
          { required: true, validator: valiNumberPass1, trigger: 'blur' }
        ],
        TemperatureMin: [
          { required: true, validator: valiNumberPass1, trigger: 'blur' }
        ],
        VoltageMax: [
          { required: true, validator: valiNumberPass1, trigger: 'blur' }
        ],
        VoltageMin: [
          { required: true, validator: valiNumberPass1, trigger: 'blur' }
        ],
        ChargingRatio: [
          { required: true, validator: valiNumberPass1, trigger: 'blur' }
        ],
        DischargeRate: [
          { required: true, validator: valiNumberPass1, trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapState('table', ['pageSize'])
  },
  methods: {
    ...mapMutations('detail', ['set_paramsD', 'set_paramsB', 'set_paramsS']),
    ...mapMutations('tabs', ['set_detail_label']),
    getData () {
      this.loading = true
      this.formInline.AutoSystemID = localStorage.getItem('AutoSystemID')
      this.form.AutoSystemID = this.formInline.AutoSystemID
      this.formAdd.AutoSystemID = this.formInline.AutoSystemID
      this.$axios
        .get(
          `/api/Battery/GetBatteryTypeList?AutoSystemID=${this.formInline.AutoSystemID}&page=${this.formInline.page}&limit=${this.formInline.limit}&LikeCapacity=${this.formInline.Capacity}&LikeMaterials=${this.formInline.Materials}&LikeName=${this.formInline.BName}`
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
      this.formInline.limit = val
      this.getData()
    },

    // 当前页
    handleCurrentChange (val) {
      this.formInline.page = val
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

    // 显示编辑框
    showDialog (row) {
      this.form = row
      this.form.AutoSystemID = localStorage.getItem('AutoSystemID')
      this.dialogFormVisible = true
      this.getBatteryMaterial()
    },

    // 获取电池材料列表
    getBatteryMaterial () {
      this.$axios
        .get(
          `/api/Battery/GetBatteryMaterial?AutoSystemID=${this.form.AutoSystemID}`
        )
        .then(res => {
          this.batteryMaterialList = res.data.data
          if (this.form.Materials) {
            this.batteryMaterID = this.batteryMaterialList.filter(item => {
              return item.Name === this.form.Materials
            })[0].SystemID
          } else {
            this.batteryMaterID = ''
          }
        })
        .catch(err => {
          console.error(err)
        })
    },

    // 编辑
    edit (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.batteryMaterID) {
            this.form.Materials = this.batteryMaterialList.filter(item => {
              return item.SystemID === this.batteryMaterID
            })[0].Name
          } else {
            this.form.Materials = ''
          }

          var url = '/api/Battery/UpDataBatteryType'
          this.$axios
            .post(url, this.form)
            .then(res => {
              this.dialogFormVisible = false
              if (res.data.code === 0) {
                this.$message.success(res.data.msg)
              } else if (res.data.code === 1) {
                this.$message.error(res.data.msg)
              }
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
      this.$confirm(`是否删除[ ${row.DName} ]`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          var name = row.BName
          var id = row.SystemID
          var AutoSystemID = this.formInline.AutoSystemID
          var url = '/api/Battery/DelBatteryType'
          this.$axios
            .post(url, {
              AutoSystemID: AutoSystemID,
              BName: name,
              SystemID: id
            })
            .then(res => {
              if (res.data.code === 0) {
                this.$message.success(res.data.msg)
                let totalPage = Math.ceil(
                  (this.count - 1) / this.formInline.limit
                )
                let currentPage =
                  this.formInline.page > totalPage
                    ? totalPage
                    : this.formInline.page
                this.formInline.page = currentPage < 1 ? 1 : currentPage
                this.getData()
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
            message: '已取消删除'
          })
        })
    },

    // 添加
    addItem () {
      this.dialogFormAddVisible = true
      this.getBatteryMaterial()
    },
    addHttp (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.batteryMaterAddID) {
            this.formAdd.Materials = this.batteryMaterialList.filter(item => {
              return item.SystemID === this.batteryMaterAddID
            })[0].Name
          } else {
            this.formAdd.Materials = ''
          }

          var url = '/api/Battery/AddBatteryType'
          this.$axios
            .post(url, this.formAdd)
            .then(res => {
              if (res.data.code === 0) {
                this.formAdd = {}
                this.batteryMaterIDAdd = ''
                this.$message.success(res.data.msg)
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
    }
  },

  created () {
    this.formInline.limit = this.pageSize[0]
    this.getData()
  }
}
</script>

<style scoped>
.el-dialog {
  width: 50%;
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

.menu-wrapper {
  display: none;
  position: absolute;
  width: 150px;
  top: 16px;
  right: 0;
  z-index: 1000;
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

.table-oper {
  position: relative;
}
.menu-btn:focus,
.menu-btn:active {
  color: #606266;
  border-color: #dcdfe6;
  background-color: #fff;
}
</style>
