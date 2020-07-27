<!-- 多个柱状-柱状图 -->
<template>
  <div id="doubleColumns"></div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component
export default class className extends Vue {
  private timmerOneAnim: any = null;
  getbzdzAreaChart() {
    var namedata = [
      "姑苏区",
      "虎丘区",
      "吴中区",
      "相城区",
      "吴江区",
      "工业园区",
      "常熟区",
      "昆山市",
      "张家港市",
      "太仓市",
    ];
    var areaChart = this.$echarts.init(
      document.getElementById("doubleColumns")
    );
    var option: any = {
      tooltip: {
        //提示框组件
        trigger: "axis",
        formatter: "{b}<br/>{a0}: {c0}<br/>{a1}: {c1}<br/>{a2}: {c2}",
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
          fontSize: 12,
        },
      },
      grid: {
        top: "15%",
        bottom: "10%",
        right: "5%",
        left: "5%",
        containLabel: true,
      },
      legend: {
        //图例组件，颜色和名字
        right: "35%",
        top: "2%",
        itemGap: 16,
        itemWidth: 18,
        itemHeight: 10,
        data: [
          {
            name: "村",
          },
          {
            name: "区",
          },
          {
            name: "街路巷",
          },
        ],
        textStyle: {
          color: "#a8aab0",
          fontStyle: "normal",
          fontFamily: "微软雅黑",
          fontSize: 12,
        },
      },
      xAxis: [
        {
          type: "category",
          data: namedata,
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
            //坐标轴轴线相关设置
            lineStyle: {
              color: "#fff",
              opacity: 0.2,
            },
          },
          splitLine: {
            //坐标轴在 grid 区域中的分隔线。
            show: false,
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
              color: "#EAEBF0",
            },
          },
        },
      ],
      series: [
        {
          name: "村",
          type: "bar",
          data: [10, 45, 30, 45, 15, 5, 62, 8, 60, 32, 60, 55, 45, 30, 15, 10],
          barWidth: 6,
          barGap: 0.5, //柱间距离
          itemStyle: {
            normal: {
              show: true,
              color: "#7A79FF",
              barBorderRadius: 50,
              borderWidth: 0,
            },
          },
        },
        {
          name: "区",
          type: "bar",
          data: [10, 15, 20, 45, 55, 32, 62, 21, 80, 62, 60, 55, 45, 30, 15, 7],
          barWidth: 6,
          barGap: 0.5, //柱间距离
          itemStyle: {
            normal: {
              show: true,
              color: "#58CFFF",
              barBorderRadius: 50,
              borderWidth: 0,
            },
          },
        },
        {
          name: "街路巷",
          type: "bar",
          data: [10, 15, 30, 45, 5, 60, 62, 10, 80, 21, 40, 25, 45, 30, 45, 8],
          barWidth: 6,
          barGap: 0.5, //柱间距离
          itemStyle: {
            normal: {
              show: true,
              color: "#333FFF",
              barBorderRadius: 50,
              borderWidth: 0,
            },
          },
        },
      ],
    };
    areaChart.setOption(option);
    // tooltip定时移动
    var count = 0;
    if (this.timmerOneAnim) {
      clearInterval(this.timmerOneAnim);
    }
    this.timmerOneAnim = setInterval(() => {
      areaChart.dispatchAction({
        type: "showTip",
        seriesIndex: 0,
        dataIndex: count % namedata.length,
      });
      count++;
    }, 5000);
  }
  mounted() {
    this.getbzdzAreaChart();
  }
}
</script>
<style lang="scss" scoped>
#doubleColumns{
  height: 100%;
}
</style>