<template>
  <div id="screen">
    <div class="dataTable">
      <div class="topTitle">
        开放式平台
      </div>
      <div class="time" id="times"></div>
      <div class="content clearfix">
        <div class="center-content">
          <div class="center_top">
            <div id="myMap" style="height: 100%; width: 100%;"></div>
            <div class="myMapData">
              <p>全国产能统计</p>
              <p class="allBack">总回收量：<span id="allBack"></span>个</p>
              <p class="allSell">总出货量：<span id="allSell"></span>个</p>
            </div>
          </div>
        </div>
        <div class="left-content"></div>
        <div class="right-content"></div>
      </div>
    </div>
  </div>
</template>
<script>
import '../../node_modules/echarts/map/js/china.js'
export default {
  data () {
    return {
      interval: ''
    }
  },
  created () {
    this.interval = setInterval(() => {
      this.getDate()
    }, 1000)
    this.$once('hook:beforeDestroy', () => {
      clearInterval(this.interval)
    })
  },

  mounted () {
    this.getMap()
  },

  methods: {
    // 获取时间
    getDate () {
      var date = new Date()
      date = date.toLocaleString()
      this.$('#times').text(date)
    },

    // 地图
    getMap () {
      var mydata = [
        {
          name: '北京',
          value: [
            { type: '回收量', num: '11' },
            { type: '出货量', num: '21' }
          ]
        },
        {
          name: '天津',
          value: [
            { type: '回收量', num: '12' },
            { type: '出货量', num: '24' }
          ]
        },
        {
          name: '上海',
          value: [
            { type: '回收量', num: '9' },
            { type: '出货量', num: '25' }
          ]
        },
        {
          name: '浙江',
          value: [
            { type: '回收量', num: '9' },
            { type: '出货量', num: '25' }
          ]
        },
        {
          name: '江苏',
          value: [
            { type: '回收量', num: '9' },
            { type: '出货量', num: '25' }
          ]
        },
        {
          name: '安徽',
          value: [
            { type: '回收量', num: '9' },
            { type: '出货量', num: '25' }
          ]
        },
        {
          name: '江西',
          value: [
            { type: '回收量', num: '9' },
            { type: '出货量', num: '25' }
          ]
        },
        {
          name: '河南',
          value: [
            { type: '回收量', num: '9' },
            { type: '出货量', num: '25' }
          ]
        },
        {
          name: '湖北',
          value: [
            { type: '回收量', num: '9' },
            { type: '出货量', num: '25' }
          ]
        },
        {
          name: '湖南',
          value: [
            { type: '回收量', num: '9' },
            { type: '出货量', num: '25' }
          ]
        },
        {
          name: '福建',
          value: [
            { type: '回收量', num: '9' },
            { type: '出货量', num: '25' }
          ]
        },
        {
          name: '广东',
          value: [
            { type: '回收量', num: '9' },
            { type: '出货量', num: '25' }
          ]
        },
        {
          name: '山东',
          value: [
            { type: '回收量', num: '9' },
            { type: '出货量', num: '25' }
          ]
        }
      ]
      let myMap = this.$echarts.init(document.getElementById('myMap'))
      myMap.setOption({
        backgroundColor: 'rgba(0,0,0,0)',
        title: {},
        tooltip: {
          trigger: 'item',
          formatter: function (params) {
            // eslint-disable-next-line
            if (params.name != '') {
              var res = params.name + '<br/>'
              if (params.data) {
                // eslint-disable-line
                var arrays = params.data.value
                for (var i = 0; i < arrays.length; i++) {
                  res +=
                    arrays[i].type + ' : ' + arrays[i].num + '万' + '</br>'
                }
                return res
              } else {
                return res
              }
            }
          },
          backgroundColor: 'rgba(242,58,58,1)',
          textStyle: {
            color: '#fff'
          }
        },
        // 左侧小导航
        visualMap: {
          show: false,
          x: 'left',
          y: 'bottom',
          min: 0,
          max: 300,
          splitNumber: 5,
          textStyle: {
            color: '#fff'
          },
          formatter: function (value, value2) {}
        },
        series: [
          {
            map: 'china', // 表示中国地图
            name: '数据',
            type: 'map',
            roam: false,
            zoom: 1.3,
            itemStyle: {
              normal: {
                areaColor: '#89fbf2'
              },
              emphasis: {
                label: {
                  color: '#333',
                  show: true // 选中状态是否显示省份名称
                },
                areaColor: '#ff6c6c'
              }
            },
            data: mydata
          }
        ]
      })
    }
  },
  beforeDestroy () {
    clearInterval(this.interval)
  }
}
</script>

<style scoped>
.dataTable {
  color: #ffffff;
  padding: 1.5rem 1rem 0;
  /*box-sizing: border-box;*/
  /*-moz-box-sizing: border-box;*/
  background: url("../assets/img/dataTableBg1.png") no-repeat;
  -webkit-background-size: 100% 100%;
  -moz-background-size: 100% 100%;
  -o-background-size: 100% 100%;
  background-size: 100% 100%;
  position: relative;
}
.topTitle {
  font-size: 1.3rem;
  text-align: center;
  line-height: 4.45rem;
  width: 100%;
  /*box-sizing: border-box;*/
  background: url("../assets/img/bgTop.png") no-repeat;
  -webkit-background-size: 100% 100%;
  -moz-background-size: 100% 100%;
  -o-background-size: 100% 100%;
  background-size: 100% 100%;
  margin-bottom: 1.75rem;
}
.time {
  position: absolute;
  right: 2.7rem;
  top: 1.7rem;
  line-height: initial;
  font-size: 17.5417px;
}

.content {
  display: flex;
}
.center-content {
  flex: 1;
}
.left-content {
  order: -1;
}
.left-content,
.right-content {
  background: url('../assets/img/cell_left.png') no-repeat;
  -webkit-background-size: 100% 100%;
  -moz-background-size: 100% 100%;
  -o-background-size: 100% 100%;
  background-size: 100% 100%;
  margin-bottom: 1.75rem;
  padding: 0.75rem 0 0 1.1rem;
  width: 25.55rem
}

.center_top {
  width: 34rem;
  height: 28.5rem;
  margin: 0 auto 2rem;
  position: relative;
}

@media (max-width: 768px) {
  .content {
    flex-direction: column;
  }
  .left-content,
  .center-content,
  .right-content {
    flex: auto;
  }
}
#screen {
  margin: -20px;
  padding: 0;
}
</style>
