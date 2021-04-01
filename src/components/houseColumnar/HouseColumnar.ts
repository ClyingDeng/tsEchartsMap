import { Component, Vue } from 'vue-property-decorator';
import $echarts from 'echarts';
@Component
export default class HouseColumnar extends Vue {
    private house = ['A镇', 'B镇', 'C镇', 'D镇', 'E镇', 'F镇', 'G镇', 'H镇', 'I镇', 'J镇', 'K镇'];
    private yearHouseCount = [213, 43, 12, 435, 123, 231, 254, 324, 123, 231, 254];
    private lastYearHouseCount = [223, 123, 132, 45, 133, 231, 154, 326, 103, 31, 204];
    private fontSize: number = 14;
    private imgLast: string = './assets/yellowBar.png';
    private imgCurr: string = './assets/blueBar.png';
    private timmerHouseBar: any;
    private mounted() {
        let screenWidth = document.body.clientWidth;
        if (screenWidth >= 3142) {
            this.fontSize = 32;
            console.log(this.fontSize);
        } else if (screenWidth >= 1571) {
            this.fontSize = 14;
        } else {
            this.fontSize = 12;
        }
        this.$nextTick(() => {
            this.initColumn();
        });
    }
    private initColumn() {
        let houseBarChart = $echarts.init(document.getElementById('houseColumnar') as HTMLCanvasElement);
        let option: any = {
            grid: {
                top: '8%',
                right: '5%',
                bottom: '12%',
            },
            legend: {
                right: '5%',
                icon: 'roundRect',
                itemWidth: this.fontSize * 2,
                itemHeight: this.fontSize,
                textStyle: {
                    color: '#ffffff',
                    fontSize: this.fontSize,
                },
            },
            tooltip: {
                show: true,
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow',
                },
                backgroundColor: 'rgba(100,100,100,0.6)',
                // formatter: '{town|{a}}\n{name|{b0}}: {number|{c0}} \n {name|{b1}}: {number|{c1}}',
                // rich: {
                //     town: {
                //         fontSize: this.fontSize + 1,
                //     },
                //     name: {
                //         fontSize: this.fontSize,
                //     },
                //     number: {
                //         fontSize: this.fontSize,
                //     }
                // },
                textStyle: {
                    fontSize: this.fontSize,
                },
            },
            xAxis: [
                {
                    type: 'category',
                    data: [],
                    axisLine: {
                        onZero: true,
                    },
                    splitNumber: 8,
                    axisLabel: {
                        textStyle: {
                            color: '#ccc',
                            fontSize: this.fontSize,
                        },
                        rotate: 0,
                    },
                    axisTick: {
                        show: false,
                    },
                    splitLine: {
                        show: false,
                        lineStyle: {
                            color: '#f1f1f1',
                            opacity: 0.3,
                        },
                    },
                },
            ],
            yAxis: [
                {
                    type: 'value',
                    axisLabel: {
                        textStyle: {
                            color: '#ccc',
                            fontSize: this.fontSize,
                        },
                        rotate: 0,
                    },
                    splitLine: {
                        show: false,
                        lineStyle: {
                            color: '#f1f1f1',
                            opacity: 0.3,
                        },
                    },
                },
            ],
            series: [
                {
                    name: '去年房屋',
                    type: 'pictorialBar',
                    data: [],
                    z: 4,
                    symbol: 'image://' + this.imgLast,
                    symbolSize: ['90%', '100%'],
                    barWidth: '50%',
                    itemStyle: {
                        fontSize: this.fontSize,
                        barBorderRadius: [3, 3, 0, 0],
                        color: '#F8E700',
                    },
                    label: {
                        show: false,
                    },

                },
                {
                    name: '今年房屋',
                    type: 'pictorialBar',
                    data: [],
                    symbol: 'image://' + this.imgCurr,
                    symbolSize: ['60%', '100%'],
                    barWidth: '50%',
                    // barGap: '30%',
                    itemStyle: {
                        fontSize: this.fontSize,
                        barBorderRadius: [3, 3, 0, 0],
                        color: '#0AA5DD',
                    },
                    emphasis: {
                        itemStyle: {
                            barBorderRadius: [3, 3, 0, 0],
                            fontSize: this.fontSize,
                            color: new $echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                {
                                    offset: 0,
                                    color: 'rgba(249,124,27,1)',
                                },
                                {
                                    offset: 1,
                                    color: 'rgba(234,108,0,1)',
                                },
                            ]),
                        },
                    },
                },
            ],
        };
        option.series[0].data = this.yearHouseCount;
        option.series[1].data = this.lastYearHouseCount;
        option.xAxis[0].data = this.house;
        houseBarChart.setOption(option);
        // tooltip定时移动
        let count = 0;
        if (this.timmerHouseBar) {
            clearInterval(this.timmerHouseBar);
        }
        this.timmerHouseBar = setInterval(() => {
            houseBarChart.dispatchAction({
                type: 'showTip',
                seriesIndex: 0,
                dataIndex: count % option.xAxis[0].data.length,
            });
            count++;
        }, 2500);
    }
}
