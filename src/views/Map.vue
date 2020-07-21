<template>
  <div class="map">
    <div class="content">地图</div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Map"
};
</script>
<style lang="scss" scoped>
.map {
  display: flex;
  justify-content: center;
  align-items: center;
  .content {
    width: 600px;
    height: 600px;
    background-color: #f0f;
  }
}
</style>