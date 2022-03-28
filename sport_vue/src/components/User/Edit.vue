<template>
  <div class="edit_box">
    <el-card>
        <el-row><h3>请填写修改表单</h3></el-row>
      <el-form ref="editForm" :model="editForm" label-width="80px">
        <el-form-item label="姓名">
          <el-input v-model="editForm.name"></el-input>
        </el-form-item>
        <el-form-item label="年龄">
          <el-input v-model="editForm.age"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="editForm.sex">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="editForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="操作">
          <el-button type="success" @click="editConfirm">立即修改</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      editForm: {},
      id: window.sessionStorage.getItem('id')
    }
  },
  created () {
    this.getInfo()
  },
  methods: {
    async getInfo () {
      const { data: res } = await this.$http.get(
        '/server/user/mymsg/' + this.id
      )
      if (res.status !== 200) return this.$message.error('获取信息失败')
      this.editForm = res.myinfo
    },
    async editConfirm () {
      const { data: res } = await this.$http.post('/server/user/edit/', this.editForm)
      if (res.status === 200) return this.$message.success('修改成功'); this.getInfo()
    }
  }
}
</script>

<style scoped>
.edit_box {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
}
.el-card {
  width: 800px;
  height: 600px;
  margin: 0 auto;
  border-radius: 10px;
}
.el-form{
    margin-top: 30px;
}
.el-input{
    width: 300px;
}
</style>
