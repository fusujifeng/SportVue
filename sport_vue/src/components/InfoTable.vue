<template>
  <!-- 管理员--用户数据列表 -->
  <div>
    <el-card>
      <el-table :data="infolist" style="width: 100%" border v-if="!dialog">
        <el-table-column  label="日期" prop="date"></el-table-column>
        <el-table-column label="体温">
          <template slot-scope="scope">
            <el-tag v-for="(item,i) in scope.row.temperature" :key="i" type="danger" size="mini">{{ item + '度' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="血糖">
          <template slot-scope="scope">
            <el-tag v-for="(item,i)  in scope.row.bloodSuger" :key="i" type="warning" size="mini">
              {{ item + 'mmol/L' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="血压">
          <template slot-scope="scope">
            <el-tag v-for="(item,i)  in scope.row.bloodPressure" :key="i" type="info" size="mini">{{ item + 'mmHg' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="饮水量">
          <template slot-scope="scope">
            <el-tag v-for="(item,i)  in scope.row.water" :key="i" type="success" size="mini">{{ item + 'ml' }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180px">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="showchart(scope.row._id)">查看</el-button>
            <el-button type="danger" size="mini" @click="deleteConfirm(scope.row._id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <AllEcharts v-if="dialog" :allData="allData" @return="dialog = false"></AllEcharts>
    </el-card>
    <button @click="handleClick">clickxx</button>
  </div>
</template>

<script>
import AllEcharts from './AllEcharts.vue'

export default {
  components: {
    AllEcharts
  },
  props: {
    infolist: [],
    allData: {}
  },
  data() {
    return {
      dialog: false,
    }
  },
  methods: {
    async showchart(_id) {
      const {data: res} = await this.$http.get('/server/chart/mychart/' + _id)
      if (res.status !== 200) return this.$message.error('获取信息失败')
      console.log(res)
      this.allData = res.myINfo
      this.dialog = true
    },


    deleteConfirm(_id) {
      this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const {data: res} = await this.$http.delete('/server/chart/delete/' + _id)

        if (res.status !== 200) {
          return this.$message({
            type: 'info',
            message: '已取消删除'
          })
        }
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.$emit('getNew')
        // 删除日志
        this.$emit('deletelog', this.message)
      })
    },
    handleClick() {
      this.$bus.$emit("deletelog", this.message)
      console.log("click1" + this.message)

      sessionStorage.setItem("deletelog", this.message);

    }
  }
}
</script>

<style dcoped>
.el-tag {
  margin: 0 2px;
}
</style>
