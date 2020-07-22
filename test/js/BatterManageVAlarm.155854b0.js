(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["BatterManageVAlarm"],{"981a":function(t,e,a){"use strict";a.r(e);var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("el-card",{staticClass:"box-card"},[a("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[a("span",[t._v(t._s(t.$t("vAlarm.searchTitle")))])]),a("el-form",{attrs:{"label-width":"80px",inline:!0}},[t._l(t.baseIfo,(function(t,e){return a("el-form-item",{key:e,attrs:{label:t.label}},[a("el-input",{attrs:{value:t.value,readonly:!0}})],1)})),a("el-form-item",{attrs:{label:t.$t("vAlarm.formLabel")[0]}},[a("el-select",{model:{value:t.bank,callback:function(e){t.bank=e},expression:"bank"}},[a("el-option",{attrs:{label:"Bank1",value:"0"}}),a("el-option",{attrs:{label:"Bank2",value:"1"}})],1)],1)],2)],1),a("el-card",{staticClass:"box-card visible"},[a("el-tabs",{on:{"tab-click":t.handleClick},model:{value:t.activeName,callback:function(e){t.activeName=e},expression:"activeName"}},[a("el-tab-pane",{attrs:{label:t.$t("vAlarm.tabs")[0],name:"volAlarm"}}),a("el-tab-pane",{attrs:{label:t.$t("vAlarm.tabs")[1],name:"temperatureAlarm"}}),a("el-tab-pane",{attrs:{label:t.$t("vAlarm.tabs")[2],name:"othersAlarm"}}),a("vxe-toolbar",{attrs:{custom:"",print:"",export:""},scopedSlots:t._u([{key:"buttons",fn:function(){return[a("el-button",{staticClass:"button-left",attrs:{type:"primary",size:"small"},on:{click:function(e){return t.getData(t.paramsVA)}}},[a("i",{staticClass:"el-icon-refresh-right"}),t._v(" "+t._s(t.$t("base.refresh"))+" ")])]},proxy:!0}])}),a("vxe-table",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],ref:"xTable",attrs:{data:t.activeArray,border:"",customs:t.customColumns,"element-loading-background":"rgba(0, 0, 0, 0)",resizable:"","highlight-hover-row":"","highlight-current-row":"",align:"center"},on:{"update:customs":function(e){t.customColumns=e}}},t._l(t.volColumn,(function(e,r){return a("vxe-table-column",t._b({key:r},"vxe-table-column",e,!1))})),1)],1)],1)],1)},l=[],o=a("2f62");function n(t,e){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),a.push.apply(a,r)}return a}function s(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?n(a,!0).forEach((function(e){i(t,e,a[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):n(a).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))}))}return t}function i(t,e,a){return e in t?Object.defineProperty(t,e,{value:a,enumerable:!0,configurable:!0,writable:!0}):t[e]=a,t}var _={data:function(){return{baseIfo:[],data:{},activeName:"volAlarm",bank:"0",volInfo:[],temperatureInfo:[],othersInfo:[],loading:!1,api:"/api/Devices/GetRegistrationEquipment",tableColumn:[],volColumn:[],temperatureColumn:[],othersColumn:[],activeArray:[],volData:[],temperatureData:[],othersData:[],exportConfig:{filename:"export",sheetName:"Sheet1",types:["csv","xlsx"]}}},computed:s({},Object(o["c"])("detail",["paramsVA"])),watch:{paramsVA:{handler:function(t,e){this.data={},this.baseIfo=[],this.getDetail(this.api,this.paramsVA),this.getData(this.paramsVA)},deep:!0},bank:{handler:function(t,e){this.getData(this.paramsVA)}}},created:function(){this.paramsVA.AutoSystemID&&this.paramsVA.batterID&&(this.getDetail(this.api,this.paramsVA),this.getData(this.paramsVA),this.isShow())},methods:{getData:function(t){var e=this,a=localStorage.getItem("AutoSystemID");this.loading=!0;var r="/api/Chart/GetBatteryBankCRITICALStateCharts";this.activeArray=[],this.tableColumn=[],this.$axios.get("".concat(r,"?AutoSystemID=").concat(a,"&BatteryIDS=").concat(t.batterID,"&BankIndex=").concat(this.bank)).then((function(t){e.setData(),0===t.data.code?(e.data=t.data.data,e.volData=[],e.volInfo.forEach((function(t,a){e.volData.push({name:t.value}),e.data.hasOwnProperty(t.key)&&e.data[t.key].forEach((function(t,r){e.volData[a]["index"+r]=t}))})),e.temperatureData=[],e.temperatureInfo.forEach((function(t,a){e.temperatureData.push({name:t.value}),e.data.hasOwnProperty(t.key)&&e.data[t.key].forEach((function(t,r){e.temperatureData[a]["index"+r]=t}))})),e.othersData=[],e.othersInfo.forEach((function(t,a){e.othersData.push({name:t.value}),e.data.hasOwnProperty(t.key)&&e.data[t.key].forEach((function(t,r){e.othersData[a]["index"+r]=t}))})),e.isShow()):1===t.data.code&&e.$message.error(t.data.msg),e.loading=!1})).catch((function(t){console.error(t),e.loading=!1}))},getDetail:function(t,e){var a=this;this.$axios.get("".concat(t,"?AutoSystemID=").concat(e.AutoSystemID,"&SystemID=").concat(e.SystemID)).then((function(t){for(var e in a.data=t.data.data,a.data)switch(e){case"DIDS":a.baseIfo.push({label:a.$t("vAlarm.formLabel")[2],value:a.data[e]});break;case"DICCID":a.baseIfo.push({label:a.$t("vAlarm.formLabel")[1],value:a.data[e]});break;case"DVIN":a.baseIfo.push({label:a.$t("vAlarm.formLabel")[3],value:a.data[e]});break;case"DName":a.baseIfo.push({label:a.$t("vAlarm.formLabel")[4],value:a.data[e]});break}})).catch((function(t){console.error(t)}))},handleClick:function(t,e){this.isShow()},setData:function(){this.volColumn=[{type:"checkbox",width:50,fixed:"left"},{type:"index",width:50,fixed:"left",title:"序号"}],this.volInfo=[{key:"nUMBER_OF_HIGHEST_VOLTAGE_BATTERY_WHEN_ALARMING",value:this.$t("vAlarm.volInfo")[0]},{key:"tHE_HIGHEST_VOLTAGE_WHEN_ALARMING",value:this.$t("vAlarm.volInfo")[1]},{key:"nUMBER_OF_HIGHEST_VOLTAGE_BATTERY_WHEN_SHUT_DOWN",value:this.$t("vAlarm.volInfo")[2]},{key:"mAXIMUM_VOLTAGE_VALUE_WHEN_STOPPED",value:this.$t("vAlarm.volInfo")[3]},{key:"mINIMUM_VOLTAGE_BATTERY_NUMBER_WHEN_ALARM",value:this.$t("vAlarm.volInfo")[4]},{key:"mINIMUM_VOLTAGE_WHEN_ALARMING",value:this.$t("vAlarm.volInfo")[5]},{key:"mINIMUM_VOLTAGE_BATTERY_NUMBER_WHEN_SHUT_DOWN",value:this.$t("vAlarm.volInfo")[6]},{key:"mINIMUM_VOLTAGE_VALUE_WHEN_SHUTDOWN",value:this.$t("vAlarm.volInfo")[7]},{key:"tHE_VOLTAGE_VALUE_WHEN_THE_BATTERY_OVERVOLTAGE_ALARM",value:this.$t("vAlarm.volInfo")[8]},{key:"tHE_VOLTAGE_VALUE_WHEN_THE_BATTERY_OVERVOLTAGE_STOPS",value:this.$t("vAlarm.volInfo")[9]},{key:"vOLTAGE_VALUE_WHEN_BATTERY_UNDERVOLTAGE_ALARM",value:this.$t("vAlarm.volInfo")[10]},{key:"tHE_VOLTAGE_VALUE_WHEN_THE_BATTERY_IS_SHUT_DOWN",value:this.$t("vAlarm.volInfo")[11]},{key:"wARNING_VALUE_OF_MONOMER_PRESSURE_DIFFERENCE_HEIGHT",value:this.$t("vAlarm.volInfo")[12]},{key:"tHE_VOLTAGE_VALUE_WHEN_THE_BATTERY_IS_SHUT_DOWN",value:this.$t("vAlarm.volInfo")[13]},{key:"wARNING_VALUE_OF_MONOMER_PRESSURE_DIFFERENCE_HEIGHT",value:this.$t("vAlarm.volInfo")[14]},{key:"tOTAL_DIFFERENTIAL_PRESSURE_HIGH_STOP_VALUE",value:this.$t("vAlarm.volInfo")[15]}],this.temperatureInfo=[{key:"nUMBER_OF_HIGHEST_BATTERY_TEMPERATURE_POINT_WHEN_ALARMING",value:this.$t("vAlarm.temperatureInfo")[0]},{key:"tHE_HIGHEST_BATTERY_TEMPERATURE_WHEN_ALARMING",value:this.$t("vAlarm.temperatureInfo")[1]},{key:"nUMBER_OF_HIGHEST_BATTERY_TEMPERATURE_POINT_WHEN_SHUT_DOWN",value:this.$t("vAlarm.temperatureInfo")[2]},{key:"mAXIMUM_BATTERY_TEMPERATURE_WHEN_SHUT_DOWN",value:this.$t("vAlarm.temperatureInfo")[3]},{key:"nUMBER_OF_LOWEST_BATTERY_TEMPERATURE_POINT_WHEN_ALARMING",value:this.$t("vAlarm.temperatureInfo")[4]},{key:"mINIMUM_BATTERY_TEMPERATURE_WHEN_ALARMING",value:this.$t("vAlarm.temperatureInfo")[5]},{key:"mINIMUM_BATTERY_TEMPERATURE_POINT_NUMBER_WHEN_SHUT_DOWN",value:this.$t("vAlarm.temperatureInfo")[6]},{key:"mINIMUM_BATTERY_TEMPERATURE_WHEN_SHUT_DOWN",value:this.$t("vAlarm.temperatureInfo")[7]},{key:"nUMBER_OF_THE_HIGHEST_POWER_TEMPERATURE_POINT_WHEN_ALARMING",value:this.$t("vAlarm.temperatureInfo")[8]},{key:"mAXIMUM_POWER_TEMPERATURE_WHEN_ALARMING",value:this.$t("vAlarm.temperatureInfo")[9]},{key:"nUMBER_OF_HIGHEST_POWER_TEMPERATURE_POINT_WHEN_SHUTDOWN",value:this.$t("vAlarm.temperatureInfo")[10]},{key:"mAXIMUM_POWER_TEMPERATURE_VALUE_DURING_SHUTDOWN",value:this.$t("vAlarm.temperatureInfo")[11]},{key:"hIGH_TEMPERATURE_DIFFERENCE_ALARM_VALUE_OF_SINGLE_UNIT",value:this.$t("vAlarm.temperatureInfo")[12]},{key:"sINGLE_TEMPERATURE_DIFFERENCE_HIGH_STOP_VALUE",value:this.$t("vAlarm.temperatureInfo")[13]}],this.othersInfo=[{key:"oPERATING_STATE_OF_THIS_BRANCH",value:this.$t("vAlarm.othersInfo")[0]},{key:"eQUIPMENT_FAULT_ALARM_MESSAGE",value:this.$t("vAlarm.othersInfo")[1]},{key:"tHE_VALUE_OF_THE_CURRENT_WHEN_THE_BATTERY_OVERCHARGE_ALARM",value:this.$t("vAlarm.othersInfo")[2]},{key:"tHE_VALUE_OF_CURRENT_WHEN_THE_BATTERY_OVERCHARGES_AND_STOPS",value:this.$t("vAlarm.othersInfo")[3]},{key:"bATTERY_DISCHARGE_OVERCURRENT_ALARM_WHEN_THE_CURRENT_VALUE",value:this.$t("vAlarm.othersInfo")[4]},{key:"tHE_CURRENT_VALUE_WHEN_THE_BATTERY_DISCHARGE_OVERCURRENT_STOPS",value:this.$t("vAlarm.othersInfo")[5]},{key:"iNSULATION_TOO_SMALL_ALARM_VALUE",value:this.$t("vAlarm.othersInfo")[6]},{key:"iNSULATION_TOO_SMALL_STOP_VALUE",value:this.$t("vAlarm.othersInfo")[7]}],this.volColumn.push({field:"name",title:this.$t("vAlarm.title"),width:250,align:"left"});for(var t=0;t<12;t++)this.volColumn.push({field:"index"+t,title:this.$t("vAlarm.unit")[0]+(t+1)+this.$t("vAlarm.unit")[1],width:100})},isShow:function(){switch(this.activeName){case"volAlarm":this.activeArray=this.volData;break;case"temperatureAlarm":this.activeArray=this.temperatureData;break;case"othersAlarm":this.activeArray=this.othersData;break}}}},E=_,A=(a("ea1a"),a("2877")),u=Object(A["a"])(E,r,l,!1,null,"511163f0",null);e["default"]=u.exports},c109:function(t,e,a){},ea1a:function(t,e,a){"use strict";var r=a("c109"),l=a.n(r);l.a}}]);
//# sourceMappingURL=BatterManageVAlarm.155854b0.js.map