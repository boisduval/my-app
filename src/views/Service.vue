<template>
  <div id="service">
    <div class="wrap">
      <div>
        <h1>{{ data.SystemText }}</h1>
      </div>
      <div style="width:100%;text-align:right;">
        <h2>{{ data.ItemNumber }}</h2>
      </div>
      <div class="content-wrap">
        <div style="width:100%;text-align:center;">
          <h2>{{ data.TopTitle }}</h2>
        </div>
        <div style="width:100%;text-align:right;">
          <p @click="createPdf" class="print"><i class="fa fa-print"></i> {{$t('service.print')}}</p>
        </div>
        <div
          v-html="data.Content"
          style="border: 1px solid #778388;padding:10px;border-radius:3px;"
          id="pdf-wrap"
        ></div>
      </div>
      <!-- 链接 -->
      <el-row style="width: 100%;display:flex;justify-content:center;">
        <el-col :xs="10" :sm="10" :md="10" :lg="10" :xl="10">
          <div class="link-to">
            <a
              v-for="item in data.Links"
              :key="item.id"
              class="btn btn-link-2"
              :href="item.Value"
            >
              {{ item.Name }}
            </a>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      data: ''
    }
  },
  methods: {
    getContent () {
      this.$axios
        .get(`/api/Ablut/TermsOfService?AutoSystemID=637258555041336920`)
        .then(res => {
          console.log(res)
          this.data = res.data.data
        })
        .catch(err => {
          console.error(err)
        })
    },
    createPdf () {
      let newWindow = window.open('_blank') // 打开新窗口
      let codestr = document.getElementById('pdf-wrap').innerHTML // 获取需要生成pdf页面的div代码
      newWindow.document.write(codestr) // 向文档写入HTML表达式或者JavaScript代码
      newWindow.document.close() // 关闭document的输出流, 显示选定的数据
      newWindow.print() // 打印当前窗口
      return true
    }
  },
  created () {
    this.getContent()
  }
}
</script>

<style scoped>
#service {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  background-image: url("../assets/img/backgrounds/1.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
}
h1,
h2,
h3 {
  color: #fff;
}
.wrap {
  width: 1000px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-width: 0;
  min-height: 0;
  margin: 60px auto;
}
.content-wrap {
  background-color: rgba(0, 0, 0, 0.4);
  color: #fff;
  padding: 20px 60px;
  border-radius: 10px;
  margin: 10px 0;
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
.print {
  cursor: pointer;
}
.print:hover {
  color: #409EFF;
}
</style>
