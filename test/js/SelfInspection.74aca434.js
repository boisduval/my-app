(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["SelfInspection"],{"4a78":function(e,t,a){"use strict";var n=a("a3c6"),o=a.n(n);o.a},a3c6:function(e,t,a){},cf01:function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("el-collapse-transition",[a("div",{directives:[{name:"show",rawName:"v-show",value:e.isShow,expression:"isShow"}],staticStyle:{"box-sizing":"border-box"}},[a("el-card",{staticClass:"box-card"},[a("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[a("span",[e._v(e._s(e.$t("deviceManage.searchTitle")))])]),a("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0,model:e.formInline,"label-width":"100px","label-position":"right"}},[a("el-form-item",{attrs:{label:e.$t("deviceManage.searchForm.label")[0]}},[a("el-input",{attrs:{placeholder:e.$t("deviceManage.searchForm.placeholder")[0]},model:{value:e.formInline.ICCID,callback:function(t){e.$set(e.formInline,"ICCID",t)},expression:"formInline.ICCID"}})],1),a("el-form-item",{attrs:{label:e.$t("deviceManage.searchForm.label")[1]}},[a("el-input",{attrs:{placeholder:e.$t("deviceManage.searchForm.placeholder")[1]},model:{value:e.formInline.IDS,callback:function(t){e.$set(e.formInline,"IDS",t)},expression:"formInline.IDS"}})],1),a("el-form-item",{attrs:{label:e.$t("deviceManage.searchForm.label")[2]}},[a("el-input",{attrs:{placeholder:e.$t("deviceManage.searchForm.placeholder")[2]},model:{value:e.formInline.VIN,callback:function(t){e.$set(e.formInline,"VIN",t)},expression:"formInline.VIN"}})],1),a("el-form-item",{attrs:{label:e.$t("deviceManage.searchForm.label")[3]}},[a("el-input",{attrs:{placeholder:e.$t("deviceManage.searchForm.placeholder")[3]},model:{value:e.formInline.Name,callback:function(t){e.$set(e.formInline,"Name",t)},expression:"formInline.Name"}})],1),a("el-form-item",[a("el-button",{attrs:{type:"primary"},on:{click:function(t){e.formInline.page=1,e.getData()}}},[e._v(e._s(e.$t("base.searchbtn")))])],1)],1)],1),a("div",{staticStyle:{height:"20px",width:"100%"}})],1)]),a("el-card",{staticClass:"box-card visible"},[a("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[a("span",[e._v(e._s(e.$t("deviceManage.listTitle")))])]),a("vxe-toolbar",{attrs:{custom:"",print:"",export:""},scopedSlots:e._u([{key:"buttons",fn:function(){return[a("el-button",{staticClass:"button-left",attrs:{type:"primary",size:"small"},on:{click:e.getData}},[a("i",{staticClass:"el-icon-refresh-right"}),e._v(" "+e._s(e.$t("base.refresh"))+" ")]),a("el-button",{staticClass:"button-left",attrs:{type:"primary",size:"small"},on:{click:function(t){e.isShow=!e.isShow}}},[a("i",{staticClass:"el-icon-search"}),e._v(" "+e._s(e.$t("base.search"))+" ")])]},proxy:!0}])}),a("vxe-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],ref:"xTable",attrs:{data:e.tableData,border:"","export-config":e.exportConfig,"element-loading-background":"rgba(0, 0, 0, 0)","edit-config":{trigger:"manual",mode:"row"},resizable:"",align:"center","highlight-hover-row":"","highlight-current-row":""}},[a("vxe-table-column",{attrs:{type:"checkbox",width:"50",fixed:"left",align:"center"}}),a("vxe-table-column",{attrs:{type:"seq",width:"50",title:e.$t("deviceManage.tableLabel")[0],fixed:"left",align:"center"}}),a("vxe-table-column",{attrs:{field:"DICCID",title:e.$t("deviceManage.tableLabel")[1],sortable:"",width:"250","show-overflow":"","show-header-overflow":""}}),a("vxe-table-column",{attrs:{field:"DIDS",title:e.$t("deviceManage.tableLabel")[2],sortable:"",width:"250","show-overflow":"","show-header-overflow":""}}),a("vxe-table-column",{attrs:{field:"DVIN",title:e.$t("deviceManage.tableLabel")[3],sortable:"",width:"250","show-overflow":"","show-header-overflow":""}}),a("vxe-table-column",{attrs:{field:"DName",title:e.$t("deviceManage.tableLabel")[4],sortable:"",width:"150","show-overflow":"","show-header-overflow":""}}),a("vxe-table-column",{attrs:{field:"DManageMentUserName",title:e.$t("deviceManage.tableLabel")[5],sortable:"",width:"150",align:"left","show-overflow":"","show-header-overflow":""}}),a("vxe-table-column",{attrs:{field:"DTime",title:e.$t("deviceManage.tableLabel")[6],sortable:"",width:"250",align:"left","show-overflow":"","show-header-overflow":""}}),a("vxe-table-column",{attrs:{title:e.$t("deviceManage.tableLabel")[7],width:"200"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[a("el-button",{attrs:{size:"small"},on:{click:function(t){return e.setSelfInspection(n)}}},[a("i",{staticClass:"el-icon-edit"}),e._v(" "+e._s(e.$t("selfInspection.operation")[0])+" ")])]}}])})],1),a("el-pagination",{attrs:{"current-page":e.formInline.page,"page-sizes":[2,4,8],layout:"total, sizes, prev, pager, next, jumper",total:e.count},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)],1)},o=[],i=a("2f62");function l(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function r(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?l(a,!0).forEach((function(t){s(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):l(a).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function s(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}var c={data:function(){return{formInline:{page:1,limit:2,ICCID:"",IDS:"",VIN:"",Name:"",AutoSystemID:""},tableData:[],isShow:!0,count:0,loading:!1,exportConfig:{filename:"export",sheetName:"Sheet1",types:["csv","xlsx"]}}},methods:r({},Object(i["b"])("detail",["set_paramsD","set_paramsB","set_paramsS"]),{},Object(i["b"])("tabs",["set_detail_label"]),{getData:function(){var e=this;this.loading=!0,this.formInline.AutoSystemID=localStorage.getItem("AutoSystemID"),this.$axios.get("/api/Devices/GetRegistrationEquipmentList?AutoSystemID=".concat(this.formInline.AutoSystemID,"&page=").concat(this.formInline.page,"&limit=").concat(this.formInline.limit,"&ICCID=").concat(this.formInline.ICCID,"&IDS=").concat(this.formInline.IDS,"&VIN=").concat(this.formInline.VIN,"&Name=").concat(this.formInline.Name)).then((function(t){t.data.data?e.tableData=t.data.data:e.tableData=[],e.count=t.data.count,e.loading=!1})).catch((function(e){console.log(e)}))},handleSizeChange:function(e){this.formInline.limit=e,this.getData()},handleCurrentChange:function(e){this.formInline.page=e,this.getData()},printEvent:function(){this.$refs.xTable.print()},exportDataEvent:function(){this.$refs.xTable.exportData({type:"csv"})},exportExcel:function(){var e=this;this.listHead=[],this.listFilter=[];for(var t=2;t<this.customColumns.length;t++)this.customColumns[t].visible&&(this.listFilter.push(this.customColumns[t].property),this.listHead.push(this.customColumns[t].title));a.e("chunk-2a804f84").then(function(){var t=a("39a0"),n=t.export_json_to_excel,o=e.listHead,i=e.listFilter,l=e.tableData,r=e.formatJson(i,l);n(o,r,"".concat(e.fileName))}.bind(null,a)).catch(a.oe)},formatJson:function(e,t){return t.map((function(t){return e.map((function(e){return t[e]}))}))},setSelfInspection:function(e){var t=this;console.log(e),this.$confirm("".concat(this.$t("selfInspection.tip")," ").concat(e.DName," ?"),this.$t("selfInspection.title"),{confirmButtonText:this.$t("selfInspection.yes"),cancelButtonText:this.$t("selfInspection.no"),type:"warning"}).then((function(){var a="/api/Devices/SelfInspection",n=e.DIDS,o=t.formInline.AutoSystemID,i=e.DName;t.$axios.post(a,{IDS:n,AutoSystemID:o,Name:i}).then((function(e){0===e.data.code?t.$message.success(e.data.msg):1===e.data.code&&t.$message.error(e.data.msg)})).catch((function(e){console.error(e)}))})).catch((function(){t.$message({type:"info",message:t.$t("selfInspection.cancel")})}))}}),created:function(){this.getData()}},f=c,h=(a("4a78"),a("2877")),m=Object(h["a"])(f,n,o,!1,null,"3b756ed0",null);t["default"]=m.exports}}]);
//# sourceMappingURL=SelfInspection.74aca434.js.map