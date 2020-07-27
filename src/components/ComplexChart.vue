<template>
  <div id="complexChart"></div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component
export default class complexChart extends Vue {
  private img: any = require("../assets/pillar.svg");
  private timmerOneAnim: any = null;
  private timeData: any = ["00:00", "02:00", "04:00", "06:00", "08:00"];
  private symbolData: any = [
    { value: "123" },
    { value: "231" },
    { value: "345" },
    { value: "654" },
    { value: "131" },
  ];
  private cJData: any = ["223", "631", "445", "254", "534"];
  getComplexColumn() {
    let complexChart = this.$echarts.init(
      document.getElementById("complexChart")
    );
    let option: any = {
      tooltip: {
        //提示框组件
        trigger: "axis",
        // formatter: "{b}<br/>{a0}: {c0}<br/>{a1}: {c1}<br/>{a2}: {c2}",
        axisPointer: {
          type: "shadow",
          label: {
            backgroundColor: "#6a7985",
          },
        },
        textStyle: {
          color: "#fff",
          fontStyle: "normal",
          fontFamily: "微软雅黑",
          fontSize: 17,
        },
      },
      grid: {
        top: "10%",
        bottom: "5%",
        right: "5%",
        left: "5%",
        containLabel: true,
      },
      xAxis: [
        {
          type: "category",
          data: [],
          axisLabel: {
            //坐标轴刻度标签的相关设置。
            interval: 0, //设置为 1,表示『隔一个标签显示一个标签』
            textStyle: {
              color: "#6C7293",
              fontStyle: "normal",
              fontFamily: "微软雅黑",
              fontSize: 12,
            },
            rotate: 0,
          },
          axisTick: {
            //坐标轴刻度相关设置。
            show: false,
          },
          axisLine: {
            onZero: true,
            //坐标轴轴线相关设置
            lineStyle: {
              color: "#fff",
              opacity: 0.2,
            },
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: "#9AACCE",
            },
          },
        },
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
              fontSize: 12,
            },
          },
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: "#9AACCE",
            },
          },
        },
      ],
      series: [
        {
          type: "pictorialBar",
          name: "总数1",
          data: [],
          symbol: "image://" + this.img,
          symbolSize: ["70%", "105%"],
          itemStyle: {
            normal: {
              show: true,
              color: "rgba(45, 142, 234, 0.8)",
              borderWidth: 0,
            },
          },
        },
        {
          name: "总数2",
          type: "line",
          smooth: true,
          showSymbol: false,
          symbolSize: 4, //拐点大小
          lineStyle: {
            normal: {
              color: "#3ECF8E", //折线的颜色
              width: 2, //折线粗细
              opacity: 1,
            },
          },
          label: {
            show: false,
          },
          itemStyle: {
            normal: {
              color: "rgba(62,207,142, 0.8)", //拐点颜色
              borderColor: "rgba(62,207,142, 0.8)", //拐点边框颜色
              borderWidth: 2, //拐点边框大小
            },
          },
          areaStyle: {
            color: "rgba(62,207,142, 0)",
          },
          data: [],
          tooltip: {
            formatter: " {a}: {c}<br />",
          },
        },
      ],
    };

    option.xAxis[0].data = this.timeData;
    option.series[0].data = this.symbolData;
    option.series[1].data = this.cJData;

    complexChart.setOption(option);
    // tooltip定时移动
    var count = 0;
    if (this.timmerOneAnim) {
      clearInterval(this.timmerOneAnim);
    }
    this.timmerOneAnim = setInterval(() => {
      complexChart.dispatchAction({
        type: "showTip",
        seriesIndex: 0,
        dataIndex: count % this.timeData.length,
      });
      count++;
    }, 3500);
  }
  mounted() {
    console.log(this.cJData);
    this.getComplexColumn();
  }
}
</script>
<style lang="scss" scoped>
#complexChart {
  height: 100%;
}
</style>