<template>
  <div>
    <!-- 表单开始 -->
    <el-collapse-transition>
      <div style="box-sizing:border-box;" v-show="isShow">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>部门信息查询</span>
          </div>
          <el-form
            :inline="true"
            :model="searchForm"
            class="demo-form-inline"
            label-width="120px"
            label-position="right"
          >
            <el-form-item label="部门名称:">
              <el-input
                v-model="searchForm.LikeName"
                placeholder="请输入部门名称"
              ></el-input>
            </el-form-item>
            <el-form-item label="描述信息:">
              <el-input
                v-model="searchForm.LikeMessage"
                placeholder="请输入描述信息"
              ></el-input>
            </el-form-item>
            <el-form-item label="部门类型:">
              <el-select v-model="searchForm.LikeType">
                <el-option
                  v-for="(item, index) in options"
                  :key="index"
                  :value="item.SystemID"
                  :label="item.Name"
                ></el-option>
              </el-select>
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

    <el-card class="box-card visible">
      <div slot="header" class="clearfix">
        <span>部门信息</span>
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
          {{$t('base.add')}}
        </el-button>
        <el-button
          type="primary"
          size="small"
          @click="deleteItems"
          class="button-left"
        >
          <i class="el-icon-delete"></i>
          {{$t('base.multipleDel')}}
        </el-button>
        <el-button
          type="primary"
          size="small"
          @click="getData"
          class="button-left"
        >
          <i class="el-icon-refresh-right"></i>
          {{$t('base.refresh')}}
        </el-button>
        <el-button
          type="primary"
          size="small"
          class="button-left"
          @click="isShow = !isShow"
        >
          <i class="el-icon-search"></i>
          {{$t('base.search')}}
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
        <vxe-table-column type="seq" width="50" title="序号" fixed="left">
        </vxe-table-column>
        <vxe-table-column
          field="buDName"
          title="部门名称"
          width="200"
          sortable
          show-overflow
          align="left"
        >
        </vxe-table-column>
        <vxe-table-column
          field="brtRTName"
          title="部门类型"
          width="250"
          show-overflow
          sortable
        >
        </vxe-table-column>
        <vxe-table-column
          field="buDDescribe"
          title="描述信息"
          width="250"
          sortable
          show-overflow
          align="left"
        >
        </vxe-table-column>
        <vxe-table-column
          field="buDCreationTime"
          title="创建时间"
          width="330"
          sortable
          show-overflow
        >
        </vxe-table-column>
        <vxe-table-column title="操作" width="350" fixed="right">
          <template v-slot="{ row }">
            <el-button size="mini" @click="editItem(row)">编辑</el-button>
            <el-button size="mini" @click="getProject(row)" type="primary">项目</el-button>
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
        :current-page="searchForm.page"
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
        title="添加部门"
      >
        <el-form label-width="90px" label-position="right" :model="addForm">
          <el-form-item label="部门名称:">
              <el-input
                v-model="addForm.Name"
                placeholder="请输入部门名称"
              ></el-input>
            </el-form-item>
            <el-form-item label="部门类型:">
              <el-select v-model="addForm.Type">
                <el-option
                  v-for="(item, index) in options1"
                  :key="index"
                  :value="item.SystemID"
                  :label="item.Name"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="描述信息:">
              <el-input
                type="textarea"
                :autosize="{ minRows: 4, maxRows: 8 }"
                v-model="addForm.Describe"
                placeholder="请输入描述信息"
              ></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addHttp" size="medium" type="primary">
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
        title="修改部门"
      >
        <el-form label-width="90px" label-position="right" :model="editForm">
          <el-form-item label="部门名称">
            <el-input
              v-model="editForm.Name"
              placeholder="请输入部门名称"
            ></el-input>
          </el-form-item>
          <el-form-item label="部门类型">
            <el-select v-model="editForm.Type">
              <el-option
                v-for="(item, index) in options2"
                :key="index"
                :value="item.SystemID"
                :label="item.Name"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="部门描述">
            <el-input
              v-model="editForm.Describe"
              placeholder="请输入部门描述"
            ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="editHttp" size="medium" type="primary">
            提 交
          </el-button>
          <el-button @click="dialogFormEditVisible = false" size="medium">
            取 消
          </el-button>
        </div>
      </el-dialog>
      <!-- 编辑表单结束 -->

      <!-- 穿梭框开始 -->
      <el-dialog
        title="项目列表"
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
        :titles="['不属于部门', '属于部门']"></Transfer>
      </el-dialog>
      <!-- 穿梭框结束 -->
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
        limit: 10,
        LikeName: '',
        LikeMessage: '',
        LikeType: 0
      },
      isShow: true,
      options: [{ Name: '选择日志类型', SystemID: 0 }],
      tableData: [],
      loading: false,
      count: 0,
      addForm: {},
      dialogFormVisible: false,
      selectedItems: [],
      editForm: {
        Name: '',
        Type: '',
        Describe: ''
      },
      dialogFormEditVisible: false,
      dialogFormAddVisible: false,
      roleTree: [],
      options1: [],
      options2: [],
      RoleSystemID: '',
      projectData: [],
      value: [],
      dialogVisible: false,
      listStyle: {
        width: '250px',
        height: '400px'
      },
      activeItem: '',
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
  async created () {
    try {
      this.searchForm.AutoSystemID = localStorage.getItem('AutoSystemID')
      this.searchForm.limit = this.pageSize[0]
      let res = await this.getRoleType()
      this.options = [{ Name: '选择日志类型', SystemID: 0 }, ...res.data.data]
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

    getData () {
      this.loading = true
      var url = '/api/Users/GetDepartmentList'
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

    // 获取选择列表
    getRoleType () {
      var url = '/api/Users/GetDepartmentType'
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

    // 添加
    async addItem () {
      try {
        let res = await this.getRoleType()
        if (res.data.code === 0) {
          this.options1 = res.data.data
          this.addForm.AutoSystemID = this.searchForm.AutoSystemID
          this.dialogFormAddVisible = true
        } else if (res.data.code === 1) {
          this.$message.error(res.data.msg)
        }
      } catch (err) {
        console.log(err)
      }
    },

    addHttp () {
      var url = '/api/Users/AddDepartmentInfo'
      this.$axios
        .post(url, this.addForm)
        .then(res => {
          if (res.data.code === 0) {
            this.$message.success(res.data.msg)
            this.addForm = {}
          } else if (res.data.code === 1) {
            this.$message.error(res.data.msg)
          }
          this.dialogFormAddVisible = false
          this.getData()
        })
        .catch(err => {
          console.error(err)
        })
    },

    // 删除
    deleteItem (row) {
      console.log(row)
      var url = '/api/Users/DeleteDepartment'
      let obj = {
        AutoSystemID: this.searchForm.AutoSystemID,
        data: [
          {
            SystemID: row.buSystemID,
            Name: row.buDName
          }
        ]
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
            message: '已取消删除'
          })
        })
    },

    // 删除多个
    deleteItems () {
      this.selectedItems = this.$refs.xTable.getCheckboxRecords()
      var arr = []
      if (this.selectedItems.length === 0) {
        this.$message.warning('请选择要删除的用户')
        return false
      }
      for (const item of this.selectedItems) {
        arr.push({
          Name: item.buDName,
          SystemID: item.buSystemID
        })
      }
      this.$confirm(`确定删除吗`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          var url = '/api/Users/DeleteDepartment'
          this.$axios
            .post(url, {
              AutoSystemID: this.searchForm.AutoSystemID,
              data: arr
            })
            .then(res => {
              if (res.data.code === 0) {
                this.$message.success('删除成功')
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

    // 编辑
    async editItem (row) {
      try {
        let res = await this.getRoleType()
        if (res.data.code === 0) {
          this.options2 = res.data.data
          this.editForm = {
            AutoSystemID: this.searchForm.AutoSystemID,
            Describe: row.buDDescribe,
            Name: row.buDName,
            SystemID: row.buSystemID,
            Type: row.brtSystemID
          }
          this.dialogFormEditVisible = true
        } else if (res.data.code === 1) {
          this.$message.error(res.data.msg)
        }
      } catch (err) {
        console.log(err)
      }
    },
    editHttp () {
      var url = '/api/Users/EditDepartmentInfo'
      this.$axios
        .post(url, this.editForm)
        .then(res => {
          if (res.data.code === 0) {
            this.$message.success(res.data.msg)
            this.editForm = {}
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

    // 获取项目列表
    getProject (row) {
      this.activeItem = row.buSystemID
      this.dialogVisible = true
      this.value = []
      this.projectData = []
      var url = '/api/Project/GetProjectInDepartment'
      this.$axios
        .get(url, { params: {
          AutoSystemID: this.searchForm.AutoSystemID,
          DeparSystemID: row.buSystemID
        } })
        .then(res => {
          if (res.data.code === 0) {
            this.$message.success(res.data.msg)
            var data = res.data.data
            data.projectindepartment.map(item => {
              this.projectData.push({
                key: item.SystemID,
                label: item.Name
              })
              this.value.push(item.SystemID)
            })
            data.projectoutdepartment.map(item => {
              this.projectData.push({
                key: item.SystemID,
                label: item.Name
              })
            })
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
      var url = '/api/Project/SetProjectInDepartment'
      var obj = {
        AutoSystemID: this.searchForm.AutoSystemID,
        DepartmentSystemID: this.activeItem,
        ProjectSystemIDs: this.value.toString()
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

.menu-btn:hover+.menu-wrapper {
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

#el-dialog {
  max-height: 662px;
}

.ivu-transfer {
  text-align: center;
}
/deep/.ivu-transfer-list {
  text-align: left;
}
</style>
