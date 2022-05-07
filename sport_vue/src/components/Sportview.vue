<template>
  <el-card>
    <el-card style="width: 70%; margin: 0 auto; position: relative;">
      <el-descriptions
        title="运动数据分析"
        column= 3
        border
        direction="vertical"
      >
        <el-descriptions-item label="身高"
          ><el-tag>{{ sportDate.height }}m</el-tag></el-descriptions-item
        >
        <el-descriptions-item label="体重"
          ><el-tag>{{ sportDate.weight }}kg</el-tag></el-descriptions-item
        >
        <el-descriptions-item label="性别"
          ><el-tag>{{ sportDate.sex }}</el-tag></el-descriptions-item
        >
        <el-descriptions-item label="慢走计划时长"
          >{{ mfootDate }}h</el-descriptions-item
        >
        <el-descriptions-item label="实际慢走时长"
          ><el-tag>{{ sportDate.footDate }}h</el-tag></el-descriptions-item
        >
        <el-descriptions-item label="完成进度"
          ><el-progress
            type="circle"
            :percentage="
              parseFloat((sportDate.footDate / mfootDate).toFixed(2)) * 100
            "
          ></el-progress
        ></el-descriptions-item>
        <el-descriptions-item label="慢跑计划时长"
          >{{ mrunDate }}h</el-descriptions-item
        >
        <el-descriptions-item label="实际慢跑时长"
          ><el-tag>{{ sportDate.runDate }}h</el-tag></el-descriptions-item
        >
        <el-descriptions-item label="完成进度"
          ><el-progress
            type="circle"
            :percentage="
              parseFloat((sportDate.runDate / mrunDate).toFixed(2)) * 100
            "
          ></el-progress
        ></el-descriptions-item>
        <el-descriptions-item label="游泳计划时长"
          >{{ mswimRhythmDate }}h</el-descriptions-item
        >
        <el-descriptions-item label="实际游泳时长"
          ><el-tag>{{ sportDate.swimRhythmDate }}h</el-tag></el-descriptions-item
        >
        <el-descriptions-item label="完成进度"
          ><el-progress
            type="circle"
            :percentage="
              parseFloat((sportDate.swimRhythmDate / mswimRhythmDate).toFixed(2)) * 100
            "
          ></el-progress
        ></el-descriptions-item>
      </el-descriptions>
      <el-button type="primary" @click="$emit('back')" size="mini">返回</el-button>
      <el-button type="success" @click="dialog=true" style="margin-right:60px" size="mini">查看分析结果</el-button>
    </el-card>
    <el-card style="width: 80%; margin: 20px auto; position: relative" v-show="dialog">
      <el-descriptions title="分析结果" column = 1>
        <el-descriptions-item label="当前BMI指数为">{{msg.BMI}}</el-descriptions-item>
        <el-descriptions-item label="BMI分析结果">{{msg.bmimsg}}</el-descriptions-item>
        <el-descriptions-item label="慢走分析结果">{{msg.footmsg}}</el-descriptions-item>
        <el-descriptions-item label="慢跑分析结果">{{msg.runmsg}}</el-descriptions-item>
        <el-descriptions-item label="游泳分析结果">{{msg.swimRhythmmsg}}</el-descriptions-item>
        <el-descriptions-item label="总消耗卡路里（平均）">{{msg.kal}}卡路里</el-descriptions-item>
      </el-descriptions>
    </el-card>
  </el-card>
</template>

<script>
export default {
  props: {
    sportDate: {}
  },
  data () {
    return {
      mfootDate: window.sessionStorage.getItem('mfootDate'),
      mrunDate: window.sessionStorage.getItem('mrunDate'),
      mswimRhythmDate: window.sessionStorage.getItem('mswimRhythmDate'),
      msg: {},
      //显示/隐藏分析结果
      dialog: false
    }
  },
  created () {
    const weight = parseFloat(this.sportDate.weight)
    const height = parseFloat(this.sportDate.height)
    const msg = {}
    msg.BMI = weight / (height * height)
    if (msg.BMI > 18.5 && msg.BMI < 23.9) {
      msg.bmimsg = 'BMI值处于正常水平，请保持良好心态，积极锻炼哦！'
    }
    if (msg.BMI < 18.5) {
      msg.bmimsg = 'BMI值过低！请合理规划饮食或及时就诊！'
    }
    if (msg.BMI > 23.9 && msg.BMI < 30) {
      msg.bmimsg = 'BMI偏高！您身体处于肥胖的状态，请控制饮食，加强锻炼！'
    }
    if (msg.BMI > 30) {
      msg.bmimsg =
        'BMI过高！您身体处于超胖的状态，请控制饮食，加强锻炼！及时减重！'
    }
    if (this.sportDate.footRhythm > 60 && this.sportDate.footRhythm < 120) {
      msg.footmsg = '您的慢走心率正常，多走走有助于身体健康哦！'
    }
    if (!(this.sportDate.footRhythm > 60 && this.sportDate.footRhythm < 120)) {
      msg.footmsg = '您的慢走心率异常！若非特别情况，请及时去医院就诊！'
    }
    if (this.sportDate.runRhythm > 120 && this.sportDate.runRhythm < 150) {
      msg.runmsg = '您的慢跑心率正常，慢跑有助于增强免疫力，减脂。请保持哦！'
    }
    if (this.sportDate.runRhythm > 160) {
      msg.runmsg =
        '您的慢跑心率偏高，请调整跑步速度或步频，若出现身体不适，请减少慢跑时长！'
    } else {
      msg.runmsg = '您的慢跑心率正常，慢跑有助于增强免疫力，减脂。请保持哦！'
    }
    if (this.sportDate.swimRhythmhurt > 120 && this.sportDate.swimRhythmhurt < 130) {
      msg.swimRhythmmsg = '您的游泳心率正常，慢跑有助于增强免疫力，减脂。请保持哦！'
    }
    if (this.sportDate.runRhythm > 160) {
      msg.swimRhythmmsg = '您的游泳心率偏高，请调整速度或时间'
    } else {
      msg.swimRhythmmsg = '您的游泳心率正常，慢跑有助于增强免疫力，减脂。请保持哦！'
    }
    msg.kal =
      parseFloat(this.sportDate.runDate) * 215 +
      parseFloat(this.sportDate.runDate) * 650 +
      parseFloat(this.sportDate.swimRhythmDate) * 800
    this.msg = msg
  },
  mounted () {
    const size = document.querySelectorAll('.el-progress-circle')
    size.forEach(item => {
      item.style.height = '50px'
      item.style.width = '50px'
    })
    const font = document.querySelectorAll('.el-progress__text')
    font.forEach(item => {
      item.style.fontSize = '12px'
    })
  }
}
</script>

<style scoped>
.el-card .el-button{
  position: absolute;
  bottom: 0px;
  right: 0px;
}
</style>
