import { Component, Vue } from 'vue-property-decorator';
import $echarts from 'echarts';
@Component
export default class Sunburst extends Vue {
    private originData: any;
    private data0: any;
    private data1: any;
    private colors0 = ['#E18685', '#0E50C0', '#EF5E01']; // 粉blue橙
    private colors1 = ['#389511', '#D8E502'];   // 绿 黄
    private mounted() {
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
        // let data0:any = [];
        let data1: any = [];
        this.data0 = this.originData.reduce((_p: any, c: any, i: number) => {
            c.itemStyle = {
                color: this.colors0[i],
            };
            c.labelLine = {
                length: 10,
                length2: 12,
                lineStyle: {
                    width: 2,
                },

            };
            return this.originData;
        }, 0);
        this.data1 = this.getArr(this.originData);

        console.log(this.data0, this.data1);

        this.$nextTick(() => {
            this.getSunburst();
        });
    }
    private getSunburst() {
        let commonChart = $echarts.init(document.getElementById('sunburst') as HTMLCanvasElement);
        let option: any = {
            series: [
                {
                    radius: ['60%', '85%'],
                    type: 'pie',
                    sort: null,
                    highlightPolicy: 'ancestor',
                    data: this.data1,
                    label: {
                        show: false,
                    },
                },
                {
                    radius: ['35%', '60%'],
                    type: 'pie',
                    z: 3,
                    data: this.data0,
                    label: {
                        show: true,
                        position: 'outside',
                        formatter: '{name|{b0}}({per|{d}}%) \n {hr|} \n {number|{c}}',
                        fontSize: 10,
                        padding: [0, -2, -2, -3],
                        align: 'center',
                        rich: {
                            name: {
                                color: '#fff',
                            },
                            per: {
                                fontSize: 12,
                            },
                            hr: {
                                borderColor: '#0E50C0',
                                width: '100%',
                                borderWidth: 0.5,
                                height: 0,
                            },
                            number: {
                                color: '#16ADF2',
                                fontSize: 16,
                                align: 'center',
                            },
                        },
                    },
                    itemStyle: {
                        // color: '#08315A',
                    },
                },

            ],
        };
        commonChart.setOption(option);
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
