<template>
<div>
  <el-card>
    <el-tabs type="border-card" v-model="activeName" v-if="!dialogVisible">
      <el-tab-pane label="上午数据填写" name="first">
        <el-row>
          <el-alert title="请填写6：00~11：00之间的数据，请保证数据准确！" type="warning" effect="dark">
          </el-alert
        ></el-row>
          <el-form ref="form" label-width="180px">
        <el-form-item label="上午八点前饮水量">
          <el-input v-model="water[0]">;</el-input>
          <span v-show="water[0]>800" style="color:#f40;padding-left:10px;">饮水量过多！请合理调整饮水时间！</span>
          <span v-show="water[0]<200" style="color:#FF6E00;padding-left:10px;">饮水量过少！请合理调整饮水时间！!</span>
        </el-form-item>
        <el-form-item label="上午八点~十一点饮水量">
          <el-input v-model="water[1]"></el-input>
           <span v-show="water[0]>800" style="color:#f40;padding-left:10px;">饮水量过多！请合理调整饮水时间！</span>
          <span v-show="water[0]<200" style="color:#FF6E00;padding-left:10px;">饮水量过少！请合理调整饮水时间！!</span>
        </el-form-item>
      </el-form>
      </el-tab-pane>

      <el-tab-pane label="中午数据填写" name="secont">
         <el-row>
          <el-alert title="请填写12：00~14：00之间的数据，请保证数据准确！" type="warning" effect="dark">
          </el-alert
        ></el-row>
        <el-form>
         <el-form-item label="中午十一点~十二点饮水量">
          <el-input v-model="water[2]"></el-input>
           <span v-show="water[0]>800" style="color:#f40;padding-left:10px;">饮水量过多！请合理调整饮水时间！</span>
          <span v-show="water[0]<200" style="color:#FF6E00;padding-left:10px;">饮水量过少！请合理调整饮水时间！!</span>
         </el-form-item>
        <el-form-item label="中午十二点~十四点饮水量">
          <el-input v-model="water[3]"></el-input>
          <span v-show="water[0]>800" style="color:#f40;padding-left:10px;">饮水量过多！请合理调整饮水时间！</span>
          <span v-show="water[0]<200" style="color:#FF6E00;padding-left:10px;">饮水量过少！请合理调整饮水时间！!</span>
        </el-form-item>
        </el-form>
      </el-tab-pane>

      <el-tab-pane label="晚上数据填写" name="third">
         <el-row>
          <el-alert title="请填写18：00~20：00之间的数据，请保证数据准确！" type="warning" effect="dark">
          </el-alert
        ></el-row>
        <el-form>
        <el-form-item label="下午十四点~十八点饮水量">
          <el-input v-model="water[4]"></el-input>
          <span v-show="water[0]>800" style="color:#f40;padding-left:10px;">饮水量过多！请合理调整饮水时间！</span>
          <span v-show="water[0]<200" style="color:#FF6E00;padding-left:10px;">饮水量过少！请合理调整饮水时间！!</span>
        </el-form-item>
        <el-form-item label="晚上十六点~二十点饮水量" label-width="180px">
          <el-input v-model="water[5]"></el-input>
         <span v-show="water[0]>800" style="color:#f40;padding-left:10px;">饮水量过多！请合理调整饮水时间！</span>
          <span v-show="water[0]<200" style="color:#FF6E00;padding-left:10px;">饮水量过少！请合理调整饮水时间！!</span>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="addWater">立即提交</el-button>
          <el-button type="primary" @click="tag = 0">重置</el-button>
           <el-button type="primary" @click="dialogVisible=true">再次查看</el-button>
        </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
    <WaterView v-if="dialogVisible" @back="dialogVisible=false" :waterdata="waterdata"></WaterView>
  </el-card>
<div class="Waterknowledge">
        <h1>Tips:</h1>
        <h3>
          根据《中国居民膳食指南》中的建议，我国居民每天饮水量建议为<span class="big">1200</span>mL。
          <br>
          <br>
          在温和气候条件下生活的从事轻度身体活动的成年人每天需要喝水<span class="big">1500-1700</span>毫升。
          未成年根据年龄的不同适量减少。
        </h3>
      </div>
  <div class="picture">

    <img src="../../assets/img/water.jpg" width="500px">
  </div>
</div>
</template>

<script>
import WaterView from '../../views/waterview.vue'
export default {
  components: {
    WaterView
  },
  data () {
    return {
      activeName: 'first',
      water: [],
      waterdata: {},
      id: window.sessionStorage.getItem('id'),
      dialogVisible: false,
      tag: 0
    }
  },
  methods: {
    async addWater () {
      if (this.tag !== 0) {
        return this.$message.warning(
          '请勿重复提交表单，如需填写新的数据，请刷新此页面。'
        )
      }
      const { data: res } = await this.$http.post(
        '/server/mydata/addwater/' + this.id,
        this.water
      )
      if (res.status !== 200) return this.$message.error('信息提交失败')
      console.log(res)
      this.tag = 1
      this.waterdata = res.data
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

.Waterknowledge{
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
