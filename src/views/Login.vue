<template>
  <div id="login">
    <h1>{{ footerInfo.SystemText }}</h1>
    <!-- 登录表单 -->
    <el-row
      :gutter="10"
      style="width: 100%;display:flex;justify-content:center;"
    >
      <el-col :xs="20" :sm="16" :md="10" :lg="8" :xl="6">
        <div class="row">
          <div class="box">
            <!-- 头部 -->
            <div class="box-top">
              <div class="welcome">
                <h3>{{$t('login.headline')}}</h3>
                <p>{{$t('login.tip')}}</p>
              </div>
              <div class="wel-right">
                <i class="fa fa-lock"></i>
              </div>
            </div>
            <!-- 表单 -->
            <el-form label-position="top" :model="data">
              <el-form-item>
                <el-input
                  v-model="data.AccountNumber"
                  :placeholder="$t('login.placeholder')[0]"
                  autofocus
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-input
                  v-model="data.MD5Pass"
                  :placeholder="$t('login.placeholder')[1]"
                  type="password"
                  autocomplete="off"
                  @keyup.enter.native="login"
                ></el-input>
              </el-form-item>
              <el-button type="primary" style="width:100%" @click="login"
                >{{$t('login.login')}}</el-button
              >
            </el-form>
          </div>
        </div>
      </el-col>
    </el-row>

    <!-- 链接 -->
    <el-row style="width: 100%;display:flex;justify-content:center;">
      <el-col :xs="20" :sm="16" :md="10" :lg="6" :xl="6">
        <div class="link-to">
          <a v-for="item in footerInfo.Links" :key="item.id" class="btn btn-link-2" :href="item.Value">
            {{ item.Name }}
          </a>
        </div>
      </el-col>
    </el-row>

    <!-- 底部信息 -->
    <div class="footerifo">
      {{$t('login.footer')}} ©{{ footerInfo.SystemYear }} {{ footerInfo.CompanyName }}
      <br />{{ footerInfo.ButtonName }}<br />
    </div>

    <!-- 语言切换 -->
    <div class="lang">
      <el-dropdown @command="handleCommand">
        <i class="fa fa-globe" style="font-size:24px"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item v-for="(item, index) in lang" :key="index" :command="item.Value">{{item.Text}}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <Spin size="large" fix v-if="spinShow"></Spin>
  </div>
</template>

