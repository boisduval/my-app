<template>
  <div>
    <!-- 表单开始 -->
    <el-collapse-transition>
      <div style="box-sizing:border-box;" v-show="isShow">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>{{ $t("pcsInfo.searchTitle") }}</span>
          </div>
          <el-form
            :inline="true"
            :model="formInline"
            class="demo-form-inline"
            label-width="90px"
            label-position="right"
          >
            <el-form-item :label="$t('pcsInfo.searchForm.label')[0]">
              <el-input
                v-model="formInline.ICCID"
                :placeholder="$t('pcsInfo.searchForm.placeholder')[0]"
              ></el-input>
            </el-form-item>
            <el-form-item :label="$t('pcsInfo.searchForm.label')[1]">
              <el-input
                v-model="formInline.IDS"
                :placeholder="$t('pcsInfo.searchForm.placeholder')[1]"
              ></el-input>
            </el-form-item>
            <el-form-item :label="$t('pcsInfo.searchForm.label')[2]">
              <el-input
                v-model="formInline.VIN"
                :placeholder="$t('pcsInfo.searchForm.placeholder')[2]"
              ></el-input>
            </el-form-item>
            <el-form-item :label="$t('pcsInfo.searchForm.label')[3]">
              <el-input
                v-model="formInline.Name"
                :placeholder="$t('pcsInfo.searchForm.placeholder')[3]"
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
        <span>{{ $t("pcsInfo.listTitle") }}</span>
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
        ref="xTable"
        v-loading="loading"
        element-loading-background="rgba(0, 0, 0, 0)"
        :edit-config="{ trigger: 'manual', mode: 'row' }"
        resizable
        highlight-hover-row
        highlight-current-row
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
          :title="$t('pcsInfo.tableLabel')[0]"
          fixed="left"
          align="center"
        >
        </vxe-table-column>
        <vxe-table-column
          field="DICCID"
          :title="$t('pcsInfo.tableLabel')[1]"
          sortable
          width="250"
          show-overflow
          show-header-overflow
        >
        </vxe-table-column>
        <vxe-table-column
          field="DIDS"
          :title="$t('pcsInfo.tableLabel')[2]"
          sortable
          width="250"
          show-overflow
          show-header-overflow
        >
        </vxe-table-column>
        <vxe-table-column
          field="DName"
          :title="$t('pcsInfo.tableLabel')[3]"
          sortable
          width="180"
          show-overflow
          show-header-overflow
        >
        </vxe-table-column>
        <vxe-table-column
          field="DManageMentUserName"
          :title="$t('pcsInfo.tableLabel')[4]"
          sortable
          width="180"
          show-overflow
          show-header-overflow
        >
        </vxe-table-column>
        <vxe-table-column
          field="DTime"
          :title="$t('pcsInfo.tableLabel')[5]"
          sortable
          width="180"
          show-header-overflow
        >
        </vxe-table-column>
        <vxe-table-column
          :title="$t('pcsInfo.tableLabel')[6]"
          align="center"
          width="550"
        >
          <template v-slot="{ row }">
            <el-button plain size="small" @click="setTime(row)">
              <i class="el-icon-info">{{ $t("pcsSettings.operation")[0] }}</i>
            </el-button>
            <el-button plain size="small" @click="getInfo(row, 0)">
              <i class="el-icon-info">{{ $t("pcsSettings.operation")[1] }}</i>
            </el-button>
            <el-button plain size="small" @click="getInfo(row, 1)">
              <i class="el-icon-info">{{ $t("pcsSettings.operation")[2] }}</i>
            </el-button>
            <el-button plain size="small" @click="getInfo(row, 2)">
              <i class="el-icon-info">{{ $t("pcsSettings.operation")[3] }}</i>
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

    <!-- 计划时段表单开始 -->
    <el-dialog
      width="90%"
      :close-on-click-modal="false"
      :visible.sync="dialogFormEditVisible"
      title="显示数据"
    >
      <div style="max-height:500px;overflow-y:auto;overflow-x:hidden">
        <el-form
          label-width="150px"
          label-position="right"
          :model="time"
          style="position:relative"
        >
          <Spin v-if="spinShow" fix></Spin>
          <el-form-item
            :label="item.label"
            v-for="(item, index) in time.list1"
            :key="index"
          >
            <el-input v-model="item.value"></el-input>
          </el-form-item>
          <div class="wrap-item">
            <div
              style="width:50%"
              v-for="(item, index) in time.list2"
              :key="'list2' + index"
            >
              <el-form-item :label="item.label">
                <el-input v-model="item.value"></el-input>
              </el-form-item>
            </div>
          </div>
        </el-form>
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button
          @click="editHttp(0)"
          size="medium"
          type="primary"
          :disabled="spinShow"
        >
          提交
        </el-button>
        <el-button
          @click="apply(0)"
          size="medium"
          type="primary"
          :disabled="spinShow2"
        >
          应用
        </el-button>
        <el-button @click="dialogFormEditVisible = false" size="medium">
          取消
        </el-button>
      </div>
    </el-dialog>
    <!-- 计划时段表单结束 -->

    <!-- 计划功率表单开始 -->
    <el-dialog
      width="90%"
      :close-on-click-modal="false"
      :visible.sync="dialogFormEditVisible1"
      title="显示数据"
    >
      <div style="max-height:500px;overflow-y:auto;overflow-x:hidden">
        <el-form label-width="150px" label-position="right" :model="time">
          <Spin v-if="spinShow1" fix></Spin>
          <div class="wrap-item">
            <div style="width:50%" v-for="(item, index) in power" :key="index">
              <el-form-item :label="item.label">
                <el-input v-model="item.value"></el-input>
              </el-form-item>
            </div>
          </div>
        </el-form>
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button
          @click="editHttp(1)"
          size="medium"
          type="primary"
          :disabled="spinShow1"
        >
          提交
        </el-button>
        <el-button
          @click="apply(1)"
          size="medium"
          type="primary"
          :disabled="spinShow2"
        >
          应用
        </el-button>
        <el-button @click="dialogFormEditVisible1 = false" size="medium">
          取消
        </el-button>
      </div>
    </el-dialog>

    <!-- 计划功率表单结束 -->

    <!-- 电价设置表单开始 -->
    <el-dialog
      width="90%"
      :close-on-click-modal="false"
      :visible.sync="dialogFormEditVisible2"
      title="显示数据"
    >
      <div style="max-height:500px;overflow-y:auto;overflow-x:hidden">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane
            :label="item1.label"
            :name="index + ''"
            v-for="(item1, index) in tariff"
            :key="index + ''"
          >
            <el-form label-width="180px" style="margin-bottom:40px;">
              <el-form-item
                :label="item.label"
                v-for="(item, index) in item1.list1"
                :key="index"
              >
                <el-input v-model="item.value"></el-input>
              </el-form-item>
              <div class="wrap-item">
                <div
                  style="width:50%"
                  v-for="(item, index) in item1.list2"
                  :key="'list2' + index"
                >
                  <el-form-item :label="item.label">
                    <el-input v-model="item.value"></el-input>
                  </el-form-item>
                </div>
              </div>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button
          @click="editHttp(2)"
          size="medium"
          type="primary"
          :disabled="spinShow2"
        >
          提交
        </el-button>
        <el-button
          @click="apply(2)"
          size="medium"
          type="primary"
          :disabled="spinShow2"
        >
          应用
        </el-button>
        <el-button @click="dialogFormEditVisible2 = false" size="medium">
          取消
        </el-button>
      </div>
    </el-dialog>

    <!-- 电价设置表单结束 -->
  </div>
