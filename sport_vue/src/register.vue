<template>
  <div class="register">
    <el-card>
         <h3>请认真填写信息哦</h3>
      <el-form ref="registrerRef" :model="registrerForm" label-width="80px">
        <el-form-item label="姓名">
          <el-input v-model="registrerForm.name"></el-input>
        </el-form-item>
        <el-form-item label="年龄">
          <el-input v-model="registrerForm.age"></el-input>
        </el-form-item>
        <el-form-item label="性别">
           <el-radio-group v-model="registrerForm.sex">
            <el-radio label="男" border></el-radio>
            <el-radio label="女" border></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="registrerForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="用户名">
          <el-input v-model="registrerForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="registrerForm.password"></el-input>
        </el-form-item>
        <el-form-item label="密码">
           <el-radio-group v-model="registrerForm.type">
            <el-radio label="用户" border></el-radio>
            <el-radio label="管理员" border></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="操作">
            <el-button type="success" @click="registerConfirm">立即注册</el-button><el-button type="primary" @click="goLogin">返回登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      registrerForm: {
        name: '',
        age: '',
        sex: '男',
        phone: '',
        username: '',
        password: '',
        type: '用户'
      }
    }
  },
  methods: {
    goLogin () {
      this.$router.push('/login')
    },
    async registerConfirm () {
      const { data: res } = await this.$http.post('/server/user/register/', this.registrerForm)
      if (res.status === 201) return this.$message.info('用户名已被注册')
      if (res.status === 200) {
        this.$router.push('/login')
        this.$message.success('注册成功')
      }
    }
  }
}
</script>

<style scoped>
.register{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: beige;
}
.register .el-card{
    width: 500px;
    height: 600px;
    border-radius: 15px;
}
.register .el-card .el-input{
  width: 300px;
}
.register .el-card h3{
    text-align: center;
    margin-bottom: 30px;
}
</style>
