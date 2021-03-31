<template>
  <div class="home">
    <div class="chart">
      <PieChart class="show_chart"></PieChart>
    </div>
    <div class="chart">
      <singleColumns class="show_chart"></singleColumns>
    </div>
    <div class="chart">
      <LineChart class="show_chart"></LineChart>
    </div>
    <!-- <PieChart /> -->
  </div>
</template>

<script>
// @ is an alias to /src
import { Component, Vue } from "vue-property-decorator";
import singleColumns from "@/components/SingleColumns.vue";
import PieChart from "@/components/Pie.vue";
import LineChart from "@/components/Line.vue";

@Component({
  components: {
    PieChart,
    singleColumns,
    LineChart
  }
})
export default class App extends Vue {}
</script>
<style lang="scss">
.home {
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  .chart {
    width: 500px;
    height: 500px;
    background-color: #b6e6ff;
    margin-top: 20px;
    .show_chart {
      width: 100%;
      height: 100%;
    }
  }
}
</style>