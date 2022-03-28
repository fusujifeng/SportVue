<template>
  <el-card class="temmain">
    <el-card id="main"></el-card>
    <el-card class="msg">
      <el-descriptions title="数据分析" column = 1>
        <el-descriptions-item label="体温数据">
            <el-tag  v-for="(item,i) in temdata.tempure" :key="i">{{item}}℃</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="体温数据分析" v-for="(item,i) in msg.tem" :key="i">{{item}}</el-descriptions-item>
        <el-descriptions-item label="分析结果">{{msg.temmsg}}</el-descriptions-item>
      </el-descriptions>
      <el-button type="primary" @click="$emit('back')">返回</el-button>
    </el-card>
  </el-card>
</template>

<script>
import * as echarts from 'echarts'
export default {
  props: {
    temdata: {}
  },
  data () {
    return {
      msg: {}
    }
  },
  mounted () {
    var chartDom = document.getElementById('main')
    var myChart = echarts.init(chartDom)
    var option
    option = {
      title: {
        text: '体温数据表',
        subtext: '数据分析已完成：'
      },
      xAxis: {
        type: 'category',
        data: ['8:00', '11:00', '12:00', '14:00', '18:00', '20:00']
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          formatter: '{value} ℃'
        }
      },
      series: [
        {
          data: this.temdata.tempure,
          type: 'bar',
          smooth: true
        }
      ]
    }
    option && myChart.setOption(option)
    this.desmsg()
  },
  methods: {
    desmsg () {
      const msg = {
        tem: [],
        temmsg: ''
      }
      for (let i = 0; i < this.temdata.tempure.length; i++) {
        if (this.temdata.tempure[i] > 37) {
          msg.tem.push(`在第${i + 1}时间段，存在体温偏高现象`)
        } else if (this.temdata.tempure[i] < 36) {
          msg.tem.push(`在第${i + 1}时间段体温偏低`)
        }
      }
      if (msg.tem.length !== 0) {
        msg.temmsg = '今天存在体温偏高或偏低现象，如身体不适，请及时就医！'
      } else {
        msg.temmsg = '体温正常，请保持心情愉悦，加强锻炼！'
      }
      this.msg = msg
      console.log(this.msg)
    }
  }
}
</script>

<style scoped>
.temmain {
  width: 100%;
  min-height: 850px;
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
  height: 100%;
  border-radius: 15px;
  margin: 20px auto;
  position: relative;
}
.msg .el-button {
  position: absolute;
  bottom: 10px;
  right: 20px;
}
</style>
