(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["LoginLog"],{c419:function(e,t,a){"use strict";var r=a("dca0"),o=a.n(r);o.a},cf4a:function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("el-collapse-transition",[a("div",{directives:[{name:"show",rawName:"v-show",value:e.isShow,expression:"isShow"}],staticStyle:{"box-sizing":"border-box"}},[a("el-card",{staticClass:"box-card"},[a("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[a("span",[e._v(e._s(e.$t("loginLog.searchTitle")))])]),a("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0,model:e.searchForm,"label-width":"100px","label-position":"right"}},[a("el-form-item",{attrs:{label:e.$t("loginLog.searchForm.label")[0]}},[a("el-date-picker",{attrs:{type:"daterange","range-separator":e.$t("base.datePicker.separator"),"start-placeholder":e.$t("base.datePicker.start"),"end-placeholder":e.$t("base.datePicker.end")},model:{value:e.value,callback:function(t){e.value=t},expression:"value"}})],1),a("el-form-item",{attrs:{label:e.$t("loginLog.searchForm.label")[1]}},[a("el-select",{model:{value:e.searchForm.UserSystemID,callback:function(t){e.$set(e.searchForm,"UserSystemID",t)},expression:"searchForm.UserSystemID"}},e._l(e.userList,(function(e,t){return a("el-option",{key:t,attrs:{value:e.SystemID,label:e.Name}})})),1)],1),a("el-form-item",{attrs:{label:e.$t("loginLog.searchForm.label")[2]}},[a("el-input",{model:{value:e.searchForm.HostAddress,callback:function(t){e.$set(e.searchForm,"HostAddress",t)},expression:"searchForm.HostAddress"}})],1),a("el-form-item",[a("el-button",{attrs:{type:"primary"},on:{click:function(t){e.searchForm.page=1,e.getData()}}},[e._v(e._s(e.$t("base.searchbtn")))]),a("el-button",{staticStyle:{"margin-left":"20px"},attrs:{type:"primary",plain:"",size:"mini"},on:{click:function(t){return e.goOtherDay("today")}}},[e._v(e._s(e.$t("base.dateGroup.today")))]),a("el-button",{attrs:{type:"primary",plain:"",size:"mini"},on:{click:function(t){return e.goOtherDay("two")}}},[e._v(e._s(e.$t("base.dateGroup.twoDays")))]),a("el-button",{attrs:{type:"primary",plain:"",size:"mini"},on:{click:function(t){return e.goOtherDay("week")}}},[e._v(e._s(e.$t("base.dateGroup.week")))]),a("el-button",{attrs:{type:"primary",plain:"",size:"mini"},on:{click:function(t){return e.goOtherDay("month")}}},[e._v(e._s(e.$t("base.dateGroup.month")))])],1)],1)],1),a("div",{staticStyle:{height:"20px",width:"100%"}})],1)]),a("el-card",{staticClass:"box-card visible"},[a("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[a("span",[e._v(e._s(e.$t("loginLog.listTitle")))])]),a("vxe-toolbar",{attrs:{custom:"",print:"",export:""},scopedSlots:e._u([{key:"buttons",fn:function(){return[a("el-button",{staticClass:"button-left",attrs:{type:"primary",size:"small"},on:{click:e.getData}},[a("i",{staticClass:"el-icon-refresh-right"}),e._v(" "+e._s(e.$t("base.refresh"))+" ")]),a("el-button",{staticClass:"button-left",attrs:{type:"primary",size:"small"},on:{click:function(t){e.isShow=!e.isShow}}},[a("i",{staticClass:"el-icon-search"}),e._v(" "+e._s(e.$t("base.search"))+" ")])]},proxy:!0}])}),a("vxe-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],ref:"xTable",attrs:{data:e.tableData,border:"","export-config":e.exportConfig,"element-loading-background":"rgba(0, 0, 0, 0)","edit-config":{trigger:"manual",mode:"row"},resizable:"",align:"center","highlight-hover-row":"","highlight-current-row":""}},[a("vxe-table-column",{attrs:{type:"checkbox",width:"50",fixed:"left"}}),a("vxe-table-column",{attrs:{type:"seq",width:"50",title:e.$t("loginLog.tableLabel")[0],fixed:"left"}}),a("vxe-table-column",{attrs:{field:"AccountNumber",title:e.$t("loginLog.tableLabel")[1],sortable:"",width:"150","show-overflow":"","show-header-overflow":""}}),a("vxe-table-column",{attrs:{field:"UserName",title:e.$t("loginLog.tableLabel")[2],sortable:"",width:"180","show-overflow":"","show-header-overflow":""}}),a("vxe-table-column",{attrs:{field:"NativePlace",title:e.$t("loginLog.tableLabel")[3],width:"180","show-overflow":"","show-header-overflow":""}}),a("vxe-table-column",{attrs:{field:"HostIP",title:e.$t("loginLog.tableLabel")[4],sortable:"",width:"180","show-overflow":"","show-header-overflow":""}}),a("vxe-table-column",{attrs:{field:"ComputerLocation",title:e.$t("loginLog.tableLabel")[5],width:"180","show-overflow":"","show-header-overflow":""}}),a("vxe-table-column",{attrs:{field:"Platform",title:e.$t("loginLog.tableLabel")[6],width:"180","show-overflow":"","show-header-overflow":""}}),a("vxe-table-column",{attrs:{field:"BrowserType",title:e.$t("loginLog.tableLabel")[7],width:"180","show-overflow":"","show-header-overflow":""}}),a("vxe-table-column",{attrs:{field:"WriteTime",title:e.$t("loginLog.tableLabel")[8],sortable:"",width:"180","show-overflow":"","show-header-overflow":""}}),a("vxe-table-column",{attrs:{title:e.$t("loginLog.tableLabel")[9],width:"200",fixed:"right"},scopedSlots:e._u([{key:"default",fn:function(t){var r=t.row;return[a("el-button",{attrs:{plain:"",size:"small"},on:{click:function(t){return e.toDetail(r)}}},[a("i",{staticClass:"el-icon-info"},[e._v(e._s(e.$t("loginLog.operation")[0]))])])]}}])})],1),a("el-pagination",{attrs:{"current-page":e.searchForm.page,"page-sizes":e.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:e.count},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}}),a("Drawer",{attrs:{closable:!1,title:e.$t("register.dialog.title"),draggable:"",width:"30"},model:{value:e.value4,callback:function(t){e.value4=t},expression:"value4"}},[a("div",{staticClass:"block"},[a("div",{staticClass:"radio"},[e._v(" "+e._s(e.$t("register.dialog.order")[0])+" "),a("el-radio-group",{model:{value:e.reverse,callback:function(t){e.reverse=t},expression:"reverse"}},[a("el-radio",{attrs:{label:!0}},[e._v(e._s(e.$t("register.dialog.order")[1]))]),a("el-radio",{attrs:{label:!1}},[e._v(e._s(e.$t("register.dialog.order")[2]))])],1)],1),a("el-timeline",{attrs:{reverse:e.reverse}},e._l(e.activities,(function(t,r){return a("el-timeline-item",{key:r,attrs:{timestamp:t.timestamp,color:"#409EFF"}},[e._v(" [ "+e._s(t.UserAddress)+" ]"+e._s(t.Msg)+" ")])})),1)],1)])],1)],1)},o=[],s=a("2f62");function i(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,r)}return a}function l(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?i(a,!0).forEach((function(t){n(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):i(a).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function n(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}var c=a("c1df"),d={data:function(){return{isShow:!0,searchForm:{Start:"",Stop:"",page:1,limit:10,UserSystemID:"",HostAddress:""},value:"",userList:"",tableData:[],count:0,loading:!1,options:[],value4:!1,activities:"",pStyle:{fontSize:"14px",color:"rgba(0,0,0,0.85)",lineHeight:"24px",display:"block",marginBottom:"16px"},reverse:!1,exportConfig:{filename:"export",sheetName:"Sheet1",types:["csv","xlsx"]}}},methods:{handleSizeChange:function(e){this.searchForm.limit=e,this.getData()},handleCurrentChange:function(e){this.searchForm.page=e,this.getData()},getUserList:function(){var e=this;return new Promise((function(t,a){var r=localStorage.getItem("AutoSystemID");e.$axios.get("/api/Users/GetUserNames?AutoSystemID=".concat(r)).then((function(a){200===a.status&&(0===a.data.code?(console.log(a.data.data),e.userList=a.data.data,e.searchForm.UserSystemID=e.userList[0].SystemID,t(a.data.data)):t())})).catch((function(e){a(e)}))}))},getData:function(){var e=this;this.loading=!0,this.searchForm.Start=c(this.value[0]).format("YYYY-MM-DD"),this.searchForm.Stop=c(this.value[1]).format("YYYY-MM-DD");var t="/api/Users/GetUserLogins";this.$axios.get(t,{params:this.searchForm}).then((function(t){0===t.data.code?(e.tableData=t.data.data,e.count=t.data.count,e.loading=!1):1===t.data.code&&(e.$message.error(t.data.msg),e.loading=!1)})).catch((function(e){console.error(e)}))},toDetail:function(e){var t=this;this.value4=!0;var a=e.AutoSystemID;this.activities=[],this.$axios.get("/api/Users/GetUserOperatingRecords?AutoSystemID=".concat(this.searchForm.AutoSystemID,"&ORASystemID=").concat(a)).then((function(e){if(0===e.data.code){console.log(e.data.data);var a=e.data.data;a.map((function(e){t.activities.push({timestamp:e.OperTime,UserAddress:e.UserAddress,Msg:e.Msg})}))}else 1===e.data.code&&t.$message.error(e.data.msg)})).catch((function(e){console.error(e)}))},goOtherDay:function(e){var t;switch(e){case"today":t=c().subtract(0,"days").format("YYYY-MM-DD");break;case"two":t=c().subtract(2,"days").format("YYYY-MM-DD"),console.log(t);break;case"week":t=c().subtract(1,"weeks").format("YYYY-MM-DD");break;case"month":t=c().subtract(1,"months").format("YYYY-MM-DD");break}this.value=[t,new Date]}},created:function(){var e=this;this.searchForm.AutoSystemID=localStorage.getItem("AutoSystemID"),this.searchForm.limit=this.pageSize[0];var t=c().subtract(0,"days").format("YYYY-MM-DD");this.value=[t,t],this.getUserList().then((function(t){return e.getData()}))},computed:l({},Object(s["c"])("table",["pageSize"]))},u=d,h=(a("c419"),a("2877")),m=Object(h["a"])(u,r,o,!1,null,"52d2c56c",null);t["default"]=m.exports},dca0:function(e,t,a){}}]);
//# sourceMappingURL=LoginLog.ed54e343.js.map