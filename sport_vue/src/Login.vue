<template>
  <div class="main">
      <div class="login_box">
    <el-card>
        <div>
        <img src="./assets/img/avator.png" alt="">
        </div>
        <h3>健康数据分析平台</h3>
      <el-form :model="loginForm" :rules="rules" ref="ruleForm">
        <el-form-item>
          <el-input v-model="loginForm.username"  placeholder="请输入账号"
    prefix-icon="el-icon-user"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="loginForm.password"  placeholder="请输入密码"
    prefix-icon="el-icon-view" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-radio-group v-model="loginForm.type">
            <el-radio label="用户"></el-radio>
            <el-radio label="管理员"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="loginConfirm">登录</el-button>
          <el-button type="danger" @click="goRegister">没有账号？ >  立即注册</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loginForm: {
        username: 'admin1',
        password: '123456',
        type: '用户'
      },
      rules: {}
    }
  },
  methods: {
    goRegister () {
      this.$router.push('/register')
    },
    async loginConfirm () {
      const { data: res } = await this.$http.post('/server/user/login/', this.loginForm)
      console.log(res)
      if (res.status !== 200) return this.$message.error('账号类型错误或账号、密码错误')
      window.sessionStorage.setItem('token', res.token)
      window.sessionStorage.setItem('type', res.user.type)
      window.sessionStorage.setItem('menu', JSON.stringify(res.menu))
      window.sessionStorage.setItem('id', res.user._id)
      this.$router.push('/home')
      this.$message.success('登录成功')
    }
  }
}
</script>

<style coped>
.main {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: azure;
}
.login_box{
  width: 600px;
  height: 400px;
  background: url(./assets/img/sport.png) no-repeat center;
  background-size: 100%;
}
.main .el-card {
  width: 700px;
  height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  opacity: .9;
  position: relative;
}
.main .el-card h3{
    text-align: center;
    margin-top: 170px;
}
.main .el-card img{
    width: 150px;
    height: 150px;
    padding: 8px;
    box-sizing: border-box;
    border: 1px solid lightskyblue;
    position: absolute;
    border-radius: 50%;
    background: gainsboro;
    top: 10px;
    left: 50%;
    transform: translateX(-50%);
    cursor: pointer;
}
.main .el-card .el-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* margin-top: 60px; */
}
.main .el-card .el-form .el-input {
  width: 300px;
}
.main .el-card .el-form .el-button {
  width: 200px;
  border-radius: 15px;
}
</style>>
