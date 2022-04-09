<template>
  <el-card class="temmain">
    <el-card id="main"></el-card>
    <el-card class="msg">
      <el-descriptions title="数据分析" column = 1>
        <el-descriptions-item label="血压数据">
          <el-tag v-for="(item, i) in presuredata.presure" :key="i"
            >{{ item }}mmHg</el-tag
          >
        </el-descriptions-item>
        <el-descriptions-item
          label="体温数据分析"
          v-for="(item, i) in msg.blood"
          :key="i"
          >{{ item }}</el-descriptions-item
        >
        <el-descriptions-item label="分析结果">{{
          msg.bloodmsg
        }}</el-descriptions-item>
      </el-descriptions>
      <el-button type="primary" @click="$emit('back')">返回</el-button>
    </el-card>
  </el-card>
</template>

<script>
import * as echarts from 'echarts'
export default {
  props: {
    presuredata: {}
  },
  data () {
    return {
      msg: {}
    }
  },
  methods: {
    presuredes () {
      const msg = {
        blood: [],
        bloodmsg: ''
      }
      for (let i = 0; i < this.presuredata.presure.length; i++) {
        if (this.presuredata.presure[i] > 140) {
          msg.blood.push(`在第${i + 1}时间段，血压偏高`)
        } else if (this.presuredata.presure[i] < 60) {
          msg.blood.push(`在第${i + 1}时间段，血压偏低`)
        }
      }
      if (msg.blood.length !== 0) {
        msg.bloodmsg = '今天存在血压偏高或偏低状态，请合理规划作息时间。'
      } else {
        msg.bloodmsg = '今天血压正常，请保持'
      }
      this.msg = msg
    }
  },
  mounted () {
    console.log(this.presuredata)
    var chartDom = document.getElementById('main')
    var myChart = echarts.init(chartDom)
    var option
    option = {
      title: {
        text: '血压数据表',
        subtext: '数据分析已完成：'
      },
      xAxis: {
        type: 'category',
        data: [
          '上午大压',
          '上午小压',
          '中午大压',
          '中午小压',
          '晚上大压',
          '晚上小压'
        ]
      },
      yAxis: {
        min: 30,
        max: 180,
        interval: 30,
        type: 'value',
        axisLabel: {
          formatter: '{value} mmHg'
        }
      },
      series: [
        {
          data: this.presuredata.presure,
          type: 'line',
          showBackground: true,
          backgroundStyle: {
            color: 'rgba(180, 180, 180, 0.2)'
          }
        }
      ]
    }
    option && myChart.setOption(option)
    this.presuredes()
  }
}
</script>

<style scoped>
.temmain {
  width: 100%;
  height: 850px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
#main {
  height: 400px;
  width: 1100px;
  margin: 0 auto;
}
.msg {
  width: 1300px;
  height: 300px !important;
  border-radius: 15px;
  margin: 20px auto;
  position: relative;
  margin-left: 200px;
}
.msg .el-button {
  position: absolute;
  bottom: 10px;
  right: 20px;
}
</style>
