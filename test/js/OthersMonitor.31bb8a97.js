(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["OthersMonitor"],{cca8:function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("el-row",{attrs:{gutter:20}},[a("el-col",{attrs:{span:12}},[a("el-card",{staticClass:"box-card"},[a("div",{staticStyle:{height:"350px"},attrs:{id:"myChart"}})])],1),a("el-col",{attrs:{span:12}},[a("el-card",[a("div",{staticStyle:{height:"350px"},attrs:{id:"myChart1"}})])],1),a("el-col",{attrs:{span:12}},[a("el-card",{staticClass:"box-card"},[a("div",{staticStyle:{height:"350px"},attrs:{id:"myChart2"}})])],1),a("el-col",{attrs:{span:12}},[a("el-card",[a("div",{staticStyle:{height:"350px"},attrs:{id:"myChart3"}})])],1)],1)],1)},o=[],s={data:function(){return{xAxis:[],yAxis:"",series:[],AutoSystemID:"",data:[],MEMPoolPaged:[],MEMPoolNonPaged:[],PageFile:[],CONTENTSwitches:[],SamplingTime:[],interval:"",myChart:"",myChart1:""}},created:function(){var t=this;this.AutoSystemID=localStorage.getItem("AutoSystemID"),this.$nextTick((function(){t.getData(),t.interval=setInterval((function(){console.log("ok"),t.getData()}),6e3)})),this.$once("hook:beforeDestroy",(function(){clearInterval(t.interval)}))},methods:{getData:function(){var t=this,e="/api/Monitor/GetSystemMonitorInfo";this.$axios.get(e,{params:{AutoSystemID:this.AutoSystemID}}).then((function(e){0===e.data.code?(t.data=e.data.data,t.setData(),t.getEcharts()):1===e.data.code&&t.$message.error(e.data.msg)})).catch((function(t){console.error(t)}))},setData:function(){var t=this;if(this.MEMPoolPaged.length>65)for(var e in this.data[0])if(this.hasOwnProperty(e))for(var a=0;a<6;a++)this[e].shift();this.data.forEach((function(e,a){for(var i in e)if(e.hasOwnProperty(i)&&t.hasOwnProperty(i))if("SamplingTime"===i);else{t[i].push({name:"",value:[]});var o=t[i].length-1;t[i][o].name=new Date(e.SamplingTime),t[i][o].value=[new Date(e.SamplingTime),e[i]]}}))},getEcharts:function(){var t=this.$echarts.init(document.getElementById("myChart"));t.setOption({tooltip:{trigger:"axis"},grid:{left:"3%",right:"4%",bottom:"3%",containLabel:!0},title:{text:"内存池分页"},toolbox:{feature:{saveAsImage:{}}},xAxis:{type:"time",boundaryGap:!1,splitLine:{show:!1}},yAxis:{type:"value",boundaryGap:[0,"100%"],splitLine:{show:!1}},series:[{symbol:"none",name:"内存池分页",type:"line",data:this.MEMPoolPaged,smooth:!0,itemStyle:{color:"#7CB5EC"}}]});var e=this.$echarts.init(document.getElementById("myChart1"));e.setOption({tooltip:{trigger:"axis"},grid:{left:"3%",right:"4%",bottom:"3%",containLabel:!0},title:{text:"内存池未分页"},toolbox:{feature:{saveAsImage:{}}},xAxis:{type:"time",boundaryGap:!1,splitLine:{show:!1}},yAxis:{type:"value",boundaryGap:[0,"100%"],splitLine:{show:!1}},series:[{symbol:"none",name:"内存池未分页",type:"line",data:this.MEMPoolNonPaged,smooth:!0,itemStyle:{color:"#FF9655"}}]});var a=this.$echarts.init(document.getElementById("myChart2"));a.setOption({tooltip:{trigger:"axis",formatter:function(t){var e=t[0].name+"<br/>";return t.forEach((function(t){e+=t.marker+t.seriesName+": "+t.data+"%<br/>"})),e}},grid:{left:"3%",right:"4%",bottom:"3%",containLabel:!0},title:{text:"页面文件"},toolbox:{feature:{saveAsImage:{}}},xAxis:{type:"time",boundaryGap:!1,splitLine:{show:!1}},yAxis:{type:"value",boundaryGap:[0,"100%"],splitLine:{show:!1}},series:[{symbol:"none",name:"页面文件",type:"line",data:this.PageFile,smooth:!0,itemStyle:{color:"#69F9C4"}}]});var i=this.$echarts.init(document.getElementById("myChart3"));i.setOption({tooltip:{trigger:"axis"},grid:{left:"3%",right:"4%",bottom:"3%",containLabel:!0},title:{text:"内容切换"},toolbox:{feature:{saveAsImage:{}}},xAxis:{type:"time",boundaryGap:!1,splitLine:{show:!1}},yAxis:{type:"value",boundaryGap:[0,"100%"],splitLine:{show:!1}},series:[{symbol:"none",name:"内容切换",type:"line",data:this.CONTENTSwitches,smooth:!0,itemStyle:{color:"#d48265"}}]}),setTimeout((function(){window.onresize=function(){t.resize(),e.resize(),a.resize(),i.resize()}}),200)}}},n=s,r=a("2877"),l=Object(r["a"])(n,i,o,!1,null,"7ec90eff",null);e["default"]=l.exports}}]);
//# sourceMappingURL=OthersMonitor.31bb8a97.js.map