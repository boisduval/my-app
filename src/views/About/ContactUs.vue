<template>
  <div style="position:relative;">
    <Spin v-if="loading" fix></Spin>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>{{$t('base.search')}}</span>
      </div>
      <div class="flex-row" style="flex-wrap:wrap;" v-if="data">
        <div class="item">
          <p class="label">
            <i class="el-icon-phone" style="font-size: 24px;color:#409EFF;"></i>
            <span class="top-info">
              {{data.MainMachine}}
            </span>
          </p>
        </div>
        <div class="item">
          <p class="label">
            <i class="el-icon-user-solid" style="font-size: 24px;color:#409EFF;"></i>
            <span class="top-info">
              {{data.Contacts}}
            </span>
          </p>
        </div>
        <div class="item">
          <p class="label">
            <i class="el-icon-map-location" style="font-size: 24px;color:#409EFF;"></i>
            <span class="top-info">
              {{data.CompanyAddress}}
            </span>
          </p>
        </div>
      </div>
    </el-card>

    <el-card class="box-card" style="margin-top:20px;">
      <div class="flex-column route">
        <p>
          {{data.DrivingCircuit}}
        </p>
        <p>
          {{data.BusRoute}}
        </p>
      </div>
      <div style="height:450px" v-if="data">
        <template>
          <baidu-map class="bm-view" :center="center" :zoom="zoom" @ready="handler" :mapStyle="mapStyle">
            <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
            <bm-marker :position="markerPoint" :dragging="true" @click="infoWindowOpen">
              <bm-info-window :show="show" @close="infoWindowClose" @open="infoWindowOpen">
                <p class="company">{{data.CompanyName}}</p>
                <p class="info">
                  {{data.CompanyAddress}}
                </p>
                <p class="info">
                  {{data.Postcode}}
                </p>
                <p class="info">
                  {{data.MainMachine}}
                </p>
                <p class="info">
                  {{data.Faxes}}
                </p>
                <p class="info">
                  {{data.EnterpriseWebsite}}
                </p>
              </bm-info-window>
            </bm-marker>
          </baidu-map>
        </template>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      center: { lng: 0, lat: 0 },
      zoom: 3,
      show: false,
      markerPoint: { lng: 120.11257, lat: 30.310037 },
      AutoSystemID: '',
      data: '',
      loading: true
    }
  },
  created () {
    this.AutoSystemID = localStorage.getItem('AutoSystemID')
    this.getData()
  },
  methods: {
    handler ({ BMap, map }) {
      // let mapStyle = { style: 'dark' }
      // map.setMapStyleV2(stylejson)
      // console.log(BMap, map)
      this.center.lng = 120.11257
      this.center.lat = 30.310037
      this.zoom = 18
    },
    infoWindowClose () {
      this.show = false
    },
    infoWindowOpen () {
      this.show = true
    },
    getData () {
      this.axios.get(`/api/Ablut/GetToCompanyRoute?AutoSystemID=${this.AutoSystemID}`)
        .then(res => {
          if (res.data.code === 0) {
            this.data = res.data.data
            this.markerPoint.lng = this.data.Latitude
            this.markerPoint.lat = this.data.Longitude
            setTimeout(() => {
              this.show = true
              this.loading = false
            }, 500)
          }
        })
        .catch(err => {
          console.error(err)
        })
    }
  }
}
</script>

<style scoped>
.item {
  font-size: 20px;
  padding: 10px 20px;
}
.bm-view {
  height: 100%;
  width: 100%;
}
.company {
  font-weight:700;
  font-size:18px;
  margin-bottom: 10px;
}
.info {
  font-size: 14px;
}
.top-info {
  margin-left: 10px;
  /* display: inline-block; */
  line-height: 28px;
}
.route {
  padding: 20px;
  margin-bottom: 10px;
  background: url('../../assets/img/routeBg.png') center no-repeat;
  background-size: 100% 100%;
}
.route p {
  text-align: center;
  font-size: 18px;
  font-weight: 600;
  line-height: 28px;
  color: #fff;
}
</style>
