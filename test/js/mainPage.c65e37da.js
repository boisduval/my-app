(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["mainPage"],{"40d0":function(t,e,a){},"5b58":function(t,e,a){"use strict";var i=a("40d0"),s=a.n(i);s.a},cd56:function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{staticClass:"main-top"},[a("el-row",{attrs:{gutter:20}},[t._l(t.top,(function(e,i){return a("el-col",{key:i,staticStyle:{height:"150px","margin-bottom":"20px"},attrs:{xs:24,sm:12,md:12,lg:6,xl:6}},[a("el-card",{staticStyle:{height:"100%"}},[a("div",{staticClass:"main-top-box"},[a("div",{staticClass:"top-icon flex3"},[a("i",{class:e.icon})]),a("div",{staticClass:"top-content flex5"},[a("div",{staticClass:"top-title"},[a("h2",[t._v(t._s(e.title))])]),a("div",{staticClass:"top-data"},[a("h3",[t._v(t._s(e.data))])])])])])],1)})),a("el-col",{staticStyle:{height:"150px","margin-bottom":"20px"},attrs:{xs:24,sm:12,md:12,lg:6,xl:6}},[a("el-card",{staticStyle:{height:"100%"}},[a("div",{staticClass:"main-top-box"},[a("div",{staticClass:"top-icon flex3"},[a("p",[t._v(t._s(t.ControllerOnLineRate))])]),a("div",{staticClass:"top-content flex5"},[a("div",{staticClass:"top-title"},[a("h2",[t._v(t._s(t.$t("main.topInfo[3]")))])]),a("div",{staticClass:"top-data"},[a("h3",[t._v(t._s(t.top4))])])])])])],1)],2)],1),a("div",{staticClass:"function"},[a("el-row",{attrs:{gutter:20}},t._l(t.funcButton,(function(e,i){return a("el-col",{key:i,staticStyle:{height:"110px","margin-bottom":"20px"},attrs:{xs:8,sm:6,md:4,lg:3,xl:3}},[a("div",{on:{click:function(a){return t.toDetail(a,e)}}},[a("el-card",{staticStyle:{height:"100%"}},[a("div",[a("div",{staticClass:"func-icon"},[a("i",{class:e.icon})]),a("div",{staticClass:"func-label"},[a("span",[t._v(t._s(e.label))])])])])],1)])})),1)],1),a("div",{staticClass:"device-num"},[a("el-card",[a("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[a("span",[t._v(t._s(t.$t("main.deviceCount.title")))])]),a("div",{staticClass:"device-data flex-row"},t._l(t.device,(function(e,i){return a("div",{key:i,staticClass:"data-item"},[a("h3",{staticClass:"flex",staticStyle:{"text-align":"right"}},[t._v(" "+t._s(e.label)+" ")]),a("h3",{staticClass:"flex",staticStyle:{"text-align":"right"}},[t._v(" "+t._s(e.num)+" ")])])})),0)])],1),a("div",{staticClass:"energy"},[a("el-card",[a("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[a("span",[t._v(t._s(t.$t("main.energyStatistics.title")))])]),a("div",{staticClass:"energy-content"},[a("el-row",{attrs:{gutter:20}},[a("el-col",{attrs:{xs:24,sm:24,md:12,lg:16,xl:16}},[a("div",{staticClass:"energy-chart"},[a("h4",{staticClass:"energy-title"},[t._v(t._s(t.$t("main.energyStatistics.trend")))]),a("div",{attrs:{id:"myChart"}})])]),a("el-col",{attrs:{xs:24,sm:24,md:12,lg:8,xl:8}},[a("div",{staticClass:"energy-order"},[a("h4",{staticClass:"energy-title"},[t._v(t._s(t.$t("main.energyStatistics.order")))]),a("div",{staticClass:"order-data"},t._l(t.batterOrder,(function(e,i){return a("div",{key:i,staticClass:"order-row"},[a("div",{staticClass:"row-l flex"},[a("div",{staticClass:"num"},[t._v(t._s(i+1))]),t._v(" "+t._s(e.Name)+" ")]),a("div",{staticClass:"row-r flex"},[t._v(t._s(e.Value)+" Kwh")])])})),0)])])],1)],1)])],1)])},s=[],n={data:function(){return{top:[{icon:"fa fa-hdd-o",title:"设备装机量",data:""},{icon:"el-icon-coin",title:"单体电池总数量",data:""},{icon:"fa fa-battery",title:"装机总电量",data:""}],funcButton:[{icon:"el-icon-user-solid",label:"用户",path:"/usersManagement"},{icon:"fa fa-instagram",label:"设备",path:"/deviceifo"},{icon:"fa fa-cubes",label:"电池",path:"/batterInfo"},{icon:"fa fa-tasks",label:"UPS",path:"/upsInfo"},{icon:"fa fa-exclamation",label:"告警",path:"/alarmRealTime"},{icon:"fa fa-envelope",label:"站内信",path:"/mailBox"},{icon:"fa fa-bookmark",label:"日志",path:"/users"},{icon:"fa fa-edit (alias)",label:"备忘",path:"/menmorandumListWaitLoad"}],device:[{label:"逆变设备装机数量",num:""},{label:"消防设备装机数量",num:""},{label:"控制器在线数量",num:""},{label:"发电机设备装机数量",num:""},{label:"光伏设备装机数量",num:""},{label:"控制器在线率",num:""},{label:"联动设备装机数量",num:""},{label:"风能设备装机数量",num:""},{label:"用户在线数量",num:""}],batterOrder:"",AutoSystemID:"",xAxis:[],series:[],ControllerOnLineRate:"",top4:""}},created:function(){this.setData(),this.AutoSystemID=localStorage.getItem("AutoSystemID"),this.getData()},methods:{setData:function(){var t=this;this.top.forEach((function(e,a){e.title=t.$t("main.topInfo")[a]})),this.funcButton.forEach((function(e,a){e.label=t.$t("main.topBar")[a]})),this.device.forEach((function(e,a){e.label=t.$t("main.deviceCount.value")[a]}))},getData:function(){var t=this;this.$axios.get("/api/Chart/GetSystemFrontPage?AutoSystemID=".concat(this.AutoSystemID)).then((function(e){if(0===e.data.code){var a=e.data.data;t.top[0].data=a.EquipmentLoadingCapacity,t.top[1].data=a.TotalNumberOfSingleBatteries,t.top[2].data=a.TotalInstalledElectricity+" Kwh",t.top4=a.CurrentTotalElectricQuantity+" Kwh",t.ControllerOnLineRate=a.TotalSOC,t.device[0].num=a.InstalledNumberOfInverterEquipment,t.device[1].num=a.InstalledQuantityOfFireFightingEquipment,t.device[2].num=a.NumberOfControllersOnline,t.device[3].num=a.InstalledNumberOfGeneratorEquipment,t.device[4].num=a.InstalledQuantityOfPhotovoltaicEquipment,t.device[5].num=a.ControllerOnLineRate,t.device[6].num=a.InstalledNumberOfLinkageEquipment,t.device[7].num=a.InstalledWindPowerEquipment,t.device[8].num=a.NumberOfUsersOnline,t.xAxis=a.EnergyStatisticsTimes,t.series=a.EnergyStatisticsValues,t.batterOrder=a.EnergyRankings}else 1===e.data.code&&t.$message.error(e.data.msg);t.getChart()})).catch((function(t){console.error(t)}))},getChart:function(){var t=this.$echarts.init(document.getElementById("myChart"));t.setOption({tooltip:{trigger:"axis"},xAxis:{type:"category",data:this.xAxis},yAxis:{type:"value"},series:[{data:this.series,type:"line",smooth:!0,areaStyle:{color:"#D0EAFB"}}],itemStyle:{color:"#259CEC"},grid:{left:80,top:20,right:20,bottom:35}}),setTimeout((function(){window.onresize=function(){t.resize()}}),200)},toDetail:function(t,e){var a=this,i=this.$(t.currentTarget);i.addClass("animated bounce"),i.one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",(function(){i.removeClass("animated bounce")})),setTimeout((function(){a.$router.push(e.path)}),1e3)}}},l=n,o=(a("5b58"),a("2877")),r=Object(o["a"])(l,i,s,!1,null,"9c7b616e",null);e["default"]=r.exports}}]);
//# sourceMappingURL=mainPage.c65e37da.js.map