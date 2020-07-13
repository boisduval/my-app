<template>
  <div>
    <el-card class="box-card">
      <!-- 基础信息 -->
      <!-- 基础信息 -->
      <div slot="header" class="clearfix">
        <span>{{ $t("funcInfo.searchTitle") }}</span>
      </div>
      <el-form label-width="80px" :inline="true">
        <el-form-item
          style="width:400px"
          v-for="(item, index) in baseIfo"
          :key="index"
          :label="item.label"
        >
          <el-input
            :value="item.value"
            :readonly="true"
            style="width:250px"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('funcInfo.formLabel')[0]" style="width:350px">
          <el-select v-model="bank" style="width:250px">
            <el-option label="Bank1" value="0"></el-option>
            <el-option label="Bank2" value="1"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="box-card visible">
      <!-- 详细信息 -->
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane :label="$t('funcInfo.tabs')[0]" name="alarm">
        </el-tab-pane>
        <el-tab-pane :label="$t('funcInfo.tabs')[1]" name="protect">
        </el-tab-pane>
        <!-- 表格开始 -->
        <vxe-toolbar custom print export>
        <template v-slot:buttons>
          <el-button
            type="primary"
            size="small"
            @click="getData(paramsF)"
            class="button-left"
          >
            <i class="el-icon-refresh-right"></i>
            {{ $t("base.refresh") }}
          </el-button>
        </template>
      </vxe-toolbar>
        <vxe-table
          :data="activeArray"
          border
          :export-config="exportConfig"
          ref="xTable"
          v-loading="loading"
          element-loading-background="rgba(0, 0, 0, 0)"
          resizable
          highlight-hover-row
          highlight-current-row
          align="center"
          :seq-config="{ seqMethod: seqMethod }"
        >
          <vxe-table-column
            type="checkbox"
            width="50"
            fixed="left"
            align="center"
          ></vxe-table-column>
          <vxe-table-column
            type="seq"
            width="80"
            :title="$t('funcInfo.tableLabel')[0]"
            fixed="left"
            align="center"
          >
          </vxe-table-column>
          <vxe-table-column
            v-for="(config, index) in tableColumn"
            :key="index"
            v-bind="config"
            show-header-overflow
          >
            <template v-slot="{ row }">
              <template v-if="!row[index]">
                <el-tag type="success" size="small">{{
                  $t("funcInfo.state")[0]
                }}</el-tag>
              </template>
              <template v-else>
                <el-tag type="warning" size="small">{{
                  $t("funcInfo.state")[1]
                }}</el-tag>
              </template>
            </template>
          </vxe-table-column>
        </vxe-table>
        <!-- 表格结束 -->
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      baseIfo: [],
      data: {},
      activeName: 'alarm',
      bank: '0',
      aLARM_SWITCH_STATUS_ARRAY: [],
      pROTECT_SWITCH_STATUS_ARRAY: [],
      bitInfo: [],
      loading: false,
      api: '/api/Devices/GetRegistrationEquipment',
      tableColumn: [],
      activeArray: [],
      exportConfig: {
        filename: 'export',
        sheetName: 'Sheet1',
        types: ['csv', 'xlsx']
      }
    }
  },
  computed: {
    ...mapState('detail', ['paramsF'])
  },
  watch: {
    paramsF: {
      handler (newName, oldName) {
        this.data = {}
        this.baseIfo = []
        this.getDetail(this.api, this.paramsF)
        this.getData(this.paramsF)
      },
      deep: true
    },
    bank: {
      handler (newName, oldName) {
        this.getData(this.paramsF)
      }
    }
  },
  mounted () {
    if (this.paramsF.AutoSystemID && this.paramsF.batterID) {
      this.getDetail(this.api, this.paramsF)
      this.getData(this.paramsF)
      this.activeArray = this.aLARM_SWITCH_STATUS_ARRAY
    }
  },
  methods: {
    getData (params) {
      var AutoSystemID = localStorage.getItem('AutoSystemID')
      this.loading = true
      var url = '/api/Chart/GetBatteryBankCTRLParaCharts'
      this.$axios
        .get(
          `${url}?AutoSystemID=${AutoSystemID}&BatteryIDS=${params.batterID}&BankIndex=${this.bank}`
        )
        .then(res => {
          if (res.data.code === 0) {
            this.aLARM_SWITCH_STATUS_ARRAY =
              res.data.data.aLARM_SWITCH_STATUS_ARRAY
            this.pROTECT_SWITCH_STATUS_ARRAY =
              res.data.data.pROTECT_SWITCH_STATUS_ARRAY
            this.activeArray = this.aLARM_SWITCH_STATUS_ARRAY
            this.setData()
          } else if (res.data.code === 1) {
            this.$message.error(res.data.msg)
          }
          this.loading = false
        })
        .catch(err => {
          console.error(err)
        })
    },

    getDetail (api, params) {
      this.$axios
        .get(
          `${api}?AutoSystemID=${params.AutoSystemID}&SystemID=${params.SystemID}`
        )
        .then(res => {
          this.data = res.data.data
          for (var key in this.data) {
            switch (key) {
              case 'DIDS':
                this.baseIfo.push({
                  label: this.$t('funcInfo.formLabel')[1],
                  value: this.data[key]
                })
                break
              case 'DICCID':
                this.baseIfo.push({
                  label: this.$t('funcInfo.formLabel')[2],
                  value: this.data[key]
                })
                break
              case 'DName':
                this.baseIfo.push({
                  label: this.$t('funcInfo.formLabel')[3],
                  value: this.data[key]
                })
                break
            }
          }
        })
        .catch(err => {
          console.error(err)
        })
    },

    handleClick (tab, event) {
      // this.getData()
      console.log(tab)
      if (tab.name === 'protect') {
        this.activeArray = this.pROTECT_SWITCH_STATUS_ARRAY
      } else {
        this.activeArray = this.aLARM_SWITCH_STATUS_ARRAY
      }
    },

    setData () {
      this.bitInfo = this.$t('funcInfo.list')
      this.tableColumn = []
      for (var i = 0; i < 16; i++) {
        var key = 'BATTER_BIT_' + (i + 1)
        this.tableColumn.push({
          field: key,
          title: this.bitInfo[i],
          width: 100
        })
      }
    },
    seqMethod ({ rowIndex }) {
      return (
        this.$t('funcInfo.unit')[0] +
        (rowIndex + 1) +
        this.$t('funcInfo.unit')[1]
      )
    }
  }
}
</script>

<style scoped>
.box-card {
  font-size: 15px;
  text-align: left;
  /* margin-bottom: 20px; */
  box-sizing: border-box;
}

.el-card:nth-last-child(1) {
  margin-top: 20px;
}
</style>
