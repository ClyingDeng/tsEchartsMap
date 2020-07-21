<template>
  <div ref="pieChart"></div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import echarts from "echarts";
@Component
export default class HelloWorld extends Vue {
  // @Prop() private msg!: string;
  private poiColor: any[] = [
    "#53ac98",
    "#81b31c",
    "#aad7cb",
    "#1d3467",
    "#983928"
  ];
  private poiData: any[] = [
    { name: "全文搜索引擎", value: "20000" },
    { name: "元搜索引擎", value: "20000" },
    { name: "垂直搜索引擎", value: "20000" },
    { name: "录搜索引擎", value: "20000" },
    { name: "其他", value: "20000" }
  ];
  private poiNames: any[] = [
    "全文搜索引擎",
    "元搜索引擎",
    "垂直搜索引擎",
    "录搜索引擎",
    "其他"
  ];
  timmerPie: any = null;
  getBrokenPieChart() {
    let commonPieChart = echarts.init(this.$refs.pieChart as HTMLCanvasElement);

    let pieChartOption: any = {
      color: [], //环形颜色
      tooltip: {
        trigger: "item",
        formatter: "{b}: {c} ({d}%)"
      },
      title: {
        zlevel: 0,
        text: "数据",
        // text: ["{name|全市POI数据}", "{value|" + 0 + "}"].join("\n"),
        rich: {
          value: {
            color: "#02d6d6",
            fontSize: 20,
            fontWeight: "bold",
            lineHeight: 20
          },
          name: {
            color: "#02d6d6",
            lineHeight: 20
          }
        },
        top: "38%",
        left: "49%",
        textAlign: "center",
        textStyle: {
          rich: {
            value: {
              color: "#4D4D4D",
              fontSize: 20,
              fontWeight: "bold",
              lineHeight: 20
            },
            name: {
              color: "#4D4D4D",
              fontWeight: "bold",
              lineHeight: 20
            }
          }
        }
      },
      legend: {
        orient: "horizontal",
        x: "center",
        y: "bottom",
        type: "scroll",
        // selectedMode: false,
        data: []
      },
      series: [
        {
          data: [],
          name: [],
          type: "pie", // 系列类型
          center: ["50%", "45%"], // 饼图的中心（圆心）坐标，数组的第一项是横坐标，第二项是纵坐标。[ default: ['50%', '50%'] ]
          radius: ["50%", "80%"], // 饼图的半径，数组的第一项是内半径，第二项是外半径。[ default: [0, '75%'] ]
          // hoverAnimation: true, // 是否开启 hover 在扇区上的放大动画效果。[ default: true ]
          avoidLabelOverlap: false,
          itemStyle: {},
          label: {
            normal: {
              show: false,
              position: "center"
            }
          },
          emphasis: {
            // label: {
            show: false,
            textStyle: {
              fontSize: "30",
              fontWeight: "bold",
              formatter: "{c} \n {b}"
            }
            // }
          },
          labelLine: {
            // 标签的视觉引导线样式,在 label 位置 设置为'outside'的时候会显示视觉引导线。
            show: false
          }
        }
      ]
    };
    pieChartOption.color = this.poiColor;
    pieChartOption.series[0].data = this.poiData;
    pieChartOption.legend.data = this.poiNames;
    commonPieChart.setOption(pieChartOption);

    let currentIndex: number = -1;
    // var count = 0;
    if (this.timmerPie) {
      clearInterval(this.timmerPie);
      currentIndex = -1;
    }
    var dataLen = pieChartOption.series[0].data.length;
    this.timmerPie = setInterval(() => {
      // 取消之前高亮的图形
      commonPieChart.dispatchAction({
        type: "downplay",
        seriesIndex: 0,
        dataIndex: currentIndex
      });
      currentIndex = (currentIndex + 1) % dataLen;
      // 高亮当前图形
      commonPieChart.dispatchAction({
        type: "highlight",
        seriesIndex: 0,
        dataIndex: currentIndex
      });
      // 显示 tooltip
      commonPieChart.dispatchAction({
        type: "showTip",
        seriesIndex: 0,
        dataIndex: currentIndex
      });
    }, 3000);
  }
  async mounted() {
    console.log("11");
    await this.$nextTick(() => {
      this.getBrokenPieChart();
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
