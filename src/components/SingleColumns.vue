<!-- 单个柱状-柱状图 -->
<template>
  <div ref="singleColumn"></div>
  <!-- <div id="singleColumn"></div> -->
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import echarts from 'echarts';
@Component
export default class SingleColumns extends Vue {
  timmerOne: any = null;
//   public $echarts: any;
  private namedata: any[] = [
    "宝山区",
    "静安区",
    "杨浦区",
    "松江区",
    "闵行区",
    "金山区",
    "徐汇区",
    "长宁区",
    "青浦区",
    "黄浦区"
  ];
  private option: object = {
    tooltip: {
      //提示框组件
      trigger: "axis",
      formatter: "{b}<br/>{a0}: {c0}",
      axisPointer: {
        type: "none",
        label: {
          backgroundColor: "#6a7985"
        }
      },
      textStyle: {
        color: "#fff",
        fontStyle: "normal",
        fontFamily: "微软雅黑",
        fontSize: 12
      }
    },
    grid: {
      top: "15%",
      bottom: "10%",
      right: "5%",
      left: "5%",
      containLabel: true
    },
    xAxis: [
      {
        type: "category",
        data: this.namedata,
        axisLabel: {
          //坐标轴刻度标签的相关设置。
          interval: 0, //设置为 1,表示『隔一个标签显示一个标签』
          textStyle: {
            color: "#6C7293",
            fontStyle: "normal",
            fontFamily: "微软雅黑",
            fontSize: 12
          },
          rotate: 0
        },
        axisTick: {
          //坐标轴刻度相关设置。
          show: false
        },
        axisLine: {
          //坐标轴轴线相关设置
          lineStyle: {
            color: "#fff",
            opacity: 0.2
          }
        },
        splitLine: {
          //坐标轴在 grid 区域中的分隔线。
          show: false
        }
      }
    ],
    yAxis: [
      {
        type: "value",
        splitNumber: 5,
        axisLabel: {
          textStyle: {
            color: "#a8aab0",
            fontStyle: "normal",
            fontFamily: "微软雅黑",
            fontSize: 12
          }
        },
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: "#EAEBF0"
          }
        }
      }
    ],
    series: [
      {
        name: "统计",
        type: "bar",
        data: [10, 45, 30, 45, 15, 5, 62, 8, 60, 32, 60, 55, 45, 30, 15, 10],
        barWidth: 8,
        barGap: 0.5, //柱间距离
        itemStyle: {
          normal: {
            show: true,
            color: "#7A79FF",
            barBorderRadius: 50,
            borderWidth: 0
          }
        },
        emphasis: {
          itemStyle: {
            color: "#333FFF"
          }
        }
      }
    ]
  };
  getsingleColumnChart() {
    var singleChart: any = echarts.init(
      this.$refs.singleColumn as HTMLCanvasElement
    );
    // const singleChart: any = this.$echarts.init(
    //   document.getElementById("singleColumn")
    // );
    singleChart.setOption(this.option);
    // tooltip定时移动
    var count = 0;
    if (this.timmerOne) {
      clearInterval(this.timmerOne);
    }
    this.timmerOne = setInterval(() => {
      singleChart.dispatchAction({
        type: "showTip",
        seriesIndex: 0,
        dataIndex: count % this.namedata.length
      });
      count++;
    }, 5000);
  }
  mounted() {
   
    this.getsingleColumnChart();
  }
}
</script>
<style>
</style>