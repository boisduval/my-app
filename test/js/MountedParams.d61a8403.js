(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["MountedParams"],{c60d:function(a,t,e){"use strict";e.r(t);var l=function(){var a=this,t=a.$createElement,e=a._self._c||t;return e("div",[e("el-form",{staticClass:"clearfix"},[e("el-col",{attrs:{span:6}},[e("el-form-item",{attrs:{label:a.$t("MountedParams.formLabel")[0],"label-width":"150px"}},[e("el-input",{attrs:{value:a.data.uPS_NUMBER,readonly:!0}})],1)],1),e("el-col",{attrs:{span:6}},[e("el-form-item",{attrs:{label:a.$t("MountedParams.formLabel")[1],"label-width":"150px"}},[e("el-input",{attrs:{value:a.data.pCS_NUMBER,readonly:!0}})],1)],1)],1),e("el-form",a._l(a.EInfo,(function(a,t){return e("el-col",{key:t,attrs:{span:6,index:t}},[e("el-form-item",{attrs:{label:a.label,"label-width":"150px"}},[e("el-input",{attrs:{value:a.value,readonly:!0}})],1)],1)})),1)],1)},r=[],n=e("2f62");function s(a,t){var e=Object.keys(a);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(a);t&&(l=l.filter((function(t){return Object.getOwnPropertyDescriptor(a,t).enumerable}))),e.push.apply(e,l)}return e}function o(a){for(var t=1;t<arguments.length;t++){var e=null!=arguments[t]?arguments[t]:{};t%2?s(e,!0).forEach((function(t){u(a,t,e[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(a,Object.getOwnPropertyDescriptors(e)):s(e).forEach((function(t){Object.defineProperty(a,t,Object.getOwnPropertyDescriptor(e,t))}))}return a}function u(a,t,e){return t in a?Object.defineProperty(a,t,{value:e,enumerable:!0,configurable:!0,writable:!0}):a[t]=e,a}var d={data:function(){return{EInfo:[],api:"/api/Devices/GetDMSStartParaInfo",api1:"/api/Devices/GetDMSRunStateInfo",data:{}}},computed:o({},Object(n["c"])("detail",["paramsD"])),mounted:function(){this.paramsD.AutoSystemID&&this.paramsD.SystemID&&this.getEInfo1(this.api1,this.paramsD)},methods:{getEInfo1:function(a,t){var e=this;this.$axios.get("".concat(a,"?AutoSystemID=").concat(t.AutoSystemID,"&DeviceDIDS=").concat(t.batterID)).then((function(a){if(0===a.data.code)for(var t in e.data=a.data.data,e.data)switch(t){case"pRESETS_THE_UPS_DEVICE_MOUNT_STATE":e.EInfo.push({label:e.$t("MountedParams.label")[0],value:!0===e.data[t]?e.$t("MountedParams.state")[0]:e.$t("MountedParams.state")[1]});break;case"pRESETS_THE_PCS_DEVICE_MOUNT_STATE":e.EInfo.push({label:e.$t("MountedParams.label")[1],value:!0===e.data[t]?e.$t("MountedParams.state")[0]:e.$t("MountedParams.state")[1]});break;case"pRESETS_THE_GENERATOR_EQUIPMENT_MOUNT_STATE":e.EInfo.push({label:e.$t("MountedParams.label")[2],value:!0===e.data[t]?e.$t("MountedParams.state")[0]:e.$t("MountedParams.state")[1]});break;case"pRESETS_THE_LINKAGE_MODULE_MOUNT_STATE":e.EInfo.push({label:e.$t("MountedParams.label")[3],value:!0===e.data[t]?e.$t("MountedParams.state")[0]:e.$t("MountedParams.state")[1]});break;case"pRE_SET_FIRE_SYSTEM_MOUNT_STATUS":e.EInfo.push({label:e.$t("MountedParams.label")[4],value:!0===e.data[t]?e.$t("MountedParams.state")[0]:e.$t("MountedParams.state")[1]});break;case"pRESETS_THE_MOUNTING_STATE_OF_PHOTOVOLTAIC_EQUIPMENT":e.EInfo.push({label:e.$t("MountedParams.label")[5],value:!0===e.data[t]?e.$t("MountedParams.state")[0]:e.$t("MountedParams.state")[1]});break;case"pRE_SET_THE_WIND_POWER_EQUIPMENT_MOUNT_STATE":e.EInfo.push({label:e.$t("MountedParams.label")[6],value:!0===e.data[t]?e.$t("MountedParams.state")[0]:e.$t("MountedParams.state")[1]});break;case"pRESETS_THE_BATTERY_PACK_EQUIPMENT_MOUNT_STATE":e.EInfo.push({label:e.$t("MountedParams.label")[7],value:!0===e.data[t]?e.$t("MountedParams.state")[0]:e.$t("MountedParams.state")[1]});break}else 1===a.data.code||a.data.code;0!==a.data.code&&(e.EInfo.push({label:e.$t("MountedParams.label")[0],value:""}),e.EInfo.push({label:e.$t("MountedParams.label")[1],value:""}),e.EInfo.push({label:e.$t("MountedParams.label")[2],value:""}),e.EInfo.push({label:e.$t("MountedParams.label")[3],value:""}),e.EInfo.push({label:e.$t("MountedParams.label")[4],value:""}),e.EInfo.push({label:e.$t("MountedParams.label")[5],value:""}),e.EInfo.push({label:e.$t("MountedParams.label")[6],value:""}),e.EInfo.push({label:e.$t("MountedParams.label")[7],value:""}))})).catch((function(a){console.error(a)}))}}},E=d,c=e("2877"),b=Object(c["a"])(E,l,r,!1,null,"01f895c0",null);t["default"]=b.exports}}]);
//# sourceMappingURL=MountedParams.d61a8403.js.map