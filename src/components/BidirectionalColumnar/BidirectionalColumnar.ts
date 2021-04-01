import { Component, Vue } from 'vue-property-decorator';
import $echarts from 'echarts';
@Component
export default class BidirectionalColumnar extends Vue {
    private xData = ['80+', '70-79', '60-69', '50-59', '40-49', '30-39', '20-29', '10-19', '0-9'];
    private manData = [3, 20, 62, 34, 55, 65, 34, 65, 33];
    private womanData = [11, 38, 23, 39, 39, 66, 39, 66, 79];
    private fontSize: number = 14;
    private labelFontSize: number = 10;
    private timmerBidir: any;
    private timmer: any;
    private mounted() {
        let screenWidth = document.body.clientWidth;
        if (screenWidth >= 3142) {
            this.fontSize = 28;
            this.labelFontSize = 20;
        } else if (screenWidth >= 1571) {
            this.fontSize = 14;
            // this.labelFontSize = 14;
        } else {
            this.fontSize = 12;
        }
        this.$nextTick(() => {
            this.getBidirectionalColumnar();
        });
    }
    private getBidirectionalColumnar() {
        let bidirChart = $echarts.init(document.getElementById('bidirectionalcolumnar') as HTMLCanvasElement);
        let option: any = {
            tooltip: {
                show: true,
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow',
                },
                textStyle: {
                    fontSize: this.fontSize,
                },
            },
            legend: {
                // top: '5%',
                right: '5%',
                itemWidth: this.fontSize,
                itemHeight: 8,
                // itemGap: 343,
                icon: 'horizontal',
                textStyle: {
                    color: '#ffffff',
                    fontSize: this.fontSize,
                },
            },
            grid: [{
                show: false,
                left: '2%',
                top: '10%',
                bottom: '8%',
                width: '39%',

            }, {
                show: false,
                left: '50%',
                top: '10%',
                bottom: '8%',
                width: '0%',
            }, {
                show: false,
                right: '2%',
                top: '10%',
                bottom: '8%',
                width: '39%',
            }],
            xAxis: [{
                type: 'value',
                inverse: true,
                axisLine: {
                    show: false,
                },
                axisTick: {
                    show: false,
                },
                position: 'top',
                axisLabel: {
                    show: false,
                },
                splitLine: {
                    show: false,
                },
            }, {
                gridIndex: 1,
                show: false,
            }, {
                gridIndex: 2,
                axisLine: {
                    show: false,
                },
                axisTick: {
                    show: false,
                },
                position: 'top',
                axisLabel: {
                    show: false,
                },
                splitLine: {
                    show: false,
                },
            }],
            yAxis: [{
                // type: 'category',
                // inverse: true,
                position: 'right',
                axisLine: {
                    show: false,
                },
                axisTick: {
                    show: false,
                },
                axisLabel: {
                    show: false,
                },
                data: this.xData,
            }, {
                gridIndex: 1,
                // type: 'category',
                inverse: true,
                position: 'center',
                axisLine: {
                    show: false,
                },
                axisTick: {
                    show: false,
                },
                axisLabel: {
                    show: true,
                    padding: [0, 0, 0, 15],
                    textStyle: {
                        color: '#ffffff',
                        fontSize: this.fontSize,
                    },
                    align: 'center',
                },
                data: this.xData.map((value) => {
                    return {
                        value,
                        textStyle: {
                            align: 'center',
                        },
                    };
                }),
            }, {
                gridIndex: 2,
                // type: 'category',
                inverse: true,
                position: 'left',
                axisLine: {
                    show: false,
                },
                axisTick: {
                    show: false,
                },
                axisLabel: {
                    show: false,
                },
                data: this.xData,
            }],
            series: [
                {
                    name: '男',
                    type: 'bar',
                    gridIndex: 0,
                    // showBackground: true,
                    backgroundStyle: {
                        barBorderRadius: 10,
                    },
                    xAxisIndex: 0,
                    yAxisIndex: 0,
                    data: this.manData,
                    barWidth: 12,
                    // barCategoryGap: '40%',
                    itemStyle: {
                        normal: {
                            show: true,
                            color: new $echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                                offset: 0,
                                color: '#C97372', // 指0%处的颜色
                            }, {
                                offset: 1,
                                color: '#A2453E', // 指100%处的颜色
                            }], false),
                            barBorderRadius: 30,
                        },
                    },
                    label: {
                        normal: {
                            show: true,
                            position: 'top',
                            distance: 0,
                            textStyle: {
                                color: '#E999A2',
                                fontSize: this.labelFontSize,
                            },
                        },
                    },
                    emphasis: {
                        label: {
                            fontSize: this.fontSize,
                        },
                    },
                },
                {
                    name: '女',
                    type: 'bar',
                    xAxisIndex: 2,
                    yAxisIndex: 2,
                    gridIndex: 2,
                    // showBackground: true,
                    backgroundStyle: {
                        barBorderRadius: 30,
                    },
                    data: this.womanData,
                    barWidth: 12,
                    // barCategoryGap: '40%',
                    itemStyle: {
                        normal: {
                            show: true,
                            color: new $echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                                offset: 0,
                                color: '#0A4CBD', // 指0%处的颜色
                            }, {
                                offset: 1,
                                color: '#00B7ED', // 指100%处的颜色
                            }], false),
                            barBorderRadius: 30,
                        },
                    },
                    label: {
                        normal: {
                            show: true,
                            position: 'top',
                            distance: 0,
                            textStyle: {
                                color: '#3CB5EC',
                                fontSize: this.labelFontSize,
                            },
                        },
                    },
                    emphasis: {
                        label: {
                            fontSize: this.fontSize,
                        },
                    },
                },
            ],
        };
        bidirChart.setOption(option);
        // tooltip定时移动
        let count = 0;
        if (this.timmerBidir) {
            clearInterval(this.timmerBidir);
        }
        if (this.timmer) {
            clearInterval(this.timmer);
        }
        let index = 0;
        // this.timmer = setInterval(() => {
        this.timmerBidir = setInterval(() => {
            bidirChart.dispatchAction({
                type: 'showTip',
                seriesIndex: 1,
                dataIndex: count % this.manData.length,
            });
            bidirChart.dispatchAction({
                type: 'highlight',
                seriesIndex: 0,
                dataIndex: count,
            });
            count++;
            // console.log(count % 2);
        }, 2000);
    }
}
