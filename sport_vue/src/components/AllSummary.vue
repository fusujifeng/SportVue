

<template>
  <div class="wrapp_box">
    <div class="show">
      <el-card id="main1"></el-card>
      <el-card id="main2"></el-card>
      <el-card id="main3"></el-card>
    </div>
    <div class="msg">
      <el-card
        ><el-descriptions title="数据分析" border column=1>
          <el-descriptions-item label="体温数据分析" v-for="item in msg.tem" :key="item"
            >{{item}}</el-descriptions-item
          >
          <el-descriptions-item label="体温分析结果">{{msg.temmsg}}</el-descriptions-item>
          <el-descriptions-item label="血糖数据分析" v-for="item in msg.suger" :key="item"
            >{{item}}</el-descriptions-item
          >
           <el-descriptions-item label="血糖分析结果">{{msg.sugermsg}}</el-descriptions-item>
            <el-descriptions-item label="血压数据分析" v-for="item in msg.blood" :key="item"
            >{{item}}</el-descriptions-item
          >
          <el-descriptions-item label="血压分析结果">{{msg.bloodmsg}}</el-descriptions-item>
          <el-descriptions-item Label="饮水进度"><el-progress type="circle" :percentage="parseFloat((msg.num/2200).toFixed(2))*100"></el-progress></el-descriptions-item>
          <el-descriptions-item label="饮水分析结果">{{msg.watermsg}}</el-descriptions-item>
        </el-descriptions>
      </el-card>
      <el-button type="primary" @click="returns">返回</el-button>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  props: {
    // 获取父级传过来的值
    allDate: {}
  },
  data () {
    return {
      msg: {}
    }
  },
  mounted () {
    // 调用
    this.opetions1()
    this.opetions2()
    this.opetions3()
    this.analyse()
  },
  methods: {
    // 对数据进行封装
    opetions1 () {
      var chartDom = document.getElementById('main1')
      var myChart = echarts.init(chartDom)
      var option
      option = {
        title: {
          text: '体温数据表',
          subtext: '数据分析已完成：'
        },
        xAxis: {
          type: 'category',
          data: ['8:00', '11:00', '13:00', '16:00', '20:00']
        },
        yAxis: {
          type: 'value',
          min: 35,
          max: 40,
          interval: 1,
          axisLabel: {
            formatter: '{value} ℃'
          }
        },
        series: [
          {
            data: this.allDate.temperature,
            type: 'bar',
            smooth: true
          }
        ]
      }
      option && myChart.setOption(option)
    },
    opetions2 () {
      var chartDom = document.getElementById('main2')
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
            data: this.allDate.bloodSuger,
            type: 'line',
            showBackground: true,
            backgroundStyle: {
              color: 'rgba(180, 180, 180, 0.2)'
            }
          }
        ]
      }

      option && myChart.setOption(option)
    },
    opetions3 () {
      var chartDom = document.getElementById('main3')
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
          data: ['7：00~9：00饮水量', '8：00~12：00饮水量', '12：00~4：00饮水量', '14：00~16：00饮水量', '16：00~20：00饮水量']
        },
        yAxis: {
          type: 'value',
          min: 0,
          max: 600,
          interval: 500,
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
            data: this.allDate.water,
            markArea: {
              itemStyle: {
                color: 'rgba(255, 173, 177, 0.4)'
              },
              data: [
                [
                  {
                    name: '早上饮水阈值',
                    xAxis: '7：00~9：00饮水量'
                  },
                  {
                    xAxis: '8：00~12：00饮水量'
                  }
                ]
              ]
            }
          }
        ]
      }
      option && myChart.setOption(option)
    },
    // 子组件回应父组件
    returns () {
      this.$emit('return')
    },
    // 数据分析函数
    analyse () {
      const msg = {
        tem: [],
        temmsg: '',
        suger: [],
        sugermsg: '',
        num: 0,
        watermsg: '',
        blood: [],
        bloodmsg: ''
      }
      for (let i = 0; i < this.allDate.temperature.length; i++) {
        if (this.allDate.temperature[i] > 37) {
          msg.tem.push(`在第${i + 1}时间段，存在体温偏高现象`)
        } else if (this.allDate.temperature[i] < 36) {
          msg.tem.push(`在第${i + 1}时间段体温偏低`)
        }
      }
      if (msg.tem.length !== 0) {
        msg.temmsg = '今天存在体温偏高或偏低现象，如身体不适，请及时就医！'
      } else {
        msg.temmsg = '体温正常，请保持心情愉悦，加强锻炼！'
      }
      for (let i = 0; i < this.allDate.bloodSuger.length; i++) {
        if (this.allDate.bloodSuger[i] > 11) {
          msg.suger.push(`在第${i + 1}时间段，存在血糖偏高现象`)
        } else if (this.allDate.bloodSuger[i] < 4) {
          msg.suger.push(`在第${i + 1}时间段血糖偏低`)
        }
      }
      if (msg.suger.length !== 0) {
        msg.sugermsg = '今天存在血糖波动。请合理饮食。'
      } else {
        msg.sugermsg = '今天血糖波动幅度不大。请保持合理饮食。'
      }
      let num = 0
      for (let i = 0; i < this.allDate.water.length; i++) {
        num += parseInt(this.allDate.water[i])
      }
      msg.num = num
      if (num <= 2200) {
        msg.watermsg = '今天饮水量不足，请保证每天充足饮水'
      } else {
        msg.watermsg = '今天饮水量充足，请观察背景色曲线，如果成下降趋势，请调整饮水时间。'
      }
      for (let i = 0; i < this.allDate.bloodPressure.length; i++) {
        if (this.allDate.bloodPressure[i] > 140) {
          msg.blood.push(`在第${i + 1}时间段，血压偏高`)
        }
      }
      if (msg.blood.length !== 0) {
        msg.bloodmsg = '今天存在血压偏高状态，请合理规划作息时间。'
      } else {
        msg.bloodmsg = '今天血压正常，请保持'
      }
      console.log(msg)
      this.msg = msg
    }
  }
}
</script>

<style scoped>
.wrapp_box {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
}
.show {
  width: 1000px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.show .el-card {
  height: 300px;
  margin: 20px 10px;
  border-radius: 15px;
}
.msg {
  width:600px;
  height: 100%;
  margin-right: 40px;
  position: relative;
  margin-left: 50px;
}
.msg .el-card{
    width: 100%;
}
.msg .el-button {
  position: absolute;
  bottom: 0px;
  right: 0px;
}
</style>
