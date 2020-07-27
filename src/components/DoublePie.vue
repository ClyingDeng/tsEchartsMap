<template>
  <div ref="PieRingChart" class="dPie"></div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { extend } from "vue/types/umd";
@Component
export default class PieRingChart extends Vue {
  private peopleData: any = [
    {
      name: "未成年",
      value: 123,
    },
    {
      name: "青年",
      value: 123,
    },
    {
      name: "中年",
      value: 123,
    },
    {
      name: "老人",
      value: 123,
    },
  ];
  private peopleNames: any = ["未成年", "青年", "中年", "老人"];
  private pieColor: any = ["#2D8EEA", "#3ECF8E", "#FFD365", "#EA932D"];
  private timmerPie: any = null;

  mounted() {
    this.getBrokenPieChart();
  }

  // 饼图
  getBrokenPieChart() {
    let commonPieChart = this.$echarts.init(
      this.$refs.PieRingChart as HTMLCanvasElement
    );
    let pieChartOption: any = {
      color: [], //环形颜色
      tooltip: {
        trigger: "item",
        formatter: "{b} ({d}%)",
        textStyle: {
          color: "#fff",
          fontStyle: "normal",
          fontFamily: "微软雅黑",
          fontSize: 17,
        },
      },

      legend: {
        show: false,
        orient: "horizontal",
        x: "center",
        y: "bottom",
        type: "scroll",
        // selectedMode: false,
        data: [],
      },
      series: [
        {
          data: [],
          name: [{ name: "outter" }],
          type: "pie", // 系列类型
          center: ["50%", "50%"], // 饼图的中心（圆心）坐标，数组的第一项是横坐标，第二项是纵坐标。[ default: ['50%', '50%'] ]
          radius: ["65%", "80%"], // 饼图的半径，数组的第一项是内半径，第二项是外半径。[ default: [0, '75%'] ]
          // hoverAnimation: true, // 是否开启 hover 在扇区上的放大动画效果。[ default: true ]
          avoidLabelOverlap: false,
          itemStyle: {},
          label: {
            // narmal:{}
            show: true,
            position: "outside",
            fontSize: "16",
            formatter: "{c} \n {b}",
            fontWeight: "normal",
            color: "#f1f1f1",
            // backgroundColor: {
            //   image: "../assets/circle.png"  //标签添加背景图片
            // },
            // width: "60px",
            // height: "80px",
            // padding: 15
          },
          emphasis: {
            // label: {
            show: false,
            position: "outside",
            textStyle: {
              // fontSize: "40",
              fontWeight: "bold",
              formatter: "{c} \n {b}",
            },
            // }
          },
          labelLine: {
            // 标签的视觉引导线样式,在 label 位置 设置为'outside'的时候会显示视觉引导线。
            normal: {
              show: true, // 是否显示视觉引导线。
              length: 15, // 在 label 位置 设置为'outside'的时候会显示视觉引导线。
              length2: 10, // 视觉引导项第二段的长度。
              lineStyle: {
                // 视觉引导线的样式
                // color: "#8F919D",
                width: 2,
                type: "solid",
              },
            },
          },
        },
        {
          data: [],
          name: [{ name: "inner" }],
          type: "pie", // 系列类型
          center: ["50%", "50%"], // 饼图的中心（圆心）坐标，数组的第一项是横坐标，第二项是纵坐标。[ default: ['50%', '50%'] ]
          radius: ["55%", "60%"], // 饼图的半径，数组的第一项是内半径，第二项是外半径。[ default: [0, '75%'] ]
          hoverAnimation: false, // 是否开启 hover 在扇区上的放大动画效果。[ default: true ]
          avoidLabelOverlap: false,
          itemStyle: {},
          label: {
            normal: {
              show: false,
              position: "center",
            },
          },
          labelLine: {
            // 标签的视觉引导线样式,在 label 位置 设置为'outside'的时候会显示视觉引导线。
            show: false,
          },
        },
      ],
    };
    pieChartOption.color = this.pieColor;
    pieChartOption.series[0].data = this.peopleData;
    pieChartOption.series[1].data = this.peopleData;
    pieChartOption.legend.data = this.peopleNames;
    commonPieChart.setOption(pieChartOption);

    let currentIndex = -1;
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
        dataIndex: currentIndex,
      });
      currentIndex = (currentIndex + 1) % dataLen;
      // 高亮当前图形
      commonPieChart.dispatchAction({
        type: "highlight",
        seriesIndex: 0,
        dataIndex: currentIndex,
      });
      // 显示 tooltip
      commonPieChart.dispatchAction({
        type: "showTip",
        seriesIndex: 0,
        dataIndex: currentIndex,
      });
    }, 3000);
  }
}
</script>
<style lang="scss" scoped>
.dPie {
  height: 100%;
}
</style>