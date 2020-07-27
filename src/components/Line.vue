<!-- 动态折线 -->
<template>
  <div ref="brokeLineChart"></div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component
export default class brokeLineChart extends Vue {
  private commonColor: String = "";
  private areaOffset: String = "";
  private timmerOneAnim: any = null;
  getBrokenLineChart() {
    var commonChart = this.$echarts.init(
      this.$refs.brokeLineChart as HTMLCanvasElement
    );

    this.commonColor = "#333FFF";
    this.areaOffset = "#333fff8c";
    let paddingColor: any[] = [
      {
        offset: 0,
        color: this.commonColor,
      },
      {
        offset: 0.5,
        color: this.areaOffset,
      },
      {
        offset: 1,
        color: "#ffe",
      },
    ];
    let namedata: any[] = [
      "1月",
      "2月",
      "3月",
      "4月",
      "5月",
      "6月",
      "7月",
      "8月",
      "9月",
      "10月",
      "11月",
      "12月",
    ];
    let valdata: any[] = [
      "5",
      "12",
      "3",
      "30",
      "20",
      "25",
      "30",
      "35",
      "40",
      "45",
      "60",
      "65",
    ];
    let option: any = {
      tooltip: {
        trigger: "axis",
        backgroundColor: this.commonColor,
        borderRadius: 2,
        axisPointer: {
          //坐标轴指示器
          transitionDuration: 2000,
          animation: true,
          animationDelay: "linear",
          animationDurationUpdate: 2000,
          lineStyle: {
            color: this.commonColor,
            width: 2,
            opacity: 1,
          },
        },
        textStyle: {
          color: "#fff",
          fontSize: 14,
        },
        formatter: "{b} <br/>{a}: {c}",
      },
      legend: {
        show: false,
      },
      grid: {
        top: "5%",
        bottom: "20%",
        right: "5%",
        // left:'5%'
      },
      xAxis: [
        {
          show: true,
          offset: 20,
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            interval: 0,
            textStyle: {
              color: "#6C7293",
              fontSize: 12,
            },
          },
          data: namedata,
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
              color: "#EAEBF0",
              width: 1,
            },
          },
        },
      ],
      series: [
        {
          name: "统计",
          type: "line",
          smooth: true,
          symbol: "circle", //拐点设置为实心
          showSymbol: false,
          symbolSize: 4, //拐点大小
          lineStyle: {
            normal: {
              color: this.commonColor, //折线的颜色
              width: 4, //折线粗细
              opacity: 1,
            },
          },
          label: {
            show: false,
          },
          itemStyle: {
            normal: {
              color: this.commonColor, //拐点颜色
              borderColor: "#fff", //拐点边框颜色
              borderWidth: 2, //拐点边框大小
            },
          },
          areaStyle: {
            normal: {
              color: new this.$echarts.graphic.LinearGradient(
                0,
                0,
                0,
                1,
                paddingColor
              ),
            },
          },
          data: valdata,
        },
      ],
    };
    commonChart.setOption(option);
    var count = 0;
    if (this.timmerOneAnim) {
      clearInterval(this.timmerOneAnim);
    }
    this.timmerOneAnim = setInterval(() => {
      commonChart.dispatchAction({
        type: "showTip",
        seriesIndex: 0,
        dataIndex: count % namedata.length,
      });
      count++;
    }, 5000);
  }
  mounted() {
    this.getBrokenLineChart();
  }
}
</script>