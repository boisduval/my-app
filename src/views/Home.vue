<template>
  <div id="home">
    <el-container>
      <!-- 侧边栏开始 -->
      <el-aside style="width:auto;">
        <el-scrollbar style="height:100%">
          <el-menu
            :default-active="this.$route.path"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            background-color="#2f4050"
            text-color="#a7b1c3"
            active-text-color="#fff"
            unique-opened
            :router="true"
            :collapse="isCollapse"
          >
            <el-collapse-transition>
              <div class="user-ifo" v-show="isShow">
                <li class="nav-header" id="collapse">
                  <div class="dropdown profile-element">
                    <el-avatar
                      :size="63"
                      :src="userIfo.ImgPath"
                      @error="errorHandler"
                    ></el-avatar>
                    <div class="information" slot="reference">
                      <div class="accountNumber">
                        {{ userIfo.AccountNumber }}
                      </div>
                      <el-dropdown
                        @command="handleCommand"
                        class="dUser"
                        trigger="click"
                        placement="bottom-start"
                      >
                        <span class="el-dropdown-link">
                          {{ userIfo.DUser }}
                          <i class="fa fa-caret-down"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item command="setAvatar">
                            修改头像
                          </el-dropdown-item>
                          <el-dropdown-item command="userInfo">
                            个人资料
                          </el-dropdown-item>
                          <el-dropdown-item command="a">
                            联系我们
                          </el-dropdown-item>
                          <el-dropdown-item command="a">
                            收件信箱(0)
                          </el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>
                    </div>
                  </div>
                </li>
              </div>
            </el-collapse-transition>

            <el-submenu
              v-for="(item, index) in asideItem"
              :index="item.ID"
              :key="index"
            >
              <template slot="title">
                <i :class="item.Class"></i>
                <span>{{ item.Text }}</span>
              </template>
              <el-menu-item
                v-for="(item1, index1) in item.LeveList.List"
                :key="index1"
                :index="'/' + item1.Href"
                :ref="item1.Href"
                >{{ item1.Text }}</el-menu-item
              >
            </el-submenu>
          </el-menu>
        </el-scrollbar>
      </el-aside>

      <!-- 侧边栏结束 -->

      <el-container>
        <!-- 头部开始 -->
        <el-header style="height: auto">
          <div class="top-bar">
            <el-button type="primary" size="small" @click="handleCollapse">
              <i class="el-icon-menu"></i>
            </el-button>
            <input
              type="text"
              name="search"
              class="search"
              placeholder="请输入您需要查找的内容......"
            />
            <el-badge class="item">
              <el-button
                size="small"
                class="mes"
                title="全屏"
                @click="buttoncli"
              >
                <i class="el-icon-full-screen"></i>
              </el-button>
            </el-badge>
            <el-badge :value="AlarmCount" class="item" type="warning">
              <el-button size="small" class="mes" @click="$router.push('/alarmRealTime')">
                <i class="el-icon-message-solid"></i>
              </el-button>
            </el-badge>
            <el-badge :value="UnReadCount" class="item">
              <el-button size="small" class="mes" @click="$router.push('/mailBox')">
                <i class="el-icon-message"></i>
              </el-button>
            </el-badge>
          </div>
        </el-header>
        <!-- 头部结束 -->

        <!-- 标签页开始 -->
        <div class="tab-box">
          <div class="tabs">
            <el-tabs
              v-model="activeIndex"
              type="card"
              closable
              @tab-click="tabClick"
              @tab-remove="tabRemove"
            >
              <el-tab-pane
                v-for="item in openTab"
                :key="item.name"
                :label="item.label"
                :name="item.route"
              >
              </el-tab-pane>
            </el-tabs>
          </div>
          <el-dropdown
            class="close"
            style="right:86px;"
            trigger="click"
            @command="handleCommand1"
          >
            <div>
              关闭操作
              <i class="el-icon-caret-bottom"></i>
            </div>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="others"
                >关闭其他选项卡</el-dropdown-item
              >
              <el-dropdown-item command="all">关闭所有选项卡</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>

          <div class="close" @click="logout">
            退出
            <i class="fa fa-sign-out"></i>
          </div>
        </div>
        <!-- 标签页结束 -->

        <el-main>
          <transition name="slide-fade" mode="out-in">
            <div>
              <keep-alive>
                <!-- <transition name="slide-fade" mode="out-in"> -->
                <router-view v-if="$route.meta.keepAlive"></router-view>
                <!-- </transition> -->
              </keep-alive>
              <router-view v-if="!$route.meta.keepAlive"></router-view>
            </div>
          </transition>
        </el-main>

        <el-footer style="height:40px;">
          <div class="footer">
            © {{ footerInfo.SystemYear }}
            <span class="alink" @click="$router.push('/')">
              {{ footerInfo.SystemText }}
            </span>
          </div>
        </el-footer>
      </el-container>
    </el-container>
    <!-- 设置头像开始 -->
    <my-upload
      :width="300"
      :height="300"
      field="imgBase64"
      key="0"
      v-model="show"
      url="http://sf28090049.wicp.vip:8081//api/Users/UpdataUserICOO"
      @crop-success="cropSuccess"
      @crop-upload-success="cropUploadSuccess"
      @crop-upload-fail="cropUploadFail"
      img-format="png"
      :params="params"
    ></my-upload>
    <img :src="imgDataUrl" />
    <!-- 设置头像结束 -->
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import myUpload from 'vue-image-crop-upload'
import 'babel-polyfill'
import screenfull from 'screenfull'
export default {
  data () {
    return {
      isCollapse: false,
      isShow: true,
      show3: true,
      active: '',
      show: false,
      params: {
        AutoSystemID: '',
        imgBase64: ''
      },
      headers: {
        smail: '*_~'
      },
      imgDataUrl: '', // the datebase64 url of created image
      isFullscreen: false,
      isFull: false,
      footerInfo: '',
      beforeUnload_time: '',
      gap_time: '',
      AlarmCount: '',
      UnReadCount: ''
    }
  },
  components: {
    'my-upload': myUpload
  },
  computed: {
    ...mapState('home', ['userIfo']),
    ...mapState('tabs', ['openTab', 'detailLabel']),
    ...mapState('nav', ['asideItem']),
    activeIndex: {
      get () {
        return this.$store.state.tabs.activeIndex
      },
      set (val) {
        this.set_active_index(val)
      }
    }
  },

  created () {
    // this.getMenu()
    this.getFooterInfo()
    this.params.AutoSystemID = localStorage.getItem('AutoSystemID')
    this.getMsgNum()
  },
  mounted () {
    if (this.openTab.length === 0) {
      this.add_tabs({ route: '/main', name: 'main', label: '首页' })
      this.set_active_index('/main')
      if (this.$route.path !== '/' && this.$route.path !== '/main') {
        this.$router.push('/')
      }
    }
  },

  watch: {
    $route (to, from) {
      var name = to.path.split('/')[1]
      // 判断路由是否已经打开
      // 已经打开的 ，将其置为active
      // 未打开的，将其放入队列里
      var label = this.$refs[to.name]
        ? this.$refs[to.name][0].$el.innerText
        : this.detailLabel
      if (to.fullPath === '/perFormance') {
        label = '系统性能'
      }
      this.set_detail_label('')
      let flag = false
      for (let item of this.openTab) {
        if (item.name === name) {
          // console.log(name)
          this.set_active_index('/' + name)
          flag = true
          break
        }
      }

      if (!flag) {
        this.add_tabs({ route: to.path, name: name, label: label })
        this.set_active_index('/' + name)
      }
    }
  },
  methods: {
    ...mapMutations('tabs', [
      'add_tabs',
      'delete_tabs',
      'set_active_index',
      'set_detail_label',
      'delete_all_tabs',
      'delete_others_tabs'
    ]),
    ...mapMutations('nav', ['set_asideItem']),
    handleOpen (key, keyPath) {
      // console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      // console.log(key, keyPath)
    },
    handleCollapse () {
      // 先让用户信息收回
      let that = this
      if (that.isShow) {
        that.isShow = !that.isShow
        setTimeout(() => {
          that.isCollapse = !that.isCollapse
        }, 300)
      } else {
        that.isCollapse = !that.isCollapse
        setTimeout(() => {
          that.isShow = !that.isShow
        }, 600)
      }
    },

    // tab标签点击时，切换相应的路由
    tabClick (tab) {
      if (this.activeIndex === '/deviceDetail') {
      }
      this.$router.push({ path: this.activeIndex })
    },
    // 移除tab标签
    tabRemove (targetName) {
      // 匹配
      targetName = targetName.split('/')[1]
      // console.log(this.activeIndex.substr(1))
      this.delete_tabs(targetName)
      if (this.activeIndex.split('/')[1] === targetName) {
        // 设置当前激活的路由
        this.set_active_index(this.openTab[this.openTab.length - 1].route)
        this.$router.push({ path: this.activeIndex })
        console.log(this.openTab)
      }
    },

    // 获取菜单列表
    getMenu () {
      var AutoSystemID = localStorage.getItem('AutoSystemID')
      this.$axios
        .get(`/api/Menu/GetMenuList?AutoSystemID=${AutoSystemID}`)
        .then(res => {
          this.set_asideItem(res.data.data)
        })
        .catch(err => {
          console.error(err)
        })
    },

    // 头像加载失败返回的方法
    errorHandler () {
      return true
    },

    handleCommand (command) {
      if (command === 'setAvatar') {
        this.toggleShow()
      }
    },
    toggleShow () {
      this.show = !this.show
    },
    cropSuccess (imgDataUrl, field) {
      this.imgDataUrl = imgDataUrl
      this.params.imgBase64 = imgDataUrl
    },

    cropUploadSuccess (jsonData, field) {
      console.log('-------- upload success --------')
    },

    cropUploadFail (status, field) {
      console.log('-------- upload fail --------')
    },

    // 登出
    logout () {
      this.$confirm('确定要退出吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          var url = '/api/Users/UserLogout'
          this.$axios
            .post(url, {
              AutoSystemID: this.params.AutoSystemID
            })
            .then(res => {
              if (res.data.code === 0) {
                this.$message.success(res.data.msg)
                setTimeout(() => {
                  localStorage.clear()
                  this.$router.push('login')
                }, 1000)
              } else if (res.data.code === 1) {
                this.$message.error(res.data.msg)
              }
            })
            .catch(err => {
              console.error(err)
            })
        })
        .catch(() => {})
    },

    // 删除所有|其他
    handleCommand1 (command) {
      switch (command) {
        case 'all':
          this.delete_all_tabs()
          this.set_active_index('/main')
          this.$router.push({ path: this.activeIndex })
          break
        case 'others':
          this.delete_others_tabs()
          break
      }
    },

    // 全屏
    buttoncli () {
      console.log(screenfull)
      if (!screenfull.isEnabled) {
        // 如果不允许进入全屏，发出不允许提示
        this.$message({
          message: '不支持全屏',
          type: 'warning'
        })
        return false
      }
      screenfull.toggle()
    },

    // 获取底部信息
    getFooterInfo () {
      var AutoSystemID = localStorage.getItem('AutoSystemID')
      this.$axios
        .get(`/api/Ablut/SystemConfig?AutoSystemID=${AutoSystemID}`)
        .then(res => {
          this.footerInfo = res.data.data
        })
        .catch(err => {
          console.error(err)
        })
    },

    // 获取消息数
    getMsgNum () {
      var AutoSystemID = this.params.AutoSystemID
      this.$axios
        .get(`api/Ablut/MainMessageInfo?AutoSystemID=${AutoSystemID}`)
        .then(res => {
          if (res.data.hasOwnProperty('data')) {
            this.AlarmCount = res.data.data.AlarmCount
            this.UnReadCount = res.data.data.UnReadCount
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
.el-header {
  background-color: #f3f3f4;
  color: #333;
  line-height: 60px;
}

.el-aside {
  background-color: #2f4050;
  color: #a7b1c3;
  text-align: left;
}

.el-main {
  background-color: #f3f3f4;
  color: #333;
  text-align: center;
  line-height: 160px;
  padding-top: 20px;
  overflow-x: hidden;
}

.el-container {
  height: 100%;
}

#home {
  height: 100%;
  overflow: hidden;
}

.el-menu {
  border: none;
}

.el-button--small {
  font-size: 16px;
  padding: 6px 10px;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

.search {
  width: 200px;
  border: none;
  background-color: #f3f3f4;
  line-height: 30px;
  height: 30px;
  margin-left: 10px;
  outline: none;
}

.el-header .mes {
  border: none;
  background-color: #f3f3f4;
  font-size: 20px;
}

.item {
  float: right;
}

.nav-header {
  padding: 33px 25px;
  background: url("../assets/img/header-profile.png") no-repeat;
}

.dropdown,
.dropup {
  position: relative;
}

.accountNumber {
  font-size: 13px;
  font-weight: 500;
  color: #fff;
}

.dUser {
  color: #8095a8;
  font-size: 14px;
}

.information {
  cursor: pointer;
}

.tabs {
  background-color: #fafafa;
  padding: 0 35px;
  padding-right: 201px;
  border-bottom: solid 2px #2f4050;
}

.tab-box {
  position: relative;
  height: 40px;
}

.el-submenu [class^="fa"] {
  vertical-align: middle;
  margin-right: 5px;
  width: 24px;
  text-align: center;
  font-size: 18px;
}

.close {
  position: absolute;
  right: 0;
  top: 0;
  color: #999;
  padding: 0 20px;
  height: 40px;
  line-height: 40px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  border-left: solid 1px #eee;
}

.close:hover {
  color: #777;
  background: #f2f2f2;
}

.el-submenu .el-menu-item {
  height: 40px;
  line-height: 40px;
}

.footer {
  line-height: 40px;
  float: right;
}

.alink {
  cursor: pointer;
  color: #409eff;
}
.alink:hover {
  color: #999;
}
</style>
