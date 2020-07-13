<template>
  <div>
    <!-- 表单开始 -->
    <el-collapse-transition>
      <div style="box-sizing:border-box;" v-show="isShow">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>模糊查询</span>
          </div>
          <el-form
            :inline="true"
            :model="formInline"
            class="demo-form-inline"
            label-width="90px"
            label-position="right"
          >
            <el-form-item label="标题:">
              <el-input
                v-model="formInline.Caption"
                placeholder="请输入标题"
              ></el-input>
            </el-form-item>
            <el-form-item label="简体中文:">
              <el-input
                v-model="formInline.ChineseSimplified"
                placeholder="请输入简体中文"
              ></el-input>
            </el-form-item>
            <el-form-item label="繁体中文:">
              <el-input
                v-model="formInline.ChineseTraditional"
                placeholder="请输入繁体中文"
              ></el-input>
            </el-form-item>
            <el-form-item label="英文:">
              <el-input
                v-model="formInline.Name"
                placeholder="请输入英文"
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
                >查询</el-button
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
        <span>设备管理</span>
      </div>

      <!-- 表格开始 -->
      <vxe-toolbar custom print export>
          <template v-slot:buttons>
            <el-button
          type="primary"
          size="small"
          @click="showAddForm"
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
          title="序号"
          fixed="left"
          align="center"
        ></vxe-table-column>
        <vxe-table-column
          field="Code"
          width="200"
          title="语言代码"
          sortable
          align="center"
          show-overflow
        >
        </vxe-table-column>
        <vxe-table-column
          field="Caption"
          title="标题"
          width="250"
          show-overflow
        >
        </vxe-table-column>
        <vxe-table-column
          field="ChineseSimplified"
          title="简体中文"
          width="250"
          show-overflow
        >
        </vxe-table-column>
        <vxe-table-column
          field="ChineseTraditional"
          title="繁体中文"
          width="250"
          show-overflow
        >
        </vxe-table-column>
        <vxe-table-column
          field="English"
          title="英文"
          width="250"
          show-overflow
        >
        </vxe-table-column>
        <vxe-table-column title="操作" align="center" width="300">
          <template v-slot="{ row }">
            <el-button
              plain
              size="small"
              @click="editItem(row)"
            >
              <i class="el-icon-info">更新内容</i>
            </el-button>
            <el-button
              plain
              size="small"
              @click="delItem(row)"
            >
              <i class="el-icon-info">删除语言</i>
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

      <!-- 添加表单开始 -->
      <el-dialog
        width="35%"
        :close-on-click-modal="false"
        :visible.sync="dialogFormAddVisible"
        title="语言数据"
      >
        <div style="max-height:500px;overflow-y:auto;overflow-x:hidden">
          <el-form
            label-width="90px"
            label-position="right"
            :model="addForm"
            style="position:relative"
          >
            <Spin v-if="spinShow" fix></Spin>
            <el-form-item label="语言标题">
              <el-input
                v-model="addForm.Caption"
                placeholder="请输入语言标题"
              ></el-input>
            </el-form-item>
            <el-form-item label="目标类型">
              <el-select
                v-model="addForm.targetType"
                placeholder="请选择目标类型"
              >
                <el-option
                  v-for="item in targetType"
                  :key="item.Value"
                  :label="item.Text"
                  :value="item.Value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="设备类型">
              <el-select
                v-model="addForm.deviceType"
                placeholder="请选择设备类型"
              >
                <el-option
                  v-for="item in deviceType"
                  :key="item.Value"
                  :label="item.Text"
                  :value="item.Value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="分类类型">
              <el-select
                v-model="addForm.classifyType"
                placeholder="请选择分类类型"
              >
                <el-option
                  v-for="item in classifyType"
                  :key="item.Value"
                  :label="item.Text"
                  :value="item.Value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>

        <div slot="footer" class="dialog-footer">
          <el-button
            @click="addHttp"
            size="medium"
            type="primary"
            :disabled="spinShow"
          >
            提 交
          </el-button>
          <el-button @click="dialogFormAddVisible = false" size="medium">
            取 消
          </el-button>
        </div>
      </el-dialog>
      <!-- 添加表单结束 -->

      <!-- 编辑表单开始 -->
      <el-dialog
        width="35%"
        :close-on-click-modal="false"
        :visible.sync="dialogFormEditVisible"
        title="语言数据"
      >
        <div style="max-height:500px;overflow-y:auto;overflow-x:hidden">
          <el-form
            label-width="90px"
            label-position="right"
            :model="editForm"
            style="position:relative"
          >
            <Spin v-if="spinShow" fix></Spin>
            <el-form-item label="语言标题">
              <el-input
                v-model="editForm.Caption"
                placeholder="请输入语言标题"
                disabled
              ></el-input>
            </el-form-item>
            <el-form-item label="语言类型">
              <el-select
                v-model="editForm.Type"
                placeholder="请选择语言类型"
              >
                <el-option
                  v-for="item in languageType"
                  :key="item.Value"
                  :label="item.Text"
                  :value="item.Value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="修改内容">
              <el-input type="textarea" v-model="editForm.Text" :rows="5"></el-input>
            </el-form-item>
          </el-form>
        </div>

        <div slot="footer" class="dialog-footer">
          <el-button
            @click="editHttp"
            size="medium"
            type="primary"
            :disabled="spinShow"
          >
            提 交
          </el-button>
          <el-button @click="dialogFormEditVisible=false" size="medium">
            取 消
          </el-button>
        </div>
      </el-dialog>
      <!-- 编辑表单结束 -->
    </el-card>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
