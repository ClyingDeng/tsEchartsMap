<template>
  <div class="double">
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
  </div>
</template>
<script lang="ts">
// @ is an alias to /src
import { Component, Vue } from "vue-property-decorator";
import DoublePie from "@/components/DoublePie.vue";
import DoubleLine from "@/components/DoubleLine.vue";
import DoubleColumns from "@/components/DoubleColumns.vue";
import ComplexColumn from "@/components/ComplexChart.vue";
@Component({
  components: {
    DoublePie,
    DoubleColumns,
    DoubleLine,
    ComplexColumn
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
    width: 500px;
    height: 500px;
    background-color: #34374d;
    margin-top: 20px;
  }
}
</style>