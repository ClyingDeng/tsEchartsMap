<template>
  <!-- <div class="map"> -->
  <div id="map"></div>
  <!-- </div> -->
</template>

<script>
// @ is an alias to /src
// import AMap from "@/utils/amap";
export default {
  name: "Map",
  created() {
    this.$nextTick(() => {
      this.init();
    });
  },
  methods: {
    init() {
      var map = new AMap.Map("map", {
        viewMode: "2D", // 默认使用 2D 模式，如果希望使用带有俯仰角的 3D 模式，请设置 viewMode: '3D',
        zoom: 11, //初始化地图层级
        center: [116.397428, 39.90923], //初始化地图中心点
      });
    },
  },
};
</script>
<style lang="scss" scoped>
// .map {
//   display: flex;
//   justify-content: center;
//   align-items: center;
#map {
  width: 600px;
  height: 600px;
  // background-color: #f0f;
}
// }
</style>