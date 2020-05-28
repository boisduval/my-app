<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>{{$t('base.search')}}</span>
      </div>
      <el-form :inline="true">
        <el-form-item id="search">
          <el-input v-model="searchForm.LikeName"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getData">{{$t('base.searchbtn')}}</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="box-card" style="margin-top:20px;">
      <List item-layout="vertical">
        <ListItem v-for="(item, index) in tableData" :key="index">
          <ListItemMeta :title="item.Name" />
          <div v-html="item.Message"></div>
          <!-- <template slot="extra">
              <ul class="ivu-list-item-action">
                <li>
                    <a href="">Edit</a>
                </li>
                <li>
                    <a href="">More</a>
                </li>
              </ul>
            </template> -->
          <template slot="action"> </template>
          <template slot="extra">
            <div class="flex-row">
              <!-- <div><Icon type="ios-star-outline" /> 123</div>
              <div><Icon type="ios-thumbs-up-outline" /> 234</div> -->
            </div>
          </template>
        </ListItem>
      </List>
    </el-card>
    <!-- 分页开始 -->
    <div style="margin:20px 0;">
      <!-- <Page :total="count" show-total show-elevator @on-change="pageChange" /> -->
      <el-pagination
        @current-change="pageChange"
        :current-page="searchForm.page * 1"
        layout="total, prev, pager, next, jumper"
        :total="count"
      >
      </el-pagination>
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
        page: '1',
        limit: '5',
        LikeName: '',
        LikeMessage: ''
      },
      tableData: '',
      count: 0
    }
  },
  methods: {
    pageChange (pageNum) {
      console.log(pageNum)
      this.searchForm.page = pageNum
      this.getData()
    },

    getData () {
      var url = '/api/Help/GetHelpList'
      this.$axios
        .get(url, { params: this.searchForm })
        .then(res => {
          if (res.data.code === 0) {
            this.tableData = res.data.data
            this.count = res.data.count
            this.loading = false
          } else if (res.data.code === 1) {
            this.$message.error(res.data.msg)
          }
        })
        .catch(err => {
          console.error(err)
        })
    }
  },
  created () {
    this.searchForm.AutoSystemID = localStorage.getItem('AutoSystemID')
    this.getData()
  }
}
</script>

<style scoped>
#search {
  width: calc(100% - 130px);
  min-width: 150px;
}
/deep/.el-form-item__content {
  width: 100%;
}
</style>
