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
                            {{$t('user.dropdownList')[0]}}
                          </el-dropdown-item>
                          <el-dropdown-item command="userInfo">
                            {{$t('user.dropdownList')[1]}}
                          </el-dropdown-item>
                          <el-dropdown-item command="a">
                            {{$t('user.dropdownList')[2]}}
                          </el-dropdown-item>
                          <el-dropdown-item command="a">
                            {{$t('user.dropdownList')[3]}}
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
              autocomplete="off"
              :placeholder="$t('header.search')"
            />
            <!-- <el-badge class="item">
              <el-dropdown style="line-height:30px" @command="handleCommand">
                <el-button size="small" class="mes">
                  <i class="fa fa-globe"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item
                    v-for="(item, index) in lang"
                    :key="index"
                    :command="item.Value"
                    >{{ item.Text }}</el-dropdown-item
                  >
                </el-dropdown-menu>
              </el-dropdown>
            </el-badge> -->
            <el-badge class="item">
              <el-button
                size="small"
                class="mes"
                :title="$t('screenFull.title')"
                @click="buttoncli"
              >
                <i class="el-icon-full-screen"></i>
              </el-button>
            </el-badge>
            <el-badge :value="AlarmCount" class="item" type="warning">
              <el-button
                size="small"
                class="mes"
                @click="$router.push('/alarmRealTime')"
              >
                <i class="el-icon-message-solid"></i>
              </el-button>
            </el-badge>
            <el-badge :value="UnReadCount" class="item">
              <el-button
                size="small"
                class="mes"
                @click="$router.push('/mailBox')"
              >
                <i class="el-icon-message"></i>
              </el-button>
            </el-badge>
            <el-badge class="item">
              <el-button size="small" class="mes" @click="mailVisible = true">
                <i class="iconfont icon-custom-service"></i>
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
              {{$t('header.close.title')}}
              <i class="el-icon-caret-bottom"></i>
            </div>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="others"
                >{{$t('header.close.label')[0]}}</el-dropdown-item
              >
              <el-dropdown-item command="all">{{$t('header.close.label')[1]}}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>

          <div class="close" @click="logout">
            {{$t('header.logout')}}
            <i class="fa fa-sign-out"></i>
          </div>
        </div>
        <!-- 标签页结束 -->

        <el-main>
          <transition name="slide-fade" mode="out-in">
            <div style="height:97%">
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
      :url="baseURL + '/api/Users/UpdataUserICOO'"
      @crop-success="cropSuccess"
      @crop-upload-success="cropUploadSuccess"
      @crop-upload-fail="cropUploadFail"
      img-format="png"
      :params="params"
    ></my-upload>
    <img :src="imgDataUrl" />
    <!-- 设置头像结束 -->
    <!-- 反馈开始 -->
    <el-dialog
      :title="$t('home.feedback.title')"
      width="70%"
      :close-on-click-modal="false"
      :visible.sync="mailVisible"
    >
      <div style="height:500px;overflow:auto">
        <el-form
          label-width="80px"
          label-position="right"
          :model="sendForm"
          style="padding-right:20px"
        >
          <el-form-item :label="$t('home.feedback.formLabel')[0]">
            <el-input v-model="sendForm.Title"></el-input>
          </el-form-item>
          <el-form-item :label="$t('home.feedback.formLabel')[1]">
            <!-- <div id="editor"></div> -->
            <quill-editor
              style="min-height:400px"
              v-model="sendForm.Msg"
              ref="myQuillEditor"
              :options="editorOption"
              @blur="onEditorBlur($event)"
              @focus="onEditorFocus($event)"
              @change="onEditorChange($event)"
              class="editor"
            >
            </quill-editor>
          </el-form-item>
        </el-form>
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button @click="sendMail" size="medium" type="primary">
          {{$t('base.submit')}}
        </el-button>
        <el-button @click="mailVisible = false" size="medium">
          {{$t('base.cancel')}}
        </el-button>
      </div>
    </el-dialog>
    <!-- 反馈结束 -->
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import myUpload from 'vue-image-crop-upload'
import 'babel-polyfill'
import screenfull from 'screenfull'
import '../assets/fonts/font_6tqvyv80kmd/iconfont.css'

import { quillEditor } from 'vue-quill-editor' // 调用编辑器
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
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
      UnReadCount: '',
      mailVisible: false,
      sendForm: {},
      editorOption: {
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'], // 加粗，斜体，下划线，删除线
            ['blockquote', 'code-block'], // 引用，代码块

            // [{ header: 1 }, { header: 2 }], // 标题，键值对的形式；1、2表示字体大小
            [{ list: 'ordered' }, { list: 'bullet' }], // 列表
            [{ script: 'sub' }, { script: 'super' }], // 上下标
            [{ indent: '-1' }, { indent: '+1' }], // 缩进
            [{ direction: 'rtl' }], // 文本方向

            [{ size: ['small', false, 'large', 'huge'] }], // 字体大小
            // [{ header: [1, 2, 3, 4, 5, 6, false] }], // 几级标题

            [{ color: [] }, { background: [] }], // 字体颜色，字体背景颜色
            [{ font: [] }], // 字体
            [{ align: [] }], // 对齐方式

            ['clean'], // 清除字体样式
            ['image', 'video'] // 上传图片、上传视频
          ]
        },
        theme: 'snow',
        placeholder: this.$t('home.feedback.tip')
      },
      baseURL: this.GLOBAL.baseURL
    }
  },
  components: {
    'my-upload': myUpload,
    quillEditor
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
      this.add_tabs({ route: '/main', name: 'main', label: this.$t('tabName.main') })
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
        label = this.$t('tabName.systemPerformance')
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
      this.$confirm(this.$t('logout.tip'), this.$t('logout.title'), {
        confirmButtonText: this.$t('logout.yes'),
        cancelButtonText: this.$t('logout.no'),
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
                  localStorage.removeItem('AutoSystemID')
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
      if (!screenfull.isEnabled) {
        // 如果不允许进入全屏，发出不允许提示
        this.$message({
          message: this.$t('screenFull.tip'),
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
          document.title = this.footerInfo.SystemText
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
    },
    onEditorReady (editor) {
      // 准备编辑器
    },
    onEditorBlur () {}, // 失去焦点事件
    onEditorFocus () {}, // 获得焦点事件
    onEditorChange () {}, // 内容改变事件
    // 发送邮件
    sendMail () {
      this.sendForm.AutoSystemID = localStorage.getItem('AutoSystemID')
      var url = '/api/Mail/Contactus'
      this.$axios
        .post(url, this.sendForm)
        .then(res => {
          if (res.data.code === 0) {
            this.$message.success(res.data.msg)
            this.mailVisible = false
            this.sendForm = {}
          } else if (res.data.code === 1) {
            this.$message.error(res.data.msg)
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
  width: 280px;
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
  /* height: 40px; */
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
  height: 35px;
  line-height: 35px;
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
  height: 35px;
  line-height: 35px;
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
.mes {
  margin: 0 8px;
}
</style>
