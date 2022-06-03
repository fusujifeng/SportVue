<template>
<div>
  <div class="message">
    <el-card>
  <h3>请联系我</h3>
    </el-card>
  </div>

</div>
</template>

<script>
export default {
  name: "Wechat"
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
</style>