export default {
  data () {
    return {
      formInline: {
        page: 1,
        limit: 2,
        Caption: '',
        ChineseSimplified: '',
        ChineseTraditional: '',
        English: '',
        AutoSystemID: '',
        LanguageSystemID: '0'
      },
      tableData: [],
      isShow: true,
      exportConfig: {
        filename: 'export',
        sheetName: 'Sheet1',
        types: ['csv', 'xlsx']
      },
      count: 0,
      loading: false,
      dialogFormAddVisible: false,
      spinShow: false,
      targetType: '',
      deviceType: '',
      classifyType: '',
      languageType: '',
      addForm: {
        Caption: '',
        classifyType: '',
        targetType: '',
        deviceType: ''
      },
      dialogFormEditVisible: false,
      editForm: {
        AutoSystemID: '',
        SystemID: '',
        Type: '',
        Text: '',
        Caption: ''
      }
    }
  },
  methods: {
    ...mapMutations('pcsdetail', ['set_paramsRT']),
    ...mapMutations('tabs', ['set_detail_label']),
    getData () {
      this.loading = true
      this.formInline.AutoSystemID = localStorage.getItem('AutoSystemID')
      this.$axios
        .get(`/api/Language/GetLanguageInfos`, { params: this.formInline })
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
      this.formInline.limit = val
      this.getData()
    },

    // 当前页
    handleCurrentChange (val) {
      this.formInline.page = val
      this.getData()
    },

    showAddForm () {
      this.spinShow = true
      this.dialogFormAddVisible = true
      this.getTargetType().then(res => {
        return this.getDeviceType()
      }).then(res => {
        return this.getClassifyType()
      }).then(res => {
        this.spinShow = false
      })
    },

    addHttp () {
      var AutoSystemID = this.formInline.AutoSystemID
      var url = '/api/Language/Add'
      var code = this.addForm.targetType * 1000000 + this.addForm.deviceType * 1000 + this.addForm.classifyType * 1
      console.log(code)
      var params = {
        AutoSystemID: AutoSystemID,
        Code: code,
        Caption: this.addForm.Caption
      }
      this.$axios.post(url, params)
        .then(res => {
          if (res.data.code === 0) {
            this.$message.success(res.data.msg)
            this.addForm.classifyType = ''
            this.addForm.Caption = ''
            this.addForm.targetType = ''
            this.addForm.deviceType = ''
            this.dialogFormAddVisible = false
          } else {
            this.$message.error(res.data.msg)
          }
        })
        .catch(err => {
          console.error(err)
        })
    },

    editItem (row) {
      this.editForm.Caption = row.Caption
      this.editForm.SystemID = row.SystemID
      this.editForm.Text = ''
      this.editForm.Type = ''
      this.dialogFormEditVisible = true
      this.spinShow = true
      this.getLanguageType().then(res => {
        this.editForm.Type = this.languageType[0].Value
        this.spinShow = false
      })
    },
    editHttp () {
      var AutoSystemID = this.formInline.AutoSystemID
      var url = '/api/Language/Edit'
      var params = {
        AutoSystemID: AutoSystemID,
        SystemID: this.editForm.SystemID,
        Type: this.editForm.Type,
        Text: this.editForm.Text
      }
      this.$axios.post(url, params)
        .then(res => {
          if (res.data.code === 0) {
            this.$message.success(res.data.msg)
            this.dialogFormEditVisible = false
            this.getData()
          } else {
            this.$message.error(res.data.msg)
          }
        })
        .catch(err => {
          console.error(err)
        })
    },

    delItem (row) {
      var url = '/api/Language/Delete'
      let obj = {
        AutoSystemID: this.formInline.AutoSystemID,
        SystemID: row.SystemID
      }
      this.$confirm(`确定删除吗`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$axios
            .post(url, obj)
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

    // 获取目标类型
    getTargetType () {
      return new Promise((resolve, reject) => {
        var AutoSystemID = this.formInline.AutoSystemID
        this.$axios
          .get(`/api/Language/GetTargetType?AutoSystemID=${AutoSystemID}`)
          .then(res => {
            if (res.status === 200) {
              if (res.data.code === 0) {
                this.targetType = res.data.data
                this.addForm.targetType = this.targetType[0].Value
                resolve(res.data.data)
              } else {
                resolve()
              }
            }
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    // 获取设备类型
    getDeviceType () {
      return new Promise((resolve, reject) => {
        var AutoSystemID = this.formInline.AutoSystemID
        this.$axios
          .get(`/api/Language/GetDeviceType?AutoSystemID=${AutoSystemID}`)
          .then(res => {
            if (res.status === 200) {
              if (res.data.code === 0) {
                this.deviceType = res.data.data
                this.addForm.deviceType = this.deviceType[0].Value
                resolve(res.data.data)
              } else {
                resolve()
              }
            }
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    // 获取分类类型
    getClassifyType () {
      return new Promise((resolve, reject) => {
        var AutoSystemID = this.formInline.AutoSystemID
        this.$axios
          .get(`/api/Language/GetClassifyType?AutoSystemID=${AutoSystemID}`)
          .then(res => {
            if (res.status === 200) {
              if (res.data.code === 0) {
                this.classifyType = res.data.data
                this.addForm.classifyType = this.classifyType[0].Value
                resolve(res.data.data)
              } else {
                resolve()
              }
            }
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    // 获取语言类型
    getLanguageType () {
      return new Promise((resolve, reject) => {
        var AutoSystemID = this.formInline.AutoSystemID
        this.$axios
          .get(`/api/Language/GetLanguageType?AutoSystemID=${AutoSystemID}`)
          .then(res => {
            if (res.status === 200) {
              if (res.data.code === 0) {
                this.languageType = res.data.data
                resolve(res.data.data)
              } else {
                resolve()
              }
            }
          })
          .catch(error => {
            reject(error)
          })
      })
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
</style>
