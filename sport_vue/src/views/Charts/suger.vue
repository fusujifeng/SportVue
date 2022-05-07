<template>
  <div>
  <el-card>
    <el-tabs type="border-card" v-model="activeName"  v-if="!dialogVisible">
      <el-tab-pane label="早餐数据填写" name="first">
        <el-row>
          <el-alert title="请填写6：00~10：00之间的数据，请保证数据准确！" type="warning" effect="dark" closable="false">
          </el-alert
        ></el-row>
          <el-form ref="form" label-width="120px">
        <el-form-item label="早餐空腹血糖">
          <el-input v-model="suger[0]">;</el-input>
          <span v-show="suger[0]>14&&suger[0]<20" style="color:#f40;padding-left:10px;">血糖过高，请及时就医！</span>
          <span v-show="suger[0]>20" style="color:#f40;padding-left:10px;">非正常数据！重新填写!</span>
          <span v-show="suger[0]<1" style="color:#f40;padding-left:10px;">非正常数据！重新填写!</span>
        </el-form-item>
        <el-form-item label="早餐后血糖">
          <el-input v-model="suger[1]"></el-input>
          <span v-show="suger[1]>14&&suger[1]<20" style="color:#f40;padding-left:10px;">血糖过高，请及时就医！</span>
          <span v-show="suger[1]>20" style="color:#f40;padding-left:10px;">非正常数据！重新填写!</span>
          <span v-show="suger[1]<1" style="color:#f40;padding-left:10px;">非正常数据！重新填写!</span>
        </el-form-item>
      </el-form>
      </el-tab-pane>

      <el-tab-pane label="午餐数据填写" name="secont">
         <el-row>
          <el-alert title="请填写10：00~14：00之间的数据，请保证数据准确！" type="warning" effect="dark" closable="false">
          </el-alert
        ></el-row>
        <el-form label-width="120px">
         <el-form-item label="午餐前空腹血糖">
          <el-input v-model="suger[2]"></el-input>
          <span v-show="suger[2]>14&&suger[2]<20" style="color:#f40;padding-left:10px;">血糖过高，请及时就医！</span>
          <span v-show="suger[2]>20" style="color:#f40;padding-left:10px;">非正常数据！重新填写!</span>
          <span v-show="suger[2]<1" style="color:#f40;padding-left:10px;">非正常数据！重新填写!</span>
        </el-form-item>
        <el-form-item label="午餐后血糖">
          <el-input v-model="suger[3]"></el-input>
          <span v-show="suger[3]>14&&suger[3]<20" style="color:#f40;padding-left:10px;">血糖过高，请及时就医！</span>
          <span v-show="suger[3]>20" style="color:#f40;padding-left:10px;">非正常数据！重新填写!</span>
          <span v-show="suger[3]<1" style="color:#f40;padding-left:10px;">非正常数据！重新填写!</span>
        </el-form-item>
        </el-form>
      </el-tab-pane>

      <el-tab-pane label="晚餐数据填写" name="third">
         <el-row>
          <el-alert title="请填写18：00~20：00之间的数据，请保证数据准确！" type="warning" effect="dark" closable="false">
          </el-alert
        ></el-row>
        <el-form label-width="120px">
        <el-form-item label="晚餐前空腹血糖">
          <el-input v-model="suger[4]"></el-input>
          <span v-show="suger[4]>14&&suger[4]<20" style="color:#f40;padding-left:10px;">血糖过高，请及时就医！</span>
          <span v-show="suger[4]>20" style="color:oragin;padding-left:10px;">非正常数据！重新填写!</span>
          <span v-show="suger[4]<1" style="color:oragin;padding-left:10px;">非正常数据！重新填写!</span>
        </el-form-item>
        <el-form-item label="晚餐后血糖">
          <el-input v-model="suger[5]"></el-input>
          <span v-show="suger[5]>14&&suger[5]<20" style="color:#f40;padding-left:10px;">血糖过高，请及时就医！</span>
          <span v-show="suger[5]>20" style="color:#f40;padding-left:10px;">非正常数据！重新填写!</span>
          <span v-show="suger[5]<1" style="color:#f40;padding-left:10px;">非正常数据！重新填写!</span>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="addSuger">立即提交</el-button>
           <el-button type="primary" @click="tag = 0">重置</el-button>
           <el-button type="primary" @click="dialogVisible=true">再次查看</el-button>
        </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
    <SugerView v-if="dialogVisible" :sugdata="sugdata" @back="dialogVisible=false"></SugerView>
  </el-card>
  <div class="sugerknowledge">
    <h1>Tips:</h1>
    <h3>
      正常血糖值的范围分为两大类，一般指的是空腹及餐后血糖，<br>
      空腹血糖正常值为<span class="big">3.9～6.1mmol/L</span>之间，<br>
      餐后1小时血糖正常值为<span class="big">6.7-9.4mmol/L</span>之间，<br>
      餐后2小时血糖正常值应小于<span class="big">7.8mmol/L</span>。<br>
    </h3>
    <div class="picture">

      <img width="475"  src="../../assets/img/sugar.jpg">
    </div>
  </div>
  </div>
</template>

<script>
import SugerView from '../../components/sugerview.vue'
export default {
  components: {
    SugerView
  },
  data () {
    return {
      activeName: 'first',
      suger: [],
      id: window.sessionStorage.getItem('id'),
      sugdata: [],
      tag: 0,
      dialogVisible: false
    }
  },
  methods: {
    async addSuger () {
      if (this.tag !== 0) {
        return this.$message.warning(
          '请勿重复提交表单，如需填写新的数据，请刷新此页面。'
        )
      }
      const { data: res } = await this.$http.post(
        '/server/mydata/addsuger/' + this.id,
        this.suger
      )
      if (res.status !== 200) return this.$message.error('信息提交失败')
      console.log(res)
      this.tag = 1
      this.sugdata = res.data
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

.sugerknowledge{
  width: 500px;
  height: 300px;
  background-color:#FAEAD3;
  position: fixed;
}

.picture{
 margin-left: 500px;
  margin-bottom: 1000px;
}

</style>
