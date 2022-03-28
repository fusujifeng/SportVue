<template>
  <el-card style="width: 100%;">
       <el-table
      :data="tableData"
      style="width: 80%; margin: 0 auto;"
      v-if="shows"
       stripe
      >
      <el-table-column
        prop="date"
        label="分析日期"
      >
      </el-table-column>
      <el-table-column
        :label="type.title"
      >
      <template slot-scope="scope">
          <el-tag v-for="(item,i) in scope.row.newdata" :key="i">{{item}}</el-tag>
      </template>
      </el-table-column>
      <el-table-column
        label="操作"
      >
      <template slot-scope="scope">
          <el-button type="primary" @click="show(scope.row._id)">查看</el-button>
          <el-button type="danger" @click="deleteConfirm(scope.row._id)">删除</el-button>
      </template>
      </el-table-column>
       </el-table>
       <temView v-if="type.temshow" :temdata="temdata" @back="type.temshow = false;shows = true"></temView>
       <preView v-if="type.presureshow" :presuredata="presuredata" @back="type.presureshow = false;shows = true"></preView>
       <sugerView v-if="type.sugershow" :sugdata="sugdata" @back="type.sugershow = false;shows = true"></sugerView>
       <waterView v-if="type.watershow" :waterdata="waterdata" @back="type.watershow = false;shows = true"></waterView>
  </el-card>
</template>

<script>
import temView from '../views/temview.vue'
import preView from '../views/PresurView.vue'
import sugerView from '../views/sugerview.vue'
import waterView from '../views/waterview.vue'
export default {
  components: {
    temView,
    preView,
    sugerView,
    waterView
  },
  props: {
    type: {},
    tableData: {}
  },
  data () {
    return {
      temdata: {},
      presuredata: {},
      sugdata: {},
      waterdata: {},
      shows: true
    }
  },
  methods: {
    async show (id) {
      if (this.type.name === 'tempure') {
        const { data: res } = await this.$http.get('/server/mydata/teminfo/' + id)
        if (res.status !== 200) return this.$message.error('获取数据失败')
        this.temdata = res.data
        this.type.temshow = true
        this.shows = false
      }
      if (this.type.name === 'presure') {
        const { data: res } = await this.$http.get('/server/mydata/presureinfo/' + id)
        if (res.status !== 200) return this.$message.error('获取数据失败')
        this.presuredata = res.data
        this.type.presureshow = true
        this.shows = false
      }
      if (this.type.name === 'suger') {
        const { data: res } = await this.$http.get('/server/mydata/sugerinfo/' + id)
        if (res.status !== 200) return this.$message.error('获取数据失败')
        this.sugdata = res.data
        this.type.sugershow = true
        this.shows = false
      }
      if (this.type.name === 'water') {
        const { data: res } = await this.$http.get('/server/mydata/waterinfo/' + id)
        if (res.status !== 200) return this.$message.error('获取数据失败')
        this.waterdata = res.data
        this.type.watershow = true
        this.shows = false
      }
    },
    deleteConfirm (id) {
      if (this.type.name === 'tempure') {
        this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          const { data: res } = await this.$http.delete('/server/mydata/deletetem/' + id)
          if (res.status !== 200) return this.$message.error('删除失败')
          this.$emit('again')
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
      if (this.type.name === 'presure') {
        this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          const { data: res } = await this.$http.delete('/server/mydata/deletepre/' + id)
          if (res.status !== 200) return this.$message.error('删除失败')
          this.$emit('again')
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
      if (this.type.name === 'suger') {
        this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          const { data: res } = await this.$http.delete('/server/mydata/deletesug/' + id)
          if (res.status !== 200) return this.$message.error('删除失败')
          this.$emit('again')
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
      if (this.type.name === 'water') {
        this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          const { data: res } = await this.$http.delete('/server/mydata/deletewater/' + id)
          if (res.status !== 200) return this.$message.error('删除失败')
          this.$emit('again')
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
    }
  }
}
</script>

<style>

</style>
