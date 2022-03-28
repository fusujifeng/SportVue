<template>
<div>
  <el-card  v-show="!dialogVisible">
    <el-row style="margin-bottom: 40px">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/home' }"
          >数据分析与测绘</el-breadcrumb-item
        >
        <el-breadcrumb-item><a href="/">数据录入与测绘</a></el-breadcrumb-item>
      </el-breadcrumb>
    </el-row>
    <el-steps :active="active" finish-status="success">
      <el-step title="填写时段体温"></el-step>
      <el-step title="填写时段血糖"></el-step>
      <el-step title="填写时段血压"></el-step>
      <el-step title="填写时段饮水量"></el-step>
    </el-steps>
    <el-card>
      <el-form ref="form" label-width="120px" v-show="active === 1">
        <el-form-item label="上午八点体温">
          <el-input v-model="allInfo.temperature[0]"></el-input><span v-show="allInfo.temperature[0]>37">1112</span>
        </el-form-item>
        <el-form-item label="上午十一点体温">
          <el-input v-model="allInfo.temperature[1]"></el-input>
        </el-form-item>
        <el-form-item label="下午一点体温">
          <el-input v-model="allInfo.temperature[2]"></el-input>
        </el-form-item>
        <el-form-item label="下午四点体温">
          <el-input v-model="allInfo.temperature[3]"></el-input>
        </el-form-item>
        <el-form-item label="下午八点体温">
          <el-input v-model="allInfo.temperature[4]"></el-input>
        </el-form-item>
      </el-form>

      <el-form ref="form" label-width="155px" v-show="active === 2">
        <el-form-item label="早餐前血糖值">
          <el-input v-model="allInfo.bloodSuger[0]"></el-input>
        </el-form-item>
        <el-form-item label="早上餐后两小时血糖值">
          <el-input v-model="allInfo.bloodSuger[1]"></el-input>
        </el-form-item>
        <el-form-item label="午餐前血糖值">
          <el-input v-model="allInfo.bloodSuger[2]"></el-input>
        </el-form-item>
        <el-form-item label="午餐后两小时血糖值">
          <el-input v-model="allInfo.bloodSuger[3]"></el-input>
        </el-form-item>
        <el-form-item label="晚餐前血糖值">
          <el-input v-model="allInfo.bloodSuger[4]"></el-input>
        </el-form-item>
        <el-form-item label="晚餐两小时后血糖值">
          <el-input v-model="allInfo.bloodSuger[5]"></el-input>
        </el-form-item>
      </el-form>

      <el-form ref="form" label-width="120px" v-show="active === 3">
        <el-form-item label="上午八点血压">
          <el-input v-model="allInfo.bloodPressure[0]"></el-input>
        </el-form-item>
        <el-form-item label="中午十二点血压">
          <el-input v-model="allInfo.bloodPressure[1]"></el-input>
        </el-form-item>
        <el-form-item label="晚上八点血压">
          <el-input v-model="allInfo.bloodPressure[2]"></el-input>
        </el-form-item>
      </el-form>

      <el-form ref="form" label-width="160px" v-show="active === 4">
        <el-form-item label="7：00~9：00饮水量">
          <el-input v-model="allInfo.water[0]"></el-input>
        </el-form-item>
        <el-form-item label="8：00~12：00饮水量">
          <el-input v-model="allInfo.water[1]"></el-input>
        </el-form-item>
        <el-form-item label="12：00~4：00饮水量">
          <el-input v-model="allInfo.water[2]"></el-input>
        </el-form-item>
        <el-form-item label="14：00~16：00饮水量">
          <el-input v-model="allInfo.water[3]"></el-input>
        </el-form-item>
        <el-form-item label="16：00~20：00饮水量">
          <el-input v-model="allInfo.water[4]"></el-input>
        </el-form-item>
      </el-form>
    </el-card>
    <el-button
      type="primary"
      class="submit"
      @click="active == 4 ? active == 4 : active++"
      v-show="active !== 4"
      >下一步</el-button
    >
    <el-button
      type="success"
      class="submit"
      v-show="active === 4"
      @click="addConfirm"
      >立即提交</el-button
    >
    <el-button
      type="warning"
      class="resubmit"
      @click="active == 1 ? active == 1 : active--"
      >上一步</el-button
    >
  </el-card>
  <Show :allDate = "allDate" v-if="dialogVisible" @return="returns"></Show>
  </div>
</template>
<script>
import Show from '../../views/Show.vue'
export default {
  components: {
    Show
  },
  data () {
    return {
      active: 1,
      allInfo: {
        temperature: [],
        bloodSuger: [],
        bloodPressure: [],
        water: []
      },
      id: window.sessionStorage.getItem('id'),
      dialogVisible: false,
      allDate: {}
    }
  },
  methods: {
    async addConfirm () {
      const { data: res } = await this.$http.post(
        '/server/chart/addcharDate/' + this.id,
        this.allInfo
      )
      if (res.status !== 200) return this.$message.error('提交数据失败')
      this.allDate = res.data
      console.log(res)
      this.dialogVisible = true
    },
    returns () {
      this.dialogVisible = false
      this.active = 1
    },
    showss (n) {
      console.log(n)
    }
  }
}
</script>

<style scoped>
.el-card:nth-child(1) {
  min-height: 800px;
  position: relative;
}
.submit {
  position: absolute;
  bottom: 10px;
  right: 20px;
}
.resubmit {
  position: absolute;
  bottom: 10px;
  right: 140px;
}
.el-card .el-input {
  width: 300px;
}
</style>
