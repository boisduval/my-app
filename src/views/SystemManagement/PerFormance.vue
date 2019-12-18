<template>
  <div>
    <el-card class="box-card">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="实时监控" name="realtime"></el-tab-pane>
        <el-tab-pane label="历史监控" name="history"></el-tab-pane>
      </el-tabs>
      <router-view></router-view>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'realtime'
    }
  },
  methods: {
    handleClick (tab, event) {
      console.log(tab)
    }
  }
}
</script>

<style scoped></style>
