<template>
<div>
  <div>msg:{{msg}}</div>
  <div class="message">
    <!-- <el-card>
      <el-descriptions title="个人信息" border column="1">
        <el-descriptions-item label="姓名">{{myMessage.name}}</el-descriptions-item>
        <el-descriptions-item label="年龄">{{myMessage.age}}</el-descriptions-item>
        <el-descriptions-item label="性别">{{myMessage.sex}}</el-descriptions-item>
        <el-descriptions-item label="手机号">{{myMessage.phone}}</el-descriptions-item>
        <el-descriptions-item label="用户名">{{myMessage.username}}</el-descriptions-item>
        <el-descriptions-item label="注册时间">{{myMessage.date}}</el-descriptions-item>
        <el-descriptions-item label="账号类型"><el-tag>{{myMessage.type}}</el-tag></el-descriptions-item>
      </el-descriptions>
    </el-card> -->
    <button @click="handleClick2">handleclick2</button>

  </div>
</div>
</template>

<script>
export default {
  name: 'Journal',

  data() {
    return {
      myMessage: {},
      id: window.sessionStorage.getItem('id'),
      msg: "王杰",
    }
  },

  created() {
    // 界面处初始获取数据
    this.getMymessage()

    this.$bus.$on("deletelog", data  =>{
      this.msg=data
      console.log("111"+this.msg)
    })
  },
  // mounted() {
  //   this.$bus.$on("deletelog",this.demo)
  //
  // },

  methods: {
    async getMymessage() {
      const {data: res} = await this.$http.get('/server/user/mymsg/' + this.id)
      if (res.status !== 200) return this.$message.error('获取信息失败')
      this.myMessage = res.myinfo
      this.$message.success('获取个人信息成功')
      console.log("个人信息"+res)
    },
    handleClick() {
      console.log('eeeee')
    },
    handleClick2() {
      this.msg = "fffff";
    },
    // demo(data) {
    //
    //   this.msg = data;
    //   console.log(this.msg)
    //   console.log("this=" + this)
    // }


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
