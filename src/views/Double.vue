<template>
  <div class="double">
    <div class="chart">
      <ComplexPie></ComplexPie>
    </div>
    <div class="chart">
      <DoublePie></DoublePie>
    </div>
    <div class="chart">
      <DoubleColumns></DoubleColumns>
    </div>
    <div class="chart">
      <DoubleLine />
    </div>
    <div class="chart">
      <ComplexColumn></ComplexColumn>
    </div>
    <div class="chart">
      <SunBurst></SunBurst>
    </div>
    <div class="chart">
      <Columnar></Columnar>
    </div>
    <div class="chart">
      <BidirectionalColumnar></BidirectionalColumnar>
    </div>
    <div class="chart">
      <HouseColumnar></HouseColumnar>
    </div>
    <div class="chart">
      <h1 style="color:#fff;">待更新...</h1>
      <!-- <Sector></Sector> -->
    </div>
  </div>
</template>
<script lang="ts">
// @ is an alias to /src
import { Component, Vue } from "vue-property-decorator";
import DoublePie from "@/components/DoublePie.vue";
import DoubleLine from "@/components/DoubleLine.vue";
import DoubleColumns from "@/components/DoubleColumns.vue";
import ComplexColumn from "@/components/ComplexChart.vue";
import ComplexPie from "@/components/ComplexPie.vue";

import SunBurst from "@/components/sunburst/Sunburst.vue";
import Columnar from "@/components/columnar/Columnar.vue";
import BidirectionalColumnar from "@/components/BidirectionalColumnar/BidirectionalColumnar.vue";
import HouseColumnar from "@/components/houseColumnar/HouseColumnar.vue";
import Sector from "@/components/sector/Sector.vue";
@Component({
  components: {
    DoublePie,
    DoubleColumns,
    DoubleLine,
    ComplexColumn,
    ComplexPie,
    SunBurst,
    Columnar,
    BidirectionalColumnar,
    HouseColumnar,
    Sector,
  },
})
export default class Double extends Vue {}
</script>
<style lang="scss" scoped>
.double {
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  .chart {
    width: 550px;
    height: 550px;
    background-color: #34374d;
    margin-top: 20px;
  }
}
</style>
