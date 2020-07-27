<!-- 多个折线 -->
<template>
  <div ref="doubleLineChart" class="lines"></div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component
export default class className extends Vue {
  private timmerOneAnim: any = null;
  private commonColor1: any = "";
  private commonColor2: any = "";
  private areaOffset1: any = [];
  private areaOffset2: any = [];
  private imgEnter: any = require("../assets/sqEnter.svg");
  private imgLeave: any = require("../assets/sqLeave.svg");
  private namedata: any = ["00:00", "02:00", "04:00", "06:00", "08:00"];
  private enterPeopleData: any = ["200", "400", "300", "500", "800"];
  private leavePeopleData: any = ["400", "500", "200", "700", "200"];
  getBrokenLineChart() {
    this.commonColor1 = "#2F7CC8"; //折线颜色
    this.commonColor2 = "#3ECF8E";
    this.areaOffset1 = "#2F7CC8"; //填充色
    this.areaOffset2 = "rgba(62,207,142,0.5)";

    let option = {
      tooltip: {
        trigger: "axis",
        backgroundColor: "rgba(56,59,85,0.8)", //提示框背景色
        borderRadius: 2,
        axisPointer: {
          //坐标轴指示器
          transitionDuration: 2000,
          animation: true,
          animationDelay(idx: any) {
            return idx * 100;
          },
          animationDurationUpdate: 2000,
          //竖线
          lineStyle: {
            color: this.commonColor1,
            width: 2,
            opacity: 0,
          },
        },
        textStyle: {
          color: "#fff",
          fontSize: 18,
        },
        //   formatter: " {a0}: {c0} <br /> {a1}: {c1}"
      },
      legend: {
        show: true,
        right: "0",
        icon: "roundRect",
        selectedMode: true,
        //   top: "-6%",
        itemGap: 16,
        itemWidth: 18,
        itemHeight: 10,
        textStyle: {
          color: "rgba(237, 227, 227, 0.8)",
        },
      },
      grid: {
        show: false,
        top: "18%",
        bottom: "20%",
      },
      xAxis: [
        {
          show: true,
          boundaryGap: false, //从零开始
          axisLine: {
            show: false,
            onZero: true,
          },
          axisTick: {
            show: false,
            alignWithLabel: true,
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: "rgba(200, 200, 200, 0.5)",
            },
          },
          axisLabel: {
            interval: 0,
            textStyle: {
              color: "#6C7293",
              fontSize: 12,
            },
          },
          data: [],
        },
      ],
      yAxis: [
        {
          show: true,
          splitNumber: 4,
          type: "value",
          axisLabel: {
            show: true,
            textStyle: {
              color: "#6C7293",
              fontSize: 10,
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
              color: "rgba(200, 200, 200, 0.5)",
              width: 1,
            },
          },
        },
      ],
      series: [
        {
          name: "进入人数",
          type: "line",
          smooth: false,
          // symbol: "circle", //拐点设置为实心
          symbol: "image://" + this.imgEnter,
          showSymbol: false,
          symbolSize: [4, 8], //拐点大小
          lineStyle: {
            normal: {
              color: this.commonColor1, //折线的颜色
              width: 2, //折线粗细
              opacity: 1,
            },
          },
          label: {
            show: false,
          },
          itemStyle: {
            normal: {
              color: this.commonColor1, //拐点颜色
              borderColor: "#fff", //拐点边框颜色
              borderWidth: 2, //拐点边框大小
            },
          },
          areaStyle: {
            normal: {
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: this.commonColor1,
                },
                {
                  offset: 0.5,
                  color: this.areaOffset1,
                },
                {
                  offset: 1,
                  color: this.areaOffset1,
                },
              ]),
            },
          },
          data: [],
          tooltip: {
            formatter: " {a}: {c}<br />",
          },
        },
        {
          name: "离开人数",
          type: "line",
          smooth: false,
          // symbol: "circle", //拐点设置为实心
          symbol: "image://" + this.imgLeave,
          showSymbol: false,
          symbolSize: [4, 8], //拐点大小
          lineStyle: {
            normal: {
              color: this.commonColor2, //折线的颜色
              width: 2, //折线粗细
              opacity: 1,
            },
          },
          label: {
            show: false,
          },
          itemStyle: {
            normal: {
              color: this.commonColor2, //拐点颜色
              borderColor: "#fff", //拐点边框颜色
              borderWidth: 2, //拐点边框大小
            },
          },
          areaStyle: {
            normal: {
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: this.commonColor2,
                },
                {
                  offset: 1,
                  color: this.areaOffset2,
                },
              ]),
            },
          },
          data: [],
          tooltip: {
            formatter: " {a}: {c}",
          },
        },
      ],
    };
    var commonChart = this.$echarts.init(this.$refs.doubleLineChart);

    option.xAxis[0].data = this.namedata;
    option.series[0].data = this.enterPeopleData;
    option.series[1].data = this.leavePeopleData;

    commonChart.setOption(option);

    var count = 0;
    if (this.timmerOneAnim) {
      clearInterval(this.timmerOneAnim);
    }
    this.timmerOneAnim = setInterval(() => {
      commonChart.dispatchAction({
        type: "showTip",
        seriesIndex: 0,
        dataIndex: count % this.namedata.length,
      });
      count++;
    }, 4000);
  }

  mounted() {
    this.getBrokenLineChart();
  }
}
</script>
<style lang="scss" scoped>
.lines {
  height: 100%;
}
</style>