(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["ServiceManage"],{9562:function(e,t,n){"use strict";n.r(t);var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticStyle:{position:"relative"}},[e.spinShow?n("Spin",{attrs:{fix:""}}):e._e(),n("el-card",{staticClass:"box-card"},[n("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[n("span",[e._v(e._s(e.$t("serviceManage.title")))])]),n("el-form",{attrs:{"label-width":"100px"}},[n("el-form-item",{attrs:{label:e.$t("serviceManage.label")}},[n("el-select",{on:{change:e.handleChange},model:{value:e.sendForm.Language,callback:function(t){e.$set(e.sendForm,"Language",t)},expression:"sendForm.Language"}},e._l(e.languageType,(function(e){return n("el-option",{key:e.Value,attrs:{label:e.Text,value:e.Value}})})),1)],1)],1),n("quill-editor",{ref:"myQuillEditor",staticClass:"editor",attrs:{options:e.editorOption},on:{blur:function(t){return e.onEditorBlur(t)},focus:function(t){return e.onEditorFocus(t)},change:function(t){return e.onEditorChange(t)}},model:{value:e.sendForm.TermsOfServiceContent,callback:function(t){e.$set(e.sendForm,"TermsOfServiceContent",t)},expression:"sendForm.TermsOfServiceContent"}}),n("div",{staticStyle:{width:"100%","margin-top":"20px","text-align":"right"}},[n("el-button",{attrs:{type:"primary"},on:{click:e.submit}},[e._v(" "+e._s(e.$t("serviceManage.update"))+" ")])],1)],1)],1)},o=[],i=n("953d"),r=(n("a753"),n("8096"),n("14e1"),{data:function(){return{languageType:"",currentLang:"",editorOption:{modules:{toolbar:[["bold","italic","underline","strike"],["blockquote","code-block"],[{list:"ordered"},{list:"bullet"}],[{script:"sub"},{script:"super"}],[{indent:"-1"},{indent:"+1"}],[{direction:"rtl"}],[{size:["small",!1,"large","huge"]}],[{color:[]},{background:[]}],[{font:[]}],[{align:[]}],["clean"],["image","video"]]},theme:"snow",placeholder:this.$t("home.feedback.tip")},sendForm:{TermsOfServiceContent:"",Language:"",AutoSystemID:""},spinShow:!1}},components:{quillEditor:i["quillEditor"]},methods:{getLanguageType:function(){var e=this;return new Promise((function(t,n){var a=localStorage.getItem("AutoSystemID");e.$axios.get("/api/Language/GetLanguageType?AutoSystemID=".concat(a)).then((function(n){200===n.status&&(0===n.data.code?(e.languageType=n.data.data,e.sendForm.Language=e.languageType[0].Value,t(n.data.data)):t())})).catch((function(e){n(e)}))}))},getService:function(){var e=this;this.$axios.get("/api/Ablut/GetTermsOfServiceInfo?LanguageTypeCode=".concat(this.sendForm.Language)).then((function(t){e.sendForm.TermsOfServiceContent=t.data.data.Content,e.spinShow=!1})).catch((function(e){console.error(e)}))},submit:function(){var e=this;this.sendForm.AutoSystemID=localStorage.getItem("AutoSystemID"),this.$axios.post("/api/File/UpTermsOfServiceFromMsg",this.sendForm).then((function(t){0===t.data.code?(e.$message.success(t.data.msg),e.sendForm.TermsOfServiceContent=""):e.$message.error(t.data.msg)})).catch((function(e){console.error(e)}))},handleChange:function(){this.spinShow=!0,this.getService()},onEditorReady:function(e){},onEditorBlur:function(){},onEditorFocus:function(){},onEditorChange:function(){}},created:function(){var e=this;this.spinShow=!0,this.getLanguageType().then((function(t){return e.getService()}))}}),s=r,c=n("2877"),l=Object(c["a"])(s,a,o,!1,null,"e5798a54",null);t["default"]=l.exports}}]);
//# sourceMappingURL=ServiceManage.022b8f62.js.map