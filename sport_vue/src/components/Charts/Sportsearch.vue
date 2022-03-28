<template>
  <div>
    <el-card v-if="!dialog">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="date" label="日期" width="200px"> </el-table-column>
        <el-table-column prop="height" label="身高"> </el-table-column>
        <el-table-column prop="weight" label="体重"> </el-table-column>
        <el-table-column prop="sex" label="性别"> </el-table-column>
        <el-table-column prop="footDate" label="慢走时间"> </el-table-column>
        <el-table-column prop="runDate" label="慢跑时间"> </el-table-column>
        <el-table-column prop="swimDate" label="游泳时间"> </el-table-column>
        <el-table-column prop="foothurt" label="慢走心率"> </el-table-column>
        <el-table-column prop="runhurt" label="慢跑心率"> </el-table-column>
        <el-table-column prop="swimhurt" label="游泳心率"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="show(scope.row._id)">查看</el-button>
          <el-button type="danger" size="mini" @click="deleteConfirm(scope.row._id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <sportView :sportDate="sportDate" v-if="dialog" @back="dialog = false"></sportView>
  </div>
</template>

<script>
import sportView from '../../views/Sportview.vue'
export default {
  components: {
    sportView
  },
  data () {
    return {
      tableData: [],
      id: window.sessionStorage.getItem('id'),
      sportDate: {},
      dialog: false
    }
  },
  methods: {
    async getDate () {
      const { data: res } = await this.$http.get(
        '/server/sport/mysport/' + this.id
      )
      if (res.status !== 200) return this.$message.error('获取列表失败')
      this.tableData = res.data
    },
    async show (id) {
      const { data: res } = await this.$http.get('/server/sport/sportinfo/' + id)
      console.log(res)
      if (res.status !== 200) return this.$message.error('获取信息失败')
      this.sportDate = res.data
      this.dialog = true
    },
    deleteConfirm (id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const { data: res } = await this.$http.delete('/server/sport/delete/' + id)
        if (res.status === 200) { this.getDate() }
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  },
  created () {
    this.getDate()
  }
}
</script>

<style>
</style>