</template>

<script>
import { mapState } from 'vuex'
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
      editForm: {
        AutoSystemID: '',
        data: {
          Address: '0',
          IDS: '',
          Data: [0]
        }
      },
      applyForm: {
        AutoSystemID: '',
        data: {
          Address: '0',
          IDS: '',
          Data: [0]
        }
      },
      time: {
        list1: [],
        list2: []
      },
      power: [],
      tariff: new Array(4).fill({
        list1: [],
        list2: []
      }),
      activeName: '0',
      dialogFormEditVisible: false,
      spinShow: false,
      dialogFormEditVisible1: false,
      spinShow1: false,
      dialogFormEditVisible2: false,
      spinShow2: false,
      urlList: [
        'PCSConfigurationPlanTime',
        'PCSConfigurationPowerPlan',
        'PCSConfigurationElectrovalence'
      ],
      urlList1: [
        'PCSConfigurationPlanTimeUse',
        'PCSConfigurationPlanTimeUse',
        'PCSConfigurationElectrovalenceUse'
      ]
    }
  },
  methods: {
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

    setTime (row) {
      this.$confirm(
        this.$t('pcsSettings.confirm.tip'),
        this.$t('pcsSettings.confirm.title'),
        {
          confirmButtonText: this.$t('pcsSettings.confirm.yes'),
          cancelButtonText: this.$t('pcsSettings.confirm.no'),
          type: 'warning'
        }
      )
        .then(() => {
          var AutoSystemID = this.formInline.AutoSystemID
          var url = '/api/Command/PCSSetSystemTime'
          this.$axios
            .post(url, {
              AutoSystemID: AutoSystemID,
              data: {
                Address: '',
                IDS: row.DIDS,
                Data: ['0x0000']
              }
            })
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
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: this.$t('pcsSettings.confirm.canceled')
          })
        })
    },

    getInfo (row, num) {
      switch (num) {
        case 0:
          this.dialogFormEditVisible = true
          this.spinShow = true
          break
        case 1:
          this.dialogFormEditVisible1 = true
          this.spinShow1 = true
          break
        case 2:
          this.dialogFormEditVisible2 = true
          this.spinShow2 = true
          break
      }
      var AutoSystemID = this.formInline.AutoSystemID
      this.editForm.AutoSystemID = AutoSystemID
      this.editForm.data.IDS = row.DIDS
      this.applyForm.AutoSystemID = AutoSystemID
      this.applyForm.data.IDS = row.DIDS
      this.$axios
        .get(
          `/api/PCSMent/GetPCSRTConfigurationPara?AutoSystemID=${AutoSystemID}&DeviceDIDS=${row.DIDS}&DeviceIndex=0`
        )
        .then(res => {
          if (res.data.code === 0) {
            this.$message.success(res.data.msg)
            let data = res.data.data
            this.setData()
            this.time.list1[0].value =
              data.nUMBER_OF_PLANNED_CURVE_PERIODS + ''
            data.pLANNED_CURVE_PERIOD.forEach((val, i) => {
              this.time.list2[i * 2].value = val.StartTime
              this.time.list2[i * 2 + 1].value = val.StopTime
            })
            data.pLANNED_CURVE_ACTIVE_POWER.forEach((val, i) => {
              this.power[i * 2].value = val
            })
            data.pLANNED_CURVE_REACTIVE_POWER.forEach((val, i) => {
              this.power[i * 2 + 1].value = val
            })
            this.tariff[0].list1[0].value = data.nUMBER_OF_PEAK_PERIODS
            this.tariff[0].list1[1].value = data.tIP_WHEN_ELECTRICITY
            data.eLECTRICITY_PRICE_SETTING_PEAK_PERIOD.forEach((val, i) => {
              this.tariff[0].list2[i * 2].value = val.StartTime
              this.tariff[0].list2[i * 2 + 1].value = val.StopTime
            })
            this.tariff[1].list1[0].value = data.nUMBER_OF_PEAK_HOURS
            this.tariff[1].list1[1].value = data.pEAK_ELECTRICITY
            data.eLECTRICITY_PRICE_SETTING_PEAK_HOUR_PERIOD.forEach(
              (val, i) => {
                this.tariff[1].list2[i * 2].value = val.StartTime
                this.tariff[1].list2[i * 2 + 1].value = val.StopTime
              }
            )
            this.tariff[2].list1[0].value = data.nORMAL_TIME_QUANTITY
            this.tariff[2].list1[1].value = data.eLECTRICITY_AT_ORDINARY_TIMES
            data.eLECTRICITY_PRICE_SETTING_NORMAL_PERIOD.forEach((val, i) => {
              this.tariff[2].list2[i * 2].value = val.StartTime
              this.tariff[2].list2[i * 2 + 1].value = val.StopTime
            })
            this.tariff[3].list1[0].value = data.qUANTITY_OF_VALLEY_TIME_PERIOD
            this.tariff[3].list1[1].value = data.tHE_VALLEY_OF_ELECTRICITY
            data.eLECTRICITY_PRICE_SETTING_VALLEY_TIME_PERIOD.forEach(
              (val, i) => {
                this.tariff[3].list2[i * 2].value = val.StartTime
                this.tariff[3].list2[i * 2 + 1].value = val.StopTime
              }
            )
          } else {
            this.setData()
          }
          switch (num) {
            case 0:
              this.spinShow = false
              break
            case 1:
              this.spinShow1 = false
              break
            case 2:
              this.spinShow2 = false
              break
          }
        })
        .catch(err => {
          console.error(err)
        })
    },
    setData () {
      // eslint-disable-next-line no-unused-expressions
      this.time = {
        list1: [
          {
            label: this.$t('tariff.list1')[1],
            value: ''
          }
        ],
        list2: []
      }
      var arr = this.$t('tariff.list1')
      arr.forEach((val, i) => {
        if (i !== 0 && i !== 1) {
          this.time.list2.push({
            label: val,
            value: ''
          })
        }
      })
      this.power = []
      var arr1 = this.$t('tariff.list2')
      arr1.forEach((val, i) => {
        this.power.push({
          label: val,
          value: ''
        })
      })
      this.tariff = new Array(4).fill().map(item => {
        return {
          list1: [],
          list2: []
        }
      })
      this.tariff[0].label = '尖时时段'
      this.tariff[1].label = '峰时时段'
      this.tariff[2].label = '平时时段'
      this.tariff[3].label = '谷时时段'
      var arr2 = this.$t('tariff.list3')
      for (let i = 0; i < arr2.length; i++) {
        for (let j = 0; j < arr2[i].list1.length; j++) {
          this.tariff[i].list1.push({
            label: arr2[i].list1[j],
            value: ''
          })
        }
        for (let k = 0; k < arr2[i].list2.length; k++) {
          this.tariff[i].list2.push({
            label: arr2[i].list2[k],
            value: ''
          })
        }
      }
    },

    editHttp (num) {
      var url = '/api/Command/' + this.urlList[num]
      switch (num) {
        case 0:
          this.editForm.data.plantime = {
            timesnumber: this.time.list1[0].value,
            timsstart: this.time.list2
              .filter((val, index) => {
                if (index % 2 === 0) {
                  return val
                }
              })
              .map(item => {
                return item.value
              }),
            timsstop: this.time.list2
              .filter((val, index) => {
                if (index % 2 !== 0) {
                  return val
                }
              })
              .map(item => {
                return item.value
              })
          }
          break
        case 1:
          this.editForm.data.powerplan = {
            activepower: this.power
              .filter((val, index) => {
                if (index % 2 === 0) {
                  return val
                }
              })
              .map(item => {
                return item.value
              }),
            reactivepower: this.power
              .filter((val, index) => {
                if (index % 2 !== 0) {
                  return val
                }
              })
              .map(item => {
                return item.value
              })
          }
          break
        case 2:
          this.editForm.data.electrovalence = {
            pointedtime: this.tariff[0].list1[0].value,
            peaktime: this.tariff[1].list1[0].value,
            flattime: this.tariff[2].list1[0].value,
            ravinetime: this.tariff[3].list1[0].value,
            pointedtimesstart: this.tariff[0].list2
              .filter((val, index) => {
                if (index % 2 === 0) {
                  return val
                }
              })
              .map(item => {
                return item.value
              }),
            pointedtimesstop: this.tariff[0].list2
              .filter((val, index) => {
                if (index % 2 !== 0) {
                  return val
                }
              })
              .map(item => {
                return item.value
              }),
            peaktimesstart: this.tariff[1].list2
              .filter((val, index) => {
                if (index % 2 === 0) {
                  return val
                }
              })
              .map(item => {
                return item.value
              }),
            peaktimesstop: this.tariff[1].list2
              .filter((val, index) => {
                if (index % 2 !== 0) {
                  return val
                }
              })
              .map(item => {
                return item.value
              }),
            flattimesstart: this.tariff[2].list2
              .filter((val, index) => {
                if (index % 2 === 0) {
                  return val
                }
              })
              .map(item => {
                return item.value
              }),
            flattimesstop: this.tariff[2].list2
              .filter((val, index) => {
                if (index % 2 !== 0) {
                  return val
                }
              })
              .map(item => {
                return item.value
              }),
            ravinetimesstart: this.tariff[3].list2
              .filter((val, index) => {
                if (index % 2 === 0) {
                  return val
                }
              })
              .map(item => {
                return item.value
              }),
            ravinetimesstop: this.tariff[3].list2
              .filter((val, index) => {
                if (index % 2 !== 0) {
                  return val
                }
              })
              .map(item => {
                return item.value
              }),
            pointedprice: this.tariff[0].list1[1].value,
            peakprice: this.tariff[1].list1[1].value,
            flatprice: this.tariff[2].list1[1].value,
            ravineprice: this.tariff[3].list1[1].value
          }
      }
      this.$axios
        .post(url, this.editForm)
        .then(res => {
          if (res.data.code === 0) {
            this.$message.success(res.data.msg)
          } else {
            this.$message.warning(res.data.msg)
          }
          switch (num) {
            case 0:
              this.dialogFormEditVisible = false
              break
            case 1:
              this.dialogFormEditVisible1 = false
              break
            case 2:
              this.dialogFormEditVisible2 = false
              break
          }
          this.editForm = {
            AutoSystemID: '',
            data: {
              Address: '0',
              IDS: '',
              Data: [0]
            }
          }
        })
        .catch(err => {
          console.error(err)
        })
    },

    apply (num) {
      var url = '/api/Command/' + this.urlList1[num]
      this.$axios.post(url, this.applyForm)
        .then(res => {
          if (res.data.code === 0) {
            this.$message.success(res.data.msg)
          } else {
            this.$message.warning(res.data.msg)
          }
        })
        .catch(err => {
          console.error(err)
        })
    },

    handleClick (tab, event) {
      console.log(tab, event)
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

.wrap-item {
  display: flex;
  flex-wrap: wrap;
}
</style>
