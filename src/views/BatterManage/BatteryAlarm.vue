<template>
  <div>
    <!-- 表单开始 -->
    <el-collapse-transition>
      <div style="box-sizing:border-box;" v-show="isShow">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>{{ $t("batteryAlarm.searchTitle") }}</span>
          </div>
          <el-form
            :inline="true"
            :model="formInline"
            class="demo-form-inline"
            label-width="90px"
            label-position="right"
          >
            <el-form-item :label="$t('batteryAlarm.searchForm.label')[0]">
              <el-input
                v-model="formInline.ICCID"
                :placeholder="$t('batteryAlarm.searchForm.placeholder')[0]"
              ></el-input>
            </el-form-item>
            <el-form-item :label="$t('batteryAlarm.searchForm.label')[1]">
              <el-input
                v-model="formInline.IDS"
                :placeholder="$t('batteryAlarm.searchForm.placeholder')[1]"
              ></el-input>
            </el-form-item>
            <el-form-item :label="$t('batteryAlarm.searchForm.label')[2]">
              <el-input
                v-model="formInline.VIN"
                :placeholder="$t('batteryAlarm.searchForm.placeholder')[2]"
              ></el-input>
            </el-form-item>
            <el-form-item :label="$t('batteryAlarm.searchForm.label')[3]">
              <el-input
                v-model="formInline.Name"
                :placeholder="$t('batteryAlarm.searchForm.placeholder')[3]"
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
        <span>{{ $t("batteryAlarm.listTitle") }}</span>
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
        v-loading="loading"
        element-loading-background="rgba(0, 0, 0, 0)"
        resizable
        align="center"
        ref="xTable"
        :expand-config="{}"
        row-id="id"
        highlight-hover-row
        highlight-current-row
      >
        <vxe-table-column type="checkbox" width="50"></vxe-table-column>
        <vxe-table-column
          type="seq"
          width="50"
          :title="$t('batteryAlarm.tableLabel')[0]"
        >
        </vxe-table-column>
        <vxe-table-column
          field="DIDS"
          :title="$t('batteryAlarm.tableLabel')[1]"
          sortable
          width="400"
          show-overflow
          align="left"
        >
        </vxe-table-column>
        <vxe-table-column
          field="DName"
          :title="$t('batteryAlarm.tableLabel')[2]"
          sortable
          width="200"
        >
        </vxe-table-column>
        <vxe-table-column
          field="DManageMentUserName"
          :title="$t('batteryAlarm.tableLabel')[3]"
          sortable
          width="200"
          align="left"
        >
        </vxe-table-column>
        <vxe-table-column
          field="DTime"
          :title="$t('batteryAlarm.tableLabel')[4]"
          sortable
          width="300"
        >
        </vxe-table-column>
        <vxe-table-column :title="$t('batteryAlarm.tableLabel')[5]" width="350">
          <template v-slot="{ row }">
            <el-button
              plain
              size="mini"
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
      detail: [
        {
          label: this.$t('batteryAlarm.detail')[0],
          path: '/firstAlarm'
        },
        {
          label: this.$t('batteryAlarm.detail')[1],
          path: '/vAlarm'
        }
      ],
      dialogFormVisible: false,
      activeDialog: '',
      formList: {
        AutoSystemID: '',
        BatteryIDS: '',
        BankIndex: '',
        DName: ''
      },
      formData: {},
      value: true,
      exportConfig: {
        filename: 'export',
        sheetName: 'Sheet1',
        types: ['csv', 'xlsx']
      }
    }
  },
  methods: {
    ...mapMutations('detail', ['set_paramsFA', 'set_paramsVA']),
    ...mapMutations('tabs', ['set_detail_label']),
    getData () {
      this.loading = true
      this.formInline.AutoSystemID = localStorage.getItem('AutoSystemID')
      this.$axios
        .get(
          `/api/Devices/GetRegistrationEquipmentList?AutoSystemID=${this.formInline.AutoSystemID}&page=${this.formInline.page}&limit=${this.formInline.limit}&ICCID=${this.formInline.ICCID}&IDS=${this.formInline.IDS}&VIN=${this.formInline.VIN}&Name=${this.formInline.Name}`
        )
        .then(res => {
          if (res.data.code === 0) {
            this.tableData = res.data.data
          } else {
            this.tableData = []
            this.$message.error(res.data.msg)
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

    // 操作页
    toDetail (id, label, batterID, path) {
      var params = {}
      params.AutoSystemID = localStorage.getItem('AutoSystemID')
      params.SystemID = id
      params.batterID = batterID
      switch (path) {
        case '/firstAlarm':
          this.set_paramsFA(params)
          break
        case '/vAlarm':
          this.set_paramsVA(params)
          break
      }
      this.set_detail_label(label)
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
.menu-btn {
  position: relative;
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
</style>
