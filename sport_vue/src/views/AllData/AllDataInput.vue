<template>
<div>
  <el-card  v-show="!dialogVisible">
    <el-row style="margin-bottom: 40px">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/home' }"
          >数据分析与测绘</el-breadcrumb-item
        >
        <el-breadcrumb-item><a href="/sport_vue/public">数据录入与测绘</a></el-breadcrumb-item>
      </el-breadcrumb>
    </el-row>
    <el-steps :active="active" finish-status="success">
      <el-step title="填写时段体温"></el-step>
      <el-step title="填写时段血糖"></el-step>
      <el-step title="填写时段血压"></el-step>
      <el-step title="填写时段饮水量"></el-step>
    </el-steps>
    <el-card >
      <el-form ref="form" label-width="140px" v-show="active === 1">
        <el-form-item label="上午八点体温">
          <div class="test" style="float: left;">
          <el-input v-model="allInfo.temperature[0]"></el-input>
          </div>
<!--        //体温提示-->
          <div>
          <span width="200px" v-show="allInfo.temperature[0] > 37.3 && allInfo.temperature[0] < 42"
            style="color: #f40; padding-left: 10px"
          >体温过高，若非剧烈运动，请及时就医！</span>
          <span v-show="allInfo.temperature[0] <=37.3 && allInfo.temperature[0] >=36.5"
                style="color: #448006; padding-left: 10px"
          >体温正常！</span>
          <span v-show="allInfo.temperature[0] <36.5"
                style="color: #d8ba0a; padding-left: 10px"
          >体温太低了！</span>
          </div>

        </el-form-item>

        <el-form-item label="上午十一点体温">
          <div class="test" style="float: left;">
          <el-input display:inline v-model="allInfo.temperature[1]"></el-input>
          </div>
          <!--        //体温提示-->
          <div>
          <div  v-show="allInfo.temperature[1] > 37.3 && allInfo.temperature[1] < 42"
                style=" display:inline ;color: #f40; padding-left: 10px"
          >体温过高，</div>
            <span v-show="allInfo.temperature[1] <=37.3 && allInfo.temperature[1] >=36.5"
                  style="color: #448006; padding-left: 10px"
            >体温正常！</span>
            <span v-show="allInfo.temperature[1] <36.5"
                  style="color: #d8ba0a; padding-left: 10px"
            >体温太低了！</span>
          </div>
        </el-form-item>
        <el-form-item label="下午一点体温">
          <div class="test" style="float: left;">
          <el-input v-model="allInfo.temperature[2]"></el-input>
          </div>
          <!--        //体温提示-->
          <div>
          <span v-show="allInfo.temperature[2] > 37.3 && allInfo.temperature[2] < 42"
                style="color: #f40; padding-left: 10px"
          >体温过高，若非剧烈运动，请及时就医！</span>
            <span v-show="allInfo.temperature[2] <=37.3 && allInfo.temperature[2] >=36.5"
                  style="color: #448006; padding-left: 10px"
            >体温正常！</span>
            <span v-show="allInfo.temperature[2] <36.5"
                  style="color: #d8ba0a; padding-left: 10px"
            >体温太低了！</span>
          </div>
        </el-form-item>
        <el-form-item label="下午四点体温">
          <div class="test" style="float: left;">
          <el-input v-model="allInfo.temperature[3]"></el-input>
          </div>
          <!--        //体温提示-->
          <div>
          <span v-show="allInfo.temperature[3] > 37.3 && allInfo.temperature[3] < 42"
                style="color: #f40; padding-left: 10px"
          >体温过高，若非剧烈运动，请及时就医！</span>
            <span v-show="allInfo.temperature[3] <=37.3 && allInfo.temperature[3] >=36.5"
                  style="color: #448006; padding-left: 10px"
            >体温正常！</span>
            <span v-show="allInfo.temperature[3] <36.5"
                  style="color: #d8ba0a; padding-left: 10px"
            >体温太低了！</span>
          </div>
        </el-form-item>
        <el-form-item label="下午八点体温">
          <div class="test" style="float: left;">
          <el-input v-model="allInfo.temperature[4]"></el-input>
          </div>
          <!--        //体温提示-->
          <div>
          <span v-show="allInfo.temperature[4] > 37.3 && allInfo.temperature[4] < 42"
                style="color: #f40; padding-left: 10px"
          >体温过高，若非剧烈运动，请及时就医！</span>
            <span v-show="allInfo.temperature[4] <=37.3 && allInfo.temperature[4] >=36.5"
                  style="color: #448006; padding-left: 10px"
            >体温正常！</span>
            <span v-show="allInfo.temperature[4] <36.5"
                  style="color: #d8ba0a; padding-left: 10px"
            >体温太低了！</span>
          </div>
        </el-form-item>
        <div class="tempureKnowledge">
          <h1>Tips:</h1>
          36.5到<span class="big">37.3℃</span>，属于正常体温。<br>
          体温<span class="big">37.3-38℃</span>之间时属于低热，<br>
          <span class="big">38-39℃</span>之间属于中度发热，<br>
          <span class="big">39-41℃</span>之间属于高热，<br>
          体温<span class="big">超过41℃</span>属于超高热。<br>
          当患者出现发热时，应该积极就医，完善相关检查
        </div>


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
        <div class="sugerknowledge">
          <h1>Tips:</h1>
          <h3>
            正常血糖值的范围分为两大类，<br>一般指的是空腹及餐后血糖，<br>
            空腹血糖正常值为<span class="big">3.9～6.1mmol/L</span>之间，<br>
            餐后1小时血糖正常值为<span class="big">6.7-9.4mmol/L</span>之间，<br>
            餐后2小时血糖正常值应小于<span class="big">7.8mmol/L</span>。<br>
          </h3>

        </div>
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
        <div class="pressureknowledge">
          <h1>Tips:</h1>
          <h3>
            <span class="big">血压的正常范围</span>是收缩压在90-140mmHg，舒张压在60-90mmHg。<br>
            <span class="big">高血压</span>:如果收缩压≥140mmHg，舒张压≥90mmHg<br>
            <span class="big">低血压</span>:如果收缩压<90mmHg或者舒张压<60mmHg<br>
          </h3>
        </div>
        <div class="picture">

          <img src="../../../public/assets/img/pressure.jpg" width="450px">
        </div>
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
        <div class="Waterknowledge">
          <h1>Tips:</h1>
          <h3>
            根据《中国居民膳食指南》中的建议，我国居民每天饮水量建议为<span class="big">2500</span>mL。
            <br>
            <br>
            在温和气候条件下生活的从事轻度身体活动的成年人每天需要喝水<span class="big">1500-3000</span>毫升。
            未成年根据年龄的不同适量减少。
          </h3>
        </div>
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
  <Show :allData = "allData" v-if="dialogVisible" @return="returns"></Show>
  <div>{{this.allInfo.location}}</div>
  </div>
