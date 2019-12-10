<template>
  <div>
    <!-- 表单开始 -->
    <el-collapse-transition>
      <div style="box-sizing:border-box;" v-show="isShow">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>收件箱列表查询</span>
          </div>
          <el-form
            :inline="true"
            :model="searchForm"
            class="demo-form-inline"
            label-width="80px"
            label-position="right"
          >
            <el-form-item label="重要邮件:">
              <el-select v-model="searchForm.IsImportance" clearable>
                <el-option
                  v-for="(item, index) in options1"
                  :key="index"
                  :value="item.value"
                  :label="item.label"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="状态:">
              <el-select v-model="searchForm.IsRead">
                <el-option
                  v-for="(item, index) in options2"
                  :key="index"
                  :value="item.value"
                  :label="item.label"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="垃圾邮件:">
              <el-select v-model="searchForm.IsSpam">
                <el-option
                  v-for="(item, index) in options3"
                  :key="index"
                  :value="item.value"
                  :label="item.label"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="删除:">
              <el-select v-model="searchForm.IsDelete">
                <el-option
                  v-for="(item, index) in options4"
                  :key="index"
                  :value="item.value"
                  :label="item.label"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="邮件标题:">
              <el-input
                v-model="searchForm.LikeTitle"
                placeholder="请输入邮件标题"
              ></el-input>
            </el-form-item>
            <el-form-item label="发件人:">
              <el-input
                v-model="searchForm.LikeFUserName"
                placeholder="请输入发件人"
              ></el-input>
            </el-form-item>
            <el-form-item label="邮件内容:">
              <el-input
                v-model="searchForm.LikeMessage"
                placeholder="请输入邮件内容"
              ></el-input>
            </el-form-item>
            <el-form-item label="邮件类型:">
              <el-select v-model="searchForm.IsSend">
                <el-option
                  v-for="(item, index) in options5"
                  :key="index"
                  :value="item.value"
                  :label="item.label"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label=" ">
              <el-button
                type="primary"
                @click="
                  searchForm.page = 1;
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
        <span>登录异常</span>
      </div>

      <!-- 表格操作栏开始 -->
      <div class="table-oper">
        <el-button
          type="primary"
          size="small"
          class="button-left"
          @click="getUserList"
        >
          <i class="el-icon-plus"></i>
          写信
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
        :loading="loading"
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
          field="SendName"
          title="发件名称"
          width="100"
          sortable
          show-overflow
        >
        </vxe-table-column>
        <vxe-table-column
          field="Title"
          title="邮件标题"
          width="421"
          show-overflow
          align="left"
        >
        </vxe-table-column>
        <vxe-table-column
          field="SendTime"
          title="距离时间"
          width="100"
          sortable
          show-overflow
        >
        </vxe-table-column>
        <vxe-table-column
          field="SendDay"
          title="发件时间"
          width="130"
          sortable
          show-overflow
        >
        </vxe-table-column>
        <vxe-table-column field="IsRead" title="状态" width="100" show-overflow>
          <template v-slot="{ row }">
            <template v-if="row.IsRead === '1'">
              <el-tag type="success" size="small">已读</el-tag>
            </template>
            <template v-else>
              <el-tag type="warning" size="small">未读</el-tag>
            </template>
          </template>
        </vxe-table-column>
        <vxe-table-column
          field="IsImportance"
          title="重要邮件"
          width="100"
          sortable
          show-overflow
        >
          <template v-slot="{ row }">
            <i-switch
              true-color="#13ce66"
              :value="row.IsImportance === '1'"
              @on-change="setStatus(row, 'IsImportance')"
            >
              <span slot="open">是</span>
              <span slot="close">否</span>
            </i-switch>
          </template>
        </vxe-table-column>
        <vxe-table-column
          field="IsSpam"
          title="垃圾邮件"
          width="100"
          sortable
          show-overflow
        >
          <template v-slot="{ row }">
            <i-switch
              true-color="#13ce66"
              :value="row.IsSpam === '1'"
              @on-change="setStatus(row, 'IsSpam')"
            >
              <span slot="open">是</span>
              <span slot="close">否</span>
            </i-switch>
          </template>
        </vxe-table-column>
        <vxe-table-column
          field="IsDelete"
          title="删除"
          width="90"
          sortable
          show-overflow
        >
          <template v-slot="{ row }">
            <i-switch
              true-color="#13ce66"
              :value="row.IsDelete === '1'"
              @on-change="setStatus(row, 'IsDelete')"
            >
              <span slot="open">是</span>
              <span slot="close">否</span>
            </i-switch>
          </template>
        </vxe-table-column>
        <vxe-table-column title="操作" width="318" fixed="right">
          <template v-slot="{ row }">
            <template v-if="row.IsSend === '1'">
              <el-button size="mini" @click="getMailInfo(row)">详情</el-button>
            </template>
            <template v-else>
              <el-button size="mini" @click="getMailInfo(row)">详情</el-button>
              <el-button size="mini" type="success">回复</el-button>
              <el-button size="mini" type="warning">转发</el-button>
            </template>
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

      <!-- 详情开始 -->
      <Drawer :closable="false" v-model="value4" title="邮件详情" draggable>
        <p :style="pStyle">发件人</p>
        <div class="demo-drawer-profile">
          {{ activeItem.FromUserName }}
        </div>
        <Divider />
        <p :style="pStyle">收件人</p>
        <div class="demo-drawer-profile">
          {{ activeItem.ToUserName }}
        </div>
        <Divider />
        <p :style="pStyle">邮件标题</p>
        <div class="demo-drawer-profile">
          {{ activeItem.Title }}
        </div>
        <Divider />
        <p :style="pStyle">邮件内容</p>
        <div class="demo-drawer-profile">
          <div v-html="activeItem.SendMessage"></div>
        </div>
      </Drawer>
      <!-- 详情结束 -->

      <!-- 写信开始 -->
      <el-dialog
        title="写信"
        width="70%"
        :close-on-click-modal="false"
        :visible.sync="dialogFormVisible"
      >
        <el-form label-width="80px" label-position="right" :model="sendForm">
          <el-form-item label="收件人">
            <el-select
              v-model="sendForm.ToUserList"
              multiple
              placeholder="请选择或直接搜索"
              clearable
              filterable
            >
              <Button type="text" @click="selectAll">
                <Icon type="md-done-all" />
                全选
              </Button>
              <Button type="text" @click="invert">
                <Icon type="md-checkbox" />
                反选
              </Button>
              <el-option
                v-for="item in options"
                :key="item.SystemID"
                :label="item.Name"
                :value="item.SystemID"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="标题">
            <el-input v-model="sendForm.Title"></el-input>
          </el-form-item>
          <el-form-item label="内容">
            <!-- <div id="editor"></div> -->
            <quill-editor
              style="min-height:400px"
              v-model="sendForm.Msg"
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
          <el-button @click="sendMail" size="medium" type="primary">
            提 交
          </el-button>
          <el-button @click="dialogFormVisible = false" size="medium">
            取 消
          </el-button>
        </div>
        <Spin size="large" fix v-if="spinShow"></Spin>
      </el-dialog>
      <!-- 写信结束 -->
    </el-card>
  </div>
