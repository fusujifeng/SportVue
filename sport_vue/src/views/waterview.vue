<template>
    <el-card class="temmain">
    <el-card id="main"></el-card>
    <el-card class="msg">
      <el-descriptions title="数据分析" column = 1 >
        <el-descriptions-item label="体温数据">
          <el-tag v-for="(item, i) in waterdata.water" :key="i"
            >{{ item }}ml</el-tag
          >
        </el-descriptions-item>
        <el-descriptions-item label="单次饮水进度">
            <el-progress type="circle" :percentage="parseFloat((waterinfo.one/500).toFixed(2))*100"></el-progress>
            <el-progress type="circle" :percentage="parseFloat((waterinfo.middle/375).toFixed(2))*100"></el-progress>
            <el-progress type="circle" :percentage="parseFloat((waterinfo.last/375).toFixed(2))*100"></el-progress>
            </el-descriptions-item>
        <el-descriptions-item label="饮水进度">
            <template>
            <el-progress type="circle" :percentage="parseFloat((msg.num/1250).toFixed(2))*100"></el-progress>
            </template>
            </el-descriptions-item>
        <el-descriptions-item label="饮水分析结果">{{msg.watermsg}}</el-descriptions-item>
      </el-descriptions>
      <el-button type="primary" @click="$emit('back')">返回</el-button>
    </el-card>
  </el-card>
</template>

<script>
import * as echarts from 'echarts'
export default {
  props: {
    waterdata: {}
  },
  data () {
    return {
      msg: {},
      waterinfo: {
        one: parseInt(this.waterdata.water[0]) + parseInt(this.waterdata.water[1]),
        middle: parseInt(this.waterdata.water[1]) + parseInt(this.waterdata.water[2]),
        last: parseInt(this.waterdata.water[3]) + parseInt(this.waterdata.water[4])
      }
    }
  },
  methods: {
    waterdes () {
      const msg = {
        num: 0,
        watermsg: ''
      }
      for (let i = 0; i < this.waterdata.water.length; i++) {
        msg.num += parseInt(this.waterdata.water[i])
      }
      if (msg.num < 1250) {
        msg.watermsg = '今天饮水量不足，请保证每天充足饮水'
      } else {
        msg.watermsg = '今天饮水量充足，请观察背景色曲线，如果成下降趋势，请调整饮水时间。'
      }
      this.msg = msg
    }
  },
  mounted () {
    console.log(this.waterinfo)
    var chartDom = document.getElementById('main')
    var myChart = echarts.init(chartDom)
    var option
    option = {
      title: {
        text: '饮水量分析图',
        subtext: '数据分析已完成：'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross'
        }
      },
      toolbox: {
        show: true,
        feature: {
          saveAsImage: {}
        }
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        // prettier-ignore
        data: ['6：00~8：00饮水量', '8：00~11：00饮水量', '12：00~14：00饮水量', '14：00~118：00饮水量', '18：00~20：00饮水量']
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          formatter: '{value} ml'
        },
        axisPointer: {
          snap: true
        }
      },
      visualMap: {
        show: false,
        dimension: 0,
        pieces: [
          {
            lte: 6,
            color: 'lightskyblue'
          },
          {
            gt: 6,
            lte: 8,
            color: 'red'
          },
          {
            gt: 8,
            lte: 14,
            color: 'lightskyblue'
          },
          {
            gt: 14,
            lte: 17,
            color: 'red'
          },
          {
            gt: 17,
            color: 'lightskyblue'
          }
        ]
      },
      series: [
        {
          name: '饮水量',
          type: 'line',
          smooth: true,
          // prettier-ignore
          data: this.waterdata.water,
          markArea: {
            itemStyle: {
              color: 'rgba(255, 173, 177, 0.4)'
            },
            data: [
              [
                {
                  name: '早上饮水阈值',
                  xAxis: '6：00~8：00饮水量'
                },
                {
                  xAxis: '8：00~11：00饮水量'
                }
              ]
            ]
          }
        }
      ]
    }
    option && myChart.setOption(option)
    this.waterdes()
  }
}
</script>

<style scoped>
.temmain {
  width: 100%;
  height: 1200px;
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
  height: 500px !important;
  border-radius: 15px;
  margin: 20px auto;
  position: relative;
  overflow-y: scroll;
}
.msg .el-button {
  position: absolute;
  bottom: 10px;
  right: 20px;
}
</style>
