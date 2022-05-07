<template>
<div>
  <div>msg:{{msg}}</div>
  <div class="message">
     <el-card>
      <el-descriptions title="修改记录" border column="1">
<!--        <el-descriptions-item label="姓名">{{logMessage.id}}</el-descriptions-item>-->
        <el-descriptions-item label="日志">{{logMessage.log}}</el-descriptions-item>
        <el-descriptions-item label="删除时间"><el-tag>{{logMessage.date}}</el-tag></el-descriptions-item>
      </el-descriptions>
    </el-card>
    <button @click="handleClick2">handleclick2</button>

    <div>
      msg:{{logmsg}}
    </div>
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
      msg: "王杰",
      logmsg:"杰哥"
    }
  },


  mounted() {

    let newlog=sessionStorage.getItem('deletelog')

    this.msg=newlog
  },


  methods: {
    async getMymessage() {
      const {data: res} = await this.$http.get('/server/user/mymsg/' + this.id)
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
    handleClick2() {
      this.getLog()

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
</style>
