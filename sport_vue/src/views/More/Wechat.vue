<template>
<div>
  <div class="message">
    <el-card>
  <h3>请联系我</h3>
      <div class="content">
        <div v-for="e in arr" >{{e}}</div>
        <div class="main">
          <div class="foot">
            <el-input class="cont" v-model="cont" placeholder="请输入内容"></el-input>
            <el-button type="success" @click="sendMessage">发送</el-button>

          </div>

        </div>
      </div>
    </el-card>
  </div>

</div>
</template>

<script>

export default {
  name: "Wechat",
  data(){
      return{
        cont:'',
        arr:['ddd','segg','qerrr'],
      }
    },
  methods:{
    sendMessage(){
      if(this.cont.length>0) {
        this.arr.push(this.cont)
        //发送信息
        let emitmessage=this.cont
        this.socket.emit('message',emitmessage)
      }
    }
  }
}
</script>

<style scoped lang="scss">
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
.content{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;
}

.title{
  font-size: 36px;
  color:#8f8f94;
}
.foot{
  position: fixed;
  width: 100%;
  bottom: 0;
  .cont{
    width: 100%;
    height: 80px;
    background-color: #eee;
  }
}
</style>
