<template>
  <div>
    <!-- 表单开始 -->
    <el-collapse-transition>
      <div style="box-sizing:border-box;" v-show="isShow">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>{{ $t("batteryType.searchTitle") }}</span>
          </div>
          <el-form
            :inline="true"
            :model="formInline"
            class="demo-form-inline"
            label-width="80px"
            label-position="right"
          >
            <el-form-item :label="$t('batteryType.searchForm.label')[0]">
              <el-input
                v-model="formInline.BName"
                :placeholder="$t('batteryType.searchForm.placeholder')[0]"
              ></el-input>
            </el-form-item>
            <el-form-item :label="$t('batteryType.searchForm.label')[1]">
              <el-input
                v-model="formInline.Capacity"
                :placeholder="$t('batteryType.searchForm.placeholder')[1]"
              ></el-input>
            </el-form-item>
            <el-form-item :label="$t('batteryType.searchForm.label')[2]">
              <el-input
                v-model="formInline.Materials"
                :placeholder="$t('batteryType.searchForm.placeholder')[2]"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                @click="
                  formInline.page = 1;
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
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>{{ $t("batteryType.listTitle") }}</span>
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
          {{ $t("base.add") }}
        </el-button>
        <el-button
          type="primary"
          size="small"
          @click="getData"
          class="button-left"
        >
          <i class="el-icon-refresh-right"></i>
          {{ $t("base.search") }}
        </el-button>
        <el-button
          type="primary"
          size="small"
          class="button-left"
          @click="isShow = !isShow"
        >
          <i class="el-icon-search"></i>
          {{ $t("base.searchbtn") }}
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
        <vxe-table-column
          type="seq"
          width="50"
          :title="$t('batteryType.tableLabel')[0]"
          fixed="left"
        >
        </vxe-table-column>
        <vxe-table-column
          field="BName"
          :title="$t('batteryType.tableLabel')[1]"
          width="100"
          show-overflow
          show-header-overflow
        >
        </vxe-table-column>
        <vxe-table-column
          field="Capacity"
          :title="$t('batteryType.tableLabel')[2]"
          sortable
          width="100"
          show-overflow
          show-header-overflow
        >
        </vxe-table-column>
        <vxe-table-column
          field="StandardVoltage"
          :title="$t('batteryType.tableLabel')[3]"
          sortable
          width="100"
          show-overflow
          show-header-overflow
        >
        </vxe-table-column>
        <vxe-table-column
          field="SelfDischarge"
          :title="$t('batteryType.tableLabel')[4]"
          sortable
          width="100"
          show-overflow
          show-header-overflow
        >
        </vxe-table-column>
        <vxe-table-column
          field="Materials"
          :title="$t('batteryType.tableLabel')[5]"
          width="100"
          show-overflow
          show-header-overflow
        >
        </vxe-table-column>
        <vxe-table-column
          field="VoltageMax"
          :title="$t('batteryType.tableLabel')[6]"
          sortable
          width="100"
          show-overflow
          show-header-overflow
        >
        </vxe-table-column>
        <vxe-table-column
          field="VoltageMin"
          :title="$t('batteryType.tableLabel')[7]"
          sortable
          width="100"
          show-overflow
          show-header-overflow
        >
        </vxe-table-column>
        <vxe-table-column
          field="TemperatureMax"
          :title="$t('batteryType.tableLabel')[8]"
          sortable
          width="100"
          show-overflow
          show-header-overflow
        >
        </vxe-table-column>
        <vxe-table-column
          field="TemperatureMin"
          :title="$t('batteryType.tableLabel')[9]"
          sortable
          width="100"
          show-overflow
          show-header-overflow
        >
        </vxe-table-column>
        <vxe-table-column
          field="ChargingRatio"
          :title="$t('batteryType.tableLabel')[10]"
          sortable
          width="100"
          show-overflow
          show-header-overflow
        >
        </vxe-table-column>
        <vxe-table-column
          field="DischargeRate"
          :title="$t('batteryType.tableLabel')[11]"
          sortable
          width="100"
          show-overflow
          show-header-overflow
        >
        </vxe-table-column>
        <vxe-table-column
          field="WriteTime"
          :title="$t('batteryType.tableLabel')[12]"
          sortable
          width="180"
          how-overflow
          show-header-overflow
        >
        </vxe-table-column>
        <vxe-table-column
          :title="$t('batteryType.tableLabel')[13]"
          width="200"
          fixed="right"
          how-overflow
          show-header-overflow
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
        :title="$t('batteryType.editDialog.title')"
        :visible.sync="dialogFormVisible"
        class="abow_dialog"
        :close-on-click-modal="false"
      >
        <div style="max-height:500px;overflow:auto;">
          <el-form :model="form" :inline="true" :rules="rules" ref="ruleForm1">
            <el-form-item
              :label="$t('batteryType.editDialog.label')[0]"
              :label-width="formLabelWidth"
              prop="BName"
            >
              <el-input v-model="form.BName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item
              :label="$t('batteryType.editDialog.label')[1]"
              :label-width="formLabelWidth"
              prop="Capacity"
            >
              <el-input v-model="form.Capacity" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item
              :label="$t('batteryType.editDialog.label')[2]"
              :label-width="formLabelWidth"
              prop="InternalResistance"
            >
              <el-input
                v-model="form.InternalResistance"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              :label="$t('batteryType.editDialog.label')[3]"
              :label-width="formLabelWidth"
              prop="SelfDischarge"
            >
              <el-input
                v-model="form.SelfDischarge"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              :label="$t('batteryType.editDialog.label')[4]"
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
              :label="$t('batteryType.editDialog.label')[5]"
              :label-width="formLabelWidth"
              prop="StandardVoltage"
            >
              <el-input
                v-model="form.StandardVoltage"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              :label="$t('batteryType.editDialog.label')[6]"
              :label-width="formLabelWidth"
              prop="VoltageMax"
            >
              <el-input v-model="form.VoltageMax" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item
              :label="$t('batteryType.editDialog.label')[7]"
              :label-width="formLabelWidth"
              prop="VoltageMin"
            >
              <el-input v-model="form.VoltageMin" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item
              :label="$t('batteryType.editDialog.label')[8]"
              :label-width="formLabelWidth"
              prop="TemperatureMax"
            >
              <el-input
                v-model="form.TemperatureMax"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              :label="$t('batteryType.editDialog.label')[9]"
              :label-width="formLabelWidth"
              prop="TemperatureMin"
            >
              <el-input
                v-model="form.TemperatureMin"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              :label="$t('batteryType.editDialog.label')[10]"
              :label-width="formLabelWidth"
              prop="ChargingRatio"
            >
              <el-input
                v-model="form.ChargingRatio"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              :label="$t('batteryType.editDialog.label')[11]"
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
          <el-button @click="dialogFormVisible = false">{{
            $t("base.cancel")
          }}</el-button>
          <el-button type="primary" @click="edit('ruleForm1')">{{
            $t("base.submit")
          }}</el-button>
        </div>
      </el-dialog>
      <!-- 编辑表单结束 -->

      <!-- 添加表单开始 -->
      <el-dialog
        :title="$t('batteryType.addDialog.title')"
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
              :label="$t('batteryType.addDialog.label')[0]"
              :label-width="formLabelWidth"
              prop="BName"
            >
              <el-input v-model="formAdd.BName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item
              :label="$t('batteryType.addDialog.label')[1]"
              :label-width="formLabelWidth"
              prop="Capacity"
            >
              <el-input
                v-model="formAdd.Capacity"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              :label="$t('batteryType.addDialog.label')[2]"
              :label-width="formLabelWidth"
              prop="InternalResistance"
            >
              <el-input
                v-model="formAdd.InternalResistance"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              :label="$t('batteryType.addDialog.label')[3]"
              :label-width="formLabelWidth"
              prop="SelfDischarge"
            >
              <el-input
                v-model="formAdd.SelfDischarge"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              :label="$t('batteryType.addDialog.label')[4]"
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
              :label="$t('batteryType.addDialog.label')[5]"
              :label-width="formLabelWidth"
              prop="StandardVoltage"
            >
              <el-input
                v-model="formAdd.StandardVoltage"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              :label="$t('batteryType.addDialog.label')[6]"
              :label-width="formLabelWidth"
              prop="VoltageMax"
            >
              <el-input
                v-model="formAdd.VoltageMax"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              :label="$t('batteryType.addDialog.label')[7]"
              :label-width="formLabelWidth"
              prop="VoltageMin"
            >
              <el-input
                v-model="formAdd.VoltageMin"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              :label="$t('batteryType.addDialog.label')[8]"
              :label-width="formLabelWidth"
              prop="TemperatureMax"
            >
              <el-input
                v-model="formAdd.TemperatureMax"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              :label="$t('batteryType.addDialog.label')[9]"
              :label-width="formLabelWidth"
              prop="TemperatureMin"
            >
              <el-input
                v-model="formAdd.TemperatureMin"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              :label="$t('batteryType.addDialog.label')[10]"
              :label-width="formLabelWidth"
              prop="ChargingRatio"
            >
              <el-input
                v-model="formAdd.ChargingRatio"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              :label="$t('batteryType.addDialog.label')[11]"
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
          <el-button @click="dialogFormAddVisible = false">{{
            $t("base.cancel")
          }}</el-button>
          <el-button type="primary" @click="addHttp('ruleForm')">{{
            $t("base.submit")
          }}</el-button>
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
        callback(new Error(this.$t('batteryType.errorTip')[0]))
      } else if (!reg.test(value)) {
        callback(new Error(this.$t('batteryType.errorTip')[1]))
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
      fileName: 'export',
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
          {
            required: true,
            message: this.$t('batteryType.errorTip')[2],
            trigger: 'blur'
          }
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
        export_json_to_excel(tHeader, data, `${this.fileName}`)
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
      this.$confirm(
        `${this.$t('base.delConfirm.tip')}${row.DName}`,
        this.$t('base.delConfirm.title'),
        {
          confirmButtonText: this.$t('base.delConfirm.yes'),
          cancelButtonText: this.$t('base.delConfirm.no'),
          type: 'warning'
        }
      )
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
            message: this.$t('base.delConfirm.cancelTip')
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
  width: 240px;
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
