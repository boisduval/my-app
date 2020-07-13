<template>
  <div>
    <!-- 表单开始 -->
    <el-collapse-transition>
      <div style="box-sizing:border-box;" v-show="isShow">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>{{ $t("equipmentManage.searchTitle") }}</span>
          </div>
          <el-form
            :inline="true"
            :model="searchForm"
            class="demo-form-inline"
            label-width="100px"
            label-position="right"
          >
            <el-form-item :label="$t('equipmentManage.searchForm.label')[0]">
              <el-input
                v-model="searchForm.Name"
                :placeholder="$t('equipmentManage.searchForm.placeholder')[0]"
              ></el-input>
            </el-form-item>
            <el-form-item :label="$t('equipmentManage.searchForm.label')[1]">
              <el-input
                v-model="searchForm.Type"
                :placeholder="$t('equipmentManage.searchForm.placeholder')[1]"
              ></el-input>
            </el-form-item>
            <el-form-item :label="$t('equipmentManage.searchForm.label')[2]">
              <el-input
                v-model="searchForm.Content"
                :placeholder="$t('equipmentManage.searchForm.placeholder')[2]"
              ></el-input>
            </el-form-item>
            <el-form-item :label="$t('equipmentManage.searchForm.label')[3]">
              <el-input
                v-model="searchForm.Site"
                :placeholder="$t('equipmentManage.searchForm.placeholder')[3]"
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
        <span>{{ $t("equipmentManage.listTitle") }}</span>
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
          :title="$t('equipmentManage.tableLabel')[0]"
          fixed="left"
          align="center"
        >
        </vxe-table-column>
        <vxe-table-column
          field="PName"
          :title="$t('equipmentManage.tableLabel')[1]"
          sortable
          width="180"
          show-overflow
          show-header-overflow
        >
        </vxe-table-column>
        <vxe-table-column
          field="PType"
          :title="$t('equipmentManage.tableLabel')[2]"
          sortable
          width="180"
          show-overflow
          show-header-overflow
        >
        </vxe-table-column>
        <vxe-table-column
          field="PContent"
          :title="$t('equipmentManage.tableLabel')[3]"
          sortable
          width="180"
          show-overflow
          show-header-overflow
        >
        </vxe-table-column>
        <vxe-table-column
          field="PSite"
          :title="$t('equipmentManage.tableLabel')[4]"
          sortable
          width="180"
          show-overflow
          show-header-overflow
        >
        </vxe-table-column>
        <vxe-table-column
          field="TotalInvestment"
          :title="$t('equipmentManage.tableLabel')[5]"
          sortable
          width="180"
          show-overflow
          show-header-overflow
        >
        </vxe-table-column>
        <vxe-table-column
          field="PPlannedCompletionTime"
          :title="$t('equipmentManage.tableLabel')[6]"
          sortable
          width="200"
          show-header-overflow
          show-overflow
          align="center"
        >
        </vxe-table-column>
        <vxe-table-column
          :title="$t('equipmentManage.tableLabel')[7]"
          width="350"
          fixed="right"
          align="center"
          show-header-overflow
        >
          <template v-slot="{ row }">
            <el-button size="small" @click="showDialog(row)">{{
              $t("equipmentManage.operation")[0]
            }}</el-button>
            <el-button size="small" @click="toDetail(row)" type="primary">
              {{ $t("equipmentManage.operation")[1] }}
            </el-button>
            <el-button size="small" @click="getController(row)" type="success">
              {{ $t("equipmentManage.operation")[2] }}
            </el-button>
            <el-button size="small" type="danger" @click="deleteItem(row)">
              {{ $t("equipmentManage.operation")[3] }}
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

      <!-- 编辑表单开始 -->
      <el-dialog
        :title="$t('equipmentManage.dialog.editTitle')"
        :visible.sync="dialogFormVisible"
        :close-on-click-modal="false"
      >
        <div style="height:500px;overflow:auto;">
          <el-form :model="form">
            <el-form-item
              :label="$t('equipmentManage.dialog.label')[0]"
              :label-width="formLabelWidth"
            >
              <el-input v-model="form.PName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item
              :label="$t('equipmentManage.dialog.label')[1]"
              :label-width="formLabelWidth"
            >
              <el-input v-model="form.PType" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item
              :label="$t('equipmentManage.dialog.label')[2]"
              :label-width="formLabelWidth"
            >
              <el-input v-model="form.PScale" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item
              :label="$t('equipmentManage.dialog.label')[3]"
              :label-width="formLabelWidth"
            >
              <el-input v-model="form.PContent" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item
              :label="$t('equipmentManage.dialog.label')[4]"
              :label-width="formLabelWidth"
            >
              <el-input v-model="form.PSite" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item
              :label="$t('equipmentManage.dialog.label')[5]"
              :label-width="formLabelWidth"
            >
              <el-input
                v-model="form.PTotalInvestment"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              :label="$t('equipmentManage.dialog.label')[6]"
              :label-width="formLabelWidth"
            >
              <el-input
                v-model="form.PRateOfReturn"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              :label="$t('equipmentManage.dialog.label')[7]"
              :label-width="formLabelWidth"
            >
              <el-input
                v-model="form.PPaybackPeriod"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              :label="$t('equipmentManage.dialog.label')[8]"
              :label-width="formLabelWidth"
            >
              <el-input v-model="form.PDescribe" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item
              :label="$t('equipmentManage.dialog.label')[9]"
              :label-width="formLabelWidth"
            >
              <el-date-picker
                v-model="form.PPlannedCompletionTime"
                type="datetime"
                :clearable="false"
              >
              </el-date-picker>
            </el-form-item>
          </el-form>
        </div>

        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">{{
            $t("base.cancel")
          }}</el-button>
          <el-button type="primary" @click="edit">{{
            $t("base.submit")
          }}</el-button>
        </div>
      </el-dialog>
      <!-- 编辑表单结束 -->

      <!-- 添加表单开始 -->
      <el-dialog
        :title="$t('equipmentManage.dialog.addTitle')"
        :visible.sync="dialogFormAddVisible"
        :close-on-click-modal="false"
      >
        <div style="height:500px;overflow:auto;">
          <el-form :model="formAdd">
            <el-form-item
              :label="$t('equipmentManage.dialog.label')[0]"
              :label-width="formLabelWidth"
            >
              <el-input v-model="formAdd.PName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item
              :label="$t('equipmentManage.dialog.label')[1]"
              :label-width="formLabelWidth"
            >
              <el-input v-model="formAdd.PType" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item
              :label="$t('equipmentManage.dialog.label')[2]"
              :label-width="formLabelWidth"
            >
              <el-input v-model="formAdd.PScale" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item
              :label="$t('equipmentManage.dialog.label')[3]"
              :label-width="formLabelWidth"
            >
              <el-input
                v-model="formAdd.PContent"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              :label="$t('equipmentManage.dialog.label')[4]"
              :label-width="formLabelWidth"
            >
              <el-input v-model="formAdd.PSite" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item
              :label="$t('equipmentManage.dialog.label')[5]"
              :label-width="formLabelWidth"
            >
              <el-input
                v-model.number="formAdd.PTotalInvestment"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              :label="$t('equipmentManage.dialog.label')[6]"
              :label-width="formLabelWidth"
            >
              <el-input
                v-model="formAdd.PRateOfReturn"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              :label="$t('equipmentManage.dialog.label')[7]"
              :label-width="formLabelWidth"
            >
              <el-input
                v-model="formAdd.PPaybackPeriod"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              :label="$t('equipmentManage.dialog.label')[8]"
              :label-width="formLabelWidth"
            >
              <el-input
                v-model="formAdd.PDescribe"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              :label="$t('equipmentManage.dialog.label')[9]"
              :label-width="formLabelWidth"
            >
              <el-date-picker
                v-model="formAdd.PPlannedCompletionTime"
                type="datetime"
                :clearable="false"
              >
              </el-date-picker>
            </el-form-item>
          </el-form>
        </div>

        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormAddVisible = false">{{
            $t("base.cancel")
          }}</el-button>
          <el-button type="primary" @click="addHttp">{{
            $t("base.submit")
          }}</el-button>
        </div>
      </el-dialog>
      <!-- 添加表单结束 -->

      <!-- 详情开始 -->
      <Drawer
        :closable="false"
        v-model="value4"
        :title="$t('equipmentManage.drawer.title')"
        draggable
        width="30"
      >
        <p :style="pStyle">{{ $t("equipmentManage.drawer.label")[0] }}</p>
        <div class="demo-drawer-profile">
          {{ activeItem.PName }}
        </div>
        <Divider />
        <p :style="pStyle">{{ $t("equipmentManage.drawer.label")[1] }}</p>
        <div class="demo-drawer-profile">
          {{ activeItem.SystemID }}
        </div>
        <Divider />
        <p :style="pStyle">{{ $t("equipmentManage.drawer.label")[2] }}</p>
        <div class="demo-drawer-profile">
          {{ activeItem.PScale }}
        </div>
        <Divider />
        <p :style="pStyle">{{ $t("equipmentManage.drawer.label")[3] }}</p>
        <div class="demo-drawer-profile">
          {{ activeItem.PRateOfReturn }}
        </div>
        <Divider />
        <p :style="pStyle">{{ $t("equipmentManage.drawer.label")[4] }}</p>
        <div class="demo-drawer-profile">
          {{ activeItem.PPaybackPeriod }}
        </div>
        <Divider />
        <p :style="pStyle">{{ $t("equipmentManage.drawer.label")[5] }}</p>
        <div class="demo-drawer-profile">
          {{ activeItem.PDescribe }}
        </div>
        <Divider />
        <p :style="pStyle">{{ $t("equipmentManage.drawer.label")[6] }}</p>
        <div class="demo-drawer-profile">
          {{ activeItem.PWriteTime }}
        </div>
      </Drawer>
      <!-- 详情结束 -->
      <!-- 穿梭框开始 -->
      <el-dialog
        :title="$t('equipmentManage.transfer.title')"
        width="650px"
        :close-on-click-modal="false"
        :visible.sync="dialogVisible"
      >
        <Transfer
          :data="projectData"
          :target-keys="value"
          :render-format="render1"
          @on-change="handleChange"
          :list-style="listStyle"
          :titles="[
            $t('equipmentManage.transfer.state')[0],
            $t('equipmentManage.transfer.state')[1]
          ]"
        ></Transfer>
      </el-dialog>
      <!-- 穿梭框结束 -->
    </el-card>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