<script>
import returnCitySN from 'returnCitySN'
import { mapState, mapMutations } from 'vuex'
export default {
  computed: {
    ...mapState('home', ['userIfo']),
    ...mapState('lang', ['lang', 'currentLang'])
  },
  data () {
    return {
      labelPosition: 'right',
      baseURL: 'http://192.168.0.104:8080',
      data: {
        AccountNumber: '',
        MD5Pass: '',
        ClientInfo: {
          Browser: '',
          BrowserType: '',
          BrowserVersion: '',
          ComputerHostAddress: '',
          ComputerLocation: '',
          Platform: '',
          PlatformVersion: '',
          RemoteAddress: '',
          UserAgent: '',
          UserLanguage: ''
        }
      },
      is360: '',
      isIE: '',
      isFirefox: '',
      isChrome: '',
      isEdge: '',
      broName: 'Runing', // Browser and BrowserType
      str: '',
      strStart: '',
      strStart1: '',
      strStop: '',
      strStop1: '',
      strStart10: '', // BrowserVersion
      temp: '',
      temp1: '',
      broName2: '',
      broName1: '',
      userAgent: '',
      footerInfo: '',
      spinShow: false
    }
  },
  methods: {
    ...mapMutations('home', ['setUserIfo']),
    ...mapMutations('lang', ['setLang', 'setCurrentLang']),
    bro () {
      // 获取浏览器类型和版本号
      var userAgent = window.navigator.userAgent // 包含以下属性中所有或一部分的字符串：appCodeName,appName,appVersion,language,platform
      this.data.ClientInfo.UserAgent = userAgent
      // Edge
      if (userAgent.indexOf('Edge') !== -1) {
        this.isEdge = true
        /* broName = 'Edge浏览器'; */
        this.strStart = userAgent.indexOf('Edge')
        this.temp = userAgent.substring(this.strStart)
        this.broName = this.temp.replace('/', '版本号')
        this.strStart10 = 'Edge'
        this.strStart1 = userAgent.indexOf(';')
        this.strStop1 = userAgent.indexOf(')')
        this.temp1 = userAgent.substring(this.strStart1, this.strStop1)
        this.broName1 = this.temp1.substring(8) // this.temp1.replace('; Win64; ', '');
        // 客户端的操作系统版本  this.broName1
        this.broName2 = this.temp1.substring(1, 7)
        // 客户端的操作系统  this.broName2
      }

      // FireFox
      if (userAgent.indexOf('Firefox') !== -1) {
        this.isFireFox = true
        /* this.broName = 'FireFox浏览器'; */
        this.strStart = userAgent.indexOf('Firefox')
        this.strStart10 = 'Firefox'
        this.temp = userAgent.substring(this.strStart)
        this.broName = this.temp.replace('/', '版本号')
        this.strStart10 = 'Firefox'
        this.strStart1 = userAgent.indexOf(';')
        this.strStop1 = userAgent.indexOf(')')
        this.temp1 = userAgent.substring(this.strStart1, this.strStop1)
        this.broName1 = this.temp1.substring(8) // this.temp1.replace('; Win64; ', '');
        // 客户端的操作系统版本  this.broName1
        this.broName2 = this.temp1.substring(1, 7)
        // 客户端的操作系统  this.broName2
      }

      // IE浏览器
      if (userAgent.indexOf('NET') !== -1 && userAgent.indexOf('rv') !== -1) {
        this.isIE = true
        /* this.broName = 'IE浏览器'; */
        this.strStart = userAgent.indexOf('rv')
        this.strStop = userAgent.indexOf(')')
        this.temp = userAgent.substring(this.strStart, this.strStop)
        this.broName = this.temp.replace('rv', 'IE').replace(':', '版本号')
        this.strStart10 = 'Internet Explorer'
        this.strStart1 = userAgent.indexOf(';')
        this.strStop1 = userAgent.indexOf(')')
        this.temp1 = userAgent.substring(this.strStart1, this.strStop1)
        this.broName1 = this.temp1.substring(8) // this.temp1.replace('; Win64; ', '');
        // 客户端的操作系统版本  this.broName1
        this.broName2 = this.temp1.substring(1, 7)
        // 客户端的操作系统  this.broName2
      }

      // 360极速模式可以区分360安全浏览器和360极速浏览器
      if (
        userAgent.indexOf('WOW') !== -1 &&
        userAgent.indexOf('NET') < 0 &&
        userAgent.indexOf('Firefox') < 0
      ) {
        if (navigator.javaEnabled()) {
          this.is360 = true
          this.broName = '360安全浏览器-极速模式'
        } else {
          this.is360 = true
          this.broName = '360极速浏览器-极速模式'
        }
      }

      // 360兼容
      if (
        userAgent.indexOf('WOW') !== -1 &&
        userAgent.indexOf('NET') !== -1 &&
        userAgent.indexOf('MSIE') !== -1 &&
        userAgent.indexOf('rv') < 0
      ) {
        this.is360 = true
        this.broName = '360兼容模式'
      }

      // Chrome浏览器
      if (userAgent.indexOf('WOW') < 0 && userAgent.indexOf('Edge') < 0) {
        this.isChrome = true
        /* this.broName = 'Chrome浏览器'; */
        this.strStart = userAgent.indexOf('Chrome')
        this.strStart10 = 'Chrome'
        this.strStop = userAgent.indexOf(' Safari')
        this.temp = userAgent.substring(this.strStart, this.strStop)
        this.broName = this.temp.replace('/', '版本号')
        // 版本号：this.broName = this.temp.replace('Chrome/', '');
        // 浏览器类型 :this.strStart

        this.strStart1 = userAgent.indexOf(';')
        this.strStop1 = userAgent.indexOf(')')
        this.temp1 = userAgent.substring(this.strStart1, this.strStop1)
        this.broName1 = this.temp1.substring(8) // this.temp1.replace('; Win64; ', '');
        // 客户端的操作系统版本  this.broName1
        this.broName2 = this.temp1.substring(1, 7)
        // 客户端的操作系统  broName2
      }
      // document.getElementById('broType').value = broName;

      this.data.ClientInfo.BrowserVersion = this.broName1
      this.data.ClientInfo.Browser = this.strStart10
      this.data.ClientInfo.BrowserType = this.strStart10
      this.data.ClientInfo.PlatformVersion = this.broName1
      this.data.ClientInfo.UserLanguage = this.temp1
    },
    getIPs (callback) {
      var Remote = returnCitySN.cip
      var Computer = returnCitySN.cname
      this.data.ClientInfo.ComputerHostAddress = Remote
      this.data.ClientInfo.RemoteAddress = Remote
      this.data.ClientInfo.ComputerLocation = Computer
    },
    detectOS () {
      var sUserAgent = navigator.userAgent
      var isWin =
        navigator.platform === 'Win32' || navigator.platform === 'Windows'
      var isMac =
        navigator.platform === 'Mac68K' ||
        navigator.platform === 'MacPPC' ||
        navigator.platform === 'Macintosh' ||
        navigator.platform === 'MacIntel'
      if (isMac) return 'MacOS'
      var isUnix = navigator.platform === 'X11' && !isWin && !isMac
      if (isUnix) return 'Unix'
      var isLinux = String(navigator.platform).indexOf('Linux') > -1
      if (isLinux) return 'Linux'
      if (isWin) {
        var isWin2K =
          sUserAgent.indexOf('Windows NT 5.0') > -1 ||
          sUserAgent.indexOf('Windows 2000') > -1
        if (isWin2K) return 'Windows2000'
        var isWinXP =
          sUserAgent.indexOf('Windows NT 5.1') > -1 ||
          sUserAgent.indexOf('Windows XP') > -1
        if (isWinXP) return 'WindowsXP'
        var isWin2003 =
          sUserAgent.indexOf('Windows NT 5.2') > -1 ||
          sUserAgent.indexOf('Windows 2003') > -1
        if (isWin2003) return 'Windows2003'
        var isWinVista =
          sUserAgent.indexOf('Windows NT 6.0') > -1 ||
          sUserAgent.indexOf('Windows Vista') > -1
        if (isWinVista) return 'Windows Vista'
        var isWin7 =
          sUserAgent.indexOf('Windows NT 6.1') > -1 ||
          sUserAgent.indexOf('Windows 7') > -1
        if (isWin7) return 'Windows7'
        var isWin10 =
          sUserAgent.indexOf('Windows NT 10.0') > -1 ||
          sUserAgent.indexOf('Windows 10') > -1
        if (isWin10) return 'Windows 10'
      }
      return 'Other'
    },
    login () {
      this.spinShow = true
      this.data.MD5Pass = this.$md5(this.data.MD5Pass)
      this.$axios
        .post('/api/Users/UserLogin', this.data)
        .then(res => {
          if (res.data.code === 1) {
            this.data.MD5Pass = ''
            setTimeout(() => {
              this.spinShow = false
              this.$message.error(res.data.msg)
            }, 500)
            // localStorage.clear()
          } else if (res.data.code === 0) {
            this.setUserIfo(res.data.data)
            localStorage.setItem(
              'AutoSystemID',
              res.data.data.UserAutoSystemID
            )
            setTimeout(() => {
              this.spinShow = false
              this.$router.push('/')
            }, 500)
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    // 获取底部信息
    getFooterInfo () {
      var AutoSystemID = '0'
      this.$axios
        .get(`/api/Ablut/SystemConfig?AutoSystemID=${AutoSystemID}`)
        .then(res => {
          this.footerInfo = res.data.data
          document.title = this.footerInfo.SystemText
          this.setLang(this.footerInfo.Languages)
        })
        .catch(err => {
          console.error(err)
        })
    },
    handleCommand (command) {
      this.setCurrentLang(command)
      this.getFooterInfo()
    }
  },
  created () {
    setTimeout(() => {
      if (
        returnCitySN === null ||
        returnCitySN === '' ||
        returnCitySN === undefined
      ) {
        this.$.getScript('http://pv.sohu.com/cityjson?ie=utf-8', function () {})
      }
      this.bro()
      this.getIPs()
      this.data.ClientInfo.Platform = this.detectOS()
      this.getFooterInfo()
    }, 500)
  }
}
</script>

<style scoped>
a {
  box-sizing: border-box;
}
#login {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  background-image: url("../assets/img/backgrounds/1.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

#login h1 {
  color: #fff;
  text-align: center;
  margin: 10px 0;
  font-size: 38px;
  font-weight: 100;
  line-height: 50px;
}

.box {
  /* width: 500px; */
  /* min-width: 300px; */
  padding: 0 30px;
  color: #fff;
}

.row {
  background-color: rgba(0, 0, 0, 0.35);
}

.box h3 {
  font-size: 22px;
  font-weight: 300;
  line-height: 30px;
  margin-bottom: 10px;
}

.box p {
  opacity: 0.8;
  font-size: 12px;
}

.box-top {
  display: flex;
  display: -ms-flexbox;
  justify-content: space-between;
  /* -ms-flex-pack: justify; */
}

.box-top .wel-right {
  width: 25%;
  font-size: 66px;
  color: #fff;
  line-height: 100px;
  text-align: right;
  opacity: 0.3;
}

.el-form {
  margin: 30px 0;
  padding-bottom: 30px;
}

.link-to {
  display: flex;
  display: -ms-flexbox;
  justify-content: center;
  -ms-flex-pack: center;
  flex-wrap: wrap;
  /* margin-top: 20px; */
}

.btn {
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  touch-action: manipulation;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  background-image: none;
  border-radius: 4px;
  border: 1px solid transparent;
}

.btn-link-2 {
  display: inline-block;
  height: 50px;
  margin: 5px;
  padding: 15px 20px 0 20px;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid #fff;
  font-size: 16px;
  font-weight: 300;
  line-height: 16px;
  color: #fff;
  -moz-border-radius: 4px;
  -webkit-border-radius: 4px;
  border-radius: 4px;
}

a,
a:hover,
a:focus {
  text-decoration: none;
  -o-transition: all 0.3s;
  -moz-transition: all 0.3s;
  -webkit-transition: all 0.3s;
  -ms-transition: all 0.3s;
  transition: all 0.3s;
}

.btn-link-2:hover,
.btn-link-2:focus,
.btn-link-2:active,
.btn-link-2:active:focus {
  outline: 0;
  opacity: 0.6;
  background: rgba(0, 0, 0, 0.3);
  color: #fff;
}

.footerifo {
  font-size: 14px;
  color: #fff;
  display: block;
  width: 100%;
  float: left;
  text-align: center;
  margin-top: 20px;
}

.welcome {
  margin: 20px 0;
}

.lang {
  position: absolute;
  top: 30px;
  right: 60px;
}
</style>
