<template>
<div>
  <div class="message2">
    <el-card>
      <h3 >系统日志</h3>
    </el-card>
  </div>

  <div class="message">
    <el-card>
  <div>msg:{{msg}}</div>
  <div class>
    <el-table :data="userlist">
      <el-table-column label="姓名" prop="tem">

      </el-table-column>
    </el-table>
    <button @click="handleClick2">handleclick2</button>

    <div>
      msg:{{logmsg}}
    </div>


    <div>
      newlog:{{newlog}}
    </div>
  </div>
    </el-card>
  </div>
</div>
</template>

<script>
export default {
  name: 'Journal',

  data() {
    return {
      myMessage: {},
      logMessage:{},
      id: window.sessionStorage.getItem('id'),
      newlog: window.sessionStorage.getItem('deletelog'),

      msg: "王杰",
      logmsg:"杰哥",
      userlist:[]
    }
  },



  mounted() {
    this.getUserList()
    let newlog=sessionStorage.getItem('deletelog')

    this.msg=newlog
  },



  methods: {
    async getMymessage() {
      const {data: res} = await this.$http.get('/server/user/mymessagesearch/' + this.id)
      if (res.status !== 200) return this.$message.error('获取信息失败')
      this.myMessage = res.myinfo
      this.$message.success('获取个人信息成功')
    },
    async getLog() {
      const {data: res} = await this.$http.get('/server/mydata/log/' + this.id)
      if (res.status !== 200) return this.$message.error('获取信息失败')
      this.logMessage = res.log
      this.$message.success('获取log成功')
      this.logmsg=this.logMessage.date
    },
    async testdemo1 (id) {
      const { data: res } = await this.$http.get('/server/more/demo3/' +id)
      if (res.status !== 200) return this.$message.error('获取信息失败')
      console.log("testdemo1",res)
      this.msg=res.msg

    },
    async getUserList (id) {
      const { data: res } = await this.$http.get('/server/more/demo3/' +id)
      if (res.status !== 200) return this.$message.error('获取信息失败')
      console.log("testdemo1",res)
      this.msg=res.msg

    },
    handleClick2() {
      // this.getLog()
      this.testdemo1()
    },
    demo(data) {

      this.msg = data;
      console.log(this.msg)
      console.log("this=" + this)

    }


  },

}
</script>

<style scoped>
.message {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.message .el-card{
  width: 800px;
  height: 600px;
  border-radius: 15px;
}
.el-descriptions img{
  width: 160px;
  height: 160px;
  border: 2px solid lightcyan;
  border-radius: 50%;
  box-sizing: border-box;
  background: linen;
}

.message {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.message .el-card{
  width: 800px;
  height: 600px;
  border-radius: 15px;
}
.message2 {
  width: 800px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.message2 .el-card{
  width: 800px;
  height: 100px;
  border-radius: 15px;
  text-align: center;
  position: absolute;
}
</style>