</template>
<script>
import Show from '../../components/AllEcharts.vue'
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
        water: [],
        username:"",
        location:""
      },
      id: window.sessionStorage.getItem('id'),
      dialogVisible: false,
      allData: {}
    }
  },



  // mounted() {
  //   this.location=this.address()
  // },
  methods: {
    // 立即提交按钮
    async addConfirm () {
      var newname=window.sessionStorage.getItem("username")
      var location=this.$store.getters.address
      this.$set(this.allInfo,"username",newname)
      this.$set(this.allInfo,"location",location)
      const { data: res } = await this.$http.post(
        '/server/chart/addchartData/' + this.id, this.allInfo,
      )
      if (res.status !== 200) return this.$message.error('提交数据失败')
      this.allData = res.data
      console.log("发出去的",this.allInfo)
      console.log(res)
      this.dialogVisible = true
    },
    returns () {
      this.dialogVisible = false
      this.active = 1
    },

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
.el-card .el-input  {
  width: 300px;
}
.pressureknowledge{
  width: 500px;
  height: 300px;
  background-color: #FAEAD3;
  position: fixed;
}
.Waterknowledge{
  width: 500px;
  height: 300px;
  background-color: #FAEAD3;
  position: fixed;
}
.tempureKnowledge{
  width: 500px;
  height: 300px;
  background-color: #FAEAD3;
  position: fixed;
}
.picture{
  margin-left: 500px;
}

</style>
