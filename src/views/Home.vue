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
                    <el-avatar :size="63" :src="userIfo.ImgPath"></el-avatar>
                    <el-popover
                      placement="bottom"
                      title="标题"
                      width="200"
                      trigger="click"
                      content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。"
                    >
                      <div class="information" slot="reference">
                        <div class="accountNumber">
                          {{ userIfo.AccountNumber }}
                        </div>
                        <div class="dUser">
                          {{ userIfo.DUser }}
                          <i class="fa fa-caret-down"></i>
                        </div>
                      </div>
                    </el-popover>
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
            <el-badge :value="2" class="item" type="warning">
              <el-button size="small" class="mes">
                <i class="el-icon-message-solid"></i>
              </el-button>
            </el-badge>
            <el-badge :value="12" class="item">
              <el-button size="small" class="mes">
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
        </div>
        <!-- 标签页结束 -->

        <el-main>
          <keep-alive
            ><transition name="slide-fade" mode="out-in">
              <router-view></router-view
            ></transition>
          </keep-alive>
        </el-main>

        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  data () {
    return {
      isCollapse: false,
      isShow: true,
      show3: true,
      active: ''
    }
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
  },
  mounted () {
    this.add_tabs({ route: '/main', name: 'main', label: '首页' })
    this.set_active_index('/main')
    if (this.$route.path !== '/' && this.$route.path !== '/main') {
      this.$router.push('/')
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
      'set_detail_label'
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
      }
    },

    // 获取菜单列表
    getMenu () {
      var AutoSystemID = sessionStorage.getItem('AutoSystemID')
      this.$axios
        .get(`/api/Menu/GetMenuList?AutoSystemID=${AutoSystemID}`)
        .then(res => {
          this.set_asideItem(res.data.data)
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
  background-color: inherit;
  line-height: 30px;
  margin-left: 10px;
  outline: none;
}

.el-header .mes {
  border: none;
  background-color: inherit;
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
  border-bottom: solid 2px #2f4050;
}

.tab-box {
  position: relative;
}

.el-submenu [class^="fa"] {
  vertical-align: middle;
  margin-right: 5px;
  width: 24px;
  text-align: center;
  font-size: 18px;
}
</style>