let moment = require('moment')
export default {
  data () {
    return {
      searchForm: {
        page: 1,
        limit: 2,
        Name: '',
        Type: '',
        Content: '',
        Site: '',
        AutoSystemID: ''
      },
      tableData: [],
      isShow: true,
      count: 0,
      loading: false,
      dialogFormVisible: false,
      dialogFormAddVisible: false,
      form: {
        AutoSystemID: '',
        PName: '',
        PType: '',
        PScale: '',
        PContent: '',
        PSite: '',
        PTotalInvestment: '',
        PRateOfReturn: '',
        PPaybackPeriod: '',
        PDescribe: '',
        PPlannedCompletionTime: ''
      },
      formLabelWidth: '140px',
      userList: [],
      formAdd: {
        AutoSystemID: '',
        PName: '',
        PType: '',
        PScale: '',
        PContent: '',
        PSite: '',
        PTotalInvestment: '',
        PRateOfReturn: '',
        PPaybackPeriod: '',
        PDescribe: '',
        PPlannedCompletionTime: ''
      },
      value4: false,
      pStyle: {
        fontSize: '16px',
        color: 'rgba(0,0,0,0.85)',
        lineHeight: '24px',
        display: 'block',
        marginBottom: '16px'
      },
      activeItem: '',
      SystemID: '',
      projectData: [],
      value: [],
      dialogVisible: false,
      listStyle: {
        width: '250px',
        height: '400px'
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
  methods: {
    ...mapMutations('detail', ['set_paramsD', 'set_paramsB', 'set_paramsS']),
    ...mapMutations('tabs', ['set_detail_label']),
    getData () {
      this.loading = true
      this.searchForm.AutoSystemID = localStorage.getItem('AutoSystemID')
      this.form.AutoSystemID = this.searchForm.AutoSystemID
      this.formAdd.AutoSystemID = this.searchForm.AutoSystemID
      this.$axios
        .get(`/api/Project/GetProjectList`, { params: this.searchForm })
        .then(res => {
          if (res.data.data) {
            this.tableData = res.data.data
          } else {
            this.tableData = []
          }
          this.count = res.data.count
          this.loading = false
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

    // 显示编辑框
    showDialog (row) {
      this.form = {
        AutoSystemID: this.searchForm.AutoSystemID,
        PName: row.PName,
        PType: row.PType,
        PScale: row.PScale,
        PContent: row.PContent,
        PSite: row.PSite,
        PTotalInvestment: row.TotalInvestment,
        PRateOfReturn: row.PRateOfReturn,
        PPaybackPeriod: row.PPaybackPeriod,
        PDescribe: row.PDescribe,
        PPlannedCompletionTime: row.PPlannedCompletionTime,
        SystemID: row.SystemID
      }
      this.dialogFormVisible = true
    },

    // 编辑
    edit () {
      this.form.PPlannedCompletionTime = moment(
        this.form.PPlannedCompletionTime
      ).format('YYYY-MM-DDTHH:mm:ss')
      var url = '/api/Project/UpdataProject'
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
    },

    // 删除
    deleteItem (row) {
      console.log(row)
      this.$confirm(
        `${this.$t('base.delConfirm.tip')} ${row.PName}`,
        this.$t('base.delConfirm.title'),
        {
          confirmButtonText: this.$t('base.delConfirm.yes'),
          cancelButtonText: this.$t('base.delConfirm.no'),
          type: 'warning'
        }
      )
        .then(() => {
          var url = '/api/Project/DelProject'
          this.$axios
            .post(url, {
              AutoSystemID: this.searchForm.AutoSystemID,
              PName: row.PName,
              SystemID: row.SystemID
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
      this.formAdd.PPlannedCompletionTime = new Date()
    },
    addHttp () {
      this.formAdd.PPlannedCompletionTime = moment(
        this.formAdd.PPlannedCompletionTime
      ).format('YYYY-MM-DDTHH:mm:ss')
      var url = '/api/Project/AddProject'
      this.$axios
        .post(url, this.formAdd)
        .then(res => {
          if (res.data.code === 0) {
            this.formAdd = {}
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
    },

    // 详情
    toDetail (row) {
      this.value4 = true
      this.activeItem = row
    },

    // 控制器
    getController (row) {
      console.log(row)
      this.SystemID = row.SystemID
      this.dialogVisible = true
      this.value = []
      this.projectData = []
      var url = '/api/Project/GetControllerInProject'
      this.$axios
        .get(url, {
          params: {
            AutoSystemID: this.searchForm.AutoSystemID,
            ProjectSystemID: row.SystemID
          }
        })
        .then(res => {
          if (res.data.code === 0) {
            this.$message.success(res.data.msg)
            var data = res.data.data
            if (data.hasOwnProperty('controllerinproject')) {
              data.controllerinproject.map(item => {
                this.projectData.push({
                  key: item.SystemID,
                  label: item.Name
                })
                this.value.push(item.SystemID)
              })
            }

            if (data.hasOwnProperty('controlleroutproject')) {
              data.controlleroutproject.map(item => {
                this.projectData.push({
                  key: item.SystemID,
                  label: item.Name
                })
              })
            }
          } else if (res.data.code === 1) {
            this.$message.error(res.data.msg)
          }
        })
        .catch(err => {
          console.error(err)
        })
    },
    handleChange (newTargetKeys, direction, moveKeys) {
      this.value = newTargetKeys
      var url = '/api/Project/SetControllerInProject'
      var obj = {
        AutoSystemID: this.searchForm.AutoSystemID,
        ProjectSystemID: this.SystemID,
        ControllerSystemIDs: this.value.toString()
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
    },
    render1 (item) {
      return item.label
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

.el-dialog {
  width: 50%;
}
.el-form {
  margin-right: 10px;
}

.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 100%;
}

.ivu-transfer {
  text-align: center;
}
/deep/.ivu-transfer-list {
  text-align: left;
}
</style>
