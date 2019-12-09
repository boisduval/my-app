<template>
  <div>
    <!-- 表单开始 -->
    <el-collapse-transition>
      <div style="box-sizing:border-box;" v-show="isShow">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>用户列表查询</span>
          </div>
          <el-form
            :inline="true"
            :model="searchForm"
            class="demo-form-inline"
            label-width="120px"
            label-position="right"
          >
            <el-form-item label="账号名称:">
              <el-input
                v-model="searchForm.LikeUserName"
                placeholder="请输入账号名称"
              ></el-input>
            </el-form-item>
            <el-form-item label="手机号码:">
              <el-input
                v-model="searchForm.LikePhone"
                placeholder="请输入手机号码"
              ></el-input>
            </el-form-item>
            <el-form-item label="锁定:">
              <el-select v-model="searchForm.LikeLock" clearable>
                <el-option
                  v-for="(item, index) in options1"
                  :key="index"
                  :value="item.value"
                  :label="item.label"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="黑名单:">
              <el-select v-model="searchForm.LikeBlacklist" clearable>
                <el-option
                  v-for="(item, index) in options2"
                  :key="index"
                  :value="item.value"
                  :label="item.label"
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

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>用户列表</span>
      </div>
      <!-- 表格操作栏开始 -->
      <div class="table-oper">
        <el-button
          type="primary"
          size="small"
          @click="dialogFormAddVisible = true"
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
          @click="initUserPass"
          class="button-left"
        >
          <i class="el-icon-edit-outline"></i>
          初始化密码
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
          <div class="menu-wrapper">
            <template v-for="(column, index) in customColumns">
              <vxe-checkbox
                v-if="column.property"
                class="checkbox-item"
                v-model="column.visible"
                :key="index"
                @change="$refs.xTable.refreshColumn()"
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
          field="AccountNumber"
          title="账户"
          width="135"
          sortable
          show-overflow
        >
        </vxe-table-column>
        <vxe-table-column
          field="UserName"
          title="名称"
          width="100"
          show-overflow
          sortable
        >
        </vxe-table-column>
        <vxe-table-column
          field="RegistrationTime"
          title="注册时间"
          width="153"
          sortable
          show-overflow
        >
        </vxe-table-column>
        <vxe-table-column
          field="ActiveTime"
          title="有效时间"
          width="153"
          sortable
          show-overflow
        >
        </vxe-table-column>
        <vxe-table-column
          field="TotalNumberOfLandings"
          title="登陆次数"
          width="108"
          sortable
          show-overflow
        >
        </vxe-table-column>
        <vxe-table-column
          field="RecentLandfallIp"
          title="上次登陆IP"
          width="139"
          sortable
          show-overflow
        >
        </vxe-table-column>
        <vxe-table-column
          field="RecentLandfallTime"
          title="上次登录时间"
          width="146"
          sortable
          show-overflow
        >
        </vxe-table-column>
        <vxe-table-column
          field="IsLock"
          title="锁定"
          width="100"
          sortable
          show-overflow
        >
          <template v-slot="{ row }">
            {{ row.IsLock === "1" ? "是" : "否" }}
            <el-switch
              v-model="row.IsLock"
              active-color="#00A854"
              active-value="1"
              inactive-color="#F04134"
              inactive-value="0"
              @change="editStatus(row, 'IsLock')"
            >
            </el-switch>
          </template>
        </vxe-table-column>
        <vxe-table-column
          field="IsBlacklist"
          title="黑名单"
          width="100"
          sortable
          show-overflow
        >
          <template v-slot="{ row }">
            {{ row.IsBlacklist === "1" ? "是" : "否" }}
            <el-switch
              v-model="row.IsBlacklist"
              active-color="#00A854"
              active-value="1"
              inactive-color="#F04134"
              inactive-value="0"
              @change="editStatus(row, 'IsBlacklist')"
            >
            </el-switch>
          </template>
        </vxe-table-column>
        <vxe-table-column title="操作" width="350" fixed="right">
          <template v-slot="{ row }">
            <el-button size="mini" @click="getUserInfo(row)">详情</el-button>
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
        width="35%"
        :close-on-click-modal="false"
        :visible.sync="dialogFormAddVisible"
        title="添加用户"
      >
        <el-form
          label-width="90px"
          label-position="right"
          :model="addForm"
          :inline="true"
        >
          <el-form-item label="用户账户">
            <el-input
              v-model="addForm.AccountNumber"
              placeholder="请输入用户账户"
            ></el-input>
          </el-form-item>
          <el-form-item label="用户姓名">
            <el-input
              v-model="addForm.UserName"
              placeholder="请输入用户姓名"
            ></el-input>
          </el-form-item>
          <el-form-item label="用户籍贯">
            <el-input
              v-model="addForm.NativePlace"
              placeholder="请输入用户籍贯"
            ></el-input>
          </el-form-item>
          <el-form-item label="担任职务">
            <el-input
              v-model="addForm.InSubordinate"
              placeholder="请输入担任职务"
            ></el-input>
          </el-form-item>
          <el-form-item label="座机号码">
            <el-input
              v-model="addForm.TelNumber"
              placeholder="请输入座机号码"
            ></el-input>
          </el-form-item>
          <el-form-item label="所属公司">
            <el-input
              v-model="addForm.InCompany"
              placeholder="请输入所属公司"
            ></el-input>
          </el-form-item>
          <el-form-item label="手机号码">
            <el-input
              v-model="addForm.PhoneNumber"
              placeholder="请输入手机号码"
            ></el-input>
          </el-form-item>
          <el-form-item label="邮箱地址">
            <el-input
              v-model="addForm.Email"
              placeholder="请输入邮箱地址"
            ></el-input>
          </el-form-item>
          <el-form-item label="QQ号码">
            <el-input
              v-model="addForm.QqNumber"
              placeholder="请输入QQ号码"
            ></el-input>
          </el-form-item>
          <el-form-item label="微信号码">
            <el-input
              v-model="addForm.WechatNumber"
              placeholder="请输入微信号码"
            ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addItem" size="medium" type="primary">
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
        width="650px"
        :close-on-click-modal="false"
        :visible.sync="dialogFormEditVisible"
        title="修改用户"
      >
        <el-form
          label-width="90px"
          label-position="right"
          :model="editForm"
          :inline="true"
        >
          <el-form-item label="用户账户">
            <el-input
              v-model="editForm.AccountNumber"
              placeholder="请输入用户账户"
            ></el-input>
          </el-form-item>
          <el-form-item label="用户姓名">
            <el-input
              v-model="editForm.UserName"
              placeholder="请输入用户姓名"
            ></el-input>
          </el-form-item>
          <el-form-item label="用户籍贯">
            <el-input
              v-model="editForm.NativePlace"
              placeholder="请输入用户籍贯"
            ></el-input>
          </el-form-item>
          <el-form-item label="担任职务">
            <el-input
              v-model="editForm.InSubordinate"
              placeholder="请输入担任职务"
            ></el-input>
          </el-form-item>
          <el-form-item label="座机号码">
            <el-input
              v-model="editForm.TelNumber"
              placeholder="请输入座机号码"
            ></el-input>
          </el-form-item>
          <el-form-item label="所属公司">
            <el-input
              v-model="editForm.InCompany"
              placeholder="请输入所属公司"
            ></el-input>
          </el-form-item>
          <el-form-item label="手机号码">
            <el-input
              v-model="editForm.PhoneNumber"
              placeholder="请输入手机号码"
            ></el-input>
          </el-form-item>
          <el-form-item label="邮箱地址">
            <el-input
              v-model="editForm.Email"
              placeholder="请输入邮箱地址"
            ></el-input>
          </el-form-item>
          <el-form-item label="QQ号码">
            <el-input
              v-model="editForm.QqNumber"
              placeholder="请输入QQ号码"
            ></el-input>
          </el-form-item>
          <el-form-item label="微信号码">
            <el-input
              v-model="editForm.WechatNumber"
              placeholder="请输入微信号码"
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

      <!-- 详情Dialog开始 -->
      <el-dialog
        width="50%"
        :close-on-click-modal="false"
        :visible.sync="dialogFormVisible"
        title="用户详情"
      >
        <vxe-table stripe :data="detailData" border>
          <vxe-table-column field="label1" title="参数"></vxe-table-column>
          <vxe-table-column field="value1" title="值"></vxe-table-column>
          <vxe-table-column field="label2" title="参数"></vxe-table-column>
          <vxe-table-column field="value2" title="值"></vxe-table-column>
        </vxe-table>
        <div slot="footer" class="dialog-footer">
          <el-button
            @click="dialogFormVisible = false"
            size="medium"
            type="primary"
            >确 定</el-button
          >
        </div>
      </el-dialog>
      <!-- 详情Dialog结束 -->
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
        LikeUserName: '',
        LikePhone: '',
        LikeLock: '',
        LikeBlacklist: ''
      },
      isShow: true,
      options1: [
        { label: '未锁定', value: 0 },
        { label: '锁定', value: 1 }
      ],
      options2: [
        { label: '未拉黑', value: 0 },
        { label: '拉黑', value: 1 }
      ],
      tableData: [],
      loading: false,
      fileName: '用户信息',
      customColumns: [],
      count: 0,
      addForm: {},
      dialogFormVisible: false,
      selectedItems: [],
      editForm: {
        AccountNumber: '',
        Email: '',
        InCompany: '',
        InSubordinate: '',
        NativePlace: '',
        PhoneNumber: '',
        QqNumber: '',
        TelNumber: '',
        UserName: '',
        UserSystemID: '',
        WechatNumber: ''
      },
      dialogFormEditVisible: false,
      dialogFormAddVisible: false,
      detailData: []
    }
  },
  computed: {
    ...mapState('table', ['pageSize'])
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
      var url = '/api/Users/GetUsersInfoList'
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
    editStatus (row, Column) {
      let obj = {
        AutoSystemID: this.searchForm.AutoSystemID,
        data: [
          {
            Status: parseInt(row[Column]),
            SystemID: row.SystemID,
            Name: row.AccountNumber,
            Column: Column
          }
        ]
      }
      var url = '/api/Users/EditStatus'
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
    addItem () {
      this.addForm.ASystemID = this.searchForm.AutoSystemID
      var url = '/api/Users/AddUser'
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
      var url = '/api/Users/DeleteUsers'
      let obj = {
        AutoSystemID: this.searchForm.AutoSystemID,
        UserSystemIDList: row.SystemID
      }
      this.$confirm(`确定删除吗`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$axios
            .get(url, { params: obj })
            .then(res => {
              if (res.data.code === 0) {
              } else if (res.data.code === 1) {
                this.$message.error(res.data.msg)
              }
              setTimeout(() => {
                this.$message.success('删除成功')
                let totalPage = Math.ceil(
                  (this.count - 1) / this.searchForm.limit
                )
                let currentPage =
                  this.searchForm.page > totalPage
                    ? totalPage
                    : this.searchForm.page
                this.searchForm.page = currentPage < 1 ? 1 : currentPage
                this.getData()
              }, 100)
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
      this.selectedItems = this.$refs.xTable.getSelectRecords()
      var arr = ''
      if (this.selectedItems.length === 0) {
        this.$message.warning('请选择要删除的用户')
        return false
      }
      this.selectedItems.map((item, index) => {
        if (index === this.selectedItems.length - 1) {
          arr += item.SystemID
        } else {
          arr = arr + item.SystemID + ','
        }
      })
      this.$confirm(`确定删除吗`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          var url = '/api/Users/DeleteUsers'
          this.$axios
            .get(url, {
              params: {
                AutoSystemID: this.searchForm.AutoSystemID,
                UserSystemIDList: arr
              }
            })
            .then(res => {
              if (res.data.code === 0) {
              } else if (res.data.code === 1) {
                this.$message.error(res.data.msg)
              }
              this.$message.success('删除成功')
              let totalPage = Math.ceil(
                (this.count - this.selectedItems.length) / this.searchForm.limit
              )
              let currentPage =
                this.searchForm.page > totalPage
                  ? totalPage
                  : this.searchForm.page
              this.searchForm.page = currentPage < 1 ? 1 : currentPage
              this.getData()
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

    // 获取用户日志信息
    getUserInfo (row) {
      console.log(row)
      var SystemID = row.SystemID
      var url = '/api/Users/GetUserInfo'
      this.$axios
        .get(
          `${url}?AutoSystemID=${this.searchForm.AutoSystemID}&UserSystemID=${SystemID}`
        )
        .then(res => {
          if (res.data.code === 0) {
            let data = res.data.data[0]
            this.detailData = [
              {
                label1: '用户账号',
                value1: data.AccountNumber,
                label2: '用户名称',
                value2: data.UserName
              },
              {
                label1: '籍贯',
                value1: data.NativePlace,
                label2: '职务',
                value2: data.InSubordinate
              },
              {
                label1: '部门',
                value1: data.InDepartment,
                label2: '公司',
                value2: data.InCompany
              },
              {
                label1: '手机号码',
                value1: data.PhoneNumber,
                label2: '座机号码',
                value2: data.TelNumber
              },
              {
                label1: '邮箱地址',
                value1: data.Email,
                label2: 'QQ号码',
                value2: data.QqNumber
              },
              {
                label1: '微信号码',
                value1: data.WechatNumber,
                label2: '登录次数',
                value2: data.TotalNumberOfLandings
              },
              {
                label1: '上次登录IP',
                value1: data.RecentLandfallIp,
                label2: '登录时间',
                value2: data.RecentLandfallTime
              },
              {
                label1: '注册时间',
                value1: data.RegistrationTime,
                label2: '有效时间',
                value2: data.ActiveTime
              }
            ]
            this.dialogFormVisible = true
          } else if (res.data.code === 1) {
            this.$message.error(res.data.msg)
          }
        })
        .catch(err => {
          console.error(err)
        })
    },

    // 编辑
    editItem (row) {
      var url = '/api/Users/GetUserInfo'
      this.$axios
        .get(url, {
          params: {
            AutoSystemID: this.searchForm.AutoSystemID,
            UserSystemID: row.SystemID
          }
        })
        .then(res => {
          if (res.data.code === 0) {
            // this.$message.success(res.data.msg);
            let data = res.data.data[0]
            this.editForm = {
              AccountNumber: data.AccountNumber,
              Email: data.Email,
              InCompany: data.InCompany,
              InSubordinate: data.InSubordinate,
              NativePlace: data.NativePlace,
              PhoneNumber: data.PhoneNumber,
              QqNumber: data.QqNumber,
              TelNumber: data.TelNumber,
              UserName: data.UserName,
              UserSystemID: row.SystemID,
              WechatNumber: data.WechatNumber
            }
            this.dialogFormEditVisible = true
          } else if (res.data.code === 1) {
            this.$message.error(res.data.msg)
          }
        })
        .catch(err => {
          console.error(err)
        })
    },
    editHttp () {
      let obj = {
        AutoSystemID: this.searchForm.AutoSystemID,
        UserInfo: this.editForm
      }
      var url = '/api/Users/EditUser'
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

    // 初始化密码
    initUserPass () {
      this.selectedItems = this.$refs.xTable.getSelectRecords()
      var arr = ''
      if (this.selectedItems.length === 0) {
        this.$message.warning('至少选择一个用户')
        return false
      }
      this.selectedItems.map((item, index) => {
        if (index === this.selectedItems.length - 1) {
          arr += item.SystemID
        } else {
          arr = arr + item.SystemID + ','
        }
      })
      this.$confirm(`确定要初始化密码吗? 初始化密码将为123456！`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          var url = '/api/Users/InitUserPass'
          this.$axios
            .get(url, {
              params: {
                AutoSystemID: this.searchForm.AutoSystemID,
                UserSystemIDList: arr
              }
            })
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
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消初始化'
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
</style>
