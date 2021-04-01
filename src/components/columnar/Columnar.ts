import { Component, Vue } from 'vue-property-decorator';
import $echarts from 'echarts';
@Component
export default class Columnar extends Vue {
    private age = ['80+', '70-79', '60-69', '50-59', '40-49', '30-39', '20-29', '10-19', '0-9'];
    private num = [321, 212, 162, 342, 155, 615, 134, 615, 133];
    private fontSize: number = 14;
    private img: string = './assets/bar.png';
    private timmerBar: any;
    private mounted() {
        let screenWidth = document.body.clientWidth;
        if (screenWidth >= 3142) {
            this.fontSize = 32;
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
        let barChart = $echarts.init(document.getElementById('columnar') as HTMLCanvasElement);
        let option: any = {
            grid: {
                top: '10%',
                right: '5%',
                bottom: '18%',
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow',
                },
                backgroundColor: 'rgba(255,255,255,0)',
                formatter: (params: any) => {
                    let htmlStr = '';
                    htmlStr +=
                        '<div style="height:3.5vh;line-height:3.5vh;padding:1vh;width:6vw;background-image: url(./assets/pointHover.png);background-repeat: no-repeat;background-size: 100% 100%;">';
                    htmlStr += params[0].name + ': ' + params[0].value;
                    htmlStr += '</div>';
                    return htmlStr;
                },
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
                    type: 'bar',
                    data: [],
                    barWidth: '45%',
                    itemStyle: {
                        fontSize: this.fontSize,
                        barBorderRadius: [3, 3, 0, 0],
                        color: new $echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            {
                                offset: 0,
                                color: 'rgba(5,201,253)',
                            },
                            {
                                offset: 0.5,
                                color: 'rgba(80,163,224,0.5)',
                            },
                            {
                                offset: 0.8,
                                color: 'rgba(13,75,198,0.5)',
                            },
                            {
                                offset: 1,
                                color: 'rgba(13,75,198)',
                            },
                        ]),
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
                {
                    type: 'pictorialBar',
                    data: [],
                    symbol: 'image://' + this.img,
                    symbolSize: ['100%', '110%'],
                    barWidth: '55%',
                    itemStyle: {
                        normal: {
                            show: true,
                            color: 'rgba(45, 142, 234, 0.8)',
                            borderWidth: 0,
                        },
                    },
                    label: {
                        show: false,
                    },
                },
            ],
        };
        option.series[0].data = this.num;
        option.series[1].data = this.num;
        option.xAxis[0].data = this.age;
        barChart.setOption(option);
        // tooltip定时移动
        let count = 0;
        if (this.timmerBar) {
            clearInterval(this.timmerBar);
        }
        this.timmerBar = setInterval(() => {
            barChart.dispatchAction({
                type: 'showTip',
                seriesIndex: 0,
                dataIndex: count % option.xAxis[0].data.length,
            });
            count++;
        }, 2000);
    }
}