</template>

<script>
import { mapState } from 'vuex'

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
        AutoSystemID: '',
        page: 1,
        limit: 10,
        IsSend: false,
        IsRead: 100,
        IsImportance: 100,
        IsSpam: 100,
        IsDelete: 100,
        LikeFUserName: '',
        LikeTitle: '',
        LikeMessage: ''
      },
      isShow: true,
      options1: [
        // 重要邮件
        { label: '全部', value: 100 },
        { label: '是', value: 1 },
        { label: '否', value: 0 }
      ],
      options2: [
        // 状态
        { label: '全部', value: 100 },
        { label: '已读', value: 1 },
        { label: '未读', value: 0 }
      ],
      options3: [
        // 垃圾邮件
        { label: '全部', value: 100 },
        { label: '是', value: 1 },
        { label: '否', value: 0 }
      ],
      options4: [
        // 删除
        { label: '全部', value: 100 },
        { label: '已读', value: 1 },
        { label: '未读', value: 0 }
      ],
      options5: [
        // 邮件类型
        { label: '收件箱', value: false },
        { label: '发件箱', value: true }
      ],
      tableData: [],
      loading: false,
      fileName: '用户信息',
      customColumns: [],
      count: 0,
      addForm: {},
      dialogFormVisible: false,
      selectedItems: [],
      mailStatus: {},
      value4: false,
      pStyle: {
        fontSize: '16px',
        color: 'rgba(0,0,0,0.85)',
        lineHeight: '24px',
        display: 'block',
        marginBottom: '16px'
      },
      activeItem: {},
      sendForm: {},
      options: [],
      spinShow: false,
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
    ...mapState('table', ['pageSize']),
    editor () {
      return this.$refs.myQuillEditor.quill
    }
  },
  created () {
    this.searchForm.AutoSystemID = sessionStorage.getItem('AutoSystemID')
    this.searchForm.limit = this.pageSize[0]
    this.getData()
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
    getData () {
      this.loading = true
      var url = '/api/Mail/GetMailList'
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

    // 设置状态
    setStatus (row, name) {
      var status
      if (row[name] === '0') status = '1'
      else if (row[name] === '1') status = '0'
      let obj = {
        AutoSystemID: this.searchForm.AutoSystemID,
        data: [
          {
            SystemID: row.SystemID,
            Name: row.Title,
            ColumnName: name,
            Status: parseInt(status)
          }
        ]
      }
      var url = '/api/Mail/SetMailStatus'
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
    },

    // 邮件详情
    getMailInfo (row) {
      var url = '/api/Mail/GetMailInfo'
      this.$axios
        .get(url, {
          params: {
            AutoSystemID: this.searchForm.AutoSystemID,
            SystemID: row.SystemID
          }
        })
        .then(res => {
          if (res.data.code === 0) {
            this.activeItem = res.data.data
            this.value4 = true
          } else if (res.data.code === 1) {
            this.$message.error(res.data.msg)
          }
        })
        .catch(err => {
          console.error(err)
        })
    },

    // 获取收件人列表
    getUserList () {
      this.dialogFormVisible = true
      this.spinShow = true
      var url = '/api/Mail/GetUserList'
      this.$axios
        .get(`${url}?AutoSystemID=${this.searchForm.AutoSystemID}`)
        .then(res => {
          if (res.data.code === 0) {
            this.options = res.data.data
            this.spinShow = false
          } else if (res.data.code === 1) {
            this.$message.error(res.data.msg)
          }
        })
        .catch(err => {
          console.error(err)
        })
    },

    // 全选
    selectAll () {
      this.sendForm.ToUserList = []
      this.options.map(el => {
        this.sendForm.ToUserList.push(el.SystemID)
      })
    },

    // 反选
    invert () {
      // 遍历options 找到未被选择的
      this.options.map(el => {
        var i = this.sendForm.ToUserList.indexOf(el.SystemID)
        if (i > -1) {
          this.sendForm.ToUserList.splice(i, 1)
        } else {
          this.sendForm.ToUserList.push(el.SystemID)
        }
      })
    },

    onEditorReady (editor) {
      // 准备编辑器
    },
    onEditorBlur () {}, // 失去焦点事件
    onEditorFocus () {}, // 获得焦点事件
    onEditorChange () {}, // 内容改变事件
    // 发送邮件
    sendMail () {
      this.sendForm.AutoSystemID = this.searchForm.AutoSystemID
      this.sendForm.ToUserList = this.sendForm.ToUserList.toString()
      var url = '/api/Mail/SendMail'
      this.$axios
        .post(url, this.sendForm)
        .then(res => {
          if (res.data.code === 0) {
            this.$message.success(res.data.msg)
            this.dialogFormVisible = false
            this.sendForm = {}
            this.getData()
          } else if (res.data.code === 1) {
            this.$message.error(res.data.msg)
          }
        })
        .catch(err => {
          console.error(err)
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

.tree-node-icon {
  width: 20px;
}

#left .vxe-cell {
  text-align: left;
}

.ivu-btn {
  padding: 0 20px;
  color: #999;
}

.ivu-btn:hover {
  color: #57a3f3;
}

.ql-container {
  height: 200px;
}
.editor {
  line-height: 24px;
}
</style>
