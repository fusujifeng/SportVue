<template>
  <div>

    <el-card v-if="!dialog">
      <el-row>
          <el-alert title="请填写全部数据，请保证数据准确！" type="warning" effect="dark">
          </el-alert
        ></el-row>
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item>
          <h3>信息表单填写</h3>
        </el-form-item>
        <el-form-item label="身高(m)">
          <el-input v-model="form.height"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="form.sex">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="体重(kg)">
          <el-input v-model="form.weight"></el-input>
        </el-form-item>

        <weather/>
        <el-form-item label="行走时间(h)">
          <el-input v-model="form.footDate"></el-input>
        </el-form-item>
        <el-form-item label="行走心率(次/分)">
          <el-input v-model="form.footRhythm"></el-input>
        </el-form-item>
        <el-form-item label="跑步时长(h)">
          <el-input v-model="form.runDate"></el-input>
        </el-form-item>
        <el-form-item label="跑步心率(次/分)">
          <el-input v-model="form.rnnhurt"></el-input>
        </el-form-item>
        <el-form-item label="游泳时长(h)">
          <el-input v-model="form.swimDate"></el-input>
        </el-form-item>
        <el-form-item label="游泳心率(次/分)">
          <el-input v-model="form.swimRhythmhurt"></el-input>
        </el-form-item>
        <el-form-item label="操作">
          <template>
            <el-button type="success" @click="addConfirm">立即提交</el-button>
            <el-button type="primary" @click="dialog = true">再次查看</el-button>
            <el-button type="warning" @click="tag = 1">重置查询</el-button>
            <el-button type="warning" @click="reset">重置计划</el-button>
          </template>
        </el-form-item>
      </el-form>
    </el-card>
  <el-dialog title="运动计划定制" :visible.sync="dialogFormVisible" append-to-body>
  <el-form :model="form">
    <el-form-item label="慢走时长">
      <el-input v-model="myform.mfootDate"></el-input>
    </el-form-item>
    <el-form-item label="慢跑时长">
      <el-input v-model="myform.mrunDate"></el-input>
    </el-form-item>
    <el-form-item label="游泳时长">
      <el-input v-model="myform.mswimDate"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button type="primary" @click="addPlan">确 定</el-button>
  </div>
</el-dialog>
<Sportview v-if="dialog" :sportDate="sportDate" @back="dialog = false"></Sportview>
  </div>
</template>

<script>
import Sportview from '../../components/littleChart/Sportview.vue'
import weather from "@/views/More/weather";
export default {
  components: {
    Sportview,weather
  },
  data () {
    return {
      form: {},
      id: window.sessionStorage.getItem('id'),

      //显示分析表单
      dialog: false,
      // 控制不能重复提交，提交完tag变成0
      tag: 1,
      // 制定计划显示隐藏
      plantag: 1,
      dialogFormVisible: false,
      myform: {},
      sportDate: {}
    }
  },
  methods: {
    async addConfirm () {
      if (this.tag !== 1) return this.$message.warning('请勿重复提交表单')
      if (window.sessionStorage.getItem('plan') !== 'true') return this.dialogFormVisible = true
      const { data: res } = await this.$http.post(
        '/server/sport/addsport/' + this.id, this.form
      )
      if (res.status !== 200) return this.$message.error('提交数据失败')
      this.tag = 0
      this.sportDate = res.data
      this.dialog = true
      this.$message.success('数据提交成功，正在前往分析')
    },
    addPlan () {
      window.sessionStorage.setItem('mfootDate', this.myform.mfootDate)
      window.sessionStorage.setItem('mrunDate', this.myform.mrunDate)
      window.sessionStorage.setItem('mswimDate', this.myform.mswimDate)
      window.sessionStorage.setItem('plan', 'true')
      this.plantag = 0
      this.$message.success('定制计划成功')
      this.dialogFormVisible = false
    },
    reset () {
      window.sessionStorage.setItem('plan', 'false')
      this.dialogFormVisible = true
    }
  },
  created () {
    if (window.sessionStorage.getItem('plan') !== 'true') { this.dialogFormVisible = true }
  }
}
</script>

<style scoped>
.el-input {
  width: 300px;
}
.el-form{
  margin-top: 30px;
}
</style>
