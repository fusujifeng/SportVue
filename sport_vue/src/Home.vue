<template>
  <el-container>
    <el-aside width="200px">
      <img src="./assets/img/avator.png" alt="">
      <h3>健康数据分析平台</h3>
      <el-button  type="danger" @click="loginOut">退出登录</el-button>
      <el-menu
        class="el-menu-vertical-demo"
      >
<!--下面是侧边栏-->
        <el-submenu  v-for="item in menu" :key="item.id" :index="item.id">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>{{item.name}}</span>
          </template>

<!--          子菜单-->
          <el-menu-item-group>
            <el-menu-item  v-for="i in item.children" :key="i.id" :index="i.id" @click="push(i.path)">{{i.name}}</el-menu-item>
          </el-menu-item-group>
        </el-submenu>

      </el-menu>
    </el-aside>
    <el-main>
      <div class="home" v-if="dialog">
        <el-card><img src="../src/assets/img/home1.png" alt=""></el-card>
        <el-card><img src="../src/assets/img/home2.png" alt=""></el-card>
        <el-card><img src="../src/assets/img/home3.png" alt=""></el-card>
        <el-card><img src="../src/assets/img/home4.png" alt=""></el-card>
      </div>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script>
export default {
  data () {
    return {
      menu: JSON.parse(window.sessionStorage.getItem('menu')),
      dialog: true
    }
  },
  methods: {
    push (path) {
      this.$router.push('' + path)
      this.dialog = false
    },
    // 退出时清空session
    loginOut () {
      window.sessionStorage.clear()
      this.$router.push('/login')
      this.$message.success('已退出登录')
    }
  }
}
</script>

<style scoped>
.el-container{
    width: 100%;
    height: 100%;
}
.el-main{
    width: 100%;
    height:100%;
    background: #CCFFFF;
    opacity: .9;
}
.el-aside{
  display: flex;
  flex-direction: column;
  align-items: center;
  /* overflow: hidden; */
  overflow-y:scroll;
  /* justify-content: center; */
}
.el-aside img{
  width: 160px;
  height: 160px;
  border-radius: 50%;
  padding: 8px;
  background-color: azure;
  border: 1px solid lightskyblue;
  box-sizing: border-box;
}
.el-menu{
  width: 100%;
  margin-top: 40px;
  border-top: 1px solid lightskyblue;
  /* overflow: hidden; */
    overflow-y:scroll;

}
.home{
  width: 100%;
  height: 100%;
  position: relative;
}
.home .el-card{
  width: 600px;
  height: 400px;
  border-radius: 10px;
  position: absolute;
  box-sizing: border-box;
}
.home > div:nth-child(1){
  right: 100px;
  transform: rotateZ(-20deg);
}
.home > div:nth-child(2){
  right: 100px;
  bottom: 0;
}
.home > div:nth-child(3){
  left: 100px;
  bottom: 0;
}
.home > div:nth-child(4){
  left: 100px;
}
.home .el-card img{
  width: 100%;
  height: 100%;
}
</style>
