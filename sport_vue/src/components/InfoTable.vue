<template>
  <!-- 管理员--用户数据列表 -->
  <div>
    <div id="app">
      <!-- 搜索机构列表 -->
      <div class="org">

        <div v-for="(item,index) in orgList" :key="index">
          {{ item }}
        </div>

      </div>
    </div>

    <el-input v-model="selectVal" type="text" placeholder="请输入内容" style="width:200px"></el-input>
    <el-button type="primary" icon="el-icon-search" @click="queryData">搜索</el-button>
    <el-button type="danger" icon="el-icon-delete" circle @click="reset"></el-button>

    <el-button type="primary">导出excel<i class="el-icon-upload el-icon--right"></i></el-button>
    <el-card>
      <el-table :data="infolist" style="width: 100%" border v-if="!dialog">
        <el-table-column label="名字">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.username }}</span>
          </template>
        </el-table-column>
        <el-table-column label="日期">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.date.substring(0, 10) }}</span>
          </template>
        </el-table-column>
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

      input: '',
      selectVal: '',
      orgList: [
        '江苏银行',
        '江苏农业银行',
        '上海银行',
        '苏州银行',
        '南京银行',
        '上海银行贷款部'
      ],
      //全部的数据列表
      normal: [
        '江苏银行',
        '江苏农业银行',
        '上海银行',
        '苏州银行',
        '南京银行',
        '上海银行贷款部'
      ],


    }
  },
  mounted() {
    console.log(this.infolist)
  },


  methods: {
    //_id指的那一行元素
    async showchart(_id) {
      const {data: res} = await this.$http.get('/server/chart/mychart/' + _id)
      if (res.status !== 200) return this.$message.error('获取信息失败')
      console.log(res)
      this.allData = res.myINfo
      this.dialog = true
    },
    queryData() {
      //并没有输入关键字时，就不要再搜索了
      if (this.selectVal === '' || this.selectVal == null) {
        this.orgList = JSON.parse(JSON.stringify(this.orgList));
        return;
      }
      //搜索
      let list = this.orgList.filter(item => item.indexOf(this.selectVal) >= 0);
      this.orgList = list;
    },
    reset() {
      this.orgList = JSON.parse(JSON.stringify(this.normal))
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

<style scoped>
.el-tag {
  margin: 0 2px;
}
</style>
