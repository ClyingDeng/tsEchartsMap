import { Component, Vue } from 'vue-property-decorator';
import $echarts from 'echarts';
@Component
export default class Sector extends Vue {
    private mounted() {
        this.$nextTick(() => {
            this.initRing();
        });
    }
    private initRing() {
        let ringChart = $echarts.init(document.getElementById('sector') as HTMLCanvasElement);
        let option: any = {};
        ringChart.setOption(option);
    }
}
