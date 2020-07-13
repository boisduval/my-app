<template>
  <div>
    <!-- 表单开始 -->
    <el-collapse-transition>
      <div style="box-sizing:border-box;" v-show="isShow">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>配置帮助列表查询</span>
          </div>
          <el-form
            :inline="true"
            :model="searchForm"
            class="demo-form-inline"
            label-width="120px"
            label-position="right"
          >
            <el-form-item label="帮助主题:">
              <el-input
                v-model="searchForm.LikeName"
                placeholder="请输入帮助主题"
              ></el-input>
            </el-form-item>
            <el-form-item label="帮助信息:">
              <el-input
                v-model="searchForm.LikeMessage"
                placeholder="请输入帮助信息："
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

    <el-card class="box-card visible">
      <div slot="header" class="clearfix">
        <span>帮助列表</span>
      </div>

      <!-- 表格开始 -->
      <vxe-toolbar custom print export>
          <template v-slot:buttons>
            <el-button
          type="primary"
          size="small"
          @click="dialogFormVisible = true"
          class="button-left"
        >
          <i class="el-icon-plus"></i>
          添加
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
          field="Name"
          title="名称"
          width="300"
          sortable
          show-overflow
          align="left"
        >
        </vxe-table-column>
        <vxe-table-column
          field="WriteTime"
          title="记录时间"
          width="200"
          sortable
          show-overflow
          align="left"
        >
        </vxe-table-column>
        <vxe-table-column
          field="UpDataTime"
          title="更改时间"
          width="200"
          sortable
          show-overflow
        >
        </vxe-table-column>
        <vxe-table-column
          field="HelpIsTop"
          title="置顶"
          width="200"
          show-overflow
        >
          <template v-slot="{ row }">
            {{ row.HelpIsTop === "1" ? "是" : "否" }}
            <el-switch
              v-model="row.HelpIsTop"
              active-color="#00A854"
              active-value="1"
              inactive-color="#F04134"
              inactive-value="0"
              @change="setTop(row)"
            >
            </el-switch>
          </template>
        </vxe-table-column>
        <vxe-table-column
          field="HelpIsShow"
          title="筛选"
          width="200"
          show-overflow
        >
          <template v-slot="{ row }">
            {{ row.HelpIsShow === "1" ? "是" : "否" }}
            <el-switch
              v-model="row.HelpIsShow"
              active-color="#00A854"
              active-value="1"
              inactive-color="#F04134"
              inactive-value="0"
              @change="setShow(row)"
            >
            </el-switch>
          </template>
        </vxe-table-column>
        <vxe-table-column title="操作" width="350" fixed="right">
          <template v-slot="{ row }">
            <el-button size="mini" @click="toDetail(row.SystemID)"
              >详情</el-button
            >
            <el-button size="mini" @click="editItem(row)">编辑</el-button>
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
        width="70%"
        :close-on-click-modal="false"
        :visible.sync="dialogFormVisible"
        title="添加帮助"
      >
        <el-form label-width="90px" label-position="right" :model="addForm">
          <el-form-item label="帮助名称">
            <el-input
              v-model="addForm.Name"
              placeholder="请输入帮助名称"
            ></el-input>
          </el-form-item>
          <el-form-item label="帮助内容">
            <quill-editor
                style="min-height:200px"
                v-model="addForm.Message"
                ref="myQuillEditor"
                :options="editorOption"
                @blur="onEditorBlur($event)"
                @focus="onEditorFocus($event)"
                @change="onEditorChange($event)"
                class="editor"
              >
              </quill-editor>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addKey" size="medium" type="primary">
            提 交
          </el-button>
          <el-button @click="dialogFormVisible = false" size="medium">
            取 消
          </el-button>
        </div>
      </el-dialog>
      <!-- 添加表单结束 -->

      <!-- 编辑表单开始 -->
      <el-dialog
        width="70%"
        :close-on-click-modal="false"
        :visible.sync="dialogFormEditVisible"
        title="编辑帮助"
      >
        <el-form label-width="90px" label-position="right" :model="editForm">
          <el-form-item label="帮助名称">
            <el-input
              v-model="editForm.Name"
              placeholder="请输入帮助名称"
            ></el-input>
          </el-form-item>
          <el-form-item label="帮助内容">
            <quill-editor
                style="min-height:200px"
                v-model="editForm.Message"
                ref="myQuillEditor"
                :options="editorOption"
                @blur="onEditorBlur($event)"
                @focus="onEditorFocus($event)"
                @change="onEditorChange($event)"
                class="editor"
              >
              </quill-editor>
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

      <!-- 详情开始 -->
      <Drawer
        :closable="false"
        v-model="value4"
        title="帮助详情"
        draggable
        width="30"
      >
        <p :style="pStyle">帮助名称</p>
        <div class="demo-drawer-profile">
          {{ detailInfo.Name }}
        </div>
        <Divider />
        <p :style="pStyle">文档内容</p>
        <div class="demo-drawer-profile" v-html="detailInfo.Message">
        </div>
        <Divider />
        <p :style="pStyle">创建时间</p>
        <div class="demo-drawer-profile">
          {{ detailInfo.WriteTime }}
        </div>
        <Divider />
        <p :style="pStyle">更新时间</p>
        <div class="demo-drawer-profile">
          {{ detailInfo.UpDataTime }}
        </div>
      </Drawer>
      <!-- 详情结束 -->
    </el-card>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { quillEditor } from 'vue-quill-editor' // 调用编辑器
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
export default {
  components: {
    quillEditor
  },
  data () {
    return {
      searchForm: {
        IsManagement: true,
        AutoSystemID: '',
        page: 1,
        limit: 10,
        LikeName: '',
        LikeMessage: ''
      },
      isShow: true,
      tableData: [],
      loading: false,
      exportConfig: {
        filename: 'export',
        sheetName: 'Sheet1',
        types: ['csv', 'xlsx']
      },
      count: 0,
      addForm: {},
      dialogFormVisible: false,
      selectedItems: [],
      editForm: {
        AutoSystemID: '',
        SystemID: '',
        Name: '',
        Message: ''
      },
      dialogFormEditVisible: false,
      value4: false,
      pStyle: {
        fontSize: '16px',
        color: 'rgba(0,0,0,0.85)',
        lineHeight: '24px',
        display: 'block',
        marginBottom: '16px'
      },
      detailInfo: '',
      editorOption: {
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'], // 加粗，斜体，下划线，删除线
            ['blockquote', 'code-block'], // 引用，代码块

            // [{ header: 1 }, { header: 2 }], // 标题，键值对的形式；1、2表示字体大小
            [{ list: 'ordered' }, { list: 'bullet' }], // 列表
            [{ script: 'sub' }, { script: 'super' }], // 上下标
            [{ indent: '-1' }, { indent: '+1' }], // 缩进
            [{ direction: 'rtl' }], // 文本方向

            [{ size: ['small', false, 'large', 'huge'] }], // 字体大小
            // [{ header: [1, 2, 3, 4, 5, 6, false] }], // 几级标题

            [{ color: [] }, { background: [] }], // 字体颜色，字体背景颜色
            [{ font: [] }], // 字体
            [{ align: [] }], // 对齐方式

            ['clean'], // 清除字体样式
            ['image', 'video'] // 上传图片、上传视频
          ]
        },
        theme: 'snow',
        placeholder: '请输入正文'
      }
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
    ...mapMutations('tabs', ['set_detail_label']),
    ...mapMutations('detail', ['set_dictionaryDataParams']),
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
      var url = '/api/Help/GetHelpList'
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

    // 改变状态
    setTop (row) {
      let obj = {
        AutoSystemID: this.searchForm.AutoSystemID,
        HelpIsTop: parseInt(row.HelpIsTop),
        SystemID: row.SystemID,
        Name: row.Name
      }
      var url = '/api/Help/SetTop'
      this.$axios
        .post(url, obj)
        .then(res => {
          if (res.data.code === 0) {
            this.$message.success(res.data.msg)
            // this.getData()
          } else if (res.data.code === 1) {
            this.$message.error(res.data.msg)
          }
        })
        .catch(err => {
          console.error(err)
        })
    },

    setShow (row) {
      let obj = {
        AutoSystemID: this.searchForm.AutoSystemID,
        HelpIsShow: parseInt(row.HelpIsShow),
        SystemID: row.SystemID,
        Name: row.Name
      }
      var url = '/api/Help/SetShow'
      this.$axios
        .post(url, obj)
        .then(res => {
          if (res.data.code === 0) {
            this.$message.success(res.data.msg)
            // this.getData()
          } else if (res.data.code === 1) {
            this.$message.error(res.data.msg)
          }
        })
        .catch(err => {
          console.error(err)
        })
    },

    // 添加
    addKey () {
      this.addForm.AutoSystemID = this.searchForm.AutoSystemID
      var url = '/api/Help/Add'
      this.$axios
        .post(url, this.addForm)
        .then(res => {
          if (res.data.code === 0) {
            this.$message.success(res.data.msg)
            this.addForm = {}
          } else if (res.data.code === 1) {
            this.$message.error(res.data.msg)
          }
          this.dialogFormVisible = false
          this.getData()
        })
        .catch(err => {
          console.error(err)
        })
    },

    // 删除
    deleteItem (row) {
      var url = '/api/Help/Delete'
      let obj = {
        AutoSystemID: this.searchForm.AutoSystemID,
        data: [
          {
            SystemID: row.SystemID,
            Name: row.Name
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
          Name: item.Name,
          SystemID: item.SystemID
        })
      }
      this.$confirm(`确定删除吗`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          var url = '/api/Help/Delete'
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

    // to 详情页
    toDetail (id) {
      var url = '/api/Help/Get'
      var obj = {
        AutoSystemID: this.searchForm.AutoSystemID,
        HelpSystemID: id
      }
      this.$axios
        .get(url, { params: obj })
        .then(res => {
          this.detailInfo = res.data.data
          this.value4 = true
        })
        .catch(err => {
          console.error(err)
        })
    },

    // 编辑
    editItem (row) {
      this.editForm = row
      console.log(this.editForm)
      this.dialogFormEditVisible = true
    },
    editHttp () {
      let obj = {
        AutoSystemID: this.searchForm.AutoSystemID,
        Name: this.editForm.Name,
        Message: this.editForm.Message,
        SystemID: this.editForm.SystemID
      }
      var url = '/api/Help/UpData'
      this.$axios
        .post(url, obj)
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
    onEditorReady (editor) {
      // 准备编辑器
    },
    onEditorBlur () {}, // 失去焦点事件
    onEditorFocus () {}, // 获得焦点事件
    onEditorChange () {} // 内容改变事件
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
.ql-container {
  height: 200px;
}
.editor {
  line-height: 24px;
}
</style>
