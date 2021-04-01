import { Component, Vue } from 'vue-property-decorator';
import $echarts from 'echarts';
@Component
export default class Sunburst extends Vue {
    private originData: any;
    private data0: any;
    private data1: any;
    private colors0 = ['#E18685', '#0E50C0', '#EF5E01']; // 粉blue橙
    private colors1 = ['#389511', '#D8E502'];   // 绿 黄
    private numFontSize: number = 16;
    private fontSize: number = 14;
    private labelFontSize: number = 12;
    private hr: number = 6;
    private timmerPie: any;
    private mounted() {
        let screenWidth = document.body.clientWidth;
        if (screenWidth >= 3142) {
            this.fontSize = 28;
            this.labelFontSize = 26;
            this.numFontSize = 32;
            this.hr = 12;
        }
        this.originData = [
            {
                name: '户籍人员',
                value: 1000,
                children: [{
                    name: '入户一致',
                    value: 400,
                },
                {
                    name: '入户分离',
                    value: 600,
                },
                ],
            }, {
                name: '境外来沪人员',
                value: 2000,
            }, {
                name: '境外来沪人员',
                value: 500,
            },
        ];
        this.data0 = this.originData.reduce((_p: any, c: any, i: number) => {
            c.itemStyle = {
                color: this.colors0[i],
            };
            c.labelLine = {
                length: this.fontSize,
                length2: this.fontSize,
                lineStyle: {
                    width: 2,
                },
            };
            if (c.children) {
                c.label = {
                    formatter: `{name|{b0}}({per|{d}}%) \n {hr|} \n {number|{c}}\n{hr1|}\n{point|}{class1| ${c.children[0].name}}\n{class1|${c.children[0].value}}\n{point1|}{class2| ${c.children[1].name}}\n{class2|${c.children[1].value}}`,
                    padding: [30, 0, 0, -3],
                    align: 'center',
                    rich: {
                        name: {
                            color: '#fff',
                            fontSize: this.fontSize,
                        },
                        per: {
                            fontSize: this.fontSize,
                        },
                        hr: {
                            borderColor: '#0E50C0',
                            width: '100%',
                            borderWidth: this.hr / 6,
                            height: 0,
                        },
                        number: {
                            color: '#16ADF2',
                            fontSize: this.numFontSize,
                            align: 'center',
                        },
                        class1: {
                            color: '#389511',
                            align: 'center',
                            fontSize: this.labelFontSize,
                        },
                        class2: {
                            color: '#D8E502',
                            align: 'center',
                            fontSize: this.labelFontSize,
                        },
                        point: {
                            width: this.hr,
                            height: this.hr,
                            borderRadius: this.hr / 2,
                            borderWidth: this.hr / 4,
                            borderColor: '#389511',
                            backgroundColor: '#389511',
                            align: 'center',
                        },
                        point1: {
                            width: this.hr,
                            height: this.hr,
                            borderRadius: this.hr / 2,
                            borderWidth: this.hr / 4,
                            borderColor: '#D8E502',
                            backgroundColor: '#D8E502',
                            align: 'center',
                        },
                    },
                };
            }
            return this.originData;
        }, 0);
        this.data1 = this.getArr(this.originData);
        this.$nextTick(() => {
            this.getSunburst();
        });
    }
    private getSunburst() {
        let commonChart = $echarts.init(document.getElementById('sunburst') as HTMLCanvasElement);
        let option: any = {
            series: [
                {
                    radius: ['35%', '55%'],
                    type: 'pie',
                    z: 3,
                    data: this.data0,
                    label: {
                        show: true,
                        position: 'outside',
                        formatter: '{name|{b0}}({per|{d}}%) \n {hr|} \n {number|{c}}',
                        fontSize: this.fontSize,
                        padding: [0, -2, -2, -3],
                        align: 'center',
                        rich: {
                            name: {
                                color: '#fff',
                                fontSize: this.fontSize,
                            },
                            per: {
                                fontSize: this.fontSize,
                            },
                            hr: {
                                borderColor: '#0E50C0',
                                width: '100%',
                                borderWidth: this.hr / 6,
                                height: 0,
                            },
                            number: {
                                color: '#16ADF2',
                                fontSize: this.numFontSize,
                                align: 'center',
                            },
                        },
                    },
                    itemStyle: {
                    },
                    emphasis: {
                        label: {
                            fontSize: this.fontSize + 4,
                        },
                        labelLine: {
                            length: this.fontSize + 5,
                            length2: this.fontSize + 8,
                            lineStyle: {
                                width: 2,
                                // color: '#04537A',
                            },
                        },
                    },
                },
                {
                    radius: ['55%', '75%'],
                    type: 'pie',
                    sort: null,
                    highlightPolicy: 'ancestor',
                    data: this.data1,
                    label: {
                        show: false,
                    },
                },
            ],
        };
        commonChart.setOption(option);
        // 定时
        let currentIndex = -1;
        if (this.timmerPie) {
            clearInterval(this.timmerPie);
            currentIndex = -1;
        }
        let dataLen = option.series[0].data.length;
        this.timmerPie = setInterval(() => {
            // 取消之前高亮的图形
            commonChart.dispatchAction({
                type: 'downplay',
                seriesIndex: 0,
                dataIndex: currentIndex,
            });
            currentIndex = (currentIndex + 1) % dataLen;
            // 高亮当前图形
            commonChart.dispatchAction({
                type: 'highlight',
                seriesIndex: 0,
                dataIndex: currentIndex,
            });
            // 显示 tooltip
            commonChart.dispatchAction({
                type: 'showTip',
                seriesIndex: 0,
                dataIndex: currentIndex,
            });
        }, 3000);
    }
    private getArr(arr: any) {
        let arrary: object[] = [];
        for (let i = 0; i < arr.length; i++) {
            let obj = arr[i];
            let kids = arr[i].children;

            if (typeof (kids) === 'undefined') {
                arrary.push({
                    value: obj.value,
                    name: obj.name,
                    itemStyle: {
                        color: 'transparent',
                    },
                });
            } else {
                for (let k = 0; k < kids.length; k++) {
                    let kid = kids[k];
                    arrary.push({
                        value: kid.value,
                        name: kid.name,
                        itemStyle: {
                            color: this.colors1[k],
                        },
                    });
                }
            }
        }
        return arrary;
    }
}
