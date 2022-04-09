<template>
   <el-card class="temmain">
    <el-card id="main"></el-card>
    <el-card class="msg">
      <el-descriptions title="血糖数据分析" column = 1>
        <el-descriptions-item label="血糖数据">
            <el-tag  v-for="(item,i) in sugdata.suger" :key="i">{{item}}mmol/L</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="血糖数据分析" v-for="(item,i) in msg.suger" :key="i">{{item}}</el-descriptions-item>
        <el-descriptions-item label="分析结果">{{msg.sugermsg}}</el-descriptions-item>
      </el-descriptions>
      <el-button type="primary" @click="$emit('back')">返回</el-button>
    </el-card>
  </el-card>
</template>
<script>
import * as echarts from 'echarts'
export default {
  props: {
    sugdata: {}
  },
  data () {
    return {
      msg: {}
    }
  },
  methods: {
    sugerdes () {
      const msg = {
        suger: [],
        sugermsg: ''
      }
      for (let i = 0; i < this.sugdata.suger.length; i++) {
        if (this.sugdata.suger[i] > 11) {
          msg.suger.push(`在第${i + 1}时间段，存在血糖偏高现象`)
        } else if (this.sugdata.suger[i] < 4) {
          msg.suger.push(`在第${i + 1}时间段血糖偏低`)
        }
      }
      if (msg.suger.length !== 0) {
        msg.sugermsg = '今天存在血糖波动。请合理饮食。'
      } else {
        msg.sugermsg = '今天血糖波动幅度不大。请保持合理饮食。'
      }
      this.msg = msg
    }
  },
  mounted () {
    var chartDom = document.getElementById('main')
    var myChart = echarts.init(chartDom)
    var option
    option = {
      title: {
        text: '血糖数据表',
        subtext: '数据分析已完成：'
      },
      xAxis: {
        type: 'category',
        data: ['早餐前', '餐后2h', '午餐前', '餐后2h', '晚餐前', '餐后2h']
      },
      yAxis: {
        type: 'value',
        min: 0,
        max: 10,
        interval: 2,
        axisLabel: {
          formatter: '{value} mmol/L'
        }
      },
      series: [
        {
          data: this.sugdata.suger,
          type: 'line',
          showBackground: true,
          backgroundStyle: {
            color: 'rgba(180, 180, 180, 0.2)'
          }
        }
      ]
    }
    option && myChart.setOption(option)
    this.sugerdes()
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
