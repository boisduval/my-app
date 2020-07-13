<template>
  <div>
    <!-- 表单开始 -->
    <el-collapse-transition>
      <div style="box-sizing:border-box;" v-show="isShow">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>{{ $t("batteryState.searchTitle") }}</span>
          </div>
          <el-form
            :inline="true"
            :model="formInline"
            class="demo-form-inline"
            label-width="90px"
            label-position="right"
          >
            <el-form-item :label="$t('batteryState.searchForm.label')[0]">
              <el-input
                v-model="formInline.ICCID"
                :placeholder="$t('batteryState.searchForm.placeholder')[0]"
              ></el-input>
            </el-form-item>
            <el-form-item :label="$t('batteryState.searchForm.label')[1]">
              <el-input
                v-model="formInline.IDS"
                :label="$t('batteryState.searchForm.placeholder')[1]"
              ></el-input>
            </el-form-item>
            <el-form-item :label="$t('batteryState.searchForm.label')[2]">
              <el-input
                v-model="formInline.VIN"
                :label="$t('batteryState.searchForm.placeholder')[2]"
              ></el-input>
            </el-form-item>
            <el-form-item :label="$t('batteryState.searchForm.label')[3]">
              <el-input
                v-model="formInline.Name"
                :label="$t('batteryState.searchForm.placeholder')[3]"
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
        <span>{{ $t("batteryState.listTitle") }}</span>
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
        row-id="id"
        highlight-hover-row
        highlight-current-row
      >
        <vxe-table-column type="checkbox" width="50"></vxe-table-column>
        <vxe-table-column
          type="seq"
          width="50"
          :title="$t('batteryState.tableLabel')[0]"
        >
        </vxe-table-column>
        <vxe-table-column
          field="DIDS"
          :title="$t('batteryState.tableLabel')[1]"
          sortable
          width="300"
          show-overflow
          align="left"
        >
        </vxe-table-column>
        <vxe-table-column
          field="DName"
          :title="$t('batteryState.tableLabel')[2]"
          sortable
          width="180"
        >
        </vxe-table-column>
        <vxe-table-column
          field="DManageMentUserName"
          :title="$t('batteryState.tableLabel')[3]"
          sortable
          width="180"
          align="left"
        >
        </vxe-table-column>
        <vxe-table-column
          field="DTime"
          :title="$t('batteryState.tableLabel')[4]"
          sortable
          width="200"
        >
        </vxe-table-column>
        <vxe-table-column :title="$t('batteryState.tableLabel')[5]" width="650">
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
            <el-button plain size="mini" @click="getDetailData(row, 'index1')">
              <i class="el-icon-info">{{
                $t("batteryState.operationbtn")[0]
              }}</i>
            </el-button>
            <el-button plain size="mini" @click="getDetailData(row, 'index2')">
              <i class="el-icon-info">{{
                $t("batteryState.operationbtn")[1]
              }}</i>
            </el-button>
            <el-button plain size="mini" @click="getDetailData(row, 'index3')">
              <i class="el-icon-info">{{
                $t("batteryState.operationbtn")[2]
              }}</i>
            </el-button>
            <el-button plain size="mini" @click="getDetailData(row, 'index4')">
              <i class="el-icon-info">{{
                $t("batteryState.operationbtn")[3]
              }}</i>
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
      <!-- 硬件详情开始 -->
      <Drawer
        :closable="false"
        v-model="dialogFormVisible"
        :title="$t('batteryState.hardware.title')"
        draggable
        width="30"
      >
        <p :style="pStyle">{{ $t("batteryState.hardware.label")[0] }}</p>
        <div class="demo-drawer-profile">
          <el-select v-model="bank" @change="handleSelect">
            <el-option label="Bank1" value="0"></el-option>
            <el-option label="Bank2" value="1"></el-option>
          </el-select>
        </div>
        <Divider />
        <p :style="pStyle">{{ $t("batteryState.hardware.label")[1] }}</p>
        <div class="demo-drawer-profile">
          {{ this.data.iTEM_SERIAL_NUMBER }}
        </div>
        <Divider />
        <el-row>
          <el-col :span="14">
            <p :style="pStyle">{{ $t("batteryState.hardware.label")[2] }}</p>
            <div class="demo-drawer-profile">
              {{ this.data.tHE_MAJOR_VERSION_NUMBER }}
            </div>
          </el-col>
          <el-col :span="10">
            <p :style="pStyle">{{ $t("batteryState.hardware.label")[3] }}</p>
            <div class="demo-drawer-profile">
              {{ this.data.tHE_CHILD_VERSION_NUMBER }}
            </div>
          </el-col>
        </el-row>
        <Divider />
        <el-row>
          <el-col :span="14">
            <p :style="pStyle">{{ $t("batteryState.hardware.label")[4] }}</p>
            <div class="demo-drawer-profile">
              {{ this.data.rEVISION_NUMBER }}
            </div>
          </el-col>
          <el-col :span="10">
            <p :style="pStyle">{{ $t("batteryState.hardware.label")[5] }}</p>
            <div class="demo-drawer-profile">
              {{ this.data.hARDWARE_MAJOR_VERSION_NUMBER }}
            </div>
          </el-col>
        </el-row>
        <Divider />
        <el-row>
          <el-col :span="14">
            <p :style="pStyle">{{ $t("batteryState.hardware.label")[6] }}</p>
            <div class="demo-drawer-profile">
              {{ this.data.hARDWARE_SUBVERSION_NUMBER }}
            </div>
          </el-col>
          <el-col :span="10">
            <p :style="pStyle">{{ $t("batteryState.hardware.label")[7] }}</p>
            <div class="demo-drawer-profile">
              {{ this.data.bOOTLOADER_MAIN_VERSION_NUMBER }}
            </div>
          </el-col>
        </el-row>
        <Divider />
        <el-row>
          <el-col :span="14">
            <p :style="pStyle">{{ $t("batteryState.hardware.label")[8] }}</p>
            <div class="demo-drawer-profile">
              {{ this.data.bOOTLOADER_SUBVERSION_NUMBER }}
            </div>
          </el-col>
          <el-col :span="10">
            <p :style="pStyle">{{ $t("batteryState.hardware.label")[9] }}</p>
            <div class="demo-drawer-profile">
              {{ this.data.bOOTLOADER_REVISION_NUMBER }}
            </div>
          </el-col>
        </el-row>
      </Drawer>
      <!-- 硬件详情结束 -->
      <!-- 停机详情开始 -->
      <Drawer
        :closable="false"
        v-model="dialogFormVisible1"
        :title="$t('batteryState.outage.title')"
        draggable
        width="30"
      >
        <p :style="pStyle">{{ $t("batteryState.outage.label")[0] }}</p>
        <div class="demo-drawer-profile">
          <el-select v-model="bank" @change="handleSelect">
            <el-option label="Bank1" value="0"></el-option>
            <el-option label="Bank2" value="1"></el-option>
          </el-select>
        </div>
        <Divider />
        <el-row>
          <el-col :span="14">
            <p :style="pStyle">{{ $t("batteryState.outage.label")[1] }}</p>
            <div class="demo-drawer-profile">
              {{ this.data.sINGLE_OVERVOLTAGE_SHUTDOWN_TIMES }}
            </div>
          </el-col>
          <el-col :span="10">
            <p :style="pStyle">{{ $t("batteryState.outage.label")[2] }}</p>
            <div class="demo-drawer-profile">
              {{ this.data.nUMBER_OF_BATTERY_OVERVOLTAGE_SHUTDOWNS }}
            </div>
          </el-col>
        </el-row>
        <Divider />
        <el-row>
          <el-col :span="14">
            <p :style="pStyle">{{ $t("batteryState.outage.label")[3] }}</p>
            <div class="demo-drawer-profile">
              {{ this.data.nUMBER_OF_BATTERY_OVERCURRENT_SHUTDOWN }}
            </div>
          </el-col>
          <el-col :span="10">
            <p :style="pStyle">{{ $t("batteryState.outage.label")[4] }}</p>
            <div class="demo-drawer-profile">
              {{ this.data.sINGLE_UNIT_UNDERVOLTAGE_SHUTDOWN_TIMES }}
            </div>
          </el-col>
        </el-row>
        <Divider />
        <el-row>
          <el-col :span="14">
            <p :style="pStyle">{{ $t("batteryState.outage.label")[5] }}</p>
            <div class="demo-drawer-profile">
              {{ this.data.bATTERY_UNDERVOLTAGE_SHUTDOWN_TIMES }}
            </div>
          </el-col>
          <el-col :span="10">
            <p :style="pStyle">{{ $t("batteryState.outage.label")[6] }}</p>
            <div class="demo-drawer-profile">
              {{ this.data.nUMBER_OF_BATTERY_DISCHARGE_OVERCURRENT_SHUTDOWN }}
            </div>
          </el-col>
        </el-row>
        <Divider />
        <el-row>
          <el-col :span="14">
            <p :style="pStyle">{{ $t("batteryState.outage.label")[7] }}</p>
            <div class="demo-drawer-profile">
              {{ this.data.nUMBER_OF_BATTERY_OVERTEMPERATURE_SHUTDOWNS }}
            </div>
          </el-col>
          <el-col :span="10">
            <p :style="pStyle">{{ $t("batteryState.outage.label")[8] }}</p>
            <div class="demo-drawer-profile">
              {{ this.data.uNDERTEMPERATURE_BATTERY_DOWNTIME }}
            </div>
          </el-col>
        </el-row>
        <Divider />
        <el-row>
          <el-col :span="14">
            <p :style="pStyle">{{ $t("batteryState.outage.label")[9] }}</p>
            <div class="demo-drawer-profile">
              {{ this.data.pOWER_OVERTEMPERATURE_SHUTDOWN_TIMES }}
            </div>
          </el-col>
          <el-col :span="10">
            <p :style="pStyle">{{ $t("batteryState.outage.label")[10] }}</p>
            <div class="demo-drawer-profile">
              {{
                this.data
                  .tHE_PRESSURE_DIFFERENCE_BETWEEN_THE_MONOMERS_IS_TOO_LARGE
              }}
            </div>
          </el-col>
        </el-row>
        <Divider />
        <el-row>
          <el-col :span="14">
            <p :style="pStyle">{{ $t("batteryState.outage.label")[11] }}</p>
            <div class="demo-drawer-profile">
              {{
                this.data
                  .tHE_NUMBER_OF_TIMES_WHEN_THE_INSULATION_RESISTANCE_VALUE_IS_TOO_SMALL
              }}
            </div>
          </el-col>
          <el-col :span="10">
            <p :style="pStyle">{{ $t("batteryState.outage.label")[12] }}</p>
            <div class="demo-drawer-profile">
              {{
                this.data
                  .tHE_TOTAL_PRESSURE_DIFFERENCE_IS_TOO_LARGE_SHUTDOWN_TIMES
              }}
            </div>
          </el-col>
        </el-row>
      </Drawer>
      <!-- 停机详情结束 -->
      <!-- 告警详情开始 -->
      <Drawer
        :closable="false"
        v-model="dialogFormVisible2"
        :title="$t('batteryState.alarm.title')"
        draggable
        width="30"
      >
        <p :style="pStyle">{{ $t("batteryState.alarm.label")[0] }}</p>
        <div class="demo-drawer-profile">
          <el-select v-model="bank" @change="handleSelect">
            <el-option label="Bank1" value="0"></el-option>
            <el-option label="Bank2" value="1"></el-option>
          </el-select>
        </div>
        <Divider />
        <el-row>
          <el-col :span="14">
            <p :style="pStyle">{{ $t("batteryState.alarm.label")[1] }}</p>
            <div class="demo-drawer-profile">
              {{ this.data.sINGLE_OVERVOLTAGE_ALARM_NUMBER }}
            </div>
          </el-col>
          <el-col :span="10">
            <p :style="pStyle">{{ $t("batteryState.alarm.label")[2] }}</p>
            <div class="demo-drawer-profile">
              {{ this.data.nUMBER_OF_BATTERY_OVERVOLTAGE_ALARM }}
            </div>
          </el-col>
        </el-row>
        <Divider />
        <el-row>
          <el-col :span="14">
            <p :style="pStyle">{{ $t("batteryState.alarm.label")[3] }}</p>
            <div class="demo-drawer-profile">
              {{ this.data.nUMBER_OF_BATTERY_OVERCURRENT_ALARM }}
            </div>
          </el-col>
          <el-col :span="10">
            <p :style="pStyle">{{ $t("batteryState.alarm.label")[4] }}</p>
            <div class="demo-drawer-profile">
              {{ this.data.nUMBER_OF_SINGLE_UNDERVOLTAGE_ALARM }}
            </div>
          </el-col>
        </el-row>
        <Divider />
        <el-row>
          <el-col :span="14">
            <p :style="pStyle">{{ $t("batteryState.alarm.label")[5] }}</p>
            <div class="demo-drawer-profile">
              {{ this.data.bATTERY_UNDERVOLTAGE_ALARM_NUMBER }}
            </div>
          </el-col>
          <el-col :span="10">
            <p :style="pStyle">{{ $t("batteryState.alarm.label")[6] }}</p>
            <div class="demo-drawer-profile">
              {{ this.data.aLARM_NUMBER_OF_BATTERY_DISCHARGE_OVERCURRENT }}
            </div>
          </el-col>
        </el-row>
        <Divider />
        <el-row>
          <el-col :span="14">
            <p :style="pStyle">{{ $t("batteryState.alarm.label")[7] }}</p>
            <div class="demo-drawer-profile">
              {{ this.data.nUMBER_OF_BATTERY_OVERTEMPERATURE_ALARM }}
            </div>
          </el-col>
          <el-col :span="10">
            <p :style="pStyle">{{ $t("batteryState.alarm.label")[8] }}</p>
            <div class="demo-drawer-profile">
              {{ this.data.bATTERY_UNDERTEMPERATURE_ALARM_NUMBER }}
            </div>
          </el-col>
        </el-row>
        <Divider />
        <el-row>
          <el-col :span="14">
            <p :style="pStyle">{{ $t("batteryState.alarm.label")[9] }}</p>
            <div class="demo-drawer-profile">
              {{ this.data.pOWER_OVERTEMPERATURE_ALARM_NUMBER }}
            </div>
          </el-col>
          <el-col :span="10">
            <p :style="pStyle">{{ $t("batteryState.alarm.label")[10] }}</p>
            <div class="demo-drawer-profile">
              {{
                this.data
                  .eXCESSIVE_ALARM_TIMES_OF_PRESSURE_DIFFERENCE_BETWEEN_UNITS
              }}
            </div>
          </el-col>
        </el-row>
        <Divider />
        <el-row>
          <el-col :span="14">
            <p :style="pStyle">{{ $t("batteryState.alarm.label")[11] }}</p>
            <div class="demo-drawer-profile">
              {{ this.data.iNSULATION_RESISTANCE_VALUE_TOO_SMALL_ALARM_TIMES }}
            </div>
          </el-col>
          <el-col :span="10">
            <p :style="pStyle">{{ $t("batteryState.alarm.label")[12] }}</p>
            <div class="demo-drawer-profile">
              {{ this.data.tOTAL_PRESSURE_DIFFERENTIAL_EXCESSIVE_ALARM_NUMBER }}
            </div>
          </el-col>
        </el-row>
        <Divider />
        <el-row>
          <el-col :span="14">
            <p :style="pStyle">{{ $t("batteryState.alarm.label")[13] }}</p>
            <div class="demo-drawer-profile">
              {{ this.data.aLARM_TIMES_OF_EXCESSIVE_AMBIENT_TEMPERATURE }}
            </div>
          </el-col>
          <el-col :span="10">
            <p :style="pStyle">{{ $t("batteryState.alarm.label")[14] }}</p>
            <div class="demo-drawer-profile">
              {{ this.data.nUMBER_OF_ALARMS_FOR_LOW_AMBIENT_TEMPERATURE }}
            </div>
          </el-col>
        </el-row>
      </Drawer>
      <!-- 告警详情结束 -->
      <!-- 其他详情开始 -->
      <Drawer
        :closable="false"
        v-model="dialogFormVisible3"
        :title="$t('batteryState.others.title')"
        draggable
        width="30"
      >
        <p :style="pStyle">{{ $t("batteryState.others.label")[0] }}</p>
        <div class="demo-drawer-profile">
          <el-select v-model="bank" @change="handleSelect">
            <el-option label="Bank1" value="0"></el-option>
            <el-option label="Bank2" value="1"></el-option>
          </el-select>
        </div>
        <Divider />
        <el-row>
          <el-col :span="14">
            <p :style="pStyle">{{ $t("batteryState.others.label")[1] }}</p>
            <div class="demo-drawer-profile">
              {{ this.data.bATTERY_CYCLE }}
            </div>
          </el-col>
          <el-col :span="10">
            <p :style="pStyle">{{ $t("batteryState.others.label")[2] }}</p>
            <div class="demo-drawer-profile">
              {{ this.data.tOTAL_BATTERY_CAPACITY }}
            </div>
          </el-col>
        </el-row>
        <Divider />
        <el-row>
          <el-col :span="14">
            <p :style="pStyle">{{ $t("batteryState.others.label")[3] }}</p>
            <div class="demo-drawer-profile">
              {{ this.data.sYSTEM_RUNNING_TIME }}
            </div>
          </el-col>
          <el-col :span="10">
            <p :style="pStyle">{{ $t("batteryState.others.label")[4] }}</p>
            <div class="demo-drawer-profile">
              {{ this.data.lAST_CHARGE_CAPACITY }}
            </div>
          </el-col>
        </el-row>
        <Divider />
        <el-row>
          <el-col :span="14">
            <p :style="pStyle">{{ $t("batteryState.others.label")[5] }}</p>
            <div class="demo-drawer-profile">
              {{ this.data.tHE_LAST_TIME_A_CHARGE_WAS_COMPLETED }}
            </div>
          </el-col>
          <el-col :span="10">
            <p :style="pStyle">{{ $t("batteryState.others.label")[6] }}</p>
            <div class="demo-drawer-profile">
              {{ this.data.eND_TIME_OF_LAST_DISCHARGE }}
            </div>
          </el-col>
        </el-row>
        <Divider />
        <el-row>
          <el-col :span="14">
            <p :style="pStyle">{{ $t("batteryState.others.label")[7] }}</p>
            <div class="demo-drawer-profile">
              {{
                this.data.nUMBER_OF_TIMES_THE_AMBIENT_TEMPERATURE_IS_TOO_HIGH
              }}
            </div>
          </el-col>
          <el-col :span="10">
            <p :style="pStyle">{{ $t("batteryState.others.label")[8] }}</p>
            <div class="demo-drawer-profile">
              {{
                this.data.tHE_NUMBER_OF_TIMES_THE_AMBIENT_TEMPERATURE_IS_TOO_LOW
              }}
            </div>
          </el-col>
        </el-row>
        <Divider />
        <el-row>
          <el-col :span="14">
            <p :style="pStyle">{{ $t("batteryState.others.label")[9] }}</p>
            <div class="demo-drawer-profile">
              {{ this.data.pOWER_OVERTEMPERATURE_ALARM_NUMBER }}
            </div>
          </el-col>
          <el-col :span="10">
            <p :style="pStyle">{{ $t("batteryState.others.label")[10] }}</p>
            <div class="demo-drawer-profile">
              {{
                this.data
                  .eXCESSIVE_ALARM_TIMES_OF_PRESSURE_DIFFERENCE_BETWEEN_UNITS
              }}
            </div>
          </el-col>
        </el-row>
        <Divider />
        <el-row>
          <el-col :span="14">
            <p :style="pStyle">{{ $t("batteryState.others.label")[11] }}</p>
            <div class="demo-drawer-profile">
              {{ this.data.iNSULATION_RESISTANCE_VALUE_TOO_SMALL_ALARM_TIMES }}
            </div>
          </el-col>
          <el-col :span="10">
            <p :style="pStyle">{{ $t("batteryState.others.label")[12] }}</p>
            <div class="demo-drawer-profile">
              {{ this.data.tOTAL_PRESSURE_DIFFERENTIAL_EXCESSIVE_ALARM_NUMBER }}
            </div>
          </el-col>
        </el-row>
        <Divider />
        <el-row>
          <el-col :span="14">
            <p :style="pStyle">{{ $t("batteryState.others.label")[13] }}</p>
            <div class="demo-drawer-profile">
              {{ this.data.aLARM_TIMES_OF_EXCESSIVE_AMBIENT_TEMPERATURE }}
            </div>
          </el-col>
          <el-col :span="10">
            <p :style="pStyle">{{ $t("batteryState.others.label")[14] }}</p>
            <div class="demo-drawer-profile">
              {{ this.data.nUMBER_OF_ALARMS_FOR_LOW_AMBIENT_TEMPERATURE }}
            </div>
          </el-col>
        </el-row>
      </Drawer>
      <!-- 其他详情结束 -->
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
          label: this.$t('batteryState.detail'),
          path: '/selfCheck'
        }
      ],
      activeDialog: '',
      formList: {
        AutoSystemID: '',
        BatteryIDS: '',
        BankIndex: '',
        DName: ''
      },
      formData: {},
      value: true,
      pStyle: {
        fontSize: '14px',
        color: 'rgba(0,0,0,0.85)',
        lineHeight: '24px',
        display: 'block',
        marginBottom: '16px'
      },
      data: [],
      bank: '0',
      dialogFormVisible: false,
      dialogFormVisible1: false,
      dialogFormVisible2: false,
      dialogFormVisible3: false,
      SystemID: '',
      exportConfig: {
        filename: 'export',
        sheetName: 'Sheet1',
        types: ['csv', 'xlsx']
      }
    }
  },
  methods: {
    ...mapMutations('detail', ['set_paramsSC']),
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

    // 操作页
    toDetail (id, label, batterID, path) {
      var params = {}
      params.AutoSystemID = localStorage.getItem('AutoSystemID')
      params.SystemID = id
      params.batterID = batterID
      switch (path) {
        case '/selfCheck':
          this.set_paramsSC(params)
          break
      }
      this.set_detail_label(label)
      // this.set_params(params)
      // this.set_batterID(batterID)
      this.$router.push({ path: path })
    },

    // 获取详情
    getDetailData (row, index) {
      console.log(row)
      switch (index) {
        case 'index1':
          this.dialogFormVisible = true
          break
        case 'index2':
          this.dialogFormVisible1 = true
          break
        case 'index3':
          this.dialogFormVisible2 = true
          break
        case 'index4':
          this.dialogFormVisible3 = true
          break
      }
      this.SystemID = row.DICCID
      this.bank = '0'
      this.getDataHttp()
    },

    getDataHttp () {
      var AutoSystemID = localStorage.getItem('AutoSystemID')
      this.loading = true
      var url = '/api/Chart/GetBatteryBankCLUSTERStateCharts'
      this.$axios
        .get(
          `${url}?AutoSystemID=${AutoSystemID}&BatteryIDS=${this.SystemID}&BankIndex=${this.bank}`
        )
        .then(res => {
          if (res.data.code === 0) {
            this.data = res.data.data
          } else if (res.data.code === 1) {
            this.$message.error(res.data.msg)
          }
          this.loading = false
        })
        .catch(err => {
          console.error(err)
        })
    },

    handleSelect () {
      this.getDataHttp()
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
