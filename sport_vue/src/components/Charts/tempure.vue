<template>
  <div>
  <el-card>
    <el-tabs type="border-card" v-model="activeName" v-if="!dialogVisible">
      <el-tab-pane label="上午数据填写" name="first">
        <el-row>
          <el-alert
            title="请填写8：00~20：00之间的数据，请保证数据准确！"
            type="warning"
            effect="dark"
          >
          </el-alert
        ></el-row>
        <el-form ref="form" label-width="120px">
          <el-form-item label="上午八点体温">
            <el-input v-model="temperature[0]">;</el-input>
            <span
              v-show="temperature[0] > 37 && temperature[0] < 42"
              style="color: #f40; padding-left: 10px"
              >体温过高，若非剧烈运动，请及时就医！</span
            >
            <span
              v-show="temperature[0] > 42"
              style="color: #f40; padding-left: 10px"
              >非正常数据！重新填写!</span
            >
            <span
              v-show="temperature[0] < 35"
              style="color: #f40; padding-left: 10px"
              >非正常数据！重新填写!</span
            >
          </el-form-item>
          <el-form-item label="上午十一点体温">
            <el-input v-model="temperature[1]"></el-input>
            <span
              v-show="temperature[1] > 37 && temperature[1] < 42"
              style="color: #f40; padding-left: 10px"
              >体温过高，若非剧烈运动，请及时就医！</span
            >
            <span
              v-show="temperature[1] > 42"
              style="color: #f40; padding-left: 10px"
              >非正常数据！重新填写!</span
            >
            <span
              v-show="temperature[1] < 35"
              style="color: #f40; padding-left: 10px"
              >非正常数据！重新填写!</span
            >
          </el-form-item>
        </el-form>
      </el-tab-pane>

      <el-tab-pane label="中午数据填写" name="secont">
        <el-row>
          <el-alert
            title="请填写12：00~14：00之间的数据，请保证数据准确！"
            type="warning"
            effect="dark"
          >
          </el-alert
        ></el-row>
        <el-form>
          <el-form-item label="中午十二点体温">
            <el-input v-model="temperature[2]"></el-input>
            <span
              v-show="temperature[2] > 37 && temperature[2] < 42"
              style="color: #f40; padding-left: 10px"
              >体温过高，若非剧烈运动，请及时就医！</span
            >
            <span
              v-show="temperature[2] > 42"
              style="color: #f40; padding-left: 10px"
              >非正常数据！重新填写!</span
            >
            <span
              v-show="temperature[2] < 35"
              style="color: #f40; padding-left: 10px"
              >非正常数据！重新填写!</span
            >
          </el-form-item>
          <el-form-item label="中午十四点体温">
            <el-input v-model="temperature[3]"></el-input>
            <span
              v-show="temperature[3] > 37 && temperature[3] < 42"
              style="color: #f40; padding-left: 10px"
              >体温过高，若非剧烈运动，请及时就医！</span
            >
            <span
              v-show="temperature[3] > 42"
              style="color: #f40; padding-left: 10px"
              >非正常数据！重新填写!</span
            >
            <span
              v-show="temperature[3] < 35"
              style="color: #f40; padding-left: 10px"
              >非正常数据！重新填写!</span
            >
          </el-form-item>
        </el-form>
      </el-tab-pane>

      <el-tab-pane label="晚上数据填写" name="third">
        <el-row>
          <el-alert
            title="请填写18：00~20：00之间的数据，请保证数据准确！"
            type="warning"
            effect="dark"
          >
          </el-alert
        ></el-row>
        <el-form>
          <el-form-item label="晚上六点体温">
            <el-input v-model="temperature[4]"></el-input>
            <span
              v-show="temperature[4] > 37 && temperature[4] < 42"
              style="color: #f40; padding-left: 10px"
              >体温过高，若非剧烈运动，请及时就医！</span
            >
            <span
              v-show="temperature[4] > 42"
              style="color: #f40; padding-left: 10px"
              >非正常数据！重新填写!</span
            >
            <span
              v-show="temperature[4] < 35"
              style="color: #f40; padding-left: 10px"
              >非正常数据！重新填写!</span
            >
          </el-form-item>
          <el-form-item label="晚上八点体温">
            <el-input v-model="temperature[5]"></el-input>
            <span
              v-show="temperature[5] > 37 && temperature[5] < 42"
              style="color: #f40; padding-left: 10px"
              >体温过高，若非剧烈运动，请及时就医！</span
            >
            <span
              v-show="temperature[5] > 42"
              style="color: #f40; padding-left: 10px"
              >非正常数据！重新填写!</span
            >
            <span
              v-show="temperature[5] < 35"
              style="color: #f40; padding-left: 10px"
              >非正常数据！重新填写!</span
            >
          </el-form-item>
          <el-form-item>
            <el-button type="success" @click="addConfirm">立即提交</el-button>
             <el-button type="primary" @click="tag=0">重置</el-button>
              <el-button type="primary" @click="dialogVisible=true">再次查看</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  <TemView v-if="dialogVisible" :temdata="temdata"  @back="dialogVisible=false"></TemView>
  </el-card>
  <div class="tempureKnowledge">
    <h1>Tips:</h1>
    不超过<span class="big">37.3℃</span>，属于正常体温。<br>
    体温<span class="big">37.3-38℃</span>之间时属于低热，<br>
    <span class="big">38-39℃</span>之间属于中度发热，<br>
    <span class="big">39-41℃</span>之间属于高热，<br>
    体温<span class="big">超过41℃</span>属于超高热。<br>
    当患者出现发热时，应该积极就医，完善相关检查
  </div>
    <div class="picture">

      <img src="../../assets/img/tempture.jpg">
    </div>
  </div>
</template>

<script>
import TemView from '../../views/temview.vue'
export default {
  components: {
    TemView
  },
  data () {
    return {
      activeName: 'first',
      temperature: [],
      id: window.sessionStorage.getItem('id'),
      temdata: [],
      tag: 0,
      // 体温数据表
      dialogVisible: false
    }
  },
  methods: {
    async addConfirm () {
      if (this.tag !== 0) {
        return this.$message.warning(
          '请勿重复提交表单，如需填写新的数据，请刷新此页面。'
        )
      }
      const { data: res } = await this.$http.post('/server/mydata/addtempure/' + this.id, this.temperature)
      if (res.status !== 200) return this.$message.error('信息提交失败')
      this.tag = 1
      this.temdata = res.data
      this.dialogVisible = true
      this.$message.success('数据提交成功，正在前往分析！')
    }
  }
}
</script>

<style scoped>
.el-form {
  margin-top: 20px;
}
.el-input {
  width: 300px;
}

.tempureKnowledge{
  width: 500px;
  height: 300px;
  background-color: #FAEAD3;
  position: fixed;
}
.big{
  color: green;
}
.picture{
  margin-left: 500px;
}
</style>
