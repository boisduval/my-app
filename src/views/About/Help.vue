<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>页面标题</span>
      </div>
      <el-form :inline="true">
        <el-form-item id="search">
          <el-input v-model="searchForm.name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="box-card" style="margin-top:20px;">
      <List>
        <ListItem>
            <ListItemMeta avatar="https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar" title="This is title" description="This is description, this is description." />
        </ListItem>
        <ListItem>
            <ListItemMeta avatar="https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar" title="This is title" description="This is description, this is description." />
        </ListItem>
    </List>
    </el-card>
    <!-- 分页开始 -->
    <div style="margin-top:20px;">
      <Page :total="100" show-total show-elevator @on-change="pageChange" />
    </div>
    <!-- 分页结束 -->
  </div>
</template>

<script>
export default {
  data () {
    return {
      searchForm: {
        AutoSystemID: '',
        page: '',
        limit: '',
        IsManagement: '',
        LikeName: '',
        LikeMessage: ''
      }
    }
  },
  methods: {
    onSubmit () {
      console.log('ok')
    },

    pageChange (pageNum) {
      console.log(pageNum)
    }
  }
}
</script>

<style scoped>
#search {
    width:calc(100% - 100px);
    min-width: 150px;
}
/deep/.el-form-item__content {
    width: 100%;
}
</style>
