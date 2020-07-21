<template>
  <div class="double">
    <div class="chart"></div>
    <div class="chart"></div>
    <div class="chart"></div>
  </div>
</template>
<script>
// @ is an alias to /src

export default {
  name: "double"
};
</script>
<style lang="scss" scoped>
.double {
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  .chart {
    width: 500px;
    height: 500px;
    background-color: #00f;
    margin-top: 20px;
  }
}
</style>