<template>
  <el-card>
    <el-tabs type="border-card" v-model="activeName" v-if="!dialogVisible">
      <el-tab-pane label="上午数据填写" name="first">
        <el-row>
          <el-alert title="请填写8：00~10：00之间的数据，请保证数据准确！" type="warning" effect="dark" closable="false">
          </el-alert
        ></el-row>
          <el-form ref="form">
        <el-form-item label="上午大压">
          <el-input v-model="presure[0]">;</el-input>
          <span v-show="presure[0]>160&&presure[0]<200" style="color:#f40;padding-left:10px;">血压过高，请及时服用药物或者就诊治疗！</span>
          <span v-show="presure[0]>200" style="color:#f40;padding-left:10px;">非正常数据！重新填写!</span>
          <span v-show="presure[0]<60" style="color:#f40;padding-left:10px;">血压过低，若为真实数据，请尽快就医。</span>
        </el-form-item>
        <el-form-item label="上午小压">
          <el-input v-model="presure[1]"></el-input>
          <span v-show="presure[1]>160&&presure[1]<200" style="color:#f40;padding-left:10px;">血压过高，请及时服用药物或者就诊治疗！</span>
          <span v-show="presure[1]>200" style="color:#f40;padding-left:10px;">非正常数据！重新填写!</span>
          <span v-show="presure[1]<60" style="color:#f40;padding-left:10px;">血压过低，若为真实数据，请尽快就医。!</span>
        </el-form-item>
      </el-form>
      </el-tab-pane>

      <el-tab-pane label="中午数据填写" name="secont">
         <el-row>
          <el-alert title="请填写12：00~14：00之间的数据，请保证数据准确！" type="warning" effect="dark" closable="false">
          </el-alert
        ></el-row>
        <el-form>
         <el-form-item label="中午大压">
          <el-input v-model="presure[2]"></el-input>
          <span v-show="presure[2]>160&&presure[2]<200" style="color:#f40;padding-left:10px;">血压过高，请及时服用药物或者就诊治疗！</span>
          <span v-show="presure[2]>200" style="color:#f40;padding-left:10px;">非正常数据！重新填写!</span>
          <span v-show="presure[2]<60" style="color:#f40;padding-left:10px;">血压过低，若为真实数据，请尽快就医。!</span>
        </el-form-item>
        <el-form-item label="中午小压">
          <el-input v-model="presure[3]"></el-input>
          <span v-show="presure[3]>160&&presure[3]<200" style="color:#f40;padding-left:10px;">血压过高，请及时服用药物或者就诊治疗！</span>
          <span v-show="presure[3]>200" style="color:#f40;padding-left:10px;">非正常数据！重新填写!</span>
          <span v-show="presure[3]<60" style="color:#f40;padding-left:10px;">血压过低，若为真实数据，请尽快就医。!</span>
        </el-form-item>
        </el-form>
      </el-tab-pane>

      <el-tab-pane label="晚上数据填写" name="third">
         <el-row>
          <el-alert title="请填写18：00~20：00之间的数据，请保证数据准确！" type="warning" effect="dark" closable="false">
          </el-alert
        ></el-row>
        <el-form>
        <el-form-item label="晚上大压">
          <el-input v-model="presure[4]"></el-input>
          <span v-show="presure[4]>160&&presure[4]<200" style="color:#f40;padding-left:10px;">血压过高，请及时服用药物或者就诊治疗！</span>
          <span v-show="presure[4]>200" style="color:#f40;padding-left:10px;">非正常数据！重新填写!</span>
          <span v-show="presure[4]<60" style="color:#f40;padding-left:10px;">血压过低，若为真实数据，请尽快就医。!</span>
        </el-form-item>
        <el-form-item label="晚上小压">
          <el-input v-model="presure[5]"></el-input>
          <span v-show="presure[5]>160&&presure[5]<200" style="color:#f40;padding-left:10px;">体温过高，若非剧烈运动，请及时就医！</span>
          <span v-show="presure[5]>200" style="color:#f40;padding-left:10px;">非正常数据！重新填写!</span>
          <span v-show="presure[5]<60" style="color:#f40;padding-left:10px;">血压过低，若为真实数据，请尽快就医。!</span>
        </el-form-item>
        <el-form-item>
           <el-button type="success" @click="addPresure">立即提交</el-button>
           <el-button type="primary" @click="tag = 0">重置</el-button>
           <el-button type="primary" @click="dialogVisible=true">再次查看</el-button>
        </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
    <PresureView :presuredata="presuredata" @back="dialogVisible=false" v-if="dialogVisible"></PresureView>
  </el-card>
</template>

<script>
import PresureView from '../../views/PresurView.vue'
export default {
  components: {
    PresureView
  },
  data () {
    return {
      activeName: 'first',
      presuredata: [],
      presure: [],
      id: window.sessionStorage.getItem('id'),
      dialogVisible: false,
      tag: 0
    }
  },
  methods: {
    async addPresure () {
      if (this.tag !== 0) {
        return this.$message.warning(
          '请勿重复提交表单，如需填写新的数据，请刷新此页面。'
        )
      }
      const { data: res } = await this.$http.post(
        '/server/mydata/addpresure/' + this.id,
        this.presure
      )
      if (res.status !== 200) return this.$message.error('信息提交失败')
      console.log(res)
      this.tag = 1
      this.presuredata = res.data
      this.dialogVisible = true
      this.$message.success('数据提交成功，正在前往分析！')
    }
  }
}
</script>

<style scoped>
.el-form{
  margin-top: 20px;
}
.el-input{
  width: 300px;
}
</style>
