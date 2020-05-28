<template>
  <div style="position:relative;">
    <Spin v-if="spinShow" fix></Spin>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>{{$t('serviceManage.title')}}</span>
      </div>
      <el-form label-width="100px">
        <el-form-item :label="$t('serviceManage.label')">
          <el-select v-model="sendForm.Language" @change="handleChange">
            <el-option
              v-for="item in languageType"
              :key="item.Value"
              :label="item.Text"
              :value="item.Value"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <quill-editor
        v-model="sendForm.TermsOfServiceContent"
        ref="myQuillEditor"
        :options="editorOption"
        @blur="onEditorBlur($event)"
        @focus="onEditorFocus($event)"
        @change="onEditorChange($event)"
        class="editor"
      >
      </quill-editor>
      <div style="width:100%;margin-top:20px;text-align:right;">
        <el-button type="primary" @click="submit">
          {{$t('serviceManage.update')}}
        </el-button>
      </div>

    </el-card>
  </div>
</template>

<script>
import { quillEditor } from 'vue-quill-editor' // 调用编辑器
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
export default {
  data () {
    return {
      languageType: '',
      currentLang: '',
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
      sendForm: {
        TermsOfServiceContent: '',
        Language: '',
        AutoSystemID: ''
      },
      spinShow: false
    }
  },
  components: {
    quillEditor
  },
  methods: {
    // 获取语言类型
    getLanguageType () {
      return new Promise((resolve, reject) => {
        var AutoSystemID = localStorage.getItem('AutoSystemID')
        this.$axios
          .get(`/api/Language/GetLanguageType?AutoSystemID=${AutoSystemID}`)
          .then(res => {
            if (res.status === 200) {
              if (res.data.code === 0) {
                this.languageType = res.data.data
                this.sendForm.Language = this.languageType[0].Value
                resolve(res.data.data)
              } else {
                resolve()
              }
            }
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    // 获取服务条款
    getService () {
      this.$axios.get(`/api/Ablut/GetTermsOfServiceInfo?LanguageTypeCode=${this.sendForm.Language}`)
        .then(res => {
          this.sendForm.TermsOfServiceContent = res.data.data.Content
          this.spinShow = false
        })
        .catch(err => {
          console.error(err)
        })
    },
    submit () {
      this.sendForm.AutoSystemID = localStorage.getItem('AutoSystemID')
      this.$axios.post('/api/File/UpTermsOfServiceFromMsg', this.sendForm)
        .then(res => {
          if (res.data.code === 0) {
            this.$message.success(res.data.msg)
            this.sendForm.TermsOfServiceContent = ''
          } else {
            this.$message.error(res.data.msg)
          }
        })
        .catch(err => {
          console.error(err)
        })
    },
    handleChange () {
      this.spinShow = true
      // this.getService().then(res => {
      //   this.spinShow = false
      // })
      this.getService()
    },
    onEditorReady (editor) {
      // 准备编辑器
    },
    onEditorBlur () {}, // 失去焦点事件
    onEditorFocus () {}, // 获得焦点事件
    onEditorChange () {} // 内容改变事件
  },
  created () {
    this.spinShow = true
    this.getLanguageType().then(res => {
      return this.getService()
    })
  }
}
</script>

<style scoped></style>
