import { Component, Vue } from 'vue-property-decorator';
import $echarts from 'echarts';
@Component
export default class Sunburst extends Vue {
    private originData: any;
    private data0: any;
    private mounted() {
        let colors0 = ['#E18685', '#0E50C0', '#EF5E01']; // 粉blue橙
        let colors1 = ['#389511', '#D8E502'];   // 绿 黄
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
                color: colors0[i],
            };
            c.labelLine = {
                length: 40,
                length2: 10,
            };
            if (c.children) {
                c.children.reduce((_p1: any, c1: any, i1: number) => {
                    c1.itemStyle = {
                        color: colors1[i1],
                    };
                    c1.label = {
                        normal: {
                            position: 'oustside',
                        },
                    };
                }, 0);
            }
            return this.originData;
        }, 0);
        console.log(this.data0);

        this.$nextTick(() => {
            this.getSunburst();
        });
    }
    private getSunburst() {
        let commonChart = $echarts.init(document.getElementById('sunburst') as HTMLCanvasElement);
        let option: any = {
            series: {
                radius: ['35%', '80%'],
                type: 'sunburst',
                sort: null,
                highlightPolicy: 'ancestor',
                data: this.data0,
                label: {
                    show: true,
                    rotate: 0,
                    distance: 8,
                    position: 'outside',
                    // formatter: '{b} / {d}% ',
                },
                // labelLine: {
                //     show: true,
                //     lineStyle: {
                //         color: '#235894',
                //     },
                // },
                itemStyle: {
                    color: '#08315A',
                    // borderWidth: 2,
                },
            },
        };
        commonChart.setOption(option);
    }
}
