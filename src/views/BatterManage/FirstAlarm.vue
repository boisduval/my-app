<template>
  <div>
    <el-card class="box-card">
      <!-- 基础信息 -->
      <!-- 基础信息 -->
      <div slot="header" class="clearfix">
        <span>{{ $t("firstAlarm.searchTitle") }}</span>
      </div>
      <el-form label-width="80px" :inline="true">
        <el-form-item
          v-for="(item, index) in baseIfo"
          :key="index"
          :label="item.label"
        >
          <el-input :value="item.value" :readonly="true"></el-input>
        </el-form-item>
        <el-form-item :label="$t('firstAlarm.formLabel')[0]">
          <el-select v-model="bank">
            <el-option label="Bank1" value="0"></el-option>
            <el-option label="Bank2" value="1"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="box-card">
      <!-- 详细信息 -->
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane :label="$t('firstAlarm.tabs')[0]" name="firstAlarm">
        </el-tab-pane>
        <el-tab-pane :label="$t('firstAlarm.tabs')[1]" name="secondAlarm">
        </el-tab-pane>

        <!-- 表格开始 -->
        <!-- <vxe-table
            :data="activeArray"
            border
            :customs.sync="customColumns"
            ref="xTable"
            v-loading="loading"
            element-loading-background="rgba(0, 0, 0, 0)"
            resizable
            highlight-hover-row
            highlight-current-row
            align="center"
            :seq-config="{seqMethod: seqMethod}"
          > -->
        <vxe-toolbar custom print export>
          <template v-slot:buttons>
            <el-button
              type="primary"
              size="small"
              @click="getData(paramsFA)"
              class="button-left"
            >
              <i class="el-icon-refresh-right"></i>
              {{ $t("base.searchbtn") }}
            </el-button>
          </template>
        </vxe-toolbar>

        <vxe-table
          :data="activeArray"
          border
          :customs.sync="customColumns"
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
            show-header-overflow
          ></vxe-table-column>
          <vxe-table-column
            type="seq"
            width="80"
            :title="$t('firstAlarm.tableLabel')[0]"
            fixed="left"
            align="center"
            show-header-overflow
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
                  $t("firstAlarm.state")[0]
                }}</el-tag>
              </template>
              <template v-else>
                <el-tag type="warning" size="small">{{
                  $t("firstAlarm.state")[1]
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
      activeName: 'firstAlarm',
      bank: '0',
      bATTERY_FIRST_ALARM_MESSAGE: [],
      bATTERY_SECONDARY_ALARM_MESSAGE: [],
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
    ...mapState('detail', ['paramsFA'])
  },
  watch: {
    paramsFA: {
      handler (newName, oldName) {
        this.data = {}
        this.baseIfo = []
        this.getDetail(this.api, this.paramsFA)
        this.getData(this.paramsFA)
      },
      deep: true
    },
    bank: {
      handler (newName, oldName) {
        this.getData(this.paramsFA)
      }
    }
  },
  mounted () {
    if (this.paramsFA.AutoSystemID && this.paramsFA.batterID) {
      this.getDetail(this.api, this.paramsFA)
      this.getData(this.paramsFA)
      this.activeArray = this.bATTERY_FIRST_ALARM_MESSAGE
      this.setData()
    }
  },
  methods: {
    getData (params) {
      var AutoSystemID = localStorage.getItem('AutoSystemID')
      this.loading = true
      var url = '/api/Chart/GetBatteryBankCRITICALStateCharts'
      this.$axios
        .get(
          `${url}?AutoSystemID=${AutoSystemID}&BatteryIDS=${params.batterID}&BankIndex=${this.bank}`
        )
        .then(res => {
          if (res.data.code === 0) {
            this.bATTERY_FIRST_ALARM_MESSAGE =
              res.data.data.bATTERY_FIRST_ALARM_MESSAGE
            this.bATTERY_SECONDARY_ALARM_MESSAGE =
              res.data.data.bATTERY_SECONDARY_ALARM_MESSAGE
            this.activeArray = this.bATTERY_FIRST_ALARM_MESSAGE
            this.setData()
          } else if (res.data.code === 1) {
            this.bATTERY_FIRST_ALARM_MESSAGE = []
            this.bATTERY_SECONDARY_ALARM_MESSAGE = []
            this.activeArray = []
            this.$message.error(res.data.msg)
          } else {
            this.bATTERY_FIRST_ALARM_MESSAGE = []
            this.bATTERY_SECONDARY_ALARM_MESSAGE = []
            this.activeArray = []
            // this.$message.warning(res.data.msg)
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
                  label: this.$t('firstAlarm.formLabel')[1],
                  value: this.data[key]
                })
                break
              case 'DICCID':
                this.baseIfo.push({
                  label: this.$t('firstAlarm.formLabel')[2],
                  value: this.data[key]
                })
                break
              case 'DVIN':
                this.baseIfo.push({
                  label: this.$t('firstAlarm.formLabel')[3],
                  value: this.data[key]
                })
                break
              case 'DName':
                this.baseIfo.push({
                  label: this.$t('firstAlarm.formLabel')[4],
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
      if (tab === 'firstAlarm') {
        this.activeArray = this.bATTERY_SECONDARY_ALARM_MESSAGE
      } else if (tab === 'secondAlarm') {
        this.activeArray = this.bATTERY_FIRST_ALARM_MESSAGE
      }
    },

    setData () {
      this.bitInfo = this.$t('firstAlarm.tableLabel').slice(1)
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
      return '第' + (rowIndex + 1) + '簇'
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
