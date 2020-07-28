<template>
  <div id="complexPie"></div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component
export default class complexPieChart extends Vue {
  getComplexPie() {
    let PieCharts: any = this.$echarts.init(
      document.getElementById("complexPie")
    );
    let articleOption: any = {
      tooltip: {
        trigger: "item",
        formatter: "{b} ({c})",
        textStyle: {
          color: "#fff",
          fontStyle: "normal",
          fontFamily: "微软雅黑",
          fontSize: 17,
        },
      },
      series: [
        {
          type: "sunburst",
          radius: ["80%", "50%"],
          z: 2,
          data: [
            {
              name: "甲类",
              value: 5486,
              children: [
                {
                  value: 5406,
                  name: "",
                  itemStyle: {
                    //parent的图形样式，不会被后代继承
                    color: {
                      type: "linear",
                      x: 0,
                      y: 0,
                      x2: 1,
                      y2: 1,
                      colorStops: [
                        {
                          offset: 0,
                          color: "#81C2FF", // 0% 处的颜色
                        },
                        {
                          offset: 1,
                          color: "#3090EA", // 100% 处的颜色
                        },
                      ],
                      global: false, // 缺省为 false
                    },
                  },
                  children: [
                    {
                      value: 586,
                      itemStyle: {
                        //parent的图形样式，不会被后代继承
                        color: {
                          type: "linear",
                          x: 0,
                          y: 0,
                          x2: 1,
                          y2: 1,
                          colorStops: [
                            {
                              offset: 0,
                              color: "#81C2FF", // 0% 处的颜色
                            },
                            {
                              offset: 1,
                              color: "#3090EA", // 100% 处的颜色
                            },
                          ],
                          global: false, // 缺省为 false
                        },
                      },
                    },
                  ],
                },
              ],
            },
            {
              name: "乙类",
              value: 5486,
              children: [
                {
                  value: 5485,
                  name: "",
                  itemStyle: {
                    //parent的图形样式，不会被后代继承
                    color: {
                      type: "linear",
                      x: 0,
                      y: 0,
                      x2: 1,
                      y2: 1,
                      colorStops: [
                        {
                          offset: 0,
                          color: "#81C2FF", // 0% 处的颜色
                        },
                        {
                          offset: 1,
                          color: "#3090EA", // 100% 处的颜色
                        },
                      ],
                      global: false, // 缺省为 false
                    },
                  },
                  children: [
                    {
                      value: 586,
                      itemStyle: {},
                    },
                  ],
                },
              ],
              itemStyle: {
                opacity: 0,
              },
            },
            {
              name: "丙类",
              value: 5486,
              children: [
                {
                  value: 486,
                  name: "",
                  itemStyle: {
                    //parent的图形样式，不会被后代继承
                    color: {
                      type: "linear",
                      x: 0,
                      y: 0,
                      x2: 1,
                      y2: 1,
                      colorStops: [
                        {
                          offset: 0,
                          color: "#81C2FF", // 0% 处的颜色
                        },
                        {
                          offset: 1,
                          color: "#3090EA", // 100% 处的颜色
                        },
                      ],
                      global: false, // 缺省为 false
                    },
                  },
                  children: [
                    {
                      value: 586,
                      itemStyle: {},
                    },
                  ],
                },
              ],
            },
          ],
          itemStyle: {
            //parent的图形样式，不会被后代继承
            color: "transparent",
            borderWidth: 5,
            borderColor: "transparent",
          },
          label: {
            //parent的图形样式，不会被后代继承
            show: false,
          },
        },
        // {
        //   type: "sunburst",
        //   radius: ["80%", "50%"],
        //   z: 1,
        //   data: [
        //     {
        //       name: "甲类",
        //       value: 5486,
        //       children: [
        //         {
        //           value: 5486,
        //           name: "",
        //           itemStyle: { color: "#33486C" },
        //           children: [
        //             {
        //               value: 5486,
        //               itemStyle: { color: "#33486C" },
        //               children: [
        //                 {
        //                   value: 5486,
        //                   itemStyle: { color: "#33486C" },
        //                 },
        //               ],
        //             },
        //           ],
        //         },
        //       ],
        //     },
        //     {
        //       name: "乙类",
        //       value: 5486,
        //       children: [
        //         {
        //           value: 5486,
        //           name: "",
        //           itemStyle: { color: "#33486C" },
        //           children: [
        //             {
        //               value: 5486,
        //               itemStyle: { color: "#33486C" },
        //               children: [
        //                 {
        //                   value: 5486,
        //                   itemStyle: { color: "#33486C" },
        //                 },
        //               ],
        //             },
        //           ],
        //         },
        //       ],
        //     },
        //     {
        //       name: "丙类",
        //       value: 5486,
        //       children: [
        //         {
        //           value: 5486,
        //           name: "",
        //           itemStyle: { color: "#33486C" },
        //           children: [
        //             {
        //               value: 5486,
        //               itemStyle: { color: "#33486C" },
        //               children: [
        //                 {
        //                   value: 5486,
        //                   itemStyle: { color: "#33486C" },
        //                 },
        //               ],
        //             },
        //           ],
        //         },
        //       ],
        //     },
        //   ],
        //   itemStyle: {
        //     //parent的图形样式，不会被后代继承
        //     color: "transparent",
        //     borderWidth: 20,
        //     borderColor: "transparent",
        //   },
        //   label: {
        //     //parent的图形样式，不会被后代继承
        //     show: false,
        //   },
        // },
      ],
    };
    PieCharts.setOption(articleOption);
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