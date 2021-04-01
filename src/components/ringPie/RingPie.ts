import { Component, Vue } from 'vue-property-decorator';
import $echarts from 'echarts';
@Component
export default class RingPie extends Vue {
    private mounted() {
        this.$nextTick(() => {
            this.initRing();
        });
    }
    private initRing() {
        let ringChart = $echarts.init(document.getElementById('ringPie') as HTMLCanvasElement);
        let option: any = {};
        ringChart.setOption(option);
    }
}
