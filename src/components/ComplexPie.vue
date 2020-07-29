<template>
  <div id="complexPie"></div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component
export default class complexPieChart extends Vue {
  private timmerOneAnim: any = null;
  getComplexPie() {
    let _this = this;
    let angle: number = 0;
    let PieCharts: any = this.$echarts.init(
      document.getElementById("complexPie")
    );
    let articleOption: any = {
      backgroundColor: "rgba(52,55,77,1)",
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/> {b}: {c}",
        textStyle: {
          color: "#fff",
          fontStyle: "normal",
          fontFamily: "微软雅黑",
          fontSize: 17,
        },
      },
      series: [
        {
          // silent: true,
          type: "sunburst",
          name: "种类",
          radius: ["70%", "50%"],
          z: 2,
          data: [
            {
              name: "总甲",
              value: 500,
              children: [
                {
                  name: "甲类",
                  value: 200,
                  children: [
                    {
                      name: "甲1类",
                      value: 100,
                    },
                  ],
                },
              ],
            },
            {
              name: "总乙",
              value: 500,
              children: [
                {
                  value: 500,
                  name: "乙类",
                  children: [{ name: "乙1类", value: 400 }],
                },
              ],
            },
            {
              name: "总丙",
              value: 500,
              children: [
                {
                  value: 400,
                  name: "丙类",
                  children: [
                    {
                      name: "丙1类",
                      value: 200,
                    },
                  ],
                },
              ],
            },
          ],
          itemStyle: {
            //parent的图形样式，不会被后代继承
            borderWidth: 0,
            borderColor: "rgba(52,55,77,1)",
          },
          label: {
            //parent的图形样式，不会被后代继承
            show: false,
            formatter: " {b} \n\n {c}",
          },
          levels: [
            {},
            {
              r0: "0",
              r: "40%",
              label: {
                show: true,
                rotate: 0,
                fontSize: 16,
                color: "#f1f1f1",
              },
              itemStyle: {
                color: "transparent",
                borderWidth: 0,
                borderColor: "rgba(52,55,77,1)",
              },
            },
            {
              r0: "52%",
              r: "58%",
              itemStyle: {
                color: "#2D8EEA",
              },
            },
            {
              r0: "60%",
              r: "70%",
              itemStyle: {
                color: {
                  type: "linear",
                  x: 0,
                  y: 0,
                  x2: 1,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: "#82C2FF", // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "#2D8EEA", // 100% 处的颜色
                    },
                  ],
                  global: false, // 缺省为 false
                },
              },
            },
          ],
        },
        {
          silent: true,
          type: "sunburst",
          // radius: ["80%", "50%"],
          z: 1,
          data: [
            {
              name: "甲类",
              value: 500,
              children: [
                {
                  value: 500,
                  name: "",
                  children: [
                    {
                      value: 500,
                    },
                  ],
                },
              ],
            },
            {
              name: "乙类",
              value: 500,
              children: [
                {
                  value: 500,
                  name: "",
                  children: [
                    {
                      value: 500,
                    },
                  ],
                },
              ],
            },
            {
              name: "丙类",
              value: 500,
              children: [
                {
                  value: 500,
                  name: "",
                  children: [
                    {
                      value: 500,
                    },
                  ],
                },
              ],
            },
          ],
          itemStyle: {
            //parent的图形样式，不会被后代继承
            borderWidth: 5,
            borderColor: "rgba(52,55,77,1)",
          },
          label: {
            //parent的图形样式，不会被后代继承
            show: false,
          },
          levels: [
            {},
            {
              itemStyle: {
                color: "transparent",
              },
            },
            { r0: "52%", r: "59%", itemStyle: { color: "#33486C" } },
            {
              r0: "59%",
              r: "71%",
              itemStyle: {
                color: "#33486C",
              },
            },
          ],
        },
        //内部短线
        {
          name: "",
          silent: true,
          type: "gauge",
          radius: "58%",
          center: ["50%", "50%"],
          z: 3,
          startAngle: 0,
          endAngle: 359.9,
          splitNumber: 24,
          hoverAnimation: true,
          axisTick: {
            show: false,
          },
          splitLine: {
            length: "26%",
            lineStyle: {
              width: 3,
              color: "rgba(52,55,77,1)",
            },
          },
          axisLabel: {
            show: false,
          },
          pointer: {
            show: false,
          },
          axisLine: {
            lineStyle: {
              opacity: 0,
            },
          },
          detail: {
            show: false,
          },
          data: [
            {
              value: 0,
              name: "",
            },
          ],
        },
        //外部三分线
        {
          name: "",
          silent: true,
          type: "gauge",
          radius: "70%",
          center: ["50%", "50%"],
          z: 3,
          startAngle: 90,
          endAngle: -269.9,
          splitNumber: 3,
          clockwise: true,
          hoverAnimation: true,
          axisTick: {
            show: false,
          },
          splitLine: {
            length: "80%",
            lineStyle: {
              width: 3,
              color: "#2D8EEA",
            },
          },
          axisLabel: {
            show: false,
          },
          pointer: {
            show: false,
          },
          axisLine: {
            lineStyle: {
              opacity: 0,
            },
          },
          detail: {
            show: false,
          },
          data: [
            {
              value: 0,
              name: "",
            },
          ],
          itemStyle: {
            borderWidth: 5,
            borderColor: "rgba(52,55,77,1)",
          },
        },
        //外环旋转
        //线
        {
          name: "ring5",
          type: "custom",
          coordinateSystem: "none",
          renderItem: function (params: any, api: any) {
            return {
              type: "arc",
              shape: {
                cx: api.getWidth() / 2,
                cy: api.getHeight() / 2,
                r: (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.85,
                startAngle: ((90 + -angle) * Math.PI) / 180,
                endAngle: ((220 + -angle) * Math.PI) / 180,
              },
              style: {
                stroke: "#2D8EEA",
                fill: "transparent",
                lineWidth: 1.5,
              },
              silent: true,
            };
          },
          data: [0],
        },
        //点
        {
          name: "ring5",
          type: "custom",
          coordinateSystem: "none",
          renderItem: function (params: any, api: any) {
            let x0 = api.getWidth() / 2;
            let y0 = api.getHeight() / 2;
            let r = (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.85;
            let point = _this.getCirlPoint(x0, y0, r, 90 + -angle);
            return {
              type: "circle",
              shape: {
                cx: point.x,
                cy: point.y,
                r: 4,
              },
              style: {
                stroke: "#2D8EEA",
                fill: "#2D8EEA",
              },
              silent: true,
            };
          },
          data: [0],
        },
        //线
        {
          name: "ring5",
          type: "custom",
          coordinateSystem: "none",
          renderItem: function (params: any, api: any) {
            return {
              type: "arc",
              shape: {
                cx: api.getWidth() / 2,
                cy: api.getHeight() / 2,
                r: (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.85,
                startAngle: ((270 + -angle) * Math.PI) / 180,
                endAngle: ((40 + -angle) * Math.PI) / 180,
              },
              style: {
                stroke: "#2D8EEA",
                fill: "transparent",
                lineWidth: 1.5,
              },
              silent: true,
            };
          },
          data: [0],
        },
        //点
        {
          name: "ring5",
          type: "custom",
          coordinateSystem: "none",
          renderItem: function (params: any, api: any) {
            let x0 = api.getWidth() / 2;
            let y0 = api.getHeight() / 2;
            let r = (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.85;
            let point = _this.getCirlPoint(x0, y0, r, 270 + -angle);
            return {
              type: "circle",
              shape: {
                cx: point.x,
                cy: point.y,
                r: 4,
              },
              style: {
                stroke: "#2D8EEA",
                fill: "#2D8EEA",
              },
              silent: true,
            };
          },
          data: [0],
        },
        //内环旋转
        //线
        {
          name: "ring5",
          type: "custom",
          coordinateSystem: "none",
          renderItem: function (params: any, api: any) {
            return {
              type: "arc",
              shape: {
                cx: api.getWidth() / 2,
                cy: api.getHeight() / 2,
                r: (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.8,
                startAngle: ((0 + angle) * Math.PI) / 180,
                endAngle: ((90 + angle) * Math.PI) / 180,
              },
              style: {
                stroke: "#2D8EEA",
                fill: "transparent",
                lineWidth: 1.5,
              },
              silent: true,
            };
          },
          data: [0],
        },

        //线
        {
          name: "ring5",
          type: "custom",
          coordinateSystem: "none",
          renderItem: function (params: any, api: any) {
            return {
              type: "arc",
              shape: {
                cx: api.getWidth() / 2,
                cy: api.getHeight() / 2,
                r: (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.8,
                startAngle: ((180 + angle) * Math.PI) / 180,
                endAngle: ((270 + angle) * Math.PI) / 180,
              },
              style: {
                stroke: "#2D8EEA",
                fill: "transparent",
                lineWidth: 1.5,
              },
              silent: true,
            };
          },
          data: [0],
        },
      ],
    };
    if (this.timmerOneAnim) {
      clearInterval(this.timmerOneAnim);
    }
    this.timmerOneAnim = setInterval(() => {
      angle = angle + 3;
      PieCharts.setOption(articleOption);
    }, 100);

    // draw(){
    //     angle = angle+3
    //     myChart.setOption(option, true)
    // }
  }
  //获取圆上面某点的坐标(x0,y0表示坐标，r半径，angle角度)
  getCirlPoint(x0: any, y0: any, r: any, angle: any) {
    let x1 = x0 + r * Math.cos((angle * Math.PI) / 180);
    let y1 = y0 + r * Math.sin((angle * Math.PI) / 180);
    return {
      x: x1,
      y: y1,
    };
  }
  mounted() {
    this.$nextTick(() => {
      this.getComplexPie();
    });
  }
}
</script>
<style lang="scss" scoped>
#complexPie {
  height: 100%;
}
</style>