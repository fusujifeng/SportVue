<template>
  <div>
    <div class="message">
      <el-card>
        <h3>在线问诊</h3>
        <div class="content">
          <div v-for="e in arr">{{ e }}</div>
          <div class="main">
            <div class="foot">
              <el-input class="cont" v-model="cont" placeholder="请输入内容" ></el-input>
              <el-button type="success" @click="sendMessage">发送</el-button>
              <el-button type="primary" @click="saveChatRecord">记笔记</el-button>
              <el-button type="primary" @click="lookChatRecord">查看笔记</el-button>
              <el-button type="danger" @click="deleteChatRecord">删除笔记</el-button>

            </div>

          </div>
        </div>
      </el-card>
    </div>
    <div class="message">
      <el-card>
        <h3>历史建议</h3>
        {{ showdata }}
      </el-card>
    </div>
  </div>
</template>

<script>

export default {
  name: "Wechat",
  data() {
    return {
      cont: '',
      arr: ['开始聊天吧~'],
      showdata:[],
      username: 'chen',
      id: window.sessionStorage.getItem('id'),
      newdata: {
        username: '',
        data:[]
      }
    }
  },
  created() {

    this.username = window.sessionStorage.getItem("username")
  },
  mounted() {
    this.getMessage()
  },
  methods: {
    // 发送信息
    sendMessage() {
      if (this.cont.length > 0) {

        //获取当前时间
        let dateorigin = new Date();
        let datenew = (dateorigin.getMonth() + 1).toString() + "月" + dateorigin.getDate().toString()
          + "日" + dateorigin.getHours().toString() + ":" + dateorigin.getMinutes().toString() +
          ":" + dateorigin.getSeconds().toString()

        let thesendmessage = datenew + "---" + this.username.toString() + "说：" + ' ' + this.cont.toString()

        this.arr.push(thesendmessage)

        //发送信息
        let emitmessage = this.username + '发送了' + this.cont
        this.cont = ''
        this.socket.emit('message', emitmessage)
      }
    },
    //接收信息
    getMessage() {
      this.socket.on('broadcastmessage', data => {
        //获取当前时间

        let thereceivedata = data

        this.arr.push(thereceivedata);
      })


    },
    async saveChatRecord() {
      this.count++;
      this.$set(this.newdata,"username",this.username)
      this.$set(this.newdata,"data",this.arr)
      console.log("newdata", this.newdata)

      const {data: res} = await this.$http.post('/server/more/savechatrecord/',this.newdata)
      // console.log("res是是是3", data)
      if (res.status !== 200) {
        console.log("保存聊天记录失败")

      }
    },

    async lookChatRecord () {
      console.log("ddffff")
      const { data: res } = await this.$http.get('/server/more/showchatdata/'+this.username)
      if (res.status !== 200) return this.$message.error('获取列表失败')


        for (var i=0;i<res.myINfo.length;i++)
      {
         this.showdata.push(res.myINfo[i].data)
    }

  },
    async deleteChatRecord(){

          const { data: res } = await this.$http.delete('/server/chat/deletechatdata/')
          if (res.status !== 200) return this.$message.error('删除失败')
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
    }
}}
</script>

<style scoped lang="scss">
.message {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.message .el-card {
  width: 800px;
  height: 400px;
  border-radius: 15px;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;
}

.title {
  font-size: 36px;
  color: #8f8f94;
}

.foot {
  position: fixed;
  width:800px;
  bottom: 0;

  .cont {
    width:370px;
    height: 80px;
    background-color: #eee;
  }
}
</style>
