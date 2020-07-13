<template>
  <div>
    <el-card class="box-card">
      <!-- 基础信息 -->
      <!-- 基础信息 -->
      <div slot="header" class="clearfix">
        <span>{{ $t("selfCheck.searchTitle") }}</span>
      </div>
      <el-form label-width="80px" :inline="true">
        <el-form-item
          v-for="(item, index) in baseIfo"
          :key="index"
          :label="item.label"
        >
          <el-input :value="item.value" :readonly="true"></el-input>
        </el-form-item>
        <el-form-item :label="$t('selfCheck.formLabel')[0]">
          <el-select v-model="bank">
            <el-option label="Bank1" value="0"></el-option>
            <el-option label="Bank2" value="1"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="box-card visible">
      <!-- 详细信息 -->
      <!-- 表格开始 -->
      <vxe-toolbar custom print export>
        <template v-slot:buttons>
          <el-button
            type="primary"
            size="small"
            @click="getData(paramsSC)"
            class="button-left"
          >
            <i class="el-icon-refresh-right"></i>
            {{ $t("base.searchbtn") }}
          </el-button>
        </template>
      </vxe-toolbar>
      <vxe-table
        :data="mAIN_CONTROL_SELF_CHECK_STATUS"
        border
        :customs.sync="customColumns"
        ref="xTable"
        v-loading="loading"
        element-loading-background="rgba(0, 0, 0, 0)"
        resizable
        highlight-hover-row
        highlight-current-row
        align="center"
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
          :title="$t('selfCheck.tableLabel')[0]"
          fixed="left"
          align="center"
        >
        </vxe-table-column>
        <vxe-table-column
          v-for="(config, index) in tableColumn"
          :key="index"
          v-bind="config"
        >
          <template v-slot="{ row }">
            <template v-if="!row[index]">
              <el-tag type="success" size="small">{{
                $t("selfCheck.state")[0]
              }}</el-tag>
            </template>
            <template v-else>
              <el-tag type="warning" size="small">{{
                $t("selfCheck.state")[1]
              }}</el-tag>
            </template>
          </template>
        </vxe-table-column>
      </vxe-table>
      <!-- 表格结束 -->
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
      activeName: 'firstAlarm',
      bank: '0',
      mAIN_CONTROL_SELF_CHECK_STATUS: [],
      loading: false,
      api: '/api/Devices/GetRegistrationEquipment',
      tableColumn: [],
      exportConfig: {
        filename: 'export',
        sheetName: 'Sheet1',
        types: ['csv', 'xlsx']
      }
    }
  },
  computed: {
    ...mapState('detail', ['paramsSC'])
  },
  watch: {
    paramsSC: {
      handler (newName, oldName) {
        this.data = {}
        this.baseIfo = []
        this.getDetail(this.api, this.paramsSC)
        this.getData(this.paramsSC)
      },
      deep: true
    },
    bank: {
      handler (newName, oldName) {
        this.getData(this.paramsSC)
      }
    }
  },
  mounted () {
    if (this.paramsSC.AutoSystemID && this.paramsSC.batterID) {
      this.getDetail(this.api, this.paramsSC)
      this.getData(this.paramsSC)
      this.setData()
    }
  },
  methods: {
    getData (params) {
      var AutoSystemID = localStorage.getItem('AutoSystemID')
      this.loading = true
      var url = '/api/Chart/GetBatteryBankCLUSTERStateCharts'
      this.$axios
        .get(
          `${url}?AutoSystemID=${AutoSystemID}&BatteryIDS=${params.batterID}&BankIndex=${this.bank}`
        )
        .then(res => {
          if (res.data.code === 0) {
            this.mAIN_CONTROL_SELF_CHECK_STATUS =
              res.data.data.mAIN_CONTROL_SELF_CHECK_STATUS
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
                  label: this.$t('selfCheck.formLabel')[1],
                  value: this.data[key]
                })
                break
              case 'DICCID':
                this.baseIfo.push({
                  label: this.$t('selfCheck.formLabel')[2],
                  value: this.data[key]
                })
                break
              case 'DVIN':
                this.baseIfo.push({
                  label: this.$t('selfCheck.formLabel')[3],
                  value: this.data[key]
                })
                break
              case 'DName':
                this.baseIfo.push({
                  label: this.$t('selfCheck.formLabel')[3],
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

    setData () {
      this.tableColumn = [
        { field: 'EEPROM_ERRCODE', title: this.$t('selfCheck.tableLabel')[1] },
        {
          field: 'MASTER_ID_OUT_OF_BOUNDS',
          title: this.$t('selfCheck.tableLabel')[2]
        },
        {
          field: 'PCS_STANDBY_FAILED',
          title: this.$t('selfCheck.tableLabel')[3]
        },
        {
          field: 'FLASH_SELF_CHECK_STATUS',
          title: this.$t('selfCheck.tableLabel')[4]
        }
      ]
    }
  }
}
</script>

<style scoped>
.box-card {
  line-height: 10px;
  font-size: 15px;
  text-align: left;
  /* margin-bottom: 20px; */
  box-sizing: border-box;
}

.el-card:nth-last-child(1) {
  margin-top: 20px;
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
