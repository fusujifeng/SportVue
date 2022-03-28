<template>
  <el-card>
    <el-breadcrumb separator="/">
  <el-breadcrumb-item :to="{ path: '/home' }">用户管理</el-breadcrumb-item>
  <el-breadcrumb-item><a href="/">用户信息查询</a></el-breadcrumb-item>
    </el-breadcrumb>
    <el-table :data="allUser" stripe style="width: 100%">
      <el-table-column prop="name" label="姓名"> </el-table-column>
        <el-table-column prop="age" label="年龄"> </el-table-column>
          <el-table-column prop="sex" label="性别"> </el-table-column>
            <el-table-column prop="username" label="用户名"> </el-table-column>
            <el-table-column prop="type" label="类型"> </el-table-column>
              <el-table-column prop="date" label="注册日期"> </el-table-column>
              <el-table-column  label="操作">
                <template slot-scope="scope">
                  <el-button type="danger" v-if="scope.row.type !== '管理员'" @click="deleteConfirm(scope.row._id)">删除</el-button>
                  <el-button type="success" v-else-if="scope.row._id === id">个人信息</el-button>
                  <el-button type="info" v-else >无权限</el-button>
                </template>
                 </el-table-column>
    </el-table>
    <el-pagination
  background
  layout="prev, pager, next"
  :total="1000">
</el-pagination>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      allUser: [],
      id: window.sessionStorage.getItem('id')
    }
  },
  created () {
    this.getallUser()
  },
  methods: {
    async getallUser () {
      const { data: res } = await this.$http.get('/server/user/allUser/' + this.id)
      if (res.status !== 200) return this.$message.error('您没有权限！')
      this.allUser = res.allUser
      this.$message.success('获取列表成功')
    },
    deleteConfirm (id) {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const { data: res } = await this.$http.delete('/server/user/delete/' + id)
        if (res.status !== 200) return this.$message.error('删除失败')
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.getallUser()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>

<style scoped>
.el-breadcrumb{
  margin-bottom: 40px;
}
.el-pagination{
  margin-top: 40px;
}
</style>
