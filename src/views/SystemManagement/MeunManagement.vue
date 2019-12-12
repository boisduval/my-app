<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>菜单列表</span>
      </div>
      <!-- 表格操作栏开始 -->
      <div class="table-oper">
        <el-button
          type="primary"
          size="small"
          class="button-left"
          @click="dialogFormAddVisible = true"
        >
          <i class="el-icon-plus"></i>
          添加
        </el-button>
        <el-button
          type="primary"
          size="small"
          class="button-left"
          @click="$refs.xTree.setAllTreeExpansion(true)"
        >
          <i class="el-icon-s-fold"></i>
          全部展开
        </el-button>
        <el-button
          type="primary"
          size="small"
          class="button-left"
          @click="$refs.xTree.clearTreeExpand()"
        >
          <i class="el-icon-s-unfold"></i>
          全部折叠
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
                @change="$refs.xTree.refreshColumn()"
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
      <vxe-table
        id="left"
        border
        resizable
        show-overflow
        ref="xTree"
        :tree-config="{
          children: 'children',
          iconOpen: 'fa fa-minus-circle',
          iconClose: 'fa fa-plus-circle'
        }"
        :data="treeData"
        :customs.sync="customColumns"
        max-height="600px"
        v-loading="loading"
        element-loading-background="rgba(0, 0, 0, 0)"
        highlight-hover-row
        highlight-current-row
      >
        <vxe-table-column
          type="index"
          title="序号"
          width="50"
          fixed="left"
          align="center"
        ></vxe-table-column>
        <vxe-table-column title="资源名称" tree-node width="180">
          <template v-slot="{ row }">
            <span>
              <template v-if="row.children && row.children.length">
                <i
                  class="tree-node-icon fa"
                  :class="
                    $refs.xTree.isTreeExpandByRow(row)
                      ? 'fa-folder-open-o'
                      : 'fa-folder-o'
                  "
                ></i>
              </template>
              <template v-else>
                <i class="tree-node-icon fa fa-file-o"></i>
              </template>
              <span>{{ row.permissionName }}</span>
            </span>
          </template>
        </vxe-table-column>
        <vxe-table-column
          field="permissionUrl"
          title="资源路径"
          width="220"
        ></vxe-table-column>
        <vxe-table-column
          field="permissionType"
          title="资源简介"
          width="400"
        ></vxe-table-column>
        <vxe-table-column
          field="SOrder"
          title="排序"
          width="150"
        ></vxe-table-column>
        <vxe-table-column title="类型" width="100" field="resType">
        </vxe-table-column>
        <vxe-table-column title="显示" width="80" align="center" field="Use">
          <template v-slot="{ row }">
            <el-switch
              @change="updateStatus(row)"
              v-model="row.Use"
              active-color="#00A854"
              active-value="1"
              inactive-color="#F04134"
              inactive-value="0"
            >
            </el-switch>
          </template>
        </vxe-table-column>
        <vxe-table-column
          title="基础页面"
          width="80"
          align="center"
          field="SBasic"
        >
          <template v-slot="{ row }">
            <el-switch
              v-model="row.SBasic"
              active-color="#00A854"
              active-value="1"
              inactive-color="#F04134"
              inactive-value="0"
              @change="updataMenuBasic(row)"
            >
            </el-switch>
          </template>
        </vxe-table-column>
        <vxe-table-column title="操作" width="330" align="center">
          <template v-slot="{ row }">
            <el-button
              size="mini"
              type="primary"
              @click="addItem(row)"
              v-if="row.pid === '0'"
            >
              添加
            </el-button>
            <el-button size="mini" @click="editItem(row)">修改</el-button>
            <el-button size="mini" type="danger" @click="deleteItem(row)">
              删除
            </el-button>
          </template>
        </vxe-table-column>
      </vxe-table>

      <!-- 添加父表单开始 -->
      <el-dialog
        title="添加菜单"
        :visible.sync="dialogFormAddVisible"
        width="30%"
        :close-on-click-modal="false"
      >
        <el-form :model="addForm" label-width="80px">
          <el-form-item label="菜单名称">
            <el-input v-model="addForm.Text"></el-input>
          </el-form-item>
          <el-form-item label="链接地址">
            <el-input v-model="addForm.Href"></el-input>
          </el-form-item>
          <el-form-item label="菜单顺序">
            <el-input v-model="addForm.SOrder"></el-input>
          </el-form-item>
          <el-form-item label="菜单图标">
            <el-input v-model="addForm.Class"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormAddVisible = false">取 消</el-button>
          <el-button type="primary" @click="addHttp()">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 添加父表单结束 -->

      <!-- 添加子表单开始 -->
      <el-dialog
        title="添加菜单"
        :visible.sync="dialogFormAddChildVisible"
        width="30%"
        :close-on-click-modal="false"
      >
        <el-form :model="addChildForm" label-width="90px">
          <el-form-item label="父菜单名称">
            <el-input v-model="addChildForm.Name" :readonly="true"></el-input>
          </el-form-item>
          <el-form-item label="菜单名称">
            <el-input v-model="addChildForm.Text"></el-input>
          </el-form-item>
          <el-form-item label="链接地址">
            <el-input v-model="addChildForm.Href"></el-input>
          </el-form-item>
          <el-form-item label="菜单顺序">
            <el-input v-model="addChildForm.SOrder"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormAddChildVisible = false"
            >取 消</el-button
          >
          <el-button type="primary" @click="addChildHttp()">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 添加子表单结束 -->

      <!-- 编辑父表单开始 -->
      <el-dialog
        title="修改菜单"
        :visible.sync="dialogFormEditVisible"
        width="30%"
        :close-on-click-modal="false"
      >
        <el-form :model="editForm" label-width="80px">
          <el-form-item label="菜单名称">
            <el-input v-model="editForm.Text"></el-input>
          </el-form-item>
          <el-form-item label="链接地址">
            <el-input v-model="editForm.Href"></el-input>
          </el-form-item>
          <el-form-item label="菜单顺序">
            <el-input v-model="editForm.SOrder"></el-input>
          </el-form-item>
          <el-form-item label="菜单图标">
            <el-input v-model="editForm.Class"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormEditVisible = false">取 消</el-button>
          <el-button type="primary" @click="editHttp()">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 编辑父表单结束 -->

      <!-- 编辑子表单开始 -->
      <el-dialog
        title="添加菜单"
        :visible.sync="dialogFormEditChildVisible"
        width="30%"
        :close-on-click-modal="false"
      >
        <el-form :model="editChildForm" label-width="90px">
          <el-form-item label="父菜单名称">
            <el-select v-model="editChildForm.MainSystemID">
              <el-option
                v-for="(item, index) in options"
                :key="index"
                :value="item.SystemID"
                :label="item.Name"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="菜单名称">
            <el-input v-model="editChildForm.Text"></el-input>
          </el-form-item>
          <el-form-item label="链接地址">
            <el-input v-model="editChildForm.Href"></el-input>
          </el-form-item>
          <el-form-item label="菜单顺序">
            <el-input v-model="editChildForm.SOrder"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormEditChildVisible = false"
            >取 消</el-button
          >
          <el-button type="primary" @click="editChildHttp()">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 编辑子表单结束 -->
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      searchForm: {
        AutoSystemID: ''
      },
      tableData: [],
      customColumns: [],
      isShow: true,
      fileName: '菜单信息',
      loading: false,
      dialogFormVisible: false,
      treeData: [],
      addForm: {
        MainSystemID: '',
        AutoSystemID: ''
      },
      dialogFormAddVisible: false,
      stateForm: {},
      basicForm: {},
      dialogFormAddChildVisible: false,
      addChildForm: {},
      editForm: {
        AutoSystemID: '',
        MainSystemID: '',
        Href: '',
        Text: '',
        Class: '',
        SOrder: ''
      },
      dialogFormEditVisible: false,
      options: [],
      editChildForm: {
        AutoSystemID: '',
        LeveSystemID: '',
        MainSystemID: '',
        Href: '',
        Text: '',
        SOrder: ''
      },
      dialogFormEditChildVisible: false
    }
  },
  created () {
    this.searchForm.AutoSystemID = localStorage.getItem('AutoSystemID')
    this.getData()
  },
  methods: {
    // 打印
    printEvent () {
      this.$refs.xTree.print({ original: true, isHeader: false })
    },

    // 导出csv
    exportDataEvent () {
      this.$refs.xTree.exportData({ type: 'csv' })
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
    getData () {
      this.loading = true
      var url = '/api/Menu/GetEidtMenuList'
      this.$axios
        .get(url, { params: this.searchForm })
        .then(res => {
          if (res.data.code === 0) {
            this.tableData = res.data.data
            this.loading = false
            this.getTreeData()
          } else if (res.data.code === 1) {
            this.$message.error(res.data.msg)
          }
        })
        .catch(err => {
          console.error(err)
        })
    },

    // 取父节点
    getTreeData () {
      let list = this.tableData
      let parentArr = list.filter(el => el.pid === '0')
      this.treeData = this.getTreeChild(list, parentArr)
      this.treeData.map((el, i) => {
        if (el.resType === '0') {
          el.resType = '菜单'
        } else {
          el.resType = '按钮'
        }
      })
      this.loading = false
    },

    // 处理子节点
    getTreeChild (list, arr) {
      arr.map((pNode, i) => {
        var childrenArr = []
        list.map((cNode, i) => {
          if (cNode.pid === pNode.permissionId) {
            if (cNode.resType === '0') {
              cNode.resType = '菜单'
            } else {
              cNode.resType = '按钮'
            }
            childrenArr.push(cNode)
          }
        })
        pNode.children = childrenArr
        if (childrenArr.length > 0) this.getTreeChild(list, childrenArr)
      })
      return arr
    },

    // 添加父
    addHttp () {
      this.addForm.AutoSystemID = this.searchForm.AutoSystemID
      this.addForm.MainSystemID = ''
      var url = '/api/Menu/AddMainMenuInfo'
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

    // 添加子
    addItem (row) {
      this.addChildForm.Name = row.permissionName
      this.dialogFormAddChildVisible = true
      this.addChildForm.MainSystemID = row.systemidmain
    },
    addChildHttp () {
      let obj = {
        AutoSystemID: this.searchForm.AutoSystemID,
        Class: '',
        Href: this.addChildForm.Href,
        MainSystemID: this.addChildForm.MainSystemID,
        SOrder: this.addChildForm.SOrder,
        Text: this.addChildForm.Text
      }
      var url = '/api/Menu/AddLeveMenuInfo'
      this.$axios
        .post(url, obj)
        .then(res => {
          if (res.data.code === 0) {
            this.$message.success(res.data.msg)
            this.addChildForm = {}
          } else if (res.data.code === 1) {
            this.$message.error(res.data.msg)
          }
          this.dialogFormAddChildVisible = false
          this.getData()
        })
        .catch(err => {
          console.error(err)
        })
    },

    // 改变显示状态
    updateStatus (row) {
      var jd, id
      if (row.resType === '菜单') {
        jd = '0'
        id = row.systemidmain
      } else {
        jd = '1'
        id = row.systemidlevel
      }
      console.log(row)
      this.stateForm = {
        AutoSystemID: this.searchForm.AutoSystemID,
        id: id,
        jd: jd,
        name: row.permissionName,
        status: parseInt(row.Use)
      }
      var url = '/api/Menu/UpdataMenuStatus'
      this.$axios
        .post(url, this.stateForm)
        .then(res => {
          if (res.data.code === 0) {
            this.$message.success(res.data.msg)
            this.stateForm = {}
          } else if (res.data.code === 1) {
            this.$message.error(res.data.msg)
          }
        })
        .catch(err => {
          console.error(err)
        })
    },

    // 改变页面状态
    updataMenuBasic (row) {
      console.log(row)
      if (row.resType === '菜单') {
        this.$message.error('父页面不可修改')
        setTimeout(() => {
          this.getData()
        }, 1000)
        return false
      }
      this.basicForm = {
        AutoSystemID: this.searchForm.AutoSystemID,
        Basic: parseInt(row.SBasic),
        SystemID: row.systemidlevel,
        Text: row.permissionName
      }
      var url = '/api/Menu/UpdataMenuBasic'
      this.$axios
        .post(url, this.basicForm)
        .then(res => {
          if (res.data.code === 0) {
            this.$message.success(res.data.msg)
            this.basicForm = {}
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
      this.$confirm(`是否删除[ ${row.permissionName} ]`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // 判断子或父
          if (row.systemidlevel === '0') {
            // 删除父菜单
            let obj = {
              AutoSystemID: this.searchForm.AutoSystemID,
              MainSystemID: row.systemidmain,
              Text: row.permissionName
            }
            let url = '/api/Menu/DeleteMainMenuInfo'
            this.$axios
              .post(url, obj)
              .then(res => {
                if (res.data.code === 0) {
                  this.$message.success(res.data.msg)
                  this.getData()
                } else if (res.data.code === 1) {
                  this.$message.error(res.data.msg)
                }
              })
              .catch(err => {
                console.error(err)
              })
          } else {
            // 删除子菜单
            let obj = {
              AutoSystemID: this.searchForm.AutoSystemID,
              LeveSystemID: row.systemidlevel,
              Text: row.permissionName
            }
            let url = '/api/Menu/DeleteLeveMenuInfo'
            this.$axios
              .post(url, obj)
              .then(res => {
                if (res.data.code === 0) {
                  this.$message.success(res.data.msg)
                  this.getData()
                } else if (res.data.code === 1) {
                  this.$message.error(res.data.msg)
                }
              })
              .catch(err => {
                console.error(err)
              })
          }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },

    // 编辑父
    async editItem (row) {
      // 判断父子
      if (row.systemidlevel === '0') {
        // 父
        this.editForm.Class = row.icon
        this.editForm.MainSystemID = row.systemidmain
        this.editForm.Text = row.permissionName
        this.editForm.Href = row.permissionUrl
        this.editForm.SOrder = row.SOrder
        this.editForm.AutoSystemID = this.searchForm.AutoSystemID
        this.dialogFormEditVisible = true
      } else {
        // 子
        try {
          this.editChildForm.MainSystemID = row.systemidmain
          let res = await this.getMainMenu()
          this.options = res.data.data
          this.editChildForm.Text = row.permissionName
          this.editChildForm.Href = row.permissionUrl
          this.editChildForm.SOrder = row.SOrder
          this.editChildForm.AutoSystemID = this.searchForm.AutoSystemID
          this.editChildForm.LeveSystemID = row.systemidlevel
          this.dialogFormEditChildVisible = true
        } catch (error) {
          console.log(error)
        }
      }
      console.log(row)
    },
    // 父
    editHttp () {
      var url = '/api/Menu/UpdataMainMenuInfo'
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

    // 子
    editChildHttp () {
      var url = '/api/Menu/UpdataLeveMenuInfo'
      this.$axios
        .post(url, this.editChildForm)
        .then(res => {
          if (res.data.code === 0) {
            this.$message.success(res.data.msg)
            this.editChildForm = {}
            this.dialogFormEditChildVisible = false
            this.getData()
          } else if (res.data.code === 1) {
            this.$message.error(res.data.msg)
          }
        })
        .catch(err => {
          console.error(err)
        })
    },

    // 获取父菜单列表
    getMainMenu () {
      var url = '/api/Menu/GetMainMenuNameList'
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

.tree-node-icon {
  width: 20px;
}

#left .vxe-cell {
  text-align: left;
}
</style>
