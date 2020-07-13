<template>
  <div>
    <!-- 表单开始 -->
    <el-collapse-transition>
      <div style="box-sizing:border-box;" v-show="isShow">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>设备管理列表查询</span>
          </div>
          <el-form
            :inline="true"
            :model="formInline"
            class="demo-form-inline"
            label-width="90px"
            label-position="left"
          >
            <el-form-item label="ICCID编号:">
              <el-input
                v-model="formInline.ICCID"
                placeholder="请输入ICCID编号"
              ></el-input>
            </el-form-item>
            <el-form-item label="设备编号:">
              <el-input
                v-model="formInline.IDS"
                placeholder="请输入设备编号"
              ></el-input>
            </el-form-item>
            <el-form-item label="VIN编码:">
              <el-input
                v-model="formInline.VIN"
                placeholder="请输入VIN编码"
              ></el-input>
            </el-form-item>
            <el-form-item label="设备名称:">
              <el-input
                v-model="formInline.Name"
                placeholder="请输入设备名称"
              ></el-input>
            </el-form-item>
            <!-- <br> -->
            <el-form-item>
              <el-button type="primary" @click="formInline.page = 1;getData()">查询</el-button>
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
        <vxe-table-column type="checkbox" width="50" fixed="left" align="center"></vxe-table-column>
        <vxe-table-column type="seq" width="50" title="序号" fixed="left" align="center">
        </vxe-table-column>
        <vxe-table-column
          field="DICCID"
          title="ICCID"
          sortable
          width="250"
          show-overflow
        >
        </vxe-table-column>
        <vxe-table-column
          field="DIDS"
          title="设备ID字符串"
          sortable
          width="250"
          show-overflow
        >
        </vxe-table-column>
        <vxe-table-column
          field="DVIN"
          title="VIN码"
          sortable
          width="250"
          show-overflow
        >
        </vxe-table-column>
        <vxe-table-column field="DName" title="设备名称" sortable width="150">
        </vxe-table-column>
        <vxe-table-column
          field="DManageMentUserName"
          title="设备管理员"
          sortable
          width="150"
        >
        </vxe-table-column>
        <vxe-table-column field="DTime" title="登记时间" sortable width="180">
        </vxe-table-column>
        <vxe-table-column title="操作" width="500" align="center">
          <template v-slot="{ row }">
            <el-button
              plain
              size="small"
              v-for="(item, index) in detail"
              :key="index"
              @click="toDetail(row.SystemID, item.label, row.DIDS, item.path)"
            >
              <i class="el-icon-info">{{ item.label }}</i>
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
      exportConfig: {
        filename: 'export',
        sheetName: 'Sheet1',
        types: ['csv', 'xlsx']
      },
      detail: [
        {
          label: '标准状态量',
          path: '/upsStandardStateQuantity'
        },
        {
          label: '扩展状态量',
          path: '/upsExtendedStateQuantity'
        },
        {
          label: '标准模拟量',
          path: '/upsStandardAnalogQuery'
        },
        {
          label: '扩展模拟量',
          path: '/upsExtendedAnalogQuery'
        }
      ]
    }
  },
  methods: {
    ...mapMutations('upsdetail', ['set_paramsSSG', 'set_paramsESG', 'set_paramsSAG', 'set_paramsEAG']),
    ...mapMutations('tabs', ['set_detail_label']),
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

    toDetail (id, label, batterID, path) {
      var params = {}
      params.AutoSystemID = localStorage.getItem('AutoSystemID')
      params.SystemID = id
      params.batterID = batterID
      switch (path) {
        case '/upsStandardStateQuantity':
          this.set_paramsSSG(params)
          break
        case '/upsExtendedStateQuantity':
          this.set_paramsESG(params)
          break
        case '/upsStandardAnalogQuery':
          this.set_paramsSAG(params)
          break
        case '/upsExtendedAnalogQuery':
          this.set_paramsEAG(params)
          break
      }

      this.set_detail_label(label)
      // this.set_params(params)
      // this.set_batterID(batterID)
      this.$router.push({ path: path })
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
