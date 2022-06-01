<template>
  <!-- 管理员--用户数据列表 -->
  <div>

    <el-input v-model="selectVal" type="text" placeholder="请输入内容" style="width:200px"></el-input>


    <el-button type="primary" icon="el-icon-search" @click="queryData">搜索</el-button>
    <el-button type="success" round @click="reset" >取消搜索</el-button>
    <el-button type="primary" @click="exportExcel">导出excel<i class="el-icon-upload el-icon--right"></i></el-button>
    <el-card>
      <el-table :data="infolist" style="width: 100%" border v-if="!dialog">
        <el-table-column label="username">
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
      defaultinfolist:[],
      orgListnew:[],
      //全部的数据列表


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

      //搜索
      console.log("thisinfolist",this.infolist)
      let list = this.infolist.filter(item => item.username.indexOf(this.selectVal) >= 0);
      this.orgListnew = list;
      console.log("newlist:",this.orgListnew)


      this.defaultinfolist=this.infolist;
      this.infolist=list;
    },
    reset() {
      this.infolist=this.defaultinfolist,
      this.selectVal=''
    },
    exportExcel(){
      // 导出数据

        // 1.定义表头对应关系
        const headers = {
          '用户名': 'username',
          '日期': 'date',
          '体温': 'temperature',
          '血压': 'bloodPressure',
          '血糖': 'bloodSugar',
          '饮水量': 'water'
        }
        // 懒加载
        import('@/vendor/Export2Excel').then(async excel => {
          // excel是引入文件（也就是@/ventor/Export2Excel）的导出对象
          // 获取所有的数据
          const { rows } = this.infolist
          const data = this.formatJson(headers, rows) // 返回的data就是我们转化后的数据
          excel.export_json_to_excel({
            // 要求转出的表头是中文
            header: Object.keys(headers), // 表头 必填
            data, // //具体数据 必填
            filename: 'excel-list', // 非必填
            autoWidth: true, // 非必填
            bookType: 'xlsx' // 非必填
          })
          // 拿到的数据是这种
          //  [{ username: 'xxx', mobile: 'xxx', ... }, { username: 'xxx', mobile: 'xxx', ... }]
          // 要转化的是如下这种
          // header: ['姓名', '手机号', '入职日期', ...]
          // data: [['张三', '138xxxxxxxx', '1992-08-04', ...], ['李四', '135xxxxxxxx', '1992-08-04', ...]]
        })
      },
      formatJson(headers, rows) {
        return rows.map(item => {
          console.log(item)
          return Object.keys(headers).map(k => {
            if (headers[k] === 'timeOfEntry' || headers[k] === 'correctionTime') {
              return formatDate(item[headers[k]]) // 返回格式化之前的时间
            } else if (headers[k] === 'formOfEmployment') {
              return EmployeeEnum.hireType[item.formOfEmployment] ? EmployeeEnum.hireType[item.formOfEmployment] : '未知'
            }
            return item[headers[k]]
          })
        })
      }
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
  }

</script>

<style scoped>
.el-tag {
  margin: 0 2px;
}
</style>
