<template>
  <div>
    <!-- 表单开始 -->
    <el-collapse-transition>
      <div style="box-sizing:border-box;" v-show="isShow">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>{{ $t("deviceUpgrade.searchTitle") }}</span>
          </div>
          <el-form
            :inline="true"
            :model="formInline"
            class="demo-form-inline"
            label-width="100px"
            label-position="right"
          >
            <el-form-item :label="$t('deviceUpgrade.searchForm.label')[0]">
              <el-input
                v-model="formInline.ICCID"
                :placeholder="$t('deviceUpgrade.searchForm.placeholder')[0]"
              ></el-input>
            </el-form-item>
            <el-form-item :label="$t('deviceUpgrade.searchForm.label')[1]">
              <el-input
                v-model="formInline.IDS"
                :placeholder="$t('deviceUpgrade.searchForm.placeholder')[1]"
              ></el-input>
            </el-form-item>
            <el-form-item :label="$t('deviceUpgrade.searchForm.label')[2]">
              <el-input
                v-model="formInline.VIN"
                :placeholder="$t('deviceUpgrade.searchForm.placeholder')[2]"
              ></el-input>
            </el-form-item>
            <el-form-item :label="$t('deviceUpgrade.searchForm.label')[3]">
              <el-input
                v-model="formInline.Name"
                :placeholder="$t('deviceUpgrade.searchForm.placeholder')[3]"
              ></el-input>
            </el-form-item>
            <!-- <br> -->
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
    <el-card class="box-card visible">
      <div slot="header" class="clearfix">
        <span>{{ $t("deviceUpgrade.listTitle") }}</span>
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
          :title="$t('deviceUpgrade.tableLabel')[0]"
          fixed="left"
          align="center"
        >
        </vxe-table-column>
        <vxe-table-column
          field="DICCID"
          :title="$t('deviceUpgrade.tableLabel')[1]"
          sortable
          width="300"
          show-overflow
          show-header-overflow
        >
        </vxe-table-column>
        <vxe-table-column
          field="DIDS"
          :title="$t('deviceUpgrade.tableLabel')[2]"
          sortable
          width="300"
          show-overflow
          show-header-overflow
        >
        </vxe-table-column>
        <vxe-table-column
          field="DName"
          :title="$t('deviceUpgrade.tableLabel')[3]"
          sortable
          width="200"
          show-overflow
          show-header-overflow
        >
        </vxe-table-column>
        <vxe-table-column
          field="DManageMentUserName"
          :title="$t('deviceUpgrade.tableLabel')[4]"
          sortable
          width="200"
          show-overflow
          show-header-overflow
        >
        </vxe-table-column>
        <vxe-table-column
          field="DTime"
          :title="$t('deviceUpgrade.tableLabel')[5]"
          width="250"
          sortable
          show-overflow
          show-header-overflow
        >
        </vxe-table-column>
        <vxe-table-column
          :title="$t('deviceUpgrade.tableLabel')[6]"
          align="center"
          width="250"
          show-header-overflow
        >
          <template v-slot="{ row }">
            <el-button plain size="small" @click="showDialog(row)">
              <i class="el-icon-info">{{ $t("deviceUpgrade.operation")[0] }}</i>
            </el-button>
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
        :title="$t('deviceUpgrade.operation')[0]"
        :visible.sync="dialogFormVisible"
        :close-on-click-modal="false"
      >
        <div style="position:relative" v-if="show">
          <Spin v-if="spinShow1" fix></Spin>
          <el-form :model="form">
            <el-form-item
              :label="$t('deviceUpgrade.dialog.label')[0]"
              :label-width="formLabelWidth"
            >
              <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item
              :label="$t('deviceUpgrade.dialog.label')[1]"
              :label-width="formLabelWidth"
            >
              <el-input
                v-model="form.devicesystemid"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              :label="$t('deviceUpgrade.dialog.label')[2]"
              :label-width="formLabelWidth"
            >
              <el-input v-model="form.deviceid" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item
              :label="$t('deviceUpgrade.dialog.label')[3]"
              :label-width="formLabelWidth"
            >
              <el-select v-model="form.target" @change="getLabel">
                <el-option
                  v-for="(item, index) in target"
                  :key="index"
                  :value="item.unit"
                  :label="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <el-form :inline="true" id="upload">
            <el-form-item
              :label="$t('deviceUpgrade.dialog.label')[4]"
              :label-width="formLabelWidth"
            >
              <el-input
                readonly
                v-model="fileName"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item :label-width="formLabelWidth">
              <el-upload
                class="upload-demo"
                :action="baseURL + '/api/File/GetDMSCBootLoader'"
                :file-list="fileList"
                :auto-upload="false"
                :show-file-list="false"
                :multiple="false"
                :data="form"
                :on-success="handleSuccess"
                :on-error="handleError"
                ref="upload"
                :on-change="showFileName"
              >
                <el-button type="primary" @click="showFileName">{{
                  $t("deviceUpgrade.dialog.btn")[0]
                }}</el-button>
              </el-upload>
            </el-form-item>
          </el-form>
        </div>
        <div v-if="!show">
          <el-form :model="form">
            <el-form-item
              :label="$t('deviceUpgrade.dialog.label')[0]"
              :label-width="formLabelWidth"
            >
              <p>
                {{ form.name }}
              </p>
            </el-form-item>
            <el-form-item
              :label="$t('deviceUpgrade.dialog.label')[1]"
              :label-width="formLabelWidth"
            >
              <p>
                {{ form.devicesystemid }}
              </p>
            </el-form-item>
            <el-form-item
              :label="$t('deviceUpgrade.dialog.label')[2]"
              :label-width="formLabelWidth"
            >
              <p>
                {{ form.deviceid }}
              </p>
            </el-form-item>
            <el-form-item
              :label="$t('deviceUpgrade.dialog.label')[3]"
              :label-width="formLabelWidth"
            >
              {{ upgradeTarget }}
            </el-form-item>
            <el-form-item
              :label="$t('deviceUpgrade.dialog.label')[4]"
              :label-width="formLabelWidth"
            >
              <p>
                {{ fileName }}
              </p>
            </el-form-item>
            <el-form-item
              :label="$t('deviceUpgrade.dialog.label')[5]"
              :label-width="formLabelWidth"
            >
              <p v-if="successTipShow" style="color:#409EFF">
                {{ successTip }}
              </p>
              <p v-if="!successTipShow" style="color:#409EFF">
                {{ $t("deviceUpgrade.dialog.unit")[0] }}...{{ num
                }}{{ $t("deviceUpgrade.dialog.unit")[1] }}
              </p>
            </el-form-item>
          </el-form>
        </div>
        <div slot="footer" class="dialog-footer" v-if="show">
          <el-button @click="dialogFormVisible = false">{{
            $t("base.cancel")
          }}</el-button>
          <el-button type="primary" @click="edit" :disabled="spinShow1">{{
            $t("base.submit")
          }}</el-button>
        </div>
        <div slot="footer" class="dialog-footer" v-if="!show">
          <el-button @click="dialogFormVisible = false">
            {{
              !successTipShow
                ? $t("deviceUpgrade.dialog.btn")[1]
                : $t("deviceUpgrade.dialog.btn")[2]
            }}
          </el-button>
        </div>
      </el-dialog>
      <!-- 编辑表单结束 -->
    </el-card>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      formInline: {
        page: 1,
        limit: 2,
        ICCID: '',
        IDS: '',
        VIN: '',
        Name: '',
        AutoSystemID: ''
      },
      tableData: [],
      isShow: true,
      count: 0,
      loading: false,
      form: {
        AutoSystemID: '',
        name: '',
        target: '',
        deviceid: '',
        devicesystemid: ''
      },
      formLabelWidth: '120px',
      dialogFormVisible: false,
      target: [],
      spinShow1: false,
      fileList: [],
      num: 5,
      show: true,
      successTip: '',
      upgradeTarget: '',
      successTipShow: false,
      baseURL: this.GLOBAL.baseURL,
      exportConfig: {
        filename: 'export',
        sheetName: 'Sheet1',
        types: ['csv', 'xlsx']
      },
      fileName: ''
    }
  },
  methods: {
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

    // 显示编辑框
    showDialog (row) {
      this.dialogFormVisible = true
      this.show = true
      this.successTipShow = false
      this.successTip = ''
      this.form = {}
      this.fileName = ''
      this.spinShow1 = true
      this.getControllerList()
      console.log(row)
      this.form.devicesystemid = row.SystemID
      this.form.deviceid = row.DIDS
      this.form.name = row.DName
    },

    getData () {
      this.loading = true
      this.formInline.AutoSystemID = localStorage.getItem('AutoSystemID')
      this.$axios
        .get(
          `/api/Devices/GetRegistrationEquipmentList?AutoSystemID=${this.formInline.AutoSystemID}&page=${this.formInline.page}&limit=${this.formInline.limit}&ICCID=${this.formInline.ICCID}&IDS=${this.formInline.IDS}&VIN=${this.formInline.VIN}&Name=${this.formInline.Name}`
        )
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

    // 编辑
    edit () {
      this.form.AutoSystemID = localStorage.getItem('AutoSystemID')
      this.$refs.upload.submit()
    },

    // 获取控制器列表
    getControllerList () {
      this.$axios
        .get(
          `/api/Devices/GetTargetList?AutoSystemID=${this.formInline.AutoSystemID}`
        )
        .then(res => {
          if (res.data.code === 0) {
            this.target = res.data.data.TargetList
            this.form.target = this.target[0].unit
            this.upgradeTarget = this.target[0].value
          } else {
            this.target = []
          }
          setTimeout(() => {
            this.spinShow1 = false
          }, 500)
        })
        .catch(error => {
          console.log(error)
        })
    },
    showFileName (file, fileList) {
      if (file.status === 'ready') {
        this.fileName = file.name
      }
    },
    handleSuccess (response, file, fileList) {
      // this.$message.success(response.msg)
      // this.dialogFormVisible = false
      if (response.code === 0) {
        var timer
        this.show = false
        this.num = 20
        timer = setInterval(() => {
          if (this.num >= 1) {
            this.num--
          } else {
            clearInterval(timer)
            this.successCallback(response.callback)
            this.successTipShow = true
          }
        }, 1000)
      } else if (response.code === 2) {
        this.$message.error(response.msg)
        localStorage.removeItem('AutoSystemID')
        this.$router.push({ path: '/login' })
      } else {
        this.$message.warning(response.msg)
      }
    },
    handleError (response, file, fileList) {
      this.form = {}
      this.fileName = ''
      this.$message.error(response.msg)
    },
    successCallback (id) {
      this.$axios
        .get(
          `/api/Command/GetCallBackInfo?AutoSystemID=${this.formInline.AutoSystemID}&CallBackSystemID=${id}`
        )
        .then(res => {
          if (res.data.code === 0) {
            this.successTip = res.data.data.Result
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    getLabel (val) {
      this.upgradeTarget = this.$target.find(
        val => val === this.form.target
      ).value
    }
  },
  computed: {
    ...mapState('table', ['pageSize'])
  },
  created () {
    this.formInline.limit = this.pageSize[0]
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

#upload {
  display: flex;
}

#upload .el-form-item:nth-child(1) {
  flex: 1;
}
#upload .el-form-item:nth-child(1) /deep/.el-form-item__content {
  width: calc(100% - 120px);
}
</style>
