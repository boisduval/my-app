(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["NetworkMonitor"],{"51dd":function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("el-row",{attrs:{gutter:20}},[a("el-col",{attrs:{span:12}},[a("el-card",{staticClass:"box-card"},[a("div",{staticStyle:{height:"400px"},attrs:{id:"myChart"}})])],1),a("el-col",{attrs:{span:12}},[a("el-card",[a("div",{staticStyle:{height:"400px"},attrs:{id:"myChart1"}})])],1)],1)],1)},o=[],n={data:function(){return{xAxis:[],yAxis:"",series:[],AutoSystemID:"",data:[],NetTrafficSend:[],NetTrafficReceive:[],SamplingTime:[],interval:"",myChart:"",myChart1:""}},created:function(){var t=this;this.AutoSystemID=localStorage.getItem("AutoSystemID"),this.$nextTick((function(){t.getData(),t.interval=setInterval((function(){console.log("ok"),t.getData()}),6e3)})),this.$once("hook:beforeDestroy",(function(){clearInterval(t.interval)}))},methods:{getData:function(){var t=this,e="/api/Monitor/GetSystemMonitorInfo";this.$axios.get(e,{params:{AutoSystemID:this.AutoSystemID}}).then((function(e){0===e.data.code?(t.data=e.data.data,t.setData(),t.getEcharts()):1===e.data.code&&t.$message.error(e.data.msg)})).catch((function(t){console.error(t)}))},setData:function(){var t=this;if(this.NetTrafficSend.length>65)for(var e in this.data[0])if(this.hasOwnProperty(e))for(var a=0;a<6;a++)this[e].shift();this.data.forEach((function(e,a){for(var i in e)if(e.hasOwnProperty(i)&&t.hasOwnProperty(i))if("SamplingTime"===i);else{t[i].push({name:"",value:[]});var o=t[i].length-1;t[i][o].name=new Date(e.SamplingTime),t[i][o].value=[new Date(e.SamplingTime),e[i]]}}))},getEcharts:function(){var t=this.$echarts.init(document.getElementById("myChart"));t.setOption({tooltip:{trigger:"axis"},grid:{left:"3%",right:"8%",bottom:"3%",containLabel:!0},title:{text:"网络流量发送"},toolbox:{feature:{saveAsImage:{}}},xAxis:{type:"time",boundaryGap:!1,splitLine:{show:!1}},yAxis:{type:"value",boundaryGap:[0,"100%"],splitLine:{show:!1}},series:[{symbol:"none",name:"网络流量发送",type:"line",data:this.NetTrafficSend,smooth:!0,itemStyle:{color:"#7CB5EC"}}]});var e=this.$echarts.init(document.getElementById("myChart1"));e.setOption({tooltip:{trigger:"axis"},grid:{left:"3%",right:"8%",bottom:"3%",containLabel:!0},title:{text:"网络流量接收"},toolbox:{feature:{saveAsImage:{}}},xAxis:{type:"time",boundaryGap:!1,splitLine:{show:!1}},yAxis:{type:"value",boundaryGap:[0,"100%"],splitLine:{show:!1}},series:[{symbol:"none",name:"网络流量接收",type:"line",data:this.NetTrafficReceive,smooth:!0,itemStyle:{color:"#69F9C4"}}]}),setTimeout((function(){window.onresize=function(){t.resize(),e.resize()}}),200)}}},s=n,r=a("2877"),l=Object(r["a"])(s,i,o,!1,null,"bca6fe5e",null);e["default"]=l.exports}}]);
//# sourceMappingURL=NetworkMonitor.c084ef2d.js.map